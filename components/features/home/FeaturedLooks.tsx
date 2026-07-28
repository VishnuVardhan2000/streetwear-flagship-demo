'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductViewerModal from '@/components/features/products/ProductViewerModal';
import { APPAREL_PRODUCTS } from '@/constants/products';
import { Product } from '@/types/product';

export default function FeaturedLooks() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section
      id="collection"
      className="relative w-full border-t border-white/10 bg-black px-6 py-32 text-white md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 flex flex-col justify-between space-y-4 md:flex-row md:items-end md:space-y-0">
          <div>
            <span className="mb-2 block font-sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
              FEATURED SELECTION
            </span>
            <h2 className="font-serif text-4xl font-light tracking-tight uppercase md:text-6xl">
              APPAREL COLLECTION
            </h2>
          </div>
          <p className="max-w-xs font-sans text-xs leading-relaxed font-light tracking-[0.2em] text-zinc-400 uppercase">
            CURATED ARCHITECTURAL SILHOUETTES FROM DROP 01.
          </p>
        </div>

        {/* 6 Apparel Product Cards Grid (3 cols x 2 rows) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {APPAREL_PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group flex cursor-pointer flex-col space-y-6"
            >
              {/* Image Container with Refined Micro-Interactions */}
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-zinc-900 shadow-xl transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.95)]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                {/* Price Tag Pill */}
                <div className="absolute top-4 right-4 z-10 border border-white/20 bg-black/70 px-3 py-1 backdrop-blur-md">
                  <span className="font-sans text-xs font-semibold tracking-wider text-white">
                    {product.price}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col space-y-1.5">
                <h3 className="font-sans text-base font-semibold tracking-wide uppercase transition-colors group-hover:text-zinc-300">
                  {product.title}
                </h3>
                <p className="font-sans text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
                  {product.material}
                </p>
                <p className="font-sans text-[10px] tracking-[0.15em] text-zinc-500 uppercase">
                  {product.spec}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Luxury Editorial Product Viewer Modal */}
      <ProductViewerModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
