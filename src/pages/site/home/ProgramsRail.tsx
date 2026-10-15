/**
 * The startup programs, as one labelled line under the hero.
 *
 * Hallmark redesign, 2026-10-14. The three badges had sat unlabelled at the
 * foot of the hero photograph, where three white cards on a dark dinner
 * table read as stickers rather than credentials, and competed with the
 * Reserve button for the same glance. Here they sit on the ivory ground they
 * were drawn for, at one height, with a plain label and the way through to
 * /programs, at the top of the first chapter — the visitor meets them right
 * after the promise, without them standing in its way.
 *
 * Wording stays at membership and grant status, as ProgramMarks requires:
 * never "backed by", "supported by" or "partner".
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProgramMarks from "../../../components/ui/ProgramMarks";
import { ArrowIcon } from "../kit/kit";
import { color, font, media } from "../../../styles/theme";

const Rail = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px clamp(16px, 2.4vw, 36px);
  padding-bottom: calc(clamp(20px, 2.4vw, 32px) * var(--sy));
  margin-bottom: calc(clamp(36px, 4.4vw, 72px) * var(--sy));
  border-bottom: 1px solid ${color.primaryLine};

  .label {
    font: 500 15px/1.4 ${font.body};
    color: ${color.bodyMuted};
    white-space: nowrap;
  }
  .marks {
    display: inline-flex;
    margin-inline: -6px;
  }
  .more {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    font: 600 14px/1.3 ${font.body};
    color: ${color.primary};
    text-decoration: none;
    white-space: nowrap;
    background: linear-gradient(currentColor, currentColor) 0 calc(100% - 10px) / 100% 1px no-repeat;
    transition: background-size 460ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .more svg {
    width: 14px;
    height: 14px;
  }
  @media (hover: hover) and (pointer: fine) {
    .more:hover {
      background-size: 0 1px;
      background-position: 100% calc(100% - 10px);
    }
  }
  .more:focus-visible {
    transition: none;
  }
  ${media.md} {
    .more {
      margin-left: 0;
    }
  }
  ${media.motion} {
    .more {
      transition: none;
    }
  }
`;

export default function ProgramsRail() {
  return (
    <Rail>
      <span className="label">Startup programs &amp; grants</span>
      <span
        className="marks"
        role="img"
        aria-label="NVIDIA Inception program member, AssemblyAI Startup Program, Cartesia Startups grant recipient"
      >
        <ProgramMarks height={48} />
      </span>
      <Link className="more" to="/programs">
        What these are <ArrowIcon />
      </Link>
    </Rail>
  );
}
