import { useState } from 'react';
import styled from 'styled-components';
import {
    CHAPTERS,
    CHAPTER_COUNT,
    QUESTION_COUNT,
    SENSITIVE_LINE,
} from '../../lib/product';
import {
    FieldLabel,
    Lead,
    Meta,
    SectionTitle,
    Split,
} from '../ui/resolved.styles';
import { color, font } from '../../styles/theme';
const Selected = styled.div`
    border-left: 3px solid ${color.accent};
    padding-left: 28px;
    h3 {
        font: 600 1.75rem/1.3 ${font.body};
        margin: 20px 0 16px;
    }
    p + p {
        margin-top: 20px;
    }
`;
export default function ChapterBrowser() {
    const [index, setIndex] = useState(0);
    const chapter = CHAPTERS[index];
    return (
        <Split>
            <div>
                <SectionTitle>
                    Room for a whole life. In any order.
                </SectionTitle>
                <Lead>
                    {CHAPTER_COUNT} chapters. {QUESTION_COUNT} questions. Begin
                    where a memory takes you.
                </Lead>
            </div>
            <Selected>
                <FieldLabel>
                    Explore a chapter
                    <select
                        aria-label="Explore a chapter"
                        value={index}
                        onChange={(event) =>
                            setIndex(Number(event.target.value))
                        }
                    >
                        {CHAPTERS.map((item, i) => (
                            <option key={item.name} value={i}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </FieldLabel>
                <div aria-live="polite">
                    <h3>{chapter.name}</h3>
                    <p>{chapter.blurb}</p>
                    {chapter.note && <p>{chapter.note}</p>}
                </div>
                <Meta>“{SENSITIVE_LINE}”</Meta>
            </Selected>
        </Split>
    );
}
