
import React from 'react';
import { cn } from '@/lib/utils';

interface SlideNavigationProps {
  className?: string;
  slides: string[];
  currentSlide: number;
  onSelectSlide: (index: number) => void;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({
  className,
  slides,
  currentSlide,
  onSelectSlide
}) => {
  if (slides.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("w-full glass-card overflow-y-auto", className)}>
      <div className="p-4 border-b border-border">
        <h3 className="font-medium">Slides</h3>
      </div>
      <div className="p-2 grid grid-cols-2 gap-2 max-h-[calc(100vh-240px)] overflow-y-auto">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={cn(
              "relative rounded-lg overflow-hidden transition-all border-2",
              currentSlide === index 
                ? "ring-2 ring-primary border-primary" 
                : "border-transparent hover:border-muted"
            )}
            onClick={() => onSelectSlide(index)}
          >
            <div className="absolute top-1 left-1 text-xs font-medium bg-black/40 text-white px-1.5 py-0.5 rounded-sm">
              {index + 1}
            </div>
            <img 
              src={slide} 
              alt={`Slide thumbnail ${index + 1}`} 
              className="w-full aspect-[4/3] object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlideNavigation;
