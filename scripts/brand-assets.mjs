/**
 * Generates the brand assets that have to be files rather than components:
 * the favicons, the touch/PWA icons, the PNG logo referenced by structured
 * data, the 1200×630 social card, the web manifest, and the team portrait
 * placeholders.
 *
 * Everything is drawn from the same traced artwork the site uses
 * (src/components/ui/logoPaths.ts), so a favicon can never drift out of step
 * with the logo in the navbar.
 *
 * Run with `npm run assets`. Output is committed, so the build has no
 * image-generation step.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });

/* ── Brand colours, as specified in the guideline (Version Teal, 2026) ─── */

const BRAND = {
    teal: '#0F4A58',
    tealDeep: '#082B34',
    terracotta: '#B85126',
    gold: '#E0A03F',
    ink: '#1F2A2E',
    charcoal: '#4C4C4C',
    ivory: '#F3EBDD',
    ivoryMuted: 'rgba(243,235,221,0.72)',
};

/* ── The traced logo artwork ──────────────────────────────────────────── */

const paths = readFileSync(join(root, 'src', 'components', 'ui', 'logoPaths.ts'), 'utf8');
const constant = (name) => {
    const i = paths.indexOf(`${name} =`);
    if (i < 0) throw new Error(`logoPaths.ts has no ${name}`);
    const start = paths.indexOf("'", i) + 1;
    return paths.slice(start, paths.indexOf("'", start));
};

const LOGO = {
    viewBox: constant('LOGO_VIEWBOX').split(' ').map(Number),
    markViewBox: constant('LOGO_MARK_VIEWBOX').split(' ').map(Number),
    letter: constant('LOGO_LETTER_PATH'),
    waveform: constant('LOGO_WAVEFORM_PATH'),
    nameA: constant('LOGO_NAME_A_PATH'),
    nameStory: constant('LOGO_NAME_STORY_PATH'),
    tagline: constant('LOGO_TAGLINE_PATH'),
};

/**
 * Places the mark inside a square tile at the proportions the guideline's
 * favicon uses — roughly 62% of the tile, optically centred.
 */
const markTile = (size, ground, letter) => {
    const [vx, vy, vw, vh] = LOGO.markViewBox;
    const scale = (size * 0.62) / vh;
    const x = (size - vw * scale) / 2 - vx * scale;
    const y = (size - vh * scale) / 2 - vy * scale;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.226)}" fill="${ground}"/>
  <g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(4)})">
    <path d="${LOGO.letter}" fill="${letter}" fill-rule="evenodd"/>
    <path d="${LOGO.waveform}" fill="${BRAND.gold}" fill-rule="evenodd"/>
  </g>
</svg>`;
};

/** The full horizontal lockup, positioned at a given height. */
const lockup = (x, y, height, tone) => {
    const [vx, vy, , vh] = LOGO.viewBox;
    const scale = height / vh;
    const ink = tone === 'dark'
        ? { letter: BRAND.ivory, name: BRAND.ivory, story: BRAND.gold, tagline: BRAND.ivoryMuted }
        : { letter: BRAND.teal, name: BRAND.ink, story: BRAND.terracotta, tagline: BRAND.charcoal };
    return `<g transform="translate(${x - vx * scale} ${y - vy * scale}) scale(${scale.toFixed(4)})">
    <path d="${LOGO.letter}" fill="${ink.letter}" fill-rule="evenodd"/>
    <path d="${LOGO.waveform}" fill="${BRAND.gold}" fill-rule="evenodd"/>
    <path d="${LOGO.nameA}" fill="${ink.name}" fill-rule="evenodd"/>
    <path d="${LOGO.nameStory}" fill="${ink.story}" fill-rule="evenodd"/>
    <path d="${LOGO.tagline}" fill="${ink.tagline}" fill-rule="evenodd"/>
  </g>`;
};

/* ── Favicons ─────────────────────────────────────────────────────────── */

const faviconLight = markTile(512, BRAND.ivory, BRAND.teal);
const faviconDark = markTile(512, BRAND.teal, BRAND.ivory);
writeFileSync(join(publicDir, 'favicon.svg'), faviconLight + '\n');
writeFileSync(join(publicDir, 'favicon-dark.svg'), faviconDark + '\n');

for (const [file, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512], ['logo.png', 512]]) {
    await sharp(Buffer.from(markTile(size, BRAND.ivory, BRAND.teal))).png().toFile(join(publicDir, file));
}

/* ── Social card ──────────────────────────────────────────────────────── */

/*
 * Cormorant Garamond is not installed on build machines, so the headline falls
 * back to a transitional serif at the same size and colour. The logo itself is
 * vector artwork, so it is exact.
 */
const serif = 'Cormorant Garamond, Georgia, Times New Roman, serif';
const sans = 'Figtree, Segoe UI, Helvetica, Arial, sans-serif';

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND.teal}"/>
      <stop offset="100%" stop-color="${BRAND.tealDeep}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="612" width="1200" height="18" fill="${BRAND.terracotta}"/>
  <rect x="0" y="612" width="420" height="18" fill="${BRAND.gold}"/>
  ${lockup(88, 70, 92, 'dark')}
  <text x="88" y="330" font-family="${serif}" font-size="76" fill="${BRAND.ivory}">One gift.</text>
  <text x="88" y="416" font-family="${serif}" font-size="76" font-style="italic" fill="${BRAND.gold}">Your whole family opens it.</text>
  <text x="88" y="492" font-family="${sans}" font-size="26" fill="${BRAND.ivoryMuted}">You buy once and send one link. They talk. Everyone gets</text>
  <text x="88" y="530" font-family="${sans}" font-size="26" fill="${BRAND.ivoryMuted}">the archive — and a hardcover book.</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, 'og-cover.png'));

/* ── Web app manifest ─────────────────────────────────────────────────── */

writeFileSync(
    join(publicDir, 'site.webmanifest'),
    JSON.stringify(
        {
            name: 'A Story',
            short_name: 'A Story',
            description: "Your Family's Living Memories — a private archive and a printed keepsake book.",
            start_url: '/',
            display: 'standalone',
            background_color: BRAND.ivory,
            theme_color: BRAND.teal,
            icons: [
                { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
                { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
            ],
        },
        null,
        2
    ) + '\n'
);

console.log('favicons, icons, social card and manifest written to public/');

/* ── Team portrait placeholders ───────────────────────────────────────────
 * Stand-ins until real headshots exist. Kept on-brand rather than looking like
 * a broken image, and clearly labelled so nobody ships them by accident.
 */
const portrait = (initials, name, note) => `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="${BRAND.ivory}"/>
  <g stroke="${BRAND.gold}" stroke-width="3" fill="none">
    <path d="M28 58 V28 H58"/><path d="M542 28 H572 V58"/>
    <path d="M572 542 V572 H542"/><path d="M58 572 H28 V542"/>
  </g>
  <circle cx="300" cy="250" r="120" fill="${BRAND.teal}"/>
  <text x="300" y="250" text-anchor="middle" dominant-baseline="central"
        font-family="${serif}" font-size="104" fill="${BRAND.ivory}">${initials}</text>
  <text x="300" y="424" text-anchor="middle" font-family="${serif}" font-size="34"
        fill="${BRAND.ink}">${name}</text>
  <text x="300" y="462" text-anchor="middle" font-family="${sans}" font-size="18"
        fill="#8C8C8C">${note}</text>
</svg>`;

const assetsDir = join(root, 'src', 'assets');
await sharp(Buffer.from(portrait('DN', 'Daniel H. Nguyen', 'Placeholder — add a real headshot')))
    .webp({ quality: 90 })
    .toFile(join(assetsDir, 'astoryDaniel.webp'));
await sharp(Buffer.from(portrait('B', 'Bao', 'Placeholder — add a real headshot')))
    .webp({ quality: 90 })
    .toFile(join(assetsDir, 'astoryBao.webp'));

console.log('team portrait placeholders refreshed');
