# MASTER PROJECT CONTEXT

## 1. Project Overview
Proyek ini adalah sistem web Company Profile untuk GreenWave. Aplikasi ini sepenuhnya beroperasi secara statis (static export) dan dideploy ke **GitHub Pages**. Karena di-_host_ di sub-folder GitHub Pages, maka ada beberapa penyesuaian konfigurasi yang harus dijaga.

## 2. Tech Stack
- **Framework Utama**: Next.js 16+ (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: Local JSON Data (sebagai migrasi dari Prisma)
- **Deployment**: Static Export ke GitHub Pages
- **Deployment Pipeline**: GitHub Actions otomatis menggunakan branch `master`. Step `npx prisma generate` telah dihapus karena dependensi runtime database tidak lagi diperlukan dalam proses build statis.

## 3. Architecture Map
- **`src/app/`**: Folder utama untuk _routing_ aplikasi. Sejalan dengan _breaking change_ di Next.js, seluruh penggunaan parameter rute dinamis bersifat _Promise_, sehingga wajib diakses secara asinkron (misalnya: `const { id } = await params`).
- **`src/data/`**: Berfungsi sebagai pusat data untuk keseluruhan situs (menggantikan Prisma _database layer_). Seluruh data lokal disalurkan dari sini.
- **API Routes**: Terdapat pada sub-folder `src/app/api/` yang merupakan simulasi mode statis. Seluruh validasi input menggunakan `Zod` dengan *error handling* standar terbaru.

## 4. Critical Configs
- **Branch Deployment**: Wajib menggunakan branch `master` sebagai target penyelarasan dan *deployment* (hindari menyinggung atau menggunakan branch `main`).
- **Unoptimized Images**: Konfigurasi gambar harus berada di level _root_ objek pada `next.config.ts` (menggunakan properti `images: { unoptimized: true }`), dan dilarang untuk diletakkan di dalam blok `experimental`.
- **BasePath**: Aplikasi menggunakan `basePath` sebesar nama repositori saat berada dalam mode _production_, memastikan penautan file statis tidak rusak saat berjalan di sub-folder _domain_.

## 5. Current Stability
- **Build Status**: Stabil & Optimized.
- **Fixes Applied**:
  - _Build error_ akibat masalah peletakan `images.unoptimized` dalam `experimental` pada file `next.config.ts` telah diatasi dan dihapus.
  - Implementasi *property access* pada _Zod Error_ di API route telah diperbarui dari penggunaan usang `.errors` menjadi `.issues`.
  - Keseluruhan API _routing_ dinamis (`[id]`) telah diperbaiki untuk menyelesaikan *Async Params promise* dengan `const { id } = await params;`.
  - Pembersihan GitHub Actions Pipeline: Step `Prisma generate` telah dihapus untuk mempercepat proses build dan menghindari kegagalan dependensi database.
