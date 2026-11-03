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
    hint: "Everyone starts free. Writing and reading never cost extra.",
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
  "/privacy": { label: "Privacy" },
  "/terms": { label: "Terms" },
  "/join": { label: "Joining a family's book" },
} as const satisfies Record<string, RouteInfo>;

/** The web app's sign-in: a quiet text link beside the one button. */
export const SIGN_IN = { label: "Sign in", to: APP.signIn } as const;

export type RoutePath = keyof typeof ROUTES;

export const route = (path: RoutePath): RouteInfo & { to: string } => ({
  to: path,
  ...(ROUTES[path] as RouteInfo),
});

/** A pathname without its trailing slash ("/pricing/" → "/pricing"; "/" stays). */
export const bare = (pathname: string) => pathname.replace(/(.)\/$/, "$1");

/** The two pages whose one action is a demo (header button, drawer, sticky bar). */
export const ORG_PAGES = new Set(["/organizations", "/care-communities"]);
export const isOrgPage = (pathname: string) => ORG_PAGES.has(bare(pathname));

/** The desktop bar's text items, in order. The org menu sits fourth. */
export const BAR: RoutePath[] = ["/how-it-works", "/samples", "/pricing"];
export const BAR_AFTER: RoutePath[] = ["/our-story"];
export const ORG_MENU_LABEL = "For organizations";
/** The org menu's rows. "Book a demo" is left out on the org pages (spec M11). */
export const orgMenu = (pathname: string) =>
  (["/care-communities", "/organizations", "/organizations#book"] as RoutePath[])
    .filter((p) => !(p === "/organizations#book" && isOrgPage(pathname)))
    .map(route);

/** The drawer's quiet 2 × 2 group, under the five large rows. */
export const DRAWER_MUTED: RoutePath[] = [
  "/for-families",
  "/your-story",
  "/questions",
  "/contact",
];

/** The footer's four columns: 16 page links, no repeats (spec §1.3). */
export const FOOTER_GROUPS: { title: string; rooms: RoutePath[] }[] = [
  {
    title: "The product",
    rooms: ["/how-it-works", "/samples", "/pricing", "/compare"],
  },
  {
    title: "Who it’s for",
    rooms: [
      "/for-families",
      "/your-story",
      "/join",
      "/care-communities",
      "/organizations",
    ],
  },
  { title: "Help", rooms: ["/questions", "/guides", "/contact"] },
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
