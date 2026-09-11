import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { color, font, media, radius, shadow, space, tracking, type, weight } from '../../styles/theme';
import { buyLabel, checkoutFor } from '../../lib/checkout';
import { PRICE } from '../../lib/pricing';

/**
 * A buy bar that arrives once the reader is past the hero.
 *
 * On a phone the price and the button are thousands of pixels apart, and the
 * navbar's own call to action scrolls away with it — so by the time somebody
 * has read enough to be persuaded there is nothing on screen to act on. This
 * follows them down instead.
 *
 * Deliberately phone-only: on a desktop the header stays in view and a fixed
 * bar would just cover the page.
 */

const rise = keyframes`
  from { transform: translateY(100%); }
  to   { transform: none; }
`;

const Bar = styled.div`
    display: none;

    ${media.md} {
        display: flex;
        position: fixed;
        z-index: 40;
        inset-inline: 0;
        bottom: 0;
        align-items: center;
        justify-content: space-between;
        gap: ${space.md};
        padding: 12px ${space.gutter} calc(12px + env(safe-area-inset-bottom, 0px));
        background: ${color.primaryDeep};
        border-top: 1px solid rgba(243, 235, 221, 0.16);
        box-shadow: ${shadow.lg};
        animation: ${rise} 260ms cubic-bezier(0.22, 0.61, 0.36, 1) both;

        ${media.motion} { animation: none; }
    }
`;

const Copy = styled.div`
    min-width: 0;

    .price {
        font-family: ${font.display};
        font-size: 1.5rem;
        font-weight: ${weight.light};
        line-height: 1;
        color: ${color.goldText};
    }

    .what {
        margin-top: 2px;
        font-size: ${type.caption};
        line-height: 1.3;
        color: ${color.onDarkMuted};
    }
`;

const Go = styled.a`
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0 ${space.lg};
    border-radius: ${radius.pill};
    background: ${color.accent};
    color: ${color.paperPure};
    font-size: ${type.xs};
    font-weight: ${weight.semibold};
    letter-spacing: ${tracking.wide};
    text-decoration: none;

    &:hover { background: ${color.accentHover}; }
`;

/**
 * Keeps the bar from covering the last of the page. Rendered as a sibling so
 * the reserved space collapses on desktop with the bar itself.
 */
const Spacer = styled.div`
    display: none;
    ${media.md} { display: block; height: 76px; }
`;

/* There was a `label` prop here, which named the plan in the mailto subject.
   The bar now goes to /start, which carries the plan in its query string. */
const BuyBar = ({ planId = 'one' }: { planId?: string }) => {
    const [shown, setShown] = useState(false);

    useEffect(() => {
        /* Roughly the height of the hero — past it, the reader is engaged. */
        const onScroll = () => setShown(window.scrollY > 640);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!shown) return null;

    return (
        <>
            <Spacer aria-hidden="true" />
            <Bar>
                <Copy>
                    <p className="price">{PRICE.headline}<span className="per">/year</span></p>
                    <p className="what">3 days free first · cancel any time</p>
                </Copy>
                <Go href={checkoutFor(planId)}>
                    {buyLabel(planId, 'Buy now', 'Get started')}
                </Go>
            </Bar>
        </>
    );
};

export default BuyBar;
