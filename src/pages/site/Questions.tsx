/**
 * Questions & answers — remove practical doubt, quickly, at the same finish
 * as the rest of the site (Pass 11g: the founder found this page below the
 * others' quality).
 *
 * - Opening: the title on the left; on the right a small "concierge" card —
 *   a real person to write to — so the page reads as service, not a manual.
 * - Topic pills and a search pill filter together.
 * - Each group is a numbered chapter (roman numeral, serif title) with its
 *   answers as quiet cards: serif question, a gold coin that turns + into ×.
 * - A closing band: still wondering? write to us.
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
import { ArrowIcon, Invitation, Picture } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  PrimaryAnchor,
  Title,
} from "./kit/kit.styles";
import { color, display, font, media, motion } from "../../styles/theme";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const Opening = styled(Chapter)`
  padding: clamp(80px, 10vw, 160px) 0 clamp(56px, 6vw, 96px);
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: end;
  }
  h1 em {
    font-style: italic;
  }
  .lead {
    margin-top: 24px;
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: var(--muted);
    max-width: 40ch;
  }
  .concierge {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 16px;
    align-items: center;
    padding: 18px;
    border-radius: 20px;
    background: ${color.paperPure};
    box-shadow:
      0 0 0 1px ${color.primaryLine},
      0 30px 60px -40px rgba(42, 31, 24, 0.5);
  }
  .concierge .ph {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
  }
  .concierge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .concierge small {
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .concierge p {
    margin-top: 4px;
    font: 400 18px/1.3 ${font.display};
    color: ${color.primary};
  }
  .concierge a {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    border-radius: 14px;
    background: ${color.ivory};
    font: 600 15px/1 ${font.body};
    color: ${color.primary};
    text-decoration: none;
  }
  .concierge a:hover {
    background: ${color.sand};
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
    padding: 10px;
    margin-bottom: clamp(48px, 6vw, 88px);
    border-radius: 28px;
    background: color-mix(in srgb, ${color.paperPure} 92%, transparent);
    backdrop-filter: blur(12px);
    box-shadow:
      0 0 0 1px ${color.primaryLine},
      0 20px 40px -30px rgba(42, 31, 24, 0.5);
  }
  .pill {
    min-height: 40px;
    padding: 0 18px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${color.primaryMid};
    cursor: pointer;
    transition:
      background 250ms,
      color 250ms;
  }
  .pill:hover {
    background: ${color.ivory};
  }
  .pill[aria-pressed="true"] {
    background: ${color.primary};
    color: ${color.ivory};
  }
  .search {
    position: relative;
    flex: 1 1 220px;
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
    font: 400 16px/1 ${font.body};
    color: ${color.primary};
  }
  .search input:focus-visible,
  .pill:focus-visible,
  summary:focus-visible {
    outline: 2px solid ${color.accent};
    outline-offset: 3px;
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
  .gh b {
    display: block;
    font: 400 ${display.md} / 1 ${font.display};
    color: ${color.accent};
  }
  .gh h2 {
    margin-top: 10px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .gh small {
    display: block;
    margin-top: 8px;
    font: 500 13px/1.3 ${font.body};
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
    font: 400 17px/1.7 ${font.body};
    color: ${color.body};
    max-width: 62ch;
  }
  .none {
    padding: 40px 0;
    font: italic 400 ${display.sm} / 1.4 ${font.display};
    color: ${color.primaryMid};
  }
  ${media.md} {
    .tools {
      border-radius: 24px;
    }
    section {
      grid-template-columns: minmax(0, 1fr);
    }
    .gh {
      position: static;
    }
  }
`;

const Still = styled(Chapter)`
  .card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 24px 48px;
    align-items: center;
    padding: clamp(32px, 4vw, 56px);
    border-radius: 24px;
    background: ${color.primary};
    color: ${color.ivory};
  }
  h2 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.ivory};
  }
  h2 em {
    font-style: italic;
    color: ${color.gold};
  }
  p {
    margin-top: 10px;
    font: 400 17px/1.6 ${font.body};
    color: ${color.onDarkMuted};
  }
  --action-bg: ${color.ivory};
  --action-ink: ${color.primary};
  --action-hover: ${color.paperPure};
  ${media.md} {
    .card {
      grid-template-columns: minmax(0, 1fr);
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
      <Opening ref={opening} $ground="ivory" aria-labelledby="faq-title">
        <Frame className="grid">
          <div>
            <Eyebrow>Questions &amp; answers</Eyebrow>
            <Title id="faq-title" data-lines>
              The practical things, answered <em>plainly.</em>
            </Title>
            <p className="lead" data-rise>
              What people ask before the first conversation — about calls,
              privacy, the family, plans and the book.
            </p>
          </div>
          <aside className="concierge" data-rise aria-label="Talk to a person">
            <span className="ph">
              <Picture id="33" alt="" sizes="64px" />
            </span>
            <div>
              <small>Rather ask a person?</small>
              <p>We answer every email ourselves.</p>
            </div>
            <a href={CONTACT.general}>
              Write to us <ArrowIcon />
            </a>
          </aside>
        </Frame>
      </Opening>

      <Answers $ground="ivory" aria-label="Answers">
        <Frame>
          <div className="tools" role="group" aria-label="Filter the answers">
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
                placeholder="Search — try privacy, books or calls"
              />
            </label>
          </div>

          {filtered.map((g) => {
            const n = groups.findIndex((x) => x.title === g.title);
            return (
              <section key={g.title} aria-labelledby={`group-${n}`}>
                <div className="gh">
                  <b aria-hidden="true">{ROMAN[n]}</b>
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

      <Still $ground="ivory" $tight aria-labelledby="still-title">
        <Frame>
          <div className="card">
            <div>
              <h2 id="still-title">
                Still <em>wondering?</em>
              </h2>
              <p>
                Tell us about your family — we’ll answer, and we won’t send you
                a newsletter.
              </p>
            </div>
            <PrimaryAnchor href={CONTACT.general}>
              Write to us <ArrowIcon />
            </PrimaryAnchor>
          </div>
        </Frame>
      </Still>

      <Invitation />
    </>
  );
}
