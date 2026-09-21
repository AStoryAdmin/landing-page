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
import { color, display, font, media } from "../../styles/theme";

/** Guides whose photograph carries the subject; the others read better without one. */
const PICTURED = ["33", "23", "30", "21"];

const Article = styled(Chapter)`
  padding: clamp(64px, 8vw, 120px) 0 clamp(80px, 9vw, 140px);
  .back {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-bottom: 28px;
    font: 500 15px/1 ${font.body};
    color: ${color.bodyMuted};
    text-underline-offset: 5px;
  }
  h1 {
    max-width: 22ch;
    font-size: ${display.lg};
  }
  .thesis {
    margin-top: 24px;
    font: 400 clamp(1.15rem, 1.02rem + 0.4vw, 1.35rem) / 1.55 ${font.body};
    color: ${color.body};
    max-width: 52ch;
  }
  .byline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 24px;
    margin-top: 24px;
    padding-top: 18px;
    border-top: 1px solid ${color.primaryLine};
    font: 400 15px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .byline button {
    min-height: 44px;
    padding: 0;
    border: 0;
    background: none;
    font: 600 15px/1 ${font.body};
    color: ${color.primary};
    text-decoration: underline;
    text-underline-offset: 5px;
    cursor: pointer;
  }
  .lead-image {
    margin-top: clamp(40px, 5vw, 72px);
    max-width: 980px;
  }
  .body {
    display: grid;
    grid-template-columns: minmax(0, 0.32fr) minmax(0, 1fr);
    gap: clamp(28px, 6vw, 100px);
    margin-top: clamp(48px, 6vw, 88px);
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
    font: 600 12px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  nav a {
    display: block;
    padding: 8px 0;
    font: 400 15px/1.4 ${font.body};
    color: ${color.body};
    text-decoration: none;
    border-top: 1px solid ${color.primaryLine};
  }
  nav a:hover {
    color: ${color.accentText};
  }
  .text {
    max-width: 68ch;
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
    font: 400 19px/1.75 ${font.body};
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
    font: 400 18px/1.7 ${font.body};
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
    font: 400 15px/1.6 ${font.body};
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
  .related a:hover {
    color: ${color.accentText};
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
  }
`;

export default function Guide() {
  const { slug } = useParams();
  const g = guides.find((x) => x.slug === slug);
  const [notice, setNotice] = useState("");
  const ref = useReveals<HTMLElement>();
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
  return (
    <Article
      ref={ref}
      $ground="ivory"
      as="article"
      aria-labelledby="guide-title"
    >
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
      <Frame>
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
        {PICTURED.includes(g.image) && (
          <div className="lead-image" data-rise>
            <Print
              id={g.image}
              alt={g.alt}
              priority
              sizes="(max-width: 860px) 100vw, 980px"
            />
          </div>
        )}

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
  );
}
