import { useId, useState } from 'react';
import styled from 'styled-components';
import { color, font, media, radius, shadow } from '../../styles/theme';
import { sampleMemory, exampleArchive } from '../../lib/sampleMemory';
import MissionPhoto from '../ui/MissionPhoto';
import Logo from '../ui/Logo';
import { FieldLabel, Meta, QuietButton } from '../ui/resolved.styles';

const Surface = styled.div<{ $compact?: boolean }>`
    width: 100%;
    max-width: 393px;
    margin-inline: auto;
    background: ${color.ivory};
    color: ${color.ink};
    border: 1px solid ${color.primaryLineStrong};
    border-radius: 24px;
    box-shadow: ${shadow.md};
    overflow: clip;
    font-size: 1rem;
    line-height: 1.5;
    ${({ $compact }) =>
        $compact &&
        `max-width: 360px; .eyeline { display: none; } .compact-body { gap: 12px; padding: 12px 20px 20px; } .daily-question { padding: 16px; } .daily-question > p { font-size: 1.25rem; margin: 8px 0; } .context { display: none; }`}
`;
const AppHeader = styled.div`
    position: relative;
    padding: 22px 24px 36px;
    background: ${color.primaryDeep};
    color: ${color.onDark};
    &::after {
        content: '';
        height: 22px;
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        background: ${color.ivory};
        border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    }
    .welcome {
        margin-inline: auto;
        max-width: 160px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    p {
        margin-top: 16px;
        font-size: 0.875rem;
    }
    h3 {
        color: inherit;
        font: 500 1.6rem/1.3 ${font.display};
        margin-top: 6px;
    }
`;
const AppBody = styled.div`
    padding: 12px 22px 24px;
    display: grid;
    gap: 20px;
    h3,
    h4 {
        font: 600 1.125rem/1.35 ${font.body};
    }
    button {
        width: 100%;
    }
    img {
        border-radius: 8px;
    }
    p {
        font-size: 1rem;
    }
    .greeting {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: ${color.primaryWash};
        display: grid;
        place-items: center;
        font-size: 1rem;
    }
    .greeting small {
        font-size: 0.8125rem;
        color: ${color.accentText};
    }
    .greeting p {
        font-size: 0.875rem;
    }
    .week {
        display: flex;
        justify-content: space-between;
        gap: 6px;
        font-size: 0.8125rem;
        text-align: center;
    }
    .week span {
        display: grid;
        gap: 5px;
    }
    .week b {
        font-weight: 400;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: ${color.paperPure};
    }
    .week .today b {
        background: ${color.primary};
        color: ${color.ivory};
    }
    .entry-pair {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
    }
    .entry-pair button {
        font-size: 0.8125rem;
        min-height: 62px;
        justify-content: center;
        text-align: center;
        padding: 10px 6px;
    }
    .meta {
        font-size: 0.875rem;
        color: ${color.bodyMuted};
    }
`;
const Question = styled.div`
    padding: 20px;
    background: ${color.paperPure};
    border-radius: 16px;
    > strong {
        color: ${color.accentText};
        font-size: 0.875rem;
    }
    > p {
        font: 400 1.375rem/1.35 ${font.display};
        margin: 12px 0 18px;
    }
    .context {
        display: grid;
        grid-template-columns: 65px 1fr;
        gap: 12px;
        align-items: center;
    }
    .context img {
        width: 65px;
        height: auto;
    }
    .context span {
        font-size: 0.875rem;
    }
`;
const Entry = styled(QuietButton)<{ $primary?: boolean }>`
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ $primary }) =>
        $primary ? color.primary : color.paperPure};
    color: ${({ $primary }) => ($primary ? color.onDark : color.ink)};
    &:hover {
        background: ${({ $primary }) =>
            $primary ? color.primaryHover : color.primaryWash};
    }
    span {
        font-size: 1.2rem;
    }
`;
const Recent = styled.button`
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 14px;
    align-items: center;
    text-align: left;
    padding: 12px;
    border: 0;
    border-radius: 12px;
    color: ${color.ink};
    background: #e4e9de;
    cursor: pointer;
    > span {
        font-size: 1rem;
        font-weight: 500;
    }
    small {
        display: block;
        font-size: 0.875rem;
        font-weight: 400;
        margin-top: 8px;
        color: ${color.bodyMuted};
    }
`;
const Navigation = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 10px 20px;
    border-top: 1px solid ${color.primaryLine};
    button {
        min-height: 44px;
        border: 0;
        background: none;
        font-size: 0.875rem;
        color: ${color.ink};
        cursor: pointer;
    }
`;
export function ProductHome({
    onTalk,
    onWrite,
    onMemory,
    onArchive,
    compact = false,
    recordTitle = sampleMemory.title,
}: {
    onTalk: () => void;
    onWrite: () => void;
    onMemory: () => void;
    onArchive: () => void;
    compact?: boolean;
    recordTitle?: string;
}) {
    return (
        <Surface $compact={compact} aria-label="Illustrative A Story Home view">
            <AppHeader>
                <div className="welcome">
                    <Logo height={27} tone="dark" variant="simple" />
                </div>
            </AppHeader>
            <AppBody className="compact-body">
                <div className="greeting">
                    <span className="avatar" aria-hidden="true">
                        E
                    </span>
                    <div>
                        <small>GOOD EVENING, ELEANOR</small>
                        <p>Your stories · Home</p>
                    </div>
                </div>
                <div
                    className="week"
                    aria-label="Illustrative week, Wednesday selected"
                >
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <span key={i} className={i === 2 ? 'today' : ''}>
                            {day}
                            <b>{i + 8}</b>
                        </span>
                    ))}
                </div>
                <Question className="daily-question">
                    <strong>Today’s question</strong>
                    <p>{sampleMemory.question}</p>
                    <div className="context">
                        <MissionPhoto
                            name="30"
                            alt="The sample afternoon at the lake"
                            sizes="80px"
                        />
                        <span>{sampleMemory.title}</span>
                    </div>
                </Question>
                <div className="entry-pair">
                    <Entry $primary onClick={onTalk}>
                        Live Conversation
                    </Entry>
                    <Entry onClick={onWrite}>Write your Memory</Entry>
                </div>
                <h4>Recent Memories</h4>
                <Recent onClick={onMemory}>
                    <MissionPhoto
                        name="30"
                        alt="Lake afternoon"
                        sizes="100px"
                    />
                    <span>
                        {recordTitle}
                        <small>Summer 1975 · approximate</small>
                        <small>Eleanor · Daniel · Maya</small>
                    </span>
                </Recent>
                {!compact && (
                    <Meta>Explore this example without making a call.</Meta>
                )}
            </AppBody>
            {!compact && (
                <Navigation aria-label="Example views">
                    <button onClick={onArchive}>Archive</button>
                    <button onClick={onMemory}>Open memory</button>
                </Navigation>
            )}
        </Surface>
    );
}
export function MemoryDetail({
    title = sampleMemory.title,
    summary = sampleMemory.summary,
    onEdit,
}: {
    title?: string;
    summary?: string;
    onEdit?: () => void;
}) {
    const [layer, setLayer] = useState('summary');
    return (
        <Surface aria-label="Illustrative memory detail">
            <MissionPhoto
                name="30"
                alt="People spending an afternoon at the edge of a lake"
                sizes="393px"
            />
            <AppBody
                style={{
                    borderRadius: '26px 26px 0 0',
                    marginTop: -18,
                    position: 'relative',
                    background: color.ivory,
                    paddingTop: 24,
                }}
            >
                <Meta>
                    {sampleMemory.date} · {sampleMemory.chapter}
                </Meta>
                <h3 style={{ textAlign: 'center', fontSize: '1.45rem' }}>
                    {title}
                </h3>
                <div>
                    <strong>Eleanor</strong>
                    <p className="meta">Firsthand recollection</p>
                </div>
                <FieldLabel>
                    Read this memory
                    <select
                        aria-label="Read this memory"
                        value={layer}
                        onChange={(event) => setLayer(event.target.value)}
                    >
                        <option value="summary">Summary</option>
                        <option value="original">Original words</option>
                        <option value="voice">Voice availability</option>
                    </select>
                </FieldLabel>
                {layer === 'summary' ? (
                    <>
                        <p>{summary}</p>
                        <p>Original words: “{sampleMemory.voices[0].quote}”</p>
                    </>
                ) : layer === 'original' ? (
                    <div>
                        <p>“{sampleMemory.voices[0].quote}”</p>
                        <p>“{sampleMemory.response}”</p>
                    </div>
                ) : (
                    <p>
                        No audio is included in this website example. The
                        original words are available to read.
                    </p>
                )}
                {onEdit && (
                    <QuietButton onClick={onEdit}>
                        Edit this example
                    </QuietButton>
                )}
            </AppBody>
        </Surface>
    );
}
const Feed = styled.div`
    background: ${color.paperPure};
    padding: 28px;
    border: 1px solid ${color.primaryLineStrong};
    border-radius: ${radius.lg};
    h3 {
        font: 600 1.75rem/1.3 ${font.body};
        margin-bottom: 20px;
    }
    .filters {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 24px;
    }
    .results {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
        margin-top: 22px;
    }
    .record {
        text-align: left;
        display: grid;
        grid-template-columns: 110px 1fr;
        gap: 8px 20px;
        align-content: start;
        border: 0;
        border-radius: 8px;
        padding: 14px;
        background: #e8ece4;
        color: ${color.ink};
        cursor: pointer;
    }
    .record strong {
        grid-column: 2;
        font-size: 1.125rem;
    }
    .record span {
        grid-column: 2;
        font-size: 0.875rem;
    }
    .record figure {
        grid-column: 1;
        grid-row: 1/3;
        align-self: center;
    }
    .record figure img {
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 6px;
    }
    ${media.sm} {
        padding: 20px;
        .record {
            grid-template-columns: 70px 1fr;
            gap: 8px 14px;
            padding: 12px;
        }
        .filters,
        .results {
            grid-template-columns: 1fr;
        }
    }
`;
export function ArchiveView({
    onOpen,
    recordTitle = sampleMemory.title,
}: {
    onOpen: () => void;
    recordTitle?: string;
}) {
    const [search, setSearch] = useState('');
    const [chapter, setChapter] = useState('all');
    const records = exampleArchive
        .map((record) =>
            record.id === sampleMemory.recordId
                ? { ...record, title: recordTitle }
                : record,
        )
        .filter(
            (record) =>
                `${record.title} ${record.date}`
                    .toLowerCase()
                    .includes(search.toLowerCase()) &&
                (chapter === 'all' || record.chapter === chapter),
        );
    const [notice, setNotice] = useState('');
    return (
        <Feed>
            <h3>The Archive</h3>
            <div className="filters">
                <FieldLabel>
                    Find a memory
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Try “lake”"
                    />
                </FieldLabel>
                <FieldLabel>
                    Chapter
                    <select
                        aria-label="Chapter"
                        value={chapter}
                        onChange={(event) => setChapter(event.target.value)}
                    >
                        <option value="all">All chapters</option>
                        {[
                            ...new Set(
                                exampleArchive.map((record) => record.chapter),
                            ),
                        ].map((name) => (
                            <option key={name}>{name}</option>
                        ))}
                    </select>
                </FieldLabel>
            </div>
            <p role="status">
                {records.length} {records.length === 1 ? 'memory' : 'memories'}{' '}
                in this example
            </p>
            <div className="results">
                {records.map((record) => (
                    <button
                        className="record"
                        key={record.id}
                        onClick={() =>
                            record.id === sampleMemory.recordId
                                ? onOpen()
                                : setNotice(
                                      `${record.title} is a supporting example. Open the lake memory to explore its original words and contributions.`,
                                  )
                        }
                    >
                        <MissionPhoto
                            name={record.image}
                            alt={record.title}
                            sizes="(max-width:640px) 90vw, 350px"
                        />
                        <strong>{record.title}</strong>
                        <span>
                            {record.date}
                            <br />
                            {record.chapter} · {record.voices}{' '}
                            {record.voices === 1 ? 'voice' : 'voices'}
                        </span>
                    </button>
                ))}
            </div>
            {notice && <p role="status">{notice}</p>}
        </Feed>
    );
}
export function CollectionView() {
    const uid = useId();
    const [name, setName] = useState('Our family stories');
    const [created, setCreated] = useState(false);
    return (
        <Surface>
            <AppHeader>
                <p>A place to keep it together</p>
                <h3>Create a collection</h3>
            </AppHeader>
            <AppBody>
                <FieldLabel htmlFor={uid}>
                    Collection name
                    <input
                        id={uid}
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setCreated(false);
                        }}
                    />
                </FieldLabel>
                <Entry
                    $primary
                    disabled={!name.trim()}
                    onClick={() => setCreated(true)}
                >
                    Create example collection
                </Entry>
                {created && (
                    <p role="status">
                        “{name.trim()}” is ready in this example. No account or
                        archive was created.
                    </p>
                )}
            </AppBody>
        </Surface>
    );
}
