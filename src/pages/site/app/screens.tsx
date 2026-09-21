/**
 * Screens from the A Story app (founder's Figma), rebuilt for the website.
 * Sized in container units — see Phone.tsx. Scenes animate parts of a screen
 * by the `data-*` hooks noted on each one; with reduced motion everything is
 * simply shown.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import Logo from "../../../components/ui/Logo";
import { color, font } from "../../../styles/theme";
import { AppPhoto } from "./Phone";
import { Avatar, appTint, avatarTints } from "./tokens";

/* ── Shared pieces ──────────────────────────────────────────────────────── */

const Icon = {
  back: <path d="M15 5l-7 7 7 7" />,
  heart: (
    <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
  ),
  dots: <path d="M5 12h.01M12 12h.01M19 12h.01" strokeWidth="3" />,
  pause: <path d="M9 6v12M15 6v12" strokeWidth="2.6" />,
  mic: (
    <path d="M12 4a3 3 0 013 3v5a3 3 0 01-6 0V7a3 3 0 013-3zM6 11a6 6 0 0012 0M12 17v3" />
  ),
  pen: <path d="M5 19l3.5-.8L19 7.7 16.3 5 5.8 15.5 5 19zM14 7l3 3" />,
  play: <path d="M9 6l9 6-9 6z" fill="currentColor" />,
  phone: (
    <path d="M6 4h3l1.5 4-2 1.3a11 11 0 005.2 5.2l1.3-2L19 14v3a2 2 0 01-2 2A14 14 0 014 6a2 2 0 012-2z" />
  ),
  search: <path d="M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4" />,
  people: (
    <path d="M9 11a3 3 0 100-6 3 3 0 000 6zM3 19c0-3 3-5 6-5s6 2 6 5M16 5a3 3 0 010 6M18 14c2 .6 3 2.3 3 5" />
  ),
};
function I({ d, size = "5cqw" }: { d: keyof typeof Icon; size?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {Icon[d]}
    </svg>
  );
}

const Wave = styled.span<{ $n?: number }>`
  display: flex;
  align-items: center;
  gap: 0.55cqw;
  height: 7cqw;
  flex: 1;
  i {
    flex: 1;
    border-radius: 2px;
    background: currentColor;
    opacity: 0.8;
  }
`;
/** A waveform with a fixed, pleasant shape (no randomness: prerender must be stable). */
function Waveform({ bars = 34 }: { bars?: number }) {
  return (
    <Wave>
      {Array.from({ length: bars }, (_, i) => (
        <i
          key={i}
          style={{
            height: `${22 + Math.abs(Math.sin(i * 1.7) * 60 + Math.cos(i * 0.6) * 18)}%`,
          }}
        />
      ))}
    </Wave>
  );
}

const Chip = styled.span<{ $dot?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 1.2cqw;
  padding: 0.9cqw 2.4cqw;
  border-radius: 99px;
  background: ${color.paperPure};
  box-shadow: inset 0 0 0 1px ${color.primaryLine};
  font: 500 2.9cqw/1.2 ${font.body};
  color: ${color.bodyMuted};
  &::before {
    content: "";
    width: 1.6cqw;
    height: 1.6cqw;
    border-radius: 50%;
    background: ${({ $dot }) => $dot ?? color.teal};
  }
`;

/* ── The call (Figma: Recording) ────────────────────────────────────────── */

const Call = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 13cqw 5.5cqw 7cqw;
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .round {
    display: grid;
    place-items: center;
    width: 9cqw;
    height: 9cqw;
    border-radius: 50%;
    background: ${color.paperPure};
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
  }
  .live {
    display: inline-flex;
    align-items: center;
    gap: 1.6cqw;
    padding: 1.6cqw 3cqw;
    border-radius: 99px;
    background: ${color.primary};
    color: ${color.ivory};
    font: 600 3cqw/1 ${font.body};
  }
  .live::before {
    content: "";
    width: 1.8cqw;
    height: 1.8cqw;
    border-radius: 50%;
    background: ${color.warmGold};
    box-shadow: 0 0 0 1cqw
      color-mix(in srgb, ${color.warmGold} 30%, transparent);
  }
  .who {
    margin: 5cqw 0 1cqw;
    text-align: center;
  }
  .who h4 {
    font: 700 5.6cqw/1.2 ${font.body};
    color: ${color.primary};
  }
  .who p {
    font: 500 3.2cqw/1.3 ${font.body};
    color: ${color.accentText};
    margin-top: 1cqw;
  }
  .talk {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 2.6cqw;
    padding: 4cqw 0 3cqw;
    mask-image: linear-gradient(transparent, #000 14%);
  }
  .bubble {
    max-width: 86%;
    padding: 3cqw 3.6cqw;
    border-radius: 4.5cqw;
    font: 400 3.7cqw/1.45 ${font.body};
    transition:
      opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  /* Played by a scene (CallTrio): turns wait until the playhead reaches them. */
  .talk.is-played .bubble:not(.on) {
    display: none;
  }
  .typing {
    display: inline-flex;
    gap: 1.2cqw;
    padding: 3.2cqw 4cqw;
    border-radius: 4.5cqw;
    background: ${color.paperPure};
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
  }
  .typing.them {
    align-self: flex-end;
    background: ${appTint.butter};
    box-shadow: none;
  }
  .typing.ai {
    align-self: flex-start;
  }
  .typing i {
    width: 1.6cqw;
    height: 1.6cqw;
    border-radius: 50%;
    background: ${color.bodyMuted};
    animation: call-typing 1.1s infinite ease-in-out;
  }
  .typing i:nth-child(2) {
    animation-delay: 0.15s;
  }
  .typing i:nth-child(3) {
    animation-delay: 0.3s;
  }
  @keyframes call-typing {
    0%,
    60%,
    100% {
      opacity: 0.25;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-0.8cqw);
    }
  }
  .bubble.on {
    animation: call-in 600ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes call-in {
    from {
      opacity: 0;
      transform: translateY(3cqw);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .bubble.on,
    .typing i {
      animation: none;
    }
  }
  .bubble small {
    display: block;
    margin-bottom: 1cqw;
    font: 700 2.5cqw/1.2 ${font.body};
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .ai {
    align-self: flex-start;
    background: ${color.paperPure};
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
    border-bottom-left-radius: 1.4cqw;
    color: ${color.primary};
  }
  .ai small {
    color: ${color.teal};
  }
  .them {
    align-self: flex-end;
    background: ${appTint.butter};
    border-bottom-right-radius: 1.4cqw;
    color: ${color.primary};
    font-family: ${font.display};
    font-size: 4cqw;
  }
  .them small {
    font-family: ${font.body};
    color: ${color.accentText};
  }
  .follow {
    background: ${color.teal};
    color: ${color.ivory};
    box-shadow: none;
  }
  .follow small {
    color: ${color.gold};
  }
  mark {
    color: inherit;
    background: linear-gradient(
        color-mix(in srgb, ${color.warmGold} 70%, transparent),
        color-mix(in srgb, ${color.warmGold} 70%, transparent)
      )
      0 100% / var(--lit, 100%) 0.9cqw no-repeat;
    transition: background-size 900ms 700ms ease;
  }
  .talk.is-played mark {
    --lit: 0%;
  }
  .talk.is-played .lit mark {
    --lit: 100%;
  }
  /* "It remembers": the call is saved, and the sheet rises over the player. */
  .saved {
    flex: none;
    margin: 0 -2.5cqw;
    padding: 5cqw 5cqw 6cqw;
    border-radius: 7cqw;
    background: ${color.paperPure};
    box-shadow: 0 -2cqw 8cqw -2cqw rgba(42, 31, 24, 0.35);
    animation: call-in 700ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .saved small {
    display: flex;
    align-items: center;
    gap: 1.6cqw;
    font: 700 2.6cqw/1.2 ${font.body};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${color.teal};
  }
  .saved small::before {
    content: "✓";
    display: grid;
    place-items: center;
    width: 4.4cqw;
    height: 4.4cqw;
    border-radius: 50%;
    background: ${color.teal};
    color: ${color.ivory};
    font-size: 2.6cqw;
    letter-spacing: 0;
  }
  .saved h5 {
    margin: 2.4cqw 0 1cqw;
    font: 700 5cqw/1.2 ${font.body};
    color: ${color.primary};
  }
  .saved p {
    font: 500 3cqw/1.3 ${font.body};
    color: ${color.accentText};
  }
  .saved .kept {
    justify-content: flex-start;
    margin: 3.4cqw 0 0;
  }
  .kept {
    display: flex;
    gap: 1.6cqw;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3cqw;
  }
  .kept span {
    padding: 1.2cqw 2.6cqw;
    border-radius: 99px;
    background: ${appTint.green};
    font: 600 2.8cqw/1.2 ${font.body};
    color: ${color.primary};
  }
  .player {
    display: grid;
    gap: 3cqw;
  }
  .progress {
    display: flex;
    align-items: center;
    gap: 2.4cqw;
    font: 500 2.8cqw/1 ${font.body};
    color: ${color.bodyMuted};
    font-variant-numeric: tabular-nums;
  }
  .progress b {
    flex: 1;
    height: 0.8cqw;
    border-radius: 99px;
    background:
      linear-gradient(${color.primary}, ${color.primary}) 0 0 / 38% 100%
        no-repeat,
      ${color.primaryLine};
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7cqw;
    color: ${color.primary};
  }
  .pause {
    display: grid;
    place-items: center;
    width: 15cqw;
    height: 15cqw;
    border-radius: 50%;
    background: ${color.primary};
    color: ${color.ivory};
  }
`;

/**
 * A live call in the app. Hooks: `data-step="1…4"` on the turns and the
 * "kept" row, so a scene can reveal the call one layer at a time.
 */
export function CallScreen({
  teller,
  title,
  chapter,
  ask,
  answer,
  follow,
  kept,
  stage,
  typing,
  progress = 0.38,
  paused = false,
}: {
  teller: string;
  title: string;
  chapter: string;
  ask: string;
  answer: ReactNode;
  follow: string;
  kept: string[];
  /** Played by a scene: 1–3 turns shown, 4 = saved. Omit to show the whole call. */
  stage?: number;
  /** Who is about to speak, while the playhead waits for the turn. */
  typing?: "ai" | "them";
  progress?: number;
  paused?: boolean;
}) {
  const played = stage !== undefined;
  const on = (n: number) => (!played || stage >= n ? " on" : "");
  const saved = !played || stage >= 4;
  // The call's own clock: this excerpt is minutes 12:48–26:57 of the call.
  const secs = Math.round(768 + progress * (1617 - 768));
  const clock = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  return (
    <Call>
      <div className="bar">
        <span className="round">
          <I d="back" size="4.4cqw" />
        </span>
        <span className="live">
          Calling {teller} · {clock}
        </span>
        <span className="round">
          <I d="dots" size="4.4cqw" />
        </span>
      </div>
      <div className="who">
        <h4>{title}</h4>
        <p>{chapter}</p>
      </div>
      <div className={`talk${played ? " is-played" : ""}`}>
        <p className={"bubble ai" + on(1)} data-step="1">
          <small>A Story asks</small>
          {ask}
        </p>
        <p
          className={
            "bubble them" + on(2) + (!played || stage >= 2 ? " lit" : "")
          }
          data-step="2"
        >
          <small>{teller}</small>
          {answer}
        </p>
        <p className={"bubble ai follow" + on(3)} data-step="3">
          <small>A Story follows</small>
          {follow}
        </p>
        {typing && (
          <span className={`typing ${typing}`} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
      </div>
      {!played && (
        <div className="kept" data-step="4">
          {kept.map((k) => (
            <span key={k}>{k}</span>
          ))}
        </div>
      )}
      {!(played && saved) && (
        <div className="player">
          <div className="progress">
            <span>{clock}</span>
            <b
              style={{
                backgroundSize: `${Math.round(progress * 100)}% 100%, auto`,
              }}
            />
            <span>26:57</span>
          </div>
          <div className="controls">
            <I d="back" size="5cqw" />
            <span className="pause">
              <I d={paused ? "play" : "pause"} size="6cqw" />
            </span>
            <span style={{ transform: "scaleX(-1)", display: "grid" }}>
              <I d="back" size="5cqw" />
            </span>
          </div>
        </div>
      )}
      {played && saved && (
        <div className="saved">
          <small>Saved to {teller}’s archive</small>
          <h5>{title}</h5>
          <p>
            {chapter} · a card, every word, and a thread to pick up next call
          </p>
          <div className="kept">
            {kept.map((k) => (
              <span key={k}>{k}</span>
            ))}
          </div>
        </div>
      )}
    </Call>
  );
}

/* ── A memory, and the family adding to it (Figma: memory detail) ───────── */

const Memory = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  .hero {
    position: relative;
    height: 36%;
    flex: none;
  }
  .hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hero .round {
    position: absolute;
    top: 13cqw;
    left: 5cqw;
    display: grid;
    place-items: center;
    width: 9cqw;
    height: 9cqw;
    border-radius: 50%;
    background: color-mix(in srgb, ${color.ivory} 80%, transparent);
  }
  .sheet {
    position: relative;
    flex: 1;
    min-height: 0;
    margin-top: -7cqw;
    padding: 5.5cqw 5.5cqw 0;
    border-radius: 7cqw 7cqw 0 0;
    background: ${color.ivory};
    display: flex;
    flex-direction: column;
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 2cqw;
    flex-wrap: wrap;
    font: 500 3cqw/1.2 ${font.body};
    color: ${color.bodyMuted};
  }
  h4 {
    margin: 3cqw 0 2cqw;
    text-align: center;
    font: 700 6cqw/1.15 ${font.body};
    color: ${color.primary};
  }
  .told {
    display: flex;
    gap: 2.4cqw;
    padding-bottom: 3cqw;
    border-bottom: 1px solid ${color.primaryLine};
    font: 400 3.3cqw/1.45 ${font.display};
    color: ${color.body};
  }
  .told b {
    display: block;
    font: 600 2.8cqw/1.2 ${font.body};
    color: ${color.teal};
    margin-bottom: 0.8cqw;
  }
  .versions {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 2.2cqw;
    padding-top: 3cqw;
  }
  .versions h5 {
    font: 700 3.4cqw/1.2 ${font.body};
    color: ${color.primary};
  }
  /* Each invited person has a place waiting before their version arrives. */
  .slot {
    position: relative;
    border-radius: 3.4cqw;
    outline: 1px dashed ${color.primaryLineStrong};
    outline-offset: -1px;
  }
  .slot .waiting {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 2cqw;
    padding: 0 3cqw;
    font: 500 2.8cqw/1.2 ${font.body};
    color: ${color.bodyMuted};
  }
  .slot .waiting::before {
    content: "";
    width: 2cqw;
    height: 2cqw;
    border-radius: 50%;
    border: 1px solid currentColor;
  }
  .voice {
    position: relative;
    display: flex;
    gap: 2.4cqw;
    align-items: flex-start;
    padding: 2.4cqw 2.8cqw;
    border-radius: 3.4cqw;
    background: var(--tint);
  }
  .voice p {
    font: 400 3.1cqw/1.4 ${font.display};
    color: ${color.primary};
  }
  .voice b {
    display: flex;
    justify-content: space-between;
    gap: 2cqw;
    font: 600 2.6cqw/1.2 ${font.body};
    color: ${color.bodyMuted};
    margin-bottom: 0.6cqw;
  }
  .review {
    display: flex;
    align-items: center;
    gap: 2.4cqw;
    margin: 0 -5.5cqw;
    padding: 3.2cqw 5.5cqw;
    background: ${appTint.butter};
    border-top: 1px solid color-mix(in srgb, ${color.goldDeep} 50%, transparent);
    font: 500 3.1cqw/1.3 ${font.body};
    color: ${color.primary};
  }
  .review strong {
    margin-left: auto;
    padding: 1.4cqw 3cqw;
    border-radius: 99px;
    background: ${color.primary};
    color: ${color.ivory};
    font: 600 2.8cqw/1 ${font.body};
  }
  .audio {
    display: flex;
    align-items: center;
    gap: 2.4cqw;
    margin: 0 -5.5cqw;
    padding: 3cqw 5.5cqw 8cqw;
    background: ${color.paperPure};
    color: ${color.primaryMid};
    font: 500 2.8cqw/1 ${font.body};
  }
  .audio .play {
    display: grid;
    place-items: center;
    width: 8cqw;
    height: 8cqw;
    border-radius: 50%;
    background: ${color.primary};
    color: ${color.ivory};
  }
`;

type Voice = { name: string; initial: string; kind: string; quote: string };

/**
 * A memory page with other people's versions under it. Hooks: `data-voice`
 * on each added version, `data-review` on the banner asking the teller to
 * approve what arrived.
 */
export function MemoryScreen({
  photo,
  date,
  tags,
  title,
  teller,
  told,
  voices,
  pending,
}: {
  photo: string;
  date: string;
  tags: readonly string[];
  title: string;
  teller: { name: string; initial: string };
  told: string;
  voices: readonly Voice[];
  pending: number;
}) {
  return (
    <Memory>
      <div className="hero">
        <AppPhoto id={photo} />
        <span className="round">
          <I d="back" size="4.4cqw" />
        </span>
      </div>
      <div className="sheet">
        <div className="meta">
          <span>{date}</span>
          {tags.map((t, i) => (
            <Chip key={t} $dot={i ? color.accent : color.teal}>
              {t}
            </Chip>
          ))}
        </div>
        <h4>{title}</h4>
        <div className="told">
          <Avatar $bg={color.primary}>{teller.initial}</Avatar>
          <p>
            <b>{teller.name} · told in a call</b>“{told}”
          </p>
        </div>
        <div className="versions">
          {voices.length > 0 && <h5>Everyone’s version</h5>}
          {voices.map((v, i) => (
            <div className="slot" key={v.name}>
              <span className="waiting">Invited · {v.name.split(",")[0]}</span>
              <div
                className="voice"
                data-voice
                style={{
                  ["--tint" as string]: [
                    appTint.pink,
                    appTint.blue,
                    appTint.green,
                  ][i % 3],
                }}
              >
                <Avatar $bg={avatarTints[i % avatarTints.length]}>
                  {v.initial}
                </Avatar>
                <div>
                  <b>
                    <span>{v.name}</span>
                    <span>{v.kind}</span>
                  </b>
                  <p>“{v.quote}”</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {pending > 0 && (
          <div className="review" data-review>
            <I d="people" size="5cqw" />
            {pending} additions waiting for {teller.name.split(" ").pop()}
            <strong>Review</strong>
          </div>
        )}
        <div className="audio">
          <span className="play">
            <I d="play" size="3.6cqw" />
          </span>
          <Waveform bars={30} />
          <span>0:32</span>
        </div>
      </div>
    </Memory>
  );
}

/* ── Home (Figma: Home) — for "set it up once" ──────────────────────────── */

const Home = styled.div`
  position: absolute;
  inset: 0;
  .top {
    height: 34cqw;
    display: grid;
    place-items: end center;
    padding-bottom: 7cqw;
    background: ${color.primary};
    border-radius: 0 0 50% 50% / 0 0 22% 22%;
  }
  .top a {
    pointer-events: none;
  }
  .top svg {
    height: 9cqw;
    width: auto;
  }
  .body {
    padding: 4cqw 5cqw;
  }
  .hello {
    display: flex;
    align-items: center;
    gap: 2.6cqw;
  }
  .hello small {
    display: block;
    font: 600 2.9cqw/1.2 ${font.body};
    letter-spacing: 0.06em;
    color: ${color.accentText};
  }
  .hello span {
    font: 500 3.6cqw/1.3 ${font.body};
  }
  .week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1cqw;
    margin: 4.5cqw 0;
    text-align: center;
    font: 400 2.8cqw/1 ${font.body};
    color: ${color.bodyMuted};
  }
  .week i {
    display: grid;
    place-items: center;
    width: 8cqw;
    height: 8cqw;
    margin: 1.6cqw auto 0;
    border-radius: 50%;
    font-style: normal;
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
    background: ${color.paperPure};
  }
  .week .on i {
    background: ${color.primary};
    color: ${color.ivory};
    box-shadow: none;
  }
  .question {
    padding: 4cqw;
    border-radius: 4cqw;
    background: ${color.paperPure};
    box-shadow: 0 1px 0 ${color.primaryLine};
  }
  .question h5 {
    font: 700 3.6cqw/1.2 ${font.body};
    color: ${color.accent};
  }
  .question p {
    margin: 1.6cqw 0 3cqw;
    font: 400 3.3cqw/1.4 ${font.body};
    color: ${color.primary};
  }
  .question span {
    display: inline-flex;
    align-items: center;
    gap: 1.4cqw;
    padding: 1.6cqw 3cqw;
    border-radius: 99px;
    box-shadow: inset 0 0 0 1px ${color.accent};
    font: 500 2.9cqw/1 ${font.body};
    color: ${color.accent};
  }
  .when {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3.6cqw;
    padding: 3.2cqw 4cqw;
    border-radius: 4cqw;
    background: ${appTint.green};
    font: 500 3.2cqw/1.3 ${font.body};
  }
  .when b {
    font-weight: 700;
  }
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.6cqw;
    margin-top: 3.6cqw;
  }
  .buttons span {
    display: grid;
    justify-items: center;
    gap: 1.2cqw;
    padding: 3.4cqw 2cqw;
    border-radius: 3cqw;
    font: 500 3cqw/1.2 ${font.body};
    box-shadow: inset 0 0 0 1px ${color.primary};
  }
  .buttons span:first-child {
    background: ${color.primary};
    color: ${color.ivory};
  }
`;

/** The app's home, with the call hour chosen. */
export function HomeScreen({
  name,
  storyteller,
  question,
  when,
}: {
  name: string;
  storyteller: string;
  question: string;
  when: string;
}) {
  return (
    <Home>
      <div className="top">
        <Logo tone="dark" height={30} />
      </div>
      <div className="body">
        <div className="hello">
          <Avatar $bg={color.accent}>{name[0]}</Avatar>
          <div>
            <small>GOOD EVENING, {name.toUpperCase()}!</small>
            <span>{storyteller} ▾</span>
          </div>
        </div>
        <div className="week">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
            <div key={d} className={i === 1 ? "on" : ""}>
              {d}
              <i>{7 + i}</i>
            </div>
          ))}
        </div>
        <div className="question">
          <h5>A little question for today,</h5>
          <p>{question}</p>
          <span>
            <I d="play" size="3cqw" /> Tap to listen
          </span>
        </div>
        <div className="when">
          <span>A Story calls</span>
          <b>{when}</b>
        </div>
        <div className="buttons">
          <span>
            <I d="mic" size="5cqw" />
            Live Conversation
          </span>
          <span>
            <I d="pen" size="5cqw" />
            Write your Memory
          </span>
        </div>
      </div>
    </Home>
  );
}

/* ── Incoming call — for "they answer the phone" ────────────────────────── */

const Incoming = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  justify-items: center;
  padding: 26cqw 8cqw 16cqw;
  background: radial-gradient(
    circle at 50% 30%,
    color-mix(in srgb, ${color.gold} 14%, ${color.primary}),
    ${color.primary} 70%
  );
  color: ${color.ivory};
  text-align: center;
  .mark a {
    pointer-events: none;
  }
  .mark svg {
    height: 22cqw;
    width: auto;
  }
  h5 {
    margin-top: 6cqw;
    font: 400 8cqw/1.1 ${font.display};
    color: ${color.ivory};
  }
  p {
    margin-top: 2cqw;
    font: 400 3.6cqw/1.4 ${font.body};
    color: ${color.onDarkMuted};
  }
  .q {
    margin-top: 8cqw;
    padding: 4cqw;
    border-radius: 4cqw;
    background: color-mix(in srgb, ${color.ivory} 10%, transparent);
    font: italic 400 3.8cqw/1.4 ${font.display};
  }
  .answer {
    display: flex;
    gap: 20cqw;
  }
  .answer span {
    display: grid;
    justify-items: center;
    gap: 2cqw;
    font: 500 3.2cqw/1 ${font.body};
  }
  .answer i {
    display: grid;
    place-items: center;
    width: 17cqw;
    height: 17cqw;
    border-radius: 50%;
    background: ${color.accent};
  }
  .answer span:last-child i {
    background: ${color.teal};
  }
  .answer span:first-child svg {
    transform: rotate(135deg);
  }
`;

/** The call arriving at the hour they chose. */
export function IncomingScreen({
  when,
  question,
}: {
  when: string;
  question: string;
}) {
  return (
    <Incoming>
      <div>
        <div className="mark">
          <Logo tone="dark" variant="mark" height={80} />
        </div>
        <h5>A Story</h5>
        <p>is calling · {when}</p>
        <p className="q">“{question}”</p>
      </div>
      <div className="answer">
        <span>
          <i>
            <I d="phone" size="7cqw" />
          </i>
          Later
        </span>
        <span>
          <i>
            <I d="phone" size="7cqw" />
          </i>
          Answer
        </span>
      </div>
    </Incoming>
  );
}

/* ── The archive (Figma: Archive) — for "the family keeps it" ───────────── */

const Archive = styled.div`
  position: absolute;
  inset: 0;
  padding: 13cqw 5cqw 0;
  h4 {
    text-align: center;
    font: 700 4.6cqw/1.2 ${font.body};
    margin-bottom: 4cqw;
  }
  .profile {
    padding: 3.6cqw;
    border-radius: 4cqw;
    background: ${color.paperPure};
    box-shadow: 0 1px 0 ${color.primaryLine};
  }
  .who {
    display: flex;
    align-items: center;
    gap: 2.6cqw;
    font: 600 3.8cqw/1.2 ${font.body};
  }
  .who small {
    display: block;
    font: 400 2.8cqw/1.2 ${font.body};
    color: ${color.bodyMuted};
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 3cqw;
    padding: 2.6cqw;
    border-radius: 3cqw;
    box-shadow: inset 0 0 0 1px ${color.primaryLine};
  }
  .stats b {
    display: block;
    font: 600 3.8cqw/1.2 ${font.body};
  }
  .stats span {
    font: 400 2.6cqw/1.2 ${font.body};
    color: ${color.bodyMuted};
  }
  .book {
    margin-top: 3cqw;
    padding: 3.4cqw;
    border-radius: 4cqw;
    background: ${color.paperPure};
    font: 600 3.2cqw/1.2 ${font.body};
  }
  .book i {
    display: block;
    height: 2.2cqw;
    margin-top: 2.4cqw;
    border-radius: 99px;
    background:
      linear-gradient(${color.accent}, ${color.accent}) 0 0 / 65% 100% no-repeat,
      ${color.primaryLine};
  }
  .banner {
    display: flex;
    align-items: center;
    gap: 2.6cqw;
    margin-top: 3cqw;
    padding: 3.2cqw;
    border-radius: 3.4cqw;
    background: ${appTint.butter};
    box-shadow: inset 0 0 0 1px
      color-mix(in srgb, ${color.goldDeep} 55%, transparent);
    font: 500 3.1cqw/1.35 ${font.body};
  }
  .card {
    display: flex;
    gap: 3cqw;
    margin-top: 3.4cqw;
    padding: 2.6cqw;
    border-radius: 4cqw;
    background: ${appTint.pink};
  }
  .card img {
    width: 28cqw;
    height: 24cqw;
    object-fit: cover;
    border-radius: 2.6cqw;
  }
  .card h5 {
    font: 700 3.8cqw/1.2 ${font.body};
    margin: 1.4cqw 0 0.8cqw;
  }
  .card p {
    font: 500 2.7cqw/1.3 ${font.body};
    color: ${color.accentText};
  }
  .stack {
    display: flex;
    margin-top: 2cqw;
  }
  .stack > * + * {
    margin-left: -2cqw;
  }
`;

/** The archive: the book filling up, and the family's additions waiting. */
export function ArchiveScreen({
  owner,
  stats,
  pending,
  memory,
}: {
  owner: string;
  stats: [string, string][];
  pending: number;
  memory: { title: string; date: string; photo: string };
}) {
  return (
    <Archive>
      <h4>The Archive</h4>
      <div className="profile">
        <div className="who">
          <Avatar $bg={color.primary}>{owner[0]}</Avatar>
          <div>
            {owner}
            <small>Kept by the whole family</small>
          </div>
        </div>
        <div className="stats">
          {stats.map(([v, l]) => (
            <div key={l}>
              <b>{v}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="book">
        {owner.split(" ")[0]}’s Book · 65%
        <i />
      </div>
      <div className="banner">
        <I d="people" size="5cqw" />
        {pending} contributions from family waiting for your review
      </div>
      <div className="card">
        <AppPhoto id={memory.photo} />
        <div>
          <Chip $dot={color.teal}>Family</Chip>
          <h5>{memory.title}</h5>
          <p>{memory.date}</p>
          <div className="stack">
            {["S", "L", "B"].map((x, i) => (
              <Avatar key={x} $bg={avatarTints[i]}>
                {x}
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </Archive>
  );
}
