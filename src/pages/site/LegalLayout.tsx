import styled from "styled-components";
import type { ReactNode } from "react";
import useActiveSection from "../../hooks/useActiveSection";

/*
 * Privacy and Terms (round 3, jury 1 #15 and #3): the reading text is EB
 * Garamond, the summary and every section share one left edge, and the
 * contents are a real list. On a wide window they stand in a rail beside the
 * text (it follows the reader and marks the section in view); below 1025px
 * they fold into one "Contents" disclosure above the sections. The grid and
 * every style live on `LegalContent` (legalPrimitives.ts), the one box that
 * holds the notice, the summary and the sections.
 */
const Contents = styled.div`
  display: contents;
`;

export function LegalLayout({ children }: { children: ReactNode }) {
  return <Contents>{children}</Contents>;
}

export function PlainSummary({
  intro,
  points,
  caveat,
}: {
  intro: string;
  points: { label: string; text: string }[];
  caveat: string;
}) {
  return (
    <aside className="gf-legal-summary" aria-labelledby="legal-short">
      <h2 id="legal-short">The short version.</h2>
      <p>{intro}</p>
      <ul>
        {points.map((p) => (
          <li key={p.label}>
            <strong>{p.label}</strong> {p.text}
          </li>
        ))}
      </ul>
      <small>{caveat}</small>
    </aside>
  );
}

function Entries({
  sections,
  active,
}: {
  sections: { id: string; title: string }[];
  active?: string;
}) {
  return (
    <ol>
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={"#" + s.id}
            aria-current={active === s.id ? "true" : undefined}
          >
            <span className="n" aria-hidden="true">
              {i + 1}
            </span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function TableOfContents({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const active = useActiveSection(sections.map((s) => s.id));
  return (
    <>
      <nav className="gf-legal-rail" aria-labelledby="legal-contents">
        <p className="gf-legal-rail-h" id="legal-contents">
          Contents
        </p>
        <Entries sections={sections} active={active} />
      </nav>
      <details className="gf-legal-contents">
        <summary>
          <span>
            Contents <small>{sections.length} sections</small>
          </span>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </summary>
        <nav aria-label="Contents">
          <Entries sections={sections} />
        </nav>
      </details>
    </>
  );
}
