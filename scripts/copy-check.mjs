/**
 * Copy checks, one method for every page (premium pass, design spec §4, M7).
 *
 *   node scripts/copy-check.mjs [--base http://localhost:5201] [/pricing/ /reserve/ …]
 *
 * For each page: load it in Playwright at 390×844, wait 2 s after load for
 * hydration, and read `document.querySelector("main").innerText` only - never
 * raw HTML, scripts, JSON-LD or the footer. Patterns are case-insensitive,
 * with word boundaries and exact phrases, as each page's "Check" in the spec
 * writes them. Each hit prints with 60 characters of context.
 *
 * A hit is not a licence to edit. Builders never change copy to satisfy a
 * grep: every hit goes to the supervisor, who rules it "real" (the copy is
 * fixed per the spec) or "innocent" (the pattern is narrowed and logged).
 *
 * Exits 1 if any page has a hit, or misses a phrase it must contain.
 */
import { chromium } from 'playwright';

const arg = (name, fallback) => {
    const i = process.argv.indexOf('--' + name);
    return i > -1 ? process.argv[i + 1] : fallback;
};
const base = arg('base', 'http://localhost:5201').replace(/\/$/, '');

/* The per-page patterns, as the spec's Checks write them. */
const CHECKS = {
    '/for-families/': {
        never: /\b(gone|lose|loses|lost|miss|missed|remembering|passed away)\b/gi,
    },
    '/your-story/': { never: /\b(miss|missed|lose|lost|gone)\b/gi },
    '/pricing/': {
        never: /\bnovember\b|15\s?%|\bfilled\b|trusted person|letter for later|leave a letter|stop paying|\bclosed\b/gi,
    },
    '/reserve/': {
        never: /\b(ends|ended|expire[sd]?|closed)\b|\bnovember\b|\bfilled\b|15\s?%/gi,
    },
    '/questions/': {
        never: /if I can't|if I can’t|letter for later|leave a letter|trusted person/gi,
    },
    '/thanks/': {
        never: /\bstripe\b/gi,
        must: ['same email', 'Your checkout receipt is your confirmation'],
    },
    '/contact/': { never: /%/g },
    '/compare/': { never: /the book isn['’]t the end/gi },
    /* Home: P0's effect is checked as text (spec §3.00). */
    '/': { never: /15\s?%|\bnovember\b|founding places are filled/gi },
};

const only = process.argv.slice(2).filter((a, i, all) => a.startsWith('/') && all[i - 1] !== '--base');
const paths = only.length ? only : Object.keys(CHECKS);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
let failures = 0;
for (const path of paths) {
    const rule = CHECKS[path] ?? CHECKS[path.replace(/\/?$/, '/')];
    if (!rule) {
        console.log(`SKIP  ${path}: no pattern in the spec`);
        continue;
    }
    await page.goto(base + path, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const text = await page.evaluate(() => document.querySelector('main')?.innerText ?? '');
    const hits = [...text.matchAll(rule.never)].map((m) => {
        const from = Math.max(0, m.index - 60);
        return `"${m[0]}" … ${text.slice(from, m.index + m[0].length + 60).replace(/\s+/g, ' ')}`;
    });
    const missing = (rule.must ?? []).filter((s) => !text.includes(s));
    const ok = hits.length === 0 && missing.length === 0;
    if (!ok) failures++;
    console.log(`${ok ? 'PASS' : 'HIT '}  ${path}  (${rule.never})`);
    hits.forEach((h) => console.log('      hit:', h));
    missing.forEach((s) => console.log('      missing:', s));
}
await browser.close();
console.log(failures ? `\n${failures} page(s) for the supervisor to rule on` : '\nno hits');
process.exit(failures ? 1 : 0);
