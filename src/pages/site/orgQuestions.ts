/**
 * What A Story can say to an organization today, and the questions a
 * program lead, a life-enrichment director or a compliance officer asks
 * (round 3, Builder 3, docs/plans/2026-11-03-premium-round-3.md task 3).
 *
 * Every line below is worded from a source already on the site or in the
 * app; the source is named beside each. Nothing here states a price, a
 * device beyond the iPhone, an export format, a pilot, a quote or a
 * HIPAA/BAA/residency position: those are blocked on Daniel (plan,
 * "Claims that need a source"), and the lines that touch them send the
 * reader to the demo instead of claiming.
 *
 * Shared by Care.tsx, Organizations.tsx and Questions.tsx (the group
 * "For organizations", at /questions#organizations). faqData.ts is another
 * builder's file this round, so the group lives here.
 */

/** "What we can say today": six lines, each from the privacy policy's
 *  short version (components/privacy.tsx, PlainSummary) or the FAQ. */
export const CAN_SAY: readonly { lead: string; rest: string }[] = [
  {
    /* faqData.ts "Who asks the questions?" (AI-guided interviewer);
       privacy.tsx:108-110 "Nobody at A Story reads, listens to or looks at
       your memories, unless you ask us to help or someone reports
       something." */
    lead: "An AI-guided interviewer asks.",
    rest: "Nobody at A Story listens unless you ask us to help.",
  },
  {
    /* faqData.ts:30 "Do I need an account to add something?": "Each person
       adds what they remember, under their own name ... nothing appears
       until the storyteller says yes." The same source covers anything
       added on their behalf; the app has no staff-note feature, so none is
       named. */
    lead: "Nothing appears until the storyteller says yes.",
    rest: "Not a relative's addition, not anything added on their behalf.",
  },
  {
    /* privacy.tsx:101 and :105, quoted word for word. */
    lead: "We never sell data. We never train AI on the stories.",
    rest: "",
  },
  {
    /* privacy.tsx:97-98 "The storyteller owns it. Not the person who paid
       for the gift."; :117 "You can delete it all." */
    lead: "The storyteller owns it, and can delete it all.",
    rest: "Not the person who paid, and not the place that set it up.",
  },
  {
    /* privacy.tsx:113-114 "A full export of audio, transcripts and photos,
       in open formats, whenever you ask." */
    lead: "A full export, in open formats, whenever you ask.",
    rest: "Audio, transcripts and photographs.",
  },
  {
    /* Care.tsx "It is an invitation, never a test of what someone
       remembers."; phone-app src/screens/CallVoiceScreen.js:270 "A Story
       reads what's already told or written, and asks to go deeper instead
       of asking again." */
    lead: "A story told twice is fine.",
    rest: "It is an invitation, never a test of what someone remembers.",
  },
];

/** The line under CAN_SAY on both pages: what is not claimed, and where
 *  it is answered. Nothing about HIPAA, a BAA or residency either way
 *  (design-spec §4C, flagged for Daniel). */
export const NOT_CLAIMED =
  "HIPAA, a BAA or where data lives: we make no claim on this page. Bring those to the demo, and Daniel answers them directly.";

/** The group on /questions. Each answer names its source in a comment. */
export const ORG_GROUP = {
  title: "For organizations",
  items: [
    {
      q: "Who at A Story can hear the recordings?",
      /* faqData.ts "Who asks the questions?"; privacy.tsx:108-110. */
      a: "An AI-guided interviewer asks the questions. Nobody at A Story reads, listens to or looks at the memories unless you ask us to help or someone reports something.",
    },
    {
      q: "Who owns what is recorded?",
      /* privacy.tsx:97-98. */
      a: "The storyteller. Not the organization that set it up, and not the person who paid. They decide who can see, hear or download anything, and they can change their mind at any time.",
    },
    {
      q: "Which staff can read an archive?",
      /* Care.tsx "Only the people the resident and family invite can read
         it."; Organizations.tsx DECIDE "Who can listen". */
      a: "Only the people the storyteller and their family invite. Whether an archive stays private, is open to the participants' own families, or is public is agreed with you before anyone is called.",
    },
    {
      q: "How is consent handled?",
      /* privacy.tsx:303-312 (section 6); Organizations.tsx DECIDE
         "Consent". The last sentence claims nothing: it names the
         question. */
      a: "A Story obtains the storyteller's consent before recording begins and before their stories go into an archive or a book. Each person agrees before their first call and can stop at any time. If you set A Story up on someone's behalf, you are responsible for making sure they understand and agree to being recorded. How that works for a resident who cannot decide alone is a question we answer on the demo, for your setting.",
    },
    {
      q: "What if someone tells the same story twice?",
      /* Care.tsx "never a test"; phone-app CallVoiceScreen.js:270. */
      a: "That is fine. It is an invitation, never a test of what someone remembers. A Story reads what has already been told and asks to go deeper instead of asking again.",
    },
    {
      q: "How long is it kept?",
      /* privacy.tsx:414-424 and :433-439 (section 9): "Your archive does
         not expire when you stop paying ... the guided AI conversations
         stop, and everything else keeps working." Put in the positive
         (round-3 copy rule: nothing framed around an ending or expiry). */
      a: "For as long as the account or archive is active. Deleting the account in the app, or asking us, removes it within thirty days. The archive stays for as long as the account does, with or without a paid plan; a plan covers the guided calls, and everything already recorded keeps working.",
    },
    {
      q: "Can we export it?",
      /* privacy.tsx:113-114; faqData.ts "Can I take the archive with me?"
         (a PDF, or an archive of audio and transcripts). The formats
         themselves are blocked on Daniel, so the answer sends that to the
         demo. */
      a: "Yes. A full export of audio, transcripts and photographs, in open formats, whenever you ask; a PDF of the book as well. Which formats, and any metadata your catalogue needs, we go through on the demo.",
    },
    {
      q: "What equipment do we need?",
      /* faqData.ts "Will it ring on another phone or tablet?";
         Organizations.tsx NEED "we help them install the app"; Care.tsx
         "a staff member starts a conversation together with them". */
      a: "Before launch, A Story can only ring an iPhone, so each storyteller needs one, and we help install the app. Where a resident has none, a staff member can start a conversation together with them. Shared devices for a floor or a class: ask on the demo.",
    },
    {
      q: "What about HIPAA, a BAA or where data lives?",
      /* Care.tsx and Organizations.tsx, "Questions about consent, staff
         access or HIPAA? Bring them to the demo." No claim either way.
         Questions.tsx:423 "Daniel answers every email himself." */
      a: "We make no claim about those on the site. Bring them to the demo, or write to contact@astoryapp.com; Daniel answers every message himself.",
    },
    {
      q: "What does a program cost?",
      /* Care.tsx "Community pricing is quoted individually, on the demo.";
         faqData.ts "There is no fee per relative." */
      a: "It is quoted on the demo, for the program you describe: one floor, one class or one team to begin with. Relatives who read and add to an archive pay nothing.",
    },
  ],
} as const;
