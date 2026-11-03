/**
 * Focus-ring contrast, measured in pixels (premium pass, design spec §3.3, S11).
 *
 *   npm run build:static && npx vite preview --port 5201 --strictPort
 *   node scripts/ring-check.mjs [--base http://localhost:5201] [--pages /pricing/,/reserve/]
 *
 * For every keyboard tab stop inside <main> on each page, at 390 and 1440:
 * the element is centred in the window and shot twice, focused with its ring
 * and focused with its outline turned off. The pixels that differ are the
 * ring; the same pixels in the second shot are its ground. The ring passes
 * when the median contrast of those pixel pairs is at least 3:1. A tab stop
 * whose ring changes no pixel at all (clipped by a frame) fails too. Tab
 * stops with no outline (form fields, hidden radios inside a card) draw their
 * own indicator and are counted, not measured.
 *
 * Prints the failures, then each ring/ground colour pair with its lowest
 * ratio, and exits 1 if any ring fails. Home is skipped (not in the pass).
 */
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import { pages as sitePages } from './site-routes.mjs';

const arg = (name, fallback) => {
    const i = process.argv.indexOf('--' + name);
    return i > -1 ? process.argv[i + 1] : fallback;
};
const base = arg('base', 'http://localhost:5201').replace(/\/$/, '');
const defaults = [...sitePages.map((p) => p.path), '/samples']
    .filter((p) => p !== '/')
    .map((p) => (p.endsWith('/') ? p : p + '/'));
const pages = arg('pages', defaults.join(',')).split(',');
const MAX_STOPS = 150;

const lum = ([r, g, b]) => {
    const f = (c) => {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
};
const hexOf = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');

const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
const page = await ctx.newPage();
const fails = [];
const pairs = new Map();
let measured = 0;
let own = 0;

for (const path of pages) {
    for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
        await page.goto(base + path, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => {
            const m = document.querySelector('main');
            m.setAttribute('tabindex', '-1');
            m.focus();
        });
        const seen = new Set();
        for (let i = 0; i < MAX_STOPS; i++) {
            await page.keyboard.press('Tab');
            const info = await page.evaluate(() => {
                const el = document.activeElement;
                if (!el || !el.closest('main') || el.tagName === 'MAIN') return { out: true };
                if (!el.matches(':focus-visible')) return { skip: true };
                /* Fields and visually hidden inputs draw their own indicator
                   (a border, the card around them): not an outline ring. */
                const cs = getComputedStyle(el);
                const r0 = el.getBoundingClientRect();
                if (cs.outlineStyle === 'none' || parseFloat(cs.outlineWidth) === 0 || r0.width < 4 || r0.height < 4 || parseFloat(cs.opacity) === 0) return { own: true };
                el.scrollIntoView({ block: 'center', inline: 'nearest' });
                const r = el.getBoundingClientRect();
                const id = el.tagName + '|' + (el.getAttribute('href') ?? '') + '|' + el.textContent.trim().slice(0, 30) + '|' + Math.round(r.top + scrollY);
                return {
                    id,
                    text: (el.getAttribute('aria-label') || el.textContent || el.getAttribute('name') || '').trim().replace(/\s+/g, ' ').slice(0, 44),
                    box: { x: r.left, y: r.top, w: r.width, h: r.height },
                };
            });
            if (info.out) break;
            if (info.own) {
                own++;
                continue;
            }
            if (info.skip || seen.has(info.id) || info.box.w === 0) continue;
            seen.add(info.id);
            await page.waitForTimeout(60);
            const pad = 10;
            const clip = {
                x: Math.max(0, Math.floor(info.box.x - pad)),
                y: Math.max(0, Math.floor(info.box.y - pad)),
            };
            clip.width = Math.min(width - clip.x, Math.ceil(info.box.w + pad * 2));
            clip.height = Math.min((width === 390 ? 844 : 900) - clip.y, Math.ceil(info.box.h + pad * 2));
            if (clip.width <= 0 || clip.height <= 0) continue;
            const on = PNG.sync.read(await page.screenshot({ clip }));
            await page.evaluate(() => {
                const el = document.activeElement;
                el.dataset.ringOff = el.style.outline;
                el.style.outline = 'none';
            });
            await page.waitForTimeout(30);
            const off = PNG.sync.read(await page.screenshot({ clip }));
            await page.evaluate(() => {
                const el = document.activeElement;
                el.style.outline = el.dataset.ringOff ?? '';
                delete el.dataset.ringOff;
            });
            /* Ring pixels: changed by more than anti-aliasing, outside the element's own box. */
            const ratios = [];
            const colours = new Map();
            const bx0 = info.box.x - clip.x, by0 = info.box.y - clip.y;
            for (let y = 0; y < on.height; y++) {
                for (let x = 0; x < on.width; x++) {
                    const inside = x >= bx0 && x < bx0 + info.box.w && y >= by0 && y < by0 + info.box.h;
                    if (inside) continue;
                    const k = (y * on.width + x) * 4;
                    const a = [on.data[k], on.data[k + 1], on.data[k + 2]];
                    const b = [off.data[k], off.data[k + 1], off.data[k + 2]];
                    if (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) < 60) continue;
                    ratios.push(ratio(a, b));
                    const key = hexOf(a) + ' on ' + hexOf(b);
                    colours.set(key, (colours.get(key) ?? 0) + 1);
                }
            }
            const tag = `${path} @${width} "${info.text}"`;
            if (!ratios.length) {
                fails.push(`${tag}: no ring visible outside the element`);
                continue;
            }
            measured++;
            ratios.sort((m, n) => m - n);
            const median = ratios[Math.floor(ratios.length / 2)];
            const top = [...colours.entries()].sort((m, n) => n[1] - m[1])[0][0];
            if (!pairs.has(top) || pairs.get(top).ratio > median) pairs.set(top, { ratio: median, where: tag });
            if (median < 3) fails.push(`${tag}: ${top} ${median.toFixed(2)}:1`);
        }
    }
}

await browser.close();
for (const f of fails) console.log('FAIL  ' + f);
console.log('\nRing on ground (most common pixel pair, lowest median ratio, where):');
for (const [k, v] of [...pairs.entries()].sort((a, b) => a[1].ratio - b[1].ratio)) {
    console.log(`  ${k}  ${v.ratio.toFixed(2)}:1  ${v.where}`);
}
console.log(`\n${measured} rings measured, ${fails.length} failing; ${own} tab stops draw their own indicator (no outline), not measured`);
process.exit(fails.length ? 1 : 0);
