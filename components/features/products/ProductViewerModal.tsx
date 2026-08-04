'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ShoppingBag, Check } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

interface ProductViewerProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductViewerModal({ product, onClose }: ProductViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isZoomed, setIsZoomed] = useState(false);
  const [added, setAdded] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const wheelLock = useRef(false);

  const { addToCart } = useCart();

  const slides = product?.galleryImages || [];
  const slidesCount = slides.length;

  const nextSlide = useCallback(() => {
    if (slidesCount === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
    setIsZoomed(false);
  }, [slidesCount]);

  const prevSlide = useCallback(() => {
    if (slidesCount === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
    setIsZoomed(false);
  }, [slidesCount]);

  // Keyboard Navigation & Focus Lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!product) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, nextSlide, prevSlide, onClose]);

  // Mouse Wheel Navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLock.current) return;
    if (Math.abs(e.deltaY) > 30) {
      wheelLock.current = true;
      if (e.deltaY > 0) nextSlide();
      else prevSlide();
      setTimeout(() => {
        wheelLock.current = false;
      }, 400);
    }
  };

  // Touch Swipe Navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) touchStartX.current = touch.clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) touchEndX.current = touch.clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) nextSlide();
    if (distance < -40) prevSlide();
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      numericPrice: product.numericPrice,
      image: product.image,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product || slidesCount === 0) return null;

  const currentView = slides[currentSlide];
  if (!currentView) return null;

  // Adjacent slide preloading targets
  const nextSlideIdx = (currentSlide + 1) % slidesCount;
  const prevSlideIdx = (currentSlide - 1 + slidesCount) % slidesCount;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.title} product gallery`}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/95 text-white backdrop-blur-2xl select-none"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Invisible Image Preloader for Zero-Latency Gallery Navigation */}
        <div className="hidden">
          {slides[nextSlideIdx] && <Image src={slides[nextSlideIdx].url} alt="preload next" width={100} height={100} priority />}
          {slides[prevSlideIdx] && <Image src={slides[prevSlideIdx].url} alt="preload prev" width={100} height={100} priority />}
        </div>

        {/* Top Floating Glass Header Bar */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/12 bg-zinc-950/70 px-6 py-5 backdrop-blur-2xl ring-1 ring-inset ring-white/10 shadow-2xl md:px-12">
          <div className="flex items-center space-x-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-zinc-400 uppercase font-medium">
              {currentView.label}
            </span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <h3 className="hidden font-sans text-xs font-semibold tracking-widest text-white uppercase sm:block">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center space-x-6">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-widest text-zinc-300">
              {currentSlide + 1} / {slidesCount}
            </span>
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 transition-all hover:border-white/30 hover:bg-white hover:text-black"
              aria-label="Close product viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main View Display Container */}
        <div className="relative flex h-full w-full items-center justify-center pt-20 pb-16">
          <AnimatePresence mode="wait">
            {/* VIEW 01: HERO PRODUCT & PURCHASE PANEL */}
            {currentSlide === 0 ? (
              <motion.div
                key="slide-0"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:px-12 lg:grid-cols-12"
              >
                {/* Hero Garment Image Container */}
                <div className="relative h-[50vh] w-full overflow-hidden border border-white/12 bg-zinc-950 shadow-2xl ring-1 ring-inset ring-white/10 lg:col-span-7 lg:h-[75vh]">
                  <Image
                    src={currentView.url}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                </div>

                {/* Product Specification & Purchase Panel */}
                <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
                  <div>
                    <span className="mb-2 block font-sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                      FLIQ UNISEX // {product.category || 'COLLECTION'}
                    </span>
                    <h2 className="font-serif text-3xl font-light tracking-tight uppercase md:text-5xl">
                      {product.title}
                    </h2>
                    <p className="mt-3 font-sans text-2xl font-light tracking-wider text-zinc-100">
                      {product.price}
                    </p>
                  </div>

                  <p className="font-sans text-xs leading-relaxed tracking-widest text-zinc-400 uppercase">
                    {product.description}
                  </p>

                  {/* Size Selector */}
                  <div className="space-y-3">
                    <span className="block font-sans text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                      SELECT SIZE
                    </span>
                    <div className="flex space-x-3">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-11 w-11 rounded-lg border text-xs font-semibold tracking-wider transition-all ${
                            selectedSize === size
                              ? 'border-white bg-white text-black shadow-lg scale-105'
                              : 'border-white/20 bg-zinc-900/60 text-zinc-300 hover:border-white/50 hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={handleAddToCart}
                    className="flex w-full items-center justify-center space-x-3 rounded-xl bg-white py-4 font-sans text-xs font-semibold tracking-[0.3em] text-black uppercase transition-all duration-200 hover:bg-zinc-200 active:scale-[0.99] shadow-2xl"
                  >
                    {added ? (
                      <>
                        <Check size={16} />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        <span>ADD TO BAG ({selectedSize})</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* DYNAMIC UNIQUE GALLERY VIEWS (SLIDES > 0) */
              <motion.div
                key={`slide-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-[75vh] w-full max-w-6xl flex-col items-center justify-center px-6 md:px-12"
              >
                <div
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="group relative h-full w-full cursor-zoom-in overflow-hidden border border-white/12 bg-zinc-950 shadow-2xl ring-1 ring-inset ring-white/10"
                >
                  <Image
                    src={currentView.url}
                    alt={`${product.title} - ${currentView.title}`}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-6 left-6 z-10 flex items-center space-x-2 rounded-full border border-white/20 bg-zinc-950/80 px-4 py-2 backdrop-blur-xl shadow-xl">
                    <ZoomIn size={14} className="text-white" />
                    <span className="block font-sans text-[10px] tracking-[0.25em] text-zinc-300 uppercase font-medium">
                      {currentView.label}
                    </span>
                  </div>

                  <div className="absolute right-6 bottom-6 left-6 z-10 max-w-xl rounded-2xl border border-white/15 bg-zinc-950/85 p-6 backdrop-blur-2xl shadow-2xl ring-1 ring-inset ring-white/10">
                    <h4 className="font-serif text-xl font-light tracking-wide uppercase">
                      {currentView.title}
                    </h4>
                    <p className="mt-2 font-sans text-xs leading-relaxed tracking-widest text-zinc-400 uppercase">
                      {product.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Left / Right Chevron Arrow Controls */}
        {slidesCount > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 z-40 -translate-y-1/2 rounded-full border border-white/20 bg-zinc-950/70 p-3.5 text-white backdrop-blur-xl transition-all duration-200 hover:border-white hover:bg-white hover:text-black shadow-2xl md:left-8"
              aria-label="Previous view"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 z-40 -translate-y-1/2 rounded-full border border-white/20 bg-zinc-950/70 p-3.5 text-white backdrop-blur-xl transition-all duration-200 hover:border-white hover:bg-white hover:text-black shadow-2xl md:right-8"
              aria-label="Next view"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Slide Indicator Dots */}
        {slidesCount > 1 && (
          <div className="absolute inset-x-0 bottom-6 z-30 flex items-center justify-center space-x-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsZoomed(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                    : 'w-2 bg-zinc-600 hover:bg-zinc-400'
                }`}
                aria-label={`Go to view ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
