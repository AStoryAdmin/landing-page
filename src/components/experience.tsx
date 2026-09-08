import { CONTACT } from '../lib/contact';
import { PRICE } from '../lib/pricing';
import Seo from './ui/Seo';
import { breadcrumbSchema, organizationSchema } from '../lib/seo';
import {ExperienceContainer, OpeningContainer, CardView, Intro, Title, Description, HighlightText, DemoButton, DemoButtonAnchor, FamilyButton, InstructionContainer, InstructTitle, StepIntro, Card, Grid, StepCard, Subtitle, Column, OddColumn, StepNumber, StepTitle, Content, RoleColumn, Arrow, AIContainer, Demo, Summary, DemoIntro, InteractiveBookContainer, AccessContainer, Note, BookIntro, BookTitle, BookSubtitle, BulletList, BulletItem, Bold, PriceBox, Price, PriceDivider, PriceDetails, BookImg, DarkIntro, DarkTitle, DarkDescription} from './experience.styles'
import {TagRow, Tag, Divider} from './home.styles';
import FlipBook from './flipBook';
import DemoPhone from './demoPhone';
import bookImg from './../assets/astoryHardcoverBook.webp';

const Experience = () => {
    return (
        <ExperienceContainer>
            <Seo
                title="What they receive — from the first question to a printed book"
                description="What happens after you send the link: a guided voice interview, memory cards organized by chapter, contributions from the whole family, and a hardcover book shipped to the door."
                path="/experience"
                schema={[
                    organizationSchema(),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'The experience', path: '/experience' },
                    ]),
                ]}
            />
            <OpeningContainer>
                <CardView>
                    <Intro>The Experience</Intro>
                    <Title>What happens after you <HighlightText>send the link.</HighlightText></Title>
                    <Description>A gentle, unhurried process designed for someone who has never opened an app in their life. They answer the phone; A Story does the rest. There is nothing at all for you to run.</Description>
                    <a href="#demo" style={{textDecoration: 'none'}}>
                        <DemoButton as="span" to="#demo">Watch the conversation</DemoButton>
                    </a>
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
                            <StepTitle>Set it up for them</StepTitle>
                            <Content>
                                Open A Story and start an archive for the person whose story you want to keep. Name them, note their birthday, choose what chapter of life to begin in, and say when it is a good time to call. Sixty seconds, done once — and you can do it on their behalf.
                            </Content>
                        </Column>

                        <Column>
                            <StepNumber>2</StepNumber>
                            <StepTitle>The phone rings</StepTitle>
                            <Content>
                                They answer it the way they answer any call. A warm voice asks open, unhurried questions — about childhood, family, work, love, and what they've learned — and follows wherever the story leads. No two conversations are the same, and nothing is asked of them but talking.
                            </Content>
                        </Column>

                        <Column>
                            <StepNumber>3</StepNumber>
                            <StepTitle>Memories take shape</StepTitle>
                            <Content>
                                Every conversation becomes a memory card — the summary — with the full transcript underneath it and the moments worth hearing kept as audio. Attach photos to anchor memories to faces and places. A full life timeline builds itself as you go.
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
                                <StepTitle>Turns rambling speech into a card you can read in a minute.</StepTitle>
                                <Content>
                                    Stories come out unpolished. A Story shapes them into something worth reading &mdash; in the storyteller's own voice &mdash; without ever throwing the original away. The card is the summary; the transcript and the audio stay underneath it.
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
                        <Tag>Phone call</Tag><Arrow>&rarr;</Arrow>
                        <Tag>Memory card</Tag><Arrow>&rarr;</Arrow>
                        <Tag>Full transcript</Tag><Arrow>&rarr;</Arrow>
                        <Tag>Voice highlights</Tag><Arrow>&rarr;</Arrow>
                        <Tag>Life timeline</Tag><Arrow>&rarr;</Arrow>
                        <Tag>Printed book</Tag>
                    </TagRow>

                    <Divider />
                    <Demo id="demo">
                        <Summary>
                            <DemoIntro>Try it</DemoIntro>
                            <InstructTitle>A conversation unlike any other.</InstructTitle>
                            <Subtitle>A Story's AI doesn't interrogate &mdash; it listens. It asks one warm question, hears the answer, then follows naturally wherever the story leads. Below is a real example.</Subtitle>
                        </Summary>
                        <DemoPhone />
                    </Demo>
                </CardView>
            </AIContainer>

            <InteractiveBookContainer id="book">
                <CardView>
                    <Intro>See a real example</Intro>
                    <Title>Tap through <HighlightText>Margaret's story.</HighlightText></Title>
                    <Description>Generated from 30 minutes of voice interview, family photos, and timeline-linked memories. Use the arrows below to move through the album &mdash; or click a page directly.</Description>
                    <FlipBook />
                    <Note>A Story &middot; Margaret's Archive &middot; 1952-2026</Note>

                    <Demo>
                        <Summary>
                            <BookIntro>The keepsake</BookIntro>
                            <BookTitle>A real book. Something you can hold.</BookTitle>
                            <BookSubtitle>Any chapter can become something permanent: a hardcover memoir of your family's words and photographs, printed and bound, ready to live on a shelf for decades. The book is the edited version &mdash; the archive keeps everything it could not fit.</BookSubtitle>
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
                                    <Bold>The full record stays behind it.</Bold> The printed page is a summary. Open the same story in the archive and the whole transcript is there, word for word, with the voice highlights kept as audio &mdash; the laugh, the pause, the way only they say a name.
                                </BulletItem>
                                <BulletItem>
                                    <Bold>And it is not the last page.</Bold> Printing a book closes nothing. The archive keeps growing, and you can print another volume whenever there is more to print.
                                </BulletItem>
                            </BulletList>

                            <PriceBox>
                                <Price>{PRICE.gift}</Price>
                                <PriceDivider />
                                <PriceDetails>
                                    <span>One payment &middot; hardcover included</span>
                                    <span>Ships 3&ndash;4 weeks after you approve it</span>
                                </PriceDetails>
                            </PriceBox>
                        </Summary>

                        <BookImg>
                            <img src={bookImg} alt="An open A Story hardcover memoir on a table, photographs printed beside the stories they belong to" loading="lazy" decoding="async" />
                        </BookImg>
                    </Demo>
                </CardView>
            </InteractiveBookContainer>

            <AccessContainer>
                <CardView>
                    <DarkIntro>Ready to begin?</DarkIntro>
                    <DarkTitle>Start the record. It does not have to be finished.</DarkTitle>
                    <DarkDescription>You buy it once and send one link. They answer the phone and talk when they feel like it. The archive and the book belong to the whole family, and there is always room for the next conversation.</DarkDescription>
                    <DemoButtonAnchor href={CONTACT.gift}>Gift a story</DemoButtonAnchor>
                    <FamilyButton to="/family">Why it matters</FamilyButton>
                </CardView>
            </AccessContainer>
        </ExperienceContainer>
)};
export default Experience;