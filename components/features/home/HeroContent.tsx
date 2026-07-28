'use client';

import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';

export default function HeroContent() {
  return (
    <div className="z-20 mx-auto flex max-w-xl flex-col items-center space-y-8 text-center lg:mx-0 lg:items-start lg:text-left">
      {/* Small Premium Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center space-x-3 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        <span className="font-sans text-[10px] tracking-[0.35em] text-zinc-300 uppercase">
          DROP 01 // UNISEX FLAGSHIP
        </span>
      </motion.div>

      {/* Main Editorial Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-5xl leading-[0.85] font-light tracking-tight text-white uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      >
        FLIQ{' '}
        <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text font-sans font-extrabold tracking-tighter text-transparent">
          UNISEX
        </span>
      </motion.h1>

      {/* Supporting Statement */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md font-sans text-xs leading-relaxed font-light tracking-[0.25em] text-zinc-300 uppercase md:text-sm"
      >
        MONOLITHIC SILHOUETTES & MINIMAL STREETWEAR ARCHITECTURE. FORMED IN HYDERABAD.
      </motion.p>

      {/* Action Buttons */}
      <HeroButtons />
    </div>
  );
}
