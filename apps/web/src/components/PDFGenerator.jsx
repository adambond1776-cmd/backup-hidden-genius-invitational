
import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PDFGenerator = ({ asButton = false, variant = "default", className = "", children }) => {
  const pdfUrl = "https://raw.githubusercontent.com/adambond1776-cmd/backup-hidden-genius-invitational/cursor/add-pdf-download-097a/documents/sample-book.pdf";

  if (asButton) {
    return (
      <Button 
        asChild
        variant={variant}
        className={className}
      >
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
          {children || (
            <>
              <Download className="mr-2 h-5 w-5" />
              Read Free Sample
            </>
          )}
        </a>
      </Button>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-md mx-auto shadow-lg transition-all">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileText className="w-8 h-8 text-primary" />
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-3">
        Get the Free Sample
      </h3>
      
      <p className="text-muted-foreground mb-8">
        Download the 23-page sample of "The Business of Life: Student Edition" including the Four Pillars, Practical Exercises, and Student Stories.
      </p>
      
      <Button 
        asChild
        className="w-full h-14 text-base font-bold transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
          <Download className="mr-2 h-5 w-5" />
          Read Free Sample
        </a>
      </Button>
      
      <p className="text-xs text-muted-foreground mt-4">
        PDF format • 23 Pages • Exact Document Content
      </p>
    </div>
  );
};

export default PDFGenerator;
