import { createClient } from '@supabase/supabase-js';

// Vite inlines VITE_* env vars into import.meta.env at build time.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !key) {
    console.warn(
        '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
            'Copy .env.example to .env and fill them in.'
    );
}

// This is a public marketing site with no login, so we don't persist any
// auth session in the browser.
export const supabase = createClient(url ?? '', key ?? '', {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
});
