import { Fragment, useEffect, useRef, useState } from 'react';
import {
    PhoneContainer,
    StatusBar,
    PhoneBody,
    ChatBar,
    ChatDot,
    ChatBarLabel,
    ChatMsgs,
    Bubble,
    BubbleWho,
    TypingIndicator,
    ChatAction,
    ChatPlayButton,
    VoicePanel,
    VoiceLabel,
    VoiceText,
    VoiceRow,
    VoiceMicButton,
    MicPulse,
    VoiceClearButton,
    VoiceHint,
    MemoryCardReveal,
    McIntro,
    MemoryCard,
    McHeader,
    McEra,
    McSaved,
    McTitle,
    McDate,
    McExcerpt,
    McSummary,
    McPanel,
    McVoiceNote,
    McFamily,
    McPending,
    McAbout,
    DepthBand,
    DepthHead,
    DepthRungs,
    DepthRung,
    StayNote,
    SensitiveNote,
    McMeta,
    McSep,
    McLayers,
    McLayerTab,
    McLayersHint,
    McTranscript,
    McClip,
    McWave,
    McLinked,
    McChip,
    McShared,
    McAt,
} from './demoPhone.styles';
import { DEPTHS, sensitiveNote, type Scenario } from '../lib/demoScripts';
import statusBarImg from './../assets/statusbar.webp';

type Role = 'ai' | 'user';

type Message = {
    id: number;
    role: Role;
    text: string;
    show: boolean;
    /** The permission line that precedes a sensitive question, if any. */
    note?: string | null;
};

interface SpeechRecognitionResultLike {
    isFinal: boolean;
    0: { transcript: string };
}
interface SpeechRecognitionEventLike {
    resultIndex: number;
    results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionErrorEventLike {
    error: string;
}
interface SpeechRecognitionLike {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((e: SpeechRecognitionEventLike) => void) | null;
    onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
}
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | undefined {
    const w = window as unknown as {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    return w.SpeechRecognition || w.webkitSpeechRecognition;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const PlayIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

const PencilIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
);

const PlusIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const HeartIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
);

const EyeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const WaveIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <line x1="4" y1="9" x2="4" y2="15" />
        <line x1="9" y1="5" x2="9" y2="19" />
        <line x1="14" y1="8" x2="14" y2="16" />
        <line x1="19" y1="10" x2="19" y2="14" />
    </svg>
);

const PlayingIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="10" y1="15" x2="10" y2="9" />
        <line x1="14" y1="15" x2="14" y2="9" />
    </svg>
);

/* Decorative bar heights for the clip's waveform. */
const WAVE_BARS = [5, 9, 14, 8, 16, 11, 6, 13, 9, 15, 7, 12, 5, 10, 14, 8];

/** The three layers, in the order the family meets them. */
const LAYERS = [
    { id: 'summary' as const, label: 'Summary' },
    { id: 'transcript' as const, label: 'Full transcript' },
    { id: 'voice' as const, label: 'Voice highlight' },
];

type LayerId = (typeof LAYERS)[number]['id'];

type DemoPhoneProps = {
    /** Which conversation this phone plays. See ../lib/demoScripts. */
    scenario: Scenario;
    /**
     * True when a different phone in the reel is playing. Three scripts running
     * at once is unreadable, so whoever presses play wins and the others stop
     * where they are rather than racing underneath.
     */
    stopped?: boolean;
    onStart?: () => void;
    onFinish?: () => void;
    /** The live microphone panel. One per page is a feature; three is clutter. */
    showMic?: boolean;
};

/**
 * The first exchange, already on screen before anyone presses anything.
 *
 * Three phones showing nothing but a status bar is three blank slabs, and a
 * viewer who does not press play learns not one thing about the product. This
 * way the resting state is already the pitch — A Story introducing itself and
 * naming the relative who set the call up — and Play is an invitation rather
 * than a precondition.
 */
const opening = (scenario: Scenario): Message[] =>
    scenario.script.slice(0, 2).map((t, i) => ({
        id: i,
        role: t.role,
        text: t.text,
        show: true,
    }));

const DemoPhone = ({ scenario, stopped = false, onStart, onFinish, showMic = false }: DemoPhoneProps) => {
    const [messages, setMessages] = useState<Message[]>(() => opening(scenario));
    const [isTyping, setIsTyping] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [showVoicePanel, setShowVoicePanel] = useState(false);
    const [showMemoryCard, setShowMemoryCard] = useState(false);
    const [memoryCardVisible, setMemoryCardVisible] = useState(false);
    /** Which layer of the memory the card is showing. All three are real. */
    const [layer, setLayer] = useState<LayerId>('summary');
    /** On while the demo walks the three tabs itself, so the hint has a reason. */
    const [tabTour, setTabTour] = useState(false);
    /** How far up the ladder the interview has climbed, live. */
    const [depth, setDepth] = useState(0);
    const [stay, setStay] = useState<string | null>(null);
    /** The permission line for the question currently being typed. */
    const [pendingNote, setPendingNote] = useState<string | null>(null);

    const [speechSupported] = useState(() => (showMic ? Boolean(getSpeechRecognitionCtor()) : false));
    const [isRecording, setIsRecording] = useState(false);
    const [micError, setMicError] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');

    const runningRef = useRef(false);
    /* Bumped by every fresh run, so an older loop still sitting in a sleep can
       tell that it has been superseded and return without touching state. */
    const runIdRef = useRef(0);
    const unmountedRef = useRef(false);
    /* Mirrors the `stopped` prop for the running loop to read. Kept in a ref
       rather than acted on in an effect: the loop is a callback, so it can do
       its own tidying up, and an effect that called setState here would spend
       a cascading render on something the loop is about to handle anyway. */
    const stoppedRef = useRef(stopped);
    /* Starts past the two seeded opening messages so their keys stay unique. */
    const messageIdRef = useRef(2);
    const finalTranscriptRef = useRef('');
    const isRecordingRef = useRef(false);
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
    const phoneBodyRef = useRef<HTMLDivElement>(null);
    const memoryCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        unmountedRef.current = false;
        return () => {
            unmountedRef.current = true;
        };
    }, []);

    /* Somebody pressed play on another phone. The loop reads this on its next
       breath and stands down; pressing play here again starts it over. */
    useEffect(() => {
        stoppedRef.current = stopped;
    }, [stopped]);

    /*
     * Follow the conversation to the bottom while it runs — but the memory card
     * is taller than the phone, so scrolling to the bottom of it lands the
     * viewer on the metadata footer, past the title, the tabs and everything
     * the card is for. When the card appears, go to its top instead.
     */
    useEffect(() => {
        const body = phoneBodyRef.current;
        if (!body) return;
        if (showMemoryCard && memoryCardRef.current) {
            /* Measured, not offsetTop: PhoneBody is not the offset parent, so
               offsetTop is relative to something else and lands short. */
            const delta =
                memoryCardRef.current.getBoundingClientRect().top -
                body.getBoundingClientRect().top;
            body.scrollTop += delta - 6;
            return;
        }
        body.scrollTop = body.scrollHeight;
    }, [messages, isTyping, showVoicePanel, showMemoryCard]);

    useEffect(() => {
        if (!showMic) return;
        const SR = getSpeechRecognitionCtor();
        if (!SR) return;

        const recognition = new SR();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (e) => {
            let interim = '';
            let final = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const chunk = e.results[i][0].transcript;
                if (e.results[i].isFinal) final += chunk;
                else interim += chunk;
            }
            if (final) finalTranscriptRef.current += final;
            setTranscript(finalTranscriptRef.current);
            setInterimTranscript(interim);
        };

        recognition.onerror = (e) => {
            if (e.error === 'not-allowed') setMicError(true);
            isRecordingRef.current = false;
            setIsRecording(false);
        };

        recognition.onend = () => {
            if (isRecordingRef.current) {
                try {
                    recognition.start();
                } catch {
                    /* recognition was already running — nothing to recover. */
                }
            }
        };

        recognitionRef.current = recognition;

        return () => {
            try {
                recognition.stop();
            } catch {
                /* recognition was already stopped — nothing to recover. */
            }
        };
    }, [showMic]);

    function addMessage(role: Role, text: string, note?: string | null) {
        const id = messageIdRef.current++;
        setMessages((prev) => [...prev, { id, role, text, show: false, note }]);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (unmountedRef.current) return;
                setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, show: true } : m)));
            });
        });
    }

    async function runDemo() {
        if (runningRef.current) return;
        runningRef.current = true;
        const run = ++runIdRef.current;

        /*
         * True once this particular run has no business touching state again:
         * the component went away, another phone in the reel took over, or
         * somebody pressed play a second time and a newer loop is in charge.
         * Checked after every sleep, because a script is mostly sleeping.
         */
        const dead = () =>
            unmountedRef.current || stoppedRef.current || runIdRef.current !== run;

        /* Hand the button back and stop the typing dots. Only the newest run
           does this, so a superseded loop cannot clear the one that replaced it. */
        const standDown = () => {
            if (runIdRef.current !== run) return;
            runningRef.current = false;
            if (unmountedRef.current) return;
            setIsTyping(false);
            setIsPlaying(false);
        };

        stoppedRef.current = false;
        onStart?.();
        setIsPlaying(true);
        setMessages([]);
        setIsTyping(false);
        setShowVoicePanel(false);
        setShowMemoryCard(false);
        setMemoryCardVisible(false);
        setLayer('summary');
        setTabTour(false);
        setDepth(0);
        setStay(null);
        setPendingNote(null);

        for (const turn of scenario.script) {
            await sleep(turn.delay);
            if (dead()) return standDown();
            if (turn.role === 'ai') {
                /* The rung is claimed before the question is asked, so the bar
                   moves and then the question that earned it arrives. */
                if (turn.depth) setDepth(turn.depth);
                setStay(turn.stay ?? null);
                /* And the permission line lands before the question too — which
                   is the order the app uses, and the only order that makes it
                   an offer rather than an apology. */
                const note = sensitiveNote(turn.sensitiveKind);
                setPendingNote(note);
                if (note) {
                    await sleep(900);
                    if (dead()) return standDown();
                }
                setIsTyping(true);
                await sleep(Math.min(turn.text.length * 16, 2000));
                if (dead()) return standDown();
                setIsTyping(false);
                addMessage(turn.role, turn.text, note);
                setPendingNote(null);
                continue;
            }
            addMessage(turn.role, turn.text);
        }

        if (showMic) {
            await sleep(600);
            if (dead()) return standDown();
            setShowVoicePanel(true);
        }

        await sleep(700);
        if (dead()) return standDown();
        setShowMemoryCard(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!dead()) setMemoryCardVisible(true);
            });
        });

        /* Walk the three tabs once, so a viewer learns they are buttons. It
           finishes back on Summary and leaves them alone after that — the card
           is theirs to poke at from here. */
        setTabTour(true);
        await sleep(1700);
        if (dead()) return standDown();
        setLayer('transcript');
        await sleep(2600);
        if (dead()) return standDown();
        setLayer('voice');
        await sleep(2600);
        if (dead()) return standDown();
        setLayer('summary');
        setTabTour(false);

        setIsPlaying(false);
        setHasPlayed(true);
        runningRef.current = false;
        onFinish?.();
    }

    /* A viewer who taps a tab mid-tour has understood the point; stop steering. */
    function pickLayer(id: LayerId) {
        setTabTour(false);
        setLayer(id);
    }

    function startRecording() {
        setMicError(false);
        isRecordingRef.current = true;
        setIsRecording(true);
        try {
            recognitionRef.current?.start();
        } catch {
            /* the browser refused the start/stop — the UI state already reflects it. */
        }
    }

    function stopRecording() {
        isRecordingRef.current = false;
        setIsRecording(false);
        try {
            recognitionRef.current?.stop();
        } catch {
            /* the browser refused the start/stop — the UI state already reflects it. */
        }
    }

    function clearTranscript() {
        finalTranscriptRef.current = '';
        setTranscript('');
        setInterimTranscript('');
        stopRecording();
    }

    const playLabel = isPlaying ? 'Playing…' : hasPlayed ? 'Replay this call' : 'Play this call';

    return (
        <PhoneContainer>
            <StatusBar>
                <span>9:41</span>
                <img src={statusBarImg} alt="" aria-hidden="true" width={80} height={20} loading="lazy" decoding="async" />
            </StatusBar>

            <PhoneBody ref={phoneBodyRef}>
                <ChatBar aria-hidden="true">
                    <ChatDot $accent />
                    <ChatDot />
                    <ChatDot />
                    <ChatBarLabel>{scenario.callLabel}</ChatBarLabel>
                </ChatBar>

                {/* Sticky, because the reasoning has to stay on screen while
                    the conversation scrolls under it — that is the whole point
                    of showing it. */}
                {/* Retired once the memory card lands: the ladder has done
                    its work by then, and left sticky it simply covers the card
                    it was building towards. */}
                <DepthBand $show={depth > 0 && !showMemoryCard} aria-hidden="true">
                    <DepthHead>
                        <span>{scenario.subject}</span>
                        <b>{DEPTHS[depth - 1] ?? DEPTHS[0]}</b>
                    </DepthHead>
                    <DepthRungs>
                        {DEPTHS.map((name, i) => (
                            <DepthRung key={name} $level={i + 1} $on={depth >= i + 1} />
                        ))}
                    </DepthRungs>
                    <StayNote $show={Boolean(stay)}>
                        {stay ? <><b>Why this question:</b> {stay}</> : null}
                    </StayNote>
                </DepthBand>

                <ChatMsgs role="log" aria-live="polite" aria-label={`Conversation demo: ${scenario.label}`}>
                    {messages.map((m) => (
                        <div key={m.id}>
                            {m.note && (
                                <SensitiveNote $show>
                                    <b>Before this one</b>
                                    {m.note}
                                </SensitiveNote>
                            )}
                            <Bubble $role={m.role} $show={m.show}>
                                <BubbleWho $role={m.role}>{m.role === 'ai' ? 'A Story' : scenario.teller}</BubbleWho>
                                {m.text}
                            </Bubble>
                        </div>
                    ))}
                    {/* The line arrives while A Story is still typing, so the
                        offer to skip is on screen before the question is. */}
                    {isTyping && pendingNote && (
                        <SensitiveNote $show>
                            <b>Before this one</b>
                            {pendingNote}
                        </SensitiveNote>
                    )}
                    {isTyping && (
                        <TypingIndicator>
                            <span />
                            <span />
                            <span />
                        </TypingIndicator>
                    )}
                </ChatMsgs>

                <ChatAction>
                    <ChatPlayButton onClick={runDemo} disabled={isPlaying} aria-label={`Play the ${scenario.label} conversation`}>
                        {isPlaying ? <PlayingIcon /> : <PlayIcon />}
                        {playLabel}
                    </ChatPlayButton>
                </ChatAction>

                {showVoicePanel && (
                    <VoicePanel aria-labelledby="voice-lbl">
                        <VoiceLabel id="voice-lbl">Your turn — speak a memory</VoiceLabel>
                        <VoiceText aria-live="polite">
                            {transcript || interimTranscript ? (
                                <>
                                    {transcript}
                                    {interimTranscript && <span style={{ opacity: 0.45 }}>{interimTranscript}</span>}
                                </>
                            ) : micError ? (
                                <span>Microphone access denied. Allow mic in your browser settings and try again.</span>
                            ) : (
                                <span className="ph">Your words will appear here…</span>
                            )}
                        </VoiceText>
                        <VoiceRow>
                            <VoiceMicButton
                                $on={isRecording}
                                disabled={!speechSupported}
                                onClick={() => (isRecording ? stopRecording() : startRecording())}
                                aria-label={isRecording ? 'Stop recording' : 'Start recording your voice'}
                            >
                                <MicPulse $on={isRecording} aria-hidden="true" />
                                {speechSupported ? (isRecording ? 'Stop speaking' : 'Start speaking') : 'Voice not supported in this browser'}
                            </VoiceMicButton>
                            {(transcript || interimTranscript) && (
                                <VoiceClearButton onClick={clearTranscript} aria-label="Clear voice transcript">
                                    Clear
                                </VoiceClearButton>
                            )}
                            <VoiceHint>
                                {speechSupported ? 'Works best on a phone or tablet' : 'Try Chrome or Safari on a phone or tablet.'}
                            </VoiceHint>
                        </VoiceRow>
                    </VoicePanel>
                )}

                {showMemoryCard && (
                    <MemoryCardReveal ref={memoryCardRef} $show={memoryCardVisible} aria-label="Memory saved from this conversation">
                        <McIntro>Memory saved</McIntro>
                        <MemoryCard>
                            {/* Chapter, then the one badge lib/memoryCard.js
                                picks: who told it beats how it was rated, and
                                both beat a nag about a missing date. */}
                            <McHeader>
                                <McEra>{scenario.chapter}</McEra>
                                <McSaved>{scenario.badge}</McSaved>
                            </McHeader>
                            {/* Memories keep the question as their title — which
                                is also how the app knows not to ask it again
                                (lib/nextQuestion.js matches on exactly this). */}
                            <McTitle>{scenario.title}</McTitle>
                            <McDate>{scenario.dateLine}</McDate>

                            {scenario.about && (
                                <McAbout>
                                    <HeartIcon />
                                    <span>{scenario.about}</span>
                                </McAbout>
                            )}

                            <McLayers role="tablist" aria-label="What is kept from this conversation">
                                {LAYERS.map((l) => (
                                    <McLayerTab
                                        key={l.id}
                                        type="button"
                                        role="tab"
                                        id={`mc-tab-${scenario.id}-${l.id}`}
                                        aria-selected={layer === l.id}
                                        aria-controls={`mc-panel-${scenario.id}-${l.id}`}
                                        $active={layer === l.id}
                                        onClick={() => pickLayer(l.id)}
                                    >
                                        {l.label}
                                    </McLayerTab>
                                ))}
                            </McLayers>
                            <McLayersHint $show={tabTour} aria-hidden={!tabTour}>
                                One conversation, kept three ways. Tap any of the three.
                            </McLayersHint>

                            {layer === 'summary' && (
                                <McPanel role="tabpanel" id={`mc-panel-${scenario.id}-summary`} aria-labelledby={`mc-tab-${scenario.id}-summary`}>
                                    <McSummary>{scenario.summary}</McSummary>
                                    <McExcerpt>&ldquo;{scenario.excerpt}&rdquo;</McExcerpt>
                                </McPanel>
                            )}

                            {layer === 'transcript' && (
                                <McPanel role="tabpanel" id={`mc-panel-${scenario.id}-transcript`} aria-labelledby={`mc-tab-${scenario.id}-transcript`}>
                                    <McTranscript>
                                        {scenario.transcript.map((t) => (
                                            <p key={t.at}>
                                                <span className="who">{t.who}<McAt>{t.at}</McAt></span>
                                                {t.text}
                                            </p>
                                        ))}
                                    </McTranscript>
                                    <McVoiceNote>
                                        Word for word, nothing edited out, and searchable &mdash; the
                                        summary above is a layer over this, never a replacement for it.
                                    </McVoiceNote>
                                </McPanel>
                            )}

                            {layer === 'voice' && (
                                <McPanel role="tabpanel" id={`mc-panel-${scenario.id}-voice`} aria-labelledby={`mc-tab-${scenario.id}-voice`}>
                                    <McClip>
                                        <WaveIcon />
                                        <span className="label">{scenario.clip.label}</span>
                                        <McWave aria-hidden="true">
                                            {WAVE_BARS.map((h, i) => (
                                                <i key={i} style={{ height: h }} />
                                            ))}
                                        </McWave>
                                        <span className="dur">{scenario.clip.duration}</span>
                                    </McClip>
                                    <McVoiceNote>{scenario.clip.note}</McVoiceNote>
                                </McPanel>
                            )}

                            <McLinked>
                                <span className="lbl">Linked</span>
                                {scenario.linked.map((chip) => (
                                    <McChip key={chip}>{chip}</McChip>
                                ))}
                            </McLinked>

                            {/* The three access tiers the app really has:
                                owner, invited manager (read + edit), and anyone
                                with the contribute link (submits, pending). */}
                            <McFamily>
                                {scenario.family.map((f) => (
                                    <p className="row" key={f.name}>
                                        {f.kind === 'edit' ? <PencilIcon /> : <PlusIcon />}
                                        <span>
                                            <b>{f.name}</b> {f.text}
                                            {f.pending && <McPending>{f.pending}</McPending>}
                                        </span>
                                    </p>
                                ))}
                            </McFamily>

                            <McShared>
                                <EyeIcon />
                                <span>{scenario.shared}</span>
                            </McShared>

                            <McMeta>
                                {scenario.meta.map((m, i) => (
                                    <Fragment key={m}>
                                        {i > 0 && <McSep>·</McSep>}
                                        <span>{m}</span>
                                    </Fragment>
                                ))}
                            </McMeta>
                        </MemoryCard>
                    </MemoryCardReveal>
                )}
            </PhoneBody>
        </PhoneContainer>
    );
};

export default DemoPhone;
