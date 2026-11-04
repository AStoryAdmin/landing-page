/**
 * The book, as a teaser (phone-first plan, 2026-11-04).
 *
 * Daniel: "except for the book -> feels like it's duplicated since we're
 * also having sample books tab -> fix the call to action there". The whole
 * turnable Hartley book (cover, endpaper, title page, five spreads, the
 * ending and the timeline) duplicated /samples, which the bar now names as
 * one of its four tabs. So home shows one open spread of it, the first
 * memory (1952, the porch on Elm Street), and one line, and its only action
 * is the way to the real thing: "Open the sample books" -> /samples.
 *
 * Kept from the full book, so the section still looks like itself: the
 * heading, the teal case, the paper, the print with gold photo corners and
 * a Caveat caption on the left page, and on the right the chapter line, the
 * title, the teller's words with a drop cap and one other voice at the
 * foot. Wide screens get the open spread; narrow screens the two pages
 * stacked, as before, and phones (640 px and below) the right page only
 * (phone-first fix 3). Content: `homeExamples.ts` (SPREADS[0]).
 *
 * Gone with the rest of the book: the price line ("Print it at home for
 * free, or order a printed edition from ..."), "See book options" and the
 * Start button on the last page. Printing is on /pricing and /samples.
 */
import styled from "styled-components";
import { SPREADS } from "../../../lib/homeExamples";
import { ArrowIcon, Picture } from "../kit/kit";
import { Frame, PrimaryAnchor, SplitHead, Statement } from "../kit/kit.styles";
import { riseLines, useScene, gsap } from "../../../lib/scrollMotion";
import { color, font, media } from "../../../styles/theme";
import { clothBoard } from "../kit/cloth";

/* US spelling on Home ("Mom" in the 1952 spread). */
const e = {
  ...SPREADS[0],
  also: { ...SPREADS[0].also, quote: SPREADS[0].also.quote.replace(/\bMum\b/g, "Mom") },
};

const Scene = styled.section`
  --ink: ${color.primary};
  --mark: ${color.accent};
  --label: ${color.accentText};
  position: relative;
  background:
    radial-gradient(
      ellipse 70% 55% at 50% 64%,
      ${color.paperPure},
      transparent 70%
    ),
    ${color.ivoryDeep};
  padding: calc(clamp(80px, 9vw, 160px) * var(--sy)) 0
    calc(clamp(64px, 7vw, 120px) * var(--sy));
  overflow: hidden;

  .lead {
    font: 400 clamp(1.25rem, 1.08rem + 0.4vw, 1.6rem) / 1.5 ${font.text};
    color: ${color.body};
    max-width: 44ch;
  }

  .book-wrap {
    margin-top: calc(clamp(20px, 2.6vw, 48px) * var(--sy));
  }
  /* Height-aware: the open book is 1.5 : 1 and always fits the window. */
  .stage {
    position: relative;
    width: min(1240px, 100%, calc((100svh - 210px) * 1.5));
    margin: 0 auto;
  }
  /* The shadow the open book casts on the table. */
  .stage::after {
    content: "";
    position: absolute;
    z-index: 0;
    left: 2%;
    right: 2%;
    bottom: -3%;
    height: 12%;
    background: radial-gradient(
      closest-side,
      rgba(42, 31, 24, 0.45),
      transparent
    );
    filter: blur(10px);
  }
  .book {
    position: relative;
    z-index: 1;
    aspect-ratio: 1.5;
    padding: 1.4%;
    container-type: inline-size;
  }
  /* The case, teal cloth, both boards. */
  .board {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    ${clothBoard("15cqw")}
    box-shadow: 0 2px 0 color-mix(in srgb, ${color.teal} 55%, ${color.black});
  }
  .board.l {
    left: 0;
    border-radius: 8px 0 0 8px;
  }
  .board.r {
    right: 0;
    border-radius: 0 8px 8px 0;
  }
  .pages {
    position: relative;
    height: 100%;
  }
  .page {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background: radial-gradient(
      ellipse at 50% 40%,
      ${color.paperPure},
      color-mix(in srgb, ${color.paper} 70%, ${color.ivory})
    );
    overflow: hidden;
  }
  .page.left {
    left: 0;
  }
  .page.right {
    right: 0;
  }
  /* The gutter: paper curving into the spine. */
  .left-shade::after,
  .right-shade::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 14%;
    pointer-events: none;
  }
  .left-shade::after {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(42, 31, 24, 0.2),
      rgba(42, 31, 24, 0.04) 40%,
      transparent
    );
  }
  .right-shade::after {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(42, 31, 24, 0.2),
      rgba(42, 31, 24, 0.04) 40%,
      transparent
    );
  }

  /* The spread: the print on the left, the memory on the right. */
  .photo-page,
  .text-page {
    position: absolute;
    inset: 0;
    padding: 5cqw 4.8cqw 3.2cqw;
    display: flex;
    flex-direction: column;
  }
  .folio {
    margin-top: auto;
    text-align: center;
    font: 400 max(14px, 1.05cqw) / 1 ${font.text};
    font-variant-numeric: oldstyle-nums;
    color: ${color.bodyMuted};
  }
  .print {
    flex: 1;
    min-height: 0;
    display: grid;
    place-items: center;
    align-content: center;
    gap: 1.8cqw;
    padding: 0.6cqw 0 1.2cqw;
  }
  .print figure {
    position: relative;
    margin: 0;
    width: fit-content;
    max-width: 100%;
    display: grid;
    padding: 0.8cqw;
    background: ${color.white};
    box-shadow: 0 0.8cqw 1.8cqw -0.9cqw rgba(42, 31, 24, 0.55);
    transform: rotate(-0.8deg);
  }
  .print img {
    max-width: 100%;
    max-height: 40cqw;
    width: auto;
    height: auto;
    min-height: 0;
    object-fit: contain;
  }
  /* Album photo corners, gold. */
  .corner {
    position: absolute;
    width: 2.4cqw;
    height: 2.4cqw;
    background: linear-gradient(135deg, ${color.goldDeep} 50%, transparent 50%);
    filter: drop-shadow(0 0.1cqw 0.1cqw rgba(0, 0, 0, 0.25));
  }
  .corner.tl {
    top: -0.5cqw;
    left: -0.5cqw;
  }
  .corner.tr {
    top: -0.5cqw;
    right: -0.5cqw;
    transform: rotate(90deg);
  }
  .corner.br {
    bottom: -0.5cqw;
    right: -0.5cqw;
    transform: rotate(180deg);
  }
  .corner.bl {
    bottom: -0.5cqw;
    left: -0.5cqw;
    transform: rotate(270deg);
  }
  .print figcaption {
    font: 500 max(20px, 2.1cqw) / 1.1 ${font.script};
    color: ${color.primary};
    text-align: center;
  }
  .chapter {
    margin-top: 1.4cqw;
    font: 600 max(14px, 0.95cqw) / 1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .title {
    margin-top: 1.6cqw;
    font: 600 4.2cqw/1.05 ${font.display};
    letter-spacing: -0.01em;
    color: ${color.primary};
  }
  .rule {
    width: 5cqw;
    height: 1px;
    margin: 2.2cqw 0;
    background: ${color.goldDeep};
  }
  .words {
    font: 400 max(20px, 2.3cqw) / 1.45 ${font.text};
    color: ${color.body};
  }
  .words::first-letter {
    float: left;
    margin: 0.3cqw 0.9cqw 0 0;
    font: 600 6.6cqw/0.8 ${font.display};
    color: ${color.teal};
  }
  .by {
    margin-top: 1.6cqw;
    font: 500 max(14px, 1.05cqw) / 1.3 ${font.ui};
    color: ${color.bodyMuted};
  }
  /* The second voice: hung at the foot of the page, a gold rule beside it. */
  .also {
    margin: auto 0 0;
    padding: 0.2cqw 0 0.2cqw 1.8cqw;
    border-left: 2px solid ${color.warmGold};
  }
  .also p {
    font: italic 500 max(18px, 2cqw) / 1.35 ${font.display};
    color: ${color.teal};
  }
  .also cite {
    display: block;
    margin-top: 0.8cqw;
    font: 600 max(14px, 1.05cqw) / 1.2 ${font.ui};
    font-style: normal;
    color: ${color.accentText};
  }
  .text-page .folio {
    margin-top: 2.4cqw;
  }

  /* The one action: the way to the real books. */
  .go {
    display: flex;
    justify-content: center;
    margin-top: calc(clamp(40px, 4.4vw, 72px) * var(--sy));
  }

  /* Narrow screens: the two pages stacked, no case. */
  .single {
    display: none;
  }
  ${media.md} {
    .stage {
      display: none;
    }
    .single {
      display: grid;
      max-width: 480px;
      margin: 0 auto;
      box-shadow: 0 40px 70px -40px rgba(42, 31, 24, 0.55);
    }
    .single > div {
      position: relative;
      aspect-ratio: 3 / 4;
      container-type: inline-size;
      background: ${color.paperPure};
      border: 8px solid ${color.teal};
    }
    .single > div + div {
      border-top-width: 0;
    }
    .single .photo-page,
    .single .text-page {
      padding: 8cqw 8cqw 6cqw;
    }
    .single .folio,
    .single .by,
    .single .chapter,
    .single .also cite {
      font-size: max(14px, 2.8cqw);
    }
    .single .title {
      font-size: max(30px, 8.4cqw);
    }
    .single .words {
      font-size: max(18px, 4.6cqw);
    }
    .single .words::first-letter {
      font-size: 12cqw;
    }
    .single .also p {
      font-size: max(17px, 4.2cqw);
    }
    .single .print figcaption {
      font-size: max(22px, 5.4cqw);
    }
    /* The page with words grows with them on a phone, rather than clip. */
    .single > div.flow {
      aspect-ratio: auto;
    }
    .single > div.flow > .text-page,
    .single > div.flow > .photo-page {
      position: relative;
      inset: auto;
    }
    /* The print page is as tall as its print: no empty paper on a phone. */
    .single > div.flow > .photo-page .print {
      flex: none;
      padding-bottom: 4cqw;
    }
    .single > div.flow > .photo-page .folio {
      margin-top: 0;
    }
    .single > div.flow > .text-page .also {
      margin-top: 8cqw;
    }
    .single .print img {
      max-height: 80cqw;
    }
    .go a {
      width: 100%;
      max-width: 480px;
      justify-content: center;
    }
  }

  /* Phone-first fix 3 (item 8, Maya #5): on a phone the teaser is one
     page, the memory with the second voice (what the lead describes), so
     the heading, the page, the lead and "Open the sample books" fit one
     390 x 844 screen. The print stays on /samples; 861 px and up is
     unchanged, and 641-860 keeps both pages. */
  ${media.sm} {
    .single > div.photo {
      display: none;
    }
    .single > div.photo + div {
      border-top-width: 8px;
    }
    .single .photo-page,
    .single .text-page {
      padding: 6cqw 7cqw 5cqw;
    }
    .single > div.flow > .text-page .also {
      margin-top: 5cqw;
    }
    .single .text-page .folio {
      display: none;
    }
    .go {
      margin-top: 28px;
    }
  }
`;

function PhotoPage() {
  return (
    <div className="photo-page">
      <div className="print">
        <figure>
          <Picture id={e.photo} alt={e.alt} sizes="(max-width: 860px) 80vw, 460px" />
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner br" />
          <span className="corner bl" />
        </figure>
        <figcaption>{e.caption}</figcaption>
      </div>
      <p className="folio">6</p>
    </div>
  );
}

function TextPage() {
  return (
    <div className="text-page">
      <p className="chapter">Chapter One · {e.date}</p>
      <h3 className="title">{e.title}</h3>
      <span className="rule" />
      <p className="words">{e.words}</p>
      <p className="by">{e.by}</p>
      <blockquote className="also">
        <p>“{e.also.quote}”</p>
        <cite>{e.also.name}</cite>
      </blockquote>
      <p className="folio">7</p>
    </div>
  );
}

export default function FamilyBook() {
  const ref = useScene<HTMLElement>((root) => {
    riseLines(root.querySelector("h2")!);
    gsap.from(".stage, .single", {
      y: 70,
      opacity: 0,
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: ".book-wrap", start: "top 85%", once: true },
    });
  });

  return (
    <Scene ref={ref} id="book" aria-labelledby="book-title">
      <Frame>
        <SplitHead>
          <Statement id="book-title" $size="xl">
            Seventy years, <em>still being written.</em>
          </Statement>
          <p className="lead">
            One page from the Hartleys’ book, a sample family: a memory one of
            them told on a call, with what someone else remembers beside it.
          </p>
        </SplitHead>

        <div className="book-wrap">
          {/* Wide: the book lying open at its first memory. */}
          <div className="stage">
            <div
              className="book"
              role="group"
              aria-roledescription="book"
              aria-label="The Hartley family's book, a sample, open at its first memory"
            >
              <span className="board l" />
              <span className="board r" />
              <div className="pages">
                <div className="page left left-shade">
                  <PhotoPage />
                </div>
                <div className="page right right-shade">
                  <TextPage />
                </div>
              </div>
            </div>
          </div>

          {/* Narrow: the same spread, the two pages stacked. */}
          <div className="single">
            <div className="flow photo">
              <PhotoPage />
            </div>
            <div className="flow">
              <TextPage />
            </div>
          </div>
        </div>

        <div className="go">
          {/* /samples is a page in public/, outside the router: a plain anchor. */}
          <PrimaryAnchor href="/samples">
            Open the sample books <ArrowIcon />
          </PrimaryAnchor>
        </div>
      </Frame>
    </Scene>
  );
}
