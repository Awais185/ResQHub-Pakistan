import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ResQHub Pakistan — Connect. Support. Recover.',
  description: 'Unified disaster management and humanitarian coordination platform for Lahore District.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='M24 4L4 18v22a4 4 0 004 4h32a4 4 0 004-4V18L24 4z' fill='%231769AA'/%3E%3C/svg%3E" />
      </head>
      <body>{children}</body>
    </html>
  );
}
