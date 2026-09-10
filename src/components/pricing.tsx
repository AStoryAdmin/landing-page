import Seo from './ui/Seo';
import BuyBar from './ui/BuyBar';
import Reveal from './ui/Reveal';
import { Actions, Button, ButtonAnchor, Container, Eyebrow, H2, Lead, Note, Section } from './ui/primitives';
import { IconArrow, IconCheck } from './ui/icons';
import { CONTACT } from '../lib/contact';
import { AT_CHECKOUT, buyLabel, checkoutFor, isCheckoutLive } from '../lib/checkout';
import { track } from '../lib/analytics';
import { FOREVER, FREE_TIER, KEEPS_LINE, OTHER_PLANS, PLANS, PRICE, TRIAL } from '../lib/pricing';
import { breadcrumbSchema, faqSchema, organizationSchema } from '../lib/seo';
import {
    BookPrice, BookPrices, BookSplit, CompareItem, CompareRow, DriverTable, ForeverBand, ForeverLead,
    ForeverList, ForeverStops, HonestGrid, HonestItem, IncludedList, Page, PlanAction, PlanBadge,
    PlanBadgeSpacer, PlanBlurb, PlanBook, PlanCard, PlanGrid, PlanMeter, PlanName, PlanPrice,
    PlanWho, PlanKeeps, ProgramCard, ProgramGrid, QuietRow, QuietRows, Reassure, TrialCard,
} from './pricing.styles';

/**
 * Every figure on this page comes from ../lib/pricing, which mirrors the app's
 * own PricingScreen. The order is deliberate: the free trial first, because
 * everyone starts there whatever they end up on; then the plans; then what
 * happens if you stop paying, which is the question people are really asking.
 */

/** True on every plan including Free, so it belongs above the cards. */
const ON_EVERY_PLAN = [
    'Unlimited family members, reading and contributing',
    'Everyone can record and write their own memories, free',
    'Memory cards, full transcripts, and voice highlights kept as audio',
    'A searchable archive on a timeline, organized by chapter of life',
    'Export everything, whenever you ask',
];

/**
 * The comparison every gift buyer runs in their head anyway. Naming it is more
 * persuasive than defending the number in the abstract.
 */
const ALTERNATIVES = [
    { thing: 'A cashmere sweater', fate: 'Worn twice. In a donation bin by the spring after next.' },
    { thing: 'Dinner for four', fate: 'A lovely evening. Nobody will be able to tell you what they ate.' },
    { thing: 'Another photo frame', fate: 'One picture, on a shelf, of a day somebody else chose.' },
    { thing: 'A Story', fate: 'Their whole life, in their voice, read by people not born yet.', ours: true },
];

const PRICING_FAQ = [
    {
        q: 'What am I actually paying for?',
        a: 'The guided calls — the part where A Story rings, asks, listens and follows up on what it just heard. That is the only thing here with a real cost behind it, so it is the only thing metered. Writing in your own words is never metered on any plan, including Free.',
    },
    {
        q: 'Is there really a free version?',
        a: 'Yes, and it is not a trial that runs out. Three guided questions a day, unlimited writing, the whole family invited free, and you can still order a printed book. What Free does not include is A Story calling you, and the full 504-question bank open by chapter.',
    },
    {
        q: 'What happens if I cancel?',
        a: 'You drop to Free and keep everything. Every recording, transcript and photo stays yours, the archive stays open and searchable, everyone you invited keeps their access, and you can still export or order a book. Cancelling stops the AI calls, not the memories.',
    },
    {
        q: 'Why is Express a one-time payment when the others are annual?',
        a: 'Because the people who buy it are usually facing something with no schedule — a visit, a diagnosis, a week when everyone is finally home. A yearly plan is the wrong shape for that, and it is also the straightforward one to give as a present, since nothing renews on the person you gave it to.',
    },
    {
        q: 'Is the hardcover book included?',
        a: `Express includes the first 40 color pages, which is the whole book for most people. On Individual and Family you can bundle it at checkout — ${PLANS[0].book?.price} instead of ${PLANS[0].price} — or add it any time later for ${PRICE.book}, ${PRICE.bookOverage}.`,
    },
    {
        q: 'Does inviting the rest of the family cost anything?',
        a: 'Never, on any plan. Plans count storytellers — the people A Story interviews — because that is what call minutes scale with. Everyone else reads, corrects, adds photos and records their own version of the same afternoon for free, without limit.',
    },
    {
        q: 'What if they never use it?',
        a: 'Tell us and we will make it right. We would far rather refund a plan than have it sit there as a reproach — and it costs us nothing to be decent about this.',
    },
    {
        q: 'Why is organization pricing not listed?',
        a: 'Because a four-person founder archive and a 200-person anniversary program are not the same product. We scope it on a 30-minute call and send a fixed number — no discovery marathon, no seat-count games.',
    },
];

const Pricing = () => (
    <Page>
        <Seo
            title="Pricing — three days free, then from $119 a year"
            description={`A Story starts with three days of full access, no card. After that: Free forever at three questions a day, or ${PRICE.headline} ${PRICE.headlineNote}. Your recordings are always yours to keep, even if you cancel.`}
            path="/pricing"
            schema={[
                organizationSchema(),
                breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Pricing', path: '/pricing' },
                ]),
                faqSchema(PRICING_FAQ),
            ]}
        />

        {/* ─── Trial + plans ────────────────────────────────────────── */}
        <Section $tone="wash" $tight>
            <Container>
                <div style={{ maxWidth: 720, margin: '0 auto clamp(32px, 4vw, 44px)', textAlign: 'center' }}>
                    <Eyebrow>Pricing</Eyebrow>
                    <H2>Everyone starts free. Only the calls are metered.</H2>
                    <Lead $center>
                        Guided conversation is the one thing here with a real cost behind it, so it is the
                        only thing we count. Writing, photos, family, the archive itself &mdash; never
                        metered, on any plan.
                    </Lead>
                </div>

                <TrialCard>
                    <p className="head">{TRIAL.headline}</p>
                    <p className="detail">{TRIAL.detail}</p>
                </TrialCard>

                <PlanGrid>
                    {PLANS.map((plan, i) => (
                        <Reveal key={plan.id} delay={i * 80}>
                            <PlanCard $featured={plan.featured} $utility={plan.utility}>
                                {plan.featured ? <PlanBadge>Best value</PlanBadge> : <PlanBadgeSpacer />}
                                <PlanName>{plan.name}</PlanName>
                                <PlanWho>{plan.who}</PlanWho>
                                <PlanPrice>
                                    <span className="amount">{plan.price}</span>
                                    <span className="window">{plan.period}</span>
                                    {plan.monthlyEquivalent && (
                                        <span className="equiv">{plan.monthlyEquivalent}</span>
                                    )}
                                </PlanPrice>
                                <PlanMeter>
                                    <p className="meter">{plan.meter}</p>
                                    <p className="note">{plan.meterNote}</p>
                                </PlanMeter>
                                <PlanBlurb>{plan.blurb}</PlanBlurb>
                                <IncludedList $tight>
                                    {plan.features.map((f) => (
                                        <li key={f}><IconCheck size={15} /><span>{f}</span></li>
                                    ))}
                                </IncludedList>
                                {plan.book && (
                                    <PlanBook>
                                        <span className="tag">
                                            {plan.book.price === 'included' ? 'Book included' : `With the book · ${plan.book.price}`}
                                        </span>
                                        <span className="note">{plan.book.note}</span>
                                        {plan.book.saving && <span className="saving">{plan.book.saving}</span>}
                                    </PlanBook>
                                )}
                                <PlanKeeps>{KEEPS_LINE}</PlanKeeps>
                                <PlanAction>
                                    <ButtonAnchor
                                        href={checkoutFor(plan.id, plan.name)}
                                        onClick={() => track(isCheckoutLive(plan.id) ? 'checkout_click' : 'contact_click', { plan: plan.id, price: plan.price })}
                                        $variant={plan.featured ? 'primary' : 'outline'}
                                    >
                                        {buyLabel(plan.id, `Choose ${plan.name}`, `Ask about ${plan.name}`)}
                                    </ButtonAnchor>
                                </PlanAction>
                            </PlanCard>
                        </Reveal>
                    ))}
                </PlanGrid>

                <div style={{ maxWidth: 860, margin: 'clamp(32px, 4vw, 48px) auto 0' }}>
                    <Note style={{ textAlign: 'center', marginBottom: 16 }}>
                        On every plan &mdash; including Free, without exception:
                    </Note>
                    <IncludedList style={{ marginTop: 0 }}>
                        {ON_EVERY_PLAN.map((item) => (
                            <li key={item}><IconCheck size={16} /><span>{item}</span></li>
                        ))}
                    </IncludedList>
                </div>

                <QuietRows aria-label="Other plans">
                    {OTHER_PLANS.map((o) => (
                        <QuietRow key={o.id}>
                            <span className="label">{o.label}</span>
                            <span className="sub">{o.sub}</span>
                            <span className="price">{o.price}</span>
                        </QuietRow>
                    ))}
                </QuietRows>

                <Reassure>
                    {AT_CHECKOUT.map((r) => (
                        <div key={r.t}>
                            <IconCheck size={16} />
                            <div>
                                <p className="t">{r.t}</p>
                                <p className="d">{r.d}</p>
                            </div>
                        </div>
                    ))}
                </Reassure>
            </Container>
        </Section>

        {/* ─── What Free actually is ────────────────────────────────── */}
        <Section $tone="paper" $tight id="free">
            <Container>
                <BookSplit>
                    <div>
                        <Eyebrow>No card, no clock</Eyebrow>
                        <H2>{FREE_TIER.headline}</H2>
                        <Lead>{FREE_TIER.blurb}</Lead>
                        <Note>
                            We would rather someone kept a small archive free for ten years than lost it
                            because a trial lapsed while they were busy.
                        </Note>
                        <Actions>
                            <ButtonAnchor
                                href={CONTACT.gift}
                                onClick={() => track('contact_click', { plan: 'free' })}
                                $variant="primary"
                            >
                                Start free
                            </ButtonAnchor>
                            <Button to="/experience#demo" $variant="outline">
                                Try it with no account first <IconArrow />
                            </Button>
                        </Actions>
                    </div>

                    <div>
                        <IncludedList>
                            {FREE_TIER.includes.map((item) => (
                                <li key={item}><IconCheck size={16} /><span>{item}</span></li>
                            ))}
                        </IncludedList>
                        <Note style={{ marginTop: 20 }}>
                            <strong>Not included on Free:</strong> {FREE_TIER.excludes}.
                        </Note>
                    </div>
                </BookSplit>
            </Container>
        </Section>

        {/* ─── What happens if you stop paying ──────────────────────── */}
        <Section $tone="ivory" $tight id="forever">
            <Container>
                <ForeverBand>
                    <Eyebrow $tone="gold">The part that matters later</Eyebrow>
                    <H2 style={{ color: 'inherit' }}>{FOREVER.headline}</H2>
                    <ForeverLead>
                        The real fear with anything holding your family history is what happens the day you
                        stop paying for it. Here is the answer, and it is the same whichever plan you were
                        on: you keep all of it.
                    </ForeverLead>

                    <ForeverList>
                        {FOREVER.kept.map((item) => (
                            <li key={item}><IconCheck size={16} /><span>{item}</span></li>
                        ))}
                    </ForeverList>

                    <ForeverStops>
                        <strong>What actually changes:</strong> {FOREVER.stops}
                    </ForeverStops>
                </ForeverBand>
            </Container>
        </Section>

        {/* ─── The book ─────────────────────────────────────────────── */}
        <Section $tone="paper" $tight id="book">
            <Container>
                <BookSplit>
                    <div>
                        <Eyebrow>The hardcover</Eyebrow>
                        <H2>Printed when a chapter is worth holding.</H2>
                        <Lead>
                            Not once, at the end. Order one from any chapter whenever there is enough worth
                            keeping, and order another in five years from the same archive &mdash; because
                            the story does not finish when the book does.
                        </Lead>
                        <Note>
                            Editing, layout and design are included in the price; printing is at cost.
                            Express includes the first 40 pages, and Individual and Family can bundle a book
                            at checkout for less than adding one later.
                        </Note>
                        <Actions>
                            <ButtonAnchor
                                href={checkoutFor('book', 'A hardcover book')}
                                onClick={() => track(isCheckoutLive('book') ? 'checkout_click' : 'contact_click', { plan: 'book' })}
                                $variant="primary"
                            >
                                {buyLabel('book', `Order a book — ${PRICE.book}`, 'Order a book')}
                            </ButtonAnchor>
                            <Button to="/experience#book" $variant="outline">
                                Look inside one first <IconArrow />
                            </Button>
                        </Actions>
                    </div>

                    <BookPrices>
                        <BookPrice>
                            <p className="amount">{PRICE.book}</p>
                            <p className="what">A hardcover, {PRICE.bookPages}</p>
                            <p className="detail">
                                Sewn signatures, acid-free paper, photographs printed beside the stories they
                                belong to. Ships three to four weeks after you approve the proof.
                            </p>
                        </BookPrice>
                        <BookPrice>
                            <p className="amount">$0.75</p>
                            <p className="what">A page beyond the first 40</p>
                            <p className="detail">
                                In color, or $0.35 in black and white. A long life runs longer than 40 pages,
                                and we would rather charge for the paper than cut the chapter short.
                            </p>
                        </BookPrice>
                    </BookPrices>
                </BookSplit>
            </Container>
        </Section>

        {/* ─── What else that buys ──────────────────────────────────── */}
        <Section $tone="ivory" $tight>
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(32px, 4vw, 48px)' }}>
                    <Eyebrow>Worth comparing</Eyebrow>
                    <H2>You were going to spend it anyway.</H2>
                    <Lead>
                        The honest question is not whether {PRICE.headline} a year is a lot. It is what the
                        same money buys if you spend it the way you did last year.
                    </Lead>
                </div>

                <CompareRow>
                    {ALTERNATIVES.map((a, i) => (
                        <Reveal key={a.thing} delay={i * 80}>
                            <CompareItem $ours={a.ours}>
                                <p className="thing">{a.thing}</p>
                                <p className="fate">{a.fate}</p>
                            </CompareItem>
                        </Reveal>
                    ))}
                </CompareRow>
            </Container>
        </Section>

        {/* ─── Commitments ──────────────────────────────────────────── */}
        <Section $tone="paper" $tight>
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(32px, 4vw, 48px)' }}>
                    <Eyebrow>Commitments</Eyebrow>
                    <H2>Four things we will not do to you.</H2>
                </div>
                <HonestGrid>
                    <HonestItem>
                        <h3>No hostage-taking</h3>
                        <p>Cancelling drops you to Free and leaves everything you recorded exactly where it is. Nothing is deleted, nothing is locked, and export is always free.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No charge per person</h3>
                        <p>Plans count storytellers, because that is what call minutes cost. Everyone else — reading, correcting, adding their own memories — is free, always.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No selling of anything</h3>
                        <p>We do not sell data, do not train models on your stories, and do not share content with third parties. It is in the contract, not just the marketing.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No silent renewals</h3>
                        <p>We tell you before an annual plan renews, in plain language, and cancelling takes one tap in the app. Express never renews at all.</p>
                    </HonestItem>
                </HonestGrid>
            </Container>
        </Section>

        {/* ─── Programs ─────────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="programs">
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(32px, 4vw, 48px)' }}>
                    <Eyebrow>Not buying a present?</Eyebrow>
                    <H2>Programs are quoted, not listed.</H2>
                    <Lead>
                        Organizations and care communities run this at a different scale and for a different
                        reason. One short call, then a fixed number.
                    </Lead>
                </div>

                <ProgramGrid>
                    <ProgramCard>
                        <p className="audience">Organizations</p>
                        <h3>Heritage program</h3>
                        <p className="quote">Per program &middot; scoped on a 30-minute call</p>
                        <p className="blurb">
                            Founder interviews, retiring-employee capture, anniversary archives and
                            onboarding libraries &mdash; run as a program rather than a one-off project,
                            with role-based access, a printed company history and a named contact.
                        </p>
                        <ButtonAnchor href={CONTACT.organization} $variant="teal">Book a demo</ButtonAnchor>
                    </ProgramCard>
                    <ProgramCard>
                        <p className="audience">Care communities</p>
                        <h3>Community program</h3>
                        <p className="quote">Per community &middot; live within a week</p>
                        <p className="blurb">
                            Reminiscence as a standing activity for senior living, memory care and hospice.
                            Priced per community rather than per resident, so offering it widely never costs
                            you more. HIPAA-aligned handling, BAA on request.
                        </p>
                        <ButtonAnchor href={CONTACT.community} $variant="outline">Book a walkthrough</ButtonAnchor>
                    </ProgramCard>
                </ProgramGrid>

                <div style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>
                    <DriverTable tabIndex={0} role="region" aria-label="What moves a program quote, scrolls horizontally">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">What moves a program quote</th>
                                    <th scope="col">How it works</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Storytellers</th>
                                    <td>How many people you want interviewed. Three founders is a small program; a hundred-person anniversary project is a large one.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Printed volumes</th>
                                    <td>Whether you want a hardcover history, and how many copies. Editing and layout are included; printing is at cost.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hands-on facilitation</th>
                                    <td>Whether A Story runs the interviews on its own, or someone from our side steers the flagship sessions with you.</td>
                                </tr>
                                <tr>
                                    <th scope="row">Not: listeners or storage</th>
                                    <td>Everyone who should read the archive can. We do not charge per viewer, per gigabyte, or per year of retention.</td>
                                </tr>
                            </tbody>
                        </table>
                    </DriverTable>
                </div>
            </Container>
        </Section>

        {/* ─── FAQ ──────────────────────────────────────────────────── */}
        <Section $tone="paper" $tight>
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(32px, 4vw, 48px)' }}>
                    <Eyebrow>Pricing questions</Eyebrow>
                    <H2>Asked and answered.</H2>
                </div>
                <HonestGrid>
                    {PRICING_FAQ.map((f) => (
                        <HonestItem key={f.q}>
                            <h3>{f.q}</h3>
                            <p>{f.a}</p>
                        </HonestItem>
                    ))}
                </HonestGrid>
                <Actions>
                    <ButtonAnchor href={CONTACT.gift} $variant="primary">Gift a story</ButtonAnchor>
                    <Button to="/faq" $variant="ghost">Read every question <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>
        <BuyBar />
    </Page>
);

export default Pricing;
