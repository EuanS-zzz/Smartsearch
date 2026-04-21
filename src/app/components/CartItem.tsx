import { Minus, Plus, X } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  size,
  image,
  onQuantityChange,
  onRemove
}: CartItemProps) {
  return (
    <div className="flex gap-6 pb-6 border-b border-[#E5E5E5]">
      <div className="w-32 h-40 bg-[#F7F7F7] rounded-xl overflow-hidden flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#E5E5E5]" />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 style={{ fontSize: '1rem', color: '#111111' }}>{name}</h3>
            <button
              onClick={() => onRemove(id)}
              className="text-[#666666] hover:text-[#111111] transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#666666' }}>Size: {size}</p>
          <p className="mt-2" style={{ fontSize: '1rem', color: '#111111' }}>£{price}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center hover:bg-[#E5E5E5] transition-colors"
          >
            <Minus className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <span style={{ fontSize: '0.9375rem', color: '#111111' }}>{quantity}</span>
          <button
            onClick={() => onQuantityChange(id, quantity + 1)}
            className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center hover:bg-[#E5E5E5] transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
