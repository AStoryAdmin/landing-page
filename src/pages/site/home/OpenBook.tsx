/**
 * The open book: the home page's first screen (2026-10-23).
 *
 * The site's opening now matches the web app's front door
 * (app.astoryapp.com): the family book lies open on the bookbinder's bench.
 * The left page is the endpaper - the chocolate board with the A mark
 * pressed into it - holding three prints in black photo corners, a line
 * written under each, and one thing a person said, in the book's serif. The
 * right page is the title page: the company's opening line, one sentence on
 * what A Story does, the two doors (Start free, Reserve for $1) and, asleep
 * on his book at the foot of the page, Bond, the founder's dog. He is
 * decoration only and never covers a word or a control.
 *
 * The spread fits one screen at every desktop size: it is as wide as the
 * window allows and never taller than the window under the header, so on a
 * 2560 display it spans the screen rather than sitting in a strip. On a phone
 * the title page comes first and the prints follow.
 *
 * Motion: on load the prints are laid down, the headline rises by line and
 * the rest follows, in about a second and a half; nothing blocks a click
 * meanwhile. The old intro cover (Intro.tsx), which held the page for five
 * seconds every session, is gone from Home (review, 2026-10-23). Under
 * reduced motion the page is simply there. Nothing scrubs on scroll.
 */
import styled from "styled-components";
import { ArrowIcon } from "../kit/kit";
import { PrimaryLink, SecondaryLink } from "../kit/kit.styles";
import { A_PATTERN } from "../kit/cloth";
import { Print } from "./bench";
import { chocolateCloth } from "../kit/cloth";
import { ivoryLeaf } from "./bench.styles";
import { gsap, useScene } from "../../../lib/scrollMotion";
import { lines, OUT } from "./motion";
import { color, font, media } from "../../../styles/theme";
import { START_HREF, START_LABEL } from "../../../lib/app";
import { OFFERS } from "../../../lib/founding";

/** The album on the endpaper. Positions are % of the page; widths % of its width. */
const ALBUM = [
  {
    id: "27",
    alt: "A family around a dinner table, everyone listening to the grandfather tell a story",
    caption: "Sunday dinner, everyone talking at once",
    ratio: "3 / 2",
    focus: "50% 40%",
    tilt: -2.2,
    depth: 0.7,
    l: 6,
    t: 7,
    w: 53,
  },
  {
    id: "31",
    alt: "A black-and-white portrait of a woman looking off to one side",
    caption: "Ruth, the summer of ’58",
    ratio: "4 / 5",
    focus: "45% 35%",
    tilt: 2.4,
    depth: 1.2,
    l: 65,
    t: 9,
    w: 28,
  },
  {
    id: "30",
    alt: "A father and his son wading into a lake while their mother watches from a chair",
    caption: "The lake, the year Dan learned to swim",
    ratio: "3 / 2",
    tilt: -1.3,
    depth: 1,
    l: 9,
    t: 55,
    w: 45,
  },
];

const Scene = styled.section`
  --ink: ${color.primary};
  position: relative;
  /* The header floats over the cloth on this route (Header.tsx reads this section). */
  margin-top: calc(-1 * var(--nav-total));
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: calc(var(--nav-total) + 8px) var(--page-gutter) clamp(18px, 3svh, 40px);
  overflow: hidden;
  ${chocolateCloth};
  color: ${color.ivory};

  .spread {
    position: relative;
    width: min(1880px, 100%, calc((100svh - var(--nav-total) - 56px) * 1.9));
    aspect-ratio: 1.9 / 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    container-type: inline-size;
    border-radius: 3px;
    box-shadow:
      0 2px 3px rgba(0, 0, 0, 0.35),
      0 40px 70px -30px rgba(0, 0, 0, 0.65),
      0 0 0 1px rgba(0, 0, 0, 0.25);
  }

  /* ── the left page: the endpaper ─────────────────────────────────── */
  .endpaper {
    position: relative;
    min-width: 0;
    overflow: clip;
    border-radius: 3px 0 0 3px;
    background: ${color.primary};
    color: ${color.ivory};
  }
  /* The A mark, pressed into the board in a repeat (the kit's endpaper tile). */
  .endpaper::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${A_PATTERN} 0 0 / 6cqw 6.6cqw repeat;
    pointer-events: none;
  }
  /* The gutter: the page curving down into the spine. */
  .endpaper::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.06) 7%, transparent 16%);
    pointer-events: none;
  }
  .album {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .album figure {
    position: absolute;
    --border: 0.62cqw;
    --corner: 1.55cqw;
    --cap: max(15px, 1.22cqw);
    --cap-ink: ${color.ivory};
  }
  .said {
    position: absolute;
    z-index: 1;
    left: 61%;
    right: 7%;
    top: 63%;
    margin: 0;
  }
  .said::before {
    content: "";
    display: block;
    width: 3.2cqw;
    height: 1px;
    margin-bottom: 1.3cqw;
    background: ${color.warmGold};
  }
  .said blockquote {
    margin: 0;
    font: italic 400 max(16px, 1.42cqw) / 1.38 ${font.text};
    color: ${color.ivory};
    text-wrap: pretty;
  }
  .said figcaption {
    margin-top: 0.9cqw;
    font: 400 max(13px, 0.8cqw) / 1.4 ${font.body};
    color: ${color.onDarkMuted};
  }

  /* ── the right page: the title page ──────────────────────────────── */
  .title-page {
    position: relative;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4cqw 5.5cqw 5.5cqw 6.5cqw;
    border-radius: 0 3px 3px 0;
    ${ivoryLeaf};
  }
  .title-page::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 7cqw;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05) 45%, transparent);
    pointer-events: none;
  }
  /* A foil hairline inset from the page's edge, as the app's sheets have. */
  .title-page::after {
    content: "";
    position: absolute;
    inset: 1.1cqw 1.1cqw 1.1cqw 1.6cqw;
    border: 1px solid color-mix(in srgb, ${color.warmGold} 38%, transparent);
    pointer-events: none;
  }
  .mark {
    display: block;
    width: 2.3cqw;
    height: 2.55cqw;
    margin-bottom: 2.2cqw;
    background: ${color.primary};
    -webkit-mask: url("/book-objects/a-mark.png") center / contain no-repeat;
    mask: url("/book-objects/a-mark.png") center / contain no-repeat;
  }
  h1 {
    margin: 0;
    font: 600 clamp(38px, 4.3cqw, 104px) / 1.02 ${font.display};
    letter-spacing: -0.012em;
    color: ${color.primary};
    text-wrap: balance;
  }
  h1 em {
    font-style: normal;
    color: ${color.accent};
  }
  .rule {
    display: block;
    width: 5cqw;
    min-width: 48px;
    height: 1px;
    margin: 2.2cqw 0 0;
    background: ${color.warmGold};
  }
  .lead {
    margin: 2cqw 0 0;
    max-width: 38ch;
    font: 400 max(17px, 1.32cqw) / 1.5 ${font.text};
    color: ${color.body};
    text-wrap: pretty;
  }
  .doors {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 18px;
    align-items: center;
    margin-top: 2.6cqw;
  }
  .small {
    margin: 1.4cqw 0 0;
    max-width: 40ch;
    font: 400 14px / 1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  /* Bond, asleep on his book at the foot of the page. */
  .bond {
    position: absolute;
    right: 3.4cqw;
    bottom: 2.1cqw;
    width: 10.5cqw;
    height: auto;
    pointer-events: none;
    filter: drop-shadow(0 6px 8px rgba(42, 31, 24, 0.18));
  }
  /* The ribbon marker, hanging from the head of the spine. */
  .ribbon {
    position: absolute;
    left: calc(50% - 0.5cqw);
    bottom: -3.2cqw;
    width: 1cqw;
    height: 5cqw;
    background: ${color.accent};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%);
    box-shadow: inset 2px 0 0 rgba(0, 0, 0, 0.12);
    pointer-events: none;
  }

  ${media.md} {
    min-height: 0;
    padding: calc(var(--nav-total) + 12px) 14px 28px;
    .spread {
      width: 100%;
      aspect-ratio: auto;
      grid-template-columns: minmax(0, 1fr);
    }
    .title-page {
      order: -1;
      border-radius: 3px 3px 0 0;
      padding: 40px 26px 96px;
    }
    .title-page::before {
      display: none;
    }
    .title-page::after {
      inset: 8px;
    }
    .mark {
      width: 26px;
      height: 29px;
      margin-bottom: 20px;
    }
    .rule {
      margin-top: 20px;
    }
    .lead {
      margin-top: 18px;
    }
    .doors {
      margin-top: 26px;
    }
    .small {
      margin-top: 14px;
    }
    .bond {
      right: 18px;
      bottom: 16px;
      width: 112px;
    }
    .endpaper {
      aspect-ratio: 1 / 1.08;
      border-radius: 0 0 3px 3px;
    }
    .endpaper::after {
      display: none;
    }
    .endpaper::before {
      background-size: 14cqw 15.4cqw;
    }
    .album figure {
      --border: 1.4cqw;
      --corner: 3.6cqw;
      --cap: 15px;
    }
    .said,
    .ribbon {
      display: none;
    }
  }
  ${media.sm} {
    h1 {
      font-size: 40px;
    }
  }
`;

export default function OpenBook() {
  const ref = useScene<HTMLElement>((root, { wide }) => {
    const prints = root.querySelectorAll(".album figure");
    const rest = root.querySelectorAll(".mark, .rule, .lead, .doors, .small, .said");
    const bond = root.querySelector(".bond");
    const title = lines(root.querySelector("h1"), { paused: true, trigger: false, delay: 0.25 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: OUT } });
    tl.from(prints, {
      y: 40,
      rotation: (i: number) => (i % 2 ? 4 : -4),
      scale: 0.96,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
    })
      .from(rest, { y: 20, opacity: 0, duration: 0.9, stagger: 0.07 }, 0.45)
      .from(bond, { y: 14, opacity: 0, duration: 0.9 }, 1.1);

    // One short arrival on load, about a second and a half; nothing waits on it.
    title?.play();
    tl.play();

    // On a desktop the prints drift a few pixels with the pointer, each at its own depth.
    let move: ((e: PointerEvent) => void) | undefined;
    if (wide && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const movers = Array.from(prints).map((p, i) => ({
        d: ALBUM[i]?.depth ?? 1,
        x: gsap.quickTo(p.querySelector(".print-in"), "x", { duration: 1.1, ease: OUT }),
        y: gsap.quickTo(p.querySelector(".print-in"), "y", { duration: 1.1, ease: OUT }),
      }));
      move = (e: PointerEvent) => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 2;
        const dy = (e.clientY / window.innerHeight - 0.5) * 2;
        for (const m of movers) {
          m.x(-dx * 4 * m.d);
          m.y(-dy * 4 * m.d);
        }
      };
      window.addEventListener("pointermove", move, { passive: true });
    }
    return () => {
      if (move) window.removeEventListener("pointermove", move);
    };
  });

  return (
    <Scene ref={ref} aria-labelledby="hero-title">
      <div className="spread">
        <div className="endpaper">
          <div className="album">
            {ALBUM.map((p, i) => (
              <Print
                key={p.id}
                id={p.id}
                alt={p.alt}
                caption={p.caption}
                ratio={p.ratio}
                focus={p.focus}
                tilt={p.tilt}
                sizes="(max-width: 860px) 60vw, 28vw"
                priority={i === 0}
                style={{ left: `${p.l}%`, top: `${p.t}%`, width: `${p.w}%` }}
              />
            ))}
          </div>
          <figure className="said">
            <blockquote>
              “Every broken fan on the street ended up in that garage. So did
              every story.”
            </blockquote>
            <figcaption>Dan, about his father · from a sample family’s book</figcaption>
          </figure>
        </div>

        <div className="title-page">
          <span className="mark" aria-hidden="true" />
          <h1 id="hero-title">
            Most of a life goes <em>undocumented.</em>
          </h1>
          <span className="rule" aria-hidden="true" />
          <p className="lead">
            A Story is an AI biographer that calls your parents and
            grandparents, asks about their lives, and keeps what they tell in a
            private book the whole family can add to.
          </p>
          <div className="doors">
            <PrimaryLink to={START_HREF}>
              {START_LABEL} <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/reserve">
              Reserve for {OFFERS.reserve.price} <ArrowIcon />
            </SecondaryLink>
          </div>
          <p className="small">
            Start free with the family archive in your browser, no card. The
            calls ring on iPhone in our private beta.
          </p>
          <img
            className="bond"
            src="/home/bond-book.webp"
            width={863}
            height={474}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        </div>
        <span className="ribbon" aria-hidden="true" />
      </div>
    </Scene>
  );
}
