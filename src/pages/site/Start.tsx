/**
 * Start — the first step, and nothing that competes with it.
 *
 * Every call to action on the site ends here (it used to end in the
 * visitor's email client; see components/ui/LeadForm.tsx). The page says
 * what submitting achieves, shows the selected plan if one was carried from
 * Pricing, and then gets out of the form's way. The form sits on paper
 * inside the gold keyline — the one precious object on this page is the
 * reader's own first step.
 */
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import LeadForm from "../../components/ui/LeadForm";
import { PLANS } from "../../lib/pricing";
import { useReveals } from "./kit/reveals";
import { Chapter, Eyebrow, Frame, Plate, Title } from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

const Page = styled(Chapter)`
  padding: clamp(64px, 8vw, 128px) 0;
  .start {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(36px, 7vw, 120px);
    align-items: start;
  }
  .start-lead {
    margin-top: 26px;
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: ${color.body};
    max-width: 40ch;
  }
  .next {
    list-style: none;
    margin: clamp(36px, 4vw, 56px) 0 0;
    padding: 0;
  }
  .next li {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 12px;
    padding: 16px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 17px/1.55 ${font.body};
    color: ${color.body};
  }
  .next b {
    font: 400 ${display.sm} / 1 ${font.display};
    color: ${color.accentText};
  }
  .form {
    background: ${color.paperPure};
  }
  .selection {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${color.primaryLine};
    font: 500 16px/1.5 ${font.body};
    color: ${color.primary};
  }
  .selection a {
    color: ${color.accentText};
    text-underline-offset: 4px;
  }
  .privacy {
    margin-top: 18px;
    font: 400 14px/1.5 ${font.body};
  }
  .privacy a {
    color: ${color.bodyMuted};
    text-underline-offset: 4px;
  }
  ${media.md} {
    .start {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const NEXT = [
  "We get in touch by phone to talk it through — who it is for, and when.",
  "We help you choose a plan and set things up when you’re ready.",
  "Nothing is paid today, and nothing starts until you say so.",
];

export default function Start() {
  const [params] = useSearchParams();
  const plan = params.get("plan") ?? "";
  const base = plan.replace("+book", "");
  const planLabel =
    PLANS.find((x) => x.id === base)?.name ??
    (
      {
        monthly: "Monthly",
        book: "the hardcover book",
        one: "Individual",
        free: "Free",
      } as Record<string, string>
    )[base] ??
    "";
  const intent = params.get("intent") === "demo" ? "demo" : "start";
  const source = planLabel ? `start:plan:${plan}` : "start:hero";
  const ref = useReveals<HTMLElement>();

  return (
    <Page ref={ref} $ground="ivory" aria-labelledby="start-title">
      <EditorialSeo
        title={
          intent === "demo"
            ? "Request a demonstration"
            : "Join the A Story waitlist"
        }
        path="/start"
        description="Leave your name and phone number. We’ll speak with you about getting started with A Story. No payment is taken."
      />
      <Frame className="start">
        <div>
          <Eyebrow>
            {intent === "demo"
              ? "For your community or organization"
              : "A place to begin"}
          </Eyebrow>
          <Title id="start-title" data-lines>
            {intent === "demo" ? (
              <>
                Request a <em>demonstration.</em>
              </>
            ) : (
              <>
                Join the <em>waitlist.</em>
              </>
            )}
          </Title>
          <p className="start-lead" data-rise>
            {intent === "demo"
              ? "Tell us how to reach you. We’ll arrange a demonstration around your community or organization."
              : "We’re opening to a few families at a time. Leave your details and we’ll call you about availability."}
          </p>
          {intent !== "demo" && (
            <ol className="next" data-rise>
              {NEXT.map((n, i) => (
                <li key={n}>
                  <b aria-hidden="true">{["I", "II", "III"][i]}</b>
                  {n}
                </li>
              ))}
            </ol>
          )}
        </div>
        <Plate className="form" data-rise>
          {planLabel && (
            <p className="selection">
              Selected: {planLabel}
              {plan.includes("+book")
                ? base === "family"
                  ? " with three books"
                  : " with the book"
                : ""}
              . <Link to="/pricing">Change plan</Link>
            </p>
          )}
          <LeadForm
            source={source}
            intent={intent}
            reassure="No payment today. We’ll speak with you before anything is set up."
          />
          <p className="privacy">
            <Link to="/privacy">How we handle your information</Link>
          </p>
        </Plate>
      </Frame>
    </Page>
  );
}
