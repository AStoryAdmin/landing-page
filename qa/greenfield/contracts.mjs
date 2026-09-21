import fs from 'node:fs/promises';
import ts from 'typescript';
import assert from 'node:assert/strict';
const baseline = 'qa/mission-rebuild/baseline';
const results = [];
const moduleFrom = async path => import('data:text/javascript;base64,' + Buffer.from(ts.transpileModule(await fs.readFile(path, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText).toString('base64'));
for (const file of ['src/lib/pricing.ts', 'src/lib/product.ts', 'src/lib/checkout.ts']) {
    const before = await moduleFrom(`${baseline}/${file}`);
    const after = await moduleFrom(file);
    for (const key of Object.keys(before)) {
        if (typeof before[key] !== 'function') assert.deepEqual(after[key], before[key]);
        else if (key === 'checkoutFor' || key === 'buyLabel' || key === 'isCheckoutLive') for (const id of ['individual', 'family', 'express', 'individual+book', 'family+book', 'monthly', 'free', 'book', 'unknown']) assert.equal(after[key](id), before[key](id));
        else assert.equal(after[key](), before[key]());
    }
    results.push({ file, exportedFactsAndBehaviorUnchanged: true });
}
for (const file of ['package.json', 'package-lock.json']) {
    assert.equal(await fs.readFile(file, 'utf8'), await fs.readFile(`${baseline}/${file}`, 'utf8'));
    results.push({ file, bytesUnchanged: true });
}
await fs.writeFile('qa/greenfield/preserved-contracts.json', JSON.stringify(results, null, 2));
const checkout = await moduleFrom('src/lib/checkout.ts');
const outcomes = ['individual','family','express','individual+book','family+book','monthly','free','book','unknown'].map(id => {
    const row = { id, destination: checkout.checkoutFor(id), label: checkout.buyLabel(id, 'Buy this plan'), customFallback: checkout.buyLabel(id, 'Buy this plan', 'Ask about this plan'), live: checkout.isCheckoutLive(id) };
    assert.equal(row.destination, `/start?plan=${encodeURIComponent(id)}`);
    assert.equal(row.label, checkout.WAITLIST_LABEL);
    assert.equal(row.customFallback, 'Ask about this plan');
    assert.equal(row.live, false);
    return row;
});
assert.equal(checkout.DEMO_HREF, '/start?intent=demo');
await fs.writeFile('qa/greenfield/checkout-outcomes.json', JSON.stringify(outcomes, null, 2));
console.log(results);
