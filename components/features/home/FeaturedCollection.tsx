'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/features/product/ProductCard';
import ProductViewerModal from '@/components/features/products/ProductViewerModal';
import { APPAREL_PRODUCTS } from '@/constants/products';
import { Product } from '@/types/product';

type ParentCategory = 'ALL' | 'TOP WEAR' | 'BOTTOM WEAR';

interface SubCategoryDef {
  name: string;
  isComingSoon?: boolean;
}

const TOP_WEAR_SUBS: SubCategoryDef[] = [
  { name: 'All Top Wear' },
  { name: 'T-Shirts' },
  { name: 'Hoodies' },
  { name: 'Jackets' },
  { name: 'Tank Tops', isComingSoon: true },
];

const BOTTOM_WEAR_SUBS: SubCategoryDef[] = [
  { name: 'All Bottom Wear' },
  { name: 'Jeans' },
  { name: 'Cargos' },
  { name: 'Sweat Pants' },
  { name: 'Korean Pants' },
  { name: 'Jorts', isComingSoon: true },
];

export default function FeaturedCollection() {
  const [activeParent, setActiveParent] = useState<ParentCategory>('ALL');
  const [activeSub, setActiveSub] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handle Parent Category Switch
  const handleParentClick = (parent: ParentCategory) => {
    setActiveParent(parent);
    if (parent === 'ALL') {
      setActiveSub('ALL');
    } else if (parent === 'TOP WEAR') {
      setActiveSub('All Top Wear');
    } else if (parent === 'BOTTOM WEAR') {
      setActiveSub('All Bottom Wear');
    }
  };

  // Filter products based on 2-level hierarchy
  const filteredProducts = APPAREL_PRODUCTS.filter((product) => {
    if (activeParent === 'ALL') return true;

    if (activeParent === 'TOP WEAR') {
      const topCategories = ['T-Shirts', 'Hoodies', 'Jackets', 'Tank Tops'];
      if (!topCategories.includes(product.category || '')) return false;
      if (activeSub === 'All Top Wear' || activeSub === 'ALL') return true;
      return product.category === activeSub;
    }

    if (activeParent === 'BOTTOM WEAR') {
      const bottomCategories = ['Jeans', 'Cargos', 'Sweat Pants', 'Korean Pants', 'Jorts'];
      if (!bottomCategories.includes(product.category || '')) return false;
      if (activeSub === 'All Bottom Wear' || activeSub === 'ALL') return true;
      return product.category === activeSub;
    }

    return true;
  });

  const activeSubCategories =
    activeParent === 'TOP WEAR'
      ? TOP_WEAR_SUBS
      : activeParent === 'BOTTOM WEAR'
        ? BOTTOM_WEAR_SUBS
        : [];

  return (
    <section
      id="collection"
      className="relative w-full border-t border-white/10 bg-black px-4 py-28 text-white sm:px-6 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between space-y-4 md:mb-12 md:flex-row md:items-end md:space-y-0">
          <div>
            <span className="mb-2 block font-sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
              OFFICIAL CATALOGUE
            </span>
            <h2 className="font-serif text-3xl font-light tracking-tight uppercase sm:text-4xl md:text-6xl">
              APPAREL COLLECTION
            </h2>
          </div>
          <p className="max-w-xs font-sans text-[11px] leading-relaxed font-light tracking-[0.2em] text-zinc-400 uppercase sm:text-xs">
            AUTHENTIC GARMENT SILHOUETTES FROM DROP 01.
          </p>
        </div>

        {/* 2-Level Floating Luxury Glass Navigation */}
        <div className="mb-12 flex flex-col space-y-4 sm:mb-14 sm:space-y-5">
          {/* Level 1: Parent Categories (Floating Glass Capsule) */}
          <div className="flex justify-start max-w-full">
            <div className="inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full border border-white/15 bg-zinc-950/70 p-1.5 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/10 transition-all duration-300">
              {(['ALL', 'TOP WEAR', 'BOTTOM WEAR'] as ParentCategory[]).map((parent) => {
                const isActive = activeParent === parent;
                return (
                  <button
                    key={parent}
                    onClick={() => handleParentClick(parent)}
                    className={`relative rounded-full px-3.5 py-2 font-sans text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-xs ${
                      isActive
                        ? 'border border-white bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.02]'
                        : 'border border-transparent text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {parent}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level 2: Sub-Categories (Soft Subtle Fade In) */}
          <AnimatePresence mode="wait">
            {activeSubCategories.length > 0 && (
              <motion.div
                key={activeParent}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex max-w-full flex-wrap items-center gap-1.5 pt-1 sm:gap-2.5"
              >
                {activeSubCategories.map((sub) => {
                  const isActive = activeSub === sub.name;
                  return (
                    <button
                      key={sub.name}
                      onClick={() => setActiveSub(sub.name)}
                      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 font-sans text-[10px] tracking-[0.16em] uppercase transition-all duration-300 sm:px-4 sm:py-2 sm:text-[11px] ${
                        isActive
                          ? 'border-white/50 bg-white/15 text-white font-semibold shadow-[0_4px_16px_rgba(255,255,255,0.1)] backdrop-blur-md'
                          : 'border-white/10 bg-zinc-900/40 text-zinc-400 hover:border-white/25 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{sub.name}</span>
                      {sub.isComingSoon && (
                        <span className="ml-1.5 rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[8px] font-medium tracking-widest text-zinc-300">
                          SOON
                        </span>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
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
              {activeSub} {'//'} COMING SOON
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
