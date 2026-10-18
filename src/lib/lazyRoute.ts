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

export async function prepareInitialRoute(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return;
  const pattern = preloaders.has(path)
    ? path
    : /^\/guides\/[^/]+$/.test(path)
      ? "/guides/:slug"
      : /^\/p\/[^/]+$/.test(path)
        ? "/p/:slug"
        : /^\/contribute\/[^/]+$/.test(path)
          ? "/contribute/:slug"
          : /^\/(join(\/[^/]+)?|c\/[^/]+|account)$/.test(path)
            ? "/join"
            : "*";
  await preloaders.get(pattern)?.();
}
