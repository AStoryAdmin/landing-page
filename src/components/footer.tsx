import { useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
import { Button } from './ui/primitives';
import { SITE } from '../lib/seo';
import {
    BottomLinks, BottomRow, BrandColumn, BrandLine, Column, CtaActions, CtaBand, CtaInner, CtaSub,
    CtaTitle, Divider, External, FooterContainer, Inner, Page, Platform, Section, Top,
} from './footer.styles';

/**
 * Every marketing page ends the same way: one clear invitation, then the map of
 * the site. The CTA band is suppressed on /signup, where the page itself is the
 * conversion surface.
 */
const Footer = () => {
    const { pathname } = useLocation();
    const showCta = pathname !== '/signup';

    return (
        <>
            {showCta && (
                <CtaBand aria-labelledby="footer-cta-title">
                    <CtaInner>
                        <CtaTitle id="footer-cta-title">
                            The stories are still here. <em>The chance to ask is the part that runs out.</em>
                        </CtaTitle>
                        <CtaSub>
                            Start with one conversation this week — a parent, a founder, a resident, a retiring
                            colleague. We&rsquo;ll handle the rest.
                        </CtaSub>
                        <CtaActions>
                            <Button to="/signup" $variant="gold">Start a story — free</Button>
                            <Button to="/signup?for=organization" $variant="onDark">Talk to us about your organization</Button>
                        </CtaActions>
                    </CtaInner>
                </CtaBand>
            )}

            <FooterContainer>
                <Inner>
                    <Top>
                        <BrandColumn>
                            <Logo height={56} tone="dark" variant="horizontal" />
                            <BrandLine>
                                A Story keeps what people carry — for families, for care communities, and for
                                organizations whose history deserves to outlive the people who made it.
                            </BrandLine>
                        </BrandColumn>

                        <Column>
                            <Section>Product</Section>
                            <Page to="/experience">How it works</Page>
                            <Page to="/pricing">Pricing</Page>
                            <Page to="/experience#demo">Live demo</Page>
                            <Page to="/experience#book">The keepsake book</Page>
                        </Column>

                        <Column>
                            <Section>Who it&rsquo;s for</Section>
                            <Page to="/family">Families</Page>
                            <Page to="/organizations">Organizations</Page>
                            <Page to="/institution">Care communities</Page>
                            <Page to="/signup?for=organization">Book a demo</Page>
                        </Column>

                        <Column>
                            <Section>Company</Section>
                            <Page to="/story">Our story</Page>
                            <Page to="/faq">FAQ</Page>
                            <External href={`mailto:${SITE.email}`}>Contact</External>
                            <Page to="/signup">Early access</Page>
                        </Column>

                        <Column>
                            <Section>Trust</Section>
                            <Page to="/privacy">Privacy policy</Page>
                            <Page to="/terms">Terms of service</Page>
                            <Page to="/organizations#security">Security &amp; compliance</Page>
                            <Page to="/institution#compliance">Data commitments</Page>
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
