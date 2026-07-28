'use client';

import { motion } from 'framer-motion';

export default function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto flex w-full flex-col items-center justify-center gap-4 pt-2 sm:w-auto sm:flex-row lg:justify-start"
    >
      {/* Primary Button */}
      <a
        href="#collection"
        className="w-full bg-white px-8 py-4 text-center text-xs font-semibold tracking-[0.3em] text-black uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:translate-y-0 sm:w-auto"
      >
        EXPLORE COLLECTION
      </a>

      {/* Secondary Button */}
      <a
        href="#store"
        className="w-full border border-white/40 bg-black/40 px-8 py-4 text-center text-xs font-semibold tracking-[0.3em] text-white uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 active:translate-y-0 sm:w-auto"
      >
        VISIT STORE
      </a>
    </motion.div>
  );
}
