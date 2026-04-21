import { useEffect, useRef, useState } from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
  stock?: number;
}

interface AutoScrollSectionProps {
  products: Product[];
}

export function AutoScrollSection({ products }: AutoScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollAmount += scrollSpeed;
        scrollContainer.scrollLeft = scrollAmount;

        // Reset to start when reaching the end
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 20);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="flex gap-6 overflow-x-hidden"
      style={{ scrollBehavior: 'auto' }}
    >
      {duplicatedProducts.map((product, index) => (
        <div key={`${product.id}-${index}`} className="flex-shrink-0 w-72">
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}
