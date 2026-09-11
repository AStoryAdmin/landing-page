import { lazy, Suspense, useState } from 'react';
import Seo from './ui/Seo';
import BuyBar from './ui/BuyBar';
import Reveal from './ui/Reveal';
import {
    Actions, Button, ButtonAnchor, Container, Eyebrow, H2, Italic, Lead, Note, Section,
} from './ui/primitives';
import {
    IconArchive, IconArrow, IconBook, IconClock, IconExport, IconGlobe, IconHeart,
    IconLock, IconMic, IconNoTrain, IconPhone, IconShield, IconTranscript, IconUsers, IconWaveform,
} from './ui/icons';
import { CONTACT } from '../lib/contact';
import { track } from '../lib/analytics';
import { PRICE } from '../lib/pricing';
import { CHAPTERS, CHAPTER_COUNT, QUESTION_COUNT, SENSITIVE_COUNT } from '../lib/product';
import { SCENARIOS } from '../lib/demoScripts';
import {
    ReelGrid, ReelItem, ReelHead, ReelSlot, ReelChapter, ReelTitle, ReelWatch,
} from './demoPhone.styles';
import { faqSchema, organizationSchema, productSchema } from '../lib/seo';
import productImg from './../assets/astoryProduct.webp';

/*
 * The demo is the most persuasive thing on the site and it used to sit one
 * click away on /experience, where almost nobody found it. It is lazy so that
 * the home page — the only route in the initial bundle — does not grow by the
 * weight of the whole interactive phone.
 */
const DemoPhone = lazy(() => import('./demoPhone'));
import {
    AlsoBand, AlsoCard, AlsoGrid, DemoFallback, Divider, EarlyProof, FaqItem, FaqList,
    ArchiveBody, ArchiveFeed, ArchiveFoot, ArchiveHead, ArchivePanel, ArchiveStats,
    ChapterPip, ChapterRail, ClipCard, ClipNote, ClipPanel, ClipWave, ClipWords, RailLabel, RailNote,
    DemoCoda, EasyCard, EasyGrid, EasyNote, Feature, FeatureList, FeedItem, FeedLabel, FeedTier,
    HandoverSteps,
    HandoverSplit, Hero, HeroActions, HeroBadge, HeroCopy, HeroInner, HeroSub, HeroTitle, HeroTrust,
    MatterItem, MattersCoda, MattersGrid, MattersLead,
    No, Objection, ObjectionGrid, Page, PriceStrip, ProofImage, ProofSplit, PromiseCard, PromiseGrid, PullQuote,
    QuoteCard, QuoteGrid, RoleCard, RolesCoda, RolesGrid, SectionHead, Step, StepGrid, StepNumber, StepText,
    StepTitle, Table, TableWrap, Tag, TagRow, Yes,
    AccessList,
    AccessRow,
    AboutSomeoneElse,
} from './home.styles';

/** The six chapters Joan's archive has something in after six weeks. */
const JOAN_CHAPTERS = [
    'Where we come from', 'Childhood', 'Love & family',
    'The world we lived through', 'When everything changed', 'From the family',
];

/**
 * The shape of the example voice highlight, as percentages of the track's
 * height. Hand-set rather than random so it stays put between renders — a
 * waveform that reshuffles reads as a thing that is playing, and nothing here
 * is playing.
 */
const CLIP_WAVE = [
    18, 34, 52, 41, 63, 78, 55, 44, 30, 22, 14, 9, 7, 6, 9, 16, 28, 47, 66, 81,
    72, 58, 69, 84, 61, 43, 52, 38, 25, 17, 12, 8, 6, 5, 8, 13, 24, 39, 57, 71,
    88, 74, 62, 49, 35, 27, 19, 13, 9, 6,
];

/** Occasions people actually buy for, each pre-filling the enquiry. */
const OCCASIONS = [
    'Christmas', "Mother's Day", "Father's Day", 'A milestone birthday',
    'An anniversary', 'A retirement', 'A new grandchild', 'Just because',
];

/**
 * Testimonials.
 *
 * `verified` gates rendering: only quotes confirmed to come from a real
 * customer who agreed to be quoted appear on the site. Everything here is
 * currently false because the set was a mix of real and aspirational and
 * nobody has yet said which is which — flip the flag on the genuine ones and
 * they return to the page immediately. Do not flip one to publish a quote you
 * cannot point at a person for.
 */
const TESTIMONIALS = [
    {
        q: 'I gave it to my mom for her birthday, half expecting a shrug. Instead she talked for two hours — about my dad, about how they met. I had never heard that story.',
        c: 'Teresa · gift for her mother',
        verified: false,
    },
    {
        q: 'I had no idea my dad was afraid of water until he told A Story about nearly drowning at age nine. He is 84. I have known him my whole life.',
        c: 'Rachel T. · Michigan',
        verified: false,
    },
    {
        q: 'We set it up on Christmas Eve and told him at the table. By New Year my grandfather had done nine sessions and my kids were fighting over who got to read the next one.',
        c: 'David L. · Michigan',
        verified: false,
    },
    {
        q: 'Four of us went in on it together. It cost each of us less than the candle I would otherwise have bought her, and she cried when the first call came through.',
        c: 'The Ellery family · three siblings',
        verified: false,
    },
    {
        q: 'Mom passed away in March. The book arrived in April. I do not have words for what it means to our family.',
        c: 'The Kowalski family · Michigan',
        verified: false,
    },
    {
        q: 'My sister lives in Perth and I am in Toronto. We have both been adding to Dad’s archive for months. It is the most time we have spent together in years.',
        c: 'Priya N. · gift for her father',
        verified: false,
    },
];

const VERIFIED_QUOTES = TESTIMONIALS.filter((t) => t.verified);

const TOP_FAQ = [
    {
        q: 'What do I actually give them on the day?',
        a: 'An archive already set up in their name, the app already on their phone or tablet, and a first call already booked for whenever suits. You do that part; it takes a couple of minutes and you can do all of it without them in the room.',
    },
    {
        q: 'My dad is hopeless with technology. Will this work?',
        a: 'Yes, because he never has to operate anything. A Story calls him, and he answers the phone and talks — the way he would to anyone else. The app is set up once, and you can do that part for him.',
    },
    {
        q: 'Do I have to organize it after I buy it?',
        a: 'No — that is the point. A Story does the asking, the transcribing, the organizing and the layout. You send one link and let it run.',
    },
    {
        q: 'What are we actually paying for?',
        a: 'A Story doing the asking — calling, listening, following up. The app itself is yours to keep either way: switch a plan off and the archive stays open, everyone keeps their access, and the family goes on writing and adding photos without limit, free, for as long as you like. Switch it back on whenever there is more you want drawn out of somebody.',
    },
    {
        q: 'Can the rest of the family join in?',
        a: 'That is how it is designed. Everyone you share the link with can add photos, correct a name, or record their own memory. A sister in Seattle and a grandson in Chicago end up in the same archive.',
    },
    {
        q: 'What if they only manage twenty minutes at a time?',
        a: 'Twenty minutes is a real session. The archive remembers exactly where the conversation stopped and picks it up weeks later without repeating itself.',
    },
    {
        q: 'Is a memory card all I get to read?',
        a: 'No. The card is the summary. Open it and the full transcript is underneath, word for word, and the moments worth hearing are kept as audio in their own voice. The book is the edited version of all of it.',
    },
    {
        q: 'Who ends up owning the stories?',
        a: 'The person telling them. We never sell data, never train AI models on it, and never share it. A full export — audio, transcripts, photos — is available at any time.',
    },
];

const Home = () => {
    /* Which of the three demo calls is currently running, if any. The reel
       needs one owner of that fact: pressing play on the second phone has to
       stop the first, and nothing inside a phone can know about its siblings. */
    const [playing, setPlaying] = useState<string | null>(null);

    return (
    <Page>
        <Seo
            title="A Story — the life-story app you keep: journal, autobiography, memoir"
            description="A journal, an autobiography and a memoir at once — and none of them ever finishes. A Story calls, asks about a life, and files every answer onto a timeline the whole family keeps. Free to keep forever; print a book whenever a chapter is worth holding."
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
                    <HeroBadge>A Story &middot; your living memories</HeroBadge>
                    <HeroTitle>
                        We call your parents
                        <br />
                        <em>and ask about<br />their life.</em>
                    </HeroTitle>
                    <HeroSub>
                        Then we turn what they say into a private family archive &mdash; their voice, the
                        full transcript, every story filed where it belongs. You buy it once and send one
                        link. They answer the phone and talk, for as long as they feel like talking. The
                        whole family keeps it, for good.
                    </HeroSub>
                    <HeroActions>
                        <ButtonAnchor href={CONTACT.gift} $variant="primary">Gift a story</ButtonAnchor>
                        <Button to="/experience" $variant="onDark">See what they receive</Button>
                    </HeroActions>
                    <HeroTrust>
                        <li><IconClock size={15} /> Ready in minutes</li>
                        <li><IconPhone size={15} /> They just answer the phone</li>
                        <li><IconUsers size={15} /> Everyone joins in</li>
                        <li><IconBook size={15} /> Yours forever after</li>
                    </HeroTrust>
                </HeroCopy>
            </HeroInner>
        </Hero>

        {/* ─── See it work, before we ask for anything ───────────────── */}
        <Section $tone="paper" $tight id="demo">
            <Container>
                <SectionHead $center>
                    <Eyebrow>Watch it happen</Eyebrow>
                    <H2>Three calls. <Italic>Nobody changes the subject.</Italic></H2>
                    <Lead $center>
                        Three real interviews, and none of them starts until you open it. In each one
                        the same thing happens: somebody lets something slip on their way to answering
                        a different question &mdash; eight words, three words, half a sentence &mdash;
                        and A Story drops its own question and goes after what they let slip. That is
                        the entire product, and it is the one thing a list of questions can never do.
                    </Lead>
                    <Note>
                        As each call runs, the band at the top of the phone names the move being made:
                        <em> follow the aside, not the answer</em>; <em>take the no at face value</em>;
                        <em> come back when you said you would</em>. The interview climbs a rung only
                        once the one below it has been answered &mdash; warm-up, scene, portrait,
                        stakes, reckoning &mdash; which is why the last question in every call lands,
                        and would have been unaskable at the start. {SENSITIVE_COUNT} of the{' '}
                        {QUESTION_COUNT} questions are marked sensitive and arrive with a line
                        offering to leave them for another day. You will see two of those, and in the
                        middle call you will see somebody take the offer.
                    </Note>
                </SectionHead>

                <ReelGrid>
                    {SCENARIOS.map((scenario) => (
                        <ReelItem key={scenario.id}>
                            <ReelHead>
                                <ReelChapter>{scenario.chapter}</ReelChapter>
                                <ReelTitle>{scenario.label}</ReelTitle>
                                <ReelWatch>{scenario.watch}</ReelWatch>
                            </ReelHead>
                            <Suspense fallback={<DemoFallback aria-hidden="true" />}>
                                <ReelSlot
                                    onClickCapture={() =>
                                        track('demo_played', { page: 'home', scenario: scenario.id })
                                    }
                                >
                                    <DemoPhone
                                        scenario={scenario}
                                        /* Whoever presses play wins; the other two
                                           stop where they are rather than three
                                           conversations talking over each other. */
                                        stopped={playing !== null && playing !== scenario.id}
                                        onStart={() => setPlaying(scenario.id)}
                                        onFinish={() =>
                                            setPlaying((p) => (p === scenario.id ? null : p))
                                        }
                                    />
                                </ReelSlot>
                            </Suspense>
                        </ReelItem>
                    ))}
                </ReelGrid>

                <DemoCoda>
                    <p>
                        Every question in all three came out of the app&rsquo;s own bank &mdash;{' '}
                        {QUESTION_COUNT} of them across {CHAPTER_COUNT} chapters, none written for a
                        landing page. At the end of each call you get what a family gets: a summary to
                        read in a minute, the transcript underneath it word for word, and the part
                        worth hearing in their own voice.
                    </p>
                    <Actions>
                        <Button to="/experience" $variant="outline">
                            See everything they receive <IconArrow />
                        </Button>
                    </Actions>
                </DemoCoda>
            </Container>
        </Section>

        {/* ─── The same call, six weeks later ───────────────────────── */}
        {/*
            The page used to go from the demo into a list of capabilities.
            This is the same list with a name on it: Joan's archive, six weeks
            after the third demo call, with the voice highlight, the two people
            who added to it and the state of the book. Specific beats abstract,
            and everybody in it is invented — which the footnote says out loud,
            because a page that shows an archive is a page that could be
            mistaken for showing a customer's.
        */}
        <Section $tone="ivory" $tight id="kept">
            <Container>
                <SectionHead $center>
                    <Eyebrow>An example archive</Eyebrow>
                    <H2>Six weeks after that call, <Italic>this is what her family has.</Italic></H2>
                    <Lead $center>
                        One conversation is a memory. What makes it an archive is everything that
                        arrives afterwards &mdash; the son who fills in the dates, the niece who has
                        been keeping letters since 1998, and the forty-seven seconds nobody in the
                        family can listen to without stopping what they are doing.
                    </Lead>
                </SectionHead>

                <Reveal>
                    <ArchivePanel>
                        <ArchiveHead>
                            <div>
                                <p className="who">Joan Merrick</p>
                                <p className="sub">Kept by her son Paul &middot; 7 people invited &middot; started six weeks ago</p>
                            </div>
                            <ArchiveStats>
                                <div><dt>14</dt><dd>Memories</dd></div>
                                <div><dt>6</dt><dd>Chapters begun</dd></div>
                                <div><dt>23</dt><dd>Photographs</dd></div>
                                <div><dt>4</dt><dd>Voices</dd></div>
                            </ArchiveStats>
                        </ArchiveHead>

                        <ArchiveBody>
                            <ArchiveFeed>
                                <FeedLabel>What arrived this month</FeedLabel>

                                <FeedItem>
                                    <span className="icon"><IconPhone size={15} /></span>
                                    <div>
                                        <p className="who">Joan<FeedTier>The storyteller</FeedTier></p>
                                        <p className="what">Answered nine questions across three calls. The longest ran fifty-one minutes; she had told Paul she would manage five.</p>
                                        <p className="when">Tuesdays, 10am &mdash; the hour she chose</p>
                                    </div>
                                </FeedItem>

                                <FeedItem>
                                    <span className="icon"><IconTranscript size={15} /></span>
                                    <div>
                                        <p className="who">Paul, her son<FeedTier>Invited &middot; can edit</FeedTier></p>
                                        <p className="what">Added Susan&rsquo;s two dates, and photographed the back of a picture so the handwriting is in the book rather than described in it.</p>
                                        <p className="when">Added four days ago</p>
                                    </div>
                                </FeedItem>

                                <FeedItem>
                                    <span className="icon"><IconArchive size={15} /></span>
                                    <div>
                                        <p className="who">Christine, her niece<FeedTier>Contribute link &middot; no account</FeedTier></p>
                                        <p className="what">Sent three of Ray&rsquo;s letters from Aden, scanned on a library photocopier. She had been keeping them since 1998 and had never found the right moment to mention it.</p>
                                        <p className="said">&ldquo;I always thought I was the only one who still had these. I didn&rsquo;t know who to give them to.&rdquo;</p>
                                        <p className="when">Waiting for Joan to approve &middot; nothing appears until she does</p>
                                    </div>
                                </FeedItem>

                                <FeedItem>
                                    <span className="icon"><IconUsers size={15} /></span>
                                    <div>
                                        <p className="who">Amy, her granddaughter, 19<FeedTier>Invited &middot; can edit</FeedTier></p>
                                        <p className="what">Recorded her own two minutes on the chapter called <em>From the family</em> &mdash; the same kitchen, thirty years later, from the person who was four feet lower down.</p>
                                        <p className="said">&ldquo;Nan says Grandad was quiet. He wasn&rsquo;t quiet with me. He used to do the voices.&rdquo;</p>
                                        <p className="when">Added last Sunday</p>
                                    </div>
                                </FeedItem>

                                <FeedItem>
                                    <span className="icon"><IconBook size={15} /></span>
                                    <div>
                                        <p className="who">The book<FeedTier>Optional, always</FeedTier></p>
                                        <p className="what">Forty-one pages ready to print whenever they want one &mdash; and the archive carries on filling either way. Nothing about making a book means the story is finished.</p>
                                        <p className="when">Not ordered. No hurry.</p>
                                    </div>
                                </FeedItem>
                            </ArchiveFeed>

                            <ClipPanel>
                                <FeedLabel>The part you would not read</FeedLabel>
                                <ClipCard>
                                    <p className="head">
                                        <IconWaveform size={14} /> In Joan&rsquo;s voice
                                        <span className="dur">0:47</span>
                                    </p>
                                    <ClipWave aria-hidden="true">
                                        {CLIP_WAVE.map((h, i) => (
                                            <i key={i} style={{ height: `${h}%` }} />
                                        ))}
                                    </ClipWave>
                                    <ClipWords>
                                        &ldquo;He&rsquo;d been writing it down where I wouldn&rsquo;t see. All those years.
                                        <span className="beat">— four seconds of nothing —</span>
                                        Because he couldn&rsquo;t get it out of his mouth. He couldn&rsquo;t say mine
                                        either. I&rsquo;d had that wrong for fifty-one years as well.&rdquo;
                                    </ClipWords>
                                    <ClipNote>
                                        Then she laughs. Once, and not happily, and that laugh is the whole
                                        marriage. It is why a transcript is not enough on its own: her son has
                                        read these words perhaps twice, and played the eight seconds they sit
                                        in more times than he would admit to.
                                    </ClipNote>
                                </ClipCard>

                                <RailLabel>Where she has got to</RailLabel>
                                <ChapterRail>
                                    {CHAPTERS.map((c) => (
                                        <ChapterPip key={c.name} $on={JOAN_CHAPTERS.includes(c.name)}>
                                            {c.name}
                                        </ChapterPip>
                                    ))}
                                </ChapterRail>
                                <RailNote>
                                    Six of eleven, in six weeks, and nobody is behind. There is no
                                    finish line here &mdash; a chapter with nothing in it is a
                                    conversation that has not happened yet, not a gap in a form.
                                </RailNote>
                            </ClipPanel>
                        </ArchiveBody>

                        <ArchiveFoot>
                            An illustration of a real archive&rsquo;s shape and contents. Joan, Ray, Paul,
                            Christine and Amy are invented, and so is every word quoted above &mdash; we
                            would rather show you an honest example than a real family&rsquo;s worst year.
                        </ArchiveFoot>
                    </ArchivePanel>
                </Reveal>
            </Container>
        </Section>

        {/* ─── For the person who "isn't good with these things" ─────── */}
        {/*
            The commonest reason a gift like this never gets used is that the
            person receiving it rules themselves out before trying. Everything
            here is deliberately concrete, and honest about the one install:
            the app goes on once, somebody else can do it, and from then on the
            phone rings by itself.
        */}
        <Section $tone="paper" $tight id="easy">
            <Container>
                <SectionHead $center>
                    <Eyebrow>Built for the person, not the phone</Eyebrow>
                    <H2>&ldquo;She&rsquo;s not good with these things.&rdquo; <Italic>Good. Neither is this.</Italic></H2>
                    <Lead $center>
                        There is no dashboard, no typing, no password to remember and nothing to keep
                        up with. The app is installed once &mdash; by you, if you like, before you even
                        tell them &mdash; and after that A Story rings them through it at the hour they
                        chose. They press the green button, the way they press it for anybody.
                    </Lead>
                </SectionHead>

                <EasyGrid>
                    <EasyCard>
                        <p className="num">1</p>
                        <h3>One install, done by somebody else</h3>
                        <p>
                            A couple of minutes on their phone or tablet. You can do the whole thing
                            while they are in the next room, and they never see a setup screen.
                        </p>
                    </EasyCard>
                    <EasyCard>
                        <p className="num">2</p>
                        <h3>Then it calls them</h3>
                        <p>
                            At the hour they picked, their phone rings and A Story is on the other end.
                            Big buttons, large type, a warm voice with no hurry in it. Answer or don&rsquo;t
                            &mdash; nothing is broken either way, and it will ask again tomorrow.
                        </p>
                    </EasyCard>
                    <EasyCard>
                        <p className="num">3</p>
                        <h3>Talking is the whole job</h3>
                        <p>
                            No app to open, nothing to save, nothing to file. Twenty minutes is a real
                            session, and the next call picks up exactly where the last one stopped
                            without repeating a single question.
                        </p>
                    </EasyCard>
                </EasyGrid>

                <EasyNote>
                    <p>
                        <strong>And if they do get stuck, they ring us, not you.</strong> The point of a
                        gift is that it is not a project for the person who gave it &mdash; so support
                        for the storyteller comes to us directly, by phone, from a person. You never
                        become your parent&rsquo;s tech support.
                    </p>
                </EasyNote>
            </Container>
        </Section>

        {/* ─── How gifting works ────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="how">
            <Container>
                <SectionHead $center>
                    <Eyebrow>How it works</Eyebrow>
                    <H2>You do step one. <Italic>That&rsquo;s the whole job.</Italic></H2>
                    <Lead $center>
                        Most meaningful gifts turn into a project for the person who bought them. This one
                        does not.
                    </Lead>
                </SectionHead>

                <Reveal>
                    <StepGrid>
                        <Step>
                            <p className="who">You</p>
                            <StepNumber>1</StepNumber>
                            <StepTitle>Buy it</StepTitle>
                            <StepText>
                                Two minutes, and you are done. Start the archive in their name, note
                                their birthday, and pick the hour of day A Story should ring.
                            </StepText>
                        </Step>
                        <Step>
                            <p className="who">You</p>
                            <StepNumber>2</StepNumber>
                            <StepTitle>Send the link</StepTitle>
                            <StepText>
                                One link, to whoever should be in on it &mdash; your brother, the cousins,
                                the grandchildren. Inviting fifteen costs the same as inviting nobody.
                            </StepText>
                        </Step>
                        <Step>
                            <p className="who">Them</p>
                            <StepNumber>3</StepNumber>
                            <StepTitle>They answer the phone</StepTitle>
                            <StepText>
                                The link sets A Story up once &mdash; you can do that part for them. After
                                that the phone rings, and a warm voice asks about childhood, work, love, the
                                things they are proud of. Fifteen minutes at a time is plenty.
                            </StepText>
                        </Step>
                        <Step>
                            <p className="who">Everyone</p>
                            <StepNumber>4</StepNumber>
                            <StepTitle>It becomes an archive</StepTitle>
                            <StepText>
                                Their stories come back as a private archive the whole family can read,
                                search and add to &mdash; and any chapter of it can be printed as a
                                hardcover memoir whenever you want one.
                            </StepText>
                        </Step>
                    </StepGrid>
                </Reveal>

                <PriceStrip>
                    <div>
                        <p className="amount">Free</p>
                    </div>
                    <p className="what">
                        <strong>Three days of everything, no card &mdash; then free for as long as you
                        like.</strong> Three questions a day, unlimited writing, and the whole family
                        invited at no charge. Guided calls start at {PRICE.headline} {PRICE.headlineNote},
                        and your recordings stay yours even if you stop.
                    </p>
                    <ButtonAnchor href={CONTACT.gift} $variant="primary">Start free</ButtonAnchor>
                </PriceStrip>

                <Actions $center>
                    <Button to="/pricing" $variant="ghost">See exactly what is included <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>

        {/* ─── What you hand over ───────────────────────────────────── */}
        <Section $tone="paper" $tight id="gift">
            <Container>
                <HandoverSplit>
                    <div>
                        <Eyebrow>What you hand over</Eyebrow>
                        <H2>Not a login. <Italic>The first conversation.</Italic></H2>
                        <Lead>
                            You do the setting up &mdash; the archive, the app on their phone or tablet,
                            the time of day A Story should ring. What they get handed is a thing that
                            already works: at the hour you chose, their phone rings, they answer it, and
                            somebody asks them about 1962.
                        </Lead>
                        <Note>
                            It takes a couple of minutes and you can do all of it without them in the
                            room. Nothing has to happen on any particular day &mdash; the first call can
                            be that evening or in February, and moving it is one tap. If they get stuck
                            we help them directly, so you never become their tech support.
                        </Note>
                        <Actions>
                            <ButtonAnchor href={CONTACT.gift} $variant="primary">Gift a story</ButtonAnchor>
                        </Actions>
                    </div>

                    <Reveal shift={26}>
                        <HandoverSteps>
                            <li>
                                <b>You</b>
                                <span>Set the archive up and choose the hour. Two minutes, once.</span>
                            </li>
                            <li>
                                <b>Them</b>
                                <span>Answer the phone and talk. That is the entire ask, every time.</span>
                            </li>
                            <li>
                                <b>Everyone else</b>
                                <span>
                                    Read it, add the photographs, correct a name. Inviting fifteen
                                    cousins costs the same as inviting nobody.
                                </span>
                            </li>
                        </HandoverSteps>
                    </Reveal>
                </HandoverSplit>
            </Container>
        </Section>

        {/* ─── Objections ───────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="doubts">
            <Container>
                <SectionHead $center>
                    <Eyebrow>Before you talk yourself out of it</Eyebrow>
                    <H2>Every reason not to, answered.</H2>
                </SectionHead>

                <ObjectionGrid>
                    {[
                        {
                            d: '“They already have everything.”',
                            a: 'They do not have this. Nobody has ever sat down and asked them the whole thing — and no one else in the family is going to buy it for them this year.',
                        },
                        {
                            d: '“My dad hates gadgets.”',
                            a: 'Then he never has to touch one. A Story calls him; he answers and talks. There is an app, but it is set up once — by you, or by whoever is closest — and after that nothing is asked of him but picking up.',
                        },
                        {
                            d: '“We are spread across the country.”',
                            a: 'That is exactly who this is for. He records at his kitchen table; you read it that evening; your sister adds the photo she has been meaning to scan for a decade.',
                        },
                        {
                            d: '“I do not have time to run a project.”',
                            a: 'You send a link. A Story does the asking, transcribing, organizing and layout, and tells you when there is something new to read. There is nothing to chase.',
                        },
                        {
                            d: '“What if they never use it?”',
                            a: 'Most people who say they have nothing to tell talk for two hours. If it truly is not for them, tell us and we will make it right — we would rather that than a gift gathering dust.',
                        },
                        {
                            d: '“It feels like a strange thing to give.”',
                            a: 'It reads as the opposite. Being asked about your own life, by people who want to know, is not morbid — it is the most flattering thing anyone can do for you.',
                        },
                    ].map((o, i) => (
                        <Reveal key={o.d} delay={(i % 3) * 90}>
                            <Objection>
                                <p className="doubt">{o.d}</p>
                                <p>{o.a}</p>
                            </Objection>
                        </Reveal>
                    ))}
                </ObjectionGrid>
            </Container>
        </Section>

        {/* ─── What everyone gets ───────────────────────────────────── */}
        <Section $tone="paper" $tight id="product">
            <Container>
                <SectionHead $center>
                    <Eyebrow>What everyone gets</Eyebrow>
                    <H2>One gift, opened by the whole family.</H2>
                    <Lead $center>
                        You buy it for one person. What comes back belongs to everybody &mdash; and it keeps
                        arriving long after the day itself.
                    </Lead>
                </SectionHead>

                <Reveal>
                    <ProofSplit>
                        <FeatureList>
                            <Feature>
                                <span className="icon"><IconMic /></span>
                                <div>
                                    <h3>A card you can read in a minute</h3>
                                    <p>Every conversation lands as a memory card &mdash; the summary, titled and dated and filed where it belongs. That is the layer you skim.</p>
                                </div>
                            </Feature>
                            <Feature>
                                <span className="icon"><IconTranscript /></span>
                                <div>
                                    <h3>The full transcript underneath</h3>
                                    <p>Open any card and the whole conversation is there, word for word &mdash; the tangents, the second thoughts, the names of people the summary had no room for.</p>
                                </div>
                            </Feature>
                            <Feature>
                                <span className="icon"><IconWaveform /></span>
                                <div>
                                    <h3>Voice highlights, kept as audio</h3>
                                    <p>The moments worth hearing rather than reading stay as sound: the laugh, the pause before the hard part, the way only they say a name.</p>
                                </div>
                            </Feature>
                            <Feature>
                                <span className="icon"><IconArchive /></span>
                                <div>
                                    <h3>A private family archive</h3>
                                    <p>Every answer filed into one of eleven chapters — where the family came from, the years that bent everything, what the grandchildren remember — searchable in a second, ten years from now.</p>
                                </div>
                            </Feature>
                            <Feature>
                                <span className="icon"><IconUsers /></span>
                                <div>
                                    <h3>Everyone who was in the room</h3>
                                    <p>The same afternoon looks different to the person who lived it and the child who was there. Siblings, cousins and grandchildren add their own version of it, on the same moment.</p>
                                </div>
                            </Feature>
                            <Feature>
                                <span className="icon"><IconBook /></span>
                                <div>
                                    <h3>A hardcover book, when you want one</h3>
                                    <p>Any chapter can become something you hold: edited, laid out like a memoir, photos beside the stories they belong to. Priced separately on purpose, so printing one never means the story is over.</p>
                                </div>
                            </Feature>
                            <Feature>
                                <span className="icon"><IconGlobe /></span>
                                <div>
                                    <h3>It never assumes you are finished</h3>
                                    <p>The story does not stop when the book is made, because neither do they. Today goes on the same timeline as 1962.</p>
                                </div>
                            </Feature>
                            <Feature>
                                <span className="icon"><IconExport /></span>
                                <div>
                                    <h3>Yours to keep, always</h3>
                                    <p>Full export of audio, transcripts and photos whenever you ask. No lock-in, no hostage-taking of your own family history.</p>
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

        {/* ─── Who else can write in it ─────────────────────────────── */}
        <Section $tone="ivory" $tight id="together">
            <Container>
                <SectionHead>
                    <Eyebrow>Nobody does this alone</Eyebrow>
                    <H2>You are not the only one who can write in it.</H2>
                    <Lead>
                        An archive with one author is a diary, and it stops the day that author does.
                        This one has three kinds of people in it, and they are allowed to do different
                        things &mdash; which is the part that makes handing it round safe.
                    </Lead>
                </SectionHead>

                <Reveal>
                    <AccessList>
                        <AccessRow>
                            <span className="who">
                                <span className="name">The storyteller</span>
                                <span className="can">Owns it</span>
                            </span>
                            <p>
                                Whoever the story belongs to decides who is invited, what stays private,
                                and what is shared. Nothing leaves the archive without them.
                            </p>
                        </AccessRow>
                        <AccessRow>
                            <span className="who">
                                <span className="name">Invited family</span>
                                <span className="can">Reads and edits</span>
                            </span>
                            <p>
                                A daughter, a brother, a grandson &mdash; invited properly, they can go
                                into the archive and work on it. Fix the year. Correct a spelling of a
                                village nobody has written down in fifty years. Add the afternoon from
                                where they were sitting. It is one shared story, not a broadcast.
                            </p>
                        </AccessRow>
                        <AccessRow>
                            <span className="who">
                                <span className="name">Everyone else</span>
                                <span className="can">Sends things in</span>
                            </span>
                            <p>
                                Send a link and a cousin who will never download an app can still add a
                                photograph or the version of the story they grew up hearing. It waits for
                                approval before it appears &mdash; so the archive stays open without ever
                                being open to being quietly rewritten.
                            </p>
                        </AccessRow>
                    </AccessList>

                    <AboutSomeoneElse>
                        <h3>And it does not have to be your own life.</h3>
                        <div className="body">
                        <p>
                            You can start a story about somebody else and write it yourself &mdash; your
                            mother, your brother, the friend you have known since you were nine. You do
                            not need their phone, their email or their permission to remember them.
                        </p>
                        <p>
                            <em>Including someone who has already died.</em> This is the part people
                            assume is closed to them, and it is not. Everything you carry about a person
                            who is gone is still recoverable while you are here to carry it: what their
                            kitchen smelled like, the thing they always said, the argument nobody has
                            repeated since. A Story will ask you about them the same way it would have
                            asked them, and file it under their name.
                        </p>
                        <p>
                            That archive keeps working afterwards, too. Invite your sister and she can
                            manage it with you; the family keeps adding to it long after both of you have
                            stopped being the only ones who remember. It is late for them. It is not too
                            late for what you know about them.
                        </p>
                        </div>
                    </AboutSomeoneElse>
                </Reveal>
            </Container>
        </Section>

        {/* ─── Occasions ────────────────────────────────────────────── */}
        <Section $tone="gold" $tight id="occasions">
            <Container $narrow>
                <SectionHead $center>
                    <Eyebrow>When people give it</Eyebrow>
                    <H2>The gift for the year they turn eighty.</H2>
                    <Lead $center>
                        And for the Christmas everybody is finally in the same house. Tell us the occasion
                        and we will make sure it arrives in time.
                    </Lead>
                </SectionHead>
                <TagRow>
                    {OCCASIONS.map((o) => (
                        <Tag key={o} href={CONTACT.giftFor(o)}>{o}</Tag>
                    ))}
                </TagRow>
            </Container>
        </Section>

        {/* ─── Why this matters ─────────────────────────────────────── */}
        <Section $tone="deep" $tight id="why">
            <Container>
                <SectionHead>
                    <Eyebrow $tone="gold">Why this matters</Eyebrow>
                    <H2>Most of a life goes undocumented.</H2>
                </SectionHead>
                <MattersLead>
                    Not the milestones &mdash; those get photographed. It is the everyday: the story told at
                    dinner and never written down, the reason everyone was laughing in that photo, the small
                    ordinary day that turns out to matter later. Those slip away quietly.{' '}
                    <em>A Story exists to catch them.</em>
                </MattersLead>

                <MattersGrid>
                    {[
                        {
                            t: 'Not a memoir to finish',
                            d: 'Most tools for this look backward — they help you preserve a life already lived, before it is too late. A Story captures the life being lived now as well as the one behind it, and never assumes the story is over. Today is part of it too.',
                        },
                        {
                            t: 'It works through conversation',
                            d: 'A Story asks, listens and remembers — following up the way someone who knows you would, connecting what you share to the people, places and photos it belongs with, and laying it out on a timeline that keeps growing as your life does.',
                        },
                        {
                            t: 'Not one narrator',
                            d: 'A life is not a solo account. The same afternoon looks different to the person who lived it, the child who was there, and the one who only heard about it for years. A Story holds all of those voices on the same moment.',
                        },
                    ].map((m, i) => (
                        <Reveal key={m.t} delay={i * 90}>
                            <MatterItem>
                                <h3>{m.t}</h3>
                                <p>{m.d}</p>
                            </MatterItem>
                        </Reveal>
                    ))}
                </MattersGrid>

                <MattersCoda>
                    That is what makes it a documentary instead of a diary.
                </MattersCoda>

                <Actions>
                    <Button to="/family" $variant="onDark">Read the whole case <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>

        {/* ─── What it actually is ──────────────────────────────────── */}
        <Section $tone="paper" $tight id="what-it-is">
            <Container>
                <SectionHead>
                    <Eyebrow>What it actually is</Eyebrow>
                    <H2>A journal, an autobiography and a memoir &mdash; all three, permanently.</H2>
                    <Lead>
                        Every product in this category is one of the three, and each of them ends. A journal
                        you abandon in March. An autobiography you never sit down to write. A memoir that is
                        finished the day it is printed. A Story is all three at once, and none of them ever
                        closes, because you have not finished either.
                    </Lead>
                </SectionHead>

                <RolesGrid>
                    {[
                        {
                            when: 'Today',
                            t: 'A journal you actually keep',
                            d: 'Write down what happened this week — the argument at dinner, the thing your daughter said, the ordinary Tuesday. Unlimited and free on every plan, including no plan at all, because the writing is the part that should never be metered.',
                            never: 'It does not need you every day to stay worth having.',
                        },
                        {
                            when: 'As you go',
                            t: 'An autobiography assembling itself',
                            d: 'Every entry and every answered question lands on the same timeline, dated, filed into its chapter, and connected to the people and places already there. You are not sitting down to write a book. You are living, and the book keeps up.',
                            never: 'Nobody has to face a blank first page.',
                        },
                        {
                            when: 'Whenever',
                            t: 'A memoir you can hold',
                            d: 'When a chapter is worth holding, print it — edited, laid out, photographs beside the stories they belong to. Then carry on, and print another volume in five years from the same archive.',
                            never: 'Printing it closes nothing.',
                        },
                    ].map((r, i) => (
                        <Reveal key={r.t} delay={i * 90}>
                            <RoleCard>
                                <p className="when">{r.when}</p>
                                <h3>{r.t}</h3>
                                <p>{r.d}</p>
                                <span className="never">{r.never}</span>
                            </RoleCard>
                        </Reveal>
                    ))}
                </RolesGrid>

                <RolesCoda>
                    A Story is not a memoir to finish. It is a story to keep and carry on &mdash; and the
                    app stays yours for as long as there is more of it.
                </RolesCoda>
            </Container>
        </Section>

        {/* ─── Proof ────────────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="stories">
            <Container>
                <SectionHead>
                    <Eyebrow>{VERIFIED_QUOTES.length > 0 ? 'From people who gave it' : 'What we can prove'}</Eyebrow>
                    <H2 style={{ marginBottom: 0 }}>
                        {VERIFIED_QUOTES.length > 0
                            ? 'Stories that almost weren’t told.'
                            : 'No testimonials we cannot stand behind.'}
                    </H2>
                </SectionHead>

                {VERIFIED_QUOTES.length > 0 ? (
                    <QuoteGrid>
                        {VERIFIED_QUOTES.map((t, i) => (
                            <Reveal key={t.c} delay={(i % 3) * 90}>
                                <QuoteCard>
                                    <blockquote>&ldquo;{t.q}&rdquo;</blockquote>
                                    <figcaption>{t.c}</figcaption>
                                </QuoteCard>
                            </Reveal>
                        ))}
                    </QuoteGrid>
                ) : (
                    <EarlyProof>
                        <div>
                            <h3>We are early, and we would rather say so.</h3>
                            <p>
                                Most sites like this one open with a wall of glowing quotes. We are not
                                going to print testimonials we cannot stand behind &mdash; not on a product
                                whose entire promise is that your family&rsquo;s stories are safe with us.
                            </p>
                            <p>
                                So here is what we can actually show you instead: the product itself,
                                running, above. The founder&rsquo;s own reason for building it. And a refund
                                if it turns out not to be for you, with no deadline on the offer.
                            </p>
                            <Actions>
                                <Button to="/story" $variant="outline">Why Daniel built this <IconArrow /></Button>
                            </Actions>
                        </div>
                        <ul>
                            <li><IconMic size={18} /><span><strong>Try the conversation yourself.</strong> The demo above is the real interview flow, not a video of one.</span></li>
                            <li><IconBook size={18} /><span><strong>Look inside a finished book.</strong> Every page of Margaret&rsquo;s archive is on the experience page.</span></li>
                            <li><IconShield size={18} /><span><strong>Read the terms before you pay.</strong> The refund and the forever-access promise are both written into them.</span></li>
                        </ul>
                    </EarlyProof>
                )}

                <Divider />

                {/* ─── Comparison ───────────────────────────────────── */}
                <SectionHead $center>
                    <Eyebrow>Honestly compared</Eyebrow>
                    <H2>If you are weighing this against the other one.</H2>
                    <Lead $center>
                        Every product here is trying to solve a real problem. Here is exactly where we differ
                        &mdash; including where we don&rsquo;t.
                    </Lead>
                </SectionHead>

                <TableWrap tabIndex={0} role="region" aria-label="Feature comparison, scrolls horizontally">
                    <Table>
                        <caption className="sr-only">
                            How A Story compares with StoryWorth, Remento and Storii
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">For the person giving it</th>
                                <th scope="col" className="us">A Story</th>
                                <th scope="col">StoryWorth</th>
                                <th scope="col">Remento</th>
                                <th scope="col">Storii</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Nothing to organize after you buy', true, false, false, false],
                                ['They talk instead of writing', true, false, true, true],
                                ['Nothing to operate — they answer a phone call', true, false, false, true],
                                ['Summary, full transcript and voice kept together', true, false, false, false],
                                ['Many voices on the same memory, not one narrator', true, false, false, false],
                                ['Adaptive follow-up questions, not a fixed list', true, false, false, false],
                                ['Searchable archive organized by life chapter', true, false, false, false],
                                ['Keeps growing after the book is printed', true, false, false, 'Partial'],
                                ['Printed hardcover keepsake', true, true, true, false],
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
                    Comparison based on each product&rsquo;s publicly documented features as of 2026. One
                    thing to weigh in their favor: StoryWorth and Remento bundle a book into their price,
                    and ours is {PRICE.book} on top &mdash; deliberately, so that printing one never means
                    the story is finished. If we have anything else wrong, tell us and we will correct it.
                </Note>
            </Container>
        </Section>

        {/* ─── Trust ────────────────────────────────────────────────── */}
        <Section $tone="teal" $tight id="trust">
            <Container>
                <SectionHead $center>
                    <Eyebrow $tone="gold">Privacy &amp; trust</Eyebrow>
                    <H2>You are giving this to someone you love.</H2>
                    <Lead $center $onDark>
                        Which is why the storyteller, not the buyer, controls everything. Four commitments,
                        written the way we would want them written if it were our family.
                    </Lead>
                </SectionHead>

                <PromiseGrid>
                    {[
                        { icon: <IconShield />, t: 'Theirs to share', d: 'The storyteller decides who sees what — the whole family, a few people, or nobody. Nothing is public by default and access can be revoked in a tap.' },
                        { icon: <IconLock />, t: 'Encrypted end to end', d: 'Recordings, transcripts and photos are encrypted at rest and in transit. Nobody at A Story reads a story without explicit permission.' },
                        { icon: <IconNoTrain />, t: 'Never sold. Never trained on.', d: 'We do not sell data, do not train models on your stories, and do not share content with third parties. This is contractual, not aspirational.' },
                        { icon: <IconHeart />, t: 'Never pushy', d: 'No streak counters, no guilt notifications, no nudges to the person you gave it to. It waits for them, for as long as they want.' },
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
                    &ldquo;The moments that make up a life should still be here for the people
                    who&rsquo;ll want them.&rdquo;
                </blockquote>
                <figcaption>The reason A Story exists</figcaption>
            </figure>
        </PullQuote>

        {/* ─── FAQ preview ──────────────────────────────────────────── */}
        <Section $tone="ivory" $tight id="faq">
            <Container>
                <SectionHead>
                    <Eyebrow>What buyers ask us</Eyebrow>
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
                    <ButtonAnchor href={CONTACT.gift} $variant="primary">Gift a story</ButtonAnchor>
                    <Button to="/faq" $variant="ghost">Read every question <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>

        {/* ─── Also for ─────────────────────────────────────────────── */}
        <AlsoBand aria-labelledby="also-title">
            <AlsoGrid>
                <div>
                    <Eyebrow>Also for</Eyebrow>
                    <H2 id="also-title" style={{ fontSize: '1.9rem', marginBottom: 12 }}>
                        Not buying a present?
                    </H2>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'inherit', maxWidth: '46ch' }}>
                        The same interview that gets a grandmother talking about 1958 works just as well on
                        your own life, on a founder, or on a resident in memory care. Three other people
                        use A Story, for three other reasons.
                    </p>
                </div>
                <div style={{ display: 'grid', gap: 12 }}>
                    <AlsoCard to="/your-story">
                        <h3>For your own life</h3>
                        <p>Nobody is going to sit you down and ask. A Story calls you instead — and the archive is yours before it is anyone else's.</p>
                        <span className="go">Record your own story <IconArrow size={15} /></span>
                    </AlsoCard>
                    <AlsoCard to="/organizations">
                        <h3>For organizations</h3>
                        <p>Founder interviews, retiring-employee knowledge, anniversary archives — kept before the people who hold them leave.</p>
                        <span className="go">See A Story for organizations <IconArrow size={15} /></span>
                    </AlsoCard>
                    <AlsoCard to="/institution">
                        <h3>For care communities</h3>
                        <p>Reminiscence as a standing activity for senior living, memory care and hospice — low burden for staff.</p>
                        <span className="go">See A Story for care communities <IconArrow size={15} /></span>
                    </AlsoCard>
                </div>
            </AlsoGrid>
        </AlsoBand>
        <BuyBar />
    </Page>
    );
};

export default Home;
