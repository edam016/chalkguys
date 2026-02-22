import { useState, useEffect } from 'react';
import { shopifyClient } from '../lib/shopify';
import { PRODUCTS_QUERY } from '../lib/queries';
import type { Product } from '../types/shopify';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        const { data } = await shopifyClient.request(PRODUCTS_QUERY, {
          variables: { first: 25 },
        });

        if (!cancelled && data?.products?.edges) {
          setProducts(data.products.edges.map((edge: { node: Product }) => edge.node));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load products');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}
