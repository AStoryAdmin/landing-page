import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wordmark } from "./shared";
import { ArrowIcon } from "./kit/kit";
import { HeaderShell } from "./chrome.styles";
const primary = [
  ["How it works", "/how-it-works"],
  ["For families", "/for-families"],
  ["Pricing", "/pricing"],
  ["Our story", "/our-story"],
];
const groups = [
  {
    label: "Explore",
    items: [
      [
        "How A Story is different",
        "/compare",
        "Memoir products, family archives, and us.",
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
      ["Organizations", "/organizations", "Keep the knowledge people carry."],
      ["Your own story", "/your-story", "Your life belongs here too."],
      [
        "Get in touch",
        "mailto:contact@astoryapp.com",
        "A conversation with our team.",
      ],
    ],
  },
];
export default function Header() {
  const [open, setOpen] = useState(false),
    [more, setMore] = useState(false),
    // Decided on first render so the home header never paints ivory first.
    [overDark, setOverDark] = useState(() => window.location.pathname === "/"),
    [tucked, setTucked] = useState(false);
  const header = useRef<HTMLElement>(null),
    toggle = useRef<HTMLButtonElement>(null),
    moreToggle = useRef<HTMLButtonElement>(null),
    panel = useRef<HTMLDivElement>(null);
  const location = useLocation();
  /*
   * Two scroll states. Over the home opening the header is transparent on the
   * photograph; everywhere past it, the header tucks away while the reader
   * moves down the page and comes back as soon as they move up. The small
   * threshold stops a trackpad's jitter from flickering it.
   */
  const home = location.pathname === "/";
  useEffect(() => {
    let last = window.scrollY;
    const check = () => {
      const y = window.scrollY;
      const hero = document.querySelector('[aria-labelledby="hero-title"]');
      setOverDark(
        home &&
          !!hero &&
          hero.getBoundingClientRect().bottom >
            (header.current?.offsetHeight ?? 90),
      );
      if (Math.abs(y - last) > 6) {
        setTucked(y > last && y > 240);
        last = y;
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [home]);
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
  return (
    <HeaderShell
      ref={header}
      className={[
        "gf-header",
        overDark && !open ? "is-over-dark" : "",
        tucked && !open && !more ? "is-tucked" : "",
        open ? "is-open" : "",
      ].join(" ")}
      onFocus={() => setTucked(false)}
    >
      <div className="gf-nav-inner">
        <span onClick={close}>
          <Wordmark light={overDark || open} />
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
            {primary.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                onClick={close}
                aria-current={location.pathname === to ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
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
          <Link className="gf-button" to="/start" onClick={close}>
            Join the waitlist <ArrowIcon />
          </Link>
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
