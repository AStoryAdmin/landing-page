/**
 * Plan task 4c (docs/plans/2026-11-07-tester-report.md, criterion 9): the
 * /how-it-works film is v5.7, plays from one press, runs to its end
 * ("Watch again" appears), its length matches the "49" the page states,
 * and the captions are the v5.7 timings.
 *   node qa/tester-1107/film.mjs [--base http://localhost:5313]
 * Uses installed Chrome (Chromium has no H.264).
 */
import { chromium } from 'playwright';

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : f; };
const base = arg('base', 'http://localhost:5313').replace(/\/$/, '');
let fails = 0;
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

let browser;
try { browser = await chromium.launch({ channel: 'chrome' }); } catch { browser = await chromium.launch(); }
for (const [w, h, file] of [[1440, 900, 'a-story-film-'], [390, 844, 'a-story-film-v-']]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 600 ? 2 : 1 })).newPage();
  await page.goto(base + '/how-it-works', { waitUntil: 'networkidle' });
  const stated = await page.$eval('#film', (s) => (s.textContent.match(/(\d+)-second film/) || [])[1]);
  await page.locator('.film-facade').click();
  await page.waitForTimeout(2000);
  const v = await page.$eval('#film video', (v) => ({ src: v.currentSrc, d: v.duration, t: v.currentTime }));
  ok(v.t > 0.5, `${w}: plays after one press (t=${v.t.toFixed(2)})`);
  ok(v.src.includes(file), `${w}: serves ${v.src.split('/').pop()}`);
  // v5.6 byte sizes: a served file of exactly that size is still the old cut.
  const V56 = [7743270, 5266797, 7732566, 5256251];
  const size = await page.evaluate(async (u) => Number((await fetch(u, { method: 'HEAD' })).headers.get('content-length')), v.src);
  ok(size > 0 && !V56.includes(size), `${w}: not the v5.6 file (${size} bytes)`);
  ok(v.d > 48.9 && v.d <= 49.45, `${w}: duration ${v.d.toFixed(3)} s (≤ 49.4)`);
  ok(Number(stated) === Math.floor(v.d), `${w}: the page says ${stated}-second, the file is ${v.d.toFixed(1)} s`);
  await page.$eval('#film video', (v) => { v.currentTime = v.duration - 1.5; });
  await page.waitForTimeout(3500);
  ok(await page.locator('#film').getByText(/watch again/i).isVisible(), `${w}: runs to the end and offers Watch again`);
  const cue = await page.evaluate(async () => (await (await fetch('/film/a-story-film.en.vtt')).text()));
  ok(/00:00:10\.950 --> 00:00:12\.096\nA Story calls her\./.test(cue.replace(/\r/g, '')), `${w}: captions carry the v5.7 timing for "A Story calls her."`);
}
await browser.close();
console.log(fails ? `${fails} failed` : 'all passed');
process.exit(fails ? 1 : 0);
