/**
 * A conversation guide, set as an article.
 *
 * Reading comfort first: a 68-character measure, 19px text, serif section
 * headings, and a contents list that stays beside the text on wide screens.
 * The guide's own example opens it as a pull quote; its closing question is
 * set large at the end, because the point of a guide is the question the
 * reader goes and asks. A photograph appears only for the four guides where
 * the image shows what the guide is about (a conversation, a box of photos,
 * a shared afternoon, an ordinary day) — decorative openers were removed.
 */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import NotFound from "./NotFound";
import guides from "../../lib/guides.json";
import {
  SITE,
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
} from "../../lib/seo";
import { ArrowIcon, Print } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Plate,
  PrimaryLink,
  Title,
} from "./kit/kit.styles";
import { color, curve, display, font, media } from "../../styles/theme";

/**
 * Guides whose photograph carries the subject; the others read better
 * without one. One photograph, one page (jury 1 #7): Home keeps the lake (30)
 * and the lunchbox (21), and Care keeps the photo-sorting scene (23), so
 * those guides take a library print of their own here.
 */
const PICTURED: Record<string, string> = {
  "interview-a-parent": "33",
  "unlabeled-family-photographs": "03",
  "different-versions": "H03",
  "ordinary-life-questions": "35",
};

/* The guide opens on the cloth, like every page (jury 1 #5): the way back,
   the title and the thesis on the left, its photograph beside them. */
const PICTURE_ALT: Record<string, string> = {
  "03": "A faded family snapshot, around 1973: a car being unloaded at a new house",
  H03: "Friends on a lake shore at dusk, one pointing out across the water",
  "35": "An ordinary weekday: someone carrying laundry through the house",
};

const Head = styled(Chapter)`
  padding: calc(clamp(40px, 5vw, 96px) * var(--sy)) 0
    calc(clamp(56px, 6vw, 112px) * var(--sy));
  .head {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(36px, 5vw, 110px);
    align-items: center;
  }
  .head.solo {
    grid-template-columns: minmax(0, 1fr);
  }
  .back {
    /* Its own line: inline, it sat on one baseline with the eyebrow after it. */
    display: flex;
    width: fit-content;
    align-items: center;
    min-height: 44px;
    margin-bottom: 28px;
    font: 500 15px/1 ${font.ui};
    color: var(--muted);
    text-underline-offset: 5px;
  }
  /* Article titles are long (60-70 characters): a smaller display size on
     a wider measure keeps them to two lines on a desktop. */
  h1 {
    max-width: 30ch;
    font-size: clamp(2rem, 1.2rem + 2.1vw, 3.6rem);
  }
  .thesis {
    margin-top: 24px;
    font: 400 clamp(1.2rem, 1.05rem + 0.45vw, 1.5rem) / 1.55 ${font.text};
    color: var(--text);
    max-width: 48ch;
  }
  .byline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 24px;
    margin-top: 24px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    font: 400 15px/1.5 ${font.ui};
    color: var(--muted);
  }
  .byline button {
    min-height: 44px;
    padding: 0;
    border: 0;
    background: none;
    font: 600 15px/1 ${font.ui};
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 5px;
    cursor: pointer;
  }
  .lead-image {
    /* Capped by height too, so the print is never taller than a laptop
       window (the laptop rule, design.md). */
    max-width: min(760px, calc(64svh * 4 / 3));
    justify-self: end;
    width: 100%;
  }
  ${media.md} {
    .head {
      grid-template-columns: minmax(0, 1fr);
    }
    .lead-image {
      justify-self: start;
    }
  }
`;

/* The article on the ivory page: the contents rail on the left, the text
   centred in the rest at a reading measure, set in EB Garamond (jury 1 #15). */
const Article = styled(Chapter)`
  padding: calc(clamp(56px, 6vw, 104px) * var(--sy)) 0 clamp(80px, 9vw, 140px);
  .body {
    display: grid;
    grid-template-columns: minmax(0, 0.32fr) minmax(0, 1fr);
    gap: clamp(28px, 6vw, 100px);
  }
  nav {
    position: sticky;
    top: calc(var(--nav-total) + 28px);
    align-self: start;
    display: grid;
    gap: 2px;
  }
  nav small {
    margin-bottom: 8px;
    font: 600 12px/1.3 ${font.ui};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  nav a {
    display: block;
    min-height: 44px;
    padding: 11px 0;
    font: 400 15px/1.4 ${font.ui};
    color: ${color.body};
    text-decoration: none;
    border-top: 1px solid ${color.primaryLine};
    transition: color 160ms ${curve.out};
  }
  @media (hover: hover) and (pointer: fine) {
    nav a:hover {
      color: ${color.accentText};
    }
  }
  .text {
    max-width: 68ch;
    width: 100%;
    justify-self: center;
  }
  .example {
    margin-bottom: clamp(40px, 5vw, 64px);
  }
  .example p {
    font: italic 400 ${display.sm} / 1.45 ${font.display};
    color: ${color.primary};
  }
  .text section + section {
    margin-top: clamp(40px, 4vw, 56px);
  }
  .text h2 {
    font: 400 ${display.md} / 1.2 ${font.display};
    color: ${color.primary};
    margin-bottom: 16px;
  }
  .text section p {
    font: 400 clamp(1.15rem, 1.1rem + 0.2vw, 1.3rem) / 1.7 ${font.text};
    color: ${color.body};
  }
  .text section p + p {
    margin-top: 16px;
  }
  .view {
    margin-top: clamp(48px, 5vw, 72px);
    padding: clamp(28px, 3vw, 44px);
    background: ${color.ivoryDeep};
  }
  .view p {
    font: 400 clamp(1.1rem, 1.05rem + 0.2vw, 1.25rem) / 1.65 ${font.text};
    color: ${color.body};
  }
  .view p + p {
    margin-top: 14px;
  }
  .view a {
    margin-top: 24px;
  }
  .source {
    margin-top: 24px;
    font: 400 15px/1.6 ${font.ui};
    color: ${color.bodyMuted};
  }
  .closing {
    margin: clamp(56px, 7vw, 100px) 0 0;
    font: 400 ${display.lg} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .related {
    margin-top: clamp(48px, 5vw, 72px);
  }
  .related a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 18px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.primary};
    text-decoration: none;
  }
  @media (hover: hover) and (pointer: fine) {
    .related a:hover {
      color: ${color.accentText};
    }
  }
  .related svg {
    width: 18px;
    height: 18px;
    flex: none;
  }
  ${media.md} {
    .body {
      grid-template-columns: minmax(0, 1fr);
    }
    nav {
      position: static;
    }
    .text {
      justify-self: start;
    }
  }
`;

export default function Guide() {
  const { slug } = useParams();
  const g = guides.find((x) => x.slug === slug);
  const [notice, setNotice] = useState("");
  const ref = useReveals<HTMLElement>();
  const body = useReveals<HTMLDivElement>();
  if (!g) return <NotFound />;
  const path = "/guides/" + g.slug;
  const url = SITE.url + path;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Link copied.");
    } catch {
      setNotice("Copy this link: " + url);
    }
  };
  const share = async () => {
    try {
      await navigator.share({ title: g.title, url });
    } catch (e) {
      if (!(e instanceof DOMException && e.name === "AbortError"))
        setNotice("Sharing is unavailable here. Use Copy link.");
    }
  };
  const picture = PICTURED[g.slug];
  return (
    <article aria-labelledby="guide-title">
      <Seo
        title={g.title + " | A Story"}
        path={path}
        image={"/og/" + g.slug + ".jpg"}
        description={g.description}
        schema={[
          organizationSchema(),
          websiteSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: g.title, path },
          ]),
          {
            "@type": "Article",
            "@id": url + "#article",
            headline: g.title,
            description: g.description,
            datePublished: g.date,
            dateModified: g.date,
            author: {
              "@type": "Organization",
              name: g.author,
              url: SITE.url + "/our-story",
            },
            publisher: { "@id": SITE.url + "/#organization" },
            image: SITE.url + "/og/" + g.slug + ".jpg",
            mainEntityOfPage: url,
          },
        ]}
      />
      <Head ref={ref} $ground="cloth">
        <Frame className={`head${picture ? "" : " solo"}`}>
          <div>
            <Link className="back" to="/guides">
              ← All conversation guides
            </Link>
            <Eyebrow>{g.category}</Eyebrow>
            <Title id="guide-title" data-lines>
              {g.title}
            </Title>
            <p className="thesis" data-rise>
              {g.thesis}
            </p>
            <div className="byline">
              <span>
                By {g.author} ·{" "}
                <time dateTime={g.date}>
                  {new Date(g.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </span>
              <button onClick={copy}>Copy link</button>
              {typeof navigator.share === "function" && (
                <button onClick={share}>Share</button>
              )}
              <span role="status">{notice}</span>
            </div>
          </div>
          {picture && (
            <div className="lead-image" data-rise="settle">
              <Print
                id={picture}
                alt={picture === g.image ? g.alt : PICTURE_ALT[picture]}
                tilt={-1.2}
                priority
                sizes="(max-width: 860px) 100vw, 40vw"
              />
            </div>
          )}
        </Frame>
      </Head>

      <Article ref={body} $ground="ivory" as="div">
        <Frame>
          <div className="body">
            <nav aria-label="In this guide">
              <small>In this guide</small>
              {g.sections.map((s, i) => (
                <a key={s.heading} href={"#part-" + (i + 1)}>
                  {s.heading}
                </a>
              ))}
            </nav>
            <div className="text">
              <Plate className="example" data-rise>
                <p>{g.example}</p>
              </Plate>
              {g.sections.map((s, i) => (
                <section id={"part-" + (i + 1)} key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </section>
              ))}
              <aside className="view" id="point-of-view">
                <Eyebrow>The A Story point of view</Eyebrow>
                <p>{g.point}</p>
                <p>{g.product}</p>
                <PrimaryLink to={g.destination}>
                  {g.action} <ArrowIcon />
                </PrimaryLink>
              </aside>
              {g.source && (
                <p className="source">
                  Further reading: <a href={g.source.url}>{g.source.label}</a>.
                </p>
              )}
              <p className="closing" data-rise>
                “{g.question}”
              </p>
              <div className="related">
                <Eyebrow>Keep exploring</Eyebrow>
                {g.related.map((s) => {
                  const next = guides.find((x) => x.slug === s);
                  return next ? (
                    <Link key={s} to={"/guides/" + s}>
                      {next.title} <ArrowIcon />
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </Frame>
      </Article>
    </article>
  );
}
