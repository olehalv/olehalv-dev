# olehalv.dev

Personal portfolio site. React + TypeScript + Vite, with Sanity Studio embedded in the same
application at `/studio`.

## Stack

| | |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Routing | React Router |
| Content | Sanity, with the Studio embedded at `/studio` |
| Lint and format | Biome |
| Hosting | Firebase Hosting, deployed by GitHub Actions |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: http://localhost:5173
- Studio: http://localhost:5173/studio

`.env.local` needs a Sanity project ID. Without one the site renders built-in fallback content
and `/studio` shows a short "not configured" message, so a fresh clone still runs.

### Pointing it at your own Sanity project

```bash
npx sanity login
npx sanity init --env .env.local --env-var-prefix VITE
```

Then allow the origins you serve from:

```bash
npx sanity cors add http://localhost:5173 --credentials
```

Without `--credentials` the site can still read published content, but the Studio hangs on a
spinner instead of showing a login screen.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server, site and Studio together |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | Biome: lint, format check and import sorting, no writes |
| `npm run format` | The same checks, applying every safe fix |

[Biome](https://biomejs.dev) handles both linting and formatting, configured in `biome.json`, in
place of ESLint and Prettier. For editors, install the Biome extension and set it as the default
formatter.

## Routing and bundling

```
index.html -> src/main.tsx -> src/App.tsx
                                |-- /          -> src/routes/HomePage.tsx   (the homePage document)
                                |-- /:slug     -> src/routes/PageRoute.tsx  (any page document)
                                |-- /studio/*  -> src/routes/StudioPage.tsx (Sanity Studio)
```

Every route is lazy-loaded, so the bundler splits the Studio onto its own chunks. Loading the
site pulls just under 100 kB of gzipped JavaScript. The Studio chunks are fetched only on
`/studio`.

Do not add a `manualChunks` rule that forces `sanity`/`@sanity` into a single chunk. It breaks
the Studio's internal module graph and the Studio boots to an endless spinner.

`sanity.config.ts` sets `basePath: '/studio'`, which has to stay in sync with the route. Both
read it from `studioBasePath` in `src/sanity/env.ts`, so there is one place to change it.

## Layout

```
biome.json                  Lint and format config
firebase.json               Hosting config: SPA rewrite, caching, headers
sanity.config.ts            Studio config (schema, plugins, basePath)
sanity.cli.ts               Only used by the `sanity` CLI
src/
  routes/                   HomePage, PageRoute, StudioPage, NotFoundPage
  components/               Presentational pieces of the site
    sections/               One renderer per page-builder block
  lib/                      Data hooks, navigation and meta helpers
  sanity/
    env.ts                  Project ID, dataset, Studio base path
    client.ts               Read-only client and image URL builder
    queries.ts              GROQ queries
    types.ts                TypeScript shapes for the query results
    fallback.ts             Content shown before Sanity is connected
    structure.ts            Studio desk structure and singletons
    schema/
      documents/            siteSettings, homePage, page, experience, education, project
      objects/              socialLink, skillGroup, navItem, seo
      sections/             The page-builder blocks
  styles/                   global.css (tokens, reset) and site.css (components)
```

## Content model

The Studio sidebar has six entries:

| Entry | What it is |
| --- | --- |
| **Home page** | Singleton. The front page, built from an ordered list of sections. |
| **Pages** | Any number of extra pages. The slug becomes the URL, so `about` serves `/about`. |
| **Projects** | Portfolio entries, with `featured` and a manual order override. |
| **Experience** | Roles, ordered manually with a start-date fallback. |
| **Education** | Schools and qualifications. |
| **Site settings** | Singleton. Name, role, tagline, contact, social links, skills, navigation. |

### Building a page

The home page and every other page are assembled from the same sections, which you drag to
reorder:

| Section | What it renders |
| --- | --- |
| `Hero` | Name, role, location, availability badge and social links from Site settings. |
| `Rich text` | A heading plus formatted text, links and images. |
| `Experience` | Experience entries, optionally capped. |
| `Education` | Education entries, optionally capped. |
| `Projects` | All projects, only the featured ones, or a hand-picked list. |
| `Skills` | The skill groups from Site settings. |
| `Contact` | Text plus the email address and social links from Site settings. |

Give a section an **anchor** to make it linkable as `#anchor` and eligible for the navigation.

### Navigation

Leave **Site settings -> Navigation** empty and the header is built from every home page section
with an anchor, followed by every page marked _Show in navigation_. Sections that would render
nothing, such as a Projects section with no projects, are left out.

Fill the Navigation list in to override that. Each item links to a page, a home page anchor, or
an external URL.

### Notes

- A section with no content renders nothing rather than an empty heading. No field is mandatory.
- Content is read through Sanity's CDN, so edits take about a minute to appear on the site.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md).

## License

[MIT](LICENSE)
