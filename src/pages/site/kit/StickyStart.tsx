/**
 * The one action, following the reader on a phone (2026-10-16).
 *
 * On a phone the opening's button is gone after the first screen, and the
 * next one is several screens down. Once the opening has scrolled out of
 * view, the site's primary action - "Reserve for $1", the same pill as
 * everywhere else - sits in one bar at the foot of the window, inside the
 * safe area. Nothing else is in the bar: no countdown, no line of urgency.
 *
 * Desktop never shows it (the header carries the same action). It steps
 * away again when the closing invitation or the footer is in view, because
 * each of those already has the button, and it is not shown on the pages
 * that have a decision of their own at the bottom (Pricing's decision bar,
 * Reserve, Start, the account pages) or on the legal pages.
 *
 * Rendered inside <main>, so the header's open menu, which makes main
 * inert, takes it out of reach with everything else.
 */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ArrowIcon } from "./kit";
import { PrimaryLink } from "./kit.styles";
import { color, media, motion } from "../../../styles/theme";

const SHOW_ON = new Set([
  "/",
  "/how-it-works",
  "/for-families",
  "/our-story",
  "/compare",
  "/questions",
  "/guides",
  "/care-communities",
  "/organizations",
  "/your-story",
  "/programs",
]);
const showsOn = (path: string) => SHOW_ON.has(path) || path.startsWith("/guides/");

const Bar = styled.div`
  display: none;
  ${media.md} {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    padding: 10px var(--page-gutter) calc(10px + env(safe-area-inset-bottom, 0px));
    background: color-mix(in srgb, ${color.ivory} 94%, transparent);
    backdrop-filter: blur(14px);
    border-top: 1px solid ${color.primaryLine};
    transform: translateY(110%);
    visibility: hidden;
    transition:
      transform ${motion.reveal},
      visibility 0s linear 900ms;
    &[data-shown="true"] {
      transform: none;
      visibility: visible;
      transition-delay: 0s;
    }
    a {
      width: 100%;
      min-height: 56px;
    }
  }
`;

export default function StickyStart() {
  const { pathname } = useLocation();
  const [shown, setShown] = useState(false);

  /* Mounted with key={pathname} (App.tsx), so a new route starts hidden. */
  useEffect(() => {
    if (!showsOn(pathname)) return;
    /* Phones only; the bar is display:none above 860px anyway. */
    if (!window.matchMedia("(max-width: 860px)").matches) return;

    let past = false;
    const ending = new Set<Element>();
    let io: IntersectionObserver | undefined;
    let retry = 0;
    let timer = 0;
    const update = () => setShown(past && ending.size === 0);

    /* The route's opening renders after its chunk loads; look again until
       it is there, for a few seconds at most. */
    const watch = () => {
      const hero = document.querySelector<HTMLElement>(
        '[aria-labelledby="hero-title"], [aria-labelledby="page-title"]',
      );
      if (!hero) {
        if (retry++ < 12) timer = window.setTimeout(watch, 250);
        return;
      }
      const endings = document.querySelectorAll<HTMLElement>(
        '[aria-labelledby="invitation-title"], footer',
      );
      io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.target === hero) {
            past = !e.isIntersecting && e.boundingClientRect.bottom < 0;
          } else if (e.isIntersecting) {
            ending.add(e.target);
          } else {
            ending.delete(e.target);
          }
        }
        update();
      });
      io.observe(hero);
      endings.forEach((el) => io!.observe(el));
    };
    watch();
    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [pathname]);

  if (!showsOn(pathname)) return null;
  return (
    <Bar data-shown={shown} aria-hidden={!shown}>
      <PrimaryLink to="/reserve" tabIndex={shown ? 0 : -1}>
        Reserve for $1 <ArrowIcon />
      </PrimaryLink>
    </Bar>
  );
}
