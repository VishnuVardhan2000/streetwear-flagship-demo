'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export default function Hero() {
  const { scrollY } = useScroll();

  // Signature Scroll Moment: Hero typography & 3D object subtle reaction on scroll
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.15]);

  return (
    <section className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 pt-20 text-white md:px-12">
      {/* Background Lighting & Glossy Depth Base */}
      <HeroBackground />

      {/* Reserved 3D Full-Bleed Canvas Container */}
      <HeroCanvas />

      {/* Main Editorial Content Overlay */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="pointer-events-none relative z-20 mx-auto flex h-full w-full max-w-7xl items-center"
      >
        <HeroContent />
      </motion.div>
    </section>
  );
}
