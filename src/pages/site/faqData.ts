import { PLANS, PRICE, TRIAL } from "../../lib/pricing";
import { CHAPTER_COUNT, QUESTION_COUNT } from "../../lib/product";
export const groups = [
  {
    title: "Getting started",
    items: [
      {
        q: "What is A Story?",
        a: "A Story helps families build a living archive through conversation. Guided calls become readable memory cards, full transcripts, and voice highlights. Photographs and family contributions add context, and you can turn part of the archive into a hardcover book.",
      },
      {
        q: "Can I sign up today?",
        a: "We are opening to a few families at a time. Join the waitlist and we will call you to talk about getting started. No payment is collected on the waitlist.",
      },
      {
        q: "Does my family member need to install an app?",
        a: "Yes. You and your storyteller install A Story once, and you can help with the setup. After that, their phone rings at the chosen time and they answer the call. They do not need to operate the archive to tell their story.",
      },
      {
        q: "Can I record my own story?",
        a: "Yes. Start with a guided conversation or write a memory yourself. You choose where to begin and who, if anyone, you invite to read it.",
      },
    ],
  },
  {
    title: "Conversation & archive",
    items: [
      {
        q: "Who asks the questions?",
        a: `An AI-guided interviewer asks from ${QUESTION_COUNT} questions across ${CHAPTER_COUNT} chapters and follows up on what the storyteller shares. You can explore the scripted sample on How it works.`,
      },
      {
        q: "What if a question feels too personal?",
        a: "Leave it for another day. The storyteller can decline a question, pause, or change the subject. There is no obligation to tell a memory before they want to.",
      },
      {
        q: "Is the summary the whole record?",
        a: "No. The memory card is a short summary. The full verbatim transcript stays underneath it, and voice highlights are kept as audio. Photographs and other relatives’ memories can sit alongside the story.",
      },
    ],
  },
  {
    title: "Family participation",
    items: [
      {
        q: "Can relatives add a different version?",
        a: "Yes. Invited family members can contribute memories, add photographs, and correct details. Different perspectives help build the archive; participation does not carry a per-relative fee.",
      },
    ],
  },
  {
    title: "Pricing, gifts & books",
    items: [
      {
        q: "What does it cost?",
        a: `Individual is ${PLANS[0].price} ${PLANS[0].period}; Family is ${PLANS[1].price} ${PLANS[1].period}. Express is ${PLANS[2].price}, ${PLANS[2].period}. A Free plan and Monthly option are also available in the product. The Pricing page lists call allowances and book bundles.`,
      },
      {
        q: "Is there a free trial?",
        a: `${TRIAL.headline}. ${TRIAL.detail} The website currently accepts waitlist requests; it cannot start a trial.`,
      },
      {
        q: "How much is the printed book?",
        a: `${PRICE.book} for ${PRICE.bookPages}; ${PRICE.bookOverage}. Express includes the first 40 color pages. Individual and Family offer book bundles. You choose when to print.`,
      },
      {
        q: "How does giving A Story work?",
        a: "You help set up an archive for your relative and choose a good time for the first call. There is no gift card, code, or redemption process. Express is the one-time plan; the annual and monthly plans renew. Join the waitlist to discuss the option that fits your family.",
      },
    ],
  },
  {
    title: "Privacy & ownership",
    items: [
      {
        q: "Who can see our stories?",
        a: "Your archive is private by default. You decide who to invite and what to share. Public-story and contribution links are controlled by the family; contributions are reviewed before publication. See the Privacy policy for details.",
      },
      {
        q: "What happens if I cancel?",
        a: "Your account returns to Free. Your recordings, transcripts, and photographs remain yours, your archive stays open, and invited family members retain access. Paid guided calls stop; you can keep writing and export your archive.",
      },
      {
        q: "Can I take the archive with me?",
        a: "Yes. You can request a PDF or an archive of your audio and transcripts. Your recordings remain yours to keep.",
      },
    ],
  },
];
