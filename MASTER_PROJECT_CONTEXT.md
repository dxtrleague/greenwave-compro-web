# MASTER PROJECT CONTEXT

## Project Overview
**Project Name:** yayasan-greenwave
**Repository:** greenwave-compro-web
**Deployment Target:** GitHub Pages (Static Site Export)

## Git Configuration
**Primary Branch:** `master`

## Deployment Configuration (2025-02-24)
This project has been configured to be deployed as a static site (SSG) to GitHub Pages.

### Changes Made (Prompt 1):
1. **Next.js Configuration (`next.config.ts`):**
   - Enabled `output: 'export'` for static HTML export.
   - Configured `basePath` and `assetPrefix` to `/greenwave-compro-web` to support sub-folder deployment on GitHub Pages.
   - Set `images.unoptimized: true` to bypass Next.js Image Optimization.
2. **GitHub Actions Workflow:**
   - Created `.github/workflows/deploy.yml` to automate the build and deployment process.
   - It performs dependency installation, Prisma client generation, and `next build`.
   - The exported static files (from the `out` directory) are uploaded and deployed to GitHub Pages.

### Changes Made (Prompt 2):
1. **Primary Branch Correction:**
   - Updated `.github/workflows/deploy.yml` trigger from `main` to `master`.
   - Audited the codebase for "main" branch references (none found in `package.json` or `README.md`).
   - Documented `master` as the primary branch.

### Access Link:
[https://dxtrleague.github.io/greenwave-compro-web/](https://dxtrleague.github.io/greenwave-compro-web/)


## References
- **Prompt Ref:** Configuration for GitHub Pages deployment (SSG, App Router, Automation).
- **Framework:** Next.js (App Router).
- **Image Handling:** Unoptimized loader.
