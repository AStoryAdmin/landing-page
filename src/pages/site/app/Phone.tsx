/**
 * The A Story app, drawn in HTML for the website.
 *
 * Earlier passes showed the product as abstract cards and transcripts; the
 * founder's Figma already defines what the app looks like — the chocolate
 * header with its curved foot, the greeting, the week strip, the question of
 * the day, tinted memory cards, the memory page with its photo sheet and
 * voice bar, the archive with the family-review banner. These components
 * rebuild those screens so every product moment on the site is recognisably
 * the real app.
 *
 * Everything inside the screen is sized in container units (`cqw`), so one
 * phone scales cleanly from a 220px thumbnail to a 420px hero without a
 * second layout. Screens are illustrations: they are `aria-hidden` unless a
 * scene gives them a label, and the words in them come from the example data.
 */
import type { ReactNode } from "react";
import styled from "styled-components";
import { mission } from "../../../lib/mission";
import { color, font } from "../../../styles/theme";

/*
 * The frame is sized from its own width: an outer wrapper is the size
 * container, so bezel, corner radius and island are all in `cqw` and stay in
 * proportion at any size. (Pass 11 mixed percentage radii on the frame and the
 * screen, which drew a lumpy, uneven bezel — thick at the corners.) The bezel
 * is thin and near-black with a warm metal edge, like the real device.
 */
const Device = styled.div<{ $w: string }>`
  width: ${({ $w }) => $w};
  max-width: 100%;
  flex: none;
  container-type: inline-size;
  .frame {
    position: relative;
    aspect-ratio: 390 / 820;
    padding: 2.4cqw;
    border-radius: 15cqw;
    background: ${color.black};
    box-shadow:
      inset 0 0 0 0.5cqw
        color-mix(in srgb, ${color.warmGold} 22%, ${color.black}),
      inset 0 0 0 0.9cqw ${color.black},
      0 1px 0 color-mix(in srgb, ${color.ivory} 18%, transparent),
      0 2px 3px rgba(20, 12, 6, 0.25),
      0 50px 90px -40px rgba(20, 12, 6, 0.7);
  }
  /* Side buttons, barely there. */
  .frame::before,
  .frame::after {
    content: "";
    position: absolute;
    width: 0.8cqw;
    border-radius: 1cqw;
    background: color-mix(in srgb, ${color.warmGold} 18%, ${color.black});
  }
  .frame::before {
    left: -0.6cqw;
    top: 22%;
    height: 12%;
  }
  .frame::after {
    right: -0.6cqw;
    top: 28%;
    height: 16%;
  }
  .screen {
    position: relative;
    height: 100%;
    overflow: hidden;
    border-radius: 12.8cqw;
    background: ${color.ivory};
    container-type: inline-size;
    color: ${color.primary};
    font-family: ${font.body};
  }
  /* Dynamic island. */
  .island {
    position: absolute;
    z-index: 5;
    top: 2.8cqw;
    left: 50%;
    width: 29cqw;
    height: 8cqw;
    transform: translateX(-50%);
    border-radius: 99px;
    background: ${color.black};
  }
  .status {
    position: absolute;
    z-index: 4;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 5.4cqw 8cqw 0;
    font: 600 3.6cqw/1 ${font.body};
    color: inherit;
  }
  .status.light {
    color: ${color.ivory};
  }
  .home-bar {
    position: absolute;
    z-index: 5;
    bottom: 2.2cqw;
    left: 50%;
    width: 34cqw;
    height: 1.2cqw;
    min-height: 3px;
    transform: translateX(-50%);
    border-radius: 99px;
    background: rgba(30, 20, 14, 0.35);
  }
`;

/** A phone around a screen. `lightStatus` for screens with a dark top. */
export function Phone({
  children,
  width = "360px",
  lightStatus = false,
  label,
  className,
  interactive = false,
}: {
  children: ReactNode;
  width?: string;
  lightStatus?: boolean;
  label?: string;
  className?: string;
  /** The screen holds real controls (a Play button): a labelled region, not a picture. */
  interactive?: boolean;
}) {
  return (
    <Device
      $w={width}
      className={className}
      role={interactive ? "group" : label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label || interactive ? undefined : true}
      inert={!label && !interactive}
    >
      <div className="frame">
        <div className="screen">
          <span className="island" />
          <div className={`status ${lightStatus ? "light" : ""}`}>
            <span>9:41</span>
            <span>●●● ▮</span>
          </div>
          {children}
          <span className="home-bar" />
        </div>
      </div>
    </Device>
  );
}

/** A library photograph at a fixed small size, for use inside screens. */
export function AppPhoto({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const dim = mission[id];
  return (
    <img
      className={className}
      src={`/mission/${id}-640.webp`}
      width={dim?.width}
      height={dim?.height}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}

const ShotImg = styled.img<{ $scroll: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: block;
  /* A tall screen scrolls slowly inside the phone, the way someone browses it. */
  @media (prefers-reduced-motion: no-preference) {
    animation: ${({ $scroll }) => ($scroll ? "shot-scroll 16s 1.5s ease-in-out infinite alternate" : "none")};
  }
  @keyframes shot-scroll {
    0%,
    12% {
      transform: translateY(0);
    }
    88%,
    100% {
      transform: translateY(calc(-100% + 216cqw));
    }
  }
`;

/* Once a scrolling screen moves, the status bar needs a ground of its own —
   the Figma screens are drawn without one. Fades in with the scroll. */
const ShotBand = styled.span`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: 13cqw;
  background: ${color.ivory};
  opacity: 0;
  @media (prefers-reduced-motion: no-preference) {
    animation: shot-band 16s 1.5s ease-in-out infinite alternate;
  }
  @keyframes shot-band {
    0%,
    10% {
      opacity: 0;
    }
    16%,
    100% {
      opacity: 1;
    }
  }
`;

/**
 * A screen exported from the founder's Figma file (public/app, rendered from
 * "APP A Story Us 2026 for Web.pdf"). Real screens where they exist; the
 * HTML screens in screens.tsx are for moments the file doesn't draw.
 */
export function AppShot({
  name,
  scroll = false,
}: {
  name: string;
  scroll?: boolean;
}) {
  return (
    <>
      <ShotImg
        src={`/app/${name}.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        $scroll={scroll}
      />
      {scroll && <ShotBand aria-hidden="true" />}
    </>
  );
}
