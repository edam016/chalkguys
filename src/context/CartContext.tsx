import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { shopifyClient } from '../lib/shopify';
import {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from '../lib/queries';
import type { Cart } from '../types/shopify';

const CART_ID_KEY = 'chalkguys-cart-id';

interface CartContextValue {
  cart: Cart | null;
  cartOpen: boolean;
  cartLoading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  removeCartLine: (lineId: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (!savedCartId) return;

    async function restoreCart() {
      try {
        const { data } = await shopifyClient.request(GET_CART_QUERY, {
          variables: { cartId: savedCartId },
        });
        if (data?.cart) {
          setCart(data.cart);
        } else {
          localStorage.removeItem(CART_ID_KEY);
        }
      } catch {
        localStorage.removeItem(CART_ID_KEY);
      }
    }

    restoreCart();
  }, []);

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setCartLoading(true);
    try {
      if (!cart) {
        // Create new cart
        const { data } = await shopifyClient.request(CREATE_CART_MUTATION, {
          variables: {
            input: {
              lines: [{ merchandiseId: variantId, quantity }],
            },
          },
        });
        const newCart = data?.cartCreate?.cart;
        if (newCart) {
          setCart(newCart);
          localStorage.setItem(CART_ID_KEY, newCart.id);
        }
      } else {
        // Add to existing cart
        const { data } = await shopifyClient.request(ADD_TO_CART_MUTATION, {
          variables: {
            cartId: cart.id,
            lines: [{ merchandiseId: variantId, quantity }],
          },
        });
        const updatedCart = data?.cartLinesAdd?.cart;
        if (updatedCart) setCart(updatedCart);
      }
      setCartOpen(true);
    } finally {
      setCartLoading(false);
    }
  }, [cart]);

  const updateCartLine = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return;
    setCartLoading(true);
    try {
      const { data } = await shopifyClient.request(UPDATE_CART_MUTATION, {
        variables: {
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        },
      });
      const updatedCart = data?.cartLinesUpdate?.cart;
      if (updatedCart) setCart(updatedCart);
    } finally {
      setCartLoading(false);
    }
  }, [cart]);

  const removeCartLine = useCallback(async (lineId: string) => {
    if (!cart) return;
    setCartLoading(true);
    try {
      const { data } = await shopifyClient.request(REMOVE_FROM_CART_MUTATION, {
        variables: {
          cartId: cart.id,
          lineIds: [lineId],
        },
      });
      const updatedCart = data?.cartLinesRemove?.cart;
      if (updatedCart) setCart(updatedCart);
    } finally {
      setCartLoading(false);
    }
  }, [cart]);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <CartContext.Provider
      value={{ cart, cartOpen, cartLoading, addToCart, updateCartLine, removeCartLine, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
