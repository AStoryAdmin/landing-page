/**
 * What A Story costs.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ONE IDEA HOLDS THIS TOGETHER: you pay to *capture*, never to *keep*.
 * Guided AI conversation is the only thing that costs real money to serve, so
 * it is the only thing metered. Everything else — the archive, the people you
 * invite, your own recordings, the question bank, export — is free forever
 * once any package has been bought, and never expires.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The reasoning behind the shape of it, which matters more than the figures:
 *
 * 1. A gift cannot be free, and there is no free tier. What used to be a
 *    "$0 forever" plan (3 conversations a week, no export) was not a taste of
 *    the product, it was a slower substitute for it: it builds a real archive
 *    eventually, which removes the reason to pay. It also quietly undid the
 *    closed grandfathered cohort in the terms, which was closed on purpose.
 *    The free sample is now the demo on /experience — no account, no card.
 *
 * 2. Charge at the moment of intent. Willingness to pay peaks when someone
 *    decides to do this — deadline-driven, emotional, comparing against other
 *    presents. Collecting later, once enough has been recorded to justify a
 *    book, is the worst possible moment: the feeling has passed and the amount
 *    is now judged against pages produced.
 *
 * 3. Urgency costs more, not less. EXPRESS is for someone with days rather
 *    than months — a birthday on Saturday, a decline, a reunion. That is the
 *    highest willingness to pay in this market *and* the heaviest use of voice
 *    AI. Pricing it below the three-month package would have made the
 *    three-month package unsellable and put the worst unit economics on the
 *    cheapest plan.
 *
 * 4. Meter a pool, not a rate. A per-day cap does not bound anything: three
 *    conversations a day across ninety days is two hundred and seventy calls.
 *    Each package carries a fixed number of guided conversations for the whole
 *    window, which bounds the cost of goods while still being more than almost
 *    anyone uses.
 *
 * 5. The book is priced separately, and that is deliberate. An earlier version
 *    of this file warned against splitting the book out — but its worry was
 *    that splitting makes the *archive* free and puts all the revenue on print,
 *    where the margin is thin. Here the archive is exactly what is being paid
 *    for, so that trap does not apply. Two reasons to unbundle:
 *
 *      · A hardcover has $40–60 of real cost of goods. Bundling one into a
 *        $150 package lets a print job set the ceiling on a software price.
 *      · The site argues that a book is a chapter rather than an ending —
 *        printed when you are ready, and another one in five years. Including
 *        exactly one book quietly restores the "memoir with a deadline" frame
 *        that the rest of the site exists to reject.
 *
 * 6. Never charge per family member. Storytellers are metered because AI cost
 *    scales with them. Everybody else — the people reading, correcting,
 *    adding photos and recording their own version of the same afternoon — is
 *    free and unlimited, on every package. Charging for them would suppress
 *    the one behavior the whole product depends on.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * VALIDATE THESE AGAINST YOUR ACTUAL COST PER MINUTE OF VOICE AI before
 * launch. The packages are sized on an estimate of roughly $0.10/min blended
 * plus transcription; if your real number is materially higher, the
 * conversation pools are the thing to move, not the prices.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Plan = {
    id: string;
    /** Plan name, as it appears on the card. */
    name: string;
    /** Who it is for, in one line. */
    who: string;
    price: string;
    /** The same figure unformatted, for structured data. */
    amount: string;
    /** How long the guided conversations run for. */
    window: string;
    /** The metered thing — the only metered thing. */
    meter: string;
    /** The plain-English version of the meter, so nobody has to do math. */
    meterNote: string;
    /** Why someone picks this one over the others. */
    blurb: string;
    /** The default choice, visually. */
    featured?: boolean;
};

export const PLANS: Plan[] = [
    {
        id: 'express',
        name: 'Express',
        who: 'One storyteller, and a date you cannot move',
        price: '$250',
        amount: '250',
        window: '7 days',
        meter: 'Unlimited guided conversations',
        meterNote: 'No cap, no rationing — talk as much as the week allows',
        blurb:
            'For a birthday on Saturday, a reunion, a hospital bed, a decline that has started. ' +
            'Everything the three-month package does, compressed into the week you actually have, ' +
            'with nothing held back.',
    },
    {
        id: 'one',
        name: 'One storyteller',
        who: 'A parent or a grandparent, unhurried',
        price: '$150',
        amount: '150',
        window: '3 months',
        meter: '40 guided conversations',
        meterNote: 'About three a week for three months — more than most people use',
        blurb:
            'The one most people want. Three months is long enough that nobody feels chased, ' +
            'and forty conversations is a whole life told properly rather than a highlight reel.',
        featured: true,
    },
    {
        id: 'family',
        name: 'Up to three storytellers',
        who: 'Both parents, or a grandmother and her sister',
        price: '$390',
        amount: '390',
        window: '3 months',
        meter: '100 guided conversations',
        meterNote: 'Shared across all three, however they end up using it',
        blurb:
            'The same afternoon told by more than one person is the whole point, and it is ' +
            'cheaper than buying the packages separately. The pool is shared, so a quiet ' +
            'storyteller never wastes anybody else’s conversations.',
    },
];

/** The default package, referenced by pages that quote a single figure. */
export const PRICE = {
    /** The headline number: one storyteller, three months. */
    gift: '$150',
    /** The same figure without formatting, for the Offer in the product schema. */
    giftAmount: '150',
    currency: 'USD',
    /** Shown beneath the price so nobody wonders what is missing. */
    giftNote: 'One payment · three months of guided conversations',
    /**
     * The hardcover, printed whenever a chapter is worth holding — not bundled,
     * for the reasons in note 5 above. Priced at print cost plus editing and
     * layout, which is the part that actually takes work.
     */
    book: '$89',
    /**
     * Extra copies for the rest of the family: no acquisition cost, and the
     * decision gets made when everyone is already delighted. Priced near
     * printing cost rather than quoted, so nobody has to ask.
     */
    extraCopy: '$59',
} as const;

/**
 * The promise that makes the rest of it work, and the one thing on this page
 * worth repeating everywhere. It is also written into the terms — see section
 * 9 — because a promise about somebody's family history should not live only
 * in marketing copy.
 */
export const FOREVER = {
    headline: 'Buy once. Keep it forever.',
    /** What keeps working after a package's window closes. */
    kept: [
        'The archive stays open, searchable, and yours',
        'Everyone you invited keeps their access',
        'Record, write and upload photos yourself — unlimited, always',
        'The full question bank, so the family can keep interviewing each other',
        'Full export of audio, transcripts and photos, whenever you ask',
        'Order a book from any chapter, any year from now',
    ],
    /** The single thing that stops, stated plainly rather than buried. */
    stops: 'Only the AI-guided conversations pause when the window closes. Nothing is deleted, nothing is locked, and nothing renews behind your back — when there is more to capture, you buy another window.',
} as const;
