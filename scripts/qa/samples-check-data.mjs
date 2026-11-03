// Checks a writer's DATA file against the sample-books v2 schema and word budgets.
// Usage: node check-data.mjs data-carolyn.js
import fs from "node:fs";
const file = process.argv[2];
const src = fs.readFileSync(file, "utf8");
const DATA = {};
new Function("DATA", src)(DATA);
const ids = Object.keys(DATA);
if (ids.length !== 1) fail(`expected exactly one DATA.<id>, got ${ids.join(",")}`);
const B = DATA[ids[0]];
let errors = 0;
function fail(m) { console.log("FAIL  " + m); errors++; }
function warn(m) { console.log("warn  " + m); }
const words = (s) => String(s || "").replace(/<[^>]+>/g, "").trim().split(/\s+/).filter(Boolean).length;
const fold = (s) => String(s || "").replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
const IMG = ["paint", "paintd", "kiss", "beach", "beachd"];
const ERAS = ["Where we come from","Childhood","Growing up","Love & family","Work & making a living","The world we lived through","When everything changed","Faith & what carried me","Looking back"];
const BANNED = /(legacy|memoir|we asked|a story asked|nine minutes|going deeper|the lesson|still alive|testament to|not just .* but|tapestry|pivotal|summary)/i;

for (const k of ["id","name","full","family","pronoun","poss","born","place","cover","title","subtitle","dedication","epigraph","chapters","learned","little","people","family_chapter","letter","colophon","back"]) {
  if (B[k] === undefined) fail(`missing top-level field ${k}`);
}
const mem = new Map();
let nMem = 0, nPhotos = 0, nSides = 0, nVoice = 0;
for (const c of B.chapters || []) {
  if (!ERAS.includes(c.era)) fail(`chapter era not one of the app's: "${c.era}"`);
  for (const m of c.memories || []) {
    nMem++; mem.set(m.id, m);
    if (!m.title || !m.dateline || !Array.isArray(m.faces) || !m.faces.length) fail(`${m.id}: needs title, dateline, faces[]`);
    if (m.summary) fail(`${m.id}: use headnote, not summary`);
    if (m.headnote && (words(m.headnote) < 8 || words(m.headnote) > 24)) warn(`${m.id}: headnote ${words(m.headnote)} words (want 12–22)`);
    if (m.faces.length > 2) fail(`${m.id}: ${m.faces.length} faces (max 2)`);
    const photosOn = (f) => (m.photos || []).filter((p) => (p.face ?? 0) === f).length;
    m.faces.forEach((f, i) => {
      const w = f.reduce((n, p) => n + words(p), 0);
      let budget = i === 0 ? 140 : 220;
      if (photosOn(i)) budget = i === 0 ? 90 : 140;
      if (i === m.faces.length - 1) { budget -= 60 * (m.sides || []).length; if (m.voice) budget -= 40; }
      if (w > budget) fail(`${m.id} face ${i + 1}: ${w} words > budget ${budget}`);
      for (const p of f) if (BANNED.test(p)) fail(`${m.id}: banned phrase in "${p.slice(0, 60)}…"`);
      for (const p of f) if (/^\s*[“"]?(What|Why|How|When|Where|Who|Did|Was|Were|Is|Do|Does)\b[^.]*\?\s*$/.test(p)) fail(`${m.id}: a paragraph that is only a question`);
    });
    if (m.headnote && BANNED.test(m.headnote)) fail(`${m.id}: banned phrase in headnote`);
    for (const p of m.photos || []) { nPhotos++; if (!IMG.includes(p.img)) fail(`${m.id}: unknown photo key ${p.img}`); if (!p.caption) fail(`${m.id}: photo without caption`); }
    for (const s of m.sides || []) { nSides++; if (!s.heading || !s.body || !s.by) fail(`${m.id}: side needs heading, body, by`); if (words(s.body) > 80) fail(`${m.id}: side ${words(s.body)} words > 80`); if (!/^[A-Z][^,]+, (his|her) .+/.test(s.by)) warn(`${m.id}: side.by should read "Full Name, her daughter"`); if (!/ remembers it (too|differently)/.test(s.heading)) warn(`${m.id}: side.heading should be "<First name> remembers it too" or "… differently"`); }
    if (m.voice) { nVoice++; if (!m.voice.rec || !m.voice.len || !m.voice.quote) fail(`${m.id}: voice needs rec, len, quote`); }
    if (m.kept) { const all = fold(m.faces.flat().join(" ")); if (!all.includes(fold(m.kept))) fail(`${m.id}: kept line is not a verbatim span of her words`); }
  }
}
for (const g of B.learned || []) for (const q of g.quotes || []) {
  const m = mem.get(q.from);
  if (!m) { fail(`learned: unknown memory ${q.from}`); continue; }
  const all = fold([...m.faces.flat(), ...(m.sides || []).map((s) => s.body)].join(" "));
  if (!all.includes(fold(q.text).replace(/^"|"$/g, ""))) fail(`learned: "${q.text.slice(0, 50)}…" is not verbatim in ${q.from}`);
}
if (B.epigraph) { const m = mem.get(B.epigraph.from); const all = m ? fold(m.faces.flat().join(" ")) : ""; if (!m || !all.includes(fold(B.epigraph.text))) fail(`epigraph is not verbatim in ${B.epigraph?.from}`); }
if ((B.little || []).length < 8 || (B.little || []).length > 12) warn(`little: ${(B.little || []).length} items (want 10–12)`);
for (const l of B.little || []) if (words(l.a) > 28) fail(`little: answer too long: "${l.a.slice(0, 40)}…"`);
if ((B.people || []).length < 4) warn(`people: only ${(B.people || []).length}`);
for (const p of B.people || []) if (!p.name || !p.relation || !p.line) fail(`people: needs name, relation, line`);
for (const f of B.family_chapter || []) { if (!f.who || !f.relation || !f.title || !f.faces) fail(`family_chapter: needs who, relation, title, faces`); f.faces.forEach((face, i) => { const w = face.reduce((n, p) => n + words(p), 0); if (w > (i === 0 ? 150 : 220)) fail(`family ${f.who}: face ${i + 1} ${w} words`); }); }
if (B.letter) { const w = B.letter.faces.flat().reduce((n, p) => n + words(p), 0); if (w > 230) fail(`letter: ${w} words > 230`); if (B.letter.faces.length > 2) fail(`letter: max 2 faces`); }
const lessons = (B.learned || []).reduce((n, g) => n + (g.quotes || []).length, 0);
console.log(`memories ${nMem}  photos ${nPhotos}  sides ${nSides}  listen ${nVoice}  lessons ${lessons}  little ${(B.little || []).length}  people ${(B.people || []).length}  family ${(B.family_chapter || []).length}`);
if (nMem < 11 || nMem > 15) warn(`memories: want 11–15`);
if (nSides < 2) warn(`sides: want 2–5`);
if (nVoice < 4) warn(`listen blocks: want 4–7`);
if (lessons < 3 || lessons > 5) warn(`lessons: want 3–5`);
console.log(errors ? `${errors} error(s)` : "OK");
process.exit(errors ? 1 : 0);
