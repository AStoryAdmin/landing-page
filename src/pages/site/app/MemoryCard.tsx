/**
 * The app's memory card, exactly as the app renders it (2026-10-16).
 *
 * Markup from web-app/src/components/MemoryCard.tsx and the rules from
 * web-app/src/styles/astory.css §9, carried over line for line: the
 * photograph as a white-bordered print on the left, turned a degree; the
 * chapter as a tracked sage kicker and "Live conversation · 14 min" on the
 * right; the title in the book's display face; the dateline in terracotta
 * when there is a date; two lines of the person's own words in italic; the
 * faces of the people in it; who told it as a small portrait in the folio
 * line. The paper is the memory's chosen colour, else its chapter's tint.
 *
 * Two things differ, on purpose. The app's book faces (Cormorant Garamond,
 * EB Garamond) are not loaded on the site, which adds no fonts; the card
 * falls through to Source Serif 4, which is the app's own declared fallback
 * for both. Montserrat, the app's interface face, falls through to Figtree
 * the same way. The inks are the app's tokens (theme.ts `app`).
 *
 * It is an illustration, not a link: the site has nowhere to open it.
 */
import styled from "styled-components";
import { app, color, font } from "../../../styles/theme";

const Card = styled.article`
  --card: ${app.card};
  --ink: ${app.ink};
  --ink-soft: ${app.inkSoft};
  --accent: ${color.accent};
  --support: ${app.support};
  --book-display: "Cormorant Garamond", ${font.display};
  --book-body: "EB Garamond", ${font.display};
  --font-ui: "Montserrat", ${font.body};
  --book-sage: ${app.bookSage};
  --book-sage-bg: ${app.bookSageBg};
  --book-print: ${app.bookPrint};
  --paper-butter: ${app.paperButter};

  position: relative;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 20px;
  padding: 16px 20px 14px 16px;
  border-radius: 16px;
  background: var(--card);
  color: var(--ink);
  text-decoration: none;
  text-align: left;
  border: 1px solid rgba(74, 51, 39, 0.08);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.5) inset,
    0 10px 24px -20px rgba(42, 35, 32, 0.35);
  &.butter {
    background: var(--paper-butter);
  }
  .print {
    position: relative;
    align-self: start;
    padding: 5px 5px 7px;
    background: var(--book-print);
    box-shadow:
      0 1px 2px rgba(42, 35, 32, 0.14),
      0 10px 20px -12px rgba(42, 35, 32, 0.45);
    transform: rotate(-1.2deg);
  }
  .print .pic {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    background: var(--support);
  }
  .print .n {
    position: absolute;
    right: 9px;
    bottom: 11px;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(42, 35, 32, 0.72);
    color: #fff;
    font: 600 11px/1.4 var(--font-ui);
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }
  .chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 2px;
  }
  .chips .grow {
    flex: 1;
  }
  .kicker {
    display: inline-flex;
    align-items: center;
    min-height: 22px;
    padding: 0 9px;
    border-radius: 999px;
    background: var(--book-sage-bg);
    color: var(--book-sage);
    font: 600 13px/1.2 var(--font-ui);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .kicker.quiet {
    background: transparent;
    color: var(--ink-soft);
    padding: 0;
    letter-spacing: 0.1em;
  }
  .kicker svg {
    width: 12px;
    height: 12px;
    margin-right: 5px;
  }
  h3 {
    margin: 0;
    font-family: var(--book-display);
    font-weight: 600;
    font-size: 27px;
    line-height: 1.1;
    letter-spacing: -0.005em;
    color: var(--ink);
    text-wrap: balance;
  }
  .date {
    font: 600 13px/1.2 var(--font-ui);
    color: var(--ink-soft);
    letter-spacing: 0.03em;
  }
  .date.dated {
    color: var(--accent);
  }
  .excerpt {
    font-family: var(--book-body);
    font-style: italic;
    font-size: 17.5px;
    line-height: 1.45;
    color: var(--ink);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 2px;
  }
  .foot {
    margin-top: auto;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    min-height: 28px;
  }
  .avatar {
    display: inline-grid;
    place-items: center;
    flex: none;
    border-radius: 50%;
    background: var(--support);
    color: var(--ink-soft);
    font: 600 13px/1 var(--font-ui);
    overflow: hidden;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .faces {
    display: inline-flex;
    align-items: center;
  }
  .faces .avatar {
    border: 2px solid var(--card);
    margin-left: -8px;
  }
  .faces .avatar:first-child {
    margin-left: 0;
  }
  .told {
    display: inline-flex;
    align-items: center;
  }
  .told .avatar {
    border: 2px solid var(--book-print);
    box-shadow: 0 1px 3px rgba(42, 35, 32, 0.2);
  }
  @media (max-width: 760px) {
    grid-template-columns: 104px minmax(0, 1fr);
    gap: 12px;
    padding: 12px;
    border-radius: 14px;
    .print {
      padding: 4px 4px 5px;
    }
    .chips .kicker.quiet {
      display: none;
    }
    h3 {
      font-size: 22px;
    }
    .excerpt {
      font-size: 16px;
      -webkit-line-clamp: 2;
    }
  }
`;

/** The app's MicIcon, as the card draws it beside "Live conversation". */
function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

/** The app's Avatar: a portrait when there is one, else the initial. */
function Avatar({ name, size, src }: { name: string; size: number; src?: string }) {
  const initial = (name || "?").trim()[0]?.toUpperCase() || "?";
  return (
    <span
      className="avatar"
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.max(13, Math.round(size * 0.42)) }}
    >
      {src ? <img src={src} alt="" width={size} height={size} /> : initial}
    </span>
  );
}

export type SampleMemory = {
  photo: string;
  photoCount?: number;
  chapter: string;
  minutes?: string;
  title: string;
  date: string;
  words: string;
  people: string[];
  teller: string;
  tellerPhoto?: string;
  /** The memory's paper, as the app names it. */
  paper?: "butter";
};

export default function MemoryCard({ memory, className }: { memory: SampleMemory; className?: string }) {
  const { photo, photoCount = 1, chapter, minutes, title, date, words, people, teller, tellerPhoto, paper } = memory;
  const told = `Told by ${teller}`;
  return (
    <Card className={[paper ?? "", className ?? ""].join(" ").trim()} aria-label={`${title}, a memory card in the A Story app. ${told}.`}>
      <span className="print" aria-hidden="true">
        <img className="pic" src={photo} alt="" loading="lazy" decoding="async" />
        {photoCount > 1 && <span className="n">+{photoCount - 1}</span>}
      </span>
      <div className="body">
        <div className="chips">
          <span className="kicker">{chapter}</span>
          <span className="grow" />
          {minutes && (
            <span className="kicker quiet">
              <MicIcon /> Live conversation · {minutes}
            </span>
          )}
        </div>
        <h3>{title}</h3>
        <p className="date dated">{date}</p>
        <p className="excerpt">{words}</p>
        <div className="foot">
          <span className="faces" aria-label={people.join(", ")}>
            {people.slice(0, 3).map((p) => (
              <Avatar key={p} name={p} size={24} />
            ))}
          </span>
          <span className="told" title={told}>
            <Avatar src={tellerPhoto} name={teller} size={26} />
            <span className="sr-only">{told}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
