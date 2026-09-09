import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from './ui/Seo';
import { Eyebrow, H2, Lead } from './ui/primitives';
import { SITE } from '../lib/seo';
import {
    Card, CopyButton, Editor, Field, Hint, Inner, Page, PrintButton, PrintRow, Split, Stage,
} from './giftCard.styles';

/**
 * Makes the thing a buyer hands over.
 *
 * The site promises "a card — printed or sent — with your own note on it and
 * one link underneath" in four places, and until now that artefact did not
 * exist; the card on the home page is a styled mock-up, not something anyone
 * receives. This is the real one.
 *
 * It is deliberately a page rather than a generated PDF. There is no server
 * here, so a render service would be the only alternative, and this does the
 * job with none: fill the fields in, print to PDF for the envelope, or send
 * the URL itself for the version that gets texted. Every field lives in the
 * query string, so a finished card is a link — which can be bookmarked,
 * re-opened months later, or pasted into an email to the buyer.
 *
 * Not indexed: these carry a real person's name and an entitlement link.
 */

const DEFAULTS = {
    to: 'Grandma Ruth',
    from: 'Ellie, Tom, and the grandchildren',
    note: 'We’ve been meaning to ask you about all of it.\nTake your time — we’re listening.',
    link: `${SITE.url}/start/your-code-here`,
};

const GiftCardMaker = () => {
    const [params, setParams] = useSearchParams();

    const [to, setTo] = useState(params.get('to') ?? DEFAULTS.to);
    const [from, setFrom] = useState(params.get('from') ?? DEFAULTS.from);
    const [note, setNote] = useState(params.get('note') ?? DEFAULTS.note);
    const [link, setLink] = useState(params.get('link') ?? DEFAULTS.link);
    const [copied, setCopied] = useState(false);

    /** Keeps the URL in step, so the finished card is itself a shareable link. */
    const sync = (next: Partial<Record<'to' | 'from' | 'note' | 'link', string>>) => {
        const merged = { to, from, note, link, ...next };
        setParams(merged, { replace: true });
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2400);
        } catch {
            /* Clipboard refused — the URL bar still has it. */
        }
    };

    return (
        <Page>
            <Seo
                title="Make a gift card"
                description="Fill in the card that goes with an A Story gift, then print it or send it."
                path="/card"
                noindex
            />
            <Inner>
                <Split>
                    <Editor>
                        <div>
                            <Eyebrow>The handover</Eyebrow>
                            <H2 style={{ marginBottom: 12 }}>Make the card.</H2>
                            <Lead style={{ fontSize: '0.95rem' }}>
                                Fill this in, then print it for the envelope or send the page itself if
                                you won&rsquo;t be in the room.
                            </Lead>
                        </div>

                        <Field>
                            <span>Who it&rsquo;s for</span>
                            <input
                                value={to}
                                onChange={(e) => { setTo(e.target.value); sync({ to: e.target.value }); }}
                                maxLength={40}
                            />
                        </Field>

                        <Field>
                            <span>Your note</span>
                            <textarea
                                value={note}
                                onChange={(e) => { setNote(e.target.value); sync({ note: e.target.value }); }}
                                maxLength={240}
                            />
                        </Field>

                        <Field>
                            <span>From</span>
                            <input
                                value={from}
                                onChange={(e) => { setFrom(e.target.value); sync({ from: e.target.value }); }}
                                maxLength={60}
                            />
                        </Field>

                        <Field>
                            <span>Their link</span>
                            <input
                                value={link}
                                onChange={(e) => { setLink(e.target.value); sync({ link: e.target.value }); }}
                            />
                        </Field>

                        <PrintRow>
                            <PrintButton type="button" onClick={() => window.print()}>
                                Print the card
                            </PrintButton>
                            <CopyButton type="button" onClick={copyLink}>
                                {copied ? 'Copied' : 'Copy as a link to send'}
                            </CopyButton>
                        </PrintRow>

                        <Hint>
                            Printing gives you the version for an envelope &mdash; choose <code>Save as
                            PDF</code> in the print dialog if you would rather email it. Everything you
                            type lives in this page&rsquo;s address, so the link above <em>is</em> the
                            finished card: send that instead if you won&rsquo;t be handing anything over
                            in person.
                        </Hint>
                    </Editor>

                    <Stage>
                        <Card>
                            <p className="eyebrow">A Story &middot; a gift for you</p>
                            <p className="to">For</p>
                            <p className="name">{to || DEFAULTS.to}</p>
                            <p className="note">{note || DEFAULTS.note}</p>
                            <p className="link">
                                <small>Start whenever you like</small>
                                {link || DEFAULTS.link}
                            </p>
                            <p className="from">From {from || DEFAULTS.from}</p>
                        </Card>
                    </Stage>
                </Split>
            </Inner>
        </Page>
    );
};

export default GiftCardMaker;
