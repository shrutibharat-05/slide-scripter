
import React, { useState } from 'react';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import SlideViewer from '@/components/SlideViewer';
import SlideNavigation from '@/components/SlideNavigation';
import EmptyState from '@/components/EmptyState';
import { extractSlidesFromPPT } from '@/lib/slideUtils';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      
      // Show processing toast
      toast({
        title: "Processing",
        description: "Extracting slides from your presentation...",
      });
      
      // Process the file and extract slides
      const extractedSlides = await extractSlidesFromPPT(file);
      
      setSlides(extractedSlides);
      setCurrentSlide(0);
      
      toast({
        title: "Success",
        description: `${extractedSlides.length} slides extracted successfully.`,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error",
        description: "Failed to process the presentation file.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };
  
  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };
  
  const selectSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      
      <main className="flex-1 container py-6 flex flex-col gap-6">
        <div className="w-full max-w-lg mx-auto">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
        
        {isProcessing ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="glass-card p-8 text-center animate-pulse">
              <p className="text-lg font-medium">Processing your presentation...</p>
              <p className="text-sm text-muted-foreground mt-2">This may take a moment</p>
            </div>
          </div>
        ) : slides.length > 0 ? (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
            <div className="lg:col-span-3">
              <SlideViewer 
                slides={slides} 
                currentSlide={currentSlide} 
                onNextSlide={goToNextSlide} 
                onPrevSlide={goToPrevSlide}
                className="h-[600px]"
              />
            </div>
            <div className="lg:col-span-1">
              <SlideNavigation 
                slides={slides} 
                currentSlide={currentSlide} 
                onSelectSlide={selectSlide}
              />
            </div>
          </div>
        ) : (
          <EmptyState className="flex-1" />
        )}
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>© {new Date().getFullYear()} SlideScripter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
