/**
 * "Where we're going" (Plan 2, section 4), on Home near the close and on
 * Our story before the close. One honest paragraph on the company's
 * direction: today a biographer that listens; next, with every family's
 * opt-in, the family's memory, answered in the person's real recorded voice.
 *
 * The words are fixed by the plan. Say "we don't generate a person's words
 * or voice"; never promise a date, and never describe a synthetic voice.
 * Built from the kit (Chapter, SplitHead, Eyebrow, Statement) so it sits in
 * the site's own type and spacing.
 */
import { useReveals } from "./reveals";
import { Chapter, Eyebrow, Frame, SplitHead, Statement } from "./kit.styles";
import type { Ground } from "./kit.styles";

const WHERE_WE_ARE_GOING =
  "Today, A Story is a biographer that listens. Next, with every family’s opt-in, it becomes the family’s memory: ask what Grandpa said about his first job and hear his real recorded answer. We don’t generate a person’s words or voice.";

export default function WhereWeAreGoing({
  ground = "paper",
  id = "where-we-are-going",
}: {
  ground?: Ground;
  id?: string;
}) {
  const ref = useReveals<HTMLElement>();
  return (
    <Chapter ref={ref} $ground={ground} $tight aria-labelledby={`${id}-title`}>
      <Frame>
        <SplitHead style={{ marginBottom: 0 }}>
          <div>
            <Eyebrow>Where we’re going</Eyebrow>
            <Statement id={`${id}-title`} $size="lg" data-lines>
              A biographer today. The family’s memory <em>next.</em>
            </Statement>
          </div>
          <p data-rise>{WHERE_WE_ARE_GOING}</p>
        </SplitHead>
      </Frame>
    </Chapter>
  );
}
