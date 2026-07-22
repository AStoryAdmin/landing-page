import { Link } from 'react-router-dom';
import {FamilyContainer, CardView, Label, GoldLabel, HeroLabel, SectionTitle, Paragraph, Italic, PrimaryButton, GhostButton, Arrow, HeroSection, HeroTitle, HeroSub, WhySection, WhyLayout, StatStack, StatCard, StatNum, StatCaption, WhoSection, WhoIntro, WhoCards, WhoCard, CardTitle, WhyNowSection, WhyNowTitle, WhyNowGrid, WhyNowCard, WhyNowNum, WhyNowCardTitle, WhyNowText, PrivacySection, PrivacySub, PromiseGrid, PromiseCard, PromiseIcon, PromiseTitle, PromiseText, PrivacyFooterNote, FounderSection, FounderLayout, Blockquote, FounderPhoto, CtaSection, FoundingBadge, CtaTitle, CtaSub, CtaActions, OutlineButton} from './family.styles';
import daniel from './../assets/astoryDaniel.png';

const Families = () => {
    return (
        <FamilyContainer>
            <HeroSection>
                <CardView>
                    <HeroLabel>For families &amp; care</HeroLabel>
                    <HeroTitle>
                        For the families<br />who haven't asked <Italic>yet.</Italic>
                    </HeroTitle>
                    <HeroSub>
                        Most stories are never told &mdash; not because there's nothing to say, but because no one ever made the time to ask. A Story makes the asking easy, and the answering even easier.
                    </HeroSub>
                </CardView>
            </HeroSection>

            <WhySection>
                <CardView>
                    <WhyLayout>
                        <div>
                            <Label>Why it matters</Label>
                            <SectionTitle>Every day is a day closer to a story you'll never hear.</SectionTitle>
                            <Paragraph>Most families never get to ask. Life gets busy. The person who holds all the stories gets older. And then one day it's too late &mdash; and you realize you never found out what her childhood was like, what he dreamed of becoming, what the house they grew up in smelled like in summer.</Paragraph>
                            <Paragraph>A Story gives you a way to ask, while there's still time. Not as a journalist. Not as a therapist. As a warm presence that sits with the people you love and says: <Italic>I have time. Tell me everything.</Italic></Paragraph>
                            <Link to="/signup">
                                <PrimaryButton>Get early access</PrimaryButton>
                            </Link>
                        </div>

                        <StatStack>
                            <StatCard>
                                <StatNum>1.4B</StatNum>
                                <StatCaption>
                                    people aged 60+ worldwide by 2030 &mdash; the generation that holds the stories.
                                    <small>WHO, 2025</small>
                                </StatCaption>
                            </StatCard>
                            <StatCard>
                                <StatNum>10K</StatNum>
                                <StatCaption>
                                    Americans cross age 65 every single day, carrying memories no one has asked about.
                                    <small>U.S. Census</small>
                                </StatCaption>
                            </StatCard>
                            <StatCard>
                                <StatNum>63M</StatNum>
                                <StatCaption>
                                    U.S. family caregivers who already feel the weight of the window closing.
                                    <small>AARP / NAC, 2025</small>
                                </StatCaption>
                            </StatCard>
                        </StatStack>
                    </WhyLayout>
                </CardView>
            </WhySection>

            <WhoSection>
                <CardView>
                    <Label>Who it's for</Label>
                    <SectionTitle>Two kinds of families. One shared need.</SectionTitle>
                    <WhoIntro>A Story is used by adult children capturing a parent's story, and by senior living communities that understand the whole person.</WhoIntro>

                    <WhoCards>
                        <WhoCard>
                            <Label>For families</Label>
                            <CardTitle>The gift no one knew they needed.</CardTitle>
                            <Paragraph>Adult children use A Story to capture their parents' and grandparents' stories before it's too late. It's a birthday gift, a holiday project, a "just because I wanted to know" act of love.</Paragraph>
                            <Paragraph>One family member can carry the whole project &mdash; or the whole family can contribute. A grandmother in one city, a granddaughter in another, building the same archive together.</Paragraph>
                        </WhoCard>

                        <WhoCard>
                            <GoldLabel>For senior living &amp; memory care</GoldLabel>
                            <CardTitle>Dignity through story.</CardTitle>
                            <Paragraph>A Story is used in senior living communities and memory care settings as a gentle, meaningful activity &mdash; a way for residents to feel heard, for families to stay connected across distances, and for staff to understand the whole person, not just the patient.</Paragraph>
                            <Paragraph>Reminiscence has well-documented benefits for cognitive health and emotional well-being. A Story makes it beautiful.</Paragraph>
                            <Link to="/instituition">
                                <GhostButton>Inquire about partnerships<Arrow>&rarr;</Arrow></GhostButton>
                            </Link>
                        </WhoCard>
                    </WhoCards>
                </CardView>
            </WhoSection>

            <WhyNowSection>
                <CardView>
                    <GoldLabel>Why now, not later</GoldLabel>
                    <WhyNowTitle>Three reasons the window is narrower than you think.</WhyNowTitle>

                    <WhyNowGrid>
                        <WhyNowCard>
                            <WhyNowNum>1</WhyNowNum>
                            <WhyNowCardTitle>The window is narrowing.</WhyNowCardTitle>
                            <WhyNowText>1.4 billion people will be aged 60+ by 2030. Every day, 10,000 Americans cross 65. The generation that holds the stories is not waiting for us to get around to asking.</WhyNowText>
                        </WhyNowCard>
                        <WhyNowCard>
                            <WhyNowNum>2</WhyNowNum>
                            <WhyNowCardTitle>Families live apart.</WhyNowCardTitle>
                            <WhyNowText>Distance has replaced the Sunday table. The casual conversations that used to happen at dinner &mdash; the ones where stories just came out &mdash; don't happen anymore. Distance is not an excuse A Story accepts.</WhyNowText>
                        </WhyNowCard>
                        <WhyNowCard>
                            <WhyNowNum>3</WhyNowNum>
                            <WhyNowCardTitle>The tool finally exists.</WhyNowCardTitle>
                            <WhyNowText>Voice AI can now hold a patient, warm, adaptive interview &mdash; asking follow-ups, listening without rushing, sensing when to slow down. For the first time, someone is always available to ask.</WhyNowText>
                        </WhyNowCard>
                    </WhyNowGrid>
                </CardView>
            </WhyNowSection>

            <PrivacySection>
                <CardView>
                    <GoldLabel>Privacy &amp; trust</GoldLabel>
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
                            <SectionTitle>He never asked. Then it was almost too late.</SectionTitle>
                            <Paragraph>Two of Daniel's uncles had strokes within the same year. They survived. The chance to ask didn't.</Paragraph>
                            <Blockquote>"I realized I didn't know how my grandparents met. I'd spent years learning how the world works &mdash; and never once turned that attention to the people who shaped mine."</Blockquote>
                            <Paragraph>The stories were leaving before the people were. A Story is his answer.</Paragraph>
                            <Link to="/story">
                                <GhostButton>Read Daniel's full story <Arrow>&rarr;</Arrow></GhostButton>
                            </Link>
                        </div>

                        <FounderPhoto>
                            <img src={daniel} alt="Daniel Hoang Nguyen, Founder of A Story"/>
                        </FounderPhoto>
                    </FounderLayout>
                </CardView>
            </FounderSection>

            <CtaSection>
                <CardView>
                    <FoundingBadge>Founding families &middot; limited spots</FoundingBadge>
                    <Label>See it in action.</Label>
                    <CtaTitle>The most meaningful gift<br />you can give.</CtaTitle>
                    <CtaSub>Join our founding families. We'll walk you through the full experience &mdash; and the first conversation starts the same day.</CtaSub>
                    <CtaActions>
                        <Link to="/signup">
                            <PrimaryButton>Get early access</PrimaryButton>
                        </Link>
                        <Link to="/experience">
                            <OutlineButton>See the experience</OutlineButton>
                        </Link>
                    </CtaActions>
                </CardView>
            </CtaSection>
        </FamilyContainer>
    );
};

export default Families;