/**
 * The pre-launch offer: two ways in. Decided by the team on 2026-09-29.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *   RESERVE, $1         a place in line. The count — as many as possible.
 *   FOUNDING FAMILY, $29  start now, before launch, set up by hand. The
 *                       depth — twenty-five families actually using it.
 *
 * The two buy different things, and the difference is TIME: a dollar holds
 * your place, twenty-nine dollars gets you in now. If the $29 only bought a
 * bigger discount, nobody would pick it over a dollar. Side by side, each
 * makes the other look right — the dollar is an easy yes next to $29, and
 * $29 looks serious next to a dollar.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Every promise below is honoured by hand, and none needs automating at
 * this size:
 *
 *   Starting now        an access code (the app's COMPLIMENTARY_PLAN) sent
 *                       when they are set up; switched off by hand a month
 *                       after the first call. A code's expires_at limits
 *                       redeeming it, not the access.
 *   First-year prices   a Stripe coupon on an annual plan bought on the web
 *                       at launch (App Store purchases cannot take one).
 *   Refunds             the Stripe dashboard, on request.
 *
 * ── Payment ─────────────────────────────────────────────────────────────
 * Two Stripe Payment Links, pasted into `link` below:
 *
 *   reserve    one-time $1, quantity adjustable 1–MAX_PER_FAMILY, no limit.
 *              After payment → https://astoryapp.com/reserve?paid=reserve
 *   founding   one-time $29, limit 25 payments.
 *              After payment → https://astoryapp.com/reserve?paid=founding
 *
 * Payment comes BEFORE the account, on purpose: Apple Pay is one tap, and a
 * password and an emailed code in front of it would lose people. After
 * paying they make the account with the same email Stripe collected, which
 * is how the two are matched by hand. Anyone already signed in pays with
 * their account id attached as client_reference_id.
 *
 * Somebody who reserved for $1 and then takes a founding place pays the
 * full $29 — the $1 still comes off their first year, as promised.
 *
 * When the twenty-five founding places are taken the card closes by itself
 * (foundingLeft). The card stays up, says so, and the dollar carries on.
 * OFFERS.founding.open = false closes it by hand.
 *
 * ── One rolling group of 25 ─────────────────────────────────────────────
 * Decided by the user on 2026-10-09: twenty-five founding places, open now,
 * and nothing dated after them. It replaced four cohorts of twenty-five,
 * each a week of first calls (2026-10-01), which asked a family to commit
 * to a week in November before they had heard a single call. Now a family
 * pays, we write within a working day, and the first call is set up with
 * them, in the order families joined, until the twenty-five are taken.
 *
 * The group still travels as a "cohort" (FOUNDING_GROUP), because the
 * payments table, the webhook and the public count are already built on
 * one: client_reference_id `cohort5` or `cohort5_<account id>`, and
 * user_metadata.founding_cohort. Group 5 follows the four dated weeks it
 * replaced, so the data tells the two apart. The count adds up EVERY
 * founding place, whatever cohort it carries — anyone who paid for one of
 * the old weeks holds one of the twenty-five.
 *
 * Before paying, the founding card asks one thing (Reserve.tsx): does the
 * person A Story will call have an iPhone — before launch only an iPhone
 * rings (the app's lib/callDelivery.js); Android gets a reminder to write.
 * Families who do not fit find out before they pay, not after, and the
 * dollar is right there for them.
 *
 * ── Before the links exist ──────────────────────────────────────────────
 * No dead buttons: a signed-in visitor can still reserve, or ask for a
 * founding place, for free. It is written on the account (lib/auth.ts,
 * markOffer) as user_metadata.reserved_at / founding_requested_at. In order:
 *
 *   select email, raw_user_meta_data->>'first_name' as name,
 *          raw_user_meta_data->>'reserved_at' as reserved,
 *          raw_user_meta_data->>'founding_requested_at' as founding
 *   from auth.users
 *   where raw_user_meta_data ?| array['reserved_at', 'founding_requested_at']
 *   order by coalesce(raw_user_meta_data->>'founding_requested_at',
 *                     raw_user_meta_data->>'reserved_at');
 *
 * ── Family links ────────────────────────────────────────────────────────
 * Every account has profiles.referral_code (the app's handle_new_user
 * trigger); anyone who signs up through it gets profiles.referred_by. The
 * page hands that link out once someone is in. It promises only the offer
 * itself, so nobody has to keep score by hand.
 */

export type OfferId = 'reserve' | 'founding';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * URGENCY HERE IS ONLY EVER TRUE. Two real limits, and nothing else:
 *   - the dollar's 15% closes at RESERVE_DEADLINE, a date we honour;
 *   - there are twenty-five founding places, counted live (foundingCount.ts).
 * No countdown to the second, no "only 3 left" that is not, no deadline
 * that quietly moves. And it is about the offer, never the family — "the
 * price goes up on 2 November", never "before it is too late to ask them".
 * A Story is not a memoir to finish.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The end of the day in Pacific time — the last place in the US to reach
 * it — so nobody loses the price because of their time zone. Set to 30
 * November by the team on 2026-09-29; brought forward to 2 November by the
 * user on 2026-10-09. Anyone who reserved before the change keeps the 15%:
 * the date limits when a reservation is made, not what it holds. (2
 * November is after daylight saving ends, hence -08:00.)
 */
export const RESERVE_DEADLINE = new Date('2026-11-02T23:59:59-08:00');
export const RESERVE_DEADLINE_LABEL = '2 November';

/** True while the dollar still holds its discount. */
export const reserveDiscountOpen = (now = Date.now()): boolean => now <= RESERVE_DEADLINE.getTime();

/**
 * Whole days until the deadline, or null once it has passed. Only said out
 * loud in the last week (see deadlineLine); before that the date is enough.
 */
export const daysToDeadline = (now = Date.now()): number | null => {
    const ms = RESERVE_DEADLINE.getTime() - now;
    return ms < 0 ? null : Math.ceil(ms / 86_400_000);
};

/** The one sentence of urgency, in its three states. */
export const deadlineLine = (now = Date.now()): string => {
    const days = daysToDeadline(now);
    if (days === null) return `The ${OFFERS.reserve.discount}% offer closed on ${RESERVE_DEADLINE_LABEL}`;
    if (days <= 1) return `${OFFERS.reserve.discount}% off ends today`;
    if (days <= 7) return `${OFFERS.reserve.discount}% off ends in ${days} days`;
    return `${OFFERS.reserve.discount}% off if you reserve by ${RESERVE_DEADLINE_LABEL}`;
};
/**
 * The live count of founding places is shown once at least this many are
 * taken. "19 of 25 left" is an honest number and a reason to act; "25 of
 * 25 left" is just as honest and reads like nobody wants it, so until then
 * the card says "25 places".
 */
export const SHOW_COUNT_FROM = 5;

/** How many founding places there are, in total, for now. */
export const FOUNDING_PLACES = 25;

/**
 * The cohort number every founding place now carries (see "One rolling
 * group of 25" above). Groups 1-4 were the dated weeks it replaced.
 */
export const FOUNDING_GROUP = 5;

/**
 * Founding places taken, as foundingCount.ts reads them; null when unknown.
 * `unassigned` is places on accounts with no cohort — claimed before there
 * were cohorts, or paid for on another device.
 */
export type FoundingTaken = { byCohort: Record<number, number>; unassigned: number };

/**
 * Every founding place taken, whatever cohort it carries — a family that
 * paid for one of the old dated weeks holds one of the twenty-five. Counting
 * them all is the safe way round: the page never shows a place that is not
 * there.
 */
export const foundingTaken = (taken: FoundingTaken | null): number | null =>
    taken === null ? null : Object.values(taken.byCohort).reduce((s, n) => s + n, taken.unassigned);

/** Founding places left, or null while the count is unknown. */
export const foundingLeft = (taken: FoundingTaken | null): number | null => {
    const t = foundingTaken(taken);
    return t === null ? null : Math.max(0, FOUNDING_PLACES - t);
};

/** "18 of 25 left" once the count is real and worth saying, else "25 places". */
export const foundingPlacesLine = (taken: FoundingTaken | null): string => {
    const t = foundingTaken(taken);
    const left = foundingLeft(taken);
    return t !== null && left !== null && t >= SHOW_COUNT_FROM
        ? `${left} of ${FOUNDING_PLACES} left`
        : `${FOUNDING_PLACES} places`;
};

/**
 * ── Waitlist ────────────────────────────────────────────────────────────
 * Added 2026-10-01, narrowed 2026-10-09. Once all twenty-five places are
 * taken, the founding card offers a free list for the next group, and
 * nothing else: no dates, no week to pick.
 *
 * It is free and holds nothing — no price, no place. It is the order we
 * write in: when a founding family is refunded and their place opens, or
 * when another group is opened. A free list that held the founding price
 * would undercut both offers; the dollar is still the way to hold a price.
 * Written to the account (auth.ts, joinFoundingWaitlist) as
 * founding_waitlist and founding_waitlist_at. Accounts from before
 * 2026-10-09 may carry a week number there instead of 'next'; they are on
 * the same list, in the same order.
 *
 *   select email, raw_user_meta_data->>'first_name' as name,
 *          raw_user_meta_data->>'founding_waitlist_at' as since
 *   from auth.users
 *   where raw_user_meta_data ? 'founding_waitlist'
 *     and not raw_user_meta_data ? 'founding_requested_at'
 *   order by raw_user_meta_data->>'founding_waitlist_at';
 *
 * A refunded place only reappears on the card once its account no longer
 * carries founding_requested_at — remove it by hand with the refund.
 */
export type WaitFor = number | 'next';
export const waitlistLabel = (): string => 'the next founding group';

/** Places one family can reserve at a dollar each. */
export const MAX_PER_FAMILY = 2;

/** Today's annual prices — mirrors PLANS in ./pricing. */
const INDIVIDUAL = 119;
const FAMILY = 229;

const money = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;
const off = (price: number, pct: number) => Math.round(price * (100 - pct)) / 100;

/**
 * Each offer's discount, stated once. The held prices below are derived from
 * these — they used to repeat the percentage by hand, and changing the
 * dollar from 30% to 15% left the cards still quoting 30% prices.
 */
const RESERVE_DISCOUNT = 15;
const FOUNDING_DISCOUNT = 50;

export const FULL_PRICE = { individual: money(INDIVIDUAL), family: money(FAMILY) } as const;

type Offer = {
    name: string;
    price: string;
    amount: number;
    /** Percent off the first year of an annual plan. */
    discount: number;
    individual: string;
    family: string;
    /** How many there are; null for no limit. */
    places: number | null;
    /** Stripe Payment Link. Empty until it exists — see above. */
    link: string;
    open: boolean;
    /** The account field set when it is claimed for free, before payment. */
    meta: 'reserved_at' | 'founding_requested_at';
};

export const OFFERS: Record<OfferId, Offer> = {
    reserve: {
        name: 'Reserve',
        price: '$1',
        amount: 1,
        /* 30% until 2026-09-29, when the team cut it to 15%: 30% was giving
           away too much for a dollar, and a wider gap to the founding 50%
           makes the $29 the better-looking choice for anyone who is sure. */
        discount: RESERVE_DISCOUNT,
        individual: money(off(INDIVIDUAL, RESERVE_DISCOUNT)),
        family: money(off(FAMILY, RESERVE_DISCOUNT)),
        places: null,
        /* Live since 2026-10-01. Stripe: "A Story — Reservation", $1. */
        link: 'https://buy.stripe.com/dRmeVfetL8169Ek31Pe7m00',
        open: true,
        meta: 'reserved_at',
    },
    founding: {
        name: 'Founding Family',
        price: '$29',
        amount: 29,
        discount: FOUNDING_DISCOUNT,
        individual: money(off(INDIVIDUAL, FOUNDING_DISCOUNT)),
        family: money(off(FAMILY, FOUNDING_DISCOUNT)),
        places: FOUNDING_PLACES,
        /* Live since 2026-10-01. Stripe: "A Story — Founding Family", $29. */
        link: 'https://buy.stripe.com/fZu4gB3P72GM9EkgSFe7m01',
        open: true,
        meta: 'founding_requested_at',
    },
};

/** What is left to pay at launch for a founding family's first year — the $29 counts. */
export const FOUNDING_BALANCE = {
    individual: money(off(INDIVIDUAL, FOUNDING_DISCOUNT) - OFFERS.founding.amount),
    family: money(off(FAMILY, FOUNDING_DISCOUNT) - OFFERS.founding.amount),
} as const;

export const isOfferLive = (id: OfferId): boolean => OFFERS[id].open && Boolean(OFFERS[id].link);

/**
 * The offer's Payment Link, labelled with who is paying when we know, and
 * for a founding place, its group (FOUNDING_GROUP). Stripe reads
 * client_reference_id and prefilled_email straight off the URL; a
 * client_reference_id may only hold letters, digits, dashes and
 * underscores, hence `cohort5_<account id>`.
 */
export const offerCheckoutUrl = (id: OfferId, account?: { id: string; email: string } | null): string => {
    const url = new URL(OFFERS[id].link);
    const group = id === 'founding' ? `cohort${FOUNDING_GROUP}` : '';
    const ref = [group, account?.id ?? ''].filter(Boolean).join('_');
    if (ref) url.searchParams.set('client_reference_id', ref);
    if (account) url.searchParams.set('prefilled_email', account.email);
    return url.toString();
};

/** What each one includes, as the cards list it. */
export const INCLUDES: Record<OfferId, string[]> = {
    reserve: [
        'Your place in line, in the order places were reserved',
        `${OFFERS.reserve.discount}% off your first year, if you reserve by ${RESERVE_DEADLINE_LABEL}`,
        'The dollar comes off that year too',
        `Up to ${MAX_PER_FAMILY} places per family - one for each parent`,
        'Refunded any time before launch, no questions',
    ],
    founding: [
        `One of ${FOUNDING_PLACES} families who start now, before launch`,
        'We write within a working day and set it up with you, by hand',
        'Your first month of guided calls, from the first call',
        'One of us there for that first call',
        `Half off your first year, and the $29 counts toward it`,
        'Refunded any time before the first call',
    ],
};

/** "Why pay anything at all?" — the objection a dollar raises, answered. */
export const WHY_PAY = [
    {
        t: 'It holds a price we will not offer again',
        d: `${OFFERS.founding.discount}% off the first year for founding families, ${OFFERS.reserve.discount}% for everyone who reserves by ${RESERVE_DEADLINE_LABEL}.`,
    },
    {
        t: 'None of it is a fee',
        d: 'Whatever you pay today comes off your first year. It is a head start on the plan, not a charge on top of it.',
    },
    {
        t: 'It is yours back if you ask',
        d: 'The dollar, any time before launch. The $29, any time before your first call. Write to us and it is refunded.',
    },
    {
        t: 'It is how we know you mean it',
        d: 'We open a few families at a time. Paying something, however small, tells us who to open to first.',
    },
] as const;

/** Both offers in the words the Terms need. Rendered on /terms. */
export const OFFER_TERMS =
    `Before public launch we offer two pre-launch purchases. A Reservation is a one-time payment of ` +
    `${OFFERS.reserve.price} per place, up to ${MAX_PER_FAMILY} places per family, refundable in full on request ` +
    `at any time before launch; it holds a place in the order reservations are made and, for reservations made ` +
    `by 11:59 p.m. Pacific time on ${RESERVE_DEADLINE_LABEL} 2026, ${OFFERS.reserve.discount}% off the first year of an Individual ` +
    `or Family annual plan. Reservations made before that date keep the discount whatever happens to the offer ` +
    `afterwards. A Founding Family place is a one-time payment of ` +
    `${OFFERS.founding.price}, limited to ${OFFERS.founding.places}, refundable in full on request at any time before ` +
    `the first call; places are offered on a rolling basis in the order they are bought, with the first call ` +
    `arranged with the purchaser after purchase; it gives access before launch, set ` +
    `up with the purchaser, 30 days of access equivalent to the ` +
    `Individual plan beginning on the date of the first call, and ${OFFERS.founding.discount}% off the first year of an ` +
    `Individual or Family annual plan. In both cases the amount paid is deducted from that first year, and the ` +
    'discount applies to the first year of a plan bought on the website within 60 days of launch or of the ' +
    'founding month ending, whichever is later.';
