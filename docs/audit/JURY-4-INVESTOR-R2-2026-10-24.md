# Juror 4 (YC partner), round 2: the branch nearly passes, with two quick fixes left

Read-only re-audit of branch `site-phase2` at commit 94264d8, on the dev server http://localhost:5191. I crawled
19 routes with headless Playwright at 1366x768 and checked 1920x1000 and 390x844. I checked outbound links with
GET, and the facts against PITCH-PLAYBOOK.md, ABOUT-ME.md, `pricing.ts`, `founding.ts`, `product.ts`, `seo.ts`
and Bao's round-2 decisions: no traction line, a why-now band on /our-story only, and the team with photos and
one credentials line each. I submitted no forms and opened no payment page.

**Verdict: FAIL, narrowly. The branch has no blocker.** Five of seven axes are now 8 or 9. Two sit at 7:
- **Why now.** The Peak 65 source link is a 404, and the band gives no reason the technology works now.
- **Product proof.** Every screen is an HTML mockup and every person is fictional, which is honest but unproven.

Fixes 1 and 2 below take about 20 minutes and lift why-now to 8. One real app screen or recording (fix 3) lifts
product proof to 8. With those three done, I'd call it PASS.

| Axis | R1 | R2 | Why |
|---|---|---|---|
| Clarity in 10 seconds (what, for whom, who pays) | 8 | **9** | Hero: "an AI biographer that calls your parents and grandparents…". The meta and OG description now carry the same sentence. Home's close gives all three prices. The private-beta line sits under every CTA. |
| Product is real (shown, not described) | 6 | **7** | Samples are now labeled honestly ("SAMPLE CALLS", "A scripted sample call", "Carolyn and her family are fictional"). Features the site names exist in `phone-app/src` (group calls, trusted person, letters, memoir import, memory audio, call video). But a partner still sees no real screen, no real call and no audio, and there's no traction line (Bao's call, respected). |
| Why now | 3 | **7** | There's a real band on /our-story: 18% → 30% generative-AI use among adults 50+ (AARP, a source I checked: "rising from 18% in 2024 to 30% in 2025") and 11,200 Americans turning 65 a day. Two gaps: the Peak 65 link is a 404, and both numbers are about demand, not about why the technology works now. |
| Team | 6 | **8** | Round photos, the correct titles, a credentials line each (Daniel: BS Mathematics and Data Science, Bowling Green State University. Bao: MS ECE, University of Michigan, doctoral fellow, plus go-to-market for four biotech startups) and LinkedIn links. It reads well at 1366 and 390. Home still names no founder. |
| Claims: correct and consistent | 6 | **8** | The voice, "25", app-install and hardcover contradictions are gone. Left: one audio wording mismatch (fix 4), the playbook still says 9% where the site says 18% (fix 5), and "Led go-to-market" stretches the miLEAD role a little (fix 6). |
| Looks like a company that ships | 7 | **8** | Coherent, crafted, and every page says the same thing about the beta. "Start free" goes to `app.astoryapp.com/create-account`. /samples now renders inside the site chrome on dev. |
| Nothing embarrassing on the branch | 4 | **8** | No console errors on 19 routes. No sideways scroll at 390 or 1920. All internal links resolve (`/welcome` and `/sign-in?next=%2F` come from the app domain after `/start`, not from the site). The one 404 is the Peak 65 source link. |

---

## Round-1 items: closed or open

| R1 # | Item | Status | Evidence on the branch |
|---|---|---|---|
| 1 | Deploy | **Deploy note** (not a branch fault) | See the deploy note below |
| 2 | Voice promised while marked "in development" | **Closed** (one mismatch left, fix 4) | PriceLadder, FAQ:9, the How-it-works card and the Organizations lead no longer promise voice. How it works: "Clips in the storyteller's own voice are in development." |
| 3 | "The 25 founding places" on /pricing | **Closed** | /pricing: "Plans aren't on sale yet. $1 holds your place in line…". The only "founding" line left is /reserve's "The founding places are filled - thank you." |
| 4 | App-install contradiction | **Closed** | /compare: "Your parent would rather talk than type… rings in its iPhone app… we help you set it up". /programs slogans removed. FAQ:17: "The calls ring in the A Story iPhone app, which is in a private beta. Your parent installs it once…". Home step I: "Install A Story on their iPhone together." |
| 5 | No why-now | **Closed, with defects** | The band exists. The Peak 65 link is a 404 (fix 1) and there's no technology line (fix 2). |
| 6 | Team credentials, photos, Home line | **Mostly closed** | /our-story is done. A founders line on Home is still absent (fix 7). |
| 7 | "Watch a call" with no video | **Closed** | "See a sample call" (`HowItWorks.tsx:471`, `Families.tsx:128`) |
| 8 | Unlabeled Rosa, Errol and Joan | **Closed** | "SAMPLE CALLS" kicker, "A scripted sample call", "Joan is a sample" |
| 9 | Traction or a real screen | **Traction: decided (none).** Real screen: **open** (fix 3) | No traction line, per Bao. There's still no real app screen or recording. |
| 10 | /pricing hero lead and empty right half | **Closed** | "Free to start. Pay for calls." with a clean lead, CTAs on the right, and a $0 / $119 / Free trio under it |
| 11 | /programs "In very good company" and slogans | **Closed** | "Startup programs and grants." Each program has a factual line ("NVIDIA's program for startups building with AI.") and the disclaimer stays. |
| 12 | Date in the /reserve meta | **Closed** | `founding.ts:357` `reserveMetaDescription()` has no date |
| 13 | Dead App Store link and old hero | **Half closed** | The App Store URL was emptied (`kit/ComingSoon.tsx:23`). The unused `home/Hero.tsx` with "Hear a conversation" is still in the repo (fix 9). |
| 14 | "Ships in 7-10 days" on books not yet orderable | **Closed** | "Ships in 7-10 days, once ordering opens" (`pricing.ts:265,274,288`) |
| 15 | Stale "Why families switch" comments | **Closed** | No matches in `src/` |

Earlier YC-readiness items: S2, S8, S10 and S11 are now closed on the branch. B1 and B2 depend on the deploy.

---

## Remaining fixes, ranked

| # | Sev | Page | What | File | Exact fix |
|---|---|---|---|---|---|
| 1 | High | /our-story | The "Alliance for Lifetime Income, Peak 65" source link returns **404**. protectedincome.org now redirects to LIMRA and drops the path. A partner who clicks the source of your why-now finds a dead page. | `src/pages/site/OurStory.tsx:704` | `href="https://www.limraconsumer.com/peak65/"`. It answers 200 with the title "Meeting the Challenge of America's Peak 65 Moment". Keep the label "Alliance for Lifetime Income, Peak 65". |
| 2 | Medium | /our-story why-now | Both numbers are about demand. A partner's why-now is "why is this possible now": voice AI can hold a real, follow-up conversation at a cost a subscription covers. | `OurStory.tsx`, why-now band | Add a third, quiet line with no number: "Voice AI can now hold a real conversation, follow up, and know when to stop." If a cost number is used, it must be labeled **modeled** (playbook: about $0.32-0.45 per call, modeled). The line can also stay off the site and go in the application. |
| 3 | Medium | Home "In the app", or /how-it-works | No real product artifact anywhere. Every screen is an HTML reconstruction. | `home/CallBecomes.tsx` ("In the app" card) or the How it works hero | One real screenshot from the TestFlight build (a memory card or the call screen) with a quiet "From the app" kicker. Or a 60-90 s screen recording of a real beta call, made with consent, behind "See a call". Best of all, put the recording link in the YC application. |
| 4 | Low | /samples vs /how-it-works vs FAQ | Audio is described three ways. How it works says "Clips… are in development". The FAQ (`faqData.ts:42`) says "the call audio is kept". The samples demo says "in the real archive this plays Carolyn's own recording, and the video of the telling" and "Scan to watch Carolyn tell this story on video". | `public/samples/index.html:1455,1476`, `HowItWorks.tsx` | Daniel confirms what the beta plays. `phone-app/src/lib/memoryAudio.js` plays memory audio, and `CallVideo.js` exists. If full-call playback works in beta, say "the recording plays in the app; short clips are in development". If not, change the samples line to "Sample book: in the archive this opens the transcript", and drop "and the video of the telling". |
| 5 | Low (application risk) | off-site | The site says 18% (2024) → 30% (2025), which the AARP page confirms. PITCH-PLAYBOOK §4 still says 9% (2023) → 30% (2025). If the YC application or deck uses 9%, a partner sees two numbers for one stat. | `Pitch Competition/Powerpoint Design/PITCH-PLAYBOOK.md:72,167` | Record Bao's ruling in the playbook the same day: "18% (2024) to 30% (2025), AARP 2026 Tech Trends". Then check the application text. |
| 6 | Low | /our-story | "Led go-to-market for four biotech startups". ABOUT-ME says "PM and consultant at miLEAD: market-entry and pivot strategy for 4 pre-clinical biotech startups". In an interview "led go-to-market" invites "which launches?" | `OurStory.tsx` (Bao's credentials line) | "MS ECE, University of Michigan, doctoral fellow. Market-entry strategy for four biotech startups." If Bao prefers his wording, keep it: it's his call and his own framing ("go-to-market for startups"). |
| 7 | Low | Home | No founder is named on Home. A partner who lands only on Home doesn't see who builds it. | `home/Close.tsx` | One quiet line under the close CTAs: "Built by Daniel Hoang Nguyen and Bao Vo → Our story". Bao ruled the team section belongs on /our-story, so a link is enough. |
| 8 | Nit | /samples | The canonical, og:url and JSON-LD use `https://astoryapp.com/samples` with no trailing slash. Every other route uses a slash, and the slash-less URL 301s. | `public/samples/index.html` head | Use `https://astoryapp.com/samples/` in all three. |
| 9 | Nit | repo | The unused `home/Hero.tsx` still says "Hear a conversation" → `/#listen`. If someone re-imports it, the old wording comes back. | `src/pages/site/home/Hero.tsx` | Delete it, or fix the link text. Home doesn't import it. |

## Deploy note (separate from the branch verdict)

- **Live is still the old build.** Re-checked with GET: `https://astoryapp.com/pricing/` answers **404**. The home
  page loads `index-BPTCxeNC.js`. Until Bao deploys, YC sees round-0 copy, the old title and 404s on inner pages.
- After the deploy, confirm `curl -I https://astoryapp.com/pricing/` and `/our-story/` return 200. Then click
  the two why-now source links on live.
- The body copy "if you reserve by 2 November" is prerendered into the HTML (the meta description is now
  date-free). Calendar a rebuild and publish for 3 November.

## For the application (within honesty)

- **One-liner:** the site's sentence works as-is: "An AI biographer that calls your parents and grandparents… a
  private book the whole family can add to."
- **Demo link:** a short real screen recording (fix 3) is the single best addition. The site's flipbook samples
  are a good second link (`/samples/`).
- **Founders:** /our-story now carries the team. Link it in the application.
- **Why now:** reuse the two sourced numbers exactly as the site has them, and add the technology line in the
  application.

## Not verified

- Daniel's credentials line (BS Mathematics and Data Science, Bowling Green State University). It isn't in my
  fact sources, so it stands as Bao's ruling.
- Whether the beta plays call audio or video for a family today (fix 4).
- The live site after the deploy.
- 2560x1300 and zoomed-out windows (Juror 1's remit).
