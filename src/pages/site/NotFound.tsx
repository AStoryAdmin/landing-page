import styled from "styled-components";
import Seo from "../../components/ui/Seo";
import { ArrowIcon, PageOpening } from "./kit/kit";
import { PrimaryLink, TextAnchor, TextLink } from "./kit/kit.styles";
import { isFile, route, type RoutePath } from "../../lib/nav";
import { space } from "../../styles/theme";

/** Where a lost reader can start again (design spec §4D), named as nav.ts names them. */
const PLACES: RoutePath[] = ["/how-it-works", "/samples", "/questions", "/contact"];

/* Its own line under the one button, in the row of actions. */
const Places = styled.nav`
  flex: 1 1 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0 ${space.xl};
`;

/**
 * A clear message, the way home, and four places to start (premium pass:
 * on the ivory page, words alone, `solo`).
 */
export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found - A Story"
        path="/404"
        description="This page could not be found."
        noindex
      />
      <PageOpening
        ground="ivory"
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
            <Places aria-label="Places to start">
              {PLACES.map((p) => {
                const r = route(p);
                return isFile(r.to) ? (
                  <TextAnchor key={p} href={r.to}>
                    {r.label}
                  </TextAnchor>
                ) : (
                  <TextLink key={p} to={r.to}>
                    {r.label}
                  </TextLink>
                );
              })}
            </Places>
          </>
        }
      />
    </>
  );
}
