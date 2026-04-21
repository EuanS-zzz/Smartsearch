import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';
import { useNavigate } from 'react-router';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { items, cartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5]">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#111111' }}>
              Shopping Bag ({cartCount})
            </h2>
            <button
              onClick={onClose}
              className="text-[#666666] hover:text-[#111111] transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ fontSize: '0.9375rem', color: '#666666' }}>
                  Your bag is empty
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="w-24 h-32 bg-[#F7F7F7] rounded-xl overflow-hidden flex-shrink-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1" style={{ fontSize: '0.9375rem', color: '#111111' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#666666' }}>
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="mt-2" style={{ fontSize: '1rem', fontWeight: 500, color: '#111111' }}>
                        £{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#E5E5E5] p-6 space-y-4">
              <div className="flex justify-between mb-4">
                <span style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111111' }}>
                  Subtotal
                </span>
                <span style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111111' }}>
                  £{subtotal}
                </span>
              </div>
              <Button
                fullWidth
                onClick={() => {
                  navigate('/basket');
                  onClose();
                }}
              >
                View Bag
              </Button>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => {
                  navigate('/checkout');
                  onClose();
                }}
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
