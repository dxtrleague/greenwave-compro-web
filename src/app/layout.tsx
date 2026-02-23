import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yayasan Greenwave - Pemberdayaan Masyarakat & Konservasi Pesisir',
  description: 'Memberdayakan Pesisir, Menjaga Masa Depan. Yayasan Greenwave mengubah mindset konservasi dari sekadar menanam mangrove menjadi menciptakan nilai ekonomi berkelanjutan bagi komunitas.',
  keywords: ['Konservasi Mangrove', 'Pemberdayaan Pesisir', 'ESG', 'CSR Indonesia', 'Yayasan Lingkungan', 'Ekonomi Sirkular'],
  authors: [{ name: 'Yayasan Greenwave' }],
  creator: 'Yayasan Greenwave',
  publisher: 'Yayasan Greenwave',
  openGraph: {
    title: 'Yayasan Greenwave | Konservasi & Pemberdayaan Pesisir',
    description: 'Berdampak NYATA bagi Ekosistem dan Ekonomi Pesisir. Yayasan Greenwave adalah mitra utama Anda untuk investasi ESG dan program CSR yang berkelanjutan di Indonesia.',
    url: 'https://greenwave.or.id',
    siteName: 'Yayasan Greenwave',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584564760451-3121bfba1f42?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Pemberdayaan pesisir Yayasan Greenwave',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yayasan Greenwave',
    description: 'Mitra utama Anda untuk program CSR dan ESG berkelanjutan di Indonesia.',
    images: ['https://images.unsplash.com/photo-1584564760451-3121bfba1f42?auto=format&fit=crop&q=80&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased font-body bg-accent-light text-accent-dark`}>
        {children}
      </body>
    </html>
  );
}
