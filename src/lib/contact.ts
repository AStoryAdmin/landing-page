import { SITE } from './seo';

/**
 * Where the calls to action go.
 *
 * The waitlist form is gone for now, so every conversion path is a real
 * conversation with a person. Each entry pre-fills a subject line, which means
 * an incoming message already says which page and which intent it came from —
 * more signal than a form field would have given us.
 *
 * When a checkout or booking flow exists, change these five constants and every
 * button on the site follows.
 */

const mailto = (subject: string, body?: string) =>
    `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` +
    (body ? `&body=${encodeURIComponent(body)}` : '');

export const CONTACT = {
    /** The primary action: someone wants to give A Story as a gift. */
    gift: mailto(
        'I want to gift A Story',
        "Hi — I'd like to give A Story as a gift.\n\nWho it's for:\nWhen I need it by:\nAnything else:\n"
    ),
    /** A gift for a specific occasion, from the occasions row. */
    giftFor: (occasion: string) =>
        mailto(`Gifting A Story — ${occasion}`, `Hi — I'd like to give A Story for ${occasion}.\n\nWho it's for:\n`),
    /** Organizations: founder interviews, retiring staff, anniversaries. */
    organization: mailto(
        'A Story for our organization',
        'Hi — we would like to talk about A Story for our organization.\n\nOrganization:\nMy role:\nWhat we want to keep:\n'
    ),
    /** Care communities: senior living, memory care, hospice. */
    community: mailto(
        'A Story for our community',
        'Hi — we would like a walkthrough of A Story for our community.\n\nCommunity:\nMy role:\nNumber of residents:\n'
    ),
    /**
     * Someone recording their own life rather than giving it to somebody else.
     * This is who arrives from App Store search, and until now the site had
     * nowhere to send them — every other entry here assumes a gift.
     */
    self: mailto(
        'A Story for my own life',
        "Hi — I'd like to use A Story to record my own life.\n\nWhere I'd want to start:\nAnything else:\n"
    ),
    /** Anything else. */
    general: mailto('Hello from astoryapp.com'),
} as const;
