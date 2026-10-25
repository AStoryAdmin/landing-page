import { BOOK, OTHER_PLANS, PLANS, START } from "../../lib/pricing";
import { CHAPTER_COUNT, QUESTION_COUNT } from "../../lib/product";
export const groups = [
  {
    title: "Getting started",
    items: [
      {
        q: "What is A Story?",
        a: "A Story helps families build a living archive through conversation. Guided calls become memory cards to read and full transcripts. Photographs and family contributions add context, and you can turn part of the archive into a hardcover book.",
      },
      {
        q: "Can I sign up today?",
        a: "Yes. Start free at app.astoryapp.com: make an account in your browser, with no card. The plans where A Story makes the calls open to a few families at a time. Reserve one for $1 and we email you when the calls open, in the order families reserved. Reserve by 2 November to hold 15% off your first year. The dollar is refundable any time before the calls open.",
      },
      {
        q: "Does my family member need to install an app?",
        a: "To be called, yes. The calls ring in the A Story iPhone app, which is in a private beta. Your parent installs it once on their iPhone, and we help you set it up. After that, the app rings at the hour you picked and they answer and talk. To read or add to the archive, no app is needed: any browser works, at app.astoryapp.com.",
      },
      {
        q: "Can I use A Story on a computer?",
        a: "Yes. At app.astoryapp.com you can write, read the archive, see the family tree and read the book, in any browser. The calls ring in the A Story iPhone app.",
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
        q: "Who asks the questions?",
        a: `An AI-guided interviewer asks from ${QUESTION_COUNT} questions across ${CHAPTER_COUNT} chapters and follows up on what the storyteller shares. You can explore the scripted sample on How it works.`,
      },
      {
        q: "What if a question feels too personal?",
        a: "Leave it for another day. The storyteller can decline a question, pause, or change the subject. There is no obligation to tell a memory before they want to.",
      },
      {
        q: "Is the summary the whole record?",
        a: "No. The memory card is a short summary. The full verbatim transcript stays underneath it, and the call audio is kept. Photographs and other relatives’ memories can sit alongside the story.",
      },
      {
        q: "Can relatives add a different version?",
        a: "Yes. Invite them with your family code or link. They read the memories the family keeps and add their side, with photographs. There is no fee per relative.",
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
        a: `Printing the whole book at home is free. Printed editions run from a ${BOOK.from} Softcover to a $149 Heirloom Edition, and a $499 Full-Service Edition with an editor of ours; the print-ready Digital Edition is $19. ${BOOK.members} ${BOOK.allowance}, with no page limit. ${BOOK.ships}. ${BOOK.opens}`,
      },
      {
        q: "How does giving A Story work?",
        a: "You help set up an archive for your relative and choose a good time for the first call. There is no gift card, code, or redemption process. Express is the one-time plan; the annual and monthly plans renew. Reserve for $1 to hold your place.",
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
      {
        q: "Who looks after this if I can’t?",
        a: "You can name a trusted person in Account. They receive what you have written, and the letters you have left, if you are no longer here.",
      },
      {
        q: "Can I leave a letter for later?",
        a: "Yes. Write a letter to one person now, give it a date, and it is delivered then.",
      },
    ],
  },
];
