/**
 * Plan task 2a (docs/plans/2026-11-07-tester-report.md, criterion 5): no
 * control on /how-it-works promises something to watch or hear that the
 * page cannot play. Every link or button whose words say watch, see a
 * call, hear, listen or play must lead to a <video>/<audio> (or the film's
 * play button), and pressing it must start playback.
 *   node qa/tester-1107/promises.mjs [--base http://localhost:5311]
 * Uses installed Chrome when present (Chromium has no H.264).
 */
import { chromium } from 'playwright';

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : f; };
const base = arg('base', 'http://localhost:5311').replace(/\/$/, '');
let fails = 0;
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const PROMISE = /\b(watch|hear|listen|play)\b|see (a|the) (sample )?call/i;

let browser;
try { browser = await chromium.launch({ channel: 'chrome' }); } catch { browser = await chromium.launch(); }
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await page.goto(base + '/how-it-works', { waitUntil: 'networkidle' });
  const controls = await page.$$eval('main a, main button', (els, src) => {
    const re = new RegExp(src, 'i');
    return els
      .filter((e) => e.offsetParent !== null)
      .map((e) => ({ text: (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' '), href: e.getAttribute('href'), tag: e.tagName }))
      .filter((c) => re.test(c.text));
  }, PROMISE.source);
  ok(!controls.some((c) => /see (a|the) (sample )?call/i.test(c.text)), `${w}: no "See a sample call"`);
  for (const c of controls) {
    if (c.href && c.href.startsWith('#')) {
      const leads = await page.evaluate((id) => {
        const t = document.getElementById(id);
        return !!t && !!t.querySelector('video, audio, .film-facade');
      }, c.href.slice(1));
      ok(leads, `${w}: "${c.text}" (${c.href}) leads to something that plays`);
    } else if (c.tag === 'BUTTON') {
      ok(true, `${w}: button "${c.text}" (pressed below if it is the film)`);
    } else {
      ok(false, `${w}: "${c.text}" goes to ${c.href}; check it plays`);
    }
  }
  // The film: press play, and it plays.
  const facade = page.locator('.film-facade').first();
  if (await facade.count()) {
    await facade.scrollIntoViewIfNeeded();
    await facade.click();
    await page.waitForTimeout(2500);
    const t = await page.$eval('#film video', (v) => ({ t: v.currentTime, err: v.error && v.error.code })).catch(() => ({ t: 0, err: 'no video' }));
    ok(t.t > 0.5, `${w}: the film plays after one press (currentTime ${t.t.toFixed(2)}${t.err ? ', error ' + t.err : ''})`);
  }
}
await browser.close();
console.log(fails ? `${fails} failed` : 'all passed');
process.exit(fails ? 1 : 0);
