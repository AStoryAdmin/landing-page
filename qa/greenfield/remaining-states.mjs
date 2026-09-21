import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser = await chromium.launch();
const results = [];
for (const status of [200, 503]) for (const [path, endpoint, heading] of [
    ['/p/local-only', 'get_public_story', "This story isn't available."],
    ['/contribute/local-only', 'get_contribute_info', "This contribution link isn't available."],
]) {
    const page = await browser.newPage();
    await page.route('**/qa-api/rest/v1/rpc/' + endpoint, route => route.fulfill({ status, contentType: 'application/json', body: status === 200 ? 'null' : '{"message":"Local simulated failure"}' }));
    await page.goto('http://127.0.0.1:5181' + path);
    await page.getByRole('heading', { name: heading, exact: true }).waitFor();
    assert.equal(await page.locator('header, footer').count(), 0);
    assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
    results.push({ path, response: status, correctUnavailableState: true, standalone: true });
    await page.close();
}
const page = await browser.newPage({ viewport: { width: 393, height: 852 } });
await page.goto('http://127.0.0.1:5191/start?intent=demo');
await page.getByLabel('Your name', { exact: true }).fill('Fictional QA');
await page.getByLabel('Phone number', { exact: true }).fill('+1 202 555 0100');
await page.getByLabel(/Email/).fill('malformed@');
await page.getByRole('button', { name: 'Request a demo', exact: true }).click();
assert.equal(await page.getByLabel(/Email/).getAttribute('aria-invalid'), 'true');
assert.equal(await page.getByLabel(/Email/).evaluate(e => e === document.activeElement), true);
results.push({ malformedOptionalEmail: 'invalid; focused; entered values retained' });
await page.close();
const zoom = await browser.newContext({ viewport: { width: 720, height: 500 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
const z = await zoom.newPage();
for (const route of ['/', '/how-it-works', '/for-families', '/care-communities', '/organizations', '/pricing', '/our-story', '/questions', '/start']) {
    await z.goto('http://127.0.0.1:5191' + route); await z.locator('h1').waitFor();
    assert.equal(await z.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    results.push({ route, zoomEquivalent: '1440px display at 200%, 720 CSS px / deviceScaleFactor 2', overflow: false });
}
await z.screenshot({ path: 'qa/greenfield/screenshots/waitlist-200-percent-equivalent.png' });
await zoom.close();
await browser.close();
await fs.writeFile('qa/greenfield/remaining-states.json', JSON.stringify(results, null, 2));
console.log(results);
