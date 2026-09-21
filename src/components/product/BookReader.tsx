import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import MissionPhoto from "../ui/MissionPhoto";
import { QuietButton } from "../ui/resolved.styles";
import { color, font, media, shadow } from "../../styles/theme";
import { sampleMemory } from "../../lib/sampleMemory";

const forwardTurn = keyframes`from { opacity: .55; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); }`;
const backwardTurn = keyframes`from { opacity: .55; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); }`;
const Dialog = styled.dialog`
  width: min(1240px, calc(100% - 32px));
  max-width: none;
  max-height: calc(100dvh - 32px);
  padding: 0;
  border: 1px solid ${color.primaryLineStrong};
  border-radius: 18px;
  color: ${color.ink};
  background: ${color.ivoryDeep};
  box-shadow: ${shadow.lg};
  overflow: auto;
  overscroll-behavior: contain;
  &::backdrop {
    background: rgba(32, 23, 18, 0.75);
  }
  ${media.sm} {
    width: calc(100% - 16px);
    max-height: calc(100dvh - 16px);
  }
`;
const Toolbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 16px 24px;
  background: ${color.paper};
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid ${color.primaryLineStrong};
  h2 {
    font: 600 1.25rem/1.3 ${font.body};
    margin-right: auto;
  }
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
  }
  select {
    min-height: 44px;
    max-width: 240px;
    border: 1px solid ${color.primaryLineStrong};
    border-radius: 8px;
    background: ${color.paperPure};
    padding: 8px;
    font-size: 1rem;
  }
  ${media.sm} {
    padding: 12px;
    gap: 10px;
    h2 {
      font-size: 1.125rem;
    }
    label {
      width: 100%;
    }
    select {
      flex: 1;
      max-width: none;
      min-width: 0;
    }
  }
`;
const Spread = styled.div<{ $reading: boolean }>`
  display: grid;
  grid-template-columns: ${({ $reading }) => ($reading ? "1fr" : "1fr 1fr")};
  gap: 0;
  margin: 24px;
  background: ${color.paperPure};
  box-shadow: ${shadow.md};
  perspective: 1600px;
  ${media.md} {
    grid-template-columns: 1fr;
    margin: 16px;
  }
  ${({ $reading }) => $reading && "max-width: 760px; margin-inline: auto;"}
`;
const Paper = styled.article<{ $reading: boolean; $backward: boolean }>`
  min-width: 0;
  padding: clamp(24px, 3vw, 44px);
  background: ${color.paperPure};
  min-height: ${({ $reading }) => ($reading ? "0" : "530px")};
  box-shadow: inset -8px 0 18px -18px ${color.primary};
  animation: ${({ $backward }) => ($backward ? backwardTurn : forwardTurn)}
    320ms ease both;
  transform-origin: left center;
  h3 {
    font: 400 clamp(1.75rem, 2vw, 2.5rem) / 1.2 ${font.display};
    margin: 16px 0 24px;
  }
  p {
    font: 400 1.1875rem/1.65 ${font.display};
    margin-top: 22px;
  }
  figure {
    margin: 0 0 20px;
  }
  cite {
    display: block;
    margin-top: 8px;
    font: 500 0.875rem/1.5 ${font.body};
  }
  blockquote {
    margin: 0 0 24px;
  }
  blockquote p {
    margin: 0;
    font-size: 1.5rem;
  }
  .folio {
    display: block;
    margin-top: 28px;
    font-size: 0.875rem;
  }
  ${media.motion} {
    animation: none;
  }
  ${media.md} {
    min-height: 0;
    padding: 24px;
  }
`;
const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 0 24px 24px;
  font-size: 1rem;
`;
const ReaderNote = styled.p`
  padding: 16px 24px 0;
  font-size: 0.875rem;
`;
const chapters = [
  "An afternoon at the lake",
  "The words behind it",
  "More than one version",
  "Still being lived",
];
const Pages: {
  title: string;
  text: string;
  image?: string;
  alt?: string;
  second?: string;
  voices?: boolean;
}[] = [
  {
    title: sampleMemory.title,
    image: sampleMemory.photo,
    alt: "A family at the lake in summer",
    text: sampleMemory.date,
  },
  {
    title: "Beyond the photograph",
    text: "We can see the water, the children and the shore. What we cannot see is what Eleanor was thinking.",
  },
  {
    title: "From the shore",
    text: `Eleanor: “${sampleMemory.openingWords}” A Story: “${sampleMemory.followUp}” Eleanor: “${sampleMemory.response}”`,
  },
  {
    title: "In her own words",
    text: "A family afternoon at the lake, remembered first from the shore. A summary helps us find the memory; the original conversation stays with it.",
  },
  {
    title: "Three accounts",
    voices: true,
    text: "Kept together does not mean remembered the same way.",
  },
  {
    title: "A life still happening",
    image: "22",
    alt: "An adult and child working on a project together",
    text: "The project that took over the table. There is room for the ordinary days, too.",
  },
  {
    title: "Learning by doing",
    image: "25",
    alt: "An adult and child cooking together",
    text: "The way you learned to make it. The person who showed you how. Another afternoon worth keeping.",
  },
  {
    title: "And whatever comes next",
    image: "35",
    alt: "An ordinary scene in a contemporary home",
    text: "The book holds a chapter. The archive keeps growing.",
  },
];
export default function BookReader({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(0);
  const [backward, setBackward] = useState(false);
  const [reading, setReading] = useState(false);
  const [mobile, setMobile] = useState(
    () => window.matchMedia("(max-width: 860px)").matches,
  );
  const [turning, setTurning] = useState(false);
  const turnTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    const element = dialog.current;
    element?.showModal();
    closeButton.current?.focus();
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(max-width: 860px)");
    const change = () => setMobile(query.matches);
    query.addEventListener("change", change);
    return () => {
      clearTimeout(turnTimer.current);
      query.removeEventListener("change", change);
      element?.close();
      document.body.style.overflow = bodyOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  const start = mobile ? page : Math.floor(page / 2) * 2;
  const navigate = (next: number) => {
    if (turning) return;
    setBackward(next < page);
    setPage(Math.max(0, Math.min(7, next)));
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduce) {
      setTurning(true);
      turnTimer.current = setTimeout(() => setTurning(false), 320);
    }
  };
  const shown = reading ? Pages : Pages.slice(start, start + (mobile ? 1 : 2));
  return createPortal(
    <Dialog
      ref={dialog}
      aria-labelledby="reader-title"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            "button:not(:disabled), select, a[href]",
          ),
        ).filter((element) => element.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.target === event.currentTarget &&
          (event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom)
        )
          onClose();
      }}
    >
      <Toolbar>
        <h2 id="reader-title">A chapter you can hold</h2>
        <QuietButton ref={closeButton} onClick={onClose}>
          Close
        </QuietButton>
        <label>
          Contents
          <select
            aria-label="Contents"
            value={Math.floor(page / 2)}
            onChange={(event) => {
              clearTimeout(turnTimer.current);
              setTurning(false);
              setPage(Number(event.target.value) * 2);
              setReading(false);
            }}
          >
            {chapters.map((chapter, index) => (
              <option key={chapter} value={index}>
                {chapter}
              </option>
            ))}
          </select>
        </label>
        <QuietButton
          onClick={() => {
            clearTimeout(turnTimer.current);
            setTurning(false);
            setReading(!reading);
          }}
          aria-pressed={reading}
        >
          {reading ? "Return to pages" : "Read as a story"}
        </QuietButton>
      </Toolbar>
      <ReaderNote>A sample chapter from the example family archive.</ReaderNote>
      <Spread $reading={reading}>
        {shown.map((item, index) => (
          <Paper
            key={`${reading}-${start}-${index}`}
            $reading={reading}
            $backward={backward}
          >
            <h3>{item.title}</h3>
            {item.image && (
              <MissionPhoto
                name={item.image}
                alt={item.alt ?? item.title}
                sizes="(max-width: 860px) 90vw, 40vw"
              />
            )}
            {item.second && (
              <MissionPhoto
                name={item.second}
                alt="An adult and child cooking together"
                sizes="(max-width: 860px) 90vw, 40vw"
              />
            )}
            {item.voices &&
              sampleMemory.voices.map((voice) => (
                <blockquote key={voice.name}>
                  <p>“{voice.quote}”</p>
                  <cite>
                    {voice.name} · {voice.kind}
                  </cite>
                </blockquote>
              ))}
            <p>{item.text}</p>
            <span className="folio">
              {reading ? index + 1 : start + index + 1}
            </span>
          </Paper>
        ))}
      </Spread>
      {!reading && (
        <Controls>
          <QuietButton
            disabled={start === 0 || turning}
            onClick={() => navigate(start - (mobile ? 1 : 2))}
          >
            Previous
          </QuietButton>
          <span aria-live="polite">
            {mobile ? start + 1 : `${start + 1}–${start + 2}`} of 8
          </span>
          <QuietButton
            disabled={start >= (mobile ? 7 : 6) || turning}
            onClick={() => navigate(start + (mobile ? 1 : 2))}
          >
            Next
          </QuietButton>
        </Controls>
      )}
    </Dialog>,
    document.body,
  );
}
