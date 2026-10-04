/**
 * What A Story costs.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS FILE MIRRORS THE APP. Every figure here is the one PricingScreen.js
 * shows and the one Stripe actually charges, in
 * phone-app-main/src/screens/PricingScreen.js and src/lib/callUsage.js.
 * If a number changes there, change it here. Nothing on this site is
 * allowed to quote a price the app does not honour.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * An earlier version of this file invented a different model entirely —
 * one-time "capture windows" with a "pay to capture, never to keep" promise
 * and no free tier. It read well and none of it was true: the app sells
 * annual plans metered in AI call minutes and has a free tier. A marketing
 * site that argues for pricing the product does not have
 * is worse than one with no pricing page at all, because the first thing a
 * buyer discovers after paying attention is that we were making it up.
 *
 * The shape, and why it holds together:
 *
 * 1. The meter is AI call minutes, because that is the only thing here with
 *    a real marginal cost. Writing a memory yourself is never metered on any
 *    plan — someone typing out an afternoon in 1962 is doing the thing this
 *    product exists for, and charging for it would meter the wrong side.
 *
 * 2. There is a free tier, and it is honest rather than crippled: three
 *    guided questions a day, unlimited writing, unlimited invited family, and
 *    a book you can still order. What it does not include is the AI calling
 *    you — which is exactly the thing that costs money to run.
 *
 * 3. Everyone starts on Free, with no card and no clock. There is no trial:
 *    the app had a 3-day one until 2026-09-28, removed because it counted
 *    from account creation and was spent before anyone on the waitlist could
 *    install the app. Free never runs out, so nobody loses an archive by not
 *    deciding.
 *
 * 4. The book comes in six editions, from free to done-for-you, mirroring
 *    the app's supabase/functions/_shared/bookCatalog.js (added 2026-10-02):
 *    print at home free, a print-ready Digital Edition, Softcover, Classic
 *    Hardcover, Heirloom, and a Full-Service Legacy Edition with an editor.
 *    Every membership includes a Classic Hardcover a year (one per
 *    storyteller on Family, one per Express pass) — or its value toward a
 *    finer edition — plus the Digital Edition; a member pays only shipping.
 *    The allowance is bookAllowance.js; the words are the app's planPerks.js.
 *
 *    History, so it is not repeated: until 2026-10-01 this file sold "with
 *    the book" bundles at $154 and $319, a 40-page cap and $0.75 a page
 *    after it. The app never charged any of that, and a bundle would have
 *    put a physical book inside an in-app purchase (App Store 3.1.3(e)).
 *
 * 5. Nobody is ever charged per family member. Storytellers are metered
 *    because call minutes scale with them. Everyone else — reading,
 *    correcting, recording their own version of the same afternoon — is free
 *    and unlimited on every plan including Free. Photos are the one other
 *    thing with a bill attached: unlimited on the paid plans, five a week on
 *    Free (FREE_WEEKLY_PHOTOS in the app).
 */

export type Plan = {
    /** Matches the plan slug the app and Stripe use. */
    id: 'individual' | 'family' | 'express';
    name: string;
    /** Who it is for, in one line. */
    who: string;
    /** Price without the book. */
    price: string;
    /** The same figure unformatted, for structured data. */
    amount: string;
    /** How the price is billed. */
    period: string;
    /** Roughly what it works out at monthly, where that helps. */
    monthlyEquivalent?: string;
    /** The metered thing — the only metered thing. */
    meter: string;
    /** The plain-English version of the meter, so nobody has to do math. */
    meterNote: string;
    /** Why someone picks this one over the others. */
    blurb: string;
    /** What the plan includes, beyond what every plan includes. */
    features: string[];
    /** The printed book this plan includes — see BOOK. */
    book: string;
    /** The default choice, visually. */
    featured?: boolean;
    /** Sits apart from the annual plans — never comparable dollar for dollar. */
    utility?: boolean;
};

export const PLANS: Plan[] = [
    {
        id: 'individual',
        name: 'Individual',
        who: 'One storyteller, everything open',
        price: '$119',
        amount: '119',
        period: 'per year',
        monthlyEquivalent: '≈ $9.92/mo',
        meter: '90 minutes of guided calls a month',
        meterNote: 'About three calls a week, and they roll on all year',
        blurb:
            'The one most people want. A year is long enough that nobody feels chased, and ' +
            'ninety minutes a month is a whole life told properly rather than a highlight reel.',
        features: [
            'All 504 questions, every chapter',
            'Unlimited photo uploads',
            'Invite the whole family to read and contribute, free',
        ],
        book: 'A Classic Hardcover every year, or its $69 toward a finer edition',
        featured: true,
    },
    {
        id: 'family',
        name: 'Family',
        who: 'Up to three storytellers',
        price: '$229',
        amount: '229',
        period: 'per year',
        monthlyEquivalent: '≈ $19.08/mo',
        meter: '200 minutes a month, shared',
        meterNote: 'Pooled, so a quiet storyteller never wastes anyone else’s minutes',
        blurb:
            'Both parents, or a grandmother and her sister. The same afternoon told by more ' +
            'than one person is the whole point of this, and it costs less than buying the ' +
            'plans separately.',
        features: [
            'All 504 questions, every chapter',
            'Unlimited photo uploads',
            'One shared archive — invite anyone to read and contribute, free',
        ],
        book: 'A Classic Hardcover for each storyteller every year, up to three',
    },
    {
        id: 'express',
        name: 'Express',
        who: 'A short visit, or a moment that will not wait',
        price: '$79',
        amount: '79',
        period: 'one time · about 30 days',
        meter: '140 minutes of guided calls',
        meterNote: 'Use them whenever you like inside the month — no daily cap',
        blurb:
            'For the week everyone is finally in the same house, or the month after a ' +
            'diagnosis. Nothing renews, which also makes it the straightforward one to give ' +
            'as a present.',
        features: [
            'All 504 questions, every chapter',
            'Unlimited photo uploads',
            'One storyteller',
        ],
        book: 'A Classic Hardcover with the pass, or its $69 toward a finer edition',
        utility: true,
    },
];

/** The two quiet options, deliberately below the plans worth choosing between. */
export const OTHER_PLANS = [
    {
        id: 'monthly' as const,
        label: 'Monthly',
        price: '$19.99/mo',
        sub: 'No yearly commitment · the Digital Edition included, printed books from $39',
    },
    {
        id: 'free' as const,
        label: 'Free',
        price: '$0',
        sub: 'Three questions a day, unlimited writing, no calls',
    },
];

/** Everyone starts here, including people who never pay. */
export const START = {
    headline: 'Every account starts on Free',
    detail: 'No card and no clock. Three guided questions a day and unlimited writing for as long as you like — a plan adds A Story doing the calling.',
} as const;

/** What the Free tier actually is, stated plainly rather than as a tease. */
export const FREE_TIER = {
    headline: 'Free, for as long as you like',
    blurb:
        'Not a trial that runs out. Three guided questions a day, writing in your own words ' +
        'without limit, the whole family invited free, and a printed book whenever you want ' +
        'one. What Free does not include is A Story calling you — that is the part with a ' +
        'real cost behind it.',
    includes: [
        'Three guided questions a day',
        'Unlimited writing in your own words',
        'Unlimited family members reading and contributing',
        'Five photo uploads a week',
        'The whole book to print at home, free',
    ],
    excludes: 'Guided AI calls, unlimited photos, and the full 504-question bank open by chapter',
} as const;

/** The headline figure, for pages that quote a single number. */
export const PRICE = {
    /** Individual, the default recommendation. */
    headline: '$119',
    headlineAmount: '119',
    currency: 'USD',
    headlineNote: 'a year for one storyteller, with a printed hardcover every year',
} as const;

/**
 * ─────────────────────────────────────────────────────────────────────────
 * THE BOOK, AS THE APP SELLS IT. Every edition and price below is the
 * app's bookCatalog.js default; the server can override a price
 * (BOOK_PRICES_JSON), and the app always shows what the server says. If a
 * price moves there, move it here. The members' shipping amount is not
 * quoted: it is a server setting (BOOK_SHIPPING_CENTS) to be confirmed
 * against the print company's rates, and the app shows it before checkout.
 * ─────────────────────────────────────────────────────────────────────────
 */
export type BookEdition = {
    id: 'home' | 'digital' | 'softcover' | 'hardcover' | 'heirloom' | 'legacy';
    name: string;
    price: string;
    /** Each further copy of the same book, where copies are sold. */
    extra?: string;
    badge?: string;
    tagline: string;
    includes: string[];
    delivery: string;
};

export const BOOK_EDITIONS: BookEdition[] = [
    {
        id: 'home',
        name: 'Print at home',
        price: 'Free',
        tagline: 'The whole book as a PDF, right now.',
        includes: ['Every memory and photograph, laid out as the book', 'Print it yourself, or keep it on your phone'],
        delivery: 'Instantly',
    },
    {
        id: 'digital',
        name: 'Digital Edition',
        price: '$19',
        tagline: 'Print-shop ready, to print anywhere.',
        includes: [
            'A print-ready PDF for any print shop or library',
            'The keepsake cover as its own file, laid flat',
            'Download again any time, as the story grows',
        ],
        delivery: 'Instantly',
    },
    {
        id: 'softcover',
        name: 'Softcover',
        price: '$39',
        extra: '$29',
        tagline: 'A paperback for every sibling’s shelf.',
        includes: ['Matte softcover, full colour inside', 'Every memory, every photograph, the listening codes'],
        delivery: 'Ships in 7–10 days',
    },
    {
        id: 'hardcover',
        name: 'Classic Hardcover',
        price: '$69',
        extra: '$49',
        badge: 'Most chosen',
        tagline: 'The book, bound to last.',
        includes: ['Case-bound hardcover with the keepsake cover', 'Heavy paper, full colour, every listening code'],
        delivery: 'Ships in 7–10 days',
    },
    {
        id: 'heirloom',
        name: 'Heirloom Edition',
        price: '$149',
        extra: '$119',
        badge: 'The gift',
        tagline: 'Made to be handed down.',
        includes: [
            'Linen hardcover, name foil-stamped on the spine',
            'Archival paper, satin ribbon marker',
            'Presentation box, with a dedication card in your words',
        ],
        delivery: 'Ships in 2–3 weeks',
    },
    {
        id: 'legacy',
        name: 'Full-Service Legacy Edition',
        price: '$499',
        badge: 'We do everything',
        tagline: 'A person of ours, start to finish.',
        includes: [
            'Your own editor reads and gently edits every memory',
            'Up to 50 old photographs restored',
            'A design call with you, and a proof copy before printing',
            'Three Heirloom copies in their boxes, sent to up to three homes',
        ],
        delivery: 'Ready in 6–8 weeks',
    },
];

/** The book in sentences, for pages that only mention it. */
export const BOOK = {
    /** Printed editions start here and run to the Legacy Edition. */
    from: '$39',
    members:
        'Every membership includes a Classic Hardcover — or its $69 toward a finer edition — and the Digital Edition. You pay only the shipping.',
    allowance: 'One a year on Individual, one a year for each storyteller on Family, one with each Express pass',
    pages: 'Every page of it — there is no page limit',
    ships: 'Printed editions ship to the US and Canada, with shipping included when you buy one',
    /** BOOK_ORDERING_OPEN is off in the app until a print company is set up. */
    opens: 'Printed editions open for ordering soon. The whole book can always be saved as a PDF or printed at home, free.',
} as const;

/**
 * The promise that makes the rest of it work — and unlike the version this
 * replaced, it is one the app already makes on its own pricing screen.
 */
export const KEEPS_LINE =
    'The app stays yours either way — keep writing new chapters, free, for life.';

/**
 * The promise, framed the way the company actually thinks about it.
 *
 * An earlier version of this led with "what happens the day you stop paying"
 * and described cancelling as dropping to Free. Both were true and both were
 * the wrong way round: it centred an ending on a product whose entire argument
 * is that there isn't one. A Story is not a memoir to finish. The app is the
 * thing you keep; a plan is a service you switch on when you want the asking
 * done for you, and switching it off takes nothing away.
 */
export const FOREVER = {
    headline: 'The app is yours. It does not stop being yours.',
    /** True on every plan, including Free, including after a cancellation. */
    kept: [
        'Keep writing new chapters for as long as you live — unlimited, free, always',
        'The archive stays open, searchable, and still growing',
        'Everyone you invited keeps their access and keeps contributing',
        'Every recording, transcript and photo stays yours',
        'Export the whole thing whenever you ask',
        'Print another book in five years, from the same archive',
    ],
    /** What a plan actually buys, rather than what stopping costs. */
    stops:
        'A plan buys one thing: A Story doing the asking — calling, listening, following up. ' +
        'Switch it off and that is all that pauses. You carry on writing, the family carries ' +
        'on adding, the story carries on. Switch it back on whenever there is more you want ' +
        'drawn out of somebody.',
} as const;
