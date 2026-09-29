/**
 * /sign-up — creating an account on the website.
 *
 * The same two steps as the app's SignUpScreen — details, then the code from
 * the email — and the same account at the end of them: lib/auth.ts makes
 * the app's own Supabase calls, so what is made here is signed into on the
 * phone with the same email and password. Two differences, because this is
 * a keyboard: one password box with Show instead of two, and the referral
 * code read from ?ref= the way the app reads it from its deep link.
 *
 * Making an account starts nothing — no card, no call. What it is for right
 * now is /reserve (lib/founding.ts), which is where most people arrive from.
 */
import { useEffect, useId, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../../../components/ui/Seo";
import {
  CODE_LEN,
  MIN_PASSWORD,
  createAccount,
  resendSignupCode,
  safeNext,
  useAccount,
  verifySignupCode,
} from "../../../lib/auth";
import { looksLikeEmail } from "../../../lib/leads";
import { track } from "../../../lib/analytics";
import AccountShell, { CodeField, PasswordField } from "./AccountShell";

/** Long enough that a double-click cannot send two emails. */
const RESEND_WAIT = 30;

type Invalid = "name" | "email" | "password" | "code" | null;

export default function SignUp() {
  const uid = useId();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const account = useAccount();
  const forReserve = next.startsWith("/reserve");

  const [stage, setStage] = useState<"form" | "code">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const refFromLink = (params.get("ref") ?? "").toUpperCase().slice(0, 6);
  const [wantsReferral, setWantsReferral] = useState(Boolean(refFromLink));
  const [referral, setReferral] = useState(refFromLink);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<Invalid>(null);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (wait <= 0) return;
    const t = window.setTimeout(() => setWait((w) => w - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wait]);

  /* Already signed in — but not mid-code, where the session is the point. */
  if (account && stage === "form") return <Navigate to={next} replace />;

  const bad = (field: Invalid, message: string) => {
    setInvalid(field);
    setError(message);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (!name.trim()) return bad("name", "What should we call you?");
    if (!looksLikeEmail(email)) return bad("email", "That email address doesn’t look quite right.");
    if (password.length < MIN_PASSWORD)
      return bad("password", `Password must be at least ${MIN_PASSWORD} characters.`);
    setInvalid(null);
    setBusy(true);
    const res = await createAccount({
      name,
      email,
      password,
      referralCode: wantsReferral ? referral : "",
    });
    setBusy(false);
    if (!res.ok) {
      track("account_failed", { step: "details" });
      return setError(res.error);
    }
    track("account_created", { needsCode: Boolean(res.needsCode) });
    if (res.needsCode) {
      setCode("");
      setWait(RESEND_WAIT);
      setStage("code");
      return;
    }
    navigate(next, { replace: true });
  };

  const confirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (code.length < CODE_LEN) return bad("code", `Enter all ${CODE_LEN} digits from the email.`);
    setInvalid(null);
    setBusy(true);
    const res = await verifySignupCode(email, code);
    setBusy(false);
    if (!res.ok) return bad("code", res.error);
    track("account_confirmed");
    navigate(next, { replace: true });
  };

  const resend = async () => {
    setError(null);
    setWait(RESEND_WAIT);
    const res = await resendSignupCode(email);
    if (!res.ok) setError(res.error);
  };

  const signInHref = `/sign-in${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <>
      <Seo
        title="Create your account — A Story"
        description="Make your A Story account on the web. It is the same account you sign into in the app — no card, and nobody is called until you say so."
        path="/sign-up"
        noindex
      />
      <AccountShell
        labelledBy="signup-title"
        photo="23"
        eyebrow={forReserve ? "Reserve · your account" : "Your account"}
        title={
          <>
            One account, <em>on the web and in the app.</em>
          </>
        }
        lead="Make it here, now. When it is your turn you sign into the app with the same email and password — nothing to set up twice."
        steps={[
          "No card, and nothing charged. An account on its own costs nothing.",
          "The same account everywhere — made on a laptop, signed into on a phone.",
          "Nobody is called until you say so.",
        ]}
        label={stage === "form" ? "Your family’s place" : "One more step"}
        heading={stage === "form" ? "Create your account." : "Check your email."}
        intro={
          stage === "code" ? (
            <>
              We sent a {CODE_LEN}-digit code to <strong>{email.trim().toLowerCase()}</strong>. If it has not
              come in a minute, look in spam.
            </>
          ) : undefined
        }
        after={
          stage === "form" ? (
            <>
              Already have an account? <Link to={signInHref}>Sign in</Link>
            </>
          ) : undefined
        }
      >
        {stage === "form" ? (
          <form onSubmit={submit} noValidate>
            <label className="field" htmlFor={`${uid}-name`} data-invalid={invalid === "name"}>
              <span>Your name</span>
              <input
                id={`${uid}-name`}
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={invalid === "name"}
              />
            </label>
            <label className="field" htmlFor={`${uid}-email`} data-invalid={invalid === "email"}>
              <span>Email</span>
              <input
                id={`${uid}-email`}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={invalid === "email"}
              />
            </label>
            <PasswordField
              id={`${uid}-password`}
              label="Password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              invalid={invalid === "password"}
              hint={`At least ${MIN_PASSWORD} characters. You will use it in the app too.`}
            />
            <label className="check" htmlFor={`${uid}-hasref`}>
              <input
                id={`${uid}-hasref`}
                type="checkbox"
                checked={wantsReferral}
                onChange={(e) => setWantsReferral(e.target.checked)}
              />
              Have a referral code?
            </label>
            {wantsReferral && (
              <label className="field" htmlFor={`${uid}-ref`}>
                <span>Referral code</span>
                <input
                  id={`${uid}-ref`}
                  name="referral"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={6}
                  value={referral}
                  onChange={(e) => setReferral(e.target.value.toUpperCase())}
                />
              </label>
            )}
            {error && (
              <p className="error" role="alert">
                {error}
                {error.includes("already exists") && (
                  <>
                    {" "}
                    <Link to={signInHref}>Sign in instead</Link>.
                  </>
                )}
              </p>
            )}
            <button type="submit" disabled={busy}>
              {busy ? "Creating your account…" : "Create account"}
            </button>
            <p className="legal">
              By creating an account you agree to our <Link to="/terms">Terms</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </form>
        ) : (
          <form onSubmit={confirm} noValidate>
            <CodeField id={`${uid}-code`} value={code} onChange={setCode} invalid={invalid === "code"} />
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy}>
              {busy ? "Checking…" : "Confirm and continue"}
            </button>
            <div className="quiet">
              <button type="button" onClick={resend} disabled={wait > 0}>
                {wait > 0 ? `Send another in ${wait}s` : "Send another code"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStage("form");
                  setError(null);
                  setInvalid(null);
                }}
              >
                Use a different email
              </button>
            </div>
          </form>
        )}
      </AccountShell>
    </>
  );
}
