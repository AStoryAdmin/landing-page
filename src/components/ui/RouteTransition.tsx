import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { media } from '../../styles/theme';

/**
 * Moves between routes without the page appearing to scroll.
 *
 * The old behaviour called `window.scrollTo(0, 0)` on every navigation. Because
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
    animation: ${({ $animate }) => ($animate ? fadeIn : 'none')} 320ms cubic-bezier(0.22, 0.61, 0.36, 1) both;

    ${media.motion} {
        animation: none;
    }
`;

if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

/** Scrolls without triggering the global smooth behaviour. */
const jumpTo = (top: number) => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top, left: 0, behavior: 'auto' });
    root.style.scrollBehavior = previous;
};

const RouteTransition = ({ children }: { children: React.ReactNode }) => {
    const { pathname, hash, key } = useLocation();
    const first = useRef(true);
    /* Re-keying the frame restarts the entry animation on every navigation. */
    const [animateKey, setAnimateKey] = useState(key);
    /* The very first paint should not fade — it would only delay the content. */
    const [initialKey] = useState(key);

    useEffect(() => {
        if (first.current) {
            first.current = false;
            /* On a deep link, still honour the hash once the page has painted. */
            if (hash) requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
            return;
        }

        setAnimateKey(key);

        /*
         * Reset immediately, then again on the next two frames. At the moment
         * of navigation the destination is often still a Suspense fallback, so
         * the document is short and the browser clamps the scroll to whatever
         * fits — the repeat lands it at the top once the real content is in.
         */
        let raf = 0;
        if (!hash) {
            jumpTo(0);
            let frames = 0;
            const settle = () => {
                jumpTo(0);
                if (frames++ < 5) raf = requestAnimationFrame(settle);
            };
            raf = requestAnimationFrame(settle);
            return () => cancelAnimationFrame(raf);
        }

        /*
         * An anchor on another page belongs to a route chunk that has not
         * loaded yet, so poll briefly for it rather than giving up on the
         * first frame.
         */
        let frame = 0;
        const findTarget = () => {
            const target = document.querySelector(hash);
            if (target) {
                jumpTo(target.getBoundingClientRect().top + window.scrollY - 24);
                return;
            }
            if (frame++ < 40) raf = requestAnimationFrame(findTarget);
        };
        raf = requestAnimationFrame(findTarget);
        return () => cancelAnimationFrame(raf);
    }, [pathname, hash, key]);

    return (
        <Frame key={animateKey} $animate={animateKey !== initialKey}>
            {children}
        </Frame>
    );
};

export default RouteTransition;
