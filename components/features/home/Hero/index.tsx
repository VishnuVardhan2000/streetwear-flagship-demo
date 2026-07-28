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
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 pt-24 pb-16 text-white md:px-12">
      {/* Background Lighting & Depth Layer */}
      <HeroBackground />

      {/* Main 2-Column Hero Layout (Left 45% / Right 55%) */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-20 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-4 lg:grid-cols-12"
      >
        {/* Left Column (45% Width / 5 Cols out of 12) */}
        <div className="lg:col-span-5">
          <HeroContent />
        </div>

        {/* Right Column (55% Width / 7 Cols out of 12) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex h-full min-h-[480px] w-full items-center justify-center sm:min-h-[580px] lg:col-span-7 lg:-ml-8 lg:min-h-screen"
        >
          <HeroCanvas />
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center space-y-2"
      >
        <span className="font-sans text-[9px] tracking-[0.35em] text-zinc-400 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="relative h-9 w-[1px] bg-gradient-to-b from-zinc-400 to-transparent">
          <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-ping rounded-full bg-white" />
        </div>
      </motion.div>
    </section>
  );
}
