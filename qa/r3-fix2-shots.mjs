/**
 * Round 3 fix 2 evidence (docs/premium/CHIEF-LOG.md "Round 3 fix 2").
 *
 *   node qa/r3-fix2-shots.mjs --label before|after [--base http://localhost:5207]
 *                             [--sweep] [--full]
 *
 * First-screen shots named in the brief's done-checks go to
 * qa/premium-2026-11/r3-fix2/<label>-<page>-<width>[-150].png, with a few
 * measurements printed as JSON (h1 top, the door links, the sticky bar over
 * the film). --full adds full-page shots at 390 and 1440 of the touched
 * pages, a full-page shot and a PDF of /care-communities. --sweep checks
 * horizontal overflow and tap targets under 44 px (24 px for inline text
 * links inside a sentence) at 320/390/1024/1440 x 100/150 % text.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const arg = (n, f) => {
  const i = process.argv.indexOf('--' + n);
  return i > -1 ? process.argv[i + 1] : f;
};
const flag = (n) => process.argv.includes('--' + n);
const base = arg('base', 'http://localhost:5207').replace(/\/$/, '');
const label = arg('label', 'after');
const out = join(dirname(fileURLToPath(import.meta.url)), 'premium-2026-11', 'r3-fix2');
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

async function open(path, width, height, big) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  if (big) {
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.style.fontSize = '150%';
      });
    });
  }
  await page.goto(base + path, { waitUntil: 'networkidle' });
  if (big) await page.evaluate(() => (document.documentElement.style.fontSize = '150%'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  return { ctx, page };
}

const report = {};
const first = [
  ['for-families', '/for-families/', 390, 844, false],
  ['pricing', '/pricing/', 390, 844, false],
  ['join', '/join/', 390, 844, false],
  ['join', '/join/', 1024, 768, true],
  ['care-communities', '/care-communities/', 390, 844, false],
  ['organizations', '/organizations/', 390, 844, false],
  ['how-it-works-film', '/how-it-works/#film', 390, 844, false],
  ['how-it-works', '/how-it-works/', 390, 844, false],
];
for (const [name, path, w, h, big] of first) {
  const { ctx, page } = await open(path, w, h, big);
  if (path.includes('#')) {
    await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), path.split('#')[1]);
    await page.waitForTimeout(900);
  }
  const file = `${label}-${name}-${w}${big ? '-150' : ''}.png`;
  await page.screenshot({ path: join(out, file) });
  report[file] = await page.evaluate(() => {
    const vh = innerHeight;
    const top = (el) => (el ? Math.round(el.getBoundingClientRect().top) : null);
    const vis = (el) => {
      if (!el) return false;
      const b = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return b.height > 0 && b.top < vh && b.bottom > 0 && s.visibility !== 'hidden' && s.display !== 'none';
    };
    const main = document.querySelector('main');
    const links = [...document.querySelectorAll('a')];
    const byText = (t) => links.find((a) => a.textContent.includes(t));
    const sticky = document.querySelector('[data-shown]');
    const film = document.querySelector('#film video, #film button, #film .player, #film figure');
    let overFilm = null;
    if (sticky && film) {
      const s = sticky.getBoundingClientRect();
      const f = film.getBoundingClientRect();
      const shown = sticky.getAttribute('data-shown') === 'true' && getComputedStyle(sticky).visibility !== 'hidden';
      overFilm = shown && s.top < f.bottom && s.bottom > f.top;
    }
    return {
      h1: top(main?.querySelector('h1')),
      h1Text: main?.querySelector('h1')?.textContent.trim().slice(0, 80),
      invited: vis([...document.querySelectorAll('header a')].find((a) => /Invited\?/.test(a.textContent))),
      gotLink: vis(byText('Got a link?')),
      asked: vis(byText('Start here')),
      reserve: vis([...main.querySelectorAll('a')].find((a) => /Reserve for \$1/.test(a.textContent))),
      stickyOverFilm: overFilm,
      stickyShown: sticky?.getAttribute('data-shown') ?? null,
    };
  });
  await ctx.close();
}

if (flag('full')) {
  const pages = ['/join/', '/how-it-works/', '/for-families/', '/pricing/', '/care-communities/', '/organizations/', '/questions/', '/your-story/'];
  for (const p of pages) {
    for (const [w, h] of [[390, 844], [1440, 900]]) {
      const { ctx, page } = await open(p, w, h, false);
      const name = p.replace(/\//g, '') || 'home';
      await page.screenshot({ path: join(out, `${label}-${name}-${w}-first.png`) });
      await page.screenshot({ path: join(out, `${label}-${name}-${w}-full.png`), fullPage: true });
      await ctx.close();
    }
  }
  /* The print check: a full-page capture without scrolling (the reveal
     observer never fires) and a PDF, with no empty bands. */
  const { ctx, page } = await open('/care-communities/', 1440, 900, false);
  await page.screenshot({ path: join(out, `${label}-care-communities-1440-noscroll-full.png`), fullPage: true });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: join(out, `${label}-care-communities-print.pdf`), format: 'Letter', printBackground: true });
  report.hiddenRiseAfterCapture = await page.evaluate(
    () => [...document.querySelectorAll('[data-rise],[data-lines],[data-print]')].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
  );
  await ctx.close();
  const o = await open('/organizations/', 1440, 900, false);
  await o.page.emulateMedia({ media: 'print' });
  await o.page.pdf({ path: join(out, `${label}-organizations-print.pdf`), format: 'Letter', printBackground: true });
  await o.ctx.close();
}

if (flag('sweep')) {
  const pages = ['/join/', '/how-it-works/', '/for-families/', '/pricing/', '/care-communities/', '/organizations/', '/questions/', '/your-story/'];
  const sweep = [];
  for (const p of pages) {
    for (const w of [320, 390, 1024, 1440]) {
      for (const big of [false, true]) {
        const { ctx, page } = await open(p, w, 900, big);
        const r = await page.evaluate(() => {
          const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
          const small = [];
          for (const el of document.querySelectorAll('main a, main button, main summary, header a, header button, footer a')) {
            const b = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            if (!b.width || !b.height || s.visibility === 'hidden') continue;
            /* an inline link inside running text is exempt (WCAG 2.5.8 inline exception) */
            const inline = s.display === 'inline' && el.parentElement && /P|LI|SPAN|SMALL|FIGCAPTION|DD/.test(el.parentElement.tagName) && el.parentElement.textContent.trim().length > el.textContent.trim().length + 2;
            if (inline) continue;
            if (b.height < 44 && b.width < 44 ? true : b.height < 24) small.push(`${el.tagName} "${el.textContent.trim().slice(0, 30)}" ${Math.round(b.width)}x${Math.round(b.height)}`);
            else if (b.height < 44 && !el.closest('nav[aria-label*="Footer" i], footer')) small.push(`${el.tagName} "${el.textContent.trim().slice(0, 30)}" ${Math.round(b.width)}x${Math.round(b.height)}`);
          }
          return { over, small: small.slice(0, 6), smallCount: small.length };
        });
        sweep.push({ p, w, big, ...r });
        await ctx.close();
      }
    }
  }
  report.sweep = sweep;
}

await browser.close();
console.log(JSON.stringify(report, null, 1));
