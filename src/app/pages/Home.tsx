import { Link } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { RecentlyViewed } from '../components/RecentlyViewed';
import { AutoScrollSection } from '../components/AutoScrollSection';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = [
    { id: 'm1', name: 'Striped Long Sleeve Tee', price: 49, image: '/images/Screenshot_2026-04-13_at_15.21.54.png', tag: 'NEW', stock: 3 },
    { id: 'w9', name: 'Striped Knit Polo', price: 49, image: '/images/Screenshot_2026-04-21_at_20.24.01.png', stock: 13 },
    { id: 'm6', name: 'Graphic Hoodie', price: 89, image: '/images/Screenshot_2026-04-21_at_20.10.51.png', stock: 15 },
    { id: 'w2', name: 'Olive Cargo Jacket', price: 129, image: '/images/Screenshot_2026-04-21_at_20.12.18.png', tag: 'POPULAR', stock: 3 },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NzY4MDAxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Spring Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h2 className="mb-6" style={{
              fontSize: '3.5rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}>
              Spring/Summer 2026
            </h2>
            <p className="mb-8" style={{ fontSize: '1.125rem', letterSpacing: '0.01em' }}>
              Discover the new collection
            </p>
            <Link to="/categories">
              <button className="bg-white text-[#111111] px-10 py-4 rounded-full hover:bg-[#F7F7F7] transition-all duration-200">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Women', subtitle: 'Explore Collection', path: '/categories/women', img: 'https://images.unsplash.com/photo-1629922947773-ad0eff4ad420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3b21lbiUyMGZhc2hpb24lMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAwNDgxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
            { title: 'Men', subtitle: 'Explore Collection', path: '/categories/men', img: 'https://images.unsplash.com/photo-1602346693719-c1c05078679e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc3NjgwMDQ4MXww&ixlib=rb-4.1.0&q=80&w=1080' },
            { title: 'New In', subtitle: 'Latest Arrivals', path: '/categories', img: 'https://images.unsplash.com/photo-1629922952881-2eed9b2f995b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NzY4MDAxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
          ].map((category, i) => (
            <Link key={i} to={category.path}>
              <div className="group relative aspect-[3/4] bg-[#F7F7F7] rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={category.img}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="mb-2" style={{ fontSize: '2rem', fontWeight: 500 }}>
                    {category.title}
                  </h3>
                  <p className="flex items-center gap-2 group-hover:gap-3 transition-all" style={{ fontSize: '0.9375rem' }}>
                    {category.subtitle}
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Preview - Auto Scroll */}
      <section className="bg-[#F7F7F7] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: '2rem', fontWeight: 500, color: '#111111' }}>
              Best Sellers
            </h2>
            <Link
              to="/best-sellers"
              className="flex items-center gap-2 text-[#666666] hover:text-[#111111] transition-colors"
              style={{ fontSize: '0.9375rem' }}
            >
              View All
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
        <div className="pl-6">
          <AutoScrollSection products={[...featuredProducts, ...featuredProducts]} />
        </div>
        <p className="text-center mt-6" style={{ fontSize: '0.75rem', color: '#999999' }}>
          Hover to pause
        </p>
      </section>

      {/* Editorial Strip */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="mb-12" style={{ fontSize: '2rem', fontWeight: 500, color: '#111111' }}>
            Styled Looks
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { img: 'https://images.unsplash.com/photo-1700575306910-b7016feddcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Noir Elegance' },
              { img: 'https://images.unsplash.com/photo-1700575306937-0855d570110d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Monochrome Chic' },
              { img: 'https://images.unsplash.com/photo-1686687252343-061e746b4ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Contemporary Lines' },
              { img: 'https://images.unsplash.com/photo-1631036703066-503cefb8f196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Urban Poetry' },
              { img: 'https://images.unsplash.com/photo-1631036119908-f60c9319b8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Minimal Grace' },
              { img: 'https://images.unsplash.com/photo-1763750785023-ee0cf8d4d0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Refined Layers' },
              { img: 'https://images.unsplash.com/photo-1759725608366-ea7a6e64dbe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Structured Silhouette' },
              { img: 'https://images.unsplash.com/photo-1758900727878-f7c5e90ed171?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Power Tailoring' },
              { img: 'https://images.unsplash.com/photo-1758900728131-32b8fa6fcda4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc2ODAxNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', name: 'Modern Duo' },
              { img: 'https://images.unsplash.com/photo-1637036862229-3408b544d48c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8ZmFzaGlvbiUyMGxvb2tib29rJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc3NjgwMTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080', name: 'Avant-Garde' },
            ].map((look, i) => (
              <div key={i} className="flex-shrink-0 w-80 group">
                <div className="aspect-[3/4] bg-[#F7F7F7] rounded-2xl mb-4 overflow-hidden cursor-pointer relative">
                  <img
                    src={look.img}
                    alt={look.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="mb-1" style={{ fontSize: '1rem', fontWeight: 500, color: '#111111' }}>
                  {look.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#666666' }}>
                  Spring 2026
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
}
