/**
 * Generates the raster brand assets that cannot be SVG: the touch icon, the
 * PNG logo referenced by structured data, and the 1200×630 social card.
 *
 * Run with `npm run assets`. Output goes to public/ and is committed, so the
 * build itself has no image-generation step.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });

const BRAND = {
    teal: '#0F4A58',
    tealDeep: '#082B34',
    terracotta: '#B85126',
    gold: '#E0A03F',
    ivory: '#F3EBDD',
    ivoryMuted: 'rgba(243,235,221,0.72)',
};

/** The brand mark: the "A" apex holding a heart. */
const mark = (ground, letter) => `
  <rect width="1024" height="1024" rx="232" fill="${ground}"/>
  <path d="M509 148 L178 882 L296 882 L512 225 Z" fill="${letter}"/>
  <path d="M515 148 L846 882 L728 882 L512 225 Z" fill="${letter}"/>
  <path d="M512 726 C512 726 406 643 406 566 C406 519 441 493 478 493 C499 493 509 506 512 514 C515 506 525 493 546 493 C583 493 618 519 618 566 C618 643 512 726 512 726 Z" fill="${BRAND.gold}"/>
`;

const markSvg = (ground, letter) =>
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${mark(ground, letter)}</svg>`);

/* ── Icons ────────────────────────────────────────────────────────────── */

await sharp(markSvg(BRAND.ivory, BRAND.teal)).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'));
await sharp(markSvg(BRAND.ivory, BRAND.teal)).resize(512, 512).png().toFile(join(publicDir, 'logo.png'));
await sharp(markSvg(BRAND.ivory, BRAND.teal)).resize(192, 192).png().toFile(join(publicDir, 'icon-192.png'));
await sharp(markSvg(BRAND.ivory, BRAND.teal)).resize(512, 512).png().toFile(join(publicDir, 'icon-512.png'));

/* ── Social card ──────────────────────────────────────────────────────── */

/*
 * Cormorant Garamond is not installed on build machines, so the card falls
 * back to a transitional serif with the same colour and proportion. The page
 * itself always uses the real brand face.
 */
const serif = 'Cormorant Garamond, Georgia, Times New Roman, serif';
const sans = 'Figtree, Segoe UI, Helvetica, Arial, sans-serif';

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND.teal}"/>
      <stop offset="100%" stop-color="${BRAND.tealDeep}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="612" width="1200" height="18" fill="${BRAND.terracotta}"/>
  <rect x="0" y="612" width="420" height="18" fill="${BRAND.gold}"/>

  <g transform="translate(88, 74) scale(0.108)">${mark(BRAND.ivory, BRAND.teal)}</g>

  <text x="230" y="140" font-family="${serif}" font-size="52" fill="${BRAND.ivory}">A <tspan fill="${BRAND.gold}">Story</tspan></text>
  <text x="232" y="170" font-family="${sans}" font-size="18" letter-spacing="3" fill="${BRAND.ivoryMuted}">YOUR FAMILY&#8217;S LIVING MEMORIES</text>

  <text x="88" y="330" font-family="${serif}" font-size="76" fill="${BRAND.ivory}">Every life holds a story.</text>
  <text x="88" y="416" font-family="${serif}" font-size="76" font-style="italic" fill="${BRAND.gold}">Most are never told.</text>

  <text x="88" y="490" font-family="${sans}" font-size="26" fill="${BRAND.ivoryMuted}">A private archive and a printed book — for families, care</text>
  <text x="88" y="528" font-family="${sans}" font-size="26" fill="${BRAND.ivoryMuted}">communities and organizations.</text>
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

console.log('brand assets written to public/');

/* ── Team portrait placeholders ───────────────────────────────────────────
 * Stand-ins until real headshots exist. Kept on-brand rather than looking
 * like a broken image, and clearly labelled so nobody ships them by accident.
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
        fill="#1F2A2E">${name}</text>
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
