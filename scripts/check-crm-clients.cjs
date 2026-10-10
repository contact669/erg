// Check client matching with an in-memory stand-in for Firestore: no real database access.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const docs = new Map();
let nextId = 1;
const firestoreStub = {
  collection: (_db, name) => ({ name }),
  where: (field, _op, value) => ({ field, value }),
  limit: () => null,
  query: (col, filter) => ({ col, filter }),
  serverTimestamp: () => 'now',
  getDocs: async ({ filter }) => {
    const found = [...docs.entries()].filter(([, d]) => d[filter.field] === filter.value);
    return { empty: found.length === 0, docs: found.map(([id, d]) => ({ id, ref: id, get: key => d[key] })) };
  },
  addDoc: async (_col, data) => { const id = `c${nextId++}`; docs.set(id, { ...data }); return { id }; },
  updateDoc: async (id, data) => { docs.set(id, { ...docs.get(id), ...data }); },
};

const filename = path.resolve('src/lib/crm/clients.ts');
const mod = new Module(filename, module);
mod.filename = filename;
mod.paths = Module._nodeModulePaths(path.dirname(filename));
const originalRequire = mod.require.bind(mod);
mod.require = id => (id === 'firebase/firestore' ? firestoreStub : originalRequire(id));
mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, filename);
const { findOrCreateClient } = mod.exports;

(async () => {
  const first = await findOrCreateClient({}, { name: ' Jeanne Martin ', email: ' Jeanne@Example.fr ', source: 'Site web', requestId: 'r1' });
  assert.equal(docs.get(first).email, 'jeanne@example.fr');
  assert.equal(docs.get(first).name, 'Jeanne Martin');
  assert.deepEqual(docs.get(first).requestIds, ['r1']);

  const again = await findOrCreateClient({}, { name: 'J. Martin', email: 'jeanne@example.fr', phone: '0600000000' });
  assert.equal(again, first, 'Same email reuses the existing client');
  assert.equal(docs.get(first).phone, '0600000000', 'Missing details are completed');
  assert.equal(docs.get(first).name, 'Jeanne Martin', 'Existing details are kept');

  const noEmail = await findOrCreateClient({}, { name: 'Sans email' });
  assert.notEqual(noEmail, first);
  assert.equal(docs.size, 2);
  const numberingFile = path.resolve('src/lib/crm/numbering.ts');
  const numbering = new Module(numberingFile, module);
  numbering.filename = numberingFile;
  numbering.paths = Module._nodeModulePaths(path.dirname(numberingFile));
  numbering.require = id => (id === 'firebase/firestore' ? firestoreStub : originalRequire(id));
  numbering._compile(ts.transpileModule(fs.readFileSync(numberingFile, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, numberingFile);
  const { nextNumberFrom } = numbering.exports;
  assert.equal(nextNumberFrom([], 'DEV', 2026), 'DEV-2026-00001');
  assert.equal(nextNumberFrom(['DEV-2026-00007', 'DEV-2026-4821', undefined, 'DEV-2025-00090', 'DEV-2026-00003'], 'DEV', 2026), 'DEV-2026-00008',
    'Old random numbers and other years are ignored');
  console.log('CRM client checks passed: email normalised, duplicates merged, existing details kept, quote numbers sequential.');
})().catch(error => { console.error(error); process.exitCode = 1; });
