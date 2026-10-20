/**
 * demo-request — an institution asks for a demo, and a person hears about it.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * UNTIL 2026-10-20 NOBODY WAS TOLD. "Request a demonstration" wrote a row
 * to waitlist_signups and nothing else: no email, no notification, nothing
 * anyone would look at on a Tuesday. A college that asked for a demo was
 * waiting on a table nobody opened. This function writes the same row AND
 * emails it to DEMO_TO (daniel@astoryapp.com), with Reply-To set to the
 * person who asked, so answering is one click.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The recipient is fixed on the server. The browser chooses what is said,
 * never who it is sent to, so this cannot be used to mail anyone else. A
 * hidden "website" field catches the simplest bots; lengths are capped.
 *
 * The row and the email are independent: if Resend is down the row is still
 * written and the page is told `emailed: false`; if the row fails (the same
 * email twice is not a failure) the email still goes.
 *
 * ── Setup ────────────────────────────────────────────────────────────────
 *   supabase functions deploy demo-request --project-ref naxvjujewggrwflkvvzc
 *   (JWT verification ON — the site calls it with the public anon key.)
 *   Secrets: RESEND_API_KEY (already set for the app's invite emails).
 *   Optional: DEMO_TO (default daniel@astoryapp.com), DEMO_FROM.
 */
import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO = Deno.env.get("DEMO_TO") || "daniel@astoryapp.com";
const FROM = Deno.env.get("DEMO_FROM") || "A Story website <hello@astoryapp.com>";

/** Same key lookup as landing-checkout-webhook: legacy or the newer named keys. */
const serverKey = (() => {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try {
    const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}") as Record<string, string>;
    return keys.default ?? Object.values(keys)[0] ?? "";
  } catch {
    return "";
  }
})();

const db = createClient(Deno.env.get("SUPABASE_URL")!, serverKey, {
  auth: { persistSession: false },
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

/** What the form sends. Everything but name, email and organization is optional. */
type Request = {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  role?: string;
  kind?: string;
  size?: string;
  times?: string[];
  timezone?: string;
  note?: string;
  source?: string;
  website?: string;
};

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json(405, { ok: false, error: "POST only" });

  let body: Request;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, error: "Not JSON" });
  }

  /* A person cannot see the field; anything in it was filled by a script.
     Answer as if it worked, so the script learns nothing. */
  if (clip(body.website, 200)) return json(200, { ok: true, emailed: false });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200).toLowerCase();
  const organization = clip(body.organization, 200);
  if (!name || !organization || !looksLikeEmail(email)) {
    return json(400, { ok: false, error: "Name, organization and a work email are needed." });
  }
  const phone = clip(body.phone, 40);
  const role = clip(body.role, 120);
  const kind = clip(body.kind, 80);
  const size = clip(body.size, 80);
  const timezone = clip(body.timezone, 80);
  const note = clip(body.note, 4000);
  const source = clip(body.source, 80) || "organizations:demo";
  const times = (Array.isArray(body.times) ? body.times : []).map((t) => clip(t, 80)).filter(Boolean).slice(0, 6);

  /* The row: the same table every other lead lands in, so the list stays one
     list. If lead-fields.sql has not been run, the detail is folded into the
     phone column, as lib/leads.ts does. */
  const [first, ...rest] = name.split(/\s+/);
  const detail = [
    `Organization: ${organization}`,
    role && `Role: ${role}`,
    kind && `Type: ${kind}`,
    size && `People: ${size}`,
    times.length && `Times: ${times.join("; ")}${timezone ? ` (${timezone})` : ""}`,
    note && `Note: ${note}`,
  ]
    .filter(Boolean)
    .join(" · ");
  const core = { first_name: first, last_name: rest.join(" "), email, phone };
  let row = await db.from("waitlist_signups").insert({ ...core, gift_for: organization, note: detail, source });
  if (row.error && ["42703", "PGRST204"].includes(row.error.code ?? "")) {
    row = await db
      .from("waitlist_signups")
      .insert({ ...core, phone: [phone, detail, `Source: ${source}`].filter(Boolean).join(" - ") });
  }
  const saved = !row.error || row.error.code === "23505";
  if (!saved) console.error("[demo-request] insert failed:", row.error);

  /* The email. Plain enough to read on a phone, with every answer in it. */
  const lines: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Organization", organization],
    ["Role", role],
    ["Type", kind],
    ["People taking part", size],
    ["Good times", times.length ? times.join("\n") : ""],
    ["Their time zone", timezone],
    ["What they want to keep", note],
    ["From", source],
  ];
  const filled = lines.filter(([, v]) => v);
  const text = filled.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\nReply to this email to answer them.";
  const html =
    `<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#2A1F18">` +
    `<p style="font-size:18px;margin:0 0 16px"><b>${esc(organization)}</b> would like a demo.</p>` +
    `<table cellpadding="6" style="border-collapse:collapse">` +
    filled
      .map(
        ([k, v]) =>
          `<tr><td style="color:#685848;vertical-align:top;white-space:nowrap">${esc(k)}</td>` +
          `<td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("") +
    `</table><p style="color:#685848;margin-top:20px">Reply to this email to answer ${esc(first)}.</p></div>`;

  let emailed = false;
  let emailId: string | null = null;
  if (!RESEND_API_KEY) {
    console.error("[demo-request] RESEND_API_KEY is not set");
  } else {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Demo request: ${organization}`,
        text,
        html,
      }),
    });
    const out = await res.json().catch(() => ({}));
    emailed = res.ok;
    emailId = (out as { id?: string }).id ?? null;
    if (!res.ok) console.error("[demo-request] Resend refused:", res.status, out);
  }

  if (!saved && !emailed) return json(502, { ok: false, error: "Could not save or send the request." });
  return json(200, { ok: true, saved, emailed, id: emailId });
});
