/**
 * /account — where an account lands before the app is open to it.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS IS NOT THE PRODUCT, AND MUST NOT TRY TO BE. The storytelling happens
 * on the phone. This page answers what somebody who has just made an account
 * wants to know — did it work, where do I stand, what happens next — and
 * points at the one thing to do: /reserve.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { Link, Navigate, useNavigate } from "react-router-dom";
import Seo from "../../../components/ui/Seo";
import { signOut, useAccount } from "../../../lib/auth";
import { OFFERS, RESERVE_DEADLINE_LABEL, cohortByN, reserveDiscountOpen, waitlistLabel } from "../../../lib/founding";
import { track } from "../../../lib/analytics";
import AccountShell from "./AccountShell";

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });

export default function Account() {
  const navigate = useNavigate();
  const account = useAccount();

  if (account === null) return <Navigate to="/sign-in?next=/account" replace />;
  if (account === undefined) return <div style={{ minHeight: "70vh" }} />;

  const holds = Boolean(account.reservedAt || account.foundingRequestedAt);

  const onSignOut = async () => {
    await signOut();
    track("signed_out");
    navigate("/", { replace: true });
  };

  return (
    <>
      <Seo title="Your account — A Story" description="Your A Story account." path="/account" noindex />
      <AccountShell
        labelledBy="account-title"
        photo="34"
        eyebrow="Your account"
        title={
          <>
            {account.firstName ? `Hello, ${account.firstName}.` : "Hello."} <em>You’re in.</em>
          </>
        }
        lead="This is the same account you will sign into in the app. We are opening A Story a few families at a time, and we will write to you when it is your turn."
        steps={[
          "We get in touch when it is your turn — a person, not a system.",
          "You get the app and sign in with this email and password.",
          "You tell it whose story this is, and choose the day their phone first rings.",
        ]}
        label="Your family’s place"
        heading={holds ? "Your place is held." : "One more thing."}
        intro={
          holds
            ? "Nothing more to do today. We will email you when payment opens, or when it is your turn."
            : reserveDiscountOpen()
              ? `Reserve for ${OFFERS.reserve.price} by ${RESERVE_DEADLINE_LABEL} to hold ${OFFERS.reserve.discount}% off your first year — or start now as a founding family.`
              : `Reserve for ${OFFERS.reserve.price} to hold your place — or start now as a founding family.`
        }
      >
        <dl className="details">
          <dt>Name</dt>
          <dd>{[account.firstName, account.lastName].filter(Boolean).join(" ") || "—"}</dd>
          <dt>Email</dt>
          <dd>{account.email}</dd>
          {account.reservedAt && (
            <>
              <dt>Reserved</dt>
              <dd>Place held since {longDate(account.reservedAt)}</dd>
            </>
          )}
          {account.foundingRequestedAt && (
            <>
              <dt>Founding</dt>
              <dd>
                Place taken {longDate(account.foundingRequestedAt)}
                {cohortByN(account.foundingCohort) && ` · first call the week of ${cohortByN(account.foundingCohort)?.week}`}
              </dd>
            </>
          )}
          {account.foundingWaitlist && !account.foundingRequestedAt && (
            <>
              <dt>Waitlist</dt>
              <dd>
                Founding, {waitlistLabel(account.foundingWaitlist)}
                {account.foundingWaitlistAt && ` · since ${longDate(account.foundingWaitlistAt)}`}
              </dd>
            </>
          )}
        </dl>
        <div style={{ display: "grid", gap: 18, marginTop: 28 }}>
          <Link className="go" to="/reserve">
            {holds ? "Your reservation" : `Reserve for ${OFFERS.reserve.price}`}
          </Link>
          <div className="quiet" style={{ justifyContent: "center" }}>
            <button type="button" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </AccountShell>
    </>
  );
}
