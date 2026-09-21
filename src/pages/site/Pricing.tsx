/**
 * Pricing — how the economics work, and nothing else.
 *
 * Every figure, allowance and bundle comes from `pricing.ts` (which mirrors
 * the app and Stripe) and every destination from `checkout.ts`; the page
 * only arranges them. The selection model is unchanged from earlier passes:
 * choose a plan, optionally add the book, and the one action at the bottom
 * follows the choice to checkout or — while checkout is unconfigured — to
 * the waitlist with the choice carried along.
 *
 * Composition: the three annual/one-time plans side by side with the default
 * (Individual) set inside the gold plate; the two quiet options beneath; the
 * promise that the app stays yours given a section of its own, because it is
 * the argument that makes the price make sense; the book staged last.
 * Motion is limited to selection feedback — this is a page for deciding.
 */
import { useState } from "react";
import styled from "styled-components";
import EditorialSeo from "../../components/ui/EditorialSeo";
import { FOREVER, FREE_TIER, OTHER_PLANS, PLANS, PRICE, TRIAL } from "../../lib/pricing";
import { anyCheckoutLive, buyLabel, checkoutFor } from "../../lib/checkout";
import { CHAPTER_COUNT, QUESTION_COUNT } from "../../lib/product";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { useReveals } from "./kit/reveals";
import { Chapter, Eyebrow, Frame, PrimaryAnchor, SplitHead, Statement, TextLink } from "./kit/kit.styles";
import { color, display, font, media, motion } from "../../styles/theme";

const Plans = styled(Chapter)`
  padding-top: 0;
  .plans {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
    align-items: stretch;
  }
  .plan {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: clamp(28px, 3vw, 44px);
    background: ${color.paperPure};
    border: 1px solid ${color.primaryLine};
    cursor: pointer;
    transition: border-color ${motion.base}, box-shadow ${motion.slow}, transform ${motion.slow};
  }
  .plan:hover {
    transform: translateY(-3px);
    box-shadow: 0 24px 50px -32px rgba(42, 31, 24, 0.45);
  }
  .plan.featured {
    border-color: color-mix(in srgb, ${color.gold} 80%, transparent);
    outline: 1px solid color-mix(in srgb, ${color.gold} 45%, transparent);
    outline-offset: 5px;
  }
  .plan.is-selected {
    border-color: ${color.primary};
    box-shadow: inset 0 0 0 1px ${color.primary};
  }
  .plan-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }
  .plan h2 {
    font: 400 ${display.md} / 1.1 ${font.display};
    color: ${color.primary};
  }
  .plan .tag {
    font: 600 11px/1.3 ${font.body};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${color.goldOnLight};
  }
  .who {
    margin-top: 8px;
    font: 400 16px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .price {
    margin: 28px 0 4px;
    font: 400 clamp(2.8rem, 2rem + 2vw, 4rem) / 1 ${font.display};
    color: ${color.primary};
    font-variant-numeric: lining-nums;
  }
  .period {
    font: 500 15px/1.4 ${font.body};
    color: ${color.bodyMuted};
  }
  .meter {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid ${color.primaryLine};
    font: 600 16px/1.4 ${font.body};
    color: ${color.primary};
  }
  .meter-note {
    margin-top: 6px;
    font: italic 400 16px/1.45 ${font.display};
    color: ${color.primaryMid};
  }
  ul {
    list-style: none;
    margin: 20px 0 0;
    padding: 0;
  }
  li {
    position: relative;
    padding: 6px 0 6px 22px;
    font: 400 15px/1.5 ${font.body};
    color: ${color.body};
  }
  li::before {
    content: "";
    position: absolute;
    left: 2px;
    top: 14px;
    width: 8px;
    height: 1px;
    background: ${color.accent};
  }
  .bundle {
    margin-top: auto;
    padding-top: 24px;
  }
  .bundle label {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    min-height: 48px;
    padding: 14px 0 0;
    border-top: 1px solid ${color.primaryLine};
    font: 500 15px/1.45 ${font.body};
    color: ${color.primary};
    cursor: pointer;
  }
  .bundle input {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    accent-color: ${color.primary};
  }
  .bundle small {
    display: block;
    margin-top: 4px;
    font: 400 13.5px/1.45 ${font.body};
    color: ${color.bodyMuted};
  }
  .choose {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
  .plan:has(.choose:focus-visible) {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  .bundle label {
    position: relative;
    z-index: 1;
  }

  .others {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
    margin-top: clamp(16px, 2vw, 28px);
  }
  .other {
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 6px 24px;
    align-items: baseline;
    padding: 22px 28px;
    border: 1px solid ${color.primaryLine};
    cursor: pointer;
    transition: border-color ${motion.base};
  }
  .other.is-selected {
    border-color: ${color.primary};
    box-shadow: inset 0 0 0 1px ${color.primary};
  }
  .other b {
    font: 400 ${display.sm} / 1.2 ${font.display};
    color: ${color.primary};
  }
  .other span {
    font: 400 15px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }

  .decide {
    position: sticky;
    bottom: 16px;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px 32px;
    margin-top: clamp(28px, 3vw, 44px);
    padding: 18px 18px 18px 28px;
    background: ${color.night};
    color: ${color.ivory};
    box-shadow: 0 24px 50px -24px rgba(0, 0, 0, 0.6);
    --action-bg: ${color.ivory};
    --action-ink: ${color.primary};
  }
  .decide strong {
    display: block;
    font: 400 ${display.sm} / 1.2 ${font.display};
  }
  .decide small {
    font: 400 14px/1.4 ${font.body};
    color: ${color.onDarkMuted};
  }
  .all-plans {
    margin-top: 18px;
    font: 400 15px/1.5 ${font.body};
    color: ${color.bodyMuted};
  }
  ${media.lg} {
    .plans {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.md} {
    .others {
      grid-template-columns: minmax(0, 1fr);
    }
    .other {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Forever = styled(Chapter)`
  .kept {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 clamp(28px, 5vw, 80px);
  }
  .kept li {
    padding: 20px 0;
    border-top: 1px solid ${color.primaryLine};
    font: 400 ${display.sm} / 1.35 ${font.display};
    color: ${color.primary};
  }
  .stops {
    margin-top: clamp(40px, 5vw, 64px);
    font: 400 18px/1.7 ${font.body};
    color: ${color.body};
    max-width: 62ch;
  }
  details {
    border-top: 1px solid ${color.primaryLineStrong};
    max-width: 760px;
  }
  details:last-of-type {
    border-bottom: 1px solid ${color.primaryLineStrong};
  }
  summary {
    min-height: 64px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font: 400 ${display.sm} / 1.3 ${font.display};
    color: ${color.primary};
  }
  summary:focus-visible {
    outline: 3px solid ${color.accent};
    outline-offset: 4px;
  }
  details p {
    padding-bottom: 20px;
    font: 400 17px/1.65 ${font.body};
    color: ${color.body};
  }
  .questions {
    margin-top: clamp(64px, 7vw, 110px);
  }
  ${media.md} {
    .kept {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

const Book = styled(Chapter)`
  background: radial-gradient(ellipse 50% 60% at 30% 50%, color-mix(in srgb, ${color.gold} 14%, ${color.night}) 0%, ${color.night} 70%);
  .book {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(36px, 7vw, 130px);
    align-items: center;
  }
  .book img {
    width: min(100%, 420px);
    height: auto;
    justify-self: center;
    filter: drop-shadow(0 50px 40px rgba(0, 0, 0, 0.55));
  }
  .book-price {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin: 28px 0 10px;
    font: 400 ${display.lg} / 1 ${font.display};
    color: ${color.ivory};
  }
  .book-price span {
    font: 400 17px/1.4 ${font.body};
    color: ${color.onDarkMuted};
  }
  .book p {
    font: 400 18px/1.65 ${font.body};
    color: ${color.onDarkMuted};
    max-width: 44ch;
  }
  .book p + p {
    margin-top: 12px;
  }
  ${media.md} {
    .book {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

export default function Pricing() {
  const [selected, setSelected] = useState("individual");
  const [bundles, setBundles] = useState<Record<string, boolean>>({});
  const bundled = bundles[selected] && (selected === "individual" || selected === "family");
  const selectedId = selected + (bundled ? "+book" : "");
  const name =
    PLANS.find((x) => x.id === selected)?.name ??
    OTHER_PLANS.find((x) => x.id === selected)?.label ??
    selected;
  const plans = useReveals<HTMLElement>();
  const forever = useReveals<HTMLElement>();
  const book = useReveals<HTMLElement>();

  return (
    <>
      <EditorialSeo
        title="A Story pricing — plans, family participation and books"
        path="/pricing"
        description="Compare Individual, Family, Express, Monthly and Free. See call allowances, book bundles and what stays in your archive."
      />
      <PageOpening
        eyebrow="Pricing · USD"
        title={
          <>
            Everyone starts free. Only the <em>calls</em> are paid for.
          </>
        }
        lead={`${TRIAL.headline} — ${TRIAL.detail} Inviting family, writing and reading are never charged by the person.`}
      />

      <Plans ref={plans} $ground="ivory" aria-label="Plans">
        <Frame>
          <div className="plans" role="radiogroup" aria-label="Choose your preferred plan">
            {PLANS.map((p) => (
              <article
                key={p.id}
                data-rise
                className={`plan ${p.featured ? "featured" : ""} ${selected === p.id ? "is-selected" : ""}`}
                onClick={() => setSelected(p.id)}
              >
                <input
                  className="choose"
                  type="radio"
                  name="preferred-plan"
                  checked={selected === p.id}
                  onChange={() => setSelected(p.id)}
                  aria-label={`Select ${p.name}, ${p.price} ${p.period}`}
                />
                <div className="plan-top">
                  <h2>{p.name}</h2>
                  {p.featured && <span className="tag">Most families</span>}
                </div>
                <p className="who">{p.who}</p>
                <p className="price">{bundles[p.id] && p.id !== "express" ? p.book?.price : p.price}</p>
                <p className="period">
                  {p.period}
                  {p.monthlyEquivalent && ` · ${p.monthlyEquivalent}`}
                </p>
                <p className="meter">{p.meter}</p>
                <p className="meter-note">{p.meterNote}</p>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="bundle">
                  {p.id === "express" ? (
                    <small>{p.book?.note}</small>
                  ) : (
                    <label onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={!!bundles[p.id]}
                        onChange={(e) => {
                          setBundles({ ...bundles, [p.id]: e.target.checked });
                          setSelected(p.id);
                        }}
                      />
                      <span>
                        {p.id === "family" ? "Include three books" : "Include the book"} — {p.book?.price}
                        <small>
                          {p.book?.note}. {p.book?.saving}.
                        </small>
                      </span>
                    </label>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="others">
            {OTHER_PLANS.map((p) => (
              <div
                key={p.id}
                className={`other ${selected === p.id ? "is-selected" : ""}`}
                onClick={() => setSelected(p.id)}
                data-rise
              >
                <input
                  className="choose"
                  type="radio"
                  name="preferred-plan"
                  style={{ position: "absolute", inset: 0, opacity: 0 }}
                  checked={selected === p.id}
                  onChange={() => setSelected(p.id)}
                  aria-label={`Select ${p.label}, ${p.price}`}
                />
                <b>
                  {p.label} · {p.price}
                </b>
                <span>
                  {p.sub}.{" "}
                  {p.id === "free" ? `${FREE_TIER.includes[3]}.` : "Billed monthly."}
                </span>
              </div>
            ))}
          </div>

          <p className="all-plans">
            Every paid plan includes all {QUESTION_COUNT} questions across {CHAPTER_COUNT} chapters,
            unlimited writing and unlimited photographs.
          </p>

          <div className="decide" aria-live="polite">
            <div>
              <strong>
                {name}
                {bundled ? (selected === "family" ? " with three books" : " with the book") : ""}
              </strong>
              <small>
                {anyCheckoutLive()
                  ? "Continue with your selected plan."
                  : "The website is taking waitlist requests. No payment is taken today — we’ll speak with you first."}
              </small>
            </div>
            <PrimaryAnchor
              href={checkoutFor(selectedId)}
              aria-label={buyLabel(selectedId, `Choose ${name}`, `Join the waitlist for ${name}`)}
            >
              {buyLabel(selectedId, `Choose ${name}`)} <ArrowIcon />
            </PrimaryAnchor>
          </div>
        </Frame>
      </Plans>

      <Forever ref={forever} $ground="paper" aria-labelledby="forever-title">
        <Frame>
          <SplitHead>
            <div>
              <Eyebrow>What stays yours</Eyebrow>
              <Statement id="forever-title" $size="xl" data-lines>
                The app is yours. It does not stop being <em>yours.</em>
              </Statement>
            </div>
          </SplitHead>
          <ul className="kept">
            {FOREVER.kept.map((k) => (
              <li key={k} data-rise>
                {k}
              </li>
            ))}
          </ul>
          <p className="stops" data-rise>
            {FOREVER.stops}
          </p>

          <div className="questions">
            <details>
              <summary>{TRIAL.headline}</summary>
              <p>{TRIAL.detail} Joining the website waitlist does not start a trial.</p>
            </details>
            <details>
              <summary>What is included in Free?</summary>
              <p>
                {FREE_TIER.includes.join(". ")}. {FREE_TIER.excludes} are not included.
              </p>
            </details>
            <details>
              <summary>Care communities and organizations</summary>
              <p>
                Program pricing is quoted individually. <TextLink to="/start?intent=demo">Talk with us</TextLink> about
                participants, consent and access.
              </p>
            </details>
          </div>
        </Frame>
      </Forever>

      <Book ref={book} $ground="night" id="book" aria-labelledby="book-title">
        <Frame className="book">
          <img
            data-rise
            src="/book-objects/closed-1200.webp"
            srcSet="/book-objects/closed-640.webp 640w, /book-objects/closed-1200.webp 1200w"
            sizes="(max-width: 860px) 70vw, 420px"
            width={1200}
            height={1609}
            alt="The A Story hardcover book in its teal binding"
            loading="lazy"
          />
          <div>
            <Eyebrow>The book</Eyebrow>
            <Statement id="book-title" $size="lg" data-lines>
              Printed when a chapter is worth <em>holding.</em>
            </Statement>
            <p className="book-price" data-rise>
              {PRICE.book} <span>{PRICE.bookPages}</span>
            </p>
            <p data-rise>{PRICE.bookOverage[0].toUpperCase() + PRICE.bookOverage.slice(1)}.</p>
            <p data-rise>
              Choose the stories and photographs whenever you’re ready. The
              archive keeps growing afterwards.
            </p>
          </div>
        </Frame>
      </Book>
    </>
  );
}
