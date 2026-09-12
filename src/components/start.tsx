import { Link, useSearchParams } from 'react-router-dom';
import Seo from './ui/Seo';
import LeadForm from './ui/LeadForm';
import { SCENARIOS } from '../lib/demoScripts';
import { PRICE } from '../lib/pricing';
import { breadcrumbSchema, organizationSchema } from '../lib/seo';
import { IconCheck } from './ui/icons';
import {
    Anchor, Band, BandHead, BandInner, Beat, Closer, CloserInner, CostCard, CostRow, FineNote,
    FormCard, FormHead, Headline, Kicker, Page, Pitch, Points, ProofQuote, Split, Sub, ThreeUp, Top,
    TopInner,
} from './start.styles';

/**
 * The page every "Gift a story" button now goes to.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * BEFORE THIS, THE PRIMARY CALL TO ACTION WAS A `mailto:`. Sixteen buttons
 * across the site opened the visitor's email client and asked them to write
 * a message, at the one moment they had decided to buy. That is where almost
 * everybody was being lost, and no amount of better copy above it could have
 * mattered.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * It has to work for two very different arrivals:
 *
 *   Somebody who has read the home page, watched a call, and clicked. They
 *   need the form and nothing else in the way, so it is beside the headline
 *   rather than at the bottom of a scroll.
 *
 *   Somebody off an advertisement who has seen nothing at all. They need the
 *   argument made again, on this page, which is why the proof and the price
 *   are repeated here rather than linked to. A visitor from an ad has not
 *   read the other pages and is not going to.
 *
 * The quote at the top is Joan's, pulled from the demo scripts so that the
 * page cannot drift away from the conversation it is quoting. Joan is
 * invented, and the line under the quote says so.
 */

/** The Love & family call — the one whose last line lands hardest cold. */
const JOAN = SCENARIOS[2];

/** Plan ids that /pricing and the buy bar can send, and how to say them. */
const PLAN_LABEL: Record<string, string> = {
    individual: 'Individual',
    family: 'Family',
    express: 'Express',
    monthly: 'Monthly',
    book: 'the hardcover book',
    one: 'Individual',
};

const Start = () => {
    /* Set when somebody arrived by pressing a plan button rather than a general
       "Gift a story" — see lib/checkout.ts. It changes nothing about the form
       except the source recorded with the lead, so the reply can open on the
       thing they were actually looking at. */
    const [params] = useSearchParams();
    const plan = params.get('plan') ?? '';
    const planLabel = PLAN_LABEL[plan];
    const heroSource = planLabel ? `start:plan:${plan}` : 'start:hero';
    /* "Book a demo" lands here too — same two fields, a different promise. */
    const intent = params.get('intent') === 'demo' ? 'demo' : 'start';

    return (
    <Page>
        <Seo
            title="Start their story — A Story"
            description="Leave a name and a number. We call you back, show you how it works, and set nothing up until you say so. No payment now."
            path="/start"
            schema={[
                organizationSchema(),
                breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Start their story', path: '/start' },
                ]),
            ]}
        />

        <Top>
            <TopInner>
                <Pitch>
                    <Kicker>Start their story</Kicker>
                    <Headline>
                        The stories go quiet <em>a long time before anybody does.</em>
                    </Headline>
                    <Sub>
                        A Story rings the person whose life it is, asks them about it properly, and
                        turns what they say into an archive their whole family keeps. You set it up
                        once. They answer the phone and talk.
                    </Sub>

                    <ProofQuote>
                        <p>&ldquo;{JOAN.cover.quote}&rdquo;</p>
                        <cite>{JOAN.cover.attribution}</cite>
                    </ProofQuote>

                    <Points>
                        <li>
                            <IconCheck size={16} />
                            <span>
                                <strong>Two minutes of setting up, then nothing.</strong> No organising,
                                no chasing, no homework for the person who paid.
                            </span>
                        </li>
                        <li>
                            <IconCheck size={16} />
                            <span>
                                <strong>Nothing for them to learn.</strong> The app goes on once &mdash;
                                you can do it &mdash; and after that their phone simply rings.
                            </span>
                        </li>
                        <li>
                            <IconCheck size={16} />
                            <span>
                                <strong>The whole family is in it.</strong> Inviting fifteen cousins
                                costs the same as inviting nobody.
                            </span>
                        </li>
                        <li>
                            <IconCheck size={16} />
                            <span>
                                <strong>It is theirs for good.</strong> Every recording, transcript and
                                photograph, exportable whenever you ask.
                            </span>
                        </li>
                    </Points>
                </Pitch>

                <FormCard>
                    <FormHead>
                        <h2>{intent === 'demo' ? 'Let us show you.' : 'Leave us a number.'}</h2>
                        <p>
                            {intent === 'demo'
                                ? 'Twenty minutes on a call and you will have seen the whole thing working. Two fields and we will ring you to agree a time.'
                                : planLabel
                                    ? `You were looking at ${planLabel}. Leave a name and a number and we will call you about it — everything else can wait.`
                                    : 'A name and a number is all we need. We will call you, which is rather the point of the product.'}
                        </p>
                    </FormHead>
                    <LeadForm source={heroSource} onDark intent={intent} />
                </FormCard>
            </TopInner>
        </Top>

        <Band>
            <BandInner>
                <BandHead>
                    <h2>Then here is <em>exactly</em> what happens.</h2>
                    <p>
                        Fulfilment is done by hand, by the two of us, because at this size doing it
                        by hand is better than doing it at scale badly.
                    </p>
                </BandHead>
                <ThreeUp>
                    <Beat>
                        <p className="n">1</p>
                        <h3>We write back</h3>
                        <p>
                            Usually the same day, from a person. We will ask two or three things about
                            them &mdash; their name, roughly when they were born, and whether there is
                            a date this has to be ready by.
                        </p>
                    </Beat>
                    <Beat>
                        <p className="n">2</p>
                        <h3>We build the archive</h3>
                        <p>
                            Set up in their name, with their chapters ready and the first questions
                            chosen. You get one link, and anyone you want in on it gets the same link.
                        </p>
                    </Beat>
                    <Beat>
                        <p className="n">3</p>
                        <h3>The phone rings</h3>
                        <p>
                            On the day you choose, at the hour they choose. They answer it and talk,
                            and by the evening there is something in the archive to read.
                        </p>
                    </Beat>
                </ThreeUp>
            </BandInner>
        </Band>

        <Band $tone="paper">
            <BandInner>
                <BandHead>
                    <h2>What it costs.</h2>
                </BandHead>
                <CostCard>
                    <CostRow>
                        <span className="amount">{PRICE.headline}</span>
                        <span className="per">a year, for one storyteller</span>
                    </CostRow>
                    <Anchor>
                        Ten dollars a month, and it buys <strong>ninety minutes of guided calls every
                        month</strong> &mdash; four or five real conversations, not a highlight reel.
                        Which works out at <strong>about two dollars a conversation</strong>, for the
                        conversations nobody in the family was ever going to start on their own.
                    </Anchor>
                    <Split>
                        <li>
                            <b>$30</b>
                            each, if four of you split one year between you
                        </li>
                        <li>
                            <b>$79</b>
                            one payment, if you would rather nothing ever renewed on them
                        </li>
                        <li>
                            <b>{PRICE.book}</b>
                            for the hardcover, later, only if you want one
                        </li>
                    </Split>
                    <FineNote>
                        Every account opens with three days of everything and no card. After that
                        there is a Free tier that does not run out, so the archive is never taken away
                        from anybody. <Link to="/pricing">The full breakdown is here</Link> &mdash; and
                        you are not paying anything today.
                    </FineNote>
                </CostCard>
            </BandInner>
        </Band>

        <Closer>
            <CloserInner>
                <h2>
                    There is a question in your family <em>that nobody has asked yet.</em>
                </h2>
                <p>
                    It will still be unasked next year, and the year after, unless somebody makes it
                    somebody&rsquo;s job. That is the entire thing we do.
                </p>
                <FormCard>
                    <LeadForm
                        source="start:closer"
                        onDark
                        intent={intent}
                        reassure="Nothing is charged today, and nothing reaches them until you say so."
                    />
                </FormCard>
            </CloserInner>
        </Closer>
    </Page>
    );
};

export default Start;
