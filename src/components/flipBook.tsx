import { useState } from 'react';
import {BookContainer, BookWrapper, LeftPage, Page, PageContent, PageImage, PageHeading, PageQuote, PageNumber} from './flipBook.styles';
import album1952 from './../assets/album1952.png';
import album1961 from './../assets/album1961.png';
import album1962 from './../assets/album1962.png';
import album1973 from './../assets/album1973.png';
import album1994 from './../assets/album1994.png';
import album2026 from './../assets/album2026.png';

type PageData = {
    image: string;
    heading: string;
    quote: string;
    pageNumber: string;
};

const pages: PageData[] = [
    {
        image: album1952,
        heading: '1952 — Outside Kraków',
        quote: '"Our house was small, but everyone knew which window was ours because my mother kept basil on the sill."',
        pageNumber: 'Page 1',
    },
    {
        image: album1961,
        heading: '1961 — The church dance',
        quote: '"Joe spilled punch on my dress and looked so embarrassed I had to laugh. He said, \'Dance with me so no one notices.\'"',
        pageNumber: 'Page 2',
    },
    {
        image: album1962,
        heading: "1962 — St. Mary's",
        quote: '"It rained all morning. By noon, the sun came out like it had been waiting for us."',
        pageNumber: 'Page 3',
    },
    {
        image: album1973,
        heading: "1973 — Sunday mornings",
        quote: '"Everyone talked over everyone. That was how you knew the house was full."',
        pageNumber: 'Page 4',
    },
    {
        image: album1994,
        heading: "1994 — Four generations",
        quote: '"Nobody planned that photo. That is why I love it."',
        pageNumber: 'Page 5',
    },
    {
        image: album2026,
        heading: "2026 — Still telling the story",
        quote: '"Ask me anything. I remember more than you think."',
        pageNumber: 'Page 6',
    }
];

const FlipBook = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const goNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goPrev = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <BookContainer>
            <BookWrapper>
                <LeftPage onClick={goPrev}>
                    <PageImage src={pages[currentPage].image}/>
                </LeftPage>

                {pages.map((page, index) => {
                    const isFlipped = index < currentPage;
                    return (
                        <Page
                            key={index}
                            $isFlipped={isFlipped}
                            //zIndex is a stack (the next page sits on top)
                            style={{ zIndex: isFlipped ? index : pages.length - index }}
                            onClick={isFlipped ? goPrev : goNext}
                        >
                            <PageContent>
                                <PageHeading>{page.heading}</PageHeading>
                                <PageQuote>{page.quote}</PageQuote>
                                <PageNumber>{page.pageNumber}</PageNumber>
                            </PageContent>
                        </Page>
                    );
                })}
            </BookWrapper>
        </BookContainer>
    );
};

export default FlipBook;