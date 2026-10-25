/**
 * /gift - "The gift of being asked" (Plan 2, section 3), prepared and off.
 *
 * A year of daily questions and a printed hardcover, $99, once, and it does
 * not renew. Until lib/gift.ts says it is open (a switch and a date), the
 * page explains the gift and asks only for an email: "Tell me when it
 * opens", saved to the same waitlist table as every other form on the site
 * (lib/leads.ts), with the email link as the fallback. Noindex and out of
 * the navigation while closed.
 *
 * Built from the site's own pieces (PageOpening, Chapter, the lead form's
 * styles) so it reads as Bao's site, not a new one.
 */
import { useId, useState } from "react";
import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import {
  Done,
  ErrorNote,
  Field,
  Form,
  Reassure,
  Submit,
} from "../../components/ui/leadForm.styles";
import { track } from "../../lib/analytics";
import { GIFT, HOLIDAY_GIFT_OPEN } from "../../lib/gift";
import { looksLikeEmail, submitLead } from "../../lib/leads";
import { SITE } from "../../lib/seo";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { Chapter, Frame, PrimaryAnchor } from "./kit/kit.styles";
import { color, display, font, media, type } from "../../styles/theme";

const Inside = styled(Chapter)`
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid ${color.primaryLineStrong};
  }
  li {
    padding: 28px clamp(18px, 3vw, 40px) 0 0;
  }
  li + li {
    padding-left: clamp(18px, 3vw, 40px);
    border-left: 1px solid ${color.primaryLine};
  }
  b {
    display: block;
    margin-bottom: 18px;
    font: 400 ${display.md} / 1 ${font.display};
    color: ${color.accent};
  }
  h2 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
    margin-bottom: 10px;
  }
  p {
    font: 400 ${type.read} / 1.6 ${font.body};
    color: ${color.body};
  }
  .notify {
    max-width: 34rem;
    margin-top: clamp(48px, 6vw, 88px);
  }
  .notify h2 {
    margin-bottom: 18px;
  }
  .note {
    margin-top: 28px;
    font: 400 ${type.note} / 1.55 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.md} {
    ol {
      grid-template-columns: minmax(0, 1fr);
    }
    li + li {
      border-left: 0;
      padding-left: 0;
    }
  }
`;

const INSIDE = [
  [
    "A question every day.",
    "For a year, someone in the family sends a question in their own voice, and they answer just by talking, in Vietnamese or English.",
  ],
  [
    "The follow-up a biographer would ask.",
    "A Story listens, asks what a good interviewer would ask next, and keeps every story and lesson in their own voice.",
  ],
  [
    "A printed hardcover.",
    "At the end of the year, what they told becomes a book the family can hold. One price, and it does not renew.",
  ],
];

function TellMeWhenItOpens() {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | { alreadyKnown: boolean }>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setError(null);
    if (!looksLikeEmail(email)) {
      setInvalid(true);
      document.getElementById(`${uid}-email`)?.focus();
      return;
    }
    setInvalid(false);
    setSending(true);
    const result = await submitLead({
      firstName: "",
      lastName: "",
      email,
      phone: "",
      giftFor: "Holiday gift - tell me when it opens",
      note: "Asked on /gift to be told when the holiday gift opens.",
      source: "gift:notify",
    });
    setSending(false);
    if (result.ok) {
      track("lead_submitted", { source: "gift:notify", intent: "gift" });
      setDone({ alreadyKnown: result.alreadyKnown });
      return;
    }
    track("lead_failed", { source: "gift:notify", intent: "gift", reason: result.reason });
    setError(result.fallbackMailto);
  };

  if (done) {
    return (
      <Done role="status">
        <h3>{done.alreadyKnown ? "You’re already on the list." : "We’ll tell you."}</h3>
        <p>
          One email when the gift opens, and nothing else. Nothing has been
          charged.
        </p>
      </Done>
    );
  }

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Field htmlFor={`${uid}-email`} data-invalid={invalid}>
        <span>Email</span>
        <input
          id={`${uid}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${uid}-email-err` : undefined}
          required
        />
        {invalid && (
          <Reassure id={`${uid}-email-err`} role="alert">
            Please check your email address.
          </Reassure>
        )}
      </Field>
      {error && (
        <ErrorNote role="alert">
          That did not save. <a href={error}>Send it to us by email instead</a>,
          or write to {SITE.email}.
        </ErrorNote>
      )}
      <Submit type="submit" disabled={sending}>
        {sending ? "Sending…" : "Tell me when it opens"}
      </Submit>
      <Reassure>No payment. One email when it opens.</Reassure>
    </Form>
  );
}

export default function Gift() {
  const canBuy = HOLIDAY_GIFT_OPEN && Boolean(GIFT.link);
  return (
    <>
      <Seo
        title={`${GIFT.name} - A Story`}
        path="/gift"
        description={`A year of daily questions in a family member’s voice and a printed hardcover, ${GIFT.price} once. It does not renew.`}
        noindex={!HOLIDAY_GIFT_OPEN}
      />
      <PageOpening
        eyebrow="A gift for the holidays"
        title={
          <>
            The gift of <em>being asked.</em>
          </>
        }
        lead={`A year of daily questions and a printed hardcover, ${GIFT.price}, once. It does not renew.`}
        actions={
          canBuy ? (
            <PrimaryAnchor href={GIFT.link}>
              Give it this holiday - {GIFT.price} <ArrowIcon />
            </PrimaryAnchor>
          ) : undefined
        }
        note={canBuy ? undefined : "Not open yet. Leave your email below and we’ll tell you when it is."}
      />
      <Inside $ground="ivory" aria-label="What the gift holds">
        <Frame>
          <ol>
            {INSIDE.map(([title, text], i) => (
              <li key={title}>
                <b aria-hidden="true">{["I", "II", "III"][i]}</b>
                <h2>{title}</h2>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          {!canBuy && (
            <div className="notify">
              <h2>Tell me when it opens.</h2>
              <TellMeWhenItOpens />
            </div>
          )}
          <p className="note">
            Answering is in the A Story iPhone app, now in private beta.
          </p>
        </Frame>
      </Inside>
    </>
  );
}
