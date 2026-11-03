/**
 * /l — where the listening codes printed in a book land.
 *
 * Scan the code beside a memory and the phone's browser opens
 * astoryapp.com/l?m=<memory>&k=<book key>. The book points here, at our own
 * domain, rather than at the Supabase project address, because a printed
 * book lasts decades and a project address may not: if the backend ever
 * moves, this one line moves with it and every book already on a shelf keeps
 * working. (The app's lib/links.js LISTEN_URL points at this page.)
 *
 * Premium pass (2026-11-02, design spec D5 and §4D): the recording plays in
 * our own branded page. The app's `listen` function answers a good code with
 * a 302 to a signed audio address and a bad one with a plain-text 404
 * (phone-app supabase/functions/listen, read only); an <audio> element
 * follows the 302, and its `error` event catches the 404. So the top frame
 * never leaves astoryapp.com, and nobody lands on a bare Supabase page.
 *
 *   - both `m` and `k`: the logo, "A memory from an A Story book.", a large
 *     "Play the recording" button and the native player (preload="none", so
 *     nothing is fetched before the tap);
 *   - the audio fails: "This recording didn't open." with what to try and
 *     two links;
 *   - a half code (or a build without Supabase): "This code didn't open."
 *     with the same two links.
 * The prerender (scripts/prerender.mjs visits /l?m=prerender&k=prerender)
 * shows the ready state. The slim footer closes every state.
 */
import { useRef, useState } from "react";
import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import Logo from "../../components/ui/Logo";
import Footer from "./Footer";
import { Frame, PrimaryButton, TextLink, groundVars } from "./kit/kit.styles";
import { prerendering } from "../../lib/app";
import { route } from "../../lib/nav";
import { SITE } from "../../lib/seo";
import { color, display, font, measure, radius, space, type } from "../../styles/theme";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "");

const Page = styled.main`
  ${groundVars("ivory")};
  min-height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr;
  background: ${color.ivory};
  color: var(--ink);
  .bar {
    padding-block: ${space.md};
    border-bottom: 1px solid ${color.primaryLine};
  }
  .stage {
    display: grid;
    align-content: center;
    justify-items: start;
    padding-block: calc(${space.section} * var(--sy, 1));
  }
  h1 {
    font: 600 ${display.lg} / 1.04 ${font.display};
    letter-spacing: -0.01em;
    color: var(--ink);
    max-width: 16ch;
    text-wrap: balance;
  }
  p {
    margin-top: ${space.lg};
    font: 400 ${type.read} / 1.58 ${font.text};
    color: var(--text);
    max-width: ${measure.read};
    text-wrap: pretty;
  }
  p a {
    color: var(--ink);
    text-underline-offset: 3px;
    overflow-wrap: anywhere;
  }
  .play {
    margin-top: ${space.xl};
    min-height: 60px;
    padding-inline: ${space.xl};
  }
  .play svg {
    width: 22px;
    height: 22px;
  }
  audio {
    display: block;
    width: min(100%, 520px);
    margin-top: ${space.lg};
    border-radius: ${radius.pill};
  }
  .ways {
    display: flex;
    flex-wrap: wrap;
    gap: 0 ${space.xl};
    margin-top: ${space.lg};
  }
`;

/** A filled play triangle, in the button's ink. */
function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 4.2v11.6L15.6 10z" fill="currentColor" />
    </svg>
  );
}

/** Where this code's recording is, or null when the code is not whole. */
const source = (): string | null => {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  if (!SUPABASE_URL || !q.get("m") || !q.get("k")) return null;
  return `${SUPABASE_URL}/functions/v1/listen?${q.toString()}`;
};

type State = "ready" | "playing" | "error" | "missing";

export default function Listen() {
  const [src] = useState(source);
  const audio = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<State>(() =>
    src || prerendering() ? "ready" : "missing",
  );
  const play = () => {
    const a = audio.current;
    if (!a) return;
    /* In the tap itself, so a phone allows the sound. A refusal leaves the
       native controls to try again; a broken code fires `error`. */
    a.play().catch(() => undefined);
  };
  const contact = route("/contact");
  const ways = (
    <div className="ways">
      <TextLink to="/">What is A Story?</TextLink>
      <TextLink to={contact.to}>{contact.label}</TextLink>
    </div>
  );
  const help = (
    <>
      If it still won’t play, write to{" "}
      <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we’ll help.
    </>
  );

  return (
    <>
      <Seo title="Listening - A Story" path="/l" description="A memory from an A Story book." noindex />
      <Page id="main">
        <div className="bar">
          <Frame>
            <Logo height={40} />
          </Frame>
        </div>
        <Frame className="stage">
          <div role="status">
            {state === "missing" ? (
              <>
                <h1>This code didn’t open.</h1>
                <p>Try scanning it again, a little closer. {help}</p>
              </>
            ) : state === "error" ? (
              <>
                <h1>This recording didn’t open.</h1>
                <p>Try scanning the code again, a little closer. {help}</p>
              </>
            ) : (
              <>
                <h1>A memory from an A Story book.</h1>
                <p>The voice that told this memory.</p>
              </>
            )}
          </div>
          {(state === "ready" || state === "playing") && (
            <>
              {state === "ready" && (
                <PrimaryButton type="button" className="play" onClick={play}>
                  <PlayIcon /> Play the recording
                </PrimaryButton>
              )}
              <audio
                ref={audio}
                controls
                preload="none"
                src={src ?? undefined}
                onPlay={() => setState("playing")}
                onError={() => setState("error")}
              />
            </>
          )}
          {ways}
        </Frame>
      </Page>
      <Footer variant="slim" />
    </>
  );
}
