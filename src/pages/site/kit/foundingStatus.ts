import { useEffect, useState } from "react";
import { OFFERS, foundingLeft, foundingPlacesLine, type FoundingTaken } from "../../../lib/founding";

/**
 * The founding offer's state for pages outside /reserve: open or not, and
 * "25 places" / "18 of 25 left". The count module (and supabase-js with it)
 * is imported lazily, after the page has painted, so the homepage's first
 * load does not carry it. Until it answers, the line is "25 places", which
 * is true; it is never a made-up number.
 */
export function useFoundingStatus(): { open: boolean; line: string } {
  const [taken, setTaken] = useState<FoundingTaken | null>(null);
  useEffect(() => {
    let live = true;
    import("../../../lib/foundingCount")
      .then((m) => m.fetchFoundingTaken())
      .then(
        (t) => {
          if (live) setTaken(t);
        },
        () => undefined,
      );
    return () => {
      live = false;
    };
  }, []);
  return { open: OFFERS.founding.open && foundingLeft(taken) !== 0, line: foundingPlacesLine(taken) };
}
