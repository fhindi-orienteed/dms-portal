import { useState, useRef } from "react";
import type { Branch } from "../../types";
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
      const itemWidth = container.clientWidth;
      container.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
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
  const nextBranch = () => {
    const nextIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(nextIndex);
  };
  const prevBranch = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(prevIndex);
  };
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        Our Branches
      </h3>
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        {branches.length > 1 && (
          <button
            onClick={prevBranch}
            disabled={currentIndex === 0}
            className={`absolute left-0 md:-left-8 p-2 text-white text-2xl rounded-full bg-white/10 hover:bg-white/30 transition ${
              currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            ‹
          </button>
        )}
        {/* Branches Container with border radius fix */}
        <div className="w-full max-w-md border border-white/10 bg-white/5 rounded-lg">
          <div className="overflow-hidden rounded-lg">
            <div
              ref={scrollContainerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${branches.length * 100}%`,
                transform: `translateX(-${
                  currentIndex * (100 / branches.length)
                }%)`,
              }}
            >
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="w-full flex-shrink-0 p-4"
                  style={{ flex: `0 0 ${100 / branches.length}%` }}
                >
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <h4 className="text-white font-medium mb-2 truncate">
                      {branch.name}
                    </h4>
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
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Arrow */}
        {branches.length > 1 && (
          <button
            onClick={nextBranch}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 md:-right-8 p-2 text-white text-2xl rounded-full bg-white/10 hover:bg-white/30 transition ${
              currentIndex === maxIndex ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            ›
          </button>
        )}
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
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
