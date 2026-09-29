import { useEffect, useState } from 'react';
import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';
import { AUTH_STORAGE_KEY, hasStoredSession } from './authSession';

/**
 * Accounts on the website.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ONE ACCOUNT, TWO FRONT DOORS. This talks to the same Supabase project as
 * the app and makes the same calls as the app's src/data/auth.js — signUp
 * with first/last name in user_metadata, a 6-digit emailed code to confirm,
 * signInWithPassword, and a 6-digit code to reset. An account made here IS
 * the app account: same email, same password, same profile row (created by
 * the app's handle_new_user() trigger). Nothing here may drift from that
 * file; when the app changes how it signs people in, this changes too.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Its own client rather than lib/supabase's, on purpose. That one is anon
 * with no stored session, and /contribute and /p/:slug depend on it staying
 * that way — their RPCs are written for an anonymous visitor, and a family
 * member contributing a photo should not start doing so as whoever last
 * signed in on this browser. Different storageKey, so the two never share a
 * token and supabase-js does not warn about two clients on one key.
 *
 * The emailed codes need Supabase's "Confirm signup" and "Reset password"
 * templates to include {{ .Token }}. The app already requires that, so if
 * sign-up works in the app it works here.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isAuthConfigured = Boolean(url && key);

/** The app's VerifyCodeStage CODE_LEN. */
export const CODE_LEN = 6;

/** The app's minimum — see friendlyAuthError there. */
export const MIN_PASSWORD = 6;

let client: SupabaseClient | null = null;

const getAuthClient = (): SupabaseClient | null => {
    if (!isAuthConfigured) return null;
    client ??= createClient(url!, key!, {
        auth: {
            storageKey: AUTH_STORAGE_KEY,
            persistSession: true,
            autoRefreshToken: true,
            /* Every step is a code typed into the page; nothing arrives by link. */
            detectSessionInUrl: false,
        },
    });
    return client;
};

export type AuthResult = { ok: true } | { ok: false; error: string };

const UNCONFIGURED: AuthResult = {
    ok: false,
    error: 'Accounts are not switched on in this version of the site. Write to us and we will set one up by hand.',
};

const normEmail = (email: string) => email.toLowerCase().trim();

/**
 * The app's own copy, so a person sees the same sentence on either side.
 * Network failures first — supabase-js hands them back as a normal error, so
 * without this the first thing anybody saw was "Failed to fetch".
 */
function friendly(message: string | undefined): string {
    const msg = (message || '').toLowerCase();
    if (
        msg.includes('failed to fetch') ||
        msg.includes('networkerror') ||
        msg.includes('load failed') ||
        msg.includes('fetch failed') ||
        msg.includes('timeout') ||
        msg.includes('timed out')
    ) {
        return 'We couldn’t reach A Story. Check your connection and try again — nothing was lost.';
    }
    if (msg.includes('invalid login credentials')) return 'Incorrect email or password.';
    if (msg.includes('email not confirmed')) return 'Please confirm your email before signing in.';
    if (msg.includes('user already registered')) return 'An account with this email already exists.';
    if (msg.includes('rate limit') || msg.includes('security purposes'))
        return 'That was a lot of tries in a row. Wait a minute, then try again.';
    /* Supabase's answer to any wrong code, typo or not. Checked before
       "expired" so a mistyped digit isn't reported as a stale email. */
    if (msg.includes('expired or is invalid'))
        return 'That code isn’t right, or it has run out. Check it, or send another.';
    if (msg.includes('expired')) return 'That code has expired. Please request a new one.';
    if (msg.includes('otp') || msg.includes('token')) return 'That code isn’t right. Please check it and try again.';
    if (msg.includes('password')) return `Password must be at least ${MIN_PASSWORD} characters.`;
    return message || 'Something went wrong. Please try again.';
}

const fail = (message?: string): AuthResult => ({ ok: false, error: friendly(message) });

/**
 * The account stores a first and a last name; the form asks for one "Name".
 * Everything up to the last space is the first name — the app's splitName.
 */
export function splitName(full: string) {
    const parts = full.trim().split(/\s+/).filter(Boolean);
    if (parts.length <= 1) return { firstName: parts[0] || '', lastName: '' };
    return { firstName: parts.slice(0, -1).join(' '), lastName: parts[parts.length - 1] };
}

/**
 * Creates the account. `needsCode` means the project requires email
 * confirmation and a code is on its way; otherwise they are signed in now.
 */
export async function createAccount(input: {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
}): Promise<AuthResult & { needsCode?: boolean }> {
    const supabase = getAuthClient();
    if (!supabase) return UNCONFIGURED;

    const { firstName, lastName } = splitName(input.name);
    const { data, error } = await supabase.auth.signUp({
        email: normEmail(input.email),
        password: input.password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                /* Resolved to a referrer server-side by handle_new_user(); a blank
                   or unknown code is ignored there, not an error. */
                referral_code: (input.referralCode || '').trim().toUpperCase(),
                /* Not read by the app. Recorded so web sign-ups can be told
                   apart from app ones later without guessing. */
                signed_up_on: 'web',
            },
        },
    });

    if (error) return fail(error.message);
    if (!data.user) return fail('Could not create account. Please try again.');

    /* With email confirmation on, Supabase answers a sign-up for an address
       that already has a confirmed account with a user that has no
       identities, rather than an error. Left alone, the page would say "we
       sent you a code" and no code would ever come. The app tells people
       plainly that the account exists, so this does too. */
    if (data.user.identities && data.user.identities.length === 0) {
        return fail('User already registered');
    }

    return { ok: true, needsCode: !data.session };
}

export async function verifySignupCode(email: string, code: string): Promise<AuthResult> {
    const supabase = getAuthClient();
    if (!supabase) return UNCONFIGURED;
    const { data, error } = await supabase.auth.verifyOtp({
        email: normEmail(email),
        token: code.trim(),
        type: 'signup',
    });
    if (error) return fail(error.message);
    if (!data.user) return fail('That code didn’t work. Please try again.');
    return { ok: true };
}

export async function resendSignupCode(email: string): Promise<AuthResult> {
    const supabase = getAuthClient();
    if (!supabase) return UNCONFIGURED;
    const { error } = await supabase.auth.resend({ type: 'signup', email: normEmail(email) });
    return error ? fail(error.message) : { ok: true };
}

export async function signIn(email: string, password: string): Promise<AuthResult & { unconfirmed?: boolean }> {
    const supabase = getAuthClient();
    if (!supabase) return UNCONFIGURED;
    const { error } = await supabase.auth.signInWithPassword({ email: normEmail(email), password });
    if (error) {
        /* Made an account, never typed the code. Send a fresh one and let the
           page ask for it, rather than a dead end that says "confirm first". */
        const unconfirmed = (error.message || '').toLowerCase().includes('email not confirmed');
        return { ok: false, error: friendly(error.message), unconfirmed };
    }
    return { ok: true };
}

/**
 * Always reports success for a well-formed address, as the app does, so the
 * page cannot be used to find out which emails have accounts.
 */
export async function requestPasswordReset(email: string): Promise<AuthResult> {
    const supabase = getAuthClient();
    if (!supabase) return UNCONFIGURED;
    const { error } = await supabase.auth.resetPasswordForEmail(normEmail(email));
    return error ? fail(error.message) : { ok: true };
}

/**
 * The code and the new password together. Unlike the app, which signs out
 * afterwards and asks for the new password straight away, this leaves them
 * signed in: on the web they have just proved they own the inbox, and making
 * them type the password they chose ten seconds ago buys nothing.
 */
export async function resetPassword(email: string, code: string, newPassword: string): Promise<AuthResult> {
    const supabase = getAuthClient();
    if (!supabase) return UNCONFIGURED;
    const verified = await supabase.auth.verifyOtp({ email: normEmail(email), token: code.trim(), type: 'recovery' });
    if (verified.error) return fail(verified.error.message);
    const updated = await supabase.auth.updateUser({ password: newPassword });
    return updated.error ? fail(updated.error.message) : { ok: true };
}

/**
 * This browser only. supabase-js defaults to scope "global", which revokes
 * every session the account has — signing out of the website would sign the
 * storyteller's family out of the app on their phones too.
 */
export async function signOut(): Promise<void> {
    const supabase = getAuthClient();
    if (!supabase) return;
    await supabase.auth.signOut({ scope: 'local' });
}

/**
 * Claims an offer for free, before its payment link is live — see
 * lib/founding.ts. `field` is the offer's user_metadata key.
 *
 * Written to the account itself rather than a table: it cannot be doubled,
 * it survives any device, and onAuthStateChange hands the new value straight
 * back to useAccount. Claiming twice keeps the first date — that date is the
 * person's place in the queue.
 */
export async function markOffer(
    field: 'reserved_at' | 'founding_requested_at',
    existing: string | null,
): Promise<AuthResult> {
    const supabase = getAuthClient();
    if (!supabase) return UNCONFIGURED;
    if (existing) return { ok: true };
    const { error } = await supabase.auth.updateUser({ data: { [field]: new Date().toISOString() } });
    return error ? fail(error.message) : { ok: true };
}

export type Account = {
    /** auth.users id — what a Stripe client_reference_id names. */
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    /** When they reserved for free, before payment was live — lib/founding.ts. */
    reservedAt: string | null;
    /** When they asked for a founding place, likewise. */
    foundingRequestedAt: string | null;
};

function toAccount(session: Session): Account {
    const meta = (session.user.user_metadata || {}) as Record<string, string | undefined>;
    return {
        id: session.user.id,
        email: (session.user.email || '').toLowerCase(),
        firstName: meta.first_name || '',
        lastName: meta.last_name || '',
        reservedAt: meta.reserved_at || null,
        foundingRequestedAt: meta.founding_requested_at || null,
    };
}

/**
 * The signed-in account, or null, or undefined while it is still being read
 * from storage — so a page can wait rather than flash "signed out" first.
 */
export function useAccount(): Account | null | undefined {
    const [account, setAccount] = useState<Account | null | undefined>(() =>
        isAuthConfigured && hasStoredSession() ? undefined : null
    );

    useEffect(() => {
        const supabase = getAuthClient();
        if (!supabase) return;
        let live = true;
        supabase.auth.getSession().then(({ data }) => {
            if (live) setAccount(data.session ? toAccount(data.session) : null);
        });
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            if (live) setAccount(session ? toAccount(session) : null);
        });
        return () => {
            live = false;
            sub.subscription.unsubscribe();
        };
    }, []);

    return account;
}

/**
 * The signed-in person's own referral code — profiles.referral_code, which
 * the app's handle_new_user trigger makes for every account. Anyone who signs
 * up with it gets profiles.referred_by pointing back. Null until it loads,
 * and for nobody signed in.
 */
export function useReferralCode(userId: string | null | undefined): string | null {
    const [code, setCode] = useState<string | null>(null);
    useEffect(() => {
        const supabase = getAuthClient();
        if (!supabase || !userId) return;
        let live = true;
        supabase
            .from('profiles')
            .select('referral_code')
            .eq('id', userId)
            .maybeSingle()
            .then(({ data }) => {
                if (live) setCode((data?.referral_code as string | undefined) ?? null);
            });
        return () => {
            live = false;
        };
    }, [userId]);
    return userId ? code : null;
}

/**
 * Only same-site paths survive as a place to go after signing in; anything
 * else — a full URL, "//evil.example" — falls back to the account page.
 */
export const safeNext = (next: string | null): string =>
    next && next.startsWith('/') && !next.startsWith('//') ? next : '/account';
