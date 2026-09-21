import Seo from "../../components/ui/Seo";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { PrimaryLink, TextLink } from "./kit/kit.styles";

/** A clear message and two ways back. Nothing else earns a place here. */
export default function NotFound() {
  return (
    <>
      <Seo title="Page not found — A Story" path="/404" description="This page could not be found." noindex />
      <PageOpening
        eyebrow="Page not found"
        title={
          <>
            This page isn’t <em>here.</em>
          </>
        }
        lead="The address may have changed. Every story on the site starts from the home page."
        actions={
          <>
            <PrimaryLink to="/">
              Back to A Story <ArrowIcon />
            </PrimaryLink>
            <TextLink to="/questions">Questions &amp; answers</TextLink>
          </>
        }
      />
    </>
  );
}
