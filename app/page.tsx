import Header from '@/components/layout/Header';
import Hero from '@/components/features/home/Hero';
import FeaturedLooks from '@/components/features/home/FeaturedLooks';
import BrandManifesto from '@/components/features/home/BrandManifesto';
import StoreCTA from '@/components/features/home/StoreCTA';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
      <Header />
      <main className="w-full">
        <Hero />
        <FeaturedLooks />
        <BrandManifesto />
        <StoreCTA />
      </main>
      <Footer />
    </div>
  );
}
