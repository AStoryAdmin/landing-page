import styled from "styled-components";
import { color, font, radius } from "../../styles/theme";
import badgeColor from "../../assets/partners/nvidia-inception-program-badge-rgb-for-screen.svg";
import badgeMono from "../../assets/partners/nvidia-inception-program-badge-rgb-1c-blk-for-screen.svg";

/**
 * NVIDIA Inception member badge.
 *
 * The artwork is NVIDIA's, taken unaltered from the badge pack they issue to
 * members — their guidelines forbid recreating it, recolouring it, changing
 * its proportions or touching the text inside, so the files in
 * `assets/partners/` are byte-for-byte what was downloaded and are never
 * passed through an optimiser.
 *
 * One detail drives every placement: the badge carries its own white card.
 * A white rect is part of the drawing, under a black keyline, so the badge is
 * already a mounted object and must never be given a second frame. What a
 * page owes it is clear space, nothing else.
 */
const SRC = { color: badgeColor, mono: badgeMono } as const;

/** NVIDIA's artwork is 500.4288 x 216. */
const RATIO = 500.4288 / 216;

/**
 * Clear space is a condition of the licence rather than a style choice, so it
 * is padding on the frame — a margin could be collapsed by a parent.
 */
const Mounted = styled.span<{ $h: number }>`
  display: inline-flex;
  align-items: center;
  padding: calc(${({ $h }) => $h}px * 0.22);
  img {
    /* Never below NVIDIA's 30px digital minimum. */
    height: ${({ $h }) => Math.max(30, $h)}px;
    width: auto;
  }
`;

/**
 * Kept for the case where the artwork is unavailable — a stripped build, a
 * blocked asset. Deliberately typographic: no mark, no green, nothing that
 * could be taken for NVIDIA's drawing, just the sentence they approve.
 */
const Engraved = styled.span`
  display: inline-flex;
  align-items: baseline;
  gap: 0.5ch;
  padding: 10px 16px;
  border: 1px solid var(--line, ${color.primaryLineStrong});
  border-radius: ${radius.sm};
  font: 400 13px/1.3 ${font.body};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted, ${color.bodyMuted});
  white-space: nowrap;
  strong {
    font-weight: 600;
    letter-spacing: 0.1em;
    color: var(--ink, ${color.ink});
  }
`;

type Props = {
  /** Full colour is NVIDIA's primary; mono is for single-colour contexts. */
  variant?: "color" | "mono";
  /** Rendered height in px. Held at or below the A Story logo beside it. */
  height?: number;
  className?: string;
};

export default function InceptionBadge({
  variant = "color",
  height = 36,
  className,
}: Props) {
  const src = SRC[variant];
  if (!src) {
    return (
      <Engraved className={className} data-fallback="">
        <strong>NVIDIA Inception</strong> Program Member
      </Engraved>
    );
  }
  const h = Math.max(30, height);
  return (
    <Mounted className={className} $h={height}>
      <img
        src={src}
        alt="NVIDIA Inception Program member"
        width={Math.round(h * RATIO)}
        height={h}
        decoding="async"
      />
    </Mounted>
  );
}

/**
 * The attribution NVIDIA require wherever their marks appear. Exported so it
 * lives in exactly one place — the foot of the site — rather than under every
 * mention.
 */
export const NVIDIA_TRADEMARK_NOTE = `© ${new Date().getFullYear()} NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.`;
