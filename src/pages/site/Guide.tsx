/**
 * A conversation guide, set as an article.
 *
 * Reading comfort first: a 68-character measure, 19px text, serif section
 * headings, and a contents list that stays beside the text on wide screens.
 * The guide's own example opens it as a pull quote; its closing question is
 * set large at the end, because the point of a guide is the question the
 * reader goes and asks.
 *
 * Premium pass (2026-11-02, design spec §4D): the head is on the paper, not
 * the cloth, so the guides read as a library. The title is set at display.lg
 * (the long titles keep to four lines at 390), and the guide's photograph
 * (guidePictures.ts, the one its index row shows) takes half the row on a
 * wide screen and the full width above the title on a phone, as a crop.
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
import { ArrowIcon, Picture } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import {
  Chapter,
  Eyebrow,
  Frame,
  Plate,
  PrimaryLink,
  Title,
} from "./kit/kit.styles";
import {
  color,
  curve,
  display,
  font,
  measure,
  media,
  space,
  type,
} from "../../styles/theme";
import { guidePicture } from "./guidePictures";

const Head = styled(Chapter)`
  padding: calc(${space.section} * var(--sy)) 0;
  .head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(${space.xl}, 5vw, 110px);
    align-items: center;
  }
  .back {
    /* Its own line: inline, it sat on one baseline with the eyebrow after it. */
    display: flex;
    width: fit-content;
    align-items: center;
    min-height: 44px;
    margin-bottom: ${space.lg};
    font: 500 ${type.ui} / 1 ${font.ui};
    color: var(--muted);
    text-underline-offset: 5px;
  }
  /* Article titles are long (57-78 characters): display.lg on a wide
     measure keeps them to four lines at 390 and three on a desktop. */
  h1 {
    max-width: 24ch;
    font-size: ${display.lg};
    line-height: 1.06;
  }
  .thesis {
    margin-top: ${space.lg};
    font: 400 ${type.lead} / 1.5 ${font.text};
    color: var(--text);
    max-width: ${measure.lead};
  }
  .byline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${space.xs} ${space.lg};
    margin-top: ${space.lg};
    padding-top: ${space.md};
    border-top: 1px solid var(--line);
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: var(--muted);
  }
  .byline button {
    min-height: 44px;
    padding: 0;
    border: 0;
    background: none;
    font: 600 ${type.ui} / 1 ${font.ui};
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 5px;
    cursor: pointer;
  }
  /* The photograph as a crop (spec §3.5): 3:2, the md radius, no border.
     Capped by height too, so it is never taller than a laptop window. */
  .lead-image {
    width: 100%;
    max-width: calc(64svh * 3 / 2);
    justify-self: end;
  }
  .lead-image img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
  ${media.md} {
    .head {
      grid-template-columns: minmax(0, 1fr);
      gap: ${space.lg};
    }
    .lead-image {
      order: -1;
      justify-self: stretch;
      max-width: none;
    }
  }
  /* Phones (spec §4D, ≤ 6 screens at 390): the photograph sits right under
     the bar as a wider 16:10 crop, and the head's spacing tightens. The
     guide's words are untouched. */
  ${media.sm} {
    padding: ${space.md} 0 calc(${space.xl} * var(--sy));
    .back {
      margin-bottom: ${space.xs};
    }
    .lead-image img {
      aspect-ratio: 16 / 10;
    }
  }
`;

/* The article on the ivory page: the contents rail on the left, the text
   centred in the rest at a reading measure, set in EB Garamond (jury 1 #15). */
const Article = styled(Chapter)`
  padding: calc(${space.section} * var(--sy)) 0;
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
    margin-bottom: ${space.xs};
    font: 600 ${type.label} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    color: var(--label);
  }
  nav a {
    display: block;
    min-height: 44px;
    padding: 11px 0;
    font: 400 ${type.ui} / 1.4 ${font.ui};
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
    margin-bottom: ${space.md};
  }
  .text section p {
    font: 400 ${type.read} / 1.7 ${font.text};
    color: ${color.body};
  }
  .text section p + p {
    margin-top: ${space.md};
  }
  .view {
    margin-top: clamp(48px, 5vw, 72px);
    padding: clamp(28px, 3vw, 44px);
    background: ${color.ivoryDeep};
  }
  .view p {
    font: 400 ${type.read} / 1.65 ${font.text};
    color: ${color.body};
  }
  .view p + p {
    margin-top: 14px;
  }
  .view a {
    margin-top: ${space.lg};
  }
  .source {
    margin-top: ${space.lg};
    font: 400 ${type.note} / 1.6 ${font.ui};
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
    gap: ${space.lg};
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
  /* The primary carries the arrow; the related rows are plain links. */
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
  /* Phones: the close (the guide's question and the related guides) sits
     a little nearer the text it closes. */
  ${media.sm} {
    padding: calc(${space.xl} * var(--sy)) 0;
    .view {
      margin-top: ${space.xl};
    }
    .closing {
      margin-top: ${space.xl};
    }
    .related {
      margin-top: ${space.xl};
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
  const picture = guidePicture(g);
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
      <Head ref={ref} $ground="paper">
        <Frame className="head">
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
          <div className="lead-image">
            <Picture
              id={picture.id}
              alt={picture.alt}
              frame="crop"
              priority
              sizes="(max-width: 860px) calc(100vw - 32px), 46vw"
            />
          </div>
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
