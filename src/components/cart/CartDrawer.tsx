import { useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { Spinner } from '../ui/Spinner';

export function CartDrawer() {
  const { cart, cartOpen, cartLoading, closeCart } = useCart();
  const lines = cart?.lines.edges.map((e) => e.node) ?? [];

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 transition-opacity backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark z-50 shadow-2xl transform transition-transform duration-300 border-l border-white/5 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="font-heading text-lg font-light text-chalk tracking-wide">Your Cart</h2>
            <button
              onClick={closeCart}
              className="p-2.5 text-text-secondary hover:text-chalk transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lines */}
          <div className="flex-1 overflow-y-auto px-5">
            {cartLoading && lines.length === 0 ? (
              <Spinner className="mt-12" />
            ) : lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mb-3 opacity-30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="font-light text-sm">Your cart is empty</p>
              </div>
            ) : (
              <div>
                {lines.map((line) => (
                  <CartLineItem key={line.id} line={line} />
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="px-5 pb-5">
            <CartSummary />
          </div>
        </div>
      </div>
    </>
  );
}
