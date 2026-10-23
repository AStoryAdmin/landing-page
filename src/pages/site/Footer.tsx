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
 * The back of the namecard, at the foot of every page. The explanation that
 * photographs and people in the examples are illustrative lives here once,
 * behind a toggle, instead of under every image — the pages read as a family
 * archive, and the honesty is still one click away.
 */
export default function Footer() {
  return (
    <FooterShell>
      <div className="gf-width">
        <div className="gf-footer-top">
          <div>
            <Logo tone="dark" height={56} />
            <p className="footer-line">
              <span className="nb">Not a memoir to finish - </span>
              <br />
              <i>A Story</i> to keep, and to carry on.
            </p>
            <p className="footer-contact">
              <a href={CONTACT.general}>{SITE.email}</a>
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
              <Link to="/organizations">Organizations</Link>
              <Link to="/your-story">Your own story</Link>
            </div>
            <div>
              <h2>Company</h2>
              <Link to="/our-story">Our story</Link>
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
            <ProgramMarks height={48} />
          </Link>
        </div>
        <div className="gf-footer-bottom">
          <p>
            © {new Date().getFullYear()} A Story · A story of you, by you, and
            yours
          </p>
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
