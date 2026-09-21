import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { prepareInitialRoute } from './lib/lazyRoute';

const mount = () =>
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );

// Keep useful static content visible while only this route chunk is fetched.
void prepareInitialRoute(window.location.pathname).then(mount, mount);
