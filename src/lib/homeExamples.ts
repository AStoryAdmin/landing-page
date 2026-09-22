/**
 * The homepage's example family — one household, several generations.
 *
 * Pass 11 illustrated A Story with a widow's letters and a brother who lived
 * four days. They are the product's strongest demonstrations (they stay, in
 * demoScripts.ts, on How it works) but a first-time visitor doesn't see
 * themselves in them. The founder asked for the people buyers actually are:
 * a mum keeping what her daughter says, a grandpa who only tells stories with
 * a screwdriver in his hand, two old friends who disagree about a canoe trip.
 * Everything here is one fictional family so the examples add up.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * The scene photographs use the generated assets documented in
 * `docs/image-prompts.md`. Every character and scene is fictional.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The family: Walt and Ruth (grandparents); their son Dan and his wife
 * Sarah; Dan's oldest friend Sam; Dan and Sarah's daughters Lily and Mia.
 * Every name and word is invented, and the footer says so once.
 */

/** "What gets lost" — the three things the family almost didn't keep. */
export const LOST = [
  {
    line: "…what she said the night she asked where the moon goes in the daytime.",
    more: "You were sure you’d remember it word for word. You remember that she asked.",
    photo: "H01",
    alt: "Mia and Sarah looking at the moon through a bedroom window",
    slot: "mum-and-daughter",
    caption: "Mia, 2019",
  },
  {
    line: "…the story Grandpa only tells with a screwdriver in his hand.",
    more: "Everyone has heard a piece of it. Nobody has heard all of it at once.",
    photo: "H02",
    alt: "Walt laughing beside young Dan at a garage workbench",
    slot: "grandpa-workbench",
    caption: "Dad’s garage, 1984",
  },
  {
    line: "…why you and your oldest friend still can’t say “the canoe trip” without laughing.",
    more: "The photo shows the canoe upside down. It doesn't settle who tipped it.",
    photo: "H03",
    alt: "Dan and Sam laughing beside their overturned canoe",
    slot: "childhood-friends",
    caption: "Dan & Sam, ’98",
  },
] as const;

/** The milestones everybody already keeps — the stack beside the first headline. */
export const MILESTONES = [
  { article: "The", word: "wedding", photo: "02", alt: "A wedding portrait", caption: "Walt & Ruth · 1951" },
  { article: "the", word: "graduation", photo: "04", alt: "A graduation portrait", caption: "Dan’s graduation · 1994" },
  { article: "the", word: "first house", photo: "03", alt: "A family standing outside their first house", caption: "The house on Maple Drive · 1973" },
] as const;

/** Everyday photographs for the collage behind "It’s the everyday." (mission CM02). */
export const EVERYDAY = ["05", "09", "11", "12", "14", "17", "07", "13", "20", "25", "06", "10"] as const;

/**
 * "Quietly." (mission CM03–CM05): one ordinary photograph slips away, then
 * comes back with the story A Story caught behind it.
 */
export const QUIET = {
  photo: "21",
  alt: "Hands packing a lunchbox at a kitchen counter",
  date: "Tue, 6 Sep 2022",
  title: "Apple slices, facing up",
  teller: "Sarah",
  told: "Mia’s first week of school. She’d only eat them if the peel faced up — ‘so they can see out.’",
} as const;

/** The collaboration example: one memory, started in a call, finished by the family. */
export const LAKE_MONSTER = {
  title: "The lake monster",
  date: "Sat, 17 Aug 2024",
  tags: ["Family", "Camping"],
  photo: "H04",
  alt: "A grandfather and children around a campfire by a lake at dusk",
  slot: "campfire",
  /** Started by Grandpa, in his own words, on a call. */
  teller: { name: "Grandpa Walt", initial: "W" },
  told: "I told Lily there was a monster in that lake. I never thought she’d believe me for three whole summers.",
  /** What arrives from the family afterwards, in order. */
  added: [
    { name: "Sarah", initial: "S", role: "Lily’s mum", kind: "12 photos", quote: "She didn’t sleep. She kept watch at the tent door with a flashlight." },
    { name: "Lily, 11", initial: "L", role: "Walt’s granddaughter", kind: "Voice note", quote: "There WAS a monster. I heard it breathing." },
    { name: "Uncle Ben", initial: "B", role: "Walt’s son", kind: "Written", quote: "The monster was me. With a paddle. Sorry, Lily." },
  ],
} as const;

/**
 * The family's book: one spread per memory, from 1952 to this morning. Each
 * right-hand page is laid out like the app's memory page — date, tags, the
 * teller's own words — with a second family member's line beneath, because
 * the book is a documentary, not a diary.
 */
export const SPREADS = [
  {
    year: "1952",
    date: "June 1952",
    tags: ["Home", "Early days"],
    title: "The porch on Elm Street",
    photo: "01",
    alt: "Two people on the porch steps of a new home, 1952",
    caption: "Walt & Ruth, Elm Street",
    words: "We had one chair and a crate, so we sat on the steps. Every evening that first summer, till the streetlights came on. The neighbours thought we couldn’t afford furniture. We couldn’t.",
    by: "Grandma Ruth · told in a call",
    also: { name: "Dan", initial: "D", quote: "Mum still sits on the steps at every party. Now I know why." },
  },
  {
    year: "1984",
    date: "October 1984",
    tags: ["Grandpa Walt", "The garage"],
    title: "Grandpa’s workbench",
    photo: "H02",
    alt: "Walt and twelve-year-old Dan at a workbench, 1984",
    caption: "Walt and Dan in the garage",
    words: "Every broken fan on the street ended up in that garage. So did every story. He’d hand you a screwdriver and start: “Now, in 1962…”",
    by: "Added by Dan, his son",
    also: { name: "Grandpa Walt", initial: "W", quote: "The fan was never the point." },
  },
  {
    year: "1998",
    date: "August 1998",
    tags: ["Friends", "Two versions"],
    title: "The canoe trip",
    photo: "H03",
    alt: "Dan and Sam laughing beside an overturned canoe, 1998",
    caption: "After the lake",
    words: "We were never lost. We were taking the long way round the lake, and I’d do it again.",
    by: "Dan · told in a call",
    also: { name: "Sam", initial: "S", quote: "Six hours, Dan. Six." },
  },
  {
    year: "2019",
    date: "March 2019",
    tags: ["Mia", "Sarah’s journal"],
    title: "Where the moon goes",
    photo: "H01",
    alt: "Mia and Sarah looking at the moon through a bedroom window",
    caption: "Mia at the bedroom window",
    words: "At bedtime, Mia asked where the moon goes in the daytime. I began explaining the sky, but she shook her head. She wanted to know who keeps it company while we can't see it. Writing this down before I forget how she said it.",
    by: "Sarah · written the same night",
    also: { name: "Grandma Ruth", initial: "R", quote: "Dan asked me the same thing at her age. I wish I'd written down his words." },
  },
  {
    year: "2024",
    date: "17 August 2024",
    tags: ["Family", "Camping"],
    title: "The lake monster",
    photo: "H04",
    alt: "A family around a campfire by a lake",
    caption: "The last night at the lake",
    words: "I told Lily there was a monster in that lake. I never thought she’d believe me for three whole summers.",
    by: "Grandpa Walt · and three more versions",
    also: { name: "Uncle Ben", initial: "B", quote: "The monster was me. With a paddle. Sorry, Lily." },
  },
  {
    year: "Today",
    date: "This morning",
    tags: ["Home", "Today"],
    title: "An ordinary Tuesday",
    photo: "35",
    alt: "A parent carrying laundry through a family home",
    caption: "Tuesday, 8:14",
    words: "Nobody photographs laundry on purpose. That’s exactly why it’s here — the radio on, Mia singing the wrong words, the house smelling of clean sheets.",
    by: "Sarah · added this morning",
    also: { name: "Mia, 10", initial: "M", quote: "They’re not the wrong words." },
  },
] as const;
