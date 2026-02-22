import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/formatPrice';

export function CartSummary() {
  const { cart, cartLoading } = useCart();

  if (!cart || cart.lines.edges.length === 0) return null;

  return (
    <div className="border-t border-white/5 pt-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary font-light">Subtotal</span>
        <span className="font-light text-chalk">{formatPrice(cart.cost.subtotalAmount)}</span>
      </div>
      <p className="text-xs text-text-secondary font-light">
        Shipping and taxes calculated at checkout.
      </p>
      <Button
        as-child
        size="lg"
        className="w-full"
        disabled={cartLoading}
        onClick={() => window.location.href = cart.checkoutUrl}
      >
        Checkout
      </Button>
    </div>
  );
}
