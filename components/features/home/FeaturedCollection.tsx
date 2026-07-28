'use client';

import { useState } from 'react';
import ProductCard from '@/components/features/product/ProductCard';
import ProductViewerModal from '@/components/features/products/ProductViewerModal';
import { APPAREL_PRODUCTS } from '@/constants/products';
import { Product } from '@/types/product';

export default function FeaturedCollection() {
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

        {/* 6 Apparel Product Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {APPAREL_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Product Experience Modal */}
      <ProductViewerModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
