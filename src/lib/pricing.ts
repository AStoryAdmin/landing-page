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
 * annual plans metered in AI call minutes, has a free tier, and has a 3-day
 * trial. A marketing site that argues for pricing the product does not have
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
 * 3. Everyone starts with three days of everything, no card. The fallback is
 *    Free, not a lockout, so nobody loses an archive by not deciding.
 *
 * 4. The book is unbundled by default but offered as a bundle, because some
 *    people want a year of recording and to decide about the object later.
 *    Express includes the first 40 pages, which is the whole book for most.
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
    /** The bundled-book option, where there is one. */
    book?: { price: string; note: string; saving?: string };
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
        book: {
            price: '$154',
            note: 'Adds the Keepsake book — first 40 color pages included',
            saving: 'Saves $34 against adding the book later',
        },
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
        book: {
            price: '$319',
            note: 'Adds a Keepsake book for all three — first 40 color pages each',
            saving: 'Saves $117 against adding the books later',
        },
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
        book: {
            price: 'included',
            note: 'The first 40 color pages of the Keepsake book are included — a $69 value',
        },
        utility: true,
    },
];

/** The two quiet options, deliberately below the plans worth choosing between. */
export const OTHER_PLANS = [
    {
        id: 'monthly' as const,
        label: 'Monthly',
        price: '$19.99/mo',
        sub: 'No yearly commitment · book sold separately',
    },
    {
        id: 'free' as const,
        label: 'Free',
        price: '$0',
        sub: 'Three questions a day, unlimited writing, no calls',
    },
];

/** Everyone starts here, including people who never pay. */
export const TRIAL = {
    headline: 'Start with 3 days of full access',
    detail: 'Guided calls included, no card required. It falls back to Free afterwards — never a lockout.',
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
        'Order a printed book any time',
    ],
    excludes: 'Guided AI calls, unlimited photos, and the full 504-question bank open by chapter',
} as const;

/** The headline figure, for pages that quote a single number. */
export const PRICE = {
    /** Individual, the default recommendation. */
    headline: '$119',
    headlineAmount: '119',
    currency: 'USD',
    headlineNote: 'a year for one storyteller, or $154 with the book',
    /** The Keepsake book bought on its own. */
    book: '$69',
    bookPages: '40 color pages',
    bookOverage: 'then $0.75 a page in color, or $0.35 black and white',
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
