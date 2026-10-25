import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wordmark } from "./shared";
import { ArrowIcon } from "./kit/kit";
import { HeaderShell } from "./chrome.styles";
import { APP, START_HREF, START_LABEL } from "../../lib/app";
const primary = [
  ["How it works", "/how-it-works"],
  ["Sample books", "/samples"],
  ["For families", "/for-families"],
  ["Pricing", "/pricing"],
  ["Our story", "/our-story"],
];
/* The startup programs left the navigation on 2026-10-16: a credential in
   the main path read as a notice about the company's stage, not the family's
   story. /programs stays reachable from the footer. */
/* /samples is a self-contained page served from public/, outside the React
   router, so it needs a full navigation - a router Link would show the
   not-found route. */
const outsideRouter = (to: string) => to === "/samples" || /^https?:/.test(to);
const groups = [
  {
    label: "Explore",
    items: [
      [
        "How A Story is different",
        "/compare",
        "Story apps, family archives, and us.",
      ],
      ["Questions & answers", "/questions", "The practical things, explained."],
      ["Conversation guides", "/guides", "A good place to begin."],
      ["Privacy", "/privacy", "Their story belongs to them."],
    ],
  },
  {
    label: "Also for",
    items: [
      [
        "Care communities",
        "/care-communities",
        "Know the person behind the care.",
      ],
      ["Institutions", "/organizations", "Colleges, libraries, companies. Book a demo."],
      ["Your own story", "/your-story", "Your life belongs here too."],
      [
        "Get in touch",
        "/contact",
        "Write to Daniel, our co-founder.",
      ],
    ],
  },
];
export default function Header() {
  const [open, setOpen] = useState(false),
    [more, setMore] = useState(false),
    [tucked, setTucked] = useState(false),
    [condensed, setCondensed] = useState(false);
  const header = useRef<HTMLElement>(null),
    toggle = useRef<HTMLButtonElement>(null),
    moreToggle = useRef<HTMLButtonElement>(null),
    panel = useRef<HTMLDivElement>(null);
  const location = useLocation();
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
      setMore(false);
    }, 0);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!more) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMore(false);
        moreToggle.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (
        !panel.current?.contains(e.target as Node) &&
        !moreToggle.current?.contains(e.target as Node)
      )
        setMore(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [more]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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
    const media = matchMedia("(min-width:1101px)");
    const wide = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", wide);
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      outside.forEach((x) => (x.el.inert = x.old));
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", wide);
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    setMore(false);
  };
  /* "Sign in" opens the web app (2026-10-18): accounts live there now, and
     there is something to sign into. It was left out of the nav from
     2026-10-03 until then because it led to an empty page. */
  const account = [["Sign in", APP.signIn] as const];
  return (
    <HeaderShell
      ref={header}
      className={[
        "gf-header",
        tucked && !open && !more ? "is-tucked" : "",
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
            {primary.map(([label, to]) =>
              outsideRouter(to) ? (
                <a key={to} href={to} onClick={close}>
                  {label}
                </a>
              ) : (
                <Link
                  key={to}
                  to={to}
                  onClick={close}
                  aria-current={location.pathname === to ? "page" : undefined}
                >
                  {label}
                </Link>
              ),
            )}
            <div
              className="more-wrap"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node))
                  setMore(false);
              }}
            >
              <button
                ref={moreToggle}
                className="more-toggle"
                aria-expanded={more}
                aria-controls="more-panel"
                onClick={() => setMore(!more)}
              >
                More{" "}
                <svg
                  className="more-chevron"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <path d="m5 7 5 5 5-5" />
                </svg>
              </button>
              <div
                ref={panel}
                id="more-panel"
                className="more-panel"
                hidden={!more}
              >
                <div className="more-groups">
                  {groups.map((g) => (
                    <div key={g.label}>
                      <h2>{g.label}</h2>
                      {g.items.map(([label, to, description]) => (
                        <Link key={to} to={to} onClick={close}>
                          <strong>{label}</strong>
                          <small>{description}</small>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <Link className="more-feature" to="/our-story" onClick={close}>
                  <img src="/mission/31-640.webp" alt="" loading="lazy" />
                  <small>Our story</small>
                  <b>Why two founders started asking.</b>
                  <span>Read the letter →</span>
                </Link>
              </div>
            </div>
          </div>
          {/* The door for people who already have an account, beside the one action. */}
          <div className="gf-nav-right">
            {account.map(([label, to]) => (
              <a key={to} className="gf-signin" href={to} onClick={close}>
                {label}
              </a>
            ))}
            <a className="gf-button" href={START_HREF} onClick={close}>
              {START_LABEL} <ArrowIcon />
            </a>
          </div>
          <div className="gf-mobile-more">
            {groups.map((g) => (
              <div key={g.label}>
                <h2>{g.label}</h2>
                {g.items.map(([label, to]) => (
                  <Link key={to} to={to} onClick={close}>
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </HeaderShell>
  );
}
