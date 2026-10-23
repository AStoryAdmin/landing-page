import styled from "styled-components";
import InceptionBadge from "./InceptionBadge";
import cartesiaBoxed from "../../assets/partners/cartesia-startups-lockup-boxed.svg";
import aaiBoxed from "../../assets/partners/assemblyai-startup-program-lockup-boxed.svg";
import googleBoxed from "../../assets/partners/google-for-startups-lockup-boxed.svg";
import deepgramBoxed from "../../assets/partners/deepgram-startup-program-lockup-boxed.svg";

/**
 * The startup programs A Story belongs to, in one row. NVIDIA's badge
 * is their artwork exactly as issued; the AssemblyAI and Cartesia badges are
 * built in the same 216-unit frame (a white card under a black keyline, with
 * transparent clear space), so at one height the three read as a set and
 * carry their own white ground onto dark sections.
 *
 * Claims stay at membership and grant status: never "backed by",
 * "supported by" or "partner".
 */
const BOXED = [
  { src: googleBoxed, alt: "Google for Startups", ratio: 721.084 / 216 },
  { src: aaiBoxed, alt: "AssemblyAI Startup Program", ratio: 1077.226 / 216 },
  { src: deepgramBoxed, alt: "Deepgram Startup Program", ratio: 1036.008 / 216 },
  { src: cartesiaBoxed, alt: "Cartesia Startups grant recipient", ratio: 1089.578 / 216 },
];

const Row = styled.span<{ $h: number }>`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  /* The same clear space InceptionBadge gives NVIDIA's artwork. */
  .boxed {
    display: inline-flex;
    padding: calc(${({ $h }) => $h}px * 0.22);
  }
  .boxed img {
    display: block;
    width: auto;
    height: ${({ $h }) => Math.max(30, $h)}px;
  }
`;

type Props = {
  /** Rendered height of each badge in px, as for InceptionBadge. */
  height?: number;
  className?: string;
};

export default function ProgramMarks({ height = 36, className }: Props) {
  const h = Math.max(30, height);
  return (
    <Row className={className} $h={height}>
      <InceptionBadge height={height} />
      {BOXED.map((b) => (
        <span className="boxed" key={b.alt}>
          <img src={b.src} alt={b.alt} width={Math.round(h * b.ratio)} height={h} decoding="async" />
        </span>
      ))}
    </Row>
  );
}
