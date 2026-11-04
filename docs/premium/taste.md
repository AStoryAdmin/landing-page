# Taste checklist: what makes a warm site feel top tier

Design research for the premium pass (`docs/plans/2026-11-02-premium-site-and-webapp.md`, task 2).
Written 2026-11-02 by the design researcher. It feeds `design-spec.md`, it does not replace `design.md`:
where the two disagree, `design.md` wins until Daniel changes it.

Scope: every page except `/`. Two widths: **390 px** (phone, 390×844) and **1440 px** (laptop, 1440×900).
Every rule below is pass/fail and names how to check it. Measured values come from a Playwright pass over
the live site and nine reference sites on 2026-11-02 (method in the appendix; prefers-reduced-motion on).

---

## 1. What the references do (patterns only, no brand assets)

| Reference | What to borrow | Evidence |
|---|---|---|
| **Apple** (apple.com/iphone) | One idea per screen. On a phone, buttons sit **side by side as compact pills**, and a row of products becomes a **horizontal scroller with the next item peeking**, not a stack. Zero tracked-capital labels. | Measured: h1 48 px (390) / 80 px (1440), tracking -0.015em; 0 uppercase labels at both widths; 9 text sizes. Screenshot 390. |
| **Kinfolk / Cereal** | The picture sets the layout; type is small in count, large in contrast. One image per viewport on a phone; captions sit with the image. Wide quiet margins. | Measured: Cereal uses 3–4 text sizes; Kinfolk 7. Kinfolk's 390 first screen is one cover, two words, two links. |
| **Aesop** | Objects shot on a flat warm ground, no drop shadows, sentence-case labels, slow crossfades instead of slides, a long quiet scroll with very little per screen. | Not measured: aesop.com timed out under automation (both widths). From prior knowledge; verify by hand before quoting. |
| **Headspace** | Warmth from colour fields and illustration rather than from texture; one rounded radius used everywhere; friendly sentence-case buttons. Also a warning: a promo bar plus a cookie sheet ate their whole first phone screen. | Measured: 0 uppercase labels; 390 first screen screenshot. |
| **Airbnb** | One typeface family, 4–5 sizes, real photography at one fixed aspect ratio and radius. | Measured: 4 sizes (390), 5 (1440); 0 text under 14 px. |
| **Linear** | Display type tracked tight (-0.022em), restrained motion that only explains state, crisp focus states. Its density is wrong for us; its precision is right. | Measured: h1 64 px, -1.4 px tracking at 1440. |
| **Rauno Freiberg / Vercel Web Interface Guidelines** (vercel.com/design/guidelines) | The invisible details: hit areas larger than the visible control, `:focus-visible` rings, no layout shift on load or hover, `text-wrap: balance` on headings, tabular figures for prices, honour reduced motion, menus that open on press and close on Esc. | Pattern list, applied as rules 20–24. |
| **Emil Kowalski** (skill on disk, see §2) | `ease-out` for anything a user triggers; controls ≤ 300 ms; `scale(0.97)` on press; never animate from `scale(0)`; name the properties you transition. | Our `theme.ts` `curve`/`motion` already follow this; rules 21, 25. |
| **Competitors** (Storyworth, Remento) | What not to do: centred everything (Storyworth 61 % of text centred at 390, Remento 50 %), 12–17 text sizes, Remento 20 phone screens long with 87 images. | Measured. A Story already beats them on centring (2–14 %) and type floor; do not regress. |
| **Awwwards / SiteInspire family-legacy picks** | Not crawled this session (assumption: gallery picks change weekly and are mostly agency showcases). The gallery fashions they spread (mono micro-labels, 01/02/03 numbering, hairline grids) are banned by the taste skill below as generated-site tells. | — |

### Open-source patterns worth borrowing (behaviour, not code or styling)
- **Radix Primitives – NavigationMenu, Dialog, Collapsible**: the accessible behaviour for the planned "For organizations ▾" menu and the phone drawer (roving focus, Esc, outside click, `aria-expanded`, focus return). The site has no Radix today; copy the behaviour contract, adding the dependency is a builder decision.
- **shadcn/ui**: `data-state="open|closed"` attributes driving CSS transitions, one focus-ring recipe reused everywhere, composition over configuration.
- **Vaul (Emil Kowalski)**: the phone sheet feel: 320 ms on a drawer curve, drag-to-dismiss optional, background scale is decoration we skip.
- **vercel/commerce**: images with explicit width/height or aspect-ratio, a real `sizes` attribute, the LCP image eager with `fetchpriority="high"`, everything else lazy.
- **Motion (framer-motion) examples**: layout transitions and exit animations. We already run GSAP (`lib/scrollMotion.ts`); do not add a second motion library for the site.

---

## 2. Design skills already on disk

In `C:\Users\nguye\Desktop\phone app\phone-app\.claude\skills` (read-only, owned by the app session; all vetted 2026-10-19, see its README):

| Skill | Use it for on this site |
|---|---|
| `hallmark` (Nutlope, MIT) | The slop test and responsive gates: clickable text never wraps (gate 49), `minmax(0,1fr)` image tracks, root `overflow-x: clip`, every control's 8 states, no italic headings (already our rule). Called by name only; never let it write `tokens.css` or a new `design.md`. |
| `design-taste-frontend` (Leonxlnx, MIT) | Type study of 202 sites (top sites: headline ÷ body ≈ 4.7; few sizes far apart; tiny tracked capitals on 16 % of top sites vs 57 % of weak ones) and the dated "tells" registry. **Read its third-wave warning:** cream ground + terracotta accent + soft serif is now the most recognisable generated look. Our palette is exactly that, so our warmth has to come from what generators cannot fake: the real cloth, real family photographs, the real book, real app screens. |
| `emil-design-eng`, `review-animations`, `improve-animations`, `find-animation-opportunities` | Motion decisions and review. Values are web-native, so they apply here directly. |
| `apple-design` | Fluid-interface principles for the drawer and menus (interruptible, responds on press). |
| `impeccable` (Apache-2.0) | Critique passes (`critique`, `polish`, `clarify`) for the supervisor. |

`C:\Users\nguye\.claude\skills` holds only `spec`, `nemotron-speech` and a synced folder: no design skills.

---

## 3. Where the site stands (live, 2026-11-02)

| Page | Text sizes 390 / 1440 | Tracked-capital labels | Longest line (≈ch) 1440 | Phone screens 390 | Photo in first phone screen |
|---|---|---|---|---|---|
| /how-it-works | 11 / **15** | 15 | 91 | 9.1 | no |
| /pricing | 10 / 12 | **20** | **126** | **11.2** | no |
| /for-families | 7 / 10 | 10 | 83 | 7.6 | (not checked) |
| /our-story | 8 / 10 | 5 | 79 | 6.1 | (not checked) |
| /organizations | 8 / 9 | 16 | **126** | **12.9** | (not checked) |
| /care-communities | 8 / 10 | 13 | 73 | 7.9 | (not checked) |
| /questions | 7 / 8 | 6 | 83 | 5.7 | (not checked) |
| /compare | 7 / 10 | 7 | **149** | 5.7 | (not checked) |

Already strong, keep: h1 36–43 px on phones and 64–72 px on laptops, h1 never over 2 lines, nothing under 14 px, no small tap targets, no horizontal scroll, 1–14 % of text centred.

Seen in screenshots: every measured hero is the same composition (chocolate cloth with the A pattern, heading with one gold word, a 4–7-line paragraph, two buttons). On a phone the two buttons are two stacked full-width pills, which is the desktop row stacked rather than composed. /organizations at 1440 puts four tilted album prints in one row with photo corners on each.

Drift to fix in `design.md` (not code): it still names Source Serif 4 + Figtree; `theme.ts` (phase 2, 2026-10-23) uses Cormorant Garamond (display), EB Garamond (reading), Montserrat (interface), Caveat (handwritten captions only). The rules below use the `theme.ts` faces.

---

## 4. The checklist (28 rules)

Each rule: **the rule**, *how to test it*, and the live baseline where measured. "Script" = the measurement in the appendix.

### Type
1. **Few sizes, far apart.** A page uses at most **7 distinct text sizes at 390 and 8 at 1440**, all from `theme.ts` `type` / `--d-*` tokens. *Script: `distinctSizes`; grep new code for raw `font-size: <n>px`.* Baseline 7–15 (fails on 7 of 8 pages at 1440).
2. **Display holds the contrast.** At 1440 h1 ≥ 3.5× the reading size (72 ÷ 20 today); at 390 h1 is 36–44 px. h1 ≤ 2 lines at 1440, ≤ 3 at 390; `text-wrap: balance`; line-height 1.0–1.1; tracking between 0 and -0.02em. *Script: `h1.fs`, `h1.lines`, `h1.ls`.* Baseline passes; protect it.
3. **Reading measure 45–75 characters at 1440, 28–45 at 390; no paragraph wider than 80 ch.** *Script: `measureMax` (width ÷ half the font size).* Baseline fails on /pricing (126), /organizations (126), /compare (149), /how-it-works (91).
4. **At most 3 tracked-capital labels per page**, each ≥ 14 px and ≤ 0.12em tracking. Everything else is a sentence-case label or folds into its heading. *Script: `upperCount`.* Baseline 5–20; Apple, Headspace and Airbnb use 0.
5. **The gold/terracotta emphasis word is a moment, not a template:** on at most one heading per screen and on no more than half the headings of a page; roman, colour only (existing rule). *Count in a full-page screenshot.* Baseline: every measured hero uses it.
6. **The hero lead is short:** ≤ 3 lines at 1440, ≤ 5 at 390. Caveats (private beta, iPhone-only, currency) move to one small note line or the section that needs them, never deleted. *Line count in the 390 screenshot.* Baseline /how-it-works lead is 7 lines at 390.
7. **Tabular figures for every price and number in a row or table** (`font-variant-numeric: tabular-nums lining-nums`). *Computed style on price elements.*

### Spacing and rhythm
8. **Spacing only from tokens:** section padding is `space.section` / `space.sectionLg` × `var(--sy)`; inside a section, steps from `space.*`. *Grep the diff for raw px margins/paddings outside `theme.ts`.*
9. **Proximity reads:** the gap between sections is at least 2× the largest gap inside a section; a heading sits closer to its own text than to the block above. *Measure in DevTools on each page group's screenshot.*
10. **Gutters:** text never starts nearer than 20 px to the screen edge at 390 (`--page-gutter`); only photographs and full grounds go edge to edge. *Script check: min `left` of text boxes ≥ 20 at 390.*
11. **Less page:** every non-home page is ≤ 8 phone screens at 390 and ≤ 6 laptop screens at 1440. *Script: `screens`.* Baseline fails: /organizations 12.9 / 7.6, /pricing 11.2 / 6.2, /how-it-works 9.1, /care-communities 7.9 (passes), /for-families 7.6 (passes).

### Photography and objects
12. **A real picture in the first screen** of every page at both widths: a family photograph, a real app screen (`public/app/`), the book, or the demo video's poster. Never an illustration standing in for the product. *First-viewport screenshot at 390×844 and 1440×900.* Baseline fails at 390 on /how-it-works and /pricing.
13. **One photo treatment per section,** chosen on purpose: album print (white border, corners, tilt ≤ 2°, at most every other print tilted) *or* clean crop (one radius from `radius`, no border). Never both in one row. *Visual check per section.* Watch /organizations: four cornered, tilted prints in one row.
14. **One aspect ratio per row** (4:5 portrait or 3:2 landscape), `object-fit: cover`, and `width`/`height` or `aspect-ratio` set so nothing shifts on load. *CLS < 0.05 in Lighthouse mobile.*
15. **Warmth comes from the picture, not a filter:** no colour overlays, sepia or blur on family photographs; no text set over a photograph's face. Grain lives only in the cloth. *Visual check; grep for `filter:`/`mix-blend` on `img`.*
16. **Images earn their bytes:** WebP/AVIF, a real `sizes` attribute, the first-screen image eager with `fetchpriority="high"`, all others `loading="lazy"`; no image over 250 KB delivered at 390. *Network panel at 390.*

### Phone composition (not the desktop stacked)
17. **No two stacked full-width pills.** At 390 the primary action is one full-width button and the secondary is a text link under it, or the two sit side by side as compact pills (Apple). *390 screenshot of each hero and closing invitation.* Baseline fails on /how-it-works and /pricing.
18. **Rows become scrollers, not towers.** A row of 3+ cards, prints or steps at 1440 becomes, at 390, a horizontal `scroll-snap` row with the next item peeking ≥ 15 % of its width, or is cut to the one that matters. No single section is taller than 2.5 phone screens. *Scroll the 390 page; measure section heights.*
19. **The phone gets its own order where it helps:** when the picture is the argument it may come before the text at 390 (CSS `order`), while DOM and reading order stay logical. *Screen-reader order check vs visual order.*
20. **Touch first:** every target ≥ 44 px tall with ≥ 8 px between neighbours; buttons, nav and footer links never wrap to two lines at any width from 320 to 1920 (Hallmark gate 49); tables at 390 become stacked rows or keep a sticky first column inside their own scroller, never a page-wide horizontal scroll. *Script `smallTaps` = 0; resize sweep 320→1920.* Baseline passes.

### Micro-interactions
21. **Every control has its states:** hover (inside `@media (hover:hover) and (pointer:fine)` only), `:focus-visible` (one ring recipe, `shadow.focus` or a 2 px outline with 2 px offset), `:active` (`scale(0.97)`, `motion.press` 120 ms), disabled, and for forms loading/error/success. *Keyboard-tab every page; force states in DevTools.*
22. **Transitions name their properties** (never `transition: all`), use `theme.ts` `motion`/`curve` tokens, and controls finish ≤ 280 ms. *Grep the diff.*
23. **Menus behave like Radix NavigationMenu:** open on press (hover-intent on desktop ≥ 100 ms), close on Esc, outside click and route change, return focus to the trigger, `aria-expanded` kept true; appear with opacity + 4 px rise from their trigger in ≤ 200 ms. The phone drawer: ≤ 2 levels, focus trapped, page scroll locked, slides on `motion.move`. *Keyboard and touch walk at 390 and 1440.*
24. **No layout shift from interaction:** hover never changes size or weight of text; an opening accordion pushes content with a height transition or not at all, never a jump of the scroll position. *Watch for movement while hovering every link at 1440.*

### Motion restraint
25. **One signature arrival per page** (the hero heading's line rise is the house move). Beyond the hero, at most 3 scroll arrivals per page, one-shot, transform + opacity only, `motion.reveal`. No fade-and-rise on every section, no parallax, no pinned scenes. *Count `riseLines`/`Reveal`/`gsap.from` per page component.*
26. **Complete without motion and without JS:** with `prefers-reduced-motion: reduce` every element is visible in its final place, and the prerendered HTML shows all content. *Script runs with reduced motion; compare to a normal-motion screenshot.*
27. **Video waits for the viewer:** poster frame, captions on by default, no sound without a press, `preload="none"`, nothing loops except an explicitly decorative silent clip under 6 s. *Network panel shows no video bytes before play; LCP within 10 % of before.*

### Warmth and voice
28. **Not every page wears the same coat.** Across the 15 non-home pages in `src/lib/sitePages.json`, heroes use at least 3 distinct compositions (e.g. cloth + type, photograph-led on paper/ivory, the object or the app screen leading) and at least 2 grounds; no two pages next to each other in the nav share an identical hero. Copy in every label and button is sentence case and names the action ("Hear a call", "Start free"); nothing is framed around an ending, a deadline, scarcity or loss; no number, price or count without its source file. *Contact sheet of all heroes at 390 and 1440; copy review against `docs/mission.md`, `lib/pricing.ts`, `lib/founding.ts`.*

---

## 5. Assumptions

- "Premium and warm" stays inside the current brand (chocolate cloth, ivory, Cormorant/EB Garamond/Montserrat), per the plan.
- Numeric thresholds (7/8 sizes, 3 labels, 8/6 screens, 250 KB) are set from the measured references and the taste skill's study, rounded to what this site can reach without a rebrand. The supervisor may move a threshold with a written reason in `CHIEF-LOG.md`.
- Aesop and the Awwwards/SiteInspire picks were not measured (timeout; not crawled). Nothing in §4 depends on them alone.
- Competitor numbers are for comparison inside this doc only; none of them is a claim for the site.

---

## Appendix: the measurement

Playwright (worktree `node_modules`), Chromium, viewports 390×844 and 1440×900, `reducedMotion: 'reduce'`, `networkidle` + 800 ms. Per page it reads every visible element with its own text node and records: distinct rounded `font-size`s; % with `text-align: center`; count with `text-transform: uppercase`; count under 14 px; h1 size, line-height, tracking, line count; paragraph width ÷ (font-size × 0.5) as an approximate character measure (median and max, `main p` only); interactive elements under 44×44; `scrollHeight ÷ innerHeight`; horizontal overflow.

Script used for this doc (scratch, not in the repo):
`C:\Users\nguye\AppData\Local\Temp\claude\C--Users-nguye--claude-spares-spare-qdu9dF\555f792c-6ca0-4299-9d70-49b72ae6e78d\scratchpad\taste\measure.mjs`
(run from the worktree: `node <path> <outDir>`; it targets https://astoryapp.com; point `base` at the local `vite preview` port for after-checks). Testers should copy it into `scripts/` as a taste check when task 9 runs, so the before and after use the same code.
