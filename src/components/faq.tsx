import Seo from './ui/Seo';
import { breadcrumbSchema, faqSchema, organizationSchema } from '../lib/seo';
import { nodeToText } from '../lib/nodeText';
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
        label: 'Giving it as a gift',
        items: [
            {
                id: 'gift-day',
                question: 'What do I actually hand them on the day?',
                answer: (
                    <>
                        <AnswerParagraph>A card with a short note from you and one link underneath. We send you a version to print at home and a version to text or email, so it works whether you are handing it over at the table or you are three time zones away.</AnswerParagraph>
                        <AnswerParagraph>Nothing expires and nothing has to happen on the day. The link installs A Story and books the first call &mdash; whenever they are ready, that evening or in February &mdash; and you can do that step for them if you would rather they never saw it.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'gift-tech',
                question: 'The person I am giving it to is hopeless with technology.',
                answer: (
                    <>
                        <AnswerParagraph>Then they are exactly who this was built for. A Story calls them, and they answer the phone and talk &mdash; the way they would to anyone else. No tapping, no typing, no password, nothing to remember. If they can answer a phone call, they can do this, because that is all it is.</AnswerParagraph>
                        <AnswerParagraph>There is an app, and it does get installed on their phone or tablet &mdash; but that happens once, it takes a couple of minutes, and you can do it for them. After that they never have to open it unless they want to.</AnswerParagraph>
                        <AnswerParagraph>If they do get stuck, we help them directly &mdash; you do not become their tech support.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'gift-work',
                question: 'How much work is this for me after I buy it?',
                answer: (
                    <>
                        <AnswerParagraph>Sending the link. That is the whole job. A Story does the asking, the transcribing, the organizing by chapter of life, and the book layout. You are told when there is something new to read.</AnswerParagraph>
                        <AnswerParagraph>This is the difference between a gift and a project, and it is the thing we care most about getting right. Nobody wants to give a present that turns into homework for themselves.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'gift-family',
                question: 'Can my brothers and sisters go in on it with me?',
                answer: (
                    <>
                        <AnswerParagraph>Yes, and many families do &mdash; four siblings splitting one gift is a common way this gets bought. There is one purchase and one archive; everybody you invite can read it, add photos, correct a name, or record their own memory.</AnswerParagraph>
                        <AnswerParagraph>We never charge per family member. Inviting fifteen cousins costs exactly the same as inviting nobody. <Bold>See <Link to="/pricing">pricing</Link>.</Bold></AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'gift-unused',
                question: 'What if they never get round to using it?',
                answer: (
                    <>
                        <AnswerParagraph>Most people who insist they have nothing worth telling end up talking for hours &mdash; being asked properly is unusual enough that it tends to land. But it does not always, and there is no clock: the link stays open, and the first question is waiting whenever they are.</AnswerParagraph>
                        <AnswerParagraph>If it genuinely is not for them, tell us and we will make it right. We would rather refund a gift than have it sit there as a reproach.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'gift-timing',
                question: 'Will it arrive in time for Christmas or a birthday?',
                answer: (
                    <>
                        <AnswerParagraph>The card and the link are ready within minutes, so the gift itself is never the thing that runs late. Tell us the date and we will make sure you have everything to hand over on the day.</AnswerParagraph>
                        <AnswerParagraph>The printed book comes later, once there are stories to print &mdash; three to four weeks from the moment you approve the layout. Most families treat the book as a second gift that arrives months after the first.</AnswerParagraph>
                    </>
                ),
            }
        ]
    },
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
                        <AnswerParagraph>A Story is designed for older adults &mdash; parents, grandparents, aunts and uncles &mdash; who have a lifetime of stories that deserve to be kept. It is especially designed for people who are not comfortable with technology: after a one-time setup that somebody else can do, the phone rings and they talk. There is no learning curve, because there is nothing to learn.</AnswerParagraph>
                        <AnswerParagraph>It is also used by adult children and grandchildren who want their family's history written down while it is still being made &mdash; as a gift, a project, or simply an act of love.</AnswerParagraph>
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
                        <AnswerParagraph>The first conversation can begin in about two minutes. Install A Story, choose a chapter of life to begin in, and the first question comes straight away &mdash; there is no account to build out and no tutorial to sit through.</AnswerParagraph>
                        <AnswerParagraph>If you are setting it up as a gift for a parent or grandparent, you do that five-minute setup yourself. After that, A Story calls them and they answer. It does not just feel like receiving a phone call &mdash; it is one.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'devices',
                question: 'What devices does it work on?',
                answer: (
                    <>
                        <AnswerParagraph>The A Story app runs on iPhone, iPad and Android, and the archive can also be read in any modern web browser. Tablets give older adults the most comfortable reading experience: large text, easy touch targets, and a good microphone.</AnswerParagraph>
                        <AnswerParagraph>For the storyteller, though, the device barely matters. The conversations happen over a phone call, so whatever they already answer the phone on is what they use.</AnswerParagraph>
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
<AnswerParagraph>Yes &mdash; and it is one of the most meaningful gifts we see people give. There is no subscription to hand over: you buy a package once, and it can be set up entirely by the giver and presented as a complete experience &mdash; a device ready to begin, or a card the recipient opens at their own pace.</AnswerParagraph>
                        <AnswerParagraph>Many families give A Story as a birthday gift, a holiday present, or a "just because" expression of love. Some describe it as the only gift they've given where the whole family ends up in tears &mdash; in the best way.</AnswerParagraph>
<AnswerParagraph>Email us at contact@astoryapp.com to set one up or ask about gifting options.</AnswerParagraph>
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
<AnswerParagraph>You pay to capture, and never to keep. $150 buys three months of guided conversations with one storyteller; $390 covers up to three storytellers for the same three months; and Express is $250 for one storyteller with no cap at all, for the week when there is no time to be relaxed about it.</AnswerParagraph>
                        <AnswerParagraph>Whichever one you buy, the archive, the exports, the photo uploads, the question bank and everyone you invite are free &mdash; during the window and forever afterwards. When it ends, only the AI conversations pause. Nothing renews, nothing lapses, and nothing you have already recorded is ever locked.</AnswerParagraph>
                        <AnswerParagraph>The hardcover is $89, priced on its own so that printing one never means the story is finished, with extra copies at $59. Organization and care-community programs are quoted per engagement on a 30-minute call.</AnswerParagraph>
                        <AnswerParagraph>
                            <Bold><Link to="/pricing">See the full pricing breakdown</Link></Bold>, or{' '}
                            <LegalLink href="mailto:contact@astoryapp.com?subject=Book a Demo">book a free 20-minute demo</LegalLink>.
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
    },
    {
        label: 'For organizations',
        items: [
            {
                id: 'org-what',
                question: 'What does A Story do for a company or organization?',
                answer: (
                    <>
                        <AnswerParagraph>The same guided interview that gets a grandmother talking about 1958 gets a founder talking about 1997. Organizations use A Story to capture founder and leadership interviews, the judgment of long-tenured employees before they retire, milestone and anniversary histories, and the culture stories that new hires never otherwise hear.</AnswerParagraph>
                        <AnswerParagraph>You end up with a searchable internal archive, an onboarding story library, and a printed hardcover history of the organization &mdash; the thing that gets handed to whoever runs the place in fifty years. <Bold>See <Link to="/organizations">A Story for Organizations</Link> for the full picture.</Bold></AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'org-time',
                question: 'How much time does it take from our people?',
                answer: (
                    <>
                        <AnswerParagraph>A useful archive comes from three to five sessions of twenty to forty minutes per storyteller. Nobody blocks out a day, and sessions resume exactly where they left off &mdash; a founder can do fifteen minutes between meetings and pick it up the following week.</AnswerParagraph>
                        <AnswerParagraph>On your side, the coordinating effort is a few hours a month: deciding who to record and making the introductions. There is no interviewer to train, no transcription queue, and no editing backlog.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'org-security',
                question: 'Will this pass our security and legal review?',
                answer: (
                    <>
                        <AnswerParagraph>Content is encrypted at rest and in transit, access is scoped per person and revocable, and every participant consents to what is recorded and who can see it. We never train AI models on your content and never share it with third parties &mdash; contractually, not just as a policy statement.</AnswerParagraph>
                        <AnswerParagraph>We provide a data processing agreement, a subprocessor list, data-flow documentation and encryption standards for review, and we answer security questionnaires within 24 hours. In clinical settings we also provide a business associate agreement.</AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'org-pricing',
                question: 'How is an organization program priced?',
                answer: (
                    <>
                        <AnswerParagraph>Per program, quoted after a 30-minute call. Three things move the number: how many people you want interviewed, whether you want printed volumes and how many, and whether we facilitate the flagship sessions ourselves.</AnswerParagraph>
                        <AnswerParagraph>What does not move the number: how many colleagues read the archive, how much you record, or how long you keep it. There is no per-viewer licensing and no storage metering. <Bold>See <Link to="/pricing">pricing</Link>.</Bold></AnswerParagraph>
                    </>
                ),
            },
            {
                id: 'org-ownership',
                question: 'What happens to the archive if we stop working with you?',
                answer: (
                    <>
                        <AnswerParagraph>You keep everything. A full export of audio, transcripts, media and metadata is available on request within 48 hours, in open formats, whether or not you are still a customer.</AnswerParagraph>
                        <AnswerParagraph>We do not delete archives on lapse and we do not hold anyone's history hostage to a renewal. That is a deliberate design decision, not a concession.</AnswerParagraph>
                    </>
                ),
            }
        ]
    }
];

/* Every question on the page, flattened for the FAQPage rich result. */
const schemaEntries = faqGroups.flatMap((group) =>
    group.items.map((item) => ({ q: item.question, a: nodeToText(item.answer) }))
);

const Faq = () => {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        //if alr opened, next click will close it
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <Seo
                title="Frequently asked questions — A Story"
                description="What you hand over on the day, whether it works for someone who hates technology, what it costs, who owns the stories, and what organizations and care communities can expect."
                path="/faq"
                schema={[
                    organizationSchema(),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'FAQ', path: '/faq' },
                    ]),
                    faqSchema(schemaEntries),
                ]}
            />
            <FaqHero>
                <Container>
                    <Label>Questions &amp; answers</Label>
                    <HeroTitle>Everything you want to know before you give it.</HeroTitle>
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