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
import { color, font, media, space, type } from "../../styles/theme";
import { ArrowIcon, PageOpening } from "./kit/kit";
import {
  Chapter,
  Frame,
  Heading,
  PrimaryButton,
  PrimaryLink,
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
  if (door === "create-account") return APP.createAccount;
  return APP.home;
}

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
    lead: "Make your account in A Story, in your browser. No card.",
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
  return <Leaving door={door} path={path} to={destination(door, code ?? slug, search)} />;
}

/** A door that leaves for the app: it says where, and goes. */
function Leaving({ door, path, to }: { door: Door; path: string; to: string }) {
  const w = WORDS[door];
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

const Doors = styled(Chapter)`
  padding-top: 0;
  .doors {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: ${space.xxl} clamp(${space.xl}, 5vw, 96px);
    align-items: start;
  }
  .door {
    min-width: 0;
    padding-top: ${space.lg};
    border-top: 1px solid ${color.primaryLine};
  }
  .door > p {
    margin-top: ${space.md};
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, ${color.body});
    max-width: 52ch;
  }
  ul {
    margin: ${space.md} 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: ${space.sm};
    max-width: 52ch;
  }
  li {
    position: relative;
    padding-left: 22px;
    font: 400 ${type.read} / 1.5 ${font.text};
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
  .promises {
    margin-top: ${space.lg};
  }
  .promises li {
    font: 500 ${type.note} / 1.5 ${font.ui};
    color: var(--ink, ${color.primary});
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: ${space.xs} ${space.lg};
    margin-top: ${space.lg};
  }
  .links a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
  form {
    margin-top: ${space.lg};
    max-width: 560px;
  }
  /* Wraps, never overlaps: in the two-door layout the column can be narrower
     than field + button (with large text it always is), and a fixed grid let
     the button lie on top of the code box. */
  .code-row {
    display: flex;
    flex-wrap: wrap;
    gap: ${space.md};
    align-items: flex-end;
  }
  /* Sized by its own label ("Your six-letter code" never wraps), so the
     button moves to the next line before it can cover the box. */
  .code-row .field {
    flex: 1 1 auto;
  }
  .code-row > button {
    flex: 0 0 auto;
  }
  .code-row .field > span {
    white-space: nowrap;
  }
  .code-row input {
    width: 100%;
    min-width: 0;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  ${media.md} {
    .doors {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    .code-row .field {
      flex-basis: 100%;
    }
    .code-row .field > span {
      white-space: normal;
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
        description="Invited by a relative, or being asked to tell your story: where to begin with A Story."
        noindex
      />
      <PageOpening
        ground="ivory"
        title="Joining a family’s book."
        lead={WORDS.join.lead}
      />
      <Doors $ground="ivory" aria-label="Two ways in">
        <Frame className="doors">
          <section className="door" aria-labelledby="invited-title">
            <Heading as="h2" id="invited-title">Invited by a relative?</Heading>
            <ul>
              <li>Anyone joins the family tree with a six-letter code.</li>
              <li>
                Add what you remember, under your own name, through one link
                and with no account needed.
              </li>
              <li>Nothing appears until the storyteller says yes.</li>
            </ul>
            {/* Without script the form still works: /join?ref=CODE is sent
                on to the app by the inline script and the edge. */}
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
          </section>

          <section className="door" id="being-asked" aria-labelledby="asked-here-title">
            <Heading as="h2" id="asked-here-title">
              Being asked to tell your story?
            </Heading>
            <ul>
              <li>
                It rings in the app at the hour you picked. Nothing to type or
                save. You just talk.
              </li>
              <li>Nothing appears until you say yes.</li>
              <li>Your story belongs to you.</li>
            </ul>
            <ul className="promises" aria-label="From our privacy policy">
              <li>We never sell data.</li>
              <li>We never train AI on your stories.</li>
              <li>You can delete it all.</li>
            </ul>
            <p className="links">
              <TextLink to="/how-it-works#being-asked">
                How it works for you
              </TextLink>
              <TextLink to="/privacy/">Read our privacy policy</TextLink>
            </p>
          </section>
        </Frame>
      </Doors>
    </>
  );
}
