import { useEffect, useState } from 'react';
import { getSupabase } from './supabase';

/**
 * How many founding places are taken, live — or null when it is not known.
 *
 * Null covers every way this can fail: no Supabase in this build, the
 * supabase/founding-count.sql function not run yet, the network. The page
 * then simply says "100 places", as it did before there was a count. A
 * made-up number is never shown in place of a missing one.
 *
 * Kept apart from lib/founding.ts so the pages that only need the offer's
 * prices (pricing, account) do not load supabase-js for it.
 */
export function useFoundingTaken(): number | null {
    const [taken, setTaken] = useState<number | null>(null);
    useEffect(() => {
        const supabase = getSupabase();
        if (!supabase) return;
        let live = true;
        supabase.rpc('founding_places_taken').then(({ data, error }) => {
            if (live && !error && typeof data === 'number') setTaken(data);
        });
        return () => {
            live = false;
        };
    }, []);
    return taken;
}
