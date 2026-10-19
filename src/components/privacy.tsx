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
  { id: "s7", title: "Who we share information with" },
  { id: "s8", title: "Calls and notifications on your phone" },
  { id: "s9", title: "How long we keep your information" },
  { id: "s10", title: "Security" },
  { id: "s11", title: "Your privacy rights" },
  { id: "s12", title: "Children" },
  { id: "s13", title: "Where your information is stored" },
  { id: "s14", title: "If someone gave this to you as a gift" },
  { id: "s15", title: "What your family adds about you, and letters" },
  { id: "s16", title: "Email we send" },
  { id: "s17", title: "Changes to this policy" },
  { id: "s18", title: "Contact us" },
];

const Mail = () => (
  <LegalLink href="mailto:contact@astoryapp.com">contact@astoryapp.com</LegalLink>
);

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
            Last updated: October 18, 2026 &middot; A Story Technologies, Inc.
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
                  label: "Only your family sees it. Not even us.",
                  text: "Nobody at A Story reads, listens to or looks at your memories, unless you ask us to help or someone reports something.",
                },
                {
                  label: "We never sell data.",
                  text: "Not to advertisers, data brokers, insurers, or anyone else. There is no advertising in A Story and no tracking across other apps or websites.",
                },
                {
                  label: "We never train AI on your stories.",
                  text: "Your recordings are used to run your archive, and for nothing else. Neither we nor the AI company we use trains models on them.",
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
                  text: "Delete your account in the app, or ask us, and it is gone within 30 days.",
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
                    Delaware corporation based in the United States ("A
                    Story," "we," "us"). We are responsible for the personal
                    information described in this policy. You can reach us at
                    any time at <Mail />.
                  </Paragraph>
                  <Paragraph>
                    This policy covers the A Story app for iPhone, our
                    website at astoryapp.com, and the emails and printed books
                    that come from them.
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
                      <Bold>Your account.</Bold> Your name, email address and
                      password, or, if you sign in with Apple, Google or
                      Facebook, the name and email address that service shares
                      with us (Apple may give us a private relay address
                      instead of your real one). We never receive your
                      password for those services, and we never post anything
                      to them. You may also add a photo, your birth year and
                      other details about yourself, and a phone number if you
                      choose to.
                    </ListItem>
                    <ListItem>
                      <Bold>The memories themselves.</Bold> The audio
                      recordings, transcripts, written memories, photographs
                      and stories that you and your storyteller share, and the
                      questions family members send each other. This is the
                      heart of what we hold, and we treat it as highly
                      sensitive personal information.
                    </ListItem>
                    <ListItem>
                      <Bold>Your family tree.</Bold> The relatives you add,
                      with what you know about them (names, relationships,
                      years, places, photos), and the email addresses of the
                      people you invite.
                    </ListItem>
                    <ListItem>
                      <Bold>Calls.</Bold> When you talk with A Story or with
                      family through the app, the audio of the call and its
                      transcript, and when and how long the call was.
                    </ListItem>
                    <ListItem>
                      <Bold>Your phone.</Bold> The tokens Apple gives us so the
                      daily call can ring and a question from family can reach
                      you, a random identifier the app makes for each install,
                      your time zone (so a call rings at the hour you chose),
                      the app version and the kind of phone. We do not collect
                      your location, your contacts or the advertising
                      identifier.
                    </ListItem>
                    <ListItem>
                      <Bold>Purchases.</Bold> Plans bought in the app are paid
                      to Apple; we receive which plan you have and when it
                      renews, never your card. Printed books bought on our
                      website are paid through Stripe, and we receive your name,
                      email and the address the book is shipped to. We do not
                      collect or store full payment card numbers.
                    </ListItem>
                    <ListItem>
                      <Bold>Usage information.</Bold> The app sends us a record
                      of which features are used (for example "a memory was
                      saved" or "a call started"), as counts and short labels,
                      with the app version, the kind of phone and the account
                      it came from. These records never contain what anyone
                      said, wrote or photographed. They go to our own database,
                      not to an advertising or analytics company. You can turn
                      them off in the app under Privacy ("Help improve A
                      Story").
                    </ListItem>
                    <ListItem>
                      <Bold>Crash reports.</Bold> When the app crashes, a
                      report of the crash (the error, the app version and the
                      phone model, with your account id so two reports from
                      one phone can be told apart) goes to Sentry, a
                      crash-reporting service. It carries no name, no email and
                      nothing you recorded or wrote. The same "Help improve A
                      Story" switch turns it off.
                    </ListItem>
                    <ListItem>
                      <Bold>What you tell us.</Bold> Messages you send to
                      support, feedback you give in the app, and reports you
                      make about content.
                    </ListItem>
                  </List>
                </Section>

                <Section id="s3">
                  <SectionNum>3</SectionNum>
                  <SectionTitle>How we use your information</SectionTitle>
                  <Paragraph>
                    We use your information to run A Story: to hold the
                    conversations, build the memory cards, family tree and
                    life timeline, ring the daily call, tell you when family
                    asks you something, produce and ship your printed book,
                    and host your archive. We also use it to communicate with
                    you, take payments, provide support, keep the service safe
                    and working, act on reports, and meet our legal
                    obligations. We use usage counts and crash reports to find
                    what is broken and what is used. We do not sell your
                    personal information or your family's stories, and we do
                    not use them for advertising.
                  </Paragraph>
                </Section>

                <Section id="s4">
                  <SectionNum>4</SectionNum>
                  <SectionTitle>Your stories, your control</SectionTitle>
                  <Paragraph>
                    Your recordings, transcripts, photographs and stories are
                    private to the storyteller and the people they choose to
                    share them with. The storyteller always decides where a
                    memory goes; nothing is shared without their permission,
                    and nothing is ever public. We will never sell your
                    family's stories, show them to advertisers, or use them to
                    train artificial-intelligence models. They are not a
                    product.
                  </Paragraph>
                  <Paragraph>
                    <Bold>Not even our team.</Bold> People at A Story do not
                    read, listen to or look at your memories, photos, calls or
                    letters. The only exceptions are when you ask us to, for
                    example to fix something; when someone reports content and
                    we must review it; or when the law requires it. Access for
                    those reasons is limited to the few people who need it.
                  </Paragraph>
                </Section>

                <Section id="s5">
                  <SectionNum>5</SectionNum>
                  <SectionTitle>
                    How we use artificial intelligence
                  </SectionTitle>
                  <Paragraph>
                    A Story uses artificial intelligence to hold guided
                    conversations and to help shape what is shared into a
                    readable story. The company whose AI does this is OpenAI.
                    When you talk with A Story, dictate a memory, ask it to
                    tidy your words, or have the book retold, your voice, your
                    words and any photos you share in that conversation are
                    sent to OpenAI through our own server, so that they can be
                    transcribed and answered. OpenAI receives only what the
                    feature you are using needs, at the moment you use it: it
                    is not given your archive, your family tree or your
                    letters, and it keeps nothing as an archive of its own. The app asks your permission
                    before the first time, and you can say no; nothing is sent
                    until you say yes. Text that A Story writes from what you
                    said is shown to you to read and change before it is kept.
                  </Paragraph>
                  <Paragraph>
                    We use your content only to provide the A Story service to
                    you. We do not use your family's stories, recordings or
                    transcripts to train artificial-intelligence models, and
                    OpenAI does not train on data sent through its business
                    service. OpenAI may keep what it receives for up to 30
                    days to watch for abuse, and then deletes it. Letters
                    (section 15) are never sent to any AI.
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
                    responsible for making sure that the storyteller, and
                    anyone else whose voice is recorded, understands and agrees
                    to being recorded.
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
                  <SectionTitle>Who we share information with</SectionTitle>
                  <Paragraph>
                    Inside A Story, your memories are shared only with the
                    family members the storyteller chooses. Outside A Story, we
                    share information only with the service providers that
                    help us run it, only as far as each one needs, and only
                    under agreements that limit their use of it to providing
                    their service to us:
                  </Paragraph>
                  <List>
                    <ListItem>
                      <Bold>Supabase</Bold> stores accounts, the archive and
                      its files, in the United States.
                    </ListItem>
                    <ListItem>
                      <Bold>OpenAI</Bold> transcribes and answers
                      conversations and helps write memories (section 5).
                    </ListItem>
                    <ListItem>
                      <Bold>Apple</Bold> takes in-app payments, delivers
                      notifications and calls to your iPhone, and provides
                      Sign in with Apple. <Bold>Google</Bold> and{" "}
                      <Bold>Facebook</Bold> provide sign-in, if you choose them.
                    </ListItem>
                    <ListItem>
                      <Bold>RevenueCat</Bold> keeps track of which plan an
                      account has bought through the App Store.
                    </ListItem>
                    <ListItem>
                      <Bold>Stripe</Bold> takes payment for printed books on
                      our website.
                    </ListItem>
                    <ListItem>
                      <Bold>Our printing and shipping partners</Bold> receive
                      the book itself and the name and address it ships to.
                    </ListItem>
                    <ListItem>
                      <Bold>Resend</Bold> sends our email (invitations, the
                      Sunday note, account email).
                    </ListItem>
                    <ListItem>
                      <Bold>Sentry</Bold> receives crash reports (section 2).
                    </ListItem>
                  </List>
                  <Paragraph>
                    We may also disclose information where the law requires
                    it, or where we believe in good faith that disclosure is
                    necessary to protect the safety of a person, or the rights
                    and property of our users, the public or A Story. If A
                    Story is ever part of a merger or sale, your information
                    would pass to the new owner only under the promises in
                    this policy, and we would tell you before it did.
                  </Paragraph>
                </Section>

                <Section id="s8">
                  <SectionNum>8</SectionNum>
                  <SectionTitle>Calls and notifications on your phone</SectionTitle>
                  <Paragraph>
                    If you set up a daily call, A Story rings your iPhone like
                    an ordinary call from "A Story", and it appears in your
                    Phone app's Recents. If you allow notifications, a
                    question from family arrives as a notification naming who
                    asked and showing the question, which can be seen on your
                    lock screen unless you hide previews in your iPhone's
                    settings. You can turn off the daily call in the app, and
                    notifications in your iPhone's Settings, at any time.
                    Signing out takes your phone off our list.
                  </Paragraph>
                </Section>

                <Section id="s9">
                  <SectionNum>9</SectionNum>
                  <SectionTitle>How long we keep your information</SectionTitle>
                  <Paragraph>
                    Because A Story is built to keep memories for the long
                    term, we keep your content for as long as your account or
                    archive is active. You can delete your whole account
                    yourself in the app (Menu, then Account, then Delete
                    account), or ask us at <Mail />, and we will delete it
                    within thirty (30) days. That includes accounts made with
                    Apple, Google or Facebook sign-in, and removes what those
                    services shared with us. We keep only what we must to
                    complete a transaction, resolve a dispute or meet a legal
                    obligation (for example, records of payments), and copies
                    in our backups are erased as those backups expire.
                  </Paragraph>
                  <Paragraph>
                    Memories you added to someone else's story belong to that
                    story; deleting your account removes your account and your
                    own story, and we will remove anything else you added if
                    you ask.
                  </Paragraph>
                  <Paragraph>
                    Your archive does not expire when you stop paying.
                    Canceling a plan, or letting a one-time purchase lapse,
                    returns the account to the Free tier: the guided AI
                    conversations stop, and everything else keeps working. We
                    will not delete an archive or restrict access to material
                    already recorded because a plan ended.
                  </Paragraph>
                </Section>

                <Section id="s10">
                  <SectionNum>10</SectionNum>
                  <SectionTitle>Security</SectionTitle>
                  <Paragraph>
                    We protect your information with administrative,
                    technical and organizational safeguards suited to how
                    sensitive it is. Recordings and transcripts are encrypted
                    in transit and at rest, each family's archive is walled off
                    from every other in our database, and access is restricted
                    to the people and providers who need it to run the
                    service. No method of storage or transmission is perfectly
                    secure, but we work continually to protect the
                    irreplaceable things you trust us with, and we will tell
                    you promptly, as the law requires, if a breach affects your
                    information.
                  </Paragraph>
                </Section>

                <Section id="s11">
                  <SectionNum>11</SectionNum>
                  <SectionTitle>Your privacy rights</SectionTitle>
                  <Paragraph>
                    Wherever you live, you can ask us to show you, correct,
                    delete or give you a portable copy of your personal
                    information, and you can opt out of marketing email at any
                    time. Write to <Mail />; we will answer within 30 days and
                    may need to confirm it is really you first. We will not
                    treat you differently for using any of these rights.
                  </Paragraph>
                  <Paragraph>
                    <Bold>California and other US states.</Bold> Under the
                    California Consumer Privacy Act, as amended, and the
                    privacy laws of other states, you have the right to know
                    what personal information we collect and how we use it, to
                    access, correct and delete it, and to opt out of any
                    "sale," "sharing" or targeted advertising. We do not sell
                    or share personal information, or use it for targeted
                    advertising, as those terms are defined in those laws, and
                    we do not use sensitive personal information to infer
                    things about you. You may use an authorized agent, and if
                    we decline a request you may appeal by replying to our
                    answer.
                  </Paragraph>
                  <Paragraph>
                    <Bold>EEA, UK and Swiss residents.</Bold> Where these
                    data-protection laws apply, we process your personal
                    information to perform our contract with you, with your
                    consent (for example, before anything is sent to our AI
                    provider, and for recordings), and for our legitimate
                    interests in running and improving a safe service. You have
                    the right to access, rectify, erase, restrict or object to
                    processing, to data portability, to withdraw consent at any
                    time, and to complain to your local supervisory authority.
                  </Paragraph>
                  <Paragraph>
                    We do not track you across other companies' apps or
                    websites, so there is nothing for "Do Not Track" or Global
                    Privacy Control signals to switch off; we honor them all
                    the same.
                  </Paragraph>
                </Section>

                <Section id="s12">
                  <SectionNum>12</SectionNum>
                  <SectionTitle>Children</SectionTitle>
                  <Paragraph>
                    A Story accounts are for people aged 13 and older, and we
                    do not knowingly collect personal information directly
                    from children under 13. Families naturally talk about
                    their children, and a child may be heard on a family call
                    or added to the family tree; that content is part of the
                    family's archive, protected under this policy, and added by
                    the adult responsible for it. If you believe a child under
                    13 has made an account, tell us and we will delete it.
                  </Paragraph>
                </Section>

                <Section id="s13">
                  <SectionNum>13</SectionNum>
                  <SectionTitle>Where your information is stored</SectionTitle>
                  <Paragraph>
                    A Story is operated from the United States, and your
                    information is stored and processed in the United States.
                    If you use A Story from outside the United States, your
                    information is transferred to and processed in the United
                    States, where we rely on the safeguards our providers
                    offer, such as standard contractual clauses, where the law
                    requires them.
                  </Paragraph>
                </Section>

                <Section id="s14">
                  <SectionNum>14</SectionNum>
                  <SectionTitle>
                    If someone gave this to you as a gift
                  </SectionTitle>
                  <Paragraph>
                    Many A Story archives are paid for by one person and filled
                    by another. When that happens, the two of you are treated as
                    separate people with separate rights, and the money does not
                    decide who gets what.
                  </Paragraph>
                  <Paragraph>
                    The person who bought the gift gives us their name, email
                    and payment details, which we use to take the payment, send
                    them the gift, and keep them updated on the book. That is
                    all we hold about them as a buyer, and none of it gives
                    them access to anything you record.
                  </Paragraph>
                  <Paragraph>
                    <Bold>You control your archive.</Bold> You decide whether
                    the person who gave you the gift can read, hear or download
                    any of it, and you can change your mind at any time. We may
                    tell them the gift was opened and, if you order one, that
                    the book is on its way; nothing about what you said.
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
                </Section>

                <Section id="s15">
                  <SectionNum>15</SectionNum>
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
                    the app, and we act on reports within 24 hours. You can
                    also block a person, so that they can no longer reach you
                    through A Story.
                  </Paragraph>
                  <Paragraph>
                    <Bold>Questions from family.</Bold> A question a relative
                    sends you waits on your Home and, if you allow it, arrives
                    as a notification (section 8). It is seen only by you and
                    the person who asked. Your answer goes into your own
                    story, under your control like any other memory.
                  </Paragraph>
                  <Paragraph>
                    <Bold>Letters.</Bold> A letter is something you write for
                    one person and seal. It is stored apart from your
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

                <Section id="s16">
                  <SectionNum>16</SectionNum>
                  <SectionTitle>Email we send</SectionTitle>
                  <Paragraph>
                    Once a week, on Sunday, we email the people on a story a
                    short note of what the family added that week: the title
                    of a memory, a few of its lines, and its photo, with a link
                    to open the app. A family call is mentioned only as the
                    memory it became, never as a call or a transcript. The
                    email is on by default for everyone with an account, and
                    one tap at the foot of any copy turns it off, as does the
                    switch in the app under Privacy. Beyond that we send the
                    emails an account needs (confirming your address,
                    resetting a password, an invitation somebody sent you, a
                    book order) and nothing else.
                  </Paragraph>
                </Section>

                <Section id="s17">
                  <SectionNum>17</SectionNum>
                  <SectionTitle>Changes to this policy</SectionTitle>
                  <Paragraph>
                    We may update this policy from time to time. When we do, we
                    will post the revised version here with a new "Last
                    updated" date, and we will tell you about material changes
                    by email or in the app before they take effect. We will
                    never apply a change that weakens these promises to
                    memories already recorded without asking you first.
                  </Paragraph>
                </Section>

                <Section id="s18">
                  <SectionNum>18</SectionNum>
                  <SectionTitle>Contact us</SectionTitle>
                  <Paragraph>
                    If you have any questions about this policy or your
                    privacy, or want to use any of your rights, email us at{" "}
                    <Mail />. We answer every message.
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
