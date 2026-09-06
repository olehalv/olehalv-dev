import type { ContactSection, SiteSettings } from '../../sanity/types';
import { ExternalLink } from '../ExternalLink';
import { Prose } from '../Prose';
import { Section } from '../Section';

interface ContactBlockProps {
  section: ContactSection;
  settings: SiteSettings;
  anchor?: string;
}

export const ContactBlock = ({ section, settings, anchor }: ContactBlockProps) => {
  const showEmail = section.showEmail !== false && Boolean(settings.email);
  const links = section.showSocialLinks !== false ? (settings.socialLinks ?? []) : [];

  return (
    <Section id={anchor ?? section._key} title={section.heading}>
      <div className="contact">
        <Prose value={section.body} />

        {showEmail && settings.email && (
          <p className="contact__email">
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </p>
        )}

        {links.length > 0 && (
          <nav className="link-row" aria-label="Profiles">
            {links.map(({ _key, label, url }) => (
              <ExternalLink key={_key} href={url} className="link-chip">
                {label}
                <span className="link-chip__arrow" aria-hidden="true">
                  ↗
                </span>
              </ExternalLink>
            ))}
          </nav>
        )}
      </div>
    </Section>
  );
};
