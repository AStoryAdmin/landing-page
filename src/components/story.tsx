import { CONTACT } from '../lib/contact';
import Seo from './ui/Seo';
import { breadcrumbSchema, organizationSchema } from '../lib/seo';
import {Container, ContainerDark, StoryHero, HeroTitle, HeroSub, Byline, StorySection, StoryDark, Paragraph, Emphasis, ChapterHeadline, PullQuote, PullQuoteText, StoryDivider, SigInitial, SigDetails, GhostButton, Arrow, TeamSection, Label, SectionTitle, TeamGrid, TeamCard, TeamPhoto, TeamInfo, TeamRole, TeamBio, MissionSection, MissionText, MissionSub, CtaSection, CtaTitle, CtaSub, HeroActions, PrimaryButtonAnchor, OutlineButtonLink} from './story.styles';
import danielPhoto from './../assets/astoryDaniel.webp';
import baoPhoto from './../assets/astoryBao.webp';

/**
 * The founder's story.
 *
 * Restructured to open on the rupture rather than on the résumé. The previous
 * version spent its first two sections establishing that Daniel is a finance
 * academic before anything happened, which is the wrong order for a page
 * somebody clicked out of curiosity and will give thirty seconds to. The
 * background now arrives after the strokes, as context for why the loss
 * registered the way it did, and it earns more there than it did as setup.
 *
 * The ending changed too, and it is the reason the page now supports the rest
 * of the site instead of arguing against it. The uncles lived. The deadline
 * was never death — it was forgetting, which starts years earlier and quietly.
 * That is the same claim /family makes about the everyday, told by the person
 * it happened to.
 */

const Story = () => {
    return (
        <>
            <Seo
                title="Our story — why A Story exists"
                description="Two of my uncles had strokes in the same year. They lived. The stories went first. Why A Story was built, told by the person who built it."
                path="/story"
                schema={[
                    organizationSchema(),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Our story', path: '/story' },
                    ]),
                ]}
            />
            <StoryHero>
                <Container>
                    <Label>A note from the founder</Label>
                    <HeroTitle>
                        They survived. <br />
                        <Emphasis>The stories didn&rsquo;t.</Emphasis>
                    </HeroTitle>
                    <HeroSub>Two strokes in one year, and everything I had assumed I still had time for.</HeroSub>
                    <Byline>&mdash;Daniel Hoang Nguyen &middot; Founder, A Story &mdash;</Byline>
                </Container>
            </StoryHero>

            <StorySection>
                <Container>
                    <Paragraph>Two of my uncles had strokes within months of each other. They lived &mdash; I want to say that first, because what follows is not a story about dying.</Paragraph>
                    <Paragraph>I watched men who had carried our family&rsquo;s history, who knew the names and the reasons and the way we got here, struggle to find words that had always come easily. And it landed the way a proof lands when you finally see it: <Emphasis>the stories were leaving first.</Emphasis> Before anything else. Going quiet while the people were still in the room with me.</Paragraph>
                </Container>
            </StorySection>

            <StoryDark>
                <ContainerDark>
                    <ChapterHeadline>So I did what I always do. I started doing the math.</ChapterHeadline>
                    <Paragraph>How many conversations had I assumed I would have someday? How many questions had I been saving for a later that was, quietly, running out?</Paragraph>
                    <Paragraph>I did not know how my grandparents met. I did not know what my uncles had been afraid of, or proudest of, or what they would have done differently. I am a finance researcher &mdash; I have spent my adult life learning to read signal out of systems, on a track toward a PhD and a quiet career teaching it. I had never once turned that attention on the people who made mine.</Paragraph>
                    <PullQuote>
                        <PullQuoteText>&ldquo;There&rsquo;s no model for that loss. No regression that tells you what a story was worth. You just feel it &mdash; a door closing in a room you didn&rsquo;t know you needed.&rdquo;</PullQuoteText>
                    </PullQuote>
                </ContainerDark>
            </StoryDark>

            <StorySection>
                <Container>
                    <ChapterHeadline>Here is the part I had wrong.</ChapterHeadline>
                    <Paragraph>I had always assumed the deadline was death. It isn&rsquo;t. My uncles are alive. I can call them this afternoon, and I do.</Paragraph>
                    <Paragraph>What I cannot get back is the version of them that could tell me about 1974 in their own words, unprompted, the way it used to come out at the table when nobody was trying. That version left earlier, and nobody announced it.</Paragraph>
                    <Paragraph><Emphasis>The window does not close when someone dies. It closes quietly, years before that, in the ordinary weeks nobody thought to record.</Emphasis></Paragraph>
                </Container>
            </StorySection>

            <StorySection>
                <Container>
                    <Paragraph>So I stopped waiting for someday and started building A Story.</Paragraph>
                    <Paragraph>The idea is simple because the need is simple: someone, finally, to ask. Not a journalist. Not a therapist. A warm presence that sits with the people you love and says: <Emphasis>I have time. Tell me everything.</Emphasis> And then turns what they share into something a family can keep &mdash; in their own voice, in their own words, arranged into the shape of a life.</Paragraph>
                    <Paragraph>It calls them. They answer the phone and talk. That is the entire thing we ask of the person whose story it is, because every extra step is a place where this quietly does not happen.</Paragraph>

                    <StoryDivider></StoryDivider>

                    <Paragraph>Somewhere tonight there is a parent carrying a story nobody has ever asked about. A grandparent with a whole life in their chest, waiting for someone to open the door. They will not bring it up themselves. They do not want to be a burden. They are waiting to be asked.</Paragraph>
                    <Paragraph><Emphasis>So ask them. Not once, and not eventually &mdash; this week, and again next month, for as long as there is more to hear.</Emphasis></Paragraph>
                    <Paragraph>I am a real person, and I would genuinely love to hear from you.</Paragraph>

                    <StoryDivider>
                        <SigInitial>D</SigInitial>
                        <SigDetails>
                            <strong>Daniel Hoang Nguyen</strong>
                            <span>Founder, A Story &middot; Finance Master&rsquo;s, UIUC</span>
                            <a href="https://www.linkedin.com/in/daniel-hoang-nguyen-65bb05224/" target="_blank" rel="noopener noreferrer">
                                <GhostButton>Connect on LinkedIn <Arrow aria-hidden="true">&rarr;</Arrow></GhostButton>
                            </a>
                        </SigDetails>
                    </StoryDivider>
                </Container>
            </StorySection>

            <TeamSection>
                <Container>
                    <Label>The team</Label>
                    <SectionTitle>Two people who think this matters.</SectionTitle>

                    <TeamGrid>
                        <TeamCard>
                            <TeamPhoto>
                                <img src={danielPhoto} alt="Daniel Hoang Nguyen" loading="lazy" decoding="async" />
                            </TeamPhoto>
                            <TeamInfo>
                                <strong>Daniel Hoang Nguyen</strong>
                                <TeamRole>Founder &amp; CEO</TeamRole>
                                <TeamBio>Finance Master&rsquo;s, University of Illinois Urbana-Champaign. <br /> Started A Story after watching his uncles lose the words before they lost anything else.</TeamBio>
                            </TeamInfo>
                        </TeamCard>

                        {/*
                          * Bao's bio is still a résumé. One sentence about why he
                          * personally cares — his own grandparents, a story he
                          * nearly lost — would do more work than the credentials
                          * do. Left factual rather than invented; Bao should
                          * supply his own line.
                          */}
                        <TeamCard>
                            <TeamPhoto>
                                <img src={baoPhoto} alt="Bao Vo" loading="lazy" decoding="async" />
                            </TeamPhoto>
                            <TeamInfo>
                                <strong>Bao Vo</strong>
                                <TeamRole>Co-Founder &amp; COO</TeamRole>
                                <TeamBio>Electrical &amp; Computer Engineering, University of Michigan. <br /> Background in semiconductor research, healthcare commercialization, and engineering operations. Leads pilots, product strategy, and go-to-market.</TeamBio>
                            </TeamInfo>
                        </TeamCard>
                    </TeamGrid>
                </Container>
            </TeamSection>

            <MissionSection>
                <Container>
                    <Label>The mission</Label>
                    <MissionText>Give every family <Emphasis>someone, finally, to ask</Emphasis> &mdash; and somewhere for the answers to keep going.
                    </MissionText>
                    <MissionSub> We measure success in stories told, not metrics. In families who have something they didn&rsquo;t before. In grandchildren who grow up knowing where they come from.</MissionSub>
                </Container>
            </MissionSection>

            <CtaSection>
                <Container>
                    <Label>Start the record.</Label>
                    <CtaTitle>The best day to begin is an ordinary one.</CtaTitle>
                    <CtaSub>A 20-minute conversation &mdash; then a lifetime of stories, organized and yours, with room left for all the ones still to come.</CtaSub>
                    <HeroActions>
                        <PrimaryButtonAnchor href={CONTACT.gift}>Gift a story</PrimaryButtonAnchor>
                        <OutlineButtonLink to="/experience">See the experience</OutlineButtonLink>
                    </HeroActions>
                </Container>
            </CtaSection>
        </>
    );
};

export default Story;
