import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query.
 *
 * For anything purely visual, prefer a CSS breakpoint. This is for the cases
 * where the two layouts are genuinely different markup — the album spread, for
 * instance, which stops being a spread on a phone.
 *
 * Implemented with useSyncExternalStore so the value is read during render
 * rather than patched in afterwards, which avoids a flash of the wrong layout.
 */
export const useMediaQuery = (query: string): boolean => {
    const subscribe = useCallback(
        (onChange: () => void) => {
            const mql = window.matchMedia(query);
            mql.addEventListener('change', onChange);
            return () => mql.removeEventListener('change', onChange);
        },
        [query],
    );

    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(query).matches,
        () => false, // A server snapshot of false means the query is not yet matched.
    );
};

export default useMediaQuery;
