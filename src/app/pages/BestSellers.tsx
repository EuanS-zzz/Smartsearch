import { ProductCard } from '../components/ProductCard';
import { AutoScrollSection } from '../components/AutoScrollSection';
import { TrendingUp } from 'lucide-react';

export default function BestSellers() {
  const bestSellers = [
    { id: 'm1', name: 'Striped Long Sleeve Tee', price: 49, image: '/images/Screenshot_2026-04-13_at_15.21.54.png', tag: 'TRENDING', stock: 3 },
    { id: 'w9', name: 'Striped Knit Polo', price: 49, image: '/images/Screenshot_2026-04-21_at_20.24.01.png', tag: '2K+ SOLD', stock: 13 },
    { id: 'm3', name: 'Classic Crewneck', price: 69, image: '/images/Screenshot_2026-04-13_at_15.30.51.png', tag: 'TOP RATED', stock: 8 },
    { id: 'w8', name: 'Striped Knit Tee', price: 48, image: '/images/Screenshot_2026-04-21_at_20.23.48.png', tag: 'TRENDING', stock: 2 },
    { id: 'm5', name: 'Bomber Jacket', price: 149, image: '/images/Screenshot_2026-04-13_at_15.32.09.png', tag: '1.5K+ SOLD', stock: 4 },
    { id: 'w2', name: 'Olive Cargo Jacket', price: 129, image: '/images/Screenshot_2026-04-21_at_20.12.18.png', tag: 'TOP RATED', stock: 3 },
    { id: 'm6', name: 'Graphic Hoodie', price: 89, image: '/images/Screenshot_2026-04-21_at_20.10.51.png', tag: '3K+ SOLD', stock: 15 },
    { id: 'w5', name: 'Pink Open-Back Crop Top', price: 45, image: '/images/Screenshot_2026-04-21_at_20.22.31.png', tag: 'TRENDING', stock: 4 },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-[#F7F7F7] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-[#111111]" strokeWidth={1.5} />
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#111111'
            }}>
              Best Sellers
            </h1>
          </div>
          <p style={{ fontSize: '1.125rem', color: '#666666' }}>
            Our most-loved pieces, chosen by customers
          </p>
        </div>
      </section>

      {/* Auto-Scroll Carousel */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p style={{ fontSize: '0.875rem', color: '#666666' }}>
            Trending now — Hover to pause
          </p>
        </div>
        <div className="pl-6 mb-12">
          <AutoScrollSection products={bestSellers} />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="mb-8" style={{ fontSize: '1.5rem', fontWeight: 500, color: '#111111' }}>
            All Best Sellers
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {bestSellers.map((product, index) => (
              <div key={product.id} className="relative">
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-[#111111] text-white rounded-full flex items-center justify-center z-10">
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{index + 1}</span>
                </div>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Are Popular */}
      <section className="bg-[#F7F7F7] py-16 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="mb-8 text-center" style={{ fontSize: '1.5rem', fontWeight: 500, color: '#111111' }}>
            Why customers love these
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', desc: 'Premium materials and exceptional craftsmanship' },
              { title: 'Timeless Design', desc: 'Styles that work season after season' },
              { title: 'Perfect Fit', desc: 'Consistently praised sizing and comfort' },
            ].map((reason, i) => (
              <div key={i} className="text-center">
                <h3 className="mb-2" style={{ fontSize: '1.125rem', color: '#111111' }}>
                  {reason.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#666666' }}>
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
