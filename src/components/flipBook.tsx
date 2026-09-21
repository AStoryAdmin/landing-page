import { useState } from 'react';
import {
    BookContainer,
    BookWrapper,
    CompactBook,
    CompactPhoto,
    CompactText,
    Controls,
    LeftPage,
    Page,
    PageButton,
    PageContent,
    PageCount,
    PageHeading,
    PageImage,
    PageNumber,
    PageQuote,
} from './flipBook.styles';
import useMediaQuery from '../hooks/useMediaQuery';

type PageData = {
    image: string;
    alt: string;
    heading: string;
    quote: string;
    pageNumber: string;
};

const pages: PageData[] = [
    {
        image: '/mission/01-1200.webp',
        alt: 'A couple standing on the porch of their home',
        heading: '1952 — On the porch',
        quote: '“It was small, but everyone knew which window was ours because my mother kept basil on the sill.”',
        pageNumber: 'Page 1',
    },
    {
        image: '/mission/02-1200.webp',
        alt: 'A bride and groom at the wedding cake',
        heading: '1961 — The wedding',
        quote: '“It rained all morning. By noon, the sun came out like it had been waiting for us.”',
        pageNumber: 'Page 2',
    },
    {
        image: '/mission/11-1200.webp',
        alt: 'A family playing cards around a table',
        heading: '1962 — Around the table',
        quote: '“Everyone talked over everyone. That was how you knew the house was full.”',
        pageNumber: 'Page 3',
    },
    {
        image: '/mission/03-1200.webp',
        alt: 'A station wagon outside the family home',
        heading: '1973 — A place of our own',
        quote: '“Nobody planned that photo. That is why I love it.”',
        pageNumber: 'Page 4',
    },
    {
        image: '/mission/04-1200.webp',
        alt: 'A young woman in her graduation gown',
        heading: '1994 — Graduation day',
        quote: '“Nobody planned that photo. That is why I love it.”',
        pageNumber: 'Page 5',
    },
    {
        image: '/mission/33-1200.webp',
        alt: 'An older mother talking with her adult son',
        heading: 'Today — Still telling it',
        quote: '“Ask me anything. I remember more than you think.”',
        pageNumber: 'Page 6',
    },
];

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <polyline
            points={dir === 'left' ? '15 5 8 12 15 19' : '9 5 16 12 9 19'}
        />
    </svg>
);

/**
 * A sample album spread. The pages themselves are clickable, but the real
 * controls are the buttons below — they are focusable, labeled, and work
 * without a mouse, which the page turn alone never did.
 */
const FlipBook = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const compact = useMediaQuery('(max-width: 700px)');

    const goNext = () =>
        setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
    const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 0));

    const page = pages[currentPage];

    return (
        <BookContainer>
            {compact ? (
                <CompactBook>
                    <CompactPhoto>
                        <PageImage
                            src={page.image}
                            alt={page.alt}
                            loading="lazy"
                            decoding="async"
                        />
                    </CompactPhoto>
                    <CompactText>
                        <PageHeading>{page.heading}</PageHeading>
                        <PageQuote>{page.quote}</PageQuote>
                        <PageNumber>{page.pageNumber}</PageNumber>
                    </CompactText>
                </CompactBook>
            ) : (
                <BookWrapper
                    role="group"
                    aria-roledescription="photo album"
                    aria-label="A sample A Story keepsake album"
                >
                    <LeftPage onClick={goPrev} aria-hidden="true">
                        <PageImage
                            src={page.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                        />
                    </LeftPage>

                    {pages.map((p, index) => {
                        const isFlipped = index < currentPage;
                        return (
                            <Page
                                key={p.pageNumber}
                                $isFlipped={isFlipped}
                                /* zIndex is a stack — the next page sits on top. */
                                style={{
                                    zIndex: isFlipped
                                        ? index
                                        : pages.length - index,
                                }}
                                onClick={isFlipped ? goPrev : goNext}
                                aria-hidden="true"
                            >
                                <PageContent>
                                    <PageHeading>{p.heading}</PageHeading>
                                    <PageQuote>{p.quote}</PageQuote>
                                    <PageNumber>{p.pageNumber}</PageNumber>
                                </PageContent>
                            </Page>
                        );
                    })}
                </BookWrapper>
            )}

            <Controls>
                <PageButton
                    type="button"
                    onClick={goPrev}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                >
                    <Chevron dir="left" />
                </PageButton>
                <PageCount aria-live="polite">
                    {currentPage + 1} of {pages.length}
                </PageCount>
                <PageButton
                    type="button"
                    onClick={goNext}
                    disabled={currentPage === pages.length - 1}
                    aria-label="Next page"
                >
                    <Chevron dir="right" />
                </PageButton>
            </Controls>

            {/* The 3D spread is decorative; this is the same content, readable. */}
            {!compact && (
                <p className="sr-only">
                    {page.heading}. {page.quote} {page.alt}.
                </p>
            )}
        </BookContainer>
    );
};

export default FlipBook;
