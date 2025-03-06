
import React from 'react';
import { cn } from '@/lib/utils';
import { FilePresentation } from 'lucide-react';

interface EmptyStateProps {
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8", className)}>
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-fade-in">
        <FilePresentation className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Upload your presentation</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Upload a PowerPoint file to view and navigate through your slides directly in the browser.
      </p>
      <div className="glass-card p-6 w-full max-w-md">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">1</span>
            </div>
            <p className="text-sm">Upload your .ppt or .pptx file</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">2</span>
            </div>
            <p className="text-sm">View your slides in the browser</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">3</span>
            </div>
            <p className="text-sm">Navigate through your slides with the controls</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
