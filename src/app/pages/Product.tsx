import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../components/Button';
import { SizeGuide } from '../components/SizeGuide';
import { ProductCard } from '../components/ProductCard';
import { ChevronLeft, Heart, Share2, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useWishlist } from '../context/WishlistContext';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { addItem } = useCart();
  const { addProduct } = useRecentlyViewed();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const product = {
    id: id || 'm1',
    name: 'Striped Long Sleeve Tee',
    price: 49,
    description: 'Classic Breton striped long sleeve tee in premium cotton. Features a crew neck and relaxed fit. A timeless essential that pairs perfectly with denim for an effortlessly cool look.',
    details: [
      '100% Premium cotton',
      'Crew neck',
      'Relaxed fit',
      'Breton stripe pattern',
      'Machine washable'
    ],
    images: [
      '/images/Screenshot_2026-04-13_at_15.21.54.png',
      '/images/Screenshot_2026-04-13_at_15.29.53.png',
      '/images/Screenshot_2026-04-13_at_15.30.51.png',
      '/images/Screenshot_2026-04-13_at_15.31.26.png'
    ],
    stock: 3
  };

  const relatedProducts = [
    { id: 'm2', name: 'Half-Zip Sweatshirt', price: 79, image: '/images/Screenshot_2026-04-13_at_15.29.53.png' },
    { id: 'm4', name: 'Relaxed Fit Jeans', price: 89, image: '/images/Screenshot_2026-04-13_at_15.31.26.png' },
    { id: 'm5', name: 'Bomber Jacket', price: 149, image: '/images/Screenshot_2026-04-13_at_15.32.09.png' },
  ];

  const isFavorite = isInWishlist(product.id);

  useEffect(() => {
    addProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
  }, [product.id]);

  const handleAddToBag = () => {
    addItem({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      image: product.images[0]
    });

    toast.success(`${product.name} added to bag`, {
      description: `Size: ${selectedSize}`,
      duration: 3000,
    });
  };

  const handleWishlistToggle = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#666666] hover:text-[#111111] transition-colors"
          style={{ fontSize: '0.9375rem' }}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          Back
        </button>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-[3/4] bg-[#F7F7F7] rounded-2xl overflow-hidden">
                {img ? (
                  <img
                    src={img}
                    alt={`${product.name} - ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#E5E5E5]" />
                )}
              </div>
            ))}
          </div>

          {/* Product Info - Sticky */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="mb-2" style={{
                  fontSize: '2rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: '#111111'
                }}>
                  {product.name}
                </h1>
                <p style={{ fontSize: '1.5rem', color: '#111111' }}>£{product.price}</p>
              </div>
              <div className="flex gap-3">
                {product.stock <= 5 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#FF5733] text-white rounded-xl">
                    <span className="text-sm font-medium">Only {product.stock} left!</span>
                  </div>
                )}
                <button
                  onClick={handleWishlistToggle}
                  className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center hover:bg-[#E5E5E5] transition-colors"
                >
                  <Heart
                    className="w-5 h-5"
                    strokeWidth={1.5}
                    fill={isFavorite ? '#111111' : 'none'}
                    color="#111111"
                  />
                </button>
                <button className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center hover:bg-[#E5E5E5] transition-colors">
                  <Share2 className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <p className="mb-8" style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#666666'
            }}>
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label style={{ fontSize: '0.9375rem', color: '#111111' }}>
                  Select Size
                </label>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-[#666666] hover:text-[#111111] transition-colors flex items-center gap-2"
                  style={{ fontSize: '0.875rem' }}
                >
                  <Ruler className="w-4 h-4" strokeWidth={1.5} />
                  Size Guide
                </button>
              </div>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#F7F7F7] text-[#111111] hover:bg-[#E5E5E5]'
                    }`}
                    style={{ fontSize: '0.9375rem' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Button */}
            <Button
              fullWidth
              onClick={handleAddToBag}
              className="mb-4"
            >
              Add to Bag - £{product.price}
            </Button>

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
              <h3 className="mb-4" style={{ fontSize: '1.125rem', color: '#111111' }}>
                Product Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2" style={{ fontSize: '0.9375rem', color: '#666666' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#666666]" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="mt-8 p-6 bg-[#F7F7F7] rounded-2xl">
              <h4 className="mb-3" style={{ fontSize: '1rem', color: '#111111' }}>
                Delivery & Returns
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#666666', lineHeight: 1.6 }}>
                Free standard delivery on orders over $50. Returns accepted within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="mb-12" style={{ fontSize: '2rem', fontWeight: 500, color: '#111111' }}>
          Complete the Look
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  );
}
