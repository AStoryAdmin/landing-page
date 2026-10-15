/**
 * Programs & grants — the startup programs A Story belongs to.
 *
 * NVIDIA Inception used to sit at the foot of Our Story, under the founders'
 * letters. It has its own page now, beside the AssemblyAI Startup Program and
 * the Cartesia Startups grant, so each can be explained without crowding the
 * letters.
 *
 * What these pages may claim: membership, and for Cartesia a grant. Never
 * endorsement, investment, partnership, "backed by" or "supported by". The
 * NVIDIA boilerplate is their approved description; the AssemblyAI and
 * Cartesia descriptions say only what each company does and what the program
 * is for. Nothing here says A Story uses either company's models.
 */
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import InceptionBadge from "../../components/ui/InceptionBadge";
import Logo from "../../components/ui/Logo";
import aaiBoxed from "../../assets/partners/assemblyai-startup-program-lockup-boxed.svg";
import cartesiaBoxed from "../../assets/partners/cartesia-startups-lockup-boxed.svg";
import { ArrowIcon, Invitation } from "./kit/kit";
import {
  Chapter,
  Eyebrow,
  Frame,
  PrimaryLink,
  SecondaryLink,
  Title,
} from "./kit/kit.styles";
import { display, font, media } from "../../styles/theme";
import { PROGRAMS, faqSchema } from "../../lib/seo";

const Opening = styled(Chapter)`
  padding: calc(clamp(88px, 11vw, 180px) * var(--sy)) 0
    calc(clamp(56px, 6vw, 96px) * var(--sy));
  text-align: center;
  h1 {
    margin: 18px auto 0;
    font-size: ${display.hero};
    max-width: 16ch;
  }
  h1 em {
    font-style: normal;
  }
  .lead {
    margin: clamp(24px, 3vw, 40px) auto 0;
    font: italic 400 ${display.sm} / 1.45 ${font.display};
    color: var(--muted);
    max-width: 40ch;
  }
  .jump {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: clamp(32px, 4vw, 48px);
  }
  .jump a {
    display: block;
  }
  .jump img {
    display: block;
    height: 56px;
    width: auto;
  }
  ${media.sm} {
    .jump img {
      height: 44px;
    }
  }
`;

/* One program: the badge and heading on the left, what it is on the right. */
const Program = styled(Chapter)`
  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(40px, 7vw, 112px);
    padding-block: 24px;
    border-top: 1px solid var(--line);
  }
  h2 {
    margin: 24px 0 32px;
    max-width: 19ch;
    font: 400 ${display.md}/1.12 ${font.display};
    text-wrap: balance;
  }
  h2 em {
    color: var(--mark);
  }
  .lockup {
    display: flex;
    align-items: center;
    gap: clamp(20px, 2vw, 32px);
    flex-wrap: wrap;
  }
  .lockup .rule {
    width: 1px;
    height: 64px;
    background: var(--line);
  }
  .lockup a svg,
  .lockup img {
    height: 64px;
  }
  .badge {
    display: block;
    width: auto;
    max-width: 100%;
    height: 72px;
    margin-left: -9px;
  }
  .copy {
    padding-top: 24px;
  }
  .copy p {
    font: 400 17px/1.65 ${font.body};
    color: var(--muted);
    max-width: 62ch;
  }
  .copy p + p {
    margin-top: 22px;
  }
  .copy .means {
    color: var(--ink);
  }
  .copy .means b {
    font-weight: 600;
  }
  figure {
    margin: 32px 0 0;
    max-width: 480px;
  }
  figure img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--line);
  }
  figcaption {
    margin-top: 10px;
    font: 400 13px/1.5 ${font.body};
    color: var(--muted);
  }
  ${media.md} {
    .layout {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .copy {
      padding-top: 0;
    }
  }
  ${media.sm} {
    .lockup {
      gap: 12px;
    }
    .lockup a svg,
    .lockup img {
      height: 44px;
    }
    .lockup .rule {
      height: 44px;
    }
    .lockup > span:last-child {
      padding: 10px;
    }
    .badge {
      height: 52px;
      margin-left: -6px;
    }
  }
  @media (max-width: 360px) {
    .lockup {
      gap: 10px;
    }
    .lockup a svg,
    .lockup img {
      height: 40px;
    }
    .lockup .rule {
      height: 40px;
    }
    .lockup > span:last-child {
      padding: 9px;
    }
  }
`;

/* Plain questions and answers: what an answer engine is asked, answered on the page itself. */
const Answers = styled(Chapter)`
  h2 {
    margin: 0 0 clamp(20px, 3vw, 32px);
    font: 400 ${display.sm}/1.2 ${font.display};
  }
  dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 36px) clamp(32px, 5vw, 72px);
    margin: 0;
  }
  dt {
    font: 600 16px/1.4 ${font.body};
    color: var(--ink);
  }
  dd {
    margin: 8px 0 0;
    font: 400 15px/1.6 ${font.body};
    color: var(--muted);
  }
  ${media.md} {
    dl {
      grid-template-columns: 1fr;
    }
  }
`;

const Plain = styled(Chapter)`
  text-align: center;
  p {
    margin: 0 auto;
    max-width: 52ch;
    font: 400 15px/1.6 ${font.body};
    color: var(--muted);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 28px;
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
        <Frame>
          <Eyebrow>Programs &amp; grants</Eyebrow>
          <Title id="programs-title">
            The programs we’re <em>part of.</em>
          </Title>
          <p className="lead">
            A Story is a member of the NVIDIA Inception program, the AssemblyAI
            Startup Program, and a Cartesia Startups grant recipient.
          </p>
          <nav className="jump" aria-label="Programs on this page">
            <a href="#inception-title">
              <InceptionBadge height={56} />
            </a>
            <a href="#assemblyai-title">
              <img src={aaiBoxed} alt="AssemblyAI Startup Program" width={279} height={56} />
            </a>
            <a href="#cartesia-title">
              <img src={cartesiaBoxed} alt="Cartesia Startups" width={282} height={56} />
            </a>
          </nav>
        </Frame>
      </Opening>

      <Program $ground="paper" $tight aria-labelledby="inception-title" data-nosnippet>
        <Frame className="layout">
          <div>
            <h2 id="inception-title">
              A member of the <em>NVIDIA Inception Program.</em>
            </h2>
            <div className="lockup">
              <Logo height={64} tone="light" />
              <span className="rule" aria-hidden="true" />
              <InceptionBadge height={64} />
            </div>
          </div>
          <div className="copy">
            <p>
              The NVIDIA Inception program is designed to help startups
              accelerate innovation and growth. Members get access to the latest
              developer resources and training, exclusive pricing on NVIDIA
              hardware and software, and exposure to the venture capital
              community.
            </p>
            <p className="means">
              What that buys a family is narrower than it sounds, and more
              useful. A call is only worth keeping if the thing on the other end
              can really <b>hear</b> - a name said once, an accent, a sentence
              that trails off and starts again somewhere else. Membership puts
              the tools that do that listening in our hands earlier than we
              could otherwise reach them.
            </p>
          </div>
        </Frame>
      </Program>

      <Program $ground="ivory" $tight aria-labelledby="assemblyai-title">
        <Frame className="layout">
          <div>
            <h2 id="assemblyai-title">
              A member of the <em>AssemblyAI Startup Program.</em>
            </h2>
            <img
              className="badge"
              src={aaiBoxed}
              alt="AssemblyAI Startup Program"
              width={359}
              height={72}
            />
          </div>
          <div className="copy">
            <p>
              AssemblyAI builds speech AI models that transcribe and understand
              spoken audio. Its startup program supports early-stage companies
              building with voice.
            </p>
          </div>
        </Frame>
      </Program>

      <Program $ground="paper" $tight aria-labelledby="cartesia-title">
        <Frame className="layout">
          <div>
            <h2 id="cartesia-title">
              A <em>Cartesia Startups</em> grant recipient.
            </h2>
            <img
              className="badge"
              src={cartesiaBoxed}
              alt="Cartesia Startups"
              width={363}
              height={72}
            />
          </div>
          <div className="copy">
            <p>
              Cartesia builds real-time voice AI models. Cartesia Startups
              awards grants to early teams building products with voice.
            </p>
            <figure>
              <img
                src="/brand/partners/cartesia-grant-recipient-astory.png"
                alt="Cartesia Startups grant recipient: A Story"
                width={1600}
                height={1600}
                loading="lazy"
                decoding="async"
              />
              <figcaption>Cartesia’s grant-recipient card for A Story.</figcaption>
            </figure>
          </div>
        </Frame>
      </Program>

      <Answers $ground="ivory" $tight aria-labelledby="programs-answers">
        <Frame>
          <h2 id="programs-answers">Questions, answered plainly</h2>
          <dl>
            {PROGRAMS.faq.map(({ q, a }) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        </Frame>
      </Answers>

      <Plain $ground="paper" $tight>
        <Frame>
          <p>
            None of these is an endorsement, an investment, or a partnership.
            They are programs for young companies, and we are one.
          </p>
          <div className="actions">
            <PrimaryLink to="/reserve">
              Reserve for $1 <ArrowIcon />
            </PrimaryLink>
            <SecondaryLink to="/our-story">Read our story</SecondaryLink>
          </div>
        </Frame>
      </Plain>

      <Invitation />
    </>
  );
}
