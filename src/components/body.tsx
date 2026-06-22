import {useState, useEffect, useRef} from 'react'
import {FirstPageContainer, Intro, Title, ListenText, Description, Highlight, ExtraDescription, Buttons, WaitlistButton, ActionButton, BulletPoints, BulletIcon} from './body.styles';
import Story from './story'

const Body = () => {
    const [showStory, setShowStory] = useState(false)
    const storyRef = useRef<HTMLDivElement>(null)

    useEffect (() => {
        // force scroll to top
        window.history.scrollRestoration = 'manual'
        window.scrollTo(0, 0)
    }, [])

    const handleActionClick = () => {
        setShowStory(true)
    }

    useEffect(() => {
        if (showStory) {
            // unlock
            document.body.style.overflow = 'auto'
        } else {
            // lock
            document.body.style.overflow = 'hidden'
        }
    }, [showStory])

    useEffect(() => {
        if (showStory && storyRef.current) {
            storyRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [showStory])

    return (
        <>
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
                A warm AI that <Highlight>gently interviews the people you love</Highlight> &mdash; and turns a lifetime of memories into a story your family keeps forever.
            </Description>
            <ExtraDescription>
                The most meaningful gift you can give a parent or grandparent: someone, finally, to ask. Captured in their own voice, while there's still time.
            </ExtraDescription>
            {/* BUTTONS */}
            <Buttons>
                <WaitlistButton>
                    Join the waitlist
                </WaitlistButton>

                {!showStory && (
                    <ActionButton onClick={handleActionClick}>
                        Hear it in action
                    </ActionButton>
                )}
            </Buttons>
            <BulletPoints>
                <BulletIcon>&#10022;</BulletIcon> Private &amp; secure 
                <BulletIcon>&#10022;</BulletIcon> Made for families
            </BulletPoints>
        </FirstPageContainer>
        {showStory && <div ref={storyRef}><Story/></div>}
        </>
    )
}

export default Body;