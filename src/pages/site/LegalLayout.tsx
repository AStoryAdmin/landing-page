import styled from "styled-components";
import { color, font, media } from "../../styles/theme";
import type { ReactNode } from "react";
import useActiveSection from "../../hooks/useActiveSection";
export function LegalLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
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
    <aside className="gf-legal-summary" aria-label="Plain-English summary">
      <h2>The short version.</h2>
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
export function TableOfContents({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const active = useActiveSection(sections.map((s) => s.id));
  return (
    <details className="gf-legal-contents">
      <summary>Find a section</summary>
      <nav aria-label="On this page">
        <ol>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={"#" + s.id}
                aria-current={active === s.id ? "true" : undefined}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}

const Layout = styled.div`
  color: ${color.ink};
  background: ${color.ivory};
  .gf-legal-summary {
    margin: 8px 0 35px;
    padding: 32px 38px;
    background: ${color.paper};
    border: 1px solid ${color.primaryLine};
    border-radius: 2px;
    font-size: 18px;
    line-height: 1.6;
  }
  .gf-legal-summary h2 {
    font: 400 34px/1.2 ${font.display};
    margin-bottom: 18px;
  }
  .gf-legal-summary ul {
    padding-left: 22px;
  }
  .gf-legal-summary li {
    margin: 12px 0;
  }
  .gf-legal-summary small {
    display: block;
    font-size: 14px;
    color: ${color.bodyMuted};
  }
  .gf-legal-contents {
    margin-bottom: 30px;
    border-block: 1px solid ${color.primaryLineStrong};
    padding: 18px 0;
  }
  .gf-legal-contents summary {
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
  }
  .gf-legal-contents ol {
    columns: 2;
    column-gap: 40px;
    padding-left: 24px;
  }
  .gf-legal-contents li {
    break-inside: avoid;
    margin: 0 0 8px;
    font-size: 16px;
  }
  .gf-legal-contents a {
    display: inline-block;
    padding: 5px 0;
    text-underline-offset: 4px;
  }
  .gf-legal-contents a[aria-current="true"] {
    color: ${color.accentText};
  }
  ${media.sm} {
    .gf-legal-summary {
      padding: 25px;
    }
    .gf-legal-contents ol {
      columns: 1;
    }
  }
`;
