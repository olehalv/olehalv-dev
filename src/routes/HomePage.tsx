import { SiteLayout } from '../components/SiteLayout';
import { SectionRenderer } from '../components/sections/SectionRenderer';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useSanityQuery } from '../lib/useSanityQuery';
import { useSite } from '../lib/useSite';
import { fallbackHomePage } from '../sanity/fallback';
import { homePageQuery } from '../sanity/queries';
import type { PageDocument } from '../sanity/types';

const HomePage = () => {
  const { settings } = useSite();
  const { status, data } = useSanityQuery<PageDocument | null>(homePageQuery);
  const page = data ?? fallbackHomePage;

  useDocumentMeta(settings.role ? `${settings.name} - ${settings.role}` : settings.name, page.seo);

  return (
    <SiteLayout settings={settings} ready={status !== 'loading'}>
      <SectionRenderer sections={page.sections ?? []} settings={settings} />
    </SiteLayout>
  );
};

export default HomePage;
