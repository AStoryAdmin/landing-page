import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './ui/Logo';
import { color, font, media, space } from '../styles/theme';
import { SITE } from '../lib/seo';
const Root = styled.footer`
    padding: 48px ${space.gutter} 24px;
    background: ${color.primary};
    color: ${color.onDark};
    font-size: 1rem;
    .inner {
        max-width: 1312px;
        margin: auto;
    }
    .brand {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 28px;
        padding-bottom: 32px;
        border-bottom: 1px solid ${color.onDarkLine};
    }
    .brand p {
        color: ${color.onDarkMuted};
        max-width: 27ch;
        font: 400 1.2rem/1.4 ${font.display};
    }
    .links {
        display: grid;
        grid-template-columns: 1fr 1.2fr 1fr 1.4fr;
        gap: 28px;
        padding: 32px 0;
    }
    h2 {
        font: 500 0.8125rem/1.4 ${font.body};
        color: ${color.gold};
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 12px;
    }
    a {
        display: block;
        width: fit-content;
        max-width: 100%;
        min-height: 36px;
        text-decoration: none;
        padding: 6px 0;
        overflow-wrap: anywhere;
    }
    a:hover {
        text-decoration: underline;
        text-underline-offset: 5px;
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        border-top: 1px solid ${color.onDarkLine};
        padding-top: 24px;
        color: ${color.onDarkMuted};
        font-size: 0.8125rem;
        line-height: 1.5;
    }
    ${media.md} {
        .links {
            grid-template-columns: 1fr 1fr;
        }
    }
    ${media.sm} {
        a {
            min-height: 44px;
        }
        .brand {
            align-items: start;
            flex-direction: column;
        }
        .brand p {
            font-size: 1.125rem;
        }
        .bottom {
            flex-direction: column;
            gap: 12px;
        }
    }
`;
export default function Footer() {
    return (
        <Root>
            <div className="inner">
                <div className="brand">
                    <Logo height={38} tone="dark" variant="simple" />
                    <p>
                        A living family archive.
                        <br />
                        In your words. In their voices.
                    </p>
                </div>
                <div className="links">
                    <div>
                        <h2>Explore</h2>
                        <Link to="/how-it-works">How it works</Link>
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/questions">Questions & answers</Link>
                        <Link to="/guides">Guides</Link>
                    </div>
                    <div>
                        <h2>Who it’s for</h2>
                        <Link to="/for-families">For families</Link>
                        <Link to="/for-families#your-own-story">
                            Tell your own story
                        </Link>
                        <Link to="/care-communities">Care communities</Link>
                        <Link to="/organizations">Organizations</Link>
                    </div>
                    <div>
                        <h2>Company</h2>
                        <Link to="/our-story">Our story</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms of service</Link>
                    </div>
                    <div>
                        <h2>Contact</h2>
                        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                        <Link to="/start">Join the waitlist</Link>
                    </div>
                </div>
                <div className="bottom">
                    <span>© {new Date().getFullYear()} A Story</span>
                    <span>
                        Archive photographs and demonstration memories are
                        illustrative.
                    </span>
                </div>
            </div>
        </Root>
    );
}
