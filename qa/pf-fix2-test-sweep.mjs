/**
 * Phone-first fix 2, tester: overflow / overlap / console sweep over every
 * route in scripts/site-routes.mjs (pages, guides, static pages, private
 * routes) plus /get-the-app?for=someone, at 320/390/1440 x 100/150 % text.
 * Every off-site request is aborted (nothing reaches Supabase or the app).
 *
 *   node qa/serve-dist.mjs dist 5341
 *   node qa/pf-fix2-test-sweep.mjs --base http://localhost:5341
 */
import { chromium } from 'playwright';
import { routes, staticPages, privateRoutes } from '../scripts/site-routes.mjs';

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : f; };
const base = arg('base', 'http://localhost:5341').replace(/\/$/, '');
const list = [
  ...routes, ...staticPages,
  ...privateRoutes.map((r) => r.visit ?? r.path),
  '/get-the-app?for=someone',
];
const widths = [320, 390, 1440];
const browser = await chromium.launch();
const problems = [];
let runs = 0;
for (const path of list) {
  for (const w of widths) {
    for (const big of [false, true]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: w > 1000 ? 900 : 844 } });
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
      await page.route('**/*', (r) => (new URL(r.request().url()).hostname === 'localhost' ? r.continue() : r.abort()));
      try {
        await page.goto(base + path, { waitUntil: 'networkidle', timeout: 30000 });
      } catch (e) { errors.push('goto: ' + e.message.split('\n')[0]); }
      if (!page.url().startsWith(base)) { problems.push({ path, w, big, note: 'left site -> ' + page.url() }); await ctx.close(); continue; }
      await page.evaluate(() => document.fonts.ready);
      if (big) await page.evaluate(() => (document.documentElement.style.fontSize = '150%'));
      // reveal everything: scroll through, then back to top
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
        scrollTo(0, 0);
      });
      await page.waitForTimeout(600);
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const scrollW = document.documentElement.scrollWidth;
        const clipped = (el) => {
          for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
            const s = getComputedStyle(p);
            if (/(auto|scroll|hidden|clip)/.test(s.overflowX)) return true;
          }
          return false;
        };
        const visible = (el) => {
          if (el.closest('details:not([open])') && !el.closest('summary')) return false;
          if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true })) return false;
          const s = getComputedStyle(el);
          if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) === 0) return false;
          const b = el.getBoundingClientRect();
          return b.width > 1 && b.height > 1;
        };
        const label = (el) => (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '') + ' "' + (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 40) + '"');
        const over = [];
        for (const el of document.querySelectorAll('body *')) {
          if (!visible(el)) continue;
          const b = el.getBoundingClientRect();
          if ((b.right > vw + 1 || b.left < -1) && !clipped(el) && getComputedStyle(el).position !== 'fixed') over.push(label(el) + ` [${Math.round(b.left)},${Math.round(b.right)}]`);
          if (over.length > 5) break;
        }
        // overlap between interactive targets and between text blocks that are not nested
        const sel = 'a[href], button, input:not([type=hidden]), select, textarea, summary, h1, h2, h3, h4, p, li, label';
        const els = [...document.querySelectorAll(sel)].filter((el) => visible(el) && !el.closest('[aria-hidden="true"]') && !el.closest('dialog:not([open])'));
        const rects = els.map((el) => [el, el.getBoundingClientRect()]);
        const overlaps = [];
        for (let i = 0; i < rects.length; i++) {
          const [a, ra] = rects[i];
          if (getComputedStyle(a).position === 'fixed' || a.closest('header, [class*="Sticky"], [class*="sticky"]')) continue;
          for (let j = i + 1; j < rects.length; j++) {
            const [b, rb] = rects[j];
            if (a.contains(b) || b.contains(a)) continue;
            if (b.closest('header, [class*="Sticky"], [class*="sticky"]') || getComputedStyle(b).position === 'fixed') continue;
            const x = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
            const y = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
            if (x > 4 && y > 4) {
              const area = x * y, small = Math.min(ra.width * ra.height, rb.width * rb.height);
              if (area / small > 0.2) overlaps.push(label(a) + ' x ' + label(b) + ` (${Math.round(x)}x${Math.round(y)})`);
            }
          }
          if (overlaps.length > 5) break;
        }
        return { scrollW, vw, over, overlaps };
      });
      runs++;
      const errs = errors.filter((e) => !/net::ERR_FAILED|Failed to load resource/.test(e));
      if (r.scrollW > r.vw || r.over.length || r.overlaps.length || errs.length) problems.push({ path, w, big, ...r, errs });
      await ctx.close();
    }
  }
}
await browser.close();
console.log(`${runs} runs over ${list.length} addresses`);
for (const p of problems) console.log(JSON.stringify(p));
console.log(problems.length ? `${problems.length} runs with findings` : 'CLEAN');
