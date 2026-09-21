import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { media } from '../../styles/theme';

/**
 * Moves between routes without the page appearing to scroll.
 *
 * The old behavior called `window.scrollTo(0, 0)` on every navigation. Because
 * the global stylesheet sets `scroll-behavior: smooth` — which it needs for
 * in-page anchors — that reset was *animated*, so clicking a footer link sent
 * the reader on a long ride back up through a page they had just left. This
 * resets position instantly instead, and covers the jump with a short fade so
 * the arrival reads as a transition rather than a jolt.
 *
 * Links with a hash (`/experience#book`) land on that section instead of the
 * top, which the old version ignored entirely.
 */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
`;

const Frame = styled.div<{ $animate: boolean }>`
    /*
     * Chrome re-anchors the scroll position when content above the viewport
     * changes height — which is exactly what happens when a route's Suspense
     * fallback is swapped for the real page, and it left every navigation a
     * few dozen pixels below the top.
     */
    overflow-anchor: none;
    animation: ${({ $animate }) => ($animate ? fadeIn : 'none')} 280ms
        cubic-bezier(0.22, 0.61, 0.36, 1) both;

    ${media.motion} {
        animation: none;
    }
`;

if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

/**
 * Scrolls without triggering the global smooth behavior.
 *
 * Two things are needed here, and either one alone still animates:
 *
 * `behavior: 'auto'` does *not* mean "instant" — it means "use the element's
 * computed `scroll-behavior`", which the global stylesheet sets to `smooth`.
 * `'instant'` is the value that actually overrules the CSS.
 *
 * The inline override is kept for engines that predate `'instant'`, but
 * assigning it is not enough on its own: `scrollTo` reads the *computed*
 * style, and Chrome answers from the cache it recalculated before the
 * assignment. Reading the value back forces the recalc first.
 */
const jumpTo = (top: number) => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    /* Forces the style recalc that makes the line above take effect. */
    void getComputedStyle(root).scrollBehavior;
    window.scrollTo({ top, left: 0, behavior: 'instant' });
    root.style.scrollBehavior = previous;
};

const savedPositions = new Map<string, number>();
const RouteTransition = ({ children }: { children: React.ReactNode }) => {
    const { pathname, hash, key } = useLocation();
    const navigationType = useNavigationType();
    const first = useRef(true);
    /* Route arrivals animate; in-page navigation preserves active demos. */
    const [animateKey, setAnimateKey] = useState(pathname);
    /* The very first paint should not fade — it would only delay the content. */
    const [initialKey] = useState(pathname);

    useEffect(() => {
        const remember = () => savedPositions.set(key, window.scrollY);
        window.addEventListener('scroll', remember, { passive: true });
        return () => window.removeEventListener('scroll', remember);
    }, [key]);

    useEffect(() => {
        if (first.current) {
            first.current = false;
            // Deep links use the same lazy-route polling as later navigations.
            if (!hash) return;
        }

        setAnimateKey(pathname);

        /*
         * Restore a history position or reset a new destination. Observe lazy
         * content briefly because a short fallback can clamp the first jump.
         * Any user input ends settling immediately.
         */
        let raf = 0;
        if (!hash) {
            const destination =
                navigationType === 'POP' ? (savedPositions.get(key) ?? 0) : 0;
            let cancelled = false;
            const align = () => {
                if (!cancelled) jumpTo(destination);
            };
            const observer = new ResizeObserver(align);
            observer.observe(document.getElementById('root') ?? document.body);
            const stop = () => {
                cancelled = true;
                observer.disconnect();
                cancelAnimationFrame(raf);
            };
            const inputs = [
                'wheel',
                'touchstart',
                'pointerdown',
                'keydown',
            ] as const;
            inputs.forEach((event) =>
                window.addEventListener(event, stop, { passive: true }),
            );
            align();
            raf = requestAnimationFrame(align);
            const timer = setTimeout(stop, 2000);
            return () => {
                stop();
                clearTimeout(timer);
                inputs.forEach((event) =>
                    window.removeEventListener(event, stop),
                );
            };
        }

        /*
         * An anchor on another page belongs to a route chunk that has not
         * loaded yet, so poll briefly for it rather than giving up on the
         * first frame.
         */
        let frame = 0;
        let observer: ResizeObserver | undefined;
        let settleTimer: ReturnType<typeof setTimeout> | undefined;
        let cancelled = false;
        const stopFollowing = () => {
            cancelled = true;
            cancelAnimationFrame(raf);
            observer?.disconnect();
            clearTimeout(settleTimer);
        };
        const inputEvents = [
            'wheel',
            'touchstart',
            'pointerdown',
            'keydown',
        ] as const;
        inputEvents.forEach((event) =>
            window.addEventListener(event, stopFollowing, { passive: true }),
        );
        let targetId: string;
        try {
            targetId = decodeURIComponent(hash.slice(1));
        } catch {
            targetId = '';
        }
        const findTarget = () => {
            if (cancelled) return;
            const target = document.getElementById(targetId);
            if (target) {
                const align = () => {
                    if (!cancelled)
                        jumpTo(
                            target.getBoundingClientRect().top +
                                window.scrollY -
                                (parseFloat(
                                    getComputedStyle(
                                        document.documentElement,
                                    ).getPropertyValue('--nav-total'),
                                ) || 88) -
                                24,
                        );
                };
                align();
                // Nested lazy demos can change the height above an existing
                // anchor. Follow those layout changes briefly; user input wins.
                observer = new ResizeObserver(align);
                observer.observe(
                    document.getElementById('root') ?? document.body,
                );
                settleTimer = setTimeout(() => observer?.disconnect(), 2000);
                return;
            }
            if (frame++ < 180) raf = requestAnimationFrame(findTarget);
        };
        raf = requestAnimationFrame(findTarget);
        return () => {
            stopFollowing();
            inputEvents.forEach((event) =>
                window.removeEventListener(event, stopFollowing),
            );
        };
    }, [pathname, hash, key, navigationType]);

    return (
        <Frame key={animateKey} $animate={animateKey !== initialKey}>
            {children}
        </Frame>
    );
};

export default RouteTransition;
