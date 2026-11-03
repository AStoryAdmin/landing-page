# Benchmarks: pricing, trust, proof, and where the product video goes

Researcher (best in class), 2026-11-02. Patterns are named so we can adapt them; nothing is meant to be copied.
Feeds `design-spec.md` and plan task 4 (demo video) and task 6 (pricing group).

## How this was gathered
- A headless Chromium probe (Playwright from this worktree) loaded each page at 1440 px (Remento at 390 px too), scrolled it fully, and recorded every `<video>`/embed: position, size, `autoplay/muted/loop/controls/poster/preload`, `<track>` count, duration, nearest heading; plus price strings and counts of trust/proof wording. Raw output: `C:\Users\nguye\AppData\Local\Temp\claude\C--Users-nguye--claude-spares-spare-qdu9dF\555f792c-6ca0-4299-9d70-49b72ae6e78d\scratchpad\bench\probe.jsonl`.
- Page text was read with a fetch for structure (Storyworth, Remento, Linear pricing, Headspace subscriptions).
- Limits: bots get different pages sometimes. **Calm** blocked the probe ("Access denied"), so it is not observed here. **Arc**'s site is now a goodbye page for the browser, so it isn't a live benchmark (we also wouldn't borrow that framing). Headspace's price and rating fields loaded empty in headless mode ("null USD", "0.0 Stars"), so its numbers aren't used here.
- The counts are what the probe saw on 2026-11-02. They aren't audited figures, and none of them are claims we make about ourselves.

## 1. Product demo video: what the best sites do

| Site | Where the video sits | Playback | Notes |
|---|---|---|---|
| Loom (home) | Product video right under the hero headline (~594 px down), in its own frame | **Click to play**, embedded player with sound | Short silent loops (10–20 s, 90–230 px) only as decoration lower down |
| Superhuman (home) | Hero | Autoplay muted, **no loop**, 7 s, no controls | A UI moment, not a story with voiceover |
| Remento (home) | Hero: 8 s muted loop with poster (WebM). The explainer is a separate section behind a "Play video" control | Hero loop = ambience. Explainer and Shark Tank clip are **click-to-play**, poster, `preload="none"` | Video testimonials: poster + native controls. Most like us in category |
| Apple (privacy) | "Watch the film" button in the hero, plus short 5–9 s clips lower down that play on scroll | Film = **click to open a player**. Clips = no autoplay attribute, muted, `preload="metadata"`, started by script on view | The film is never pushed on you; you choose it |
| Apple (iPhone) | "Watch" links and a hero gallery with a play/pause control | User-controlled, with a visible pause | A pause control on anything that moves |
| Stripe (home, pricing) | No product video. "Watch video" on customer stories | Click to open | Video is proof (a customer talking), not the pitch |
| Linear (home, pricing) | No `<video>` on either page | — | Motion is built into the UI. Pricing has no video |
| Storyworth | No video anywhere on the home page | — | Static photos and the book only |
| Headspace | No demo video. **Audio "Play / Pause" samples** on home and subscriptions | Click to play | Lets you hear the product. Closest match to our "See a sample call" |

**Patterns**
1. **A video with a voice is click-to-play.** Nobody in the set autoplays a narrated film. Autoplay muted loops are only used for short (<15 s) silent product moments. Our film is 49.4 s with voiceover (AAC stereo track), tells a story, and ends on a lockup. A muted loop would lose the voice and replay the lockup over and over.
2. **The film is its own block, near the top of a "how it works" page, not the home hero.** (Loom: directly under the headline. Remento: its own explainer section. Apple: a button in the hero.) The page hero stays text plus a still, so the headline remains the fastest-loading element.
3. **Poster, then `preload="none"`.** Remento's click-to-play players load nothing until tapped. Apple loads only metadata.
4. **Modals are for secondary video** (Stripe customer stories, Apple's film). For the main demo, inline beats a modal on phones. Modals add a focus trap and a close button and break the scroll, and iOS goes fullscreen anyway.
5. **Captions are rare on the marketing sites themselves.** Not one probed `<video>` had a `<track>`. That is a gap we can close (AC 3 needs captions anyway, and the storyteller audience skews older).
6. **Portrait for phones.** Remento builds separate phone layouts and serves vertical testimonial videos (272×464). We have a matching 9:16 cut.

## 2. Pricing pages

| Site | Plans shown | Toggle / billing | Reassurance near the price | Comparison |
|---|---|---|---|---|
| Linear | 4 (Free, Basic, Business, Enterprise) | No toggle. "Billed yearly" stated on the card | One proof line + link to customers | One full feature table, "Included / Not included", limits in cells. No FAQ |
| Stripe | Pay-as-you-go + custom | — | "Cancel" and encryption wording on the page | Long, broken into sections, with an FAQ |
| Loom | 3 visible ($0 / $18 / $24) + enterprise | Annual noted | Free is the first choice | Table + FAQ |
| Superhuman | 2 prices, a short page | Monthly vs annual | — | Minimal |
| Headspace | Annual plan with a trial, family and student plans secondary | Trial length and renewal wording are spelled out | "Cancel anytime" + help link | Testimonials *on* the pricing page |
| Remento | **1 product, $99**, renewal marked "optional" ($99/yr or $12/mo), extra books in FAQ | — | **30-day money-back guarantee** next to *both* buy buttons | FAQ carries the detail |
| Storyworth | Base + upgrades + family plan, "Starting at" price | **"As a gift / For me" toggle** | Full refund within 30 days | Upgrades listed as add-ons |

**Patterns**
1. **One clear default, few choices.** Category leaders (Remento, Storyworth) lead with one plan. Developer-tool leaders show 3–4 cards with one table under them.
2. **Say what happens after the purchase in plain words, right next to the price** (renewal "optional", trial length, how to cancel). Fine print is out.
3. **Who it's for, as a choice the visitor makes**: Storyworth's gift / for-me toggle. It suits our adult-child gift buyer.
4. **One comparison table**, not several. The detail goes in an FAQ under it.
5. **The guarantee sits beside the button.** We have none, and we must not invent one.

**Our /pricing today (from the dist build = live main)**: three cards (Individual, Family, Express) + "Compare every plan, side by side" + "Stop paying, and it is still yours" + "Six ways to hold the…" + FAQ. Prices on the page: $19.99, $119, $79, $39, $1, $9.92. That already matches pattern 4, and the "still yours" block is our strongest trust asset. It matches Remento's and Storyworth's best section.

## 3. Trust and privacy

| Site | Pattern |
|---|---|
| Remento | A dedicated section on the home page: "Your family's stories belong to your family." Three points: you can always open it, you can download it, renewal only for new stories. Business continuity is covered in the FAQ |
| Storyworth | "Your stories belong to you": private, free to download any time. Also "No tech savvy needed" (works on a landline, no passwords) |
| Apple | Privacy as a whole page with a film and short clips, written as values, not legal text |
| Linear | Security is listed inside the Enterprise tier (SAML, SCIM, audit log, HIPAA). SOC 2 not on pricing |
| Headspace | Footer: Trust Center, Security, Consumer Health Data, privacy choices |

**Patterns**
1. **Ownership beats security jargon for families.** The leaders say *it's yours, you can download it, it stays private*, not certifications.
2. **Make simplicity the trust signal for the storyteller** ("no tech savvy needed"). We have the same truth: "Nothing to type", it calls them.
3. **Security detail belongs to the organization buyer** (Linear puts it on the Enterprise tier). For us that means /organizations and /care-communities, and only claims we can back.

## 4. Testimonials and proof

| Site | What they use |
|---|---|
| Storyworth | Trustpilot rating + review count, "books printed" count, years running, press badges, 4 named quotes |
| Remento | TV appearance, rating, "stories recorded" count, video testimonials with name + relationship ("bought for dad"), press quotes |
| Headspace | Ten short quotes, first name + city + topic line ("on sleep") |
| Linear / Loom | One customer-count line and logos |
| Stripe | Customer-story films behind "Watch video" |

**Patterns and what we can honestly use**
- Competitors lean on counts and ratings. **We have no audited counts** (TestFlight, small tester group), so per the plan's "Claims that need a source" table, **no counts, ratings, logos or press.**
- What we can show is **the product itself as proof**: the sample call (our Headspace-style "hear it" pattern), sample books, the film, and the founders' notes on /our-story (Storyworth's founder-story pattern).
- Quotes go up only with a real name or initials, the relationship (e.g. "daughter, set it up for her mom"), and written permission on file. Format them like Remento: who bought it for whom.

## 5. Recommendation: the one place for the film

**Placement: `/how-it-works`, as its own section right after the hero and before "Four moments. You're in the first."** Anchor: `#film`.

Why there:
- That page's job is to answer the doubting buyer's question, "what actually happens?". The film answers it in 49 s. It is the Loom and Remento position (explainer right after the promise).
- The hero keeps its text and still mock-up, so the hero headline stays the LCP element. That protects AC 3 (LCP no worse than 10 %).
- One canonical player means one encode set, one captions file and one place to measure.
- Our hero already has a secondary button, "See a sample call". Add a quiet text link beside it, "Watch the film · 49 s", that scrolls to `#film`. No modal.

Elsewhere, link to it and don't duplicate the player (this replaces the plan's earlier idea of a second player on /pricing and /organizations):
- `/pricing`: one line near the cards, "Not sure yet? Watch how a call works (49 s)", linking to `/how-it-works#film`.
- `/organizations` and `/care-communities`: the same link inside the "how it works for residents/members" part.
- Home: a text link is allowed, but home is out of scope this phase. Left for Daniel.
- Why not a second inline player: two heavy media blocks to maintain, double the LCP and data risk on mobile, and the benchmark leaders keep one explainer.

**Playback pattern: click to play, with a facade, poster, sound on tap, captions on by default**
1. **Facade first.** Show an `<img>` poster (AVIF/WebP, aim under 100 KB, `loading="lazy"`, set width/height or `aspect-ratio` so nothing shifts) with a large labelled play button: "Play the film, 49 seconds, with sound". The `<video>` element is added only on tap. Before that there are no video bytes (this is stricter than `preload="none"`).
2. **On tap**: `<video controls playsinline autoplay>` (allowed because the user tapped), sound on, native controls, `preload="none"` on the element itself.
3. **No autoplay before a tap, no muted loop, no loop at all.** The film ends on its lockup. Hold that last frame (no auto-replay), and the page carries the next step right under the player: the existing "Start free" button and the "See a sample call" link. The film has no CTA, so the page supplies it. A "Watch again" control is fine.
4. **Poster frame**: a warm moment from the storyteller or call part of the film, **not the lockup**. If it reads as a still, it also helps pages that are shared.
5. **Captions**: a WebVTT `<track kind="captions" srclang="en" label="English" default>`, on by default. Many of our viewers are older, and many will watch in a quiet room. Source: the VO lines JSON (`C:\Users\nguye\Desktop\a-story-demo-video\brief\vo-lines-v5.3.json` is the newest found). **Its timings must be checked against the v5.6 render before shipping.** If v5.6 already burns captions into the picture, ship the track with `default` off so they don't double. Also a "Read the transcript" disclosure under the player (accessibility, and the words become indexable text).
6. **Aspect by screen width**: 16:9 above 600 px. 9:16 at 600 px and below, held to `max-height: 80svh` and centered. Pick the file in the click handler from `matchMedia` (more reliable than `<source media>` across browsers), and give each orientation its own poster.
7. **Reduced motion**: nothing moves until a tap, so `prefers-reduced-motion` needs no special case. Captions and the transcript cover the no-sound case.
8. **Encodes** (the masters are 1920×1080 and 1080×1920, H.264 High, 30 fps, ~9.7 Mb/s, AAC 304 kb/s, 59.7 MB and 60.6 MB). Make H.264 MP4 at 1080p and 720p plus a WebM/AV1 1080p, each **at most 8 MB** (plan task 4). For 49.4 s that works out to an average under about 1.3 Mb/s total, e.g. CRF ~26–28 or two-pass, AAC 96–128 kb/s, `-movflags +faststart`. ffmpeg is at `C:\Users\nguye\Desktop\a-story-demo-video\tools\ffmpeg.exe`. Self-host next to the site (same host/CDN as the static build). No YouTube/Vimeo: no third-party cookies or consent banner, and a calm player with no branding. Serve 720p to phones and 1080p to wide screens.
9. **Measure**: Lighthouse mobile on `/how-it-works` before and after (AC 3). With the facade, the expected change is about the poster weight only.

## 6. Other recommendations for the page groups (no new claims)
- **/pricing**: keep one comparison table and the FAQ. Move the after-purchase plain words ("Stop paying, and it is still yours" points) up beside the cards, so they work like Remento's guarantee placement. Consider a "For someone I love / For me" view switch (Storyworth pattern) that only changes order and wording, never prices. The "15 % off if you reserve by 2 November" line expires today (plan note). Daniel decides what replaces it. Don't use countdown or "last chance" framing.
- **Trust block** (pricing + privacy + how it works): three plain promises we can already back from the live copy: it's yours, export whenever you ask, everyone you invited keeps access. Add "Nothing to type" for the storyteller. Security detail goes only on /organizations, and only what is true today.
- **Proof**: until there are sourced quotes, use show-don't-claim: the film, the sample call, sample books, the founders' notes. No counts, stars or logos.
- **Supervisor flag (existing copy, outside this file's scope)**: on /pricing, "Name a trusted person, who receives what you wrote if you can't" frames the product around an ending. That conflicts with the rule. The supervisor should review it with the page-group B builder.

## Assumptions
- "Best placement" means one canonical inline player. The other pages link to it.
- 49.4 s is shown as "49 s" (or "about 50 seconds" in running text, matching the plan's source line). Source: ffmpeg reports Duration 00:00:49.40 for the 16:9 master.
- The 9:16 cut has the same audio and story as 16:9. Not checked frame by frame.
- Sizes and bitrates are targets. Real file sizes come from the encode in task 4.
