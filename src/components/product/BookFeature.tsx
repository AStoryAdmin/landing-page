import { useState } from 'react';
import styled from 'styled-components';
import MissionPhoto from '../ui/MissionPhoto';
import { Actions, ButtonEl, TextLink } from '../ui/primitives';
import {
    Chapter,
    Width,
    Headline,
    Intro,
    Kicker,
    Two,
} from '../ui/narrative.styles';
import { color, media } from '../../styles/theme';
import BookReader from './BookReader';
const Stage = styled.div`
    .object {
        display: grid;
        align-items: center;
        aspect-ratio: 1.3;
        filter: drop-shadow(0 16px 14px #3b291d12);
    }
    .object figure {
        grid-area: 1/1;
        transition:
            opacity 0.45s,
            transform 0.65s;
    }
    .object figure.hidden {
        opacity: 0;
        transform: translateY(10px);
        pointer-events: none;
    }
    .switch {
        display: flex;
        justify-content: center;
        gap: 24px;
    }
    .switch button {
        border: 0;
        border-bottom: 2px solid transparent;
        min-height: 44px;
        background: none;
        color: ${color.ink};
        cursor: pointer;
        font-size: 0.9375rem;
    }
    .switch button[aria-pressed='true'] {
        border-color: ${color.accent};
    }
    ${media.motion} {
        .object figure {
            transition: none;
        }
    }
`;
export default function BookFeature({
    journey = false,
}: {
    journey?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [spread, setSpread] = useState(false);
    return (
        <Chapter id="book">
            <Width>
                <Two $ratio="1.35fr 1fr">
                    <Stage>
                        <div className="object">
                            <MissionPhoto
                                className={spread ? 'hidden' : ''}
                                name="38"
                                alt="The teal A Story volume"
                                sizes="(max-width:860px) 100vw, 60vw"
                            />
                            <MissionPhoto
                                className={!spread ? 'hidden' : ''}
                                name="37"
                                alt="The A Story volume open to its paper pages"
                                sizes="(max-width:860px) 100vw, 60vw"
                            />
                        </div>
                        <div className="switch" aria-label="Book views">
                            <button
                                aria-pressed={!spread}
                                onClick={() => setSpread(false)}
                            >
                                The volume
                            </button>
                            <button
                                aria-pressed={spread}
                                onClick={() => setSpread(true)}
                            >
                                Open pages
                            </button>
                        </div>
                    </Stage>
                    <div>
                        <Kicker>
                            {journey
                                ? 'From archive to volume'
                                : 'A physical chapter'}
                        </Kicker>
                        <Headline>
                            {journey ? (
                                <>
                                    Keep it digital.
                                    <br />
                                    Print a chapter when you want.
                                </>
                            ) : (
                                <>
                                    A chapter you can hold.
                                    <br />A story that{' '}
                                    <span style={{ color: color.accentText }}>
                                        keeps going.
                                    </span>
                                </>
                            )}
                        </Headline>
                        <Intro>
                            {journey
                                ? 'Choose memories and photographs for one printed volume. You can return to the archive, add another story, and print a later chapter.'
                                : 'Choose a chapter for print when you’re ready. The digital archive remains open for everything still to come.'}
                        </Intro>
                        <Actions>
                            <ButtonEl onClick={() => setOpen(true)}>
                                Look inside
                            </ButtonEl>
                            <TextLink to="/pricing#book">Book pricing</TextLink>
                        </Actions>
                    </div>
                </Two>
            </Width>
            {open && <BookReader onClose={() => setOpen(false)} />}
        </Chapter>
    );
}
