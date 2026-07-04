import {PhoneContainer, StatusBar, AppHeader, Avatar, Detail, MiniLogo, ChatScreen, AppFooter, ChatButton} from './demoPhone.styles'
import statusBar from './../assets/statusbar.png'
import logoImg from './../assets/logo.png'

const DemoPhone = () => {
    return (
        <PhoneContainer>
            <StatusBar>
                <span>9:41</span>
                <img src={statusBar} alt="Demo phone status bar"></img>
            </StatusBar>

            <AppHeader>
                <Avatar>A</Avatar>
                <Detail>
                    <span>Your loved one &middot; Family</span>
                    <span>Ready when your are</span>
                </Detail>
                <MiniLogo>
                    <img src={logoImg} alt="A Story app logo"></img>
                </MiniLogo>
            </AppHeader>
            <ChatScreen>

            </ChatScreen>
            <AppFooter>
                <ChatButton>&#x25C9; Tap to play the demo</ChatButton>
            </AppFooter>
        </PhoneContainer>
    )
}
export default DemoPhone;