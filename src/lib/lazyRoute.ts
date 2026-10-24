import { createElement, lazy, type ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageModule = { default: ComponentType<any> };
const preloaders = new Map<string, () => Promise<void>>();

/** Keep route chunks separate, but resolve the landing page before replacing
 * its prerendered HTML. Otherwise Suspense briefly collapses it to a fallback. */
export function lazyRoute(path: string, load: () => Promise<PageModule>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let loaded: ComponentType<any> | undefined;
  const Deferred = lazy(load);
  preloaders.set(path, async () => {
    loaded = (await load()).default;
  });
  return function RouteView(props: Record<string, unknown>) {
    return createElement(loaded ?? Deferred, props);
  };
}

/** The route pattern a pathname belongs to, as App.tsx registers them. */
function patternFor(pathname: string): string | null {
  const path = pathname.replace(/\/$/, "") || "/";
  if (preloaders.has(path)) return path;
  if (path === "/") return null;
  return /^\/guides\/[^/]+$/.test(path)
    ? "/guides/:slug"
    : /^\/p\/[^/]+$/.test(path)
      ? "/p/:slug"
      : /^\/contribute\/[^/]+$/.test(path)
        ? "/contribute/:slug"
        : /^\/(join(\/[^/]+)?|c\/[^/]+|account)$/.test(path)
          ? "/join"
          : "*";
}

export async function prepareInitialRoute(pathname: string) {
  const pattern = patternFor(pathname);
  if (!pattern || pattern === "/") return;
  await preloaders.get(pattern)?.();
}

/**
 * Loads a route's chunk ahead of navigating to it, so the route renders its
 * page on the first commit instead of a Suspense fallback. RouteTransition
 * awaits this before it starts a View Transition (jury 2, B1): a transition
 * that captured the fallback showed a blank cream page with the footer
 * pulled up. Resolves (never rejects) once the chunk is in, or at once for
 * a route that is not lazy.
 */
export async function preloadRoute(pathname: string): Promise<void> {
  const pattern = patternFor(pathname);
  if (!pattern) return;
  try {
    await preloaders.get(pattern)?.();
  } catch {
    /* A failed chunk is the router's to report; navigating shows it. */
  }
}
