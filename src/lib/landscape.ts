/**
 * How A Story sits among the products a family might compare it with.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS IS LOCKED POSITIONING CONTENT. Every competitor description, product
 * model, matrix value and positioning line below comes from
 * `A_STORY_COMPETITIVE_LANDSCAPE_2026.txt` (research current as of 21
 * September 2026). The founders' instruction is explicit: do not rewrite or
 * simplify it, do not attack competitors, no red crosses, no "only A Story"
 * claims. Product models, not feature checklists.
 *
 * Re-check it before relying on it: this market changes monthly, and a claim
 * about another company that has gone stale is worse than no claim at all.
 * `AS_OF` is shown on the page next to the comparison.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Investor-only framing in the source (moats, "table stakes", partnership
 * territory) is deliberately not published; the page speaks to families.
 */

export const AS_OF = "September 2026";

/** The three product models — the primary comparison. */
export const MODELS = [
  {
    group: "Memoir products",
    note: "They built this category, and they do it well.",
    items: [
      { name: "Storyworth", loop: "Questions → storyteller → memoir → book" },
      {
        name: "Remento",
        loop: "Prompt → voice/video → written story → voice-linked book",
      },
      {
        name: "Storii",
        loop: "Phone prompt → recording → transcript / memoir",
      },
      {
        name: "Meminto",
        loop: "Questions + multimedia → collaborative life book",
      },
    ],
  },
  {
    group: "Emerging family archives",
    note: "Newer products moving toward living archives.",
    items: [
      {
        name: "Spomen",
        loop: "Multiple voices → attributed family story + archive",
      },
      {
        name: "Heirloom",
        loop: "Multiple people → living archive + AI Family Council",
      },
    ],
  },
] as const;

/** A Story's own loop, read top to bottom. */
export const A_STORY_LOOP = [
  "Conversation",
  "Original voice + transcript",
  "Readable memory",
  "People + places + photographs + dates",
  "Another person’s version",
  "Another piece of evidence",
  "Another memory",
] as const;

/** A documentary, not a diary. */
export const MEMOIR_MODEL = [
  "One narrator",
  "One account",
  "Past-focused",
  "Prompts",
  "Stories",
  "Book",
  "Finished",
] as const;
export const DOCUMENTARY_MODEL = [
  "Many witnesses",
  "Attributed accounts",
  "Past + present",
  "Conversation",
  "Context",
  "Living archive",
  "Continuing",
] as const;

/** What one memory can hold. */
export const MEMORY_HOLDS = [
  "the original voice",
  "the transcript",
  "the readable card",
  "the photograph",
  "the place",
  "the date",
  "the people",
  "uncertainty",
  "evidence",
  "another person’s version",
  "what happened next",
] as const;

/**
 * The philosophy map. x: synthesize into one story (0) → preserve distinct
 * accounts (1). y: past / retrospective (0) → past + present + future (1).
 * Placements follow the source's "second map" description.
 */
export const MAP = [
  { name: "Storyworth", x: 0.2, y: 0.24 },
  { name: "Remento", x: 0.28, y: 0.16 },
  { name: "Meminto", x: 0.14, y: 0.12 },
  { name: "Storii", x: 0.4, y: 0.3 },
  { name: "Heirloom", x: 0.3, y: 0.74 },
  { name: "Spomen", x: 0.62, y: 0.66 },
  { name: "A Story", x: 0.9, y: 0.9, us: true },
] as const;

/** ● strong, ◐ present or secondary, ○ not central. The source's words are kept as labels. */
export type Mark = { level: 2 | 1 | 0; label: string };
const m = (level: 2 | 1 | 0, label: string): Mark => ({ level, label });
export const MATRIX_COLUMNS = [
  "Storyworth",
  "Remento",
  "Storii",
  "Meminto",
  "Spomen",
  "Heirloom",
  "A Story",
] as const;
export const MATRIX: { row: string; cells: Mark[] }[] = [
  {
    row: "Guided questions",
    cells: [
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
    ],
  },
  {
    row: "Voice capture",
    cells: [
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
    ],
  },
  {
    row: "Low-friction / no-app capture",
    cells: [
      m(2, "Strong (phone)"),
      m(2, "Strong (web link)"),
      m(2, "Strong (phone)"),
      m(2, "Strong (phone/app)"),
      m(2, "Strong (private link)"),
      m(1, "Partial"),
      m(2, "Strong (phone-first)"),
    ],
  },
  {
    row: "AI-guided follow-up",
    cells: [
      m(2, "Strong (Magic Interviews)"),
      m(0, "Not core"),
      m(0, "Not core"),
      m(0, "Not core"),
      m(2, "Strong"),
      m(1, "AI-guided"),
      m(2, "Core"),
    ],
  },
  {
    row: "Original voice retained",
    cells: [
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
    ],
  },
  {
    row: "Readable written story",
    cells: [
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong (Card)"),
    ],
  },
  {
    row: "Physical book",
    cells: [
      m(2, "Core"),
      m(2, "Core"),
      m(1, "Present"),
      m(2, "Core"),
      m(1, "PDF"),
      m(1, "Present"),
      m(1, "Optional chapter"),
    ],
  },
  {
    row: "Family participation",
    cells: [
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
    ],
  },
  {
    row: "Living / ongoing archive orientation",
    cells: [
      m(1, "Partial"),
      m(1, "Partial"),
      m(1, "Partial"),
      m(0, "Weak"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Core"),
    ],
  },
  {
    row: "People / place / date context",
    cells: [
      m(0, "Limited"),
      m(0, "Limited"),
      m(1, "Places"),
      m(0, "Limited"),
      m(2, "Strong"),
      m(1, "Timeline"),
      m(2, "Core"),
    ],
  },
  {
    row: "Multiple voices around one family record",
    cells: [
      m(1, "Partial"),
      m(1, "Partial"),
      m(0, "Limited"),
      m(1, "Co-storytellers"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Core"),
    ],
  },
  {
    row: "Preserve contradictory versions separately",
    cells: [
      m(0, "Not core"),
      m(0, "Not core"),
      m(0, "Not core"),
      m(0, "Not core"),
      m(1, "Woven into attributed story"),
      m(1, "Council/synthesis"),
      m(2, "Core philosophy"),
    ],
  },
  {
    row: "Original + organized version coexist",
    cells: [
      m(1, "Partial"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(1, "Source archive"),
      m(2, "Card + Transcript + Voice"),
    ],
  },
  {
    row: "Explicitly includes life happening now",
    cells: [
      m(1, "Some"),
      m(1, "Some"),
      m(1, "Some"),
      m(0, "Mostly memoir"),
      m(2, "Strong"),
      m(2, "Strong"),
      m(2, "Core"),
    ],
  },
  {
    row: "Synthetic future persona / avatar",
    cells: [
      m(0, "No"),
      m(0, "No"),
      m(0, "No"),
      m(0, "No"),
      m(0, "No"),
      m(2, "Yes / voice clone tiers"),
      m(0, "No — deliberate"),
    ],
  },
];

/** "Why not…?" — the source's own answers, for families comparing. */
export const WHY_NOT = [
  {
    q: "Why not Storyworth?",
    a: "Storyworth is excellent at helping a storyteller create a memoir. It has also expanded into guided phone interviewing and family calls. A Story starts from a different object: the family memory itself. The same event can accumulate an original recording, a photograph, a corrected date, a sibling’s version and another conversation years later. It does not have to resolve into one narrator’s memoir.",
  },
  {
    q: "Why not Remento?",
    a: "Remento has built an excellent voice-to-book experience: speak, turn the recording into a polished story, and hear the original voice from the finished book. A Story is less about converting individual recordings into chapters and more about letting those memories continue accumulating context and other people’s accounts inside a living family archive.",
  },
  {
    q: "Why not Spomen?",
    a: "Spomen is probably the closest emerging competitor and validates the shift from memoir products toward family archives. The important philosophical difference is that Spomen describes weaving contributions into an attributed family story. A Story is intentionally documentary: when relatives remember the same event differently, it preserves those versions alongside one another rather than needing to reconcile them into one narrative. We are not trying to write the definitive version of a family’s history. We are trying to preserve the evidence of how that family remembers it.",
  },
  {
    q: "Why not Heirloom?",
    a: "Heirloom is moving toward an interactive AI legacy — a Family Council and, at higher tiers, cloned voice. A Story makes a different trust decision. It does not try to recreate a person. It preserves what they actually said, what others actually remember, and the original material underneath it.",
  },
  {
    q: "Why not Ancestry?",
    a: "Ancestry can tell you who lived at the house. A Story asks why everyone always used the back door. Genealogy reconstructs family history from records. A Story captures first-person context that no census, family tree or DNA match can recover — and captures today’s life before it becomes another historical record.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────
 * Pass 11j — the comparison tables (Home and /compare), in the founder's
 * reference style (Quippy): one plain benefit per row, written "this, not
 * that", marked 2 yes / 1 partly / 0 no. Rows are A Story's core values from
 * the mission; each mark follows the matrix above (● → 2, ◐ → 1, ○ → 0).
 * Capabilities the app is still building (keeping the voice as audio;
 * people/places linking) are deliberately left out.
 * ───────────────────────────────────────────────────────────────────────── */

export type Level = 0 | 1 | 2;
export type Row = { label: string; cells: Level[] };

export const HOME_COLUMNS = [
  "A Story",
  "Storyworth",
  "Remento",
  "Storii",
] as const;
export const HOME_ROWS: Row[] = [
  {
    label: "They just answer the phone — nothing to type or record",
    cells: [2, 2, 1, 2],
  },
  {
    label: "Follows what they actually said, not a fixed list of prompts",
    cells: [2, 2, 0, 0],
  },
  {
    label: "Everyone who was there adds their own version",
    cells: [2, 1, 1, 0],
  },
  {
    label: "Different memories kept side by side, not merged into one",
    cells: [2, 0, 0, 0],
  },
  { label: "Today counts too, not only the past", cells: [2, 1, 1, 1] },
  {
    label: "Keeps growing after the book — the book isn’t the end",
    cells: [2, 1, 1, 1],
  },
];

export const COMPARE_COLUMNS = [
  "A Story",
  "Storyworth",
  "Remento",
  "Storii",
  "Meminto",
  "Spomen",
  "Heirloom",
] as const;
export const COMPARE_ROWS: Row[] = [
  {
    label: "They just answer the phone — nothing to type or record",
    cells: [2, 2, 1, 2, 2, 1, 1],
  },
  {
    label: "Follows what they actually said, not a fixed list of prompts",
    cells: [2, 2, 0, 0, 0, 2, 1],
  },
  {
    label: "Everyone who was there adds their own version",
    cells: [2, 1, 1, 0, 1, 2, 2],
  },
  {
    label: "Different memories kept side by side, not merged into one",
    cells: [2, 0, 0, 0, 0, 1, 1],
  },
  {
    label: "Today counts too, not only the past",
    cells: [2, 1, 1, 1, 0, 2, 2],
  },
  {
    label: "Keeps growing after the book — the book isn’t the end",
    cells: [2, 1, 1, 1, 0, 2, 2],
  },
  {
    label: "Their real words — never an AI imitation of them",
    cells: [2, 2, 2, 2, 2, 2, 0],
  },
];

/** Why families switch — the /compare argument, in four short reasons. */
export const SWITCH = [
  {
    title: "You want everyone’s version, not just one.",
    body: "A memoir tells it one way. A Story keeps Mom’s version, her brother’s, and the photograph — side by side, each in their own name.",
  },
  {
    title: "Your parent won’t use an app.",
    body: "A Story calls at the hour they choose. They answer and talk; it follows what they say, the way someone who knows them would.",
  },
  {
    title: "Life is still happening.",
    body: "The first apartment, the grandkids, this Tuesday. A Story is built for the life being lived now, not only the one behind you.",
  },
  {
    title: "A book shouldn’t be the end.",
    body: "Print any chapter when you’re ready. The archive stays open, and the family keeps adding to it.",
  },
] as const;
