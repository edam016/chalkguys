import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/product/ProductCard';
import { Spinner } from '../components/ui/Spinner';

export function ProductsPage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-2xl mb-16">
        <p className="font-heading text-accent tracking-[0.3em] uppercase text-sm mb-4 font-light">Collection</p>
        <h1 className="font-heading text-4xl sm:text-5xl font-light text-chalk">Shop</h1>
        <p className="mt-4 text-text-secondary font-light leading-relaxed">
          Premium climbing chalk crafted for every send.
        </p>
      </div>

      {loading ? (
        <Spinner className="py-20" />
      ) : error ? (
        <p className="text-center py-20 text-text-secondary font-light">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center py-20 text-text-secondary font-light">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
