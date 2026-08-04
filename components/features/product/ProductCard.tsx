'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCart();

  if (product.id === '01') {
    console.log('[LIVE UI DATA] Rendering Product Card #1:', product.title, product.image);
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      numericPrice: product.numericPrice,
      image: product.image,
      size: 'M',
    });
  };

  return (
    <motion.div
      onClick={() => onClick(product)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="group flex cursor-pointer flex-col space-y-4"
    >
      {/* Product Image Container with Floating Luxury Glass Bar */}
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-zinc-950 shadow-xl ring-1 ring-inset ring-white/5 transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.95)]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300"
          priority={product.id === '01' || product.id === '02'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

        {/* Floating Glass Action Bar (Reveals on Hover) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 rounded-xl border border-white/20 bg-zinc-950/85 p-2 backdrop-blur-2xl shadow-2xl opacity-0 translate-y-2 transition-all duration-250 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={() => onClick(product)}
            className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-white/10 py-2 text-center font-sans text-[10px] font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:bg-white/25"
          >
            <Eye size={12} className="text-zinc-300" />
            <span>VIEW DETAILS</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="flex items-center justify-center rounded-lg border border-white/20 bg-white px-3 py-2 text-black transition-transform hover:scale-105"
            title="Quick Add to Bag"
          >
            <ShoppingBag size={13} className="text-black" />
          </button>
        </div>
      </div>

      {/* Product Metadata Information */}
      <div className="flex flex-col space-y-1 px-0.5">
        <div className="flex items-baseline justify-between">
          <h3 className="font-sans text-xs font-semibold tracking-wider text-zinc-100 uppercase transition-colors group-hover:text-white">
            {product.title}
          </h3>
          <span className="font-sans text-xs font-semibold tracking-wider text-white">
            {product.price}
          </span>
        </div>
        {product.category && (
          <p className="font-sans text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
            {product.category}
          </p>
        )}
      </div>
    </motion.div>
  );
}
