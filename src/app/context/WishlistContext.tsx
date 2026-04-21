import { createContext, useContext, useState, ReactNode } from 'react';

interface WishlistContextType {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (id: string) => {
    setItems(prev => [...prev, id]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item !== id));
  };

  const isInWishlist = (id: string) => {
    return items.includes(id);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
