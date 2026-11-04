/**
 * Phone-first fix 1 evidence (docs/premium/CHIEF-LOG.md "Phone-first fix 1").
 *
 *   node qa/pf-fix1-shots.mjs --label before|after [--base http://localhost:5303]
 *                             [--full] [--sweep] [--form http://localhost:5304]
 *
 * First-screen shots at 390 go to qa/premium-2026-11/pf-fix1/<label>-<page>-390.png
 * with a few measurements (JSON). --full adds first-screen and full-page
 * shots of the touched pages at 390 and 1440. --sweep checks sideways
 * overflow and small tap targets at 320/390/1024/1440 x 100/150 % text.
 * --form <base> drives /get-the-app on a build made with a stub Supabase
 * env: every request to the stub host is intercepted (201 for
 * waitlist_signups), so nothing reaches a real service; it captures the
 * thank-you, and on the plain build (no env) the fallback state.
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
const base = arg('base', 'http://localhost:5303').replace(/\/$/, '');
const label = arg('label', 'after');
const out = join(dirname(fileURLToPath(import.meta.url)), 'premium-2026-11', 'pf-fix1');
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

async function open(url, width, height, big) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  /* Never reach a real backend from these shots. */
  await page.route(/supabase\.co|supabase\.stub\.test/, (r) => r.fulfill({ status: 503, body: '{}' }));
  if (big) {
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.style.fontSize = '150%';
      });
    });
  }
  await page.goto(url, { waitUntil: 'networkidle' });
  if (big) await page.evaluate(() => (document.documentElement.style.fontSize = '150%'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  return { ctx, page };
}

const report = {};
const first = [
  ['organizations', '/organizations/'],
  ['pricing', '/pricing/'],
  ['get-the-app', '/get-the-app/'],
  ['get-the-app-gift', '/get-the-app/?for=someone'],
  ['join', '/join/'],
  ['care-communities', '/care-communities/'],
];
for (const [name, path] of first) {
  const { ctx, page } = await open(base + path, 390, 844, false);
  const file = `${label}-${name}-390.png`;
  await page.screenshot({ path: join(out, file) });
  report[file] = await page.evaluate(() => {
    const vh = innerHeight;
    const main = document.querySelector('main');
    const vis = (el) => {
      if (!el) return false;
      const b = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return b.height > 0 && b.top < vh && b.bottom > 0 && s.visibility !== 'hidden' && s.display !== 'none';
    };
    const byText = (re) => [...main.querySelectorAll('a, p, legend')].find((a) => re.test(a.textContent));
    const top = (el) => (el ? Math.round(el.getBoundingClientRect().top) : null);
    const codeBox = main.querySelector('input[name="ref"]');
    const asked = byText(/^Asked to tell your story\? Start here/);
    return {
      careDoorInFirstScreen: vis(byText(/Senior living and memory care/)),
      ledgerThumbVisible: vis(main.querySelector('.cover img[src*="sample-raymond"]')),
      filmLinkVisible: vis([...main.querySelectorAll('a')].find((a) => /Watch the film/.test(a.textContent))),
      kicker: main.querySelector('.kicker')?.textContent.trim() ?? null,
      legend: main.querySelector('legend')?.textContent.trim() ?? null,
      giftNote: main.querySelector('.gift-note')?.textContent.trim() ?? null,
      doors: [...main.querySelectorAll('.doors li')].map((l) => l.textContent.trim()),
      codeBoxTop: top(codeBox),
      storytellerLineTop: top(asked),
      codeBeforeStoryteller: codeBox && asked ? top(codeBox) < top(asked) : null,
      headerButtonQuiet: document.querySelector('header .gf-button')?.hasAttribute('data-quiet') ?? null,
      sayLink: vis([...main.querySelectorAll('a')].find((a) => /What we can say today/.test(a.textContent))),
    };
  });
  await ctx.close();
}

if (flag('full')) {
  const pages = ['/', '/get-the-app/', '/get-the-app/?for=someone', '/join/', '/pricing/', '/organizations/', '/care-communities/', '/how-it-works/', '/our-story/'];
  report.heights = {};
  for (const p of pages) {
    for (const [w, h] of [[390, 844], [1440, 900]]) {
      const { ctx, page } = await open(base + p, w, h, false);
      const name = p.replace(/\?for=someone/, '-gift').replace(/\//g, '') || 'home';
      await page.screenshot({ path: join(out, `${label}-${name}-${w}-first.png`) });
      await page.screenshot({ path: join(out, `${label}-${name}-${w}-full.png`), fullPage: true });
      report.heights[`${name}@${w}`] = await page.evaluate(() => ({
        page: document.documentElement.scrollHeight,
        marks: !!document.querySelector('footer .footer-credential'),
        trademark: !!document.querySelector('footer .footer-trademark'),
      }));
      await ctx.close();
    }
  }
}

if (flag('sweep')) {
  const pages = ['/', '/get-the-app/', '/get-the-app/?for=someone', '/join/', '/pricing/', '/organizations/', '/care-communities/', '/how-it-works/'];
  const sweep = [];
  for (const p of pages) {
    for (const w of [320, 390, 1024, 1440]) {
      for (const big of [false, true]) {
        const { ctx, page } = await open(base + p, w, 900, big);
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
            else if (b.height < 44 && !el.closest('footer')) small.push(`${el.tagName} "${el.textContent.trim().slice(0, 30)}" ${Math.round(b.width)}x${Math.round(b.height)}`);
          }
          return { over, small: small.slice(0, 6), smallCount: small.length };
        });
        sweep.push({ p, w, big, ...r });
        await ctx.close();
      }
    }
  }
  report.sweepFailures = sweep.filter((s) => s.over > 0 || s.smallCount > 0);
  report.sweepRuns = sweep.length;
}

const form = arg('form', '');
if (form) {
  /* (a) The real thank-you, on the stub-env build: the insert is answered
     201 here; every other stub request 404s. */
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const hits = [];
    await page.route('**/*', (r) => {
      const u = r.request().url();
      if (/supabase\.co/.test(u)) return r.abort();
      if (!/supabase\.stub\.test/.test(u)) return r.continue();
      hits.push(`${r.request().method()} ${new URL(u).pathname}`);
      if (/\/rest\/v1\/waitlist_signups/.test(u)) {
        return r.fulfill({
          status: 201,
          headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' },
          body: '',
        });
      }
      return r.fulfill({ status: 404, headers: { 'access-control-allow-origin': '*' }, body: '{}' });
    });
    await page.goto(form + '/get-the-app?for=someone', { waitUntil: 'networkidle' });
    await page.fill('input[name="email"]', 'qa-stub@example.test');
    await page.check('input[name="iphone"][value="yes"]', { force: true });
    await page.click('button[type="submit"]');
    await page.waitForSelector('.done h2', { timeout: 8000 });
    const sheet = page.locator('.sheet');
    await sheet.scrollIntoViewIfNeeded();
    await page.screenshot({ path: join(out, `form-thank-you-${w}.png`) });
    report[`thankYou@${w}`] = { text: (await sheet.innerText()).replace(/\s+/g, ' ').trim(), stubRequests: hits };
    await ctx.close();
  }
  /* (b) The fallback state on the plain build (no Supabase env:
     lib/leads.ts returns reason "unconfigured", no request is made). */
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const out2 = [];
    page.on('request', (r) => { if (!r.url().startsWith(base)) out2.push(r.url()); });
    await page.goto(base + '/get-the-app/', { waitUntil: 'networkidle' });
    await page.fill('input[name="email"]', 'qa-stub@example.test');
    await page.check('input[name="iphone"][value="not-sure"]', { force: true });
    await page.click('button[type="submit"]');
    await page.waitForSelector('.fallback h2', { timeout: 8000 });
    await page.locator('.sheet').scrollIntoViewIfNeeded();
    await page.screenshot({ path: join(out, `form-fallback-${w}.png`) });
    report[`fallback@${w}`] = {
      text: (await page.locator('.sheet').innerText()).replace(/\s+/g, ' ').trim(),
      mailto: await page.locator('.fallback a').first().getAttribute('href'),
      offSiteRequests: out2.filter((u) => !/fonts\.g/.test(u)),
    };
    await ctx.close();
  }
}

await browser.close();
console.log(JSON.stringify(report, null, 1));
