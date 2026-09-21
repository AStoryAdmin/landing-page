import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Vite inlines VITE_* env vars into import.meta.env at build time.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && key);

let client: SupabaseClient | null = null;

/**
 * Returns the Supabase client, or null when the environment is not configured.
 *
 * `createClient` throws on an empty URL, and this module is imported by the
 * signup route — so building the client eagerly took the whole page down on any
 * deploy missing its env vars. The form now degrades to an explicit "email us"
 * message instead of a blank screen.
 */
export const getSupabase = (): SupabaseClient | null => {
    if (!isSupabaseConfigured) {
        console.warn(
            '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
                'Copy .env.example to .env and fill them in — form submissions are disabled until then.',
        );
        return null;
    }

    // This is a public marketing site with no login, so no auth session is
    // persisted in the browser.
    client ??= createClient(url!, key!, {
        auth: { persistSession: false, autoRefreshToken: false },
    });

    return client;
};
