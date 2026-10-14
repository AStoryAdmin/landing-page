import pages from "../../lib/sitePages.json";
import Seo from "./Seo";
import {
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
  founderSchemas,
} from "../../lib/seo";

export default function EditorialSeo({
  title,
  description,
  path,
  schema = [],
}: {
  title: string;
  description: string;
  path: string;
  /** Page-specific structured data, added after the shared schemas. */
  schema?: Record<string, unknown>[];
}) {
  return (
    <Seo
      title={title.includes("A Story") ? title : `${title} - A Story`}
      description={description}
      path={path}
      image={
        "/og/" + (pages.find((p) => p.path === path)?.og ?? "home") + ".jpg"
      }
      schema={[
        organizationSchema(),
        websiteSchema(),
        ...(path === "/our-story" ? founderSchemas() : []),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          ...(path === "/"
            ? []
            : [
                {
                  name: pages.find((p) => p.path === path)?.name ?? title,
                  path,
                },
              ]),
        ]),
        ...schema,
      ]}
    />
  );
}
