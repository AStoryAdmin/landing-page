/**
 * Programs & grants — the startup programs A Story belongs to.
 *
 * Rebuilt 2026-10-15. The first version gave each program a whole band of
 * its own: a heading, a small badge and two lines of grey text in a room of
 * empty space, three times, with the hero's badge row out of line. The founder
 * asked for much better content and design.
 *
 * Now the page is built from the two real things it has: the programs' own
 * marks, shown large, and Cartesia's grant-recipient card for A Story, which
 * is the hero's picture. Then, on night, the page's one big idea; then one
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
import { ArrowIcon, Invitation } from "./kit/kit";
import { Chapter, Frame, Title } from "./kit/kit.styles";
import { useReveals } from "./kit/reveals";
import { color, display, font, media, motion } from "../../styles/theme";
import { PROGRAMS, faqSchema } from "../../lib/seo";

type Row = {
  id: string;
  name: string;
  status: string;
  mark: ReactNode;
  /** Why A Story belongs in it - one sentence, A Story's voice. */
  fit: ReactNode;
  href: string;
  host: string;
};

const ROWS: Row[] = [
  {
    id: "inception-title",
    name: "NVIDIA Inception",
    status: "Member since October 2026",
    mark: <InceptionBadge height={48} />,
    fit: (
      <>
        The most important thing AI will ever do is the oldest thing people do:{" "}
        <b>keep a family’s stories.</b>
      </>
    ),
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
    fit: (
      <>
        A family is spread across cities and years.{" "}
        <b>The archive has to be there whenever someone thinks to ask.</b>
      </>
    ),
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
        A grandmother says a name once, in an accent seventy years old.{" "}
        <b>It has to be heard right the first time.</b>
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
        An old voice on a phone line is quiet and slow.{" "}
        <b>Every word of it belongs on the page.</b>
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
        For people who will never download an app, the only screen is a voice.{" "}
        <b>It has to sound like someone listening.</b>
      </>
    ),
    href: "https://cartesia.ai",
    host: "cartesia.ai",
  },
];

/* ── Opening: the promise on the left, the grant card on the right ──────── */

const Opening = styled(Chapter)`
  padding: calc(clamp(72px, 9vw, 150px) * var(--sy)) 0
    calc(clamp(56px, 6vw, 104px) * var(--sy));
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(36px, 6vw, 110px);
    align-items: center;
  }
  h1 {
    margin-top: 16px;
    font-size: ${display.hero};
    max-width: 14ch;
  }
  .lead {
    margin-top: calc(clamp(20px, 2.4vw, 36px) * var(--sy));
    font: 400 clamp(1.1rem, 1rem + 0.4vw, 1.35rem) / 1.55 ${font.text};
    color: var(--ink);
    max-width: 40ch;
  }
  /* The three marks, one line, one height, vertically centred together. */
  .marks {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 14px;
    margin-top: calc(clamp(28px, 3.4vw, 48px) * var(--sy));
  }
  .marks a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    border-radius: 4px;
    transition: transform ${motion.base};
  }
  /* The NVIDIA badge carries its own clear space; cancel it so the three sit
     on the same edges. */
  .marks a:first-child > span {
    padding: 0;
  }
  .marks img {
    display: block;
    height: 40px;
    width: auto;
  }
  @media (hover: hover) and (pointer: fine) {
    .marks a:hover {
      transform: translateY(-2px);
    }
  }
  .card {
    margin: 0;
  }
  .card img {
    display: block;
    width: 100%;
    max-width: min(560px, 66svh);
    height: auto;
    margin-left: auto;
    border-radius: 6px;
  }
  .card figcaption {
    margin-top: 10px;
    text-align: right;
    font: 400 14px/1.5 ${font.body};
    color: var(--muted);
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .card img {
      margin: 0;
      max-width: 100%;
    }
    .card figcaption {
      text-align: left;
    }
    .marks img {
      height: 40px;
    }
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
    grid-template-columns: 250px minmax(0, 1fr) auto;
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
  .fit b {
    font-weight: 400;
    color: var(--ink);
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
  // The one page that stood still (2026-10-16): it now arrives the way the
  // other secondary routes do - headlines line by line, blocks in order.
  const opening = useReveals<HTMLElement>();
  const ledger = useReveals<HTMLElement>();
  return (
    <>
      <EditorialSeo
        title="Programs & grants"
        path="/programs"
        description="A Story is a member of NVIDIA Inception, Google for Startups, the AssemblyAI Startup Program and the Deepgram Startup Program, and a Cartesia Startups grant recipient."
        schema={[faqSchema(PROGRAMS.faq)]}
      />

      <Opening ref={opening} $ground="cloth" aria-labelledby="programs-title">
        <Frame className="grid">
          <div>
            <Title id="programs-title" data-lines>
              In very good <em>company.</em>
            </Title>
            <p className="lead" data-rise>
              Five programs for companies building with AI and voice have taken
              A Story in. None of them is an endorsement, an investment or a
              partnership.
            </p>
          </div>
          <figure className="card" data-rise data-drift="4">
            <img
              src="/brand/partners/cartesia-grant-recipient-astory.png"
              alt="Cartesia Startups grant recipient: A Story"
              width={1600}
              height={1600}
              decoding="async"
            />
            <figcaption>
              Cartesia’s grant-recipient card for A Story.
            </figcaption>
          </figure>
        </Frame>
      </Opening>

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
                <div className="mark">{r.mark}</div>
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
