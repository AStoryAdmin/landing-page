import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar'
import Body from './components/home'
import Footer from './components/footer'
import Signup from './components/signup'
import Experience from './components/experience'
import PublicStory from './components/publicStory'
import Contribute from './components/contribute'
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
        <Route path="/p/:slug" element={<PublicStory />} />
        <Route path="/contribute/:slug" element={<Contribute />} />
        <Route element={<MarketingLayout />}>
          <Route path="/experience" element={<Experience />} />
          <Route path="/" element={<Body />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App
