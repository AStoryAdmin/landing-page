/**
 * The three calls the site shows, and which turns of each script carry the
 * behaviour: the question, the answer that lets something slip, and the
 * follow-up that goes after it. Shared by app/CallTrio.tsx (the phones on
 * How it works) and home/Listen.tsx (the exchanges on Home), so the two can
 * never quote different turns. The scripts themselves live in demoScripts.ts.
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
    photo: "32",
  },
  {
    id: "childhood",
    behaviour: "Takes the no",
    ask: 6,
    answer: 7,
    follow: 8,
    detail:
      "I’d rather not go into what she had, if that’s all right with you.",
    photo: "16",
  },
  {
    id: "love",
    behaviour: "Follows the detail",
    ask: 2,
    answer: 3,
    follow: 4,
    detail: "All but one.",
    photo: "31",
  },
] as const;
