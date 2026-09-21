/**
 * Questions & answers — remove practical doubt, quickly.
 *
 * A direct title, a search that filters as you type, and the answers grouped
 * by the decision they help with. The group names sit in a sticky left
 * column so a long page keeps its bearings. No motion beyond the opening:
 * this is a page people scan. Answers come from `faqData.ts`, which reads
 * its figures from `pricing.ts` and `product.ts`.
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
import { PageOpening } from "./kit/kit";
import { Chapter, Frame } from "./kit/kit.styles";
import { color, display, font, media, motion } from "../../styles/theme";

const Answers = styled(Chapter)`
  padding-top: 0;
  .search {
    display: grid;
    gap: 10px;
    max-width: 560px;
    margin-bottom: clamp(48px, 5vw, 80px);
    font: 600 14px/1.3 ${font.body};
    color: ${color.primary};
  }
  .search input {
    min-height: 60px;
    padding: 0 20px;
    border: 1px solid ${color.primaryLineStrong};
    border-radius: 2px;
    background: ${color.paperPure};
    font: 400 18px/1 ${font.body};
    color: ${color.primary};
  }
  .search input:focus {
    outline: 3px solid ${color.gold};
    outline-offset: 2px;
    border-color: ${color.primary};
  }
  section {
    display: grid;
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
    gap: clamp(24px, 5vw, 96px);
    padding: clamp(28px, 3vw, 44px) 0;
    border-top: 1px solid ${color.primaryLineStrong};
  }
  h2 {
    position: sticky;
    top: calc(var(--nav-total) + 24px);
    align-self: start;
    font: 400 ${display.md} / 1.15 ${font.display};
    color: ${color.primary};
  }
  details + details {
    border-top: 1px solid ${color.primaryLine};
  }
  summary {
    list-style: none;
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: center;
    min-height: 68px;
    padding: 14px 0;
    cursor: pointer;
    font: 500 clamp(1.05rem, 1rem + 0.25vw, 1.2rem) / 1.4 ${font.body};
    color: ${color.primary};
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary::after {
    content: "+";
    flex: none;
    font: 300 26px/1 ${font.body};
    color: ${color.accent};
    transition: transform ${motion.slow};
  }
  details[open] summary::after {
    transform: rotate(45deg);
  }
  summary:hover {
    color: ${color.accentText};
  }
  summary:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  details p {
    padding: 0 40px 22px 0;
    font: 400 17px/1.7 ${font.body};
    color: ${color.body};
    max-width: 64ch;
  }
  .none {
    font: italic 400 ${display.sm} / 1.4 ${font.display};
    color: ${color.primaryMid};
  }
  ${media.md} {
    section {
      grid-template-columns: minmax(0, 1fr);
    }
    h2 {
      position: static;
    }
  }
`;

export default function Questions() {
  const [search, setSearch] = useState("");
  const q = search.toLowerCase();
  const filtered = groups
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
      <PageOpening
        eyebrow="Questions & answers"
        title={
          <>
            The practical things, answered <em>plainly.</em>
          </>
        }
        lead={
          <>
            What people ask before the first conversation. For anything else,{" "}
            <a href={CONTACT.general}>get in touch</a>.
          </>
        }
      />
      <Answers $ground="ivory" aria-label="Answers">
        <Frame>
          <label className="search">
            Find an answer
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Try privacy, books or calls"
            />
          </label>
          {filtered.map((g) => (
            <section key={g.title} aria-labelledby={`group-${g.title}`}>
              <h2 id={`group-${g.title}`}>{g.title}</h2>
              <div>
                {g.items.map((x) => (
                  <details key={x.q}>
                    <summary>{x.q}</summary>
                    <p>{x.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          {!filtered.length && (
            <p className="none" role="status">
              Nothing matches “{search}”. Try another word, or get in touch.
            </p>
          )}
        </Frame>
      </Answers>
    </>
  );
}
