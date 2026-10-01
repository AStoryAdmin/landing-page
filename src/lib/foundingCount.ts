import { useEffect, useState } from 'react';
import { getSupabase } from './supabase';
import type { FoundingTaken } from './founding';

/**
 * How many founding places are taken in each cohort, live — or null when it
 * is not known.
 *
 * Null covers every way this can fail: no Supabase in this build, the
 * supabase/founding-count.sql function not run yet, the network. The page
 * then simply says "25 places", as it did before there was a count. A
 * made-up number is never shown in place of a missing one.
 *
 * Kept apart from lib/founding.ts so the pages that only need the offer's
 * prices (pricing, account) do not load supabase-js for it.
 */
export function useFoundingTaken(): FoundingTaken | null {
    const [taken, setTaken] = useState<FoundingTaken | null>(null);
    useEffect(() => {
        const supabase = getSupabase();
        if (!supabase) return;
        let live = true;
        supabase.rpc('founding_places_by_cohort').then(({ data, error }) => {
            if (!live || error || !Array.isArray(data)) return;
            const next: FoundingTaken = { byCohort: {}, unassigned: 0 };
            for (const row of data as { cohort: number | null; taken: number }[]) {
                if (typeof row.taken !== 'number') return;
                if (row.cohort === null) next.unassigned += row.taken;
                else next.byCohort[row.cohort] = (next.byCohort[row.cohort] ?? 0) + row.taken;
            }
            setTaken(next);
        });
        return () => {
            live = false;
        };
    }, []);
    return taken;
}
