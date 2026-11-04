/**
 * Phone-first fix 2, tester: CLS (web-vitals session windows: 1 s gap, 5 s
 * cap, the largest window) on /, /pricing, /how-it-works, /get-the-app at 390
 * and 1440, motion on. Load + 3 s idle, then a slow scroll to the bottom.
 * Off-site requests aborted.
 *   node qa/pf-fix2-test-cls.mjs --base http://localhost:5341 [--shot dir]
 */
import { chromium } from 'playwright';

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : f; };
const base = arg('base', 'http://localhost:5341').replace(/\/$/, '');
const paths = ['/', '/pricing/', '/how-it-works/', '/get-the-app/'];
const browser = await chromium.launch();
let worst = 0;
for (const path of paths) {
  for (const w of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w > 1000 ? 900 : 844 } });
    await ctx.addInitScript(() => {
      window.__shifts = [];
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__shifts.push({ t: e.startTime, v: e.value, src: (e.sources || []).map((s) => s.node && (s.node.id || s.node.className || s.node.nodeName)).join('|').slice(0, 80) });
      }).observe({ type: 'layout-shift', buffered: true });
    });
    const page = await ctx.newPage();
    await page.route('**/*', (r) => (new URL(r.request().url()).hostname === 'localhost' ? r.continue() : r.abort()));
    await page.goto(base + path, { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    const load = await page.evaluate(() => window.__shifts.slice());
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    });
    await page.waitForTimeout(1000);
    const all = await page.evaluate(() => window.__shifts.slice());
    const cls = (list) => {
      let best = 0, cur = 0, start = 0, prev = -1e9;
      for (const s of list) {
        if (s.t - prev > 1000 || s.t - start > 5000) { cur = 0; start = s.t; }
        cur += s.v; prev = s.t; best = Math.max(best, cur);
      }
      return best;
    };
    const a = cls(load), b = cls(all);
    worst = Math.max(worst, b);
    const top = all.sort((x, y) => y.v - x.v).slice(0, 3).map((s) => `${s.v.toFixed(4)}@${Math.round(s.t)}ms ${s.src}`);
    console.log(`${b < 0.1 ? 'PASS' : 'FAIL'}  ${path} @${w}: CLS load ${a.toFixed(4)}, load+scroll ${b.toFixed(4)}  ${top.join(' ; ')}`);
    await ctx.close();
  }
}
await browser.close();
console.log('worst', worst.toFixed(4));
process.exit(worst < 0.1 ? 0 : 1);
