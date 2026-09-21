import { useId, useState, type KeyboardEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { ProductHome, MemoryDetail } from './ProductViews';
import { SharedRecord } from './SharedVoices';
import {
    Chapter,
    Width,
    Headline,
    Intro,
    Kicker,
} from '../ui/narrative.styles';
import { TextLink } from '../ui/primitives';
import { color, font, media } from '../../styles/theme';

const layerIn = keyframes`
    from { opacity: .35; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
`;
const Theater = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 7%;
    align-items: center;
    margin-top: 44px;
    .product-stage {
        min-width: 0;
        min-height: 690px;
        background: ${color.ivoryDeep};
        padding: 36px;
        display: grid;
        align-items: center;
        border-radius: 3px;
    }
    .product-stage > div {
        animation: ${layerIn} 260ms ease-out both;
        max-width: 430px;
    }
    .record {
        background: ${color.paperPure};
        padding: 28px;
        color: ${color.ink};
    }
    .interpretation {
        animation: ${layerIn} 260ms ease-out both;
    }
    .interpretation h3 {
        font: 400 clamp(2rem, 3vw, 3rem) / 1.15 ${font.display};
        letter-spacing: -0.03em;
        max-width: 16ch;
        margin: 20px 0;
    }
    .interpretation > p {
        max-width: 36ch;
    }
    .annotation {
        border-top: 1px solid ${color.primaryLineStrong};
        margin-top: 32px;
        padding-top: 20px;
        font-size: 0.9375rem;
    }
    .annotation span {
        display: block;
        font-size: 0.8125rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 8px;
    }
    a {
        display: inline-flex;
        margin-top: 26px;
    }
    ${media.motion} {
        .product-stage > div,
        .interpretation {
            animation: none;
        }
    }
    ${media.md} {
        grid-template-columns: 1fr 1fr;
        gap: 28px;
        .product-stage {
            padding: 22px 12px;
        }
        .interpretation h3 {
            font-size: 2.3rem;
        }
    }
    ${media.sm} {
        grid-template-columns: 1fr;
        .product-stage {
            min-height: 650px;
            padding: 20px 12px;
        }
        .interpretation {
            padding-top: 4px;
        }
        .interpretation h3 {
            max-width: none;
        }
        .annotation {
            margin-top: 20px;
        }
    }
`;
const StepTabs = styled.div`
    display: flex;
    border-bottom: 1px solid ${color.primaryLineStrong};
    gap: 0;
    margin-top: 32px;
    button {
        flex: 1;
        min-height: 56px;
        border: 0;
        border-bottom: 3px solid transparent;
        background: transparent;
        color: ${color.ink};
        font: 500 1.0625rem/1.25 ${font.body};
        padding: 14px 12px;
        cursor: pointer;
        text-align: left;
    }
    button[aria-selected='true'] {
        border-color: ${color.accent};
        color: ${color.accentText};
    }
    button span {
        font-size: 0.8125rem;
        margin-right: 12px;
    }
    ${media.sm} {
        button {
            font-size: 0.9375rem;
            padding: 14px 5px;
        }
        button span {
            display: block;
            margin-bottom: 6px;
        }
    }
`;
const stories = [
    {
        label: 'Ask',
        title: 'Start with one ordinary afternoon.',
        text: 'A question gives you somewhere to begin. Speak naturally, or write when that feels easier.',
        detail: 'What do you remember about this afternoon?',
        note: 'Today’s question',
    },
    {
        label: 'Memory',
        title: 'The words become something you can return to.',
        text: 'A readable memory sits beside the photograph and the words that gave it meaning. Switch between the summary and the original account.',
        detail: 'Summer 1975 · Eleanor · Love & family',
        note: 'The same memory, kept in context',
    },
    {
        label: 'Shared record',
        title: 'Leave room for another version.',
        text: 'Another person can add what they remember. Their name stays with their account, even when the feelings are different.',
        detail: 'Our family stories / Love & family / An afternoon at the lake',
        note: 'A place in the archive',
    },
];
export default function HomeJourney() {
    const [step, setStep] = useState(0);
    const id = useId();
    const keys = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
        const n =
            e.key === 'ArrowRight'
                ? (i + 1) % 3
                : e.key === 'ArrowLeft'
                  ? (i + 2) % 3
                  : e.key === 'Home'
                    ? 0
                    : e.key === 'End'
                      ? 2
                      : -1;
        if (n >= 0) {
            e.preventDefault();
            setStep(n);
            document.getElementById(`${id}-tab-${n}`)?.focus();
        }
    };
    return (
        <Chapter $tone="paper" id="in-action">
            <Width>
                <Kicker>From a question to a shared memory</Kicker>
                <Headline>
                    <span style={{ color: color.accentText }}>
                        One question
                    </span>{' '}
                    can open a whole life.
                </Headline>
                <Intro>
                    Follow one ordinary afternoon from a question to a memory
                    that another person can add to.
                </Intro>
                <StepTabs role="tablist" aria-label="A memory in three steps">
                    {stories.map((s, i) => (
                        <button
                            key={s.label}
                            id={`${id}-tab-${i}`}
                            role="tab"
                            aria-controls={`${id}-panel`}
                            aria-selected={step === i}
                            tabIndex={step === i ? 0 : -1}
                            onKeyDown={(e) => keys(e, i)}
                            onClick={() => setStep(i)}
                        >
                            <span>0{i + 1}</span>
                            {s.label}
                        </button>
                    ))}
                </StepTabs>
                <Theater
                    role="tabpanel"
                    id={`${id}-panel`}
                    aria-labelledby={`${id}-tab-${step}`}
                >
                    <div key={`record-${step}`} className="product-stage">
                        {step === 0 ? (
                            <ProductHome
                                onTalk={() => setStep(1)}
                                onWrite={() => setStep(1)}
                                onMemory={() => setStep(1)}
                                onArchive={() => setStep(2)}
                            />
                        ) : step === 1 ? (
                            <MemoryDetail />
                        ) : (
                            <div className="record">
                                <SharedRecord />
                            </div>
                        )}
                    </div>
                    <div key={`explanation-${step}`} className="interpretation">
                        <Kicker>
                            0{step + 1} / {stories[step].label}
                        </Kicker>
                        <h3>{stories[step].title}</h3>
                        <p>{stories[step].text}</p>
                        <p className="annotation">
                            <span>{stories[step].note}</span>
                            {stories[step].detail}
                        </p>
                        <TextLink to="/how-it-works">
                            Follow the complete journey
                        </TextLink>
                    </div>
                </Theater>
            </Width>
        </Chapter>
    );
}
