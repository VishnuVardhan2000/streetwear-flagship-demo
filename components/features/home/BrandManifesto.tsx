'use client';

import { motion } from 'framer-motion';

export default function BrandManifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full overflow-hidden border-t border-white/10 bg-zinc-950 px-6 py-36 text-white md:px-12"
    >
      {/* Background Subtle Mesh Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="mx-auto flex max-w-5xl flex-col items-center space-y-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[10px] tracking-[0.4em] text-zinc-500 uppercase"
        >
          THE MANIFESTO
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-serif text-3xl leading-tight font-light tracking-tight text-zinc-100 uppercase sm:text-5xl md:text-6xl"
        >
          &ldquo;WE DO NOT DESIGN APPAREL FOR MASS CONSUMPTION. WE CONSTRUCT ARCHITECTURAL
          SILHOUETTES THAT COMMAND PRESENCE.&rdquo;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl font-sans text-xs leading-relaxed font-light tracking-[0.25em] text-zinc-400 uppercase md:text-sm"
        >
          FLIQ stands at the intersection of monolithic form, unyielding textile quality, and modern
          street culture. Built without compromise.
        </motion.p>
      </div>
    </section>
  );
}
