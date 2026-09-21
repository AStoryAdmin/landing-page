import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/theme';

const Wrapper = styled.div<{
    $visible: boolean;
    $delay: number;
    $shift: number;
}>`
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transform: translateY(
        ${({ $visible, $shift }) => ($visible ? 0 : $shift)}px
    );
    transition:
        opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1)
            ${({ $delay }) => $delay}ms,
        transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)
            ${({ $delay }) => $delay}ms;
    will-change: opacity, transform;

    ${media.motion} {
        opacity: 1;
        transform: none;
        transition: none;
    }
`;

type Props = {
    children: React.ReactNode;
    /** Stagger, in ms, for items revealed as a group. */
    delay?: number;
    /** Distance traveled on entry. */
    shift?: number;
    className?: string;
};

/**
 * Reveal is an enhancement, so anything that cannot animate starts visible:
 * no IntersectionObserver, or a reader who has asked for reduced motion.
 */
const startsVisible = () =>
    typeof window === 'undefined' ||
    typeof IntersectionObserver === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fades content in the first time it enters the viewport, then unobserves — so
 * scrolling back up never re-animates.
 */
const Reveal = ({ children, delay = 0, shift = 18, className }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(startsVisible);

    useEffect(() => {
        const node = ref.current;
        if (!node || startsVisible()) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0, rootMargin: '0px 0px 60px 0px' },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Wrapper
            ref={ref}
            className={className}
            $visible={visible}
            $delay={delay}
            $shift={shift}
        >
            {children}
        </Wrapper>
    );
};

export default Reveal;
