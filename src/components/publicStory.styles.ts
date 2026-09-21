import styled from 'styled-components';
import { color, font } from '../styles/theme';

export const Page = styled.main`
    min-height: 100vh;
    background: ${color.ivory};
    color: ${color.ink};
    font-family: ${font.body};
`;

export const Inner = styled.div`
    max-width: 680px;
    margin: 0 auto;
    padding: 48px 20px 80px;
`;

export const Brand = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    letter-spacing: 2px;
    color: ${color.bodyMuted};
    font-size: 14px;
    margin-bottom: 32px;

    b {
        color: ${color.accent};
        font-family: ${font.display};
        font-weight: 700;
    }
`;

export const Hero = styled.div`
    text-align: center;
    margin-bottom: 44px;
`;

export const Avatar = styled.div<{ $img?: string }>`
    width: 108px;
    height: 108px;
    border-radius: 50%;
    margin: 0 auto 18px;
    background: ${({ $img }) => ($img ? `center/cover no-repeat url(${$img})` : 'rgba(180,90,43,0.12)')};
    border: 2px solid rgba(180, 90, 43, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${color.accentText};
    font-family: ${font.display};
    font-size: 42px;
`;

export const Name = styled.h1`
    font-family: ${font.display};
    font-weight: 500;
    font-size: 44px;
    line-height: 1.05;
    margin: 0;
    color: ${color.primaryDeep};
`;

export const Intro = styled.p`
    max-width: 520px;
    margin: 14px auto 0;
    font-size: 18px;
    line-height: 1.6;
    color: ${color.bodyMuted};
`;

export const Timeline = styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
`;

export const MemoryCard = styled.article`
    background: ${color.paper};
    border: 1px solid ${color.primaryLine};
    border-radius: 2px;
    overflow: hidden;
`;

export const MemoryImg = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
`;

export const MemoryBody = styled.div`
    padding: 22px 24px 26px;
`;

export const Era = styled.p`
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 14px;
    font-weight: 700;
    color: ${color.accentText};
    margin: 0 0 8px;
`;

export const MemoryTitle = styled.h2`
    font-family: ${font.display};
    font-weight: 600;
    font-size: 28px;
    line-height: 1.15;
    margin: 0;
    color: ${color.primaryDeep};
`;

export const Period = styled.p`
    font-size: 14px;
    color: ${color.bodyMuted};
    margin: 4px 0 0;
`;

export const MemoryText = styled.p`
    font-size: 18px;
    line-height: 1.7;
    color: ${color.ink};
    margin: 14px 0 0;
    white-space: pre-wrap;
`;

export const SectionTitle = styled.h2`
    font-family: ${font.display};
    font-weight: 500;
    font-size: 34px;
    color: ${color.primaryDeep};
    margin: 56px 0 20px;
    text-align: center;
`;

export const Testimonial = styled.blockquote`
    background: ${color.paper};
    border: 1px solid ${color.primaryLine};
    border-left: 3px solid ${color.accent};
    border-radius: 2px;
    margin: 0 0 16px;
    padding: 20px 22px;
`;

export const TestimonialText = styled.p`
    font-family: ${font.display};
    font-style: italic;
    font-size: 19px;
    line-height: 1.6;
    color: ${color.ink};
    margin: 0;
    white-space: pre-wrap;
`;

export const TestimonialWho = styled.footer`
    font-size: 14px;
    color: ${color.bodyMuted};
    margin-top: 12px;
`;

export const TestimonialPhotos = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;

    img {
        width: 92px;
        height: 92px;
        object-fit: cover;
        border-radius: 8px;
    }
`;

export const Footer = styled.div`
    text-align: center;
    margin-top: 56px;
    color: ${color.bodyMuted};
    font-size: 14px;

    b {
        color: ${color.accent};
        font-family: ${font.display};
        font-weight: 700;
    }
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
    gap: 8px;
    h1 { font-size: clamp(30px, 5vw, 44px); line-height: 1.15; max-width: 22ch; color: ${color.primary}; }
    p { font-size: 18px; max-width: 45ch; line-height: 1.6; }
`;
