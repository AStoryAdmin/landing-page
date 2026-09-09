import { lazy, Suspense } from 'react';
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
    AlsoBand, AlsoCard, AlsoGrid, DemoFallback, DemoSplit, Divider, EarlyProof, FaqItem, FaqList,
    Feature, FeatureList, GiftCard,
    HandoverSplit, Hero, HeroActions, HeroBadge, HeroCopy, HeroInner, HeroSub, HeroTitle, HeroTrust,
    MatterItem, MattersCoda, MattersGrid, MattersLead,
    No, Objection, ObjectionGrid, Page, PriceStrip, ProofImage, ProofSplit, PromiseCard, PromiseGrid, PullQuote,
    QuoteCard, QuoteGrid, SectionHead, Step, StepGrid, StepNumber, StepText,
    StepTitle, Table, TableWrap, Tag, TagRow, Yes,
} from './home.styles';

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
        q: 'We put the card under the tree. By New Year my grandfather had done nine sessions and my kids were fighting over who got to read the next one.',
        c: 'David L. · Michigan',
        verified: false,
    },
    {
        q: 'Four of us went in on it together. It cost each of us less than the candle I would otherwise have bought her, and she cried when she opened the card.',
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
        a: 'A printed card with a link and a short note from you. We send you a version to print and a version to text or email, so it works whether you are in the room or three time zones away.',
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
        q: 'What happens when the three months are up?',
        a: 'Nothing, which is the point. The archive stays open, everyone keeps their access, and the family can go on recording and adding photos forever. Only the guided AI conversations pause — and nothing renews behind your back.',
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

const Home = () => (
    <Page>
        <Seo
            title="A Story — the gift your whole family opens"
            description="Give the gift of being asked. A Story calls your parents and grandparents and records their life stories in their own voice — you buy once, send one link, and the archive belongs to the whole family forever."
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
                <DemoSplit>
                    <div>
                        <Eyebrow>Watch it happen</Eyebrow>
                        <H2>This is the actual conversation.</H2>
                        <Lead>
                            Not a video of one. Press play and you are watching the real interview flow
                            &mdash; A Story asks, listens to the answer, and follows it somewhere the next
                            question could not have predicted.
                        </Lead>
                        <Note>
                            At the end you get what your family gets: a memory card you can read in a
                            minute, the full transcript underneath it, and the moment worth hearing kept as
                            audio. Your microphone works too, if you want to try answering.
                        </Note>
                        <Actions>
                            <Button to="/experience" $variant="outline">
                                See everything they receive <IconArrow />
                            </Button>
                        </Actions>
                    </div>
                    <Suspense fallback={<DemoFallback aria-hidden="true" />}>
                        <div onClickCapture={() => track('demo_played', { page: 'home' })}>
                            <DemoPhone />
                        </div>
                    </Suspense>
                </DemoSplit>
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
                                Two minutes. You get a card to print and a link to send &mdash; with a line
                                from you on it. That is the last thing this asks of you.
                            </StepText>
                        </Step>
                        <Step>
                            <p className="who">You</p>
                            <StepNumber>2</StepNumber>
                            <StepTitle>Send the link</StepTitle>
                            <StepText>
                                Hand it over at the table, text it, or slip it in a card. Send it to your
                                brother and your cousins too &mdash; anyone you want in on it.
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
                        <p className="amount">{PRICE.gift}</p>
                    </div>
                    <p className="what">
                        <strong>{PRICE.giftNote}.</strong> Nothing renews, no charge for the relatives you
                        invite, and when the three months are up the archive stays open and free &mdash;
                        for good. Only the guided conversations pause.
                    </p>
                    <ButtonAnchor href={CONTACT.gift} $variant="primary">Gift a story</ButtonAnchor>
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
                        <H2>Something to actually put in their hands.</H2>
                        <Lead>
                            A gift that arrives as a login is not a gift. You get a card &mdash; printed or
                            sent &mdash; with your own note on it and one link underneath. It is the part
                            they open, and it is the only instruction they ever need.
                        </Lead>
                        <Note>
                            Print it at home, order it with the book, or text the link if you won&rsquo;t be
                            in the room. Whatever suits the day.
                        </Note>
                        <Actions>
                            <ButtonAnchor href={CONTACT.gift} $variant="primary">Gift a story</ButtonAnchor>
                        </Actions>
                    </div>

                    <Reveal shift={26}>
                        <GiftCard aria-hidden="true">
                            <p className="eyebrow">A Story &middot; a gift for you</p>
                            <p className="to">For</p>
                            <p className="name">Grandma Ruth</p>
                            <p className="note">
                                We&rsquo;ve been meaning to ask you about all of it. Take your time &mdash;
                                we&rsquo;re listening.
                            </p>
                            <span className="link">Start whenever you like &rarr;</span>
                            <p className="from">From Ellie, Tom, and the grandchildren</p>
                        </GiftCard>
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
                                    <p>Every answer filed by chapter of life — childhood, work, love, loss — searchable in a second, ten years from now.</p>
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

export default Home;
