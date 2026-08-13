import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
    dark: '#120E08',
    cream: '#EFE6D4',
    paper: '#F6EFE2',
    paper2: '#F1E8D8',
    paper3: '#ECE0CB',
    orange: '#B45A2B',
    orangeSoft: 'rgba(180,90,43,0.12)',
    gold: '#C7A24E',
    ink08: 'rgba(43,33,23,0.08)',
    ink15: 'rgba(43,33,23,0.15)',
    ink40: 'rgba(43,33,23,0.45)',
    ink70: 'rgba(43,33,23,0.7)',
    fireBg: '#120E08',
    fireText: '#F6EFE2',
    fire60: 'rgba(246,239,226,0.6)',
    success: '#5A9E6F',
};

const fonts = {
    body: "'Figtree', sans-serif",
    display: "'Cormorant Garamond', serif",
};

const bounce = keyframes`
    0%, 80%, 100% { transform: translateY(0); opacity: .35; }
    40% { transform: translateY(-6px); opacity: 1; }
`;

const pulseDot = keyframes`
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: .5; transform: scale(1.3); }
`;

export const PhoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 330px;
    aspect-ratio: 330 / 660;
    border-radius: 42px;
    overflow: hidden;
    background: ${colors.cream};
    box-shadow: 2px 2px 50px 0px rgba(43,33,23,0.3);
`;

export const StatusBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    padding: 15px 25px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${fonts.body};
    border-bottom: 1px solid ${colors.ink15};
`;

export const ChatBar = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    padding: 12px 20px;
    background: ${colors.paper2};
    border-bottom: 1px solid ${colors.ink08};
`;

export const ChatDot = styled.div<{ $accent?: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.paper2};
    border: 1px solid ${colors.ink08};

    ${({ $accent }) =>
        $accent &&
        css`
            background: ${colors.gold};
            border-color: ${colors.gold};
        `}
`;

export const ChatBarLabel = styled.span`
    margin-left: auto;
    font-family: ${fonts.body};
    font-size: 11px;
    font-style: italic;
    color: ${colors.ink40};
`;

export const PhoneBody = styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

export const ChatMsgs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    min-height: 200px;
`;

export const Bubble = styled.div<{ $role: 'ai' | 'user'; $show: boolean }>`
    max-width: 84%;
    padding: 10px 14px;
    border-radius: 14px;
    font-family: ${fonts.body};
    font-size: 13px;
    line-height: 1.55;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 350ms ease, transform 350ms ease;

    ${({ $show }) =>
        $show &&
        css`
            opacity: 1;
            transform: none;
        `}

    ${({ $role }) =>
        $role === 'ai'
            ? css`
                  align-self: flex-start;
                  background: ${colors.paper2};
                  border: 1px solid ${colors.ink08};
                  border-bottom-left-radius: 4px;
              `
            : css`
                  align-self: flex-end;
                  background: ${colors.orange};
                  color: ${colors.cream};
                  border-bottom-right-radius: 4px;
              `}
`;

export const BubbleWho = styled.div<{ $role: 'ai' | 'user' }>`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 4px;
    color: ${({ $role }) => ($role === 'user' ? 'rgba(239,230,212,0.6)' : colors.ink40)};
`;

export const TypingIndicator = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    width: fit-content;
    align-self: flex-start;
    padding: 10px 14px;
    background: ${colors.paper2};
    border: 1px solid ${colors.ink08};
    border-radius: 14px;
    border-bottom-left-radius: 4px;

    span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${colors.ink40};
        animation: ${bounce} 1.4s infinite;
    }
    span:nth-child(2) {
        animation-delay: 0.2s;
    }
    span:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

export const ChatAction = styled.div`
    flex-shrink: 0;
    padding: 12px 16px;
    border-top: 1px solid ${colors.ink08};
    background: ${colors.paper2};
`;

export const ChatPlayButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 46px;
    font-family: ${fonts.body};
    font-size: 13px;
    font-weight: 500;
    color: ${colors.orange};
    background: transparent;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s ease, opacity 0.2s ease;

    &:hover:not(:disabled) {
        background: ${colors.orangeSoft};
    }
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const VoicePanel = styled.div`
    flex-shrink: 0;
    padding: 16px;
    background: ${colors.paper3};
    border-top: 1px solid ${colors.ink08};
`;

export const VoiceLabel = styled.div`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${colors.ink40};
    margin-bottom: 8px;
`;

export const VoiceText = styled.div`
    font-family: ${fonts.display};
    font-size: 15px;
    font-style: italic;
    color: ${colors.dark};
    min-height: 40px;
    line-height: 1.5;
    margin-bottom: 12px;

    .ph {
        font-style: normal;
        font-family: ${fonts.body};
        font-size: 12px;
        color: ${colors.ink40};
    }
`;

export const VoiceRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

export const VoiceMicButton = styled.button<{ $on: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border-radius: 20px;
    font-family: ${fonts.body};
    font-size: 12px;
    font-weight: 500;
    min-height: 38px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1.5px solid ${colors.ink15};
    background: ${colors.cream};
    color: ${colors.dark};

    &:hover:not(:disabled) {
        background: ${colors.ink08};
    }
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    ${({ $on }) =>
        $on &&
        css`
            background: ${colors.orange};
            color: ${colors.cream};
            border-color: ${colors.orange};
            box-shadow: 0 0 0 4px ${colors.orangeSoft};
        `}
`;

export const MicPulse = styled.span<{ $on: boolean }>`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    ${({ $on }) =>
        $on &&
        css`
            animation: ${pulseDot} 1s ease infinite;
        `}
`;

export const VoiceClearButton = styled.button`
    font-family: ${fonts.body};
    font-size: 12px;
    color: ${colors.ink70};
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
`;

export const VoiceHint = styled.span`
    font-family: ${fonts.body};
    font-size: 11px;
    color: ${colors.ink40};
`;

export const MemoryCardReveal = styled.div<{ $show: boolean }>`
    flex-shrink: 0;
    padding: 0 16px 16px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 500ms ease, transform 500ms ease;

    ${({ $show }) =>
        $show &&
        css`
            opacity: 1;
            transform: none;
        `}
`;

export const McIntro = styled.p`
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${colors.ink40};
    margin: 0 0 8px;

    &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${colors.success};
        flex-shrink: 0;
        animation: ${pulseDot} 2s ease infinite;
    }
`;

export const MemoryCard = styled.div`
    background: ${colors.cream};
    border: 1px solid ${colors.ink08};
    border-left: 3px solid ${colors.orange};
    border-radius: 12px;
    padding: 14px;
`;

export const McHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

export const McEra = styled.span`
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${colors.orange};
    background: ${colors.orangeSoft};
    padding: 3px 10px;
    border-radius: 20px;
`;

export const McSaved = styled.span`
    font-family: ${fonts.body};
    font-size: 10px;
    font-weight: 500;
    color: ${colors.ink40};
`;

export const McTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 17px;
    font-weight: 500;
    color: ${colors.dark};
    margin: 0 0 8px;
    line-height: 1.25;
`;

export const McExcerpt = styled.p`
    font-family: ${fonts.display};
    font-size: 13px;
    font-style: italic;
    color: ${colors.ink70};
    line-height: 1.6;
    margin: 0 0 10px;
`;

export const McMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-family: ${fonts.body};
    font-size: 10px;
    color: ${colors.ink40};
`;

export const McSep = styled.span`
    opacity: 0.4;
`;

export const DemoEndCta = styled.div<{ $show: boolean }>`
    flex-shrink: 0;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: opacity 700ms ease, max-height 700ms ease;

    ${({ $show }) =>
        $show &&
        css`
            max-height: 420px;
            opacity: 1;
        `}
`;

export const DemoEndInner = styled.div`
    padding: 20px 18px 18px;
    text-align: center;
    border-top: 1px solid ${colors.ink08};
    background: ${colors.fireBg};
`;

export const DemoEndLabel = styled.p`
    font-family: ${fonts.display};
    font-size: 13px;
    font-style: italic;
    color: ${colors.fire60};
    margin: 0 0 8px;
`;

export const DemoEndTitle = styled.h3`
    font-family: ${fonts.display};
    font-size: 19px;
    font-weight: 500;
    color: ${colors.fireText};
    margin: 0 0 8px;
`;

export const DemoEndSub = styled.p`
    font-family: ${fonts.body};
    font-size: 12px;
    color: ${colors.fire60};
    margin: 0 0 16px;
`;

export const DemoEndActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const DemoEndPrimary = styled(Link)`
    display: inline-block;
    font-family: ${fonts.body};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: ${colors.cream};
    background: ${colors.orange};
    border-radius: 30px;
    padding: 11px 20px;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
        background: #a14e22;
    }
`;

export const DemoEndSecondary = styled(Link)`
    display: inline-block;
    font-family: ${fonts.body};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: ${colors.fireText};
    background: none;
    border: 1px solid rgba(246,239,226,0.3);
    border-radius: 30px;
    padding: 10px 20px;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
        background: rgba(246,239,226,0.1);
    }
`;
