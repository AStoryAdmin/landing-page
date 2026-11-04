/**
 * A printed page for the two organization pages (round 3 fix 1, item 12e,
 * Denise: "save the page as a PDF and forward it"). Rendered by Care.tsx and
 * Organizations.tsx only; nothing changes on screen.
 *
 * In print: no header, menu, footer, sticky bar or demo form; dark grounds
 * print as paper with dark ink; every fold is open (a closed <details>
 * prints closed, so they are opened on `beforeprint`); links show their
 * address after the words; rows and figures do not split across pages.
 */
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";

const Sheet = createGlobalStyle`
  @media print {
    @page {
      margin: 16mm 14mm;
    }
    html,
    body {
      background: #fff !important;
    }
    header,
    footer,
    .gf-header,
    .skip-link,
    form,
    video,
    [aria-labelledby="invitation-title"] {
      display: none !important;
    }
    /* The phone sticky bar (kit/StickyStart.tsx renders data-shown). */
    main [data-shown] {
      display: none !important;
    }
    main,
    main section {
      background: none !important;
      color: #2a2320 !important;
      --ink: #2a2320;
      --text: #2a2320;
      --muted: #4a3f38;
      --line: #c9bfb4;
      box-shadow: none !important;
      padding-top: 10mm !important;
      padding-bottom: 6mm !important;
    }
    main section::before,
    main section::after {
      display: none !important;
    }
    main * {
      color: inherit;
      animation: none !important;
      transition: none !important;
    }
    main [data-rise],
    main [data-lines],
    main [data-print] {
      opacity: 1 !important;
      transform: none !important;
    }
    main h1,
    main h2,
    main h3 {
      break-after: avoid;
    }
    main li,
    main figure,
    main details,
    main blockquote {
      break-inside: avoid;
    }
    main a[href^="http"]::after,
    main a[href^="mailto:"]::after {
      content: " (" attr(href) ")";
      font-size: 0.85em;
    }
    main details > summary {
      list-style: none;
    }
  }
`;

export default function PrintSheet() {
  useEffect(() => {
    const open = () =>
      document
        .querySelectorAll<HTMLDetailsElement>("main details")
        .forEach((d) => (d.open = true));
    window.addEventListener("beforeprint", open);
    return () => window.removeEventListener("beforeprint", open);
  }, []);
  return <Sheet />;
}
