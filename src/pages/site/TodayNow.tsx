/**
 * "Today": what works now and what comes by invite, said once, the same way,
 * on /how-it-works, /pricing and /for-families (phone-first plan,
 * docs/plans/2026-11-04-phone-first-overnight.md task 4).
 *
 * Every line is already on the site; nothing here is a new fact:
 *   the calls     lib/today.ts:13 ("Today the calls ring in the A Story
 *                 iPhone app, in a private beta"), faqData.ts:69 ("we help
 *                 you set it up"), plan :16 (by invite)
 *   the family    faqData.ts:40 (family code or link), :44 (one link, no
 *                 account), :69 (any browser), lib/pricing.ts:113 (invite
 *                 the whole family to read and contribute, free)
 *   the book      HowItWorks.tsx volume ("Print it at home free, or order a
 *                 printed edition ... once ordering opens"), Pricing.tsx
 *                 PriceCard ("To print at home, every page")
 * No dates, no counts, no devices beyond the iPhone.
 */
import styled from "styled-components";
import { START_HREF, START_LABEL } from "../../lib/app";
import { color, display, font, media, space, type } from "../../styles/theme";
import { Chapter, Frame, TextAnchor } from "./kit/kit.styles";
import type { Ground } from "./kit/kit.styles";

const TODAY_ROWS: { k: string; when: string; d: string }[] = [
  {
    k: "The calls",
    when: "By invite",
    d: "A Story rings in its iPhone app, in a private beta. Ask for an invite, and we help you set it up.",
  },
  {
    k: "The family",
    when: "Works now",
    d: "Once your family is in, everyone reads and adds through the family’s code or link, in any browser, free.",
  },
  {
    k: "The book",
    when: "Works now",
    d: "Print it at home, free, every page. Printed editions come once ordering opens.",
  },
];

const Shell = styled(Chapter)`
  padding-block: calc(${space.xl} * var(--sy));
  .today {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    gap: ${space.md} ${space.xxl};
    align-items: start;
    padding-top: ${space.lg};
    border-top: 1px solid var(--line);
  }
  h2 {
    font: 600 ${display.sm} / 1.18 ${font.display};
    color: var(--ink);
    text-wrap: balance;
  }
  .today > div > p {
    margin-top: ${space.sm};
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, ${color.body});
    max-width: 34ch;
  }
  dl {
    margin: 0;
    display: grid;
    gap: ${space.md};
  }
  dl > div {
    display: grid;
    grid-template-columns: 9.5em minmax(0, 1fr);
    gap: ${space.xs} ${space.md};
    align-items: baseline;
  }
  dt {
    font: 600 ${type.read} / 1.4 ${font.display};
    color: var(--ink);
  }
  dt small {
    display: block;
    font: 400 ${type.note} / 1.4 ${font.text};
    font-style: italic;
    color: ${color.accentText};
  }
  dd {
    margin: 0;
    font: 400 ${type.read} / 1.55 ${font.text};
    color: var(--text, ${color.body});
    max-width: 52ch;
  }
  .act {
    margin-top: ${space.md};
  }
  ${media.md} {
    .today {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  ${media.sm} {
    dl > div {
      grid-template-columns: minmax(0, 1fr);
      gap: 2px;
    }
    dt small {
      display: inline;
      margin-left: 0.5em;
    }
  }
`;

export default function TodayNow({
  ground = "ivory",
  action = true,
}: {
  ground?: Ground;
  /** The one action as a quiet link under the heading. */
  action?: boolean;
}) {
  return (
    <Shell $ground={ground} $tight id="today" aria-labelledby="today-title">
      <Frame className="today">
        <div>
          <h2 id="today-title">Where A Story is today</h2>
          <p>The calls are the part that comes by invite. The rest works now.</p>
          {action && (
            <p className="act">
              <TextAnchor href={START_HREF}>{START_LABEL}</TextAnchor>
            </p>
          )}
        </div>
        <dl>
          {TODAY_ROWS.map((r) => (
            <div key={r.k}>
              <dt>
                {r.k}
                <small>{r.when}</small>
              </dt>
              <dd>{r.d}</dd>
            </div>
          ))}
        </dl>
      </Frame>
    </Shell>
  );
}
