/**
 * "Three more ways in" — what the app does besides the call, said once and
 * shown on Home and How it works.
 *
 * Added 2026-10-03 because the site had fallen behind the app: by October
 * the app could bring a grandparent into a family call from a link, record
 * the dinner table, and read years of a WhatsApp family chat, and the site
 * mentioned none of it. Each line here is the app's own description of the
 * feature, from the header of the file that builds it:
 *
 *   by link       GuestCallScreen.js — browser, one button, no app/account
 *   the table     RoomRecordScreen.js — one phone, voices told apart, consent first
 *   the chat      lib/whatsapp.js, lib/importers.js — exports, voice notes included
 *   the rest      family tree (lib/familyTree.js), the Sunday email
 *                 (functions/weekly-digest), share cards (lib/shareCard.js)
 *
 * If one of those changes in the app, change it here. Nothing on this list
 * is a plan; each is in the app today.
 */
import styled from "styled-components";
import { useReveals } from "./reveals";
import { Chapter, Eyebrow, Frame, Statement, type Ground } from "./kit.styles";
import { color, display, font, media } from "../../../styles/theme";

const Section = styled(Chapter)`
  .head {
    max-width: 760px;
  }
  .three {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(24px, 3.4vw, 56px);
    margin: clamp(40px, 5vw, 72px) 0 0;
    padding: 0;
    list-style: none;
  }
  .three li {
    padding-top: 22px;
    border-top: 1px solid var(--line, ${color.primaryLine});
  }
  .three .k {
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--mark, ${color.accentText});
  }
  .three h3 {
    margin-top: 14px;
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: var(--ink, ${color.primary});
  }
  .three p {
    margin-top: 12px;
    font: 400 17px/1.6 ${font.body};
    color: var(--muted, ${color.bodyMuted});
  }
  .also {
    margin-top: clamp(32px, 4vw, 52px);
    font: 400 17px/1.6 ${font.body};
    color: var(--muted, ${color.bodyMuted});
    max-width: 70ch;
  }
  ${media.md} {
    .three {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const WAYS = [
  {
    k: "By link",
    t: "Grandpa joins from a text.",
    d: "Send him a link on WhatsApp or by text. He taps it, his browser opens, he presses one big button and you’re talking — no app, no account, no password. Your phone listens for you both, and nothing is kept until you’ve read it and saved it.",
  },
  {
    k: "At the table",
    t: "One phone, the whole family.",
    d: "Put a phone on the table and press record: Grandma telling it, three grandchildren interrupting. Afterwards A Story tells the voices apart, you tap who’s who, and each memory is filed with the person who told it. Everyone is told it’s listening first.",
  },
  {
    k: "From the chat",
    t: "Years of the family group chat.",
    d: "Export a WhatsApp chat — voice messages included, which may be the only recordings of someone’s voice anywhere — and A Story finds the memories in it for you to keep or skip. Journals, notes and old posts come in the same way.",
  },
];

export default function MoreWays({ ground = "sand" }: { ground?: Ground }) {
  const reveal = useReveals<HTMLElement>();
  return (
    <Section ref={reveal} $ground={ground} aria-labelledby="more-ways-title">
      <Frame>
        <div className="head">
          <Eyebrow>Three more ways in</Eyebrow>
          <Statement id="more-ways-title" $size="lg" data-lines>
            Not every story waits for <em>the call.</em>
          </Statement>
        </div>
        <ul className="three">
          {WAYS.map((w) => (
            <li key={w.k} data-rise>
              <p className="k">{w.k}</p>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </li>
          ))}
        </ul>
        <p className="also" data-rise>
          And around it: a family tree that sorts everyone by generation, a
          Sunday email with what the family added that week, and a card that
          carries one memory into the group chat.
        </p>
      </Frame>
    </Section>
  );
}
