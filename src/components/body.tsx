import {FirstPageContainer, Intro, Title, ListenText, Description, Highlight, ExtraDescription, Buttons, WaitlistButton, ActionButton, BulletPoints, BulletIcon} from './body.styles';

const Body = () => {
    return (
        <FirstPageContainer>
            {/* TITLE */}
            <Intro>
                    A Story &middot; coming soon to iPhone & Android
            </Intro>
            <Title>
                    <span>Talk.</span>
                    <br/>
                    <ListenText>Listen.</ListenText>
                    <br/>
                    <span>Remembered.</span>
            </Title>
            {/* DESCRIPTION */}
            <Description>
                A warm AI that <Highlight>gently interviews the people you love</Highlight> — and turns a lifetime of memories into a story your family keeps forever.
            </Description>
            <ExtraDescription>
                The most meaningful gift you can give a parent or grandparent: someone, finally, to ask. Captured in their own voice, while there's still time.
            </ExtraDescription>
            {/* BUTTONS */}
            <Buttons>
                <WaitlistButton>
                    Join the waitlist
                </WaitlistButton>
                <ActionButton>
                    Hear it in action
                </ActionButton>
            </Buttons>
            <BulletPoints>
                <BulletIcon>&#10022;</BulletIcon> Private &amp; secure 
                <BulletIcon>&#10022;</BulletIcon> Made for families
            </BulletPoints>
        </FirstPageContainer>
    )
}

export default Body;