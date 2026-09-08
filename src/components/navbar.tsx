import { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
import { CONTACT } from '../lib/contact';
import {
    Announce, Dropdown, DropdownItem, Hamburger, MobileActions, NavActions, NavButton, NavCtaAnchor,
    NavGhost, NavGroup, NavInner, NavLink, NavLinks, NavShell, NavSpacer,
} from './navbar.styles';

/**
 * The gift buyer is the whole point of the top-level nav, so the two other
 * audiences sit behind one "Also for" group rather than competing for it.
 */
const ALSO_FOR = [
    { to: '/organizations', title: 'Organizations', blurb: 'Founder interviews, retiring-employee knowledge and anniversary archives.' },
    { to: '/institution', title: 'Care communities', blurb: 'Reminiscence at scale for senior living, memory care and hospice.' },
] as const;

const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [alsoOpen, setAlsoOpen] = useState(false);
    const [solid, setSolid] = useState(false);
    const shellRef = useRef<HTMLElement | null>(null);
    const groupRef = useRef<HTMLDivElement | null>(null);
    const menuId = useId();
    const { pathname } = useLocation();

    /*
     * Close everything on navigation. Adjusting state during render (rather
     * than in an effect) means the menu is never painted open on the new page.
     */
    const [lastPath, setLastPath] = useState(pathname);
    if (pathname !== lastPath) {
        setLastPath(pathname);
        setOpen(false);
        setAlsoOpen(false);
    }

    /* Lock the page behind the mobile drawer. */
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    /* Shadow appears only once the page has moved. */
    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /*
     * The header is fixed, and its height changes with the announcement strip
     * and with wrapping on small screens. Publish the measured height so the
     * layout below can reserve exactly the right amount of space.
     */
    useEffect(() => {
        const el = shellRef.current;
        if (!el) return;
        const publish = () => document.documentElement.style.setProperty('--nav-total', `${el.offsetHeight}px`);
        publish();
        if (typeof ResizeObserver === 'undefined') return;
        const ro = new ResizeObserver(publish);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    /* Dismiss the dropdown on outside click or Escape. */
    useEffect(() => {
        if (!alsoOpen) return;
        const onClick = (e: MouseEvent) => {
            if (!groupRef.current?.contains(e.target as Node)) setAlsoOpen(false);
        };
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setAlsoOpen(false); };
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [alsoOpen]);

    const isAlso = ALSO_FOR.some((a) => a.to === pathname);

    return (
        <NavShell ref={shellRef} $solid={solid}>
            <Announce>
                <span>
                    Ready to give in minutes &mdash; <strong>and the archive is theirs forever</strong>
                </span>
                <a href={CONTACT.gift}>Gift a story &rarr;</a>
            </Announce>

            <NavInner aria-label="Primary">
                <Logo height={40} tone="light" variant="simple" />
                <NavSpacer />

                <NavLinks $open={open} id={menuId}>
                    <NavLink to="/experience" $active={pathname === '/experience'}>How it works</NavLink>
                    <NavLink to="/family" $active={pathname === '/family'}>Why it matters</NavLink>
                    <NavLink to="/pricing" $active={pathname === '/pricing'}>Pricing</NavLink>

                    <NavGroup
                        ref={groupRef}
                        onMouseEnter={() => window.matchMedia('(min-width: 861px)').matches && setAlsoOpen(true)}
                        onMouseLeave={() => window.matchMedia('(min-width: 861px)').matches && setAlsoOpen(false)}
                    >
                        <NavButton
                            type="button"
                            $open={alsoOpen}
                            aria-expanded={alsoOpen}
                            aria-haspopup="true"
                            onClick={() => setAlsoOpen((v) => !v)}
                            style={isAlso ? { fontWeight: 600 } : undefined}
                        >
                            Also for <Chevron />
                        </NavButton>
                        <Dropdown $open={alsoOpen} role="menu">
                            {ALSO_FOR.map((a) => (
                                <DropdownItem key={a.to} to={a.to} role="menuitem">
                                    <strong>{a.title}</strong>
                                    <span>{a.blurb}</span>
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </NavGroup>

                    <MobileActions>
                        <NavCtaAnchor href={CONTACT.gift}>Gift a story</NavCtaAnchor>
                        <NavGhost to="/story">Our story</NavGhost>
                    </MobileActions>
                </NavLinks>

                <NavActions>
                    <NavGhost to="/story">Our story</NavGhost>
                    <NavCtaAnchor href={CONTACT.gift}>Gift a story</NavCtaAnchor>
                </NavActions>

                <Hamburger
                    type="button"
                    $open={open}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    aria-controls={menuId}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </Hamburger>
            </NavInner>
        </NavShell>
    );
};

export default Navbar;
