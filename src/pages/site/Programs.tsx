/**
 * Programs & grants — the startup programs A Story belongs to.
 *
 * Rebuilt 2026-10-15. The first version gave each program a whole band of
 * its own: a heading, a small badge and two lines of grey text in a room of
 * empty space, three times, with the hero's badge row out of line. The founder
 * asked for much better content and design.
 *
 * Now the page is built from the real thing it has: the programs' own
 * marks, set large on a cream plate in the opening (2026-10-23, jury 1 #19:
 * Cartesia's grant card, with its network lines and waveform, is gone). Then, on night, the page's one big idea; then one
 * card per program - one verb each, build, hear, answer, the badge, and one
 * sentence on why a family archive belongs there. Then the plain questions.
 *
 * Cut down 2026-10-23, when Google for Startups and Deepgram joined: the
 * founder asked for a brief page. The night band, the giant verbs and the
 * question block are gone; one list holds the five.
 *
 * The founder asked for the missions to be shown big and a little grand
 * (2026-10-15). Grand is allowed in A Story's own voice; the programs' side
 * stays a paraphrase of what each program is for, never a quotation.
 *
 * What these pages may claim: membership, and for Cartesia a grant. Never
 * endorsement, investment, partnership, "backed by" or "supported by". The
 * NVIDIA boilerplate is their approved description; the AssemblyAI and
 * Cartesia descriptions say only what each company does and what the program
 * is for. Nothing here says A Story uses either company's models.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import InceptionBadge from "../../components/ui/InceptionBadge";
import aaiBoxed from "../../assets/partners/assemblyai-startup-program-lockup-boxed.svg";
import googleBoxed from "../../assets/partners/google-for-startups-lockup-boxed.svg";
import deepgramBoxed from "../../assets/partners/deepgram-startup-program-lockup-boxed.svg";
import cartesiaBoxed from "../../assets/partners/cartesia-startups-lockup-boxed.svg";
import { ArrowIcon, Invitation, PageOpening } from "./kit/kit";
import { Chapter, Frame } from "./kit/kit.styles";
import { useReveals } from "./kit/reveals";
import { color, display, font, media, shadow } from "../../styles/theme";
import { PROGRAMS, faqSchema } from "../../lib/seo";

type Row = {
  id: string;
  name: string;
  status: string;
  mark: ReactNode;
  /** What the program is, plainly (jury 4 #11: no slogan beside a partner's name). */
  fit: ReactNode;
  href: string;
  host: string;
};

const ROWS: Row[] = [
  {
    id: "inception-title",
    name: "NVIDIA Inception",
    status: "Member since October 2026",
    mark: <InceptionBadge height={64} />,
    fit: <>NVIDIA’s program for startups building with AI.</>,
    href: "https://www.nvidia.com/en-us/startups/",
    host: "nvidia.com",
  },
  {
    id: "google-title",
    name: "Google for Startups",
    status: "Member",
    mark: (
      <img
        src={googleBoxed}
        alt="Google for Startups"
        width={160}
        height={48}
      />
    ),
    fit: <>Google’s program for startups.</>,
    href: "https://startup.google.com",
    host: "startup.google.com",
  },
  {
    id: "assemblyai-title",
    name: "AssemblyAI Startup Program",
    status: "Member",
    mark: (
      <img
        src={aaiBoxed}
        alt="AssemblyAI Startup Program"
        width={239}
        height={48}
      />
    ),
    fit: (
      <>
        AssemblyAI builds speech-to-text models. Its program is for startups
        building with voice.
      </>
    ),
    href: "https://www.assemblyai.com",
    host: "assemblyai.com",
  },
  {
    id: "deepgram-title",
    name: "Deepgram Startup Program",
    status: "Member",
    mark: (
      <img
        src={deepgramBoxed}
        alt="Deepgram Startup Program"
        width={230}
        height={48}
      />
    ),
    fit: (
      <>
        Deepgram builds speech recognition and voice AI. Its program is for
        startups building with voice.
      </>
    ),
    href: "https://deepgram.com/startup-program",
    host: "deepgram.com",
  },
  {
    id: "cartesia-title",
    name: "Cartesia Startups",
    status: "Grant recipient",
    mark: (
      <img
        src={cartesiaBoxed}
        alt="Cartesia Startups"
        width={242}
        height={48}
      />
    ),
    fit: (
      <>
        Cartesia builds real-time voice models. Its grant is for startups
        building with voice.
      </>
    ),
    href: "https://cartesia.ai",
    host: "cartesia.ai",
  },
];

/* ── Opening's object: the five marks, set large on a cream plate ──────── */

const Plate = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-items: center;
  gap: clamp(26px, 3vw, 48px) clamp(20px, 3vw, 56px);
  width: min(100%, 720px);
  padding: clamp(30px, 3.4vw, 60px);
  background: ${color.paperPure};
  box-shadow: ${shadow.lie};
  &::before {
    content: "";
    position: absolute;
    inset: clamp(8px, 0.8vw, 14px);
    border: 1px solid ${color.foil};
    pointer-events: none;
  }
  > * {
    position: relative;
  }
  img {
    display: block;
    height: clamp(44px, 3.6vw, 64px);
    width: auto;
    max-width: 100%;
  }
  > span:first-child {
    grid-column: 1 / -1;
  }
  > span > span {
    padding: 0;
  }
  ${media.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

/* ── The missions: one row per program ───────────────────────────────────── */

const Ledger = styled(Chapter)`
  /* One row per program (2026-10-23): badge, name and status, one line, the
     way out. Five cards side by side were too narrow; five bands too long. */
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid ${color.primaryLine};
  }
  li {
    display: grid;
    /* The marks are set large in the opening; the rows say what each is. */
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px clamp(24px, 3vw, 48px);
    align-items: center;
    padding: calc(clamp(18px, 2vw, 26px) * var(--sy)) 0;
    border-bottom: 1px solid ${color.primaryLine};
  }
  .mark img {
    display: block;
    height: 44px;
    width: auto;
    max-width: 100%;
  }
  .mark > span {
    padding: 0;
  }
  h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  .status {
    margin-left: 10px;
    font: 500 15px/1.3 ${font.text};
    color: var(--label);
  }
  .fit {
    margin-top: 6px;
    max-width: 62ch;
    font: 400 17px/1.5 ${font.text};
    color: var(--muted);
  }
  .out {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    font: 600 15px/1.3 ${font.body};
    color: var(--ink);
    white-space: nowrap;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }
  .out svg {
    width: 14px;
    height: 14px;
  }
  .fine {
    margin-top: 24px;
    max-width: 80ch;
    font: 400 14px/1.55 ${font.body};
    color: var(--muted);
  }
  ${media.md} {
    li {
      grid-template-columns: minmax(0, 1fr);
      align-items: start;
    }
  }
`;

export default function Programs() {
  const ledger = useReveals<HTMLElement>();
  return (
    <>
      <EditorialSeo
        title="Programs & grants"
        path="/programs"
        description="A Story is a member of NVIDIA Inception, Google for Startups, the AssemblyAI Startup Program and the Deepgram Startup Program, and a Cartesia Startups grant recipient."
        schema={[faqSchema(PROGRAMS.faq)]}
      />

      <PageOpening
        labelledBy="programs-title"
        title={
          <>
            Startup programs <em>and grants.</em>
          </>
        }
        lead="Five programs for companies building with AI and voice have taken A Story in. None of them is an endorsement, an investment or a partnership."
        object={
          <Plate aria-label="The five programs’ marks">
            {ROWS.map((r) => (
              <span key={r.id}>{r.mark}</span>
            ))}
          </Plate>
        }
      />

      <Ledger
        ref={ledger}
        $ground="ivory"
        $tight
        aria-label="The five programs"
        data-nosnippet
      >
        <Frame>
          <ol>
            {ROWS.map((r) => (
              <li key={r.id} data-rise>
                <div>
                  <h3 id={r.id}>
                    {r.name}
                    <span className="status">{r.status}</span>
                  </h3>
                  <p className="fit">{r.fit}</p>
                </div>
                <a
                  className="out"
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.host} <ArrowIcon />
                </a>
              </li>
            ))}
          </ol>
        </Frame>
      </Ledger>

      <Invitation />
    </>
  );
}
