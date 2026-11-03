/**
 * The film — A Story's demo, straight after the hero (2026-11-02).
 *
 * The hero says what A Story is in a sentence; the next thing a first-time
 * visitor wants is to see it happen. It sits here, before "what gets lost",
 * because a visitor who has seen one call understands every section that
 * follows; the calls set as text (Listen) stay further down as the readable
 * version.
 *
 * Two films, one card. Inline is a SILENT ten-second loop — a picture that
 * moves, playing muted only while it is in view, with a poster and no
 * controls. The full film, with its sound, opens in a lightbox from the one
 * action, "Watch the film". That is the shape every 2026 YC homepage with a
 * video uses (Pocket, Rhem, Remento; audited in the demo-video repo,
 * brief/research/yc-launch-videos-2026.md §3): nobody autoplays sound, loops
 * run 8–10 s, and the sound version is a separate click. The first draft of
 * this file autoplayed the whole 49 s film muted with a "Watch with sound"
 * toggle; it asked a visitor to sit through a silent film with captions
 * before offering the real one.
 *
 * Two cuts of each: 16:9 for laptops, 9:16 under 640px, chosen by media
 * query so a phone never downloads the landscape file. The files are written
 * by scripts/film-encode.mjs under fixed names (public/film/README.md), so a
 * new cut is a re-encode, not a code change.
 *
 * Complete without motion: with prefers-reduced-motion, or on a data-saver
 * connection, the loop does not run — poster and the button only — and the
 * film still opens on request. Captions are burned into the film, so there
 * is no text track; the readable alternative is the three calls at #listen,
 * linked for screen readers. The lightbox is a native <dialog>: Esc closes
 * it, focus stays inside, the loop pauses while it is open and resumes after.
 */
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowIcon } from "../kit/kit";
import {
  Eyebrow,
  Frame,
  Lead,
  PrimaryButton,
  grounds,
  onDarkActions,
} from "../kit/kit.styles";
import { gsap, riseLines, useScene } from "../../../lib/scrollMotion";
import { color, font, media, motion, radius } from "../../../styles/theme";

const CUTS = {
  wide: {
    loop: "/film/a-story-loop-16x9.mp4",
    loopPoster: "/film/a-story-loop-16x9-poster.jpg",
    film: "/film/a-story-film-16x9.mp4",
    filmPoster: "/film/a-story-film-16x9-poster.jpg",
    width: 1920,
    height: 1080,
  },
  tall: {
    loop: "/film/a-story-loop-9x16.mp4",
    loopPoster: "/film/a-story-loop-9x16-poster.jpg",
    film: "/film/a-story-film-9x16.mp4",
    filmPoster: "/film/a-story-film-9x16-poster.jpg",
    width: 1080,
    height: 1920,
  },
} as const;

/** The phone cut below the kit's `sm` breakpoint; must agree with the CSS below. */
const TALL_QUERY = "(max-width: 640px)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

/** Live answer to a media query; `fallback` is what a non-browser sees. */
function useMedia(query: string, fallback = false) {
  const [matches, set] = useState(() =>
    typeof window === "undefined" ? fallback : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => set(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return matches;
}

/** Autoplay is a courtesy; a reader on a metered connection has not asked for it. */
function savesData() {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return Boolean(c?.saveData);
}

const Scene = styled.section`
  --ink: ${grounds.night.ink};
  --muted: ${grounds.night.muted};
  --label: ${grounds.night.label};
  --focus: ${grounds.night.focus};
  --focus-halo: ${grounds.night.focusHalo};
  position: relative;
  background: ${color.night};
  color: var(--ink);
  /* The next section's ivory curve (RisingEdge) rises into this one, so the
     foot carries its height on top of the usual rhythm. */
  padding: calc(clamp(64px, 7vw, 112px) * var(--sy)) 0
    calc(clamp(64px, 7vw, 112px) * var(--sy) + clamp(40px, 6vw, 96px));
  ${onDarkActions};

  .top {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: 12px 48px;
    margin-bottom: calc(clamp(28px, 3.4vw, 48px) * var(--sy));
  }
  .top ${Eyebrow} {
    margin-bottom: 0;
  }
  .top ${Lead} {
    max-width: 52ch;
  }

  /* The card: rounded, a hairline, cropped — a real screen as itself, no
     drawn device (design.md, Device imagery). Capped by height as well as
     width so it sits inside one laptop screen with its line above it. */
  .card {
    position: relative;
    width: min(100%, calc(72svh * 16 / 9));
    aspect-ratio: 16 / 9;
    margin: 0 auto;
    border-radius: ${radius.lg};
    overflow: hidden;
    background: ${color.black};
    box-shadow: 0 30px 70px -36px rgba(0, 0, 0, 0.7);
    isolation: isolate;
  }
  .card video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  /* The hairline sits above the picture. */
  .card::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px ${color.nightLine};
    pointer-events: none;
  }

  /* The one action, centred low in the card over a soft chocolate foot. */
  .foot {
    position: absolute;
    inset: auto 0 0 0;
    display: flex;
    justify-content: center;
    padding: clamp(48px, 7vw, 96px) 20px clamp(20px, 2.6vw, 36px);
    background: linear-gradient(
      to top,
      color-mix(in srgb, ${color.primary} 70%, transparent),
      transparent
    );
    pointer-events: none;
  }
  .foot > * {
    pointer-events: auto;
  }

  ${media.sm} {
    .card {
      width: min(100%, calc(76svh * 9 / 16));
      aspect-ratio: 9 / 16;
    }
    .foot {
      padding-bottom: 24px;
    }
  }
`;

/**
 * The lightbox. A native dialog on a near-black backdrop; the film is sized
 * by the shorter side of the window so the whole picture is always visible,
 * and the browser's own controls are on, because once someone has asked for
 * the film they expect to pause and scrub it.
 */
const Lightbox = styled.dialog`
  --ink: ${color.ivory};
  --focus: ${color.gold};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${color.ivory};
  max-width: none;
  max-height: none;
  overflow: visible;
  &::backdrop {
    background: color-mix(in srgb, ${color.black} 92%, transparent);
  }
  .film {
    position: relative;
    width: min(92vw, calc(84svh * 16 / 9));
    aspect-ratio: 16 / 9;
    border-radius: ${radius.md};
    overflow: hidden;
    background: ${color.black};
    box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.9);
  }
  .film video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .close {
    position: absolute;
    top: -56px;
    right: 0;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    padding: 0 16px 0 14px;
    border: 1px solid ${color.onDarkLine};
    border-radius: 999px;
    background: color-mix(in srgb, ${color.night} 72%, transparent);
    font: 600 13px/1.2 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.ivory};
    cursor: pointer;
    transition:
      background ${motion.base},
      border-color ${motion.base};
  }
  .close svg {
    width: 16px;
    height: 16px;
    flex: none;
  }
  @media (hover: hover) {
    .close:hover {
      background: ${color.night};
      border-color: ${color.ivory};
    }
  }
  .close:focus-visible {
    outline: 2px solid ${color.gold};
    outline-offset: 3px;
  }
  ${media.sm} {
    .film {
      width: min(92vw, calc(84svh * 9 / 16));
      aspect-ratio: 9 / 16;
    }
  }
`;

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Film() {
  const uid = useId();
  const loop = useRef<HTMLVideoElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const tall = useMedia(TALL_QUERY);
  const reduce = useMedia(REDUCE_QUERY);
  const [saver] = useState(savesData);
  const loopAllowed = !reduce && !saver;
  const cut = tall ? CUTS.tall : CUTS.wide;

  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);

  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector(".top p")!);
    gsap.from(root.querySelector(".card"), {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: root, start: "top 80%", once: true },
    });
  });

  // Only while it is on screen: half the card visible counts as watching.
  useEffect(() => {
    const el = loop.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cut]);

  // The loop runs muted while in view and the lightbox is closed; a refused
  // autoplay (strict browser) simply leaves the poster.
  useEffect(() => {
    const el = loop.current;
    if (!el) return;
    if (inView && loopAllowed && !open) {
      el.muted = true;
      el.play().catch(() => {});
    } else if (!el.paused) {
      el.pause();
    }
  }, [inView, loopAllowed, open, cut]);

  // The lightbox: open plays the film from the top with sound; close stops
  // it and returns it to the start, and releases the page's scroll.
  useEffect(() => {
    const d = dialog.current;
    const v = film.current;
    if (!d || !v) return;
    if (open) {
      if (!d.open) d.showModal();
      document.body.style.overflow = "hidden";
      v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => {});
      return () => {
        document.body.style.overflow = "";
      };
    }
    if (d.open) d.close();
    v.pause();
    v.currentTime = 0;
  }, [open, cut]);

  const close = () => setOpen(false);
  // A click on the backdrop lands on the dialog itself, not on its content.
  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialog.current) close();
  };

  return (
    <Scene ref={ref} id="film" aria-labelledby={`${uid}-title`}>
      <Frame>
        <div className="top">
          <Eyebrow id={`${uid}-title`} as="h2">
            The film
          </Eyebrow>
          <Lead>
            One call, start to finish: A Story asks, listens, follows what was
            said, and the answer becomes a page the family keeps. Under a
            minute, with captions.
          </Lead>
        </div>

        <figure className="card">
          <video
            key={cut.loop}
            ref={loop}
            src={cut.loop}
            poster={cut.loopPoster}
            width={cut.width}
            height={cut.height}
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-label="A Story at work, ten silent seconds from the film"
          />
          <Link className="sr-only" to="/#listen">
            Read the three calls as text instead
          </Link>
          <div className="foot">
            <PrimaryButton type="button" onClick={() => setOpen(true)}>
              Watch the film <ArrowIcon />
            </PrimaryButton>
          </div>
        </figure>
      </Frame>

      <Lightbox
        ref={dialog}
        aria-label="The film"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={close}
        onClick={onBackdrop}
      >
        <div className="film">
          <video
            key={cut.film}
            ref={film}
            src={cut.film}
            poster={cut.filmPoster}
            width={cut.width}
            height={cut.height}
            controls
            playsInline
            preload="none"
            disablePictureInPicture
            aria-label="A Story's film: one call becoming a page, under a minute, captions in the picture"
          />
          <button type="button" className="close" onClick={close}>
            <CloseIcon /> Close
          </button>
        </div>
      </Lightbox>
    </Scene>
  );
}
