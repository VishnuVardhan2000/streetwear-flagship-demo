'use client';

import { useState } from 'react';
import ProductCard from '@/components/features/product/ProductCard';
import ProductViewerModal from '@/components/features/products/ProductViewerModal';
import { APPAREL_PRODUCTS } from '@/constants/products';
import { Product } from '@/types/product';

const OFFICIAL_CATEGORIES = [
  'ALL',
  'T-Shirts',
  'Hoodies',
  'Jackets',
  'Tank Tops',
  'Jeans',
  'Cargos',
  'Sweat Pants',
  'Korean Pants',
  'Jorts',
];

export default function FeaturedCollection() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    selectedCategory === 'ALL'
      ? APPAREL_PRODUCTS
      : APPAREL_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="collection"
      className="relative w-full border-t border-white/10 bg-black px-6 py-32 text-white md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between space-y-4 md:flex-row md:items-end md:space-y-0">
          <div>
            <span className="mb-2 block font-sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
              OFFICIAL CATALOGUE
            </span>
            <h2 className="font-serif text-4xl font-light tracking-tight uppercase md:text-6xl">
              APPAREL COLLECTION
            </h2>
          </div>
          <p className="max-w-xs font-sans text-xs leading-relaxed font-light tracking-[0.2em] text-zinc-400 uppercase">
            AUTHENTIC GARMENT SILHOUETTES FROM DROP 01.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-14 flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
          {OFFICIAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-4 py-2 font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? 'border-white bg-white font-semibold text-black'
                  : 'border-white/15 bg-zinc-900/50 text-zinc-400 hover:border-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid or Coming Soon Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-zinc-950/60 px-8 py-24 text-center">
            <span className="mb-3 block font-sans text-[10px] tracking-[0.35em] text-zinc-500 uppercase">
              OFFICIAL CATALOGUE CATEGORY
            </span>
            <h3 className="font-serif text-3xl font-light tracking-widest text-white uppercase">
              {selectedCategory} // COMING SOON
            </h3>
            <p className="mt-3 max-w-sm font-sans text-xs tracking-wider text-zinc-400 uppercase">
              This category will be unlocked in the upcoming drop. No placeholder items created.
            </p>
          </div>
        )}
      </div>

      {/* Fullscreen Product Experience Modal */}
      <ProductViewerModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
