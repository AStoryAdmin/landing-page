/**
 * A single stroke-based icon set, drawn on a 24px grid at 1.6 weight so icons
 * sit alongside Figtree at body weight without shouting. `currentColor`
 * throughout, so colour is always the parent's decision.
 */

type Props = { size?: number; className?: string };

const base = (size: number) => ({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: 'false' as const,
});

export const IconMic = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
);

export const IconBook = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
);

export const IconArchive = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <rect x="3" y="4" width="18" height="5" rx="1.5" />
        <path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
        <line x1="10" y1="13" x2="14" y2="13" />
    </svg>
);

export const IconUsers = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export const IconShield = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export const IconLock = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <rect x="3.5" y="10.5" width="17" height="11" rx="2" />
        <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    </svg>
);

export const IconNoTrain = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <circle cx="12" cy="12" r="9.5" />
        <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
    </svg>
);

export const IconExport = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 9 12 4 17 9" />
        <line x1="12" y1="4" x2="12" y2="16" />
    </svg>
);

export const IconClock = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <circle cx="12" cy="12" r="9.5" />
        <polyline points="12 6.5 12 12 15.5 14" />
    </svg>
);

export const IconBuilding = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <rect x="3.5" y="3" width="10" height="18" rx="1.5" />
        <path d="M13.5 9H20a.5.5 0 0 1 .5.5V21" />
        <line x1="6.5" y1="7" x2="10.5" y2="7" />
        <line x1="6.5" y1="11" x2="10.5" y2="11" />
        <line x1="6.5" y1="15" x2="10.5" y2="15" />
        <line x1="16" y1="13" x2="18" y2="13" />
        <line x1="16" y1="17" x2="18" y2="17" />
    </svg>
);

export const IconHeart = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
);

export const IconSearch = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <circle cx="11" cy="11" r="7" />
        <line x1="16.2" y1="16.2" x2="21" y2="21" />
    </svg>
);

export const IconCheck = ({ size = 16, className }: Props) => (
    <svg {...base(size)} strokeWidth={2.2} className={className}>
        <polyline points="4 12.5 9.5 18 20 6.5" />
    </svg>
);

export const IconArrow = ({ size = 16, className }: Props) => (
    <svg {...base(size)} strokeWidth={2} className={className}>
        <line x1="4" y1="12" x2="19" y2="12" />
        <polyline points="13 6 19 12 13 18" />
    </svg>
);

export const IconGlobe = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <circle cx="12" cy="12" r="9.5" />
        <line x1="2.5" y1="12" x2="21.5" y2="12" />
        <path d="M12 2.5a15 15 0 0 1 0 19 15 15 0 0 1 0-19z" />
    </svg>
);

export const IconSpark = ({ size = 20, className }: Props) => (
    <svg {...base(size)} className={className}>
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
        <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </svg>
);
