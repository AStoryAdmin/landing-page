import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { color, font } from '../styles/theme';

const colors = {
    dark: color.primaryDeep,
    cream: color.ivory,
    paper: color.paper,
    paper2: color.ivory,
    paper3: color.ivoryDeep,
    orange: color.accent,
    onAccent: color.paperPure,
    orangeText: color.accentText,
    orangeSoft: color.accentWash,
    gold: color.gold,
    ink08: 'rgba(15, 74, 88, 0.08)',
    ink15: color.primaryLine,
    ink40: color.faint,
    ink70: color.body,
    fireBg: color.primaryDeep,
    fireText: color.onDark,
    fire60: color.onDarkMuted,
    success: color.live,
};

const fonts = {
    body: font.body,
    display: font.display,
    script: font.script,
};

const bounce = keyframes`
    0%, 80%, 100% { transform: translateY(0); opacity: .35; }
    40% { transform: translateY(-6px); opacity: 1; }
`;

const pulseDot = keyframes`
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: .5; transform: scale(1.3); }
`;

export const PhoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 330px;
    aspect-ratio: 330 / 660;
    /* Both of these are load-bearing now that three phones sit in a row. As a
       flex item, this box's automatic minimum size is its content height, and a
       running conversation is far taller than 660px — so without min-height the
       aspect ratio loses and the phone playing grows to twice the height of the
       two beside it. flex-shrink: 0 then stops the same column squeezing it. */
    min-height: 0;
    flex-shrink: 0;
    border-radius: 42px;
    overflow: hidden;
    background: ${colors.cream};
    box-shadow: 2px 2px 50px 0px rgba(43,33,23,0.3);
`;

export const StatusBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    padding: 15px 25px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${fonts.body};
    border-bottom: 1px solid ${colors.ink15};
`;

export const ChatBar = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    padding: 12px 20px;
    background: ${colors.paper2};
    border-bottom: 1px solid ${colors.ink08};
`;

export const ChatDot = styled.div<{ $accent?: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.paper2};
    border: 1px solid ${colors.ink08};

    ${({ $accent }) =>
        $accent &&
        css`
            background: ${colors.gold};
            border-color: ${colors.gold};
        `}
`;

export const ChatBarLabel = styled.span`
    margin-left: auto;
    font-family: ${fonts.body};
    font-size: 11px;
    font-style: italic;
    color: ${colors.ink40};
`;

export const PhoneBody = styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

export const ChatMsgs = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
`;

export const Bubble = styled.div<{ $role: 'ai' | 'user'; $show: boolean }>`
    max-width: 84%;
    padding: 10px 14px;
    border-radius: 14px;
    font-family: ${fonts.body};
    font-size: 13px;
    line-height: 1.55;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 350ms ease, transform 350ms ease;

    ${({ $show }) =>
        $show &&
        css`
            opacity: 1;
            transform: none;
        `}

    ${({ $role }) =>
        $role === 'ai'
            ? css`
                  align-self: flex-start;
                  background: ${colors.paper2};
                  border: 1px solid ${colors.ink08};
                  border-bottom-left-radius: 4px;
              `
            : css`
                  align-self: flex-end;
                  background: ${colors.orange};
                  color: ${colors.onAccent};
                  border-bottom-right-radius: 4px;
              `}
`;

/*
 * The speaker's name above each bubble.
 *
 * The storyteller's side used to be rgba(239,230,212,0.6), which over the
 * terracotta bubble resolves to about 2.4:1 — a contrast failure that went
 * unnoticed while the demo started empty and the axe run had no bubbles to
 * look at. Seeding the opening exchange put them on the page at rest and the
 * gate caught it immediately. Even the full ivory only reaches 4.87:1 here, so
 * there is no opacity to spend: the label earns its hierarchy from size, case
 * and tracking instead, which is where it should have come from anyway.
 */
export const BubbleWho = styled.div<{ $role: 'ai' | 'user' }>`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 4px;
    color: ${({ $role }) => ($role === 'user' ? colors.onAccent : colors.ink40)};
`;

export const TypingIndicator = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    width: fit-content;
    align-self: flex-start;
    padding: 10px 14px;
    background: ${colors.paper2};
    border: 1px solid ${colors.ink08};
    border-radius: 14px;
    border-bottom-left-radius: 4px;

    span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${colors.ink40};
        animation: ${bounce} 1.4s infinite;
    }
    span:nth-child(2) {
        animation-delay: 0.2s;
    }
    span:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

export const ChatAction = styled.div`
    flex-shrink: 0;
    padding: 16px 20px;
    border-top: 1px solid ${colors.ink08};
    background: ${colors.paper2};
`;

export const ChatPlayButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 46px;
    font-family: ${fonts.body};
    font-size: 13px;
    font-weight: 500;
    color: ${colors.orangeText};
    background: transparent;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s ease, opacity 0.2s ease;

    &:hover:not(:disabled) {
        background: ${colors.orangeSoft};
    }
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const MemoryCardReveal = styled.div<{ $show: boolean }>`
    flex-shrink: 0;
    padding: 0 20px 20px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 500ms ease, transform 500ms ease;

    ${({ $show }) =>
        $show &&
        css`
            opacity: 1;
            transform: none;
        `}
`;

export const McIntro = styled.p`
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${colors.ink40};
    margin: 0 0 8px;

    &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${colors.success};
        flex-shrink: 0;
        animation: ${pulseDot} 2s ease infinite;
    }
`;

export const MemoryCard = styled.div`
    background: ${colors.cream};
    border: 1px solid ${colors.ink08};
    border-left: 3px solid ${colors.orange};
    border-radius: 12px;
    padding: 14px;
`;

export const McHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

export const McEra = styled.span`
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${colors.orangeText};
    background: ${colors.orangeSoft};
    padding: 3px 10px;
    border-radius: 20px;
`;

export const McSaved = styled.span`
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 500;
    color: ${colors.ink40};
`;

export const McTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 17px;
    font-weight: 500;
    color: ${colors.dark};
    margin: 0 0 8px;
    line-height: 1.25;
`;

export const McExcerpt = styled.p`
    font-family: ${fonts.display};
    font-size: 13px;
    font-style: italic;
    color: ${colors.ink70};
    line-height: 1.6;
    margin: 0 0 10px;
`;

/* ── The layers under a memory card ───────────────────────────────────────
 * The card is only the summary. These make the other two layers visible: the
 * verbatim transcript, and the moments kept as audio rather than as text.
 */

export const McLayers = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin: 0 0 10px;
`;

export const McLayerTab = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 4px 9px;
    min-height: 26px;
    border-radius: 20px;
    border: 1px solid ${colors.ink15};
    background: transparent;
    color: ${colors.ink70};
    cursor: pointer;
    transition: color 140ms ease, border-color 140ms ease, background 140ms ease;

    &:hover { border-color: ${colors.orangeText}; color: ${colors.orangeText}; }

    ${({ $active }) =>
        $active &&
        css`
            color: ${colors.orangeText};
            border-color: ${colors.orangeText};
            background: ${colors.orangeSoft};
        `}

    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

export const McTranscript = styled.div`
    margin: 2px 0 10px;
    padding: 10px 12px;
    background: ${colors.paper};
    border: 1px solid ${colors.ink08};
    border-radius: 10px;

    p {
        font-family: ${fonts.body};
        font-size: 11.5px;
        line-height: 1.65;
        color: ${colors.ink70};
        margin: 0 0 8px;
    }
    p:last-child { margin-bottom: 0; }

    .who {
        display: block;
        font-size: 9.5px;
        font-weight: 700;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: ${colors.ink40};
        margin-bottom: 2px;
    }
`;

/**
 * A voice highlight, shown as a labelled clip rather than a working player —
 * there is no audio behind the demo, and a play button that did nothing would
 * be a promise the page cannot keep.
 */
export const McClip = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    padding: 8px 10px;
    background: ${colors.paper};
    border: 1px solid ${colors.ink08};
    border-radius: 10px;

    svg { color: ${colors.orangeText}; flex-shrink: 0; }

    .label {
        font-family: ${fonts.body};
        font-size: 10.5px;
        font-weight: 600;
        color: ${colors.ink70};
    }

    .dur {
        margin-left: auto;
        font-family: ${fonts.body};
        font-size: 10px;
        color: ${colors.ink40};
        font-variant-numeric: tabular-nums;
    }
`;

/** The bars are decorative; the clip's meaning is carried by its label. */
export const McWave = styled.span`
    display: flex;
    align-items: center;
    gap: 2px;
    height: 16px;

    i {
        display: block;
        width: 2px;
        border-radius: 2px;
        background: ${colors.orangeText};
        opacity: 0.55;
    }
`;

/* ── What the archive added that the conversation didn't ──────────────────
 * Expanding a transcript directly under the conversation you just watched
 * shows nothing new. These two rows are the part that only exists because
 * the archive processed it: the people and places it recognised and linked,
 * and who in the family can now see it.
 */

export const McLinked = styled.div`
    display: flex;
    align-items: baseline;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 8px;

    .lbl {
        font-family: ${fonts.body};
        font-size: 9.5px;
        font-weight: 700;
        letter-spacing: .07em;
        text-transform: uppercase;
        color: ${colors.ink40};
    }
`;

export const McChip = styled.span`
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 600;
    color: ${colors.orangeText};
    background: ${colors.orangeSoft};
    border-radius: 20px;
    padding: 2px 8px;
`;

export const McShared = styled.p`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 0 10px;
    font-family: ${fonts.body};
    font-size: 10.5px;
    color: ${colors.ink70};

    b { font-weight: 600; color: ${colors.dark}; }
    svg { color: ${colors.ink40}; flex-shrink: 0; }
`;

/** Timestamp beside each transcript line — proof it is indexed, not pasted. */
export const McAt = styled.span`
    font-family: ${fonts.body};
    font-size: 9.5px;
    font-variant-numeric: tabular-nums;
    color: ${colors.ink40};
    margin-left: 6px;
    font-weight: 500;
    letter-spacing: .02em;
`;

export const McMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-family: ${fonts.body};
    font-size: 10px;
    color: ${colors.ink40};
`;

export const McSep = styled.span`
    opacity: 0.4;
`;

/* ── The depth ladder ─────────────────────────────────────────────────────
 * The single most misread thing about this product is that it is a list of
 * questions. It is not: the interview climbs, and each rung is only asked once
 * the one below it has been answered. The demo used to hide that — it looked
 * like the AI was hopping from grandfather to porch to fireflies, when in fact
 * it was refusing to leave one evening and pushing further into it each time.
 * This band makes the climb visible while it happens. The five names are the
 * app's own, from src/data/interview.js via ../lib/product.
 */
export const DepthBand = styled.div<{ $show: boolean }>`
    position: sticky;
    top: 0;
    z-index: 3;
    display: ${({ $show }) => ($show ? 'block' : 'none')};
    padding: 8px 14px 9px;
    background: ${colors.dark};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const DepthHead = styled.p`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin: 0 0 6px;
    font-family: ${fonts.body};
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${colors.fire60};

    b {
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: none;
        font-size: 11px;
        color: ${colors.gold};
    }
`;

export const DepthRungs = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
`;

/* The bar thickens as the interview earns the next rung — the same signal the
   ladder uses on /experience, so the two pages describe one mechanism. */
export const DepthRung = styled.span<{ $level: number; $on: boolean }>`
    height: ${({ $level }) => 2 + $level}px;
    border-radius: 2px;
    background: ${({ $on }) => ($on ? colors.gold : 'rgba(255, 255, 255, 0.16)')};
    transition: background 420ms ease;
    align-self: end;

    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

/* The line the AI is holding to, shown as a system note rather than a bubble:
   it is the interview's reasoning, not something anyone said out loud. */
/* Lives inside the sticky band, and keeps its height when empty so the chat
   underneath doesn't jump every time the reasoning changes. */
export const StayNote = styled.p<{ $show: boolean }>`
    margin: 7px 0 0;
    padding-left: 8px;
    border-left: 2px solid ${colors.gold};
    min-height: 30px;
    /* Block, not flex: as a flex item the "Why this question:" label became its
       own column and wrapped away from the sentence it introduces. */
    display: block;
    font-family: ${fonts.body};
    font-size: 10.5px;
    line-height: 1.45;
    color: ${colors.fire60};
    opacity: ${({ $show }) => ($show ? 1 : 0)};
    transition: opacity 320ms ease;

    b { color: ${colors.gold}; font-weight: 600; margin-right: 4px; }

    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

/* ── Memory-card panels ───────────────────────────────────────────────── */

export const McPanel = styled.div`
    margin: 0 0 10px;
`;

/* The readable summary — the layer the family actually meets first. The card
   used to open on a pull quote, which read well and told nobody what the
   conversation had been about. */
export const McSummary = styled.p`
    font-family: ${fonts.body};
    font-size: 11.5px;
    line-height: 1.65;
    color: ${colors.ink70};
    margin: 0 0 8px;
`;

export const McVoiceNote = styled.p`
    margin: 8px 0 0;
    font-family: ${fonts.body};
    font-size: 10.5px;
    line-height: 1.55;
    color: ${colors.ink70};
`;

/* Who else is in this archive, and what they are allowed to do to it. The app
   has three real tiers — owner, manager (invited family, read + edit), and
   anyone with the contribute link (submits, pending approval). The card is
   where that becomes concrete rather than a claim on a marketing page. */
export const McFamily = styled.div`
    margin: 0 0 10px;
    padding: 9px 10px;
    background: ${colors.paper};
    border: 1px solid ${colors.ink08};
    border-radius: 10px;

    .row {
        display: flex;
        align-items: flex-start;
        gap: 7px;
        font-family: ${fonts.body};
        font-size: 10.5px;
        line-height: 1.5;
        color: ${colors.ink70};
    }

    .row + .row { margin-top: 7px; }

    b { color: ${colors.dark}; font-weight: 600; }

    svg { flex-shrink: 0; margin-top: 1px; color: ${colors.orangeText}; }
`;

export const McPending = styled.span`
    display: inline-block;
    margin-left: 4px;
    padding: 1px 6px;
    border-radius: 20px;
    border: 1px solid ${colors.ink15};
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: ${colors.ink40};
`;

/* The demo's one editorial line — that this evening belongs to a man who died
   in 2009, and the archive exists anyway. Everything else on the card is
   mechanism; this is the argument. */
export const McAbout = styled.p`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 0 10px;
    padding: 7px 10px;
    background: ${colors.orangeSoft};
    border-radius: 8px;
    font-family: ${fonts.body};
    font-size: 10.5px;
    line-height: 1.5;
    color: ${colors.ink70};

    b { color: ${colors.orangeText}; font-weight: 600; }
    svg { flex-shrink: 0; color: ${colors.orangeText}; }
`;

/* ── The permission line ──────────────────────────────────────────────────
 * 64 of the app's 504 questions are marked sensitive — loss, hardship,
 * rupture, private — and they arrive with a sentence rather than a warning
 * triangle (phone-app-main/src/lib/sensitivity.js). It is the clearest single
 * signal in the product that this was built by somebody who has sat with an
 * eighty-year-old, so the demo shows the line itself, above the question it
 * belongs to, rendered as a system note rather than as speech: A Story does
 * not read it out, it is what the app puts on the screen.
 */
export const SensitiveNote = styled.p<{ $show: boolean }>`
    align-self: flex-start;
    max-width: 92%;
    margin: 2px 0 -2px;
    padding: 6px 10px;
    border-radius: 10px;
    border: 1px dashed ${colors.ink15};
    background: ${colors.paper};
    font-family: ${fonts.body};
    font-size: 10px;
    line-height: 1.5;
    color: ${colors.ink70};
    opacity: ${({ $show }) => ($show ? 1 : 0)};
    transform: translateY(${({ $show }) => ($show ? '0' : '4px')});
    transition: opacity 320ms ease, transform 320ms ease;

    b {
        display: block;
        font-weight: 700;
        font-size: 9px;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: ${colors.orangeText};
        margin-bottom: 2px;
    }

    @media (prefers-reduced-motion: reduce) { transition: none; transform: none; }
`;

/* The terracotta line under the title: when it happened and how old they were.
   lib/memoryCard.js's dateLine(), which every card in the app draws. */
export const McDate = styled.p`
    margin: -4px 0 9px;
    font-family: ${fonts.body};
    font-size: 10.5px;
    font-weight: 600;
    color: ${colors.orangeText};
`;

/* Said once, under the tabs, while the demo cycles them — otherwise three
   pills read as decoration and nobody presses one. */
export const McLayersHint = styled.p<{ $show: boolean }>`
    margin: -4px 0 10px;
    font-family: ${fonts.body};
    font-size: 9.5px;
    line-height: 1.5;
    color: ${colors.ink40};
    opacity: ${({ $show }) => ($show ? 1 : 0)};
    transition: opacity 300ms ease;

    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

/* ── The reel ─────────────────────────────────────────────────────────────
 * Three conversations rather than one, because no single call can show the
 * whole mechanism: one has a sensitive question arriving with permission, one
 * has a storyteller refusing a question, one has a memory about somebody who
 * has died. Three across on a desk, one column on a phone — never two, which
 * leaves an orphan.
 */
export const ReelGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 2.6vw, 36px);
    align-items: start;

    @media (max-width: 1080px) {
        grid-template-columns: minmax(0, 1fr);
        justify-items: center;
        gap: 56px;
    }
`;

export const ReelItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    /* The same 330px the phone is capped at, so the heading's left edge and the
       phone's left edge are one line rather than two. */
    max-width: 330px;

    @media (max-width: 1080px) { margin: 0 auto; }
`;

export const ReelHead = styled.div`
    width: 100%;
`;

/*
 * The slot the phone sits in.
 *
 * There used to be a bare <div> here, carrying the analytics click handler and
 * no styles. As a flex item of ReelItem it shrink-wrapped to its content — and
 * since the cover is absolutely positioned it contributes no intrinsic width,
 * so the phone's `width: 100%` had nothing to resolve against and its
 * aspect-ratio ran backwards, deriving a 185px width from whatever height the
 * near-empty body happened to have. A wrapper with no styles is still a box.
 */
export const ReelSlot = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const ReelChapter = styled.p`
    margin: 0 0 5px;
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.orangeText};
`;

export const ReelTitle = styled.h3`
    margin: 0 0 6px;
    font-family: ${fonts.display};
    font-size: 1.35rem;
    font-weight: 500;
    line-height: 1.2;
    color: ${colors.dark};
`;

export const ReelWatch = styled.p`
    margin: 0;
    font-family: ${fonts.body};
    font-size: 0.875rem;
    line-height: 1.55;
    color: ${colors.ink70};
`;

/* ── The closed state ─────────────────────────────────────────────────────
 * Nothing plays until somebody asks for it.
 *
 * Three conversations running unasked, side by side, is a wall of noise, and
 * more to the point it is the wrong posture for the material: these calls are
 * a stranger's worst year, and the page should make a viewer choose to open
 * one. The cover has to do the work a thumbnail does — carry the line that
 * makes somebody want it, say whose it is, and say how long it takes.
 */
export const Cover = styled.div<{ $gone: boolean }>`
    position: absolute;
    inset: 0;
    z-index: 4;
    display: flex;
    flex-direction: column;
    /* Centred, not bottom-aligned: flex-end overflows upward and silently
       crops the quote, which is the one thing on the cover that has to be
       read. The scroll is a floor for very short phones, not a design. */
    justify-content: center;
    overflow-y: auto;
    gap: 12px;
    padding: 26px 22px 22px;
    background: ${colors.dark};
    color: ${colors.fireText};
    opacity: ${({ $gone }) => ($gone ? 0 : 1)};
    pointer-events: ${({ $gone }) => ($gone ? 'none' : 'auto')};
    transition: opacity 420ms ease;

    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

export const CoverChapter = styled.p`
    margin: 0;
    font-family: ${fonts.body};
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.gold};
`;

export const CoverQuote = styled.blockquote`
    margin: 0;
    font-family: ${fonts.display};
    font-size: 21px;
    font-style: italic;
    line-height: 1.32;
    color: ${colors.fireText};
`;

export const CoverAttribution = styled.p`
    margin: 0;
    font-family: ${fonts.body};
    font-size: 11px;
    font-weight: 600;
    color: ${colors.gold};
`;

export const CoverLead = styled.p`
    margin: 0;
    font-family: ${fonts.body};
    font-size: 11.5px;
    line-height: 1.55;
    color: ${colors.fire60};
`;

export const CoverOpen = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 48px;
    margin-top: 4px;
    padding: 0 16px;
    font-family: ${fonts.body};
    font-size: 13.5px;
    font-weight: 600;
    color: ${colors.onAccent};
    background: ${colors.orange};
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: filter 160ms ease;

    &:hover { filter: brightness(1.08); }
    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

export const CoverLength = styled.p`
    margin: 0;
    text-align: center;
    font-family: ${fonts.body};
    font-size: 10px;
    color: ${colors.fire60};
`;

/* The phone needs to be the positioning context for the cover that covers it. */
export const PhoneStage = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    min-height: 0;
`;

/* ── The move being made ──────────────────────────────────────────────────
 * Naming the technique above the reasoning is what turns the band from a
 * progress bar into the argument. "Follow the aside, not the answer" is a
 * thing an interviewer does on purpose; without the label a viewer sees the
 * same AI asking another question.
 */
export const MethodTag = styled.span`
    display: inline-block;
    margin-bottom: 3px;
    padding: 2px 7px;
    border-radius: 20px;
    background: rgba(224, 160, 63, 0.16);
    font-family: ${fonts.body};
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${colors.gold};
`;

/* ── After the card ───────────────────────────────────────────────────────
 * The demo used to end by handing the viewer a microphone and inviting them
 * to speak a memory into the page. That is a free turn with nowhere to go:
 * whatever they said was thrown away on reload, and the one thing the page
 * needed them to do — start an archive — was not what it asked for.
 */
export const DemoClose = styled.div`
    flex-shrink: 0;
    padding: 4px 20px 22px;
`;

export const DemoCloseInner = styled.div`
    padding: 16px;
    border-radius: 14px;
    background: ${colors.dark};
    text-align: center;
`;

export const DemoCloseTitle = styled.p`
    margin: 0 0 4px;
    font-family: ${fonts.display};
    font-size: 17px;
    line-height: 1.25;
    color: ${colors.fireText};
`;

export const DemoCloseSub = styled.p`
    margin: 0 0 12px;
    font-family: ${fonts.body};
    font-size: 11px;
    line-height: 1.55;
    color: ${colors.fire60};
`;

export const DemoCloseLink = styled(Link)`
    display: block;
    min-height: 42px;
    line-height: 42px;
    border-radius: 10px;
    background: ${colors.gold};
    font-family: ${fonts.body};
    font-size: 13px;
    font-weight: 600;
    color: ${colors.dark};
    text-decoration: none;
    transition: filter 160ms ease;

    &:hover { filter: brightness(1.06); }
    @media (prefers-reduced-motion: reduce) { transition: none; }
`;
