import { Suspense } from "react";
import { lazyRoute } from "./lib/lazyRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./styles/global";
import Navbar from "./pages/site/Header";
import Footer from "./pages/site/Footer";
import Home from "./pages/site/Home";
import RouteTransition from "./components/ui/RouteTransition";
import RouteErrorBoundary from "./components/ui/RouteErrorBoundary";
import Seo from "./components/ui/Seo";
import StickyStart from "./pages/site/kit/StickyStart";
import { initAnalytics } from "./lib/analytics";

/*
 * Only the home page ships in the initial bundle. Every other route is a
 * separate chunk fetched on navigation, which keeps first paint fast on the
 * page that most visitors land on.
 */
const Experience = lazyRoute(
  "/how-it-works",
  () => import("./pages/site/HowItWorks"),
);
const Family = lazyRoute(
  "/for-families",
  () => import("./pages/site/Families"),
);
const Institution = lazyRoute(
  "/care-communities",
  () => import("./pages/site/Care"),
);
const Organizations = lazyRoute(
  "/organizations",
  () => import("./pages/site/Organizations"),
);
const Pricing = lazyRoute("/pricing", () => import("./pages/site/Pricing"));
const Compare = lazyRoute("/compare", () => import("./pages/site/Compare"));
const YourStory = lazyRoute(
  "/your-story",
  () => import("./pages/site/YourStory"),
);
const Story = lazyRoute("/our-story", () => import("./pages/site/OurStory"));
const Programs = lazyRoute("/programs", () => import("./pages/site/Programs"));
const Contact = lazyRoute("/contact", () => import("./pages/site/Contact"));
const Terms = lazyRoute("/terms", () => import("./components/terms"));
const Privacy = lazyRoute("/privacy", () => import("./components/privacy"));
const FAQ = lazyRoute("/questions", () => import("./pages/site/Questions"));
const PublicStory = lazyRoute(
  "/p/:slug",
  () => import("./components/publicStory"),
);
const Contribute = lazyRoute(
  "/contribute/:slug",
  () => import("./components/contribute"),
);
/* The listening codes printed in a book. See pages/site/Listen.tsx. */
const Listen = lazyRoute("/l", () => import("./pages/site/Listen"));
const Guides = lazyRoute("/guides", () => import("./pages/site/Guides"));
const Guide = lazyRoute("/guides/:slug", () => import("./pages/site/Guide"));
const Thanks = lazyRoute("/thanks", () => import("./pages/site/Thanks"));
/* The conversion page. Every call to action on the site ends here —
   it used to end in the visitor's email client. See components/start.tsx. */
const Start = lazyRoute("/start", () => import("./pages/site/Start"));
/* Before launch: reserve for $1, or start now for $29. See lib/founding.ts. */
const Reserve = lazyRoute("/reserve", () => import("./pages/site/Reserve"));
/* Accounts live in the web app since 2026-10-18 (lib/app.ts). The site's own
   sign-in and sign-up stay only for the $1 / $29 reservation, which comes
   back to /reserve (?next=/reserve); every other visit goes to the app. */
const SignUp = lazyRoute("/sign-up", () => import("./pages/site/account/SignUp"));
const SignIn = lazyRoute("/sign-in", () => import("./pages/site/account/SignIn"));
/* Doors into the web app: invitations, contribute links, old account pages. */
const AppDoor = lazyRoute("/join", () => import("./pages/site/AppDoor"));
const NotFound = lazyRoute("*", () => import("./pages/site/NotFound"));
const PrivateHome = lazyRoute(
  "/__design/a-story-home-vnext",
  () => import("./pages/site/PrivateHome"),
);

/** The sticky header remains in normal document flow. */
const Main = styled.main`
  padding-top: 0;
`;

/** Holds page height steady while a route chunk loads, so nothing jumps. */
const RouteFallback = styled.div`
  min-height: 60vh;
`;

function MarketingLayout() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Main id="main">
        <RouteTransition>
          <RouteErrorBoundary key={location.pathname}>
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </RouteErrorBoundary>
        </RouteTransition>
        <StickyStart key={location.pathname} />
      </Main>
      <Footer />
    </>
  );
}

/** Shared archive and contribute flows are standalone — no marketing chrome. */
function BareLayout() {
  return (
    <RouteTransition>
      <Seo
        title="Family archive - A Story"
        description="A family-controlled story and contribution link."
        path="/"
        noindex
      />
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </RouteTransition>
  );
}

const legacy = {
  "/experience": "/how-it-works",
  "/family": "/for-families",
  "/institution": "/care-communities",
  "/story": "/our-story",
  "/faq": "/questions",
  "/why-it-matters": "/#why-a-story",
};
/** /sign-in and /sign-up: the site's own form only on the way back to /reserve. */
function AuthDoor({ form }: { form: "sign-in" | "sign-up" }) {
  const { search } = useLocation();
  const next = new URLSearchParams(search).get("next") ?? "";
  if (next.startsWith("/reserve")) return form === "sign-in" ? <SignIn /> : <SignUp />;
  return (
    <AppDoor
      door={form === "sign-in" ? "sign-in" : "create-account"}
      path={"/" + form}
    />
  );
}
function Legacy({ to }: { to: string }) {
  const { search, hash } = useLocation();
  const [path, anchor] = to.split("#");
  return (
    <Navigate replace to={path + search + (anchor ? "#" + anchor : hash)} />
  );
}
initAnalytics();

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Routes>
        <Route
          path="/__design/a-story-home-vnext"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PrivateHome />
            </Suspense>
          }
        />
        <Route element={<BareLayout />}>
          <Route path="/p/:slug" element={<PublicStory />} />
          <Route path="/contribute/:slug" element={<Contribute />} />
          <Route path="/l" element={<Listen />} />
        </Route>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/how-it-works" element={<Experience />} />
          <Route path="/for-families" element={<Family />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/care-communities" element={<Institution />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/your-story" element={<YourStory />} />
          <Route path="/our-story" element={<Story />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/questions" element={<FAQ />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<Guide />} />
          {Object.entries(legacy).map(([path, to]) => (
            <Route key={path} path={path} element={<Legacy to={to} />} />
          ))}
          {/* Post-purchase. Stripe redirects here; noindex. */}
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/sign-up" element={<AuthDoor form="sign-up" />} />
          <Route path="/sign-in" element={<AuthDoor form="sign-in" />} />
          <Route path="/account" element={<AppDoor door="account" path="/account" />} />
          {/* Invitations and contribute links belong to the web app. */}
          <Route path="/join" element={<AppDoor door="join" path="/join" />} />
          <Route path="/join/:code" element={<AppDoor door="join" path="/join" />} />
          <Route path="/c/:slug" element={<AppDoor door="contribute" path="/c" />} />
          {/* The spellings people type, and the $29-only offer's old address.
              Kept out of `legacy` above: the contracts count those seven. */}
          <Route path="/founding" element={<Legacy to="/reserve" />} />
          <Route path="/signup" element={<Legacy to="/sign-up" />} />
          <Route path="/signin" element={<Legacy to="/sign-in" />} />
          <Route path="/login" element={<Legacy to="/sign-in" />} />
          {/* The app's legal links, as older builds spell them. */}
          <Route path="/terms.html" element={<Legacy to="/terms" />} />
          <Route path="/privacy.html" element={<Legacy to="/privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
