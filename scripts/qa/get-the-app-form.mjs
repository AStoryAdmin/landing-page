/**
 * /get-the-app form check (phone-first plan, 2026-11-04, AC2). Never sends a
 * real lead: every request to *.supabase.co is answered by this script.
 *
 *   # a bundle built with a stub Supabase URL, so leads.ts takes the insert path
 *   VITE_SUPABASE_URL=https://stub-project.supabase.co VITE_SUPABASE_ANON_KEY=stub \
 *     npx vite build --outDir <tmp>/dist-stub && npx vite preview --outDir <tmp>/dist-stub --port 5262
 *   node scripts/qa/get-the-app-form.mjs --stub http://127.0.0.1:5262 [--plain http://127.0.0.1:5261]
 *
 * --stub: validation, success (thank-you names the email; the row carries
 * source "get-the-app:iphone_invite"), the missing-column retry (folded line
 * carries the email), and an API failure (ready-written fallback email).
 * --plain: the real build with no Supabase configured shows the fallback.
 */
import { chromium } from 'playwright';

const arg = (n) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : null; };
const stub = arg('stub'), plain = arg('plain');
const results = [];
const check = (name, ok, detail = '') => { results.push(ok); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`); };

const browser = await chromium.launch();
const run = async (base, replies) => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const sent = [];
    await page.route(/supabase\.co/, async (route) => {
        const req = route.request();
        if (req.method() === 'POST' && /waitlist_signups/.test(req.url())) {
            sent.push(JSON.parse(req.postData() || 'null'));
            const r = replies.shift() ?? { status: 201, body: '' };
            return route.fulfill({ status: r.status, contentType: 'application/json', body: r.body });
        }
        return route.abort();
    });
    await page.goto(base + '/get-the-app/', { waitUntil: 'networkidle' });
    return { page, sent };
};
const fill = async (page, email, answer) => {
    await page.fill('input[name="email"]', email);
    await page.click(`label.chip:has(input[value="${answer}"])`);
};

if (stub) {
    let { page, sent } = await run(stub, []);
    await page.click('button[type="submit"]');
    const errs = await page.locator('.error').allInnerTexts();
    check('empty submit shows both errors, sends nothing', errs.length === 2 && sent.length === 0, JSON.stringify(errs));
    await fill(page, 'fixture@example.invalid', 'no');
    check('"No" shows the iPhone note', await page.locator('.when-no').isVisible());
    await page.click('button[type="submit"]');
    await page.waitForSelector('.done');
    const thanks = await page.locator('.done').innerText();
    check('thank-you names the email', /We’ll send your invite to fixture@example\.invalid/.test(thanks), JSON.stringify(thanks));
    const row = Array.isArray(sent[0]) ? sent[0][0] : sent[0];
    check('row: waitlist_signups, intent iphone_invite, email, answer', row && row.source === 'get-the-app:iphone_invite' && row.email === 'fixture@example.invalid' && row.note === 'Their iPhone: No', JSON.stringify(row));
    await page.close();

    ({ page, sent } = await run(stub, [{ status: 400, body: JSON.stringify({ code: 'PGRST204', message: 'missing column' }) }, { status: 201, body: '' }]));
    await fill(page, 'second@example.invalid', 'yes');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.done');
    const folded = Array.isArray(sent[1]) ? sent[1][0] : sent[1];
    check('missing-column retry folds the email (unique per person)', sent.length === 2 && /Email: second@example\.invalid/.test(folded?.phone ?? '') && /iphone_invite/.test(folded?.phone ?? ''), JSON.stringify(folded));
    await page.close();

    ({ page, sent } = await run(stub, [{ status: 500, body: JSON.stringify({ code: 'XX000', message: 'boom' }) }]));
    await fill(page, 'third@example.invalid', 'not-sure');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.fallback');
    const href = await page.locator('.fallback a').first().getAttribute('href');
    check('API failure shows the ready-written email', /^mailto:contact@astoryapp\.com\?subject=An%20invite/.test(href) && /third%40example\.invalid/.test(href), href);
    await page.close();
}
if (plain) {
    const { page, sent } = await run(plain, []);
    await fill(page, 'fixture@example.invalid', 'yes');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.fallback');
    check('unconfigured build shows the fallback, sends nothing', sent.length === 0);
    await page.close();
}
await browser.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} passed`);
process.exit(results.every(Boolean) ? 0 : 1);
