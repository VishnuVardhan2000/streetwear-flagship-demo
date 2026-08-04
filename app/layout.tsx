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
  metadataBase: new URL('https://streetwear-flagship-demo.vercel.app'),
  title: 'FLIQ // Unisex Clothing Flagship',
  description:
    'FLIQ Unisex Clothing Flagship. Monolithic silhouettes and luxury streetwear architecture from Madhapur, Hyderabad.',
  icons: {
    icon: '/images/branding/fliq-logo-transparent-p1.png',
    apple: '/images/branding/fliq-logo-transparent-p1.png',
  },
  openGraph: {
    title: 'FLIQ // Unisex Clothing Flagship',
    description:
      'FLIQ Unisex Clothing Flagship. Monolithic silhouettes and luxury streetwear architecture.',
    images: ['/images/branding/fliq-logo-transparent-p2.png'],
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
