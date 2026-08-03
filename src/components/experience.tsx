import {ExperienceContainer, OpeningContainer, CardView, Intro, Title, Description, HighlightText, DemoButton, FamilyButton, InstructionContainer, InstructTitle, StepIntro, Card, Grid, StepCard, Subtitle, Column, OddColumn, StepNumber, StepTitle, Content, RoleColumn, Arrow, AIContainer, Demo, Summary, PhoneDemo, DemoIntro, StatusBar, StatusTime, Screen, PlayDemo, PlayDemoButton, InteractiveBookContainer, AccessContainer, Note, BookIntro, BookTitle, BookSubtitle, BulletList, BulletItem, Bold, PriceBox, Price, PriceDivider, PriceDetails, BookImg, DarkIntro, DarkTitle, DarkDescription} from './experience.styles'
import {TagRow, Tag, Divider} from './home.styles';
import FlipBook from './flipBook';
import phonebar from './../assets/statusBar.png';
import bookImg from './../assets/seniorInterview.png';

const Experience = () => {
    return (
        <ExperienceContainer>
            <OpeningContainer>
                <CardView>
                    <Intro>The Experience</Intro>
                    <Title>See how a life becomes <HighlightText>a story.</HighlightText></Title>
                    <Description>From the first question to a printed book at your door — a gentle, unhurried process designed for anyone, regardless of age or technology experience.</Description>
                    {/* scroll down to demo phone hasnt been implemented */}
                    <DemoButton>Watch the conversation</DemoButton>
                </CardView>
            </OpeningContainer>

            <InstructionContainer>
                <CardView>
                    <StepIntro>Step by step</StepIntro>
                    <InstructTitle>Five steps from first word to finished book.</InstructTitle>
                    <Subtitle>A Story does the hard work &mdash; organizing, shaping, laying out. All you have to do is show up and talk.</Subtitle>
                    <StepCard>
                        <Column>
                            <StepNumber>1</StepNumber>
                            <StepTitle>Invite a loved one</StepTitle>
                            <Content>
                                Open A Story and start a session for the person whose story you want to keep. Name them, note their birthday, choose what chapter of life to begin in. It takes sixty seconds.
                            </Content>
                        </Column>

                        <Column>
                            <StepNumber>2</StepNumber>
                            <StepTitle>A Story listens</StepTitle>
                            <Content>
                                A warm AI guide asks open, unhurried questions — about childhood, family, work, love, and what they've learned. No two conversations are the same. The AI follows where the story leads.
                            </Content>
                        </Column>

                        <Column>
                            <StepNumber>3</StepNumber>
                            <StepTitle>Memories take shape</StepTitle>
                            <Content>
                                Every answer becomes a memory card, organized by chapter of life. Attach photos to anchor memories to faces and places. A full life timeline builds itself as you go.
                            </Content>
                        </Column>

                        <Column>
                            <StepNumber>4</StepNumber>
                            <StepTitle>Family adds their voice</StepTitle>
                            <Content>
                                Share the archive with family members anywhere. A daughter adds a photo. A grandson corrects a name. A grandchild adds their own memory. The archive grows richer with every contribution.
                            </Content>
                        </Column>

                        <OddColumn>
                            <StepNumber>5</StepNumber>
                            <Column>
                                <StepTitle>The book arrives</StepTitle>
                                <Content>
                                    When you're ready, A Story prints and ships a hardcover keepsake &mdash; edited, laid out like a memoir, and bound on acid-free paper. Something to live on a shelf for generations.
                                </Content>
                            </Column>
                        </OddColumn>
                    </StepCard>
                </CardView>
            </InstructionContainer>

            <AIContainer>
                <CardView>
                    <StepIntro>The intelligence behind it</StepIntro>
                    <InstructTitle>One AI. Four jobs it does so you don't have to.</InstructTitle>
                    <Subtitle>Most tools just record. A Story understands &mdash; and does the work of an entire editorial team, invisibly.</Subtitle>
                    <Card>
                        <Grid>
                            <RoleColumn>
                                <StepIntro>Interviewer</StepIntro>
                                <StepTitle>Asks the questions you'd never think to ask.</StepTitle>
                                <Content>
                                    Warm, adaptive follow-up questions that follow wherever the story leads. No two conversations are the same.
                                </Content>
                            </RoleColumn>
                            <RoleColumn>
                                <StepIntro>Editor</StepIntro>
                                <StepTitle>Turns rambling speech into clean memory cards.</StepTitle>
                                <Content>
                                    Stories come out unpolished. A Story shapes them into something worth reading &mdash; in the storyteller's own voice.   
                                </Content>
                            </RoleColumn>
                            <RoleColumn>
                                <StepIntro>Historian</StepIntro>
                                <StepTitle>Identifies people, places, dates, and events.</StepTitle>
                                <Content>
                                    Every memory is tagged, dated, and linked to the people and places mentioned &mdash; so the archive builds itself.
                                </Content>
                            </RoleColumn>
                            <RoleColumn>
                                <StepIntro>Biographer</StepIntro>
                                <StepTitle>Organizes scattered stories into chapters.</StepTitle>
                                <Content>
                                    Childhood, love, family, legacy &mdash; A Story arranges a lifetime of memories into the shape of a real memoir.
                                </Content>
                            </RoleColumn>
                        </Grid>
                    </Card>

                    <TagRow>
                        <Tag>Voice</Tag><Arrow>&rarr;</Arrow>
                        <Tag>Memory card</Tag><Arrow>&rarr;</Arrow>
                        <Tag>Life timeline</Tag><Arrow>&rarr;</Arrow>
                        <Tag>Printed book</Tag>
                    </TagRow>

                    <Divider />
                    <Demo>
                        <Summary>
                            <DemoIntro>Try it</DemoIntro>
                            <InstructTitle>A conversation unlike any other.</InstructTitle>
                            <Subtitle>A Story's AI doesn't interrogate &mdash; it listens. It asks one warm question, hears the answer, then follows naturally wherever the story leads. Below is a real example.</Subtitle>
                        </Summary>
                        <PhoneDemo>
                            <StatusBar>
                                <StatusTime>9:41</StatusTime>
                                <img src={phonebar} alt="Phone status bar" width="80" height="50"/>
                            </StatusBar>
                            <Screen></Screen>
                            <PlayDemo>
                                <PlayDemoButton>&#9658;</PlayDemoButton>
                            </PlayDemo>
                        </PhoneDemo>
                    </Demo>
                </CardView>
            </AIContainer>

            <InteractiveBookContainer>
                <CardView>
                    <Intro>See a real example</Intro>
                    <Title>Tap through <HighlightText>Margaret's story.</HighlightText></Title>
                    <Description>Generated from 30 minutes of voice interview, family photos, and timeline-linked memories. Click the right page to turn forward, left to go back.</Description>
                    <FlipBook />
                    <Note>A Story &middot; Margaret's Archive &middot; 1952-2026</Note>

                    <Demo>
                        <Summary>
                            <BookIntro>The keepsake</BookIntro>
                            <BookTitle>A real book. Something you can hold.</BookTitle>
                            <BookSubtitle>In a world where everything is digital and everything disappears, A Story makes something permanent. A hardcover memoir &mdash; your family's words and photos, printed and bound, ready to live on a shelf for decades.</BookSubtitle>
                            <BulletList>
                                <BulletItem>
                                    <Bold>Hardcover, lay-flat binding.</Bold> Sewn signatures, acid-free paper, a cover you'll recognize on a bookshelf in fifty years.
                                </BulletItem>
                                <BulletItem>
                                    <Bold>Organized by chapter of life.</Bold> Childhood, school years, career, love, family, legacy &mdash; laid out like a memoir, not a scrapbook.
                                </BulletItem>
                                <BulletItem>
                                    <Bold>Photos alongside stories.</Bold> Every image printed next to the memory it belongs to, in the context that gives it meaning.
                                </BulletItem>
                                <BulletItem>
                                    <Bold>A digital archive too.</Bold> Memory cards, voice notes, and the life timeline live on your phone &mdash; organized and searchable, always.
                                </BulletItem>
                            </BulletList>

                            <PriceBox>
                                <Price>$79 &ndash; $129</Price>
                                <PriceDivider />
                                <PriceDetails>
                                    <span>Hardcover, ships in 3&ndash;4 weeks</span>
                                    <span>Included free with your Family Archive plan</span>
                                </PriceDetails>
                            </PriceBox>
                        </Summary>

                        <BookImg>
                            <img src={bookImg} alt="The keepsake book" />
                        </BookImg>
                    </Demo>
                </CardView>
            </InteractiveBookContainer>

            <AccessContainer>
                <CardView>
                    <DarkIntro>Ready to begin?</DarkIntro>
                    <DarkTitle>Start capturing their story today.</DarkTitle>
                    <DarkDescription>From the first question to a printed book at your door — a gentle, unhurried process designed for anyone, regardless of age or technology experience.</DarkDescription>
                    <DemoButton to="/signup">Get early access</DemoButton>
                    <FamilyButton to="/family">For Family &amp; Care</FamilyButton>
                </CardView>
            </AccessContainer>
        </ExperienceContainer>
)};
export default Experience;