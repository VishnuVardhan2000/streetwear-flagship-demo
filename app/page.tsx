import Header from '@/components/layout/Header';
import Hero from '@/components/features/home/Hero';
import FeaturedLooks from '@/components/features/home/FeaturedLooks';
import BrandManifesto from '@/components/features/home/BrandManifesto';
import StoreCTA from '@/components/features/home/StoreCTA';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Task 1 & 4: One Global Background with Soft Ambient Depth & Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/25 via-[#050505] to-[#050505]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-white/[0.015] via-transparent to-transparent" />

      <Header />
      <main className="relative z-10 w-full">
        <Hero />
        <FeaturedLooks />
        <BrandManifesto />
        <StoreCTA />
      </main>
      <Footer />
    </div>
  );
}
