import type { PortableTextBlock } from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url';

export type SocialIcon = 'github' | 'linkedin' | 'bluesky' | 'mastodon' | 'x' | 'email' | 'link';

export interface SocialLink {
  _key: string;
  label: string;
  url: string;
  icon?: SocialIcon;
}

export interface SkillGroup {
  _key: string;
  category: string;
  items: string[];
}

export interface NavItem {
  _key: string;
  label: string;
  linkType: 'page' | 'anchor' | 'external';
  anchor?: string;
  url?: string;
  pageSlug?: string;
  hasContent?: boolean;
}

export interface SiteSettings {
  name: string;
  role?: string;
  location?: string;
  tagline?: string;
  email?: string;
  availableForWork?: boolean;
  availabilityNote?: string;
  resumeUrl?: string;
  footerNote?: string;
  socialLinks?: SocialLink[];
  skills?: SkillGroup[];
  navigation?: NavItem[];
  navPages?: NavItem[];
  homeAnchors?: NavItem[];
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  url?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  technologies?: string[];
}

export interface Education {
  _id: string;
  institution: string;
  qualification?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug?: string;
  summary: string;
  url?: string;
  repository?: string;
  year?: number;
  featured?: boolean;
  technologies?: string[];
  image?: SanityImageSource & { alt?: string };
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  noIndex?: boolean;
  ogImage?: SanityImageSource;
}

interface SectionBase {
  _key: string;
  anchor?: { current?: string };
}

export interface HeroSection extends SectionBase {
  _type: 'heroSection';
  headingOverride?: string;
  taglineOverride?: string;
  showAvailability?: boolean;
  showLinks?: boolean;
}

export interface RichTextSection extends SectionBase {
  _type: 'richTextSection';
  heading?: string;
  body: PortableTextBlock[];
}

export interface ExperienceSection extends SectionBase {
  _type: 'experienceSection';
  heading: string;
  limit?: number;
  items: Experience[];
}

export interface EducationSection extends SectionBase {
  _type: 'educationSection';
  heading: string;
  limit?: number;
  items: Education[];
}

export interface ProjectsSection extends SectionBase {
  _type: 'projectsSection';
  heading: string;
  limit?: number;
  projects: Project[];
}

export interface SkillsSection extends SectionBase {
  _type: 'skillsSection';
  heading: string;
}

export interface ContactSection extends SectionBase {
  _type: 'contactSection';
  heading: string;
  body?: PortableTextBlock[];
  showEmail?: boolean;
  showSocialLinks?: boolean;
}

export type Section =
  | HeroSection
  | RichTextSection
  | ExperienceSection
  | EducationSection
  | ProjectsSection
  | SkillsSection
  | ContactSection;

export interface PageDocument {
  _id: string;
  title: string;
  slug?: string;
  seo?: Seo;
  sections: Section[];
}
