import { useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
import { ButtonAnchor, Button } from './ui/primitives';
import { CONTACT } from '../lib/contact';
import { SITE } from '../lib/seo';
import { WAITLIST_HREF, WAITLIST_LABEL } from '../lib/checkout';
import {
    BottomLinks, BottomRow, BrandColumn, BrandLine, Column, CtaActions, CtaBand, CtaInner, CtaSub,
    CtaTitle, Divider, External, FooterContainer, Inner, Page, Platform, Section, Top,
} from './footer.styles';

/**
 * Every marketing page ends with the same invitation. The organization and
 * care-community pages get their own version of it, since the person reading
 * those is not buying a present.
 */
const Footer = () => {
    const { pathname } = useLocation();
    const forOrgs = pathname === '/organizations' || pathname === '/institution';

    return (
        <>
            <CtaBand aria-labelledby="footer-cta-title">
                <CtaInner>
                    {forOrgs ? (
                        <>
                            <CtaTitle id="footer-cta-title">
                                The stories are still here. <em>The people who hold them are leaving.</em>
                            </CtaTitle>
                            <CtaSub>
                                Thirty minutes, your questions answered, and a scoped plan with a fixed
                                number. No procurement marathon, no obligation.
                            </CtaSub>
                            <CtaActions>
                                <ButtonAnchor
                                    href={pathname === '/institution' ? CONTACT.community : CONTACT.organization}
                                    $variant="gold"
                                >
                                    Talk to us
                                </ButtonAnchor>
                                <Button to="/pricing" $variant="onDark">See how pricing works</Button>
                            </CtaActions>
                        </>
                    ) : (
                        <>
                            <CtaTitle id="footer-cta-title">
                                One gift. <em>Your whole family opens it.</em>
                            </CtaTitle>
                            <CtaSub>
                                Give it this year, while the person who holds the stories is still here to
                                tell them. You send one link. We do the rest.
                            </CtaSub>
                            <CtaActions>
                                <Button to={WAITLIST_HREF} $variant="gold">{WAITLIST_LABEL}</Button>
                                <Button to="/experience" $variant="onDark">See what they receive</Button>
                            </CtaActions>
                        </>
                    )}
                </CtaInner>
            </CtaBand>

            <FooterContainer>
                <Inner>
                    <Top>
                        <BrandColumn>
                            <Logo height={56} tone="dark" variant="horizontal" />
                            <BrandLine>
                                The gift of being asked. A Story keeps what the people you love carry &mdash;
                                in their own voice, for everyone who comes after.
                            </BrandLine>
                        </BrandColumn>

                        <Column>
                            <Section>The gift</Section>
                            <Page to="/experience">How it works</Page>
                            <Page to="/pricing">Pricing</Page>
                            <Page to="/#occasions">Occasions</Page>
                            <Page to="/experience#book">The keepsake book</Page>
                        </Column>

                        <Column>
                            <Section>Learn more</Section>
                            <Page to="/family">Why it matters</Page>
                            <Page to="/your-story">Record your own life</Page>
                            <Page to="/experience#demo">Live demo</Page>
                            <Page to="/faq">FAQ</Page>
                            <Page to="/story">Our story</Page>
                        </Column>

                        <Column>
                            <Section>Also for</Section>
                            <Page to="/organizations">Organizations</Page>
                            <Page to="/institution">Care communities</Page>
                            <External href={CONTACT.organization}>Talk to us</External>
                        </Column>

                        <Column>
                            <Section>Trust</Section>
                            <Page to="/privacy">Privacy policy</Page>
                            <Page to="/terms">Terms of service</Page>
                            <Page to="/organizations#security">Security &amp; compliance</Page>
                            <External href={CONTACT.general}>Contact</External>
                        </Column>
                    </Top>

                    <Divider />

                    <BottomRow>
                        <span>&copy; {new Date().getFullYear()} A Story. All rights reserved.</span>
                        <BottomLinks>
                            <External href={`mailto:${SITE.email}`}>{SITE.email}</External>
                            <Platform>Web &middot; iOS &middot; Android</Platform>
                        </BottomLinks>
                    </BottomRow>
                </Inner>
            </FooterContainer>
        </>
    );
};

export default Footer;
