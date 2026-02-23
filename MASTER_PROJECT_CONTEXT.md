# MASTER PROJECT CONTEXT

## 1. Project Overview
Proyek ini adalah sistem web Company Profile untuk GreenWave. Aplikasi ini sepenuhnya beroperasi secara statis (**Static Export**) dan dideploy ke **GitHub Pages**. Karena di-_host_ di sub-folder GitHub Pages, maka ada beberapa penyesuaian konfigurasi yang harus dijaga untuk memastikan aset dan *routing* berjalan lancar.

## 2. Tech Stack
- **Framework Utama**: Next.js 16+ (App Router) - Output: `export`
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: Local JSON Data (`src/data/production-data.json`)
- **Deployment**: GitHub Pages (Static Hosting)
- **Deployment Pipeline**: GitHub Actions otomatis menggunakan branch `master`.

## 3. Architecture Map
- **`src/app/`**: Berisi rute publik. Hanya mendukung komponen statis karena batasan *static export*.
- **`src/data/`**: Pusat data utama aplikasi. Menggantikan peran database (Prisma/SQLite) untuk lingkungan produksi.
- **Backup Folders**: 
  - `src/api_backup/`: Berisi kode API yang tidak bisa digunakan dalam *static export*.
  - `src/admin_backup/`: Berisi dashboard admin (dynamic) yang sementara dipisahkan dari build utama.
  - `src/middleware_backup.ts.bak`: Middleware dinonaktifkan karena tidak didukung pada hosting statis.

## 4. Critical Configs
- **next.config.mjs**: Menggunakan format `.mjs` untuk kompatibilitas build CI yang lebih baik.
- **Static Constraints**:
  - `images: { unoptimized: true }` wajib aktif.
  - `basePath` & `assetPrefix` disetel ke `/greenwave-compro-web` pada produksi.
  - `trailingSlash: true` diaktifkan untuk konsistensi URL di GitHub Pages.
- **GitHub Actions (`deploy.yml`)**:
  - `Setup Pages` disetel manual (tanpa `static_site_generator: next`) untuk menghindari konflik injeksi file `next.config.js` otomatis yang sering merusak konfigurasi `export`.
  - Step `Clean Conflicting Configs` ditambahkan untuk menghapus config TS/JS otomatis yang muncul di runner.

## 5. Current Stability
- **Build Status**: **STABLE** (Static Export Berhasil).
- **Recent Fixes**:
  - **CI/CD Fix**: Menyelesaikan masalah folder `out/` tidak ditemukan dengan menonaktifkan generator otomatis di GitHub Actions dan beralih ke `next.config.mjs`.
  - **Static Optimization**: Menambahkan `export const dynamic = "force-static"` pada halaman utama untuk menjamin pembuatan aset statis saat proses build.
  - **Route Cleanup**: Memindahkan seluruh komponen dinamis (API, Admin, Middleware) ke folder backup demi kelancaran proses `next build`.
  - **Zod & Params**: Perbaikan manual pada *property access* Zod `.issues` dan asinkron params tetap dipertahankan dalam kode backup untuk referensi masa depan.
