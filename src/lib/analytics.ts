/**
 * Analytics — deliberately vendor-neutral, and off until configured.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TO TURN ON: set VITE_ANALYTICS_DOMAIN in the production environment. With
 * it unset — which includes every local dev run — nothing loads and every
 * call here is a no-op, so no script, no cookie and no request goes out.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Why the default is a cookieless, privacy-first provider rather than GA4:
 * this site's central promise is that a family's stories are never sold and
 * never used to train anything. Shipping a behavioural ad-network tag under
 * that promise is a bad look, and it would drag a consent banner onto every
 * page. Plausible and Fathom are drop-in compatible with the loader below —
 * `VITE_ANALYTICS_SRC` points at whichever you buy.
 *
 * The privacy policy already tells people usage information is collected
 * "through standard analytics", so this closes a gap rather than opening one.
 *
 * Everything is funnel-shaped on purpose. These four events are the ones the
 * business plan cannot be read without:
 *
 *   demo_played      — did the landing page's best asset get used
 *   checkout_click   — intent to buy, by package
 *   plan_viewed      — did they reach the pricing page at all
 *   contact_click    — the mailto fallback, while checkout is not yet live
 */

const DOMAIN = import.meta.env?.VITE_ANALYTICS_DOMAIN as string | undefined;
const SRC = (import.meta.env?.VITE_ANALYTICS_SRC as string | undefined)
    ?? 'https://plausible.io/js/script.js';

/** True once a provider is configured. Nothing below does anything otherwise. */
export const analyticsEnabled = (): boolean => Boolean(DOMAIN);

let loaded = false;

/**
 * Injects the provider's script once, on first call. Deferred rather than put
 * in index.html so an unconfigured build ships no third-party reference at
 * all, and so the tag never blocks first paint.
 */
export const initAnalytics = (): void => {
    if (!DOMAIN || loaded || typeof document === 'undefined') return;
    loaded = true;

    const tag = document.createElement('script');
    tag.defer = true;
    tag.setAttribute('data-domain', DOMAIN);
    tag.src = SRC;
    document.head.appendChild(tag);
};

type Props = Record<string, string | number | boolean>;

/**
 * Records a funnel event. Safe to call anywhere: with no provider configured
 * it returns immediately, and a provider that has not finished loading queues
 * through its own stub rather than throwing.
 */
export const track = (event: string, props?: Props): void => {
    if (!DOMAIN || typeof window === 'undefined') return;
    const w = window as unknown as { plausible?: (e: string, o?: { props: Props }) => void };
    try {
        w.plausible?.(event, props ? { props } : undefined);
    } catch {
        /* Analytics must never be able to break a page. */
    }
};
