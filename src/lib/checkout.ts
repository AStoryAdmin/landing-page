import { CONTACT } from './contact';

/**
 * Where the money is taken.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TO GO LIVE: create one Stripe Payment Link per row below, paste the URLs
 * in, and every buy button on the site starts taking money. Nothing else
 * needs to change, and no backend is involved.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * This site is a static build with no server, so Stripe Payment Links are the
 * right mechanism: Stripe hosts the checkout page, handles cards, wallets,
 * receipts, tax and SCA, and hands the customer back to a URL you choose.
 * There is no secret key in this repo and nothing to deploy.
 *
 * How to create each one (about ten minutes for all five):
 *
 *   1. Stripe Dashboard → Product catalogue → add a product per row below,
 *      priced in USD as a *one-off* payment, not a subscription. Nothing here
 *      recurs; the site promises that in writing on /pricing and in the terms.
 *   2. Payment Links → new link → pick the product → "Don't show quantity
 *      selector" for the plans, but *do* allow quantity on the book.
 *   3. Under "After payment", redirect to https://astoryapp.com/thanks so the
 *      buyer lands somewhere that tells them what happens next.
 *   4. Collect the buyer's name, email and — for anything printed — a shipping
 *      address. For the plans, add a custom field asking who the
 *      storyteller is and their phone number, because that is what the first
 *      call needs. That question is the whole onboarding.
 *   5. Copy the link (https://buy.stripe.com/…) into the matching row.
 *
 * Until a link is filled in, that button quietly falls back to the mailto
 * flow that has always been here, so the site never shows a broken or
 * dead-end purchase path. `isCheckoutLive` reports which mode is in effect.
 */

/**
 * Stripe Payment Link per purchasable thing. The plan keys match `PLANS[].id`
 * in ./pricing — and the app's own Stripe slugs — so a new plan needs a row here
 * and nothing else.
 *
 * Leave a value as an empty string until its link exists.
 */
const LINKS: Record<string, string> = {
    /* Plans — keys match PLANS[].id in ./pricing, and the app's own slugs */
    individual: '',
    family: '',
    express: '',

    /* The same plans with the Keepsake book bundled in */
    'individual+book': '',
    'family+book': '',

    /* The hardcover bought on its own */
    book: '',
};

/** True once a given item can actually be bought on the site. */
export const isCheckoutLive = (id: string): boolean => Boolean(LINKS[id]);

/** True once anything at all can be bought — used to switch button wording. */
export const anyCheckoutLive = (): boolean => Object.values(LINKS).some(Boolean);

/**
 * Where a buy button points. A real Stripe checkout when one is configured,
 * and otherwise the mailto that names what they were trying to buy — so an
 * enquiry still arrives with the intent attached rather than being lost.
 */
export const checkoutFor = (id: string, label: string): string =>
    LINKS[id] || CONTACT.giftFor(label);

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
