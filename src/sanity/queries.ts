import { defineQuery } from 'groq';

const projectFields = `
  _id,
  title,
  "slug": slug.current,
  summary,
  url,
  repository,
  year,
  featured,
  technologies,
  image
`;

const experienceFields = `
  _id,
  company,
  role,
  url,
  location,
  startDate,
  endDate,
  current,
  description,
  technologies
`;

const educationFields = `
  _id,
  institution,
  qualification,
  location,
  startDate,
  endDate,
  current,
  description
`;

const sectionProjection = `
  ...,
  _type == "projectsSection" => {
    "projects": select(
      source == "selected" => selected[]->{ ${projectFields} },
      source == "featured" => *[_type == "project" && featured == true] | order(coalesce(order, 999) asc, year desc){ ${projectFields} },
      *[_type == "project"] | order(featured desc, coalesce(order, 999) asc, year desc){ ${projectFields} }
    )
  },
  _type == "experienceSection" => {
    "items": *[_type == "experience"] | order(coalesce(order, 9999) asc, current desc, startDate desc){ ${experienceFields} }
  },
  _type == "educationSection" => {
    "items": *[_type == "education"] | order(current desc, startDate desc){ ${educationFields} }
  }
`;

const seoProjection = `
  seo{
    metaTitle,
    metaDescription,
    noIndex,
    ogImage
  }
`;

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    name,
    role,
    location,
    tagline,
    email,
    availableForWork,
    availabilityNote,
    resumeUrl,
    footerNote,
    socialLinks[]{ _key, label, url, icon },
    skills[]{ _key, category, items },
    "navigation": navigation[]{
      _key,
      label,
      linkType,
      anchor,
      url,
      "pageSlug": page->slug.current
    },
    "navPages": *[_type == "page" && showInNav == true] | order(title asc){
      "_key": _id,
      "label": title,
      "linkType": "page",
      "pageSlug": slug.current
    },
    "homeAnchors": *[_type == "homePage"][0].sections[defined(anchor.current)]{
      "_key": _key,
      "label": heading,
      "linkType": "anchor",
      "anchor": anchor.current,
      "hasContent": select(
        _type == "projectsSection" && source == "selected" => count(selected) > 0,
        _type == "projectsSection" && source == "featured" => count(*[_type == "project" && featured == true]) > 0,
        _type == "projectsSection" => count(*[_type == "project"]) > 0,
        _type == "experienceSection" => count(*[_type == "experience"]) > 0,
        _type == "educationSection" => count(*[_type == "education"]) > 0,
        _type == "skillsSection" => count(*[_type == "siteSettings"][0].skills) > 0,
        true
      )
    }
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    title,
    ${seoProjection},
    sections[]{ ${sectionProjection} }
  }
`);

export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    ${seoProjection},
    sections[]{ ${sectionProjection} }
  }
`);
