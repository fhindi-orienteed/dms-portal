import { useState, useRef } from 'react';
import type { Branch } from '../../types';

interface BranchesCarouselProps {
  branches: Branch[];
}

export default function BranchesCarousel({ branches }: BranchesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const itemsPerView = 1; 
  const maxIndex = Math.max(0, branches.length - itemsPerView);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.scrollWidth / branches.length;
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

//   const nextBranches = () => {
//     const nextIndex = Math.min(currentIndex + 1, maxIndex);
//     scrollToIndex(nextIndex);
//   };

//   const prevBranches = () => {
//     const prevIndex = Math.max(currentIndex - 1, 0);
//     scrollToIndex(prevIndex);
//   };

  if (branches.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">Our Branches</h3>
      
      <div className="relative">
        {/* Branches Container */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-3 overflow-hidden scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {branches.map((branch) => (
            <div 
              key={branch.id} 
              className="flex-shrink-0 w-full bg-white/5 rounded-lg p-4 border border-white/10 min-w-0"
            >
              <h4 className="text-white font-medium mb-2 truncate">{branch.name}</h4>
              <div className="space-y-1 text-sm text-gray-300">
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span className="truncate">{branch.address}</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span>{branch.phone}</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2">🕒</span>
                  <span className="truncate">{branch.hours}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        {branches.length > itemsPerView && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 