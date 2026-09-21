/** The lake example is separate from the clearly labeled Joan/Rosa/Errol demonstrations. Names do not identify people in the synthetic source photograph. */
export const sampleMemory = {
    recordId: 'lake-afternoon-1975',
    title: 'An afternoon at the lake',
    date: 'Summer 1975 · approximate',
    photo: '30',
    chapter: 'Love & family',
    question: 'What do you remember about that afternoon at the lake?',
    summary: 'A family afternoon at the lake, remembered first from the shore.',
    openingWords: 'I remember being terrified.',
    followUp: 'What were you afraid would happen?',
    response: 'He thought he was playing. I thought I had let him go too far.',
    voices: [
        {
            name: 'Eleanor',
            relationship: 'A parent who was there',
            kind: 'Firsthand recollection',
            quote: 'I remember being terrified.',
        },
        {
            name: 'Daniel',
            relationship: 'The child who remembers it',
            kind: 'Firsthand recollection',
            quote: 'I thought it was an adventure.',
        },
        {
            name: 'Maya',
            relationship: 'The next generation',
            kind: 'Known through family stories',
            quote: 'That story got told every year.',
        },
    ],
    source: {
        quotations:
            'Mission multiple-perspectives concept; fictional website labels.',
        followUp:
            'New fictional exchange specified in the resolved website brief.',
        audio: null,
    },
} as const;
export const exampleArchive = [
    {
        id: sampleMemory.recordId,
        title: sampleMemory.title,
        image: '30',
        date: sampleMemory.date,
        chapter: sampleMemory.chapter,
        voices: 3,
    },
    {
        id: 'child-project',
        title: 'The project that took over the table',
        image: '22',
        date: '2020 · illustrative',
        chapter: 'Love & family',
        voices: 1,
    },
    {
        id: 'cooking-together',
        title: 'Learning by doing',
        image: '25',
        date: '2026 · illustrative',
        chapter: 'From the family',
        voices: 1,
    },
    {
        id: 'still-continuing',
        title: 'An ordinary day, kept',
        image: '35',
        date: 'Today · illustrative',
        chapter: 'Anything else',
        voices: 1,
    },
] as const;
