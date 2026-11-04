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
import {
  APP,
  FAMILY_CODE,
  START_HREF,
  START_LABEL,
  goToApp,
} from "../../lib/app";
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
  PrimaryAnchor,
  PrimaryButton,
  PrimaryLink,
  Statement,
  TextLink,
} from "./kit/kit.styles";
import { Form } from "./kit/form.styles";

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
  "Setting it up for a parent? A Story starts with the A Story iPhone app, by invite. You choose a good time for the first call; their story belongs to them.";

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
    /* Phone-first plan task 4 (WORDS only; where the door goes is
       unchanged): A Story starts with the iPhone app, by invite (plan :13,
       :16); a family code or link is the way into the family's side
       (faqData.ts:40). The page's own actions point a stranger to the
       site's one action and a relative to /join (Leaving below). */
    title: "A Story starts on iPhone.",
    lead: "A Story starts with the A Story iPhone app, by invite. Joining your family? Their six-letter code or link brings you in.",
    action: "Open A Story",
    seo: "Begin with A Story",
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
          door === "create-account" ? (
            /* Phone-first plan (AC3): no link on the site to the web app's
               create-account page; a stranger gets the one action, a
               relative the family-code door. */
            <>
              <PrimaryAnchor href={START_HREF}>
                {START_LABEL} <ArrowIcon />
              </PrimaryAnchor>
              <TextLink to="/join">I have a family code</TextLink>
            </>
          ) : (
            <>
              <PrimaryLink to={to}>
                {w.action} <ArrowIcon />
              </PrimaryLink>
              <TextLink to="/">About A Story</TextLink>
            </>
          )
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
 *   Daniel answers himself           Questions.tsx:411; "who started A
 *                                    Story": OurStory.tsx:589, :617
 *   privacy promises                 components/privacy.tsx:101, 105, 117
 *   the sample addition              lib/homeExamples.ts LAKE_MONSTER (a
 *                                    fictional family; the footer says so)
 *   "six letters or digits"          deploy/cloudfront-viewer-request.js:20
 */

/** The same sentences sit in /how-it-works#being-asked (HowItWorks.tsx
    CALLER_LINE). Phone-first fix 1 (item 9c): /join keeps the last one. */
const CALLER_LINE =
  "It’s a computer that calls and asks, not a person. Nobody at A Story reads or listens to what you say unless you ask us to help, or someone reports something. If you write to us, Daniel, who started A Story, answers himself.";
const DANIEL_LINE = CALLER_LINE.slice(CALLER_LINE.indexOf("If you write to us"));

/** Phone-first fix 1 (item 11, Harold #5, Tuan #8): a face beside "Daniel
    answers himself". The photograph already published on /our-story
    (OurStory.tsx:593), 48px and round; no new photo, no new words. */
function DanielFace() {
  return (
    <img
      className="face"
      src="/our-story/daniel-320.webp"
      width={48}
      height={48}
      alt="Daniel Hoang Nguyen, co-founder"
      loading="lazy"
      decoding="async"
    />
  );
}
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
  /* Round 3 fix 2 (item 6, Harold #1, Tuan #3/#4/#9): the two doors in one
     quiet line straight under the h1, then the lead. */
  .opening-lead .doors,
  .opening-lead .lede {
    display: block;
  }
  .opening-lead .doors {
    margin-bottom: ${space.md};
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, ${color.body});
  }
  .opening-lead .doors a {
    display: inline-block;
    padding-block: 11px;
    color: var(--ink, ${color.primary});
    font-weight: 500;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
  }
  /* Round 3 fix 1 (items 1, 2, 5) and fix 2 (item 6): under the code box,
     one paragraph in the lead's serif: who sent the code, the browser,
     what you add and when it appears. */
  .join-after {
    flex: 1 1 100%;
    max-width: 44ch;
  }
  .join-after ol {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: step;
    display: grid;
    gap: ${space.xs};
  }
  .join-after li {
    counter-increment: step;
    display: grid;
    grid-template-columns: 1.6em minmax(0, 1fr);
    font: 400 ${type.read} / 1.5 ${font.text};
    color: var(--text, ${color.body});
  }
  .join-after li::before {
    content: counter(step) ".";
    font-family: ${font.display};
    font-weight: 600;
    color: ${color.accentText};
  }
  /* Phone-first fix 1 (item 9a): the storyteller's door, just below the
     steps under the code box. */
  .join-after .doors {
    margin: ${space.sm} 0 0;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, ${color.body});
  }
  .join-after .doors a {
    display: inline-block;
    padding-block: 11px;
    color: var(--ink, ${color.primary});
    font-weight: 500;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
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
    /* Round 3 fix 2 (item 6): the code-or-link paragraph directly under
       the code box, then the sample card. */
    .join-after {
      order: 4;
      margin-top: ${space.md};
    }
    .opening-object {
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
  /* Phone-first fix 1 (items 9c and 11): one sentence with Daniel's face. */
  .daniel {
    display: flex;
    align-items: flex-start;
    gap: ${space.md};
    margin: 0;
    max-width: 56ch;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, ${color.body});
  }
  .daniel .face {
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
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
          lead={
            <>
              {/* Round 3 fix 2 (item 6): both doors in the first screen.
                    "Got a link? Just open it, and you’re in."  the
                      code-or-link rule (this page before fix 2: "A link
                      needs nothing: open it, and you are in."), index.html
                      :80-81 and lib/app.ts:17 (a link opens on its own)
                    "Asked to tell your story? Start here"  the menu label
                      (nav.ts:78), to this page's #being-asked */}
              {/* Phone-first pass (panel r3, Tuan #1, #2): what he is
                  invited to do comes first; the storyteller's door follows
                  in one line, and the code-or-link rule is said once, in
                  the steps under the box. */}
              {/* Phone-first fix 1 (item 9a, Tuan #1-2): the storyteller's
                  door moved from here to just below the steps under the
                  code box, so the invited relative's task comes first. */}
              <span className="lede">
                Someone in your family invited you. Add what you remember,
                under your own name, through one link and with no account
                needed. There is no fee per relative.
              </span>
            </>
          }
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
              {/* Round 3 fix 2 (item 6): step 1 "Open the invitation."
                  repeated the button and is gone; the other steps join
                  this one paragraph, each sentence as it was. The link
                  half of the rule is in the line under the h1. */}
              {/* Phone-first pass (panel r3, Tuan #3, #4): the same
                  sentences as three short steps, so what happens after the
                  button is visible. "You read what the family has kept so
                  far" is WORDS.join.lead above. */}
              <ol aria-label="What happens next">
                <li>
                  Your relative sent a six-letter code or a link. A code goes
                  in the box; a link opens on its own.
                </li>
                <li>
                  You read what the family has kept so far, and add yours in
                  any browser: a memory in writing, or photographs.
                </li>
                <li>
                  It appears once the storyteller says yes. Add one memory or
                  many, whenever you like.
                </li>
              </ol>
              <p className="doors after">
                <a href="#being-asked">Asked to tell your story? Start here ↓</a>
              </p>
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
            {/* Phone-first fix 1 (item 9c, Tuan #6): the heading, one
                sentence and the existing link; the rest of the storyteller's
                lines are on /how-it-works#being-asked (HowItWorks.tsx
                BeingAsked, the same sentences). The sentence kept is the
                last of CALLER_LINE, with Daniel's photograph from
                /our-story (item 11, Harold #5, Tuan #8). */}
            <div className="door-head">
              <Statement id="asked-here-title" $size="md">
                Being asked to tell your story?
              </Statement>
            </div>
            <div>
              <p className="daniel">
                <DanielFace />
                <span>{DANIEL_LINE}</span>
              </p>
              <p className="links">
                <TextLink to="/how-it-works#being-asked">
                  How it works for you
                </TextLink>
              </p>
            </div>
          </section>
        </Frame>
      </Doors>
    </>
  );
}
