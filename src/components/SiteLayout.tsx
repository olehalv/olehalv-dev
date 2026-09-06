import type { ReactNode } from 'react';

import { resolveNavigation } from '../lib/navigation';
import { useScrollToHash } from '../lib/useScrollToHash';
import type { SiteSettings } from '../sanity/types';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface SiteLayoutProps {
  settings: SiteSettings;
  ready?: boolean;
  children: ReactNode;
}

export const SiteLayout = ({ settings, ready = true, children }: SiteLayoutProps) => {
  useScrollToHash(ready);

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader name={settings.name} items={resolveNavigation(settings)} />
      <main id="main" className="main">
        {children}
      </main>
      <SiteFooter name={settings.name} note={settings.footerNote} />
    </div>
  );
};
