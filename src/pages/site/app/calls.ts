/**
 * The three calls the site shows, and which turns of each script carry the
 * behaviour: the question, the answer that lets something slip, and the
 * follow-up that goes after it. Shared by app/CallTrio.tsx (the phones on
 * How it works) and home/Listen.tsx (the exchanges on Home), so the two can
 * never quote different turns. The scripts themselves live in demoScripts.ts.
 *
 * Photographs (2026-10-23, jury 1 #7): none of them is on Home any more, so
 * How it works shares no photograph with it. Joan's is the 1961 wedding,
 * the same print her memory card carries on How it works.
 */
/** Which turns of each script show the behaviour, the words it turns on, and its photograph. */
export const CALLS = [
  {
    id: "faith",
    behaviour: "Hears the aside",
    ask: 2,
    answer: 3,
    follow: 4,
    detail: "Even the winter she wouldn’t look at Father Dolan.",
    photo: "H01",
  },
  {
    id: "childhood",
    behaviour: "Takes the no",
    ask: 6,
    answer: 7,
    follow: 8,
    detail:
      "I’d rather not go into what she had, if that’s all right with you.",
    photo: "10",
  },
  {
    id: "love",
    behaviour: "Follows the detail",
    ask: 2,
    answer: 3,
    follow: 4,
    detail: "All but one.",
    photo: "02",
  },
] as const;
