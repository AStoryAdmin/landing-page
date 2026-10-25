/**
 * The holiday gift (Plan 2, section 3): "The gift of being asked" - a year
 * of daily questions and a printed hardcover, $99, once. It does not renew.
 *
 * PREPARED, AND OFF. /gift exists (router and prerender) but is not in the
 * navigation, and until the switch below is on it shows only "Tell me when
 * it opens", which saves an email to the same waitlist table every other
 * form on the site uses (lib/leads.ts).
 *
 * To open it, the owners do three things, in this order:
 *   1. create the $99 one-time Price in Stripe and paste its Payment Link
 *      into GIFT.link;
 *   2. set HOLIDAY_GIFT_ENABLED to true (the date below still gates it);
 *   3. move /gift from privateRoutes to src/lib/sitePages.json so it gets a
 *      sitemap entry, and add it to the navigation if wanted.
 * Plan 2 also has /reserve 301 to /gift after 2 November; that is a
 * redirects change in scripts/site-routes.mjs and is not made here.
 */

/** Master switch. Off until Stripe's Price exists and the owners say go. */
export const HOLIDAY_GIFT_ENABLED = false;

/** The day after the $1 reservation offer closes, in Pacific time. */
export const HOLIDAY_GIFT_OPENS = new Date("2026-11-03T00:00:00-08:00");

export const holidayGiftOpen = (now = Date.now()): boolean =>
  HOLIDAY_GIFT_ENABLED && now >= HOLIDAY_GIFT_OPENS.getTime();

/** True only when the switch is on and the date has come. */
export const HOLIDAY_GIFT_OPEN = holidayGiftOpen();

export const GIFT = {
  name: "The gift of being asked",
  price: "$99",
  /** Stripe Payment Link for the one-time $99 Price. Empty until it exists. */
  link: "",
} as const;
