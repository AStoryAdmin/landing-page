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
 * row per program that sets the program's purpose beside A Story's - one
 * verb each, build, hear, answer - so a visitor sees why a family archive
 * belongs in programs about the future of AI. Then the plain questions.
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
import { display, font, media, motion } from "../../styles/theme";
import { PROGRAMS, faqSchema } from "../../lib/seo";

type Row = {
  id: string;
  name: string;
  status: string;
  mark: ReactNode;
  /** One verb: what the program is about, in A Story's terms. */
  word: string;
  /** What the program is for, paraphrased. */
  mission: string;
  /** Why A Story belongs in it - A Story's voice, allowed to be grand. */
  fit: ReactNode;
  /** NVIDIA's approved boilerplate, where a program has one. */
  fine?: string;
  href: string;
  host: string;
};

const ROWS: Row[] = [
  {
    id: "inception-title",
    name: "NVIDIA Inception",
    status: "Member since October 2026",
    mark: <InceptionBadge height={56} />,
    word: "Build.",
    mission:
      "NVIDIA makes the hardware and software much of today’s AI runs on. Its Inception program takes in startups building what comes next.",
    fit: (
      <>
        We think the most important thing AI will ever do is the oldest thing people do: <b>keep a family’s
        stories.</b> We’re building the archive that outlives all of us.
      </>
    ),
    fine: "The NVIDIA Inception program is designed to help startups accelerate innovation and growth. Members get access to the latest developer resources and training, exclusive pricing on NVIDIA hardware and software, and exposure to the venture capital community.",
    href: "https://www.nvidia.com/en-us/startups/",
    host: "nvidia.com",
  },
  {
    id: "assemblyai-title",
    name: "AssemblyAI Startup Program",
    status: "Member",
    mark: <img src={aaiBoxed} alt="AssemblyAI Startup Program" width={279} height={56} />,
    word: "Hear.",
    mission:
      "AssemblyAI works on one of AI’s hardest problems: understanding people when they speak. Its startup program is for early companies building with voice.",
    fit: (
      <>
        That is our whole job. A grandmother says a name once, in an accent seventy years old. <b>If it isn’t
        heard, it’s gone</b> - so we listen like it’s the only time.
      </>
    ),
    href: "https://www.assemblyai.com",
    host: "assemblyai.com",
  },
  {
    id: "cartesia-title",
    name: "Cartesia Startups",
    status: "Grant recipient",
    mark: <img src={cartesiaBoxed} alt="Cartesia Startups" width={283} height={56} />,
    word: "Answer.",
    mission:
      "Cartesia builds real-time voice AI: speech that answers as quickly and naturally as a person. Its grants go to early teams building products with voice.",
    fit: (
      <>
        A Story calls people who will never download an app. For them the only screen is a voice, so it has to
        sound like <b>someone who is really listening</b> - and know what to ask next.
      </>
    ),
    href: "https://cartesia.ai",
    host: "cartesia.ai",
  },
];

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
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: row;
  }
  li {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: clamp(28px, 5vw, 96px);
    padding: calc(clamp(40px, 5vw, 80px) * var(--sy)) 0;
    border-top: 1px solid var(--line);
  }
  li:last-child {
    border-bottom: 1px solid var(--line);
  }
  /* The verb, set as large as the page allows: the row's whole idea. */
  .word {
    font: 400 clamp(3.4rem, 1.4rem + 6vw, 7.5rem) / 0.95 ${font.display};
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  .word::before {
    counter-increment: row;
    content: "0" counter(row);
    display: block;
    margin-bottom: 18px;
    font: 500 15px/1 ${font.body};
    letter-spacing: 0.04em;
    color: var(--label);
  }
  .mark {
    margin-top: calc(clamp(24px, 3vw, 40px) * var(--sy));
  }
  .mark img {
    display: block;
    height: 56px;
    width: auto;
    max-width: 100%;
  }
  .mark > span {
    padding: 0;
  }
  .name {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 14px;
  }
  h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink);
  }
  .status {
    font: 500 15px/1.3 ${font.body};
    color: var(--label);
  }
  .pair {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: clamp(24px, 3.4vw, 56px);
    margin-top: calc(clamp(20px, 2.4vw, 32px) * var(--sy));
  }
  .pair h4 {
    font: 600 15px/1.3 ${font.body};
    color: var(--muted);
  }
  .pair p {
    margin-top: 10px;
    font: 400 17px/1.6 ${font.body};
    color: var(--muted);
  }
  .pair .fit p {
    font: 400 clamp(1.25rem, 1.05rem + 0.6vw, 1.6rem) / 1.4 ${font.display};
    color: var(--ink);
  }
  .fit b {
    font-weight: 400;
    color: var(--label);
  }
  .fine {
    margin-top: 22px;
    font: 400 14px/1.55 ${font.body};
    color: var(--muted);
    max-width: 72ch;
  }
  .out {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    margin-top: 12px;
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
  ${media.lg} {
    .pair {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.md} {
    li {
      grid-template-columns: minmax(0, 1fr);
      gap: 20px;
    }
    .mark img {
      height: 48px;
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
  return (
    <>
      <EditorialSeo
        title="Programs & grants"
        path="/programs"
        description="A Story is a member of the NVIDIA Inception program, the AssemblyAI Startup Program, and a Cartesia Startups grant recipient."
        schema={[faqSchema(PROGRAMS.faq)]}
      />

      <Opening $ground="ivory" aria-labelledby="programs-title">
        <Frame className="grid">
          <div>
            <Eyebrow>Programs &amp; grants</Eyebrow>
            <Title id="programs-title">
              In very good <em>company.</em>
            </Title>
            <p className="lead">
              A Story is a young company, and three of the programs shaping AI and voice have taken it in: NVIDIA Inception,
              the AssemblyAI Startup Program, and a Cartesia Startups grant.
            </p>
            <nav className="marks" aria-label="Programs on this page">
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
          <figure className="card">
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

      <Idea $ground="night" aria-labelledby="programs-idea">
        <Frame>
          <Statement id="programs-idea" $size="xl">
            The future of AI is being built now. Its oldest job is <em>keeping a family’s voice.</em>
          </Statement>
          <p>
            Three programs for the companies building with AI and voice have taken A Story in. Here is what each one
            is for, and why a family archive belongs in it.
          </p>
        </Frame>
      </Idea>

      <Ledger $ground="ivory" aria-label="The three programs" data-nosnippet>
        <Frame>
          <ol>
            {ROWS.map((r) => (
              <li key={r.id}>
                <div>
                  <p className="word" aria-hidden="true">
                    {r.word}
                  </p>
                  <div className="mark">{r.mark}</div>
                </div>
                <div>
                  <div className="name">
                    <h3 id={r.id}>{r.name}</h3>
                    <span className="status">{r.status}</span>
                  </div>
                  <div className="pair">
                    <div>
                      <h4>What the program is for</h4>
                      <p>{r.mission}</p>
                    </div>
                    <div className="fit">
                      <h4>Why A Story belongs</h4>
                      <p>{r.fit}</p>
                    </div>
                  </div>
                  {r.fine && <p className="fine">{r.fine}</p>}
                  <a className="out" href={r.href} target="_blank" rel="noopener noreferrer">
                    {r.host} <ArrowIcon />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </Frame>
      </Ledger>

      <Means $ground="sand" aria-labelledby="programs-answers">
        <Frame>
          <div className="grid">
            <div>
              <h2 id="programs-answers">Questions, answered plainly</h2>
              <p className="plain">
                None of these is an endorsement, an investment, or a partnership. They are programs for young
                companies, and we are one.
              </p>
              <div className="actions">
                <PrimaryLink to="/reserve">
                  Reserve for $1 <ArrowIcon />
                </PrimaryLink>
                <SecondaryLink to="/our-story">Read our story</SecondaryLink>
              </div>
            </div>
            <dl>
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
