/**
 * Questions & answers — remove practical doubt, quickly, at the same finish
 * as the rest of the site (Pass 11g: the founder found this page below the
 * others' quality).
 *
 * Premium pass (2026-11-02, design spec §4D, §3.4, §3.9):
 * - The opening is on the paper. Its object is Daniel, round portrait and
 *   all, under "Rather ask a person?": a real person to write to, so the page
 *   reads as service, not a manual. On a light ground the leaf is flat: a
 *   hairline and the foil inset, no shadow.
 * - The topic chips are one <Scroller label="Question topics">: never cut
 *   mid-word, the end fades while there is more; the search sits under them.
 * - Each group header is type: a display.sm heading with a hairline above,
 *   no box. The answers are rows between hairlines, not cards.
 * - The closing band offers Pricing, How it works and Contact.
 *
 * Answers come from `faqData.ts` (which reads its figures from pricing.ts and
 * product.ts); the FAQ schema is unchanged.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  websiteSchema,
} from "../../lib/seo";
import { CONTACT } from "../../lib/contact";
import { faqAnchor, groups as faqGroups } from "./faqData";
import { ORG_GROUP } from "./orgQuestions";

/* Panel round 2 (CHIEF-LOG B1.5): the group for the invited relative and
   the storyteller (b3's faqData, "If you were invited, or are being
   asked") comes first and answers at /questions#invited. Matched by its
   title so this page needs no change when the copy lands.
   Round 3 (Builder 3, panel: Denise, Priya): the group "For organizations"
   (orgQuestions.ts: staff access, ownership, retention, export, consent)
   comes last and answers at /questions#organizations. */
const INVITED = /invited/i;
const groups = [
  ...[...faqGroups].sort(
    (a, b) => Number(INVITED.test(b.title)) - Number(INVITED.test(a.title)),
  ),
  ORG_GROUP,
];
const anchor = (title: string) =>
  INVITED.test(title)
    ? "invited"
    : title === ORG_GROUP.title
      ? "organizations"
      : undefined;
import { ArrowIcon, Invitation } from "./kit/kit";
import Scroller from "./kit/Scroller";
import { useReveals } from "./kit/reveals";
import { Chapter, Frame, Lead, Title } from "./kit/kit.styles";
import {
  color,
  display,
  font,
  media,
  motion,
  space,
  type,
} from "../../styles/theme";

const Opening = styled(Chapter)`
  padding: calc(${space.section} * var(--sy)) 0;
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
    gap: clamp(40px, 6vw, 110px);
    align-items: end;
  }
  .lead {
    margin-top: ${space.lg};
  }
  /* A real person to write to: Daniel, on a leaf of the book's paper (jury 1
     #20: his round portrait, not a blurred thumbnail). Flat on the paper. */
  .concierge {
    position: relative;
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 18px;
    align-items: center;
    padding: clamp(${space.lg}, 2.4vw, 36px);
    background: ${color.ivory};
    border: 1px solid ${color.primaryLine};
    border-radius: 3px;
  }
  .concierge::before {
    content: "";
    position: absolute;
    inset: 8px;
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
      0 0 0 3px ${color.ivory},
      0 0 0 4px color-mix(in srgb, ${color.gold} 60%, transparent);
  }
  .concierge small {
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: ${color.accentText};
  }
  .concierge p {
    margin-top: 6px;
    font: 400 ${display.sm} / 1.25 ${font.display};
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
  ${media.hover} {
    .concierge a:hover {
      background: ${color.chocolateDeep};
    }
  }
  .concierge a:active {
    transform: scale(0.97);
  }
  .concierge a svg {
    width: 16px;
    height: 16px;
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
      gap: ${space.xl};
    }
  }
`;

const Answers = styled(Chapter)`
  padding: 0 0 calc(${space.section} * var(--sy));
  .tools {
    position: sticky;
    top: calc(var(--nav-total, 0px) + ${space.sm});
    z-index: 3;
    /* The chips take their own width and the search keeps to the right
       edge; where the two don't fit on one line the search drops under the
       chips, so the chips are never cut by it. No hairline under the tools:
       the first group's own hairline is the one rule here. */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: ${space.xs} ${space.lg};
    align-items: center;
    padding: ${space.xs} 0;
    margin-bottom: clamp(${space.xl}, 4vw, ${space.xxxl});
    background: ${color.ivory};
  }
  /* The chips: a scroller (spec §3.9). Each chip takes its own width, and
     the row only scrolls when it is wider than the window. On a wide screen
     the scroller gives back both bleeds, so "All" starts on the frame edge
     and no fade shows; the fade is for the phone. */
  .tools .scroller {
    flex: 0 1 auto;
    margin-inline: 0;
    scroll-padding-inline: 0;
  }
  .tools .search {
    flex: 0 1 380px;
    min-width: 260px;
  }
  .tools .scroller-track {
    grid-auto-columns: max-content;
    gap: ${space.xxs};
    padding-inline: 0;
  }
  .tools .scroller-track > li:first-child .pill {
    padding-inline-start: 0;
  }
  .tools .scroller-track > li {
    scroll-snap-align: start;
  }
  /* 8px between the tabs' hit areas, the same 28px between their words
     (taste rule 20; round 3, B4 fix pass 2). */
  main[data-premium] & .tools .scroller-track {
    gap: ${space.xs};
  }
  main[data-premium] & .pill {
    padding-inline: 10px;
  }
  /* Sentence-case text tabs, the chosen one underlined (jury 1 #20). */
  .pill {
    min-height: 44px;
    padding: 0 ${space.sm};
    border: 0;
    background: transparent;
    font: 500 ${type.ui} / 1 ${font.ui};
    color: ${color.bodyMuted};
    white-space: nowrap;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
    cursor: pointer;
    transition:
      color ${motion.base},
      text-decoration-color ${motion.base};
  }
  ${media.hover} {
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
    display: flex;
    align-items: center;
  }
  .search svg {
    position: absolute;
    left: ${space.md};
    width: 16px;
    height: 16px;
    color: ${color.bodyMuted};
  }
  .search input {
    width: 100%;
    min-height: 44px;
    padding: 0 18px 0 42px;
    border: 1px solid ${color.primaryLine};
    border-radius: 999px;
    background: ${color.paper};
    font: 400 ${type.read} / 1 ${font.text};
    color: ${color.primary};
  }
  /* Phones (2026-10-15 audit): the filters stuck to the top covered nearly
     half the screen while reading. Here the chips are one swipeable line
     above the search, and nothing sticks. */
  ${media.md} {
    .tools {
      position: relative;
      top: auto;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
    }
    .tools .scroller {
      margin-inline: calc(-1 * var(--page-gutter));
      scroll-padding-inline: var(--page-gutter);
    }
    .tools .scroller-track {
      padding-inline: var(--page-gutter);
    }
    .tools .scroller-track > li:first-child .pill {
      padding-inline-start: ${space.sm};
    }
  }
  /* A group: its title is type with a hairline above (S23), its answers are
     rows between hairlines. */
  section {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
    gap: clamp(${space.lg}, 5vw, 96px);
    padding: clamp(${space.xl}, 4vw, ${space.xxxl}) 0;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  .gh {
    position: sticky;
    top: calc(var(--nav-total, 0px) + 96px);
    align-self: start;
  }
  .gh h2 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .gh small {
    display: block;
    margin-top: ${space.xs};
    font: 500 ${type.label} / 1.3 ${font.ui};
    color: ${color.bodyMuted};
  }
  .items {
    display: grid;
  }
  details {
    border-top: 1px solid ${color.primaryLine};
  }
  details:last-child {
    border-bottom: 1px solid ${color.primaryLine};
  }
  summary {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${space.lg};
    min-height: 44px;
    padding: 18px 0;
    cursor: pointer;
    /* A step below the group's display.sm heading (S23: the group headers
       are the type structure; the questions are the rows under them). */
    font: 400 ${type.read} / 1.35 ${font.display};
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
    border: 1px solid ${color.primaryLine};
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
    border-color: ${color.gold};
    transform: rotate(45deg);
  }
  details p {
    padding: 0 0 ${space.lg};
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
      gap: ${space.md};
    }
    .gh {
      position: static;
    }
  }
`;

/*
 * Round 3 fix 1 (items 4 and 13, Priya and Denise): an address opens what
 * it names. #organizations opens that group's first two answers, so they
 * read without a click on each row; #<question> (faqAnchor) opens that one
 * answer, e.g. the storyteller's "decline a question" link from /join and
 * /how-it-works. Done after hydration, so the prerendered page is the same.
 */
function useOpenFromHash() {
  const { hash } = useLocation();
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const rows =
      target instanceof HTMLDetailsElement
        ? [target]
        : [...target.querySelectorAll("details")].slice(0, 2);
    rows.forEach((d) => (d.open = true));
    target.scrollIntoView({ block: "start" });
  }, [hash]);
}

export default function Questions() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const opening = useReveals<HTMLElement>();
  useOpenFromHash();
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
      <Opening ref={opening} $ground="paper" aria-labelledby="faq-title">
        <Frame className="grid">
          <div>
            <Title id="faq-title" data-lines>
              The practical things, answered <em>plainly.</em>
            </Title>
            <Lead className="lead" data-rise>
              What people ask before the first conversation - about calls,
              privacy, the family, plans and the book.
            </Lead>
          </div>
          <aside className="concierge" data-rise aria-label="Talk to a person">
            <img
              src="/our-story/daniel-320.webp"
              alt="Daniel Hoang Nguyen"
              width={320}
              height={320}
              decoding="async"
              fetchPriority="high"
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
            <Scroller label="Question topics">
              <li>
                <button
                  type="button"
                  className="pill"
                  aria-pressed={topic === null}
                  onClick={() => setTopic(null)}
                >
                  All
                </button>
              </li>
              {groups.map((g) => (
                <li key={g.title}>
                  <button
                    type="button"
                    className="pill"
                    aria-pressed={topic === g.title}
                    onClick={() => setTopic(topic === g.title ? null : g.title)}
                  >
                    {g.title}
                  </button>
                </li>
              ))}
            </Scroller>
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
              <section
                key={g.title}
                id={anchor(g.title)}
                aria-labelledby={`group-${n}`}
              >
                <div className="gh">
                  <h2 id={`group-${n}`}>{g.title}</h2>
                  <small>
                    {g.items.length}{" "}
                    {g.items.length === 1 ? "answer" : "answers"}
                  </small>
                </div>
                <div className="items">
                  {g.items.map((x) => (
                    <details key={x.q} id={faqAnchor(x.q)}>
                      <summary>
                        {x.q}
                        <i aria-hidden="true" />
                      </summary>
                      <p>
                        {x.a}
                        {/* Round 3 fix 2 (item 1): the storage answer links
                            to section 13 of the privacy policy. */}
                        {"link" in x && x.link && (
                          <>
                            {" "}
                            <Link to={x.link.to}>{x.link.label}</Link>
                          </>
                        )}
                      </p>
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

      <Invitation next={["/pricing", "/how-it-works", "/contact"]} />
    </>
  );
}
