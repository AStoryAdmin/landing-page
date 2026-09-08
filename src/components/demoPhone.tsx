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
    McMeta,
    McSep,
    McLayers,
    McLayerTab,
    McTranscriptToggle,
    McTranscript,
    McClip,
    McWave,
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

const SCRIPT: ScriptTurn[] = [
    { role: 'ai', text: "Tell me about your childhood home. What do you remember most about it?", delay: 500 },
    { role: 'user', text: "It was a small farmhouse in Kentucky. Three rooms and a big porch that ran the whole front of the house. We didn't have much, but my mother always kept it beautiful.", delay: 2600 },
    { role: 'ai', text: "That porch sounds like it mattered. What did your family do out there — was it the kind of place people gathered in the evenings?", delay: 3400 },
    { role: 'user', text: "Every evening after supper. Daddy would sit in his rocking chair and sometimes play guitar. Neighbors would walk over. That porch was where everything happened in summer.", delay: 3100 },
    { role: 'ai', text: "I love that — music after supper, neighbors drifting over. Do you remember a particular evening that stays with you? A night you'd want your grandchildren to know about?", delay: 3700 },
    { role: 'user', text: "There was one summer when he played until the fireflies came out. We all went quiet, just listening. I must have been six or seven. I've never forgotten it.", delay: 3200 },
    { role: 'ai', text: "Fireflies and your father's guitar. Everyone going quiet at the same moment. That's exactly the kind of evening A Story is made for — I'm glad it's written down now.", delay: 3100 },
];

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const PlayIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

const ChevronIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
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
    { who: 'A Story', text: 'Do you remember a particular evening that stays with you? A night you’d want your grandchildren to know about?' },
    { who: 'Margaret', text: 'There was one summer when he played until the fireflies came out. We all went quiet, just listening. I must have been six or seven. I’ve never forgotten it.' },
    { who: 'A Story', text: 'Fireflies and your father’s guitar. Everyone going quiet at the same moment.' },
];

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
    const [showTranscript, setShowTranscript] = useState(false);

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

    useEffect(() => {
        canceledRef.current = false;
        return () => {
            canceledRef.current = true;
        };
    }, []);

    useEffect(() => {
        if (phoneBodyRef.current) {
            phoneBodyRef.current.scrollTop = phoneBodyRef.current.scrollHeight;
        }
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
        setShowTranscript(false);

        for (const turn of SCRIPT) {
            await sleep(turn.delay);
            if (canceledRef.current) return;
            if (turn.role === 'ai') {
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
                    <ChatBarLabel>A Story · Childhood</ChatBarLabel>
                </ChatBar>

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
                    <MemoryCardReveal $show={memoryCardVisible} aria-label="Memory saved from this conversation">
                        <McIntro>Memory saved</McIntro>
                        <MemoryCard>
                            <McHeader>
                                <McEra>Childhood</McEra>
                                <McSaved>Added to archive</McSaved>
                            </McHeader>
                            <McTitle>Fireflies on the Porch</McTitle>

                            <McLayers aria-label="What is kept from this conversation">
                                <McLayerTab $active>Summary</McLayerTab>
                                <McLayerTab>Full transcript</McLayerTab>
                                <McLayerTab>Voice highlight</McLayerTab>
                            </McLayers>

                            <McExcerpt>
                                "There was one summer when he played until the fireflies came out. We all went quiet, just listening. I must have been six or seven. I've never forgotten it."
                            </McExcerpt>

                            <McTranscriptToggle
                                type="button"
                                onClick={() => setShowTranscript((v) => !v)}
                                aria-expanded={showTranscript}
                                aria-controls="mc-transcript"
                            >
                                {showTranscript ? 'Hide the full transcript' : 'Read the full transcript'}
                                <ChevronIcon />
                            </McTranscriptToggle>

                            {showTranscript && (
                                <McTranscript id="mc-transcript">
                                    {TRANSCRIPT.map((t) => (
                                        <p key={t.text}>
                                            <span className="who">{t.who}</span>
                                            {t.text}
                                        </p>
                                    ))}
                                </McTranscript>
                            )}

                            <McClip>
                                <WaveIcon />
                                <span className="label">Voice highlight &mdash; kept as audio</span>
                                <McWave aria-hidden="true">
                                    {WAVE_BARS.map((h, i) => (
                                        <i key={i} style={{ height: h }} />
                                    ))}
                                </McWave>
                                <span className="dur">0:41</span>
                            </McClip>

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
