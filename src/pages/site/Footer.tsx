import { Link } from "react-router-dom";
import { CONTACT } from "../../lib/contact";
import { SITE } from "../../lib/seo";
import Logo from "../../components/ui/Logo";
import { FooterShell } from "./chrome.styles";

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
            <Logo tone="dark" height={42} />
            <p className="footer-line">
              Not a memoir to finish — <i>A Story</i> to keep, and to carry on.
            </p>
            <p className="footer-contact">
              <a href={CONTACT.general}>{SITE.email}</a>
            </p>
          </div>
          <div className="gf-footer-links">
            <div>
              <h2>The product</h2>
              <Link to="/how-it-works">How it works</Link>
              <Link to="/for-families">For families</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/start">Join the waitlist</Link>
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
            </div>
            <div>
              <h2>Company</h2>
              <Link to="/our-story">Our story</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className="gf-footer-bottom">
          <p>© {new Date().getFullYear()} A Story · A story of you, by you, and yours</p>
          <details className="footer-about">
            <summary>About the examples</summary>
            <p>
              Photographs are AI-generated illustrations. Names and
              conversations in the demonstrations are fictional, not customer
              testimonials.
            </p>
          </details>
        </div>
      </div>
    </FooterShell>
  );
}
