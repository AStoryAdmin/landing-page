import { useEffect, useState } from 'react';

/**
 * Highlights the section currently under the reader.
 *
 * Tracks the topmost heading that has scrolled past the header, rather than
 * whatever happens to be intersecting — on a page of short clauses several are
 * visible at once, and "topmost" is the one people mean.
 */
export const useActiveSection = (ids: string[]) => {
    const [active, setActive] = useState(ids[0] ?? '');
    const key = ids.join(',');

    useEffect(() => {
        const onScroll = () => {
            const offset = (parseInt(
                getComputedStyle(document.documentElement).getPropertyValue('--nav-total') || '108', 10
            ) || 108) + 40;

            const list = key ? key.split(',') : [];
            let current = list[0] ?? '';
            for (const id of list) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= offset) current = id;
            }
            setActive(current);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [key]);

    return active;
};


export default useActiveSection;
