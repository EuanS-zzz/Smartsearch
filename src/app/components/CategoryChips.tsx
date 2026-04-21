import { useState } from 'react';

interface CategoryChipsProps {
  categories: string[];
  active?: string;
  onChange?: (category: string) => void;
}

export function CategoryChips({ categories, active = 'All', onChange }: CategoryChipsProps) {
  const [selected, setSelected] = useState(active);

  const handleClick = (category: string) => {
    setSelected(category);
    onChange?.(category);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
            selected === category
              ? 'bg-[#111111] text-white'
              : 'bg-[#F7F7F7] text-[#666666] hover:bg-[#E5E5E5]'
          }`}
          style={{ fontSize: '0.875rem', letterSpacing: '0.01em' }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
