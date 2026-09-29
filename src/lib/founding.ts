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

/** Places one family can reserve at a dollar each. */
export const MAX_PER_FAMILY = 2;

/** Today's annual prices — mirrors PLANS in ./pricing. */
const INDIVIDUAL = 119;
const FAMILY = 229;

const money = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;
const off = (price: number, pct: number) => Math.round(price * (100 - pct)) / 100;

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
        discount: 30,
        individual: money(off(INDIVIDUAL, 30)),
        family: money(off(FAMILY, 30)),
        places: null,
        link: '',
        open: true,
        meta: 'reserved_at',
    },
    founding: {
        name: 'Founding Family',
        price: '$29',
        amount: 29,
        discount: 50,
        individual: money(off(INDIVIDUAL, 50)),
        family: money(off(FAMILY, 50)),
        places: 100,
        link: '',
        open: true,
        meta: 'founding_requested_at',
    },
};

/** What is left to pay at launch for a founding family's first year — the $29 counts. */
export const FOUNDING_BALANCE = {
    individual: money(off(INDIVIDUAL, 50) - OFFERS.founding.amount),
    family: money(off(FAMILY, 50) - OFFERS.founding.amount),
} as const;

export const isOfferLive = (id: OfferId): boolean => OFFERS[id].open && Boolean(OFFERS[id].link);

/**
 * The offer's Payment Link, labelled with who is paying when we know.
 * Stripe reads client_reference_id and prefilled_email straight off the URL.
 */
export const offerCheckoutUrl = (id: OfferId, account?: { id: string; email: string } | null): string => {
    const url = new URL(OFFERS[id].link);
    if (account) {
        url.searchParams.set('client_reference_id', account.id);
        url.searchParams.set('prefilled_email', account.email);
    }
    return url.toString();
};

/** What each one includes, as the cards list it. */
export const INCLUDES: Record<OfferId, string[]> = {
    reserve: [
        'Your place in line, in the order places were reserved',
        `${OFFERS.reserve.discount}% off your first year at launch`,
        'The dollar comes off that year too',
        `Up to ${MAX_PER_FAMILY} places per family — one for each parent`,
        'Refunded any time before launch, no questions',
    ],
    founding: [
        'Start before launch — we set it up with you, by hand',
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
        d: `${OFFERS.founding.discount}% off the first year for founding families, ${OFFERS.reserve.discount}% for everyone who reserves before launch.`,
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
    `at any time before launch; it holds a place in the order reservations are made and ${OFFERS.reserve.discount}% ` +
    `off the first year of an Individual or Family annual plan. A Founding Family place is a one-time payment of ` +
    `${OFFERS.founding.price}, limited to ${OFFERS.founding.places}, refundable in full on request at any time before ` +
    `the first call; it gives access before launch, set up with the purchaser, 30 days of access equivalent to the ` +
    `Individual plan beginning on the date of the first call, and ${OFFERS.founding.discount}% off the first year of an ` +
    `Individual or Family annual plan. In both cases the amount paid is deducted from that first year, and the ` +
    'discount applies to the first year of a plan bought on the website within 60 days of launch or of the ' +
    'founding month ending, whichever is later.';
