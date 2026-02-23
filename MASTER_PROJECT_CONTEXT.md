# MASTER PROJECT CONTEXT - RECONCILED DATA EDITION

## 📌 Project Identity
- **Project Name:** Yayasan Greenwave (yayasan-greenwave)
- **Description:** Official Company Profile for Yayasan Greenwave, focusing on environmental conservation, community impact, and sustainable mangrove products.
- **Target Deployment:** GitHub Pages (Static Site Generation - `output: 'export'`).

## 🛠 Tech Stack
- **Framework:** Next.js 16.1.6 (App Router)
- **Styling:** Tailwind CSS 4 (Vanilla CSS logic)
- **Animation:** Framer Motion & Lucide Icons
- **Primary Data Source:** `src/data/production-data.json` (Reconciled & Unified).
- **ORM (Dev only):** Prisma with SQLite (`prisma/dev.db`).

## 🗄️ Data Architecture & Reconciliation
The project has undergone a comprehensive data audit and reconciliation process. We have moved away from fragmented JSON files and mock fallbacks.

### 1. The Single Source of Truth (`src/data/production-data.json`)
This file is the **Core Data Source** for all frontend components. It is 100% composed of real data extracted from the database and reconciled with project content. All placeholder data has been removed or upgraded.
**JSON Schema:**
- `exportedAt`: Extraction timestamp.
- `impactMetrics`: Array of impact numeric data (Pohon, Pendapatan, etc).
- `programs`: Array of foundation mission pillars.
- `products`: Array of community-driven mangrove products categories.
- `collaborations`: Historical record of partnership inquiries.

### 2. The Database (`prisma/dev.db`)
- This is the local master source of truth.
- Tables included: `ImpactMetric`, `Program`, `Product`, and `Collaboration`.
- **DO NOT DELETE** this file; it is required for any future data updates or re-exports.

### 3. Reconciled Data Integrity
- All dummy IDs (e.g., `m1`, `p1`) from previous mock files have been replaced with unique identifiers (UUIDs).
- Duplicates between the database and previous static content have been merged, prioritizing the database records.

## ⚙️ Data Pipeline Scripts
Untuk memperbarui data tanpa server database aktif di produksi, kita menggunakan alur ekstraksi berikut:

1.  **`extract-db.ts` (The Extractor):** Mengambil data mentah dari SQLite (`prisma/dev.db`) menggunakan Prisma Client atau SQL raw dan mengubahnya menjadi format JSON mentah.
2.  **`scripts/finalize-data.js` (The Reconciler):** Melakukan audit data, penggabungan (merging) dengan konten statis tambahan, dan pembersihan ID dummy untuk menghasilkan file produksi akhir.

## 📂 Project Structure
- `src/data/production-data.json`: The only production data file (Single Source of Truth).
- `src/app/page.tsx`: Landing page utama, mengonsumsi data dari `production-data.json`.
- `prisma/`: Berisi `schema.prisma` dan master `dev.db`.
- `extract-db.ts`: Script utama ekstraksi data dari database.
- `scripts/finalize-data.js`: Script finalisasi dan audit data produksi.

## 🚀 Development Workflow
Jika ada perubahan data di Database (`prisma/dev.db`):
1.  Jalankan `npx ts-node extract-db.ts` untuk mengekstrak data terbaru.
2.  Jalankan `node scripts/finalize-data.js` untuk mensinkronisasi dan menulis ke `production-data.json`.
3.  Commit dan Push perubahan `production-data.json` agar website terupdate di GitHub Pages.

## ✅ Current Progress & Status
- **Data Audit:** COMPLETE. Verified comparison between `site-content.json` and `dev.db`.
- **Data Reconciliation:** COMPLETE. All data sources have been unified into `production-data.json`.
- **Component Update:** COMPLETE. All components in `src/app` point to the new reconciled data source.
- **Production Readiness:** 100%. The site uses 100% real extracted data.

## 📜 Dev History
- **Initial:** Basic Next.js setup with mock components.
- **Fragmented:** Used `site-content.json` for fallback and `database_export.json` for DB data.
- **Audit & Reconcile (Feb 2026):** Unified both sources into a single high-integrity production file.
