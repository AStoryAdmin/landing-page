/**
 * Head management for a client-rendered site.
 *
 * `index.html` carries sensible defaults so a crawler that never runs JS still
 * gets a complete card; this hook overwrites them per route for everything that
 * does. Tags are created if missing and reused if present, so there is never a
 * duplicate title or description in the document.
 */

import { PRICE } from './pricing';

export const SITE = {
    name: 'A Story',
    /** Override at build time with VITE_SITE_URL for preview deploys. */
    url:
        (import.meta.env?.VITE_SITE_URL as string | undefined)?.replace(
            /\/$/,
            '',
        ) ?? 'https://astoryapp.com',
    email: 'contact@astoryapp.com',
    tagline: 'Your Living Memories',
    ogImage: '/og/home.jpg',
    twitter: '@astoryapp',
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
    attr: 'name' | 'property',
    key: string,
    content: string,
) => {
    if (typeof document === 'undefined') return;
    let el = document.head.querySelector<HTMLMetaElement>(selector);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
    if (typeof document === 'undefined') return;
    let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
};

const SCHEMA_ID = 'astory-route-schema';

export const applySeo = ({
    title,
    description,
    path,
    image,
    noindex,
    schema,
}: SeoInput) => {
    if (typeof document === 'undefined') return;

    const url = `${SITE.url}${path === '/' ? '' : path}`;
    const img = `${SITE.url}${image ?? SITE.ogImage}`;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta(
        'meta[name="robots"]',
        'name',
        'robots',
        noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large',
    );
    setLink('canonical', url);

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta(
        'meta[property="og:description"]',
        'property',
        'og:description',
        description,
    );
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', img);
    setMeta(
        'meta[property="og:type"]',
        'property',
        'og:type',
        path.startsWith('/guides/') ? 'article' : 'website',
    );
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', title);
    setMeta(
        'meta[property="og:site_name"]',
        'property',
        'og:site_name',
        SITE.name,
    );

    setMeta(
        'meta[name="twitter:card"]',
        'name',
        'twitter:card',
        'summary_large_image',
    );
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta(
        'meta[name="twitter:description"]',
        'name',
        'twitter:description',
        description,
    );
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img);

    // Route-level structured data. Replaced wholesale on every navigation so
    // stale nodes from the previous page never linger.
    document.getElementById(SCHEMA_ID)?.remove();
    if (schema?.length) {
        const tag = document.createElement('script');
        tag.type = 'application/ld+json';
        tag.id = SCHEMA_ID;
        tag.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': schema,
        });
        document.head.appendChild(tag);
    }
};

/* ── Reusable structured-data nodes ───────────────────────────────────── */

export const organizationSchema = () => ({
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    slogan: SITE.tagline,
    description:
        'A Story helps families build a private living archive through conversation, photographs, original words, voice, and multiple perspectives, with optional printed volumes.',
    logo: `${SITE.url}/logo.png`,
});

export const productSchema = () => ({
    '@type': 'SoftwareApplication',
    name: 'A Story',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    url: SITE.url,
    description:
        'Voice-first life-story capture. A guided AI interviewer, a private family archive, and a printed hardcover memoir.',
    offers: {
        '@type': 'Offer',
        price: PRICE.headlineAmount,
        priceCurrency: PRICE.currency,
        description: PRICE.headlineNote,
    },
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${SITE.url}${item.path === '/' ? '' : item.path}`,
    })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
    })),
});

export const websiteSchema = () => ({
    '@type': 'WebSite',
    '@id': SITE.url + '/#website',
    name: SITE.name,
    url: SITE.url,
    publisher: { '@id': SITE.url + '/#organization' },
});
export const founderSchemas = () => [
    {
        '@type': 'Person',
        '@id': SITE.url + '/our-story#daniel',
        name: 'Daniel Hoang Nguyen',
        jobTitle: 'Co-founder & CEO',
        worksFor: { '@id': SITE.url + '/#organization' },
        sameAs: ['https://www.linkedin.com/in/daniel-hoang-nguyen-65bb05224/'],
    },
    {
        '@type': 'Person',
        '@id': SITE.url + '/our-story#bao',
        name: 'Bao Vo',
        jobTitle: 'Co-founder & COO',
        worksFor: { '@id': SITE.url + '/#organization' },
        sameAs: ['https://www.linkedin.com/in/gbaovo/'],
    },
];
