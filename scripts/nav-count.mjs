/**
 * Navigation and footer checks (premium pass, design spec Checks 1.1-1.3;
 * rule rewritten for the phone-first plan, 2026-11-04: "Make it only 3-4
 * tab").
 *
 *   npm run build:static && npx vite preview --port 5201 --strictPort
 *   node scripts/nav-count.mjs [--base http://localhost:5201] [--pages /,/pricing/,/organizations/]
 *                              [--shots qa/premium-2026-11/after] [--no-footer]
 *
 * The rule: 4 tabs + Sign in + 1 button, the same in the laptop bar and the
 * phone drawer.
 *
 * 1.1 bar at 1440, 1280, 1180 (at 1179 and 1024 the drawer's Menu button
 *     shows instead): exactly the 4 tab links How it works, Sample books,
 *     Pricing, For organizations (-> /organizations), in that order; no
 *     other button, no menu, no "Invited?" door, no "More"; exactly one
 *     Sign in and one .gf-button, which reads "Get the iPhone app" and goes
 *     to /get-the-app (on the two org pages "Book a demo" -> #book); no
 *     label wraps; the button's arrow >= 16px; the right gutter matches the
 *     left (+-2px); "For organizations" reads as current on both org pages.
 * 1.2 drawer at 390 and 320: exactly the same 4 tabs, Sign in and the one
 *     button, nothing else, no duplicate labels, nothing nested, no label
 *     wraps, every row >= 44px tall, the 4 tabs in one font size;
 *     screenshots at 390.
 * 1.3 footer at 1440: every public route reachable from the footer or the
 *     bar, no href twice in the footer, 19 page links + 1 email, including
 *     "Privacy, in short" (/privacy/#legal-short), "Asked to tell your
 *     story?" (/how-it-works#being-asked) and "Get the iPhone app"
 *     (/get-the-app); no link to the web app's create-account page in the
 *     header or footer; at 390 the footer <= 1.3 screens with both folds
 *     closed.
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
const navPages = arg('pages', '/,/pricing/,/get-the-app/,/organizations/,/care-communities/').split(',');
const shots = arg('shots', join(root, '..', 'a-story-landing-premium', 'qa', 'premium-2026-11', 'after'));
const doFooter = !process.argv.includes('--no-footer');
mkdirSync(shots, { recursive: true });

const TABS = [
    ['How it works', '/how-it-works'],
    ['Sample books', '/samples'],
    ['Pricing', '/pricing'],
    ['For organizations', '/organizations'],
];
const BUTTON = ['Get the iPhone app', '/get-the-app'];

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

/* Shared by 1.1 and 1.2: what the header's nav shows right now. */
const readNav = () =>
    page.evaluate(() => {
        const nav = document.querySelector('nav#site-navigation');
        const visible = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
        const items = [...nav.querySelectorAll('a,button')].filter(visible);
        const lines = (el) => {
            const tops = [];
            const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            for (let n = walk.nextNode(); n; n = walk.nextNode()) {
                if (!n.textContent.trim()) continue;
                const r = document.createRange();
                r.selectNodeContents(n);
                for (const x of r.getClientRects()) if (x.width > 0) tops.push(x.top);
            }
            return tops.filter((t, i) => tops.findIndex((u) => Math.abs(u - t) < 6) === i).length;
        };
        const tabs = [...nav.querySelectorAll('.gf-nav-links > a')].filter(visible);
        return {
            all: items.map((el) => el.innerText.trim()),
            tabs: tabs.map((a) => ({ label: a.innerText.trim(), href: a.getAttribute('href'), current: a.getAttribute('aria-current'), size: getComputedStyle(a).fontSize, h: a.getBoundingClientRect().height })),
            buttons: items.filter((el) => el.tagName === 'BUTTON').map((el) => el.innerText.trim()),
            others: items.filter((el) => el.tagName === 'A' && !el.closest('.gf-nav-links') && !el.classList.contains('gf-button') && !el.classList.contains('gf-signin')).map((el) => el.innerText.trim()),
            signIn: items.filter((el) => el.classList.contains('gf-signin')).length,
            primary: items.filter((el) => el.classList.contains('gf-button')).map((el) => ({ label: el.innerText.trim(), href: el.getAttribute('href') })),
            door: document.querySelectorAll('header .gf-door, header .gf-bar-door, header .org-panel, header .org-toggle').length,
            wrapped: items.filter((el) => el.getClientRects().length !== 1 || lines(el) > 1).map((el) => el.innerText.trim()),
            short: items.filter((el) => el.getBoundingClientRect().height < 44).map((el) => el.innerText.trim()),
            more: [...document.querySelectorAll('header *')].some((el) => el.childElementCount === 0 && el.textContent.trim() === 'More'),
            arrow: document.querySelector('header .gf-button svg')?.getBoundingClientRect().width ?? null,
            overflow: document.documentElement.scrollWidth > innerWidth,
        };
    });

/* ---- 1.1 the bar ------------------------------------------------------- */
for (const path of navPages) {
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
        const bar = await readNav();
        const gutters = await page.evaluate(() => {
            const logo = document.querySelector('.gf-nav-inner > span').getBoundingClientRect();
            const ends = [...document.querySelectorAll('.gf-nav-inner *')].filter((e) => e.getClientRects().length).map((e) => e.getBoundingClientRect().right);
            return { left: Math.round(logo.left), right: Math.round(innerWidth - Math.max(...ends)) };
        });
        const tag = `1.1 ${path} @${width}`;
        check(`${tag} exactly the 4 tabs, in order`, JSON.stringify(bar.tabs.map((t) => [t.label, t.href])) === JSON.stringify(TABS), JSON.stringify(bar.tabs.map((t) => t.label)));
        check(`${tag} no other link or button in the bar`, bar.buttons.length === 0 && bar.others.length === 0 && bar.door === 0, JSON.stringify({ buttons: bar.buttons, others: bar.others, door: bar.door }));
        check(`${tag} Sign in`, bar.signIn === 1);
        check(`${tag} 1 .gf-button`, bar.primary.length === 1, JSON.stringify(bar.primary));
        if (isOrg(path)) check(`${tag} button reads Book a demo`, bar.primary[0]?.label === 'Book a demo', JSON.stringify(bar.primary[0]));
        else check(`${tag} button reads ${BUTTON[0]} -> ${BUTTON[1]}`, bar.primary[0]?.label === BUTTON[0] && bar.primary[0]?.href === BUTTON[1], JSON.stringify(bar.primary[0]));
        check(`${tag} nothing wraps`, bar.wrapped.length === 0, JSON.stringify(bar.wrapped));
        check(`${tag} no "More"`, !bar.more);
        check(`${tag} button arrow >= 16px`, bar.arrow === null || bar.arrow >= 16, `${bar.arrow}px`);
        check(`${tag} right gutter = left gutter`, Math.abs(gutters.left - gutters.right) <= 2, JSON.stringify(gutters));
        check(`${tag} no horizontal overflow`, !bar.overflow);
        const orgTab = bar.tabs.find((t) => t.label === 'For organizations');
        check(`${tag} For organizations current ${isOrg(path) ? 'on' : 'off'}`, (orgTab?.current === 'page') === isOrg(path), String(orgTab?.current));
        if (width === 1440) await page.screenshot({ path: join(shots, `nav-bar-${path.replace(/\//g, '') || 'home'}-1440.png`), clip: { x: 0, y: 0, width: 1440, height: 120 } });
    }
}

/* ---- 1.2 the drawer ---------------------------------------------------- */
for (const path of navPages) {
    for (const width of [390, 320]) {
        await open(path, width, 844);
        const slug = path.replace(/\//g, '') || 'home';
        await page.click('.gf-menu-toggle');
        await page.waitForTimeout(400);
        if (width === 390) await page.screenshot({ path: join(shots, `nav-drawer-${slug}-390.png`) });
        const d = await readNav();
        const nested = await page.evaluate(() => document.querySelectorAll('#site-navigation [aria-controls], #site-navigation [hidden]').length);
        const tag = `1.2 ${path} @${width}`;
        const want = [...TABS.map((t) => t[0]), 'Sign in', isOrg(path) ? 'Book a demo' : BUTTON[0]];
        check(`${tag} exactly 4 tabs + Sign in + 1 button`, JSON.stringify(d.all) === JSON.stringify(want), JSON.stringify(d.all));
        check(`${tag} no duplicates`, new Set(d.all).size === d.all.length);
        check(`${tag} nothing nested`, nested === 0, String(nested));
        check(`${tag} no label wraps`, d.wrapped.length === 0, JSON.stringify(d.wrapped));
        check(`${tag} every row >= 44px`, d.short.length === 0, JSON.stringify(d.short));
        check(`${tag} tabs in one size`, new Set(d.tabs.map((t) => t.size)).size === 1, JSON.stringify([...new Set(d.tabs.map((t) => t.size))]));
        check(`${tag} no horizontal overflow`, !d.overflow);
        if (width === 390) console.log('      drawer:', d.all.join(' | '));
    }
}

/* ---- 1.3 footer -------------------------------------------------------- */
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
            chrome: [...footer, ...bar],
            reach: [...new Set([...footer, ...bar].filter((h) => h.startsWith('/')).map(norm))],
        };
    });
    const dupHrefs = f.footer.filter((h, i, a) => a.indexOf(h) !== i);
    check('1.3 no href twice in footer @1440', dupHrefs.length === 0, JSON.stringify(dupHrefs));
    const wanted = [...sitePages.map((p) => p.path), '/samples'].filter((p) => !['/', '/reserve', '/start'].includes(p));
    const missing = wanted.filter((p) => !f.reach.includes(p));
    check(`1.3 ${wanted.length} routes reachable from footer or bar`, missing.length === 0, JSON.stringify(missing));
    check('1.3 footer has Privacy, in short', f.footer.includes('/privacy/#legal-short'));
    check('1.3 footer has Get the iPhone app', f.footer.includes('/get-the-app'));
    check('1.3 footer page links = 19 + 1 email', f.footer.filter((h) => h.startsWith('/')).length === 19 && f.footer.filter((h) => h.startsWith('mailto:')).length === 1 && f.footer.includes('/how-it-works#being-asked'), String(f.footer.length));
    check('1.3 no create-account link in the chrome', !f.chrome.some((h) => /create-account/.test(h)), JSON.stringify(f.chrome.filter((h) => /create-account/.test(h))));
    await open('/pricing/', 390, 844);
    const h = await page.evaluate(() => document.querySelector('footer').getBoundingClientRect().height);
    check('1.3 footer <= 1.3 screens @390 (folds closed)', h <= 1.3 * 844, `${Math.round(h)}px = ${(h / 844).toFixed(2)} screens`);
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
