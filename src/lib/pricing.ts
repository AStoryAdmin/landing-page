/**
 * What A Story costs.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS NUMBER IS A RECOMMENDATION, NOT A DECISION. Validate it, then keep it
 * here — the whole site reads from this file, so changing the price is a
 * one-line edit and nothing else moves.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The reasoning behind the shape of it, which matters more than the figure:
 *
 * 1. A gift cannot be free. The buyer is choosing this instead of a sweater or
 *    a bottle of something. "Free" reads as low value on the one purchase whose
 *    entire pitch is that it means more than the alternatives, and it leaves
 *    them nothing to have spent.
 *
 * 2. Charge at the moment of intent. Willingness to pay peaks when someone
 *    decides to give the gift — deadline-driven, emotional, comparing against
 *    other presents. Collecting weeks later, once the recipient has recorded
 *    enough to justify a book, is the worst possible moment: the feeling has
 *    passed and the amount is now judged against pages produced.
 *
 * 3. One price, not a base plus a book. Splitting them made the archive — the
 *    defensible part — free, and put all the revenue on print, where the cost
 *    of goods is real and the margin is thin. That is backwards on both counts.
 *
 * 4. Never charge per family member. Every extra person invited makes the
 *    archive better, raises the odds of a book being ordered, and costs almost
 *    nothing to serve. Charging for them would suppress the one behavior the
 *    whole product depends on.
 */

export const PRICE = {
    /** One gift, one payment, one hardcover book included. */
    gift: '$149',
    /**
     * The same figure without formatting, for the Offer in the product schema.
     * Keep it in step with `gift` — search results quoting a price the page
     * does not charge is worse than quoting none.
     */
    giftAmount: '149',
    currency: 'USD',
    /** Shown beneath the price so nobody wonders what is missing. */
    giftNote: 'One payment · includes the hardcover book',
    /**
     * Extra copies for siblings are the natural upsell: no acquisition cost,
     * and the decision is made when the family is already delighted. Priced
     * near printing cost rather than quoted, so nobody has to ask.
     */
    extraCopy: '$59',
} as const;
