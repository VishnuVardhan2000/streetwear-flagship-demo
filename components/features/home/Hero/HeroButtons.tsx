'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

export default function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center gap-4 pt-2"
    >
      {/* Primary CTA */}
      <a
        href="#collection"
        className="inline-flex items-center space-x-3 bg-white px-8 py-4 text-xs font-semibold tracking-[0.3em] text-black uppercase transition-all duration-300 hover:scale-105 hover:bg-zinc-200 active:scale-95"
      >
        <span>EXPLORE COLLECTION</span>
        <ArrowRight size={14} />
      </a>

      {/* Secondary CTA */}
      <a
        href="#store"
        className="inline-flex items-center space-x-3 border border-white/20 bg-black/40 px-8 py-4 text-xs font-semibold tracking-[0.3em] text-white uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10 active:scale-95"
      >
        <MapPin size={14} className="text-zinc-400" />
        <span>VISIT STORE</span>
      </a>
    </motion.div>
  );
}
