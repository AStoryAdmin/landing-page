import { Link, useLocation } from "react-router-dom";
import { CONTACT } from "../../lib/contact";
import { SITE } from "../../lib/seo";
import {
  FOOTER_GROUPS,
  FOOTER_SLIM,
  bare,
  isFile,
  route,
  type RoutePath,
} from "../../lib/nav";
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
 * Premium pass (2026-11-02, design spec §1.3):
 *   - four columns, 16 page links and the one email, no repeats; the labels
 *     come from lib/nav.ts. "Reserve for $1" left (Reserve is reached from
 *     Pricing) and so did "Write to us" (the address above is the email).
 *     "Joining a family's book" → /join is the door for someone invited in;
 *   - the program-marks plate is a figure, not a link ("Programs & grants"
 *     in the Company column is the way in), and it is not shown on
 *     /programs itself;
 *   - on a phone the rooms still fold into two groups;
 *   - `variant="slim"`: the legal line and Privacy · Terms · Contact only,
 *     for the account doors, /thanks and /l;
 *   - every link is a 44px target.
 */
function RoomLink({ path }: { path: RoutePath }) {
  const r = route(path);
  return isFile(r.to) ? (
    <a href={r.to}>{r.label}</a>
  ) : (
    <Link to={r.to}>{r.label}</Link>
  );
}

/* Phone-first fix 3 (item 14, Harold #7, Tuan #5): the three doors for
   someone who was sent a link sit together under one small heading, in
   the "Who it's for" column. Every page stays linked; the labels are still
   lib/nav.ts ROUTES ("Invited to a family's book", "Asked to tell your
   story?", "Your own story"). */
const SENT_HERE: RoutePath[] = ["/join", "/how-it-works#being-asked", "/your-story"];
const SENT_TITLE = "If you were sent here";

function Group({ title, rooms }: { title: string; rooms: RoutePath[] }) {
  const sent = rooms.filter((p) => SENT_HERE.includes(p));
  return (
    <div>
      <h2>{title}</h2>
      {rooms
        .filter((p) => !SENT_HERE.includes(p))
        .map((p) => (
          <RoomLink key={p} path={p} />
        ))}
      {sent.length > 0 && (
        <>
          <h3>{SENT_TITLE}</h3>
          {SENT_HERE.filter((p) => sent.includes(p)).map((p) => (
            <RoomLink key={p} path={p} />
          ))}
        </>
      )}
    </div>
  );
}

/** The two folds on a phone. */
const FOLDS = [
  { title: "The product and who it’s for", groups: FOOTER_GROUPS.slice(0, 2) },
  { title: "Help and company", groups: FOOTER_GROUPS.slice(2) },
];

/* Phone-first fix 1 (item 10, Tuan #5, Priya #3): the funding logo wall
   shows only where it belongs, the pages that speak to partners and
   institutions. /programs shows the marks itself (and so keeps the
   trademark note below). Everywhere else the Company column's "Programs &
   grants" link is the way in. */
const MARKS_PAGES = new Set(["/our-story", "/organizations", "/care-communities"]);
const NVIDIA_NOTE_PAGES = new Set([...MARKS_PAGES, "/programs"]);

function LegalLine({ nvidia }: { nvidia?: string }) {
  return (
    <div className="footer-legal">
      © {new Date().getFullYear()} A Story Technologies, Inc.{" "}
      {nvidia && (
        <>
          <span className="footer-trademark">{nvidia}</span>{" "}
        </>
      )}
      <details className="footer-about">
        <summary>About the examples</summary>
        <p>
          Photographs are AI-generated illustrations. Names and conversations
          in the demonstrations are fictional, not customer testimonials.
        </p>
      </details>
    </div>
  );
}

export default function Footer({ variant }: { variant?: "slim" }) {
  const { pathname } = useLocation();
  /* NVIDIA's note opens with its own "© year"; the line already has one. */
  const page = bare(pathname);
  const nvidia = NVIDIA_NOTE_PAGES.has(page)
    ? NVIDIA_TRADEMARK_NOTE.replace(/^©\s*\d{4}\s*/, "")
    : undefined;
  if (variant === "slim")
    return (
      <FooterShell data-variant="slim">
        <div className="gf-width gf-footer-slim">
          <LegalLine />
          <nav aria-label="Site">
            {FOOTER_SLIM.map((p) => (
              <RoomLink key={p} path={p} />
            ))}
          </nav>
        </div>
      </FooterShell>
    );
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
            {FOOTER_GROUPS.map((g) => (
              <Group key={g.title} title={g.title} rooms={g.rooms} />
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
                    <Group key={g.title} title={g.title} rooms={g.rooms} />
                  ))}
                </div>
              </details>
            ))}
          </nav>
        </div>

        {MARKS_PAGES.has(page) && (
          <figure
            className="footer-credential"
            aria-label="Startup programs and grants: A Story is a member of NVIDIA Inception, Google for Startups, the AssemblyAI Startup Program and the Deepgram Startup Program, and a Cartesia Startups grant recipient"
          >
            <figcaption className="footer-programs">
              Startup programs &amp; grants
            </figcaption>
            <div className="footer-plate">
              <ProgramMarks height={48} className="footer-marks" />
            </div>
          </figure>
        )}

        {/* One legal line, with the note about the examples inline at its
            end (round 3, jury 1 #5: it floated alone on the right). */}
        <div className="gf-footer-bottom">
          <LegalLine nvidia={nvidia} />
        </div>
      </div>
    </FooterShell>
  );
}
