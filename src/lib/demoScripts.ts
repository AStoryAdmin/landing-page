/**
 * The three conversations the home page plays.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE QUESTIONS COME FROM THE APP'S OWN BANK — phone-app-main's
 * src/data/interview.js, 504 questions across the eleven chapters in
 * src/data/eras.js. Each question turn carries the `source` id it came from,
 * so any line here can be checked in one grep. Turns with no `source` are
 * follow-ups rather than questions: the bank gives every question a `followUp`
 * and the interview improvises around it, which is the whole difference
 * between this and a form. `depth` is the bank's own depth field and
 * `sensitiveKind` its `sensitive` field, rendered with the exact sentence
 * from the app's src/lib/sensitivity.js.
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
 * Everything else on the card is what lib/memoryCard.js renders today, and
 * every person in these three is invented. Nothing here is a real customer.
 *
 * ── What each one is for ──────────────────────────────────────────────────
 *
 * A single call cannot show the product. Three can, if each is chosen for a
 * different thing it proves:
 *
 *   Faith      A sensitive question arriving with permission to refuse it,
 *              and a memory whose subject died before anyone thought to ask.
 *   Childhood  A storyteller saying no, and an interview that takes the no
 *              without losing the thread — the hardest thing to build, and
 *              the thing families are most afraid of.
 *   Love       A detail let slip in three words, and a last line that only
 *              lands because of a sentence from the first minute.
 *
 * In all three the turn that matters is the same move: somebody drops
 * something in a subordinate clause on their way to answering a different
 * question, and the interview abandons its own question to go after what they
 * dropped. That is the product. `method` names the move as it happens,
 * because without it a viewer reads persistence as repetition.
 */

/** Rung 1–5 on the interview's depth ladder, and the reason for staying put. */
export type ScriptTurn = {
    role: 'ai' | 'user';
    text: string;
    delay: number;
    /** Rung 1–5. AI turns only. */
    depth?: number;
    /** The interviewing move, in three or four words. Shown above the reason. */
    method?: string;
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
    /**
     * The closed state. Nothing plays until somebody asks for it: these are
     * long minutes of a stranger's worst year, and a page that starts three of
     * them at once, unasked, has misunderstood what it is showing.
     */
    cover: {
        /** The line that makes somebody want to open it. */
        quote: string;
        /** Who said it, and the situation in one clause. */
        attribution: string;
        /** What the call is, before you hear any of it. */
        lead: string;
        /** How long it runs. */
        length: string;
    };
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
 * The chapter the app took most care over: written so a lifelong worshipper
 * and somebody who drifted away at nineteen can both answer every question in
 * it. Rosa is the third case it was really for — somebody who never left and
 * never forgave, which no question list has a row for.
 * ────────────────────────────────────────────────────────────────────────── */
const faith: Scenario = {
    id: 'faith',
    chapter: 'Faith & what carried me',
    label: 'The wall at St Brigid’s',
    watch: 'Eight words at the end of an easy answer. The interview hears them and stops.',
    teller: 'Rosa',
    callLabel: 'A Story · calling Rosa',
    subject: 'One winter · her mother',
    cover: {
        quote: 'I’d tell her they moved the wall. That’s all. I’d just want her to know they moved the wall.',
        attribution: 'Rosa, 84 — about a brother who lived four days',
        lead: 'Her grandson asked for her earliest memory of church. She gave it, and then added eight words she had not planned to say.',
        length: '11 questions · about a minute to watch',
    },
    script: [
        { role: 'ai', depth: 1, text: 'Hello — is that Rosa? This is A Story. Your grandson Marco set this up and asked me to call. There’s nothing to prepare, and we can stop whenever you like.', delay: 500 },
        { role: 'user', text: 'He did warn me. I’ll tell you now, I’ve never been much of a talker.', delay: 2200 },

        { role: 'ai', depth: 1, source: 'faith-earliest', method: 'Open on the easiest rung', stay: 'A warm-up, and the bank means it — answerable on a bad day, by somebody who has just said they are not much of a talker. Nothing is being fished for yet.', text: 'Then I’ll do the asking, and you can put it down any time. What’s your earliest memory of worship — how old were you, and whose hand were you holding?', delay: 2400 },
        { role: 'user', text: 'My mother’s. St Brigid’s, six o’clock Mass, before her shift at the laundry. She went every morning of her life. Even the winter she wouldn’t look at Father Dolan.', delay: 2700 },

        {
            role: 'ai', depth: 2,
            method: 'Follow the aside, not the answer',
            stay: 'She answered the question in her first sentence and then added eight words to the end of it. A question list takes the answer and moves on. The eight words are the thing she actually put in front of me.',
            text: 'Rosa — you slipped something in at the end there. The winter she wouldn’t look at Father Dolan. I’d much rather stay with that than move on. What happened that winter?',
            delay: 2700,
        },
        { role: 'user', text: 'My brother Thomas. He was born in the February and he lived four days. He wasn’t baptised in time, so they wouldn’t have him inside the churchyard. My father buried him himself, outside the wall, under the hawthorn.', delay: 3000 },

        {
            role: 'ai', depth: 2, source: 'faith-window-sound',
            method: 'A room before a reason',
            stay: 'She has given me the fact, and a fact is not a memory. Before anything about how it felt, she needs somewhere to stand: the same church, the following morning, from her own seat.',
            text: 'And she still went at six the next morning. What could you see from where she sat, that winter?',
            delay: 2700,
        },
        { role: 'user', text: 'The back of everybody’s heads. She’d always sat near the front, and after Thomas she took us right to the back, by the door. She never missed a morning. She just wouldn’t take Communion, and she wouldn’t look at him.', delay: 3000 },

        {
            role: 'ai', depth: 2, source: 'faith-with-hands',
            method: 'Ask for the object',
            stay: 'Very few people can describe grief on request. Almost everybody can describe a thing they were holding while they felt it.',
            text: 'What did she have in her hands, in that back pew?',
            delay: 2400,
        },
        { role: 'user', text: 'Her beads. Her mother’s, from Cork. And she went through them so fast that winter — I remember thinking she was angry at them. I was six. I thought you could be angry at beads.', delay: 2900 },

        {
            role: 'ai', depth: 3, source: 'faith-grandparent',
            method: 'Draw the person, not the belief',
            stay: 'Belief can be described. A woman who goes anyway has to be drawn — so the question asks for what she did, and rules out what she said.',
            text: 'Which of your elders had the deepest faith? And don’t tell me what they said. Tell me what they did.',
            delay: 2600,
        },
        { role: 'user', text: 'Her. And that’s the thing I only understood much later — she was furious with that church for forty years and she never missed a morning in it. My mother could hold both at once. I never learned how to do that.', delay: 3000 },

        {
            role: 'ai', depth: 4, source: 'faith-no-answer', sensitiveKind: 'private',
            method: 'Offer the exit first',
            stay: 'Marked sensitive in the bank, so it arrives with permission to refuse it — and the permission comes before the question rather than after. Ten questions in it has been earned. Asked first it would have been an intrusion.',
            text: 'What did you ask for and never receive?',
            delay: 2800,
        },
        { role: 'user', text: 'That they’d let him inside the wall. I wrote to them about it, when I was older — for years, on and off. They did change it, in the end. Long after she was dead. Too late to be the slightest use to her.', delay: 3100 },

        {
            role: 'ai', depth: 5, source: 'faith-see-again', sensitiveKind: 'loss',
            method: 'The last rung, once it is owed',
            stay: 'Only askable because the four rungs under it were answered. Put in the first minute this gets a polite sentence about heaven. Put here it gets the true one.',
            text: 'Who do you hope to see again — and what would you say to them first?',
            delay: 2800,
        },
        { role: 'user', text: 'The two of them together. And I’d tell her they moved the wall. That’s all. I’d just want her to know they moved the wall.', delay: 3000 },

        { role: 'ai', depth: 5, method: 'Say what was kept', stay: 'Somebody who has just given away something that cost them should not be thanked and hung up on. The close names the person the call was really about.', text: 'Then that is what we’ll keep, Rosa — in your voice, in your words. Thomas had four days and no headstone, and as of this morning he has a name, a month and a hawthorn tree in your family’s book. That is more than the parish ever gave him.', delay: 2800 },
    ],
    title: 'What did you ask for and never receive?',
    dateLine: '1948 · she was six',
    badge: 'Treasured',
    about: 'Thomas lived four days in 1948 and has no headstone. This page is the only place his name is written down.',
    summary:
        'Rosa’s earliest memory of church is her mother’s hand at six o’clock Mass, before the laundry shift. In the February of 1948 her brother Thomas was born and lived four days; he had not been baptised, so the parish would not bury him inside the churchyard wall, and her father buried him himself under the hawthorn. Her mother never missed a morning Mass afterwards — she moved the family to the back pew, stopped taking Communion, and would not look at Father Dolan. She went through her own mother’s beads from Cork so fast that winter that Rosa, at six, believed you could be angry at beads. Rosa wrote to the diocese about the wall for years. The rule changed long after her mother had died.',
    excerpt: 'She was furious with that church for forty years and she never missed a morning in it. My mother could hold both at once.',
    transcript: [
        { who: 'A Story', at: '02:14', text: 'Rosa — you slipped something in at the end there. The winter she wouldn’t look at Father Dolan. I’d much rather stay with that than move on. What happened that winter?' },
        { who: 'Rosa', at: '02:26', text: 'My brother Thomas. He was born in the February and he lived four days. He wasn’t baptised in time, so they wouldn’t have him inside the churchyard. My father buried him himself, outside the wall, under the hawthorn.' },
        { who: 'A Story', at: '02:51', text: 'And she still went at six the next morning. What could you see from where she sat, that winter?' },
        { who: 'Rosa', at: '03:02', text: 'The back of everybody’s heads. She’d always sat near the front, and after Thomas she took us right to the back, by the door. She never missed a morning. She just wouldn’t take Communion, and she wouldn’t look at him.' },
        { who: 'A Story', at: '03:38', text: 'What did she have in her hands, in that back pew?' },
        { who: 'Rosa', at: '03:44', text: 'Her beads. Her mother’s, from Cork. And she went through them so fast that winter — I remember thinking she was angry at them. I was six. I thought you could be angry at beads.' },
        { who: 'A Story', at: '05:38', text: 'What did you ask for and never receive?' },
        { who: 'Rosa', at: '05:49', text: 'That they’d let him inside the wall. I wrote to them about it, when I was older — for years, on and off. They did change it, in the end. Long after she was dead. Too late to be the slightest use to her.' },
        { who: 'A Story', at: '07:02', text: 'Who do you hope to see again — and what would you say to them first?' },
        { who: 'Rosa', at: '07:15', text: 'The two of them together. And I’d tell her they moved the wall. That’s all. I’d just want her to know they moved the wall.' },
    ],
    clip: {
        label: 'In Rosa’s voice',
        duration: '0:38',
        note: 'Thirty-eight seconds out of fifty minutes. Four seconds of nothing before she answers, and then what her voice does on “they moved the wall” — which she says twice, and the second time is not the same as the first. No transcript holds that, so it is kept as sound.',
    },
    linked: ['Her mother, Angela', 'Thomas, her brother', 'St Brigid’s', 'The beads from Cork', '1948'],
    family: [
        { kind: 'edit', name: 'Marco', text: 'was invited and can edit this archive. He found the parish register and put Thomas’s four dates into it.' },
        { kind: 'add', name: 'Her cousin Pia', text: 'sent a photograph of the hawthorn through the contribute link. No account, no app, nothing to sign up for.', pending: 'Waiting for Rosa' },
    ],
    shared: 'Rosa decides who sees this. Right now: Marco, Pia and 9 others.',
    meta: ['Chapter: Faith & what carried me', '1948', 'Added today'],
};

/* ──────────────────────────────────────────────────────────────────────────
 * 2 · Childhood
 *
 * The one where somebody says no.
 *
 * Every demo of an AI interviewer shows it getting an answer. The harder
 * thing, and the thing families are actually frightened of, is what it does
 * when it doesn't. Errol refuses a question eight turns in. The interview does
 * not rephrase it, does not come at it sideways, and does not pretend it never
 * asked: it says so, drops it, and reaches the same year through a door he
 * left open himself. He brings it back in the last line, which is what people
 * do when they were not pushed.
 * ────────────────────────────────────────────────────────────────────────── */
const childhood: Scenario = {
    id: 'childhood',
    chapter: 'Childhood',
    label: 'The long way to school',
    watch: 'Halfway through, Errol says no. Watch what an interview does with a no.',
    teller: 'Errol',
    callLabel: 'A Story · calling Errol',
    subject: 'One year · his aunt',
    cover: {
        quote: 'She never once said why we went round that way, and neither did I. No. I never told her.',
        attribution: 'Errol, 79 — about the year he was seven',
        lead: 'He refuses a question in the middle of this call. What happens next is the reason families stop being frightened of this.',
        length: '10 questions · about a minute to watch',
    },
    script: [
        { role: 'ai', depth: 1, text: 'Good morning — Errol? This is A Story. Your daughter Simone set this up. Nothing to get ready, and we can stop any time you want to.', delay: 500 },
        { role: 'user', text: 'She’s been on at me about this for a month. Go on then.', delay: 2100 },

        { role: 'ai', depth: 1, source: 'child-first-memory', method: 'One image, no explaining', stay: 'The bank’s easiest question, and its hint is “one image, do not explain it” — which is how you get a memory instead of a summary of a childhood.', text: 'What’s the first thing you remember? One image — you don’t have to explain it.', delay: 2300 },
        { role: 'user', text: 'A blue enamel jug on a windowsill. Don’t ask me why.', delay: 2200 },

        { role: 'ai', depth: 2, source: 'child-kitchen-smell', method: 'Stand where they are standing', stay: 'He has handed me a window. The quickest way into a house is to go and stand at it, rather than ask him to describe the house.', text: 'Then let’s go and stand at that window. What did the kitchen smell like in the morning — and who was already in there when you came down?', delay: 2600 },
        { role: 'user', text: 'Bread, mostly. My aunt Vera baked every other day. That was the year my mother was in the sanatorium, so it was Vera doing it.', delay: 2700 },

        {
            role: 'ai', depth: 2,
            method: 'Hear the subordinate clause',
            stay: 'He put the sanatorium in the middle of a sentence about bread, which is where people put the things they have decided not to make a fuss of.',
            text: 'You went straight past something there. The year your mother was in the sanatorium. I’d like to come back to that rather than the bread — how old were you?',
            delay: 2600,
        },
        { role: 'user', text: 'Seven. Eight by the time she came home. Look — I’d rather not go into what she had, if that’s all right with you.', delay: 2700 },

        {
            role: 'ai', depth: 2, source: 'child-looked-after',
            method: 'Take the no at face value',
            stay: 'That is a no, so it is a no. It does not get rephrased, it does not come back sideways in four questions, and nothing about it goes into the archive. The illness was never the point — the year was, and a year has a dozen other doors.',
            text: 'Of course. We’ll leave that exactly where it is, and it won’t come up again. Tell me about the house instead — who looked after you that year, and what did an ordinary day with them actually look like?',
            delay: 2800,
        },
        { role: 'user', text: 'Vera. She had four of her own and she took me as a fifth, no discussion about it. Up at six, the fire, the bread. And she walked me to school the long way round, so we wouldn’t have to go past the hospital gate.', delay: 3000 },

        {
            role: 'ai', depth: 4, source: 'child-over-head',
            method: 'What a child was allowed to hear',
            stay: 'Rung four, and it is about the year rather than the illness. What the adults let him overhear is a different question from what the diagnosis was, and he never said no to this one.',
            text: 'What did the adults say over your head that year, in the lower voice?',
            delay: 2700,
        },
        { role: 'user', text: 'They’d stop the second I came in. And they were forever saying she was “doing very well”. I’d worked out what that meant by about the third month. Nobody tells a child a person is doing very well unless the other thing is on the table.', delay: 3100 },

        {
            role: 'ai', depth: 5, source: 'child-safe-person',
            method: 'The reckoning is the follow-up',
            stay: 'The bank asks who made you feel safe, and then asks whether you ever told them. The first half is warm. The second half is the one that costs something, and it is why this sits at the top of the ladder.',
            text: 'Who made you feel safe that year, and how did they do it? And did you ever tell them?',
            delay: 2800,
        },
        { role: 'user', text: 'Vera. The long way to school — she never once said why we went round that way, and neither did I, not in twelve months of it. No. I never told her. She died in ’91 and I never said a word about it.', delay: 3200 },
        { role: 'user', text: '…It was tuberculosis. You may as well put it down properly, now we’re here.', delay: 2800 },

        { role: 'ai', depth: 5, method: 'Keep what was offered, not what was asked', stay: 'He came back to it on his own, twelve minutes after the only time it was raised. That is what taking a no buys.', text: 'Thank you, Errol. We’ll put that down properly — and we’ll put the long way to school down beside it. I don’t think Simone has ever heard that one.', delay: 2800 },
    ],
    title: 'Who looked after you while your parents worked?',
    dateLine: '1954 · he was seven',
    badge: 'From Errol',
    about: 'Errol turned one question down. It is not in the archive, and nobody in his family will ever see that it was asked.',
    summary:
        'The year Errol was seven his mother went into a sanatorium and his aunt Vera — who already had four children — took him as a fifth without discussing it. He remembers a blue enamel jug on the windowsill, the fire at six, and bread every other day. For twelve months Vera walked him to school the long way round so that they never passed the hospital gate, and she never once said why; he never asked, and never thanked her for it. She died in 1991. Late in the conversation Errol returned to the question he had declined earlier and named the illness himself.',
    excerpt: 'She never once said why we went round that way, and neither did I. No. I never told her.',
    transcript: [
        { who: 'A Story', at: '01:48', text: 'You went straight past something there. The year your mother was in the sanatorium. I’d like to come back to that rather than the bread — how old were you?' },
        { who: 'Errol', at: '01:57', text: 'Seven. Eight by the time she came home. Look — I’d rather not go into what she had, if that’s all right with you.' },
        { who: 'A Story', at: '02:06', text: 'Of course. We’ll leave that exactly where it is, and it won’t come up again. Tell me about the house instead — who looked after you that year, and what did an ordinary day with them actually look like?' },
        { who: 'Errol', at: '02:19', text: 'Vera. She had four of her own and she took me as a fifth, no discussion about it. Up at six, the fire, the bread. And she walked me to school the long way round, so we wouldn’t have to go past the hospital gate.' },
        { who: 'A Story', at: '06:31', text: 'Who made you feel safe that year, and how did they do it? And did you ever tell them?' },
        { who: 'Errol', at: '06:44', text: 'Vera. The long way to school — she never once said why we went round that way, and neither did I, not in twelve months of it. No. I never told her. She died in ’91 and I never said a word about it.' },
        { who: 'Errol', at: '07:09', text: '…It was tuberculosis. You may as well put it down properly, now we’re here.' },
    ],
    clip: {
        label: 'In Errol’s voice',
        duration: '0:29',
        note: 'Twenty-nine seconds, and most of what matters is two of them — the gap before “no, I never told her”. Written down that is four words. It is not four words when a seventy-nine-year-old says it about somebody who died in 1991.',
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
 * The one that pays off a detail from the first minute.
 *
 * Joan is asked what she first noticed about her husband, gives a perfectly
 * good answer about his handwriting, and then finishes three words past where
 * the answer ended: "All but one." Everything after that is the interview
 * going after those three words — and the last thing she says only lands
 * because of the first thing she said.
 *
 * That is the argument against a question list, made inside one call. A list
 * would have taken the handwriting, ticked the question, and moved on to the
 * wedding.
 * ────────────────────────────────────────────────────────────────────────── */
const love: Scenario = {
    id: 'love',
    chapter: 'Love & family',
    label: 'All but one',
    watch: 'Three words at the end of the first answer. The last line of the call depends on them.',
    teller: 'Joan',
    callLabel: 'A Story · calling Joan',
    subject: 'One marriage · the letters',
    cover: {
        quote: 'He’d been writing it down where I wouldn’t see. All those years. Because he couldn’t get it out of his mouth.',
        attribution: 'Joan, 84 — about fifty-one years of marriage',
        lead: 'A question about a courtship. She answers it in one sentence, adds three more words, and the whole call turns on them.',
        length: '9 questions · about a minute to watch',
    },
    script: [
        { role: 'ai', depth: 1, text: 'Hello — is that Joan? This is A Story. Your son Paul asked me to give you a ring. There’s nothing to get ready, and five minutes is a perfectly good conversation if that’s all you fancy today.', delay: 500 },
        { role: 'user', text: 'Paul says I’m to talk about his father. I’ll try. I’m not sure where you start with fifty-one years.', delay: 2400 },

        { role: 'ai', depth: 2, source: 'love-noticed', method: 'The detail, not the summary', stay: 'Fifty-one years is not a starting point, so the bank does not ask for one. It asks for the first thing she noticed — a single detail, which anybody can find.', text: 'You don’t start with the fifty-one years. You start with one thing. What did you notice first about him?', delay: 2600 },
        { role: 'user', text: 'His handwriting. I knew his handwriting a year and a half before I properly knew his face — he was posted out to Aden and we wrote. I’ve still got them all in a biscuit tin. All but one.', delay: 3000 },

        {
            role: 'ai', depth: 2,
            method: 'Follow the aside, not the answer',
            stay: '“All but one” means she has counted them, and that somewhere there is a decision she once made about a letter. That is worth more than the whole courtship — and she is the one who put it on the table.',
            text: 'All but one. So you’ve counted them. What happened to the one, Joan?',
            delay: 2700,
        },
        { role: 'user', text: 'I put it on the fire. Nineteen seventy-one. It was the one where he asked me to marry him, and that year I couldn’t have it in the house.', delay: 2900 },

        {
            role: 'ai', depth: 2,
            method: 'Park it, and say you are parking it',
            stay: 'She has just named a year and a fire. Pushing now gets the headline and loses the room. She is told plainly that we are coming back to it, then asked something she can answer easily — which is also how a person catches their breath.',
            text: 'We’ll come back to 1971, and we don’t have to rush at it. First — the tin. Where does it live?',
            delay: 2700,
        },
        { role: 'user', text: 'Top of the wardrobe in the back bedroom. Paul’s old room. I get it down twice a year, about. I don’t read them. I just check they’re still there.', delay: 2900 },

        {
            role: 'ai', depth: 3, source: 'love-never-used-to',
            method: 'The irritation is the portrait',
            stay: 'Nobody describes a husband accurately on being asked to describe a husband. The bank asks what he did that she never got used to, because a person is made of the specific thing that drove you mad for fifty years.',
            text: 'Fifty-one years. What did he do that you never got used to — and did you ever say so?',
            delay: 2800,
        },
        { role: 'user', text: 'He would not use my name. Not once. It was “you” — “you all right?”, “you want a cup?” Fifty-one years of it. I thought it was coldness, and I told him so more than once.', delay: 3000 },

        {
            role: 'ai', depth: 4, source: 'love-hardest-year', sensitiveKind: 'rupture',
            method: 'Come back when you said you would',
            stay: 'The return trip promised four questions ago. It is marked sensitive, so the offer to leave it comes first. Asked at the start this gets a year. Asked now it gets the year and what was in it.',
            text: 'Then let’s go back to 1971, if today’s a day for it. What was the hardest year the two of you had together — and what got you through it?',
            delay: 2900,
        },
        { role: 'user', text: 'We lost Susan in the March. She was eighteen months. And Ray never said her name again after the funeral — not once, not in fifty years. I thought he’d stopped loving her. I thought that about my own husband for a very long time.', delay: 3300 },

        {
            role: 'ai', depth: 5, source: 'love-kept-together',
            method: 'Ask for the unromantic answer',
            stay: 'The bank’s own hint on this one: not the romantic answer, the true one. At the start it gets a wedding photograph. Here it gets 1971.',
            text: 'What actually kept the two of you together? Not the romantic answer — the true one.',
            delay: 2900,
        },
        { role: 'user', text: 'When he died I went through the house, and her name is on the back of every photograph in it. Every single one. In that handwriting. He’d been writing it down where I wouldn’t see. All those years. Because he couldn’t get it out of his mouth.', delay: 3400 },
        { role: 'user', text: 'He couldn’t say mine either. I’d had that wrong for fifty-one years as well.', delay: 2900 },

        { role: 'ai', depth: 5, method: 'Close on what she just worked out', stay: 'She did not know that when the call started. It arrived because the handwriting was on the table from the first minute, and nothing since had changed the subject.', text: 'Then we’ll keep all of it, Joan — the tin on the wardrobe, the one you burned, and the backs of the photographs. Susan has a name in this book now, and so does the reason nobody could say it out loud.', delay: 3000 },
    ],
    title: 'What actually kept you together?',
    dateLine: '1969–2020 · from her thirties',
    badge: 'From Paul',
    about: 'Susan lived eighteen months and was not spoken of again for fifty years. Her name is in the family’s book now, and so is her father’s reason.',
    summary:
        'Joan knew Ray’s handwriting eighteen months before she knew his face — he was posted to Aden and they wrote. She kept every letter in a biscuit tin on top of the wardrobe in the back bedroom, and takes it down about twice a year, not to read them but to check they are still there. One letter is missing: she burned the proposal in 1971, the March their daughter Susan died at eighteen months. Ray never said Susan’s name again after the funeral, and never used Joan’s name either in fifty-one years of marriage — which Joan took for coldness until, going through the house after he died, she found Susan’s name written on the back of every photograph in it.',
    excerpt: 'He’d been writing it down where I wouldn’t see. All those years. Because he couldn’t get it out of his mouth.',
    transcript: [
        { who: 'A Story', at: '00:44', text: 'You don’t start with the fifty-one years. You start with one thing. What did you notice first about him?' },
        { who: 'Joan', at: '00:52', text: 'His handwriting. I knew his handwriting a year and a half before I properly knew his face — he was posted out to Aden and we wrote. I’ve still got them all in a biscuit tin. All but one.' },
        { who: 'A Story', at: '01:09', text: 'All but one. So you’ve counted them. What happened to the one, Joan?' },
        { who: 'Joan', at: '01:16', text: 'I put it on the fire. Nineteen seventy-one. It was the one where he asked me to marry him, and that year I couldn’t have it in the house.' },
        { who: 'A Story', at: '04:31', text: 'Then let’s go back to 1971, if today’s a day for it. What was the hardest year the two of you had together — and what got you through it?' },
        { who: 'Joan', at: '04:44', text: 'We lost Susan in the March. She was eighteen months. And Ray never said her name again after the funeral — not once, not in fifty years. I thought he’d stopped loving her. I thought that about my own husband for a very long time.' },
        { who: 'A Story', at: '06:02', text: 'What actually kept the two of you together? Not the romantic answer — the true one.' },
        { who: 'Joan', at: '06:13', text: 'When he died I went through the house, and her name is on the back of every photograph in it. Every single one. In that handwriting. He’d been writing it down where I wouldn’t see. All those years. Because he couldn’t get it out of his mouth.' },
        { who: 'Joan', at: '06:38', text: 'He couldn’t say mine either. I’d had that wrong for fifty-one years as well.' },
    ],
    clip: {
        label: 'In Joan’s voice',
        duration: '0:47',
        note: 'Forty-seven seconds, and the last eight are the ones her son has played most. She says “I’d had that wrong for fifty-one years as well”, and then laughs — once, not happily — and that laugh is the whole marriage. It does not survive being typed out.',
    },
    linked: ['Ray, her husband', 'Susan, 1969–1971', 'The biscuit tin', 'Aden, 1961'],
    family: [
        { kind: 'edit', name: 'Paul', text: 'was invited and can edit this archive. He added Susan’s two dates, and a photograph of the back of one of them.' },
        { kind: 'add', name: 'Her niece Christine', text: 'sent three of Ray’s letters from Aden through the contribute link — she had been keeping them since 1998.', pending: 'Waiting for Joan' },
    ],
    shared: 'Joan decides who sees this. Right now: Paul, Christine and 6 others.',
    meta: ['Chapter: Love & family', '1961–2020', 'Added today'],
};

export const SCENARIOS: Scenario[] = [faith, childhood, love];
