import { mission } from '../../lib/mission';
import styled from 'styled-components';
import { color, font, media, type } from '../../styles/theme';

const Frame = styled.figure<{ $object?: boolean }>`
    margin: 0;
    min-width: 0;
    img {
        width: 100%;
        height: auto;
        display: block;
    }
    figcaption {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        font: 400 ${type.caption} / 1.5 ${font.body};
        padding-top: 13px;
    }
    ${({ $object }) => $object && `background: ${color.ivoryDeep}; padding: 24px;`}
    ${media.sm} {
        figcaption {
            font-size: 0.875rem;
            gap: 8px;
        }
    }
`;

type Props = {
    name: string;
    alt: string;
    caption?: string;
    date?: string;
    priority?: boolean;
    object?: boolean;
    className?: string;
    sizes?: string;
    ariaHidden?: boolean;
};

/** Natural proportions keep the action intact. Files are derivatives of the
 * frozen mission library, with source hashes recorded alongside them. */
export default function MissionPhoto({
    name,
    alt,
    caption,
    date,
    priority = false,
    object = false,
    className,
    sizes = '(max-width: 860px) 100vw, 50vw',
    ariaHidden,
}: Props) {
    const nativeWidth = mission[name]?.width ?? 1800;
    const sources = [640, 1200, 1800]
        .map((size) => ({ file: size, width: Math.min(size, nativeWidth) }))
        .filter(
            (entry, index, all) =>
                all.findIndex((item) => item.width === entry.width) === index,
        );
    return (
        <Frame className={className} $object={object} aria-hidden={ariaHidden}>
            <img
                src={`/mission/${name}-1200.webp`}
                srcSet={sources
                    .map(
                        (source) =>
                            `/mission/${name}-${source.file}.webp ${source.width}w`,
                    )
                    .join(', ')}
                sizes={sizes}
                width={mission[name]?.width}
                height={mission[name]?.height}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding="async"
            />
            {caption && (
                <figcaption>
                    <span>{caption}</span>
                    {date && <span>{date}</span>}
                </figcaption>
            )}
        </Frame>
    );
}
