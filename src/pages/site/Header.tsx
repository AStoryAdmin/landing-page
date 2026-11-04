import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wordmark } from "./shared";
import { ArrowIcon } from "./kit/kit";
import { HeaderShell } from "./chrome.styles";
import { START_HREF, START_LABEL } from "../../lib/app";
import { SIGN_IN, TABS, isOrgPage, type Tab } from "../../lib/nav";

/*
 * The bar (phone-first plan, 2026-11-04, Daniel: "utilize our tabs (really)
 * there are currently too much. Make it only 3-4 tab."):
 *
 *   How it works · Sample books · Pricing · For organizations
 *   Sign in  [Get the iPhone app →]
 *
 * The way the calm product sites do it (Linear, Arc, Superhuman, Calm,
 * Headspace, small YC consumer apps): a handful of plain words, no menus
 * that open, one quiet door for people who already have an account, and
 * one button. "For organizations" is a single link (no panel); Our story,
 * For families, the /join door, questions, guides and contact are in the
 * footer. The phone drawer has the same four rows, then Sign in and the
 * same button, and nothing else. On the two organization pages the button
 * stays "Book a demo" (#book), because that is what those pages are for
 * (spec M11, kept; logged in CHIEF-LOG).
 *
 * Below 1180px (media.navBar) the four open on a full-screen sheet of the
 * same cloth.
 */
const WIDE = "(min-width:1180px)";

function TabLink({
  t,
  pathname,
  onClick,
}: {
  t: Tab;
  pathname: string;
  onClick: () => void;
}) {
  const current = t.current(pathname) ? "page" : undefined;
  /* /samples is a page in public/, outside the React router: a router Link
     would show the not-found route, so it needs a full navigation. */
  return t.file ? (
    <a href={t.to} onClick={onClick} aria-current={current}>
      {t.label}
    </a>
  ) : (
    <Link to={t.to} onClick={onClick} aria-current={current}>
      {t.label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false),
    [tucked, setTucked] = useState(false),
    [condensed, setCondensed] = useState(false);
  const header = useRef<HTMLElement>(null),
    toggle = useRef<HTMLButtonElement>(null);
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
    const t = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);
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
  const close = () => setOpen(false);
  return (
    <HeaderShell
      ref={header}
      className={[
        "gf-header",
        tucked && !open ? "is-tucked" : "",
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
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"} <i aria-hidden="true" />
        </button>
        <nav id="site-navigation" aria-label="Main navigation">
          <div className="gf-nav-links">
            {TABS.map((t) => (
              <TabLink
                key={t.path}
                t={t}
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
              <Link
                className="gf-button"
                to={START_HREF}
                onClick={close}
                aria-current={
                  location.pathname.startsWith(START_HREF) ? "page" : undefined
                }
              >
                {START_LABEL} <ArrowIcon />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </HeaderShell>
  );
}
