import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import Body from './components/body'
import Footer from './components/footer'
import Signup from './components/signup'
import ScrollToTop from './components/scrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App
