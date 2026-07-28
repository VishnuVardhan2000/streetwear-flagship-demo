'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    totalCount,
    totalPrice,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-zinc-950 px-6 py-8 text-white shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center space-x-3">
                <ShoppingBag size={20} className="text-white" />
                <h2 className="font-serif text-xl font-light tracking-wide uppercase">
                  YOUR BAG ({totalCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 transition-colors hover:text-white"
                aria-label="Close bag"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 space-y-6 overflow-y-auto py-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <ShoppingBag size={48} className="text-zinc-700" />
                  <p className="font-sans text-xs tracking-[0.2em] text-zinc-500 uppercase">
                    YOUR BAG IS CURRENTLY EMPTY
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center space-x-4 border-b border-white/5 pb-4"
                  >
                    <div className="relative aspect-[3/4] h-20 w-16 overflow-hidden border border-white/10 bg-zinc-900">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <h4 className="font-sans text-xs font-semibold tracking-wider uppercase">
                        {item.title}
                      </h4>
                      <p className="font-sans text-[10px] tracking-widest text-zinc-400">
                        SIZE: {item.size}
                      </p>
                      <p className="font-sans text-xs font-light text-zinc-300">{item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 pt-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center border border-white/20 text-zinc-300 transition-colors hover:border-white hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-sans text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center border border-white/20 text-zinc-300 transition-colors hover:border-white hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="p-2 text-zinc-600 transition-colors hover:text-red-400"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer & Checkout Notice */}
            {cart.length > 0 && (
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between font-sans text-sm tracking-wider">
                  <span className="text-zinc-400 uppercase">SUBTOTAL</span>
                  <span className="font-semibold text-white">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="rounded border border-amber-500/20 bg-amber-500/10 p-4 text-center">
                  <p className="font-sans text-[11px] font-medium tracking-widest text-amber-300 uppercase">
                    ⚡ DEMO MODE
                  </p>
                  <p className="mt-1 font-sans text-[10px] tracking-wide text-zinc-400">
                    Checkout will be available in the official production release.
                  </p>
                </div>

                <button
                  disabled
                  className="w-full cursor-not-allowed bg-zinc-800 py-4 text-center font-sans text-xs font-semibold tracking-[0.3em] text-zinc-500 uppercase"
                >
                  DEMO CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
