import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
import {
    Announce, Dropdown, DropdownItem, Hamburger, MobileActions, NavActions, NavButton, NavCta,
    NavGhost, NavGroup, NavInner, NavLink, NavLinks, NavShell, NavSpacer,
} from './navbar.styles';

/** The three audiences A Story serves, surfaced under one nav group. */
const AUDIENCES = [
    { to: '/family', title: 'For families', blurb: "Capture a parent's or grandparent's life story before the chance passes." },
    { to: '/organizations', title: 'For organizations', blurb: 'Keep your founding story, your people and your institutional memory — permanently.' },
    { to: '/institution', title: 'For care communities', blurb: 'Reminiscence at scale for senior living, memory care and hospice.' },
] as const;

const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [audienceOpen, setAudienceOpen] = useState(false);
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
        setAudienceOpen(false);
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
        if (!audienceOpen) return;
        const onClick = (e: MouseEvent) => {
            if (!groupRef.current?.contains(e.target as Node)) setAudienceOpen(false);
        };
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setAudienceOpen(false); };
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [audienceOpen]);

    const isAudience = AUDIENCES.some((a) => a.to === pathname);

    return (
        <NavShell ref={shellRef} $solid={solid}>
            <Announce>
                <span>
                    Founding access is open &mdash;{' '}
                    <strong>87 of 100 family spots left</strong>
                </span>
                <Link to="/signup">Claim yours &rarr;</Link>
            </Announce>

            <NavInner aria-label="Primary">
                <Logo size={32} tone="light" />
                <NavSpacer />

                <NavLinks $open={open} id={menuId}>
                    <NavLink to="/experience" $active={pathname === '/experience'}>How it works</NavLink>

                    <NavGroup
                        ref={groupRef}
                        onMouseEnter={() => window.matchMedia('(min-width: 861px)').matches && setAudienceOpen(true)}
                        onMouseLeave={() => window.matchMedia('(min-width: 861px)').matches && setAudienceOpen(false)}
                    >
                        <NavButton
                            type="button"
                            $open={audienceOpen}
                            aria-expanded={audienceOpen}
                            aria-haspopup="true"
                            onClick={() => setAudienceOpen((v) => !v)}
                            style={isAudience ? { fontWeight: 600 } : undefined}
                        >
                            Who it&rsquo;s for <Chevron />
                        </NavButton>
                        <Dropdown $open={audienceOpen} role="menu">
                            {AUDIENCES.map((a) => (
                                <DropdownItem key={a.to} to={a.to} role="menuitem">
                                    <strong>{a.title}</strong>
                                    <span>{a.blurb}</span>
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </NavGroup>

                    <NavLink to="/pricing" $active={pathname === '/pricing'}>Pricing</NavLink>
                    <NavLink to="/story" $active={pathname === '/story'}>Our story</NavLink>

                    <MobileActions>
                        <NavCta to="/signup">Get early access</NavCta>
                        <NavGhost to="/signup?for=organization">Book a demo</NavGhost>
                    </MobileActions>
                </NavLinks>

                <NavActions>
                    <NavGhost to="/signup?for=organization">Book a demo</NavGhost>
                    <NavCta to="/signup">Get early access</NavCta>
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
