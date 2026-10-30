/**
 * "Propose a collaboration" on /organizations (#collaborate). Added
 * 2026-10-29.
 *
 * Not everyone who writes from an institution wants a program. A professor
 * wants a class project, a museum a co-hosted evening, a cultural
 * association a heritage project, a foundation a grant. Before this they had
 * the demo form, which asks for days and a head count, or the general
 * contact form. This one asks for the idea.
 *
 * It sends through the contact path (lib/demoRequest.ts `sendMessage`, the
 * `demo-request` function with `type: "contact"`), so it lands in Daniel's
 * inbox with the subject "Website message (Collaboration: …)" and Reply-To
 * set to the person writing. No server change was needed.
 */
import { useId, useState, type FormEvent } from "react";
import { DEMO_EMAIL, sendMessage } from "../../lib/demoRequest";
import { looksLikeEmail } from "../../lib/leads";
import { track } from "../../lib/analytics";
import { ArrowIcon } from "./kit/kit";
import { PrimaryButton, TextAnchor } from "./kit/kit.styles";
import { Done, Form } from "./kit/form.styles";

const IDEAS = [
  "Research or a class project",
  "An event or program together",
  "A heritage or oral history project",
  "A grant or funding partnership",
  "Bringing A Story to your members",
  "Something else",
] as const;

export default function CollaborationForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [idea, setIdea] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [invalid, setInvalid] = useState<"name" | "email" | "message" | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!name.trim()) return setInvalid("name");
    if (!looksLikeEmail(email)) return setInvalid("email");
    if (!message.trim()) return setInvalid("message");
    setInvalid(null);
    setFallback(null);
    setBusy(true);
    const result = await sendMessage({
      name,
      email,
      organization,
      topic: `Collaboration: ${idea || "an idea"}`,
      message,
      website,
      source: "organizations:collaborate",
    });
    setBusy(false);
    if (result.ok) {
      setDone(true);
      track("collaboration_proposed", { idea: idea || "unspecified" });
      return;
    }
    setFallback(result.fallbackMailto);
    track("collaboration_failed");
  };

  if (done) {
    return (
      <Done role="status">
        <h3>Thank you. Daniel has your idea.</h3>
        <p>
          He will write back to <strong>{email.trim()}</strong>. If it is
          time-sensitive, write to{" "}
          <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>.
        </p>
      </Done>
    );
  }

  return (
    <Form onSubmit={submit} noValidate aria-describedby={`${uid}-fine`}>
      <fieldset>
        <legend>
          What kind of idea <small>optional</small>
        </legend>
        <div className="chips">
          {IDEAS.map((i) => (
            <label className="chip" key={i}>
              <input
                type="radio"
                name={`${uid}-idea`}
                checked={idea === i}
                onChange={() => setIdea(i)}
              />
              <span>{i}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="two">
        <label
          className="field"
          htmlFor={`${uid}-name`}
          data-invalid={invalid === "name"}
        >
          <span>Your name</span>
          <input
            id={`${uid}-name`}
            autoComplete="name"
            aria-invalid={invalid === "name" || undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="field" htmlFor={`${uid}-org`}>
          <span>
            Organization <small>optional</small>
          </span>
          <input
            id={`${uid}-org`}
            autoComplete="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </label>
        <label
          className="field"
          htmlFor={`${uid}-email`}
          data-invalid={invalid === "email"}
        >
          <span>Email</span>
          <input
            id={`${uid}-email`}
            type="email"
            aria-invalid={invalid === "email" || undefined}
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <label
        className="field"
        htmlFor={`${uid}-idea-text`}
        data-invalid={invalid === "message"}
      >
        <span>The idea</span>
        <textarea
          id={`${uid}-idea-text`}
          aria-invalid={invalid === "message" || undefined}
          placeholder="Our history students record the people who founded the neighborhood's community center, and the recordings go to the county archive."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <label className="trap" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </label>

      {invalid && (
        <p className="error" role="alert">
          {invalid === "name"
            ? "Please add your name."
            : invalid === "email"
              ? "That email does not look quite right."
              : "Please tell us the idea, even in a line."}
        </p>
      )}
      {fallback && (
        <p className="error" role="alert">
          That did not go through on our side.{" "}
          <TextAnchor href={fallback}>Send it by email instead</TextAnchor> -
          what you wrote is already in it.
        </p>
      )}

      <PrimaryButton
        className="go"
        type="submit"
        disabled={busy}
        aria-busy={busy || undefined}
      >
        {busy ? "Sending…" : "Send the idea"} <ArrowIcon />
      </PrimaryButton>
      <p className="fine" id={`${uid}-fine`}>
        A rough idea is enough. We use these details only to reply.
      </p>
    </Form>
  );
}
