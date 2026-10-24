import { Link } from "react-router-dom";
import { CONTACT } from "../../lib/contact";
import { SITE } from "../../lib/seo";
import Logo from "../../components/ui/Logo";
import ProgramMarks from "../../components/ui/ProgramMarks";
import {
  NVIDIA_TRADEMARK_NOTE,
} from "../../components/ui/InceptionBadge";
import { FooterShell } from "./chrome.styles";
import { APP, START_HREF, START_LABEL } from "../../lib/app";

/**
 * The back board, at the foot of every page (phase 2, 2026-10-23): the
 * cloth, quiet. The wordmark at an ordinary size, one plain line of what A
 * Story does, the way to write to us, the rooms, the five program badges,
 * and a colophon with the company's legal name. The explanation that the
 * photographs and people in the examples are illustrative lives here once,
 * behind a toggle. The namecard slogans left on 2026-10-23 (review: a
 * slogan said at the foot of every page reads as a tell).
 */
export default function Footer() {
  return (
    <FooterShell>
      <div className="gf-width">
        <div className="gf-footer-top">
          <div>
            <Logo tone="dark" height={48} />
            <p className="footer-line">
              A Story calls someone you love, listens, and keeps what they
              say in a private archive the whole family can add to.
            </p>
            <p className="footer-contact">
              <Link to="/contact">Contact us</Link> · <a href={CONTACT.general}>{SITE.email}</a>
            </p>
          </div>
          <div className="gf-footer-links">
            <div>
              <h2>The product</h2>
              <Link to="/how-it-works">How it works</Link>
              {/* A page in public/, outside the router: a plain anchor. */}
              <a href="/samples">Sample books</a>
              <Link to="/for-families">For families</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/compare">Compare</Link>
              <a href={START_HREF}>{START_LABEL}</a>
              <a href={APP.signIn}>Sign in</a>
            </div>
            <div>
              <h2>Help</h2>
              <Link to="/guides">Conversation guides</Link>
              <Link to="/questions">Questions &amp; answers</Link>
              <a href={CONTACT.general}>Get in touch</a>
            </div>
            <div>
              <h2>Also for</h2>
              <Link to="/care-communities">Care communities</Link>
              <Link to="/organizations">Institutions</Link>
              <Link to="/your-story">Your own story</Link>
            </div>
            <div>
              <h2>Company</h2>
              <Link to="/our-story">Our story</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/programs">Programs &amp; grants</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className="footer-credential">
          <p className="footer-programs">Startup programs &amp; grants</p>
          <Link
            to="/programs"
            aria-label="A Story is a member of NVIDIA Inception, Google for Startups, the AssemblyAI Startup Program and the Deepgram Startup Program, and a Cartesia Startups grant recipient"
          >
            <ProgramMarks height={40} />
          </Link>
        </div>
        <div className="gf-footer-bottom">
          <p>© {new Date().getFullYear()} A Story Technologies, Inc.</p>
          <details className="footer-about">
            <summary>About the examples</summary>
            <p>
              Photographs are AI-generated illustrations. Names and
              conversations in the demonstrations are fictional, not customer
              testimonials.
            </p>
          </details>
          <p className="footer-trademark">{NVIDIA_TRADEMARK_NOTE}</p>
        </div>
      </div>
    </FooterShell>
  );
}
