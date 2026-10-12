/**
 * The family code a relative was sent, shown large when they land here
 * from the invitation email (astoryapp.com/?ref=K7M2QX).
 *
 * The email's "Open in the app" link is an astory:// link, which only
 * works once the app is installed, and Messages on iOS doesn't make it
 * tappable at all; the web link is what most people reach. Until
 * Universal Links exist (an apple-app-site-association file on this
 * domain), this page is where the code has to be readable: get the app,
 * tap "I have a code from family", type these six characters. The code
 * is kept in the URL only; nothing is stored or sent from here.
 */
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { color, font, media } from "../../../styles/theme";

const APP_STORE_URL = "https://apps.apple.com/app/id6787438875";

function codeFromSearch(search: string): string {
  const raw = new URLSearchParams(search).get("ref") || "";
  const code = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return code.length === 6 ? code : "";
}

export default function CodeFromFamily() {
  const { search } = useLocation();
  const code = useMemo(() => codeFromSearch(search), [search]);
  const [copied, setCopied] = useState(false);
  if (!code) return null;

  const copy = () => {
    try {
      navigator.clipboard?.writeText(code).then(
        () => setCopied(true),
        () => setCopied(false),
      );
    } catch {
      setCopied(false);
    }
  };

  return (
    <Band role="region" aria-label="Your family code">
      <Inner>
        <Eyebrow>Someone in your family invited you</Eyebrow>
        <Row>
          <Code aria-label={`Family code ${code.split("").join(" ")}`}>{code}</Code>
          <CopyButton type="button" onClick={copy}>
            {copied ? "Copied" : "Copy"}
          </CopyButton>
        </Row>
        <Steps>
          <li>
            Get A Story on your phone:{" "}
            <a href={APP_STORE_URL}>App Store</a>.
          </li>
          <li>Open it and tap <b>I have a code from family</b>.</li>
          <li>Type the six characters above. That puts you in your family&rsquo;s tree, with your place in it.</li>
        </Steps>
        <Small>The code works for 30 days. If it has run out, ask whoever sent it for a new one.</Small>
      </Inner>
    </Band>
  );
}

const Band = styled.section`
  background: ${color.accentWash};
  border-bottom: 1px solid ${color.accentLine};
`;

const Inner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 28px 20px 26px;
  ${media.up.md} {
    padding: 36px 24px 32px;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 10px;
  font-family: ${font.body};
  font-size: 15px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${color.accentText};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
`;

const Code = styled.div`
  font-family: ${font.body};
  font-weight: 700;
  font-size: 40px;
  letter-spacing: 0.22em;
  color: ${color.ink};
  background: ${color.paperPure};
  border: 1px solid ${color.accentLine};
  border-radius: 14px;
  padding: 10px 18px 10px 22px;
  user-select: all;
`;

const CopyButton = styled.button`
  min-height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid ${color.accentLine};
  background: ${color.paperPure};
  color: ${color.accentText};
  font-family: ${font.body};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const Steps = styled.ol`
  margin: 18px 0 0;
  padding-left: 22px;
  font-family: ${font.body};
  font-size: 18px;
  line-height: 1.5;
  color: ${color.ink};
  li + li {
    margin-top: 6px;
  }
  a {
    color: ${color.accentText};
  }
`;

const Small = styled.p`
  margin: 14px 0 0;
  font-family: ${font.body};
  font-size: 15px;
  color: ${color.accentText};
`;
