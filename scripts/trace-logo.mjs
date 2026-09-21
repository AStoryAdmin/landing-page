/**
 * Traces the A Story logo out of the brand source into SVG paths.
 *
 * The guideline is explicit that the logo's shape and style must remain
 * unaltered, so the site does not rebuild the lockup out of a web font that
 * merely resembles it — it ships the real artwork as vector. Colour is still
 * ours to set per background, which is why each element is traced separately:
 *
 *   letter    the two teal strokes shaped as hands forming a heart
 *   waveform  the gold voice trace held inside the heart counter
 *   nameA     the "A" of the wordmark
 *   nameStory the "Story" of the wordmark
 *   tagline   "Your Family's Living Memories"
 *
 * Two approved lockups are traced: the full Horizontal Logo (with the
 * descriptor line) and the Simplified Horizontal Logo (without it). They are
 * separate artwork with different mark-to-wordmark proportions, so each gets
 * its own coordinate space rather than one being faked from the other.
 *
 * Regenerate only if the artwork changes:
 *   node scripts/pdfshot.mjs <guideline.pdf> <a> 2 12 "95,1362,270,115"
 *   node scripts/pdfshot.mjs <guideline.pdf> <b> 2 16 "229,811,178,66"
 *   node scripts/trace-logo.mjs <a>-p2.png <b>-p2.png
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import potrace from 'potrace';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [fullSource, simpleSource] = process.argv.slice(2);
if (!fullSource || !simpleSource) {
    throw new Error('usage: node scripts/trace-logo.mjs <horizontal.png> <simplified.png>');
}

/**
 * Potrace mis-reads interior holes when a shape runs to the edge of the bitmap
 * — the mark's counters came back filled solid. A blank margin around every
 * mask keeps each contour closed; the viewBox subtracts it again.
 */
const PAD = 8;

/**
 * Potrace also drops interior contours once a mask gets large: at the source
 * render's 2894px the mark's heart came back solid, and it is reliable again
 * below about 1600px. Masks are normalised to this width before tracing, so the
 * coordinate space is this wide too — still far finer than any size the logo is
 * ever drawn at.
 */
const TRACE_WIDTH = 1400;

/**
 * Traces one lockup image into its five paths plus the viewBoxes that frame it.
 */
const traceLockup = async (source, label) => {
    console.log(`
${label}`);
    const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const at = (x, y) => {
        const i = (y * width + x) * channels;
        return [data[i], data[i + 1], data[i + 2]];
    };

    /* ── Ink classification ───────────────────────────────────────────────────
     * The artwork is flat colour, so every pixel is one of five inks, the ground,
     * or an antialiased blend on the line between one ink and the ground. Simple
     * channel-range tests got this wrong — a half-covered Terracotta edge lands
     * squarely inside any plausible "gold" range, which pulled stray specks of the
     * wordmark into the waveform. Each pixel is instead matched to the ink whose
     * blend ramp it sits closest to, and kept only where it is at least half
     * covered.
     */

    const INKS = {
        letter: [39, 68, 84], // Deep Teal
        waveform: [224, 160, 62], // Warm Gold
        nameStory: [184, 82, 39], // Terracotta
        nameA: [43, 33, 22], // the near-black of the wordmark "A"
        tagline: [76, 76, 76], // Charcoal
    };

    /** The ground is simply the most common colour in the render. */
    const groundOf = () => {
        const counts = new Map();
        for (let y = 0; y < height; y += 2) {
            for (let x = 0; x < width; x += 2) {
                const k = at(x, y).join(',');
                counts.set(k, (counts.get(k) ?? 0) + 1);
            }
        }
        return [...counts].sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number);
    };

    const GROUND = groundOf();
    console.log(`ground ${GROUND.join(',')}`);

    const MAX_OFF_RAMP = 60 ** 2; // how far off an ink→ground line a pixel may sit

    const classify = (px) => {
        let best = null;
        for (const [name, ink] of Object.entries(INKS)) {
            const d = [GROUND[0] - ink[0], GROUND[1] - ink[1], GROUND[2] - ink[2]];
            const v = [px[0] - ink[0], px[1] - ink[1], px[2] - ink[2]];
            const dd = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
            const t = Math.max(0, Math.min(1, (v[0] * d[0] + v[1] * d[1] + v[2] * d[2]) / dd));
            const perp = [v[0] - t * d[0], v[1] - t * d[1], v[2] - t * d[2]];
            const perp2 = perp[0] ** 2 + perp[1] ** 2 + perp[2] ** 2;
            if (!best || perp2 < best.perp2) best = { name, t, perp2 };
        }
        if (best.perp2 > MAX_OFF_RAMP) return null;
        return best.t < 0.5 ? best.name : null; // at least half ink coverage
    };

    /* Classify once; every mask and bounding box reads from this. */
    const map = new Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) map[y * width + x] = classify(at(x, y));
    }

    const boundsOf = (names) => {
        let minX = width, minY = height, maxX = 0, maxY = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (!names.includes(map[y * width + x])) continue;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
        return { minX, minY, maxX, maxY };
    };

    const full = boundsOf(Object.keys(INKS));
    const mark = boundsOf(['letter', 'waveform']);
    const boxW = full.maxX - full.minX + 1;
    const boxH = full.maxY - full.minY + 1;
    console.log(`lockup ${boxW}x${boxH} at ${full.minX},${full.minY}`);
    console.log(`mark   ${mark.maxX - mark.minX + 1}x${mark.maxY - mark.minY + 1} at ${mark.minX},${mark.minY}`);

    const scale = Math.min(1, TRACE_WIDTH / (boxW + PAD * 2));

    const maskOf = (name, traceWidth = TRACE_WIDTH) => {
        const w = boxW + PAD * 2;
        const h = boxH + PAD * 2;
        const out = Buffer.alloc(w * h, 255);
        for (let y = 0; y < boxH; y++) {
            for (let x = 0; x < boxW; x++) {
                if (map[(full.minY + y) * width + (full.minX + x)] === name) out[(y + PAD) * w + (x + PAD)] = 0;
            }
        }
        const target = Math.min(w, traceWidth);
        return sharp(out, { raw: { width: w, height: h, channels: 1 } })
            .resize({ width: target })
            .threshold(128)
            .png()
            .toBuffer();
    };

    const trace = (buffer, options) =>
        new Promise((resolve, reject) => {
            const tracer = new potrace.Potrace({
                threshold: 128, turdSize: 4, optCurve: true, alphaMax: 1, optTolerance: 0.3, ...options,
            });
            tracer.loadImage(buffer, (err) => (err ? reject(err) : resolve(tracer.getPathTag())));
        });

    /**
     * Traces one ink. `traceWidth` overrides the default only where a shape needs
     * more resolution than the letterform does — the waveform's thinnest bars merge
     * into their neighbours at 1400px. Potrace emits absolute M/L/C commands whose
     * numbers are all coordinates, so the result is simply scaled back into the
     * shared coordinate space.
     */
    const pathFor = async (name, { traceWidth = TRACE_WIDTH, ...options } = {}) => {
        const tag = await trace(await maskOf(name, traceWidth), options);
        const m = / d="([^"]+)"/.exec(tag);
        if (!m) return ''; // this lockup does not contain that element
        const back = TRACE_WIDTH / Math.min(boxW + PAD * 2, traceWidth);
        const d = m[1].replace(/-?\d+(?:\.\d+)?/g, (n) => String(Math.round(Number(n) * back * 10) / 10));
        console.log(`  ${name.padEnd(10)} ${(d.match(/M/g) || []).length} contours, ${d.length} chars`);
        return d;
    };

    const letter = await pathFor('letter');
    const waveform = await pathFor('waveform', { traceWidth: boxW + PAD * 2, turdSize: 20 });
    const nameStory = await pathFor('nameStory');
    const nameA = await pathFor('nameA');
    const tagline = await pathFor('tagline', { turdSize: 2 });

    const s = (n) => Math.round(n * scale);
    const boxOf = (b) => [
        s(b.minX - full.minX + PAD),
        s(b.minY - full.minY + PAD),
        s(b.maxX - b.minX + 1),
        s(b.maxY - b.minY + 1),
    ].join(' ');

    return {
        viewBox: `${s(PAD)} ${s(PAD)} ${s(boxW)} ${s(boxH)}`,
        markViewBox: boxOf(mark),
        letter, waveform, nameA, nameStory, tagline,
    };
};

const wide = await traceLockup(fullSource, 'Horizontal Logo');
const simple = await traceLockup(simpleSource, 'Simplified Horizontal Logo');

const out = `/**
 * The A Story logo, traced from the brand guideline artwork
 * (Brandguideline ASTORYUS V2, Version Teal). Generated by
 * scripts/trace-logo.mjs — do not hand-edit.
 *
 * The guideline forbids compressing, distorting or restructuring the logo, so
 * these paths are the artwork itself rather than a web-font approximation.
 * Elements are split only so the approved colourways can be applied per
 * background; the geometry never changes.
 *
 * Two approved lockups are included. LOGO_* is the full Horizontal Logo with
 * the descriptor line; SIMPLE_* is the Simplified Horizontal Logo, which is
 * separate artwork with a larger wordmark and is what small sizes should use.
 * LOGO_MARK_VIEWBOX frames the mark alone within the full lockup's coordinate
 * space, for favicon-style use.
 */

export const LOGO_VIEWBOX = '${wide.viewBox}';
export const LOGO_MARK_VIEWBOX = '${wide.markViewBox}';

/** The two strokes of the mark. Deep Teal on light, Soft Ivory on dark. */
export const LOGO_LETTER_PATH =
    '${wide.letter}';

/** The voice waveform inside the heart. Always Warm Gold. */
export const LOGO_WAVEFORM_PATH =
    '${wide.waveform}';

/** The "A" of the wordmark. Near-black on light, Soft Ivory on dark. */
export const LOGO_NAME_A_PATH =
    '${wide.nameA}';

/** The "Story" of the wordmark. Terracotta on light, Warm Gold on dark. */
export const LOGO_NAME_STORY_PATH =
    '${wide.nameStory}';

/** "Your Family's Living Memories". Charcoal on light, Soft Ivory on dark. */
export const LOGO_TAGLINE_PATH =
    '${wide.tagline}';

/* ── Simplified Horizontal Logo ───────────────────────────────────────── */

export const SIMPLE_VIEWBOX = '${simple.viewBox}';
export const SIMPLE_MARK_VIEWBOX = '${simple.markViewBox}';

export const SIMPLE_LETTER_PATH =
    '${simple.letter}';

export const SIMPLE_WAVEFORM_PATH =
    '${simple.waveform}';

export const SIMPLE_NAME_A_PATH =
    '${simple.nameA}';

export const SIMPLE_NAME_STORY_PATH =
    '${simple.nameStory}';
`;

writeFileSync(join(root, 'src', 'components', 'ui', 'logoPaths.ts'), out);
console.log('\nwrote src/components/ui/logoPaths.ts');
