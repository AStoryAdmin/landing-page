/**
 * The pre-launch offer: two ways in. Decided by the team on 2026-09-29.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *   RESERVE, $1         a place in line. The count — as many as possible.
 *   FOUNDING FAMILY, $29  start now, before launch, set up by hand. The
 *                       depth — a hundred families actually using it.
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
 *   founding   one-time $29, limit 100 payments.
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
 * When the hundred founding places are gone, set OFFERS.founding.open to
 * false. The card stays up, says so, and the dollar carries on.
 *
 * ── Cohorts ─────────────────────────────────────────────────────────────
 * The hundred places are four cohorts of twenty-five, each a week in which
 * its first calls happen (COHORTS below). Decided on 2026-10-01, replacing
 * a proposal to take $29 as an application, pick families, and refund the
 * rest. That would have made the offer LESS urgent — "pay and wait to hear"
 * gives nobody a reason to act today — and the one message we would have
 * sent most often was "your family was not chosen". Cohorts make the same
 * limit honest: a founder is on every first call, so a week really does
 * hold only so many.
 *
 * The cohort chosen before paying travels three ways, because a Payment
 * Link carries no custom fields:
 *   - into Stripe as client_reference_id, `cohort2` or `cohort2_<account
 *     id>` (offerCheckoutUrl) — the record of who paid for which week;
 *   - into this browser (rememberCohort), so the place written to the
 *     account on return carries it as user_metadata.founding_cohort;
 *   - into the public count, per cohort (supabase/founding-count.sql).
 * A buyer who pays on one device and makes the account on another arrives
 * with no cohort; the count files them under the first cohort (see
 * cohortTaken), and Stripe's client_reference_id says where they belong.
 *
 * Before paying, the founding card asks two things (Reserve.tsx): does the
 * person A Story will call have an iPhone — before launch only an iPhone
 * rings (the app's lib/callDelivery.js); Android gets a reminder to write —
 * and which week suits the first call. Families who do not fit find out
 * before they pay, not after, and the dollar is right there for them.
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
 *   - there are a hundred founding places, counted live (foundingCount.ts).
 * No countdown to the second, no "only 3 left" that is not, no deadline
 * that quietly moves. And it is about the offer, never the family — "the
 * price goes up on 30 November", never "before it is too late to ask them".
 * A Story is not a memoir to finish.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The end of 30 November in Pacific time — the last place in the US to
 * reach it — so nobody loses the price because of their time zone. Decided
 * by the team on 2026-09-29. If it ever moves, it moves later, never
 * earlier, and the Terms say so.
 */
export const RESERVE_DEADLINE = new Date('2026-11-30T23:59:59-08:00');
export const RESERVE_DEADLINE_LABEL = '30 November';

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
 * The live count of a cohort's places is shown only once at least this many
 * are taken. "19 of 25 left" is an honest number and a reason to act; "25
 * of 25 left" is just as honest and reads like nobody wants it.
 */
export const SHOW_COUNT_FROM = 5;

export type Cohort = {
    /** 1, 2, 3… — what founding_cohort and client_reference_id carry. */
    n: number;
    /** The week its first calls happen, as the page says it. */
    week: string;
    /**
     * When it stops taking families: the Friday before its week, end of day
     * Pacific, so there is a weekend to set each family up by hand.
     */
    closes: Date;
    places: number;
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 * The founding weeks. Every date here is a promise to a family that paid —
 * a founder on the call that week. Move a week later if you must, and write
 * to everyone in it; never move one earlier. Proposed 2026-10-01 for the
 * team to confirm: every other Monday from 19 October.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Unfilled places in a cohort that has closed are not carried forward: the
 * limit is a founder's week, not a number to hit, so "25 places" in the next
 * one stays true.
 */
export const COHORTS: Cohort[] = [
    { n: 1, week: '19 October', closes: new Date('2026-10-16T23:59:59-07:00'), places: 25 },
    { n: 2, week: '2 November', closes: new Date('2026-10-30T23:59:59-07:00'), places: 25 },
    { n: 3, week: '16 November', closes: new Date('2026-11-13T23:59:59-08:00'), places: 25 },
    { n: 4, week: '30 November', closes: new Date('2026-11-27T23:59:59-08:00'), places: 25 },
];

export const cohortByN = (n: number | null | undefined): Cohort | undefined => COHORTS.find((c) => c.n === n);

/**
 * Founding places taken, as foundingCount.ts reads them; null when unknown.
 * `unassigned` is places on accounts with no cohort — claimed before there
 * were cohorts, or paid for on another device.
 */
export type FoundingTaken = { byCohort: Record<number, number>; unassigned: number };

/**
 * Places taken in one cohort. Unassigned places are counted against the
 * first cohort: if they really belong to a later one, the first shows one
 * place fewer than it has, which is the safe way round — the page never
 * shows a place that is not there.
 */
export const cohortTaken = (c: Cohort, taken: FoundingTaken | null): number | null =>
    taken === null ? null : (taken.byCohort[c.n] ?? 0) + (c.n === COHORTS[0].n ? taken.unassigned : 0);

/** Places left in a cohort, or null while the count is unknown. */
export const cohortLeft = (c: Cohort, taken: FoundingTaken | null): number | null => {
    const t = cohortTaken(c, taken);
    return t === null ? null : Math.max(0, c.places - t);
};

/** The cohorts that have not closed yet, full or not, soonest first. */
export const upcomingCohorts = (now = Date.now()): Cohort[] => COHORTS.filter((c) => now <= c.closes.getTime());

/** The cohorts a family can still join, soonest first. */
export const openCohorts = (taken: FoundingTaken | null, now = Date.now()): Cohort[] =>
    upcomingCohorts(now).filter((c) => cohortLeft(c, taken) !== 0);

/**
 * ── Waitlist ────────────────────────────────────────────────────────────
 * Added 2026-10-01. When a week fills, it stays on the card marked full and
 * offers a waitlist for that week; when every week has filled or begun, the
 * card offers a waitlist for the next group. A week fills; the people who
 * wanted it should not have to keep checking back.
 *
 * It is free and holds nothing — no price, no place. It is the order we
 * write in: when a founding family is refunded and their place in a week
 * opens, or when a new group is added to COHORTS. A free list that held the
 * founding price would undercut both offers; the dollar is still the way to
 * hold a price. Written to the account (auth.ts, joinFoundingWaitlist) as
 * founding_waitlist (a cohort number, or 'next') and founding_waitlist_at:
 *
 *   select email, raw_user_meta_data->>'first_name' as name,
 *          raw_user_meta_data->>'founding_waitlist' as week,
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
export const waitlistLabel = (w: WaitFor): string =>
    w === 'next' ? 'the next group' : `the week of ${cohortByN(w)?.week ?? 'a founding week'}`;

/**
 * The cohort chosen before going to Stripe, kept in this browser so the
 * place written on return carries it. Storage can be missing or refuse
 * (private windows, blocked site data); then the cohort is simply not
 * recorded on the account, and Stripe's client_reference_id still has it.
 */
const COHORT_KEY = 'astory-founding-cohort';
export const rememberCohort = (n: number): void => {
    try {
        localStorage.setItem(COHORT_KEY, String(n));
    } catch {
        /* see above */
    }
};
export const recalledCohort = (): number | null => {
    try {
        return cohortByN(Number(localStorage.getItem(COHORT_KEY)))?.n ?? null;
    } catch {
        return null;
    }
};

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
        /* The hundred is the cohorts added up — change a cohort, not this. */
        places: COHORTS.reduce((sum, c) => sum + c.places, 0),
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
 * for a founding place, which week. Stripe reads client_reference_id and
 * prefilled_email straight off the URL; a client_reference_id may only hold
 * letters, digits, dashes and underscores, hence `cohort2_<account id>`.
 */
export const offerCheckoutUrl = (
    id: OfferId,
    account?: { id: string; email: string } | null,
    cohort?: number | null,
): string => {
    const url = new URL(OFFERS[id].link);
    const ref = [cohort ? `cohort${cohort}` : '', account?.id ?? ''].filter(Boolean).join('_');
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
        'Start before launch, in a small group - you pick the week',
        'We set it up with you, by hand',
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
    `by 11:59 p.m. Pacific time on 30 November 2026, ${OFFERS.reserve.discount}% off the first year of an Individual ` +
    `or Family annual plan. That date will not be brought forward. A Founding Family place is a one-time payment of ` +
    `${OFFERS.founding.price}, limited to ${OFFERS.founding.places}, refundable in full on request at any time before ` +
    `the first call; places are offered in cohorts, each with a stated week for the first call, chosen at purchase, ` +
    `which may be moved later but never earlier, with notice to the purchaser; it gives access before launch, set ` +
    `up with the purchaser, 30 days of access equivalent to the ` +
    `Individual plan beginning on the date of the first call, and ${OFFERS.founding.discount}% off the first year of an ` +
    `Individual or Family annual plan. In both cases the amount paid is deducted from that first year, and the ` +
    'discount applies to the first year of a plan bought on the website within 60 days of launch or of the ' +
    'founding month ending, whichever is later.';
