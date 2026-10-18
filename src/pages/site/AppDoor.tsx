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
 */
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Seo from "../../components/ui/Seo";
import { APP, FAMILY_CODE, goToApp } from "../../lib/app";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { PrimaryLink, TextLink } from "./kit/kit.styles";

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
  const to = destination(door, code ?? slug, search);
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
