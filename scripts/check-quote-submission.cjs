const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');
const Module = require('node:module');

// Load the actual TypeScript helper without adding a test runtime dependency.
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, filename);
const { submitQuoteRequest } = require('../src/lib/submit-quote-request.ts');
const payload = { clientName: '  Test Client  ', clientEmail: 'client@example.test', clientPhone: '0600000000', projectDescription: 'Un projet de rénovation à décrire pour le test.' };

(async () => {
  let saves = 0;
  let notifications = 0;
  await assert.rejects(submitQuoteRequest({ ...payload, clientEmail: 'invalid' }, async () => { saves++; }, async () => { notifications++; }));
  assert.equal(saves, 0); assert.equal(notifications, 0);
  await assert.rejects(submitQuoteRequest(payload, async () => { throw new Error('Firestore unavailable'); }, async () => { notifications++; }));
  assert.equal(notifications, 0, 'Never notify when persistence fails');

  const order = [];
  const success = await submitQuoteRequest(payload, async normalized => {
    order.push('saved'); assert.equal(normalized.clientName, 'Test Client');
  }, async () => { order.push('notified'); return { ok: true, json: async () => ({ success: true }) }; });
  assert.deepEqual(order, ['saved', 'notified']); assert.equal(success.notificationSent, true);

  for (const notify of [
    async () => ({ ok: false, json: async () => ({ success: false }) }),
    async () => ({ ok: true, json: async () => ({ success: false }) }),
    async () => { throw new Error('Network failure'); },
    async () => ({ ok: true, json: async () => { throw new Error('Invalid JSON'); } }),
  ]) {
    let persisted = false;
    const result = await submitQuoteRequest(payload, async () => { persisted = true; }, notify);
    assert.equal(persisted, true); assert.equal(result.notificationSent, false);
  }
  // Exercise the real API route, replacing only the email provider and templates.
  let mailResults = [];
  let rateLimited = false;
  const filename = path.resolve('src/app/api/send-quote-email/route.ts');
  const routeModule = new Module(filename, module);
  routeModule.filename = filename;
  routeModule.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = routeModule.require.bind(routeModule);
  routeModule.require = id => {
    if (id === 'resend') return { Resend: class { emails = { send: async () => {
      const result = mailResults.shift();
      if (result instanceof Error) throw result;
      return result;
    } }; } };
    if (id.startsWith('@/emails/')) return () => null;
    if (id === '@/lib/quote-request-schema') return require('../src/lib/quote-request-schema.ts');
    if (id === '@/lib/server/rate-limit') return { clientIp: () => 'test', isRateLimited: () => rateLimited };
    return originalRequire(id);
  };
  routeModule._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
  const post = body => routeModule.exports.POST(new Request('http://localhost/api/send-quote-email', { method: 'POST', body }));
  const savedKey = process.env.RESEND_API_KEY;
  const savedLog = console.error;
  try {
    console.error = () => {}; // Expected provider failures, without printing private payloads.
    process.env.RESEND_API_KEY = 'mock-key-no-real-delivery';
    assert.equal((await post('{')).status, 400);
    assert.equal((await post(JSON.stringify({ ...payload, clientEmail: 'invalid' }))).status, 400);
    mailResults = [{ data: { id: 'admin' }, error: null }, { data: { id: 'client' }, error: null }];
    assert.equal((await post(JSON.stringify(payload))).status, 200);
    for (const results of [
      [{ error: { message: 'Admin send failed' } }, { error: null }],
      [{ error: null }, { error: { message: 'Client send failed' } }],
    ]) {
      mailResults = results;
      const response = await post(JSON.stringify(payload));
      assert.equal(response.status, 502);
      assert.equal((await response.json()).success, false);
    }
    mailResults = [new Error('Provider unavailable'), { error: null }];
    assert.equal((await post(JSON.stringify(payload))).status, 500);
    delete process.env.RESEND_API_KEY;
    assert.equal((await post(JSON.stringify(payload))).status, 500);
    rateLimited = true;
    assert.equal((await post(JSON.stringify(payload))).status, 429, 'Rate-limited requests send no email');
    rateLimited = false;
  } finally {
    console.error = savedLog;
    if (savedKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = savedKey;
  }
  const { isRateLimited } = require('../src/lib/server/rate-limit.ts');
  const key = `check-${Date.now()}`;
  assert.deepEqual([1, 2, 3, 4].map(() => isRateLimited(key, 3, 60000)), [false, false, false, true]);
  console.log('Quote submission and API checks passed: invalid input, persistence failure, ordering, success, email failures, missing configuration and rate limiting. No real emails or database writes.');
})().catch(error => { console.error(error); process.exitCode = 1; });
