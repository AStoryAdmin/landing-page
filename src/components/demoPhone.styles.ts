import styled from 'styled-components';

const colors = {
    darkBg: '#120c06',
    gold: '#C7A24E',
    cream: '#EFE6D4',
    ember: '#B45A2B',
    peach: '#D9A97B',
    brown: 'rgba(199,162,78,0.22)',
    shadow: 'rgba(0,0,0,0.55)',
};

export const PhoneContainer = styled.div `
    position: relative;
    width: 330px;
    height: 660px;
    border-radius: 42px;
    background: ${colors.darkBg};
    border: 2px solid ${colors.brown};
    box-shadow: 0 40px 100px ${colors.shadow};
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const StatusBar = styled.div `
    
`;

export const AppHeader = styled.div `
    
`;

export const Avatar = styled.div `
    
`;

export const Detail = styled.div `
    
`;

export const MiniLogo = styled.div `
    
`;

export const ChatScreen = styled.div `
    
`;

export const AppFooter = styled.div `
    
`;

export const ChatButton = styled.div `
    
`;
