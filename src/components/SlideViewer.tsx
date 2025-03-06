
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

interface SlideViewerProps {
  className?: string;
  slides: string[];
  currentSlide: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

const SlideViewer: React.FC<SlideViewerProps> = ({
  className,
  slides,
  currentSlide,
  onNextSlide,
  onPrevSlide
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };
  
  return (
    <div className={cn("relative overflow-hidden rounded-xl shadow-elevated bg-white", className)}>
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={toggleFullScreen}
          className="p-2 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm transition-colors"
          aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullScreen ? (
            <Minimize className="h-4 w-4 text-white" />
          ) : (
            <Maximize className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
      
      {/* Slide content */}
      <div className="w-full h-full flex items-center justify-center">
        {slides.length > 0 ? (
          <div className="w-full h-full">
            <img 
              src={slides[currentSlide]} 
              alt={`Slide ${currentSlide + 1}`} 
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            No slides to display
          </div>
        )}
      </div>
      
      {/* Navigation buttons (only show if there are slides) */}
      {slides.length > 0 && (
        <>
          <button
            onClick={onPrevSlide}
            disabled={currentSlide === 0}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm transition-colors",
              currentSlide === 0 && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          
          <button
            onClick={onNextSlide}
            disabled={currentSlide === slides.length - 1}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm transition-colors",
              currentSlide === slides.length - 1 && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}
      
      {/* Slide number indicator */}
      {slides.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  );
};

export default SlideViewer;
