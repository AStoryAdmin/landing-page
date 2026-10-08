/**
 * landing-checkout-webhook — records website payments and refunds.
 *
 * The popup before Stripe writes who someone is (waitlist_signups); this
 * writes what they paid. Every completed checkout from the site's Payment
 * Links becomes its own row in waitlist_payments, and a refund marks that
 * row. After each, the person's row in waitlist_signups is recomputed from
 * all of their payments — so a $29 and then a $1 reads "founding, $30", not
 * whichever came last. Someone who paid without the popup (signed in, or no
 * script) gets a waitlist_signups row of their own.
 *
 * Needs supabase/checkout-leads.sql and supabase/checkout-payments.sql.
 *
 * It is separate from the app's own stripe-webhook on purpose. That one
 * grants plans to accounts and reads client_reference_id; this one only
 * keeps the lead list true, and touches nothing the app depends on.
 *
 * ── Setup ────────────────────────────────────────────────────────────────
 *   Deploy as `landing-checkout-webhook` with JWT verification OFF — Stripe,
 *   not a signed-in user, calls it; the signature check is the auth.
 *   Stripe destination events: checkout.session.completed, charge.refunded
 *   Secret: LANDING_STRIPE_WEBHOOK_SECRET = the destination's whsec_…
 *   Optional: LANDING_PAYMENT_LINKS=plink_…,plink_… to ignore other links.
 */
import Stripe from "npm:stripe@17";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "sk_unused", {
  httpClient: Stripe.createFetchHttpClient(),
});
const crypto = Stripe.createSubtleCryptoProvider();
const signingSecret = Deno.env.get("LANDING_STRIPE_WEBHOOK_SECRET") ?? "";
const onlyLinks = (Deno.env.get("LANDING_PAYMENT_LINKS") ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * The key that may write past RLS. Older projects inject it as
 * SUPABASE_SERVICE_ROLE_KEY; projects on the newer API keys inject
 * SUPABASE_SECRET_KEYS, a JSON object of named "sb_secret_…" keys.
 */
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

const reply = (status: number, body: string) => new Response(body, { status });
const idOf = (v: string | { id: string } | null | undefined) => (typeof v === "string" ? v : (v?.id ?? null));

/** "Mary Ann Smith" → Mary Ann / Smith, the same rule as the site's splitName. */
const splitName = (full: string) => {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first_name: parts[0] ?? "", last_name: "" };
  return { first_name: parts.slice(0, -1).join(" "), last_name: parts[parts.length - 1] };
};

type Payment = {
  paid_at: string;
  name: string | null;
  offer: string;
  amount: number;
  currency: string | null;
  cohort: number | null;
  stripe_session_id: string;
  stripe_customer_id: string | null;
  refunded_amount: number;
  refunded_at: string | null;
};

/**
 * Rewrites the person's waitlist_signups row from every payment on record:
 * founding if any live $29, the total kept after refunds, the first time they
 * paid, and the latest Stripe ids. Adds the row if they never saw the popup.
 */
async function summarize(email: string, phone: string | null): Promise<string> {
  const { data, error } = await db
    .from("waitlist_payments")
    .select(
      "paid_at, name, offer, amount, currency, cohort, stripe_session_id, stripe_customer_id, refunded_amount, refunded_at",
    )
    .eq("email", email)
    .order("paid_at", { ascending: true });
  if (error) throw new Error(error.message);
  const all = (data ?? []) as Payment[];
  if (!all.length) return "no payments";

  const live = all.filter((p) => !p.refunded_at);
  const last = all[all.length - 1];
  const summary = {
    offer: live.some((p) => p.offer === "founding") ? "founding" : live.length ? "reserve" : "refunded",
    amount_paid: live.reduce((sum, p) => sum + Number(p.amount) - Number(p.refunded_amount), 0),
    paid_at: live[0]?.paid_at ?? null,
    cohort: [...live].reverse().find((p) => p.offer === "founding" && p.cohort)?.cohort ?? null,
    currency: (last.currency ?? "").toUpperCase(),
    stripe_session_id: last.stripe_session_id,
    stripe_customer_id: last.stripe_customer_id,
  };

  const existing = await db.from("waitlist_signups").select("id, phone").eq("email", email).maybeSingle();
  if (existing.error) throw new Error(existing.error.message);

  if (existing.data) {
    const update: Record<string, unknown> = { ...summary };
    /* Keep the number they gave us; fill it only if the popup was skipped. */
    if (!existing.data.phone && phone) update.phone = phone;
    const res = await db.from("waitlist_signups").update(update).eq("id", existing.data.id);
    if (res.error) throw new Error(res.error.message);
    return "updated";
  }

  const first = all[0];
  const res = await db.from("waitlist_signups").insert({
    ...splitName(last.name ?? ""),
    email,
    phone: phone ?? "",
    source: `${first.offer}:stripe`,
    ...summary,
  });
  if (res.error) throw new Error(res.error.message);
  return "inserted";
}

async function onCheckout(event: Stripe.Event): Promise<Response> {
  const s = event.data.object as Stripe.Checkout.Session;
  if (s.payment_status !== "paid") return reply(200, "ignored: not paid yet");
  const link = idOf(s.payment_link);
  if (!link) return reply(200, "ignored: not a Payment Link");
  if (onlyLinks.length && !onlyLinks.includes(link)) return reply(200, "ignored: another link");

  const email = (s.customer_details?.email ?? s.customer_email ?? "").trim().toLowerCase();
  if (!email) return reply(200, "ignored: no email");

  const amount = (s.amount_total ?? 0) / 100;
  /* $29 is the founding place; the reservation is $1 a place, up to two. */
  const offer = amount >= 29 ? "founding" : "reserve";
  const ref = s.client_reference_id ?? "";
  const ins = await db.from("waitlist_payments").insert({
    paid_at: new Date(event.created * 1000).toISOString(),
    email,
    name: s.customer_details?.name ?? "",
    offer,
    amount,
    currency: (s.currency ?? "").toUpperCase(),
    cohort: Number(ref.match(/^cohort(\d+)/)?.[1]) || null,
    stripe_session_id: s.id,
    stripe_payment_intent: idOf(s.payment_intent),
    stripe_customer_id: idOf(s.customer),
    client_reference_id: ref,
  });
  /* 23505: this checkout is already recorded — Stripe retries, and resends. */
  if (ins.error && ins.error.code !== "23505") return reply(500, ins.error.message);

  const result = await summarize(email, s.customer_details?.phone ?? null);
  return reply(200, ins.error ? `already recorded; ${result}` : `recorded; ${result}`);
}

async function onRefund(event: Stripe.Event): Promise<Response> {
  const charge = event.data.object as Stripe.Charge;
  const intent = idOf(charge.payment_intent);
  if (!intent) return reply(200, "ignored: no payment intent");

  const res = await db
    .from("waitlist_payments")
    .update({
      refunded_amount: (charge.amount_refunded ?? 0) / 100,
      refunded_at: charge.refunded ? new Date(event.created * 1000).toISOString() : null,
    })
    .eq("stripe_payment_intent", intent)
    .select("email");
  if (res.error) return reply(500, res.error.message);
  const email = res.data?.[0]?.email as string | undefined;
  if (!email) return reply(200, "ignored: not a website payment");

  const result = await summarize(email, null);
  return reply(200, `refund recorded; ${result}`);
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return reply(405, "POST only");
  if (!signingSecret) return reply(500, "LANDING_STRIPE_WEBHOOK_SECRET is not set");
  if (!serverKey) return reply(500, "No Supabase server key available to the function");

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      req.headers.get("stripe-signature") ?? "",
      signingSecret,
      undefined,
      crypto,
    );
  } catch (err) {
    return reply(400, `Bad signature: ${(err as Error).message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        return await onCheckout(event);
      case "charge.refunded":
        return await onRefund(event);
      default:
        return reply(200, "ignored: event type");
    }
  } catch (err) {
    /* A 500 makes Stripe retry, which is what we want for a database blip. */
    return reply(500, (err as Error).message);
  }
});
