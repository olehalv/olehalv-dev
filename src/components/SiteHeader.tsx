import { Link, useLocation } from 'react-router';

import type { ResolvedNavItem } from '../lib/navigation';

interface SiteHeaderProps {
  name: string;
  items: ResolvedNavItem[];
}

export const SiteHeader = ({ name, items }: SiteHeaderProps) => {
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link to="/" className="site-header__mark">
          {name}
        </Link>
        {items.length > 0 && (
          <nav className="site-nav" aria-label="Sections">
            {items.map((item) => {
              if (item.external) {
                return (
                  <a key={item.key} href={item.href} target="_blank" rel="noreferrer noopener">
                    {item.label}
                  </a>
                );
              }

              if (item.href.startsWith('#')) {
                return onHome ? (
                  <a key={item.key} href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.key} to={{ pathname: '/', hash: item.href }}>
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link key={item.key} to={item.href}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
