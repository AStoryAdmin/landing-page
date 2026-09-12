import { useId, useState } from 'react';
import { submitLead, looksLikePhone } from '../../lib/leads';
import { track } from '../../lib/analytics';
import { SITE } from '../../lib/seo';
import {
    Done, ErrorNote, Field, Form, Reassure, Submit,
} from './leadForm.styles';

/**
 * Two boxes: a name and a phone number.
 *
 * It asked for five things before this — first name, last name, email, who it
 * was for, and a date. Every one of those is a place somebody stops, and the
 * site is not selling yet: nothing is being fulfilled from this form, so
 * nothing on it needs to be complete. It needs to be answerable in ten
 * seconds by someone holding a phone.
 *
 * A phone number rather than an email is the right trade for this product
 * specifically. The thing we are asking them to believe is that A Story rings
 * a person and has a conversation with them — so the first thing we do should
 * be to ring them and have one. An email reply is a worse demonstration of
 * the product than a call is.
 *
 * Email is kept as an optional third box rather than dropped, because some
 * people would simply rather be written to, and refusing them a way to say so
 * costs more than one optional field does.
 */

type Intent = 'start' | 'demo';

type LeadFormProps = {
    /** Which page and button this came from; stored with the lead. */
    source: string;
    /** Teal panels and the /start hero need the dark palette. */
    onDark?: boolean;
    /** Booking a demo asks for the same details and promises something else. */
    intent?: Intent;
    /** Overrides, for pages that need a different promise. */
    reassure?: string;
    submitLabel?: string;
};

const COPY: Record<Intent, { submit: string; reassure: string; heading: string; body: string }> = {
    start: {
        submit: 'Start their story',
        reassure:
            'No payment, and nothing charged until we have spoken. We call once — if it is not for you, say so and that is the end of it.',
        heading: 'That’s the hard part done.',
        body: 'We have your number. Nothing has been charged and nothing happens to anybody until you say so.',
    },
    demo: {
        submit: 'Book a demo',
        reassure:
            'Twenty minutes, whenever suits you. No payment, no obligation, and no slide deck — we just show you the thing working.',
        heading: 'Booked — near enough.',
        body: 'We have your number and we will call to agree a time that actually suits you. Twenty minutes, and you will have seen the whole thing.',
    },
};

const LeadForm = ({ source, onDark = false, intent = 'start', reassure, submitLabel }: LeadFormProps) => {
    const uid = useId();
    const copy = COPY[intent];

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState(false);
    const [alreadyKnown, setAlreadyKnown] = useState(false);
    const [error, setError] = useState<string | null>(null);
    /* Which field to outline, rather than a list of complaints above the form. */
    const [invalid, setInvalid] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sending) return;
        setError(null);

        if (!name.trim()) return setInvalid('name');
        if (!looksLikePhone(phone)) return setInvalid('phone');
        setInvalid(null);

        /*
         * The table wants a first and last name separately. Rather than make
         * somebody fill two boxes for it, split on the last space — and send
         * the name they actually typed along as the note, so nothing a
         * heuristic gets wrong is lost.
         */
        const trimmed = name.trim().replace(/\s+/g, ' ');
        const cut = trimmed.lastIndexOf(' ');
        const firstName = cut === -1 ? trimmed : trimmed.slice(0, cut);
        const lastName = cut === -1 ? '' : trimmed.slice(cut + 1);

        setSending(true);
        const result = await submitLead({
            firstName,
            lastName,
            phone,
            email,
            note: `Name as given: ${trimmed}${intent === 'demo' ? ' · wants a demo' : ''}`,
            source: intent === 'demo' ? `${source}:demo` : source,
        });
        setSending(false);

        if (result.ok) {
            track('lead_submitted', { source, intent });
            setAlreadyKnown(result.alreadyKnown);
            setDone(true);
            return;
        }

        /* The form could not save. Rather than swallow it, hand them the old
           path — losing the lead is worse than an ugly sentence. */
        track('lead_failed', { source, intent, reason: result.reason });
        setError(result.fallbackMailto);
    };

    if (done) {
        return (
            <Done $onDark={onDark} role="status">
                <h3>{alreadyKnown ? 'You’re already on the list.' : copy.heading}</h3>
                <p>
                    {alreadyKnown
                        ? 'We had your number already, so nothing is lost — and we have noted that you came back.'
                        : copy.body}
                </p>
                <ol>
                    <li><strong>We call you</strong> — a person, not a system, usually within a day.</li>
                    <li><strong>We show you how it works</strong> and answer whatever you want to ask.</li>
                    <li><strong>You decide then.</strong> Nothing is set up, and nobody is called, until you say so.</li>
                </ol>
            </Done>
        );
    }

    return (
        <Form onSubmit={onSubmit} $onDark={onDark} noValidate>
            <Field $onDark={onDark} htmlFor={`${uid}-name`} data-invalid={invalid === 'name'}>
                <span>Your name</span>
                <input
                    id={`${uid}-name`} name="name" autoComplete="name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    aria-invalid={invalid === 'name'} required
                />
            </Field>

            <Field $onDark={onDark} htmlFor={`${uid}-phone`} data-invalid={invalid === 'phone'}>
                <span>Phone number</span>
                <input
                    id={`${uid}-phone`} type="tel" name="tel" autoComplete="tel" inputMode="tel"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={invalid === 'phone'}
                    aria-describedby={invalid === 'phone' ? `${uid}-phone-err` : undefined}
                    required
                />
                {invalid === 'phone' && (
                    <Reassure $onDark={onDark} id={`${uid}-phone-err`}>
                        That does not look like a number we could reach you on &mdash; have another look.
                    </Reassure>
                )}
            </Field>

            <Field $onDark={onDark} htmlFor={`${uid}-email`}>
                <span>Email <span className="opt">&mdash; optional, if you would rather we wrote</span></span>
                <input
                    id={`${uid}-email`} type="email" name="email" autoComplete="email" inputMode="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </Field>

            {error && (
                <ErrorNote $onDark={onDark} role="alert">
                    Something went wrong at our end &mdash; and we would rather not lose you to it.{' '}
                    <a href={error}>Send it to us by email instead</a>, or write to {SITE.email}.
                </ErrorNote>
            )}

            <Submit type="submit" $onDark={onDark} disabled={sending}>
                {sending ? 'Sending…' : submitLabel ?? copy.submit}
            </Submit>

            <Reassure $onDark={onDark}>{reassure ?? copy.reassure}</Reassure>
        </Form>
    );
};

export default LeadForm;
