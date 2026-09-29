/**
 * /reserve — two ways in before launch. It replaced the waitlist on
 * 2026-09-29; every "Reserve for $1" button on the site lands here.
 *
 *   Reserve, $1           a place in line and 30% off the first year
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
 * the two suits whom. No countdown and no invented "only 7 left": a hundred
 * is a real limit, said once. A Story is not a memoir to finish.
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
  FULL_PRICE,
  INCLUDES,
  OFFERS,
  RESERVE_DEADLINE_LABEL,
  SHOW_COUNT_FROM,
  WHY_PAY,
  deadlineLine,
  isOfferLive,
  reserveDiscountOpen,
  offerCheckoutUrl,
  type OfferId,
} from "../../lib/founding";
import { markOffer, useAccount, useReferralCode } from "../../lib/auth";
import { useFoundingTaken } from "../../lib/foundingCount";
import { track } from "../../lib/analytics";
import { SITE } from "../../lib/seo";
import { ArrowIcon, PageOpening } from "./kit/kit";
import ComingSoon from "./kit/ComingSoon";
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
    claimed: "Founding place requested.",
    paid: "Welcome, founding family.",
    paidBody:
      "We will write within a working day to set up your first call. A receipt is on its way from Stripe.",
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

  const claimedAt = (id: OfferId) =>
    (id === "reserve" ? account?.reservedAt : account?.foundingRequestedAt) ?? null;

  /* The two true limits (see the banner in lib/founding.ts). The count only
     appears once it is real and worth saying; when it reaches the hundred,
     the founding card closes by itself. */
  const taken = useFoundingTaken();
  const foundingOpen =
    OFFERS.founding.open && !(taken !== null && OFFERS.founding.places !== null && taken >= OFFERS.founding.places);
  const placesLeft = taken !== null && OFFERS.founding.places !== null ? OFFERS.founding.places - taken : null;
  const showCount = foundingOpen && placesLeft !== null && taken !== null && taken >= SHOW_COUNT_FROM;
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
    void markOffer(OFFERS[paidId].meta, null);
  }, [paidId, account, paidClaimed]);
  const isIn = Boolean(justPaid || account?.reservedAt || account?.foundingRequestedAt);

  /* Sign-up carries the referral code on, so a sister who came through her
     brother's link is recorded as his (profiles.referred_by). */
  const signUpHref = (next: string) =>
    `/sign-up?next=${encodeURIComponent(next)}${ref ? `&ref=${ref}` : ""}`;

  const claim = async (id: OfferId) => {
    if (!account || busy) return;
    setError(null);
    setBusy(id);
    const res = await markOffer(OFFERS[id].meta, claimedAt(id));
    setBusy(null);
    if (!res.ok) return setError({ id, msg: res.error });
    track("offer_claimed_free", { offer: id });
  };

  const shareUrl = code ? `${SITE.url}/reserve?ref=${code}` : null;
  const share = async () => {
    if (!shareUrl) return;
    const text = `I've reserved A Story — it calls my parents and asks about their life. Reserve for ${OFFERS.reserve.price} and it's ${OFFERS.reserve.discount}% off the first year:`;
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
    const offer = OFFERS[id];
    const copy = COPY[id];

    if (!isOpen(id)) {
      return (
        <p className="small">
          All {offer.places} founding places have been taken. Reserve for {OFFERS.reserve.price} and you are
          next in line.
        </p>
      );
    }
    if (justPaid === id) {
      return (
        <>
          <div className="done" role="status">
            <h3>{copy.paid}</h3>
            <p>{copy.paidBody}</p>
          </div>
          {account === null && (
            <>
              <PrimaryLink to={signUpHref(`/reserve?paid=${id}`)}>
                Now make your account <ArrowIcon />
              </PrimaryLink>
              <p className="small">
                Use the email you just paid with — that is how your place finds you. It is the same account
                you will sign into in the app.
              </p>
            </>
          )}
        </>
      );
    }
    if (live(id)) {
      return (
        <>
          <PrimaryAnchor
            href={offerCheckoutUrl(id, account)}
            onClick={() => track("offer_click", { offer: id, signedIn: Boolean(account) })}
          >
            {copy.pay} <ArrowIcon />
          </PrimaryAnchor>
          <p className="small">
            Apple Pay, Google Pay or card, through Stripe.
            {id === "founding" && account?.reservedAt && " Your dollar still comes off your first year."}
          </p>
        </>
      );
    }
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
            Free while payment opens — we email you the {offer.price} link, and your place counts from today.
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
              ? `All ${o.places} taken`
              : showCount
                ? `${placesLeft} of ${o.places} places left · start now`
                : `${o.places} places · start now`
            : discountOpen
              ? `The easy yes · ends ${RESERVE_DEADLINE_LABEL}`
              : "The easy yes"}
        </p>
        <h2 className="name">{o.name}</h2>
        <p className="who">
          {isFounding
            ? "Start before launch, set up with us by hand."
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
              ? `The ${o.price} counts toward it — ${FOUNDING_BALANCE.individual} more for Individual, whenever you choose.`
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
      <Plate className="offer founding" data-rise>
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
        title={`Reserve A Story for ${reserve.price} — or start now`}
        path="/reserve"
        description={`A Story opens a few families at a time. Reserve a place for ${reserve.price} and hold ${reserve.discount}% off your first year, or become one of ${founding.places} founding families for ${founding.price} and start before launch at half price. Refundable.`}
      />

      <PageOpening
        ground="night"
        eyebrow={discountOpen ? `Before launch · ${deadline}` : "Before launch · two ways in"}
        labelledBy="reserve-title"
        title={
          <>
            Hold your place for a dollar. <em>Or start now.</em>
          </>
        }
        lead={`A Story calls someone you love and asks about their life, and we are opening it a few families at a time. Reserve a place for ${reserve.price} — or be one of ${founding.places} founding families and start before anyone else.`}
        actions={
          <>
            <PrimaryAnchor
              href={openingHref}
              onClick={() => track("offer_click", { offer: "reserve", from: "opening" })}
            >
              Reserve for {reserve.price} <ArrowIcon />
            </PrimaryAnchor>
            <SecondaryButton
              type="button"
              onClick={() => document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start now for {founding.price}
            </SecondaryButton>
            <ComingSoon />
          </>
        }
      />

      <Offers ref={reveal} $ground="ivory" id="offers" aria-label="Two ways in" style={{ scrollMarginTop: 80 }}>
        <Frame>
          <div className="grid">
            {card("reserve")}
            {card("founding")}
          </div>

          {isIn && shareUrl && (
            <div className="share" data-rise>
              <Heading as="h2">Bring your brothers and sisters in.</Heading>
              <Lead>
                Anyone who reserves through your link gets the same {reserve.discount}% off — and it is one more
                person who will read what your parents say.
              </Lead>
              <div className="row">
                <code>{shareUrl}</code>
                <SecondaryButton type="button" onClick={share}>
                  {copied ? "Copied — paste it to them" : "Share with family"}
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
                the year.
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
            A dollar puts you in line to have it asked
            {discountOpen ? `, at ${OFFERS.reserve.discount}% off if you reserve by ${RESERVE_DEADLINE_LABEL}` : ""}.
            Twenty-nine has it asked before launch
            {showCount ? ` — and ${placesLeft} of the ${OFFERS.founding.places} founding places are left` : ""}.
            Either way, if the timing turns out wrong, the money comes back.
          </p>
          <Actions className="acts">
            <PrimaryAnchor href={openingHref}>
              Reserve for {reserve.price} <ArrowIcon />
            </PrimaryAnchor>
            <SecondaryButton
              type="button"
              onClick={() => document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start now for {founding.price}
            </SecondaryButton>
          </Actions>
        </Frame>
      </Closing>
    </>
  );
}
