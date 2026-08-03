import {CardView, Label, HeroSection, HeroTitle, HeroSub, LegalMeta, BodySection, LegalContent, Notice, Toc, TocLabel, TocList, TocItem, TocLink, Section, SectionNum, SectionTitle, Paragraph, LegalLink} from './terms.styles';

const sections = [
    { num: 1, id: 's1', title: 'Agreement to these terms' },
    { num: 2, id: 's2', title: 'Who we are' },
    { num: 3, id: 's3', title: 'Eligibility' },
    { num: 4, id: 's4', title: 'What we provide' },
    { num: 5, id: 's5', title: 'Your account' },
    { num: 6, id: 's6', title: 'Your content and ownership' },
    { num: 7, id: 's7', title: 'Consent and accuracy' },
    { num: 8, id: 's8', title: 'Promotions and founding families' },
    { num: 9, id: 's9', title: 'Subscriptions, payments, and refunds' },
    { num: 10, id: 's10', title: 'App store terms' },
    { num: 11, id: 's11', title: 'Acceptable use' },
    { num: 12, id: 's12', title: 'Our intellectual property' },
    { num: 13, id: 's13', title: 'Third-party services' },
    { num: 14, id: 's14', title: 'Disclaimers' },
    { num: 15, id: 's15', title: 'Limitation of liability' },
    { num: 16, id: 's16', title: 'Indemnification' },
    { num: 17, id: 's17', title: 'Governing law' },
    { num: 18, id: 's18', title: 'Dispute resolution and arbitration' },
    { num: 19, id: 's19', title: 'Changes to these terms' },
    { num: 20, id: 's20', title: 'Contact us' },
];

const Terms = () => {
    return (
        <>
            <HeroSection>
                <CardView>
                    <Label>Legal</Label>
                    <HeroTitle>Terms of Service</HeroTitle>
                    <HeroSub>The agreement between you and A Story.</HeroSub>
                    <LegalMeta>Last updated: June 16, 2026 &middot; A Story Technologies, Inc.</LegalMeta>
                </CardView>
            </HeroSection>

            <BodySection>
                <CardView>
                    <LegalContent>
                        <Notice>Please read these Terms carefully before using A Story. By accessing or using the service, you agree to be bound by them. If you do not agree, please do not use the service.</Notice>

                        <Toc>
                            <TocLabel>Contents</TocLabel>
                            <TocList>
                                {sections.map((s) => (
                                    <TocItem key={s.id}>
                                        <TocLink href={`#${s.id}`}>{s.title}</TocLink>
                                    </TocItem>
                                ))}
                            </TocList>
                        </Toc>

                        <Section id="s1">
                            <SectionNum>1</SectionNum>
                            <SectionTitle>Agreement to these terms</SectionTitle>
                            <Paragraph>These Terms of Service ("Terms") govern your access to and use of our website, our waitlist, and the A Story app and related services (together, the "service"). By accessing or using the service, you agree to these Terms. If you do not agree, please do not use the service.</Paragraph>
                        </Section>

                        <Section id="s2">
                            <SectionNum>2</SectionNum>
                            <SectionTitle>Who we are</SectionTitle>
                            <Paragraph>The service is provided by A Story Technologies, Inc., a corporation organized under the laws of the State of Michigan ("A Story," "we," "us"). You can contact us at <LegalLink href="mailto:contact@astoryapp.com">contact@astoryapp.com</LegalLink>.</Paragraph>
                        </Section>

                        <Section id="s3">
                            <SectionNum>3</SectionNum>
                            <SectionTitle>Eligibility</SectionTitle>
                            <Paragraph> You must be at least 13 years old and able to enter into a binding contract to create an account or purchase the service. By using the service, you represent that you meet these requirements.</Paragraph>
                        </Section>

                        <Section id="s4">
                            <SectionNum>4</SectionNum>
                            <SectionTitle>What we provide</SectionTitle>
                            <Paragraph>A Story is a memory-keeping service: a warm, AI-guided experience that interviews a loved one, records their memories, and turns them into memory cards on a life timeline, a private digital archive, and, when you choose, a printed memory book. The specific features available, the plans we offer, and the details of any printed book order are described at the time of purchase and form part of these Terms.</Paragraph>
                        </Section>

                        <Section id="s5">
                            <SectionNum>5</SectionNum>
                            <SectionTitle>Your account</SectionTitle>
                            <Paragraph>You are responsible for the accuracy of the information you provide and for keeping your account credentials secure. You are responsible for activity that occurs under your account. Please notify us promptly at <LegalLink href="mailto:contact@astoryapp.com">contact@astoryapp.com</LegalLink> if you believe your account has been used without your authorization.</Paragraph>
                        </Section>

                        <Section id="s6">
                            <SectionNum>6</SectionNum>
                            <SectionTitle>Your content and ownership</SectionTitle>
                            <Paragraph>You and your family own your memories, recordings, transcripts, photographs, and stories ("Your Content"). You grant A Story a limited, non-exclusive license to use Your Content solely to provide the service &mdash; to conduct interviews, build and host your archive, produce your book, and support you. We will not sell Your Content, show it to advertisers, or use it to train outside artificial-intelligence models. The storyteller controls with whom Your Content is shared.</Paragraph>
                        </Section>

                        <Section id="s7">
                            <SectionNum>7</SectionNum>
                            <SectionTitle>Consent and accuracy</SectionTitle>
                            <Paragraph>You confirm that the person being recorded has consented to being recorded and to having their stories produced into an archive and book, and that you have the right to share the photographs and information you provide. A Story shapes stories as they are told and does not independently verify the factual accuracy of personal recollections.</Paragraph>
                        </Section>

                        <Section id="s8">
                            <SectionNum>8</SectionNum>
                            <SectionTitle>Promotions and founding families</SectionTitle>
                            <Paragraph>From time to time we offer promotions, such as the founding-families offer of three months free and a raffle for lifetime memberships. Each promotion is subject to its own official rules, which are made available at the time of the promotion and which control in the event of any conflict with these Terms. Promotions may be modified or withdrawn where permitted by law.</Paragraph>
                        </Section>

                        <Section id="s9">
                            <SectionNum>9</SectionNum>
                            <SectionTitle>Subscriptions, payments, and refunds</SectionTitle>
                            <Paragraph>A Story may be offered on a subscription basis. Subscriptions purchased through the Apple App Store or Google Play are billed through your store account and renew automatically unless cancelled at least 24 hours before the end of the current period. You can manage or cancel a subscription in your store account settings.</Paragraph>
                            <Paragraph>Except where required by law, payments are non-refundable, and we do not provide refunds or credits for partial periods. Printed memory books are produced to order; once production has begun, an order cannot be cancelled or refunded, except where required by law or where a product arrives damaged or defective.</Paragraph>
                        </Section>

                        <Section id="s10">
                            <SectionNum>10</SectionNum>
                            <SectionTitle>App store terms</SectionTitle>
                            <Paragraph>If you download A Story from the Apple App Store, you acknowledge that these Terms are between you and A Story only, and not with Apple, and that Apple is not responsible for the app or its content. Apple has no obligation to furnish any maintenance or support for the app, and is not responsible for addressing any claims relating to the app. Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you. When you download the app from Google Play, the applicable Google Play terms also apply. You agree to comply with all applicable third-party terms when using the app.</Paragraph>
                        </Section>

                        <Section id="s11">
                            <SectionNum>11</SectionNum>
                            <SectionTitle>Acceptable use</SectionTitle>
                            <Paragraph>You agree not to misuse the service &mdash; for example, by attempting to disrupt or interfere with it, accessing it unlawfully or without authorization, reverse-engineering it except where permitted by law, or using it to upload content that is illegal or that infringes the rights of others.</Paragraph>
                        </Section>

                        <Section id="s12">
                            <SectionNum>12</SectionNum>
                            <SectionTitle>Our intellectual property</SectionTitle>
                            <Paragraph>The A Story name, logo, app, website, and our editorial and production materials are owned by A Story Technologies, Inc. and are protected by intellectual-property laws. You may not use them without our prior written permission. Nothing in these Terms affects your ownership of Your Content.</Paragraph>
                        </Section>

                        <Section id="s13">
                            <SectionNum>13</SectionNum>
                            <SectionTitle>Third-party services</SectionTitle>
                            <Paragraph>We rely on third parties to operate the service &mdash; for example, hosting, printing, and payment providers. We are not responsible for the acts or omissions of these third parties, and their services may be subject to their own terms.</Paragraph>
                        </Section>

                        <Section id="s14">
                            <SectionNum>14</SectionNum>
                            <SectionTitle>Disclaimers</SectionTitle>
                            <Paragraph>The service is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we disclaim all warranties not expressly stated in these Terms, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will be uninterrupted, error-free, or completely secure.</Paragraph>
                        </Section>

                        <Section id="s15">
                            <SectionNum>15</SectionNum>
                            <SectionTitle>Limitation of liability</SectionTitle>
                            <Paragraph>To the maximum extent permitted by law, A Story will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, even where we have been advised of the possibility of such damages. To the maximum extent permitted by law, A Story's total liability for all claims arising out of or relating to the service will not exceed the greater of (a) the total amount you paid to A Story in the twelve months before the event giving rise to the claim, or (b) one hundred U.S. dollars (US $100).</Paragraph>
                            <Paragraph>Because the recordings and stories you entrust to us are irreplaceable, we encourage you to keep your own copies of any content that is important to you.</Paragraph>
                        </Section>

                        <Section id="s16">
                            <SectionNum>16</SectionNum>
                            <SectionTitle>Indemnification</SectionTitle>
                            <Paragraph>You agree to indemnify and hold harmless A Story and its officers, employees, and agents from any claims, damages, and expenses, including reasonable legal fees, arising out of your breach of these Terms, your misuse of the service, or Your Content.</Paragraph>
                        </Section>

                        <Section id="s17">
                            <SectionNum>17</SectionNum>
                            <SectionTitle>Governing law</SectionTitle>
                            <Paragraph>These Terms are governed by the laws of the State of Michigan, without regard to its conflict-of-laws principles. Subject to the Dispute Resolution section below, any claims not subject to arbitration will be brought exclusively in the state or federal courts located in Michigan, and you consent to the jurisdiction of those courts.</Paragraph>
                        </Section>

                        <Section id="s18">
                            <SectionNum>18</SectionNum>
                            <SectionTitle>Dispute resolution and arbitration</SectionTitle>
                            <Paragraph>Please read this section carefully, as it affects your legal rights.</Paragraph>
                            <Paragraph>Before bringing a formal claim, you agree to first contact us at <LegalLink href="mailto:contact@astoryapp.com">contact@astoryapp.com</LegalLink> and attempt to resolve the dispute informally; if we cannot resolve it within 60 days, either party may proceed as set out below.</Paragraph>
                            <Paragraph>Except for the exceptions noted here, any dispute arising out of or relating to these Terms or the service will be resolved by binding individual arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules, rather than in court. Either party may instead bring an individual claim in small-claims court, and either party may seek injunctive relief to protect its intellectual property.</Paragraph>
                            <Paragraph>All disputes will be conducted only on an individual basis, and not as a class, consolidated, or representative action. You may opt out of arbitration within 30 days of first accepting these Terms by emailing <LegalLink href="mailto:contact@astoryapp.com">contact@astoryapp.com</LegalLink> with your name and a statement that you wish to opt out; if you opt out, disputes will be resolved in the courts identified in the Governing Law section.</Paragraph>
                        </Section>

                        <Section id="s19">
                            <SectionNum>19</SectionNum>
                            <SectionTitle>Changes to these terms</SectionTitle>
                            <Paragraph>We may update these Terms from time to time. When we do, we will post the revised version here with a new "Last updated" date. Your continued use of the service after changes take effect means you accept the updated Terms.</Paragraph>
                        </Section>

                        <Section id="s20">
                            <SectionNum>20</SectionNum>
                            <SectionTitle>Contact us</SectionTitle>
                            <Paragraph>If you have any questions about these Terms, please email us at <LegalLink href="mailto:contact@astoryapp.com">contact@astoryapp.com</LegalLink>. We respond to every message.</Paragraph>
                        </Section>
                    </LegalContent>
                </CardView>
            </BodySection>
        </>
    );
};

export default Terms;