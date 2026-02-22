import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const publicAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || !publicAccessToken) {
  console.warn(
    'Missing Shopify environment variables. Set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env'
  );
}

export const shopifyClient = createStorefrontApiClient({
  storeDomain,
  apiVersion: '2024-10',
  publicAccessToken,
});
