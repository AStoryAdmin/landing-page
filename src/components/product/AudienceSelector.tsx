import { useId, useState, type KeyboardEvent } from 'react';
import styled from 'styled-components';
import MissionPhoto from '../ui/MissionPhoto';
import CarePhoto from '../ui/CarePhoto';
import { Chapter, Width, Headline, Kicker } from '../ui/narrative.styles';
import { TextLink } from '../ui/primitives';
import { color, font, media } from '../../styles/theme';
const Grid = styled.div`
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 7%;
    margin-top: 48px;
    .index {
        display: flex;
        flex-direction: column;
    }
    .index button {
        border: 0;
        border-top: 1px solid ${color.primaryLineStrong};
        background: none;
        min-height: 96px;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 20px;
        font: 400 clamp(1.5rem, 2.1vw, 2rem) / 1.2 ${font.body};
        color: ${color.ink};
        cursor: pointer;
        padding: 22px 0;
    }
    .index button span {
        font-size: 0.875rem;
        min-width: 24px;
    }
    .index button[aria-selected='true'] {
        color: ${color.accentText};
    }
    .index button[aria-selected='true'] span {
        border-bottom: 2px solid ${color.accent};
    }
    .stage {
        min-width: 0;
    }
    .stage figure {
        height: 340px;
    }
    .stage img {
        width: 100%;
        height: 340px;
        object-fit: cover;
    }
    .stage h3 {
        font: 500 1.5rem/1.3 ${font.body};
        margin: 26px 0 12px;
    }
    .stage p {
        max-width: 47ch;
        margin-bottom: 20px;
    }
    ${media.md} {
        gap: 32px;
        grid-template-columns: 4fr 6fr;
        .index button {
            font-size: 1.5rem;
        }
    }
    ${media.sm} {
        grid-template-columns: 1fr;
        gap: 24px;
        .index {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 16px;
        }
        .index button {
            font-size: 1.125rem;
            gap: 10px;
            min-height: 80px;
        }
        .stage figure,
        .stage img {
            height: 290px;
        }
    }
`;
const audiences = [
    {
        name: 'For families',
        image: '23',
        alt: 'Family members looking through old photographs together',
        title: 'Help someone you love tell the story.',
        text: 'Set up together, then let them speak. Bring an unlabeled photograph to your next conversation and add the names only they remember.',
        link: '/for-families',
        action: 'Begin with your family',
    },
    {
        name: 'Tell your own story',
        image: '31',
        alt: 'An archival portrait with a life beyond the frame',
        title: 'Start where your mind goes first.',
        text: 'Talk or write about a person, place, or ordinary day. There is no first chapter you have to finish before beginning another.',
        link: '/for-families#your-own-story',
        action: 'Make room for your own story',
    },
    {
        name: 'Care communities',
        image: 'care',
        alt: '',
        title: 'Make room for the whole person.',
        text: 'A resident chooses a photograph and tells the story behind it. Family can add context; staff can help coordinate a comfortable start.',
        link: '/care-communities',
        action: 'Explore care communities',
    },
    {
        name: 'Organizations',
        image: '08',
        alt: 'A craftsperson working at an established repair workbench',
        title: 'Keep the knowledge behind the record.',
        text: 'Ask a long-serving colleague why the work was done that way. Keep their experience alongside the documents and photographs.',
        link: '/organizations',
        action: 'Explore organizational stories',
    },
];
export default function AudienceSelector() {
    const [active, setActive] = useState(0);
    const id = useId();
    const a = audiences[active];
    const keys = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
        const n = ['ArrowDown', 'ArrowRight'].includes(e.key)
            ? (i + 1) % 4
            : ['ArrowUp', 'ArrowLeft'].includes(e.key)
              ? (i + 3) % 4
              : e.key === 'Home'
                ? 0
                : e.key === 'End'
                  ? 3
                  : -1;
        if (n >= 0) {
            e.preventDefault();
            setActive(n);
            document.getElementById(`${id}-${n}`)?.focus();
        }
    };
    return (
        <Chapter $tone="paper" id="who">
            <Width>
                <Kicker>Who it’s for</Kicker>
                <Headline>
                    A Story can begin with{' '}
                    <span style={{ color: color.accentText }}>
                        one person—or a whole community.
                    </span>
                </Headline>
                <Grid>
                    <div
                        className="index"
                        role="tablist"
                        aria-label="Who A Story is for"
                        aria-orientation="vertical"
                    >
                        {audiences.map((x, i) => (
                            <button
                                key={x.name}
                                id={`${id}-${i}`}
                                role="tab"
                                aria-controls={`${id}-stage`}
                                aria-selected={active === i}
                                tabIndex={active === i ? 0 : -1}
                                onKeyDown={(e) => keys(e, i)}
                                onClick={() => setActive(i)}
                            >
                                <span>0{i + 1}</span>
                                {x.name}
                            </button>
                        ))}
                    </div>
                    <div
                        className="stage"
                        role="tabpanel"
                        id={`${id}-stage`}
                        aria-labelledby={`${id}-${active}`}
                    >
                        {a.image === 'care' ? (
                            <CarePhoto />
                        ) : (
                            <MissionPhoto name={a.image} alt={a.alt} />
                        )}
                        <h3>{a.title}</h3>
                        <p>{a.text}</p>
                        <TextLink to={a.link}>{a.action}</TextLink>
                    </div>
                </Grid>
            </Width>
        </Chapter>
    );
}
