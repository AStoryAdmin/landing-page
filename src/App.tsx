import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar'
import Body from './components/home'
import Footer from './components/footer'
import Signup from './components/signup'
import Experience from './components/experience'
import Family from './components/family'
import Institution from './components/institution';
import Story from './components/story';
import Terms from './components/terms';
import PublicStory from './components/publicStory';
import Privacy from './components/privacy';
import FAQ from './components/faq';
import ScrollToTop from './components/scrollToTop';

// Marketing pages share the navbar + footer chrome. The public story view
// (/p/:slug) is a standalone page with none of it.
function MarketingLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Body />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/family" element={<Family />} />
          <Route path="/institution" element={<Institution />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/story" element={<Story />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/p/:slug" element={<PublicStory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App
