import { PRICE } from '../lib/pricing';
import { CHAPTERS, DEPTHS, QUESTION_COUNT, SENSITIVE_COUNT, SENSITIVE_LINE } from '../lib/product';
import Seo from './ui/Seo';
import { breadcrumbSchema, organizationSchema } from '../lib/seo';
import {ExperienceContainer, OpeningContainer, CardView, Intro, Title, Description, HighlightText, DemoButton, FamilyButton, InstructionContainer, InstructTitle, StepIntro, Card, Grid, StepCard, Subtitle, Column, OddColumn, StepNumber, StepTitle, Content, RoleColumn, Arrow, AIContainer, Demo, Summary, DemoIntro, InteractiveBookContainer, AccessContainer, Note, BookIntro, BookTitle, BookSubtitle, BulletList, BulletItem, Bold, PriceBox, Price, PriceDivider, PriceDetails, BookImg, DarkIntro, DarkTitle, DarkDescription, NextContainer, NextBadge, NextTitle, NextLead, NextGrid, NextCard, NextCaveat, ChaptersContainer, ChapterGrid, ChapterCard, DepthLadder, DepthStep, SensitiveNote} from './experience.styles'
import {TagRow, Tag, Divider} from './home.styles';
import FlipBook from './flipBook';
import { Link } from 'react-router-dom';
import { SCENARIOS } from '../lib/demoScripts';
import DemoPhone from './demoPhone';
import bookImg from './../assets/astoryHardcoverBook.webp';

const Experience = () => {
    return (
        <ExperienceContainer>
            <Seo
                title="How it works — from the first question to a printed memoir"
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
                                They answer it the way they answer any call. A warm voice asks from 504 questions across eleven chapters, follows wherever the answer goes, and never asks the same thing twice. It starts gently and gets deeper as the archive fills. No two conversations are the same, and nothing is asked of them but talking.
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
                                There is a whole chapter called From the family, and it is the one that makes this a documentary rather than a diary. A daughter adds a photo. A grandson corrects a name. Someone who was in the room tells the same afternoon completely differently. Every voice sits on the same moment.
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
                                    Eleven chapters, from the generation before them to what the grandchildren remember &mdash; A Story files every memory where it belongs.
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
                            <Subtitle>A Story's AI doesn't interrogate &mdash; it listens. It asks one warm question, hears the answer, then follows whatever the person let slip on the way to answering it. Here Errol mentions a sanatorium in the middle of a sentence about bread, and then refuses to say more &mdash; watch what a no does to the rest of the call. <Link to="/#demo">Two more conversations are on the home page.</Link></Subtitle>
                        </Summary>
                        {/* The one where somebody declines a question: the /experience
                            page is read by people who are already convinced this is a
                            nice idea and are now worried it will push a relative. */}
                        <DemoPhone scenario={SCENARIOS[1]} />
                    </Demo>
                </CardView>
            </AIContainer>

            <ChaptersContainer id="chapters">
                <CardView>
                    <StepIntro>The eleven chapters</StepIntro>
                    <InstructTitle>A life does not fit into &ldquo;childhood, career, legacy&rdquo;.</InstructTitle>
                    <Subtitle>
                        These are the chapters A Story actually asks in, and each one was argued over.
                        All {QUESTION_COUNT} questions live inside them, and the archive fills them in
                        whatever order the storyteller feels like talking.
                    </Subtitle>

                    <ChapterGrid>
                        {CHAPTERS.map((c) => (
                            <ChapterCard key={c.name}>
                                <span className="num" aria-hidden="true" />
                                <h3>{c.name}</h3>
                                <p>{c.blurb}</p>
                                {c.note && <span className="why">{c.note}</span>}
                            </ChapterCard>
                        ))}
                    </ChapterGrid>

                    <Divider />

                    <StepIntro>How far it goes</StepIntro>
                    <InstructTitle>The questions get harder as the archive earns it.</InstructTitle>
                    <Subtitle>
                        A brand-new archive is only asked warm-ups. The questions that cost something to
                        answer arrive once somebody has shown they mean it &mdash; which is the difference
                        between conducting an interview and handing over a list.
                    </Subtitle>

                    <DepthLadder>
                        {DEPTHS.map((d) => (
                            <DepthStep key={d.level} style={{ borderTopWidth: `${d.level + 1}px` }}>
                                <p className="name">{d.level}. {d.name}</p>
                                <p>{d.blurb}</p>
                            </DepthStep>
                        ))}
                    </DepthLadder>

                    <SensitiveNote>
                        <span className="quote">&ldquo;{SENSITIVE_LINE}&rdquo;</span>
                        <span className="gloss">
                            {SENSITIVE_COUNT} of the {QUESTION_COUNT} questions touch loss, hardship,
                            rupture or things never said out loud. They arrive with that line under them
                            rather than a warning triangle &mdash; and skipping one costs nothing.
                        </span>
                    </SensitiveNote>
                </CardView>
            </ChaptersContainer>

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
                                    <Bold>Organized into the eleven chapters.</Bold> The same ones the archive uses, from where the family came from to what the grandchildren remember &mdash; laid out like a memoir, not a scrapbook.
                                </BulletItem>
                                <BulletItem>
                                    <Bold>Photos alongside stories.</Bold> Every image printed next to the memory it belongs to, in the context that gives it meaning.
                                </BulletItem>
                                <BulletItem>
                                    <Bold>The full record stays behind it.</Bold> The printed page is a summary. Open the same story in the archive and the whole transcript is there, word for word, with the voice highlights kept as audio &mdash; the laugh, the pause, the way only they say a name.
                                </BulletItem>
                                <BulletItem>
                                    <Bold>And it is not the last page.</Bold> The book is priced on its own rather than bundled into a package, precisely so that printing one closes nothing. The archive keeps growing, and you can order another volume from it in five years.
                                </BulletItem>
                            </BulletList>

                            <PriceBox>
                                <Price>{PRICE.book}</Price>
                                <PriceDivider />
                                <PriceDetails>
                                    <span>A hardcover, edited and laid out &middot; {PRICE.bookPages}, {PRICE.bookOverage}</span>
                                    <span>Ships 3&ndash;4 weeks after you approve the proof</span>
                                </PriceDetails>
                            </PriceBox>
                        </Summary>

                        <BookImg>
                            <img src={bookImg} alt="An open A Story hardcover memoir on a table, photographs printed beside the stories they belong to" loading="lazy" decoding="async" />
                        </BookImg>
                    </Demo>
                </CardView>
            </InteractiveBookContainer>

            <NextContainer id="next">
                <CardView>
                    <NextBadge>Working today</NextBadge>
                    <NextTitle>The years you already documented.</NextTitle>
                    <NextLead>
                        Everything above is about the life nobody wrote down. But part of the last twenty
                        years <em>was</em> written down &mdash; a decade of Facebook posts, a journal app,
                        notes on a phone. Making somebody retype all that is the fastest way to lose them,
                        so A Story reads it instead. Export the file from wherever it lives, hand it over,
                        and the memories come out of it.
                    </NextLead>

                    <NextGrid>
                        <NextCard>
                            <h3>Hand it the export file.</h3>
                            <p>
                                Facebook, Instagram, Day One and other journal apps, Apple Notes, Google
                                Keep, or a plain CSV. Every platform worth importing from offers an export
                                &mdash; that is what GDPR bought us &mdash; and an export is just a file.
                            </p>
                        </NextCard>
                        <NextCard>
                            <h3>It dates and files itself.</h3>
                            <p>
                                A Story reads a year out of each entry, gives it a title, and puts it in the
                                chapter it belongs to &mdash; landing on the same timeline as the
                                conversations. Duplicates are flagged rather than piled up.
                            </p>
                        </NextCard>
                        <NextCard>
                            <h3>Nothing is saved until you say so.</h3>
                            <p>
                                Everything it finds arrives as a list to review. Keep what belongs in the
                                story, drop the rest. The two halves of a life stop being kept in different
                                buildings, without a decade of noise coming with them.
                            </p>
                        </NextCard>
                    </NextGrid>

                    <NextCaveat>
                        <strong>What is not built yet:</strong> connecting an account directly, so the
                        posts arrive without you exporting anything first. That is coming; the file import
                        above works now. Either way the rules are the same &mdash; imported posts and
                        photos belong to the storyteller, are never sold, are never used to train models,
                        and can be removed from the archive as easily as they were added.
                    </NextCaveat>
                </CardView>
            </NextContainer>

            <AccessContainer>
                <CardView>
                    <DarkIntro>Ready to begin?</DarkIntro>
                    <DarkTitle>Start the record. It does not have to be finished.</DarkTitle>
                    <DarkDescription>You buy it once and send one link. They answer the phone and talk when they feel like it. The archive and the book belong to the whole family, and there is always room for the next conversation.</DarkDescription>
                    <DemoButton to="/start">Gift a story</DemoButton>
                    <FamilyButton to="/family">Why it matters</FamilyButton>
                </CardView>
            </AccessContainer>
        </ExperienceContainer>
)};
export default Experience;