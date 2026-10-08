/**
 * landing-checkout-webhook — records website payments in waitlist_signups.
 *
 * The popup before Stripe writes who someone is; this writes whether they
 * paid. On every completed checkout from the site's two Payment Links it
 * finds the row with the buyer's email and fills in offer, amount, time and
 * the Stripe ids — or adds a row if they paid without the popup (signed in,
 * or no script). Run supabase/checkout-leads.sql first: these columns come
 * from there.
 *
 * It is separate from the app's own stripe-webhook on purpose. That one
 * grants plans to accounts and reads client_reference_id; this one only
 * keeps the lead list true, and touches nothing the app depends on. Stripe
 * happily sends the same event to two endpoints.
 *
 * ── Deploy (once) ────────────────────────────────────────────────────────
 *   1. supabase functions deploy landing-checkout-webhook --no-verify-jwt
 *      (--no-verify-jwt because Stripe, not a signed-in user, calls it;
 *       the Stripe signature check below is the authentication.)
 *   2. Stripe Dashboard → Developers → Webhooks → Add endpoint
 *        URL:    https://<project-ref>.supabase.co/functions/v1/landing-checkout-webhook
 *        Events: checkout.session.completed,
 *                checkout.session.async_payment_succeeded
 *      Copy its signing secret (whsec_…).
 *   3. supabase secrets set LANDING_STRIPE_WEBHOOK_SECRET=whsec_…
 *
 * Optional: LANDING_PAYMENT_LINKS=plink_…,plink_… limits it to the two site
 * links, so app purchases never land in the lead table. Without it, any
 * completed Payment Link checkout is recorded.
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

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});

const reply = (status: number, body: string) => new Response(body, { status });

/** "Mary Ann Smith" → Mary Ann / Smith, the same rule as the site's splitName. */
const splitName = (full: string) => {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first_name: parts[0] ?? "", last_name: "" };
  return { first_name: parts.slice(0, -1).join(" "), last_name: parts[parts.length - 1] };
};

Deno.serve(async (req) => {
  if (req.method !== "POST") return reply(405, "POST only");
  if (!signingSecret) return reply(500, "LANDING_STRIPE_WEBHOOK_SECRET is not set");

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

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return reply(200, "ignored: event type");
  }
  const s = event.data.object as Stripe.Checkout.Session;
  if (s.payment_status !== "paid") return reply(200, "ignored: not paid yet");
  if (!s.payment_link) return reply(200, "ignored: not a Payment Link");
  const link = typeof s.payment_link === "string" ? s.payment_link : s.payment_link.id;
  if (onlyLinks.length && !onlyLinks.includes(link)) return reply(200, "ignored: another link");

  const email = (s.customer_details?.email ?? s.customer_email ?? "").trim().toLowerCase();
  if (!email) return reply(200, "ignored: no email");

  const amount = (s.amount_total ?? 0) / 100;
  /* $29 is the founding place; the reservation is $1 a place, up to two. */
  const offer = amount >= 29 ? "founding" : "reserve";
  const cohort = Number((s.client_reference_id ?? "").match(/^cohort(\d+)/)?.[1]) || null;
  const paid = {
    offer,
    cohort,
    paid_at: new Date(event.created * 1000).toISOString(),
    amount_paid: amount,
    currency: (s.currency ?? "").toUpperCase(),
    stripe_session_id: s.id,
    stripe_customer_id: typeof s.customer === "string" ? s.customer : (s.customer?.id ?? null),
  };

  /* Already recorded — Stripe retries, and sends both events for some methods. */
  const seen = await db.from("waitlist_signups").select("id").eq("stripe_session_id", s.id).maybeSingle();
  if (seen.data) return reply(200, "already recorded");

  const existing = await db
    .from("waitlist_signups")
    .select("id, phone")
    .eq("email", email)
    .maybeSingle();
  if (existing.error) return reply(500, existing.error.message);

  if (existing.data) {
    const update: Record<string, unknown> = { ...paid };
    /* Keep the number they gave us; fill it only if the popup was skipped. */
    if (!existing.data.phone && s.customer_details?.phone) update.phone = s.customer_details.phone;
    const res = await db.from("waitlist_signups").update(update).eq("id", existing.data.id);
    if (res.error) return reply(500, res.error.message);
    return reply(200, "updated");
  }

  const res = await db.from("waitlist_signups").insert({
    ...splitName(s.customer_details?.name ?? ""),
    email,
    phone: s.customer_details?.phone ?? "",
    source: `${offer}:stripe`,
    ...paid,
  });
  if (res.error) return reply(500, res.error.message);
  return reply(200, "inserted");
});
