import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { preloadRoute } from "../../lib/lazyRoute";
import styled, { keyframes } from "styled-components";
import { curve, media } from "../../styles/theme";

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
 *
 * View Transitions (2026-10-23, Bao's Standard 23a). Every in-site link is
 * a View Transition where the browser has the API: a capture-phase click
 * listener takes over plain left-clicks on same-origin router links, and
 * runs the navigation inside `document.startViewTransition`, with the
 * scroll reset in the same update so the new page is captured at its top.
 * The header holds still (view-transition-name: site-header); the page
 * settles away and the next one rises (global.ts). The site uses
 * BrowserRouter, where `<Link viewTransition>` does nothing, hence the
 * listener. Without the API, or under reduced motion, the short fade below
 * still covers the jump.
 *
 * Fixed 2026-10-23 (jury 2, B1). The first version ran
 * `flushSync(() => navigate(href))` inside the transition's callback. React
 * Router runs navigate inside a React transition, so flushSync committed
 * nothing: the browser captured the OLD page as the "new" one, and on a
 * route's first visit the lazy chunk then showed a blank fallback with the
 * footer pulled up. Now, in order:
 *   1. the route's chunk is loaded first (preloadRoute), so the next render
 *      is the real page, not a Suspense fallback;
 *   2. the View Transition starts, and its callback navigates and AWAITS the
 *      commit (a layout effect keyed on the location resolves it), then
 *      resets the scroll, so the new snapshot is the new page at its top.
 * If the chunk takes longer than PRELOAD_WAIT the navigation goes ahead
 * without a View Transition (the fade covers it), so a slow network never
 * leaves a click feeling dead.
 */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
`;

/** Set while a View Transition carries the navigation, so the fade stays off. */
let viaViewTransition = false;

/** How long a click waits for a route chunk before navigating without a View Transition. */
const PRELOAD_WAIT = 700;
/** The longest a View Transition waits for the new route to commit. */
const COMMIT_WAIT = 1200;

/** Resolved by RouteTransition's layout effect when the location commits. */
let commitWaiter: { path: string; resolve: () => void } | null = null;
const waitForCommit = (path: string) =>
  new Promise<void>((resolve) => {
    commitWaiter = { path, resolve };
    setTimeout(resolve, COMMIT_WAIT);
  });

/** Routes served outside the router (a full page load), and files. */
const OUTSIDE = /^\/(samples|app)(\/|$)|\.[a-z0-9]{2,5}$/i;

function routerHref(event: MouseEvent): string | null {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return null;
  const a = (event.target as Element | null)?.closest?.("a[href]");
  if (!(a instanceof HTMLAnchorElement)) return null;
  if (a.target && a.target !== "_self") return null;
  if (a.hasAttribute("download") || a.dataset.noTransition !== undefined)
    return null;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || OUTSIDE.test(url.pathname)) return null;
  /* Same page: an in-page anchor or the page itself, not a route change. */
  if (url.pathname === location.pathname) return null;
  return url.pathname + url.search + url.hash;
}

const Frame = styled.div<{ $animate: boolean }>`
  /*
     * Chrome re-anchors the scroll position when content above the viewport
     * changes height - which is exactly what happens when a route's Suspense
     * fallback is swapped for the real page, and it left every navigation a
     * few dozen pixels below the top.
     */
  overflow-anchor: none;
  animation: ${({ $animate }) => ($animate ? fadeIn : "none")} 240ms
    ${curve.out} both;

  ${media.motion} {
    animation: none;
  }
`;

if (typeof history !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
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
  root.style.scrollBehavior = "auto";
  /* Forces the style recalc that makes the line above take effect. */
  void getComputedStyle(root).scrollBehavior;
  window.scrollTo({ top, left: 0, behavior: "instant" });
  root.style.scrollBehavior = previous;
};

const savedPositions = new Map<string, number>();
const RouteTransition = ({ children }: { children: React.ReactNode }) => {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof document.startViewTransition !== "function") return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (event: MouseEvent) => {
      if (reduced.matches) return;
      const href = routerHref(event);
      if (!href) return;
      event.preventDefault();
      const path = new URL(href, location.href).pathname;
      let started = false;
      const begin = (ready: boolean) => {
        if (started) return;
        started = true;
        if (!ready) {
          navigate(href);
          return;
        }
        viaViewTransition = true;
        const transition = document.startViewTransition(async () => {
          const committed = waitForCommit(path);
          navigate(href);
          await committed;
          if (!href.includes("#")) jumpTo(0);
        });
        transition.finished.finally(() => {
          viaViewTransition = false;
        });
      };
      void preloadRoute(path).then(() => begin(true));
      setTimeout(() => begin(false), PRELOAD_WAIT);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);
  /* The commit a running View Transition is waiting for (see above). */
  useLayoutEffect(() => {
    if (commitWaiter && commitWaiter.path.replace(/\/$/, "") === pathname.replace(/\/$/, "")) {
      commitWaiter.resolve();
      commitWaiter = null;
    }
  }, [pathname, key]);

  const first = useRef(true);
  /* Route arrivals animate; in-page navigation preserves active demos. */
  const [animateKey, setAnimateKey] = useState(pathname);
  /* The very first paint should not fade — it would only delay the content. */
  const [initialKey] = useState(pathname);

  useEffect(() => {
    const remember = () => savedPositions.set(key, window.scrollY);
    window.addEventListener("scroll", remember, { passive: true });
    return () => window.removeEventListener("scroll", remember);
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
        navigationType === "POP" ? (savedPositions.get(key) ?? 0) : 0;
      let cancelled = false;
      const align = () => {
        if (!cancelled) jumpTo(destination);
      };
      const observer = new ResizeObserver(align);
      observer.observe(document.getElementById("root") ?? document.body);
      const stop = () => {
        cancelled = true;
        observer.disconnect();
        cancelAnimationFrame(raf);
      };
      const inputs = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
      inputs.forEach((event) =>
        window.addEventListener(event, stop, { passive: true }),
      );
      align();
      raf = requestAnimationFrame(align);
      const timer = setTimeout(stop, 2000);
      return () => {
        stop();
        clearTimeout(timer);
        inputs.forEach((event) => window.removeEventListener(event, stop));
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
      "wheel",
      "touchstart",
      "pointerdown",
      "keydown",
    ] as const;
    inputEvents.forEach((event) =>
      window.addEventListener(event, stopFollowing, { passive: true }),
    );
    let targetId: string;
    try {
      targetId = decodeURIComponent(hash.slice(1));
    } catch {
      targetId = "";
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
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--nav-total",
                  ),
                ) || 88) -
                24,
            );
        };
        align();
        // Nested lazy demos can change the height above an existing
        // anchor. Follow those layout changes briefly; user input wins.
        observer = new ResizeObserver(align);
        observer.observe(document.getElementById("root") ?? document.body);
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
    <Frame
      key={animateKey}
      $animate={animateKey !== initialKey && !viaViewTransition}
    >
      {children}
    </Frame>
  );
};

export default RouteTransition;
