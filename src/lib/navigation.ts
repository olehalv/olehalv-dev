import type { NavItem, SiteSettings } from '../sanity/types';

export interface ResolvedNavItem {
  key: string;
  label: string;
  href: string;
  external: boolean;
}

const toHref = (item: NavItem): string | null => {
  if (item.linkType === 'external') return item.url ?? null;
  if (item.linkType === 'page') return item.pageSlug ? `/${item.pageSlug}` : null;
  return item.anchor ? `#${item.anchor}` : null;
};

export const resolveNavigation = (settings: SiteSettings): ResolvedNavItem[] => {
  const source = settings.navigation?.length
    ? settings.navigation
    : [...(settings.homeAnchors ?? []), ...(settings.navPages ?? [])];

  return source.flatMap((item) => {
    const href = toHref(item);
    if (!href || !item.label || item.hasContent === false) return [];
    return [
      {
        key: item._key,
        label: item.label,
        href,
        external: item.linkType === 'external',
      },
    ];
  });
};
