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
  - **Asset Fix (Product Catalog Images)**: Mengganti tautan gambar eksternal (Unsplash) yang tidak stabil dan tidak akurat dengan aset lokal di `/public/products/`. Menggunakan AI untuk menghasilkan gambar produk berkualitas tinggi yang lebih relevan dengan konteks mangrove (Madu Hutan Bakau, Keripik Buah Lindur, dan Batik Pewarna Alami).
  - **UI/UX Fix (Logo Optimization)**: Mengganti penggunaan `.jpg` dengan `.svg` untuk logo guna menghindari distorsi ("peyang") dan masalah transparansi. Melakukan *fine-tuning* pada aset `gre.svg` (menghapus layer background putih, memangkas *whitespace* internal via `viewBox`, dan menyesuaikan koordinat X/Y) untuk memastikan logo sejajar secara vertikal dan horizontal (*pixel-perfect alignment*) dengan elemen navigasi.
  - **CI/CD Fix**: Menyelesaikan masalah folder `out/` tidak ditemukan dengan menonaktifkan generator otomatis di GitHub Actions dan beralih ke `next.config.mjs`.
  - **Static Optimization**: Menambahkan `export const dynamic = "force-static"` pada halaman utama untuk menjamin pembuatan aset statis saat proses build.
  - **Route Cleanup**: Memindahkan seluruh komponen dinamis (API, Admin, Middleware) ke folder backup demi kelancaran proses `next build`.
  - **Zod & Params**: Perbaikan manual pada *property access* Zod `.issues` dan asinkron params tetap dipertahankan dalam kode backup untuk referensi masa depan.
  - **WhatsApp Integration (Collaboration Form)**: Mengganti simulasi pengiriman statis pada formulir kolaborasi dengan pengalihan langsung ke WhatsApp (`wa.me`). Implementasi mencakup format pesan otomatis yang berisi data dari formulir (Nama Instansi, Email, Fokus, dan Pesan), validasi input, serta dukungan *URL encoding* agar karakter khusus dapat terbaca sempurna oleh aplikasi WhatsApp.

## 6. Development Workflow (Docker)
Proyek ini sekarang mendukung containerisasi untuk konsistensi lingkungan development dan simulasi produksi (Static HTML).

- **Port Utama**: 8003 (Local Browser: `http://localhost:8003/`)
- **Fitur**: Hot-Reload aktif di mode dev. `node_modules` terisolasi di dalam container.
- **Shortcuts (Makefile)**:
  - `make start`: Menjalankan kontainer di *background*.
  - `make stop`: Menghentikan kontainer.
  - `make logs`: Memantau *application logs*.
  - `make shell`: Masuk ke terminal kontainer.
  - `make preview`: Membuat **Static Build** (bersih) dan menjalankannya via `npx serve` untuk tes hasil akhir murni sebelum di-push ke GitHub Pages.
