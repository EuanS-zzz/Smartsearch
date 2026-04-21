import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { ProductCard } from './ProductCard';

export function RecentlyViewed() {
  const { products } = useRecentlyViewed();

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="mb-12" style={{ fontSize: '2rem', fontWeight: 500, color: '#111111' }}>
          Recently Viewed
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
