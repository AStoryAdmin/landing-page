/**
 * The three conversations the home page plays.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * EVERY QUESTION HERE IS FROM THE APP'S OWN BANK — phone-app-main's
 * src/data/interview.js, 504 questions across the eleven chapters in
 * src/data/eras.js. The wording is lightly spoken-ised (the bank is written
 * to be read on a screen; these are said down a phone line) but no question
 * is invented, and each turn carries the `source` id it came from so the
 * next person can check it in one grep. The depth numbers are the bank's own
 * `depth` field, and `sensitiveKind` is its `sensitive` field, rendered with
 * the exact sentence from the app's src/lib/sensitivity.js.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Two things on these cards run AHEAD of the app rather than behind it, and
 * are here deliberately — do not "correct" them back:
 *
 *   `clip`     The storyteller's voice kept as audio. Today MemoryScreen
 *              records, posts to /api/transcribe and keeps only the text;
 *              the one audio bucket is `chat-audio`, which holds A Story's
 *              own spoken reply. Storing the storyteller's own audio is
 *              being built.
 *   `linked`   Entity links between memories. `memories` has era, period,
 *              rating and privacy and no tags or people; linking is coming.
 *
 * Everything else on the card is what lib/memoryCard.js renders today.
 *
 * ── Why these three, and why not the old one ──────────────────────────────
 *
 * The script this replaced was a grandfather playing guitar on a porch while
 * fireflies came out. Two problems. It was American-nostalgia stock footage,
 * and — worse — its pivot was unmotivated: the AI asked "one evening you can
 * still see, where are you?" and got a porch, so the porch arrived because a
 * location had been requested. That is a question list with good manners.
 *
 * The whole claim of this product is that it follows what the person
 * volunteered. So in all three of these, the turn that matters is the same
 * move: somebody drops something in a subordinate clause, on their way to
 * answering a different question, and the interview abandons its own question
 * and goes after the thing they dropped.
 *
 *   Faith     Rosa, asked for her earliest memory of worship, ends on
 *             "even the winter she wouldn't look at Father Dolan".
 *   Childhood Errol, asked what the kitchen smelled like, says the bread was
 *             his aunt's "that year my mother was in the sanatorium".
 *   Love      Liên, asked what she first noticed about her husband, finishes
 *             "he sold it the month before we left".
 *
 * Between them they also demonstrate the three things a single script could
 * not: a sensitive question arriving with the app's real permission line
 * (Faith, Love), a storyteller refusing one and the interview taking the no
 * without losing the thread (Childhood), and a memory whose subject is a
 * person who has died (Faith).
 */

/** Rung 1–5 on the interview's depth ladder, and the reason for staying put. */
export type ScriptTurn = {
    role: 'ai' | 'user';
    text: string;
    delay: number;
    /** Rung 1–5. AI turns only. */
    depth?: number;
    /** Why this question and not a new subject — shown beside the transcript. */
    stay?: string;
    /** The app's `sensitive` field. Renders the permission line above the question. */
    sensitiveKind?: 'loss' | 'hardship' | 'rupture' | 'private';
    /** The question's id in phone-app-main/src/data/interview.js. */
    source?: string;
};

export type TranscriptLine = { who: string; at: string; text: string };

export type Scenario = {
    id: string;
    /** The chapter, exactly as data/eras.js names it. */
    chapter: string;
    /** Short label for the heading above the phone. */
    label: string;
    /** One line telling the viewer what to watch for. */
    watch: string;
    /** Who is talking, and who set the call up. */
    teller: string;
    callLabel: string;
    /** The subject the band holds to, left of the rung name. */
    subject: string;
    script: ScriptTurn[];
    /** What the card shows first. */
    title: string;
    summary: string;
    excerpt: string;
    /** The app's date line: when it happened, and how old they were. */
    dateLine: string;
    /** The single badge lib/memoryCard.js picks — contributor beats rating. */
    badge: string;
    /** The editorial line, where this memory has an argument to make. */
    about?: string;
    transcript: TranscriptLine[];
    /** Ahead of the app — see the header. */
    clip: { label: string; duration: string; note: string };
    linked: string[];
    /** The three access tiers, made concrete. */
    family: { kind: 'edit' | 'add'; name: string; text: string; pending?: string }[];
    shared: string;
    meta: string[];
};

/* The five rungs, named as the app names them. */
export const DEPTHS = ['Warm-up', 'Scene', 'Portrait', 'Stakes', 'Reckoning'] as const;

/* Verbatim from phone-app-main/src/lib/sensitivity.js. Changing a word here
   means the site is quoting the app wrong. */
export const SENSITIVE_LABEL: Record<string, string> = {
    loss: 'Touches on losing someone',
    hardship: 'Touches on hard years',
    rupture: 'Touches on a falling-out',
    private: 'Asks for something private',
};

export const sensitiveNote = (kind?: string) =>
    kind && SENSITIVE_LABEL[kind]
        ? `${SENSITIVE_LABEL[kind]}. Leave it for another day if today isn’t the day.`
        : null;

/* ──────────────────────────────────────────────────────────────────────────
 * 1 · Faith & what carried me
 *
 * The chapter the app took the most care over: written so a lifelong
 * worshipper and somebody who drifted away at nineteen can both answer every
 * question in it. Rosa is neither — she is the third case the chapter was
 * really for, somebody who never left and never forgave.
 * ────────────────────────────────────────────────────────────────────────── */
const faith: Scenario = {
    id: 'faith',
    chapter: 'Faith & what carried me',
    label: 'The wall at St Brigid’s',
    watch: 'Rosa drops eight words she did not mean to. Watch what the interview does with them.',
    teller: 'Rosa',
    callLabel: 'A Story · calling Rosa',
    subject: 'One winter · her mother',
    script: [
        { role: 'ai', depth: 1, text: 'Hello — is that Rosa? This is A Story. Your grandson Marco set this up and asked me to call. There’s nothing to prepare, and we can stop whenever you like.', delay: 500 },
        { role: 'user', text: 'He did warn me. I’ll tell you now, I’ve never been much of a talker.', delay: 2200 },

        { role: 'ai', depth: 1, source: 'faith-earliest', text: 'Then I’ll do the asking. What’s your earliest memory of worship — how old were you, and whose hand were you holding?', delay: 2300 },
        { role: 'user', text: 'My mother’s. St Brigid’s, six o’clock Mass, before her shift at the laundry. She went every morning of her life. Even the winter she wouldn’t look at Father Dolan.', delay: 2600 },

        {
            role: 'ai', depth: 2,
            stay: 'She volunteered that. A question list takes the earliest-memory answer and moves on — but the winter is the thing she actually put in front of me.',
            text: 'You slipped something in at the end there. The winter she wouldn’t look at Father Dolan. I’d rather stay with that than move on — what happened that winter?',
            delay: 2500,
        },
        { role: 'user', text: 'My brother Thomas. He was born in the February and he lived four days. He wasn’t baptised in time, so they wouldn’t have him in the churchyard. My father buried him himself, outside the wall, by the hawthorn.', delay: 2900 },

        {
            role: 'ai', depth: 2, source: 'faith-window-sound',
            stay: 'She has given me the fact. A scene isn’t a scene until I can see the room — so: the same church, the following morning.',
            text: 'And she still went at six the next morning. What could you see from where she sat, that winter?',
            delay: 2600,
        },
        { role: 'user', text: 'The back of everybody’s heads. She’d always sat near the front, and after Thomas she took us to the very back, by the door. She never missed a morning. She just wouldn’t take Communion, and she wouldn’t look at him.', delay: 2800 },

        {
            role: 'ai', depth: 3, source: 'faith-grandparent',
            stay: 'Now the person. Belief can be described; a woman who goes anyway has to be drawn.',
            text: 'Which of your elders had the deepest faith? And don’t tell me what they said — tell me what they did.',
            delay: 2500,
        },
        { role: 'user', text: 'Her. And that’s the thing I only understood much later — she was furious with that church for forty years and she never missed a morning in it. My mother could hold both at once. I never learned how.', delay: 2900 },

        {
            role: 'ai', depth: 4, source: 'faith-no-answer', sensitiveKind: 'private',
            stay: 'Marked sensitive in the bank, so it arrives with permission to refuse it. Nine questions in, it has been earned — asked first, it would have been an intrusion.',
            text: 'What did you ask for and never receive?',
            delay: 2700,
        },
        { role: 'user', text: 'That they’d let him inside the wall. I wrote to them about it, when I was older — for years. They did change it, eventually. Long after she was dead. Too late to be the slightest use to her.', delay: 2900 },

        {
            role: 'ai', depth: 5, source: 'faith-see-again', sensitiveKind: 'loss',
            stay: 'The last rung, and it is only askable because the four under it were answered.',
            text: 'Who do you hope to see again — and what would you say to them first?',
            delay: 2600,
        },
        { role: 'user', text: 'The two of them together. And I’d tell her they moved the wall. That’s all. I’d just want her to know they moved the wall.', delay: 2800 },

        { role: 'ai', depth: 5, text: 'Then that’s what we’ll keep, Rosa — in your voice, in your words. Thomas has four days and a hawthorn tree in your family’s book now, which is four days more than the parish ever gave him.', delay: 2600 },
    ],
    title: 'What did you ask for and never receive?',
    dateLine: '1948 · she was six',
    badge: 'Treasured',
    about: 'Thomas lived four days and has no headstone. This is the only place his name is written down.',
    summary:
        'Rosa’s earliest memory of church is her mother’s hand at six o’clock Mass, before the laundry shift. In the February of 1948 her brother Thomas was born and lived four days; he had not been baptised, so the parish would not bury him inside the churchyard wall, and her father buried him himself by the hawthorn. Her mother never missed a morning Mass after it — she simply moved the family to the back pew, stopped taking Communion, and would not look at Father Dolan. Rosa wrote to the diocese about the wall for years. The rule changed long after her mother had died.',
    excerpt: 'I’d tell her they moved the wall. That’s all. I’d just want her to know they moved the wall.',
    transcript: [
        { who: 'A Story', at: '02:14', text: 'You slipped something in at the end there. The winter she wouldn’t look at Father Dolan. I’d rather stay with that than move on — what happened that winter?' },
        { who: 'Rosa', at: '02:26', text: 'My brother Thomas. He was born in the February and he lived four days. He wasn’t baptised in time, so they wouldn’t have him in the churchyard. My father buried him himself, outside the wall, by the hawthorn.' },
        { who: 'A Story', at: '02:51', text: 'And she still went at six the next morning. What could you see from where she sat, that winter?' },
        { who: 'Rosa', at: '03:02', text: 'The back of everybody’s heads. She’d always sat near the front, and after Thomas she took us to the very back, by the door. She never missed a morning. She just wouldn’t take Communion, and she wouldn’t look at him.' },
        { who: 'A Story', at: '05:38', text: 'What did you ask for and never receive?' },
        { who: 'Rosa', at: '05:49', text: 'That they’d let him inside the wall. I wrote to them about it, when I was older — for years. They did change it, eventually. Long after she was dead. Too late to be the slightest use to her.' },
        { who: 'A Story', at: '07:02', text: 'Who do you hope to see again — and what would you say to them first?' },
        { who: 'Rosa', at: '07:15', text: 'The two of them together. And I’d tell her they moved the wall. That’s all. I’d just want her to know they moved the wall.' },
    ],
    clip: {
        label: 'In Rosa’s voice',
        duration: '0:38',
        note: 'Thirty-eight seconds out of fifty minutes: the four seconds of nothing before she answers, and what her voice does on “they moved the wall” — which she says twice, and the second time is not the same as the first.',
    },
    linked: ['Her mother, Angela', 'Thomas, her brother', 'St Brigid’s', '1948'],
    family: [
        { kind: 'edit', name: 'Marco', text: 'was invited and can edit this archive. He found the parish register and added Thomas’s four dates to it.' },
        { kind: 'add', name: 'Her cousin Pia', text: 'sent a photograph of the hawthorn from the contribute link. No account, no app.', pending: 'Waiting for Rosa' },
    ],
    shared: 'Rosa decides who sees this. Right now: Marco, Pia and 9 others.',
    meta: ['Chapter: Faith & what carried me', '1948', 'Added today'],
};

/* ──────────────────────────────────────────────────────────────────────────
 * 2 · Childhood
 *
 * The one where somebody says no.
 *
 * Every demo of an AI interviewer shows it getting an answer. The more
 * persuasive thing — and the harder thing to build — is what happens when it
 * doesn't. Errol refuses a question eight turns in. The interview does not
 * rephrase it, does not come at it sideways, and does not pretend it never
 * asked: it says so, drops it, and goes into the same year through the door
 * he left open. He brings it back himself in the last line, which is what
 * people do when they were not pushed.
 * ────────────────────────────────────────────────────────────────────────── */
const childhood: Scenario = {
    id: 'childhood',
    chapter: 'Childhood',
    label: 'The long way to school',
    watch: 'Errol refuses a question halfway through. Watch what the interview does with a no.',
    teller: 'Errol',
    callLabel: 'A Story · calling Errol',
    subject: 'One year · his aunt',
    script: [
        { role: 'ai', depth: 1, text: 'Good morning — Errol? This is A Story. Your daughter Simone set this up. Nothing to get ready, and we can stop any time you want to.', delay: 500 },
        { role: 'user', text: 'She’s been on at me about this for a month. Go on then.', delay: 2100 },

        { role: 'ai', depth: 1, source: 'child-first-memory', text: 'What’s the first thing you remember? One image — you don’t have to explain it.', delay: 2200 },
        { role: 'user', text: 'A blue enamel jug on a windowsill. Don’t ask me why.', delay: 2200 },

        { role: 'ai', depth: 2, source: 'child-kitchen-smell', text: 'Then let’s go and stand at that window. What did the kitchen smell like in the morning — and who was already in there when you came down?', delay: 2400 },
        { role: 'user', text: 'Bread, mostly. My aunt Vera baked every other day. That was the year my mother was in the sanatorium, so it was Vera doing it.', delay: 2600 },

        {
            role: 'ai', depth: 2,
            stay: 'He put the sanatorium in the middle of a sentence about bread, which is where people put the things they have decided not to make a fuss of.',
            text: 'You went straight past something. The year your mother was in the sanatorium. I’d like to come back to that rather than the bread — how old were you?',
            delay: 2500,
        },
        { role: 'user', text: 'Seven. Eight by the time she came home. Look — I’d rather not go into what she had, if that’s all right with you.', delay: 2600 },

        {
            role: 'ai', depth: 2, source: 'child-looked-after',
            stay: 'That is a no, so it is a no. Nothing gets rephrased and nothing comes back sideways — the question was never the point, the year was, and a year has a dozen other doors.',
            text: 'Of course. We’ll leave that exactly where it is. Tell me about the house instead — who looked after you that year, and what did an ordinary day with them actually look like?',
            delay: 2600,
        },
        { role: 'user', text: 'Vera. She had four of her own and she took me as a fifth, no discussion about it. Up at six, the fire, the bread. And she walked me to school the long way round, so we wouldn’t have to go past the hospital gate.', delay: 2900 },

        {
            role: 'ai', depth: 4, source: 'child-over-head',
            stay: 'Rung four, and it is about the year rather than the illness. What a child was allowed to overhear is a different question from what the diagnosis was.',
            text: 'What did the adults say over your head that year, in the lower voice?',
            delay: 2500,
        },
        { role: 'user', text: 'They’d stop the second I came in. And they were forever saying she was "doing very well". I’d worked out what that meant by about the third month. Nobody tells a child a person is doing very well unless the other thing is on the table.', delay: 2900 },

        {
            role: 'ai', depth: 5, source: 'child-safe-person',
            stay: 'The reckoning is the follow-up, not the question: the bank asks who made you feel safe, and then whether you ever told them.',
            text: 'Who made you feel safe that year, and how did they do it? And did you ever tell them?',
            delay: 2600,
        },
        { role: 'user', text: 'Vera. The long way to school — she never once said why we went round that way, and neither did I, not in twelve months of it. No. I never told her. She died in ’91 and I never said a word about it.', delay: 3000 },
        { role: 'user', text: 'It was tuberculosis. You may as well put it down properly, now we’re here.', delay: 2600 },

        { role: 'ai', depth: 5, text: 'Thank you, Errol. We’ll put it down properly — and we’ll put the long way to school down too. I don’t think Simone has ever heard that one.', delay: 2600 },
    ],
    title: 'Who looked after you while your parents worked?',
    dateLine: '1954 · he was seven',
    badge: 'From Errol',
    about: 'Errol turned one question down. It is not in the archive, and nobody in the family will ever see that it was asked.',
    summary:
        'The year Errol was seven his mother went into a sanatorium and his aunt Vera — who already had four children — took him as a fifth without discussing it. He remembers a blue enamel jug on the windowsill, the fire at six, and bread every other day. Vera walked him to school the long way round for twelve months so that they never passed the hospital gate, and never once said why; he never asked, and never thanked her for it. She died in 1991. Late in the conversation Errol came back to the thing he had declined earlier and named the illness himself.',
    excerpt: 'She never once said why we went round that way, and neither did I. No. I never told her.',
    transcript: [
        { who: 'A Story', at: '01:48', text: 'You went straight past something. The year your mother was in the sanatorium. I’d like to come back to that rather than the bread — how old were you?' },
        { who: 'Errol', at: '01:57', text: 'Seven. Eight by the time she came home. Look — I’d rather not go into what she had, if that’s all right with you.' },
        { who: 'A Story', at: '02:06', text: 'Of course. We’ll leave that exactly where it is. Tell me about the house instead — who looked after you that year, and what did an ordinary day with them actually look like?' },
        { who: 'Errol', at: '02:19', text: 'Vera. She had four of her own and she took me as a fifth, no discussion about it. Up at six, the fire, the bread. And she walked me to school the long way round, so we wouldn’t have to go past the hospital gate.' },
        { who: 'A Story', at: '06:31', text: 'Who made you feel safe that year, and how did they do it? And did you ever tell them?' },
        { who: 'Errol', at: '06:44', text: 'Vera. The long way to school — she never once said why we went round that way, and neither did I, not in twelve months of it. No. I never told her. She died in ’91 and I never said a word about it.' },
        { who: 'Errol', at: '07:09', text: 'It was tuberculosis. You may as well put it down properly, now we’re here.' },
    ],
    clip: {
        label: 'In Errol’s voice',
        duration: '0:29',
        note: 'Twenty-nine seconds, and most of the value is in two of them — the gap before “no, I never told her”. On the page that is four words. It is not four words when he says it.',
    },
    linked: ['Vera, his aunt', 'The sanatorium year', 'Walsall', '1954'],
    family: [
        { kind: 'edit', name: 'Simone', text: 'was invited and can edit this archive. She dated it — 1954, from her grandmother’s discharge letter.' },
        { kind: 'add', name: 'His cousin Ray', text: 'is one of Vera’s four, and sent his own account of the same year through the contribute link.', pending: 'Waiting for Errol' },
    ],
    shared: 'Errol decides who sees this. Right now: Simone, Ray and 5 others.',
    meta: ['Chapter: Childhood', 'Walsall, 1954', 'Added today'],
};

/* ──────────────────────────────────────────────────────────────────────────
 * 3 · Love & family
 *
 * A courtship question that opens onto a departure, because that is where she
 * put it. The pivot is the point: she is asked what she first noticed about
 * her husband, gives an entirely good answer about a bicycle, and then ends
 * the sentence six words past where the answer finished.
 * ────────────────────────────────────────────────────────────────────────── */
const love: Scenario = {
    id: 'love',
    chapter: 'Love & family',
    label: 'Six nails, six houses',
    watch: 'A question about a courtship. Liên answers it, then keeps going for six more words.',
    teller: 'Liên',
    callLabel: 'A Story · calling Liên',
    subject: 'One marriage · the leaving',
    script: [
        { role: 'ai', depth: 1, text: 'Hello — is that Liên? This is A Story. Your granddaughter Mai asked me to call you. We can talk for five minutes or an hour, whichever suits you today.', delay: 500 },
        { role: 'user', text: 'Mai said you would want to ask about Ông. All right. Ask.', delay: 2200 },

        { role: 'ai', depth: 2, source: 'love-noticed', text: 'Then we’ll start there. What did you notice first about him?', delay: 2200 },
        { role: 'user', text: 'His bicycle. He was the only one on our lane with one and he cleaned it like it was a motorbike. He sold it the month before we left.', delay: 2600 },

        {
            role: 'ai', depth: 2,
            stay: 'She answered the question in the first sentence and then kept going for six more words. The six words are the story — she came to tell me about a courtship and left a departure at the end of it.',
            text: 'The bicycle is a good answer, and I’ll come back to it. But you finished on something else — he sold it the month before you left. Where were you going?',
            delay: 2600,
        },
        { role: 'user', text: 'Out. 1979. We went down to Rạch Giá and waited eleven days for a boat. The bicycle paid for two of the places on it.', delay: 2700 },

        {
            role: 'ai', depth: 2, source: 'love-first-shared',
            stay: 'Not the crossing — everyone asks about the crossing. The room on the other side is the one nobody has ever asked her about.',
            text: 'What was wrong with the first place the two of you had, after?',
            delay: 2600,
        },
        { role: 'user', text: 'One room in Santa Ana, over a garage. Cold, and it smelled of the car underneath. He put a nail in the wall the first night for my mother’s photograph. That was it. That was the house.', delay: 2900 },

        {
            role: 'ai', depth: 3, source: 'love-never-used-to',
            stay: 'Forty-one years is not a summary. The portrait rung wants the specific irritation, because that is what a person is actually made of.',
            text: 'Forty-one years. What did he do that you never got used to — and did you ever say so?',
            delay: 2600,
        },
        { role: 'user', text: 'He would not throw anything away. Screws, wire, the bags from the market. I shouted at him about it for forty years. He never argued back once — he would just wait, and put it all back in the drawer when I had gone out.', delay: 2900 },

        {
            role: 'ai', depth: 4, source: 'love-hardest-year', sensitiveKind: 'rupture',
            stay: 'Marked sensitive, so it comes with permission to leave it. It is also asked by name and by year, because "was it hard?" gets a yes and nothing else.',
            text: 'What was the hardest year the two of you had together — and what got you through it?',
            delay: 2700,
        },
        { role: 'user', text: '1983. He could not find work and he would not write home and say so. His mother was still in Cần Thơ waiting to hear that he had done well. So I wrote instead, and I lied for him, and when he found out he did not speak to me for a fortnight.', delay: 3000 },

        {
            role: 'ai', depth: 5, source: 'love-kept-together',
            stay: 'The bank’s own hint on this one: not the romantic answer, the true one. Asked at the start it gets a wedding photograph. Asked here it gets 1983.',
            text: 'What actually kept the two of you together? Not the romantic answer — the true one.',
            delay: 2700,
        },
        { role: 'user', text: 'He knew I had done it so that he would not have to. Angry for two weeks, grateful for forty years, and he never once said it out loud. He put a nail in the wall for my mother in every house we ever lived in. Six houses. That was him saying it.', delay: 3100 },

        { role: 'ai', depth: 5, text: 'Then we’ll keep the nail and the six houses, Liên, in your own words. Mai’s children will know why there is a photograph by the door.', delay: 2600 },
    ],
    title: 'What actually kept you together?',
    dateLine: '1979–2020 · from her twenties',
    badge: 'From Mai',
    summary:
        'Liên first noticed Tuấn because of his bicycle — the only one on their lane, cleaned like a motorbike. He sold it in 1979 to pay for two places on a boat out of Rạch Giá, which they waited eleven days for. Their first home was one cold room over a garage in Santa Ana that smelled of the car underneath; he put a nail in the wall the first night for her mother’s photograph. In 1983 he could not find work and would not write home to say so, so she wrote to his mother in Cần Thơ and lied on his behalf, and he did not speak to her for a fortnight. He never thanked her for it in words. He put up the same nail in all six houses they lived in.',
    excerpt: 'Angry for two weeks, grateful for forty years, and he never once said it out loud.',
    transcript: [
        { who: 'A Story', at: '00:51', text: 'The bicycle is a good answer, and I’ll come back to it. But you finished on something else — he sold it the month before you left. Where were you going?' },
        { who: 'Liên', at: '01:03', text: 'Out. 1979. We went down to Rạch Giá and waited eleven days for a boat. The bicycle paid for two of the places on it.' },
        { who: 'A Story', at: '01:29', text: 'What was wrong with the first place the two of you had, after?' },
        { who: 'Liên', at: '01:37', text: 'One room in Santa Ana, over a garage. Cold, and it smelled of the car underneath. He put a nail in the wall the first night for my mother’s photograph. That was it. That was the house.' },
        { who: 'A Story', at: '04:12', text: 'What was the hardest year the two of you had together — and what got you through it?' },
        { who: 'Liên', at: '04:24', text: '1983. He could not find work and he would not write home and say so. His mother was still in Cần Thơ waiting to hear that he had done well. So I wrote instead, and I lied for him, and when he found out he did not speak to me for a fortnight.' },
        { who: 'A Story', at: '05:47', text: 'What actually kept the two of you together? Not the romantic answer — the true one.' },
        { who: 'Liên', at: '05:58', text: 'He knew I had done it so that he would not have to. Angry for two weeks, grateful for forty years, and he never once said it out loud. He put a nail in the wall for my mother in every house we ever lived in. Six houses. That was him saying it.' },
    ],
    clip: {
        label: 'In Liên’s voice',
        duration: '0:52',
        note: 'Fifty-two seconds, and she counts the houses out loud in the middle of it — one to six, in Vietnamese, under her breath, before she says the number in English. A transcript records "six".',
    },
    linked: ['Tuấn, her husband', 'Rạch Giá, 1979', 'Santa Ana', 'Her mother’s photograph'],
    family: [
        { kind: 'edit', name: 'Mai', text: 'was invited and can edit this archive. She put the diacritics back on Rạch Giá and Cần Thơ.' },
        { kind: 'add', name: 'Her son Quang', text: 'used the contribute link to send the one photograph of the bicycle, from 1977.', pending: 'Waiting for Liên' },
    ],
    shared: 'Liên decides who sees this. Right now: Mai, Quang and 11 others.',
    meta: ['Chapter: Love & family', 'Rạch Giá → Santa Ana', 'Added today'],
};

export const SCENARIOS: Scenario[] = [faith, childhood, love];
