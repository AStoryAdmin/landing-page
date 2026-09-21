import styled from 'styled-components';
import { type } from '../../styles/theme';
const Figure = styled.figure`
    margin: 0;
    img {
        display: block;
        width: 100%;
        height: auto;
    }
    figcaption {
        padding-top: 12px;
        font-size: ${type.caption};
    }
`;
export default function ConversationPhoto({
    priority = false,
}: {
    priority?: boolean;
}) {
    return (
        <Figure>
            <picture>
                <source
                    media="(max-width: 640px)"
                    srcSet="/supplements/g02mobile-640.webp"
                    width={512}
                    height={640}
                />
                <img
                    src="/supplements/g02desktop-1200.webp"
                    srcSet="/supplements/g02desktop-640.webp 640w, /supplements/g02desktop-1200.webp 1200w"
                    sizes="(max-width:860px) 90vw, 60vw"
                    width={1536}
                    height={1024}
                    alt="A woman talking on her phone at the kitchen table, gesturing with her free hand"
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                />
            </picture>
            <figcaption>A little time to talk.</figcaption>
        </Figure>
    );
}
