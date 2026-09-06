import type { HeroSection, SiteSettings } from '../../sanity/types';
import { ExternalLink } from '../ExternalLink';

interface HeroBlockProps {
  section: HeroSection;
  settings: SiteSettings;
}

export const HeroBlock = ({ section, settings }: HeroBlockProps) => {
  const heading = section.headingOverride ?? settings.name;
  const tagline = section.taglineOverride ?? settings.tagline;
  const showAvailability = section.showAvailability !== false;
  const showLinks = section.showLinks !== false;

  const links = showLinks
    ? [
        ...(settings.socialLinks ?? []).map(({ _key, label, url }) => ({
          key: _key,
          label,
          url,
        })),
        ...(settings.email
          ? [{ key: 'email', label: 'Email', url: `mailto:${settings.email}` }]
          : []),
        ...(settings.resumeUrl
          ? [{ key: 'resume', label: 'Résumé', url: settings.resumeUrl }]
          : []),
      ]
    : [];

  const showMeta =
    settings.location ||
    (showAvailability && (settings.availableForWork || settings.availabilityNote));

  return (
    <header className="shell hero">
      <div>
        <h1 className="hero__name">{heading}</h1>
        {settings.role && <p className="hero__role">{settings.role}</p>}
      </div>

      {showMeta && (
        <div className="hero__meta">
          {settings.location && <span>{settings.location}</span>}
          {showAvailability && (settings.availableForWork || settings.availabilityNote) && (
            <span className={`badge${settings.availableForWork ? ' badge--available' : ''}`}>
              <span className="badge__dot" aria-hidden="true" />
              {settings.availabilityNote ??
                (settings.availableForWork ? 'Available for work' : 'Not available')}
            </span>
          )}
        </div>
      )}

      {tagline && <p className="hero__tagline">{tagline}</p>}

      {links.length > 0 && (
        <nav className="link-row" aria-label="Profiles and contact">
          {links.map(({ key, label, url }) => (
            <ExternalLink key={key} href={url} className="link-chip">
              {label}
              <span className="link-chip__arrow" aria-hidden="true">
                ↗
              </span>
            </ExternalLink>
          ))}
        </nav>
      )}
    </header>
  );
};
