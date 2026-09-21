import { createElement, lazy, type ComponentType } from 'react';

type PageModule = { default: ComponentType };
const preloaders = new Map<string, () => Promise<void>>();

/** Keep route chunks separate, but resolve the landing page before replacing
 * its prerendered HTML. Otherwise Suspense briefly collapses it to a fallback. */
export function lazyRoute(path: string, load: () => Promise<PageModule>) {
    let loaded: ComponentType | undefined;
    const Deferred = lazy(load);
    preloaders.set(path, async () => {
        loaded = (await load()).default;
    });
    return function RouteView() {
        return createElement(loaded ?? Deferred);
    };
}

export async function prepareInitialRoute(pathname: string) {
    const path = pathname.replace(/\/$/, '') || '/';
    if (path === '/') return;
    const pattern = preloaders.has(path)
        ? path
        : /^\/guides\/[^/]+$/.test(path)
          ? '/guides/:slug'
          : /^\/p\/[^/]+$/.test(path)
            ? '/p/:slug'
            : /^\/contribute\/[^/]+$/.test(path)
              ? '/contribute/:slug'
              : '*';
    await preloaders.get(pattern)?.();
}
