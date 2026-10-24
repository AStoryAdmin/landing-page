import { Link } from "react-router-dom";
import { CONTACT } from "../../lib/contact";
import { SITE } from "../../lib/seo";
import Logo from "../../components/ui/Logo";
import ProgramMarks from "../../components/ui/ProgramMarks";
import { NVIDIA_TRADEMARK_NOTE } from "../../components/ui/InceptionBadge";
import { FooterShell } from "./chrome.styles";

/**
 * The back board, at the foot of every page (phase 2, 2026-10-23): the
 * cloth, quiet. The wordmark at an ordinary size, one plain line of what A
 * Story does, the address to write to, the rooms, the five program marks,
 * and one colophon line with the company's legal name. The explanation that
 * the photographs and people in the examples are illustrative lives here
 * once, behind a toggle.
 *
 * Round 2 (jury 1 #11, jury 2 U4):
 *   - four balanced columns of four or five rooms; Start free and Sign in
 *     left, they are in the header on every page;
 *   - the program marks on a single cream plate: one row where it fits,
 *     three and two below that, two by two with a sixth "what each one is"
 *     cell on a phone (round 3: never one mark alone on a row);
 *   - one legal line (the company and NVIDIA's attribution together);
 *   - on a phone the rooms fold into two groups, so the footer is about one
 *     screen instead of two and a half;
 *   - every link is a 44px target.
 */
type Room = { to: string; label: string; file?: boolean; mail?: boolean };
const GROUPS: { title: string; rooms: Room[] }[] = [
  {
    title: "The product",
    rooms: [
      { to: "/how-it-works", label: "How it works" },
      /* A page in public/, outside the router: a plain anchor. */
      { to: "/samples", label: "Sample books", file: true },
      { to: "/pricing", label: "Pricing" },
      { to: "/reserve", label: "Reserve for $1" },
      { to: "/compare", label: "Compare" },
    ],
  },
  {
    title: "Who it’s for",
    rooms: [
      { to: "/for-families", label: "Families" },
      { to: "/care-communities", label: "Care communities" },
      { to: "/organizations", label: "Institutions" },
      { to: "/your-story", label: "Your own story" },
    ],
  },
  {
    title: "Help",
    rooms: [
      { to: "/guides", label: "Conversation guides" },
      { to: "/questions", label: "Questions & answers" },
      { to: "/contact", label: "Contact" },
      { to: CONTACT.general, label: "Write to us", mail: true },
    ],
  },
  {
    title: "Company",
    rooms: [
      { to: "/our-story", label: "Our story" },
      { to: "/programs", label: "Programs & grants" },
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
    ],
  },
];

function RoomLink({ room }: { room: Room }) {
  return room.file || room.mail ? (
    <a href={room.to}>{room.label}</a>
  ) : (
    <Link to={room.to}>{room.label}</Link>
  );
}

/** The two folds on a phone: where to look, and who we are. */
const FOLDS = [
  { title: "Explore A Story", groups: GROUPS.slice(0, 2) },
  { title: "Help and company", groups: GROUPS.slice(2) },
];

export default function Footer() {
  /* NVIDIA's note opens with its own "© year"; the line already has one. */
  const nvidia = NVIDIA_TRADEMARK_NOTE.replace(/^©\s*\d{4}\s*/, "");
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
              <a href={CONTACT.general}>{SITE.email}</a>
            </p>
          </div>

          <nav className="gf-footer-links" aria-label="Site">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <h2>{g.title}</h2>
                {g.rooms.map((r) => (
                  <RoomLink key={r.label} room={r} />
                ))}
              </div>
            ))}
          </nav>

          <nav className="gf-footer-fold" aria-label="Site">
            {FOLDS.map((f) => (
              <details key={f.title}>
                <summary>
                  {f.title}
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </summary>
                <div className="fold-body">
                  {f.groups.map((g) => (
                    <div key={g.title}>
                      <h2>{g.title}</h2>
                      {g.rooms.map((r) => (
                        <RoomLink key={r.label} room={r} />
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </nav>
        </div>

        <div className="footer-credential">
          <p className="footer-programs">Startup programs &amp; grants</p>
          <Link
            to="/programs"
            className="footer-plate"
            aria-label="Startup programs and grants: A Story is a member of NVIDIA Inception, Google for Startups, the AssemblyAI Startup Program and the Deepgram Startup Program, and a Cartesia Startups grant recipient"
          >
            <ProgramMarks height={48} className="footer-marks" />
            {/* On a phone the five marks sit two by two; this fills the
                sixth cell, so no mark is left alone on a row. */}
            <span className="footer-plate-more" aria-hidden="true">
              What each one is
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* One legal line, with the note about the examples inline at its
            end (round 3, jury 1 #5: it floated alone on the right). */}
        <div className="gf-footer-bottom">
          <div className="footer-legal">
            © {new Date().getFullYear()} A Story Technologies, Inc.{" "}
            <span className="footer-trademark">{nvidia}</span>{" "}
            <details className="footer-about">
              <summary>About the examples</summary>
              <p>
                Photographs are AI-generated illustrations. Names and
                conversations in the demonstrations are fictional, not
                customer testimonials.
              </p>
            </details>
          </div>
        </div>
      </div>
    </FooterShell>
  );
}
