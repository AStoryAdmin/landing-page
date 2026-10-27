/**
 * Head management for a client-rendered site.
 *
 * `index.html` carries sensible defaults so a crawler that never runs JS still
 * gets a complete card; this hook overwrites them per route for everything that
 * does. Tags are created if missing and reused if present, so there is never a
 * duplicate title or description in the document.
 */

import { PRICE, PRICES_PUBLIC } from "./pricing";

export const SITE = {
  name: "A Story",
  /** Override at build time with VITE_SITE_URL for preview deploys. */
  url:
    (import.meta.env?.VITE_SITE_URL as string | undefined)?.replace(
      /\/$/,
      "",
    ) ?? "https://astoryapp.com",
  /* daniel@ since 2026-10-20: the founder asked that the site's contact
     reach him directly. The legal pages keep contact@ as the notice address. */
  email: "daniel@astoryapp.com",
  tagline: "Your Family’s Living Memories",
  ogImage: "/og/home.jpg",
  twitter: "@astoryapp",
} as const;

export type SeoInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/organizations". Used to build the canonical URL. */
  path: string;
  image?: string;
  /** Set on pages that should not be indexed (thank-you, shared archives). */
  noindex?: boolean;
  /** Extra JSON-LD graph nodes for this page. */
  schema?: Record<string, unknown>[];
};

const setMeta = (
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) => {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const SCHEMA_ID = "astory-route-schema";

/**
 * A page's address as we publish it: with a trailing slash. S3 serves
 * /pricing/ with a 200 whether or not the CloudFront function is attached;
 * /pricing answers 301 → /pricing/ without it. A canonical must not redirect.
 * scripts/site-routes.mjs `canonicalPath` is the same rule for the sitemap.
 */
export const pageUrl = (path: string) =>
  `${SITE.url}${path === "/" ? "/" : path.replace(/\/?$/, "/")}`;

export const applySeo = ({
  title,
  description,
  path,
  image,
  noindex,
  schema,
}: SeoInput) => {
  if (typeof document === "undefined") return;

  const url = pageUrl(path);
  const img = `${SITE.url}${image ?? SITE.ogImage}`;

  document.title = title;
  setMeta('meta[name="description"]', "name", "description", description);
  setMeta(
    'meta[name="robots"]',
    "name",
    "robots",
    noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
  );
  setLink("canonical", url);

  setMeta('meta[property="og:title"]', "property", "og:title", title);
  setMeta(
    'meta[property="og:description"]',
    "property",
    "og:description",
    description,
  );
  setMeta('meta[property="og:url"]', "property", "og:url", url);
  setMeta('meta[property="og:image"]', "property", "og:image", img);
  setMeta(
    'meta[property="og:type"]',
    "property",
    "og:type",
    path.startsWith("/guides/") ? "article" : "website",
  );
  setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", title);
  setMeta(
    'meta[property="og:site_name"]',
    "property",
    "og:site_name",
    SITE.name,
  );

  setMeta(
    'meta[name="twitter:card"]',
    "name",
    "twitter:card",
    "summary_large_image",
  );
  setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
  setMeta(
    'meta[name="twitter:description"]',
    "name",
    "twitter:description",
    description,
  );
  setMeta('meta[name="twitter:image"]', "name", "twitter:image", img);

  // Route-level structured data. Replaced wholesale on every navigation so
  // stale nodes from the previous page never linger.
  document.getElementById(SCHEMA_ID)?.remove();
  if (schema?.length) {
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = SCHEMA_ID;
    tag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schema,
    });
    document.head.appendChild(tag);
  }
};

/* ── Reusable structured-data nodes ───────────────────────────────────── */

/**
 * "A Story" is two of the most common words in English, and other products
 * use them. These are the names Google can tie to this one — the domain, and
 * the name with "app" that people type when the plain one fails (2026-10-05).
 * Add the company's profiles to sameAs as they are made (App Store listing,
 * Instagram, LinkedIn page): it is how a search engine knows they are all us.
 */
export const ALTERNATE_NAMES = ["A Story App", "astoryapp", "A Story: Your Family’s Living Memories"];

export const organizationSchema = () => ({
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: ALTERNATE_NAMES,
  url: SITE.url,
  email: SITE.email,
  slogan: SITE.tagline,
  description:
    "An AI biographer that calls your parents, and the whole family adds their part. A Story keeps what they tell in a private family archive, with their own words, photographs and everyone’s version, and optional printed books.",
  logo: `${SITE.url}/logo.png`,
  memberOf: PROGRAMS.memberships.map((m) => ({
    "@type": "ProgramMembership",
    programName: m.program,
    hostingOrganization: { "@type": "Organization", name: m.host, url: m.url },
  })),
  award: PROGRAMS.awards,
});

/**
 * The startup programs A Story belongs to, stated once for structured data
 * and the Programs & grants page. Membership and a grant only: never
 * endorsement, investment or partnership.
 */
export const PROGRAMS = {
  memberships: [
    { program: "NVIDIA Inception", host: "NVIDIA", url: "https://www.nvidia.com/en-us/startups/" },
    { program: "Google for Startups", host: "Google", url: "https://startup.google.com" },
    { program: "AssemblyAI Startup Program", host: "AssemblyAI", url: "https://www.assemblyai.com" },
    { program: "Deepgram Startup Program", host: "Deepgram", url: "https://deepgram.com/startup-program" },
  ],
  awards: ["Cartesia Startups grant recipient"],
  faq: [
    {
      q: "Is A Story part of NVIDIA Inception?",
      a: "Yes. A Story is a member of the NVIDIA Inception program, NVIDIA’s program for startups, since October 2026. Membership is not an endorsement, an investment, or a partnership.",
    },
    {
      q: "Is A Story in the AssemblyAI Startup Program?",
      a: "Yes. A Story is a member of the AssemblyAI Startup Program. AssemblyAI builds speech AI models that transcribe and understand spoken audio.",
    },
    {
      q: "Is A Story in Google for Startups?",
      a: "Yes. A Story is a member of Google for Startups, Google’s program for early-stage companies.",
    },
    {
      q: "Is A Story in the Deepgram Startup Program?",
      a: "Yes. A Story is a member of the Deepgram Startup Program. Deepgram builds speech-to-text and voice AI models.",
    },
    {
      q: "Did A Story receive a Cartesia grant?",
      a: "Yes. A Story is a Cartesia Startups grant recipient. Cartesia builds real-time voice AI models, and Cartesia Startups awards grants to early teams building products with voice.",
    },
    {
      q: "Do these programs endorse or invest in A Story?",
      a: "No. They are programs for young companies. None of them is an endorsement, an investment, or a partnership.",
    },
  ],
};

export const productSchema = () => ({
  "@type": "SoftwareApplication",
  name: "A Story",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web, iOS",
  url: SITE.url,
  description:
    "An AI biographer that calls your parents, and the whole family adds their part. The calls ring in the A Story iPhone app (private beta); the family archive and the book work in any browser.",
  /* While prices are private (pricing.ts) the offer Google sees is Free, the
     one price the site states. */
  offers: PRICES_PUBLIC
    ? {
        "@type": "Offer",
        price: PRICE.headlineAmount,
        priceCurrency: PRICE.currency,
        description: PRICE.headlineNote,
      }
    : {
        "@type": "Offer",
        price: "0",
        priceCurrency: PRICE.currency,
        description: "Free to start, with no card and no time limit",
      },
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: pageUrl(item.path),
  })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": SITE.url + "/#website",
  name: SITE.name,
  alternateName: ALTERNATE_NAMES,
  url: SITE.url,
  publisher: { "@id": SITE.url + "/#organization" },
});
export const founderSchemas = () => [
  {
    "@type": "Person",
    "@id": SITE.url + "/our-story#daniel",
    name: "Daniel Hoang Nguyen",
    jobTitle: "Co-founder & CEO",
    worksFor: { "@id": SITE.url + "/#organization" },
    sameAs: ["https://www.linkedin.com/in/daniel-hoang-nguyen-65bb05224/"],
  },
  {
    "@type": "Person",
    "@id": SITE.url + "/our-story#bao",
    name: "Bao Vo",
    jobTitle: "Co-founder, COO & CTO",
    worksFor: { "@id": SITE.url + "/#organization" },
    sameAs: ["https://www.linkedin.com/in/gbaovo/"],
  },
];
