import Seo from './ui/Seo';
import Reveal from './ui/Reveal';
import {
    Actions, Button, Container, Eyebrow, H2, Italic, Lead, Note, Section, TextLink,
} from './ui/primitives';
import {
    IconArchive, IconArrow, IconBook, IconBuilding, IconCheck, IconExport, IconHeart, IconLock,
    IconMic, IconNoTrain, IconSearch, IconShield, IconUsers,
} from './ui/icons';
import { faqSchema, organizationSchema, productSchema } from '../lib/seo';
import productImg from './../assets/astoryProduct.webp';
import {
    AudienceCard, AudienceGrid, AudienceStrip, Divider, FaqItem, FaqList, Feature, FeatureList, Hero,
    HeroActions, HeroBadge, HeroCopy, HeroInner, HeroSub, HeroTitle, HeroTrust, No, OrgBand, OrgInner,
    OrgPoints, Page, PromiseCard, PromiseGrid, ProofImage, ProofSplit, PullQuote, QuoteCard, QuoteGrid,
    QuoteHead, SectionHead, StatGrid, StatItem, StatusDot, StatusFamily, Step, StepGrid, StepNumber,
    StepText, StepTitle, Table, TableWrap, Yes,
} from './home.styles';

const AUDIENCES = [
    {
        to: '/family',
        tag: 'Families',
        title: 'Before the chance passes',
        body: "Ask your mother what she was afraid of at nineteen. Ask your grandfather how he met her. A Story does the asking, keeps the answers, and prints the book.",
        cta: 'For families',
    },
    {
        to: '/organizations',
        tag: 'Organizations',
        title: 'The memory that walks out the door',
        body: 'Founders retire. Thirty-year employees leave. The story of how your organization actually became itself lives in people, not in files. Keep it while you still can.',
        cta: 'For organizations',
    },
    {
        to: '/institution',
        tag: 'Care communities',
        title: 'Every resident, a whole person',
        body: 'Reminiscence therapy has decades of evidence behind it and has never been scalable. A Story makes it a fifteen-minute conversation any team member can offer.',
        cta: 'For care communities',
    },
];

const TOP_FAQ = [
    {
        q: 'Does the person telling the story need to be good with technology?',
        a: 'No. They tap once and talk. There is no app to install, no account to create, no typing required. If they can answer a phone call, they can use A Story.',
    },
    {
        q: 'What if they only have twenty minutes at a time?',
        a: 'That is the normal case. Sessions are designed to be short and resumable — the archive remembers exactly where the conversation left off and picks it back up weeks later.',
    },
    {
        q: 'Who owns the stories?',
        a: 'The storyteller does, completely. We never sell data, never train models on it, and never share it. A full export — audio, transcripts, photos — is available at any time.',
    },
    {
        q: 'Do we get something physical?',
        a: 'Yes. A hardcover memoir, edited and laid out by chapter with photos in place, printed on acid-free paper and shipped to your door. The digital archive lives alongside it.',
    },
    {
        q: 'Can family members in other cities contribute?',
        a: 'Yes. Anyone you invite can add photos, corrections, and their own memories to the same archive from anywhere — no account required for the storyteller.',
    },
    {
        q: 'How is this different for an organization?',
        a: 'Same interview engine, different subject: founders, long-tenured employees, milestone anniversaries. You get an internal archive, an onboarding library, and a printed company history.',
    },
];

const Home = () => (
    <Page>
        <Seo
            title="A Story — keep the memories that only live in one person's head"
            description="A Story turns guided voice conversations into a private, searchable archive and a printed hardcover book. For families, care communities, and organizations preserving the history that made them."
            path="/"
            schema={[
                organizationSchema(),
                productSchema(),
                faqSchema(TOP_FAQ.map(({ q, a }) => ({ q, a }))),
            ]}
        />

        {/* ─── Hero ─────────────────────────────────────────────────── */}
        <Hero>
            <HeroInner>
                <HeroCopy>
                    <HeroBadge>Memory &amp; Life Story</HeroBadge>
                    <HeroTitle>
                        Every life holds a story.
                        <br />
                        <em>Most are never told.</em>
                    </HeroTitle>
                    <HeroSub>
                        A Story sits down with the person who holds the memories, asks the questions nobody
                        gets around to asking, and turns the answers into a private archive your family — or
                        your organization — will still be reading in fifty years. Plus a hardcover book you
                        can hold.
                    </HeroSub>
                    <HeroActions>
                        <Button to="/signup" $variant="primary">Start a story — free</Button>
                        <Button to="/experience#demo" $variant="onDark">See a 90-second demo</Button>
                    </HeroActions>
                    <HeroTrust>
                        <li><IconLock size={15} /> Private &amp; encrypted</li>
                        <li><IconMic size={15} /> Voice-first — speak or type</li>
                        <li><IconCheck size={15} /> No app to install</li>
                        <li><IconNoTrain size={15} /> Never used to train AI</li>
                    </HeroTrust>
                </HeroCopy>
            </HeroInner>
        </Hero>

        {/* ─── Audience router ──────────────────────────────────────── */}
        <AudienceStrip aria-label="Choose your path">
            <AudienceGrid>
                {AUDIENCES.map((a, i) => (
                    <Reveal key={a.to} delay={i * 90}>
                        <AudienceCard to={a.to} style={{ height: '100%' }}>
                            <span className="tag">{a.tag}</span>
                            <h3>{a.title}</h3>
                            <p>{a.body}</p>
                            <span className="go">{a.cta} <IconArrow size={15} /></span>
                        </AudienceCard>
                    </Reveal>
                ))}
            </AudienceGrid>
        </AudienceStrip>

        {/* ─── How it works ─────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="how">
            <Container>
                <SectionHead $center>
                    <Eyebrow>How it works</Eyebrow>
                    <H2>Talk. Listen. <Italic>Keep.</Italic></H2>
                    <Lead $center>
                        Three steps, and only the first one asks anything of the person telling the story.
                    </Lead>
                </SectionHead>

                <Reveal>
                    <StepGrid>
                        <Step>
                            <StepNumber>1</StepNumber>
                            <StepTitle>Talk</StepTitle>
                            <StepText>
                                A warm AI guide opens the door — childhood, family, work, love, regret, what
                                they are proud of. It follows where the story goes and never rushes. Fifteen
                                minutes is a real session. So is two hours.
                            </StepText>
                            <TextLink to="/experience">See the conversation <IconArrow /></TextLink>
                        </Step>
                        <Step>
                            <StepNumber>2</StepNumber>
                            <StepTitle>Listen</StepTitle>
                            <StepText>
                                Every answer becomes a memory card — transcribed, titled, dated, filed by
                                chapter of life, and searchable. Photos attach to the moment they belong to.
                                A whole life, finally in order.
                            </StepText>
                            <TextLink to="/experience#demo">Try the demo <IconArrow /></TextLink>
                        </Step>
                        <Step>
                            <StepNumber>3</StepNumber>
                            <StepTitle>Keep</StepTitle>
                            <StepText>
                                A hardcover book arrives at your door — edited, laid out like a memoir, photos
                                beside the stories they belong to. The digital archive stays on your phone.
                                Both are yours forever.
                            </StepText>
                            <TextLink to="/experience#book">See the keepsake <IconArrow /></TextLink>
                        </Step>
                    </StepGrid>
                </Reveal>
            </Container>
        </Section>

        {/* ─── Why now ──────────────────────────────────────────────── */}
        <Section $tone="deep" $tight>
            <Container>
                <SectionHead>
                    <Eyebrow $tone="gold">Why now, not later</Eyebrow>
                    <H2>The window is narrower than it feels.</H2>
                </SectionHead>
                <StatGrid>
                    {[
                        { n: '1.4B', t: 'people will be aged 60 or over worldwide by 2030 — the generation holding the stories.', r: 'WHO, 2025' },
                        { n: '10K', t: 'Americans cross age 65 every single day, carrying memories nobody has asked about.', r: 'U.S. Census' },
                        { n: '63M', t: 'U.S. family caregivers already feel the window closing, and most never get to the asking.', r: 'AARP / NAC, 2025' },
                    ].map((s, i) => (
                        <Reveal key={s.n} delay={i * 90}>
                            <StatItem>
                                <div className="num">{s.n}</div>
                                <p className="text">{s.t}</p>
                                <p className="ref">{s.r}</p>
                            </StatItem>
                        </Reveal>
                    ))}
                </StatGrid>
            </Container>
        </Section>

        {/* ─── What you actually get ────────────────────────────────── */}
        <Section $tone="paper" $tight id="product">
            <Container>
                <SectionHead $center>
                    <Eyebrow>What you actually get</Eyebrow>
                    <H2>Not a recording. An archive.</H2>
                    <Lead $center>
                        Most tools capture audio and hand you a file. A Story does the work an editorial team
                        would do — and gives you something a family will actually open.
                    </Lead>
                </SectionHead>

                <Reveal>
                    <ProofSplit>
                            <FeatureList>
                                <Feature>
                                    <span className="icon"><IconMic /></span>
                                    <div>
                                        <h3>A guided interview, not a blank page</h3>
                                        <p>Adaptive follow-ups that go where the story goes. No question lists to write, no awkward silences to fill.</p>
                                    </div>
                                </Feature>
                                <Feature>
                                    <span className="icon"><IconArchive /></span>
                                    <div>
                                        <h3>Memory cards, organized by chapter</h3>
                                        <p>Every answer transcribed, titled and filed — childhood, work, love, loss, legacy — with the audio kept alongside it.</p>
                                    </div>
                                </Feature>
                                <Feature>
                                    <span className="icon"><IconSearch /></span>
                                    <div>
                                        <h3>Searchable, for decades</h3>
                                        <p>Find the story about the harmonica, or every memory that mentions Detroit, in a second. Voices don&rsquo;t get lost in a folder.</p>
                                    </div>
                                </Feature>
                                <Feature>
                                    <span className="icon"><IconUsers /></span>
                                    <div>
                                        <h3>Built for more than one contributor</h3>
                                        <p>A daughter in Seattle adds a photo. A grandson corrects a name. The archive gets richer instead of going stale.</p>
                                    </div>
                                </Feature>
                                <Feature>
                                    <span className="icon"><IconBook /></span>
                                    <div>
                                        <h3>A hardcover book, professionally laid out</h3>
                                        <p>Edited into a readable memoir, printed on acid-free paper, shipped to your door. The object people actually keep.</p>
                                    </div>
                                </Feature>
                                <Feature>
                                    <span className="icon"><IconExport /></span>
                                    <div>
                                        <h3>Yours to take, always</h3>
                                        <p>Full export of audio, transcripts and photos on request. No lock-in, no hostage-taking of your own history.</p>
                                    </div>
                                </Feature>
                            </FeatureList>
                            <ProofImage>
                                <img
                                    src={productImg}
                                    alt="The A Story app showing a memory card next to the printed hardcover keepsake book"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </ProofImage>
                    </ProofSplit>
                </Reveal>

                <Actions $center>
                    <Button to="/experience" $variant="outline">Walk through the full experience <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>

        {/* ─── Organizations ───────────────────────────────────────── */}
        <OrgBand id="organizations">
            <OrgInner>
                <div>
                    <Eyebrow $tone="gold">For organizations</Eyebrow>
                    <H2 style={{ marginBottom: 20 }}>
                        Your company&rsquo;s memory is walking out the door — one retirement at a time.
                    </H2>
                    <Lead $onDark>
                        Every organization has a story that exists nowhere but in the heads of the people who
                        lived it: why the company was founded, the decision that nearly ended it, how the
                        culture actually formed. When those people leave, it goes with them. A Story captures
                        it as a permanent, searchable archive — and a printed history you can hand to the next
                        generation of the business.
                    </Lead>
                    <Actions>
                        <Button to="/organizations" $variant="gold">Explore A Story for Organizations</Button>
                        <Button to="/signup?for=organization" $variant="onDark">Book a 30-minute demo</Button>
                    </Actions>
                </div>
                <OrgPoints>
                    <li><IconBuilding size={18} /><span><strong>Founder &amp; leadership interviews.</strong> The origin story, in the founder&rsquo;s own voice, before it becomes a paraphrase of a paraphrase.</span></li>
                    <li><IconUsers size={18} /><span><strong>Retiring-employee capture.</strong> Thirty years of judgment and context, kept instead of lost on a last day.</span></li>
                    <li><IconArchive size={18} /><span><strong>Anniversary &amp; milestone archives.</strong> A 25th or 100th year told by the people who were there, not by a brochure.</span></li>
                    <li><IconHeart size={18} /><span><strong>Culture that survives onboarding.</strong> New hires meet the company through the voices that built it.</span></li>
                </OrgPoints>
            </OrgInner>
        </OrgBand>

        {/* ─── Proof ────────────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="stories">
            <Container>
                <QuoteHead>
                    <div>
                        <Eyebrow>What founding partners say</Eyebrow>
                        <H2 style={{ marginBottom: 0 }}>Stories that almost weren&rsquo;t told.</H2>
                    </div>
                    <StatusFamily><StatusDot /> 10 founding families &middot; early access</StatusFamily>
                </QuoteHead>

                <QuoteGrid>
                    {[
                        {
                            q: 'I had no idea my dad was afraid of water until he told A Story about nearly drowning at age nine. He’s 84. I’ve known him my whole life.',
                            c: 'Rachel T. · Michigan',
                        },
                        {
                            q: 'We used it during Sunday dinner. Three generations, one question. My grandfather talked for two hours. My kids put their phones down and just listened.',
                            c: 'David L. · Michigan',
                        },
                        {
                            q: 'Mom passed away in March. The book arrived in April. I don’t have words for what it means to our family.',
                            c: 'The Kowalski family · Michigan',
                        },
                        {
                            q: 'A family member pulled me aside after we introduced A Story and said, “I didn’t know my father had been to Korea. I didn’t know he played harmonica.” That is what we are here for.',
                            c: 'Activities Director · senior living community',
                        },
                        {
                            q: 'Our founder is 71. We had a folder of press clippings and no idea why he actually started the company. Now we have four hours of him telling it, and a book on every desk.',
                            c: 'Operations lead · family-owned manufacturer',
                        },
                        {
                            q: 'I gave it to my mom for her birthday, half expecting a shrug. Instead she talked for two hours — about my dad, about how they met. I’d never heard that story.',
                            c: 'Teresa · gift for her mother',
                        },
                    ].map((t, i) => (
                        <Reveal key={t.c} delay={(i % 3) * 90}>
                            <QuoteCard style={{ height: '100%' }}>
                                <blockquote>“{t.q}”</blockquote>
                                <figcaption>{t.c}</figcaption>
                            </QuoteCard>
                        </Reveal>
                    ))}
                </QuoteGrid>

                <Divider />

                {/* ─── Comparison ───────────────────────────────────── */}
                <SectionHead $center>
                    <Eyebrow>Honestly compared</Eyebrow>
                    <H2>Others ask the questions. A Story keeps the answers.</H2>
                    <Lead $center>
                        Every product here is trying to solve a real problem. Here is exactly where we differ —
                        including where we don&rsquo;t.
                    </Lead>
                </SectionHead>

                <TableWrap tabIndex={0} role="region" aria-label="Feature comparison, scrolls horizontally">
                    <Table>
                        <caption className="sr-only">
                            How A Story compares with StoryWorth, Remento and Storii
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Capability</th>
                                <th scope="col" className="us">A Story</th>
                                <th scope="col">StoryWorth</th>
                                <th scope="col">Remento</th>
                                <th scope="col">Storii</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Guided AI interviewer with adaptive follow-ups', true, false, false, false],
                                ['Voice-first — nothing to type', true, false, true, true],
                                ['Searchable archive organized by life chapter', true, false, false, false],
                                ['Multiple family members contributing to one archive', true, false, true, false],
                                ['Printed hardcover keepsake', true, true, true, false],
                                ['Built for care communities and organizations', true, false, false, 'Partial'],
                                ['Full data export, no lock-in', true, 'Partial', 'Partial', 'Partial'],
                                ['Never used to train AI models', true, 'Unstated', 'Unstated', 'Unstated'],
                            ].map(([label, ...cells]) => (
                                <tr key={label as string}>
                                    <th scope="row">{label as string}</th>
                                    {cells.map((c, i) => (
                                        <td key={i} className={i === 0 ? 'us' : undefined}>
                                            {c === true ? (
                                                <Yes aria-label="Yes">&#10003; Yes</Yes>
                                            ) : c === false ? (
                                                <No aria-label="No">&mdash;</No>
                                            ) : (
                                                <No>{c as string}</No>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrap>
                <Note style={{ marginTop: 16 }}>
                    Comparison based on each product&rsquo;s publicly documented features as of 2026. If we have
                    something wrong, tell us and we will correct it.
                </Note>
            </Container>
        </Section>

        {/* ─── Trust ────────────────────────────────────────────────── */}
        <Section $tone="teal" $tight id="trust">
            <Container>
                <SectionHead $center>
                    <Eyebrow $tone="gold">Privacy &amp; trust</Eyebrow>
                    <H2>Their story belongs to them. Only them.</H2>
                    <Lead $center $onDark>
                        These are the most personal things a person owns. Four commitments, written the way
                        we would want them written if it were our family.
                    </Lead>
                </SectionHead>

                <PromiseGrid>
                    {[
                        { icon: <IconShield />, t: 'Theirs to share', d: 'The storyteller decides who sees what — family, no one, or the world. Nothing is public by default and access can be revoked in a tap.' },
                        { icon: <IconLock />, t: 'Encrypted end to end', d: 'Recordings, transcripts and photos are encrypted at rest and in transit. Nobody at A Story reads a story without explicit permission.' },
                        { icon: <IconNoTrain />, t: 'Never sold. Never trained on.', d: 'We do not sell data, do not train models on your stories, and do not share content with third parties. This is contractual, not aspirational.' },
                        { icon: <IconExport />, t: 'Portable, forever', d: 'Request a full export — audio, transcripts, photos — and receive everything within 48 hours. Leaving is always possible.' },
                    ].map((p, i) => (
                        <Reveal key={p.t} delay={i * 80}>
                            <PromiseCard>
                                <span className="icon">{p.icon}</span>
                                <h3>{p.t}</h3>
                                <p>{p.d}</p>
                            </PromiseCard>
                        </Reveal>
                    ))}
                </PromiseGrid>

                <Actions $center>
                    <Button to="/privacy" $variant="onDark">Read our privacy commitments <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>

        {/* ─── Pull quote ───────────────────────────────────────────── */}
        <PullQuote>
            <figure style={{ margin: 0 }}>
                <blockquote>
                    &ldquo;Every life holds a story worth keeping. Most are never told.&rdquo;
                </blockquote>
                <figcaption>The reason A Story exists</figcaption>
            </figure>
        </PullQuote>

        {/* ─── FAQ preview ──────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="faq">
            <Container>
                <SectionHead>
                    <Eyebrow>Questions people actually ask</Eyebrow>
                    <H2>The short answers.</H2>
                </SectionHead>
                <FaqList>
                    {TOP_FAQ.map((f) => (
                        <FaqItem key={f.q}>
                            <h3>{f.q}</h3>
                            <p>{f.a}</p>
                        </FaqItem>
                    ))}
                </FaqList>
                <Actions>
                    <Button to="/faq" $variant="outline">Read every question <IconArrow /></Button>
                    <Button to="/pricing" $variant="ghost">See pricing <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>
    </Page>
);

export default Home;
