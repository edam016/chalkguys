import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { QuantitySelector } from '../ui/QuantitySelector';
import { formatPrice } from '../../lib/formatPrice';
import type { CartLine } from '../../types/shopify';

interface CartLineItemProps {
  line: CartLine;
}

export function CartLineItem({ line }: CartLineItemProps) {
  const { updateCartLine, removeCartLine, cartLoading, closeCart } = useCart();
  const { merchandise } = line;

  const optionLabel = merchandise.selectedOptions
    .filter((o) => o.name !== 'Title' || o.value !== 'Default Title')
    .map((o) => o.value)
    .join(' / ');

  return (
    <div className="flex gap-3 py-4 border-b border-white/5 last:border-0">
      <Link
        to={`/products/${merchandise.product.handle}`}
        onClick={closeCart}
        className="shrink-0 w-20 h-20 overflow-hidden bg-surface"
      >
        {merchandise.image ? (
          <img
            src={merchandise.image.url}
            alt={merchandise.image.altText || merchandise.product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-text-secondary">
            No image
          </div>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${merchandise.product.handle}`}
          onClick={closeCart}
          className="font-light text-sm text-chalk hover:text-accent transition-colors truncate block"
        >
          {merchandise.product.title}
        </Link>
        {optionLabel && (
          <p className="text-xs text-text-secondary mt-0.5 font-light">{optionLabel}</p>
        )}
        <p className="text-sm font-light mt-1 text-accent">{formatPrice(line.cost.totalAmount)}</p>

        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            quantity={line.quantity}
            onChange={(q) => updateCartLine(line.id, q)}
            disabled={cartLoading}
          />
          <button
            onClick={() => removeCartLine(line.id)}
            disabled={cartLoading}
            className="text-xs text-text-secondary hover:text-chalk transition-colors cursor-pointer disabled:opacity-50 font-light tracking-wide"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
