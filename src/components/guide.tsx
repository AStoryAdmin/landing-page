import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Seo from './ui/Seo';
import MissionPhoto from './ui/MissionPhoto';
import NotFound from './notFound';
import guides from '../lib/guides.json';
import {
    SITE,
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
} from '../lib/seo';
import { Chapter, Width, Kicker } from './ui/narrative.styles';
import { Actions, Button, ButtonEl } from './ui/primitives';
import { color, font, media } from '../styles/theme';
const Layout = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 240px) minmax(0, 760px);
    gap: 7%;
    justify-content: center;
    aside {
        font-size: 0.9375rem;
    }
    aside a {
        display: block;
        padding: 8px 0;
        min-height: 40px;
        text-decoration: none;
    }
    aside a:hover {
        text-decoration: underline;
    }
    aside > p {
        font-size: 0.8125rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        margin: 32px 0 12px;
    }
    article {
        min-width: 0;
    }
    h1 {
        font: 500 clamp(2.6rem, 4.5vw, 4.25rem) / 1.08 ${font.body};
        letter-spacing: -0.04em;
    }
    .thesis {
        font: 400 clamp(1.25rem, 1.7vw, 1.5rem) / 1.55 ${font.body};
        margin: 28px 0;
    }
    .byline {
        font-size: 0.875rem;
        color: ${color.bodyMuted};
        margin-bottom: 30px;
    }
    figure {
        margin: 36px 0;
    }
    section {
        margin: 44px 0;
    }
    h2 {
        font: 500 clamp(1.65rem, 2.5vw, 2.25rem) / 1.2 ${font.body};
        letter-spacing: -0.025em;
        margin-bottom: 24px;
    }
    section p + p {
        margin-top: 22px;
    }
    .example {
        padding: 28px;
        border-left: 2px solid ${color.accent};
        background: ${color.paper};
        font: 400 1.25rem/1.6 ${font.display};
    }
    .example strong {
        font: 500 0.8125rem ${font.body};
        letter-spacing: 0.1em;
        display: block;
        margin-bottom: 14px;
        text-transform: uppercase;
    }
    .point {
        border-top: 1px solid ${color.primaryLineStrong};
        padding-top: 32px;
    }
    .share-note {
        font-size: 0.9375rem;
        overflow-wrap: anywhere;
    }
    .question {
        background: ${color.primaryDeep};
        color: ${color.onDark};
        padding: 36px;
        margin: 40px 0;
    }
    .question blockquote {
        font: 400 clamp(1.7rem, 3vw, 2.6rem) / 1.25 ${font.display};
        margin: 20px 0 0;
    }
    .related {
        border-top: 1px solid ${color.primaryLineStrong};
        padding-top: 32px;
    }
    .related a {
        display: flex;
        align-items: center;
        min-height: 44px;
        margin: 20px 0;
        color: ${color.accentText};
        text-underline-offset: 4px;
    }
    .source {
        font-size: 0.9375rem;
    }
    ${media.md} {
        grid-template-columns: 1fr;
        aside {
            display: none;
        }
    }
`;
export default function Guide() {
    const { slug } = useParams();
    const g = guides.find((x) => x.slug === slug);
    const [notice, setNotice] = useState('');
    if (!g) return <NotFound />;
    const path = '/guides/' + g.slug;
    const url = SITE.url + path;
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setNotice('Link copied.');
        } catch {
            setNotice('Copy this link: ' + url);
        }
    };
    const share = async () => {
        try {
            await navigator.share({ title: g.title, url });
        } catch (e) {
            if (!(e instanceof Error) || e.name !== 'AbortError')
                setNotice('Sharing is unavailable here. Use Copy link.');
        }
    };
    return (
        <>
            <Seo
                title={g.title + ' | A Story'}
                path={path}
                image={'/og/' + g.slug + '.jpg'}
                description={g.description}
                schema={[
                    organizationSchema(),
                    websiteSchema(),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Guides', path: '/guides' },
                        { name: g.title, path },
                    ]),
                    {
                        '@type': 'Article',
                        '@id': url + '#article',
                        headline: g.title,
                        description: g.description,
                        datePublished: g.date,
                        dateModified: g.date,
                        author: {
                            '@type': 'Organization',
                            name: g.author,
                            url: SITE.url + '/our-story',
                        },
                        publisher: { '@id': SITE.url + '/#organization' },
                        image: SITE.url + '/og/' + g.slug + '.jpg',
                        mainEntityOfPage: url,
                    },
                ]}
            />
            <Chapter>
                <Width>
                    <Layout>
                        <aside aria-label="In this guide">
                            <Link to="/guides">All guides</Link>
                            <p>In this guide</p>
                            {g.sections.map((s, i) => (
                                <a key={s.heading} href={'#part-' + (i + 1)}>
                                    {s.heading}
                                </a>
                            ))}
                            <a href="#point-of-view">
                                The A Story point of view
                            </a>
                        </aside>
                        <article>
                            <Kicker>{g.category}</Kicker>
                            <h1>{g.title}</h1>
                            <p className="thesis">{g.thesis}</p>
                            <p className="byline">
                                By {g.author} ·{' '}
                                <time dateTime={g.date}>
                                    September 15, 2026
                                </time>
                            </p>
                            <Actions>
                                <ButtonEl $variant="outline" onClick={copy}>
                                    Copy link
                                </ButtonEl>
                                {typeof navigator.share === 'function' && (
                                    <ButtonEl
                                        $variant="outline"
                                        onClick={share}
                                    >
                                        Share
                                    </ButtonEl>
                                )}
                            </Actions>
                            <p className="share-note" role="status">
                                {notice}
                            </p>
                            <MissionPhoto
                                name={g.image}
                                alt={g.alt}
                                priority
                                sizes="(max-width:860px) 100vw, 760px"
                            />
                            <div className="example">
                                <strong>A place to begin</strong>
                                {g.example}
                            </div>
                            {g.sections.map((s, i) => (
                                <section id={'part-' + (i + 1)} key={s.heading}>
                                    <h2>{s.heading}</h2>
                                    {s.paragraphs.map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </section>
                            ))}
                            <section className="point" id="point-of-view">
                                <Kicker>The A Story point of view</Kicker>
                                <p>{g.point}</p>
                                <p>{g.product}</p>
                                <Actions>
                                    <Button to={g.destination}>
                                        {g.action}
                                    </Button>
                                </Actions>
                            </section>
                            {g.source && (
                                <p className="source">
                                    Further reading:{' '}
                                    <a href={g.source.url}>{g.source.label}</a>.
                                </p>
                            )}
                            <div className="question">
                                <Kicker>A question worth asking</Kicker>
                                <blockquote>“{g.question}”</blockquote>
                            </div>
                            <div className="related">
                                <h2>Keep exploring</h2>
                                {g.related.map((slug) => {
                                    const next = guides.find(
                                        (x) => x.slug === slug,
                                    );
                                    return next ? (
                                        <Link key={slug} to={'/guides/' + slug}>
                                            {next.title}
                                        </Link>
                                    ) : null;
                                })}
                            </div>
                        </article>
                    </Layout>
                </Width>
            </Chapter>
        </>
    );
}
