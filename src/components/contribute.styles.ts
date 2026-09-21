import styled from 'styled-components';
import { color, font } from '../styles/theme';

export const Page = styled.main`
    min-height: 100vh;
    background: ${color.ivory};
    color: ${color.ink};
    font-family: ${font.body};
`;

export const Inner = styled.div`
    max-width: 560px;
    margin: 0 auto;
    padding: 44px 20px 72px;
`;

export const Brand = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    letter-spacing: 2px;
    color: ${color.bodyMuted};
    font-size: 14px;
    margin-bottom: 28px;

    b {
        color: ${color.accent};
        font-family: ${font.display};
        font-weight: 700;
    }
`;

export const Hero = styled.div`
    text-align: center;
    margin-bottom: 32px;
`;

export const Avatar = styled.div<{ $img?: string }>`
    width: 88px;
    height: 88px;
    border-radius: 50%;
    margin: 0 auto 16px;
    background: ${({ $img }) => ($img ? `center/cover no-repeat url(${$img})` : 'rgba(180,90,43,0.12)')};
    border: 2px solid rgba(180, 90, 43, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${color.accentText};
    font-family: ${font.display};
    font-size: 34px;
`;

export const Title = styled.h1`
    font-family: ${font.display};
    font-weight: 500;
    font-size: 38px;
    line-height: 1.1;
    margin: 0;
    color: ${color.primaryDeep};
`;

export const Sub = styled.p`
    font-size: 17px;
    line-height: 1.6;
    color: ${color.bodyMuted};
    margin: 12px auto 0;
    max-width: 440px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const FieldWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

export const Label = styled.label`
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1.6px;
    color: ${color.bodyMuted};
`;

const inputStyles = `
    padding: 14px 16px;
    border-radius: 2px;
    border: 1px solid ${color.controlBorder};
    background: ${color.paper};
    font-size: 17px;
    font-family: ${font.body};
    color: ${color.ink};
    min-height: 54px;
    transition: border-color 0.2s ease;
    width: 100%;
    box-sizing: border-box;

    &:focus { border-color: ${color.accent}; }
    &::placeholder { color: ${color.faint}; }
`;

export const Input = styled.input`
    ${inputStyles}
`;

export const Textarea = styled.textarea`
    ${inputStyles}
    min-height: 150px;
    resize: vertical;
    line-height: 1.6;
`;

export const KindRow = styled.div`
    display: flex;
    gap: 10px;
`;

export const KindBtn = styled.button<{ $on: boolean }>`
    flex: 1;
    padding: 13px 12px;
    border-radius: 2px;
    cursor: pointer;
    font-family: ${font.body};
    font-size: 17px;
    font-weight: 600;
    transition: all 0.2s ease;
    border: 1px solid
        ${({ $on }) => ($on ? color.primary : color.controlBorder)};
    background: ${({ $on }) => ($on ? color.primary : 'transparent')};
    color: ${({ $on }) => ($on ? color.paperPure : color.bodyMuted)};
`;

export const PhotoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const Thumb = styled.button<{ $img: string }>`
    width: 84px;
    height: 84px;
    border-radius: 10px;
    background: center/cover no-repeat url(${({ $img }) => $img});
    border: 1px solid ${color.primaryLine};
`;

export const FileLabel = styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 20px;
    border-radius: 2px;
    border: 1px dashed rgba(43, 33, 23, 0.3);
    color: ${color.bodyMuted};
    font-size: 17px;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: ${color.accent};
        color: ${color.accent};
    }

    position: relative;
    &:focus-within {
        outline: 2px solid currentColor;
        outline-offset: 3px;
    }
    input {
        position: absolute;
        inset: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
`;

export const Submit = styled.button`
    width: 100%;
    padding: 18px 28px;
    border-radius: 2px;
    border: none;
    background: ${color.primary};
    color: ${color.paperPure};
    font-family: ${font.body};
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.6px;
    cursor: pointer;
    box-shadow: none;
    transition: background 0.2s ease;
    margin-top: 4px;

    &:hover:not(:disabled) {
        background: ${color.primaryHover};
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const ErrorMsg = styled.p`
    color: ${color.error};
    font-size: 17px;
    font-weight: 600;
    margin: 0;
`;

export const Note = styled.p`
    font-size: 14px;
    color: ${color.bodyMuted};
    text-align: center;
    margin: 0;
    line-height: 1.5;
`;

export const Centered = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    background: ${color.ivory};
    color: ${color.bodyMuted};
    font-family: ${font.body};
    gap: 10px;
    h1 { font-size: clamp(30px, 5vw, 44px); line-height: 1.15; max-width: 22ch; color: ${color.primary}; }
    p { font-size: 18px; max-width: 45ch; line-height: 1.6; }
`;

export const ThankYou = styled.div`
    background: ${color.paper};
    border: 1px solid ${color.primaryLine};
    border-left: 3px solid ${color.live};
    border-radius: 2px;
    padding: 28px 26px;
    text-align: center;

    h2 {
        font-family: ${font.display};
        font-weight: 600;
        font-size: 30px;
        margin: 0 0 10px;
        color: ${color.primaryDeep};
    }
    p {
        margin: 0;
        color: ${color.bodyMuted};
        line-height: 1.6;
    }
`;

export const Again = styled.button`
    min-height: 44px;
    margin-top: 18px;
    background: none;
    border: none;
    color: ${color.accentText};
    font-family: ${font.body};
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
`;
