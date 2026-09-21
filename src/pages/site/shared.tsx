import styled from "styled-components";
import { mission } from "../../lib/mission";
import Logo from "../../components/ui/Logo";
import { color, font } from "../../styles/theme";
export function Wordmark({ light = false }: { light?: boolean }) {
  return <Logo height={44} tone={light ? "dark" : "light"} />;
}
const Figure = styled.figure`
  margin: 0;
  min-width: 0;
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  figcaption {
    font: 400 14px/1.5 ${font.body};
    color: ${color.bodyMuted};
    margin-top: 12px;
  }
`;
export function Photo({
  id,
  alt,
  caption,
  priority = false,
  sizes = "(max-width: 860px) 90vw, 50vw",
  className = "",
}: {
  id: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const dim = mission[id];
  const widths = [640, 1200, 1800]
    .map((file) => ({ file, width: Math.min(file, dim.width) }))
    .filter((x, i, a) => a.findIndex((y) => y.width === x.width) === i);
  return (
    <Figure className={className}>
      <img
        src={`/mission/${id}-1200.webp`}
        srcSet={widths
          .map((x) => `/mission/${id}-${x.file}.webp ${x.width}w`)
          .join(", ")}
        sizes={sizes}
        width={dim.width}
        height={dim.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </Figure>
  );
}

