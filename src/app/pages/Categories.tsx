import { useParams, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import { SmartSearch } from '../components/SmartSearch';
import { CategoryChips } from '../components/CategoryChips';
import { ProductCard } from '../components/ProductCard';

const menProducts = [
  { id: 'm1', name: 'Striped Long Sleeve Tee', price: 49, image: '/images/Screenshot_2026-04-13_at_15.21.54.png', category: 'Tops', stock: 3 },
  { id: 'm2', name: 'Half-Zip Sweatshirt', price: 79, image: '/images/Screenshot_2026-04-13_at_15.29.53.png', category: 'Tops', stock: 12 },
  { id: 'm3', name: 'Classic Crewneck', price: 69, image: '/images/Screenshot_2026-04-13_at_15.30.51.png', category: 'Tops', stock: 8 },
  { id: 'm4', name: 'Relaxed Fit Jeans', price: 89, image: '/images/Screenshot_2026-04-13_at_15.31.26.png', category: 'Denim', stock: 5 },
  { id: 'm5', name: 'Bomber Jacket', price: 149, image: '/images/Screenshot_2026-04-13_at_15.32.09.png', category: 'Jackets', stock: 4 },
  { id: 'm6', name: 'Graphic Hoodie', price: 89, image: '/images/Screenshot_2026-04-21_at_20.10.51.png', category: 'Jackets', stock: 15 },
  { id: 'm7', name: 'Polo Shirt', price: 59, image: '/images/Screenshot_2026-04-21_at_20.11.14.png', category: 'Tops', stock: 10 },
  { id: 'm8', name: 'Floral Print Swim Shorts', price: 45, image: '/images/Screenshot_2026-04-21_at_20.24.36.png', category: 'Shorts', stock: 2 },
  { id: 'm9', name: 'Striped Swimming Trunks', price: 42, image: '/images/Screenshot_2026-04-21_at_20.24.41.png', category: 'Shorts', stock: 7 },
];

const womenProducts = [
  { id: 'w1', name: 'Brown V-Neck Tee', price: 39, image: '/images/Screenshot_2026-04-21_at_20.12.52.png', category: 'Tops', stock: 11 },
  { id: 'w2', name: 'Olive Cargo Jacket', price: 129, image: '/images/Screenshot_2026-04-21_at_20.12.18.png', category: 'Jackets', stock: 3 },
  { id: 'w3', name: 'Black Tank Top', price: 35, image: '/images/Screenshot_2026-04-21_at_20.12.30.png', category: 'Tops', stock: 6 },
  { id: 'w4', name: 'White V-Neck Tee', price: 38, image: '/images/Screenshot_2026-04-21_at_20.22.18.png', category: 'Tops', stock: 14 },
  { id: 'w5', name: 'Pink Open-Back Crop Top', price: 45, image: '/images/Screenshot_2026-04-21_at_20.22.31.png', category: 'Tops', stock: 4 },
  { id: 'w6', name: 'Lace Rib Shorts', price: 55, image: '/images/Screenshot_2026-04-21_at_20.23.12.png', category: 'Shorts', stock: 9 },
  { id: 'w7', name: 'Wide Leg Denim', price: 52, image: '/images/Screenshot_2026-04-21_at_20.23.26.png', category: 'Denim', stock: 5 },
  { id: 'w8', name: 'Striped Knit Tee', price: 48, image: '/images/Screenshot_2026-04-21_at_20.23.48.png', category: 'Tops', stock: 2 },
  { id: 'w9', name: 'Striped Knit Polo', price: 49, image: '/images/Screenshot_2026-04-21_at_20.24.01.png', category: 'Tops', stock: 13 },
];

export default function Categories() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const isMen = category === 'men';
  const isWomen = category === 'women';

  const allProducts = isMen ? menProducts : isWomen ? womenProducts : [...menProducts, ...womenProducts];

  // Get search terms from query parameter (from visual search)
  const searchQuery = searchParams.get('search');
  const searchTerms = searchQuery ? searchQuery.toLowerCase().split(',') : [];

  // Filter by category first
  let filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  // Then filter by search terms if they exist (from visual search)
  if (searchTerms.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const productText = `${product.name} ${product.category}`.toLowerCase();
      return searchTerms.some(term =>
        productText.includes(term.trim()) ||
        term.trim().includes(product.category.toLowerCase())
      );
    });
  }

  const products = filteredProducts;
  const categories = ['All', 'Tops', 'Jackets', 'Denim', 'Shorts'];

  return (
    <div className="min-h-screen">
      {/* Smart Search Section */}
      <section className="bg-[#F7F7F7] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="mb-8 text-center" style={{
            fontSize: '2.5rem',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#111111'
          }}>
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </h1>
          <SmartSearch />
        </div>
      </section>

      {/* Visual Search Results Banner */}
      {searchTerms.length > 0 && (
        <section className="bg-[#111111] text-white py-4">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p style={{ fontSize: '0.875rem' }}>
              ✨ Visual search results for: <strong>{searchTerms.slice(0, 3).join(', ')}</strong>
              {' '} — {products.length} {products.length === 1 ? 'match' : 'matches'} found
            </p>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="border-b border-[#E5E5E5] py-6">
        <div className="max-w-7xl mx-auto px-6">
          <CategoryChips
            categories={categories}
            active={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6 flex items-center justify-between">
            <p style={{ fontSize: '0.875rem', color: '#666666' }}>
              {products.length} products
            </p>
            <select
              className="px-4 py-2 bg-[#F7F7F7] rounded-full outline-none cursor-pointer"
              style={{ fontSize: '0.875rem', color: '#111111' }}
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
