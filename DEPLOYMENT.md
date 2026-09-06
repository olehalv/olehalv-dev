# Deployment

The site is deployed to **Firebase Hosting** by `.github/workflows/deploy-firebase.yml`. Every
push to `main` goes to production; every pull request gets its own preview channel that expires
after 7 days.

`firebase.json` holds the hosting config: the SPA rewrite that `/studio/*` and `/:slug` need,
immutable caching on hashed assets, `no-cache` on `index.html`, and `noindex` on the Studio.

Authentication uses Workload Identity Federation. No service account key is stored in the
repository.

## One-time setup

### 1. Pick the right Google account

Every command below runs under the account that should own the hosting project. Check which one
the CLI is currently using:

```bash
gcloud auth list
gcloud config get-value project
```

If that is not the account you want (a work account, say), switch before doing anything else:

```bash
gcloud auth login
gcloud config set account you@example.com
```

### 2. Create the project

Create a project at https://console.firebase.google.com while signed in as the intended owner.
Note the **project ID**, not the display name.

```bash
export FB_PROJECT=your-firebase-project-id
export GH_REPO=your-github-user/your-repo

gcloud config set project "$FB_PROJECT"
gcloud services enable firebasehosting.googleapis.com iamcredentials.googleapis.com
```

Put the project ID into `.firebaserc`, replacing the placeholder.

### 3. Create the deploy service account

```bash
gcloud iam service-accounts create github-deployer \
  --display-name="GitHub Actions deployer"

export SA="github-deployer@$FB_PROJECT.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding "$FB_PROJECT" \
  --member="serviceAccount:$SA" --role="roles/firebasehosting.admin"
gcloud projects add-iam-policy-binding "$FB_PROJECT" \
  --member="serviceAccount:$SA" --role="roles/serviceusage.serviceUsageConsumer"
```

### 4. Let GitHub Actions impersonate it

```bash
gcloud iam workload-identity-pools create github \
  --location=global --display-name="GitHub Actions"

gcloud iam workload-identity-pools providers create-oidc github \
  --location=global --workload-identity-pool=github \
  --display-name="GitHub" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository == '$GH_REPO'"

export PROJECT_NUMBER=$(gcloud projects describe "$FB_PROJECT" --format="value(projectNumber)")

gcloud iam service-accounts add-iam-policy-binding "$SA" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/attribute.repository/$GH_REPO"

echo "GCP_WORKLOAD_IDENTITY_PROVIDER = projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/providers/github"
echo "GCP_SERVICE_ACCOUNT            = $SA"
echo "GCP_PROJECT_ID                 = $FB_PROJECT"
```

The `--attribute-condition` restricts the provider to this repository. Without it, any GitHub
repository could assume the service account.

### 5. Add the repository variables

In GitHub: Settings -> Secrets and variables -> Actions -> **Variables**. All six are public
values, so they are variables rather than secrets.

| Variable                         | Value                                       |
| -------------------------------- | ------------------------------------------- |
| `GCP_PROJECT_ID`                 | the Firebase project ID                     |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | printed by step 4                           |
| `GCP_SERVICE_ACCOUNT`            | printed by step 4                           |
| `VITE_SANITY_PROJECT_ID`         | the Sanity project ID                       |
| `VITE_SANITY_DATASET`            | `production`                                |
| `VITE_SANITY_API_VERSION`        | the pinned API date, e.g. `2026-09-06`      |

Vite inlines `VITE_*` values at build time, so they end up in the JavaScript bundle either way.
Never put a Sanity write token, or any other real secret, in a `VITE_*` variable.

### 6. Allow the deployed origins in Sanity

Without this the site still reads published content, but the embedded Studio hangs on a spinner
instead of showing a login screen:

```bash
npx sanity cors add "https://$FB_PROJECT.web.app" --credentials
npx sanity cors add https://your-custom-domain.example --credentials
```

Preview channels get their own generated subdomains. Reading works from any origin, so previews
render fine, but signing in to `/studio` from a preview URL will not work unless that exact
origin is added too.

### 7. Custom domain

Once the first deploy is green: Firebase console -> Hosting -> Add custom domain, then point the
domain at the A records it gives you. The certificate is issued automatically. Remember to add
the domain to the Sanity CORS list as well.

## Deploying by hand

If the workflow is unavailable:

```bash
npm run build
npx firebase-tools deploy --only hosting --project your-firebase-project-id
```

## Troubleshooting

**The Studio spins forever after deploying.** The origin is missing from Sanity's CORS list, or
it was added without `--credentials`. An entry added without credentials has to be deleted and
re-added; there is no way to edit it in place.

**The workflow fails at the auth step.** The `--attribute-condition` has to match the repository
exactly, in `owner/repo` form. It is also worth confirming that `iamcredentials.googleapis.com`
is enabled on the project.

**The deployed site shows fallback content.** The `VITE_SANITY_*` repository variables were
missing when the bundle was built. They are read at build time, not at runtime, so the fix is to
add them and re-run the workflow.

**Content changes take about a minute to show up.** The site reads through Sanity's CDN
(`useCdn: true` in `src/sanity/client.ts`).
