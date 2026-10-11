import Seo from "./ui/Seo";
import {
  LegalLayout,
  PlainSummary,
  TableOfContents,
} from "../pages/site/LegalLayout";
import {
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
} from "../lib/seo";
import {
  CardView,
  Label,
  HeroSection,
  HeroTitle,
  HeroSub,
  LegalMeta,
  BodySection,
  LegalContent,
  Section,
  SectionNum,
  SectionTitle,
  Paragraph,
  List,
  ListItem,
  LegalLink,
  Bold,
} from "../pages/site/legalPrimitives";

const sections = [
  { id: "s1", title: "Who we are" },
  { id: "s2", title: "Information we collect" },
  { id: "s3", title: "How we use your information" },
  { id: "s4", title: "Your stories, your control" },
  { id: "s5", title: "How we use artificial intelligence" },
  { id: "s6", title: "Consent of the person being recorded" },
  { id: "s7", title: "How we share information" },
  { id: "s8", title: "How long we keep your information" },
  { id: "s9", title: "Security" },
  { id: "s10", title: "Your privacy rights" },
  { id: "s11", title: "Children" },
  { id: "s12", title: "Where your information is stored" },
  { id: "s13", title: "If someone gave this to you as a gift" },
  { id: "s14", title: "What your family adds about you, and letters" },
  { id: "s15", title: "Email we send" },
  { id: "s16", title: "Changes to this policy" },
  { id: "s17", title: "Contact us" },
];

const Privacy = () => {
  return (
    <>
      <Seo
        title="Privacy policy - A Story"
        description="What we collect, what we never do with it, and how a storyteller stays in control. We do not sell data and we do not train AI models on your stories."
        path="/privacy"
        image="/og/privacy.jpg"
        schema={[
          organizationSchema(),
          websiteSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy policy", path: "/privacy" },
          ]),
        ]}
      />
      <HeroSection>
        <CardView>
          <Label>Legal</Label>
          <HeroTitle>Privacy Policy</HeroTitle>
          <HeroSub>
            The most precious things a family owns. We treat them that way.
          </HeroSub>
          <LegalMeta>
            Last updated: October 11, 2026 &middot; A Story Technologies, Inc.
          </LegalMeta>
        </CardView>
      </HeroSection>

      <BodySection>
        <CardView>
          <LegalContent>
            <PlainSummary
              intro="The people in these recordings are trusting somebody with the most personal thing they own. Here is what that means in practice, before the formal version below."
              points={[
                {
                  label: "The storyteller owns it.",
                  text: "Not the person who paid for the gift. They decide who can see, hear or download anything.",
                },
                {
                  label: "We never sell data.",
                  text: "Not to advertisers, data brokers, insurers, or anyone else. There is no version of this where we do.",
                },
                {
                  label: "We never train AI on your stories.",
                  text: "Your recordings are used to build your archive, and for nothing else.",
                },
                {
                  label: "Everyone recorded is asked first.",
                  text: "Consent is captured from the person speaking, not assumed from the person who bought the gift.",
                },
                {
                  label: "You can take it all with you.",
                  text: "A full export of audio, transcripts and photos, in open formats, whenever you ask.",
                },
                {
                  label: "You can delete it all.",
                  text: "Deletion means deletion, including backups, within 30 days.",
                },
              ]}
              caveat="This summary is here to be read, not to be relied on. Where it and the policy below differ, the policy governs."
            />

            <LegalLayout>
              <TableOfContents sections={sections} />
              <div>
                <Section id="s1">
                  <SectionNum>1</SectionNum>
                  <SectionTitle>Who we are</SectionTitle>
                  <Paragraph>
                    A Story is operated by A Story Technologies, Inc., a
                    corporation organized under the laws of the State of
                    Michigan, United States. You can reach us at any time at{" "}
                    <LegalLink href="mailto:contact@astoryapp.com">
                      contact@astoryapp.com
                    </LegalLink>
                    .
                  </Paragraph>
                </Section>

                <Section id="s2">
                  <SectionNum>2</SectionNum>
                  <SectionTitle>Information we collect</SectionTitle>
                  <Paragraph>
                    We collect the following categories of information:
                  </Paragraph>
                  <List>
                    <ListItem>
                      <Bold>Contact and purchase information,</Bold> including
                      your name, email address, phone number if you give us one,
                      and the payment details needed to take a payment.
                    </ListItem>
                    <ListItem>
                      <Bold>The memories themselves</Bold>  - the audio
                      recordings, transcripts, photographs, and stories that you
                      and your storyteller share. This is the heart of what we
                      hold, and we treat it as highly sensitive personal
                      information.
                    </ListItem>
                    <ListItem>
                      <Bold>Payment information,</Bold> which is processed by
                      our third-party payment providers. We do not collect or
                      store full payment card numbers.
                    </ListItem>
                    <ListItem>
                      <Bold>Usage information.</Bold> The app sends us a record
                      of which features are used (for example "a memory was
                      saved" or "a call started"), with the app version, the
                      kind of phone and the account it came from. These
                      records never contain what anyone said, wrote, or
                      photographed. They go to our own database, not to an
                      advertising or analytics company. You can turn them off
                      in the app under Privacy Settings ("Help improve A
                      Story").
                    </ListItem>
                    <ListItem>
                      <Bold>Crash reports.</Bold> When the app crashes on a
                      phone, a report of the crash (the error, the app version
                      and the phone model, with your account id so two reports
                      from one phone can be told apart) goes to Sentry, a
                      crash-reporting service. It carries no name, no email
                      and nothing you recorded or wrote. The same "Help
                      improve A Story" switch turns it off.
                    </ListItem>
                  </List>
                </Section>

                <Section id="s3">
                  <SectionNum>3</SectionNum>
                  <SectionTitle>How we use your information</SectionTitle>
                  <Paragraph>
                    We use your information to deliver A Story - to
                    conduct the interviews, build the memory cards and life
                    timeline, produce your printed book, and host your archive
 - as well as to communicate with you, process
                    payments, provide customer support, maintain security, and
                    comply with our legal obligations. We do not sell your
                    personal information or your family's stories.
                  </Paragraph>
                </Section>

                <Section id="s4">
                  <SectionNum>4</SectionNum>
                  <SectionTitle>Your stories, your control</SectionTitle>
                  <Paragraph>
                    Your recordings, transcripts, photographs, and stories are
                    private to the storyteller and the people they choose to
                    share them with. The storyteller is always the one who
                    decides where a memory goes - nothing is shared
                    without their permission. We will never sell your family's
                    stories, show them to advertisers, or use them to train
                    outside artificial-intelligence models. They are not a
                    product.
                  </Paragraph>
                </Section>

                <Section id="s5">
                  <SectionNum>5</SectionNum>
                  <SectionTitle>
                    How we use artificial intelligence
                  </SectionTitle>
                  <Paragraph>
                    A Story uses artificial intelligence to conduct guided
                    interviews and to help shape what is shared into a readable
                    story. The company whose AI does this is OpenAI. When you
                    talk with A Story, dictate a memory, ask it to tidy your
                    words, or have the book retold, your voice, your words and
                    any photos you share in that conversation are sent to
                    OpenAI through our own server, so that they can be
                    transcribed and answered. The app asks your permission
                    before the first time, and you can say no; nothing is sent
                    until you say yes. Text that A Story writes from what you
                    said is shown to you to read and change before it is kept.
                  </Paragraph>
                  <Paragraph>
                    We use your content only to provide and improve the A
                    Story service itself. We do not use your family's stories,
                    recordings, or transcripts to train third-party or external
                    artificial-intelligence models, and our agreement with
                    OpenAI does not allow them to train on it either. Letters
                    (section 14) are never sent to any AI.
                  </Paragraph>
                </Section>

                <Section id="s6">
                  <SectionNum>6</SectionNum>
                  <SectionTitle>
                    Consent of the person being recorded
                  </SectionTitle>
                  <Paragraph>
                    Because A Story records a person telling their life story,
                    that person's consent matters to us. We obtain the
                    storyteller's consent before recording begins and before
                    their stories are produced into an archive or book. If you
                    set up A Story on behalf of another person, you are
                    responsible for ensuring that the storyteller, and anyone
                    else whose voice is recorded, understands and agrees to
                    being recorded.
                  </Paragraph>
                  <Paragraph>
                    <Bold>Calls between family.</Bold> When two or more
                    relatives talk through A Story, both sides of the call are
                    transcribed, and the transcript is kept on the call, where
                    only the people who were on it can read it. Each person is
                    told that A Story is listening before they join, agrees to
                    it, and can pause listening at any moment without ending
                    the call. Somebody who joins by a link, without the app,
                    sees the same notice before joining and can decline.
                  </Paragraph>
                  <Paragraph>
                    <Bold>Recording in the room.</Bold> When one phone is set
                    down to listen to several people in a room, the audio and
                    its transcript are kept and everyone present is recorded.
                    The person starting it confirms that everyone there knows
                    A Story is listening and agrees to be recorded, and is
                    responsible for that being true.
                  </Paragraph>
                  <Paragraph>
                    Some places, including a number of US states, require the
                    agreement of every person on a recorded conversation. A
                    Story is built so that every person is asked; it is your
                    responsibility to record only people who have agreed.
                  </Paragraph>
                </Section>

                <Section id="s7">
                  <SectionNum>7</SectionNum>
                  <SectionTitle>How we share information</SectionTitle>
                  <Paragraph>
                    We share information only with service providers who help us
                    operate A Story - such as secure cloud hosting, book
                    printing and fulfillment, payment processing, and analytics
 - and only under agreements that limit their use of it
                    to providing services to us. We may also disclose
                    information where we are required to do so by law, or where
                    we believe in good faith that disclosure is necessary to
                    protect the rights, property, or safety of our users, the
                    public, or A Story.
                  </Paragraph>
                </Section>

                <Section id="s8">
                  <SectionNum>8</SectionNum>
                  <SectionTitle>How long we keep your information</SectionTitle>
                  <Paragraph>
                    Because A Story is built to preserve memories for the long
                    term, we retain your content for as long as your account or
                    archive remains active. You may request deletion of your
                    content at any time by contacting us at{" "}
                    <LegalLink href="mailto:contact@astoryapp.com">
                      contact@astoryapp.com
                    </LegalLink>
                    , or delete your whole account yourself in the app (Menu,
                    then Account, then Delete account), and we will delete it
                    within thirty (30) days, except
                    where we must retain certain information to complete a
                    transaction, resolve disputes, or comply with legal
                    obligations, and except for residual copies that are removed
                    from routine backups in the ordinary course.
                  </Paragraph>
                  <Paragraph>
                    Your archive does not expire when you stop paying. Canceling
                    a plan, or letting a one-time purchase lapse, returns the
                    account to the Free tier - the guided AI conversations
                    stop, and everything else keeps working. We will not delete
                    an archive or restrict access to material already recorded
                    because a plan ended.
                  </Paragraph>
                </Section>

                <Section id="s9">
                  <SectionNum>9</SectionNum>
                  <SectionTitle>Security</SectionTitle>
                  <Paragraph>
                    We protect your information using administrative, technical,
                    and organizational safeguards appropriate to its
                    sensitivity. Recordings and transcripts are encrypted in
                    transit and at rest, and access is restricted to personnel
                    and providers who need it to operate the service. No method
                    of storage or transmission is perfectly secure, but we work
                    continually to safeguard the irreplaceable content you trust
                    us with.
                  </Paragraph>
                </Section>

                <Section id="s10">
                  <SectionNum>10</SectionNum>
                  <SectionTitle>Your privacy rights</SectionTitle>
                  <Paragraph>
                    Subject to applicable law, you may request to access,
                    correct, delete, or receive a portable copy of your personal
                    information, and you may opt out of marketing communications
                    at any time. To exercise these rights, email us at{" "}
                    <LegalLink href="mailto:contact@astoryapp.com">
                      contact@astoryapp.com
                    </LegalLink>
                    .
                  </Paragraph>
                  <Paragraph>
                    <Bold>California residents.</Bold> Under the California
                    Consumer Privacy Act, as amended, you have the right to know
                    what personal information we collect and how we use it, to
                    request deletion or correction of your personal information,
                    and to opt out of any "sale" or "sharing" of personal
                    information. We do not sell or share your personal
                    information as those terms are defined under California law.
                  </Paragraph>
                  <Paragraph>
                    <Bold>EEA and UK residents.</Bold> Where applicable
                    data-protection law governs, we process your personal
                    information on the legal basis of performing our contract
                    with you, your consent, and our legitimate interests in
                    operating and improving the service. You have the right to
                    access, rectify, erase, restrict, or object to processing,
                    to data portability, and to lodge a complaint with your
                    local supervisory authority.
                  </Paragraph>
                </Section>

                <Section id="s11">
                  <SectionNum>11</SectionNum>
                  <SectionTitle>Children</SectionTitle>
                  <Paragraph>
                    A Story is intended for people aged 13 and older, and we do
                    not knowingly collect personal information directly from
                    children under the age of 13. Where a storyteller's memories
                    naturally mention children or other family members, that
                    content is treated as part of the storyteller's stories and
                    is protected under this policy.
                  </Paragraph>
                </Section>

                <Section id="s12">
                  <SectionNum>12</SectionNum>
                  <SectionTitle>Where your information is stored</SectionTitle>
                  <Paragraph>
                    A Story is operated from the United States, and your
                    information is stored and processed in the United States. If
                    you access the service from outside the United States, you
                    understand that your information will be transferred to and
                    processed in the United States.
                  </Paragraph>
                </Section>

                <Section id="s13">
                  <SectionNum>13</SectionNum>
                  <SectionTitle>
                    If someone gave this to you as a gift
                  </SectionTitle>
                  <Paragraph>
                    Most A Story archives are paid for by one person and filled
                    by another. When that happens, the two of you are treated as
                    separate people with separate rights, and the money does not
                    decide who gets what.
                  </Paragraph>
                  <Paragraph>
                    The person who bought the gift gives us their name, email
                    and payment details, which we use to take the payment, send
                    them the card and the link, and keep them updated on the
                    book. That is all we hold about them, and none of it gives
                    them access to anything you record.
                  </Paragraph>
                  <Paragraph>
                    <Bold>Content you bring in from other services.</Bold> You
                    can bring posts, journal entries and photos into your
                    archive from an export file you download yourself from
                    Facebook, Instagram, X, Day One, Journey, Apple Notes,
                    Google Keep or a WhatsApp chat. The file is read on your
                    phone; we never connect to those accounts, never sign in
                    to them, and never post anything anywhere on your behalf.
                    Only the entries you confirm are kept, and anything
                    brought across is treated exactly like the rest of your
                    archive: it belongs to the storyteller, it is never sold,
                    it is never used to train models, and it can be removed at
                    any time.
                  </Paragraph>
                  <Paragraph>
                    <Bold>You control your archive.</Bold> You decide whether
                    the person who gave you the gift can read, hear or download
                    any of it, and you can change your mind at any time. We will
                    tell them the gift was opened and, if you order one, that
                    the book is on its way - nothing about what you said.
                  </Paragraph>
                  <Paragraph>
                    We may send either of you occasional messages about A Story
 - no spam, just a note when there is something worth
                    telling you. You can opt out at any time using the
                    unsubscribe link or by writing to us.
                  </Paragraph>
                </Section>

                <Section id="s14">
                  <SectionNum>14</SectionNum>
                  <SectionTitle>
                    What your family adds about you, and letters
                  </SectionTitle>
                  <Paragraph>
                    <Bold>The family tree.</Bold> A relative can add you to
                    their family tree with your name, your relationship to
                    them, and, if they know them, your years, places and
                    photo, before you have an account. That information is
                    visible only to the family in that tree, never to the
                    public. Once you have an account, you can change or remove
                    what is said about you yourself; until then, the person
                    who added you and the family's organizer look after it.
                    Memories and facts that others add about you are kept with
                    your story and can be corrected, declined or reported from
                    the app, and we act on reports within a day.
                  </Paragraph>
                  <Paragraph>
                    <Bold>Letters.</Bold> A letter is something you write for
                    one person, by hand, and seal. It is stored apart from your
                    memories, no AI ever reads it, and nobody can open it but
                    the person it is for. You can give it to them at any time.
                    If you have not opened A Story for six months, your sealed
                    letters pass to the person you named as your trusted
                    person, or, if you named nobody, to the closest relative
                    with an account in your family, so that what you wrote is
                    not lost. You can change your trusted person, or delete a
                    letter, at any time before then.
                  </Paragraph>
                </Section>

                <Section id="s15">
                  <SectionNum>15</SectionNum>
                  <SectionTitle>Email we send</SectionTitle>
                  <Paragraph>
                    Once a week, on Sunday, we email the people on a story a
                    short note of what the family added that week: the title
                    of a memory, a few of its lines, and its photo, with a link
                    to open the app. A family call is mentioned only as the
                    memory it became, never as a call or a transcript. The
                    email is on by default for everyone with an account, and
                    one tap at the foot of any copy turns it off, as does the
                    switch in the app under Privacy Settings. Beyond that we
                    send the emails an account needs (confirming your address,
                    resetting a password, an invitation somebody sent you) and
                    nothing else.
                  </Paragraph>
                </Section>

                <Section id="s16">
                  <SectionNum>16</SectionNum>
                  <SectionTitle>Changes to this policy</SectionTitle>
                  <Paragraph>
                    We may update this policy from time to time. When we do, we
                    will post the revised version here with a new "Last updated"
                    date, and we will notify you of material changes by email or
                    through the app before they take effect.
                  </Paragraph>
                </Section>

                <Section id="s17">
                  <SectionNum>17</SectionNum>
                  <SectionTitle>Contact us</SectionTitle>
                  <Paragraph>
                    If you have any questions about this policy or your privacy,
                    please email us at{" "}
                    <LegalLink href="mailto:contact@astoryapp.com">
                      contact@astoryapp.com
                    </LegalLink>
                    . We respond to every message.
                  </Paragraph>
                </Section>
              </div>
            </LegalLayout>
          </LegalContent>
        </CardView>
      </BodySection>
    </>
  );
};

export default Privacy;
