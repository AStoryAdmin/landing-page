import {Container, ContainerDark, StoryHero, HeroTitle, HeroSub, Byline, StorySection, StoryDark, Paragraph, Emphasis, ChapterHeadline, PullQuote, PullQuoteText, StoryDivider, SigInitial, SigDetails, GhostButton, Arrow, TeamSection, Label, SectionTitle, TeamGrid, TeamCard, TeamPhoto, TeamInfo, TeamRole, TeamBio, MissionSection, MissionText, MissionSub, CtaSection, FoundingBadge, CtaTitle, CtaSub, HeroActions, PrimaryButton, OutlineButton} from './story.styles';
import { Link } from 'react-router-dom';
import daniel from './../assets/astoryDaniel.png';
import bao from './../assets/astoryBao.png';

const Story = () => {
    return (
        <>
            <StoryHero>
                <Container>
                    <Label>A note from the founder</Label>
                    <HeroTitle>
                        I spent years learning to measure the things that matter. <br />
                        <Emphasis>Then I watched the thing that mattered most start to slip away.</Emphasis>
                    </HeroTitle>
                    <HeroSub>Who I am, and the moment that changed everything I'm building.</HeroSub>
                    <Byline>&mdash;Daniel Hoang Nguyen &middot; Founder, A Story &mdash;</Byline>
                </Container>
            </StoryHero>

            <StorySection>
                <Container>
                    <Paragraph>My name is Daniel. I'm a Finance Master's student at the University of Illinois Urbana-Champaign, on a track toward a PhD and a career as a finance professor. And I'm telling you that because it explains how A Story happened &mdash; and why it almost didn't.</Paragraph>
                    <Paragraph>I've spent my academic life studying systems. Markets, models, the way numbers carry signal about the world. I'm good at it. Good enough that the path ahead was clear: research, tenure, a quiet life of teaching. I wasn't looking for a startup idea. I wasn't looking for anything.</Paragraph>
                </Container>
            </StorySection>

            <StoryDark>
                <ContainerDark>
                        <ChapterHeadline>Then this year, two of my uncles had strokes.</ChapterHeadline>
                        <Paragraph>Not one. Two. Within months of each other.</Paragraph>
                        <Paragraph>I watched it happen. I watched men who had carried our family's history &mdash; who knew the names, the reasons, the way we got here &mdash; suddenly struggle to find words that had always come easily. And it hit me the way a proof hits you when you finally see it: the stories were leaving first. Before anything else. The memories of their own lives, going quiet before the people themselves did.</Paragraph>
                        <Paragraph>I started doing what I always do. I started doing the math. How many conversations had I assumed I'd have someday? How many questions had I been saving for a later that was, quietly, running out? I realized I didn't know how my grandparents met. I didn't know what my uncles were afraid of, what they were proudest of, what they'd do differently. I had spent years studying how to understand the world &mdash; and I had never once turned that attention to the people who shaped mine.</Paragraph>
                        <PullQuote>
                            <PullQuoteText>"There's no model for that loss. No regression that tells you what a story was worth. You just feel it &mdash; a door closing in a room you didn't know you needed."</PullQuoteText>
                        </PullQuote>
                </ContainerDark>
            </StoryDark>

            <StorySection>
                <Container>
                        <Paragraph>So I stopped waiting for someday. I started building A Story.</Paragraph>
                        <Paragraph>The idea is simple because the need is simple: someone, finally, to ask. Not a journalist. Not a therapist. A warm presence that sits with the people you love and says: <Emphasis>I have time. Tell me everything.</Emphasis> And then turns what they share into something a family can keep &mdash; in their own voice, in their own words, arranged into the shape of a life.</Paragraph>
                        <Paragraph>I'm not a lifelong engineer. What I bring is the discipline of a researcher who learned to be patient with hard problems, and a need so personal I can't put it down. I'm not building this because it's a good market. I'm building it because I almost ran out of time, and I think you might be closer to that than you realize too.</Paragraph>

                        <StoryDivider></StoryDivider>

                        <Paragraph>Here's what I know: somewhere tonight, there is a parent who carries a story no one has ever asked about. A grandparent with a whole life in their chest, waiting for someone to open the door. They won't bring it up themselves. They don't want to be a burden. They're waiting to be asked.</Paragraph>
                        <Paragraph><Emphasis>Ask them. Before someday becomes too late.</Emphasis></Paragraph>
                        <Paragraph>I'm a real person, and I'd genuinely love to hear from you.</Paragraph>

                    <StoryDivider>
                        <SigInitial>D</SigInitial>
                        <SigDetails>
                            <strong>Daniel Hoang Nguyen</strong>
                            <span>Founder, A Story &middot; Finance Master's, UIUC</span>
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
                                <img src={daniel} alt="Daniel Hoang Nguyen" />
                            </TeamPhoto>
                            <TeamInfo>
                                <strong>Daniel Hoang Nguyen</strong>
                                <TeamRole>Founder &amp; CEO</TeamRole>
                                <TeamBio>Finance Master's, University of Illinois Urbana-Champaign. <br /> Built A Story because he almost ran out of time to ask &mdash; and thinks you might be closer to that than you realize.</TeamBio>
                            </TeamInfo>
                        </TeamCard>

                        <TeamCard>
                            <TeamPhoto>
                                <img src={bao} alt="Bao Vo" />
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
                    <MissionText>Give every family <Emphasis>someone, finally, to ask</Emphasis> before it's too late.
                    </MissionText>
                    <MissionSub> We measure success in stories told, not metrics. In families who have something they didn't before. In grandchildren who grow up knowing where they come from.</MissionSub>
                </Container>
            </MissionSection>

            <CtaSection>
                <Container>
                    <FoundingBadge>Founding families &middot; limited spots</FoundingBadge>
                    <Label>Don't wait for someday.</Label>
                    <CtaTitle>Someday is how the stories get lost.</CtaTitle>
                    <CtaSub>Join our founding families. A 20-minute conversation with us &mdash; then a lifetime of stories, organized and yours forever.</CtaSub>
                    <HeroActions>
                        <Link to="/signup">
                            <PrimaryButton>Get early access</PrimaryButton>
                        </Link>
                        <Link to="/experience">
                            <OutlineButton>See how it works</OutlineButton>
                        </Link>
                    </HeroActions>
                </Container>
            </CtaSection>
        </>
    );
};

export default Story;