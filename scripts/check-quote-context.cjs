// Pure checks: no form submission, customer data, database or email.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const output = {};
new Function('exports', ts.transpileModule(fs.readFileSync('src/lib/quote-project.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(output);
const { quoteOriginPages, quoteHrefForService, readQuoteOrigin, quoteOriginFromRequest, readQuoteProject } = output;
for (const page of quoteOriginPages) {
  const slug = page.path.includes('/services/') ? page.path.split('/').pop() : 'renovation-salle-de-bain';
  const url = new URL(quoteHrefForService(slug, page.path), 'https://erg-renovation.fr');
  assert.equal(url.pathname, '/devis');
  assert.equal(url.hash, '#demande-devis');
  assert.ok(readQuoteProject(url.searchParams.get('projet')));
  assert.equal(readQuoteOrigin(url.searchParams.get('page')), page.path);
  assert.equal(quoteOriginFromRequest({quoteOriginPage: page.path, quoteOriginMethod: 'link-parameter'}), page.path);
}
for (const value of [undefined, null, '', '__proto__', 'https://other.example', '//other.example', '/dashboard', '/services/renovation-cuisine?email=private', '/services/renovation-cuisine#private']) {
  assert.equal(readQuoteOrigin(value), null, 'Only the exact public allowlist can be persisted or linked');
}
assert.equal(quoteOriginFromRequest({}), null, 'Historical requests remain unattributed');
assert.equal(quoteOriginFromRequest({quoteOriginPage: quoteOriginPages[0].path}), null, 'Method must be explicit');
assert.equal(quoteHrefForService('__proto__'), '/devis');
assert.equal(quoteHrefForService('unknown'), '/devis');
assert.equal(new URL(quoteHrefForService('renovation-cuisine', 'https://other.example'), 'https://erg-renovation.fr').searchParams.get('page'), null);
console.log('Quote context checks passed');
