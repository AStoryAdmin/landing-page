/**
 * The app's memory card, exactly as the app renders it (2026-10-16).
 *
 * Markup from web-app/src/components/MemoryCard.tsx and the rules from
 * web-app/src/styles/astory.css §9, carried over line for line: the
 * photograph as a white-bordered print on the left, turned a degree; the
 * chapter as a tracked sage kicker and "Live conversation · 14 min" on the
 * right; the title in the book's display face; the dateline in terracotta
 * when there is a date; two lines of the person's own words in italic; the
 * people in it; who told it. The paper is the memory's chosen colour, else
 * its chapter's tint. Since phase 2 the site loads the app's faces
 * (Cormorant Garamond, EB Garamond, Montserrat), so the card sets in them.
 * The inks are the app's tokens (theme.ts `app`).
 *
 * One change from the app, on purpose (2026-10-23, jury 1 #12): the app
 * overlaps the people's initials in tinted discs and repeats the teller as a
 * lone disc on the right, which read on the site as a clipped "W R" and a
 * stray "R". Here the people are the site's gold-ring seals side by side
 * (as Home's Witnesses draws them) and the folio line says "Told by Ruth".
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
  /* The people in it, as monogram seals: the initial in a gold ring, side by
     side, never overlapped or clipped. */
  .faces {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .seal {
    --seal-paper: var(--card);
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid ${color.warmGold};
    box-shadow:
      inset 0 0 0 2px var(--seal-paper),
      inset 0 0 0 3px color-mix(in srgb, ${color.warmGold} 55%, transparent);
    font: 600 15px/1 var(--book-display);
    color: var(--ink);
  }
  &.butter .seal {
    --seal-paper: var(--paper-butter);
  }
  .seal img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  /* Who told it, in words, in the folio line. */
  .told {
    font: 500 13px/1.3 var(--font-ui);
    color: var(--ink-soft);
    white-space: nowrap;
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

/** A person as a seal: their portrait when there is one, else the initial in a gold ring. */
function Seal({ name, src }: { name: string; src?: string }) {
  const initial = (name || "?").trim()[0]?.toUpperCase() || "?";
  return (
    <span className="seal" aria-hidden="true">
      {src ? <img src={src} alt="" width={28} height={28} /> : initial}
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
          <span className="faces" role="img" aria-label={`In it: ${people.join(", ")}`}>
            {people.slice(0, 3).map((p) => (
              <Seal key={p} name={p} src={p === teller ? tellerPhoto : undefined} />
            ))}
          </span>
          <span className="told">{told}</span>
        </div>
      </div>
    </Card>
  );
}
