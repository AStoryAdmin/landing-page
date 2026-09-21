import { useEffect } from 'react';
import { applySeo, type SeoInput } from '../../lib/seo';

/**
 * Declarative wrapper around `applySeo`. Drop one at the top of every route:
 *
 *   <Seo title="…" description="…" path="/organizations" schema={[…]} />
 */
const Seo = (props: SeoInput) => {
    const { title, description, path, image, noindex } = props;
    const schemaKey = JSON.stringify(props.schema ?? []);

    useEffect(() => {
        applySeo({
            title,
            description,
            path,
            image,
            noindex,
            schema: JSON.parse(schemaKey),
        });
    }, [title, description, path, image, noindex, schemaKey]);

    return null;
};

export default Seo;
