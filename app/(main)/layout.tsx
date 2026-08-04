import type { Metadata } from 'next';
import { Fraunces, Work_Sans } from 'next/font/google';
import '../../lib/seed';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Roosty's Homes — Accommodation, Bar & Restaurant in Mbarara",
  description:
    "Roosty's Homes offers cozy cottages, modern apartments, a vibrant bar and restaurant, party gardens and a kids' play area in Ruharo Nkokonjeru, Mbarara City.",
};

// Root layout for the real Roosty's Homes site — owns "/". Distinct from
// app/(sample-1)/ and app/(sample-2)/, which each keep their own independent
// root layout under Next's "multiple root layouts" pattern.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
