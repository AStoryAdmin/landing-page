import {CardView, BodyContainer, ImageContainer, Intro, Title, ListenText, Description, Buttons, AccessButton, DemoButton, BulletPoints, BulletIcon, InstructionContainer, StepCard, Grid, Column, StepNumber, StepTitle, Content, Links, PurposeContainer, TagRow, Tag, ScaleContainer, ScaleNumber, ScaleContent, ScaleRef, ScaleColumn, ReviewContainer, Heading, StatusFamily, StatusDot, ReviewColumn, ReviewContent, User, Divider, Comparsion, Bold, OurBrand, QuoteContainer, Quote, Subtitle, AccessContainer, FamilyButton} from './body.styles';

const Body = () => {
    return (
        <BodyContainer>
            <ImageContainer>
                <CardView>
                    <Intro> Memory &amp; Life story</Intro>
                    <Title>
                        For the families who haven't asked
                        <ListenText> yet.</ListenText>
                    </Title>
                    <Description>
                        A Story turns voice conversations with your older loved ones into a private family archive &mdash; and a printed keepsake book. Finally, someone to ask, before it's too late.
                    </Description>
                    <Buttons>
                        <AccessButton to="/signup">Start your family's story</AccessButton>
                        <DemoButton>Try the Live Demo</DemoButton>
                    </Buttons>
                    <BulletPoints>
                        <BulletIcon>&#x2713;</BulletIcon> Private &amp; secure
                        <BulletIcon>&#x2713;</BulletIcon> Voice-first &middot; speak or type
                        <BulletIcon>&#x2713;</BulletIcon> Works on any device
                    </BulletPoints> 
                </CardView>   
            </ImageContainer>
        
        
            <InstructionContainer>
                <CardView>
                    <Intro>How it works</Intro>
                    <Title>
                        Talk. Listen.
                        <ListenText> Keep.</ListenText>
                    </Title>
                    <StepCard>
                        <Grid>
                            <Column>
                                <StepNumber>1</StepNumber>
                                <StepTitle>Talk</StepTitle>
                                <Content>
                                    A warm AI guide asks the questions that open the door &mdash; about childhood, family, love, work, and legacy. Stories come out in their own words, at their own pace. No technology experience required.
                                </Content>
                                <Links>See the conversation</Links>
                            </Column>
                            <Column>
                                <StepNumber>2</StepNumber>
                                <StepTitle>Listen</StepTitle>
                                <Content>
                                    Every answer becomes a memory card &mdash; searchable, organized by chapter of life, and beautiful. Photos attach directly to the moment they belong to. A whole life, finally in its place.
                                </Content>
                                <Links>Try the demo</Links>
                            </Column>
                            <Column>
                                <StepNumber>3</StepNumber>
                                <StepTitle>Keep</StepTitle>
                                <Content>
                                    A printed hardcover book arrives at your door &mdash; a memoir, laid out by chapter, photos alongside the stories they belong to. A digital archive lives on your phone. Both last forever.
                                </Content>
                                <Links>See the keepsake</Links>
                            </Column>
                        </Grid>
                    </StepCard>
                </CardView>
            </InstructionContainer>

            <PurposeContainer>
                <CardView>
                    <Intro>The most meaningful gift you can give</Intro>
                    <Title>Give them the gift of being asked.</Title>
                    <Description>
                        A parent or grandparent who would never bring it up themselves &mdash; just waiting for someone to open the door.
                    </Description>
                    <Buttons>
                        <AccessButton to="/signup">Give this as a gift</AccessButton>
                    </Buttons>
                    <TagRow>
                        <Tag>Mother's Day</Tag>
                        <Tag>Father's Day</Tag>
                        <Tag>Birthdays</Tag>
                        <Tag>Anniversaries</Tag>
                        <Tag>Just Because</Tag>
                    </TagRow>
                </CardView>
            </PurposeContainer>

            <ScaleContainer>
                <CardView>
                    <Grid>
                        <ScaleColumn>
                            <ScaleNumber>1.4B</ScaleNumber>
                            <ScaleContent>people aged 60+ worldwide by 2030</ScaleContent>
                            <ScaleRef>WHO, 2025</ScaleRef>
                        </ScaleColumn>
                        <ScaleColumn>
                            <ScaleNumber>10K</ScaleNumber>
                            <ScaleContent> Americans cross age 65 every single day</ScaleContent> 
                            <ScaleRef>U.S. Census</ScaleRef>
                        </ScaleColumn>
                        <ScaleColumn>
                            <ScaleNumber>63M</ScaleNumber>
                            <ScaleContent>U.S. family caregivers carrying the urgency</ScaleContent>
                            <ScaleRef>AARP / NAC, 2025</ScaleRef>
                        </ScaleColumn>
                    </Grid>
                </CardView>
            </ScaleContainer>

            <ReviewContainer>
                <CardView>
                    <Intro>What founding families say</Intro>
                    <Heading>
                        <Title>Stories that almost weren't told. </Title>
                        <StatusFamily><StatusDot />10 founding families &middot; early access</StatusFamily>
                    </Heading>
                    <Grid>
                        <ReviewColumn>
                            <ReviewContent>
                                "I had no idea my dad was afraid of water until he told A Story about nearly drowning at age nine. He's 84. I've known him my whole life."
                            </ReviewContent>
                            <User>Rachel T. &middot; Michigan</User>
                        </ReviewColumn>
                        <ReviewColumn>
                            <ReviewContent>
                                "We used it during Sunday dinner. Three generations, one question. My grandfather talked for two hours. My kids put their phones down and just listened."
                            </ReviewContent>
                            <User>David L. &middot; Michigan</User>
                        </ReviewColumn>
                        <ReviewColumn>
                            <ReviewContent>
                                "Mom passed away in March. The book arrived in April. I don't have words for what it means to our family."
                            </ReviewContent>
                            <User>The Kowalski family &middot; Michigan</User>
                        </ReviewColumn>
                    </Grid>
                    <Divider />
                    <Comparsion>
                        <Bold>StoryWorth</Bold> asks questions. <Bold>Remento</Bold> captures answers. <Bold>Storii</Bold> makes phone calls. <OurBrand>A Story</OurBrand> builds the living archive around the conversation &mdash; with guided AI, voice-first interviews, and family collaboration built in from day one.
                    </Comparsion>
                </CardView>
            </ReviewContainer>

            <QuoteContainer>
                <CardView>
                    <Quote>"Every life holds a story worth keeping. Most are never told."</Quote>
                    <Subtitle>&mdash; The reason A Story exists</Subtitle>
                </CardView>
            </QuoteContainer>

            <AccessContainer>
                <CardView>
                    <Intro>See it in action</Intro>
                    <Title>Before it's too late to ask.</Title>
                    <Description>
                        Join our founding families. A 20-minute conversation with us — then a lifetime of stories, organized and yours forever.
                    </Description>
                    <Buttons>
                        <AccessButton to="/signup">Get early access</AccessButton>
                        <FamilyButton>Learn why it matters</FamilyButton>
                    </Buttons>
                </CardView>
            </AccessContainer>
        </BodyContainer>
    )
}

export default Body;