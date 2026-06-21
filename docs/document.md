# Chiron Portfolio Documentation

This documentation covers the architecture, components, configuration system, and content management pipeline for the Chiron Developer Portfolio.

---

## 1. Architecture Overview

The portfolio is built on a modern, static-first web stack optimized for performance, accessibility, and clean design.

- **Frontend Framework**: **Astro v5** (Static Site Generator) provides zero-JavaScript by default, compiling Markdown and JSON into static HTML/CSS files.
- **Styling Engine**: **Tailwind CSS v4** utilizing the new `@tailwindcss/vite` plugin.
- **CMS Management**: **Decap CMS** (a Git-based, client-side CMS) for managing site metadata and dynamic content directories.
- **Iconography**: Clean, lightweight SVG-based vector icons for consistency and performance.

---

## 2. Codebase Structure

The codebase is modularly organized to separate content data, styling tokens, components, and page layouts:

```
├── .github/workflows/   # CI/CD deployment pipelines
├── docs/                # Project documentation and deployment guides
├── public/              # Static public assets (images, favicon, etc.)
│   ├── admin/           # Decap CMS dashboard loader and configuration
│   └── images/          # Content and headshot images
├── src/
│   ├── components/      # Modular layout components (Hero, About, Projects, timeline)
│   ├── data/            # JSON settings databases (config.json)
│   ├── layouts/         # Layout.astro base template wrapper
│   ├── pages/           # Pages and dynamic routes (projects, blog posts)
│   ├── styles/          # global.css design system tokens
│   ├── config.ts        # TypeScript configuration parser
│   └── content.config.ts# Content collection schemas definitions
├── package.json         # Node.js dependencies and run scripts
└── astro.config.mjs     # Astro compiler configuration options
```

---

## 3. Configuration & Content Pipeline

### A. Central Site Settings (`src/data/config.json`)
The core profile settings (personal details, about text, capabilities list, social links) are stored in a simple JSON file. This acts as the single source of truth for the layouts:
```json
{
  "name": "alex carter",
  "title": "systems architect & developer",
  "description": "minimalist developer portfolio...",
  "accentColor": "#be4a1f",
  ...
}
```
This file is read by `src/config.ts` and imported throughout pages and components.

### B. Content Collections
Dynamic content (work projects, blog articles, experience timelines, education) are modeled as **Content Collections** in `src/content.config.ts`. The schemas are defined as:
1. **Projects**: Contains fields for `title`, `description`, `link` (optional), `skills` (list), and `thumbnail` (optional). Reads from `src/content/projects/*.md`.
2. **Blog**: Contains fields for `title`, `date`, `description`, and `thumbnail` (optional). Reads from `src/content/blog/*.md`.
3. **Experience**: Contains fields for `company`, `title`, `dateRange`, and `bullets` (list). Reads from `src/content/experience/*.md`.
4. **Education**: Contains fields for `school`, `degree`, `dateRange`, and `achievements` (list). Reads from `src/content/education/*.md`.

---

## 4. Decap CMS Integration

Decap CMS is initialized inside [public/admin/index.html](file:///d:/pjp/public/admin/index.html) and configured by [public/admin/config.yml](file:///d:/pjp/public/admin/config.yml). It connects to the local filesystem or your GitHub repository.

### Local Development Usage
To manage content locally without pushing commits to GitHub:
1. Run the local Decap proxy server:
   ```bash
   npx decap-server
   ```
2. In a separate terminal, launch the dev server:
   ```bash
   npm run dev
   ```
3. Open your browser and go to `http://localhost:4321/admin/`. You can create posts, add projects, or change site configuration, and the CMS will save the updates directly to your local file system.

### Production Git Gateway Usage
In production, Decap CMS commits changes directly to your GitHub repository, triggering CI/CD builders. By default, it uses **Git Gateway** (supported by Netlify) to manage authentication, allowing secure user logins.
