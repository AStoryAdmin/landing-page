/*
 * supabase-js (about 53 KB gzipped) loads only when a form is sent, never
 * with the page: every route that shows a form (/contact, /our-story,
 * /organizations, /reserve) used to preload it through this file (round 3,
 * jury 2 N4).
 */
const loadSupabase = () => import("./supabase");

/**
 * An institution books a demo, and Daniel gets an email.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE OLD DEMO FORM TOLD NOBODY. /start?intent=demo went through
 * lib/leads.ts into waitlist_signups and stopped there - checked on
 * 2026-10-20, not one email had ever left it. This calls the
 * `demo-request` Supabase function (supabase/functions/demo-request),
 * which writes the same row and emails it to daniel@astoryapp.com with
 * Reply-To set to the person asking. The recipient is fixed on the server.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * When there is no Supabase (a preview, a fork) or the function fails, the
 * caller gets a mailto to the same address, already filled in, so the
 * request still reaches a person.
 */

/** The kinds the form offers. Shared with ?kind= on /organizations. */
export const INSTITUTION_KINDS = [
  "College or university",
  "School",
  "Library, museum or historical society",
  "Senior living or care community",
  "Company or nonprofit",
  "Faith or community group",
  "Something else",
] as const;

/** Where demo requests go, and the fallback mailto's address. */
export const DEMO_EMAIL = "daniel@astoryapp.com";

export type DemoRequest = {
  name: string;
  email: string;
  phone?: string;
  organization: string;
  role?: string;
  kind?: string;
  size?: string;
  /** "Tue 27 Oct, morning" - what the visitor picked, in their words. */
  times?: string[];
  timezone?: string;
  note?: string;
  source: string;
  /** The hidden field. A person leaves it empty. */
  website?: string;
};

export type DemoResult = { ok: true; emailed: boolean } | { ok: false; fallbackMailto: string };

/** The whole request as an email the visitor can send themselves. */
export const demoMailto = (r: Partial<DemoRequest>) => {
  const body = [
    "Hi Daniel - we would like a demo of A Story.\n",
    r.organization && `Organization: ${r.organization}`,
    r.role && `My role: ${r.role}`,
    r.kind && `Type: ${r.kind}`,
    r.size && `People taking part: ${r.size}`,
    r.times?.length && `Good times: ${r.times.join("; ")}`,
    r.note && `What we want to keep: ${r.note}`,
  ]
    .filter(Boolean)
    .join("\n");
  return (
    `mailto:${DEMO_EMAIL}` +
    `?subject=${encodeURIComponent(`Demo request${r.organization ? `: ${r.organization}` : ""}`)}` +
    `&body=${encodeURIComponent(body)}`
  );
};

export async function requestDemo(r: DemoRequest): Promise<DemoResult> {
  const fallbackMailto = demoMailto(r);
  try {
    const { getSupabase, isSupabaseConfigured } = await loadSupabase();
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured) return { ok: false, fallbackMailto };
    const { data, error } = await supabase.functions.invoke("demo-request", { body: r });
    if (error || !data?.ok) {
      console.error("[demo] request failed:", error ?? data);
      return { ok: false, fallbackMailto };
    }
    /* Saved but not emailed: someone will still see the row, but the person
       is not told "it is in Daniel's inbox" when it is not. */
    if (!data.emailed) return { ok: false, fallbackMailto };
    return { ok: true, emailed: true };
  } catch {
    return { ok: false, fallbackMailto };
  }
}

/**
 * The contact form (/contact), added 2026-10-20: the same function and the
 * same inbox, `type: "contact"`. "Get in touch" used to be a mailto to
 * contact@astoryapp.com - the click that loses people (see lib/leads.ts).
 */
export type ContactMessage = {
  name: string;
  email: string;
  topic?: string;
  message: string;
  organization?: string;
  source: string;
  website?: string;
};

export const contactMailto = (m: Partial<ContactMessage>) =>
  `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(`Hello from astoryapp.com${m.topic ? ` - ${m.topic}` : ""}`)}` +
  (m.message ? `&body=${encodeURIComponent(m.message)}` : "");

export async function sendMessage(m: ContactMessage): Promise<DemoResult> {
  const fallbackMailto = contactMailto(m);
  try {
    const { getSupabase, isSupabaseConfigured } = await loadSupabase();
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured) return { ok: false, fallbackMailto };
    const { data, error } = await supabase.functions.invoke("demo-request", { body: { ...m, type: "contact" } });
    if (error || !data?.ok || !data.emailed) {
      console.error("[contact] message failed:", error ?? data);
      return { ok: false, fallbackMailto };
    }
    return { ok: true, emailed: true };
  } catch {
    return { ok: false, fallbackMailto };
  }
}
