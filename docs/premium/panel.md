# Panel scores (simulated users, same rubric both times)

Baseline = live astoryapp.com (origin/main cc87bfe), 2026-11-02. Final = site-premium @ a2f5338 local build, round 2, 2026-11-03. Same 5 personas and rubric (1-10).

| Persona | Baseline | Final | Change |
|---|---|---|---|
| Maya | 6.00 | 6.30 | +0.30 |
| Harold | 6.14 | 7.14 | +1.00 |
| Tuan | 6.14 | 6.90 | +0.76 |
| Denise | 6.00 | 6.14 | +0.14 |
| Priya | 6.10 | 6.40 | +0.30 |
| **Average** | **6.08** | **6.58** | |

Target (AC5): average ≥ 8.04 and every persona ≥ 7. **Not met.**

## Per criterion (average of 5)

| Criterion | Baseline | Final |
|---|---|---|
| premium | 6.8 | 7.0 |
| warmth | 7.8 | 7.8 |
| clarity | 5.2 | 6.2 |
| trust | 6.0 | 6.2 |
| navigation | 5.4 | 6.6 |
| mobile | 6.8 | 6.8 |
| desire | 4.6 | 5.4 |

## Final round: top frictions per persona

### Maya (6.30)
- I came to buy a gift, and the gift answer only appears about a screen and a half down /for-families. The first screen is 'The stories between you' and 'Start free'. Nothing above the fold says 'give this to your dad', and there's no Give-as-a-gift button anywhere.
- The page then tells me there's 'no gift card, code, or redemption process' and that plans 'are not on sale yet'. So what do I actually wrap for his birthday? 'Reserve for $1 to hold your place in line' is not a present I can hand a 78-year-old. Without a date for when the calls open, I can't plan around a birthday.
- Too many money paths for one person. Start free, Reserve for $1, Express $79, Individual $119/yr, Family $229/yr, Monthly $19.99, plus six book formats from Free to an Heirloom. On my phone the pricing page is about 6,600px tall. I was looking for 'Express $79, one time, nothing renews', which is exactly what I want, and it's the third card down. Most of the copy ('a month', 'renew') makes me tense up about subscriptions.
- The iPhone caveat is buried in small grey text ('Before launch, A Story can only ring an iPhone - on other phones it reminds them to write instead'). If Dad has an Android, the whole gift turns into homework for him. That should be a clear yes/no near the top: 'Does your parent have an iPhone?'
- Trust is warm but thin. The founder letter about the uncles is moving, and 'Daniel answers every email himself' is nice. But the only proof is startup-program logos (NVIDIA, Google for Startups...) in the footer. There are no reviews, no real family, and the film says 'Voices are synthetic'. Before I hand my dad's voice to a private-beta app, I want one line in plain words near the CTA on who hears the recordings.
- Small polish issues. On /pricing a lone 'The Ledger' book thumbnail floats above the price table with no caption. 'Watch the film · 49 s' on How it works sat me at the top of the page, not at the film (when I opened /how-it-works#film directly). The menu stacks 11 items in two type sizes, so 'Being asked' and 'Invited to a family's book' read like jargon to a newcomer.
- The sign-up handoff looks lovely ('This book belongs to', the puppy), but it's a plain create-account form. Nothing carries over that I'm setting this up as a gift for someone else, so I worry that I'm making MY account, not his.

### Harold (7.14)
- On /join with my large text on the iPad, the 'Open the invitation' button sits on top of the box where I type my six-letter code. I measured it: the input runs from x 51 to 325 and the button from x 267 to 553, so they overlap by about 58px. The button also runs into the right-hand column and covers the dash next to 'You can delete it all.' The one thing my grandson asked me to do is the broken spot on the page.
- 'It rings in the app at the hour you picked' is written to me, on /join and on How it works #being-asked. I did not pick any hour; my daughter did. It reads as if someone copied the family's line onto my page, and that makes me less sure the page was written for me.
- In the 'Being asked to tell your story?' column on /join, the first three lines are in the book-style serif and the next three ('We never sell data. We never train AI on your stories. You can delete it all.') switch to a plain sans font. The privacy promises are exactly what I came for, and they look stuck on afterwards.
- Everything assumes an iPhone ('on your parent's iPhone', 'In the A Story app, on their iPhone'). I read on an iPad. There is a Q&A, 'Will it ring on another phone or tablet?', but it sits folded shut in a list and nothing on /join or in the hero answers it. I would quit at that point and wait for my daughter.
- The film says 'Voices are synthetic', and 'AI biographer' is in the home headline. Nowhere near those does it say in plain words that a computer is calling me, not a person, and that a real person (Daniel) reads only if I ask. The privacy summary says this well, but it is three clicks away.
- In the footer and menu, 'Your own story' is the page that sounds like mine. It opens with 'You don't have to be old to have a story' and talks about first apartments and group chats. At 79 it tells me I'm in the wrong room. The page for me is 'Being asked' / 'Invited to a family's book', and its label doesn't say that.

### Tuan (6.90)
- /join/ never says how much is asked of me. There is no 'about 10 minutes, whenever you like' and no 'you never need an iPhone'. I find out it's free for me only on Pricing ('Invite the whole family to read and contribute, free') and in the FAQ ('no fee per relative'). That one sentence belongs on /join, in the first screen.
- The site gives two ways in and they compete. 'Anyone joins the family tree with a six-letter code' sits right above 'through one link and with no account needed'. For families also says 'There is no gift card, code, or redemption process' and then 'Anyone joins the family tree with a six-letter code'. Do I need a code, a link, or both? I got a link, so why is there an empty code box?
- The code field on /join/ has no placeholder or example (like ABC123), so it looks like a bare line under a label. If I click 'Open the invitation' with it empty, I get 'A family code is six letters or digits.' That is fine, but I hadn't been told where to find the code (the text or email from my sister?).
- /join/ is a plain text page. It has no picture, no example of what a relative's addition looks like (the home page has the lovely Sarah/Lily/Uncle Ben lake-monster cards), and nothing in the first screen to show me what I'm stepping into. Next to the home page it feels like a utility page, not Apple/Aesop level.
- My door is only in the footer ('Invited to a family's book') and on For families/the FAQ. Nothing in the header says 'Invited?', and 'For organizations' with a dropdown takes a top-nav slot. Someone who lands on the home page from a forwarded link has to scroll to the footer to find their path.
- On /join/, the right column switches from the serif bullets to Montserrat for the three trust lines ('We never sell data...'). They look stuck on, not set together with the rest.
- Pricing reads as contradictory to an outsider: 'Free to start. Pay for calls.' then 'Plans aren't on sale yet', '$1 holds your place in line', $19.99/mo, $119/yr, $229, $79, 547 questions, 90/200/140 minutes. That's a lot of numbers, and it isn't my decision anyway. For me as a contributor, only one line matters, and it's buried in a bullet.

### Denise (6.14)
- No older adult or care setting anywhere on my page. The hero photo shows a younger couple frowning over a box of photos, and the second photo is a young woman with a birthday cake. I run memory care, and I can't picture my residents in this.
- No proof for communities. There are no pilot communities, no quote from a staff member or family, and no case study. The only film uses a fictional family with synthetic voices. It's honest, but it isn't evidence.
- Privacy is three short lines, and then I'm told to bring HIPAA, consent and staff-access questions to the demo. The Questions page doesn't mention HIPAA, dementia or memory care at all. I can't take that to my administrator or compliance officer.
- Nothing explains how this works with cognitive decline: what happens when a resident repeats themselves, gets upset or can't consent alone, or who the legal decision-maker is. The 'never a test of what someone remembers' line is good, but it is one sentence.
- Pricing doesn't help me. The pricing page is all consumer plans, and it opens with 'Plans aren't on sale yet' and '$1 holds your place in line', which made me wonder whether this is ready for an institution. Community pricing is only 'quoted individually, on the demo', with no starting point or per-resident range.
- It relies on an iPhone app in a private beta. Most of my residents don't have iPhones, and the page doesn't say what equipment we'd need: shared iPads, staff phones, or something else.
- The 'What you need' block says one sentence and doesn't list any requirements, so the label promises more than it delivers.
- The demo form works and the dates are concrete. But it's a long two-step form, and the 'What kind' dropdown lists colleges and schools on a care page, which makes it feel generic. There's no direct calendar booking and no phone number.
- On mobile the hero image pushes the headline almost below the first screen, and the full care page is very long at 390px. It feels like the desktop page stacked into one column.

### Priya (6.40)
- Nothing on the site speaks to archival practice. I found no export formats (WAV or MP3, transcript formats, metadata), no Dublin Core or OHMS, no release or deed-of-gift template, no IRB language and no accessibility statement. The only mention of export is one line deep in /privacy ('open formats, whenever you ask'). For a library program that is the first thing I check, and it isn't there.
- /compare lists Storyworth, Remento, Storii, Meminto, Spomen and Heirloom, all family memoir products. It doesn't mention StoryCorps or any institutional oral-history tool, and the page is written for families ('Your parent would rather talk than type'). From the organizations side, no comparison page was linked that I could see.
- The film linked from the organizations hero ('See one conversation become a book') is a family story ('Every family has one person who knows all the stories') with a fictional family and synthetic voices. It's well made, but it shows me nothing about a program: no cohort of narrators, no consent step, no archive view for staff.
- I couldn't find any proof that institutions use this. There are no partner libraries, pilots, logos or quotes from a program lead. The trust strip in the footer shows startup programs (NVIDIA Inception, Google for Startups, etc.), which tells me about the vendor's funding, not whether it works in the field. 'Private beta' and iPhone-only calls also mean my narrators on Android or landlines can't take part, so I'd need a plan for them before I could pitch this internally.
- Pricing gives no institutional signal. /pricing is entirely consumer plans and doesn't mention organizations or programs, and /organizations says only 'quoted individually, on the demo'. I can't get a rough range for a budget request without booking a call. The /questions page has no section for organizations either: no staff access, data residency, retention or ownership of the recordings.

