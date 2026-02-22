import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useParallax } from '../hooks/useParallax';
import { VariantSelector } from '../components/product/VariantSelector';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { formatPrice } from '../lib/formatPrice';
import type { ProductVariant } from '../types/shopify';

export function HomePage() {
  const { products, loading, error } = useProducts();
  const { addToCart, cartLoading } = useCart();
  const { getTransform, getOpacity } = useParallax();
  const product = products[0] ?? null;

  const variants = product?.variants.edges.map((e) => e.node) ?? [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const activeVariant = selectedVariant ?? variants[0] ?? null;

  async function handleAddToCart() {
    if (!activeVariant) return;
    await addToCart(activeVariant.id, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Mountain photo — slowest layer */}
        <img
          src="/hero-mountain.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          style={{ transform: getTransform(0.3) }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-brand-dark/40 to-ink/90" />

        {/* Enso brush stroke — mid layer */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
          style={{ transform: getTransform(0.15), opacity: getOpacity(200, 800) }}
        >
          <svg
            viewBox="0 0 500 500"
            className="w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] opacity-[0.12]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M250 60C380 60 440 150 440 250C440 350 370 440 250 440C130 440 60 360 60 250C60 170 110 100 170 80"
              stroke="white"
              strokeWidth="40"
              strokeLinecap="round"
              fill="none"
              style={{ filter: 'url(#hero-enso-brush)' }}
            />
            <defs>
              <filter id="hero-enso-brush" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Content — fastest layer, lifts up slightly */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-24 pt-48 sm:pb-32 will-change-transform"
          style={{ transform: getTransform(-0.1), opacity: getOpacity(100, 600) }}
        >
          <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
            <p className="font-heading text-accent tracking-[0.3em] uppercase text-sm sm:text-base mb-6 font-light">
              Premium Climbing Chalk
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light text-chalk tracking-wide leading-[1.1]">
              Grip the<br />
              <span className="italic">moment.</span>
            </h1>
            <p className="mt-8 text-base sm:text-lg text-text-secondary max-w-lg font-light leading-relaxed mx-auto lg:mx-0">
              Born from stone, shaped by tradition. Crafted with intention, honoring the quiet discipline found in Japanese climbing.
            </p>
            <div className="mt-12 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#product">
                <Button size="lg">Shop Now</Button>
              </a>
              <Link to="/products">
                <Button size="lg" variant="outline">
                  View All
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand to-transparent z-10" />
      </section>

      {/* ── Brand Story Section ── */}
      <section className="relative bg-brand chalk-texture overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-chalk italic mb-8">
              Our Story
            </h2>
            <div className="brush-divider max-w-xs mx-auto mb-10" />
            <div className="max-w-2xl mx-auto space-y-6 text-text-secondary font-light leading-relaxed text-base sm:text-lg">
              <p>
                The Chalk Guys draw inspiration from Japan's mountains — places where patience,
                precision, and respect for nature define the climb. Each blend is crafted with
                intention, honoring the quiet discipline found in Japanese climbing and the
                pursuit of perfect friction.
              </p>
              <p>
                On the wall, there is only breath, movement, and contact. Chalk becomes a quiet
                companion — absorbing doubt, sharpening focus, and allowing the body to speak in
                stillness. In moments of hesitation or flow, it is not about force, but balance —
                between strength and subtlety, control and surrender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Showcase ── */}
      <section id="product" className="scroll-mt-16 relative bg-brand-dark chalk-texture overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16">
            <p className="font-heading text-accent tracking-[0.3em] uppercase text-sm mb-4 font-light">Featured</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-chalk">
              The Collection
            </h2>
          </div>

          {loading ? (
            <Spinner className="py-20" />
          ) : error ? (
            <p className="text-center py-20 text-text-secondary">{error}</p>
          ) : !product ? (
            <p className="text-center py-20 text-text-secondary">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Product image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-surface flex items-center justify-center">
                {product.featuredImage ? (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto opacity-20">
                      <polygon points="60,15 105,100 15,100" fill="currentColor" className="text-accent" />
                    </svg>
                    <p className="mt-4 text-text-secondary text-sm">Product Image</p>
                  </div>
                )}
              </div>

              {/* Product details */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-light text-chalk">{product.title}</h3>
                  {activeVariant && (
                    <p className="text-2xl font-light mt-3 text-accent font-heading">
                      {formatPrice(activeVariant.price)}
                      {activeVariant.compareAtPrice && (
                        <span className="ml-3 text-lg text-text-secondary line-through">
                          {formatPrice(activeVariant.compareAtPrice)}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {product.descriptionHtml && (
                  <div
                    className="prose-dark text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                )}

                {activeVariant && (
                  <VariantSelector
                    variants={variants}
                    selectedVariant={activeVariant}
                    onSelect={setSelectedVariant}
                  />
                )}

                <div className="flex items-center gap-4">
                  <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={cartLoading || !activeVariant?.availableForSale}
                  >
                    {!activeVariant?.availableForSale
                      ? 'Sold Out'
                      : addedFeedback
                        ? 'Added!'
                        : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Philosophy / Values ── */}
      <section className="relative bg-surface chalk-texture overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-accent/20 text-accent mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                  <path d="M12 2L2 22h20L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-medium text-chalk mb-3">Pure Grade</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light">
                100% magnesium carbonate. Ultra-fine texture for maximum moisture absorption and consistent friction.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-accent/20 text-accent mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-medium text-chalk mb-3">Climber Tested</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light">
                Developed and refined by climbers across bouldering, sport, and trad disciplines worldwide.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-accent/20 text-accent mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-medium text-chalk mb-3">Responsibly Made</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light">
                Sourced with care, crafted with minimal environmental impact. Respecting the stone we climb.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="relative bg-ink chalk-texture overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-chalk mb-4 italic">
            Ready to send your project?
          </h2>
          <p className="text-text-secondary mb-10 max-w-md mx-auto font-light">
            Explore our full collection of premium climbing chalk.
          </p>
          <Link to="/products">
            <Button size="lg">
              Shop All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
