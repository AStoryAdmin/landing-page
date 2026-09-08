import Seo from './ui/Seo';
import Reveal from './ui/Reveal';
import { Actions, Button, ButtonAnchor, Container, Eyebrow, H2, Lead, Note, Section } from './ui/primitives';
import { IconArrow, IconCheck } from './ui/icons';
import { CONTACT } from '../lib/contact';
import { PRICE } from '../lib/pricing';
import { breadcrumbSchema, faqSchema, organizationSchema } from '../lib/seo';
import {
    CompareItem, CompareRow, DriverTable, HonestGrid, HonestItem, IncludedList, Page, Price,
    PriceActions, PriceCard, PriceNote, PriceSub, ProgramCard, ProgramGrid,
} from './pricing.styles';

const INCLUDED = [
    'A card and a link to give, with your note on it',
    'Unlimited guided voice interviews',
    'One hardcover book, edited and laid out',
    'A private archive, organised by chapter of life',
    'Photos attached to the memory they belong to',
    'As many family members as you like — free',
    'Searchable transcripts and the original audio',
    'Full export of everything, whenever you ask',
];

/**
 * The comparison every gift buyer runs in their head anyway. Naming it is more
 * persuasive than defending the number in the abstract.
 */
const ALTERNATIVES = [
    { thing: 'A cashmere jumper', fate: 'Worn twice. In a charity bag by the spring after next.' },
    { thing: 'Dinner for four', fate: 'A lovely evening. Nobody will be able to tell you what they ate.' },
    { thing: 'Another photo frame', fate: 'One picture, on a shelf, of a day somebody else chose.' },
    { thing: 'A Story', fate: 'Their whole life, in their voice, read by people not born yet.', ours: true },
];

const PRICING_FAQ = [
    {
        q: 'Is that the whole price?',
        a: `Yes. ${PRICE.gift} covers the interviews, the archive, everyone you invite, and one hardcover book, shipped. There is no subscription, no per-person charge, and nothing that renews behind your back.`,
    },
    {
        q: 'What if the whole family wants a copy of the book?',
        a: `Extra copies are ${PRICE.extraCopy} each, priced close to what printing and posting actually cost. Most families order them once they have read the first one — there is no rush and no deadline.`,
    },
    {
        q: 'Do I pay again next year?',
        a: 'No. You are buying a gift, not a subscription. The archive stays open and they can keep adding to it for as long as they want to, at no further cost.',
    },
    {
        q: 'What if they never use it?',
        a: 'Tell us and we will make it right. We would far rather refund a gift than have it sit there as a reproach — and it costs us nothing to be decent about this.',
    },
    {
        q: 'Why is organization pricing not listed?',
        a: 'Because a four-person founder archive and a 200-person anniversary programme are not the same product. We scope it on a 30-minute call and send a fixed number — no discovery marathon, no seat-count games.',
    },
    {
        q: 'What happens to a programme archive if we stop paying?',
        a: 'You keep it. A full export of audio, transcripts, photos and metadata is available on request within 48 hours, in open formats, whether or not you are still a customer.',
    },
];

const Pricing = () => (
    <Page>
        <Seo
            title="Pricing — one price, one gift, the whole family"
            description={`A Story costs ${PRICE.gift} — one payment, including the hardcover book, with no subscription and no charge for the family members you invite. Organization and care-community programmes are quoted per engagement.`}
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

        {/* ─── The one number ───────────────────────────────────────── */}
        <Section $tone="wash" $tight>
            <Container>
                <div style={{ maxWidth: 720, margin: '0 auto clamp(36px, 4vw, 56px)', textAlign: 'center' }}>
                    <Eyebrow>Pricing</Eyebrow>
                    <H2>One price. One gift. The whole family.</H2>
                    <Lead $center>
                        You pay once, when you give it. Nothing renews, nothing is metered, and inviting
                        fifteen relatives costs exactly the same as inviting none.
                    </Lead>
                </div>

                <Reveal>
                    <PriceCard>
                        <Price>{PRICE.gift}</Price>
                        <PriceNote>{PRICE.giftNote}</PriceNote>
                        <PriceSub>
                            Everything below is included. There is no upgrade, no premium tier, and no part
                            of this held back to sell you later.
                        </PriceSub>

                        <IncludedList>
                            {INCLUDED.map((item) => (
                                <li key={item}><IconCheck size={16} /><span>{item}</span></li>
                            ))}
                        </IncludedList>

                        <PriceActions>
                            <ButtonAnchor href={CONTACT.gift} $variant="primary">Gift a story</ButtonAnchor>
                            <Button to="/experience" $variant="outline">See what they receive</Button>
                        </PriceActions>
                    </PriceCard>
                </Reveal>

                <Note style={{ marginTop: 24, textAlign: 'center' }}>
                    Extra copies of the book are {PRICE.extraCopy} each, at close to printing cost. Nothing
                    else costs anything, ever.
                </Note>
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
                        <p>This is a gift, and gifts do not renew. You will never get an email telling you that their memories are about to lapse.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No charge per person</h3>
                        <p>Invite the whole family. Every extra person makes the archive better, and none of them costs you a penny.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No selling of anything</h3>
                        <p>We do not sell data, do not train models on your stories, and do not share content with third parties. It is in the contract, not just the marketing.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No paywalled memories</h3>
                        <p>Nothing is ever locked behind a later payment. A full export — audio, transcripts, photos — is available on request, always.</p>
                    </HonestItem>
                </HonestGrid>
            </Container>
        </Section>

        {/* ─── Programmes ───────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="programmes">
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(32px, 4vw, 48px)' }}>
                    <Eyebrow>Not buying a present?</Eyebrow>
                    <H2>Programmes are quoted, not listed.</H2>
                    <Lead>
                        Organizations and care communities run this at a different scale and for a different
                        reason. One short call, then a fixed number.
                    </Lead>
                </div>

                <ProgramGrid>
                    <ProgramCard>
                        <p className="audience">Organizations</p>
                        <h3>Heritage programme</h3>
                        <p className="quote">Per programme &middot; scoped on a 30-minute call</p>
                        <p className="blurb">
                            Founder interviews, retiring-employee capture, anniversary archives and
                            onboarding libraries &mdash; run as a programme rather than a one-off project,
                            with role-based access, a printed company history and a named contact.
                        </p>
                        <ButtonAnchor href={CONTACT.organization} $variant="teal">Book a demo</ButtonAnchor>
                    </ProgramCard>
                    <ProgramCard>
                        <p className="audience">Care communities</p>
                        <h3>Community programme</h3>
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
                    <DriverTable tabIndex={0} role="region" aria-label="What moves a programme quote, scrolls horizontally">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">What moves a programme quote</th>
                                    <th scope="col">How it works</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Storytellers</th>
                                    <td>How many people you want interviewed. Three founders is a small programme; a hundred-person anniversary project is a large one.</td>
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
    </Page>
);

export default Pricing;
