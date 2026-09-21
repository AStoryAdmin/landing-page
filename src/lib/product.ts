/**
 * What A Story actually does, in the app's own terms.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS FILE MIRRORS THE APP, the same way ./pricing does. The chapters are
 * phone-app-main/src/data/eras.js verbatim; the question count and the depth
 * ladder come from src/data/interview.js and src/lib/dailyQuestion.js.
 * If the app's chapters change, change them here — the site should never
 * name a chapter the product does not have.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Before this existed the site described the archive as "childhood, school
 * years, career, love, family, legacy" — a plausible-sounding list that was
 * nobody's actual product. The real one is both true and better: it was
 * argued over, and the reasoning is worth showing rather than smoothing away.
 */

/** Every question in the bank, across every chapter. */
export const QUESTION_COUNT = 504;

/** How many chapters a life is told in here. */
export const CHAPTER_COUNT = 11;

export type Chapter = {
    /** Exactly as the app names it. */
    name: string;
    /** What it holds, in one line. */
    blurb: string;
    /** Why this chapter exists in this shape, where the reason is worth saying. */
    note?: string;
};

export const CHAPTERS: Chapter[] = [
    {
        name: 'Where we come from',
        blurb: 'Parents, grandparents, and the place the family started.',
        note: 'A life has an edge before it begins, and most memoirs have nowhere to put it.',
    },
    {
        name: 'Childhood',
        blurb: 'The house, the street, the rules, and what it smelled like in summer.',
    },
    {
        name: 'Growing up',
        blurb: 'School, teenage years, first jobs, and leaving home.',
        note: 'One stretch rather than "school years", because plenty of lives stopped schooling at twelve.',
    },
    {
        name: 'Love & family',
        blurb: 'How they met, what it was like, and the family that came of it.',
    },
    {
        name: 'Work & making a living',
        blurb: 'Farms, shops, kitchens, offices, and caring for people.',
        note: 'Deliberately not "Career" — most of the women this exists for never had one, and all of them worked.',
    },
    {
        name: 'The world we lived through',
        blurb: 'War, leaving, arriving, and the years that bent everything.',
        note: 'Not the history. What it was like on a Tuesday.',
    },
    {
        name: 'When everything changed',
        blurb: 'The high point, the low point, and the day after which nothing was the same.',
        note: 'The one chapter that cuts across the years. People file a life by what turned, not by decade.',
    },
    {
        name: 'Faith & what carried me',
        blurb: 'Whatever they leaned on, named or not.',
        note: 'Written so a lifelong believer and someone who drifted away at nineteen can both answer every question in it.',
    },
    {
        name: 'Looking back',
        blurb: 'The view from here, and what it all taught them.',
    },
    {
        name: 'From the family',
        blurb: 'The same years from the other side — what the children and grandchildren remember.',
        note: 'Somebody else’s voice on the same afternoon. This is the chapter that makes it a documentary rather than a diary.',
    },
    {
        name: 'Anything else',
        blurb: 'Everything that fits nowhere else. Every archive needs one.',
    },
];

/**
 * The interview gets harder as the archive earns it. A new archive is only
 * asked warm-ups; the questions that cost something arrive once somebody has
 * shown they mean it. This is the part a competitor cannot copy by scraping a
 * list of questions.
 */
export const DEPTHS = [
    {
        level: 1,
        name: 'Warm-up',
        blurb: 'Easy to answer on a bad day. Where did you live? Who else was in the house?',
    },
    {
        level: 2,
        name: 'Scene',
        blurb: 'One afternoon, in detail. What was on the table, and who was talking over whom.',
    },
    {
        level: 3,
        name: 'Portrait',
        blurb: 'A person, drawn properly. What your father was like when nobody was watching.',
    },
    {
        level: 4,
        name: 'Stakes',
        blurb: 'What it cost. The choice that was hard, and what you gave up to make it.',
    },
    {
        level: 5,
        name: 'Reckoning',
        blurb: 'What you would say now. The apology, the pride, the thing never said out loud.',
    },
];

/**
 * How many questions are marked sensitive — loss (14), hardship (19), rupture
 * (12), private (19). Counted straight off the app's bank:
 *
 *   grep -c 'sensitive: "' phone-app-main/src/data/interview.js
 *
 * This said 62 for a while, which was true of an older CSV. If the bank grows,
 * re-run the grep rather than guessing.
 */
export const SENSITIVE_COUNT = 64;

/**
 * The line those questions arrive with, instead of a warning triangle. Quoted
 * on the site because it is the single clearest signal that this was built by
 * someone who has sat with an eighty-year-old rather than shipped a prompt
 * list. Verbatim from the app's src/lib/sensitivity.js.
 */
export const SENSITIVE_LINE =
    'Leave it for another day if today isn’t the day.';

/** What a memory becomes, in the order the family meets it. */
export const MEMORY_LAYERS = [
    {
        name: 'The card',
        blurb: 'A short, readable summary you can take in over a cup of tea — titled, dated, and filed in its chapter.',
    },
    {
        name: 'The full transcript',
        blurb: 'Underneath the card, word for word, exactly as it was said. Searchable, and nothing edited out.',
    },
    {
        name: 'The voice highlight',
        blurb: 'The part actually worth hearing, kept as audio in their own voice — the laugh, the pause, the way they said her name.',
    },
];
