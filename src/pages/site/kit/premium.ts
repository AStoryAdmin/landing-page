/**
 * The premium pass is opt-in for every page but home (design spec §3.00,
 * 2026-11-02). Home (`/`) must stay pixel-identical outside the header and
 * footer, and it imports most of the kit, so no kit change may be global.
 *
 * The marketing layout (App.tsx) sets:
 *   - `data-premium` on <main> for every route except `/`;
 *   - `data-premium` on <body> too, for the pieces that sit outside main or
 *     are fixed to the window (the sticky bar, the header's neighbours);
 *   - this context, for components with logic (Invitation, StickyStart).
 *
 * Styled components put every new rule under `main[data-premium] &` (or
 * `body[data-premium] &`); the un-scoped base style is the old one, byte for
 * byte. When the flag is false a component renders exactly what it rendered
 * before the pass.
 */
import { createContext, useContext } from "react";
import { bare } from "../../../lib/nav";

/** Home is the only marketing route left out of the premium pass. */
export const isPremiumPath = (pathname: string) => bare(pathname) !== "/";

export const PremiumContext = createContext(false);

/** True on every marketing page except home. */
export const usePremium = () => useContext(PremiumContext);

/** The scope selectors, so every rule spells them the same way. */
export const IN_MAIN = "main[data-premium]";
export const IN_BODY = "body[data-premium]";
