/**
 * /l — where the listening codes printed in a book land.
 *
 * Scan the code beside a memory and the phone's browser opens
 * astoryapp.com/l?m=<memory>&k=<book key>; this page sends it straight on to
 * the app's `listen` function (supabase/functions/listen in the app), which
 * answers with the recording. The book points here, at our own domain,
 * rather than at the Supabase project address, because a printed book lasts
 * decades and a project address may not: if the backend ever moves, this one
 * line moves with it and every book already on a shelf keeps working.
 * (The app's lib/links.js LISTEN_URL points at this page.)
 *
 * A static host cannot redirect with the query string, so it is done here,
 * with location.replace — no history entry, so "back" returns to the camera.
 * A code missing either half, or a build without Supabase, says so plainly
 * rather than spinning.
 */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import { color, font } from "../../styles/theme";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "");

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  background: ${color.ivory};
  text-align: center;
  h1 {
    font: 400 clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem) / 1.2 ${font.display};
    color: ${color.primary};
  }
  p {
    margin-top: 12px;
    font: 400 17px/1.6 ${font.body};
    color: ${color.bodyMuted};
    max-width: 36ch;
    margin-inline: auto;
  }
  a {
    color: ${color.primary};
  }
`;

/** Where this code goes, or null when it cannot go anywhere. */
const destination = (): string | null => {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  if (!SUPABASE_URL || !q.get("m") || !q.get("k")) return null;
  return `${SUPABASE_URL}/functions/v1/listen?${q.toString()}`;
};

export default function Listen() {
  const [to] = useState(destination);
  const failed = to === null;
  useEffect(() => {
    if (to) window.location.replace(to);
  }, [to]);

  return (
    <Page>
      <Seo title="Listening - A Story" path="/l" description="A memory from an A Story book." noindex />
      <div role="status">
        <h1>{failed ? "This code didn’t open." : "Opening the recording…"}</h1>
        <p>
          {failed ? (
            <>
              Try scanning it again, a little closer. If it still won’t play, write to{" "}
              <a href="mailto:contact@astoryapp.com">contact@astoryapp.com</a> and we’ll help.
            </>
          ) : (
            "The voice that told this memory, in a moment."
          )}
        </p>
      </div>
    </Page>
  );
}
