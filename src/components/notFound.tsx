import styled from 'styled-components';
import Seo from './ui/Seo';
import { Actions, Button, Container, Eyebrow, H2, Lead, Section, TextLink } from './ui/primitives';
import { IconArrow } from './ui/icons';
import { color, font, media, space, type, weight } from '../styles/theme';

const Big = styled.p`
    font-family: ${font.display};
    font-size: clamp(5rem, 3rem + 10vw, 10rem);
    font-weight: ${weight.light};
    line-height: 0.9;
    color: rgba(15, 74, 88, 0.6);
    margin-bottom: ${space.md};
`;

const Links = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${space.lg};
    margin-top: ${space.xxl};
    padding-top: ${space.lg};
    border-top: 1px solid ${color.primaryLine};
    font-size: ${type.sm};

    ${media.sm} { flex-direction: column; gap: ${space.sm}; }
`;

const NotFound = () => (
    <Section $tone="ivory">
        <Seo
            title="Page not found — A Story"
            description="That page does not exist. Here is the way back."
            path="/404"
            noindex
        />
        <Container $narrow>
            <Big aria-hidden="true">404</Big>
            <Eyebrow>Not found</Eyebrow>
            <H2>This page didn&rsquo;t make it into the archive.</H2>
            <Lead>
                The link is broken or the page has moved. Nothing has been lost — everything worth keeping is
                one of these clicks away.
            </Lead>
            <Actions>
                <Button to="/" $variant="primary">Back to the home page</Button>
                <Button to="/experience" $variant="outline">See how A Story works</Button>
            </Actions>
            <Links>
                <TextLink to="/family">For families <IconArrow /></TextLink>
                <TextLink to="/organizations">For organizations <IconArrow /></TextLink>
                <TextLink to="/institution">For care communities <IconArrow /></TextLink>
                <TextLink to="/pricing">Pricing <IconArrow /></TextLink>
                <TextLink to="/faq">FAQ <IconArrow /></TextLink>
            </Links>
        </Container>
    </Section>
);

export default NotFound;
