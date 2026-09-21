import Seo from './ui/Seo';
import MissionPhoto from './ui/MissionPhoto';
import { Actions, Button, ButtonAnchor } from './ui/primitives';
import {
    Band,
    Copy,
    Heading,
    IntroGrid,
    Label,
    Rows,
    Small,
    Title,
    Wrap,
} from './ui/editorial.styles';
import { CONTACT } from '../lib/contact';
export default function Thanks() {
    return (
        <>
            <Seo
                title="After your purchase — A Story"
                path="/thanks"
                noindex
                description="What happens after an A Story purchase: account setup, your receipt email, and the first conversation."
            />
            <Band>
                <Wrap>
                    <IntroGrid>
                        <div>
                            <Label>Your next chapter</Label>
                            <Title>Your next step with A Story.</Title>
                            <Copy>
                                <p>
                                    If you have completed a purchase, use the
                                    same email address when signing up in the
                                    app. It is how we connect your purchase to
                                    your account.
                                </p>
                            </Copy>
                            <Small>
                                This page does not verify a payment. Your
                                checkout receipt is your confirmation.
                            </Small>
                        </div>
                        <MissionPhoto
                            name="35"
                            alt="Everyday family life continuing in a living room"
                            caption="There is always another story to tell."
                            priority
                        />
                    </IntroGrid>
                </Wrap>
            </Band>
            <Band $paper>
                <Wrap>
                    <Heading>
                        The first conversation
                        <br />
                        begins with a little setup.
                    </Heading>
                    <Rows>
                        <article>
                            <h3>We help set it up</h3>
                            <p>
                                For a completed purchase, we use your checkout
                                details to help connect your account and arrange
                                the next steps with you.
                            </p>
                        </article>
                        <article>
                            <h3>You choose the moment</h3>
                            <p>
                                Tell us when you want the first call. If this is
                                a gift, we will agree on the timing with you.
                            </p>
                        </article>
                        <article>
                            <h3>They answer and talk</h3>
                            <p>
                                After the app is installed, the storyteller
                                answers the scheduled call. The archive begins
                                to grow.
                            </p>
                        </article>
                    </Rows>
                    <Actions>
                        <Button to="/how-it-works">Explore the experience</Button>
                        <ButtonAnchor href={CONTACT.general} $variant="outline">
                            Get help with your purchase
                        </ButtonAnchor>
                    </Actions>
                </Wrap>
            </Band>
        </>
    );
}
