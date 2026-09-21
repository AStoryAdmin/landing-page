import { IconCheck } from './icons';
import useActiveSection from '../../hooks/useActiveSection';
import {
    SummaryPanel,
    TocEntry,
    TocHeading,
    TocItems,
    TocRail,
} from './legal.styles';

export { LegalLayout } from './legal.styles';

/**
 * Legal pages are read two ways: most people want the gist in twenty seconds,
 * and a few need to find one clause exactly. These serve both.
 */

type SummaryProps = {
    intro: string;
    points: { label: string; text: string }[];
    caveat: string;
};

/** The twenty-second version, for the people who will not read the rest. */
export const PlainSummary = ({ intro, points, caveat }: SummaryProps) => (
    <SummaryPanel aria-label="Plain-English summary">
        <h2>The short version</h2>
        <p className="intro">{intro}</p>
        <ul>
            {points.map((p) => (
                <li key={p.label}>
                    <IconCheck size={16} />
                    <span>
                        <strong>{p.label}</strong> {p.text}
                    </span>
                </li>
            ))}
        </ul>
        <p className="caveat">{caveat}</p>
    </SummaryPanel>
);

/** The contents rail, wired to the reader's position. */
export const TableOfContents = ({
    sections,
}: {
    sections: { id: string; title: string }[];
}) => {
    const active = useActiveSection(sections.map((s) => s.id));

    return (
        <TocRail aria-label="On this page">
            <TocHeading>Contents</TocHeading>
            <TocItems>
                {sections.map((s) => (
                    <TocEntry key={s.id} $active={active === s.id}>
                        <a
                            href={`#${s.id}`}
                            aria-current={active === s.id ? 'true' : undefined}
                        >
                            {s.title}
                        </a>
                    </TocEntry>
                ))}
            </TocItems>
        </TocRail>
    );
};
