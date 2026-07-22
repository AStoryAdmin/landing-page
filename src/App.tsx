import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import Body from './components/home'
import Footer from './components/footer'
import Signup from './components/signup'
import Experience from './components/experience'
import Family from './components/family'
import ScrollToTop from './components/scrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/family" element={<Family />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App
