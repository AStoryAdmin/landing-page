/**
 * The one piece of lib/auth the header needs, kept apart from it.
 *
 * The navbar ships in the first bundle; lib/auth imports supabase-js, which
 * the home page otherwise never loads. Choosing between "Sign in" and "Your
 * account" only needs to know whether a session is stored, so it reads the
 * key directly and supabase-js stays in the account pages' own chunks.
 */

export const AUTH_STORAGE_KEY = 'astory-web-auth';

/**
 * An expired token still reads true, which costs one redirect from /account
 * to /sign-in and nothing else.
 */
export const hasStoredSession = (): boolean => {
    try {
        return Boolean(window.localStorage.getItem(AUTH_STORAGE_KEY));
    } catch {
        return false;
    }
};
