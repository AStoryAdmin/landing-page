// The sample books' codes, end to end (plan 2026-11-07 D3, tasks 3b-3c).
//
// Reads each sample book's DATA (public/samples/books/<id>.js) and writes, so the two never drift:
//   1. into the web app (its /read sample mode):
//        <web-app>/public/read-samples/<id>.json    every chapter the book prints a code for, each memory's
//                                                   title, dateline, first photograph, words in full, sides
//        <web-app>/public/read-samples/img/<key>.jpg the sample's five embedded prints, out of index.html's IMG
//        <web-app>/public/read-samples/audio/<id>-<memory>.mp3   (with --voice) a synthetic clip per memory
//   2. into this site:
//        public/samples/books/read-codes.js         READ_CODES: a real QR code (SVG) per chapter of
//                                                   https://app.astoryapp.com/read?sample=<id>&c=<slug>,
//                                                   the base the app prints (phone-app bookDesign.js APP_READ_URL)
//
// Usage:
//   node scripts/samples-to-read.mjs --web-app "<path to web-app checkout>"            write everything
//   node scripts/samples-to-read.mjs --web-app "<path>" --voice [--tts <dir>]           …and render missing clips
//   node scripts/samples-to-read.mjs --web-app "<path>" --check                        fail on any drift
//
// The QR encoder is the one the app prints with (qrcode-generator, resolved from the web app's node_modules), so a
// sample's code is drawn exactly as a real book's. The voice is Microsoft's Edge neural TTS (msedge-tts, resolved
// from --tts, by default the demo studio's tools/tts); it is never the storyteller's own and the /read page says so.
// Clips are rendered once and kept: a clip whose text has not changed is not rendered again (its text is in the JSON
// as `clipText`, so --check notices when a memory's opening words change).
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const CHECK = args.includes("--check"), VOICE = args.includes("--voice");
const webApp = path.resolve(opt("--web-app", path.join(root, "..", "phone app", "web-app")));
const ttsDir = path.resolve(opt("--tts", path.join(root, "..", "a-story-demo-video", "tools", "tts")));
const outDir = path.join(webApp, "public", "read-samples");
const codesFile = path.join(root, "public", "samples", "books", "read-codes.js");
if (!fs.existsSync(path.join(webApp, "package.json"))) throw new Error(`no web app at ${webApp} (pass --web-app)`);

export const APP_READ_URL = "https://app.astoryapp.com/read";
const BOOKS = ["carolyn", "raymond", "tom"];
/* One older-sounding neural voice per storyteller, slowed a little (Edge free voices; no brand name is ever said). */
const VOICES = {
  carolyn: { name: "en-US-JennyNeural", rate: -10, pitch: -6 },
  raymond: { name: "en-US-ChristopherNeural", rate: -12, pitch: -4 },
  tom: { name: "en-US-AndrewNeural", rate: -12, pitch: -8 },
};
const CLIP_WORDS = 70; // a clip is the memory's opening, cut at a sentence end near this many words (~25-30 s)

/* bookDesign.js chapterSlug, character for character */
export function chapterSlug(era) {
  return String(era || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
export const readUrl = (book, slug) => `${APP_READ_URL}?sample=${book}&c=${slug}`;

/* ---------- the books' DATA, and the five prints embedded in index.html ---------- */
const DATA = {};
for (const b of BOOKS) vm.runInNewContext(fs.readFileSync(path.join(root, "public", "samples", "books", `${b}.js`), "utf8"), { DATA });
const html = fs.readFileSync(path.join(root, "public", "samples", "index.html"), "utf8");
const IMG = {};
for (const m of html.matchAll(/\b(\w+):"data:image\/(jpeg|webp);base64,([A-Za-z0-9+/=]+)"/g)) IMG[m[1]] = { type: m[2], b64: m[3] };

const plain = (s) => String(s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
function photoOf(p) {
  if (!p) return null;
  if (String(p.img).startsWith("/mission/")) return `https://astoryapp.com${p.img}`; // already live on the site
  const img = IMG[p.img];
  if (!img) throw new Error(`no embedded print "${p.img}"`);
  return `/read-samples/img/${p.img}.${img.type === "jpeg" ? "jpg" : "webp"}`;
}
function clipText(paras) {
  const sentences = paras.join(" ").match(/[^.!?]+[.!?]+[”’"]?\s*|[^.!?]+$/g) || [];
  let out = "", n = 0;
  for (const s of sentences) {
    const w = s.trim().split(/\s+/).length;
    if (out && n + w > CLIP_WORDS) break;
    out += s; n += w;
  }
  const t = out.trim();
  // the brand, capitalised ("it wasn’t a story for a kid" is only words)
  if (/\bA\s*Story\b/.test(t)) throw new Error(`a clip would say the brand name: "${t.slice(0, 60)}…"`);
  return t;
}

/* ---------- the JSON the /read sample mode reads ---------- */
const files = new Map(); // absolute path → Buffer|string, everything this script writes
const clips = [];
for (const b of BOOKS) {
  const D = DATA[b];
  const chapters = (D.chapters || []).filter((c) => (c.memories || []).length).map((c) => ({
    slug: chapterSlug(c.era),
    name: c.era,
    memories: c.memories.map((m) => {
      const paras = (m.faces || []).flat().map(plain).filter(Boolean);
      const audio = `/read-samples/audio/${b}-${m.id}.mp3`;
      const text = clipText(paras);
      clips.push({ book: b, id: m.id, file: path.join(webApp, "public", audio), text });
      return {
        id: m.id,
        title: plain(m.title),
        period: plain(m.dateline),
        body: paras.join("\n\n"),
        photo: photoOf((m.photos || [])[0]),
        audio,
        clipText: text,
        sides: (m.sides || []).map((s) => ({ name: plain(s.by), body: plain(s.body) })),
      };
    }),
  }));
  const slugs = chapters.map((c) => c.slug);
  if (new Set(slugs).size !== slugs.length) throw new Error(`${b}: two chapters share a slug`);
  const json = {
    book: b,
    teller: D.name,
    full: D.full,
    title: D.title,
    sample: `A sample book. ${D.name} and ${D.poss} family are fictional. The voice is synthetic.`,
    voice: VOICES[b].name,
    chapters,
  };
  files.set(path.join(outDir, `${b}.json`), JSON.stringify(json, null, 1) + "\n");
}
for (const [k, img] of Object.entries(IMG)) {
  if (!["beach", "beachd", "kiss", "paint", "paintd"].includes(k)) continue;
  files.set(path.join(outDir, "img", `${k}.${img.type === "jpeg" ? "jpg" : "webp"}`), Buffer.from(img.b64, "base64"));
}

/* ---------- the codes the sample books print: a real QR per chapter ---------- */
const require = createRequire(path.join(webApp, "package.json"));
const qrcode = require("qrcode-generator");
/* phone-app src/lib/qr.js qrPath + svgOfPath: error correction M, a four-module quiet zone, white ground */
function qrSvg(text, color = "#2b2b2b") {
  const qr = qrcode(0, "M");
  qr.addData(String(text));
  qr.make();
  const n = qr.getModuleCount(), q = 4;
  let d = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
  return `<svg viewBox="${-q} ${-q} ${n + 2 * q} ${n + 2 * q}" shape-rendering="crispEdges" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="${-q}" y="${-q}" width="${n + 2 * q}" height="${n + 2 * q}" fill="#fff"/><path d="${d}" fill="${color}"/></svg>`;
}
const codes = {};
for (const b of BOOKS) {
  const D = DATA[b];
  const chs = (D.chapters || []).filter((c) => (c.memories || []).length);
  codes[b] = { first: chapterSlug(chs[0].era), chapters: {} };
  for (const c of chs) {
    const slug = chapterSlug(c.era), url = readUrl(b, slug);
    codes[b].chapters[slug] = { url, mem: c.memories[0].id, svg: qrSvg(url) };
  }
}
files.set(codesFile, `/* Written by scripts/samples-to-read.mjs: do not edit. The code each sample book prints at a chapter's opener
   (and, for the archive on the last page, its first chapter's): a real QR code of the web app's /read sample page. */
window.READ_CODES = ${JSON.stringify(codes, null, 1)};
`);

/* ---------- write, or check ---------- */
let drift = 0;
for (const [f, content] of files) {
  const want = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
  const have = fs.existsSync(f) ? fs.readFileSync(f) : null;
  if (have && have.equals(want)) continue;
  if (CHECK) { console.log(`drift: ${path.relative(root, f)}${have ? "" : " (missing)"}`); drift++; continue; }
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, want);
  console.log(`wrote ${f}`);
}
const missing = clips.filter((c) => !fs.existsSync(c.file));
if (CHECK) {
  for (const c of missing) { console.log(`missing clip: ${c.file}`); drift++; }
  console.log(drift ? `${drift} file(s) drifted` : `OK: ${files.size} files and ${clips.length} clips match the books`);
  process.exit(drift ? 1 : 0);
}

/* ---------- the voice: one clip per memory, rendered once ---------- */
const stamp = path.join(outDir, "audio", "clips.json"); // what each clip says, so a changed opening is rendered again
const said = fs.existsSync(stamp) ? JSON.parse(fs.readFileSync(stamp, "utf8")) : {};
const stale = clips.filter((c) => !fs.existsSync(c.file) || said[`${c.book}-${c.id}`] !== c.text);
if (stale.length && !VOICE) console.log(`${stale.length} clip(s) missing or out of date: run again with --voice`);
if (stale.length && VOICE) {
  const treq = createRequire(path.join(ttsDir, "package.json"));
  const { MsEdgeTTS, OUTPUT_FORMAT } = treq("msedge-tts");
  const xml = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  for (const c of stale) {
    const v = VOICES[c.book];
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="${v.name}"><prosody pitch="${v.pitch}Hz" rate="${v.rate}%">${xml(c.text)}</prosody></voice></speak>`;
    let buf = null;
    for (let attempt = 1; attempt <= 3 && !buf; attempt++) {
      try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata(v.name, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        const { audioStream } = tts.rawToStream(ssml);
        const chunks = [];
        await new Promise((res, rej) => { audioStream.on("data", (d) => chunks.push(d)); audioStream.on("end", res); audioStream.on("close", res); audioStream.on("error", rej); });
        tts.close();
        const b = Buffer.concat(chunks);
        if (b.length < 4000) throw new Error("empty audio");
        buf = b;
      } catch (e) {
        console.log(`  ${c.book}-${c.id}: attempt ${attempt} failed: ${e.message}`);
      }
    }
    if (!buf) throw new Error(`could not render ${c.book}-${c.id}`);
    fs.mkdirSync(path.dirname(c.file), { recursive: true });
    fs.writeFileSync(c.file, buf);
    said[`${c.book}-${c.id}`] = c.text;
    console.log(`voice ${c.book}-${c.id}: ${(buf.length / 1024).toFixed(0)} KB (${v.name})`);
  }
  fs.writeFileSync(stamp, JSON.stringify(said, null, 1) + "\n");
}
const total = clips.reduce((n, c) => n + (fs.existsSync(c.file) ? fs.statSync(c.file).size : 0), 0);
console.log(`${BOOKS.length} books, ${clips.length} memories, clips ${(total / 1048576).toFixed(2)} MB`);
