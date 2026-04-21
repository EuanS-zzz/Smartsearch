import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { WishlistProvider } from './context/WishlistContext';

export default function App() {
  return (
    <CartProvider>
      <RecentlyViewedProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" richColors />
        </WishlistProvider>
      </RecentlyViewedProvider>
    </CartProvider>
  );
}
