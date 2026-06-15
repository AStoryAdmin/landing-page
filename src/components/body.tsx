import { useState } from 'react';
import {FirstPageContaniner, Intro, Title, ListenText, Description1, Highlight, Description2, Buttons, WaitlistButton, ActionButton, BulletPoints, BulletIcon} from './body.styles';

const Body = () => {
    return (
        <FirstPageContaniner>
            {/* TITLE */}
            <Intro>
                    A Story · coming soon to iPhone & Android
            </Intro>
            <Title>
                    <span>Talk.</span>
                    <br/>
                    <ListenText>Listen.</ListenText>
                    <br/>
                    <span>Remembered.</span>
            </Title>
            {/* DESCRIPTION */}
            <Description1>
                A warm AI that <Highlight>gently interviews the people you love</Highlight> — and turns a lifetime of memories into a story your family keeps forever.
            </Description1>
            <Description2>
                The most meaningful gift you can give a parent or grandparent: someone, finally, to ask. Captured in their own voice, while there's still time.
            </Description2>
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
                <BulletIcon>✦</BulletIcon> Private & secure 
                <BulletIcon>✦</BulletIcon> Made for families
            </BulletPoints>
        </FirstPageContaniner>
    )
}

export default Body;