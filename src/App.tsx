import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/global';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import RouteTransition from './components/ui/RouteTransition';
import { initAnalytics } from './lib/analytics';

/*
 * Only the home page ships in the initial bundle. Every other route is a
 * separate chunk fetched on navigation, which keeps first paint fast on the
 * page that most visitors land on.
 */
const Experience = lazy(() => import('./components/experience'));
const Family = lazy(() => import('./components/family'));
const Institution = lazy(() => import('./components/institution'));
const Organizations = lazy(() => import('./components/organizations'));
const Pricing = lazy(() => import('./components/pricing'));
const Story = lazy(() => import('./components/story'));
const Terms = lazy(() => import('./components/terms'));
const Privacy = lazy(() => import('./components/privacy'));
const FAQ = lazy(() => import('./components/faq'));
const PublicStory = lazy(() => import('./components/publicStory'));
const Contribute = lazy(() => import('./components/contribute'));
const YourStory = lazy(() => import('./components/yourStory'));
const Thanks = lazy(() => import('./components/thanks'));
/* The conversion page. Every "Gift a story" button on the site ends here —
   it used to end in the visitor's email client. See components/start.tsx. */
const Start = lazy(() => import('./components/start'));
const NotFound = lazy(() => import('./components/notFound'));

/** Reserves the space taken by the fixed header (see navbar's ResizeObserver). */
const Main = styled.main`
    padding-top: var(--nav-total, 108px);
`;

/** Holds page height steady while a route chunk loads, so nothing jumps. */
const RouteFallback = styled.div`
    min-height: 60vh;
`;

function MarketingLayout() {
    return (
        <>
            <Navbar />
            <Main id="main">
                <RouteTransition>
                    <Suspense fallback={<RouteFallback />}>
                        <Outlet />
                    </Suspense>
                </RouteTransition>
            </Main>
            <Footer />
        </>
    );
}

/** Shared archive and contribute flows are standalone — no marketing chrome. */
function BareLayout() {
    return (
        <RouteTransition>
            <Suspense fallback={<RouteFallback />}>
                <Outlet />
            </Suspense>
        </RouteTransition>
    );
}

initAnalytics();

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <a className="skip-link" href="#main">Skip to content</a>
            <Routes>
                <Route element={<BareLayout />}>
                    <Route path="/p/:slug" element={<PublicStory />} />
                    <Route path="/contribute/:slug" element={<Contribute />} />
                </Route>
                <Route element={<MarketingLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/start" element={<Start />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/family" element={<Family />} />
                    <Route path="/organizations" element={<Organizations />} />
                    <Route path="/institution" element={<Institution />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/your-story" element={<YourStory />} />
                    {/* Post-purchase. Stripe redirects here; noindex. */}
                    <Route path="/thanks" element={<Thanks />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
