/**
 * /sign-in — and every way back in when that fails, on the same card.
 *
 *   Forgot the password: a code to the email, then the code and a new
 *   password together, and they are signed in. (The app splits that over two
 *   screens and signs out at the end; see resetPassword in lib/auth.ts.)
 *
 *   Made an account and never typed the code: the app says "please confirm
 *   your email" and stops. Here a fresh code is sent and the card asks for
 *   it, because that sentence on its own is a dead end.
 */
import { useEffect, useId, useState, type ReactNode } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../../../components/ui/Seo";
import {
  CODE_LEN,
  MIN_PASSWORD,
  requestPasswordReset,
  resendSignupCode,
  resetPassword,
  safeNext,
  signIn,
  useAccount,
  verifySignupCode,
} from "../../../lib/auth";
import { looksLikeEmail } from "../../../lib/leads";
import { track } from "../../../lib/analytics";
import AccountShell, { CodeField, PasswordField } from "./AccountShell";

type Stage = "signin" | "forgot" | "reset" | "confirm";
type Invalid = "email" | "password" | "code" | null;

const RESEND_WAIT = 30;

const HEAD: Record<Stage, { h: string; p: (email: string) => ReactNode }> = {
  signin: {
    h: "Welcome back.",
    p: () => "The same email and password you use in the A Story app.",
  },
  forgot: {
    h: "Reset your password.",
    p: () => `Tell us the email on the account and we will send a ${CODE_LEN}-digit code to it.`,
  },
  reset: {
    h: "Choose a new password.",
    p: (email) => (
      <>
        If there is an account for <strong>{email}</strong>, a code is on its way. Enter it with the password
        you want.
      </>
    ),
  },
  confirm: {
    h: "One last step.",
    p: (email) => (
      <>
        This account was never confirmed, so we have sent a fresh code to <strong>{email}</strong>.
      </>
    ),
  },
};

export default function SignIn() {
  const uid = useId();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const account = useAccount();

  const [stage, setStage] = useState<Stage>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<Invalid>(null);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (wait <= 0) return;
    const t = window.setTimeout(() => setWait((w) => w - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wait]);

  if (account && stage === "signin") return <Navigate to={next} replace />;

  const bad = (field: Invalid, message: string) => {
    setInvalid(field);
    setError(message);
  };
  const go = (s: Stage) => {
    setStage(s);
    setError(null);
    setInvalid(null);
    setCode("");
  };
  const emailOk = () => {
    if (looksLikeEmail(email)) return true;
    bad("email", "That email address doesn’t look quite right.");
    return false;
  };

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (!emailOk()) return;
    if (!password) return bad("password", "Enter your password.");
    setInvalid(null);
    setBusy(true);
    const res = await signIn(email, password);
    if (!res.ok && res.unconfirmed) {
      await resendSignupCode(email);
      setBusy(false);
      setWait(RESEND_WAIT);
      return go("confirm");
    }
    setBusy(false);
    if (!res.ok) {
      track("signin_failed");
      return setError(res.error);
    }
    track("signed_in");
    navigate(next, { replace: true });
  };

  const onForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (!emailOk()) return;
    setInvalid(null);
    setBusy(true);
    const res = await requestPasswordReset(email);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setPassword("");
    setWait(RESEND_WAIT);
    go("reset");
  };

  const onReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (code.length < CODE_LEN) return bad("code", `Enter all ${CODE_LEN} digits from the email.`);
    if (password.length < MIN_PASSWORD)
      return bad("password", `Password must be at least ${MIN_PASSWORD} characters.`);
    setInvalid(null);
    setBusy(true);
    const res = await resetPassword(email, code, password);
    setBusy(false);
    if (!res.ok) return bad(res.error.includes("Password") ? "password" : "code", res.error);
    track("password_reset");
    navigate(next, { replace: true });
  };

  const onConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (code.length < CODE_LEN) return bad("code", `Enter all ${CODE_LEN} digits from the email.`);
    setInvalid(null);
    setBusy(true);
    const res = await verifySignupCode(email, code);
    setBusy(false);
    if (!res.ok) return bad("code", res.error);
    track("account_confirmed", { from: "signin" });
    navigate(next, { replace: true });
  };

  const resend = async () => {
    setError(null);
    setWait(RESEND_WAIT);
    const res = stage === "confirm" ? await resendSignupCode(email) : await requestPasswordReset(email);
    if (!res.ok) setError(res.error);
  };

  const head = HEAD[stage];
  const onSubmit = { signin: onSignIn, forgot: onForgot, reset: onReset, confirm: onConfirm }[stage];
  const submitLabel = {
    signin: busy ? "Signing in…" : "Sign in",
    forgot: busy ? "Sending…" : "Send me a code",
    reset: busy ? "Saving…" : "Save and sign in",
    confirm: busy ? "Checking…" : "Confirm and continue",
  }[stage];
  const signUpHref = `/sign-up${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <>
      <Seo
        title="Sign in - A Story"
        description="Sign in to your A Story account with the same email and password you use in the app."
        path="/sign-in"
        noindex
      />
      <AccountShell
        labelledBy="signin-title"
        photo="33"
        eyebrow="Your account"
        title={
          <>
            Sign in to <em>A Story.</em>
          </>
        }
        lead="Your reservation, your family link, and - when it opens to you - the app, all on one account."
        label="Welcome"
        heading={head.h}
        intro={head.p(email.trim().toLowerCase())}
        after={
          stage === "signin" ? (
            <>
              New to A Story? <Link to={signUpHref}>Create an account</Link>
            </>
          ) : undefined
        }
      >
        <form onSubmit={onSubmit} noValidate>
          {(stage === "signin" || stage === "forgot") && (
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
          )}
          {(stage === "reset" || stage === "confirm") && (
            <CodeField id={`${uid}-code`} value={code} onChange={setCode} invalid={invalid === "code"} />
          )}
          {stage === "signin" && (
            <PasswordField
              id={`${uid}-password`}
              label="Password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              invalid={invalid === "password"}
            />
          )}
          {stage === "reset" && (
            <PasswordField
              id={`${uid}-new`}
              label="New password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              invalid={invalid === "password"}
              hint={`At least ${MIN_PASSWORD} characters. It changes in the app too.`}
            />
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy}>
            {submitLabel}
          </button>
          <div className="quiet">
            {stage === "signin" && (
              <button type="button" onClick={() => go("forgot")}>
                Forgot your password?
              </button>
            )}
            {(stage === "reset" || stage === "confirm") && (
              <button type="button" onClick={resend} disabled={wait > 0}>
                {wait > 0 ? `Send another in ${wait}s` : "Send another code"}
              </button>
            )}
            {stage !== "signin" && (
              <button type="button" onClick={() => go("signin")}>
                Back to sign in
              </button>
            )}
          </div>
        </form>
      </AccountShell>
    </>
  );
}
