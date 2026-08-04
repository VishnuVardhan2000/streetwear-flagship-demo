import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/layout/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FLIQ // Monolithic Architectural Luxury Streetwear',
  description:
    'FLIQ Unisex Clothing Flagship. Monolithic silhouettes, 500GSM French Terry, 14oz selvedge denim, and tactical urban utility wear from Madhapur, Hyderabad.',
  openGraph: {
    title: 'FLIQ // Monolithic Architectural Luxury Streetwear',
    description:
      'FLIQ Unisex Clothing Flagship. Monolithic silhouettes, 500GSM French Terry, 14oz selvedge denim, and tactical urban utility wear.',
    images: ['/images/products/fliq-look-01.jpg'],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
