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
import cartesiaBoxed from "../../assets/partners/cartesia-startups-lockup-boxed.svg";
import { ArrowIcon, Invitation } from "./kit/kit";
import { Chapter, Eyebrow, Frame, PrimaryLink, SecondaryLink, Statement, Title } from "./kit/kit.styles";
import { useReveals } from "./kit/reveals";
import { color, display, font, media, motion } from "../../styles/theme";
import { PROGRAMS, faqSchema } from "../../lib/seo";
import { START_HREF, START_LABEL } from "../../lib/app";

type Row = {
  id: string;
  name: string;
  status: string;
  mark: ReactNode;
  /** One verb: what the program is about, in A Story's terms. */
  word: string;
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
    word: "Build.",
    fit: (
      <>
        The most important thing AI will ever do is the oldest thing people do: <b>keep a family’s stories.</b>
      </>
    ),
    href: "https://www.nvidia.com/en-us/startups/",
    host: "nvidia.com",
  },
  {
    id: "assemblyai-title",
    name: "AssemblyAI Startup Program",
    status: "Member",
    mark: <img src={aaiBoxed} alt="AssemblyAI Startup Program" width={239} height={48} />,
    word: "Hear.",
    fit: (
      <>
        A grandmother says a name once, in an accent seventy years old. <b>If it isn’t heard, it’s gone.</b>
      </>
    ),
    href: "https://www.assemblyai.com",
    host: "assemblyai.com",
  },
  {
    id: "cartesia-title",
    name: "Cartesia Startups",
    status: "Grant recipient",
    mark: <img src={cartesiaBoxed} alt="Cartesia Startups" width={242} height={48} />,
    word: "Answer.",
    fit: (
      <>
        For people who will never download an app, the only screen is a voice. <b>It has to sound like someone listening.</b>
      </>
    ),
    href: "https://cartesia.ai",
    host: "cartesia.ai",
  },
];

/** NVIDIA's approved description of the program, kept as their fine print. */
const NVIDIA_ABOUT =
  "The NVIDIA Inception program is designed to help startups accelerate innovation and growth. Members get access to the latest developer resources and training, exclusive pricing on NVIDIA hardware and software, and exposure to the venture capital community.";

/* ── Opening: the promise on the left, the grant card on the right ──────── */

const Opening = styled(Chapter)`
  padding: calc(clamp(72px, 9vw, 150px) * var(--sy)) 0 calc(clamp(56px, 6vw, 104px) * var(--sy));
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
    font: 400 clamp(1.1rem, 1rem + 0.4vw, 1.35rem) / 1.55 ${font.body};
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

/* ── The idea, on night ─────────────────────────────────────────────────── */

const Idea = styled(Chapter)`
  text-align: center;
  h2 {
    max-width: 19ch;
    margin-inline: auto;
  }
  p {
    max-width: 50ch;
    margin: calc(clamp(20px, 2.4vw, 32px) * var(--sy)) auto 0;
    font: 400 clamp(1.1rem, 1rem + 0.4vw, 1.35rem) / 1.55 ${font.body};
    color: var(--muted);
  }
`;

/* ── The missions: one row per program ───────────────────────────────────── */

const Ledger = styled(Chapter)`
  /* Three cards side by side (2026-10-15): one verb, the badge, the name,
     one sentence. The long two-column rows read as a document. */
  ol {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    flex-direction: column;
    padding: clamp(28px, 3vw, 44px);
    background: ${color.paperPure};
    border-radius: 6px;
    box-shadow: 0 24px 48px -36px rgba(42, 31, 24, 0.45);
  }
  .word {
    font: 400 clamp(3rem, 1.6rem + 3.4vw, 5.2rem) / 0.95 ${font.display};
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  .mark {
    margin-top: calc(clamp(20px, 2.4vw, 32px) * var(--sy));
  }
  .mark img {
    display: block;
    height: 48px;
    width: auto;
    max-width: 100%;
  }
  .mark > span {
    padding: 0;
  }
  h3 {
    margin-top: 22px;
    /* Two lines held for every name, so the cards stay in line. */
    min-height: 2.4em;
    display: flex;
    align-items: flex-end;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  .status {
    margin-top: 4px;
    font: 500 15px/1.3 ${font.body};
    color: var(--label);
  }
  .fit {
    flex: 1;
    margin-top: 18px;
    font: 400 clamp(1.1rem, 1rem + 0.3vw, 1.3rem) / 1.45 ${font.display};
    color: var(--ink);
  }
  .fit b {
    font-weight: 400;
    color: var(--label);
  }
  .out {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    margin-top: 16px;
    font: 600 15px/1.3 ${font.body};
    color: var(--ink);
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
  ${media.lg} {
    ol {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

/* ── What it means, the questions, the plain line ────────────────────────── */

const Means = styled(Chapter)`
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
    gap: clamp(32px, 6vw, 110px);
  }
  .grid h2 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  .plain {
    margin-top: 14px;
    font: 400 17px/1.6 ${font.body};
    color: var(--muted);
    max-width: 36ch;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  dl {
    display: grid;
    gap: 26px;
    margin: 0;
  }
  dt {
    font: 400 clamp(1.1rem, 1rem + 0.3vw, 1.25rem) / 1.35 ${font.display};
    color: var(--ink);
  }
  dd {
    margin: 8px 0 0;
    font: 400 16px/1.6 ${font.body};
    color: var(--muted);
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function Programs() {
  // The one page that stood still (2026-10-16): it now arrives the way the
  // other secondary routes do - headlines line by line, blocks in order.
  const opening = useReveals<HTMLElement>();
  const idea = useReveals<HTMLElement>();
  const ledger = useReveals<HTMLElement>();
  const means = useReveals<HTMLElement>();
  return (
    <>
      <EditorialSeo
        title="Programs & grants"
        path="/programs"
        description="A Story is a member of the NVIDIA Inception program, the AssemblyAI Startup Program, and a Cartesia Startups grant recipient."
        schema={[faqSchema(PROGRAMS.faq)]}
      />

      <Opening ref={opening} $ground="ivory" aria-labelledby="programs-title">
        <Frame className="grid">
          <div>
            <Eyebrow>Programs &amp; grants</Eyebrow>
            <Title id="programs-title" data-lines>
              In very good <em>company.</em>
            </Title>
            <p className="lead" data-rise>
              A Story is a young company, and three of the programs shaping AI and voice have taken it in: NVIDIA Inception,
              the AssemblyAI Startup Program, and a Cartesia Startups grant.
            </p>
            <nav className="marks" aria-label="Programs on this page" data-rise>
              <a href="#inception-title" aria-label="NVIDIA Inception">
                <InceptionBadge height={40} />
              </a>
              <a href="#assemblyai-title" aria-label="AssemblyAI Startup Program">
                <img src={aaiBoxed} alt="" width={199} height={40} />
              </a>
              <a href="#cartesia-title" aria-label="Cartesia Startups">
                <img src={cartesiaBoxed} alt="" width={202} height={40} />
              </a>
            </nav>
          </div>
          <figure className="card" data-rise data-drift="4">
            <img
              src="/brand/partners/cartesia-grant-recipient-astory.png"
              alt="Cartesia Startups grant recipient: A Story"
              width={1600}
              height={1600}
              decoding="async"
            />
            <figcaption>Cartesia’s grant-recipient card for A Story.</figcaption>
          </figure>
        </Frame>
      </Opening>

      <Idea ref={idea} $ground="night" aria-labelledby="programs-idea">
        <Frame>
          <Statement id="programs-idea" $size="xl" data-lines>
            The future of AI is being built now. Its oldest job is <em>keeping a family’s voice.</em>
          </Statement>
          <p data-rise>
            Three programs for the companies building with AI and voice have taken A Story in. Here is what each one
            is for, and why a family archive belongs in it.
          </p>
        </Frame>
      </Idea>

      <Ledger ref={ledger} $ground="ivory" $tight aria-label="The three programs" data-nosnippet>
        <Frame>
          <ol>
            {ROWS.map((r) => (
              <li key={r.id} data-rise>
                {/* The verb rises out of its card a beat after the card lands. */}
                <p className="word" aria-hidden="true" data-lines="0.18">
                  {r.word}
                </p>
                <div className="mark">{r.mark}</div>
                <h3 id={r.id}>{r.name}</h3>
                <p className="status">{r.status}</p>
                <p className="fit">{r.fit}</p>
                <a className="out" href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.host} <ArrowIcon />
                </a>
              </li>
            ))}
          </ol>
          <p className="fine" data-rise>
            {NVIDIA_ABOUT}
          </p>
        </Frame>
      </Ledger>

      <Means ref={means} $ground="sand" aria-labelledby="programs-answers">
        <Frame>
          <div className="grid">
            <div data-rise>
              <h2 id="programs-answers">Questions, answered plainly</h2>
              <p className="plain">
                None of these is an endorsement, an investment, or a partnership. They are programs for young
                companies, and we are one.
              </p>
              <div className="actions">
                <PrimaryLink to={START_HREF}>
                  {START_LABEL} <ArrowIcon />
                </PrimaryLink>
                <SecondaryLink to="/our-story">Read our story</SecondaryLink>
              </div>
            </div>
            <dl data-rise>
              {PROGRAMS.faq.map(({ q, a }) => (
                <div key={q}>
                  <dt>{q}</dt>
                  <dd>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Frame>
      </Means>

      <Invitation />
    </>
  );
}
