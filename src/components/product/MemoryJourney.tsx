import {
    forwardRef,
    useId,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { color, font, media, motion } from '../../styles/theme';
import { sampleMemory } from '../../lib/sampleMemory';
import { Actions, ButtonEl } from '../ui/primitives';
import {
    Container,
    FieldLabel,
    Meta,
    QuietButton,
    Section,
    SectionHead,
    SectionTitle,
} from '../ui/resolved.styles';
import MissionPhoto from '../ui/MissionPhoto';
import {
    ArchiveView,
    MemoryDetail,
    CollectionView,
    ProductHome,
} from './ProductViews';
import SharedVoices from './SharedVoices';
const steps = [
    '01 Set up once',
    '02 Talk or write',
    '03 A memory',
    '04 Another voice',
    '05 Keep it together',
];
const explanations = [
    'A collection. A storyteller. A good time to talk.',
    'A thoughtful follow-up makes room for the answer.',
    'The card is a readable layer. The original account stays available.',
    'The same afternoon can hold different feelings.',
    'One memory, kept with everything still being lived.',
];
const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 6px;
    border-bottom: 1px solid ${color.primaryLineStrong};
    margin-bottom: 32px;
    button {
        min-height: 60px;
        padding: 14px 8px;
        font: 500 1.0625rem/1.35 ${font.body};
        color: ${color.body};
        cursor: pointer;
        background: none;
        border: 0;
        border-bottom: 3px solid transparent;
    }
    button[aria-selected='true'] {
        border-bottom-color: ${color.accent};
        color: ${color.ink};
        background: ${color.ivory};
    }
    ${media.sm} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        button {
            min-height: 48px;
        }
        button:last-child {
            grid-column: 1 / -1;
        }
    }
`;
const Stage = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: 48px;
    align-items: start;
    .product {
        min-width: 0;
        padding: 28px;
        background: ${color.ivory};
        border-radius: 20px;
    }
    .explanation {
        padding-top: 24px;
    }
    .explanation h3 {
        font: 500 clamp(1.625rem, 2vw, 2.25rem) / 1.3 ${font.display};
        margin-bottom: 24px;
    }
    .explanation figure {
        margin-top: 28px;
        max-width: 380px;
    }
    .conversation {
        background: ${color.paperPure};
        padding: 32px;
        border: 1px solid ${color.primaryLineStrong};
        border-radius: 20px;
    }
    .conversation h3 {
        font: 600 1.625rem/1.3 ${font.body};
        margin-bottom: 24px;
    }
    .exchange {
        border-top: 1px solid ${color.primaryLine};
        padding: 22px 0;
    }
    .exchange p {
        font: 400 1.375rem/1.5 ${font.display};
        margin-top: 10px;
    }
    .exchange strong {
        font-size: 0.875rem;
        color: ${color.bodyMuted};
    }
    .local-form {
        display: grid;
        gap: 20px;
        background: ${color.paperPure};
        padding: 28px;
        border-radius: 16px;
    }
    ${media.md} {
        grid-template-columns: 1fr;
        gap: 24px;
        .explanation {
            padding: 0;
        }
        .explanation figure {
            max-width: none;
        }
    }
    ${media.sm} {
        .product {
            padding: 12px;
        }
        .conversation,
        .local-form {
            padding: 20px;
        }
    }
`;
const Pager = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid ${color.primaryLine};
    button {
        min-width: 110px;
        transition: background ${motion.fast};
    }
`;
export type MemoryJourneyHandle = {
    open: (
        action: 'question' | 'conversation' | 'write' | 'memory' | 'archive',
    ) => void;
};
const MemoryJourney = forwardRef<MemoryJourneyHandle, { id?: string }>(
    function MemoryJourney({ id = 'memory-journey' }, ref) {
        const [conversationStarted, setConversationStarted] = useState(false);
        const uid = useId();
        const sectionRef = useRef<HTMLElement>(null);
        const [step, setStep] = useState(0);
        const [followUp, setFollowUp] = useState(false);
        const [editing, setEditing] = useState(false);
        const [title, setTitle] = useState<string>(sampleMemory.title);
        const [summary, setSummary] = useState<string>(sampleMemory.summary);
        const [draftTitle, setDraftTitle] = useState<string>(
            sampleMemory.title,
        );
        const [draft, setDraft] = useState<string>(sampleMemory.summary);
        const [contribution, setContribution] = useState('');
        const [added, setAdded] = useState<string[]>([]);
        const [status, setStatus] = useState('');
        const select = (index: number) => {
            setStep(index);
            setEditing(false);
            setStatus(`${steps[index]} selected. ${sampleMemory.title}.`);
        };
        useImperativeHandle(ref, () => ({
            open(action) {
                select(
                    action === 'conversation'
                        ? 1
                        : action === 'memory'
                          ? 2
                          : action === 'archive'
                            ? 4
                            : 0,
                );
                if (action === 'write') setEditing(true);
                sectionRef.current?.scrollIntoView({
                    behavior: window.matchMedia(
                        '(prefers-reduced-motion: reduce)',
                    ).matches
                        ? 'instant'
                        : 'smooth',
                    block: 'start',
                });
            },
        }));
        const edit = () => {
            setDraftTitle(title);
            setDraft(summary);
            setEditing(true);
        };
        return (
            <Section $paper id={id} ref={sectionRef}>
                <Container>
                    <SectionHead>
                        <SectionTitle>
                            Five steps. One growing archive.
                        </SectionTitle>
                        <p>
                            Try the steps, then return to the same memory as it
                            grows.
                        </p>
                    </SectionHead>
                    <Tabs role="tablist" aria-label="Memory journey">
                        {steps.map((label, index) => (
                            <button
                                key={label}
                                id={`${uid}-tab-${index}`}
                                role="tab"
                                aria-selected={step === index}
                                tabIndex={step === index ? 0 : -1}
                                aria-controls={`${uid}-panel`}
                                onClick={() => select(index)}
                                onKeyDown={(event) => {
                                    const next =
                                        event.key === 'ArrowRight'
                                            ? (index + 1) % 5
                                            : event.key === 'ArrowLeft'
                                              ? (index + 4) % 5
                                              : event.key === 'Home'
                                                ? 0
                                                : event.key === 'End'
                                                  ? 4
                                                  : -1;
                                    if (next < 0) return;
                                    event.preventDefault();
                                    select(next);
                                    document
                                        .getElementById(`${uid}-tab-${next}`)
                                        ?.focus();
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </Tabs>
                    <div
                        role="tabpanel"
                        id={`${uid}-panel`}
                        aria-labelledby={`${uid}-tab-${step}`}
                    >
                        <Stage>
                            <div className="product">
                                {editing ? (
                                    <form
                                        className="local-form"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            setTitle(
                                                draftTitle.trim() ||
                                                    sampleMemory.title,
                                            );
                                            setSummary(
                                                draft.trim() ||
                                                    sampleMemory.summary,
                                            );
                                            setEditing(false);
                                            setStep(2);
                                            setStatus(
                                                'Updated in this example only.',
                                            );
                                        }}
                                    >
                                        <h3>Write your Memory</h3>
                                        <Meta>
                                            Local example only. Please use
                                            fictional text.
                                        </Meta>
                                        <FieldLabel>
                                            Memory title
                                            <input
                                                value={draftTitle}
                                                onChange={(event) =>
                                                    setDraftTitle(
                                                        event.target.value,
                                                    )
                                                }
                                                maxLength={100}
                                            />
                                        </FieldLabel>
                                        <FieldLabel>
                                            Your example memory
                                            <textarea
                                                value={draft}
                                                onChange={(event) =>
                                                    setDraft(event.target.value)
                                                }
                                                maxLength={1200}
                                            />
                                        </FieldLabel>
                                        <ButtonEl type="submit">
                                            Keep in this example
                                        </ButtonEl>
                                        <QuietButton
                                            type="button"
                                            onClick={() => {
                                                setDraftTitle(
                                                    sampleMemory.title,
                                                );
                                                setDraft(sampleMemory.summary);
                                            }}
                                        >
                                            Reset example text
                                        </QuietButton>
                                        <QuietButton
                                            type="button"
                                            onClick={() => setEditing(false)}
                                        >
                                            Cancel editing
                                        </QuietButton>
                                    </form>
                                ) : step === 0 ? (
                                    <CollectionView />
                                ) : step === 1 && !conversationStarted ? (
                                    <ProductHome
                                        onTalk={() =>
                                            setConversationStarted(true)
                                        }
                                        onWrite={() => setEditing(true)}
                                        onMemory={() => select(2)}
                                        onArchive={() => select(4)}
                                        recordTitle={title}
                                    />
                                ) : step === 1 ? (
                                    <div className="conversation">
                                        <Meta>
                                            Example conversation · ready to read
                                        </Meta>
                                        <h3>{sampleMemory.title}</h3>
                                        <div className="exchange">
                                            <strong>A Story</strong>
                                            <p>{sampleMemory.question}</p>
                                        </div>
                                        <div className="exchange">
                                            <strong>Eleanor</strong>
                                            <p>
                                                “{sampleMemory.voices[0].quote}”
                                            </p>
                                        </div>
                                        {followUp ? (
                                            <>
                                                <div className="exchange">
                                                    <strong>A Story</strong>
                                                    <p>
                                                        {sampleMemory.followUp}
                                                    </p>
                                                </div>
                                                <div className="exchange">
                                                    <strong>Eleanor</strong>
                                                    <p>
                                                        “{sampleMemory.response}
                                                        ”
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <QuietButton
                                                onClick={() =>
                                                    setFollowUp(true)
                                                }
                                            >
                                                Show the follow-up
                                            </QuietButton>
                                        )}
                                        <Actions>
                                            <QuietButton onClick={edit}>
                                                Write instead
                                            </QuietButton>
                                            <ButtonEl onClick={() => select(2)}>
                                                See the memory
                                            </ButtonEl>
                                        </Actions>
                                    </div>
                                ) : step === 2 ? (
                                    <MemoryDetail
                                        title={title}
                                        summary={summary}
                                        onEdit={edit}
                                    />
                                ) : step === 3 ? (
                                    <div>
                                        <SharedVoices />
                                        {added.map((body, index) => (
                                            <blockquote key={index}>
                                                <p>{body}</p>
                                                <cite>
                                                    You · added to this example
                                                </cite>
                                            </blockquote>
                                        ))}
                                        <form
                                            className="local-form"
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                if (!contribution.trim())
                                                    return;
                                                setAdded([
                                                    ...added,
                                                    contribution.trim(),
                                                ]);
                                                setContribution('');
                                                setStatus(
                                                    'Added to this example.',
                                                );
                                            }}
                                        >
                                            <FieldLabel>
                                                Add another recollection
                                                <textarea
                                                    placeholder="Write a fictional detail…"
                                                    value={contribution}
                                                    onChange={(event) =>
                                                        setContribution(
                                                            event.target.value,
                                                        )
                                                    }
                                                    required
                                                    maxLength={1000}
                                                />
                                            </FieldLabel>
                                            <ButtonEl type="submit">
                                                Add to this example
                                            </ButtonEl>
                                        </form>
                                    </div>
                                ) : (
                                    <ArchiveView
                                        recordTitle={title}
                                        onOpen={() => select(2)}
                                    />
                                )}
                            </div>
                            <aside className="explanation">
                                <Meta>
                                    {sampleMemory.chapter} · {sampleMemory.date}
                                </Meta>
                                <h3>{explanations[step]}</h3>
                                <p>
                                    {step === 2
                                        ? 'Read the summary or return to Eleanor’s original words. Edits here stay inside this local example.'
                                        : step === 3
                                          ? 'Eleanor and Daniel were there. Maya knows the day through their stories. Their perspectives stay separate and attributed.'
                                          : step === 4
                                            ? 'Search for “lake”, choose a chapter, or open the record again. The archive also has room for today.'
                                            : step === 0
                                              ? 'Install A Story with your storyteller, create a collection, and choose a comfortable time for the first call. Try naming a collection here.'
                                              : 'Answer, talk, or take your time. A question is an invitation; you can follow another detail or return later.'}
                                </p>
                                {step === 3 && (
                                    <MissionPhoto
                                        name="34"
                                        alt="Family members comparing photographs and memories together"
                                        sizes="(max-width:860px) 90vw, 35vw"
                                    />
                                )}
                            </aside>
                        </Stage>
                    </div>
                    <Pager>
                        <QuietButton
                            disabled={step === 0}
                            onClick={() => select(step - 1)}
                        >
                            Previous
                        </QuietButton>
                        <span>{step + 1} of 5</span>
                        <QuietButton
                            disabled={step === 4}
                            onClick={() => select(step + 1)}
                        >
                            Next
                        </QuietButton>
                    </Pager>

                    <p role="status" className="sr-only">
                        {status}
                    </p>
                </Container>
            </Section>
        );
    },
);
export default MemoryJourney;
