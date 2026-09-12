
/**
 * Where the money is taken.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * NOT LIVE, AND DELIBERATELY SO. Every row in LINKS is empty, and filling
 * them in is NOT the last step — see "The gap" below. A Payment Link pasted
 * in today would take somebody's money and grant them nothing.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * This site is a static build with no server, so Stripe Payment Links are the
 * right mechanism for it: Stripe hosts the checkout page and handles cards,
 * wallets, receipts, tax and SCA. There is no secret key in this repo and
 * nothing to deploy.
 *
 * ── What the app actually charges ────────────────────────────────────────
 * An earlier version of this file said to price everything as "a *one-off*
 * payment, not a subscription. Nothing here recurs." That was wrong, and it
 * contradicted the product: supabase/functions/create-plan-checkout in the
 * app reads six STRIPE_PRICE_* secrets, and SUBSCRIPTION_PLANS covers
 * individual, family and monthly. The real shape is:
 *
 *   individual        annual subscription      STRIPE_PRICE_INDIVIDUAL_BASE
 *   individual+book   annual subscription      STRIPE_PRICE_INDIVIDUAL_BOOK
 *   family            annual subscription      STRIPE_PRICE_FAMILY_BASE
 *   family+book       annual subscription      STRIPE_PRICE_FAMILY_BOOK
 *   monthly           monthly subscription     STRIPE_PRICE_MONTHLY
 *   express           one-time                 STRIPE_PRICE_EXPRESS
 *   book              one-time, ad hoc         (built by create-book-checkout)
 *
 * Those six Price objects already exist in the Stripe account. A Payment Link
 * should be built ON one of them rather than on a new product, so the site and
 * the app charge the identical price and the app's own webhook can recognise
 * what was bought from the price id alone.
 *
 * ── The gap, which is the actual next step ───────────────────────────────
 * The app grants a plan in supabase/functions/stripe-webhook by reading
 * metadata.user_id (or client_reference_id) off the Stripe event and writing
 * profiles.plan for that user. create-plan-checkout can set that because the
 * buyer is already signed in when they check out.
 *
 * A buyer on this website is not signed in and has no account yet, so a
 * Payment Link produces an event with no user_id — and the webhook, correctly,
 * refuses to guess: subscription events log "subscription event with no
 * metadata.user_id" and return, express logs "no linked user", the book logs
 * "no order_id". All three skip. The charge succeeds and nothing is granted.
 *
 * So web checkout needs one more piece, app-side, before any link goes in:
 *
 *   1. Payment Link collects the buyer's email (Stripe does this by default)
 *      and redirects to https://astoryapp.com/thanks.
 *   2. stripe-webhook, on an event with no user_id, looks up profiles by that
 *      email. If a profile exists, grant as normal.
 *   3. If it does not — the usual case, because they have not signed up yet —
 *      write a pending-entitlement row keyed by the lowercased email, holding
 *      the plan and the Stripe customer/subscription ids.
 *   4. The app claims that row at first sign-up, applies the plan, and marks
 *      it claimed. Same email in, same plan out.
 *
 * Until that exists, /thanks must be the thing that carries the promise, and
 * the buyer must be told plainly to sign up with the email they paid with.
 *
 * ── Creating the links, once the above is built ──────────────────────────
 *   1. Stripe Dashboard → Payment Links → new link → "Find a price" and pick
 *      the existing price for that row, NOT a new product.
 *   2. Under "After payment", redirect to https://astoryapp.com/thanks.
 *   3. Collect name and email always; a shipping address on anything printed.
 *      Add a custom field for the storyteller's name and phone number on the
 *      plans — that question is the whole of onboarding.
 *   4. Copy the https://buy.stripe.com/… URL into the matching row below.
 *
 * Until a link is filled in, that button quietly falls back to the mailto flow
 * that has always been here, so the site never shows a dead-end purchase path.
 * `isCheckoutLive` reports which mode is in effect.
 */

/**
 * Stripe Payment Link per purchasable thing. The plan keys match `PLANS[].id`
 * in ./pricing — and the app's own Stripe slugs — so a new plan needs a row
 * here and nothing else.
 *
 * Leave a value as an empty string until its link exists AND the webhook can
 * grant what it sells.
 */
const LINKS: Record<string, string> = {
    /* Annual subscriptions — keys match PLANS[].id in ./pricing */
    individual: '',
    family: '',

    /* The same two with the Keepsake book bundled in */
    'individual+book': '',
    'family+book': '',

    /* Monthly subscription — the quiet option on /pricing */
    monthly: '',

    /* One-time: a 30-day window, and the hardcover on its own */
    express: '',
    book: '',
};

/** True once a given item can actually be bought on the site. */
export const isCheckoutLive = (id: string): boolean => Boolean(LINKS[id]);

/** True once anything at all can be bought — used to switch button wording. */
export const anyCheckoutLive = (): boolean => Object.values(LINKS).some(Boolean);

/**
 * Where a buy button points.
 *
 * A real Stripe checkout when one is configured; otherwise /start, carrying
 * the plan that was clicked so the reply can open on the right thing.
 *
 * This used to fall back to a mailto that named the plan. The intent did
 * survive, but almost nobody arrived with it: asking somebody to compose an
 * email is the most expensive thing a page can do at the moment they have
 * decided to buy. See src/lib/leads.ts for what replaced it.
 */
export const checkoutFor = (id: string): string =>
    LINKS[id] || `/start?plan=${encodeURIComponent(id)}`;

/**
 * Where "Book a demo" goes — the same two-field form, asking for the same
 * name and number, promising a call rather than a setup.
 *
 * It is a separate entry point rather than a separate page because the thing
 * being collected is identical, and a second form is a second thing to keep
 * true. `/start` reads the intent and changes what it promises.
 */
export const DEMO_HREF = '/start?intent=demo';

/**
 * What the button should say. Before checkout exists, promising "Buy" and
 * opening an email client is a small lie that costs more trust than the click
 * is worth.
 */
export const buyLabel = (id: string, live: string, fallback: string): string =>
    isCheckoutLive(id) ? live : fallback;

/**
 * The three things a buyer needs to know at the moment they are deciding, in
 * the order they think of them. Shown next to the price rather than buried in
 * the terms — the refund promise in particular is generous and was doing no
 * work at all from inside section 9.
 */
export const AT_CHECKOUT = [
    {
        t: 'Three days of everything, free',
        d: 'Every account opens with full access and guided calls, no card. It falls back to Free afterwards rather than locking you out, so nothing is lost by taking your time.',
    },
    {
        t: 'Your recordings stay yours',
        d: 'Cancel whenever you like. The archive, the transcripts, the photos and everyone you invited all keep working — cancelling stops the AI calls, not the memories.',
    },
    {
        t: 'Refunded if it goes unused',
        d: 'If the person you bought it for never gets going, write to us and we will refund you. No deadline on that, and no argument.',
    },
] as const;
