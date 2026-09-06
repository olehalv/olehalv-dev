import { useParams } from 'react-router';
import { SiteLayout } from '../components/SiteLayout';
import { SectionRenderer } from '../components/sections/SectionRenderer';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useSanityQuery } from '../lib/useSanityQuery';
import { useSite } from '../lib/useSite';
import { pageBySlugQuery } from '../sanity/queries';
import type { PageDocument } from '../sanity/types';
import NotFoundPage from './NotFoundPage';

const PageRoute = () => {
  const { slug } = useParams();
  const { settings } = useSite();
  const { status, data } = useSanityQuery<PageDocument | null>(pageBySlugQuery, {
    slug: slug ?? '',
  });

  useDocumentMeta(data ? `${data.title} - ${settings.name}` : settings.name, data?.seo);

  if (status === 'loading') {
    return (
      <div className="centered-state" role="status">
        Loading…
      </div>
    );
  }

  if (!data) return <NotFoundPage />;

  return (
    <SiteLayout settings={settings}>
      <SectionRenderer sections={data.sections ?? []} settings={settings} />
    </SiteLayout>
  );
};

export default PageRoute;
