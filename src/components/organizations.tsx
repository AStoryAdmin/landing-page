import { CONTACT } from '../lib/contact';
import Seo from './ui/Seo';
import Reveal from './ui/Reveal';
import { Actions, Button, ButtonAnchor, Container, Eyebrow, H2, Lead, Note, Section } from './ui/primitives';
import {
    IconArchive, IconArrow, IconBook, IconBuilding, IconCheck, IconExport, IconGlobe, IconHeart,
    IconLock, IconMic, IconNoTrain, IconSearch, IconShield, IconSpark, IconUsers,
} from './ui/icons';
import { breadcrumbSchema, faqSchema, organizationSchema } from '../lib/seo';
import {
    Deliverable, DeliverGrid, Evidence, EvidenceRow, FaqGrid, FaqItem, Hero, HeroCopy, HeroInner,
    HeroSub, HeroTitle, LossCard, LossGrid, Page, QuoteBlock, SecurityGrid, SecurityItem, Timeline,
    TimelineStep, TrustList, TrustStrip, UseCard, UseGrid,
} from './organizations.styles';

const USE_CASES = [
    {
        icon: <IconSpark />,
        title: 'Founder & leadership legacy',
        body: 'The origin story told by the person who lived it — why the company started, the decision that nearly ended it, what they would do differently. Recorded in their voice while you can still ask follow-up questions.',
        who: 'Founders · CEOs · board chairs',
    },
    {
        icon: <IconUsers />,
        title: 'Retiring expertise',
        body: 'A thirty-year employee leaves with judgment no handbook contains: why the process is the way it is, which customer relationships are load-bearing, what has already been tried. Capture it in the last months, not the last week.',
        who: 'HR · knowledge management · ops',
    },
    {
        icon: <IconArchive />,
        title: 'Anniversary & milestone archives',
        body: 'A 25th, 50th or 100th year told by the people who were there instead of by a brochure. You end with an archive, a printed history, and quotable material your marketing team will use for a decade.',
        who: 'Comms · brand · marketing',
    },
    {
        icon: <IconHeart />,
        title: 'Culture that survives onboarding',
        body: 'New hires meet the organization through the voices that built it — not a slide deck. Curated story sets by theme make induction feel like being let in on something rather than being processed.',
        who: 'People teams · L&D',
    },
    {
        icon: <IconBuilding />,
        title: 'Succession & family business',
        body: 'Most family businesses do not survive the handover, and what is lost first is the why. A Story records the reasoning of the outgoing generation so the incoming one inherits context, not just equity.',
        who: 'Family firms · succession advisors',
    },
    {
        icon: <IconGlobe />,
        title: 'Mission-driven memory',
        body: 'Nonprofits, associations, congregations, unions, universities and museums all hold history in people rather than systems. A Story turns oral history programs from a multi-year project into a running practice.',
        who: 'Nonprofits · universities · associations',
    },
];

const ORG_FAQ = [
    {
        q: 'Who does the interviewing — your team or ours?',
        a: 'Neither, in the usual case. A Story runs the interview itself: a guided voice conversation with adaptive follow-ups. Your team schedules it and shows up if they want to. For flagship subjects — a founder, a retiring executive — we will sit in and steer.',
    },
    {
        q: 'How long does one person take?',
        a: 'A useful archive comes from three to five sessions of twenty to forty minutes. Nobody blocks out a day. Sessions are resumable, so a founder can do fifteen minutes between meetings and pick it up next week.',
    },
    {
        q: 'Where does the data live, and who can see it?',
        a: 'In your organization’s private archive, encrypted at rest and in transit, with access set per person. Nothing is public unless you publish it. We never train models on your content and never share it with third parties.',
    },
    {
        q: 'Can we publish parts of it externally?',
        a: 'Yes, and most organizations do. You control exactly which stories become public — a careers page, an anniversary microsite, an internal wiki. The rest stays private by default.',
    },
    {
        q: 'What do we actually walk away with?',
        a: 'A searchable archive of transcripts and audio, a printed hardcover history, and export files you own outright. If you ever stop working with us, everything leaves with you.',
    },
    {
        q: 'How fast can we start?',
        a: 'Two weeks from first call to first recorded interview is typical, and there is no IT project involved — no installation, no procurement of hardware, no per-seat rollout.',
    },
];

const Organizations = () => (
    <Page>
        <Seo
            title="A Story for Organizations — keep your institutional memory permanently"
            description="Founder interviews, retiring-employee knowledge, anniversary archives and culture onboarding. A Story turns the history that lives in your people into a permanent, searchable archive and a printed company history."
            path="/organizations"
            schema={[
                organizationSchema(),
                breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'For organizations', path: '/organizations' },
                ]),
                faqSchema(ORG_FAQ),
            ]}
        />

        {/* ─── Hero ─────────────────────────────────────────────────── */}
        <Hero>
            <HeroInner>
                <HeroCopy>
                    <Eyebrow $tone="gold">For organizations</Eyebrow>
                    <HeroTitle>
                        Your institutional memory
                        <br />
                        <em>has a retirement date.</em>
                    </HeroTitle>
                    <HeroSub>
                        Every organization has a story that exists nowhere but in the heads of the people who
                        lived it — why it was founded, the decision that nearly ended it, how the culture
                        actually formed, why the process is the way it is. None of it is in your files. When
                        those people leave, it leaves. A Story records it while they are still here, and gives
                        it back as a permanent archive and a printed history you can hand to whoever runs this
                        place in fifty years.
                    </HeroSub>
                    <Actions>
                        <ButtonAnchor href={CONTACT.organization} $variant="gold">Book a 30-minute demo</ButtonAnchor>
                        <Button to="/pricing" $variant="onDark">See how pricing works</Button>
                    </Actions>
                </HeroCopy>
            </HeroInner>
        </Hero>

        <TrustStrip>
            <TrustList>
                <li><IconCheck size={14} /> No IT project</li>
                <li><IconCheck size={14} /> First interview inside two weeks</li>
                <li><IconCheck size={14} /> Encrypted, access-controlled, exportable</li>
                <li><IconCheck size={14} /> Never used to train AI models</li>
            </TrustList>
        </TrustStrip>

        {/* ─── The loss ─────────────────────────────────────────────── */}
        <Section $tone="ivory" $tight>
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(36px, 4vw, 56px)' }}>
                    <Eyebrow>What actually leaves</Eyebrow>
                    <H2>Nobody schedules the loss. It happens on a Friday.</H2>
                    <Lead>
                        Offboarding captures passwords and project files. It has never captured the part that
                        took thirty years to build.
                    </Lead>
                </div>

                <LossGrid>
                    {[
                        {
                            t: 'The origin story',
                            b: 'Within two handovers, why the company exists becomes a paraphrase of a paraphrase — a line on an About page nobody believes. The version with the doubt, the near-miss and the real reason only exists in one person’s memory.',
                        },
                        {
                            t: 'Hard-won judgment',
                            b: 'Not the process — the reasoning behind it. Which supplier relationship is load-bearing, which shortcut was tried in 2009 and why it failed, what a customer really meant. The new team rediscovers all of it the expensive way.',
                        },
                        {
                            t: 'The culture itself',
                            b: 'Culture is transmitted by story, not by values slides. When the people who carry the stories retire, the next generation inherits the rules without the reasons — and the rules quietly stop making sense.',
                        },
                    ].map((c, i) => (
                        <Reveal key={c.t} delay={i * 90}>
                            <LossCard>
                                <h3>{c.t}</h3>
                                <p>{c.b}</p>
                            </LossCard>
                        </Reveal>
                    ))}
                </LossGrid>

                <EvidenceRow>
                    {[
                        {
                            n: '10,000',
                            p: 'Americans reach age 65 every single day — including the people who founded, built and hold the memory of your organization.',
                            s: 'U.S. Census Bureau',
                        },
                        {
                            n: '1 in 3',
                            p: 'family businesses survive into the second generation; roughly 12% reach the third. What fails to transfer first is context, not capital.',
                            s: 'Family Business Institute',
                        },
                        {
                            n: '$47M',
                            p: 'estimated annual cost to a large enterprise of knowledge that exists but cannot be found or transferred between people.',
                            s: 'Panopto Workplace Knowledge Report, 2018',
                        },
                    ].map((e, i) => (
                        <Reveal key={e.n} delay={i * 90}>
                            <Evidence>
                                <div className="num">{e.n}</div>
                                <p>{e.p}</p>
                                <p className="src">{e.s}</p>
                            </Evidence>
                        </Reveal>
                    ))}
                </EvidenceRow>
            </Container>
        </Section>

        {/* ─── Use cases ────────────────────────────────────────────── */}
        <Section $tone="paper" $tight id="use-cases">
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(36px, 4vw, 56px)' }}>
                    <Eyebrow>Where organizations use it</Eyebrow>
                    <H2>Six programs, one interview engine.</H2>
                    <Lead>
                        The same guided conversation that gets a grandmother talking about 1958 gets a founder
                        talking about 1997. Only the prompt set changes.
                    </Lead>
                </div>

                <UseGrid>
                    {USE_CASES.map((u, i) => (
                        <Reveal key={u.title} delay={(i % 3) * 90}>
                            <UseCard>
                                <span className="icon">{u.icon}</span>
                                <h3>{u.title}</h3>
                                <p>{u.body}</p>
                                <span className="who">{u.who}</span>
                            </UseCard>
                        </Reveal>
                    ))}
                </UseGrid>
            </Container>
        </Section>

        {/* ─── Deliverables ─────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="deliverables">
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(36px, 4vw, 56px)' }}>
                    <Eyebrow>What you get</Eyebrow>
                    <H2>An asset, not a folder of audio files.</H2>
                    <Lead>
                        Recording is the easy part. What organizations actually need is the thing that gets
                        used afterwards — searchable, quotable, shareable, and printed.
                    </Lead>
                </div>

                <DeliverGrid>
                    {[
                        { i: <IconMic />, t: 'Guided interviews, run for you', d: 'Adaptive voice conversations with real follow-up questions. No interviewer to hire, no question list to write, no awkward silences to manage.' },
                        { i: <IconSearch />, t: 'A searchable institutional archive', d: 'Every session transcribed, titled, tagged by theme and era, with audio alongside. Find every mention of the 2011 acquisition in one search.' },
                        { i: <IconBook />, t: 'A printed company history', d: 'A hardcover volume, edited and laid out like a book rather than a report. The object that ends up on the boardroom table and in every retiring employee’s hands.' },
                        { i: <IconUsers />, t: 'An onboarding story library', d: 'Curated sets by theme — how we started, how we work, what we learned the hard way — that new hires actually watch, because they are people talking, not slides.' },
                        { i: <IconArchive />, t: 'Publication-ready material', d: 'Pull quotes, clips and passages cleared for external use, ready for an anniversary campaign, a careers page or a keynote.' },
                        { i: <IconExport />, t: 'Full ownership and export', d: 'Audio, transcripts, images and metadata are yours. Request a complete export at any time and receive everything. No lock-in has ever been part of the deal.' },
                    ].map((d, i) => (
                        <Reveal key={d.t} delay={(i % 2) * 80}>
                            <Deliverable>
                                <span className="icon">{d.i}</span>
                                <div>
                                    <h3>{d.t}</h3>
                                    <p>{d.d}</p>
                                </div>
                            </Deliverable>
                        </Reveal>
                    ))}
                </DeliverGrid>
            </Container>
        </Section>

        {/* ─── Implementation ───────────────────────────────────────── */}
        <Section $tone="deep" $tight id="implementation">
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(36px, 4vw, 56px)' }}>
                    <Eyebrow $tone="gold">How a program runs</Eyebrow>
                    <H2>Four weeks from first call to first chapter.</H2>
                    <Lead $onDark>
                        There is no software to install, no hardware to buy, and nothing for your IT team to
                        deploy. The heaviest lift on your side is deciding who to record first.
                    </Lead>
                </div>

                <Timeline>
                    {[
                        { w: 'Week 1', t: 'Scope', d: 'A 30-minute call: who holds the memory, what you want to end up with, and which three people to start with. We come back with a program plan and prompt sets built for your context.' },
                        { w: 'Week 2', t: 'First interviews', d: 'Your storytellers receive a link. They talk. Sessions run 20–40 minutes and resume wherever they left off. Nothing to install; any phone, tablet or laptop works.' },
                        { w: 'Weeks 3–6', t: 'The archive fills', d: 'Transcripts, tags and chapters build automatically. Colleagues add photos, documents and corrections. Your archive becomes searchable as it grows, not at the end.' },
                        { w: 'Week 8+', t: 'Publish & print', d: 'We edit and lay out the printed history, clear what you want to publish externally, and hand over the onboarding library. Then the program keeps running for the next cohort.' },
                    ].map((s, i) => (
                        <TimelineStep key={s.w}>
                            <Reveal delay={i * 90}>
                                <p className="week">{s.w}</p>
                                <h3>{s.t}</h3>
                                <p>{s.d}</p>
                            </Reveal>
                        </TimelineStep>
                    ))}
                </Timeline>

                <Actions>
                    <ButtonAnchor href={CONTACT.organization} $variant="gold">Start with a 30-minute call <IconArrow /></ButtonAnchor>
                </Actions>
            </Container>
        </Section>

        {/* ─── Security ─────────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="security">
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(36px, 4vw, 56px)' }}>
                    <Eyebrow>Security &amp; governance</Eyebrow>
                    <H2>Built for the review your IT team is going to run.</H2>
                    <Lead>
                        These are people speaking candidly about your organization. We treat that the way we
                        would want ours treated — and we put it in writing.
                    </Lead>
                </div>

                <SecurityGrid>
                    {[
                        { t: 'Encrypted at rest and in transit', d: 'All audio, transcripts and uploaded media are encrypted end to end. Access is scoped per person, per archive, and revocable instantly.' },
                        { t: 'Never used to train models', d: 'Your content is never used to train AI models, ours or anyone else’s, and is never shared with third parties. This is a contractual commitment, not a policy line.' },
                        { t: 'The storyteller consents', d: 'Every participant sees what is being recorded, who will have access, and can withdraw a session. Consent is captured and logged, not assumed.' },
                        { t: 'Role-based access & audit log', d: 'Decide who sees which archive, who can publish externally, and who can export. Access events are logged and available to your administrators.' },
                        { t: 'DPA and security documentation', d: 'Data processing agreement, subprocessor list, data-flow description and encryption standards are available for your review. We answer security questionnaires within 24 hours.' },
                        { t: 'Full export, any time', d: 'Request everything — audio, transcripts, media, metadata — and receive it within 48 hours in open formats. Leaving is always possible, by design.' },
                    ].map((s, i) => (
                        <Reveal key={s.t} delay={(i % 3) * 80}>
                            <SecurityItem>
                                <h3>{s.t}</h3>
                                <p>{s.d}</p>
                            </SecurityItem>
                        </Reveal>
                    ))}
                </SecurityGrid>

                <Note style={{ marginTop: 24 }}>
                    Working in a regulated or clinical setting? Our{' '}
                    <a href="/institution#compliance" style={{ color: 'inherit' }}>care-community commitments</a>{' '}
                    cover HIPAA-aligned handling and business associate agreements.
                </Note>

                <Actions>
                    <Button to="/privacy" $variant="outline">Read the full privacy policy <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>

        {/* ─── Quote ────────────────────────────────────────────────── */}
        <Section $tone="teal" $tight>
            <Container>
                <QuoteBlock>
                    <blockquote>
                        &ldquo;Our founder is 71. We had a folder of press clippings and no real idea why he
                        started the company. Now we have four hours of him telling it, a book on every desk,
                        and new hires who understand the place before their first week is out.&rdquo;
                    </blockquote>
                    <figcaption>Operations lead &middot; family-owned manufacturer, 140 employees</figcaption>
                </QuoteBlock>
            </Container>
        </Section>

        {/* ─── Trust markers ────────────────────────────────────────── */}
        <Section $tone="paper" $tight>
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(28px, 3vw, 40px)' }}>
                    <Eyebrow>Why it works here</Eyebrow>
                    <H2>The interview is the hard part. That is the part we automated.</H2>
                    <Lead>
                        Oral history programs fail for one reason: they need a skilled interviewer, repeatedly,
                        for years. A Story removes that constraint without removing the warmth — which is why
                        a program that used to be a two-year project becomes something you can simply keep
                        doing.
                    </Lead>
                </div>
                <DeliverGrid>
                    <Deliverable>
                        <span className="icon"><IconShield /></span>
                        <div>
                            <h3>Low burden on your team</h3>
                            <p>One coordinator, a few hours a month. No interviewer to train, no transcription queue, no editing backlog.</p>
                        </div>
                    </Deliverable>
                    <Deliverable>
                        <span className="icon"><IconLock /></span>
                        <div>
                            <h3>Private by default</h3>
                            <p>Nothing is published without an explicit decision. Internal stays internal; you choose what ever leaves the building.</p>
                        </div>
                    </Deliverable>
                    <Deliverable>
                        <span className="icon"><IconNoTrain /></span>
                        <div>
                            <h3>No AI weirdness</h3>
                            <p>We do not synthesise voices, invent quotes, or dramatise. The archive contains what people actually said, attributed and timestamped.</p>
                        </div>
                    </Deliverable>
                    <Deliverable>
                        <span className="icon"><IconHeart /></span>
                        <div>
                            <h3>People like doing it</h3>
                            <p>Being asked about your own working life, by something that listens without hurrying, is not a chore. Completion rates reflect that.</p>
                        </div>
                    </Deliverable>
                </DeliverGrid>
            </Container>
        </Section>

        {/* ─── FAQ ──────────────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="faq">
            <Container>
                <div style={{ maxWidth: 760, marginBottom: 'clamp(36px, 4vw, 56px)' }}>
                    <Eyebrow>Questions from procurement, HR and comms</Eyebrow>
                    <H2>The practical answers.</H2>
                </div>
                <FaqGrid>
                    {ORG_FAQ.map((f) => (
                        <FaqItem key={f.q}>
                            <h3>{f.q}</h3>
                            <p>{f.a}</p>
                        </FaqItem>
                    ))}
                </FaqGrid>
                <Actions>
                    <ButtonAnchor href={CONTACT.organization} $variant="primary">Book a 30-minute demo</ButtonAnchor>
                    <Button to="/faq" $variant="ghost">Read every question <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>
    </Page>
);

export default Organizations;
