import { useRef } from 'react';
import EditorialSeo from './ui/EditorialSeo';
import MissionPhoto from './ui/MissionPhoto';
import ConversationPhoto from './ui/ConversationPhoto';
import { Actions, Button, ButtonEl } from './ui/primitives';
import {
    Container,
    Eyebrow,
    Lead,
    PageTitle,
    PhotoGrid,
    Section,
    SectionTitle,
    Split,
} from './ui/resolved.styles';
import MemoryJourney, {
    type MemoryJourneyHandle,
} from './product/MemoryJourney';
import { WAITLIST_HREF, WAITLIST_LABEL } from '../lib/checkout';
export default function YourStory() {
    const journey = useRef<MemoryJourneyHandle>(null);
    return (
        <>
            <EditorialSeo
                title="Your own story"
                path="/for-families#your-own-story"
                description="Talk, write, and keep the moments of your own life. Invite the people you choose to add their memories."
            />
            <Section>
                <Container>
                    <Split $ratio="5fr 6fr">
                        <div>
                            <Eyebrow>Your own story</Eyebrow>
                            <PageTitle>
                                Start where your mind goes first.
                            </PageTitle>
                            <Lead>
                                The places you lived. The work you did. The
                                people who changed you. Your story can begin
                                with any of them.
                            </Lead>
                            <Actions>
                                <Button to={WAITLIST_HREF}>
                                    {WAITLIST_LABEL}
                                </Button>
                            </Actions>
                        </div>
                        <ConversationPhoto priority />
                    </Split>
                </Container>
            </Section>
            <Section $paper>
                <Container>
                    <SectionTitle>
                        Talk it through. Or write it yourself.
                    </SectionTitle>
                    <Lead>
                        A question can help you begin. Write in your own time,
                        or follow a memory through a guided conversation. You
                        can return to the words and add another detail.
                    </Lead>
                    <Actions>
                        <ButtonEl
                            onClick={() =>
                                journey.current?.open('conversation')
                            }
                        >
                            Try talking
                        </ButtonEl>
                        <ButtonEl
                            $variant="outline"
                            onClick={() => journey.current?.open('write')}
                        >
                            Try writing
                        </ButtonEl>
                    </Actions>
                </Container>
            </Section>
            <MemoryJourney ref={journey} />
            <Section>
                <Container>
                    <SectionTitle>You have a say in the story.</SectionTitle>
                    <Split>
                        <Lead>
                            Read the memory card, return to the full transcript,
                            and listen to voice highlights in the app. A summary
                            does not replace what you said.
                        </Lead>
                        <Lead>
                            Invite the people you choose. They can add
                            photographs and their own recollections, with each
                            voice kept in view.
                        </Lead>
                    </Split>
                </Container>
            </Section>
            <Section>
                <Container>
                    <SectionTitle>There is more ahead.</SectionTitle>
                    <PhotoGrid>
                        <MissionPhoto
                            name="44"
                            alt="Life in a first apartment"
                            caption="A place of your own · 2024"
                        />
                        <MissionPhoto
                            name="25"
                            alt="An adult and child cooking together"
                            caption="Learning together · 2026"
                        />
                        <MissionPhoto
                            name="35"
                            alt="An adult carrying laundry through a home"
                            caption="The everyday · today"
                        />
                    </PhotoGrid>
                    <Actions>
                        <Button to={WAITLIST_HREF}>{WAITLIST_LABEL}</Button>
                    </Actions>
                </Container>
            </Section>
        </>
    );
}
