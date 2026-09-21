import styled from 'styled-components';
import {
    color,
    font,
    layout,
    media,
    motion,
    radius,
    space,
    type,
} from '../../styles/theme';

export const Section = styled.section<{ $paper?: boolean; $dark?: boolean }>`
    padding: ${space.section} ${space.gutter};
    background: ${({ $dark, $paper }) => ($dark ? color.primaryDeep : $paper ? color.paper : color.ivory)};
    color: ${({ $dark }) => ($dark ? color.onDark : color.body)};
    ${({ $dark }) => $dark && `h1,h2,h3 { color: ${color.onDark}; }`}
`;
export const Container = styled.div`
    max-width: ${layout.maxWidth};
    margin: auto;
    min-width: 0;
`;
export const PageTitle = styled.h1`
    font: 600 clamp(2.75rem, 1.5rem + 3.6vw, 5.25rem)/1.08 ${font.body};
    letter-spacing: -0.055em;
    max-width: 18ch;
    margin-bottom: 28px;
`;
export const SectionTitle = styled.h2`
    font: 600 clamp(2rem, 1.35rem + 2.5vw, 3.75rem)/1.12 ${font.body};
    letter-spacing: -0.045em;
    margin-bottom: 24px;
    max-width: 24ch;
`;
export const EditorialTitle = styled(SectionTitle)`
    font-family: ${font.display};
    font-weight: 400;
    letter-spacing: -0.035em;
`;
export const Eyebrow = styled.p`
    font: 600 0.875rem/1.5 ${font.body};
    margin-bottom: 20px;
    color: inherit;
`;
export const Lead = styled.p`
    font-size: ${type.lead};
    line-height: 1.6;
    max-width: 56ch;
`;
export const Meta = styled.p`
    font-size: 0.875rem;
    line-height: 1.5;
    color: inherit;
`;
export const Split = styled.div<{ $ratio?: string }>`
    display: grid;
    grid-template-columns: ${({ $ratio }) => $ratio ?? '1fr 1fr'};
    align-items: center;
    gap: clamp(28px, 5vw, 72px);
    > * {
        min-width: 0;
    }
    ${media.md} {
        grid-template-columns: 1fr;
    }
`;
export const SectionHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 36px;
    margin-bottom: 40px;
    h2 {
        margin: 0;
    }
    > p {
        max-width: 35ch;
    }
    ${media.md} {
        display: block;
        > p {
            margin-top: 20px;
        }
    }
`;
export const PhotoGrid = styled.div<{ $columns?: number }>`
    display: grid;
    grid-template-columns: repeat(
        ${({ $columns }) => $columns ?? 3},
        minmax(0, 1fr)
    );
    gap: 24px;
    align-items: start;
    ${media.md} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
    }
`;
export const FieldLabel = styled.label`
    display: grid;
    gap: 8px;
    font-size: 1rem;
    font-weight: 500;
    input,
    textarea,
    select {
        width: 100%;
        min-width: 0;
        padding: 12px 14px;
        border: 1px solid ${color.controlBorder};
        background: ${color.paperPure};
        color: ${color.ink};
        border-radius: 10px;
        font: 400 1.0625rem/1.5 ${font.body};
        min-height: 48px;
    }
    textarea {
        min-height: 120px;
        resize: vertical;
    }
`;
export const QuietButton = styled.button`
    font: 500 1.0625rem/1.4 ${font.body};
    padding: 10px 16px;
    min-height: 44px;
    border: 1px solid ${color.controlBorder};
    background: ${color.paperPure};
    color: ${color.ink};
    border-radius: ${radius.md};
    cursor: pointer;
    transition: background ${motion.fast};
    &:hover {
        background: ${color.primaryWash};
    }
    &:disabled {
        color: ${color.bodyMuted};
        cursor: default;
    }
`;
export const Accordion = styled.div`
    border-top: 1px solid ${color.primaryLineStrong};
    details {
        border-bottom: 1px solid ${color.primaryLineStrong};
    }
    summary {
        cursor: pointer;
        min-height: 60px;
        padding: 20px 0;
        font-weight: 500;
        color: ${color.ink};
    }
    details > p {
        max-width: 68ch;
        padding: 0 24px 24px 0;
        line-height: 1.65;
    }
`;
