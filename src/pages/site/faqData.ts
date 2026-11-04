import { BOOK, OTHER_PLANS, PLANS, START } from "../../lib/pricing";
import { CHAPTER_COUNT, QUESTION_COUNT } from "../../lib/product";
import { WHO_HEARS, WHO_OWNS } from "../../lib/hears";

/** Round 3 fix 1: each answer on /questions has its own address, made from
    its question ("What if a question feels too personal?" →
    #what-if-a-question-feels-too-personal). Questions.tsx opens it. */
export const faqAnchor = (q: string) =>
  q
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The storyteller's answer: decline a question, pause, change the subject. */
export const DECLINE_HREF = "/questions#what-if-a-question-feels-too-personal";
/*
 * Group B round 2 (chief log B3.4): the first group is for the relative who
 * was invited and the parent who is being asked. It reuses two existing
 * answers (moved here, not copied, so the FAQ schema lists each question
 * once) and adds two, each from a cited source:
 * - "Do I need an account to add something?": home/EveryVoice.tsx:532.
 * - "Will it ring on another phone or tablet?": Reserve.tsx:807, and nothing
 *   more about iPads or Android (flag F-r1-3).
 * The AI-guided interviewer answer leads the first general group.
 * The title doubles as the topic pill on /questions, so it stays short enough
 * to fit the pill row at 390 px (review fix: the full sentence ran past the
 * scroller and under its end fade).
 */
export const groups = [
  {
    title: "Invited, or being asked",
    items: [
      {
        q: "Who can see our stories?",
        a: "Your archive is private by default. You decide who to invite and what to share. Public-story and contribution links are controlled by the family; contributions are reviewed before publication. See the Privacy policy for details.",
      },
      {
        q: "Can relatives add a different version?",
        a: "Yes. Invite them with your family code or link. They read the memories the family keeps and add their side, with photographs. There is no fee per relative.",
      },
      {
        q: "Do I need an account to add something?",
        a: "No. Each person adds what they remember, under their own name, through one link and with no account needed. Nothing replaces anything else, and nothing appears until the storyteller says yes.",
      },
      {
        q: "Will it ring on another phone or tablet?",
        a: "Today, A Story rings on an iPhone. On other phones, it reminds them to write instead.",
      },
    ],
  },
  {
    title: "Getting started",
    items: [
      {
        q: "What is A Story?",
        a: "A Story helps families build a living archive through conversation. Guided calls become memory cards to read and full transcripts. Photographs and family contributions add context, and you can turn part of the archive into a hardcover book.",
      },
      {
        q: "Who asks the questions?",
        a: `An AI-guided interviewer asks from ${QUESTION_COUNT} questions across ${CHAPTER_COUNT} chapters and follows up on what the storyteller shares. You can explore the scripted sample on How it works.`,
      },
      {
        /* Phone-first plan task 4: A Story starts with the iPhone app, by
           invite (plan :13, :16). The rest of the answer is this file's
           "Does my family member need to install an app?" and "Can
           relatives add a different version?". The old answer sent
           strangers to make an account in the browser. */
        q: "How do I start?",
        a: "A Story starts with the A Story iPhone app, which is in a private beta. Ask for an invite, and we help you set it up. Once your family is in, everyone reads and adds through the family’s code or link, in any browser, with no card.",
      },
      {
        q: "Does my family member need to install an app?",
        a: "To be called, yes. The calls ring in the A Story iPhone app, which is in a private beta. Your parent installs it once on their iPhone, and we help you set it up. After that, the app rings at the hour your family picked and they answer and talk. To read or add to the archive, no app is needed: any browser works, through the family’s link.",
      },
      {
        q: "Can I use A Story on a computer?",
        a: "Yes, once your family is in. At app.astoryapp.com you can write, read the archive, see the family tree and read the book, in any browser. The calls ring in the A Story iPhone app.",
      },
      {
        q: "Can I record my own story?",
        a: "Yes. Start with a guided conversation or write a memory yourself. You choose where to begin and who, if anyone, you invite to read it.",
      },
    ],
  },
  {
    title: "Conversation, archive & family",
    items: [
      {
        q: "What if a question feels too personal?",
        a: "Leave it for another day. The storyteller can decline a question, pause, or change the subject. There is no obligation to tell a memory before they want to.",
      },
      {
        q: "Is the summary the whole record?",
        a: "No. The memory card is a short summary. The full verbatim transcript stays underneath it, and the call audio is kept. Photographs and other relatives’ memories can sit alongside the story.",
      },
    ],
  },
  {
    title: "Pricing, gifts & books",
    items: [
      {
        q: "What does it cost?",
        a: `Individual is ${PLANS[0].price} ${PLANS[0].period}; Family is ${PLANS[1].price} ${PLANS[1].period}. Express is ${PLANS[2].price}, ${PLANS[2].period}. Monthly is ${OTHER_PLANS[0].price}, and Free is free. Individual, Family and Express include a Classic Hardcover; on Free and Monthly you can print at home free or order from ${BOOK.from}. The Pricing page lists call minutes.`,
      },
      {
        q: "Is there a free trial?",
        a: `No. Free never runs out. ${START.detail}`,
      },
      {
        q: "How much is the printed book?",
        a: `Printing the whole book at home is free. Printed editions run from a ${BOOK.from} Softcover to a $149 Heirloom Edition, and a $499 Full-Service Legacy Edition with an editor of ours; the print-ready Digital Edition is $19. ${BOOK.members} ${BOOK.allowance}, with no page limit. ${BOOK.ships}. ${BOOK.opens}`,
      },
      /* Round 3 (B2): the gift buyer's answer, from these lines only: the
         old answer (set up the archive for your relative, choose the hour;
         nothing to redeem), pricing.ts Express ($79, one time, nothing
         renews). The $1 reservation sentence left on 2026-11-03. No date is
         promised. */
      {
        q: "How does giving A Story work?",
        /* Round 3 (B2, Tuan and Harold): "no code" here sat beside "a
           six-letter code" on /for-families. One rule now: nothing to redeem,
           and the relative comes in through the family's code or the link
           that carries it (lib/app.ts:17, index.html:80-81). */
        a: `You ask for an invite to the A Story iPhone app, set up the archive for your relative, free, and choose a good time for the first call. There is nothing to redeem and no gift card: your relative comes in through the family's six-letter code, or the link that carries it. ${PLANS[2].name} is the one-time plan, ${PLANS[2].price}, and nothing renews; the annual and monthly plans renew.`,
      },
    ],
  },
  {
    title: "Privacy & ownership",
    items: [
      /* Round 3 (B2): the privacy summary's own words (lib/hears.ts, from
         components/privacy.tsx:93-98), for the gift buyer. */
      {
        q: "Who hears the recordings?",
        a: `${WHO_HEARS} ${WHO_OWNS} They decide who can see, hear or download anything.`,
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
