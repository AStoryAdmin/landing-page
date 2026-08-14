import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    Page, Inner, Brand, Hero, Avatar, Name, Intro, Timeline, MemoryCard,
    MemoryImg, MemoryBody, Era, MemoryTitle, Period, MemoryText, Footer, Centered,
    SectionTitle, Testimonial, TestimonialText, TestimonialWho, TestimonialPhotos,
} from './publicStory.styles';

type Memory = {
    id: string;
    title: string;
    body: string;
    era: string;
    period: string;
    created_at: string;
    photos: string[];
};

type Testimonial = {
    id: string;
    contributor_name: string;
    relationship: string;
    body: string;
    photos: string[];
    created_at: string;
};

type PublicStoryData = {
    name: string;
    last_name: string;
    photo_url: string | null;
    intro: string;
    relationship: string;
    memories: Memory[];
    testimonials?: Testimonial[];
};

const PublicStory = () => {
    const { slug } = useParams<{ slug: string }>();
    const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');
    const [story, setStory] = useState<PublicStoryData | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!slug) {
                setState('missing');
                return;
            }
            const { data, error } = await supabase.rpc('get_public_story', { slug });
            if (cancelled) return;
            if (error || !data) {
                setState('missing');
                return;
            }
            setStory(data as PublicStoryData);
            setState('ready');
        })();
        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (state === 'loading') {
        return (
            <Centered>
                <p>Loading…</p>
            </Centered>
        );
    }

    if (state === 'missing' || !story) {
        return (
            <Centered>
                <Brand>
                    <b>A</b> Story
                </Brand>
                <p>This story isn't available.</p>
                <p>The link may be private or no longer shared.</p>
            </Centered>
        );
    }

    const fullName = [story.name, story.last_name].filter(Boolean).join(' ').trim();
    const initial = (story.name || '?').charAt(0).toUpperCase();

    return (
        <Page>
            <Inner>
                <Brand>
                    <b>A</b> Story
                </Brand>

                <Hero>
                    <Avatar $img={story.photo_url || undefined}>
                        {!story.photo_url && initial}
                    </Avatar>
                    <Name>{fullName || 'A life remembered'}</Name>
                    {story.intro ? <Intro>{story.intro}</Intro> : null}
                </Hero>

                <Timeline>
                    {story.memories.length === 0 ? (
                        <Intro style={{ textAlign: 'center' }}>
                            No public memories have been shared yet.
                        </Intro>
                    ) : (
                        story.memories.map((m) => (
                            <MemoryCard key={m.id}>
                                {m.photos?.[0] ? (
                                    <MemoryImg src={m.photos[0]} alt={m.title} loading="lazy" />
                                ) : null}
                                <MemoryBody>
                                    {m.era ? <Era>{m.era}</Era> : null}
                                    <MemoryTitle>{m.title || 'Untitled'}</MemoryTitle>
                                    {m.period ? <Period>{m.period}</Period> : null}
                                    {m.body ? <MemoryText>{m.body}</MemoryText> : null}
                                </MemoryBody>
                            </MemoryCard>
                        ))
                    )}
                </Timeline>

                {story.testimonials && story.testimonials.length > 0 && (
                    <>
                        <SectionTitle>From family</SectionTitle>
                        {story.testimonials.map((t) => (
                            <Testimonial key={t.id}>
                                <TestimonialText>{t.body}</TestimonialText>
                                {t.photos?.length > 0 && (
                                    <TestimonialPhotos>
                                        {t.photos.map((url, i) => (
                                            <img key={url + i} src={url} alt="" loading="lazy" />
                                        ))}
                                    </TestimonialPhotos>
                                )}
                                <TestimonialWho>
                                    {t.contributor_name || 'Someone'}
                                    {t.relationship ? ` · ${t.relationship}` : ''}
                                </TestimonialWho>
                            </Testimonial>
                        ))}
                    </>
                )}

                <Footer>
                    Preserved with <b>A</b> Story — every family has a story worth preserving.
                </Footer>
            </Inner>
        </Page>
    );
};

export default PublicStory;
