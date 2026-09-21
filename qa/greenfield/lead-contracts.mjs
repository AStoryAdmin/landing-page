import fs from 'node:fs/promises';
import ts from 'typescript';
import assert from 'node:assert/strict';
let source = await fs.readFile('src/lib/leads.ts', 'utf8');
source = source.replace("import { getSupabase, isSupabaseConfigured } from './supabase';", 'const getSupabase = () => globalThis.leadFixture.client; const isSupabaseConfigured = true;').replace("import { CONTACT } from './contact';", "const CONTACT = { gift: 'mailto:qa@example.invalid?subject=gift', demo: 'mailto:qa@example.invalid?subject=demo', waitlist: 'mailto:qa@example.invalid?subject=waitlist' };");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const module = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
const results = [];
const lead = { firstName: ' Fictional ', lastName: ' QA ', phone: '+1 (202) 555-0100', email: ' EXAMPLE@EXAMPLE.INVALID ', giftFor: ' Family ', source: 'start:plan:family+book', note: 'Fixture only' };
let sent = [], replies = [];
const configure = sequence => {
    sent = []; replies = [...sequence];
    globalThis.leadFixture = { client: { from: table => ({ insert: async row => { assert.equal(table, 'waitlist_signups'); sent.push(row); const reply = replies.shift(); if (reply instanceof Error) throw reply; return reply; } }) } };
};
configure([{ error: null }]);
assert.deepEqual(await module.submitLead(lead), { ok: true, alreadyKnown: false });
assert.equal(sent[0].phone, '+12025550100'); assert.equal(sent[0].email, 'example@example.invalid'); assert.equal(sent[0].first_name, 'Fictional'); assert.equal(sent[0].gift_for, 'Family');
results.push('Normalized names, phone, optional email, source and metadata');
configure([{ error: null }]); await module.submitLead({ ...lead, email: '' }); assert.equal(sent[0].email, 'no-email+12025550100@astoryapp.invalid');
results.push('Optional email produces the reserved non-deliverable address');
for (const code of ['42703', 'PGRST204']) {
    configure([{ error: { code } }, { error: null }]); assert.deepEqual(await module.submitLead(lead), { ok: true, alreadyKnown: false });
    assert.deepEqual(Object.keys(sent[1]).sort(), ['email', 'first_name', 'last_name', 'phone']);
    assert.match(sent[1].phone, /Source: start:plan:family\+book/); assert.match(sent[1].phone, /Note: Fixture only/);
}
results.push('Both missing-column codes preserve legacy folded metadata without changing schema');
for (const replies of [[{ error: { code: '23505' } }], [{ error: { code: 'PGRST204' } }, { error: { code: '23505' } }]]) {
    configure(replies); assert.deepEqual(await module.submitLead(lead), { ok: true, alreadyKnown: true });
}
results.push('Known duplicates supported on initial and legacy attempts');
configure([new Error('Local simulated transport error')]); assert.equal((await module.submitLead(lead)).reason, 'failed');
globalThis.leadFixture.client = null; assert.equal((await module.submitLead(lead)).reason, 'unconfigured');
results.push('Transport failure and unavailable client return explicit unsupported results');
assert.equal(module.looksLikePhone('12'), false); assert.equal(module.looksLikeEmail('wrong@'), false); assert.equal(module.looksLikeEmail('qa@example.invalid'), true);
results.push('Email and phone validation helpers');
for (const [source, giftFor, subject] of [['start:hero:demo', '', 'demo'], ['start:hero', '', 'waitlist'], ['start:gift', 'Family', 'gift']]) {
    globalThis.leadFixture.client = null;
    const result = await module.submitLead({ ...lead, source, giftFor });
    assert.equal(result.ok, false);
    assert.match(result.fallbackMailto, new RegExp('subject=' + subject + '$'));
}
results.push('Fallback email preserves demonstration, waitlist and gift intent');
await fs.writeFile('qa/greenfield/lead-contracts.json', JSON.stringify(results, null, 2));
console.log(results);
