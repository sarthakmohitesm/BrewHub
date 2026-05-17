import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'BrewHub | Premium Artisan Café',
  description:
    'Experience the finest artisanal coffee at BrewHub. From bean to cup, every sip is a journey through flavor, aroma, and craftsmanship.',
  keywords: 'coffee, café, artisan, premium, espresso, latte, brew',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <ParticlesBackground />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(26, 21, 16, 0.9)',
              color: '#f5e6d0',
              border: '1px solid rgba(200, 169, 126, 0.2)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}
