import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EditorialSeo from './ui/EditorialSeo';
import MissionPhoto from './ui/MissionPhoto';
import {
    Chapter,
    Width,
    HeroTitle,
    Intro,
    Kicker,
} from './ui/narrative.styles';
import guides from '../lib/guides.json';
import { color, font, media } from '../styles/theme';
const List = styled.div`
    margin-top: 48px;
    article {
        display: grid;
        grid-template-columns: 90px 1.25fr 1fr;
        gap: 40px;
        align-items: start;
        border-top: 1px solid ${color.primaryLineStrong};
        padding: 32px 0;
    }
    h2 {
        font: 500 clamp(1.5rem, 2.5vw, 2.4rem) / 1.16 ${font.body};
        letter-spacing: -0.025em;
    }
    h2 a {
        text-decoration: none;
    }
    h2 a:hover {
        color: ${color.accentText};
    }
    p {
        font-size: 1.0625rem;
    }
    small {
        font-size: 0.8125rem;
        display: block;
        color: ${color.bodyMuted};
        margin-bottom: 12px;
    }
    .number {
        font: 400 1.25rem ${font.display};
        color: ${color.accentText};
    }
    ${media.md} {
        article {
            grid-template-columns: 44px 1fr;
            gap: 20px;
        }
        article > p {
            grid-column: 2;
        }
    }
`;
const Feature = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 6%;
    align-items: center;
    margin-top: 48px;
    blockquote {
        font: 400 clamp(2rem, 3.5vw, 3.7rem) / 1.14 ${font.display};
        letter-spacing: -0.035em;
        margin: 0;
    }
    ${media.sm} {
        grid-template-columns: 1fr;
        gap: 28px;
    }
`;
export default function Guides() {
    return (
        <>
            <EditorialSeo
                title="Questions Worth Asking | A Story Guides"
                path="/guides"
                description="Practical guides to family conversations, unlabeled photographs, different recollections, care-community participation, and organizational memory."
            />
            <Chapter>
                <Width>
                    <Kicker>A Story guides</Kicker>
                    <HeroTitle>Questions worth asking.</HeroTitle>
                    <Intro>
                        Small ways to begin a conversation—and thoughtful ways
                        to keep what follows.
                    </Intro>
                    <Feature>
                        <MissionPhoto
                            name="21"
                            alt="The ordinary work of preparing lunch at a kitchen counter"
                            priority
                        />
                        <blockquote>
                            “What did an ordinary Sunday look like in your
                            house?”
                        </blockquote>
                    </Feature>
                    <List>
                        {guides.map((g, i) => (
                            <article key={g.slug}>
                                <span className="number">0{i + 1}</span>
                                <div>
                                    <small>{g.category}</small>
                                    <h2>
                                        <Link to={'/guides/' + g.slug}>
                                            {g.title}
                                        </Link>
                                    </h2>
                                </div>
                                <p>{g.thesis}</p>
                            </article>
                        ))}
                    </List>
                </Width>
            </Chapter>
        </>
    );
}
