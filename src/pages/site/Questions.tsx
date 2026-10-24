/**
 * Questions & answers — remove practical doubt, quickly, at the same finish
 * as the rest of the site (Pass 11g: the founder found this page below the
 * others' quality).
 *
 * - Opening, on the cloth (2026-10-23, jury 1 #5): the title on the left;
 *   on the right Daniel, round portrait and all, on a leaf of paper - a real
 *   person to write to - so the page reads as service, not a manual.
 * - Sentence-case topic tabs and a search field filter together.
 * - Each group is a chapter with a serif title (no numerals) and its
 *   answers as quiet cards: serif question, a gold coin that turns + into ×.
 * - The shared closing band; the person to write to is at the top.
 *
 * Answers come from `faqData.ts` (which reads its figures from pricing.ts and
 * product.ts); the FAQ schema is unchanged.
 */
import { useState } from "react";
import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  websiteSchema,
} from "../../lib/seo";
import { CONTACT } from "../../lib/contact";
import { groups } from "./faqData";
import { ArrowIcon, Invitation } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { Chapter, Frame, Title } from "./kit/kit.styles";
import {
  color,
  display,
  font,
  media,
  motion,
  shadow,
  type,
} from "../../styles/theme";

const Opening = styled(Chapter)`
  padding: clamp(80px, 10vw, 160px) 0 clamp(56px, 6vw, 96px);
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: end;
  }
  h1 em {
    font-style: normal;
  }
  .lead {
    margin-top: 24px;
    font: 400 clamp(1.15rem, 1.05rem + 0.4vw, 1.45rem) / 1.55 ${font.text};
    color: var(--text);
    max-width: 40ch;
  }
  /* A real person to write to: Daniel, on a leaf of the book's paper lying
     on the cloth (jury 1 #20: his round portrait, not a blurred thumbnail). */
  .concierge {
    position: relative;
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 18px;
    align-items: center;
    padding: clamp(24px, 2.4vw, 36px);
    background: ${color.paperPure};
    box-shadow: ${shadow.lie};
    transform: rotate(0.8deg);
  }
  .concierge::before {
    content: "";
    position: absolute;
    inset: 10px;
    border: 1px solid ${color.foil};
    pointer-events: none;
  }
  .concierge > * {
    position: relative;
  }
  .concierge img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 30%;
    box-shadow:
      0 0 0 3px ${color.paperPure},
      0 0 0 4px color-mix(in srgb, ${color.gold} 60%, transparent);
  }
  .concierge small {
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .concierge p {
    margin-top: 6px;
    font: 400 clamp(1.2rem, 1.1rem + 0.4vw, 1.5rem) / 1.3 ${font.display};
    color: ${color.primary};
  }
  .concierge a {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 48px;
    padding: 0 18px;
    border-radius: 999px;
    background: ${color.chocolate};
    font: 600 ${type.ui} / 1 ${font.ui};
    color: ${color.onDark};
    text-decoration: none;
    transition:
      background-color ${motion.base},
      transform ${motion.press};
  }
  @media (hover: hover) and (pointer: fine) {
    .concierge a:hover {
      background: ${color.chocolateDeep};
    }
  }
  .concierge a:active {
    transform: scale(0.98);
  }
  .concierge a:focus-visible {
    outline: 2px solid ${color.accentText};
    outline-offset: 3px;
  }
  ${media.motion} {
    .concierge {
      transform: none;
    }
  }
  .concierge a svg {
    width: 16px;
    height: 16px;
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Answers = styled(Chapter)`
  padding-top: 0;
  .tools {
    position: sticky;
    top: 12px;
    z-index: 3;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    margin-bottom: clamp(36px, 4vw, 64px);
    background: ${color.ivory};
    border-bottom: 1px solid ${color.primaryLine};
  }
  /* Wide screens: the pills sit in the toolbar row as if unwrapped. */
  .pills {
    display: contents;
  }
  /* Sentence-case text tabs, the chosen one underlined (jury 1 #20). */
  .pill {
    min-height: 44px;
    padding: 0 12px;
    border: 0;
    background: transparent;
    font: 500 ${type.ui} / 1 ${font.ui};
    color: ${color.bodyMuted};
    text-decoration: underline;
    text-decoration-color: transparent;
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
    cursor: pointer;
    transition:
      color ${motion.base},
      text-decoration-color ${motion.base};
  }
  @media (hover: hover) and (pointer: fine) {
    .pill:hover {
      color: ${color.primary};
    }
  }
  .pill[aria-pressed="true"] {
    color: ${color.primary};
    text-decoration-color: ${color.gold};
  }
  .search {
    position: relative;
    /* Wide enough for the whole placeholder (it was cut to "Search - try privacy, t"). */
    flex: 1 1 300px;
    min-width: min(300px, 100%);
    display: flex;
    align-items: center;
  }
  .search svg {
    position: absolute;
    left: 16px;
    width: 16px;
    height: 16px;
    color: ${color.bodyMuted};
  }
  .search input {
    width: 100%;
    min-height: 44px;
    padding: 0 18px 0 42px;
    border: 0;
    border-radius: 999px;
    background: ${color.ivory};
    font: 400 18px / 1 ${font.text};
    color: ${color.primary};
  }
  .search input:focus-visible,
  .pill:focus-visible,
  summary:focus-visible {
    outline: 2px solid ${color.accent};
    outline-offset: 3px;
  }
  /* Phones (2026-10-15 audit): the six filters wrapped to one per line and
     stuck to the top, covering nearly half the screen while reading. Here
     they are one swipeable line above the search, and do not stick. */
  ${media.md} {
    .tools {
      position: relative;
      top: auto;
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: stretch;
    }
    .pills {
      display: flex;
      flex-wrap: nowrap;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
      margin: 0 -10px;
      padding: 0 10px;
    }
    .pills::-webkit-scrollbar {
      display: none;
    }
    .pill {
      flex: none;
      white-space: nowrap;
    }
    .search {
      flex: none;
    }
  }
  section {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
    gap: clamp(28px, 5vw, 96px);
    padding: clamp(40px, 5vw, 72px) 0;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .gh {
    position: sticky;
    top: 110px;
    align-self: start;
  }
  .gh h2 {
    font: 400 ${display.md} / 1.15 ${font.display};
    color: ${color.primary};
  }
  .gh small {
    display: block;
    margin-top: 8px;
    font: 500 ${type.label} / 1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .items {
    display: grid;
    gap: 12px;
  }
  details {
    border-radius: 18px;
    background: ${color.paperPure};
    box-shadow: 0 0 0 1px ${color.primaryLine};
    transition: box-shadow ${motion.slow};
  }
  details[open] {
    box-shadow:
      0 0 0 1px ${color.primaryLineStrong},
      0 24px 50px -36px rgba(42, 31, 24, 0.5);
  }
  summary {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 22px 22px 22px 26px;
    cursor: pointer;
    font: 400 clamp(1.1rem, 1rem + 0.3vw, 1.3rem) / 1.35 ${font.display};
    color: ${color.primary};
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary i {
    position: relative;
    flex: none;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: ${color.ivory};
    transition:
      background ${motion.slow},
      transform ${motion.reveal};
  }
  summary i::before,
  summary i::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 12px;
    height: 1.5px;
    background: ${color.primary};
    transform: translate(-50%, -50%);
  }
  summary i::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  details[open] summary i {
    background: ${color.gold};
    transform: rotate(45deg);
  }
  details p {
    padding: 0 26px 24px;
    font: 400 ${type.read} / 1.7 ${font.text};
    color: ${color.body};
    max-width: 62ch;
  }
  .none {
    padding: 40px 0;
    font: italic 400 ${display.sm} / 1.4 ${font.display};
    color: ${color.primaryMid};
  }
  ${media.md} {
    section {
      grid-template-columns: minmax(0, 1fr);
    }
    .gh {
      position: static;
    }
  }
`;

export default function Questions() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const opening = useReveals<HTMLElement>();
  const q = search.toLowerCase();
  const filtered = groups
    .filter((g) => !topic || g.title === topic)
    .map((g) => ({
      ...g,
      items: g.items.filter((x) => (x.q + " " + x.a).toLowerCase().includes(q)),
    }))
    .filter((g) => g.items.length);
  return (
    <>
      <Seo
        title="A Story questions & answers"
        path="/questions"
        description="Plain answers about conversations, privacy, family participation, plans and books."
        image="/og/questions.jpg"
        schema={[
          organizationSchema(),
          websiteSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Questions & answers", path: "/questions" },
          ]),
          faqSchema(groups.flatMap((g) => g.items)),
        ]}
      />
      <Opening ref={opening} $ground="cloth" aria-labelledby="faq-title">
        <Frame className="grid">
          <div>
            <Title id="faq-title" data-lines>
              The practical things, answered <em>plainly.</em>
            </Title>
            <p className="lead" data-rise>
              What people ask before the first conversation - about calls,
              privacy, the family, plans and the book.
            </p>
          </div>
          <aside className="concierge" data-rise aria-label="Talk to a person">
            <img
              src="/our-story/daniel-320.webp"
              alt="Daniel Hoang Nguyen"
              width={320}
              height={320}
              decoding="async"
            />
            <div>
              <small>Rather ask a person?</small>
              <p>Daniel answers every email himself.</p>
            </div>
            <a href={CONTACT.general}>
              Write to Daniel <ArrowIcon />
            </a>
          </aside>
        </Frame>
      </Opening>

      <Answers $ground="ivory" aria-label="Answers">
        <Frame>
          <div className="tools" role="group" aria-label="Filter the answers">
            <div className="pills">
              <button
                type="button"
                className="pill"
                aria-pressed={topic === null}
                onClick={() => setTopic(null)}
              >
                All
              </button>
              {groups.map((g) => (
                <button
                  key={g.title}
                  type="button"
                  className="pill"
                  aria-pressed={topic === g.title}
                  onClick={() => setTopic(topic === g.title ? null : g.title)}
                >
                  {g.title}
                </button>
              ))}
            </div>
            <label className="search">
              <span className="sr-only">Find an answer</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search: privacy, books, calls"
              />
            </label>
          </div>

          {filtered.map((g) => {
            const n = groups.findIndex((x) => x.title === g.title);
            return (
              <section key={g.title} aria-labelledby={`group-${n}`}>
                <div className="gh">
                  <h2 id={`group-${n}`}>{g.title}</h2>
                  <small>
                    {g.items.length}{" "}
                    {g.items.length === 1 ? "answer" : "answers"}
                  </small>
                </div>
                <div className="items">
                  {g.items.map((x) => (
                    <details key={x.q}>
                      <summary>
                        {x.q}
                        <i aria-hidden="true" />
                      </summary>
                      <p>{x.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
          {!filtered.length && (
            <p className="none" role="status">
              Nothing matches “{search}”. Try another word, or write to us.
            </p>
          )}
        </Frame>
      </Answers>

      <Invitation />
    </>
  );
}
