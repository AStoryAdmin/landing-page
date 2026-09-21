import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Seo from "../../components/ui/Seo";
export default function PrivateHome() {
  return (
    <>
      <Header />
      <main id="main">
        <Home />
        <Seo
          title="A Story design preview"
          description="Private design preview"
          path="/__design/a-story-home-vnext"
          noindex
        />
      </main>
      <Footer />
    </>
  );
}
