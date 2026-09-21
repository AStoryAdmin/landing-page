import { useState } from 'react';
import styled from 'styled-components';
import { color, font, media } from '../../styles/theme';
import { sampleMemory } from '../../lib/sampleMemory';
import {
    Chapter,
    Width,
    Headline,
    Intro,
    Kicker,
} from '../ui/narrative.styles';
const Desk = styled.div`
    margin-top: 44px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    background: ${color.paper};
    color: ${color.ink};
    .index {
        background: ${color.ivoryDeep};
        padding: 36px;
        border-right: 1px solid ${color.primaryLineStrong};
    }
    .index h3 {
        font: 500 1.8rem/1.2 ${font.body};
        letter-spacing: -0.035em;
        margin: 16px 0;
    }
    .index p {
        font-size: 1rem;
        margin: 12px 0;
    }
    .index dl {
        margin-top: 32px;
        font-size: 0.875rem;
        display: grid;
        grid-template-columns: 90px 1fr;
        gap: 14px;
    }
    dt {
        color: ${color.bodyMuted};
    }
    dd {
        margin: 0;
    }
    .contents {
        padding: 36px 40px;
        min-height: 380px;
    }
    .switch {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        border-bottom: 1px solid ${color.primaryLineStrong};
    }
    .switch button {
        min-height: 48px;
        color: ${color.ink};
        border: 0;
        border-bottom: 2px solid transparent;
        padding: 8px 4px;
        background: transparent;
        cursor: pointer;
        font-size: 1rem;
    }
    .switch button[aria-pressed='true'] {
        border-color: ${color.accent};
        color: ${color.accentText};
    }
    blockquote {
        font: 400 clamp(1.5rem, 2.4vw, 2.3rem) / 1.45 ${font.display};
        margin: 28px 0;
    }
    .contents p {
        margin: 24px 0;
        font-size: 1.0625rem;
    }
    .stamp {
        font-size: 0.8125rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    ${media.sm} {
        grid-template-columns: 1fr;
        .index {
            padding: 26px;
            border-right: 0;
        }
        .index dl {
            margin-top: 22px;
        }
        .contents {
            padding: 26px;
            min-height: 340px;
        }
    }
`;
export function RecordLayers() {
    const [layer, setLayer] = useState('Original words');
    return (
        <Desk>
            <div className="index">
                <span className="stamp">Love & family / 01</span>
                <h3>An afternoon at the lake</h3>
                <p>{sampleMemory.summary}</p>
                <dl>
                    <dt>When</dt>
                    <dd>Summer 1975 · approximate</dd>
                    <dt>Who</dt>
                    <dd>Eleanor, Daniel, Maya</dd>
                    <dt>Place</dt>
                    <dd>The family lake</dd>
                    <dt>Attached</dt>
                    <dd>Photograph · 3 recollections</dd>
                </dl>
            </div>
            <div className="contents">
                <div className="switch" aria-label="Layers of a memory">
                    {['Summary', 'Original words', 'Voice'].map((x) => (
                        <button
                            key={x}
                            aria-pressed={layer === x}
                            onClick={() => setLayer(x)}
                        >
                            {x}
                        </button>
                    ))}
                </div>
                {layer === 'Summary' ? (
                    <>
                        <p className="stamp">The way back into a memory</p>
                        <blockquote>{sampleMemory.summary}</blockquote>
                        <p>
                            A short account to help you find the afternoon
                            again.
                        </p>
                    </>
                ) : layer === 'Original words' ? (
                    <>
                        <p className="stamp">
                            Eleanor / Firsthand recollection
                        </p>
                        <blockquote>
                            “{sampleMemory.voices[0].quote}”
                        </blockquote>
                        <p>“{sampleMemory.response}”</p>
                    </>
                ) : (
                    <>
                        <p className="stamp">A voice has its own place</p>
                        <blockquote>
                            The pauses. The laugh. The way they said it.
                        </blockquote>
                        <p>
                            Voice highlights sit with the memory. This
                            demonstration has no playable recording; Eleanor’s
                            words are available in the transcript.
                        </p>
                    </>
                )}
            </div>
        </Desk>
    );
}
export default function OriginalRecord() {
    return (
        <Chapter $tone="brown">
            <Width>
                <Kicker>More than a summary</Kicker>
                <Headline>
                    Keep the summary.
                    <br />
                    Keep the <em>original words.</em>
                    <br />
                    Keep the voice.
                </Headline>
                <Intro>
                    The summary helps you return to the memory. It never
                    replaces what was actually said.
                </Intro>
                <RecordLayers />
            </Width>
        </Chapter>
    );
}
