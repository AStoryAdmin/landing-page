/**
 * The doors on this site that now open into the web app: /join/<code>,
 * /join?ref=<code>, /c/<slug>, and the site's old /sign-in, /sign-up,
 * /account and /start.
 *
 * The inline script at the top of index.html sends people on before the
 * page paints, and deploy/cloudfront-viewer-request.js does the same at the
 * edge once it is attached. This page is the fallback for both: a click
 * inside the site, a browser that blocks the inline script, or the
 * prerendered snapshot itself. It says where it is going and gives the link.
 *
 * /join with no valid family code stays on the site (panel round 2,
 * CHIEF-LOG B1.2). All three places follow one rule: only a six-letter code
 * (/join/CODE, ?ref=CODE) leaves for the app; /join on its own, or with a
 * code that is not six letters or digits, is this page, with the header
 * and footer. It has the two doors: the relative who was invited, with a
 * field for the code, and the person being asked to tell their story.
 * Every sentence on it is taken from the site:
 *   join lead              WORDS.join.lead below
 *   six-letter code        Families.tsx:193
 *   one link, no account   home/EveryVoice.tsx:532
 *   nothing until "yes"    home/FamilyLoop.tsx:47
 *   being asked            HowItWorks.tsx:370-380 (BeingAsked)
 *   privacy labels         components/privacy.tsx:101, 105, 117
 *   "six letters or digits" deploy/cloudfront-viewer-request.js:20
 */
import { useEffect, useId, useState, type FormEvent } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import { APP, FAMILY_CODE, goToApp } from "../../lib/app";
import { LAKE_MONSTER as M } from "../../lib/homeExamples";
import {
  color,
  display,
  font,
  media,
  radius,
  shadow,
  space,
  type,
} from "../../styles/theme";
import { ArrowIcon, PageOpening, Picture } from "./kit/kit";
import {
  Chapter,
  Frame,
  PrimaryButton,
  PrimaryLink,
  Statement,
  TextLink,
} from "./kit/kit.styles";
import { Form } from "./kit/form.styles";
import { DECLINE_HREF } from "./faqData";

type Door = "join" | "contribute" | "sign-in" | "create-account" | "account";

/** Where this address goes in the app. */
function destination(door: Door, param: string | undefined, search: string): string {
  const q = new URLSearchParams(search);
  if (door === "join") {
    const code = param ?? q.get("ref") ?? "";
    return FAMILY_CODE.test(code) ? APP.join(code) : APP.home;
  }
  if (door === "contribute") return param ? APP.contribute(param) : APP.home;
  if (door === "sign-in") return APP.signIn;
  /* Round 3 fix 1 (item 7, closes B2's request): the gift buyer's
     ?for=someone goes on to the app, and only that (?ref= and the rest are
     dropped, qa/routing/cloudfront.test.mjs). index.html and the edge do
     the same before this page paints. */
  if (door === "create-account")
    return forSomeone(search)
      ? `${APP.createAccount}?for=someone`
      : APP.createAccount;
  return APP.home;
}

/** The gift buyer, from /for-families: ?for=someone. */
const forSomeone = (search: string) =>
  new URLSearchParams(search).get("for") === "someone";

/* The create-account lead for the gift buyer opens with the second half of
   the usual lead (AppDoor.tsx:94 before round 3 fix 1), unchanged. */
const FOR_SOMEONE_LEAD =
  "Setting it up for a parent? You make the account and choose a good time for the first call; their story belongs to them. Make your account in A Story, in your browser. No card.";

const WORDS: Record<Door, { title: string; lead: string; action: string; seo: string }> = {
  join: {
    title: "Opening your family’s story.",
    lead: "Your invitation opens in A Story, in your browser. You read what the family has kept so far, and add your side.",
    action: "Open the invitation",
    seo: "Join your family on A Story",
  },
  contribute: {
    title: "Opening the family’s link.",
    lead: "This link opens in A Story, in your browser. Add a photograph or your side of the story.",
    action: "Open the link",
    seo: "Add to a family story on A Story",
  },
  "sign-in": {
    title: "Sign in to A Story.",
    lead: "Accounts live in A Story, in your browser.",
    action: "Sign in",
    seo: "Sign in to A Story",
  },
  "create-account": {
    title: "Start free.",
    /* Round 3 (B2, WORDS only): the gift buyer arrives here from
       /for-families with ?for=someone. The second sentence is from
       faqData.ts "How does giving A Story work?" and the privacy summary
       (components/privacy.tsx:93, "The storyteller owns it"). */
    lead: "Make your account in A Story, in your browser. No card. Setting it up for a parent? You make the account and choose a good time for the first call; their story belongs to them.",
    action: "Start free",
    seo: "Start A Story free",
  },
  account: {
    title: "Your account is in A Story.",
    lead: "Sign in to A Story in your browser to see it.",
    action: "Open A Story",
    seo: "Your A Story account",
  },
};

export default function AppDoor({ door, path }: { door: Door; path: string }) {
  const { code, slug } = useParams();
  const { search } = useLocation();
  const given = code ?? new URLSearchParams(search).get("ref") ?? "";
  if (door === "join" && !FAMILY_CODE.test(given)) return <JoinHere given={given} />;
  return (
    <Leaving
      door={door}
      path={path}
      to={destination(door, code ?? slug, search)}
      gift={door === "create-account" && forSomeone(search)}
    />
  );
}

/** A door that leaves for the app: it says where, and goes. */
function Leaving({
  door,
  path,
  to,
  gift = false,
}: {
  door: Door;
  path: string;
  to: string;
  gift?: boolean;
}) {
  const w = gift ? { ...WORDS[door], lead: FOR_SOMEONE_LEAD } : WORDS[door];
  useEffect(() => goToApp(to), [to]);
  return (
    <>
      <Seo
        title={`${w.seo} - A Story`}
        path={path}
        description={w.lead}
        noindex
      />
      <PageOpening
        title={w.title}
        lead={w.lead}
        actions={
          <>
            <PrimaryLink to={to}>
              {w.action} <ArrowIcon />
            </PrimaryLink>
            <TextLink to="/">About A Story</TextLink>
          </>
        }
      />
    </>
  );
}

/* ── /join with no code: the two doors ─────────────────────────────────── */

/*
 * Round 3 (2026-11-03, plan task 1, Doors). The first screen is the whole
 * invited door: what is asked of you, the code box with an example, the one
 * rule for a code versus a link, and a sample addition beside the words so
 * the page shows what you are stepping into. The storyteller's door follows,
 * with the privacy promises set in the same serif as the rest.
 * Every sentence has a source in the site:
 *   one link, no account, own name   home/EveryVoice.tsx:532
 *   no fee per relative              faqData.ts:26
 *   six-letter code                  Families.tsx:193, lib/app.ts:27
 *   a link opens on its own          lib/app.ts:17-18 (/join/CODE, /c/SLUG)
 *   nothing until "yes"              home/FamilyLoop.tsx:47
 *   the hour your family picked      home/ThreeSteps.tsx:47 (the family's
 *                                    line, turned to the storyteller)
 *   a computer calls, not a person   faqData.ts:46 ("An AI-guided
 *                                    interviewer asks"), lib/seo.ts:175
 *   nobody at A Story reads/listens  components/privacy.tsx:98
 *   Daniel answers himself           Questions.tsx:411
 *   privacy promises                 components/privacy.tsx:101, 105, 117
 *   the sample addition              lib/homeExamples.ts LAKE_MONSTER (a
 *                                    fictional family; the footer says so)
 *   "six letters or digits"          deploy/cloudfront-viewer-request.js:20
 */

/** The same sentence sits under the film on /how-it-works (kit/Film.tsx). */
const CALLER_LINE =
  "It’s a computer that calls and asks, not a person. Nobody at A Story reads or listens to what you say unless you ask us to help, or someone reports something. If you write to us, Daniel answers himself.";
const JoinTop = styled.div`
  > section {
    padding-bottom: calc(${space.xl} * var(--sy));
  }
  /* The code form sits in the opening's action row and takes the row. */
  .opening-grid form {
    flex: 1 1 100%;
    margin: 0;
  }
  .code-row {
    display: flex;
    flex-wrap: wrap;
    gap: ${space.md} ${space.lg};
    align-items: flex-end;
  }
  /* Sized to the code itself (six letters), so the button sits beside it at
     every width and wraps under it with large text; it never covers the box. */
  .code-row .field {
    flex: 0 1 auto;
    width: 9em;
    max-width: 100%;
  }
  .code-row .field > span {
    font: 500 ${type.note} / 1.3 ${font.ui};
    letter-spacing: 0.01em;
    text-transform: none;
    color: var(--muted, ${color.bodyMuted});
    white-space: nowrap;
  }
  .code-row input {
    width: 100%;
    min-width: 0;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }
  .code-row input::placeholder {
    font-style: normal;
    letter-spacing: 0.14em;
  }
  .code-row > button {
    flex: 0 0 auto;
  }
  .opening-grid .error {
    margin-top: ${space.sm};
  }
  /* Round 3 fix 1 (items 1, 2, 5): under the code box, in the same serif
     as the lead (one typeface for the words): the code-or-link rule, what
     you need, and what happens after "Open the invitation". */
  .join-after {
    flex: 1 1 100%;
    display: grid;
    gap: ${space.sm};
    max-width: 44ch;
  }
  .join-after p,
  .join-after li {
    margin: 0;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--text, ${color.body});
  }
  .join-after .needs {
    color: var(--ink, ${color.primary});
  }
  .join-after ol {
    margin: ${space.xs} 0 0;
    padding: 0;
    list-style: none;
    counter-reset: step;
    display: grid;
    gap: ${space.xs};
  }
  .join-after ol li {
    counter-increment: step;
    display: grid;
    grid-template-columns: 1.6em minmax(0, 1fr);
    color: var(--ink, ${color.primary});
  }
  .join-after ol li::before {
    content: counter(step) ".";
    color: ${color.accentText};
  }
  /* The words and the card start on one line, so neither column leaves a
     band of empty paper under the shorter one (Harold, 1440). */
  section[data-variant="object"] .opening-grid:not(.solo) {
    align-items: start;
  }
  section[data-variant="object"] .opening-object {
    align-items: start;
  }
  ${media.sm} {
    .code-row > button {
      flex: 1 1 100%;
    }
    /* At a phone width the card follows the code box, so its top is in the
       first screen (taste rule 19: visual order only; the DOM keeps the
       words first). */
    section[data-variant] .opening-grid:not(.solo) {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .opening-words,
    .opening-words > div:has(> form) {
      display: contents;
    }
    .opening-words > h1 {
      order: 1;
    }
    .opening-lead {
      order: 2;
    }
    .opening-words form {
      order: 3;
      margin-top: ${space.lg};
    }
    .opening-object {
      order: 4;
      margin-top: ${space.lg};
    }
    .join-after {
      order: 5;
      margin-top: ${space.lg};
    }
  }
`;

/* The sample addition: one memory the family keeps, and what two relatives
   added to it, drawn as a card on the paper. Type-led, with the photograph
   the home page already uses for this memory. */
const Addition = styled.figure`
  margin: 0;
  width: min(100%, 520px);
  background: ${color.paper};
  border: 1px solid ${color.primaryLine};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.md};
  overflow: hidden;
  .memory {
    display: grid;
    grid-template-columns: 112px minmax(0, 1fr);
    gap: ${space.md};
    align-items: start;
    padding: ${space.lg};
    border-bottom: 1px solid ${color.primaryLine};
  }
  .memory img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: ${radius.sm};
  }
  .memory small,
  .added small {
    display: block;
    font: 500 ${type.note} / 1.4 ${font.ui};
    color: ${color.bodyMuted};
  }
  .memory h2 {
    margin: 2px 0 6px;
    font: 600 ${display.sm} / 1.1 ${font.display};
    letter-spacing: -0.005em;
    color: ${color.primary};
  }
  .memory p,
  .added p {
    margin: 0;
    font: italic 400 ${type.read} / 1.45 ${font.text};
    color: ${color.body};
  }
  .added {
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    gap: ${space.sm} ${space.md};
    align-items: start;
    padding: ${space.md} ${space.lg};
  }
  .added + .added {
    padding-top: 0;
  }
  .seal {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid ${color.gold};
    font: 600 ${type.note} / 1 ${font.ui};
    color: ${color.primary};
  }
  .added strong {
    font: 600 ${type.ui} / 1.3 ${font.ui};
    color: ${color.primary};
  }
  .added p {
    margin-top: 4px;
  }
  /* In the serif, like the words beside the card (round 3 fix 1, item 5). */
  .waiting {
    margin: 0;
    padding: ${space.sm} ${space.lg} ${space.md};
    font: italic 400 ${type.read} / 1.45 ${font.text};
    color: ${color.primary};
  }
  figcaption {
    padding: ${space.sm} ${space.lg};
    border-top: 1px solid ${color.primaryLine};
    background: ${color.ivory};
    font: 400 ${type.note} / 1.5 ${font.ui};
    color: ${color.bodyMuted};
  }
  ${media.sm} {
    .memory {
      grid-template-columns: 88px minmax(0, 1fr);
      padding: ${space.md};
    }
    .added,
    .waiting,
    figcaption {
      padding-left: ${space.md};
      padding-right: ${space.md};
    }
  }
`;

function SampleAddition() {
  return (
    <Addition aria-label="A sample addition to a family memory">
      <div className="memory">
        <Picture
          id={M.photo}
          alt={M.alt}
          sizes="(max-width: 640px) 88px, 112px"
          priority
        />
        <div>
          <small>Told by {M.teller.name} · in a call</small>
          <h2>{M.title}</h2>
          <p>“{M.told}”</p>
        </div>
      </div>
      {/* Sarah and Uncle Ben: Lily's addition is a voice note, and clips in
          a person's own voice are still in development (HowItWorks.tsx
          "Clips … are in development"; home/EveryVoice.tsx draws hers as a
          drawing for the same reason). */}
      {[M.added[0], M.added[2]].map((a) => (
        <div className="added" key={a.name}>
          <span className="seal" aria-hidden="true">
            {a.initial}
          </span>
          <div>
            <strong>{a.name}</strong>
            <small>
              {a.role} · {a.kind}
            </small>
            <p>“{a.quote}”</p>
          </div>
        </div>
      ))}
      <p className="waiting">
        {M.added.length} additions waiting for {M.teller.name.split(" ").pop()}{" "}
        to say yes.
      </p>
      <figcaption>
        What an addition looks like. A sample: the family is fictional.
      </figcaption>
    </Addition>
  );
}

const Doors = styled(Chapter)`
  .door {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: ${space.lg} ${space.xxl};
    padding-top: ${space.xl};
    border-top: 1px solid ${color.primaryLine};
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: ${space.sm};
    max-width: 56ch;
  }
  li {
    position: relative;
    padding-left: 22px;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, ${color.body});
  }
  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 10px;
    height: 1px;
    background: ${color.gold};
  }
  /* Round 3 fix 1 (item 5): the left column carries where the calls ring
     and the ways on, so it is not an empty column beside the list. */
  .door-head p {
    margin: ${space.md} 0 0;
    max-width: 32ch;
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--text, ${color.body});
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: ${space.xs} ${space.lg};
    margin: ${space.md} 0 0;
  }
  .door-head .links {
    flex-direction: column;
    align-items: flex-start;
    gap: ${space.xs};
  }
  /* Two lines that each carry a link sit 8px apart at their 44px hit
     areas (taste rule 20). */
  li:has(a) + li:has(a) {
    margin-top: ${space.md};
  }
  /* A link inside a line of the list stays in the line's serif. */
  li a {
    color: inherit;
    font-family: inherit;
    font-weight: 500;
  }
  /* The hero's own close and this rule are the one gap between the two
     doors (Harold, 1440: an empty band under the hero). */
  padding-top: 0;
  .links a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
  ${media.md} {
    .door {
      grid-template-columns: minmax(0, 1fr);
    }
    /* One column: the ways on follow the list, not the heading. */
    .door-head .links {
      display: none;
    }
  }
  .door-foot {
    display: none;
  }
  ${media.md} {
    .door-foot {
      display: flex;
    }
  }
`;

function JoinHere({ given }: { given: string }) {
  const uid = useId();
  const [value, setValue] = useState(given);
  const [invalid, setInvalid] = useState(false);
  const open = (e: FormEvent) => {
    e.preventDefault();
    const code = value.trim();
    if (!FAMILY_CODE.test(code)) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    goToApp(APP.join(code));
  };
  return (
    <>
      <Seo
        title="Invited to a family’s book - A Story"
        path="/join"
        description="Invited by a relative, or being asked to tell your story: where to begin with A Story. One link, no account, no fee for relatives."
        noindex
      />
      <JoinTop>
        <PageOpening
          ground="ivory"
          variant="object"
          title="Joining a family’s book."
          lead="Someone in your family invited you. Add what you remember, under your own name, through one link and with no account needed. There is no fee per relative."
          actions={
            /* Without script the form still works: /join?ref=CODE is sent
               on to the app by the inline script and the edge. */
            <>
            <Form action="/join" method="get" onSubmit={open} noValidate>
              <div className="code-row">
                <label
                  className="field"
                  htmlFor={`${uid}-code`}
                  data-invalid={invalid}
                >
                  <span>Your six-letter code</span>
                  <input
                    id={`${uid}-code`}
                    name="ref"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="ABC123"
                    maxLength={6}
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    aria-invalid={invalid || undefined}
                    aria-describedby={invalid ? `${uid}-error` : undefined}
                  />
                </label>
                <PrimaryButton type="submit">
                  Open the invitation <ArrowIcon />
                </PrimaryButton>
              </div>
              {invalid && (
                <p className="error" id={`${uid}-error`} role="alert">
                  A family code is six letters or digits.
                </p>
              )}
            </Form>
            <div className="join-after">
              {/* Round 3 fix 1 (items 1, 2, 5), in the serif:
                    code or link     this file's note before round 3 fix 1
                    no app needed    faqData.ts:56 ("no app is needed: any
                                     browser works")
                    the three steps  "Open the invitation" (the button
                                     above); writing or photographs,
                                     faqData.ts:27 and :77; "nothing
                                     appears until the storyteller says
                                     yes", faqData.ts:31
                    one or many      faqData.ts:56 (the archive is open in
                                     any browser; no limit is stated)
                  No voice notes: clips are in development (below). */}
              <p>
                The relative who invited you sent either a six-letter code or
                a link. A code goes in the box above. A link needs nothing:
                open it, and you are in.
              </p>
              <p className="needs">
                No app needed to add yours: any browser works.
              </p>
              <ol aria-label="What happens next">
                <li>Open the invitation.</li>
                <li>Add a memory in writing, or photographs.</li>
                <li>It appears once the storyteller says yes.</li>
              </ol>
              <p>Add one memory or many, whenever you like.</p>
            </div>
            </>
          }
          object={<SampleAddition />}
          objectStill
        />
      </JoinTop>

      <Doors $ground="ivory" $tight aria-labelledby="asked-here-title">
        <Frame>
          <section className="door" id="being-asked">
            {/* Round 3 fix 1 (items 1, 4, 5). Where the calls ring:
                lib/today.ts:14 (first sentence, verbatim). Decline, pause or
                change the subject: faqData.ts:73, turned to "you", linked to
                that answer on /questions. The promises join the list in one
                run (privacy.tsx:101, 105, 117). */}
            <div className="door-head">
              <Statement id="asked-here-title" $size="md">
                Being asked to tell your story?
              </Statement>
              <p>
                Today the calls ring in the A Story iPhone app, in a private
                beta.
              </p>
              <p className="links">
                <TextLink to="/how-it-works#being-asked">
                  How it works for you
                </TextLink>
                <TextLink to="/privacy/">Read our privacy policy</TextLink>
              </p>
            </div>
            <div>
              <ul>
                <li>
                  It rings in the app at the hour your family picked. Nothing
                  to type or save. You just talk.
                </li>
                <li>
                  {CALLER_LINE}{" "}
                  <TextLink to="/our-story">Who is behind A Story</TextLink>
                </li>
                <li>
                  <TextLink to={DECLINE_HREF}>
                    You can decline a question, pause, or change the subject.
                  </TextLink>
                </li>
                <li>Nothing appears until you say yes.</li>
                <li>Your story belongs to you.</li>
                <li>We never sell data.</li>
                <li>We never train AI on your stories.</li>
                <li>You can delete it all.</li>
              </ul>
              <p className="links door-foot">
                <TextLink to="/how-it-works#being-asked">
                  How it works for you
                </TextLink>
                <TextLink to="/privacy/">Read our privacy policy</TextLink>
              </p>
            </div>
          </section>
        </Frame>
      </Doors>
    </>
  );
}
