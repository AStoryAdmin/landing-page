import Seo from './ui/Seo';
import Reveal from './ui/Reveal';
import { Actions, Button, Container, Eyebrow, H2, Lead, Note, Section } from './ui/primitives';
import { IconArrow, IconCheck } from './ui/icons';
import { breadcrumbSchema, faqSchema, organizationSchema } from '../lib/seo';
import { DriverTable, HonestGrid, HonestItem, Page, Plan, PlanGrid } from './pricing.styles';

/*
 * Pricing lives in one place so it can be updated without touching layout.
 * During founding access the family plan is genuinely free, and the two
 * programme plans are quoted per engagement — so no number is invented here.
 * When list prices are set, change `price` and `priceNote` and nothing else.
 */
const PLANS = [
    {
        audience: 'Families',
        name: 'Founding access',
        price: 'Free',
        priceNote: 'During early access · 87 of 100 spots left',
        blurb:
            'Everything needed to capture one person’s life story and share it with the whole family. No card, no trial clock.',
        features: [
            'Unlimited guided voice interviews',
            'Private archive, organized by chapter of life',
            'Photo uploads attached to the right memory',
            'Invite the whole family to contribute',
            'Searchable transcripts and saved audio',
            'Personal onboarding call with our founder',
            'Full export whenever you want it',
        ],
        cta: { label: 'Claim a founding spot', to: '/signup', variant: 'primary' as const },
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
            'Everything in Founding access',
            'Prompt sets built for your organization',
            'Role-based access and admin controls',
            'Searchable institutional archive',
            'Printed hardcover company history',
            'Onboarding story library, curated by theme',
            'DPA, security documentation, named contact',
        ],
        cta: { label: 'Book a demo', to: '/signup?for=organization', variant: 'gold' as const },
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
            'Everything in Founding access',
            'Resident-controlled consent and access',
            'Staff view of resident life history',
            'Family sharing across any distance',
            'Monthly activity guides and prompts',
            'HIPAA-aligned handling, BAA on request',
            'Onboarding for new staff, ongoing',
        ],
        cta: { label: 'Book a walkthrough', to: '/signup?for=organization', variant: 'outline' as const },
        foot: 'Priced per community rather than per resident, so offering it widely never costs you more.',
    },
];

const PRICING_FAQ = [
    {
        q: 'Is founding access really free?',
        a: 'Yes — free for the first 100 families, with no card required and no trial that quietly ends. We are early, we want the feedback, and we would rather earn the paid relationship later.',
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
            description="Founding access is free for families. Organization and care-community programs are quoted per engagement on a 30-minute call. Full export always included, no lock-in."
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
                    <H2>Priced so that asking is never the expensive part.</H2>
                    <Lead>
                        Families start free. Organizations and care communities are quoted per program, on one
                        short call, with a fixed number and no seat-count surprises. Everyone can export
                        everything, always.
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
                                <Button to={p.cta.to} $variant={p.cta.variant}>{p.cta.label}</Button>
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
                    <Button to="/signup" $variant="primary">Start free</Button>
                    <Button to="/signup?for=organization" $variant="outline">Get a program quote <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>
    </Page>
);

export default Pricing;
