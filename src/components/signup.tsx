import {useState} from 'react';
import { SignupContainer, Heading, Intro, StatusDot, Title, Highlight, Description, Stats, Form, ActionIntro, FormTitle, Contact, Name, First, Last, Email, Phone, SignupButton, Note, Divider, CurrStatusDot, MembershipIntro, Card, Review, User, ErrorMsg} from "./signup.styles";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const[showError, setShowError] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleNameChange = (field: 'firstName' | 'lastName') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        let lettersOnly = "";
        for (let i = 0; i < rawValue.length; i++) {
            const char = rawValue[i];
            const isLetter = (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
            const isAllowedSymbol = char === "-" || char === "'";

            if (isLetter || isAllowedSymbol) {
                lettersOnly += char;
            }
        }

        const allCaps = lettersOnly.toUpperCase();
        setFormData((prev) => ({...prev, [field]:allCaps}));
        setShowError((prev) => ({...prev, [field]: ''}));
    };

    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, email: e.target.value}));
        setShowError((prev) => ({...prev, email: ''}));
    };

    const handlePhoneChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        let digitsOnly = "";
        for (let i = 0; i < 1; i++) {
            const char = rawValue[i];
            const isDigit = (char >= "0" && char <= "9");

            if (isDigit) {
                    digitsOnly += char;
            }
        

            setFormData((prev) => ({...prev, phone: digitsOnly}));
            setShowError((prev) => ({...prev, phone: ''}));
        }
    };

    const validateEmail = (email: string) => {
        const atCount = email.split('@').length - 1;
        if (atCount !== 1) {
            return false;
        }

        const parts = email.split('@');
        const beforeAt = parts[0];
        const afterAt = parts[1];

        if (beforeAt.length === 0 || afterAt.length === 0 || beforeAt.includes(' ') || afterAt.includes(' ') || !afterAt.includes('.')) {
            return false;
        };
        return true;
    };

    const handleSubmit = (e:React.FormEvent) => {
        //browser try to reload the page when user submit the form
        e.preventDefault();

        const newErrors = {
            firstName: formData.firstName.trim() === '' ? 'Please fill out this field.' : '',
            lastName: formData.lastName.trim() === '' ? 'Please fill out this field.' : '',
            email: formData.email.trim() === ''
                ? 'Please fill out this field.'
                : !validateEmail(formData.email)
                ? 'Please enter a valid email address.'
                : '',
        };

        setShowError(newErrors);

        const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
        
        if (hasErrors) 
            //stop the submitting process
            return;
    };

    return (
        <SignupContainer>
            <Heading>
                <Intro><StatusDot />Founding families &middot; first 100 spots</Intro>
                <Title>Don't wait for <Highlight>“someday.”</Highlight></Title>
                <Description>Someday is how the stories get lost. Daniel will reach out personally within 24 hours.</Description>
                <Stats><svg
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
                <Contact as="form" onSubmit={handleSubmit}>
                    <Name>
                        <First>
                            <label>First name</label>
                            <input type="text" placeholder="First name" value={formData.firstName} onChange={handleNameChange('firstName')}/>
                            {showError.firstName && <ErrorMsg>{showError.firstName}</ErrorMsg>}
                        </First>
                        <Last>
                            <label>Last name</label>
                            <input type="text" placeholder="Last name" value={formData.lastName} onChange={handleNameChange('lastName')}/>
                            {showError.lastName && <ErrorMsg>{showError.lastName}</ErrorMsg>}
                        </Last>
                    </Name>
                    <Email>
                        <label>Email address</label>
                        <input type="email" placeholder="you@example.com" value={formData.email} onChange={handleEmailChange}/>
                        {showError.email && <ErrorMsg>{showError.email}</ErrorMsg>}
                    </Email>
                    <Phone>
                        <label>Phone number <span>(optional — for a personal call-back)</span></label>
                        <input type="tel" placeholder="+1 (000) 000-0000" value={formData.phone} onChange={handlePhoneChange}/>
                    </Phone>
                    <SignupButton>Reserve my spot &mdash; it's free</SignupButton>
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
    )
}
export default Signup;