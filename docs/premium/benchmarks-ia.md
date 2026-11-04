# Benchmarks: navigation, information architecture, audience splits

Researcher (best in class, IA), 2026-11-02. Feeds task 3 (nav + footer) of
`docs/plans/2026-11-02-premium-site-and-webapp.md`.

**Method.** Header and footer of each site were captured live on 2026-11-02 with
Playwright at 1440 x 900 and 390 x 844: every visible link/button in the top
140 px, left to right, plus the footer link list. WebFetch was used for
dropdown contents where the markup carried them (Headspace, Notion, Meminto).
Raw data and screenshots: scratchpad `ia/nav1.json`, `ia/nav2.json`,
`ia/*-d.png`, `ia/*-m.png` (not committed). Navs change often; these are
observations from one day, not permanent facts.

**Could not capture:** calm.com (bot wall, 403), hereafter.ai (home page
answers 404 today; its FAQ says business enquiries go to a sales email, no
partner page found), Duolingo's header (rendered empty headless; footer only).
Nothing below about those three is taken from memory.

---

## 1. What the best sites actually show (observed)

Counts are text links in the desktop bar, excluding logo, search, cart,
sign-in and the button(s).

| Site | Desktop bar (left to right) | Text links | Sign in | Primary button | Secondary audience |
|---|---|---|---|---|---|
| Notion | Product ▾ · Resources ▾ · Pricing · Request a demo | 4 | text link, right, before button | "Get Notion free" (filled) | inside Resources ▾ as a "Notion for" group: Enterprise, Small businesses, Startups, Developers; footer column "Notion for" |
| Stripe | Products ▾ · Solutions ▾ · Developers ▾ · Resources ▾ · Pricing · Guide me | 6 | outlined pill, right | "Contact sales" (filled); "Get started" lives in the hero | audiences are rows of Solutions ▾ (Enterprises, Startups, by industry) |
| Linear | Product ▾ · Resources ▾ · Customers · Pricing · Now · Contact | 6 | text, right | "Sign up" | Enterprise/Startups only in footer; "Contact" is the sales door |
| Superhuman | Products ▾ · Solutions ▾ · AI · Resources ▾ · Pricing · Love | 6 | text, far right | "Contact sales" + "Learn more" | Solutions ▾ |
| Headspace | For You · For Business ▾ · For Providers · Our Plans ▾ · Resources ▾ · About ▾ | 6 | text + "Help" | "Try for free" | **"For Business" is a top-level door** leading to a separate site, `organizations.headspace.com`, whose own bar has one button: "Request a demo". Dropdown groups: Who we serve (Employers, Small businesses, Health plans, Consultants, Members) / What we offer / Our approach / Resources + a featured "Request a demo" card |
| Airbnb | Homes · Experiences · Services (centre tabs) | 3 | "Log in or sign up" inside account menu | search | **"Become a host"**: one plain text link right of centre, no dropdown; whole hosting IA lives in a footer column "Hosting" |
| Apple | Store · Mac · iPad · iPhone · Watch · Vision · AirPods · Home · Entertainment · Accessories · Support | 11 | in bag/account menu | none | Business, Education, Healthcare, Government **footer only** ("For Business", "For Education" column) |
| Aesop | Gifts · Shop all · New & Notable · Skin Care · Hand & Body · Fragrance · Home · Hair · Travel · Library · Experience (+ utility row: Stores, Customer service, Email sign up) | 11 | account icon | none | none in bar; corporate gifting reached via Customer service |
| MasterClass | Certificates · Browse · On Call · Executive · Enterprise · Gifts · View Plans | 7 | text | "Get MasterClass" | "Enterprise" and "Executive" as two top-level links (reads busy) |
| Artifact Uprising | 8 category links + **BUSINESS** at the far right | 9 | icon | cart | one top-level "Business" link, right-aligned, set apart from the shop categories; footer "Business Orders" |
| Ancestry | Genealogy · DNA · Digitize · Free trial | 4 | text "Log in" | "Sign up" | none |
| **Competitors** | | | | | |
| Storyworth | (nothing) | 0 | text "Sign in" | "BUY NOW" | none; footer: Our Products / About / Social / Help |
| Remento | Shop Life Story Book · Shop Baby Book · Shop Ornaments · Our Story · FAQ · Blog (+ promo bar, Shark Tank link) | 6–7 | text "Log in" | "Buy now" | none; footer has Affiliate + 3 "X v. Remento" comparison pages |
| Tell Mel | How it works · Pricing · Gift Cards · About · Blog | 5 | text "Log in" | "Buy Now" | none |
| Meminto | Discover ▾ (mega menu by occasion/feature) + occasion groups | mega | "My account" | "Start your book" + "Gift a book" | none; Affiliate in footer |
| Storii | How it works · Pricing · FAQs | 3 | text "Login" | "Get Started" | B2B ("Adult Day Care Software", "Partners & Affiliates") **footer only** |
| StoryCorps | Stories · Programs · Participate · StoryCorps Studios · About | 5 | none | "DONATE" | Corporate partnerships in footer column "How to Support Us" |
| LifeBio | The LifeBio Solution · Health care, senior living, aging services · Government & education · Individuals & families · Shop | 5 | text "Log In" (sits between audience items) | "Learn more" | **every audience is a top-level item**, consumers last; the counter-example: the visitor has to self-classify before learning what it is |
| HereAfter AI | not captured (home 404 today) | — | — | — | business = email only, per its FAQ |
| **A Story today** | How it works · Sample books · For families · Pricing · Our story · More ▾ | 6 (+ 8 in More) | text "Sign in" | "Start free" (swaps to "Book a demo" on /organizations and /care-communities) | Institutions + Care communities as two equal rows in More ▾ ("Also for"), and twice in the footer "Who it's for" |

Sources: live capture of stripe.com, linear.app, notion.com, headspace.com,
organizations.headspace.com, airbnb.com, apple.com, aesop.com/us,
masterclass.com, artifactuprising.com, ancestry.com, superhuman.com,
welcome.storyworth.com, remento.co, tellmel.ai, meminto.com, storii.com,
storycorps.org, lifebio.org, astoryapp.com; hereafter.ai/faq via search.

---

## 2. Answers to the three questions

### How do the best sites handle secondary audiences?

Four patterns, from most to least prominent:

1. **One labelled door in the bar, leading to its own world** (Headspace "For
   Business" → separate site; Airbnb "Become a host"; Artifact Uprising
   "Business"). One item, never one per segment. Segments (employers, health
   plans, small businesses) are listed only *after* the visitor has chosen the
   door: in its dropdown or on its landing page. Once inside, that world's
   button changes to "Request a demo".
2. **A group inside an existing dropdown** (Notion "Notion for" under
   Resources; Stripe and Superhuman "Solutions"). Costs zero bar space; works
   when the audiences are many and the consumer path is the default.
3. **Footer only** (Apple Business/Education/Healthcare, Storii adult day
   care, Duolingo for Schools/Business, StoryCorps corporate partnerships).
   Used when the secondary audience arrives by direct link, sales outreach or
   search, not by browsing the consumer site.
4. **Every audience is a top-level item** (LifeBio, MasterClass "Executive" +
   "Enterprise"). This is the pattern A Story is drifting toward with
   "For families" + "Institutions" + "Care communities", and it reads as the
   least confident: the visitor sorts themselves before seeing the product.

Consumer memory-book competitors (Storyworth, Remento, Tell Mel, Meminto)
have **no** organisation door at all. A Story having one is a real difference,
so it deserves one clear door, not two half-doors.

### How many top-level nav items?

- Premium product sites cluster at **4–6 text links** (Notion 4, Ancestry 4,
  Tell Mel 5, StoryCorps 5, Stripe/Linear/Headspace/Superhuman 6).
- Sites above 6 are catalogues (Apple, Aesop, Artifact Uprising), where each
  link is a product category the shopper already understands. A Story has
  one product, so it should sit at the low end.
- The leanest consumer competitor (Storyworth) shows **zero** links: logo,
  Sign in, Buy now. That is the floor, not the target: A Story needs to
  explain a less familiar idea (conversation + many voices), so it needs
  How it works and Samples in reach.
- Nobody premium uses a generic **"More"** menu in the bar. Overflow goes to
  named dropdowns (Product, Resources) or the footer.
- Mobile: almost every site collapses to **logo + one button + menu** at
  390 px (Notion, Linear, Stripe, Headspace "Try for free", Remento "Buy now",
  Storii "Get Started"). Linear and Ancestry keep "Log in" visible on mobile
  too.

### Where do "Book a demo" and "Sign in" go?

- **Sign in** is almost always a quiet text link at the right, immediately
  left of the primary button (Notion, Linear, Storyworth, Remento, Tell Mel,
  Storii, Ancestry, Headspace). Stripe is the exception (outlined pill).
  Never a filled button, never inside a dropdown on a single-product site.
- **Book a demo** has three placements:
  - as the *only* button on the business side (organizations.headspace.com,
    Stripe "Contact sales"): the bar swaps its primary action by context;
  - as a plain *text link* in a consumer-first bar (Notion "Request a demo"
    sits beside Pricing, styled like any link; the filled button stays
    "Get Notion free");
  - as a *featured card inside the business dropdown* (Headspace "For
    Business ▾" ends with a Request a demo card).
- Nobody shows two filled buttons in the bar on consumer pages.

---

## 3. What to apply to A Story

Ranked by impact. Each is a pattern, not a copy.

1. **One door for organisations, not two.** Replace "Institutions" + "Care
   communities" (in More and the footer) with a single bar item
   **"For organizations ▾"** (pattern 1, Headspace/Airbnb). Inside:
   - Care communities: senior living, memory care, hospice.
   - Schools, libraries & companies (the current /organizations page).
   - A featured row at the end: **Book a demo** (Headspace's card pattern),
     linking to the demo form on the page that best fits; default
     `/organizations#book`.
   Both pages stay (different buyers need different proof, as the plan says);
   they stop competing as equals with the family path.
   *Change vs the plan's proposal:* leave **Programs & grants** out of this
   menu. `/programs` is "The programs we're part of" (company credentials),
   not something an organisation buys; Header.tsx already notes it left the
   bar on 2026-10-16 for reading as a notice about the company's stage. It
   belongs in the footer under Company.
2. **Bar = 5 text links + Sign in + one button.** Proposed:
   **How it works · Samples · Pricing · For organizations ▾ · Our story** |
   Sign in · **Start free**. That is mid-pack (Notion 4, Stripe/Linear 6) and
   meets AC 1. If the team wants 4, drop "Our story" to the footer (Linear,
   Notion and Storyworth keep About out of the bar); keep it if the founder
   story is part of trust for a gift buyer. Assumption: keep it, since the
   panel personas include a doubting gift buyer.
3. **Remove "More".** Its contents move to: footer (Compare, Q&A, Guides,
   Privacy, Contact, Programs, Your own story) and in-page context links
   (Compare from Pricing, Q&A from Pricing and How it works, Guides from How
   it works). No premium benchmark keeps a "More" bucket.
4. **"For families" leaves the bar.** The whole site already speaks to
   families (as Notion's bar does not say "for individuals"). Keep the page;
   link it from How it works, the home page body and the footer.
5. **Keep the context-swapped button** (already built: "Book a demo" replaces
   "Start free" on /organizations and /care-communities). This is exactly the
   organizations.headspace.com and Stripe pattern. Extend the rule only to
   pages that are part of the organisation door; nowhere else.
6. **Sign in stays a text link right of the menu, left of the button**; at
   390 px show logo + Start free + menu, with Sign in as the first row of the
   drawer (and, if it fits at 390 px without wrapping, visible in the bar like
   Linear). One sign-in label everywhere ("Sign in"; competitors mix "Log in",
   "My account", which reads less settled).
7. **Mobile drawer: two levels at most, no duplicates.** Level 1: the five
   bar items, Sign in, Start free. "For organizations" expands in place to its
   two pages + Book a demo. Then one muted group of footer-type links. Today
   the drawer repeats the More groups and "Our story" twice; the plan's AC 1
   forbids that.
8. **Footer as the full map, in four named columns** (Stripe, Linear,
   Headspace, Storyworth all do this):
   - *The product*: How it works · Samples · Pricing · Compare · Reserve for $1
   - *Who it's for*: Families · Your own story · Care communities · Schools,
     libraries & companies · Book a demo
   - *Help*: Conversation guides · Questions & answers · Contact
   - *Company*: Our story · Programs & grants · Privacy · Terms
   Rename "Institutions" to "Schools, libraries & companies" (or keep
   "Organizations") everywhere so the label in bar, footer and page title
   agree; "Institutions" appears nowhere else in the plan's vocabulary.
9. **Comparison pages as SEO, not nav** (Remento's "Storyworth v. Remento"
   footer column, Meminto's "Compare" column). A Story's single /compare page
   fits in the footer under The product and as a link from Pricing. No new
   pages proposed here; that is a later content decision for Daniel.
10. **Do not add a promo bar.** Remento and Artifact Uprising lead with
   discount/holiday bars; it cheapens the premium read, and the "% off by a
   date" kind of line is also the countdown framing the site rules forbid.

### Not recommended

- A separate subdomain for organisations (Headspace). Right at their scale,
  premature for A Story; one door on the same site is enough.
- A mega menu (Meminto, Stripe). One product, two audiences: a small dropdown
  of three rows is the right size.
- "Guide me" / AI helper in the bar (Stripe). Adds a choice without a clear
  job here.

---

## 4. Check for task 3 (how a builder knows it matches)

| Pattern | Pass when |
|---|---|
| Bar size | 1440 px: ≤ 5 text links + Sign in + 1 filled button (DOM count script) |
| One org door | "Care communities" and the organisations page appear only inside "For organizations ▾" in the header, never as top-level siblings |
| No "More" | No element labelled More in header or drawer |
| Sign in placement | Text link, immediately left of the button, same label on every page |
| Context button | /organizations and /care-communities show "Book a demo" as the only filled button; every other page shows "Start free" |
| Drawer | 390 px: ≤ 2 levels, no label appears twice |
| Footer | 4 columns; every route in `scripts/site-routes.mjs` (public ones) reachable from it |

## 5. Assumptions and flags

- Assumed "Our story" stays in the bar (trust for gift buyers); cheap to move.
- Assumed the dropdown's "Book a demo" row goes to `/organizations#book`
  unless the builder prefers a small chooser; both pages already embed the
  form with the kind preselected (Care.tsx comments).
- Flag for the supervisor (outside this brief): the /organizations hero
  phrase "The knowledge people carry should not leave with them." leans on
  loss; worth checking against the "never frame around an ending" rule.
- Calm and HereAfter could not be captured; no claims are made about them.
