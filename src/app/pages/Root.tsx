import { Outlet, Link } from 'react-router';
import { ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MiniCart } from '../components/MiniCart';

export default function Root() {
  const { cartCount } = useCart();
  const [showMiniCart, setShowMiniCart] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="hover:opacity-70 transition-opacity">
              <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.05em', color: '#111111' }}>ZARA</h1>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/categories/women"
                className="text-[#666666] hover:text-[#111111] transition-colors"
                style={{ fontSize: '0.9375rem', letterSpacing: '0.01em' }}
              >
                Women
              </Link>
              <Link
                to="/categories/men"
                className="text-[#666666] hover:text-[#111111] transition-colors"
                style={{ fontSize: '0.9375rem', letterSpacing: '0.01em' }}
              >
                Men
              </Link>
              <Link
                to="/best-sellers"
                className="text-[#666666] hover:text-[#111111] transition-colors"
                style={{ fontSize: '0.9375rem', letterSpacing: '0.01em' }}
              >
                Best Sellers
              </Link>
            </nav>

            <div className="flex items-center gap-6">
              <button
                aria-label="Account"
                className="text-[#666666] hover:text-[#111111] transition-colors"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setShowMiniCart(true)}
                aria-label={`Shopping bag${cartCount > 0 ? ` with ${cartCount} items` : ''}`}
                className="relative text-[#666666] hover:text-[#111111] transition-colors"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#111111] text-white rounded-full flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Mini Cart */}
      <MiniCart isOpen={showMiniCart} onClose={() => setShowMiniCart(false)} />

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="mb-4" style={{ fontSize: '0.875rem', color: '#111111' }}>Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Press'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-[#666666] hover:text-[#111111] transition-colors" style={{ fontSize: '0.875rem' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontSize: '0.875rem', color: '#111111' }}>Help</h4>
              <ul className="space-y-2">
                {['Contact', 'Shipping', 'Returns'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-[#666666] hover:text-[#111111] transition-colors" style={{ fontSize: '0.875rem' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontSize: '0.875rem', color: '#111111' }}>Legal</h4>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Cookies'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-[#666666] hover:text-[#111111] transition-colors" style={{ fontSize: '0.875rem' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontSize: '0.875rem', color: '#111111' }}>Follow</h4>
              <ul className="space-y-2">
                {['Instagram', 'Twitter', 'Facebook'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-[#666666] hover:text-[#111111] transition-colors" style={{ fontSize: '0.875rem' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#E5E5E5]">
            <p style={{ fontSize: '0.875rem', color: '#999999' }}>© 2026 ZARA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
