import { useState, useEffect } from 'react';
import { shopifyClient } from '../lib/shopify';
import { PRODUCT_BY_HANDLE_QUERY } from '../lib/queries';
import type { Product } from '../types/shopify';

export function useProduct(handle: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    async function fetchProduct() {
      try {
        const { data } = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, {
          variables: { handle },
        });

        if (!cancelled) {
          if (data?.productByHandle) {
            setProduct(data.productByHandle);
          } else {
            setError('Product not found');
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load product');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProduct();
    return () => { cancelled = true; };
  }, [handle]);

  return { product, loading, error };
}
