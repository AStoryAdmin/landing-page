import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Container, NarrowContainer, Label, LegalLink, FaqHero, HeroTitle, HeroSub, FaqSection, FaqGroup, FaqGroupLabel, FaqItem, FaqQuestion, FaqQuestionIcon, FaqAnswer, FaqAnswerInner, AnswerParagraph, Bold, CtaSection, CtaTitle, CtaSub, CtaActions, PrimaryButton, OutlineButton} from './faq.styles';

type FaqQuestionData = {
    id: string;
    question: string;
    answer: React.ReactNode;
};

type FaqGroupData = {
    label: string;
    items: FaqQuestionData[];
};

const faqGroups: FaqGroupData[] = [
    {
        label: 'About A Story',
        items: [
            {
                id: 'what-is-a-story',
                question: 'What is A Story?',
                answer: (
                    <>
                        <AnswerParagraph>A Story is a memory-keeping service. It uses a warm, AI-guided conversation to help older adults share the stories of their lives &mdash; their childhood, their family, their work, the things they've learned &mdash; and turns those stories into a beautiful digital archive and, when you're ready, a printed hardcover book.</AnswerParagraph>
                        <AnswerParagraph>Think of it as the conversation you always meant to have, finally made easy. A Story does the asking, the listening, and the organizing. All you have to do is show up and talk.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'how-ai-works',
                question: 'How does the AI conversation work?',
                answer: (
                    <>
                        <AnswerParagraph>A Story's AI asks warm, open questions &mdash; about childhood homes, family, relationships, work, the moments that shaped a person. It listens carefully to each answer and follows naturally wherever the story leads. It doesn't interrupt, correct, or redirect. It simply follows.</AnswerParagraph>
                        <AnswerParagraph>The conversation feels more like talking to a thoughtful, patient listener than being interviewed. There are no right or wrong answers. There is no pressure to remember anything perfectly. The AI meets people exactly where they are.</AnswerParagraph>
                        <AnswerParagraph>You can <LegalLink as={Link} to="/experience#demo">watch a real example conversation</LegalLink> on The Experience page &mdash; and try the voice feature yourself.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'who-for',
                question: 'Who is A Story for?',
                answer: (
                    <>
                        <AnswerParagraph>A Story is designed for older adults &mdash; parents, grandparents, aunts and uncles &mdash; who have a lifetime of stories that deserve to be kept. It is especially designed for people who are not comfortable with technology. No app to download, no account to create, no learning curve. It works on any phone or tablet.</AnswerParagraph>
                        <AnswerParagraph>It is also used by adult children and grandchildren who want to capture their family's history before it's too late &mdash; as a gift, a project, or simply an act of love.</AnswerParagraph>
                        <AnswerParagraph>
                            Nursing homes, memory care communities, assisted living facilities, and hospice programs use A Story as part of their person-centered care approach. See our{' '}
                            <LegalLink as={Link} to="/institution">For Institutions</LegalLink>{' '}
                            page for more.
                        </AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'session-look-like',
                question: 'What does a session look like?',
                answer: (
                    <>
                        <AnswerParagraph>A typical session lasts 20 to 45 minutes. The AI begins with one gentle question &mdash; about a childhood memory, a place that mattered, a person who shaped them &mdash; and the conversation unfolds from there. Answers can be spoken aloud or typed. The session can be paused and resumed at any time.</AnswerParagraph>
                        <AnswerParagraph>After each session, the stories are organized into memory cards &mdash; searchable, grouped by chapter of life (childhood, school years, career, family, legacy), and ready to have photos attached. Each session adds to a growing archive.</AnswerParagraph>
                        <AnswerParagraph>There is no "right" number of sessions. Some families do one. Some do dozens, over months or years. The archive grows at whatever pace feels right.</AnswerParagraph>
                    </>
                ),
            },
        ],
    },
    {
        label: 'Privacy & Safety',
        items: [
            {
                id: 'who-can-see',
                question: "Who can see my family's stories?",
                answer: (
                    <>
                        <AnswerParagraph>Only the people you choose. Stories are private by default &mdash; no one can see them without an explicit invitation from the storyteller or a family administrator.</AnswerParagraph>
                        <AnswerParagraph>You control sharing at every level: individual stories can be shared with specific family members, or the entire archive can be kept private until a printed book is ordered. Nothing is ever public. Nothing is ever searchable by strangers.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'train-ai',
                question: 'Will A Story use our stories to train its AI?',
                answer: (
                    <>
                        <AnswerParagraph><Bold>No. Never.</Bold> This is a core commitment &mdash; not a policy subject to future change, but a legally binding term of service. We will never use a family's conversations, transcripts, or memories to train AI models &mdash; ours or anyone else's.</AnswerParagraph>
                        <AnswerParagraph>We will also never sell your data, share it with third parties for any purpose, or use it for advertising. Your family's stories exist for your family. That is the only purpose they serve.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'dementia-safe',
                question: 'Is A Story safe for someone with dementia or memory loss?',
                answer: (
                    <>
                        <AnswerParagraph>Yes &mdash; and it can be particularly meaningful. Autobiographical memories (childhood, family, deeply personal experiences) are often preserved in people with dementia long after other types of memory have been affected. A Story's approach &mdash; gentle, unhurried questions about the distant past &mdash; is well-suited to this.</AnswerParagraph>
                        <AnswerParagraph>The AI never corrects, argues, or expresses surprise. It follows wherever the conversation leads. If someone repeats a story, the AI receives it as if hearing it for the first time.</AnswerParagraph>
                        <AnswerParagraph>We recommend involving a trusted family member in the first few sessions for someone with significant cognitive decline &mdash; to help navigate the interface and provide comfort. But many people with early-to-middle stage dementia use A Story comfortably on their own.</AnswerParagraph>
                        <AnswerParagraph>Please consult a care professional if you have concerns about a specific situation. We are always available at contact@astoryapp.com to discuss your family's needs.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'shuts-down',
                question: 'What happens to our stories if A Story ever shuts down?',
                answer: (
                    <>
                        <AnswerParagraph>You can export everything at any time &mdash; complete transcripts, memory cards, photos, and audio recordings &mdash; as a portable archive you own fully. We provide this export feature to every subscriber, not just as a shutdown guarantee.</AnswerParagraph>
                        <AnswerParagraph>If A Story were ever to wind down operations, we would provide at minimum 90 days' notice and ensure every family has a complete, portable copy of their archive before anything changed. Your stories will never disappear without warning.</AnswerParagraph>
                    </>
                ),
            },
        ],
    },
    {
        label: 'Getting Started',
        items: [
            {
                id: 'how-long-start',
                question: 'How long does it take to get started?',
                answer: (
                    <>
                        <AnswerParagraph>The first conversation can begin in about two minutes. There is no download, no account setup for the storyteller, and no tutorial to complete. Open A Story, choose a chapter of life to begin in, and the first question appears immediately.</AnswerParagraph>
                        <AnswerParagraph>If you're setting up A Story as a gift for a parent or grandparent, you handle the initial setup (which takes about five minutes), and then hand them the device with the first question already on screen. The experience feels as simple as receiving a phone call.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'devices',
                question: 'What devices does it work on?',
                answer: (
                    <>
                        <AnswerParagraph>A Story works in any modern web browser &mdash; on phones, tablets, and computers. No app to download. We are optimized for tablets (iPad and Android), which offer the most comfortable experience for older adults: large text, easy touch targets, and good microphone quality for voice responses.</AnswerParagraph>
                        <AnswerParagraph>A dedicated iOS and Android app is coming soon. Subscribers will receive access automatically when it launches.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'multiple-contributors',
                question: 'Can multiple family members contribute to one archive?',
                answer: (
                    <>
                        <AnswerParagraph>Yes. Family members can be invited to view the archive, add photos, leave notes, and &mdash; if the storyteller agrees &mdash; contribute their own memories to the same archive from a different perspective. A grandmother in Miami and a granddaughter in Chicago can build the same story together.</AnswerParagraph>
                        <AnswerParagraph>The archive organizes contributions by who shared them, so the storyteller's voice remains primary. Contributions from other family members are clearly attributed and can be included in or excluded from the printed book.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'gift',
                question: 'Can I give A Story as a gift?',
                answer: (
                    <>
                        <AnswerParagraph>Yes &mdash; and it is one of the most meaningful gifts we see people give. A Story gift subscriptions can be set up entirely by the giver and presented as a complete experience: a device ready to begin, or a gift card the recipient activates at their own pace.</AnswerParagraph>
                        <AnswerParagraph>Many families give A Story as a birthday gift, a holiday present, or a "just because" expression of love. Some describe it as the only gift they've given where the whole family ends up in tears &mdash; in the best way.</AnswerParagraph>
                        <AnswerParagraph>Email us at contact@astoryapp.com to set up a gift subscription or ask about our gifting options.</AnswerParagraph>
                    </>
                ),
            },
        ],
    },
    {
        label: 'Cost & The Book',
        items: [
            {
                id: 'cost',
                question: 'What does A Story cost?',
                answer: (
                    <>
                        <AnswerParagraph>A Story is currently in early access. We are onboarding founding families and institutional partners through personal demos &mdash; pricing is shared during those conversations and is designed to be accessible for individual families.</AnswerParagraph>
                        <AnswerParagraph>
                            Founding families who book a demo now will receive preferred pricing when we launch publicly.{' '}
                            <LegalLink href="mailto:contact@astoryapp.com?subject=Book a Demo">Book a free 20-minute demo</LegalLink>{' '}
                            to learn more.
                        </AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'book-look-like',
                question: 'What does the printed book look like?',
                answer: (
                    <>
                        <AnswerParagraph>The A Story memoir is a hardcover book &mdash; sewn signatures, lay-flat binding, acid-free paper. Stories are organized by chapter of life (childhood, school years, career, family, legacy) and laid out like a real memoir, with photos printed alongside the stories they belong to.</AnswerParagraph>
                        <AnswerParagraph>The cover is cloth-bound with the storyteller's name and years. It is the kind of book that lives on a shelf for generations. We do not produce photo albums or scrapbooks &mdash; we produce memoirs.</AnswerParagraph>
                        <AnswerParagraph>Ordering a book is always optional. The digital archive is complete and valuable on its own. Many families order one book for the storyteller and additional copies as gifts for children and grandchildren.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'book-time',
                question: 'How long does it take to produce the book?',
                answer: (
                    <>
                        <AnswerParagraph>Once you approve the final layout, printing and shipping takes three to four weeks. We handle editing, layout, and design &mdash; you review a digital proof and request any changes before we go to print.</AnswerParagraph>
                        <AnswerParagraph>There is no minimum number of sessions required before ordering a book. Some families order after ten sessions; others after fifty. The book captures wherever the story is at the moment you decide to print it. The archive continues growing after the book ships.</AnswerParagraph>
                    </>
                ),
            }
        ]
    }
];

const Faq = () => {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        //if alr opened, next click will close it
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <FaqHero>
                <Container>
                    <Label>Questions &amp; answers</Label>
                    <HeroTitle>Everything you want to know about A Story.</HeroTitle>
                    <HeroSub>
                        Can't find your answer here? Email us at <br />
                        <LegalLink href="mailto:contact@astoryapp.com">contact@astoryapp.com</LegalLink> &mdash; we respond to every message.
                    </HeroSub>
                </Container>
            </FaqHero>

            <FaqSection>
                <NarrowContainer>
                    {faqGroups.map((group) => (
                        <FaqGroup key={group.label}>
                            <FaqGroupLabel>{group.label}</FaqGroupLabel>
                            {group.items.map((item) => {
                                const isOpen = openId === item.id;
                                return (
                                    <FaqItem key={item.id}>
                                        <FaqQuestion
                                            type="button"
                                            $isOpen={isOpen}
                                            onClick={() => toggleItem(item.id)}
                                        >
                                            {item.question}
                                            <FaqQuestionIcon $isOpen={isOpen}>+</FaqQuestionIcon>
                                        </FaqQuestion>
                                        <FaqAnswer $isOpen={isOpen}>
                                            <FaqAnswerInner>{item.answer}</FaqAnswerInner>
                                        </FaqAnswer>
                                    </FaqItem>
                                );
                            })}
                        </FaqGroup>
                    ))}
                </NarrowContainer>
            </FaqSection>

            <CtaSection>
                <Container>
                    <Label>Still have questions?</Label>
                    <CtaTitle>We're here. Ask us anything.</CtaTitle>
                    <CtaSub>
                        Every email gets a real response from a real person. We take questions seriously &mdash; they help us build A Story for the families who need it.
                    </CtaSub>
                    <CtaActions>
                        <a href="mailto:contact@astoryapp.com">
                            <PrimaryButton>Email us directly</PrimaryButton>
                        </a>
                        <Link to="/experience#demo">
                            <OutlineButton>Try the demo first</OutlineButton>
                        </Link>
                    </CtaActions>
                </Container>
            </CtaSection>
        </>
    );
};

export default Faq;