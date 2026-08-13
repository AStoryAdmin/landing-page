import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    Page, Inner, Brand, Hero, Avatar, Title, Sub, Form, FieldWrap, Label, Input,
    Textarea, KindRow, KindBtn, PhotoRow, Thumb, FileLabel, Submit, ErrorMsg,
    Note, Centered, ThankYou, Again,
} from './contribute.styles';

type Info = {
    name: string;
    last_name: string;
    photo_url: string | null;
};

const BUCKET = 'contribution-photos';
const MAX_PHOTOS = 6;
const MAX_BYTES = 10 * 1024 * 1024;

// Random object path so uploads from different visitors never collide.
const randomKey = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const Contribute = () => {
    const { slug } = useParams<{ slug: string }>();
    const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');
    const [info, setInfo] = useState<Info | null>(null);

    const [name, setName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [kind, setKind] = useState<'testimonial' | 'memory'>('testimonial');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!slug) {
                setState('missing');
                return;
            }
            const { data, error: err } = await supabase.rpc('get_contribute_info', { slug });
            if (cancelled) return;
            if (err || !data) {
                setState('missing');
                return;
            }
            setInfo(data as Info);
            setState('ready');
        })();
        return () => {
            cancelled = true;
        };
    }, [slug]);

    const onPickPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        e.target.value = ''; // let the same file be re-picked after a removal
        if (!files.length) return;

        const room = MAX_PHOTOS - photos.length;
        if (room <= 0) {
            setError(`You can attach up to ${MAX_PHOTOS} photos.`);
            return;
        }

        setError(null);
        setUploading(true);
        try {
            const uploaded: string[] = [];
            for (const file of files.slice(0, room)) {
                if (file.size > MAX_BYTES) {
                    setError(`"${file.name}" is larger than 10MB.`);
                    continue;
                }
                const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
                const path = `${slug}/${randomKey()}.${ext}`;
                const { error: upErr } = await supabase.storage
                    .from(BUCKET)
                    .upload(path, file, { contentType: file.type || 'image/jpeg' });
                if (upErr) {
                    console.error('upload:', upErr);
                    setError("A photo couldn't be uploaded. Please try again.");
                    continue;
                }
                const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
                uploaded.push(data.publicUrl);
            }
            if (uploaded.length) setPhotos((p) => [...p, ...uploaded]);
        } finally {
            setUploading(false);
        }
    };

    const removePhoto = (url: string) => setPhotos((p) => p.filter((u) => u !== url));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!body.trim() && photos.length === 0) {
            setError('Please write something or attach a photo.');
            return;
        }

        setSending(true);
        const { data, error: rpcErr } = await supabase.rpc('submit_contribution', {
            slug,
            contributor_name: name.trim(),
            relationship: relationship.trim(),
            kind,
            title: title.trim(),
            body: body.trim(),
            photos,
        });
        setSending(false);

        if (rpcErr || data === false) {
            console.error('submit_contribution:', rpcErr);
            setError("We couldn't send that. The link may no longer be accepting contributions.");
            return;
        }
        setDone(true);
    };

    const reset = () => {
        setTitle('');
        setBody('');
        setPhotos([]);
        setDone(false);
    };

    if (state === 'loading') {
        return (
            <Centered>
                <p>Loading…</p>
            </Centered>
        );
    }

    if (state === 'missing' || !info) {
        return (
            <Centered>
                <Brand>
                    <b>A</b> Story
                </Brand>
                <p>This contribution link isn't available.</p>
                <p>It may have been closed by the family.</p>
            </Centered>
        );
    }

    const fullName = [info.name, info.last_name].filter(Boolean).join(' ').trim();
    const initial = (info.name || '?').charAt(0).toUpperCase();

    return (
        <Page>
            <Inner>
                <Brand>
                    <b>A</b> Story
                </Brand>

                <Hero>
                    <Avatar $img={info.photo_url || undefined}>
                        {!info.photo_url && initial}
                    </Avatar>
                    <Title>
                        Contributing to {fullName ? `${fullName}'s` : 'their'} story
                    </Title>
                    <Sub>
                        Share a memory, a note, or a photo. The family reviews everything
                        before it appears.
                    </Sub>
                </Hero>

                {done ? (
                    <ThankYou>
                        <h2>Thank you</h2>
                        <p>
                            Your contribution has been sent to {info.name}'s family. They'll
                            review it soon.
                        </p>
                        <Again type="button" onClick={reset}>
                            Share something else
                        </Again>
                    </ThankYou>
                ) : (
                    <Form onSubmit={onSubmit}>
                        <FieldWrap>
                            <Label>Your name</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Sarah"
                                maxLength={120}
                            />
                        </FieldWrap>

                        <FieldWrap>
                            <Label>How you knew them</Label>
                            <Input
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                                placeholder="e.g. Daughter, neighbour, colleague"
                                maxLength={120}
                            />
                        </FieldWrap>

                        <FieldWrap>
                            <Label>What are you sharing?</Label>
                            <KindRow>
                                <KindBtn
                                    type="button"
                                    $on={kind === 'testimonial'}
                                    onClick={() => setKind('testimonial')}
                                >
                                    A note
                                </KindBtn>
                                <KindBtn
                                    type="button"
                                    $on={kind === 'memory'}
                                    onClick={() => setKind('memory')}
                                >
                                    A memory
                                </KindBtn>
                            </KindRow>
                        </FieldWrap>

                        {kind === 'memory' && (
                            <FieldWrap>
                                <Label>Title</Label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Sunday music"
                                    maxLength={200}
                                />
                            </FieldWrap>
                        )}

                        <FieldWrap>
                            <Label>{kind === 'memory' ? 'The memory' : 'Your note'}</Label>
                            <Textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder={
                                    kind === 'memory'
                                        ? 'What happened, where were you, who was there…'
                                        : 'What would you like the family to know?'
                                }
                                maxLength={10000}
                            />
                        </FieldWrap>

                        <FieldWrap>
                            <Label>Photos (optional)</Label>
                            <PhotoRow>
                                {photos.map((url) => (
                                    <Thumb
                                        key={url}
                                        $img={url}
                                        title="Click to remove"
                                        onClick={() => removePhoto(url)}
                                    />
                                ))}
                            </PhotoRow>
                            {photos.length < MAX_PHOTOS && (
                                <FileLabel>
                                    {uploading ? 'Uploading…' : '+ Add photos'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={onPickPhotos}
                                        disabled={uploading}
                                    />
                                </FileLabel>
                            )}
                        </FieldWrap>

                        {error && <ErrorMsg>{error}</ErrorMsg>}

                        <Submit type="submit" disabled={sending || uploading}>
                            {sending ? 'Sending…' : 'Send to the family'}
                        </Submit>
                        <Note>
                            Nothing is published until the family approves it. No account
                            needed.
                        </Note>
                    </Form>
                )}
            </Inner>
        </Page>
    );
};

export default Contribute;
