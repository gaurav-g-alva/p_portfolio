# Deployment Guide — Chiron Portfolio

This guide covers deployment pipelines for the portfolio. It includes instructions for both **GitHub Pages** (via GitHub Actions) and **Netlify** (which supports Netlify Identity authentication for Decap CMS).

---

## 1. Hosting on GitHub Pages

GitHub Pages is a great free hosting option for static Astro websites. 

### A. Configure Astro for GitHub Pages
Before deploying, you must configure Astro's routing parameters in [astro.config.mjs](file:///d:/pjp/astro.config.mjs):

1. **`site`**: Set this to your GitHub Pages URL (e.g., `https://<username>.github.io`).
2. **`base`**: If you are deploying to a project repository (e.g., `https://<username>.github.io/my-portfolio`), set this to your repository name (e.g., `base: '/my-portfolio'`). If you are deploying to your primary user site (`<username>.github.io`), leave `base` undefined.

Example [astro.config.mjs](file:///d:/pjp/astro.config.mjs) configuration:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://alexcarter.github.io', // Replace with your domain
  base: '/portfolio',                   // Replace with repository name, or omit if user page
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### B. Setup GitHub Actions Deployment
We have configured a GitHub Action at `.github/workflows/deploy.yml` that builds and deploys your portfolio automatically on every push to the `main` branch.

To enable GitHub Pages in your repository:
1. Go to your GitHub Repository -> **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Push your code to the `main` branch. GitHub Actions will build the site and deploy it.

---

## 2. Decap CMS Authentication in Production

Decap CMS is a Git-based CMS and needs authorization to commit changes back to your GitHub repository.

### Option A: Netlify Identity & Git Gateway (Recommended)
Netlify provides Git Gateway out-of-the-box, allowing you to invite editors who can sign in with an email/password without needing GitHub accounts.

1. **Deploy to Netlify**: Connect your GitHub repository to Netlify. Netlify will auto-detect Astro and deploy it.
2. **Enable Netlify Identity**:
   - In Netlify Dashboard, go to **Site configuration** -> **Identity**.
   - Click **Enable Identity**.
   - Under **Registration preferences**, change to **Invite only** (highly recommended so random people cannot sign up).
3. **Enable Git Gateway**:
   - Scroll down to the **Services** section under **Identity**.
   - Under **Git Gateway**, click **Enable Git Gateway** and link your GitHub account.
4. **Invite Users**: Go to the **Identity** tab at the top, click **Invite users**, and enter the email address(es) of the editors.
5. **Netlify Identity Widget**: Our base [Layout.astro](file:///d:/pjp/src/layouts/Layout.astro) already imports the Netlify Identity widget and handles logins at `/admin/`. No further layout code modifications are needed.

### Option B: OAuth Client Provider (For non-Netlify hosting like GitHub Pages)
If you deploy to GitHub Pages, you cannot use Netlify's Git Gateway. Instead, you need an OAuth provider to authenticate users with GitHub:

1. **Register a GitHub OAuth App**:
   - Go to GitHub -> **Settings** -> **Developer settings** -> **OAuth Apps** -> **New OAuth App**.
   - Set the Authorization callback URL to your OAuth server (e.g. `https://your-oauth-provider.com/callback`).
2. **Setup an External OAuth Server**:
   - Decap CMS requires an external server to complete the authorization flow. You can deploy a free helper like `github-oauth-portal` or `decap-cms-oauth` on Vercel or Render.
3. **Update config.yml**:
   - Open [public/admin/config.yml](file:///d:/pjp/public/admin/config.yml).
   - Change the `backend` block:
     ```yaml
     backend:
       name: github
       repo: username/repo-name
       auth_endpoint: https://your-oauth-provider.com/auth
     ```
