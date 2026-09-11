import { useId, useState } from 'react';
import { submitLead, looksLikeEmail } from '../../lib/leads';
import { track } from '../../lib/analytics';
import { SITE } from '../../lib/seo';
import {
    Done, ErrorNote, Field, Form, Reassure, Row, Submit,
} from './leadForm.styles';

/**
 * "Gift a story", as a thing somebody can actually do.
 *
 * The button used to be a `mailto:` — the visitor's own email client, opened
 * at the exact moment they had decided to buy, with a blank message to write.
 * That is where the site was losing almost everybody, and no amount of better
 * copy above it would have helped.
 *
 * Deliberately short. Five fields, two of them optional, and only one of them
 * — who it is for — that a fulfiller could not work out on their own. Every
 * extra box here costs conversions at the worst possible moment, so anything
 * that can be asked later by email is asked later by email.
 */

type LeadFormProps = {
    /** Which page and button this came from; stored with the lead. */
    source: string;
    /** Teal panels and the /start hero need the dark palette. */
    onDark?: boolean;
    /** Wording above the button, for pages that need a different promise. */
    reassure?: string;
    submitLabel?: string;
};

const LeadForm = ({
    source,
    onDark = false,
    reassure = 'No payment now, and nothing charged until we have spoken. We answer every message ourselves, usually the same day.',
    submitLabel = 'Start their story',
}: LeadFormProps) => {
    const uid = useId();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [giftFor, setGiftFor] = useState('');
    const [neededBy, setNeededBy] = useState('');
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

        if (!firstName.trim()) return setInvalid('first');
        if (!lastName.trim()) return setInvalid('last');
        if (!looksLikeEmail(email)) return setInvalid('email');
        setInvalid(null);

        setSending(true);
        const result = await submitLead({
            firstName, lastName, email, giftFor, neededBy, source,
        });
        setSending(false);

        if (result.ok) {
            track('lead_submitted', { source });
            setAlreadyKnown(result.alreadyKnown);
            setDone(true);
            return;
        }

        /* The form could not save. Rather than swallow it, hand them the old
           path — losing the lead is worse than an ugly sentence. */
        track('lead_failed', { source, reason: result.reason });
        setError(result.fallbackMailto);
    };

    if (done) {
        return (
            <Done $onDark={onDark} role="status">
                <h3>{alreadyKnown ? 'You’re already on the list.' : 'That’s the hard part done.'}</h3>
                <p>
                    {alreadyKnown
                        ? 'We had your details already, so nothing is lost — and we have noted that you came back.'
                        : `We have your details. Nothing has been charged, and nothing happens to ${giftFor.trim() || 'them'} until you say so.`}
                </p>
                <ol>
                    <li><strong>We write back</strong> — usually the same day, from a person, not a system.</li>
                    <li><strong>We set the archive up</strong> in their name, and send you the one link.</li>
                    <li><strong>You choose the day.</strong> Tell us when, and we hold the first call until then.</li>
                </ol>
            </Done>
        );
    }

    return (
        <Form onSubmit={onSubmit} $onDark={onDark} noValidate>
            <Row>
                <Field $onDark={onDark} htmlFor={`${uid}-first`} data-invalid={invalid === 'first'}>
                    <span>First name</span>
                    <input
                        id={`${uid}-first`} name="given-name" autoComplete="given-name"
                        value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        aria-invalid={invalid === 'first'} required
                    />
                </Field>
                <Field $onDark={onDark} htmlFor={`${uid}-last`} data-invalid={invalid === 'last'}>
                    <span>Last name</span>
                    <input
                        id={`${uid}-last`} name="family-name" autoComplete="family-name"
                        value={lastName} onChange={(e) => setLastName(e.target.value)}
                        aria-invalid={invalid === 'last'} required
                    />
                </Field>
            </Row>

            <Field $onDark={onDark} htmlFor={`${uid}-email`} data-invalid={invalid === 'email'}>
                <span>Your email</span>
                <input
                    id={`${uid}-email`} type="email" name="email" autoComplete="email" inputMode="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={invalid === 'email'}
                    aria-describedby={invalid === 'email' ? `${uid}-email-err` : undefined}
                    required
                />
                {invalid === 'email' && (
                    <Reassure $onDark={onDark} id={`${uid}-email-err`}>
                        That address does not look right &mdash; have another look at it.
                    </Reassure>
                )}
            </Field>

            <Field $onDark={onDark} htmlFor={`${uid}-for`}>
                <span>Who is it for? <span className="opt">&mdash; optional</span></span>
                <input
                    id={`${uid}-for`} value={giftFor} onChange={(e) => setGiftFor(e.target.value)}
                    placeholder="My mum, Ruth. She’s 84 and swears she has nothing to tell."
                />
            </Field>

            <Field $onDark={onDark} htmlFor={`${uid}-by`}>
                <span>Any date it needs to be ready by? <span className="opt">&mdash; optional</span></span>
                <input
                    id={`${uid}-by`} value={neededBy} onChange={(e) => setNeededBy(e.target.value)}
                    placeholder="Before Christmas · her birthday, the 14th · no rush"
                />
            </Field>

            {error && (
                <ErrorNote $onDark={onDark} role="alert">
                    Something went wrong at our end &mdash; and we would rather not lose you to it.{' '}
                    <a href={error}>Send it to us by email instead</a>, or write to {SITE.email}.
                </ErrorNote>
            )}

            <Submit type="submit" $onDark={onDark} disabled={sending}>
                {sending ? 'Sending…' : submitLabel}
            </Submit>

            <Reassure $onDark={onDark}>{reassure}</Reassure>
        </Form>
    );
};

export default LeadForm;
