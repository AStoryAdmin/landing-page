/** Fictional archive from the supplied 2026 source. Never customer evidence. */
export const joanArchive = {
  name: "Joan Merrick",
  keeper: "Kept by her son Paul · 7 people invited · started six weeks ago",
  stats: [
    ["14", "Memories"],
    ["6", "Chapters begun"],
    ["23", "Photographs"],
    ["4", "Voices"],
  ],
  chapters: [
    "Where we come from",
    "Childhood",
    "Love & family",
    "The world we lived through",
    "When everything changed",
    "From the family",
  ],
  activity: [
    {
      kind: "phone",
      name: "Joan",
      role: "The storyteller",
      text: "Answered nine questions across three calls. The longest ran fifty-one minutes; she had told Paul she would manage five.",
      date: "Tuesday, 10am — the hour she chose",
    },
    {
      kind: "document",
      name: "Paul, her son",
      role: "Invited · can edit",
      text: "Added Susan’s two dates, and photographed the back of a picture so the handwriting is in the book rather than described in it.",
      date: "Added four days ago",
    },
    {
      kind: "archive",
      name: "Christine, her niece",
      role: "Contribute link · no account",
      text: "Sent three of Ray’s letters from Aden. She had been keeping them since 1998 and had never found the right moment to mention it.",
      quote:
        "I always thought I was the only one who still had these. I didn’t know who to give them to.",
      date: "Waiting for Joan to approve · nothing appears until she does",
    },
    {
      kind: "family",
      name: "Amy, her granddaughter, 19",
      role: "Invited · can edit",
      text: "Recorded her own two minutes on the chapter called From the family — the same kitchen, thirty years later, from the person who was four feet lower down.",
      quote:
        "Nan says Grandad was quiet. He wasn’t quiet with me. He used to do the voices.",
      date: "Added last Sunday",
    },
    {
      kind: "book",
      name: "The book",
      role: "Optional, always",
      text: "Forty-one pages ready to print whenever they want one — and the archive carries on filling either way. Nothing about making a book means the story is finished.",
      date: "Not ordered. No hurry.",
    },
  ],
  voice: {
    duration: "0:47",
    first: "He’d been writing it down where I wouldn’t see. All those years.",
    second:
      "Because he couldn’t get it out of his mouth. He couldn’t say mine either. I’d had that wrong for fifty-one years as well.",
    note: "Then she laughs. Once, and not happily, and that laugh is the whole marriage. It is why a transcript is not enough on its own: her son has read these words perhaps twice, and played the eight seconds they sit in more times than he would admit to.",
  },
  waveform: [
    18, 34, 52, 41, 63, 78, 55, 44, 30, 22, 14, 9, 7, 6, 9, 16, 28, 47, 66, 81,
    72, 58, 69, 84, 61, 43, 52, 38, 25, 17, 12, 8, 6, 5, 8, 13, 24, 39, 57, 71,
    88, 74, 62, 49, 35, 27, 19, 13, 9, 6,
  ],
  disclosure:
    "An illustration of a real archive’s shape and contents. Joan, Ray, Paul, Christine and Amy are invented, and so is every word quoted above — we would rather show you an honest example than a real family’s worst year.",
} as const;
