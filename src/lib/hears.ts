/**
 * Who hears the recordings, in one line, for the pages that ask someone to
 * start or to pay (premium round 3, panel: Maya "I want one line in plain
 * words near the CTA on who hears the recordings").
 *
 * Every word is the privacy summary's (components/privacy.tsx:97-98, the
 * point "Only your family sees it. Not even us."). Nothing is added to it,
 * and the clause about reports is kept, so the line never promises more
 * than the policy does.
 */
export const WHO_HEARS =
  "Only your family hears the recordings. Nobody at A Story reads, listens to or looks at your memories, unless you ask us to help or someone reports something.";

/**
 * The same point in the summary's own short form ("Only your family sees it.
 * Not even us.", privacy.tsx:96), for a hero note on a phone, where the full
 * sentence cost the first screen its photograph. The link beside it goes to
 * the full sentence.
 */
export const WHO_HEARS_SHORT =
  "Only your family hears the recordings. Not even us.";

/** The storyteller owns it (privacy.tsx:93-94), for the gift pages. */
export const WHO_OWNS =
  "The storyteller owns it, not the person who paid for the gift.";
