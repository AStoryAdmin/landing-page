/**
 * The web app, app.astoryapp.com. Open to anyone since 2026-10-18.
 *
 * The rule: astoryapp.com explains and sells; app.astoryapp.com is where you
 * sign in, start, join and use. Every door into the product on this site
 * goes through here, so the address lives in one place.
 *
 * The app's own routes (web-app/src/App.tsx): /sign-in, /create-account,
 * /join/:code, /c/:slug, /plans. It also turns /?ref=CODE into /join/CODE.
 */
export const APP_ORIGIN = "https://app.astoryapp.com";

export const APP = {
    home: APP_ORIGIN + "/",
    signIn: APP_ORIGIN + "/sign-in",
    createAccount: APP_ORIGIN + "/create-account",
    join: (code: string) => `${APP_ORIGIN}/join/${code.toUpperCase()}`,
    contribute: (slug: string) => `${APP_ORIGIN}/c/${encodeURIComponent(slug)}`,
} as const;

/** What the one primary action says, everywhere it appears. */
export const START_LABEL = "Start free";
/** Where it goes. */
export const START_HREF = APP.createAccount;

/** A family code, as the app makes them: six letters and digits. */
export const FAMILY_CODE = /^[A-Za-z0-9]{6}$/;

/** True while scripts/prerender.mjs is taking its snapshot: never navigate away then. */
export const prerendering = (): boolean =>
    typeof window !== "undefined" &&
    Boolean((window as unknown as { __PRERENDER?: boolean }).__PRERENDER);

/** Leave for the app without adding a history entry, except during the prerender. */
export const goToApp = (url: string) => {
    if (typeof window === "undefined" || prerendering()) return;
    window.location.replace(url);
};
