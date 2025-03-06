
import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { UploadCloud, File, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FileUploadProps {
  className?: string;
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ className, onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file.name.endsWith('.pptx') && !file.name.endsWith('.ppt')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a PowerPoint file (.ppt or .pptx)",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedFile(file);
    onFileUpload(file);
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`
    });
  };
  
  const removeFile = useCallback(() => {
    setSelectedFile(null);
  }, []);
  
  return (
    <div className={cn("w-full", className)}>
      {!selectedFile ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex flex-col items-center justify-center gap-4",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-fade-in">
            <UploadCloud className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">Upload Presentation</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Drag and drop your PowerPoint file here, or click to browse your files
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            accept=".ppt,.pptx"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Browse Files
          </label>
          <p className="text-xs text-muted-foreground">
            Supports .ppt and .pptx (PowerPoint) files
          </p>
        </div>
      ) : (
        <div className="glass-card p-4 animate-fade-in flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <File className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm truncate max-w-[200px]">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
