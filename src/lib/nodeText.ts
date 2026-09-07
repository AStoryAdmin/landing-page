import { Children, isValidElement, type ReactNode } from 'react';

/**
 * Flattens a React node tree to its plain text.
 *
 * Used to build FAQPage structured data from the same JSX the page renders,
 * so the answer in the search result is always literally the answer on the
 * page — no second copy of the text to keep in sync.
 */
export const nodeToText = (node: ReactNode): string => {
    const parts: string[] = [];

    const walk = (n: ReactNode) => {
        if (n === null || n === undefined || typeof n === 'boolean') return;
        if (typeof n === 'string' || typeof n === 'number') {
            parts.push(String(n));
            return;
        }
        if (Array.isArray(n)) {
            Children.forEach(n, walk);
            return;
        }
        if (isValidElement<{ children?: ReactNode }>(n)) {
            walk(n.props.children);
        }
    };

    walk(node);

    return parts.join(' ').replace(/\s+/g, ' ').trim();
};
