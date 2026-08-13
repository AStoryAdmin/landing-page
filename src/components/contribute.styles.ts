import styled from 'styled-components';

const colors = {
    dark: '#120E08',
    ink: '#2B2117',
    softInk: '#5C4A38',
    cream: '#EFE6D4',
    paper: '#F6EFE2',
    orange: '#b45a2b',
    orangeHover: '#8C3E18',
    green: '#5A9E6F',
    red: '#c0392b',
    line: 'rgba(43, 33, 23, 0.14)',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

export const Page = styled.div`
    min-height: 100vh;
    background: ${colors.cream};
    color: ${colors.ink};
    font-family: ${fonts.body};
`;

export const Inner = styled.div`
    max-width: 560px;
    margin: 0 auto;
    padding: 44px 20px 72px;
`;

export const Brand = styled.div`
    text-align: center;
    letter-spacing: 2px;
    color: ${colors.softInk};
    font-size: 14px;
    margin-bottom: 28px;

    b { color: ${colors.orange}; font-family: ${fonts.display}; font-weight: 700; }
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
    color: ${colors.orange};
    font-family: ${fonts.display};
    font-size: 34px;
`;

export const Title = styled.h1`
    font-family: ${fonts.display};
    font-weight: 500;
    font-size: 38px;
    line-height: 1.1;
    margin: 0;
    color: ${colors.dark};
`;

export const Sub = styled.p`
    font-size: 17px;
    line-height: 1.6;
    color: ${colors.softInk};
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
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.6px;
    color: ${colors.softInk};
`;

const inputStyles = `
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid rgba(43, 33, 23, 0.18);
    background: #FBF7EF;
    font-size: 16px;
    font-family: 'Figtree', sans-serif;
    color: #2B2117;
    outline: none;
    transition: border-color 0.2s ease;
    width: 100%;
    box-sizing: border-box;

    &:focus { border-color: #b45a2b; }
    &::placeholder { color: rgba(43, 33, 23, 0.4); }
`;

export const Input = styled.input`${inputStyles}`;

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
    border-radius: 999px;
    cursor: pointer;
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 600;
    transition: all 0.2s ease;
    border: 1px solid ${({ $on }) => ($on ? colors.orange : 'rgba(43,33,23,0.18)')};
    background: ${({ $on }) => ($on ? colors.orange : 'transparent')};
    color: ${({ $on }) => ($on ? colors.cream : colors.softInk)};
`;

export const PhotoRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const Thumb = styled.div<{ $img: string }>`
    width: 84px;
    height: 84px;
    border-radius: 10px;
    background: center/cover no-repeat url(${({ $img }) => $img});
    border: 1px solid ${colors.line};
`;

export const FileLabel = styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 20px;
    border-radius: 999px;
    border: 1px dashed rgba(43, 33, 23, 0.3);
    color: ${colors.softInk};
    font-size: 15px;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover { border-color: ${colors.orange}; color: ${colors.orange}; }

    input { display: none; }
`;

export const Submit = styled.button`
    width: 100%;
    padding: 18px 28px;
    border-radius: 999px;
    border: none;
    background: ${colors.orange};
    color: ${colors.cream};
    font-family: ${fonts.body};
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.6px;
    cursor: pointer;
    transition: background 0.2s ease;
    margin-top: 4px;

    &:hover:not(:disabled) { background: ${colors.orangeHover}; }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const ErrorMsg = styled.p`
    color: ${colors.red};
    font-size: 15px;
    font-weight: 600;
    margin: 0;
`;

export const Note = styled.p`
    font-size: 14px;
    color: ${colors.softInk};
    text-align: center;
    margin: 0;
    line-height: 1.5;
`;

export const Centered = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    background: ${colors.cream};
    color: ${colors.softInk};
    font-family: ${fonts.body};
    gap: 10px;
`;

export const ThankYou = styled.div`
    background: ${colors.paper};
    border: 1px solid ${colors.line};
    border-left: 3px solid ${colors.green};
    border-radius: 18px;
    padding: 28px 26px;
    text-align: center;

    h2 {
        font-family: ${fonts.display};
        font-weight: 600;
        font-size: 30px;
        margin: 0 0 10px;
        color: ${colors.dark};
    }
    p { margin: 0; color: ${colors.softInk}; line-height: 1.6; }
`;

export const Again = styled.button`
    margin-top: 18px;
    background: none;
    border: none;
    color: ${colors.orange};
    font-family: ${fonts.body};
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
`;
