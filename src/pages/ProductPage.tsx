import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/product/ProductImage';
import { VariantSelector } from '../components/product/VariantSelector';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { formatPrice } from '../lib/formatPrice';
import type { ProductVariant } from '../types/shopify';

export function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const { product, loading, error } = useProduct(handle);
  const { addToCart, cartLoading } = useCart();

  const variants = product?.variants.edges.map((e) => e.node) ?? [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const activeVariant = selectedVariant ?? variants[0] ?? null;

  const images = product?.images.edges.map((e) => e.node) ?? [];

  async function handleAddToCart() {
    if (!activeVariant) return;
    await addToCart(activeVariant.id, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  if (loading) return <Spinner className="py-20" />;

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-heading text-2xl font-light text-chalk mb-2">Product not found</h1>
        <p className="text-text-secondary font-light">{error || 'This product does not exist.'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary mb-10 font-light">
        <Link to="/" className="hover:text-chalk transition-colors">Home</Link>
        <span className="opacity-40">/</span>
        <Link to="/products" className="hover:text-chalk transition-colors">Shop</Link>
        <span className="opacity-40">/</span>
        <span className="text-chalk">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <ProductImage images={images} productTitle={product.title} />

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-light text-chalk">{product.title}</h1>
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

          {product.descriptionHtml && (
            <div className="pt-4 border-t border-white/5">
              <div
                className="prose-dark text-sm leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
