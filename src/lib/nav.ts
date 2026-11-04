/**
 * One source for the site's page names (premium pass, 2026-11-02, design
 * spec §1.0). The header, the drawer, the footer and the closing "Where to
 * next" rows all say these words; `public/samples/index.html` copies them by
 * hand. Change a label here, and only here.
 *
 * Retired labels that must not come back in the chrome: Institutions, Get in
 * touch, Write to us, How A Story is different, More, Families (bare), Also
 * for, Explore.
 */
import { APP } from "./app";

export type RouteInfo = {
  /** The page's name, everywhere it is linked. */
  label: string;
  /** One line under the name in the org panel and "Where to next". */
  hint?: string;
  /** A finished page in public/, outside the React router: a plain anchor. */
  file?: boolean;
  /** The address links use when it differs from the key (spec §4D: the
      legal pages are linked in their slash form, the one S3 answers with
      a 200 whatever the CloudFront setup). */
  href?: string;
};

export const ROUTES = {
  "/how-it-works": {
    label: "How it works",
    hint: "The call, then the card and the book.",
  },
  "/samples": {
    label: "Sample books",
    hint: "Three books you can flip through, page by page.",
    file: true,
  },
  /* Source: lib/pricing.ts:183. The old hint ("Only calls are paid for.")
     was false and is not used anywhere. */
  "/pricing": {
    label: "Pricing",
    hint: "Writing and reading never cost extra.",
  },
  "/our-story": { label: "Our story", hint: "Why we started, in our own words." },
  "/for-families": {
    label: "For families",
    hint: "Giving it, and using it together.",
  },
  "/your-story": { label: "Your own story", hint: "Your life belongs here too." },
  "/care-communities": {
    label: "Care communities",
    hint: "Senior living and memory care. Know the person behind the care.",
  },
  "/organizations": {
    label: "Schools, libraries & companies",
    hint: "Colleges, schools, libraries, companies and community groups.",
  },
  /* Source: Organizations.tsx:101,588. */
  "/organizations#book": {
    label: "Book a demo",
    hint: "Thirty minutes, with a founder.",
  },
  "/compare": {
    label: "Compare",
    hint: "Beside the products you may be comparing.",
  },
  "/questions": {
    label: "Questions & answers",
    hint: "The practical things, answered plainly.",
  },
  "/guides": { label: "Conversation guides", hint: "A good place to begin." },
  "/contact": { label: "Contact", hint: "A person reads every message." },
  "/programs": { label: "Programs & grants" },
  "/privacy": { label: "Privacy", href: "/privacy/" },
  "/terms": { label: "Terms", href: "/terms/" },
  /* Panel round 2 (CHIEF-LOG B1.3): the two doors for the people a book is
     made with. The /join label is the chief's wording; the hash row needs
     id="being-asked" on the storyteller section of /how-it-works (b2). */
  /* Round 3 fix 2 (item 14, Maya #9): the drawer shows this hint under the
     label, beside "For families"'s, so the two read apart. A navigation
     line, not a claim (AppDoor.tsx: "The relative who invited you sent
     either a six-letter code or a link."). */
  "/join": {
    label: "Invited to a family’s book",
    hint: "Someone sent you a code or a link.",
  },
  /* Round 3 fix 1 (item 10, Harold): says whom it is for. A menu label,
     not a claim. */
  "/how-it-works#being-asked": { label: "Asked to tell your story?" },
  /* The short version at the top of the privacy policy (privacy.tsx:89-122,
     LegalLayout's h2#legal-short). */
  "/privacy#legal-short": { label: "Privacy, in short", href: "/privacy/#legal-short" },
  /* Phone-first plan (2026-11-04): the one action's page. The hint is
     faqData.ts:69 ("The calls ring in the A Story iPhone app, which is in a
     private beta"), shortened. */
  "/get-the-app": {
    label: "Get the iPhone app",
    hint: "The calls ring in the A Story iPhone app, in a private beta.",
  },
} as const satisfies Record<string, RouteInfo>;

/** The web app's sign-in: a quiet text link beside the one button. Kept for
    the families already in a book (phone-first plan, 2026-11-04). */
export const SIGN_IN = { label: "Sign in", to: APP.signIn } as const;

export type RoutePath = keyof typeof ROUTES;

export const route = (path: RoutePath): RouteInfo & { to: string } => {
  const info = ROUTES[path] as RouteInfo;
  return { ...info, to: info.href ?? path };
};

/** A pathname without its trailing slash ("/pricing/" → "/pricing"; "/" stays). */
export const bare = (pathname: string) => pathname.replace(/(.)\/$/, "$1");

/** The two pages whose one action is a demo (header button, drawer, sticky bar). */
export const ORG_PAGES = new Set(["/organizations", "/care-communities"]);
export const isOrgPage = (pathname: string) => ORG_PAGES.has(bare(pathname));

/**
 * The bar (phone-first plan, 2026-11-04: "Make it only 3-4 tab"). Four
 * tabs, the same four in the laptop bar and the phone drawer, then a small
 * Sign in and the one button. "For organizations" is a single link to
 * /organizations, which links on to care communities; it reads as current
 * on both pages. Our story, For families, the /join door and the rest live
 * in the footer.
 */
export const ORG_TAB_LABEL = "For organizations";
export type Tab = { path: RoutePath; label: string; to: string; file?: boolean; current: (pathname: string) => boolean };
const tab = (path: RoutePath, label?: string, also: string[] = []): Tab => {
  const r = route(path);
  return {
    path,
    label: label ?? r.label,
    to: r.to,
    file: r.file,
    current: (pathname) => [r.to, ...also].includes(bare(pathname)),
  };
};
export const TABS: Tab[] = [
  tab("/how-it-works"),
  tab("/samples"),
  tab("/pricing"),
  tab("/organizations", ORG_TAB_LABEL, ["/care-communities"]),
];

/** The footer's four columns: 19 page links, no repeats ("Get the iPhone app" added by the phone-first plan, 2026-11-04; spec §1.3; "Privacy,
    in short" added in panel round 2, CHIEF-LOG B1.3; "Asked to tell your
    story?" above "Your own story" in round 3 fix 2, item 8, Harold). */
export const FOOTER_GROUPS: { title: string; rooms: RoutePath[] }[] = [
  {
    title: "The product",
    rooms: ["/how-it-works", "/samples", "/pricing", "/compare", "/get-the-app"],
  },
  {
    title: "Who it’s for",
    rooms: [
      "/for-families",
      "/how-it-works#being-asked",
      "/your-story",
      "/join",
      "/care-communities",
      "/organizations",
    ],
  },
  {
    title: "Help",
    rooms: ["/questions", "/guides", "/privacy#legal-short", "/contact"],
  },
  {
    title: "Company",
    rooms: ["/our-story", "/programs", "/privacy", "/terms"],
  },
];

/** The slim footer's links (sign-in, sign-up, account, thanks, /l). */
export const FOOTER_SLIM: RoutePath[] = ["/privacy", "/terms", "/contact"];

/** Needs a full navigation rather than a router Link: /samples lives in
    public/, outside the router, and an absolute address leaves the site.
    (/join is answered by the router's AppDoor, so a Link is fine there.) */
export const isFile = (path: string) =>
  Boolean((ROUTES as Record<string, RouteInfo>)[path]?.file) ||
  /^https?:/.test(path);
