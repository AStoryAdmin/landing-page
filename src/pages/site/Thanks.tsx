/**
 * After checkout. Stripe returns buyers here (noindex).
 *
 * The page cannot see the payment, so it never claims one: it explains the
 * next step and says plainly that the receipt is the confirmation. That one
 * caveat stays because it changes what the reader should do.
 */
import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import { CONTACT } from "../../lib/contact";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { Chapter, Frame, PrimaryLink, TextAnchor } from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

const Steps = styled(Chapter)`
  padding-top: 0;
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
    font: 400 17px/1.6 ${font.body};
    color: ${color.body};
  }
  .after {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 32px;
    margin-top: clamp(40px, 5vw, 72px);
  }
  .note {
    margin-top: 24px;
    font: 400 15px/1.55 ${font.body};
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

const STEPS = [
  [
    "We help set it up.",
    "For a completed purchase, we use your checkout details to connect your account and arrange what comes next.",
  ],
  [
    "You choose the moment.",
    "Tell us when you want the first call. If this is a gift, we’ll agree the timing with you.",
  ],
  [
    "They answer and talk.",
    "Once the app is installed, the storyteller answers the scheduled call, and the archive begins.",
  ],
];

export default function Thanks() {
  return (
    <>
      <Seo
        title="After your purchase — A Story"
        path="/thanks"
        description="Account setup and the first conversation after an A Story purchase."
        noindex
      />
      <PageOpening
        eyebrow="The next step"
        title={
          <>
            Now, the first <em>conversation.</em>
          </>
        }
        lead="If you’ve completed a purchase, sign up in the app with the same email address — it connects your purchase to your account."
      />
      <Steps $ground="ivory" aria-label="What happens next">
        <Frame>
          <ol>
            {STEPS.map(([title, text], i) => (
              <li key={title}>
                <b aria-hidden="true">{["I", "II", "III"][i]}</b>
                <h2>{title}</h2>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="after">
            <PrimaryLink to="/how-it-works">
              See how it works <ArrowIcon />
            </PrimaryLink>
            <TextAnchor href={CONTACT.general}>
              Get help with your purchase
            </TextAnchor>
          </div>
          <p className="note">
            This page does not verify a payment. Your checkout receipt is your
            confirmation.
          </p>
        </Frame>
      </Steps>
    </>
  );
}
