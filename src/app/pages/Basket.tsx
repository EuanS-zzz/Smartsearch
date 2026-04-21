import { useNavigate } from 'react-router';
import { CartItem } from '../components/CartItem';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';

export default function Basket() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="mb-12" style={{
          fontSize: '2.5rem',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: '#111111'
        }}>
          Shopping Bag
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="mb-6" style={{ fontSize: '1.125rem', color: '#666666' }}>
              Your bag is empty
            </p>
            <Button onClick={() => navigate('/categories')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8">
              <div className="space-y-6">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 sticky top-24">
                <h2 className="mb-6" style={{ fontSize: '1.25rem', color: '#111111' }}>
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-[#E5E5E5]">
                  <div className="flex justify-between">
                    <span style={{ fontSize: '0.9375rem', color: '#666666' }}>Subtotal</span>
                    <span style={{ fontSize: '0.9375rem', color: '#111111' }}>£{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '0.9375rem', color: '#666666' }}>Shipping</span>
                    <span style={{ fontSize: '0.9375rem', color: shipping === 0 ? '#22C55E' : '#111111' }}>
                      {shipping === 0 ? 'FREE' : `£${shipping}`}
                    </span>
                  </div>
                  {subtotal < 50 && shipping > 0 && (
                    <p style={{ fontSize: '0.875rem', color: '#666666' }}>
                      Add £{50 - subtotal} more for free shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between mb-8">
                  <span style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111111' }}>Total</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111111' }}>£{total}</span>
                </div>

                <Button
                  fullWidth
                  onClick={() => navigate('/checkout')}
                  className="mb-4"
                >
                  Proceed to Checkout
                </Button>

                <button
                  onClick={() => navigate('/categories')}
                  className="w-full text-center py-3 text-[#666666] hover:text-[#111111] transition-colors"
                  style={{ fontSize: '0.9375rem' }}
                >
                  Continue Shopping
                </button>

                {/* Trust Signals */}
                <div className="mt-8 pt-8 border-t border-[#E5E5E5] space-y-3">
                  {[
                    'Secure checkout',
                    'Free returns within 30 days',
                    'Express delivery available'
                  ].map((signal, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      <span style={{ fontSize: '0.875rem', color: '#666666' }}>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
