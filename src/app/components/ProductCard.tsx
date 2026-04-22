import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
  stock?: number;
}

export function ProductCard({ id, name, price, image, tag, stock = 10 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const sizes = ['S', 'M', 'L'];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${id}-${size}`,
      name,
      price,
      quantity: 1,
      size,
      image
    });

    toast.success(`${name} (${size}) added to bag`, {
      description: 'Item successfully added',
      duration: 3000,
    });
  };

  return (
    <Link to={`/product/${id}`}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] bg-[#F7F7F7] rounded-2xl overflow-hidden mb-4">
          {image ? (
            <img
              src={image}
              alt={`${name} - £${price}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            />
          ) : (
            <div className="absolute inset-0 bg-[#E5E5E5]" />
          )}
          {tag && (
            <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full">
              <span className="text-xs tracking-wider" style={{ color: '#111111' }}>{tag}</span>
            </div>
          )}
          {isHovered && (
            <div className="absolute inset-x-4 bottom-4">
              <div className="bg-white rounded-2xl p-3 shadow-2xl">
                <p className="text-center text-[#111111] mb-2" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                  QUICK ADD
                </p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => handleQuickAdd(e, size)}
                      aria-label={`Add ${name} size ${size} to bag`}
                      className="flex-1 bg-[#111111] text-white py-3 rounded-xl hover:bg-[#2A2A2A] transition-all hover:scale-105"
                      style={{ fontSize: '0.9375rem', fontWeight: 600 }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 style={{ fontSize: '0.9375rem', color: '#111111' }}>{name}</h3>
            {stock <= 5 && stock > 0 && (
              <span className="text-xs px-2 py-0.5 bg-[#FF5733] text-white rounded-full">
                {stock} left
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.9375rem', color: '#666666' }}>£{price}</p>
        </div>
      </div>
    </Link>
  );
}
