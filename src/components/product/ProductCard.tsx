import { Link } from 'react-router-dom';
import { formatPrice } from '../../lib/formatPrice';
import type { Product } from '../../types/shopify';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.featuredImage;
  const price = product.priceRange.minVariantPrice;

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group block bg-surface/50 overflow-hidden border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-[border-color,transform] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
    >
      <div className="aspect-square overflow-hidden bg-surface">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-secondary">
            <svg viewBox="0 0 120 120" className="w-16 h-16 opacity-15">
              <polygon points="60,15 105,100 15,100" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-light text-chalk group-hover:text-accent transition-colors duration-300 truncate">
          {product.title}
        </h3>
        <p className="mt-1 text-text-secondary font-light text-sm">
          {formatPrice(price)}
        </p>
        {!product.availableForSale && (
          <p className="mt-1 text-xs text-accent/60 tracking-wide uppercase font-light">Sold out</p>
        )}
      </div>
    </Link>
  );
}
