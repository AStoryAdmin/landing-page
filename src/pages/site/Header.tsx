import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wordmark } from "./shared";
import { ArrowIcon } from "./kit/kit";
import { HeaderShell } from "./chrome.styles";
import { START_HREF, START_LABEL } from "../../lib/app";
import {
  BAR,
  BAR_AFTER,
  DRAWER_MUTED,
  ORG_MENU_LABEL,
  SIGN_IN,
  bare,
  isFile,
  isOrgPage,
  orgMenu,
  route,
  type RoutePath,
} from "../../lib/nav";

/*
 * The bar (premium pass, 2026-11-02, design spec §1):
 *   How it works · Sample books · Pricing · For organizations ▾ · Our story
 *   Sign in  [Start free →]
 * "More" and its panel are gone; Compare, Q&A, Guides, Privacy, Your own
 * story and Contact live in the footer and in context links. The labels
 * come from lib/nav.ts. The startup programs stay out of the bar (2026-10-16)
 * and out of the org menu: /programs is reached from the footer.
 *
 * The org menu copies Radix NavigationMenu: it opens on click, and on hover
 * after 120ms where there is a pointer that hovers; a click on a panel that
 * hover opened keeps it open (only a second click closes it). Esc, an
 * outside pointer and a route change close it; Esc gives focus back to the
 * trigger.
 *
 * Below 1180px (media.navBar; spec §1.1 fallback S20, the row does not fit
 * at 1024) the rooms open on a full-screen sheet of the same cloth: five
 * large rows (the org menu becomes a disclosure that opens in place), a
 * quiet 2 × 2 group, then Sign in and the one button.
 */
const WIDE = "(min-width:1180px)";
const HOVER = "(hover: hover) and (pointer: fine)";

function RoomLink({
  path,
  pathname,
  onClick,
  className,
}: {
  path: RoutePath;
  pathname: string;
  onClick: () => void;
  className?: string;
}) {
  const r = route(path);
  /* /samples is a page in public/, outside the React router: a router Link
     would show the not-found route, so it needs a full navigation. */
  return isFile(r.to) ? (
    <a href={r.to} onClick={onClick} className={className}>
      {r.label}
    </a>
  ) : (
    <Link
      to={r.to}
      onClick={onClick}
      className={className}
      aria-current={bare(pathname) === r.to ? "page" : undefined}
    >
      {r.label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false),
    [org, setOrg] = useState(false),
    [tucked, setTucked] = useState(false),
    [condensed, setCondensed] = useState(false);
  const header = useRef<HTMLElement>(null),
    toggle = useRef<HTMLButtonElement>(null),
    orgToggle = useRef<HTMLButtonElement>(null),
    orgWrap = useRef<HTMLDivElement>(null),
    hoverTimer = useRef(0),
    /* How the open panel was opened: a hover-opened panel survives the click
       that follows it (Radix). */
    openedBy = useRef<"hover" | "click" | null>(null);
  const location = useLocation();
  const onOrgPage = isOrgPage(location.pathname);
  /*
   * Two scroll states (phase 2: the bar is always the cloth). Past the top
   * it settles; while the reader moves down it tucks away and comes back as
   * soon as they move up. The small threshold stops a trackpad's jitter
   * from flickering it.
   */
  useEffect(() => {
    let last = window.scrollY;
    const check = () => {
      const y = window.scrollY;
      setCondensed(y > 24);
      if (Math.abs(y - last) > 6) {
        setTucked(y > last && y > 240);
        last = y;
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  useEffect(() => {
    const ro = new ResizeObserver(() =>
      document.documentElement.style.setProperty(
        "--nav-total",
        `${header.current?.getBoundingClientRect().height ?? 110}px`,
      ),
    );
    if (header.current) ro.observe(header.current);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(false);
      setOrg(false);
      openedBy.current = null;
    }, 0);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);
  /* The desktop panel: Esc and an outside pointer close it. In the drawer
     the disclosure stays until it is toggled or the drawer closes. */
  useEffect(() => {
    if (!org || open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOrg(false);
        openedBy.current = null;
        orgToggle.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!orgWrap.current?.contains(e.target as Node)) {
        setOrg(false);
        openedBy.current = null;
      }
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [org, open]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    /* The sticky bar steps away while the drawer is open (spec §3.6). */
    document.body.dataset.navOpen = "";
    const outside = [
      ...document.querySelectorAll<HTMLElement>("main,footer"),
    ].map((el) => ({ el, old: el.inert }));
    outside.forEach((x) => (x.el.inert = true));
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          ...header.current!.querySelectorAll<HTMLElement>("a,button"),
        ].filter((x) => x.getClientRects().length);
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const media = matchMedia(WIDE);
    const wide = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", wide);
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      delete document.body.dataset.navOpen;
      outside.forEach((x) => (x.el.inert = x.old));
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", wide);
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    setOrg(false);
    openedBy.current = null;
  };
  const toggleDrawer = () => {
    /* The org disclosure starts open on the two org pages, closed elsewhere. */
    if (!open) setOrg(onOrgPage);
    else setOrg(false);
    setOpen(!open);
  };
  const desktopHover = () =>
    !open && matchMedia(WIDE).matches && matchMedia(HOVER).matches;
  const onOrgEnter = () => {
    if (!desktopHover()) return;
    window.clearTimeout(hoverTimer.current);
    if (org) return;
    hoverTimer.current = window.setTimeout(() => {
      openedBy.current = "hover";
      setOrg(true);
    }, 120);
  };
  const onOrgLeave = () => {
    if (!desktopHover()) return;
    window.clearTimeout(hoverTimer.current);
    if (openedBy.current !== "hover") return;
    hoverTimer.current = window.setTimeout(() => {
      openedBy.current = null;
      setOrg(false);
    }, 200);
  };
  const onOrgClick = () => {
    window.clearTimeout(hoverTimer.current);
    if (org && openedBy.current === "hover") {
      openedBy.current = "click";
      return;
    }
    openedBy.current = org ? null : "click";
    setOrg(!org);
  };
  const rows = orgMenu(location.pathname);
  return (
    <HeaderShell
      ref={header}
      className={[
        "gf-header",
        tucked && !open && !org ? "is-tucked" : "",
        condensed ? "is-condensed" : "",
        open ? "is-open" : "",
      ].join(" ")}
      onFocus={() => setTucked(false)}
    >
      <div className="gf-nav-inner">
        <span onClick={close}>
          <Wordmark light />
        </span>
        <button
          className="gf-menu-toggle"
          ref={toggle}
          aria-controls="site-navigation"
          aria-expanded={open}
          onClick={toggleDrawer}
        >
          {open ? "Close" : "Menu"} <i aria-hidden="true" />
        </button>
        <nav id="site-navigation" aria-label="Main navigation">
          <div className="gf-nav-links">
            {BAR.map((p) => (
              <RoomLink
                key={p}
                path={p}
                pathname={location.pathname}
                onClick={close}
              />
            ))}
            <div
              className="org-wrap"
              ref={orgWrap}
              onPointerEnter={onOrgEnter}
              onPointerLeave={onOrgLeave}
              onBlur={(e) => {
                if (
                  !open &&
                  !e.currentTarget.contains(e.relatedTarget as Node)
                ) {
                  setOrg(false);
                  openedBy.current = null;
                }
              }}
            >
              <button
                ref={orgToggle}
                className="org-toggle"
                aria-expanded={org}
                aria-controls="org-panel"
                aria-current={onOrgPage ? "true" : undefined}
                onClick={onOrgClick}
              >
                {ORG_MENU_LABEL}
                <svg
                  className="org-chevron"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <path d="m5 7 5 5 5-5" />
                </svg>
              </button>
              <div id="org-panel" className="org-panel" hidden={!org}>
                {rows.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    onClick={close}
                    className={r.to.includes("#") ? "org-demo" : undefined}
                    aria-current={
                      bare(location.pathname) === r.to ? "page" : undefined
                    }
                  >
                    <span>
                      <strong>{r.label}</strong>
                      {r.hint && <small>{r.hint}</small>}
                    </span>
                    {r.to.includes("#") && <ArrowIcon />}
                  </Link>
                ))}
              </div>
            </div>
            {BAR_AFTER.map((p) => (
              <RoomLink
                key={p}
                path={p}
                pathname={location.pathname}
                onClick={close}
              />
            ))}
          </div>
          {/* The drawer's quiet group; not shown in the desktop bar. */}
          <div className="gf-nav-muted">
            {DRAWER_MUTED.map((p) => (
              <RoomLink
                key={p}
                path={p}
                pathname={location.pathname}
                onClick={close}
              />
            ))}
          </div>
          {/* The door for people who already have an account, beside the one action. */}
          <div className="gf-nav-right">
            <a className="gf-signin" href={SIGN_IN.to} onClick={close}>
              {SIGN_IN.label}
            </a>
            {/* The institution pages' one action is a demo (2026-10-29). */}
            {onOrgPage ? (
              <a className="gf-button" href="#book" onClick={close}>
                Book a demo <ArrowIcon />
              </a>
            ) : (
              <a className="gf-button" href={START_HREF} onClick={close}>
                {START_LABEL} <ArrowIcon />
              </a>
            )}
          </div>
        </nav>
      </div>
    </HeaderShell>
  );
}
