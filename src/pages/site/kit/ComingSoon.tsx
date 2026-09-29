/**
 * "Coming soon on the App Store".
 *
 * Our own pill, not Apple's badge. Apple's "Download on the App Store" and
 * "Pre-order on the App Store" artwork may only be used as a link to a real
 * App Store listing, and there is none yet — so until there is, this says
 * the same thing in the site's own type and no Apple mark.
 *
 * The day the app is up for pre-order in App Store Connect (possible up to
 * 180 days before release — and every pre-order there is one more number to
 * show), put the listing URL in APP_STORE_URL and this becomes a link.
 *
 * It takes its colours from the ground it stands on (--ink, --label), so the
 * same pill works on the night opening and on ivory.
 */
import styled from "styled-components";
import { color, font } from "../../../styles/theme";

export const APP_STORE_URL = "";

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px 10px 14px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--ink, ${color.primary}) 30%, transparent);
  font: 600 12px/1 ${font.body};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink, ${color.primary});
  text-decoration: none;

  svg {
    width: 16px;
    height: 16px;
    color: var(--label, ${color.accentText});
  }
  b {
    font-weight: 600;
    color: var(--label, ${color.accentText});
  }
`;

const PhoneIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="5.5" y="1.75" width="9" height="16.5" rx="2" />
    <path d="M9 15.25h2" strokeLinecap="round" />
  </svg>
);

export default function ComingSoon({ className }: { className?: string }) {
  return APP_STORE_URL ? (
    <Pill as="a" href={APP_STORE_URL} className={className}>
      <PhoneIcon /> Pre-order on the <b>App Store</b>
    </Pill>
  ) : (
    <Pill className={className}>
      <PhoneIcon /> Coming soon on the <b>App Store</b>
    </Pill>
  );
}
