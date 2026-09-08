import { CONTACT } from '../lib/contact';
import Seo from './ui/Seo';
import Reveal from './ui/Reveal';
import { Actions, ButtonAnchor, Container, Eyebrow, H2, Lead, Note, Section } from './ui/primitives';
import { IconArrow, IconCheck } from './ui/icons';
import { breadcrumbSchema, faqSchema, organizationSchema } from '../lib/seo';
import { DriverTable, HonestGrid, HonestItem, Page, Plan, PlanGrid } from './pricing.styles';

/*
 * Pricing lives in one place so it can be updated without touching layout.
 * The family plan is genuinely free during early access and the two programme
 * plans are quoted per engagement, so no number is invented here. When list
 * prices are set, change `price` and `priceNote` and nothing else.
 */
const PLANS = [
    {
        audience: 'The gift',
        name: 'A Story for one person',
        price: 'Free',
        priceNote: 'The archive, free while we are in early access',
        blurb:
            'Everything needed to capture one person’s life story and hand it to the whole family. You buy once; there is no per-person charge for anyone you share it with.',
        features: [
            'A card and a link to give, with your note on it',
            'Unlimited guided voice interviews',
            'Private archive, organized by chapter of life',
            'Photo uploads attached to the right memory',
            'Invite as many family members as you like — free',
            'Searchable transcripts and saved audio',
            'A personal hand-hold from us if they get stuck',
            'Full export whenever you want it',
        ],
        cta: { label: "Start your family's story", href: CONTACT.gift, variant: 'primary' as const },
        foot: 'The hardcover keepsake is $79–$129 depending on length, plus shipping, and is always quoted before you order. The digital archive is free.',
    },
    {
        audience: 'Organizations',
        name: 'Heritage program',
        price: 'Quoted',
        priceNote: 'Per program · scoped on a 30-minute call',
        blurb:
            'Founder interviews, retiring-employee capture, anniversary archives and onboarding libraries — run as a program rather than a one-off project.',
        features: [
            'Everything in Early access',
            'Prompt sets built for your organization',
            'Role-based access and admin controls',
            'Searchable institutional archive',
            'Printed hardcover company history',
            'Onboarding story library, curated by theme',
            'DPA, security documentation, named contact',
        ],
        cta: { label: 'Book a demo', href: CONTACT.organization, variant: 'gold' as const },
        featured: true,
        flag: 'Most requested',
        foot: 'Priced by number of storytellers and whether you want a printed volume. No per-seat licensing for listeners.',
    },
    {
        audience: 'Care communities',
        name: 'Community program',
        price: 'Quoted',
        priceNote: 'Per community · live within a week',
        blurb:
            'Reminiscence as a standing activity for senior living, memory care and hospice — designed to be low-burden for staff.',
        features: [
            'Everything in Early access',
            'Resident-controlled consent and access',
            'Staff view of resident life history',
            'Family sharing across any distance',
            'Monthly activity guides and prompts',
            'HIPAA-aligned handling, BAA on request',
            'Onboarding for new staff, ongoing',
        ],
        cta: { label: 'Book a walkthrough', href: CONTACT.community, variant: 'outline' as const },
        foot: 'Priced per community rather than per resident, so offering it widely never costs you more.',
    },
];

const PRICING_FAQ = [
    {
        q: 'So what am I actually paying for?',
        a: 'The hardcover book, at $79–$129 depending on length. The archive itself is free while we are in early access — no card, and no trial that quietly ends. We would rather earn the paid relationship later than extract it now.',
    },
    {
        q: 'What does the printed book cost?',
        a: '$79–$129 depending on page count, plus shipping — quoted before you order, and priced close to what printing and delivery actually cost. The digital archive is free either way, and you are never charged for a book you did not ask for.',
    },
    {
        q: 'Why is organization pricing not listed?',
        a: 'Because a four-person founder archive and a 200-person anniversary program are not the same product. We scope it on a 30-minute call and send a fixed number — no discovery marathon, no seat-count games.',
    },
    {
        q: 'What happens to our archive if we stop paying?',
        a: 'You keep it. A full export of audio, transcripts, photos and metadata is available on request within 48 hours, in open formats. We do not hold anyone’s history hostage.',
    },
];

const Pricing = () => (
    <Page>
        <Seo
            title="Pricing — A Story"
            description="What it costs to give A Story: the archive is free during early access, the hardcover keepsake is $79–$129. Organization and care-community programs are quoted per engagement."
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

        <Section $tone="wash" $tight>
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(40px, 5vw, 64px)' }}>
                    <Eyebrow>Pricing</Eyebrow>
                    <H2>Priced so the asking is never the expensive part.</H2>
                    <Lead>
                        Giving it costs the price of the book. The archive is free while we are in early
                        access, and it never costs more because more of the family joined in. Organizations
                        and care communities are quoted per program on one short call.
                    </Lead>
                </div>

                <PlanGrid>
                    {PLANS.map((p, i) => (
                        <Reveal key={p.name} delay={i * 90}>
                            <Plan $featured={p.featured}>
                                {p.flag && <span className="flag">{p.flag}</span>}
                                <p className="audience">{p.audience}</p>
                                <h2>{p.name}</h2>
                                <div className="price">{p.price}</div>
                                <p className="priceNote">{p.priceNote}</p>
                                <p className="blurb">{p.blurb}</p>
                                <ul>
                                    {p.features.map((f) => (
                                        <li key={f}><IconCheck size={16} /><span>{f}</span></li>
                                    ))}
                                </ul>
                                <ButtonAnchor href={p.cta.href} $variant={p.cta.variant}>{p.cta.label}</ButtonAnchor>
                                <p className="foot">{p.foot}</p>
                            </Plan>
                        </Reveal>
                    ))}
                </PlanGrid>

                <Note style={{ marginTop: 28, textAlign: 'center' }}>
                    Every plan includes a full export of everything you record. Prices are quoted before you
                    commit to anything.
                </Note>
            </Container>
        </Section>

        {/* ─── What drives the number ───────────────────────────────── */}
        <Section $tone="ivory" $tight>
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(32px, 4vw, 48px)' }}>
                    <Eyebrow>How a quote is built</Eyebrow>
                    <H2>You should be able to predict the number before we send it.</H2>
                    <Lead>
                        Three things move the price. Nothing else does — not the number of people who read the
                        archive, not how much you record, not how long you keep it.
                    </Lead>
                </div>

                <DriverTable tabIndex={0} role="region" aria-label="What moves the price, scrolls horizontally">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">What moves the price</th>
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
                                <td>Whether you want a hardcover history, and how many copies. Editing and layout are included in the program; printing is at cost.</td>
                            </tr>
                            <tr>
                                <th scope="row">Hands-on facilitation</th>
                                <td>Whether A Story runs the interviews on its own, or a person from our side steers the flagship sessions with you.</td>
                            </tr>
                            <tr>
                                <th scope="row">Not: listeners or storage</th>
                                <td>Everyone who should read the archive can. We do not charge per viewer, per gigabyte, or per year of retention.</td>
                            </tr>
                        </tbody>
                    </table>
                </DriverTable>
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
                        <h3>No lock-in</h3>
                        <p>A full export — audio, transcripts, photos, metadata — is available on request within 48 hours, in open formats, whether or not you are still a customer.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No surprise renewal</h3>
                        <p>Program pricing is fixed for the term. We tell you before anything renews, in plain language, and a decision not to renew costs you nothing.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No selling of anything</h3>
                        <p>We do not sell data, do not train models on your stories, and do not share content with third parties. It is in the contract, not just the marketing.</p>
                    </HonestItem>
                    <HonestItem>
                        <h3>No paywalled memories</h3>
                        <p>If a plan lapses, the archive is not deleted and the stories are not held hostage. You will always be able to retrieve what belongs to you.</p>
                    </HonestItem>
                </HonestGrid>
            </Container>
        </Section>

        {/* ─── FAQ ──────────────────────────────────────────────────── */}
        <Section $tone="ivory" $tight>
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
                    <ButtonAnchor href={CONTACT.organization} $variant="outline">Get a program quote <IconArrow /></ButtonAnchor>
                </Actions>
            </Container>
        </Section>
    </Page>
);

export default Pricing;
