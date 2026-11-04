/**
 * "Questions a review will ask" (phone-first fix 2, item 4; Denise #2,
 * Priya #2). Four rows on /care-communities and /organizations, each a
 * shortened ORG_GROUP answer already public on /questions
 * (orgQuestions.ts REVIEW), its label linking to that answer there
 * (faqData.ts faqAnchor, Questions.tsx opens the matching <details>).
 *
 * From 641 px the heading shows and the rows are open; at 640 px and below
 * the block is one closed <details> line that names it. The page ships the
 * details open (prerendered, and without script it stays readable); after
 * hydration a phone folds it, and leaving the phone width opens it again,
 * because from 641 px the summary is hidden.
 */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { faqAnchor } from "../faqData";
import { REVIEW } from "../orgQuestions";
import { CONTACT } from "../../../lib/contact";
import { color, display, font, media, space, type } from "../../../styles/theme";

const FOLD = "(max-width: 640px)";
const ADDRESS = "contact@astoryapp.com";

const Block = styled.div`
  margin-top: clamp(${space.lg}, 3vw, ${space.xl});
  h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  dl {
    margin: ${space.sm} 0 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }
  .rq-row {
    padding: ${space.xxs} 0 ${space.xs};
    border-bottom: 1px solid var(--line);
  }
  dt a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--ink);
    font: 600 ${type.ui} / 1.3 ${font.ui};
    text-underline-offset: 4px;
  }
  dd {
    margin: 0;
    max-width: 56ch;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--muted);
  }
  dd a {
    color: var(--ink);
    font-weight: 600;
    text-underline-offset: 4px;
    overflow-wrap: anywhere;
  }
  .rq > summary {
    display: none;
  }
  @media (min-width: 641px) {
    .rq::details-content {
      content-visibility: visible;
      display: contents;
    }
  }
  ${media.sm} {
    margin-top: 0;
    h3 {
      display: none;
    }
    .rq {
      border-bottom: 1px solid var(--line);
    }
    .rq > summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${space.md};
      min-height: 44px;
      padding: ${space.xs} 0;
      cursor: pointer;
      list-style: none;
      color: var(--ink);
      font: 600 ${type.ui} / 1.3 ${font.ui};
    }
    .rq > summary::-webkit-details-marker {
      display: none;
    }
    .rq > summary::after {
      content: "+";
      font: 400 ${display.sm} / 1 ${font.display};
      color: var(--muted);
    }
    .rq[open] > summary::after {
      content: "−";
    }
    .rq > summary:focus-visible {
      outline: 2px solid ${color.primary};
      outline-offset: 2px;
    }
    dl {
      margin-top: 0;
    }
    .rq-row:last-child {
      border-bottom: 0;
    }
    .rq[open] {
      padding-bottom: ${space.sm};
    }
  }
`;

/** The answer, with the address (HIPAA row) as a mailto link. */
function Answer({ text }: { text: string }) {
  const at = text.indexOf(ADDRESS);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <a href={CONTACT.general}>{ADDRESS}</a>
      {text.slice(at + ADDRESS.length)}
    </>
  );
}

export default function ReviewQuestions({ className }: { className?: string }) {
  const fold = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const mq = window.matchMedia(FOLD);
    if (mq.matches && fold.current) fold.current.open = false;
    const unfold = (e: MediaQueryListEvent) => {
      if (!e.matches && fold.current) fold.current.open = true;
    };
    mq.addEventListener("change", unfold);
    return () => mq.removeEventListener("change", unfold);
  }, []);
  return (
    <Block className={className}>
      <h3 id="review-title">Questions a review will ask</h3>
      <details className="rq" ref={fold} open>
        <summary>Questions a review will ask</summary>
        <dl aria-labelledby="review-title">
          {REVIEW.map((r) => (
            <div className="rq-row" key={r.label}>
              <dt>
                <Link to={`/questions#${faqAnchor(r.q)}`}>{r.label}</Link>
              </dt>
              <dd>
                <Answer text={r.answer} />
              </dd>
            </div>
          ))}
        </dl>
      </details>
    </Block>
  );
}
