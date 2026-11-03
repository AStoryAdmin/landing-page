/**
 * Navigation and footer checks (premium pass, design spec Checks 1.1-1.3).
 *
 *   npm run build:static && npx vite preview --port 5201 --strictPort
 *   node scripts/nav-count.mjs [--base http://localhost:5201] [--pages /pricing/,/organizations/]
 *                              [--shots qa/premium-2026-11/after] [--no-footer]
 *
 * 1.1 desktop bar at 1440, 1280, 1180 (the bar starts at 1180, spec fallback
 *     S20; at 1179 and 1024 the drawer's Menu button shows instead): 4 links +
 *     1 menu button + Sign in + exactly 1 .gf-button, no label wrapping, no
 *     "More"; the chevron ≥ 14px and the button's arrow ≥ 16px wide (nothing
 *     crushed); the right gutter matches the left (±2px); the org panel has 3
 *     rows (2 on the org pages, no "Book a demo"); hover-then-click keeps it
 *     open; Esc closes it and focus is on the trigger.
 * 1.2 drawer at 390 (and 320 for wrapping): no duplicate labels, no "More",
 *     nesting depth ≤ 2, quiet links ≥ 44px tall; screenshots.
 * 1.3 footer at 1440: every public route reachable from the footer or the
 *     bar, no href twice in the footer; at 390 the footer ≤ 1.3 screens with
 *     both folds closed.
 *
 * Prints one line per check and exits 1 if any fails.
 */
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { pages as sitePages } from './site-routes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, fallback) => {
    const i = process.argv.indexOf('--' + name);
    return i > -1 ? process.argv[i + 1] : fallback;
};
const base = arg('base', 'http://localhost:5201').replace(/\/$/, '');
const navPages = arg('pages', '/pricing/,/organizations/,/care-communities/').split(',');
const shots = arg('shots', join(root, '..', 'a-story-landing-premium', 'qa', 'premium-2026-11', 'after'));
const doFooter = !process.argv.includes('--no-footer');
mkdirSync(shots, { recursive: true });

const results = [];
const check = (name, ok, detail = '') => {
    results.push({ name, ok, detail });
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`);
};
const isOrg = (p) => /^\/(organizations|care-communities)\/?$/.test(p);

const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
const page = await ctx.newPage();
const open = async (path, width, height) => {
    await page.setViewportSize({ width, height });
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
};

/* ---- 1.1 desktop bar ---------------------------------------------------- */
for (const path of navPages) {
    /* Below the bar's breakpoint the drawer's Menu button takes over. */
    for (const width of [1179, 1024]) {
        await open(path, width, 900);
        const narrow = await page.evaluate(() => {
            const shown = (s) => { const e = document.querySelector(s); return !!e && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden'; };
            return { menu: shown('.gf-menu-toggle'), links: shown('.gf-nav-links'), overflow: document.documentElement.scrollWidth > innerWidth };
        });
        check(`1.1 ${path} @${width} drawer mode (Menu shown, links hidden, no overflow)`, narrow.menu && !narrow.links && !narrow.overflow, JSON.stringify(narrow));
    }
    for (const width of [1440, 1280, 1180]) {
        await open(path, width, 900);
        const bar = await page.evaluate(() => {
            const nav = document.querySelector('nav#site-navigation');
            const panel = nav.querySelector('#org-panel');
            const visible = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
            const items = [...nav.querySelectorAll('a,button')].filter(
                (el) => visible(el) && !(panel && panel.contains(el)),
            );
            return {
                links: items.filter((el) => el.tagName === 'A' && !el.classList.contains('gf-button') && !el.classList.contains('gf-signin')).map((el) => el.textContent.trim()),
                buttons: items.filter((el) => el.tagName === 'BUTTON').map((el) => el.textContent.trim()),
                signIn: items.filter((el) => el.classList.contains('gf-signin')).length,
                primary: items.filter((el) => el.classList.contains('gf-button')).map((el) => el.textContent.trim()),
                wrapped: items.filter((el) => {
                    /* A label that wraps has text on more than one line. */
                    const label = el.querySelector('strong') ?? el;
                    const tops = [];
                    const walk = document.createTreeWalker(label, NodeFilter.SHOW_TEXT);
                    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
                        if (!n.textContent.trim()) continue;
                        const r = document.createRange();
                        r.selectNodeContents(n);
                        for (const x of r.getClientRects()) if (x.width > 0) tops.push(x.top);
                    }
                    const lines = tops.filter((t, i) => tops.findIndex((u) => Math.abs(u - t) < 6) === i);
                    return el.getClientRects().length !== 1 || lines.length > 1;
                }).map((el) => el.innerText.trim()),
                more: [...document.querySelectorAll('header *')].some((el) => el.childElementCount === 0 && el.textContent.trim() === 'More'),
                chevron: nav.querySelector('.org-toggle .org-chevron')?.getBoundingClientRect().width ?? 0,
                arrow: document.querySelector('header .gf-button svg')?.getBoundingClientRect().width ?? null,
                gutters: (() => {
                    const logo = document.querySelector('.gf-nav-inner > span').getBoundingClientRect();
                    const ends = [...document.querySelectorAll('.gf-nav-inner *')].filter((e) => e.getClientRects().length && !(panel && panel.contains(e))).map((e) => e.getBoundingClientRect().right);
                    return { left: Math.round(logo.left), right: Math.round(innerWidth - Math.max(...ends)) };
                })(),
            };
        });
        const tag = `1.1 ${path} @${width}`;
        check(`${tag} 4 links`, bar.links.length === 4, JSON.stringify(bar.links));
        check(`${tag} 1 menu button`, bar.buttons.length === 1, JSON.stringify(bar.buttons));
        check(`${tag} Sign in`, bar.signIn === 1);
        check(`${tag} 1 .gf-button`, bar.primary.length === 1, JSON.stringify(bar.primary));
        check(`${tag} nothing wraps`, bar.wrapped.length === 0, JSON.stringify(bar.wrapped));
        check(`${tag} no "More"`, !bar.more);
        check(`${tag} chevron ≥ 14px`, bar.chevron >= 14, `${bar.chevron}px`);
        check(`${tag} button arrow ≥ 16px`, bar.arrow === null || bar.arrow >= 16, `${bar.arrow}px`);
        check(`${tag} right gutter = left gutter`, Math.abs(bar.gutters.left - bar.gutters.right) <= 2, JSON.stringify(bar.gutters));
        if (isOrg(path)) check(`${tag} button reads Book a demo`, bar.primary[0] === 'Book a demo', bar.primary[0]);
        else check(`${tag} button reads Start free`, bar.primary[0] === 'Start free', bar.primary[0]);

        if (width !== 1440) continue;
        /* The panel: click open, count rows. */
        const trigger = page.locator('nav#site-navigation .org-toggle');
        await trigger.click();
        await page.waitForTimeout(250);
        const rows = await page.$$eval('#org-panel a', (as) => as.filter((a) => a.getClientRects().length).map((a) => a.querySelector('strong')?.textContent.trim()));
        const want = isOrg(path) ? 2 : 3;
        check(`${tag} panel has ${want} rows`, rows.length === want, JSON.stringify(rows));
        check(`${tag} Book a demo row ${isOrg(path) ? 'absent' : 'present'}`, rows.includes('Book a demo') === !isOrg(path));
        await page.screenshot({ path: join(shots, `nav-panel-${path.replace(/\//g, '') || 'home'}-1440.png`), clip: { x: 0, y: 0, width: 1440, height: 420 } });
        /* Esc closes and returns focus to the trigger. */
        await page.keyboard.press('Escape');
        await page.waitForTimeout(100);
        const afterEsc = await page.evaluate(() => ({
            hidden: document.querySelector('#org-panel').hidden,
            focus: document.activeElement?.classList.contains('org-toggle'),
        }));
        check(`${tag} Esc closes, focus on trigger`, afterEsc.hidden && afterEsc.focus, JSON.stringify(afterEsc));
        /* Hover opens; a click on the hover-opened panel keeps it open (S21). */
        await page.mouse.move(5, 5);
        await trigger.hover();
        await page.waitForTimeout(200);
        const hoverOpen = await page.evaluate(() => !document.querySelector('#org-panel').hidden);
        await trigger.click();
        await page.waitForTimeout(150);
        const stillOpen = await page.evaluate(() => !document.querySelector('#org-panel').hidden);
        check(`${tag} hover opens, click keeps open`, hoverOpen && stillOpen, JSON.stringify({ hoverOpen, stillOpen }));
        await trigger.click();
        await page.waitForTimeout(100);
        const closed = await page.evaluate(() => document.querySelector('#org-panel').hidden);
        check(`${tag} second click closes`, closed);
        /* The trigger reads as active on the org pages. */
        const active = await trigger.getAttribute('aria-current');
        check(`${tag} trigger active ${isOrg(path) ? 'on' : 'off'}`, (active === 'true') === isOrg(path));
    }
}

/* ---- 1.2 drawer --------------------------------------------------------- */
for (const path of navPages) {
    for (const width of [390, 320]) {
        await open(path, width, 844);
        const slug = path.replace(/\//g, '') || 'home';
        await page.click('.gf-menu-toggle');
        await page.waitForTimeout(400);
        const orgOpen = await page.getAttribute('.org-toggle', 'aria-expanded');
        check(`1.2 ${path} @${width} disclosure ${isOrg(path) ? 'open' : 'closed'} by default`, (orgOpen === 'true') === isOrg(path));
        if (width === 390 && slug === 'pricing') await page.screenshot({ path: join(shots, 'nav-drawer-390.png') });
        if (orgOpen !== 'true') await page.click('.org-toggle');
        await page.waitForTimeout(300);
        if (width === 390 && slug === 'pricing') await page.screenshot({ path: join(shots, 'nav-drawer-390-open.png') });
        if (width === 390 && slug === 'organizations') await page.screenshot({ path: join(shots, 'nav-drawer-org-390.png') });
        const drawer = await page.evaluate(() => {
            const nav = document.querySelector('#site-navigation');
            const visible = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
            const items = [...nav.querySelectorAll('a,button')].filter(visible);
            const panels = [...nav.querySelectorAll('[aria-controls]')].map((b) => document.getElementById(b.getAttribute('aria-controls'))).filter(Boolean);
            const depth = (el) => 1 + panels.filter((p) => p.contains(el)).length;
            const wraps = (el) => {
                const label = el.querySelector('strong') ?? el;
                const tops = [];
                const walk = document.createTreeWalker(label, NodeFilter.SHOW_TEXT);
                for (let n = walk.nextNode(); n; n = walk.nextNode()) {
                    if (!n.textContent.trim()) continue;
                    const r = document.createRange();
                    r.selectNodeContents(n);
                    for (const x of r.getClientRects()) if (x.width > 0) tops.push(x.top);
                }
                return tops.filter((t, i) => tops.findIndex((u) => Math.abs(u - t) < 6) === i).length > 1;
            };
            return {
                labels: items.map((el) => el.innerText.trim()),
                maxDepth: Math.max(...items.map(depth)),
                wrapped: items.filter(wraps).map((el) => el.innerText.trim()),
                shortMuted: [...nav.querySelectorAll('.gf-nav-muted a')].filter((a) => a.getBoundingClientRect().height < 44).map((a) => a.textContent.trim()),
                overflow: document.documentElement.scrollWidth > innerWidth,
            };
        });
        const dups = drawer.labels.filter((l, i, a) => a.indexOf(l) !== i);
        const tag = `1.2 ${path} @${width}`;
        check(`${tag} no duplicates`, dups.length === 0, JSON.stringify(dups));
        check(`${tag} no "More"`, !drawer.labels.includes('More'));
        check(`${tag} depth ≤ 2`, drawer.maxDepth <= 2, String(drawer.maxDepth));
        check(`${tag} Book a demo exactly once`, drawer.labels.filter((l) => l === 'Book a demo').length === 1);
        check(`${tag} no label wraps`, drawer.wrapped.length === 0, JSON.stringify(drawer.wrapped));
        check(`${tag} quiet links ≥ 44px`, drawer.shortMuted.length === 0, JSON.stringify(drawer.shortMuted));
        if (width === 390) console.log('      drawer:', drawer.labels.join(' | '));
    }
}

/* ---- 1.3 footer --------------------------------------------------------- */
if (doFooter) {
    await open('/pricing/', 1440, 900);
    const f = await page.evaluate(() => {
        const visible = (el) => el.getClientRects().length > 0;
        const norm = (h) => new URL(h, location.href).pathname.replace(/(.)\/$/, '$1');
        /* The wordmark's link home is not a page link. */
        const footer = [...document.querySelectorAll('footer a[href]')].filter(visible).map((a) => a.getAttribute('href')).filter((h) => h !== '/');
        const bar = [...document.querySelectorAll('header a[href]')].map((a) => a.getAttribute('href'));
        return {
            footer,
            reach: [...new Set([...footer, ...bar].filter((h) => h.startsWith('/')).map(norm))],
        };
    });
    const dupHrefs = f.footer.filter((h, i, a) => a.indexOf(h) !== i);
    check('1.3 no href twice in footer @1440', dupHrefs.length === 0, JSON.stringify(dupHrefs));
    const wanted = [...sitePages.map((p) => p.path), '/samples'].filter((p) => !['/', '/reserve', '/start'].includes(p));
    const missing = wanted.filter((p) => !f.reach.includes(p));
    check(`1.3 ${wanted.length} routes reachable from footer or bar`, missing.length === 0, JSON.stringify(missing));
    check('1.3 footer page links = 16 + 1 email', f.footer.filter((h) => h.startsWith('/')).length === 16 && f.footer.filter((h) => h.startsWith('mailto:')).length === 1, String(f.footer.length));
    await open('/pricing/', 390, 844);
    const h = await page.evaluate(() => document.querySelector('footer').getBoundingClientRect().height);
    check('1.3 footer ≤ 1.3 screens @390 (folds closed)', h <= 1.3 * 844, `${Math.round(h)}px = ${(h / 844).toFixed(2)} screens`);
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
