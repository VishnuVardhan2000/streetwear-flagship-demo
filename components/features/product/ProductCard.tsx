'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div
      onClick={() => onClick(product)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex cursor-pointer flex-col space-y-5"
    >
      {/* Large Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-zinc-900 shadow-xl transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.95)]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-30" />
      </div>

      {/* Product Information */}
      <div className="flex flex-col space-y-1">
        <h3 className="font-sans text-sm font-semibold tracking-wide uppercase transition-colors group-hover:text-zinc-300">
          {product.title}
        </h3>
        {product.category && (
          <p className="font-sans text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
            {product.category}
          </p>
        )}
        <p className="pt-0.5 font-sans text-xs font-semibold tracking-wider text-white">
          {product.price}
        </p>
      </div>
    </motion.div>
  );
}
