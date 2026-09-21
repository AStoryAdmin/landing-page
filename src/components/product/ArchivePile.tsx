import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MissionPhoto from '../ui/MissionPhoto';
import { color, media } from '../../styles/theme';

const Table = styled.div<{ $spread: boolean }>`
    position: relative;
    height: 620px;
    margin: 36px -16px 0;
    .print {
        position: absolute;
        padding: 9px;
        background: ${color.paperPure};
        box-shadow: 0 4px 12px #3b291d18;
        transition:
            transform 0.8s cubic-bezier(0.2, 0.7, 0.3, 1),
            translate 0.2s;
        border: 0;
        color: ${color.ink};
    }
    .print figcaption {
        padding: 8px 2px 0;
        font-size: 0.8125rem;
    }
    .primary {
        width: 34%;
        z-index: 4;
    }
    .past {
        left: 16%;
        top: 95px;
        transform: rotate(-1.5deg);
    }
    .present {
        left: 48%;
        top: 185px;
        transform: rotate(1.4deg);
    }
    .secondary {
        width: 24%;
        cursor: pointer;
    }
    .secondary figcaption {
        position: absolute;
        bottom: 12px;
        left: 12px;
        right: 12px;
        background: ${color.paper};
        padding: 8px;
        opacity: 0;
        transition: opacity 0.2s;
    }
    .secondary:hover,
    .secondary:focus {
        z-index: 6;
        translate: 0 -6px;
    }
    .secondary:hover figcaption,
    .secondary:focus figcaption {
        opacity: 1;
    }
    .s0 {
        top: 38px;
        left: 0;
        transform: translate(
                ${({ $spread }) => ($spread ? '-4px,-24px' : '26px,16px')}
            )
            rotate(-2deg);
    }
    .s1 {
        top: 0;
        left: 35%;
        width: 19%;
        transform: translateY(${({ $spread }) => ($spread ? 0 : 40)}px)
            rotate(1deg);
    }
    .s2 {
        right: 0;
        top: 20px;
        transform: translateY(${({ $spread }) => ($spread ? 0 : 50)}px)
            rotate(1.5deg);
    }
    .s3 {
        left: 4%;
        top: 260px;
        width: 21%;
        transform: translateX(${({ $spread }) => ($spread ? 0 : 30)}px)
            rotate(1deg);
    }
    .s4 {
        right: 2%;
        top: 305px;
        transform: translateY(${({ $spread }) => ($spread ? 0 : -40)}px)
            rotate(-1deg);
    }
    ${media.md} {
        height: 490px;
        .present {
            top: 170px;
        }
        .s3,
        .s4 {
            top: 240px;
        }
        .past {
            top: 100px;
        }
    }
    ${media.sm} {
        height: 460px;
        margin: 36px 0 0;
        .primary {
            width: 66%;
        }
        .past {
            left: 1%;
            top: 90px;
        }
        .present {
            left: 32%;
            top: 230px;
        }
        .secondary {
            width: 47%;
        }
        .s0 {
            top: 0;
            left: 0;
        }
        .s2 {
            top: 0;
            right: 0;
        }
        .s1,
        .s3,
        .s4 {
            display: none;
        }
        .print {
            padding: 6px;
        }
        .print figcaption {
            font-size: 0.75rem;
        }
    }
    ${media.motion} {
        .print {
            transition: none;
        }
    }
`;
const secondary = [
    [
        '07',
        'A child watching the road from a car window',
        'The ride home · 1977',
    ],
    [
        '12',
        'An ordinary conversation on a wall telephone',
        'A familiar voice · 1981',
    ],
    ['22', 'A child working on a project', 'The project · 2020'],
    ['24', 'A child sleeping on the way home', 'The quiet ride · 2024'],
    ['35', 'An ordinary day carrying laundry', 'Still happening · today'],
];
export default function ArchivePile() {
    const ref = useRef<HTMLDivElement>(null);
    const [spread, setSpread] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setSpread(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.18 },
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return (
        <Table
            ref={ref}
            $spread={spread}
            aria-label="An editing table of everyday photographs"
        >
            <div className="print primary past">
                <MissionPhoto
                    name="05"
                    alt="Hands kneading dough at a flour-covered counter"
                    caption="The work of a meal · 1960"
                    sizes="(max-width:640px) 65vw, 34vw"
                />
            </div>
            <div className="print primary present">
                <MissionPhoto
                    name="21"
                    alt="Hands packing a lunchbox in an ordinary kitchen"
                    caption="The care in a morning · 2018"
                    sizes="(max-width:640px) 65vw, 34vw"
                />
            </div>
            {secondary.map(([name, alt, caption], i) => (
                <div
                    key={name}
                    tabIndex={0}
                    className={`print secondary s${i}`}
                    aria-label={caption}
                >
                    <MissionPhoto
                        name={name}
                        alt={alt}
                        caption={caption}
                        sizes="(max-width:640px) 45vw, 24vw"
                    />
                </div>
            ))}
        </Table>
    );
}
