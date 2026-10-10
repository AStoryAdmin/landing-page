/**
 * /reserve — two ways in before launch. It replaced the waitlist on
 * 2026-09-29; every "Reserve for $1" button on the site lands here.
 *
 *   Reserve, $1           a place in line and 15% off the first year
 *   Founding Family, $29  start now, set up by hand, half off the first year
 *
 * The offers live in lib/founding.ts and nowhere else; this page presents
 * them. It is built to be decided in one screen: the night opening says what
 * the choice is, then the two cards side by side, each with the price it
 * holds struck against today's. The dollar card carries the chocolate pill,
 * because the count is the goal; the founding card carries the keyline plate
 * and a teal pill, because it is the conversation starting now — teal is the
 * site's colour for the conversation.
 *
 * Below: "why pay anything?" — the objection a price raises — and which of
 * the two suits whom. No countdown and no invented "only 7 left": twenty-five
 * is a real limit, counted live. A Story is not a memoir to finish.
 *
 * Since 2026-10-09 the page leads with the founding offer: twenty-five
 * places, open now, set up in the order families join (lib/founding.ts,
 * "One rolling group of 25"). There are no weeks to pick and nothing dated
 * after them. Before the $29 button it asks one thing — an iPhone — so a
 * family that does not fit finds out before paying, with the dollar beside
 * it. Once the twenty-five are taken, the card offers a free list for the
 * next group.
 *
 * Each card's action:
 *   payment live       → Stripe straight away; the account comes after
 *   just paid (?paid=) → confirmation, then "make your account" (same email)
 *   payment not live   → account, then claimed free on the account
 *   claimed            → confirmation
 */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import {
  FOUNDING_BALANCE,
  FOUNDING_GROUP,
  FOUNDING_PLACES,
  FULL_PRICE,
  INCLUDES,
  OFFERS,
  RESERVE_DEADLINE_LABEL,
  WHY_PAY,
  deadlineLine,
  foundingLeft,
  foundingPlacesLine,
  isOfferLive,
  reserveDiscountOpen,
  offerCheckoutUrl,
  waitlistLabel,
  type OfferId,
  type WaitFor,
} from "../../lib/founding";
import { joinFoundingWaitlist, markOffer, useAccount, useReferralCode } from "../../lib/auth";
import { useFoundingTaken } from "../../lib/foundingCount";
import { track } from "../../lib/analytics";
import { SITE } from "../../lib/seo";
import { ArrowIcon, PageOpening } from "./kit/kit";
import ComingSoon from "./kit/ComingSoon";
import CheckoutDetails, { type CheckoutIntent } from "./CheckoutDetails";
import { useReveals } from "./kit/reveals";
import {
  Actions,
  Chapter,
  Eyebrow,
  Frame,
  Heading,
  Lead,
  Plate,
  PrimaryAnchor,
  PrimaryButton,
  PrimaryLink,
  SecondaryAnchor,
  SecondaryButton,
  SplitHead,
  Statement,
  onDarkActions,
} from "./kit/kit.styles";
import { color, display, font, media } from "../../styles/theme";

const Offers = styled(Chapter)`
  padding-top: clamp(56px, 6vw, 96px);
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 44px);
    max-width: 1120px;
    margin-inline: auto;
    align-items: stretch;
  }
  .offer {
    display: flex;
    flex-direction: column;
    padding: clamp(30px, 3.4vw, 52px);
    background: ${color.paperPure};
    box-shadow:
      0 1px 2px rgba(42, 31, 24, 0.06),
      0 40px 80px -56px rgba(42, 31, 24, 0.55);
  }
  .offer.plain {
    border: 1px solid ${color.primaryLine};
  }
  .offer.founding {
    --action-bg: ${color.teal};
    --action-hover: ${color.night};
  }
  .tag {
    font: 600 11px/1 ${font.body};
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .name {
    margin-top: 14px;
    font: 400 ${display.md} / 1.1 ${font.display};
    color: ${color.primary};
  }
  .who {
    margin-top: 10px;
    font: 400 17px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .price {
    display: flex;
    align-items: baseline;
    gap: 14px;
    margin-top: 26px;
  }
  .price b {
    font: 400 ${display.xl} / 0.9 ${font.display};
    letter-spacing: -0.03em;
    color: ${color.primary};
  }
  .price span {
    font: 600 12px/1 ${font.body};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${color.accentText};
  }
  .held {
    margin-top: 26px;
    padding: 18px 20px;
    background: ${color.ivory};
  }
  .held p.h {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .held dl {
    display: grid;
    gap: 8px;
    margin: 12px 0 0;
  }
  .held dl > div {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }
  .held dt {
    font: 400 15px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  .held dd {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin: 0;
    white-space: nowrap;
  }
  .held s {
    font: 400 15px/1 ${font.body};
    color: ${color.bodyMuted};
  }
  .held dd b {
    font: 400 26px/1 ${font.display};
    color: ${color.primary};
  }
  .held p.f {
    margin-top: 12px;
    font: italic 400 16px/1.45 ${font.display};
    color: ${color.primaryMid};
  }
  ul.inc {
    flex: 1;
    display: grid;
    gap: 12px;
    align-content: start;
    margin: 26px 0 0;
    padding: 0;
    list-style: none;
  }
  ul.inc li {
    display: grid;
    grid-template-columns: 14px 1fr;
    gap: 14px;
    font: 400 17px/1.45 ${font.body};
    color: ${color.body};
  }
  ul.inc li::before {
    content: "";
    width: 7px;
    height: 7px;
    margin: 8px 0 0 3px;
    border: 1px solid ${color.gold};
    transform: rotate(45deg);
  }
  .act {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
    margin-top: 30px;
  }
  .act > a,
  .act > button {
    width: 100%;
  }
  .small {
    font: 400 14px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .done {
    padding: 20px 22px;
    border-left: 2px solid ${color.gold};
    background: ${color.ivory};
  }
  .done h3 {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .done p {
    margin-top: 8px;
    font: 400 16px/1.55 ${font.body};
    color: ${color.body};
  }
  .error {
    padding: 12px 14px;
    border-left: 2px solid ${color.error};
    font: 400 15px/1.5 ${font.body};
    color: ${color.error};
  }
  .share {
    display: grid;
    gap: 14px;
    max-width: 1120px;
    margin: clamp(28px, 3vw, 44px) auto 0;
  }
  .share .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 20px;
  }
  .share code {
    flex: 1 1 280px;
    padding: 14px 16px;
    background: ${color.ivory};
    font: 400 15px/1.4 ${font.body};
    color: ${color.primary};
    overflow-wrap: anywhere;
  }
  .fit {
    display: grid;
    gap: 22px;
    padding-top: 22px;
    border-top: 1px solid ${color.primaryLine};
  }
  .fit fieldset {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }
  .fit legend {
    padding: 0;
    margin-bottom: 12px;
    font: 500 16px/1.45 ${font.body};
    color: ${color.primary};
  }
  .choices {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .choice {
    position: relative;
    display: block;
  }
  .choice input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }
  .choice span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    min-height: 46px;
    padding: 10px 18px;
    border: 1px solid ${color.primaryLine};
    background: ${color.paperPure};
    font: 500 15px/1.3 ${font.body};
    color: ${color.body};
  }
  .choice span small {
    white-space: nowrap;
    font: 400 14px/1.3 ${font.body};
    color: ${color.bodyMuted};
  }
  .choice input:checked + span {
    border-color: ${color.teal};
    box-shadow: inset 0 0 0 1px ${color.teal};
    background: ${color.ivory};
    color: ${color.primary};
  }
  .choice input:focus-visible + span {
    outline: 2px solid ${color.teal};
    outline-offset: 2px;
  }
  .signin {
    margin-top: 28px;
    text-align: center;
    font: 500 15px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  .signin a {
    color: ${color.primary};
    text-underline-offset: 4px;
  }
  ${media.md} {
    .grid {
      grid-template-columns: minmax(0, 1fr);
      max-width: 580px;
    }
  }
`;

const Why = styled(Chapter)`
  .four {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 48px);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .four li {
    padding-top: 22px;
    border-top: 1px solid var(--line);
  }
  .four p {
    margin-top: 12px;
    font: 400 17px/1.6 ${font.body};
    color: var(--muted);
  }
  ${media.lg} {
    .four {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  ${media.sm} {
    .four {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Which = styled(Chapter)`
  .two {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(24px, 4vw, 64px);
  }
  .two p.k {
    font: 400 ${display.lg} / 1 ${font.display};
    color: var(--mark);
  }
  .two h3 {
    margin-top: 18px;
  }
  .two p.d {
    margin-top: 12px;
    font: 400 18px/1.65 ${font.body};
    color: var(--muted);
    max-width: 48ch;
  }
  ${media.md} {
    .two {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Closing = styled(Chapter)`
  ${onDarkActions};
  text-align: center;
  h2 {
    max-width: 20ch;
    margin-inline: auto;
  }
  p.lead {
    margin: 22px auto 0;
    font: 400 clamp(1.1rem, 1rem + 0.35vw, 1.3rem) / 1.6 ${font.body};
    color: var(--muted);
    max-width: 46ch;
  }
  .acts {
    justify-content: center;
  }
`;

const COPY: Record<
  OfferId,
  { pay: string; claim: string; signUp: string; claimed: string; paid: string; paidBody: string }
> = {
  reserve: {
    pay: `Reserve for ${OFFERS.reserve.price}`,
    claim: "Reserve my place",
    signUp: "Create your account to reserve",
    claimed: "Your place is reserved.",
    paid: "You’re reserved.",
    paidBody: `${OFFERS.reserve.discount}% off your first year, held. A receipt is on its way from Stripe.`,
  },
  founding: {
    pay: `Start now for ${OFFERS.founding.price}`,
    claim: "Request a founding place",
    signUp: "Create your account to request a place",
    claimed: "Your founding place is held.",
    paid: "Welcome, founding family.",
    /* Preceded on the page by the week, when this browser knows it. */
    paidBody: "A receipt is on its way from Stripe.",
  },
};

export default function Reserve() {
  const [params] = useSearchParams();
  const account = useAccount();
  const code = useReferralCode(account?.id);
  const paid = params.get("paid");
  const justPaid: OfferId | null = paid === "reserve" || paid === "founding" ? paid : null;
  const ref = (params.get("ref") ?? "").toUpperCase().slice(0, 6);
  const reveal = useReveals<HTMLElement>();

  const [busy, setBusy] = useState<OfferId | null>(null);
  const [error, setError] = useState<{ id: OfferId; msg: string } | null>(null);
  const [copied, setCopied] = useState(false);

  /* Signed out, a pay button opens CheckoutDetails first, so the lead is
     written before Stripe. The href stays on the anchor, so without script
     — or signed in — it is still a straight link to checkout. */
  const [intent, setIntent] = useState<CheckoutIntent | null>(null);
  const gate = (e: React.MouseEvent, id: OfferId, href: string) => {
    if (account || !href.startsWith("https://buy.stripe.com/")) return;
    e.preventDefault();
    setIntent({
      offer: id,
      name: OFFERS[id].name,
      price: OFFERS[id].price,
      href,
      cohort: id === "founding" ? FOUNDING_GROUP : null,
      week: null,
    });
  };

  const claimedAt = (id: OfferId) =>
    (id === "reserve" ? account?.reservedAt : account?.foundingRequestedAt) ?? null;

  /* The two true limits (see the banner in lib/founding.ts). The founding
     card closes by itself when the twenty-five are taken; its count only
     appears once it is real and worth saying (foundingPlacesLine). */
  const taken = useFoundingTaken();
  const foundingOpen = OFFERS.founding.open && foundingLeft(taken) !== 0;
  const placesLine = foundingPlacesLine(taken);

  /* The one question before the $29 (see the header). */
  const [iphone, setIphone] = useState<"yes" | "no" | null>(null);
  const discountOpen = reserveDiscountOpen();
  const deadline = deadlineLine();
  const isOpen = (id: OfferId) => (id === "founding" ? foundingOpen : OFFERS[id].open);
  const live = (id: OfferId) => isOpen(id) && isOfferLive(id);

  /* Back from Stripe and signed in: write the place onto the account, so the
     account page shows it and the founding count includes it. */
  const paidId = justPaid;
  const paidClaimed = paidId ? claimedAt(paidId) : null;
  useEffect(() => {
    if (!paidId || !account || paidClaimed) return;
    void markOffer(OFFERS[paidId].meta, null, paidId === "founding" ? FOUNDING_GROUP : null);
  }, [paidId, account, paidClaimed]);
  const isIn = Boolean(justPaid || account?.reservedAt || account?.foundingRequestedAt);

  /* The founding waitlist (founding.ts, "Waitlist"). Someone signed out is
     sent to make an account with ?wait= on the way back, and is put on the
     list when they arrive — the same pattern as ?paid=. */
  const waitParam: WaitFor | null = params.get("wait") ? "next" : null;
  const [waitBusy, setWaitBusy] = useState(false);
  const [waitError, setWaitError] = useState<string | null>(null);
  useEffect(() => {
    if (!waitParam || !account || account.foundingRequestedAt || account.foundingWaitlist) return;
    void joinFoundingWaitlist(waitParam, account.foundingWaitlistAt);
  }, [waitParam, account]);
  const joinWait = async (w: WaitFor) => {
    if (!account || waitBusy) return;
    setWaitError(null);
    setWaitBusy(true);
    const res = await joinFoundingWaitlist(w, account.foundingWaitlistAt);
    setWaitBusy(false);
    if (!res.ok) return setWaitError(res.error);
    track("founding_waitlist", { week: String(w) });
  };
  const waitlistAction = (w: WaitFor) => {
    const label = waitlistLabel();
    /* Short on the button — pill labels do not wrap, and a week's full name
       pushed the card past a phone's edge. The line above says which. */
    const join = "Join the waitlist";
    if (account?.foundingWaitlist) {
      return (
        <div className="done" role="status">
          <h3>You are on the waitlist for {label}.</h3>
          <p>
            Nothing is charged. When a place opens, or we add another group, we write to{" "}
            <strong>{account.email}</strong> in the order families joined.
          </p>
        </div>
      );
    }
    if (account === undefined) return null;
    if (!account) {
      return (
        <>
          <PrimaryLink
            to={signUpHref(`/reserve?wait=${w}`)}
            onClick={() => track("offer_click", { offer: "founding_waitlist", week: String(w), mode: "signup" })}
          >
            {join} <ArrowIcon />
          </PrimaryLink>
          <p className="small">
            For {label}. Free, and nothing is charged - the account is so we know where to write.
          </p>
        </>
      );
    }
    return (
      <>
        <PrimaryButton type="button" onClick={() => joinWait(w)} disabled={waitBusy}>
          {waitBusy ? "Saving…" : join} <ArrowIcon />
        </PrimaryButton>
        {waitError && (
          <p className="error" role="alert">
            {waitError}
          </p>
        )}
        <p className="small">
          For {label}. Free, and nothing is charged. We write to {account.email} when a place opens, in the order
          families joined.
        </p>
      </>
    );
  };

  /* Sign-up carries the referral code on, so a sister who came through her
     brother's link is recorded as his (profiles.referred_by). */
  const signUpHref = (next: string) =>
    `/sign-up?next=${encodeURIComponent(next)}${ref ? `&ref=${ref}` : ""}`;

  const claim = async (id: OfferId) => {
    if (!account || busy) return;
    setError(null);
    setBusy(id);
    const res = await markOffer(OFFERS[id].meta, claimedAt(id), id === "founding" ? FOUNDING_GROUP : null);
    setBusy(null);
    if (!res.ok) return setError({ id, msg: res.error });
    track("offer_claimed_free", { offer: id });
  };

  const shareUrl = code ? `${SITE.url}/reserve?ref=${code}` : null;
  const share = async () => {
    if (!shareUrl) return;
    const text = `I've reserved A Story - it calls my parents and asks about their life. Reserve for ${OFFERS.reserve.price} and it's ${OFFERS.reserve.discount}% off the first year:`;
    track("offer_share");
    try {
      if (navigator.share) {
        await navigator.share({ title: "A Story", text, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
    } catch {
      /* Dismissed, or the clipboard refused — the link is on screen to copy by hand. */
    }
  };

  const action = (id: OfferId) => {
    const copy = COPY[id];

    if (justPaid === id) {
      return (
        <>
          <div className="done" role="status">
            <h3>{copy.paid}</h3>
            <p>
              {id === "founding" && "We will write within a working day to set up your first call. "}
              {copy.paidBody}
            </p>
          </div>
          {account === null && (
            <>
              <PrimaryLink to={signUpHref(`/reserve?paid=${id}`)}>
                Now make your account <ArrowIcon />
              </PrimaryLink>
              <p className="small">
                Use the email you just paid with - that is how your place finds you. It is the same account
                you will sign into in the app.
              </p>
            </>
          )}
        </>
      );
    }
    /* Before "closed", so someone who took the last place still sees their
       place rather than the waitlist. */
    if (id === "founding" && claimedAt(id)) {
      return (
        <div className="done" role="status">
          <h3>{copy.claimed}</h3>
          <p>
            We will write to <strong>{account?.email}</strong> within a working day to set up your first call.
          </p>
        </div>
      );
    }
    if (!isOpen(id)) {
      return (
        <>
          <p className="small">
            All {FOUNDING_PLACES} founding places are taken. Join the list for the next group - or reserve for{" "}
            {OFFERS.reserve.price} and hold your place for launch.
          </p>
          {waitlistAction("next")}
        </>
      );
    }
    if (id === "founding") {
      const fit = (
        <div className="fit">
          <fieldset>
            <legend>Does the person A Story will call have an iPhone?</legend>
            <div className="choices">
              {(["yes", "no"] as const).map((v) => (
                <label className="choice" key={v}>
                  <input
                    type="radio"
                    name="iphone"
                    value={v}
                    checked={iphone === v}
                    onChange={() => {
                      setIphone(v);
                      track("founding_fit", { iphone: v });
                    }}
                  />
                  <span>{v === "yes" ? "Yes, an iPhone" : "No"}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {iphone === "no" && (
            <>
              <p className="small" role="status">
                Before launch, A Story can only ring an iPhone - on other phones it reminds them to write instead,
                which is not what a founding place is for. A dollar holds your place and
                {discountOpen ? ` ${OFFERS.reserve.discount}% off` : " the price"} instead.
              </p>
              <SecondaryAnchor
                href={openingHref}
                onClick={(e) => {
                  track("offer_click", { offer: "reserve", from: "founding_fit" });
                  gate(e, "reserve", openingHref);
                }}
              >
                Reserve for {OFFERS.reserve.price} instead
              </SecondaryAnchor>
            </>
          )}
        </div>
      );
      if (iphone !== "yes") return fit;
      if (live(id)) {
        return (
          <>
            {fit}
            <PrimaryAnchor
              href={offerCheckoutUrl(id, account)}
              onClick={(e) => {
                track("offer_click", { offer: id, cohort: FOUNDING_GROUP, signedIn: Boolean(account) });
                gate(e, id, offerCheckoutUrl(id, account));
              }}
            >
              {copy.pay} <ArrowIcon />
            </PrimaryAnchor>
            <p className="small">
              Apple Pay, Google Pay or card, through Stripe. Refunded any time before the first call.
              {account?.reservedAt && " Your dollar still comes off your first year."}
            </p>
          </>
        );
      }
      /* Payment not live: the fit check, then the free claim below. */
      return (
        <>
          {fit}
          {freeClaim(id)}
        </>
      );
    }
    if (live(id)) {
      return (
        <>
          <PrimaryAnchor
            href={offerCheckoutUrl(id, account)}
            onClick={(e) => {
              track("offer_click", { offer: id, signedIn: Boolean(account) });
              gate(e, id, offerCheckoutUrl(id, account));
            }}
          >
            {copy.pay} <ArrowIcon />
          </PrimaryAnchor>
          <p className="small">Apple Pay, Google Pay or card, through Stripe.</p>
        </>
      );
    }
    return freeClaim(id);
  };

  /* Before a Payment Link exists: the place is claimed on the account, free. */
  const freeClaim = (id: OfferId) => {
    const offer = OFFERS[id];
    const copy = COPY[id];
    /* Payment not switched on yet — claim it on the account, free. */
    if (account === undefined) {
      return (
        <PrimaryLink to={signUpHref("/reserve")}>
          Continue <ArrowIcon />
        </PrimaryLink>
      );
    }
    if (!account) {
      return (
        <>
          <PrimaryLink
            to={signUpHref("/reserve")}
            onClick={() => track("offer_click", { offer: id, mode: "signup" })}
          >
            {copy.signUp} <ArrowIcon />
          </PrimaryLink>
          <p className="small">
            Free while payment opens - we email you the {offer.price} link, and your place counts from today.
          </p>
        </>
      );
    }
    if (claimedAt(id)) {
      return (
        <div className="done" role="status">
          <h3>{copy.claimed}</h3>
          <p>
            Nothing has been charged. We will email <strong>{account.email}</strong> the {offer.price} link when
            payment opens, in the order places were taken.
          </p>
        </div>
      );
    }
    return (
      <>
        <PrimaryButton type="button" onClick={() => claim(id)} disabled={busy !== null}>
          {busy === id ? "Saving…" : copy.claim} <ArrowIcon />
        </PrimaryButton>
        {error?.id === id && (
          <p className="error" role="alert">
            {error.msg}
          </p>
        )}
        <p className="small">Free while payment opens. We will email {account.email} the {offer.price} link.</p>
      </>
    );
  };

  /* The opening's first action does what the dollar card's does when it can,
     so the quickest path is one tap; otherwise it goes to the cards. */
  const openingHref = live("reserve") && !justPaid ? offerCheckoutUrl("reserve", account) : "#offers";
  const { reserve, founding } = OFFERS;

  const card = (id: OfferId) => {
    const o = OFFERS[id];
    const isFounding = id === "founding";
    const body = (
      <>
        <p className="tag">
          {isFounding
            ? !foundingOpen
              ? `All ${FOUNDING_PLACES} taken · list open`
              : `Open now · ${placesLine}`
            : discountOpen
              ? `The easy yes · ends ${RESERVE_DEADLINE_LABEL}`
              : "The easy yes"}
        </p>
        <h2 className="name">{o.name}</h2>
        <p className="who">
          {isFounding
            ? "Start now, before launch, set up with us by hand."
            : discountOpen
              ? "Hold your place in line, and the price."
              : "Hold your place in line."}
        </p>
        <p className="price">
          <b>{o.price}</b>
          <span>{isFounding ? "once" : "once, per place"}</span>
        </p>
        <div className="held">
          <p className="h">
            {isFounding ? "Half off your first year" : discountOpen ? `${o.discount}% off your first year` : deadline}
          </p>
          {(isFounding || discountOpen) && (
          <dl>
            <div>
              <dt>Individual</dt>
              <dd>
                <s>{FULL_PRICE.individual}</s> <b>{o.individual}</b>
              </dd>
            </div>
            <div>
              <dt>Family · up to three</dt>
              <dd>
                <s>{FULL_PRICE.family}</s> <b>{o.family}</b>
              </dd>
            </div>
          </dl>
          )}
          <p className="f">
            {isFounding
              ? `The ${o.price} counts toward it - ${FOUNDING_BALANCE.individual} more for Individual, whenever you choose.`
              : discountOpen
                ? "And the dollar comes off that."
                : "A dollar still holds your place in line, and still comes off your first year."}
          </p>
        </div>
        <ul className="inc">
          {INCLUDES[id]
            .filter((f) => isFounding || discountOpen || !f.includes("% off"))
            .map((f) => (
              <li key={f}>{f}</li>
            ))}
        </ul>
        <div className="act">{action(id)}</div>
      </>
    );
    return isFounding ? (
      <Plate className="offer founding" id="founding" style={{ scrollMarginTop: 96 }} data-rise>
        {body}
      </Plate>
    ) : (
      <div className="offer plain" data-rise>
        {body}
      </div>
    );
  };

  return (
    <>
      <EditorialSeo
        title={`${founding.places} founding families - start A Story now for ${founding.price}`}
        path="/reserve"
        description={`A Story opens to ${founding.places} founding families before launch: ${founding.price}, set up with you by hand, one of us on your first call, half off your first year, refundable until that call. Or hold a place for ${reserve.price}.`}
      />

      {/* While founding places remain, the page leads with them (header);
          once they are taken it goes back to the dollar. */}
      {foundingOpen ? (
        <PageOpening
          ground="night"
          eyebrow={`Before launch · ${placesLine}`}
          labelledBy="reserve-title"
          title={
            <>
              {founding.places} families start now. <em>Be one of them.</em>
            </>
          }
          lead={`A Story calls someone you love and asks about their life. Before launch we are opening it to ${founding.places} families, set up with you by hand and with one of us on your first call. ${founding.price}, which comes off a first year at half price - and refunded if you change your mind before that call.`}
          actions={
            <>
              <PrimaryAnchor href="#founding" onClick={() => track("offer_click", { offer: "founding", from: "opening" })}>
                Start now for {founding.price} <ArrowIcon />
              </PrimaryAnchor>
              <SecondaryAnchor
                href={openingHref}
                onClick={(e) => {
                  track("offer_click", { offer: "reserve", from: "opening" });
                  gate(e, "reserve", openingHref);
                }}
              >
                Or hold a place for {reserve.price}
              </SecondaryAnchor>
              <ComingSoon />
            </>
          }
        />
      ) : (
        <PageOpening
          ground="night"
          eyebrow={discountOpen ? `Before launch · ${deadline}` : "Before launch"}
          labelledBy="reserve-title"
          title={
            <>
              Hold your place <em>for a dollar.</em>
            </>
          }
          lead={`A Story calls someone you love and asks about their life. All ${founding.places} founding places are taken; reserve for ${reserve.price} and we tell you the moment it is your turn.`}
          actions={
            <>
              <PrimaryAnchor
                href={openingHref}
                onClick={(e) => {
                  track("offer_click", { offer: "reserve", from: "opening" });
                  gate(e, "reserve", openingHref);
                }}
              >
                Reserve for {reserve.price} <ArrowIcon />
              </PrimaryAnchor>
              <ComingSoon />
            </>
          }
        />
      )}

      <Offers ref={reveal} $ground="ivory" id="offers" aria-label="Two ways in" style={{ scrollMarginTop: 80 }}>
        <Frame>
          <div className="grid">
            {foundingOpen ? card("founding") : card("reserve")}
            {foundingOpen ? card("reserve") : card("founding")}
          </div>

          {isIn && shareUrl && (
            <div className="share" data-rise>
              <Heading as="h2">Bring your brothers and sisters in.</Heading>
              <Lead>
                Anyone who reserves through your link gets the same {reserve.discount}% off - and it is one more
                person who will read what your parents say.
              </Lead>
              <div className="row">
                <code>{shareUrl}</code>
                <SecondaryButton type="button" onClick={share}>
                  {copied ? "Copied - paste it to them" : "Share with family"}
                </SecondaryButton>
              </div>
            </div>
          )}

          {!isIn && account === null && (
            <p className="signin">
              Already have an account? <Link to="/sign-in?next=/reserve">Sign in</Link>
            </p>
          )}
        </Frame>
      </Offers>

      <Why $ground="paper" aria-labelledby="why-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>Why pay anything</Eyebrow>
              <Statement id="why-title" $size="lg">
                The smallest thing that <em>means</em> something.
              </Statement>
            </div>
            <Lead>To you, because it holds a price. To us, because it tells us who to open to first.</Lead>
          </SplitHead>
          <ul className="four">
            {WHY_PAY.map((w) => (
              <li key={w.t}>
                <Heading>{w.t}</Heading>
                <p>{w.d}</p>
              </li>
            ))}
          </ul>
        </Frame>
      </Why>

      <Which $ground="sand" aria-labelledby="which-title">
        <Frame>
          <Eyebrow>Which one</Eyebrow>
          <Statement id="which-title" $size="lg" style={{ marginBottom: "clamp(40px, 5vw, 72px)" }}>
            Which one <em>is yours?</em>
          </Statement>
          <div className="two">
            <div>
              <p className="k">{reserve.price}</p>
              <Heading>Reserve, if you want to be sure of it.</Heading>
              <p className="d">
                You like the idea and you want the price, but there is no hurry. A dollar holds both, and we
                tell you the moment it is your turn. Reserve one for each parent if they live apart.
              </p>
            </div>
            <div>
              <p className="k">{founding.price}</p>
              <Heading>Founding, if you would rather start now.</Heading>
              <p className="d">
                There is a birthday coming, or a question you have been meaning to ask for years. Founding
                families start before launch, with one of us beside you for the first call, at half price for
                the year. There are {founding.places} places, and they go in the order families join.
              </p>
            </div>
          </div>
        </Frame>
      </Which>

      <Closing $ground="night" aria-labelledby="closing-title">
        <Frame>
          <Statement id="closing-title" $size="lg">
            There is a question in your family <em>nobody has asked yet.</em>
          </Statement>
          <p className="lead">
            {foundingOpen
              ? `Twenty-nine dollars has it asked before launch, with one of us on the call (${placesLine}, in the order families join). `
              : ""}
            A dollar puts you in line to have it asked
            {discountOpen ? `, at ${OFFERS.reserve.discount}% off if you reserve by ${RESERVE_DEADLINE_LABEL}` : ""}.
            Either way, if the timing turns out wrong, the money comes back.
          </p>
          <Actions className="acts">
            {foundingOpen && (
              <PrimaryAnchor href="#founding" onClick={() => track("offer_click", { offer: "founding", from: "closing" })}>
                Start now for {founding.price} <ArrowIcon />
              </PrimaryAnchor>
            )}
            {foundingOpen ? (
              <SecondaryAnchor href={openingHref} onClick={(e) => gate(e, "reserve", openingHref)}>
                Or hold a place for {reserve.price}
              </SecondaryAnchor>
            ) : (
              <PrimaryAnchor href={openingHref} onClick={(e) => gate(e, "reserve", openingHref)}>
                Reserve for {reserve.price} <ArrowIcon />
              </PrimaryAnchor>
            )}
          </Actions>
        </Frame>
      </Closing>

      <CheckoutDetails intent={intent} onClose={() => setIntent(null)} />
    </>
  );
}
