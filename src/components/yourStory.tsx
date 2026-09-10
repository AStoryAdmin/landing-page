import Seo from './ui/Seo';
import Reveal from './ui/Reveal';
import BuyBar from './ui/BuyBar';
import {
    Actions, Button, ButtonAnchor, Container, Eyebrow, H2, Italic, Lead, Note, Section,
} from './ui/primitives';
import {
    IconArchive, IconArrow, IconBook, IconExport, IconPhone, IconTranscript, IconUsers,
} from './ui/icons';
import { CONTACT } from '../lib/contact';
import { buyLabel, checkoutFor } from '../lib/checkout';
import { KEEPS_LINE, PRICE } from '../lib/pricing';
import { breadcrumbSchema, organizationSchema } from '../lib/seo';
import {
    Divider, EarlyProof, Feature, FeatureList, Objection, ObjectionGrid, Page, PriceStrip,
    SectionHead, Step, StepGrid, StepNumber, StepText, StepTitle,
} from './home.styles';

/**
 * For someone recording their own life.
 *
 * The rest of the site is written for a gift buyer — every headline, call to
 * action and mailto assumes you are giving this to somebody else. That is the
 * right primary audience, but it left one group with nowhere to land: people
 * who arrive from App Store search, who are overwhelmingly buying for
 * themselves. They were reading "give it to your mother" and leaving.
 *
 * The tone here is deliberately different from the gift pages. Someone
 * recording their own life is not being persuaded to be generous; they are
 * deciding whether their own life is worth writing down, which is a more
 * self-conscious thing to admit to. The page's job is to make that feel
 * ordinary rather than vain.
 */

const DOUBTS = [
    {
        d: '“I haven’t done anything worth recording.”',
        a: 'Almost nobody thinks they have. The parts your family will read again and again are not the achievements — they are what the kitchen smelled like, why you left that job, the year everything was hard and you did not say so at the time.',
    },
    {
        d: '“It feels self-important.”',
        a: 'Then think of it as answering, not announcing. You are not writing a memoir at anybody. You are leaving replies to the questions your grandchildren will have once you are not there to be asked.',
    },
    {
        d: '“I would not know where to start.”',
        a: 'You do not have to. A Story starts, and it starts small — one ordinary afternoon, not your whole life. Everything after that is just answering what it asks next.',
    },
    {
        d: '“I am not a good talker.”',
        a: 'Nobody sounds good doing this, and it does not matter. You ramble, you correct yourself, you go off on something — and what comes back is clean, in your own words, with the rambling kept underneath in case anyone wants it.',
    },
];

const YourStory = () => (
    <Page>
        <Seo
            title="Record your own life — A Story"
            description="Use A Story for your own life rather than someone else's. It calls you, asks, and turns what you say into a private archive your family keeps — in your voice, for good."
            path="/your-story"
            schema={[
                organizationSchema(),
                breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Your own story', path: '/your-story' },
                ]),
            ]}
        />

        {/* ─── Opening ──────────────────────────────────────────────── */}
        <Section $tone="deep" $tight>
            <Container>
                <SectionHead>
                    <Eyebrow $tone="gold">For your own life</Eyebrow>
                    <H2 style={{ color: 'inherit' }}>
                        Nobody is going to ask you.
                        <br />
                        <Italic>So let something else.</Italic>
                    </H2>
                    <Lead $onDark>
                        Most of A Story is written for people giving it to a parent. This page is for the
                        other half &mdash; the ones who worked out that if they wait to be asked, the
                        asking never comes, and did something about it themselves.
                    </Lead>
                </SectionHead>
                <Actions>
                    <ButtonAnchor href={checkoutFor('individual', 'Individual — my own life')} $variant="primary">
                        {buyLabel('individual', 'Start free — 3 days of everything', 'Start your own archive')}
                    </ButtonAnchor>
                    <Button to="/#demo" $variant="onDark">Hear how it asks <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>

        {/* ─── How it goes ──────────────────────────────────────────── */}
        <Section $tone="ivory" $tight>
            <Container>
                <SectionHead $center>
                    <Eyebrow>How it goes</Eyebrow>
                    <H2>You talk. That is the entire job.</H2>
                    <Lead $center>
                        No typing, no blank page, no evening set aside to &ldquo;work on it&rdquo;. The
                        phone rings when you said it could, and you answer it.
                    </Lead>
                </SectionHead>

                <Reveal>
                    <StepGrid>
                        <Step>
                            <p className="who">Once</p>
                            <StepNumber>1</StepNumber>
                            <StepTitle>Say when to call</StepTitle>
                            <StepText>
                                Two minutes of setup: your name, roughly where you want to begin, and the
                                times of day you would actually pick up.
                            </StepText>
                        </Step>
                        <Step>
                            <p className="who">Whenever</p>
                            <StepNumber>2</StepNumber>
                            <StepTitle>Answer the phone</StepTitle>
                            <StepText>
                                Fifteen minutes is a real session. It never rushes you, never runs out of
                                follow-ups, and picks up weeks later exactly where you stopped.
                            </StepText>
                        </Step>
                        <Step>
                            <p className="who">Automatic</p>
                            <StepNumber>3</StepNumber>
                            <StepTitle>It files itself</StepTitle>
                            <StepText>
                                Each conversation becomes a memory card with the full transcript beneath it,
                                dated and filed on a timeline that keeps growing.
                            </StepText>
                        </Step>
                        <Step>
                            <p className="who">When you choose</p>
                            <StepNumber>4</StepNumber>
                            <StepTitle>Let people in</StepTitle>
                            <StepText>
                                Nothing is shared until you share it. Invite whoever you want, whenever you
                                want, and take it back if you change your mind.
                            </StepText>
                        </Step>
                    </StepGrid>
                </Reveal>

                <PriceStrip>
                    <div>
                        <p className="amount">Free</p>
                    </div>
                    <p className="what">
                        <strong>Three days of everything, then free for as long as you like.</strong> Guided
                        calls are {PRICE.headline} {PRICE.headlineNote}. {KEEPS_LINE}
                    </p>
                    <ButtonAnchor href={checkoutFor('individual', 'Individual — my own life')} $variant="primary">
                        {buyLabel('individual', 'Choose Individual', 'Get started')}
                    </ButtonAnchor>
                </PriceStrip>

                <Actions $center>
                    <Button to="/pricing" $variant="ghost">See every plan <IconArrow /></Button>
                </Actions>
            </Container>
        </Section>

        {/* ─── The real objections ──────────────────────────────────── */}
        <Section $tone="paper" $tight>
            <Container>
                <SectionHead $center>
                    <Eyebrow>The part nobody says out loud</Eyebrow>
                    <H2>Every reason you think this isn&rsquo;t for you.</H2>
                </SectionHead>
                <ObjectionGrid>
                    {DOUBTS.map((o, i) => (
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

        {/* ─── What you end up with ─────────────────────────────────── */}
        <Section $tone="ivory" $tight>
            <Container>
                <SectionHead $center>
                    <Eyebrow>What you end up with</Eyebrow>
                    <H2>Yours first. Theirs when you say so.</H2>
                </SectionHead>

                <Reveal>
                    <FeatureList>
                        <Feature>
                            <span className="icon"><IconPhone /></span>
                            <div>
                                <h3>A conversation, not a form</h3>
                                <p>It asks, listens, and follows the answer somewhere the next question could not have predicted. You never face a blank page.</p>
                            </div>
                        </Feature>
                        <Feature>
                            <span className="icon"><IconTranscript /></span>
                            <div>
                                <h3>Your voice and your words, both kept</h3>
                                <p>A card you can read in a minute, the whole transcript underneath it, and the moments worth hearing kept as audio.</p>
                            </div>
                        </Feature>
                        <Feature>
                            <span className="icon"><IconArchive /></span>
                            <div>
                                <h3>A life in order</h3>
                                <p>Filed by chapter and dated on a timeline that keeps growing — today goes on it the same as 1962 does.</p>
                            </div>
                        </Feature>
                        <Feature>
                            <span className="icon"><IconUsers /></span>
                            <div>
                                <h3>You decide who reads it</h3>
                                <p>Nothing is shared by default. Invite family when you are ready, one story at a time if you like, and revoke it whenever.</p>
                            </div>
                        </Feature>
                        <Feature>
                            <span className="icon"><IconBook /></span>
                            <div>
                                <h3>A book, if you want one</h3>
                                <p>Any chapter can be printed as a hardcover, {PRICE.book}, whenever you decide a part of it is worth holding.</p>
                            </div>
                        </Feature>
                        <Feature>
                            <span className="icon"><IconExport /></span>
                            <div>
                                <h3>Yours to take, always</h3>
                                <p>Export the whole thing as a PDF or a full archive of audio and transcripts, free, as often as you like.</p>
                            </div>
                        </Feature>
                    </FeatureList>
                </Reveal>

                <Divider />

                <EarlyProof>
                    <div>
                        <h3>Start with one conversation and see.</h3>
                        <p>
                            You do not have to decide today whether your life is worth writing down. Have
                            one conversation and read what comes back &mdash; that is usually the moment
                            people stop asking the question.
                        </p>
                        <Actions>
                            <ButtonAnchor href={CONTACT.self} $variant="outline">
                                Ask us anything first <IconArrow />
                            </ButtonAnchor>
                        </Actions>
                    </div>
                    <ul>
                        <li><IconPhone size={18} /><span><strong>It calls you.</strong> You never have to remember to do this, and you never have to start.</span></li>
                        <li><IconArchive size={18} /><span><strong>Yours if you stop.</strong> Cancel and you drop to Free — the archive stays open and everything you recorded stays yours.</span></li>
                        <li><IconExport size={18} /><span><strong>Nothing is locked.</strong> Export everything at any time, including after the conversations stop.</span></li>
                    </ul>
                </EarlyProof>

                <Note style={{ marginTop: 20, textAlign: 'center' }}>
                    Buying it for someone else instead? <Button to="/" $variant="ghost">See the gift <IconArrow /></Button>
                </Note>
            </Container>
        </Section>

        <BuyBar planId="one" label="One storyteller — my own life" />
    </Page>
);

export default YourStory;
