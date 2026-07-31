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

  const slidesCount = 6;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
    setIsZoomed(false);
  }, [slidesCount]);

  const prevSlide = useCallback(() => {
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
      }, 550);
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

  if (!product) return null;

  const slides = [
    { title: 'HERO PRODUCT', label: 'VIEW 01 // HERO PRESENTATION' },
    { title: 'CONSTRUCTION DETAIL', label: 'VIEW 02 // CRAFTSMANSHIP & HARDWARE' },
    { title: 'FABRIC MACRO', label: 'VIEW 03 // WEAVE & TEXTURE ZOOM' },
    { title: 'EDITORIAL MODEL', label: 'VIEW 04 // EDITORIAL FIT ON MODEL' },
    { title: 'ALTERNATE COLOUR', label: 'VIEW 05 // APPROVED SECONDARY COLORWAY' },
    { title: 'LIFESTYLE EDITORIAL', label: 'VIEW 06 // CAMPAIGN LIFESTYLE' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.title} product gallery`}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/95 text-white backdrop-blur-2xl select-none"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Header Navigation Bar */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/60 px-6 py-6 backdrop-blur-md md:px-12">
          <div className="flex items-center space-x-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
              {slides[currentSlide]?.label}
            </span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <h3 className="hidden font-sans text-xs font-semibold tracking-widest text-white uppercase sm:block">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center space-x-6">
            <span className="font-sans text-xs font-light tracking-wider text-zinc-300">
              {currentSlide + 1} / {slidesCount}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 transition-colors hover:text-white"
              aria-label="Close product viewer"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Main View Display Container */}
        <div className="relative flex h-full w-full items-center justify-center pt-20 pb-16">
          <AnimatePresence mode="wait">
            {/* VIEW 01: HERO PRODUCT */}
            {currentSlide === 0 && (
              <motion.div
                key="slide-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:px-12 lg:grid-cols-12"
              >
                {/* Hero Garment Image */}
                <div className="relative h-[55vh] w-full overflow-hidden border border-white/10 bg-zinc-900 lg:col-span-7 lg:h-[75vh]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Product Specification & Purchase Panel */}
                <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
                  <div>
                    <span className="mb-2 block font-sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                      FLIQ UNISEX // MASTER GARMENT
                    </span>
                    <h2 className="font-serif text-3xl font-light tracking-tight uppercase md:text-5xl">
                      {product.title}
                    </h2>
                    <p className="mt-2 font-sans text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
                      {product.material}
                    </p>
                    <p className="mt-3 font-sans text-2xl font-light tracking-wider text-zinc-100">
                      {product.price}
                    </p>
                  </div>

                  <p className="font-sans text-xs leading-relaxed tracking-widest text-zinc-400 uppercase">
                    {product.description}
                  </p>

                  <div className="space-y-2 border-t border-b border-white/10 py-4">
                    <span className="block font-sans text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
                      PRIMARY COLOR & SPECIFICATION
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="h-3 w-3 rounded-full border border-white/40 bg-black" />
                      <span className="font-sans text-xs tracking-wider text-zinc-300 uppercase">
                        PRIMARY COLORWAY
                      </span>
                    </div>
                    <p className="pt-1 font-sans text-[11px] tracking-wider text-zinc-400 uppercase">
                      {product.spec}
                    </p>
                  </div>

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
                          className={`h-11 w-11 border text-xs font-semibold tracking-wider transition-all ${
                            selectedSize === size
                              ? 'border-white bg-white text-black'
                              : 'border-white/20 bg-transparent text-white hover:border-white/50'
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
                    className="flex w-full items-center justify-center space-x-3 bg-white py-4 font-sans text-xs font-semibold tracking-[0.3em] text-black uppercase transition-all duration-300 hover:bg-zinc-200 active:scale-[0.99]"
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
            )}

            {/* VIEW 02: CONSTRUCTION DETAIL */}
            {currentSlide === 1 && (
              <motion.div
                key="slide-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="relative flex h-[75vh] w-full max-w-6xl flex-col items-center justify-center px-6 md:px-12"
              >
                <div className="group relative h-full w-full overflow-hidden border border-white/10 bg-zinc-900">
                  <Image
                    src={product.garmentImage}
                    alt={`${product.title} Construction Detail`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 z-10 border border-white/15 bg-black/70 px-5 py-3 backdrop-blur-md">
                    <span className="block font-sans text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                      VIEW 02 // CRAFTSMANSHIP FOCUS
                    </span>
                    <span className="font-sans text-xs font-semibold tracking-widest text-white uppercase">
                      SEAMS, HARDWARE & POCKET ARCHITECTURE
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 03: FABRIC MACRO */}
            {currentSlide === 2 && (
              <motion.div
                key="slide-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="relative flex h-[75vh] w-full max-w-6xl flex-col items-center justify-center px-6 md:px-12"
              >
                <div
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`relative h-full w-full cursor-zoom-in overflow-hidden border border-white/10 bg-zinc-900 transition-all duration-500 ${
                    isZoomed ? 'scale-105' : 'scale-100'
                  }`}
                >
                  <Image
                    src={product.fabricImage}
                    alt={`${product.title} Fabric Zoom`}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-6 left-6 z-10 flex items-center space-x-2 border border-white/15 bg-black/70 px-4 py-2 backdrop-blur-md">
                    <ZoomIn size={14} className="text-white" />
                    <span className="font-sans text-[10px] tracking-[0.25em] text-white uppercase">
                      {isZoomed ? 'CLICK TO RESET ZOOM' : 'CLICK TO ENLARGE FABRIC WEAVE'}
                    </span>
                  </div>

                  <div className="absolute right-6 bottom-6 left-6 z-10 max-w-xl border border-white/10 bg-black/85 p-6 backdrop-blur-md">
                    <h4 className="font-serif text-xl font-light tracking-wide uppercase">
                      VIEW 03 // FABRIC & WEAVE MACRO
                    </h4>
                    <p className="mt-2 font-sans text-xs leading-relaxed tracking-widest text-zinc-400 uppercase">
                      {product.fabricDetails}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 04: EDITORIAL MODEL */}
            {currentSlide === 3 && (
              <motion.div
                key="slide-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="relative flex h-[75vh] w-full max-w-6xl items-center justify-center px-6 md:px-12"
              >
                <div className="relative h-full w-full overflow-hidden border border-white/10 bg-zinc-900">
                  <Image
                    src={product.campaignImage}
                    alt={`${product.title} Editorial Model`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 z-10 space-y-2">
                    <span className="block font-sans text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
                      VIEW 04 // EDITORIAL MODEL FIT
                    </span>
                    <h3 className="font-serif text-3xl font-light tracking-wide uppercase">
                      {product.title} ON BODY
                    </h3>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 05: ALTERNATE COLOUR */}
            {currentSlide === 4 && (
              <motion.div
                key="slide-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="relative flex h-[75vh] w-full max-w-6xl items-center justify-center px-6 md:px-12"
              >
                <div className="relative h-full w-full overflow-hidden border border-white/10 bg-zinc-900">
                  <Image
                    src={product.alternateColorImage}
                    alt={`${product.title} Alternate Colorway`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6 z-10 border border-white/15 bg-black/70 px-5 py-3 backdrop-blur-md">
                    <span className="block font-sans text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                      VIEW 05 // APPROVED SECONDARY COLORWAY
                    </span>
                    <span className="font-sans text-xs font-semibold tracking-widest text-white uppercase">
                      {product.alternateColorName}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 06: LIFESTYLE EDITORIAL */}
            {currentSlide === 5 && (
              <motion.div
                key="slide-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="relative flex h-[75vh] w-full max-w-6xl items-center justify-center px-6 md:px-12"
              >
                <div className="relative h-full w-full overflow-hidden border border-white/10 bg-zinc-900">
                  <Image
                    src={product.lifestyleImage}
                    alt={`${product.title} Lifestyle Campaign`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 z-10 space-y-2">
                    <span className="block font-sans text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
                      VIEW 06 // LIFESTYLE CAMPAIGN
                    </span>
                    <h3 className="font-serif text-3xl font-light tracking-wide uppercase">
                      FLIQ ARCHITECTURAL CAMPAIGN // SPRINT 1
                    </h3>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Previous View Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 z-40 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-4 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black md:left-8"
          aria-label="Previous view"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next View Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 z-40 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-4 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black md:right-8"
          aria-label="Next view"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute inset-x-0 bottom-6 z-30 flex items-center justify-center space-x-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setIsZoomed(false);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-zinc-600 hover:bg-zinc-400'
              }`}
              aria-label={`Go to view ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
