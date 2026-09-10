import { CONTACT } from '../lib/contact';
import { useEffect, useRef, useState } from 'react';
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
    McMeta,
    McSep,
    McLayers,
    McLayerTab,
    McTranscript,
    McClip,
    McWave,
    McLinked,
    McChip,
    McShared,
    McAt,
    DemoEndCta,
    DemoEndInner,
    DemoEndLabel,
    DemoEndTitle,
    DemoEndSub,
    DemoEndActions,
    DemoEndPrimaryAnchor,
    DemoEndSecondary,
} from './demoPhone.styles';
import statusBarImg from './../assets/statusbar.webp';

type Role = 'ai' | 'user';

type ScriptTurn = {
    role: Role;
    text: string;
    delay: number;
    /** Rung 1-5 on the interview's depth ladder. AI turns only. */
    depth?: number;
    /** Why this question and not a new subject — shown beside the transcript. */
    stay?: string;
};

type Message = {
    id: number;
    role: Role;
    text: string;
    show: boolean;
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

/**
 * One evening, and the interview refusing to leave it.
 *
 * The previous script covered a grandfather, a porch, a particular night and a
 * closing line in nine turns, and the effect was of something skimming: each
 * question changed the subject, which is exactly what a question list does and
 * exactly what this is not. This version commits to Walter by the fourth turn
 * and then spends the whole call on a single porch — sound, then hands, then
 * the one night, then what she would say to him now.
 *
 * `depth` is the rung on the app's own ladder (Warm-up, Scene, Portrait,
 * Stakes, Reckoning — see ../lib/product), and `stay` is the reasoning shown
 * beside the transcript. Together they make the digging legible: without them
 * a viewer reads persistence as repetition.
 */
const SCRIPT: ScriptTurn[] = [
    { role: 'ai', depth: 1, text: "Hello — is that Margaret? This is A Story. Your daughter Ellie set this up and asked me to call. There's nothing you need to do, and we can stop whenever you like.", delay: 500 },
    { role: 'user', text: "Oh — yes. She did say something about it. I'm not sure I'm any good at this sort of thing.", delay: 2200 },
    { role: 'ai', depth: 1, text: "Almost everyone says that, and then they talk for an hour. Is there anything you already know you'd want the grandchildren to have?", delay: 2400 },
    { role: 'user', text: "I suppose I'd want them to know their grandfather. Walter. He passed in '09 and they were very small.", delay: 2400 },

    { role: 'ai', depth: 2, stay: "Committing to one subject. Walter's whole life is not this call — one evening of it is.", text: "Then we'll spend this call on Walter, and we won't try to cover all of him. One evening you can still see. Where are you?", delay: 2500 },
    { role: 'user', text: "The porch. Summer evenings after supper — he'd sit out there in the rocking chair with his guitar, and the neighbours would wander over.", delay: 2400 },

    { role: 'ai', depth: 2, stay: "Not moving on. A scene isn't a scene until it has sound in it.", text: "Stay on that porch a moment. It's after supper, before he starts playing — what can you hear?", delay: 2300 },
    { role: 'user', text: "Crickets. And the screen door — it had a spring on it, banged every time somebody came out. Mother was forever telling them to mind it.", delay: 2500 },

    { role: 'ai', depth: 3, stay: "Same evening, closer in. This is the rung where a person starts to exist rather than be described.", text: "And Walter, before the first chord. What was he doing with his hands?", delay: 2300 },
    { role: 'user', text: "Tuning. Longer than he needed to, I always thought. He was shy about it — he'd only really play once it got dark enough that nobody was looking at him.", delay: 2600 },

    { role: 'ai', depth: 4, stay: "Ten questions in, one location. The night that costs something to tell is the one that was never going to arrive first.", text: "He waited for the dark. Was there one night on that porch you've kept longer than the others?", delay: 2400 },
    { role: 'user', text: "There was one summer he played until the fireflies came out. We all went quiet — nobody decided to, we just stopped talking. I was six, maybe seven. I've never forgotten it.", delay: 2700 },

    { role: 'ai', depth: 5, stay: "The last rung, and it's only asked because every rung under it was answered.", text: "If Walter were out there tonight and you could say one thing to him about that night — what would it be?", delay: 2400 },
    { role: 'user', text: "That I was listening. He never knew that. He thought we were only being polite.", delay: 2600 },

    { role: 'ai', depth: 5, text: "Then that's the thing we'll keep, Margaret — in your voice, in your words. Walter has been gone sixteen years and his grandchildren now know what he sounded like on that porch.", delay: 2500 },
];

/** The rungs, named as the app names them. */
const DEPTHS = ['Warm-up', 'Scene', 'Portrait', 'Stakes', 'Reckoning'] as const;

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

/** The three layers, in the order the family meets them. */
const LAYERS = [
    { id: 'summary' as const, label: 'Summary' },
    { id: 'transcript' as const, label: 'Full transcript' },
    { id: 'voice' as const, label: 'Voice highlight' },
];

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

/* Decorative bar heights for the clip's waveform. */
const WAVE_BARS = [5, 9, 14, 8, 16, 11, 6, 13, 9, 15, 7, 12, 5, 10, 14, 8];

/**
 * The verbatim conversation behind the summary card. It is the same exchange
 * the demo just played — the point being that the card is a layer over this,
 * not a replacement for it.
 */
const TRANSCRIPT = [
    { who: 'A Story', at: '04:12', text: 'Stay on that porch a moment. It’s after supper, before he starts playing — what can you hear?' },
    { who: 'Margaret', at: '04:19', text: 'Crickets. And the screen door — it had a spring on it, banged every time somebody came out. Mother was forever telling them to mind it.' },
    { who: 'A Story', at: '04:38', text: 'And Walter, before the first chord. What was he doing with his hands?' },
    { who: 'Margaret', at: '04:44', text: 'Tuning. Longer than he needed to, I always thought. He was shy about it — he’d only really play once it got dark enough that nobody was looking at him.' },
    { who: 'A Story', at: '05:06', text: 'He waited for the dark. Was there one night on that porch you’ve kept longer than the others?' },
    { who: 'Margaret', at: '05:14', text: 'There was one summer he played until the fireflies came out. We all went quiet — nobody decided to, we just stopped talking. I was six, maybe seven. I’ve never forgotten it.' },
    { who: 'A Story', at: '05:41', text: 'If Walter were out there tonight and you could say one thing to him about that night — what would it be?' },
    { who: 'Margaret', at: '05:52', text: 'That I was listening. He never knew that. He thought we were only being polite.' },
];

/** The summary layer — what the family reads first, over a cup of tea. */
const SUMMARY =
    'Margaret describes the summer evenings on her parents’ porch in Kentucky, where her father Walter played guitar after supper while the neighbours drifted over. She remembers the screen door with the spring on it, and that Walter tuned far longer than he needed to — he was shy, and would only really play once it was dark enough that nobody was watching him. One summer he played until the fireflies came out and the whole porch went quiet without anyone deciding to.';

const PlayingIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="10" y1="15" x2="10" y2="9" />
        <line x1="14" y1="15" x2="14" y2="9" />
    </svg>
);

const DemoPhone = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [showVoicePanel, setShowVoicePanel] = useState(false);
    const [showMemoryCard, setShowMemoryCard] = useState(false);
    const [memoryCardVisible, setMemoryCardVisible] = useState(false);
    const [showEndCta, setShowEndCta] = useState(false);
    /** Which layer of the memory the card is showing. All three are real. */
    const [layer, setLayer] = useState<'summary' | 'transcript' | 'voice'>('summary');
    /** How far up the ladder the interview has climbed, live. */
    const [depth, setDepth] = useState(0);
    const [stay, setStay] = useState<string | null>(null);

    const [speechSupported] = useState(() => Boolean(getSpeechRecognitionCtor()));
    const [isRecording, setIsRecording] = useState(false);
    const [micError, setMicError] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');

    const runningRef = useRef(false);
    const canceledRef = useRef(false);
    const messageIdRef = useRef(0);
    const finalTranscriptRef = useRef('');
    const isRecordingRef = useRef(false);
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
    const phoneBodyRef = useRef<HTMLDivElement>(null);
    const memoryCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        canceledRef.current = false;
        return () => {
            canceledRef.current = true;
        };
    }, []);

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
    }, [messages, isTyping, showVoicePanel, showMemoryCard, showEndCta]);

    useEffect(() => {
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
    }, []);

    function addMessage(role: Role, text: string) {
        const id = messageIdRef.current++;
        setMessages((prev) => [...prev, { id, role, text, show: false }]);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (canceledRef.current) return;
                setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, show: true } : m)));
            });
        });
    }

    async function runDemo() {
        if (runningRef.current) return;
        runningRef.current = true;
        setIsPlaying(true);
        setMessages([]);
        setIsTyping(false);
        setShowVoicePanel(false);
        setShowMemoryCard(false);
        setMemoryCardVisible(false);
        setShowEndCta(false);
        setLayer('summary');
        setDepth(0);
        setStay(null);

        for (const turn of SCRIPT) {
            await sleep(turn.delay);
            if (canceledRef.current) return;
            if (turn.role === 'ai') {
                /* The rung is claimed before the question is asked, so the bar
                   moves and then the question that earned it arrives. */
                if (turn.depth) setDepth(turn.depth);
                setStay(turn.stay ?? null);
                setIsTyping(true);
                await sleep(Math.min(turn.text.length * 16, 2000));
                if (canceledRef.current) return;
                setIsTyping(false);
            }
            addMessage(turn.role, turn.text);
        }

        await sleep(600);
        if (canceledRef.current) return;
        setShowVoicePanel(true);

        await sleep(700);
        if (canceledRef.current) return;
        setShowMemoryCard(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!canceledRef.current) setMemoryCardVisible(true);
            });
        });

        await sleep(1200);
        if (canceledRef.current) return;
        setShowEndCta(true);

        setIsPlaying(false);
        setHasPlayed(true);
        runningRef.current = false;
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

    const playLabel = isPlaying ? 'Playing…' : hasPlayed ? 'Replay conversation' : 'Watch the conversation';

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
                    <ChatBarLabel>A Story · calling Margaret</ChatBarLabel>
                </ChatBar>

                {/* Sticky, because the reasoning has to stay on screen while
                    the conversation scrolls under it — that is the whole point
                    of showing it. */}
                {/* Retired once the memory card lands: the ladder has done
                    its work by then, and left sticky it simply covers the card
                    it was building towards. */}
                <DepthBand $show={depth > 0 && !showMemoryCard} aria-hidden="true">
                    <DepthHead>
                        <span>One evening · Walter</span>
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

                <ChatMsgs role="log" aria-live="polite" aria-label="Conversation demo">
                    {messages.map((m) => (
                        <Bubble key={m.id} $role={m.role} $show={m.show}>
                            <BubbleWho $role={m.role}>{m.role === 'ai' ? 'A Story' : 'You'}</BubbleWho>
                            {m.text}
                        </Bubble>
                    ))}
                    {isTyping && (
                        <TypingIndicator>
                            <span />
                            <span />
                            <span />
                        </TypingIndicator>
                    )}
                </ChatMsgs>

                <ChatAction>
                    <ChatPlayButton onClick={runDemo} disabled={isPlaying} aria-label="Play the scripted conversation demo">
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
                                <span style={{ color: '#B45A2B' }}>
                                    Microphone access denied. Allow mic in your browser settings and try again.
                                </span>
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
                            <McHeader>
                                <McEra>Childhood</McEra>
                                <McSaved>Added to archive</McSaved>
                            </McHeader>
                            <McTitle>Fireflies on the Porch</McTitle>

                            <McAbout>
                                <HeartIcon />
                                <span>
                                    This evening belongs to <b>Walter, who died in 2009</b>. Margaret is
                                    the one telling it. The person a story is about does not have to be
                                    here for it to be kept.
                                </span>
                            </McAbout>

                            {/* Three layers, three panels. These used to be
                                decorative chips over a fixed summary, which
                                promised a transcript and a recording the card
                                never actually showed. */}
                            <McLayers role="tablist" aria-label="What is kept from this conversation">
                                {LAYERS.map((l) => (
                                    <McLayerTab
                                        key={l.id}
                                        type="button"
                                        role="tab"
                                        id={`mc-tab-${l.id}`}
                                        aria-selected={layer === l.id}
                                        aria-controls={`mc-panel-${l.id}`}
                                        $active={layer === l.id}
                                        onClick={() => setLayer(l.id)}
                                    >
                                        {l.label}
                                    </McLayerTab>
                                ))}
                            </McLayers>

                            {layer === 'summary' && (
                                <McPanel role="tabpanel" id="mc-panel-summary" aria-labelledby="mc-tab-summary">
                                    <McSummary>{SUMMARY}</McSummary>
                                    <McExcerpt>
                                        &ldquo;That I was listening. He never knew that. He thought we
                                        were only being polite.&rdquo;
                                    </McExcerpt>
                                </McPanel>
                            )}

                            {layer === 'transcript' && (
                                <McPanel role="tabpanel" id="mc-panel-transcript" aria-labelledby="mc-tab-transcript">
                                    <McTranscript>
                                        {TRANSCRIPT.map((t) => (
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
                                <McPanel role="tabpanel" id="mc-panel-voice" aria-labelledby="mc-tab-voice">
                                    <McClip>
                                        <WaveIcon />
                                        <span className="label">In Margaret&rsquo;s voice</span>
                                        <McWave aria-hidden="true">
                                            {WAVE_BARS.map((h, i) => (
                                                <i key={i} style={{ height: h }} />
                                            ))}
                                        </McWave>
                                        <span className="dur">0:41</span>
                                    </McClip>
                                    <McVoiceNote>
                                        Forty-one seconds, chosen from an hour: the pause before she
                                        answers, and the way her voice goes when she says <em>he thought
                                        we were only being polite</em>. A transcript cannot hold that,
                                        so it is kept as audio.
                                    </McVoiceNote>
                                </McPanel>
                            )}

                            <McLinked>
                                <span className="lbl">Linked</span>
                                <McChip>Walter, her father</McChip>
                                <McChip>The porch</McChip>
                                <McChip>Kentucky</McChip>
                                <McChip>c. 1953</McChip>
                            </McLinked>

                            {/* The three access tiers the app really has:
                                owner, invited manager (read + edit), and anyone
                                with the contribute link (submits, pending). */}
                            <McFamily>
                                <p className="row">
                                    <PencilIcon />
                                    <span>
                                        <b>Ellie</b> was invited and can edit this archive. She corrected
                                        the year &mdash; 1953, not 1952.
                                    </span>
                                </p>
                                <p className="row">
                                    <PlusIcon />
                                    <span>
                                        <b>Tom</b> added a photograph of the porch from the link Margaret
                                        sent him. No account needed.
                                        <McPending>Waiting for Margaret</McPending>
                                    </span>
                                </p>
                            </McFamily>

                            <McShared>
                                <EyeIcon />
                                <span><b>Margaret decides who sees this.</b> Right now: Ellie, Tom and 4 others.</span>
                            </McShared>

                            <McMeta>
                                <span>Chapter: Childhood</span>
                                <McSep>·</McSep>
                                <span>Kentucky, 1950s</span>
                                <McSep>·</McSep>
                                <span>Added today</span>
                            </McMeta>
                        </MemoryCard>
                    </MemoryCardReveal>
                )}

                <DemoEndCta $show={showEndCta} aria-live="polite">
                    <DemoEndInner>
                        <DemoEndLabel>That memory is now permanent.</DemoEndLabel>
                        <DemoEndTitle>Start your family's story.</DemoEndTitle>
                        <DemoEndSub>One conversation, kept three ways &mdash; and room for every one after it.</DemoEndSub>
                        <DemoEndActions>
                            <DemoEndPrimaryAnchor href={CONTACT.gift}>Gift a story</DemoEndPrimaryAnchor>
                            <DemoEndSecondary to="/family">Learn more</DemoEndSecondary>
                        </DemoEndActions>
                    </DemoEndInner>
                </DemoEndCta>
            </PhoneBody>
        </PhoneContainer>
    );
};

export default DemoPhone;
