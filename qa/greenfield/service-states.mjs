import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from 'playwright';
const browser=await chromium.launch();const fixture='http://127.0.0.1:5181';const results=[];const check=async(name,fn)=>{try{await fn();results.push({name,passed:true});console.log('PASS',name);}catch(e){results.push({name,passed:false,error:e.message});console.log('FAIL',name,e.message);}};
// Every write below is fulfilled locally; these fixtures never call Supabase.
const safe = await browser.newContext({ viewport: { width: 393, height: 852 }, reducedMotion: 'reduce' });
const form = await safe.newPage();
let attempts = 0;
const sent = [];
await safe.route('**/qa-api/rest/v1/waitlist_signups*', async route => {
    sent.push(route.request().postDataJSON()); attempts++;
    await new Promise(resolve => setTimeout(resolve, 350));
    if (attempts === 1) return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ code: 'PGRST204', message: 'Fixture missing column' }) });
    if (attempts === 3) return route.fulfill({ status: 409, contentType: 'application/json', body: JSON.stringify({ code: '23505', message: 'Fixture duplicate' }) });
    if (attempts === 4) return route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ message: 'Fixture failure' }) });
    return route.fulfill({ status: 201, body: '' });
});
const fillLead = async () => { await form.getByLabel('Your name', { exact: true }).fill('Fictional QA'); await form.getByLabel('Phone number', { exact: true }).fill('+44 20 7946 0000'); };
await check('Lead pending, schema fallback, confirmed success, duplicate and failure/retry', async () => {
    await form.goto(fixture + '/start?plan=family%2Bbook'); await fillLead();
    await form.locator('main').getByRole('button', { name: 'Join the waitlist' }).click();
    await form.getByRole('button', { name: 'Sending…' }).waitFor();
    await form.getByRole('heading', { name: 'You’re on the list.' }).waitFor();
    assert.equal(attempts, 2);
    assert.match(JSON.stringify(sent), /start:plan:family\+book/);
    await form.reload(); await fillLead();
    await form.locator('main').getByRole('button', { name: 'Join the waitlist' }).click();
    await form.getByRole('heading', { name: 'You’re already on the list.' }).waitFor();
    await form.reload(); await fillLead();
    await form.locator('main').getByRole('button', { name: 'Join the waitlist' }).click();
    await form.getByRole('alert').filter({ hasText: 'Your request has not been saved' }).waitFor();
    assert.equal(await form.getByLabel('Your name', { exact: true }).inputValue(), 'Fictional QA');
    await form.locator('main').getByRole('button', { name: 'Join the waitlist' }).click();
    await form.getByRole('heading', { name: 'You’re on the list.' }).waitFor();
});
await check('Safe populated public story and contribution failure/retry', async () => {
    let contributions = 0;
    await safe.route('**/qa-api/rest/v1/rpc/submit_contribution', route => {
        contributions++;
        return route.fulfill({ status: contributions === 1 ? 503 : 200, contentType: 'application/json', body: contributions === 1 ? JSON.stringify({ message: 'Local simulated failure' }) : 'true' });
    });
    await form.goto(fixture + '/p/fixture');
    await form.getByRole('heading', { name: 'An afternoon at the lake' }).waitFor();
    assert.equal(await form.locator('header').count(), 0);
    await form.goto(fixture + '/contribute/fixture');
    await form.getByLabel('Your name', { exact: true }).fill('Fictional relative');
    await form.getByLabel('Your note', { exact: true }).fill('Synthetic local fixture contribution.');
    await form.getByRole('button', { name: 'Send to the family' }).click();
    await form.getByRole('alert').waitFor();
    assert.equal(await form.getByLabel('Your note', { exact: true }).inputValue(), 'Synthetic local fixture contribution.');
    await form.getByRole('button', { name: 'Send to the family' }).click();
    await form.getByRole('heading', { name: /thank|sent/i }).waitFor();
});

await safe.close();await browser.close();await fs.writeFile('qa/greenfield/service-states.json',JSON.stringify(results,null,2));if(results.some(x=>!x.passed))process.exitCode=1;