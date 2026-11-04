# Design-parity spec: samples page → the book the app prints

Sources. App print HTML: `phone-app/src/lib/legacyBook.js` (LB). App on-phone reader: `src/lib/bookLayout.js` (BL), `src/components/BookLeaf.js` (BLf), `src/lib/bookPages.js` (BP), `src/lib/memorySides.js` (MS). Design data: `src/lib/bookDesign.js` (BD), `src/lib/bookCase.js` (BC), `src/data/eras.js`, `src/data/lessons.js`, `src/theme/index.js` BOOK_PRINT (TH:81–124). Samples: `scratchpad/samples-main-script.js` (S), `samples-main.css` (C), `samples-main-shell.html` (H). Lulu proof HTML `.screenshots/lulu-6x9-hardcover-interior.html` is a 25 Oct build (no lessons chapter, no sides yet) but confirms wording of title page, contents, openers, memory, credit and colophon.

The app has two renderings of one structure (`bookStructure`, LB:108). Wording authority: LB for printed text, BL/BLf where the reader adds a page the print lacks (title page, front colophon, opener, final page). The samples are cqw pages exactly like the reader, so where print and reader differ in geometry, follow the reader; where they differ in words, both are quoted.

---

## A. The app book's page anatomy

**Fonts and inks (print).** Body `Georgia, "Iowan Old Style", "Times New Roman", serif` 11.5pt / 1.72, justified, hyphens auto, orphans/widows 2 (LB:966–975, 1102). Paper "classic" inks (TH:84–87): ink `#2E1F17`, heading `#0F4A58`, accent (terracotta) `#B85126`, soft `#6B5546`, faint `#8A7362`, rule `#E9DCC6`, dots `#C9B79F`, gold `#E0A03F`, span `#4A3327`. Pages print white; the paper is the stock (LB:955–961). Reader fonts: display Cormorant, story EB Garamond, ui Montserrat (BLf throughout; `SB.brass`, `SB.terracotta`).

**Order (reader, BL:379–436):** cover → title page → colophon (its back) → dedication (only if written) → contents → per chapter: opener + memories → "What Rose learned" (before "From the family", BL:409–418) → "From the family" → final page. Print (LB:1341–1380): cover (screen only) → title page → dedication → contents → chapters (+learned before family) → colophon at the end.

**Cover (keepsake default, BC:107–130, BD:551–570).** Title `Moments & Memories` (BD:132) in Montserrat Bold caps, white on the board; line under it `Born 1945` (BD:565: subtitle, else `Born <year>`, else span, else print year); name `Rose Miller` in script (`AStoryScript` = Mrs Saint Delafield); 1–3 sepia prints with white borders at PRINT_SPOTS (BC:70–74); foot line `Family is everything to me.` (BD:139). Chocolate board `#4A3327`, spine `#3B281E`, script `#E9C87E` (TH:114). Spine text `Rose Miller  |  Moments & Memories` (BD:566). Back (BC:238–248): `Dedicated to` / rule / `The Miller family` / `The stories of a life, in the words it was lived in, kept for the family who will carry them on.` (BD:135).

**Title page.** Reader (BL:400, BLf:645–690): mark; T1 title uppercase Montserrat 4.4cqw, tracking .06em; T2 `The life of Rose Miller` italic display 6.4cqw; T3 `14 memories, 13 photographs` small caps; T4 `born 1945` small caps at the foot; her portrait small if the story has one. Print (LB:1343–1349, CSS 984–1018): 54×3px accent rule; h1 title 34pt; `.subtitle` italic 13pt = `A Life, In Their Words` (BD:143) unless the family wrote one; `.span` `Memories from 1951 to 2011` 12pt tracking .22em; `.recorded` `Kept by Jamie Miller` 10pt faint.

**Colophon.** Reader, page 2 (BL:385–394, screenshot reader-colophon.png), lines in order:
1. `Moments & Memories` (bold)
2. `The life of Rose Miller, in Rose's own words.`
3. `14 memories, 13 photographs.`
4. `Kept by Jamie Miller, Linh Miller and Sam Miller.` (LB:317–324 `creditLines`; `namesLine` LB:236 gives "A, B and C")
5. `With memories from Linh Miller.`
6. `This book is private to the Miller family.`
7. `Shaped, designed and printed by A Story.`
Print, last page (LB:1368–1379, CSS 1207–1221): centred, 10.5pt soft, 40×2px gold rule; `14 memories, 13 photographs` / `Spanning 1951–2011` / `Printed 25 October 2026` (+ ` on ivory paper` when not classic) / credit lines / `.line` italic span-colour `Every life holds a story worth preserving.`

**Dedication (keepsake, LB:1350–1356, CSS 1315–1337).** `.ded-to` `Dedicated to` 10pt tracking .08em faint; 12mm×1px rule; `.ded-name` `The Miller family` in AStoryScript 40pt heading-colour; then the family's text italic 13pt/1.6 span-colour, `white-space: pre-line`, max 400 chars (BD:144). No signature line.

**Contents (LB:910–919, CSS 1021–1040; reader BLf:624–643).** `Contents` 16pt caps tracking .2em accent; rows chapter name 12.5pt · dotted leader · count 10pt faint; 1px rule under each. Reader rows: `01` · name (display 2.95cqw) · years italic (`e.sub = c.years`) · page. Chapter order BD:109–121: Where we come from, Childhood, Growing up, Love & family, Work & making a living, The world we lived through, When everything changed, Faith & what carried me, More stories (`Anything else` printed as `More stories`, BD:123), Looking back, From the family. Years arrangement = `The 1950s` per decade (LB:131–148).

**Chapter opener.** Print (LB:924–930, CSS 1043–1073): `.chapter-eyebrow` `Chapter` (family: `In their own words`) 9pt caps .24em faint; h2 name 26pt heading-colour; `.chapter-years` `1945–1957` italic 11pt soft; 2px accent rule under; the first memory starts on the same page. Reader (BL:420–430, BLf:598–618, screenshot reader-p10-light.png): kicker `Chapter Three` (`WORDS`, BL:77), name display 7.6cqw, big italic `03` 30cqw in the cover's ink, `In this chapter` terracotta small caps, then `openerLine` = first three titles joined ` · ` + ` and N more` (BL:315–319). Family chapter: kicker `In their own words`, no number. Opener paper `SB.opener` (the sample's `#f3ece0`).

**A memory (LB:446–463 `memoryHtml`; CSS 1080–1204).** In order:
- Running head (reader only, BLf:110–116, 735): chapter name top-right, 1.45cqw caps .28em soft.
- `h3` title 14pt normal weight, 13px below.
- `.dateline` `Summer 1955 · aged 10` (LB:77–87: `${when} · aged ${n}`; undated memories print the text alone) 9.5pt caps .08em accent, pulled up 8px.
- `.asked` `Asked by Dylan` (first name only, LB:452–454) 8.5pt caps .1em faint. Reader also sets `The question  “…”  Asked by …` when `memory.asked.q` exists (BLf:174–183).
- Reader-only italic lede = `memory.summary` (BL:219, screenshot reader-p9). Print has none.
- `.plate` photographs (LB:338–348): one → `.plate-one` full width max 108mm; several → `.plate-many` two per row 42mm tall, 8px gap; 1px rule border; never split.
- Paragraphs justified; first paragraph drop cap in the cover's ink (reader, BLf:303–306). Her kept line: `.kept` words carry `.kr` marks drawing a 0.7mm gold rule at left −4.5mm (LB:374–395, CSS 1115–1126); the reader also washes the kept words gold. A version's word gets `sup.mark` `¹` terracotta after it (LB:1129–1135).
- `.credit` `Remembered by Linh, her daughter` (LB:92–95) italic 9.5pt soft right-aligned — family-chapter memories only.
- `.side` (LB:401–414, CSS 1143–1159): 0.6pt gold left rule, 5mm inset, never splits; `.side-head` italic soft `¹ Linh remembers it too` (MS:206–210 `differentlyLine`; LB:246–249); words at body size; `.side-by` `Linh Miller, her daughter` 8pt caps .08em soft (BP:127–150 byline; `credit` = `Remembered by Linh Miller, her daughter`). Screenshot reader-linh-memory.png shows the older `remembers it differently…` + `FROM THE FAMILY` eyebrow; current source has neither (BLf:272–276).
- `.also` after three versions: `Also remembered by Sam and Peggy. Scan to read their memories of it in A Story.` 9.5pt italic + code (LB:418–427).
- `.listen` (LB:353–363, CSS 1170–1179): 1px rule above, 22mm QR, italic 9pt soft `Scan with a phone camera to hear Rose tell this.` Only when the memory has a recording (`hasVoice`) and `design.qr`.
- Reader source line (BLf:80–88): `Told aloud, 12 minutes` or `From the family`; no dot for a told memory.

**"What Rose learned" (LB:866–901, CSS 1107–1112; lessons.js).** Eyebrow `Chapter`, h2 `What Rose learned`; only with ≥3 confirmed lessons (lessons.js:190). Themes in lessons.js:33–44 order (Hard choices, Work, Love, Money, Loss, Raising children, Getting through, Starting again, What matters, Health), fullest first; `.lesson-theme h3` 15pt heading-colour; `blockquote.lesson p` italic 13pt/1.5 `“…whole sentences of her exact words…”` (`wholeQuote`, lessons.js:85–95; a lesson not found verbatim in her body/transcript is dropped, lessons.js:4–8); `.lesson-from` `— from “The move” · 1985` 8.5pt .06em faint (lessons.js:220–225); 0.5pt rule under each. Reader opener: `In this chapter` + first three theme names (BL:413).

**"From the family."** Opener eyebrow `In their own words`; memories as above with `.credit`.

**Final page (reader only, BL:433, BLf:699–717).** Mark, `A STORY` 4.4cqw .3em, then above a hairline at the foot `The story keeps going` terracotta small caps and `This book is one edition. Rose's archive keeps every memory and recording, and the family can keep adding to it.` No tagline, no QR in the app.

---

## B. The samples' current anatomy and every added device

Templates S:27–106; scan view S:108–227. Face lists: Carolyn `FACES` S:388–759 (56 faces; the `/* n */` comments drift by two after S:636), Raymond S:920–1128 (38), Tom S:1283–1501 (40). Indices below are 0-based positions in each `FACES`.

| Device (not in the app book) | Template / where | Carolyn idx (S lines) | Raymond idx | Tom idx | CSS |
|---|---|---|---|---|---|
| Layer bar "Moment Feeling Meaning Lesson" | `layerBar` S:32–33, in `storyPage`/`deepPage` | every memory spread | same | same | `.layers` C:387–391 |
| Summary box with source tag `Summary · Live conversation · 16 min` | `storyPage` S:44 | 13–16, 21–22, 25–26, 29–32, 37–38 | 13–16, 19–22, 25–26 | 11–14, 21–24, 27–28 | `.summary` C:279–282, `.src` C:449–456, 576–577 |
| `The question “…” Asked by Dylan` line | `storyPage` S:45 | same | same | same | `.askline` C:392–394 |
| "Going deeper / We asked / Maya asked", deepQ/deepA | `deepPage` S:51–57 | same (right pages) | same | same | `.deep`, `.dlabel`, `.dq`, `.da` C:395–398 |
| `lessonbox` "The lesson she carries" on cloth | `deepPage` S:58; live pages S:653, 1041, 1372 | + 40 | + 18 | + 16 | `.lessonbox` C:399–402 |
| `passed` "Still alive / For Ellie / Watch it" rows | `deepPage` S:59 | same | same | same | `.passed` C:403–406 |
| QR strip "Full transcript · Recorded …" on every spread | `deepPage` S:61; `.strip`/`.mini-strip` in live, table, grew, Ellie pages | all above + 17, 28, 40, 41 | + 18, 24 | + 16, 26 | `.strip` C:285–294, `.mini-strip` C:485–488 |
| "Meanwhile, in the world" / `ctx` box | `storyPage` S:47; S:531 | 17 | — | 12, 21 (`v2`, `v3` ctx) | `.worldbox`, `.hasctx` C:632–638 |
| Profile page with stats/dl | inline S:436–460; `profilePage` S:76–85 | 7 | 7 (S:962–967) | 7 (S:1326–1331) | `.profile`, `.wk-*` C:409–422, 578 |
| Family tree page | inline | 8 (S:462–486) | — | — | `.tree` |
| Revenue chart / history columns | inline | — | 8 (S:897–909, 968–973) | 8 (S:1332–1336) | `.hist`, `.hr` C:619–627 |
| "Four layers deep" page | inline `howto`/`stack` | 9 (S:488–499) | 9 (S:975–986) | 9 (S:1338–1349) | `.howto`, `.stack` C:424–433 |
| "Where these pages came from" sources page | inline | 10 (S:501–512) | — | — | `.sources`, `.srclist` C:490–500 |
| Little / quick questions pages | `littlePage` S:64–68 | 12, 18 | 12, 33 | 10, 35 | `.littlebg`, `.lq*` C:462–474 |
| "Grew from a little question … Nine minutes later" | inline | 17 (S:526–534) | — | — | `.grew` |
| Full-bleed chapter photo, layflat spread, bigquote | inline | 20, 23–24 | — | 17–18 calendar (S:1377–1380) | `.fullbleed` C:211–214, `.layflat`, `.spanphoto`, `.bigquote` C:220, `.route` C:628–639 |
| Around the table transcript + "What the family kept / Agreed by all four" | `script` S:70–71 | 27–28 (S:557–585) | 23–24 (S:1049–1075) | 25–26 (S:1412–1438) | `.voices`, `.sr`, `.kept` C:501–517 |
| Notebook / recipe / 1983 plan / shop rules / letter home / "what he carried" | inline | 33–34 (S:590–612) | 10–11 (S:987–1017) | 19–20 (S:1382–1407) | `.nb-*`, `.rules*`, `.plan*`, `.homeletter`, `.inv` C:518–528, 598–617 |
| "Already shared: posts / diary" with post-stats | inline | 35–36 (S:614–632) | — | — | `.posts-pg`, `.post*`, `.diary*` C:53–72 |
| Live conversation "shown as it was said" with margin notes, pause | `convo` S:72–74 | 39–40 (S:636–656) | 17–18 (S:1023–1044) | 15–16 (S:1355–1375) | `.convo`, `.ct`, `.pause` C:529–539 |
| Ellie's voice-question bubbles | inline | 41 (S:658–667) | — | — | `.bubbles`, `.bub` C:540–548 |
| "What she passes on" list + coda | `passonPage` S:91–95; inline S:669–675 | 42 | 27 (S:1079) | 30 (S:1455) | `.passon` C:435–441, 550–555 |
| "From the family" notecards + "Their messages" QR | inline | 43–44 (S:677–690) | — | — | `.notes`, `.notecard`, `.qr` C:224–229, 242–249 |
| Letters back / to owners / to kids | inline | 45–46 (S:692–705) | 28–29 (S:1080–1094) | 31 (S:1457–1465) | `.letter*` C:265–266, 556–561 |
| "Her legacy, on one page" grid | `legacyPage` S:86–90 | 47 (S:707–714) | 30 (S:1095–1102) | 32 (S:1466–1473) | `.legacy`, `.lg*` C:579–585 |
| "For whoever comes next" | inline | 48 (S:716–724) | — | — | `.letter` |
| "To the reader (shared)" + privacy footer | inline, `sharedTag` S:36 | 49 (S:726–735) | 31 (S:1104–1112) | 33 (S:1475–1483) | `.reader-pg`, `.privacy` C:586–597 |
| "Five questions" / founder questions | inline | 50 (S:737–748) | 32 (S:1113–1122) | 34 (S:1484–1495) | `.five` C:590–595 |
| "For the record" (historians, levels) | inline | — | — | 29 (S:1442–1454) | `.record-pg`, `.levels` |
| Photo grid "From the box under the bed" | inline | 51 (S:750–755) | — | — | `.grid` C:260–262 |
| Final page tagline `Where life becomes legacy` + archive QR | `finalPage` S:96–100 | 52 | 34 | 36 | `.final` C:268–270, `.archive-end` |
| Sample colophon wording (sources list, "approved each one", "Layflat binding", "First edition … birthday") | inline | 3 (S:400–408) | 3 (S:930–936) | 3 (S:1293–1300) | `.colophon` C:189–191 |
| Contents teasers (`Bread and the lake`) | inline | 6 (S:421–434) | 6 (S:947–960) | 6 (S:1311–1324) | `.toc.compact` C:457–460 |
| Scanned view: Summary/Transcript tabs, archive stats, "Archive only" items, little list, family messages | `showMem` S:195–216, `showArchive` S:162–178, `showLittle` S:179–186, `showFamily` S:187–194 | `P.stats/privacy/invited` S:230–236, `ARCHIVE` S:375–386 | S:797–803, 888–896 | S:1156–1162, 1249–1258 | `.ph-*`, `.a-*`, `.turn`, `.msgs` C:330–380 |
| Sidebar NOTES describing the above | `NOTES` | S:761–791 | S:1129–1150 | S:1502–1524 | H:66–67 |

Devices the sample has that the app book **also** has: cover/endpapers/linen/bevel (keep), title page `.title-pg t1–t4` (reader form, keep), dedication `.ded-pg` (rework), contents `.toc`, chapter opener `.opener .kicker .h-chap .num .qlabel .question` (identical to BLf:598–618: keep), `.pg .mhead .pill .mtitle .mmeta .body .drop .photo .folio`, final page (keep minus tagline), back cover `backCover` (= BC:238–248 keepsake back: keep).

---

## C. Mapping for the rebuild

| App element | Existing sample class | New / change |
|---|---|---|
| Page box, margins, grain, folio | `.pg` C:144–146, `.paper-grain` C:112, `.folio` C:147–148 | none |
| Running head (chapter name, top right) | `.mhead .pill` C:275–276 | replace pill with `.rhead` (below); remove `layerBar` |
| Memory title | `.mtitle` C:277 | none |
| Dateline `Summer 1955 · aged 10` | `.mmeta` C:278 (terracotta 1.75cqw sans) | wording only: `datelineFor` pattern |
| `Asked by Dylan` | — | `.asked` |
| Body, drop cap | `.mem .body` C:283–284, `.drop` C:157 | none |
| Photographs | `.photo` C:162–163 | `.plate`, `.plate-one`, `.plate-many` |
| Kept line rule + `¹` mark | — | `.has-kept`, `.kr`, `.kept`, `sup.mark` |
| `Remembered by Linh, her daughter` | `.cap` C:158 (italic 2.2cqw soft) | `.credit` (right-aligned) |
| Side `Linh remembers it too` | — | `.side`, `.side-head`, `.side-by` |
| `Also remembered by …` | `.mini-strip` C:485 | `.also` (reuse `.qrbtn` C:287–291) |
| Listen code + `Scan with a phone camera to hear Rose tell this.` | `.strip` C:285–294, `.qrbtn` | `.listen` |
| Chapter opener | `.opener .kicker .h-chap .num .qlabel .question` C:151–152, 206–210 | wording: kicker `Chapter One`, qlabel `In this chapter`, question = first three titles; family: `In their own words`, no `.num` |
| Contents | `.toc.compact` C:200–205, 457–460 | `.t i` = years (`1945–1957`), not teasers; `.p` = page |
| Title page | `.title-pg .t1 .t2 .t3 .t4` C:192–196, `logo()` S:30 | t3 = `14 memories, 13 photographs`, t4 = `Born 1960` |
| Colophon (page 2) | `.colophon .body` C:189–191 | the seven lines of §A, one per `<p>`; move to after the title page |
| Dedication | `.ded-pg .dq` C:197–199 | add `.ded-to`, `.ded-rule`, `.ded-name`; drop `.sig` |
| Lessons chapter | `.opener` + `.pg` | `.lesson-theme`, `.lesson`, `.lesson-from` |
| Final page | `.final .wm` C:268–270, `.archive-end` | delete `.tag`; text from BL:433 |
| Back cover | `backCover` S:101–106 | wording = `The Bennett family` + BACK_MESSAGE or their line |

Proposed CSS (same tokens as C:8–27; sizes are the print's pt ÷ 11.5 × the sample's 2.45cqw body):

```css
/* ---------- parity with the app's book (legacyBook.js / BookLeaf.js) ---------- */
.rhead{position:absolute;top:5.5cqw;right:10cqw;left:11.5cqw;text-align:right;font:600 1.45cqw/1 var(--f-sans);letter-spacing:.28em;text-transform:uppercase;color:var(--ink-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.l .rhead{right:11.5cqw;left:10cqw}
.mem .mhead{display:none}                      /* pill + layer bar gone; the running head is the chapter */
.asked{display:block;margin-top:1.6cqw;font:500 1.4cqw/1 var(--f-sans);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft)}
.lede{font:italic 400 2.3cqw/1.45 var(--f-body);color:var(--ink-soft);margin:2.4cqw 0 0}   /* reader only; omit for print parity */
.mem .body{margin-top:2.6cqw}
/* photographs: one across the measure, or two side by side (legacyBook .plate) */
.plate{margin:2.6cqw 0 3cqw;break-inside:avoid}
.plate .photo{border:1px solid rgba(60,50,40,.18)}
.plate-one .photo{height:36cqw}
.plate-many{display:grid;grid-template-columns:1fr 1fr;gap:1.6cqw}
.plate-many .photo{height:24cqw}
/* her kept line: a gold rule in the margin beside its lines (legacyBook .kr), the wash as the reader sets it */
.body p.has-kept{position:relative}
.kept{background:rgba(224,160,63,.16);box-decoration-break:clone;-webkit-box-decoration-break:clone}
.kr{position:absolute;left:-4cqw;width:.5cqw;height:1.52em;margin-top:-.26em;background:var(--brass)}
.l .kr{left:auto;right:-4cqw}
sup.mark{font-size:.8em;line-height:0;vertical-align:super;margin-left:.04em;color:var(--terracotta)}
/* a version the keeper kept (legacyBook .side): a brass rule, no box */
.side{margin:3cqw 0 .8cqw;padding:.6cqw 0 .6cqw 3.2cqw;border-left:.3cqw solid var(--brass);break-inside:avoid}
.side p{margin:0;text-align:left;hyphens:manual;font:400 2.45cqw/1.52 var(--f-body)}
.side .side-head{font:italic 400 2.3cqw/1.43 var(--f-body);color:var(--ink-soft);margin-bottom:1cqw}
.side .side-words + .side-words{margin-top:.9cqw}
.side .side-by{margin-top:1.8cqw;font:600 1.55cqw/1 var(--f-sans);letter-spacing:.2em;text-transform:uppercase;color:var(--ink-soft)}
.credit{margin-top:1.6cqw;font:italic 400 2cqw/1.4 var(--f-body);color:var(--ink-soft);text-align:right}
/* the listening code, beside the story (legacyBook .listen): a rule, the code, one italic line */
.listen,.also{display:grid;grid-template-columns:9cqw 1fr;gap:2.6cqw;align-items:center;margin-top:3cqw;padding-top:1.8cqw;border-top:1px solid rgba(60,50,40,.16)}
.also{border-top:0;padding-top:0}
.listen p,.also p{margin:0;font:italic 400 2cqw/1.45 var(--f-body);color:var(--ink-soft)}
/* chapter years in the contents and under an opener's name */
.toc .t i{font-style:italic}                   /* already italic body: fill with "1945–1957" */
/* "What Rose learned": her words in the italic, where each came from under it */
.lesson-theme{margin-top:3.4cqw}
.lesson-theme h3{margin:0 0 1.2cqw;font:500 3.2cqw/1.1 var(--f-display);color:var(--ink)}
.lesson{margin:0 0 2.2cqw;padding-bottom:1.8cqw;border-bottom:1px solid rgba(60,50,40,.16);break-inside:avoid}
.lesson p{margin:0;font:italic 400 2.75cqw/1.5 var(--f-body);color:var(--ink)}
.lesson .lesson-from{margin-top:.8cqw;font:500 1.5cqw/1.4 var(--f-sans);letter-spacing:.06em;color:var(--ink-soft);font-style:normal}
/* dedication, as the keepsake's back cover sets it (legacyBook .dedication-keepsake) */
.ded-pg .ded-to{font:600 1.55cqw/1.5 var(--f-sans);letter-spacing:.24em;text-transform:uppercase;color:var(--ink-soft)}
.ded-pg .ded-rule{width:6cqw;height:1px;background:rgba(60,50,40,.35);margin:2.4cqw auto}
.ded-pg .ded-name{font:400 9cqw/1.1 var(--f-script);color:var(--ink);margin-bottom:3.6cqw}
/* colophon on the back of the title page: one line per sentence */
.colophon .body p{margin:0 0 .6em}
```

HTML shape of a memory face after the rebuild (replaces `storyPage`+`deepPage`, one page per memory, flowing to a second `.pg` with the running head when long):

```html
${grain}<span class="rhead">Childhood</span><div class="pg">
  <h3 class="mtitle">Tulip Time, 1968</h3><span class="mmeta">May 1968 · aged 8</span><span class="asked">Asked by Ellie</span>
  <div class="plate plate-one">${ph(IMG.paint)}</div>
  <div class="body"><p class="drop has-kept">Mom sewed my costume … <span class="kept"><span class="kr"></span>I <span class="kr"></span>didn’t <span class="kr"></span>stop.</span> …</p><p>…</p></div>
  <aside class="side"><p class="side-head"><sup class="mark">¹</sup> Dylan remembers it too</p><p class="side-words">…</p><p class="side-by">Dylan Ellison, her daughter</p></aside>
  <div class="listen">${qrBtn('m2','listen')}<p>Scan with a phone camera to hear Carolyn tell this.</p></div>
</div>${folio(n)}
```

Untouched: `COVERS`, `.cover*`, `.cv-*`, `.linen`, `.bevel`, `.endpaper`, `.paper-grain`, the font stack, `buildBook`/flip engine S:1528–1711, `backCover`. Fonts already match the reader (Cormorant / EB Garamond / Montserrat / Mrs Saint Delafield).

---

## D. What to delete, and what the scanned view keeps

**Delete from S (all three books):** `layerBar`/`LAYERS` S:32–33; `SRC`/`srcTag`/`sharedTag` S:34–36; `deepPage` S:51–63; `littlePage` S:64–68; `script` S:70–71; `convo` S:72–74; `profilePage` S:76–85; `legacyPage` S:86–90; `passonPage` S:91–95; `finalPage` `.tag` line S:99; `storyPage` becomes the memory template above. Per book, delete faces: Carolyn S:436–512 (profile, tree, four layers, sources), 521, 526–536 (little, grew, little), 544–545, 549–553, 557–585, 590–632, 636–675, 677–748, 750–755; Raymond S:962–1018, 1023–1044, 1049–1075, 1079–1122, 1124; Tom S:1326–1350, 1355–1407, 1412–1438, 1442–1455, 1457–1495, 1497. Delete `MEM.*.summary/q/deepQ/deepA/lesson/passed/transcript/voice/mins/rec/page` fields except what a lesson chapter needs (`lesson` as her exact words, with its memory and year), `LITTLE`, `FAMILY`, `P.stats/privacy/invited/littleTitle/littleCount/spk`, and the chart/calendar SVGs S:897–909, 1274–1282. Rewrite colophons S:400–408, 930–936, 1293–1300 to the seven lines; contents S:421–434, 947–960, 1311–1324 to chapter · years · page; `NOTES` to describe what remains. CSS blocks listed in §B's last column can go, plus `.summary`, `.askline`, `.deep*`, `.lessonbox`, `.passed`, `.strip`, `.mini-strip`, `.layers`, `.src*`, `.sp-*`, `.ph-*`/`.a-*` tabs that showed transcripts (C:330–380 partially).

**QR codes, reduced to two kinds** (as the app: LB:353–363, BL:433): `qrBtn(k,'listen')` only on memories that have a recording (keep `voice` on those memories as the fact that a recording exists, not a quote), and one `qrBtn('archive')` on the final page under `The story keeps going`.

**Scanned view (S:108–227):**
- `openScan` S:114–118, `closeScan` S:161, `readPage` S:140–160 ("Read in large type") — keep.
- `showMem` S:195–216 — keep, reduced to what the listen code opens in the app: chapter, title, dateline, her words (the body), and the existing line that voice playback is in development (S:112–113; no synthetic voice, no waveform). Delete the Summary/Transcript tabs, `a-lesson`, `Passed on`, `P.invited`, the `a-foot` "Recorded … Asked by".
- `showArchive` S:162–178 — keep for the final code: name, the chapters and memories in the book (`ARCHIVE` reduced to what the book prints), `Private to the family.` Delete `P.stats`, "Archive only"/"Shared" tags, the little/family rows.
- `showLittle` S:179–186 and `showFamily` S:187–194 — delete (no little-questions page or family-messages page in the app's book; family words print as memories with `.credit`).

---

## E. Founder's standard: what must stay true (checklist)

- [ ] **Private by default.** Colophon line 6 `This book is private to the Bennett family.` (BL:393); lessons never a second way to see a memory (lessons.js:25). Drop "chose to share two pages" devices and `sharedTag`.
- [ ] **Her exact words.** Every lesson is a verbatim span of her body/transcript, whole sentences (lessons.js:4–8, 85–95); sources it `— from “title” · year`. No paraphrased lesson boxes, no "A Story" narration of her meaning (DANIELS-STANDARD §14, §18).
- [ ] **No synthetic voice.** Listen code = her real recording only (`hasVoice`, LB:354); the sample view says playback is in development (S:112–113), never plays or implies a generated voice (MEMORY: real voices by default).
- [ ] **`Shaped, designed and printed by A Story.`** last colophon line (BL:394). Print adds `Every life holds a story worth preserving.` (LB:1378).
- [ ] **Fiction disclaimer for samples.** Keep `A sample book. Carolyn and her family are fictional.` (S:405, 935, 1298) as an eighth colophon line; the app itself never prints it.
- [ ] **Banned words** (DANIELS-STANDARD §6): remove `legacy` (`finalPage` tag S:99, `legacyPage` S:86, NOTES S:786, 1145, 1519), `memoir` (H:7, 16, 24 meta description; NOTES S:773). A named person is never "they".
- [ ] **No invented numbers** (§19; CLAUDE.md "claims users will read"): `P.stats`, `post-stats`, "64 little questions", "5 h 40 min", revenue chart — out unless the source value is shown. Counts that stay (`14 memories, 13 photographs`) must equal the faces.
- [ ] **Their words, never our debris** (§14; book-fulfilment.md:144–145): no "Summary", "The question", "Going deeper", "Still alive", layer gauge, source tags, "Meanwhile, in the world".
- [ ] **One material** (§10): page `#fbf8f1` paper, Cormorant/EB Garamond/Montserrat, terracotta dateline, brass rule — as the reader; no cloth-coloured boxes inside the pages.
- [ ] **Third person only by request** (Raymond): allowed via `NARRATIONS` (BD:77) but his own words stay in quotes and the lessons stay verbatim.
- [ ] **Keepers and contributors named** in the colophon from the story's tree (`Kept by …`, `With memories from …`, LB:271–324), owner first; never the reader.
- [ ] **Hold it next to the app:** reader-p9-light.png (memory), reader-p10-light.png (opener), reader-colophon.png, rose-book-tab.png (cover) are the acceptance images; "the same book" (book-fulfilment.md:146).
