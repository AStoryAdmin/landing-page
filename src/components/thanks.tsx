import Seo from './ui/Seo';
import { Actions, Button, ButtonAnchor, Container, Eyebrow, H2, Lead, Note, Section } from './ui/primitives';
import { IconArrow, IconCheck } from './ui/icons';
import { CONTACT } from '../lib/contact';
import { FOREVER } from '../lib/pricing';
import { Page, Step, StepGrid, StepNumber, StepText, StepTitle } from './home.styles';
import { ForeverBand, ForeverList, ForeverStops, SameEmail } from './pricing.styles';

/**
 * Where Stripe sends someone after they pay.
 *
 * This route has to exist before the first Payment Link goes live — the
 * redirect in checkout.ts points here, and without it a paying customer's
 * very first experience of A Story is a 404.
 *
 * Its job is narrow: tell them what happens now, hand them the card, and make
 * the one thing we need from them obvious. Everything on this page assumes
 * fulfilment is manual, because at this volume it is.
 *
 * TIMINGS BELOW ARE PLACEHOLDERS — replace "within a few hours" and "the next
 * working day" with what you can actually commit to before this goes live. A
 * promise made on this page is made to someone who has already paid.
 */

const Thanks = () => (
    <Page>
        <Seo
            title="Thank you — here is what happens next"
            description="Your A Story plan is confirmed. Here is what happens now, and the one thing we need from you."
            path="/thanks"
            noindex
        />

        <Section $tone="wash" $tight>
            <Container>
                <div style={{ maxWidth: 720, margin: '0 auto clamp(32px, 4vw, 52px)', textAlign: 'center' }}>
                    <Eyebrow>Confirmed</Eyebrow>
                    <H2>Thank you. Nothing else is needed from you today.</H2>
                    <Lead $center>
                        A receipt is on its way to the email address you used. Below is exactly what
                        happens next, in order &mdash; and the one small thing we will need from you to
                        make the first call.
                    </Lead>
                </div>

                <SameEmail>
                    <strong>Sign up with the email address you just paid with.</strong>
                    <p>
                        That address is how your purchase finds your account &mdash; it is the only
                        thing linking the two. Use a different one and the app will look as though you
                        never bought anything, and we will have to put it right by hand. If you have
                        already signed up with another address, write to us now rather than later and
                        we will move it across.
                    </p>
                </SameEmail>

                <StepGrid>
                    <Step>
                        <p className="who">Now</p>
                        <StepNumber>1</StepNumber>
                        <StepTitle>Make the card</StepTitle>
                        <StepText>
                            Write your note, add their name, and print it for an envelope &mdash; or send
                            it as a link if you won&rsquo;t be in the room. It takes two minutes and it is
                            the part they open.
                        </StepText>
                    </Step>
                    <Step>
                        <p className="who">Us</p>
                        <StepNumber>2</StepNumber>
                        <StepTitle>We set up their archive</StepTitle>
                        <StepText>
                            We create the storyteller&rsquo;s archive from the details you gave at
                            checkout and email you their personal link, usually within a few hours and
                            always by the next working day.
                        </StepText>
                    </Step>
                    <Step>
                        <p className="who">You</p>
                        <StepNumber>3</StepNumber>
                        <StepTitle>Give it whenever suits</StepTitle>
                        <StepText>
                            Hand over the card on the day. Tell us the date and we will hold the first
                            call until then, so nothing spoils the surprise.
                        </StepText>
                    </Step>
                    <Step>
                        <p className="who">Them</p>
                        <StepNumber>4</StepNumber>
                        <StepTitle>The phone rings</StepTitle>
                        <StepText>
                            A Story calls, introduces itself by naming you, and asks. They answer and
                            talk. That is the whole of what is asked of them.
                        </StepText>
                    </Step>
                </StepGrid>

                <Actions $center>
                    <Button to="/card" $variant="primary">Make their card now <IconArrow /></Button>
                    <ButtonAnchor href={CONTACT.general} $variant="outline">Something looks wrong</ButtonAnchor>
                </Actions>

                <Note style={{ marginTop: 24, textAlign: 'center' }}>
                    Did not get a receipt within a few minutes? Check the spam folder first, then write to
                    us &mdash; we answer every message ourselves.
                </Note>
            </Container>
        </Section>

        {/* The promise worth repeating at the exact moment money has left. */}
        <Section $tone="ivory" $tight>
            <Container>
                <ForeverBand>
                    <Eyebrow $tone="gold">While we have your attention</Eyebrow>
                    <H2 style={{ color: 'inherit' }}>{FOREVER.headline}</H2>
                    <ForeverList>
                        {FOREVER.kept.map((item) => (
                            <li key={item}><IconCheck size={16} /><span>{item}</span></li>
                        ))}
                    </ForeverList>
                    <ForeverStops>
                        <strong>What actually changes:</strong> {FOREVER.stops}
                    </ForeverStops>
                </ForeverBand>
            </Container>
        </Section>
    </Page>
);

export default Thanks;
