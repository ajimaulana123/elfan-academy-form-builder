import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, FileText, Image } from "lucide-react";

interface DocumentViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documents: { label: string; url: string | null }[];
  registrantName: string;
}

export function DocumentViewer({ open, onOpenChange, documents, registrantName }: DocumentViewerProps) {
  const availableDocs = documents.filter(d => d.url);

  const isImage = (url: string) => {
    const lower = url.toLowerCase();
    return lower.includes(".jpg") || lower.includes(".jpeg") || lower.includes(".png") || lower.includes(".webp");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">Dokumen — {registrantName}</DialogTitle>
        </DialogHeader>

        {availableDocs.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Tidak ada dokumen yang diunggah.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {availableDocs.map((doc) => (
              <div key={doc.label} className="rounded-lg border border-border/50 overflow-hidden bg-secondary/20">
                <div className="px-3 py-2 border-b border-border/30 flex items-center justify-between bg-secondary/30">
                  <span className="text-sm font-medium flex items-center gap-1.5">
                    {isImage(doc.url!) ? <Image className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                    {doc.label}
                  </span>
                  <a
                    href={doc.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="p-2">
                  {isImage(doc.url!) ? (
                    <img
                      src={doc.url!}
                      alt={doc.label}
                      className="w-full h-48 object-contain rounded bg-background"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-48 bg-background rounded">
                      <a
                        href={doc.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <FileText className="h-12 w-12" />
                        <span className="text-xs">Klik untuk membuka PDF</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
