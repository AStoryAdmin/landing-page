import Seo from './ui/Seo';
import BuyBar from './ui/BuyBar';
import Reveal from './ui/Reveal';
import { Actions, Button, ButtonAnchor, Container, Eyebrow, H2, Lead, Note, Section } from './ui/primitives';
import { IconArrow, IconCheck } from './ui/icons';
import { CONTACT } from '../lib/contact';
import { AT_CHECKOUT, buyLabel, checkoutFor } from '../lib/checkout';
import { FOREVER, PLANS, PRICE } from '../lib/pricing';
import { breadcrumbSchema, faqSchema, organizationSchema } from '../lib/seo';
import {
    BookPrice, BookPrices, BookSplit, CompareItem, CompareRow, DriverTable, ForeverBand, ForeverLead,
    ForeverList, ForeverStops, HonestGrid, HonestItem, IncludedList, Page, PlanAction, PlanBadge,
    PlanBadgeSpacer, PlanBlurb, PlanCard, PlanGrid, PlanMeter, PlanName, PlanPrice, PlanWho,
    ProgramCard, ProgramGrid, Reassure,
} from './pricing.styles';

/**
 * You pay to capture, never to keep.
 *
 * The page is built in that order on purpose: the three capture windows first,
 * then the promise that everything else is free forever afterwards, then the
 * book — which is priced on its own, because a chapter can be printed whenever
 * one is worth holding rather than once at the end.
 */

/** True on every package, so it belongs above the cards rather than inside them. */
const ON_EVERY_PACKAGE = [
    'Unlimited family members, reading and contributing',
    'Everyone can record and write their own memories, free',
    'Unlimited photo uploads',
    'Memory cards, full transcripts, and voice highlights kept as audio',
    'A searchable archive, organized by chapter of life',
    'Full export of everything, whenever you ask',
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
        a: `The guided conversations — the part where A Story calls, asks, listens and follows up. That is the only thing that costs real money to run, so it is the only thing metered. ${PRICE.gift} buys three months of them for one storyteller.`,
    },
    {
        q: 'What happens when the three months are up?',
        a: 'Everything except the AI conversations keeps working, forever. The archive stays open and searchable, everyone you invited keeps their access, and the family can go on recording, writing and adding photos as long as they like — using the same question bank the AI was working from. Nothing is deleted and nothing renews behind your back.',
    },
    {
        q: 'Why is Express more expensive than three months?',
        a: 'Because it is unlimited, and because it exists for the week when there is no time left to be relaxed about this — a birthday on Saturday, a reunion, someone who has started to decline. It removes every cap at the moment that matters. If you are not in a hurry, you want the three-month package instead, and it costs less.',
    },
    {
        q: 'Is the hardcover book included?',
        a: `No, and that is deliberate: ${PRICE.book} for a book, printed whenever a chapter is worth holding, with extra copies at ${PRICE.extraCopy}. Bundling exactly one book would quietly say the story finishes when it is printed. It doesn't — you can order another volume from the same archive in five years.`,
    },
    {
        q: 'Do I pay again next year?',
        a: 'No. Nothing auto-renews and there is no subscription. If there is more to capture later, you buy another window then, deliberately, at whatever the price is that day. Everything you already have stays free in the meantime.',
    },
    {
        q: 'Does inviting the rest of the family cost anything?',
        a: 'Never. The packages count storytellers — the people A Story interviews — because that is what the conversations cost. Everyone else reads, corrects, adds photos and records their own version of the same afternoon for free, on every package, forever.',
    },
    {
        q: 'What if they never use it?',
        a: 'Tell us and we will make it right. We would far rather refund a package than have it sit there as a reproach — and it costs us nothing to be decent about this.',
    },
    {
        q: 'Why is organization pricing not listed?',
        a: 'Because a four-person founder archive and a 200-person anniversary program are not the same product. We scope it on a 30-minute call and send a fixed number — no discovery marathon, no seat-count games.',
    },
];

const Pricing = () => (
    <Page>
        <Seo
            title="Pricing — pay to capture, never to keep"
            description={`A Story starts at ${PRICE.gift} for three months of guided conversations with one storyteller. After any package the archive, the exports and everyone you invited stay free forever — only the AI conversations pause. Nothing renews.`}
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

        {/* ─── The three packages ───────────────────────────────────── */}
        <Section $tone="wash" $tight>
            <Container>
                <div style={{ maxWidth: 720, margin: '0 auto clamp(36px, 4vw, 56px)', textAlign: 'center' }}>
                    <Eyebrow>Pricing</Eyebrow>
                    <H2>You pay to capture. You never pay to keep.</H2>
                    <Lead $center>
                        Guided conversation is the only thing here that costs real money to run, so it is
                        the only thing we meter. Pick the window that matches your situation. Everything
                        else is yours afterwards, for good.
                    </Lead>
                </div>

                <PlanGrid>
                    {PLANS.map((plan, i) => (
                        <Reveal key={plan.id} delay={i * 80}>
                            <PlanCard $featured={plan.featured}>
                                {plan.featured ? <PlanBadge>Most people start here</PlanBadge> : <PlanBadgeSpacer />}
                                <PlanName>{plan.name}</PlanName>
                                <PlanWho>{plan.who}</PlanWho>
                                <PlanPrice>
                                    <span className="amount">{plan.price}</span>
                                    <span className="window">for {plan.window}</span>
                                </PlanPrice>
                                <PlanMeter>
                                    <p className="meter">{plan.meter}</p>
                                    <p className="note">{plan.meterNote}</p>
                                </PlanMeter>
                                <PlanBlurb>{plan.blurb}</PlanBlurb>
                                <PlanAction>
                                    <ButtonAnchor
                                        href={checkoutFor(plan.id, plan.name)}
                                        $variant={plan.featured ? 'primary' : 'outline'}
                                    >
                                        {buyLabel(plan.id, `Buy ${plan.price}`, 'Ask about this one')}
                                    </ButtonAnchor>
                                </PlanAction>
                            </PlanCard>
                        </Reveal>
                    ))}
                </PlanGrid>

                <div style={{ maxWidth: 860, margin: 'clamp(32px, 4vw, 48px) auto 0' }}>
                    <Note style={{ textAlign: 'center', marginBottom: 16 }}>
                        On every package, on all three, without exception:
                    </Note>
                    <IncludedList style={{ marginTop: 0 }}>
                        {ON_EVERY_PACKAGE.map((item) => (
                            <li key={item}><IconCheck size={16} /><span>{item}</span></li>
                        ))}
                    </IncludedList>
                </div>

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

                <Note style={{ marginTop: 24, textAlign: 'center' }}>
                    Nothing auto-renews. There is no free tier &mdash; the demo on{' '}
                    the experience page is the free sample, and it needs no account.
                </Note>
            </Container>
        </Section>

        {/* ─── Buy once, keep it forever ────────────────────────────── */}
        <Section $tone="ivory" $tight id="forever">
            <Container>
                <ForeverBand>
                    <Eyebrow $tone="gold">The part that matters later</Eyebrow>
                    <H2 style={{ color: 'inherit' }}>{FOREVER.headline}</H2>
                    <ForeverLead>
                        The fear with anything that holds your family history is what happens when you stop
                        paying. Here is the answer, and it is the same on every package: nothing happens.
                        One payment, and the keeping is free for good.
                    </ForeverLead>

                    <ForeverList>
                        {FOREVER.kept.map((item) => (
                            <li key={item}><IconCheck size={16} /><span>{item}</span></li>
                        ))}
                    </ForeverList>

                    <ForeverStops>
                        <strong>The one thing that stops:</strong> {FOREVER.stops}
                    </ForeverStops>
                </ForeverBand>
            </Container>
        </Section>

        {/* ─── The book, priced on its own ──────────────────────────── */}
        <Section $tone="paper" $tight id="book">
            <Container>
                <BookSplit>
                    <div>
                        <Eyebrow>The hardcover</Eyebrow>
                        <H2>Priced on its own, so it never has to be the last page.</H2>
                        <Lead>
                            A book is not included in any package, and that is on purpose. Bundling exactly
                            one would say the story finishes when it is printed &mdash; and the whole
                            argument of this site is that it doesn&rsquo;t.
                        </Lead>
                        <Note>
                            Order one from any chapter, whenever a chapter is worth holding. Order another in
                            five years from the same archive. Editing, layout and design are included in the
                            price; printing is at cost.
                        </Note>
                        <Actions>
                            <ButtonAnchor href={checkoutFor('book', 'A hardcover book')} $variant="primary">
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
                            <p className="what">A hardcover, edited and laid out</p>
                            <p className="detail">
                                Sewn signatures, acid-free paper, photographs printed beside the stories they
                                belong to. Ships three to four weeks after you approve the proof.
                            </p>
                        </BookPrice>
                        <BookPrice>
                            <p className="amount">{PRICE.extraCopy}</p>
                            <p className="what">Each extra copy</p>
                            <p className="detail">
                                Close to what printing and shipping actually cost. Most families order these
                                once they have read the first one.
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
                        The honest question is not whether {PRICE.gift} is a lot. It is what the same money
                        buys if you spend it the way you did last year.
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
                        <h3>No subscription</h3>
                        <p>Nothing renews and nothing lapses. You will never get an email telling you that their memories are about to expire, because they cannot.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No charge per person</h3>
                        <p>Packages count storytellers, because that is what the conversations cost. Everyone else — reading, correcting, adding their own memories — is free, always.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No selling of anything</h3>
                        <p>We do not sell data, do not train models on your stories, and do not share content with third parties. It is in the contract, not just the marketing.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No paywalled memories</h3>
                        <p>Nothing you have already recorded is ever locked behind a later payment, and export is free — during a package, after one, forever.</p>
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
