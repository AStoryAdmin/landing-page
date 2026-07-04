import { FooterContainer, FooterLogo, Grid, HeaderColumn, Column, Subtitle, Section, Page, Divider, BottomRow, License, Email, Platform} from './footer.styles';

import logoImg from './../assets/darkLogo.png'

const Footer = () => {
    return (
        <FooterContainer>
                <Grid>
                    <HeaderColumn>
                        <FooterLogo>
                            <img src={logoImg} alt="Dark-mode Story Logo" />
                            Story
                        </FooterLogo>
                        <Subtitle>
                            A memory-keeping service for families. Made easy for the people who have a lifetime to share.
                        </Subtitle>
                    </HeaderColumn>

                    <Column>
                        <Section>Product</Section>
                        <Page>Home</Page>
                        <Page>The Experience</Page>
                        <Page>For Families</Page>
                        <Page>For Institutions</Page>
                    </Column>

                    <Column>
                        <Section>Company</Section>
                        <Page>Our story</Page>
                        <Page>Contact</Page>
                    </Column>

                    <Column>
                        <Section>Legal</Section>
                        <Page>Terms of service</Page>
                        <Page>Privacy policy</Page>
                        <Page>FAQ</Page>
                    </Column>
                </Grid>
                <Divider />
                <BottomRow>
                    <License>&#169; 2026 A Story. All rights reserved.</License>
                    <Email>contact@astoryapp.com</Email>
                    <Platform>Web &middot; iOS &middot; Android</Platform>
                </BottomRow>
        </FooterContainer>
        
    )
}
export default Footer;