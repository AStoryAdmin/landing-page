import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { getSupabase } from '../lib/supabase';
import Seo from './ui/Seo';
import { IconCheck } from './ui/icons';
import { LiveDot } from './ui/primitives';
import { organizationSchema } from '../lib/seo';
import {
    Badge, ErrorMsg, Field, Fineprint, Form, FormCard, FormSub, FormTitle, Layout, Page, Pitch,
    Reassure, Row, Sub, SubmitButton, SuccessPanel, SwitchButton, Switcher, Testimonial, Title,
} from './signup.styles';

type Segment = 'family' | 'organization';

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    role: string;
    orgType: string;
    orgSize: string;
    message: string;
};

const EMAIL_PATTERN = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address.',
};

const ORG_TYPES = [
    'Company / business',
    'Family-owned business',
    'Nonprofit / foundation',
    'Senior living or care community',
    'Hospital or health system',
    'School, university or alumni body',
    'Library, museum or archive',
    'Religious community',
    'Association or union',
    'Something else',
];

const ORG_SIZES = ['Under 25 people', '25–100', '100–500', '500–2,000', '2,000+'];

/** Columns beyond the four the waitlist table has always had. */
const EXTRA_COLUMNS = ['segment', 'organization', 'role', 'org_type', 'org_size', 'message'] as const;

const Signup = () => {
    const [params] = useSearchParams();
    const wantsOrg = params.get('for') === 'organization';
    const [segment, setSegment] = useState<Segment>(wantsOrg ? 'organization' : 'family');
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const {
        register, handleSubmit, reset, formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    /*
     * A link arriving with ?for=organization should land on that tab even when
     * the page is already mounted — handled during render so the family tab is
     * never shown first.
     */
    const [lastWantsOrg, setLastWantsOrg] = useState(wantsOrg);
    if (wantsOrg !== lastWantsOrg) {
        setLastWantsOrg(wantsOrg);
        if (wantsOrg) setSegment('organization');
    }

    const isOrg = segment === 'organization';

    const onSubmit = async (data: FormValues) => {
        setSubmitError(null);

        const supabase = getSupabase();
        if (!supabase) {
            setSubmitError(
                'We could not reach our servers just now. Please email contact@astoryapp.com and we will pick it up from there.'
            );
            return;
        }

        const base = {
            first_name: data.firstName.trim(),
            last_name: data.lastName.trim(),
            email: data.email.trim().toLowerCase(),
            phone: data.phone?.trim() ?? '',
        };

        const extras = {
            segment,
            organization: isOrg ? data.organization?.trim() ?? '' : '',
            role: isOrg ? data.role?.trim() ?? '' : '',
            org_type: isOrg ? data.orgType ?? '' : '',
            org_size: isOrg ? data.orgSize ?? '' : '',
            message: data.message?.trim() ?? '',
        };

        /*
         * The waitlist table predates the organization fields. Try the rich
         * insert first; if the schema has not caught up yet (Postgres 42703 /
         * PostgREST PGRST204), fall back to the four columns that have always
         * existed rather than losing the lead entirely.
         */
        let { error } = await supabase.from('waitlist_signups').insert({ ...base, ...extras });

        const schemaMismatch =
            error &&
            (error.code === '42703' ||
                error.code === 'PGRST204' ||
                EXTRA_COLUMNS.some((c) => error?.message?.includes(c)));

        if (schemaMismatch) {
            const note = isOrg
                ? `[organization] ${extras.organization} · ${extras.role} · ${extras.org_type} · ${extras.org_size} — ${extras.message}`
                : extras.message;
            ({ error } = await supabase
                .from('waitlist_signups')
                .insert({ ...base, phone: [base.phone, note].filter(Boolean).join(' | ').slice(0, 400) }));
        }

        // 23505 is a duplicate email — already on the list, which is a success
        // from the visitor's point of view.
        if (error && error.code !== '23505') {
            console.error('[waitlist] signup failed:', error);
            setSubmitError('Something went wrong saving your spot. Please try again, or email contact@astoryapp.com.');
            return;
        }

        setSubmitted(true);
        reset();
    };

    return (
        <Page>
            <Seo
                title={isOrg ? 'Book a demo — A Story for Organizations' : 'Get early access — A Story'}
                description="Reserve founding access for your family, or book a 30-minute walkthrough for your organization or care community. We reply personally within one business day."
                path="/signup"
                schema={[organizationSchema()]}
            />

            <Layout>
                <Pitch>
                    <Badge><LiveDot /> {isOrg ? 'Partner programs · now onboarding' : 'Founding families · first 100 spots'}</Badge>
                    <Title>
                        {isOrg ? (
                            <>Let&rsquo;s keep your organization&rsquo;s <em>memory.</em></>
                        ) : (
                            <>Don&rsquo;t wait for <em>&ldquo;someday.&rdquo;</em></>
                        )}
                    </Title>
                    <Sub>
                        {isOrg
                            ? 'Thirty minutes, your questions answered, and a scoped plan with a fixed number. No procurement marathon, no obligation.'
                            : 'Someday is how the stories get lost. Tell us where to reach you and Daniel will follow up personally — usually within a day.'}
                    </Sub>

                    <Reassure>
                        {(isOrg
                            ? [
                                  'A real 30-minute walkthrough — the storyteller and admin experience, end to end',
                                  'Security documentation and a DPA available for your review',
                                  'A scoped program plan with a fixed quote, not a discovery marathon',
                                  'First interview inside two weeks, with no IT project',
                              ]
                            : [
                                  'Free during founding access — no card, no trial clock',
                                  'A personal onboarding call so nobody is left to figure it out alone',
                                  'Private and encrypted; never sold, never used to train AI',
                                  'Perfect as a gift — tell us below and we will set it up that way',
                              ]
                        ).map((r) => (
                            <li key={r}><IconCheck size={16} /><span>{r}</span></li>
                        ))}
                    </Reassure>

                    <Testimonial>
                        <blockquote>
                            {isOrg
                                ? '“We had a folder of press clippings and no real idea why our founder started the company. Now we have four hours of him telling it — and a book on every desk.”'
                                : '“I gave it to my mom for her birthday, half expecting a shrug. Instead she talked for two hours — about my dad, about how they met. I’d never heard that story.”'}
                        </blockquote>
                        <figcaption>
                            {isOrg ? 'Operations lead · family-owned manufacturer' : 'Teresa · gift for her mother'}
                        </figcaption>
                    </Testimonial>
                </Pitch>

                <FormCard>
                    <Switcher role="tablist" aria-label="Who is this for?">
                        <SwitchButton
                            type="button"
                            role="tab"
                            aria-selected={!isOrg}
                            $active={!isOrg}
                            onClick={() => setSegment('family')}
                        >
                            For my family
                        </SwitchButton>
                        <SwitchButton
                            type="button"
                            role="tab"
                            aria-selected={isOrg}
                            $active={isOrg}
                            onClick={() => setSegment('organization')}
                        >
                            For my organization
                        </SwitchButton>
                    </Switcher>

                    {submitted ? (
                        <SuccessPanel role="status">
                            <h3>You&rsquo;re in.</h3>
                            <p>
                                {isOrg
                                    ? 'Thank you — we have your details. Expect an email within one business day to find a time for the walkthrough. If it is urgent, reply to it and say so.'
                                    : 'Your founding spot is reserved. Daniel will reach out personally, usually within 24 hours, to get the first conversation set up.'}
                            </p>
                        </SuccessPanel>
                    ) : (
                        <>
                            <FormTitle>
                                {isOrg ? 'Book a 30-minute demo' : 'Claim your founding spot'}
                            </FormTitle>
                            <FormSub>
                                {isOrg
                                    ? 'Tell us a little about the organization and what you are trying to keep. We will come to the call with something specific.'
                                    : 'The most meaningful gift you can give a family — and it takes about a minute to start.'}
                            </FormSub>

                            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Row>
                                    <Field>
                                        <label htmlFor="firstName">First name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            autoComplete="given-name"
                                            placeholder="First name"
                                            aria-invalid={!!errors.firstName}
                                            {...register('firstName', { required: 'Please fill out this field.' })}
                                        />
                                        {errors.firstName && <ErrorMsg>{errors.firstName.message}</ErrorMsg>}
                                    </Field>
                                    <Field>
                                        <label htmlFor="lastName">Last name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            autoComplete="family-name"
                                            placeholder="Last name"
                                            aria-invalid={!!errors.lastName}
                                            {...register('lastName', { required: 'Please fill out this field.' })}
                                        />
                                        {errors.lastName && <ErrorMsg>{errors.lastName.message}</ErrorMsg>}
                                    </Field>
                                </Row>

                                <Field>
                                    <label htmlFor="email">{isOrg ? 'Work email' : 'Email address'}</label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder={isOrg ? 'you@company.com' : 'you@example.com'}
                                        aria-invalid={!!errors.email}
                                        {...register('email', {
                                            required: 'Please fill out this field.',
                                            pattern: EMAIL_PATTERN,
                                        })}
                                    />
                                    {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
                                </Field>

                                {isOrg && (
                                    <>
                                        <Row>
                                            <Field>
                                                <label htmlFor="organization">Organization</label>
                                                <input
                                                    id="organization"
                                                    type="text"
                                                    autoComplete="organization"
                                                    placeholder="Organization name"
                                                    aria-invalid={!!errors.organization}
                                                    {...register('organization', {
                                                        required: 'Please tell us where you work.',
                                                    })}
                                                />
                                                {errors.organization && <ErrorMsg>{errors.organization.message}</ErrorMsg>}
                                            </Field>
                                            <Field>
                                                <label htmlFor="role">Your role</label>
                                                <input
                                                    id="role"
                                                    type="text"
                                                    autoComplete="organization-title"
                                                    placeholder="e.g. Head of People"
                                                    {...register('role')}
                                                />
                                            </Field>
                                        </Row>

                                        <Row>
                                            <Field>
                                                <label htmlFor="orgType">Type of organization</label>
                                                <select id="orgType" defaultValue="" {...register('orgType')}>
                                                    <option value="" disabled>Select one</option>
                                                    {ORG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </Field>
                                            <Field>
                                                <label htmlFor="orgSize">Size</label>
                                                <select id="orgSize" defaultValue="" {...register('orgSize')}>
                                                    <option value="" disabled>Select one</option>
                                                    {ORG_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </Field>
                                        </Row>
                                    </>
                                )}

                                <Field>
                                    <label htmlFor="phone">
                                        Phone number <span>(optional — for a personal call-back)</span>
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="+1 (000) 000-0000"
                                        {...register('phone')}
                                    />
                                </Field>

                                <Field>
                                    <label htmlFor="message">
                                        {isOrg ? 'What are you hoping to keep?' : 'Anything we should know?'}{' '}
                                        <span>(optional)</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        placeholder={
                                            isOrg
                                                ? 'e.g. our founder is retiring in June, and our 50th anniversary is next year.'
                                                : 'e.g. this is a gift for my mother, who turns 80 in March.'
                                        }
                                        {...register('message')}
                                    />
                                </Field>

                                <SubmitButton type="submit" disabled={isSubmitting}>
                                    {isSubmitting
                                        ? 'Sending…'
                                        : isOrg
                                          ? 'Request the demo'
                                          : 'Reserve my spot — it’s free'}
                                </SubmitButton>

                                {submitError && <ErrorMsg role="alert">{submitError}</ErrorMsg>}

                                <Fineprint>
                                    No spam, ever — just a personal reply from a human. By submitting you agree
                                    to our <a href="/terms">terms</a> and <a href="/privacy">privacy policy</a>.
                                </Fineprint>
                            </Form>
                        </>
                    )}
                </FormCard>
            </Layout>
        </Page>
    );
};

export default Signup;
