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

/**
 * What the one primary action says, everywhere it appears (phone-first
 * plan, 2026-11-04). The moat is the iPhone app: strangers ask for an
 * invite on /get-the-app; the web app's create-account page is no longer
 * advertised. `APP.createAccount` stays only for the doors of people who
 * already belong to a family (AppDoor, /join).
 */
export const START_LABEL = "Get the iPhone app";
/** Where it goes: the invite page on this site. */
export const START_HREF = "/get-the-app";

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
