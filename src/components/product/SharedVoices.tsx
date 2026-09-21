import { useState } from 'react';
import styled from 'styled-components';
import { sampleMemory } from '../../lib/sampleMemory';
import { color, font } from '../../styles/theme';
import { ButtonEl } from '../ui/primitives';

const Voices = styled.div<{ $dark: boolean }>`
    color: ${({ $dark }) => ($dark ? color.onDark : color.ink)};
    blockquote {
        margin: 0;
        padding: 22px 0;
        border-bottom: 1px solid
            ${({ $dark }) => ($dark ? color.onDarkLine : color.primaryLine)};
    }
    blockquote:first-child {
        padding-top: 0;
    }
    blockquote p {
        font: 400 clamp(1.25rem, 1rem + 0.5vw, 1.625rem)/1.45 ${font.display};
    }
    cite {
        display: block;
        font: 500 0.875rem/1.55 ${font.body};
        margin-top: 12px;
        color: ${({ $dark }) => ($dark ? color.gold : color.bodyMuted)};
    }
    h3 {
        font: 600 1.5rem/1.3 ${font.body};
        margin-bottom: 10px;
        color: inherit;
    }
    > p {
        margin: 12px 0 24px;
    }
    > button {
        margin-top: 28px;
    }
`;
const Record = styled.article`
    h3 {
        font: 600 1.5rem/1.3 ${font.body};
        margin-bottom: 12px;
    }
    > p {
        margin-bottom: 20px;
    }
    blockquote {
        margin: 0;
        padding: 22px 0;
        border-bottom: 1px solid ${color.primaryLine};
    }
    blockquote p {
        font: 400 1.375rem/1.45 ${font.display};
    }
    cite {
        display: block;
        margin-top: 12px;
        font: 500 0.875rem/1.5 ${font.body};
    }
`;
export function SharedRecord() {
    return (
        <Record aria-label="Shared memory with separate attributions">
            <h3>{sampleMemory.title}</h3>
            <p>{sampleMemory.date}</p>
            <p>
                The same afternoon holds different feelings. Each account stays
                attributed; none resolves the others.
            </p>
            {sampleMemory.voices.map((voice) => (
                <blockquote key={voice.name}>
                    <p>“{voice.quote}”</p>
                    <cite>
                        {voice.name} · {voice.kind}
                    </cite>
                </blockquote>
            ))}
        </Record>
    );
}
export default function SharedVoices({
    dark = false,
    initialShared = false,
}: {
    dark?: boolean;
    initialShared?: boolean;
}) {
    const [shared, setShared] = useState(initialShared);
    return (
        <Voices $dark={dark}>
            {shared ? (
                <SharedRecord />
            ) : (
                sampleMemory.voices.map((voice) => (
                    <blockquote key={voice.name}>
                        <p>“{voice.quote}”</p>
                        <cite>
                            {voice.name} · {voice.relationship}
                            <br />
                            {voice.kind}
                        </cite>
                    </blockquote>
                ))
            )}
            <ButtonEl
                $variant={dark ? 'onDark' : 'outline'}
                onClick={() => setShared(!shared)}
            >
                {shared ? 'See the individual voices' : 'See the shared memory'}
            </ButtonEl>
            <span className="sr-only" role="status">
                {shared
                    ? 'Shared record. All three attributions are retained.'
                    : 'Three individual recollections.'}
            </span>
        </Voices>
    );
}
