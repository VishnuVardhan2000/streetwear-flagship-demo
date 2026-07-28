'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, MessageSquare, ExternalLink } from 'lucide-react';

export default function StoreCTA() {
  return (
    <section
      id="store"
      className="relative w-full border-t border-white/10 bg-black px-6 py-32 text-white md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Store Info */}
          <div className="flex flex-col space-y-8">
            <div>
              <span className="mb-2 block font-sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                FLAGSHIP DESTINATION
              </span>
              <h2 className="font-serif text-4xl font-light tracking-tight uppercase md:text-6xl">
                FLIQ UNISEX CLOTHING
              </h2>
            </div>

            <div className="space-y-6 font-sans text-sm font-light tracking-wider text-zinc-300">
              <div className="flex items-start space-x-4">
                <MapPin className="mt-1 flex-shrink-0 text-zinc-500" size={18} />
                <div>
                  <p className="font-medium text-white">LOCATION</p>
                  <p className="text-zinc-400">Madhapur, Hyderabad</p>
                  <p className="mt-0.5 text-xs text-zinc-500">Opposite Gowra Fountainhead</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="mt-1 flex-shrink-0 text-zinc-500" size={18} />
                <div>
                  <p className="font-medium text-white">STORE HOURS</p>
                  <p className="text-zinc-400">Open Daily: 10:30 AM – 1:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-6 sm:flex-row lg:justify-end">
            {/* Primary Action Button (WhatsApp) */}
            <motion.a
              href="https://wa.me/?text=Hello%20FLIQ%20Flagship%20Store"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center space-x-3 bg-white px-8 py-5 text-xs font-semibold tracking-[0.25em] text-black uppercase transition-colors hover:bg-zinc-200"
            >
              <MessageSquare size={16} />
              <span>WHATSAPP CONCIERGE</span>
            </motion.a>

            {/* Secondary Action Button (Google Maps) */}
            <motion.a
              href="https://maps.google.com/?q=Gowra+Fountainhead+Madhapur+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center space-x-3 border border-white/20 px-8 py-5 text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors hover:bg-white/10"
            >
              <ExternalLink size={16} />
              <span>VISIT STORE</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
