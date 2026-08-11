import { useForm } from 'react-hook-form';
import type { UseFormSetValue } from 'react-hook-form';
import { SignupContainer, Heading, Intro, StatusDot, Title, Highlight, Description, Stats, Form, ActionIntro, FormTitle, Contact, Name, First, Last, Email, Phone, SignupButton, Note, Divider, CurrStatusDot, MembershipIntro, Card, Review, User, ErrorMsg} from "./signup.styles";

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

const filterName = (value: string) => {
    let lettersOnly = "";
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        const isLetter = Array.from(value).every((char) => /[A-Za-z]/.test(char));
        const isAllowedSymbol = char === " " || char === "-" || char === "'";
        if (isLetter || isAllowedSymbol) {
            lettersOnly += char;
        }
    }
    return lettersOnly.toUpperCase();
};

const filterPhone = (value: string) => {
    let digitsOnly = "";
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        if (char >= "0" && char <= "9") {
            digitsOnly += char;
        }
    }
    return digitsOnly;
};

const filterEmail = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address.',
};

const nameFieldOptions = (field: 'firstName' | 'lastName', setValue: UseFormSetValue<FormValues>) => ({
    required: 'Please fill out this field.',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(field, filterName(e.target.value)),
});

const phoneFieldOptions = (setValue: UseFormSetValue<FormValues>) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue('phone', filterPhone(e.target.value)),
});

const emailFieldOptions = {
    required: 'Please fill out this field.',
    pattern: filterEmail,
};

const Signup = () => {
    const {register, handleSubmit, setValue, formState: { errors }} = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log('Submit:', data);
    };

    return (
        <SignupContainer>
            <Heading>
                <Intro><StatusDot />Founding families &middot; first 100 spots</Intro>
                <Title>Don't wait for <Highlight>“someday.”</Highlight></Title>
                <Description>Someday is how the stories get lost. Daniel will reach out personally within 24 hours.</Description>
                <Stats>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    87 of 100 founding spots remaining
                </Stats>
            </Heading>
            <Form>
                <ActionIntro>Claim your spot</ActionIntro>
                <FormTitle>The most meaningful gift you can give a family.</FormTitle>
                <Contact as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Name>
                        <First>
                            <label>First name</label>
                            <input
                                type="text"
                                placeholder="First name"
                                {...register('firstName', nameFieldOptions('firstName', setValue))}
                            />
                            {errors.firstName && <ErrorMsg>{errors.firstName.message}</ErrorMsg>}
                        </First>
                        <Last>
                            <label>Last name</label>
                            <input
                                type="text"
                                placeholder="Last name"
                                {...register('lastName', nameFieldOptions('lastName', setValue))}
                            />
                            {errors.lastName && <ErrorMsg>{errors.lastName.message}</ErrorMsg>}
                        </Last>
                    </Name>
                    <Email>
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register('email', emailFieldOptions)}
                        />
                        {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
                    </Email>
                    <Phone>
                        <label>Phone number <span>(optional — for a personal call-back)</span></label>
                        <input
                            type="tel"
                            placeholder="+1 (000) 000-0000"
                            {...register('phone', phoneFieldOptions(setValue))}
                        />
                    </Phone>
                    <SignupButton type="submit">Reserve my spot &mdash; it's free</SignupButton>
                    <Note>No spam, ever. Just a personal note from Daniel the moment we're ready for you. Perfect for a parent or grandparent &mdash; mention in the phone field if this is a gift.</Note>
                </Contact>
                <Divider />
                <MembershipIntro>
                    <CurrStatusDot />10 founding families already joined
                </MembershipIntro>
                <Card>
                    <Review>"I gave it to my mom for her birthday, half expecting her to shrug. Instead she talked for two hours — about my dad, about how they met. I'd never heard that story. Now my kids will have it forever."</Review>
                    <User>Teresa &middot; gift for her mother</User>
                </Card>
            </Form>
        </SignupContainer>
    );
};

export default Signup;