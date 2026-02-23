# MASTER PROJECT CONTEXT

## 📌 Project Identity
- **Project Name:** Yayasan Greenwave (yayasan-greenwave)
- **Description:** Official Company Profile for Yayasan Greenwave, focusing on environmental conservation (mangrove), community impact, and sustainable products.
- **Repository:** `greenwave-compro-web`
- **Target Deployment:** GitHub Pages (Static Site Export).
- **Live URL:** [https://dxtrleague.github.io/greenwave-compro-web/](https://dxtrleague.github.io/greenwave-compro-web/)

## 🛠 Tech Stack
- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (using `@tailwindcss/postcss`)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **ORM & Database:** Prisma with SQLite (Development/Server-side context)
- **Deployment:** GitHub Actions

## ⚙️ Technical Configurations
### 1. Git Strategy
- **Primary Branch:** `master` (Crucial: This project uses `master` as the default branch, NOT `main`).

### 2. Next.js Config (`next.config.ts`)
- **Output:** `export` (Ensures the project is built as a static site).
- **Base Path / Asset Prefix:** `isProd ? "/greenwave-compro-web" : ""` (Configured for sub-folder deployment on GitHub Pages).
- **Images:** `unoptimized: true` (Required for static export as GitHub Pages cannot use Next.js's default image optimization).

### 3. Deployment Pipeline (`.github/workflows/deploy.yml`)
- **Trigger:** Automated on push to `master` branch.
- **Process:**
  - Installs dependencies.
  - Generates Prisma Client.
  - Runs `next build`.
  - Uploads the `./out` directory as a deployment artifact.
  - Deploys to GitHub Pages via `actions/deploy-pages`.

## 📂 Architecture Map
### Core Structure
- `src/app/`: App Router structure.
  - `page.tsx`: Main landing page (Company Profile).
  - `layout.tsx`: Root layout with font and global styles.
  - `api/v1/`: API Route Handlers (Note: These are exported in development but ignored in static `out` production build).
  - `admin/`: Admin panel routes for data management.
- `src/components/`: Reusable UI components (e.g., `HeroSection`, `GreenwaveLogo`).
- `src/lib/`: Utility libraries (Prisma client instance).
- `prisma/`: Database schema and migrations (SQLite).

### API Route Handling (Next.js 15/16 Style)
All dynamic route handlers (e.g., `src/app/api/v1/products/[id]/route.ts`) implement **Async Params**.
```typescript
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    // logic...
}
```

## 🚀 Current State & Known Issues
- **Stable Features:** Landing page, Hero section, and basic data models (Impact, Programs, Products).
- **Static Export Limitation:** Since the project uses `output: 'export'`, API Route Handlers in `src/app/api` and direct Prisma/SQLite interactions will **not work** on the live GitHub Pages site. They are currently intended for local development or future server-side hosting migration.
- **Node.js Environment:** Configured to run on Node 20+ (current CI uses `node-version: "20"`).

## 📜 Architecture History (Prompts 1 - 5)
- **PROMPT 1:** Initial configuration for GitHub Pages deployment. Setup `output: 'export'`, `basePath`, and `assetPrefix` in `next.config.ts`.
- **PROMPT 2:** Correction of primary branch from `main` to `master` in GitHub Actions and documentation.
- **PROMPT 3:** Migration to Next.js 15/16 pattern. Refactored all API Route Handlers to use `Promise` for dynamic parameters. Root-level cleanup of `images` configuration.
- **PROMPT 4:** Audit and stabilization of Prisma schema for Impact Metrics, Programs, Products, and Collaborations.
- **PROMPT 5:** Deep Technical Audit and Document Rewrite (Current). Comprehensive mapping of the entire stack and deployment constraints to ensure AI Agent continuity.
