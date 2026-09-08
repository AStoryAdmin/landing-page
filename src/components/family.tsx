import { CONTACT } from '../lib/contact';
import Seo from './ui/Seo';
import { breadcrumbSchema, organizationSchema } from '../lib/seo';
import { Link } from 'react-router-dom';
import {FamilyContainer, CardView, Label, GoldLabel, HeroLabel, SectionTitle, Paragraph, Italic, ItalicAccent, PrimaryButtonAnchor, GhostButton, Arrow, HeroSection, HeroTitle, HeroSub, WhySection, WhyLayout, StatStack, MissingCard, MissingThing, MissingFate, Coda, DarkCoda, VoiceCards, VoiceCard, WhoSection, WhoIntro, WhoCards, WhoCard, CardTitle, WhyNowSection, WhyNowTitle, WhyNowGrid, WhyNowCard, WhyNowNum, WhyNowCardTitle, WhyNowText, PrivacySection, PrivacySub, PromiseGrid, PromiseCard, PromiseIcon, PromiseTitle, PromiseText, PrivacyFooterNote, FounderSection, FounderLayout, Blockquote, FounderPhoto, CtaSection, CtaTitle, CtaSub, CtaActions, OutlineButtonLink} from './family.styles';
import daniel from './../assets/astoryDaniel.webp';

/**
 * The case for A Story, and the spine the rest of the site is written against.
 *
 * This page used to argue urgency: 1.4 billion people over 60, ten thousand
 * Americans turning 65 a day, a window closing. That is the case every product
 * in this category makes, and it contradicted what A Story actually does — a
 * record that keeps growing cannot also be a race against a deadline. The
 * argument now runs on what genuinely goes missing, which is the everyday, and
 * on the fact that the story is never finished.
 */

/** The things that vanish. Not milestones — milestones get photographed. */
const GOES_MISSING = [
    {
        thing: 'The story he tells every Thanksgiving.',
        fate: 'Told a hundred times, at the same point in the meal, to people who could recite it. Written down never.',
    },
    {
        thing: 'Why everyone in that photograph is laughing.',
        fate: 'The photograph survives. The reason does not, and eventually there is nobody left to ask.',
    },
    {
        thing: 'An ordinary Tuesday in 1974.',
        fate: 'Nobody thought it was worth recording, because nobody knew yet which day it would turn out to be.',
    },
];

const Families = () => {
    return (
        <FamilyContainer>
            <Seo
                title="Why it matters — the everyday is what goes missing"
                description="Most of a life goes undocumented — not the milestones, the everyday. Why A Story captures the life being lived as well as the one behind it, holds every voice on the same moment, and never assumes the story is finished."
                path="/family"
                schema={[
                    organizationSchema(),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Why it matters', path: '/family' },
                    ]),
                ]}
            />
            <HeroSection>
                <CardView>
                    <HeroLabel>Why it matters</HeroLabel>
                    <HeroTitle>
                        Most of a life goes<br /><Italic>undocumented.</Italic>
                    </HeroTitle>
                    <HeroSub>
                        Not the big milestones &mdash; those get photographed. It is the everyday: the story told at dinner and never written down, the reason everyone was laughing in that photo, the small ordinary day that turns out to matter later. Those slip away quietly. A Story exists to catch them, so the moments that make up a life are still here for the people who&rsquo;ll want them.
                    </HeroSub>
                </CardView>
            </HeroSection>

            <WhySection>
                <CardView>
                    <WhyLayout>
                        <div>
                            <Label>What actually goes missing</Label>
                            <SectionTitle>Nobody loses the wedding photos. They lose everything around them.</SectionTitle>
                            <Paragraph>The milestones are the part a family already keeps. There are pictures of the graduation, the wedding, the day the house was bought. What nobody keeps is the ordinary talk that gave those days their meaning &mdash; and it is the ordinary talk that turns out to be irreplaceable.</Paragraph>
                            <Paragraph>It does not disappear all at once. It goes the way most things go: <ItalicAccent>quietly, and only in hindsight.</ItalicAccent></Paragraph>
                            <PrimaryButtonAnchor href={CONTACT.gift}>Gift a story</PrimaryButtonAnchor>
                        </div>

                        <StatStack>
                            {GOES_MISSING.map((m) => (
                                <MissingCard key={m.thing}>
                                    <MissingThing>{m.thing}</MissingThing>
                                    <MissingFate>{m.fate}</MissingFate>
                                </MissingCard>
                            ))}
                        </StatStack>
                    </WhyLayout>
                </CardView>
            </WhySection>

            <WhoSection>
                <CardView>
                    <Label>What makes it different</Label>
                    <SectionTitle>Most tools for this look backward.</SectionTitle>
                    <WhoIntro>They help you preserve a life that has already been lived. A Story works the other way around.</WhoIntro>

                    <WhoCards>
                        <WhoCard>
                            <Label>The usual approach</Label>
                            <CardTitle>A memoir to finish before it is too late.</CardTitle>
                            <Paragraph>A project with a deadline, and the deadline is a person. Everything points backward, because the premise is that the story is nearly over and the job is to get it down in time.</Paragraph>
                            <Paragraph>Which means that the moment the book is printed the work is done &mdash; and everything that happens afterwards has nowhere to go.</Paragraph>
                        </WhoCard>

                        <WhoCard>
                            <Label>A Story</Label>
                            <CardTitle>A record that is still being written.</CardTitle>
                            <Paragraph>It captures the life you are living now as well as the one behind you, and it never assumes the story is finished, because it isn&rsquo;t. Today is part of it too.</Paragraph>
                            <Paragraph>This afternoon goes onto the same timeline as 1962, in the same voice, filed with the same care. There is no last page to reach.</Paragraph>
                            <Link to="/experience">
                                <GhostButton>See how a conversation becomes an archive<Arrow>&rarr;</Arrow></GhostButton>
                            </Link>
                        </WhoCard>
                    </WhoCards>
                </CardView>
            </WhoSection>

            <WhyNowSection>
                <CardView>
                    <GoldLabel>How it works</GoldLabel>
                    <WhyNowTitle>It works the way a good listener would.</WhyNowTitle>

                    <WhyNowGrid>
                        <WhyNowCard>
                            <WhyNowNum>1</WhyNowNum>
                            <WhyNowCardTitle>It asks, and then it follows up.</WhyNowCardTitle>
                            <WhyNowText>Not a fixed list of questions. A Story listens to the answer and asks the next thing &mdash; the way someone who already knows you would, and who has all the time in the world for the rest of it.</WhyNowText>
                        </WhyNowCard>
                        <WhyNowCard>
                            <WhyNowNum>2</WhyNowNum>
                            <WhyNowCardTitle>It remembers, and connects.</WhyNowCardTitle>
                            <WhyNowText>Everything shared is linked to the people, places and photographs it belongs with. A name mentioned once about 1958 is still there when it comes up again forty years later in the story.</WhyNowText>
                        </WhyNowCard>
                        <WhyNowCard>
                            <WhyNowNum>3</WhyNowNum>
                            <WhyNowCardTitle>It lays it out on a timeline.</WhyNowCardTitle>
                            <WhyNowText>A life in order, chapter by chapter, that keeps growing as the life does. Not an archive that closes, but one with room left at the end of it on purpose.</WhyNowText>
                        </WhyNowCard>
                    </WhyNowGrid>

                    <DarkCoda>Every conversation lands as a summary you can read in a minute, the full transcript underneath it, and the moments worth hearing kept as audio.</DarkCoda>
                </CardView>
            </WhyNowSection>

            <WhySection>
                <CardView>
                    <Label>Not one narrator</Label>
                    <SectionTitle>A life is not a solo account.</SectionTitle>
                    <WhoIntro>The same afternoon looks different depending on who is remembering it. A Story keeps every version on the same moment, rather than picking one and calling it the record.</WhoIntro>

                    <VoiceCards>
                        <VoiceCard>
                            <Label>The one who lived it</Label>
                            <CardTitle>&ldquo;I remember being terrified.&rdquo;</CardTitle>
                            <MissingFate>What the day felt like from the inside, which is the only place it can come from.</MissingFate>
                        </VoiceCard>
                        <VoiceCard>
                            <Label>The child who was there</Label>
                            <CardTitle>&ldquo;I thought it was an adventure.&rdquo;</CardTitle>
                            <MissingFate>The same day at a different height, remembered by someone who did not yet know what was at stake.</MissingFate>
                        </VoiceCard>
                        <VoiceCard>
                            <Label>The one who only heard about it</Label>
                            <CardTitle>&ldquo;That story got told every year.&rdquo;</CardTitle>
                            <MissingFate>How it traveled through the family afterwards, and what it came to mean once it had.</MissingFate>
                        </VoiceCard>
                    </VoiceCards>

                    <Coda>That is what makes it a documentary instead of a diary.</Coda>
                </CardView>
            </WhySection>

            <WhoSection>
                <CardView>
                    <WhyLayout>
                        <div>
                            <Label>The book</Label>
                            <SectionTitle>Any chapter can become something you hold.</SectionTitle>
                            <Paragraph>When you are ready &mdash; not when a deadline says so &mdash; a chapter is edited, laid out like a memoir and printed as a hardcover book, with the photographs beside the stories they belong to.</Paragraph>
                            <Paragraph>The book is the edited version. The archive keeps the rest of it: every transcript, every recording, and everything that did not fit on the page.</Paragraph>
                            <Paragraph><ItalicAccent>And the story does not stop when the book is made. It keeps going, because so do you.</ItalicAccent></Paragraph>
                            <Link to="/experience#book">
                                <GhostButton>Look inside a finished book<Arrow>&rarr;</Arrow></GhostButton>
                            </Link>
                        </div>

                        <StatStack>
                            <MissingCard>
                                <MissingThing>Printed when you say so.</MissingThing>
                                <MissingFate>There is no cut-off and no final call for submissions. Order a volume this year and another one in five years, from the same archive.</MissingFate>
                            </MissingCard>
                            <MissingCard>
                                <MissingThing>Everyone keeps the archive.</MissingThing>
                                <MissingFate>The book lives on one shelf. The searchable archive belongs to everybody who was invited, wherever they are, for as long as they want it.</MissingFate>
                            </MissingCard>
                        </StatStack>
                    </WhyLayout>
                </CardView>
            </WhoSection>

            <PrivacySection>
                <CardView>
                    <Label>Privacy &amp; trust</Label>
                    <SectionTitle>Their story belongs to them.<br />Only them.</SectionTitle>
                    <PrivacySub>These are people's life stories &mdash; the most personal thing there is. We built A Story around one principle: the storyteller is in complete control, always.</PrivacySub>

                    <PromiseGrid>
                        <PromiseCard>
                            <PromiseIcon>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </PromiseIcon>
                            <PromiseTitle>Theirs to share</PromiseTitle>
                            <PromiseText>Only the storyteller decides what gets shared &mdash; with family, with no one, or with the world. We never publish or distribute without explicit, informed consent.</PromiseText>
                        </PromiseCard>

                        <PromiseCard>
                            <PromiseIcon>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                            </PromiseIcon>
                            <PromiseTitle>Encrypted &amp; safe</PromiseTitle>
                            <PromiseText>All recordings and memories are encrypted at rest and in transit. No one at A Story can read a family's stories without their explicit permission.</PromiseText>
                        </PromiseCard>

                        <PromiseCard>
                            <PromiseIcon>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                </svg>
                            </PromiseIcon>
                            <PromiseTitle>Never sold. Never trained on.</PromiseTitle>
                            <PromiseText>We will never sell a family's data, never use their stories to train AI models, and never share their content with third parties. Ever. This is a commitment, not a policy.</PromiseText>
                        </PromiseCard>
                    </PromiseGrid>

                    <PrivacyFooterNote>No one sees their story unless they choose to share it &mdash; not us, not anyone.</PrivacyFooterNote>
                </CardView>
            </PrivacySection>

            <FounderSection>
                <CardView>
                    <FounderLayout>
                        <div>
                            <Label>Why this exists</Label>
                            <SectionTitle>He knew the dates. He did not know the ordinary parts.</SectionTitle>
                            <Paragraph>Two of Daniel's uncles had strokes within the same year. They survived &mdash; but the questions he had never got around to asking were suddenly much harder to ask.</Paragraph>
                            <Blockquote>"I realized I didn't know how my grandparents met. I'd spent years learning how the world works &mdash; and never once turned that attention to the people who shaped mine."</Blockquote>
                            <Paragraph>Not the milestones. The small things nobody had written down, because nobody thought they needed writing down. A Story is his answer.</Paragraph>
                            <Link to="/story">
                                <GhostButton>Read Daniel's full story <Arrow>&rarr;</Arrow></GhostButton>
                            </Link>
                        </div>

                        <FounderPhoto>
                            <img src={daniel} alt="Daniel Hoang Nguyen, founder of A Story" loading="lazy" decoding="async" />
                        </FounderPhoto>
                    </FounderLayout>
                </CardView>
            </FounderSection>

            <CtaSection>
                <CardView>
                    <Label>Start the record.</Label>
                    <CtaTitle>The moments that make up a life,<br />kept for the people who&rsquo;ll want them.</CtaTitle>
                    <CtaSub>You buy it once and send one link. They answer the phone and talk. The archive belongs to the whole family, and it keeps going.</CtaSub>
                    <CtaActions>
                        <PrimaryButtonAnchor href={CONTACT.gift}>Gift a story</PrimaryButtonAnchor>
                        <OutlineButtonLink to="/experience">See the experience</OutlineButtonLink>
                    </CtaActions>
                </CardView>
            </CtaSection>
        </FamilyContainer>
    );
};

export default Families;
