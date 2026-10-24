// Synthetic fixtures only: no customer data and no database writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const exportsObject = {};
new Function('exports', ts.transpileModule(fs.readFileSync('src/lib/crm/request-pipeline.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(exportsObject);
const { requestPipelineStages, requestInPeriod } = exportsObject;
const first = new Date(2026, 9, 1, 0, 0);
const last = new Date(2026, 9, 24, 23, 59, 59);
assert.equal(requestInPeriod(first, '2026-10-01', '2026-10-24'), true);
assert.equal(requestInPeriod({toDate: () => last}, '2026-10-01', '2026-10-24'), true);
assert.equal(requestInPeriod(new Date(2026, 9, 25), '', '2026-10-24'), false);
assert.equal(requestInPeriod(first, '2026-10-02', ''), false);
assert.equal(requestInPeriod(undefined, '', ''), true);
assert.equal(requestInPeriod(undefined, '2026-10-01', ''), false);
assert.equal(requestInPeriod({toDate: () => {throw new Error('Invalid date');}}, '', '2026-10-24'), false);
assert.equal(requestInPeriod(first, '2026-10-24', '2026-10-01'), false);
const requests = [
  { id: 'treated', status: 'Traité' },
  { id: 'forged', pipelineStage: 'won', quoteIds: ['a'] },
  ...['draft', 'sent', 'accepted', 'invoiced', 'refused', 'mixed', 'unknown'].map(id => ({ id })),
];
const stages = requestPipelineStages(requests.map(request => request.id), [
  { id: '1', requestId: 'draft', status: 'Brouillon' },
  { id: '2', requestId: 'sent', status: 'Envoyé' },
  { id: '3', requestId: 'accepted', status: 'Accepté' },
  { id: '4', requestId: 'accepted', status: 'Refusé' },
  { id: '5', requestId: 'invoiced', status: 'Facturé' },
  { id: '6', requestId: 'refused', status: 'Refusé' },
  { id: '7', requestId: 'mixed', status: 'Refusé' },
  { id: '8', requestId: 'mixed', status: 'Envoyé' },
  { id: '9', status: 'Accepté' },
  { id: '10', requestId: 'unknown', status: 'unexpected' },
]);
for (const id of ['treated', 'forged']) assert.equal(stages.get(id).stage, 'lead', 'Request fields cannot imply a sale');
assert.equal(stages.get('draft').stage, 'quoting');
assert.equal(stages.get('sent').stage, 'sent');
assert.equal(stages.get('accepted').stage, 'won');
assert.equal(stages.get('invoiced').stage, 'won');
assert.equal(stages.get('refused').stage, 'lost');
assert.equal(stages.get('mixed').stage, 'sent');
assert.equal(stages.get('unknown').stage, 'quoting', 'Unknown statuses never prove acceptance');
assert.equal([...stages.values()].filter(item => item.stage === 'won').length, 2, 'Alternative quotes do not duplicate requests');
assert.equal(requestPipelineStages([], []).size, 0);
console.log('Request pipeline checks passed');
