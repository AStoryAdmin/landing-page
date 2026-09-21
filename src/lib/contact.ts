import { SITE } from './seo';

/** Intent-specific contact links, also used when the waitlist service is unavailable. */

const mailto = (subject: string, body?: string) =>
    `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` +
    (body ? `&body=${encodeURIComponent(body)}` : '');

export const CONTACT = {
    waitlist: mailto('Joining the A Story waitlist'),
    demo: mailto('Requesting an A Story demonstration'),
    /** The primary action: someone wants to give A Story as a gift. */
    gift: mailto(
        'I want to gift A Story',
        "Hi — I'd like to give A Story as a gift.\n\nWho it's for:\nWhen I need it by:\nAnything else:\n",
    ),
    /** A gift for a specific occasion, from the occasions row. */
    giftFor: (occasion: string) =>
        mailto(
            `Gifting A Story — ${occasion}`,
            `Hi — I'd like to give A Story for ${occasion}.\n\nWho it's for:\n`,
        ),
    /** Organizations: founder interviews, retiring staff, anniversaries. */
    organization: mailto(
        'A Story for our organization',
        'Hi — we would like to talk about A Story for our organization.\n\nOrganization:\nMy role:\nWhat we want to keep:\n',
    ),
    /** Care communities: senior living, memory care, hospice. */
    community: mailto(
        'A Story for our community',
        'Hi — we would like a walkthrough of A Story for our community.\n\nCommunity:\nMy role:\nNumber of residents:\n',
    ),
    /**
     * Someone recording their own life rather than giving it to somebody else.
     * This is who arrives from App Store search, and until now the site had
     * nowhere to send them — every other entry here assumes a gift.
     */
    self: mailto(
        'A Story for my own life',
        "Hi — I'd like to use A Story to record my own life.\n\nWhere I'd want to start:\nAnything else:\n",
    ),
    /** Anything else. */
    general: mailto('Hello from astoryapp.com'),
} as const;
