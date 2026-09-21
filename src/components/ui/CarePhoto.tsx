import styled from 'styled-components';
const Figure = styled.figure`
    margin: 0;
    img {
        display: block;
        width: 100%;
        height: auto;
    }
    figcaption {
        font-size: 0.875rem;
        margin-top: 12px;
    }
`;
export default function CarePhoto({
    caption = false,
    priority = false,
}: {
    caption?: boolean;
    priority?: boolean;
}) {
    return (
        <Figure>
            <picture>
                <source
                    width="1122"
                    height="1402"
                    media="(max-width:640px)"
                    srcSet="/supplements/care-mobile-640.webp 640w, /supplements/care-mobile-1200.webp 1122w"
                />
                <img
                    src="/supplements/care-desktop-1200.webp"
                    srcSet="/supplements/care-desktop-640.webp 640w, /supplements/care-desktop-1200.webp 1200w, /supplements/care-desktop-1536.webp 1536w"
                    sizes="(max-width:860px) 100vw, 60vw"
                    width="1536"
                    height="1024"
                    loading={priority ? 'eager' : 'lazy'}
                    alt="An older woman shares a family photograph with her daughter and a listening community staff member"
                />
            </picture>
            {caption && (
                <figcaption>
                    A conversation in a care community · illustrative
                </figcaption>
            )}
        </Figure>
    );
}
