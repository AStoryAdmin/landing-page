import styled from 'styled-components';
import Seo from './ui/Seo';
import {
    Actions,
    Button,
    Container,
    Eyebrow,
    H2,
    Lead,
    Section,
    TextLink,
} from './ui/primitives';
import { color, font, media, space, type, weight } from '../styles/theme';

const Big = styled.p`
    font-family: ${font.display};
    font-size: clamp(5rem, 3rem + 10vw, 10rem);
    font-weight: ${weight.light};
    line-height: 0.9;
    color: ${color.bodyMuted};
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

    ${media.sm} {
        flex-direction: column;
        gap: ${space.sm};
    }
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
            <H2 as="h1">This page didn&rsquo;t make it into the archive.</H2>
            <Lead>
                The link is broken or the page has moved. Nothing has been lost
                — everything worth keeping is one of these clicks away.
            </Lead>
            <Actions>
                <Button to="/" $variant="primary">
                    Back to the home page
                </Button>
                <Button to="/how-it-works" $variant="outline">
                    See how A Story works
                </Button>
            </Actions>
            <Links>
                <TextLink to="/for-families">For families</TextLink>
                <TextLink to="/organizations">For organizations</TextLink>
                <TextLink to="/care-communities">For care communities</TextLink>
                <TextLink to="/pricing">Pricing</TextLink>
                <TextLink to="/questions">FAQ</TextLink>
            </Links>
        </Container>
    </Section>
);

export default NotFound;
