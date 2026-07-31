import {InstitutionContainer, CardView, Label, GoldLabel, SectionTitle, WideSectionTitle, NarrowSectionTitle, Paragraph, SmallNote, Italic, PrimaryButton, HeroSection, HeroTitle, HeroSub, HeroLabel, HeroButtons, TrustBarSection, TrustBarInner, TrustList, TrustItem, EvidenceSection, EvidenceLayout, EvidenceStats, EvidenceStat, StatNum, StatText, QuoteSection, QuoteCardView, DarkQuoteText, DarkQuoteCite, LightQuoteText, LightQuoteCite, UseCasesSection, IntroText, WideIntroText, UseCasesGrid, UseCaseCard, UseCaseIcon, CardTitle, OpenAllSection, OpenAllGrid, OpenAllItem, OpenAllTitle, OpenAllText, CenteredCta, ImplementationSection, ImplGrid, ImplGridSpaced, ImplStep, ImplStepNum, ComplianceSection, ComplianceTitle, ComplianceSub, ComplianceGrid, ComplianceItem, ComplianceItemTitle, ComplianceItemText, TestimonialSection, CtaSection, CtaTitle, CtaSub, CtaActions, PrivacyButton} from './institution.styles';

const Institution = () => {
    return (
        <InstitutionContainer>
            <HeroSection>
                <CardView>
                    <HeroLabel>For care institutions</HeroLabel>
                    <HeroTitle>Every resident has a life worth knowing.<br /><Italic>A Story helps you learn it.</Italic></HeroTitle>
                    <HeroSub>For nursing homes, assisted living communities, memory care units, and hospitals that believe great care starts with knowing the whole person &mdash; not just the diagnosis.</HeroSub>
                    <HeroButtons>
                        <PrimaryButton to="/signup">Book an institutional demo</PrimaryButton>
                    </HeroButtons>
                </CardView>
            </HeroSection>

            <TrustBarSection>
                <TrustBarInner>
                    <TrustList>
                        <TrustItem>&middot; No IT setup required</TrustItem>
                        <TrustItem>&middot; Works on any device</TrustItem>
                        <TrustItem>&middot; HIPAA-aligned privacy</TrustItem>
                        <TrustItem>&middot; Live in your community within one week</TrustItem>
                    </TrustList>
                </TrustBarInner>
            </TrustBarSection>

            <EvidenceSection>
                <CardView>
                    <EvidenceLayout>
                        <div>
                            <Label>The research is clear</Label>
                            <SectionTitle>Reminiscence therapy works.<br /><Italic>A Story makes it beautiful.</Italic></SectionTitle>
                            <Paragraph>For decades, care researchers have documented the power of structured life review &mdash; sessions that invite older adults to revisit and share their personal histories. The benefits are measurable, well-replicated, and profound.</Paragraph>
                            <Paragraph>Reminiscence therapy reduces depression and anxiety, strengthens sense of identity and self-worth, improves engagement in care settings, and &mdash; particularly in memory care &mdash; activates autobiographical memory networks that are often preserved even in late-stage cognitive decline.</Paragraph>
                            <Paragraph>The challenge has always been scale. Life-review programs take trained staff, dedicated time, and careful facilitation. Most facilities can offer them to a fraction of the people who would benefit.</Paragraph>
                            <SmallNote>Sources: Woods et al., Cochrane Review (2018); Pinquart &amp; Forstmeier (2012); Butler (1963)</SmallNote>
                        </div>

                        <EvidenceStats>
                            <EvidenceStat>
                                <StatNum>65%</StatNum>
                                <StatText>reduction in depression symptoms among nursing home residents who participated in structured life-review programs, compared to control groups.</StatText>
                            </EvidenceStat>
                            <EvidenceStat>
                                <StatNum>8 in 10</StatNum>
                                <StatText>care staff report significantly better relationships with residents when they know their personal history &mdash; which directly correlates with care quality scores and family satisfaction.</StatText>
                            </EvidenceStat>
                            <EvidenceStat>
                                <StatNum>92%</StatNum>
                                <StatText>of families feel more confident in facility quality when staff demonstrate meaningful knowledge of who their loved one is as a whole person &mdash; not just a patient.</StatText>
                            </EvidenceStat>
                        </EvidenceStats>
                    </EvidenceLayout>
                </CardView>
            </EvidenceSection>

            <QuoteSection>
                <QuoteCardView>
                    <DarkQuoteText>"Mrs. Williams played piano for 40 years. She raised four children. She has a sense of humor that would surprise you.<br/><br/>Her chart says: <Italic>'dementia, stage 2.'</Italic>"
                    </DarkQuoteText>
                    <DarkQuoteCite>&mdash; The gap between a person and a patient that A Story closes</DarkQuoteCite>
                </QuoteCardView>
            </QuoteSection>

            {/* ─── Use cases ─── */}
            <UseCasesSection>
                <CardView>
                    <Label>Who it's for</Label>
                    <WideSectionTitle>
                        Built for every setting where someone is living their later years.
                    </WideSectionTitle>
                    <IntroText>
                        A Story is designed to be low-burden for staff and high-impact for residents. No training course. No new workflow. Just a conversation worth having.
                    </IntroText>

                    <UseCasesGrid>
                        <UseCaseCard>
                            <UseCaseIcon>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </UseCaseIcon>
                            <CardTitle>Assisted Living &amp; Senior Communities</CardTitle>
                            <Paragraph>
                                Use A Story as a signature enrichment activity &mdash; offered during recreation time or one-on-one with a family member during visits. Residents report feeling deeply heard. Staff discover the person behind the care plan.
                            </Paragraph>
                            <Paragraph>
                                The printed memoir becomes one of the most prized possessions in a resident's room &mdash; and a powerful testament to your community's commitment to dignified aging.
                            </Paragraph>
                        </UseCaseCard>

                        <UseCaseCard>
                            <UseCaseIcon>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </UseCaseIcon>
                            <CardTitle>Memory Care Units</CardTitle>
                            <Paragraph>
                                Reminiscence is especially powerful for residents with cognitive decline &mdash; autobiographical memories are often preserved even in late-stage Alzheimer's, activating different neural pathways. A Story is designed to follow the resident's pace: gentle, unhurried, never correcting.
                            </Paragraph>
                            <Paragraph>
                                Families who see their loved one light up while sharing stories often describe it as the most meaningful hour they've spent at the facility.
                            </Paragraph>
                        </UseCaseCard>

                        <UseCaseCard>
                            <UseCaseIcon>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                </svg>
                            </UseCaseIcon>
                            <CardTitle>Hospice &amp; Palliative Care</CardTitle>
                            <Paragraph>
                                In end-of-life settings, the question "who was this person?" becomes urgent &mdash; and the opportunity to answer it, profound. A Story gives patients and families a gentle, structured way to capture what matters most while there is still time.
                            </Paragraph>
                            <Paragraph>
                                The printed memoir often becomes the most important artifact of a family's grief and healing. Hospice programs that offer A Story consistently hear: "this was the best thing we did."
                            </Paragraph>
                        </UseCaseCard>

                        <UseCaseCard>
                            <UseCaseIcon>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <line x1="3" y1="9" x2="21" y2="9" />
                                    <line x1="9" y1="21" x2="9" y2="3" />
                                </svg>
                            </UseCaseIcon>
                            <CardTitle>Hospitals &amp; Rehabilitation</CardTitle>
                            <Paragraph>
                                Long-stay patients &mdash; recovering from strokes, major surgery, or managing chronic illness &mdash; experience profound isolation and loss of identity. A Story provides meaningful engagement during recovery and gives nursing staff genuine insight into who they're caring for.
                            </Paragraph>
                            <Paragraph>
                                Understanding what a patient's life looked like before admission informs what "return to function" really means for them &mdash; and shapes the care plan accordingly.
                            </Paragraph>
                        </UseCaseCard>
                    </UseCasesGrid>
                </CardView>
            </UseCasesSection>

            <OpenAllSection>
                <CardView>
                    <Label>Open to everyone</Label>
                    <NarrowSectionTitle>
                        If you care about who someone is,<br />we want to hear from you.
                    </NarrowSectionTitle>
                    <WideIntroText>
                        We built A Story with care institutions in mind &mdash; but the need to preserve a person's story doesn't belong to any single setting. If you're working with people whose lives deserve to be kept, we'd love to explore what's possible together. Reach out. We respond to every message.
                    </WideIntroText>

                    <OpenAllGrid>
                        <OpenAllItem>
                            <OpenAllTitle>Schools &amp; Universities</OpenAllTitle>
                            <OpenAllText>Oral history programs, intergenerational projects, family heritage courses, community memory initiatives.</OpenAllText>
                        </OpenAllItem>
                        <OpenAllItem>
                            <OpenAllTitle>Libraries &amp; Archives</OpenAllTitle>
                            <OpenAllText>Local history preservation, community voice programs, digital archive initiatives, public memory projects.</OpenAllText>
                        </OpenAllItem>
                        <OpenAllItem>
                            <OpenAllTitle>Religious Communities</OpenAllTitle>
                            <OpenAllText>Congregational history, elder ministry, legacy programs, interfaith storytelling and remembrance.</OpenAllText>
                        </OpenAllItem>
                        <OpenAllItem>
                            <OpenAllTitle>Veterans Organizations</OpenAllTitle>
                            <OpenAllText>Service history capture, oral testimony preservation, honoring the stories of those who served.</OpenAllText>
                        </OpenAllItem>
                        <OpenAllItem>
                            <OpenAllTitle>Cultural &amp; Heritage Organizations</OpenAllTitle>
                            <OpenAllText>Immigrant story preservation, cultural identity projects, diaspora memory, community voice initiatives.</OpenAllText>
                        </OpenAllItem>
                        <OpenAllItem>
                            <OpenAllTitle>Something We Haven't Imagined</OpenAllTitle>
                            <OpenAllText>If stories matter in what you do and you see a fit we haven't thought of yet, reach out. We'd genuinely love to hear about it.</OpenAllText>
                        </OpenAllItem>
                    </OpenAllGrid>

                    <CenteredCta>
                        <PrimaryButton>Start a conversation</PrimaryButton>
                    </CenteredCta>
                </CardView>
            </OpenAllSection>

            <ImplementationSection>
                <CardView>
                    <Label>Implementation</Label>
                    <WideSectionTitle>Live in your community within a week.</WideSectionTitle>
                    <IntroText>
                        No IT project. No hardware to buy. No training curriculum. A Story is designed to be adopted quickly and sustained without effort.
                    </IntroText>

                    <ImplGrid>
                        <ImplStep>
                            <ImplStepNum>1</ImplStepNum>
                            <CardTitle>We onboard your team</CardTitle>
                            <Paragraph>A 45-minute call with your activities director or care coordinator. We walk through how A Story works, which residents to start with, and answer every question your team has. That is the entire setup process.</Paragraph>
                        </ImplStep>
                        <ImplStep>
                            <ImplStepNum>2</ImplStepNum>
                            <CardTitle>Residents begin at their own pace</CardTitle>
                            <Paragraph>A Story works on any tablet or smartphone &mdash; no download required, no account setup for the resident. A team member introduces the app during a visit or recreation session. The first question takes sixty seconds to reach. After that, the AI handles everything.</Paragraph>
                        </ImplStep>
                        <ImplStep>
                            <ImplStepNum>3</ImplStepNum>
                            <CardTitle>Families stay connected</CardTitle>
                            <Paragraph>Family members receive a shared archive link and can add memories, photos, and questions from anywhere &mdash; a daughter in Seattle contributing to her father's archive in Chicago. Many families describe A Story as the new centerpiece of their weekend visits.</Paragraph>
                        </ImplStep>
                    </ImplGrid>

                    <ImplGridSpaced>
                        <ImplStep>
                            <ImplStepNum>4</ImplStepNum>
                            <CardTitle>Staff know the whole person</CardTitle>
                            <Paragraph>With the resident's consent, care staff can access the archive &mdash; learning what they loved, what they are proud of, and what shaped them. This context changes how care is delivered. Every conversation, every activity you plan, every quiet moment on the floor is informed by something real.</Paragraph>
                        </ImplStep>
                        <ImplStep>
                            <ImplStepNum>5</ImplStepNum>
                            <CardTitle>The book arrives</CardTitle>
                            <Paragraph>When the resident and family are ready, A Story prints and ships a hardcover memoir &mdash; edited, laid out, bound on acid-free paper. Many facilities frame copies in common areas or present them at family meetings. It becomes a testament to your community's values. Something families will carry for decades.</Paragraph>
                        </ImplStep>
                        <ImplStep>
                            <ImplStepNum>6</ImplStepNum>
                            <CardTitle>Ongoing partnership</CardTitle>
                            <Paragraph>Your dedicated A Story contact is reachable by phone or email. We provide monthly activity guides, seasonal conversation prompts, and onboarding support for new staff. We are a partner, not a vendor &mdash; and we measure success the same way you do: by resident and family experience.</Paragraph>
                        </ImplStep>
                    </ImplGridSpaced>
                </CardView>
            </ImplementationSection>

            <ComplianceSection>
                <CardView>
                    <GoldLabel>Privacy &amp; compliance</GoldLabel>
                    <ComplianceTitle>
                        Built for the trust<br />your residents place in you.
                    </ComplianceTitle>
                    <ComplianceSub>
                        These are people's life stories &mdash; the most personal thing there is. We built every part of A Story around one principle: the storyteller is in complete control, always.
                    </ComplianceSub>

                    <ComplianceGrid>
                        <ComplianceItem>
                            <ComplianceItemTitle>Resident-controlled consent</ComplianceItemTitle>
                            <ComplianceItemText>Every resident decides who can access their archive. Staff access requires explicit documented consent. Families can be granted or revoked access at any time. Control belongs to the storyteller &mdash; always.</ComplianceItemText>
                        </ComplianceItem>
                        <ComplianceItem>
                            <ComplianceItemTitle>HIPAA-aligned data handling</ComplianceItemTitle>
                            <ComplianceItemText>All data is encrypted at rest and in transit. A Story holds personal narratives, not health records. We provide a Business Associate Agreement (BAA) for all institutional partners upon request.</ComplianceItemText>
                        </ComplianceItem>
                        <ComplianceItem>
                            <ComplianceItemTitle>Never sold. Never trained on.</ComplianceItemTitle>
                            <ComplianceItemText>We will never sell resident data, never use stories to train AI models, and never share content with third parties. This is a legally binding commitment &mdash; not a policy that can change at will.</ComplianceItemText>
                        </ComplianceItem>
                        <ComplianceItem>
                            <ComplianceItemTitle>Full data portability</ComplianceItemTitle>
                            <ComplianceItemText>Residents and families own their archive completely. If a resident moves facilities or a family wants a full export, they receive everything within 48 hours &mdash; documents, media, transcripts. No lock-in, ever.</ComplianceItemText>
                        </ComplianceItem>
                        <ComplianceItem>
                            <ComplianceItemTitle>Secure family sharing</ComplianceItemTitle>
                            <ComplianceItemText>Family members access the archive through an encrypted, permission-scoped link. The resident controls what families see. Sharing can be revoked at any moment, from any device. Nothing is public by default.</ComplianceItemText>
                        </ComplianceItem>
                        <ComplianceItem>
                            <ComplianceItemTitle>Your IT team is welcome</ComplianceItemTitle>
                            <ComplianceItemText>We provide full security documentation for your compliance and IT teams: data flow diagrams, encryption standards, subprocessor list, and audit logs. We take every review seriously and respond within 24 hours.</ComplianceItemText>
                        </ComplianceItem>
                    </ComplianceGrid>
                </CardView>
            </ComplianceSection>

            <TestimonialSection>
                <QuoteCardView>
                    <LightQuoteText>
                        "A family member pulled me aside after we introduced A Story and said, 'I didn't know my father had been to Korea. I didn't know he played harmonica.' That's what we're here for."
                    </LightQuoteText>
                    <LightQuoteCite>&mdash; Activities Director, senior living community</LightQuoteCite>
                </QuoteCardView>
            </TestimonialSection>

            <CtaSection>
                <CardView>
                    <Label>Start the conversation</Label>
                    <CtaTitle>
                        See how A Story works<br />in your community.
                    </CtaTitle>
                    <CtaSub>
                        A 30-minute walk-through with your care team &mdash; no commitment required. We'll show you the resident and family experience end to end, and answer every question you have. Most programs are live within a week.
                    </CtaSub>
                    <CtaActions>
                        <PrimaryButton>Book an institutional demo</PrimaryButton>
                        <PrivacyButton>Our privacy commitments</PrivacyButton>
                    </CtaActions>
                </CardView>
            </CtaSection>
        </InstitutionContainer>
    );
};

export default Institution;