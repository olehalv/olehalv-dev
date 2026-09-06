import { fallbackSettings } from '../sanity/fallback';
import { siteSettingsQuery } from '../sanity/queries';
import type { SiteSettings } from '../sanity/types';
import { useSanityQuery } from './useSanityQuery';

export interface SiteState {
  settings: SiteSettings;
  loading: boolean;
  usingFallback: boolean;
}

export const useSite = (): SiteState => {
  const { status, data } = useSanityQuery<SiteSettings | null>(siteSettingsQuery);

  return {
    settings: data ?? fallbackSettings,
    loading: status === 'loading',
    usingFallback: !data,
  };
};
