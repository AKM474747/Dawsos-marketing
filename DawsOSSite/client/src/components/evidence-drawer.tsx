import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { ExternalLink, Copy, RotateCcw, FileText, Calendar, Shield, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface EvidenceSource {
  id: string;
  title: string;
  source: string;
  url: string;
  excerpt: string;
  date: string;
  confidence: number;
  type: "academic" | "regulatory" | "market_data" | "historical";
}

export interface EvidenceContext {
  title: string;
  description: string;
  scenario: string;
  snapshotId: string;
  sources: EvidenceSource[];
  summary: string;
}

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  context: EvidenceContext | null;
}

export default function EvidenceDrawer({ isOpen, onClose, context }: EvidenceDrawerProps) {
  const { toast } = useToast();
  const [copiedSnapshotId, setCopiedSnapshotId] = useState(false);

  const handleCopySnapshot = async () => {
    if (!context) return;
    
    const snapshotUrl = `${window.location.origin}/replay/${context.snapshotId}`;
    
    try {
      await navigator.clipboard.writeText(snapshotUrl);
      setCopiedSnapshotId(true);
      setTimeout(() => setCopiedSnapshotId(false), 2000);
      toast({
        title: "Replay Link Copied",
        description: "Share this link to replay the exact same analysis",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy replay link to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleCopySummary = async () => {
    if (!context) return;
    
    const summary = `${context.title}\n\n${context.summary}\n\nSources:\n${context.sources.map(s => `• ${s.title} - ${s.source} (${s.date})\n  ${s.url}`).join('\n\n')}`;
    
    try {
      await navigator.clipboard.writeText(summary);
      toast({
        title: "Summary Copied",
        description: "Evidence summary and sources copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy summary to clipboard",
        variant: "destructive",
      });
    }
  };

  const getTypeIcon = (type: EvidenceSource['type']) => {
    switch (type) {
      case 'academic': return <FileText className="w-4 h-4" />;
      case 'regulatory': return <Shield className="w-4 h-4" />;
      case 'market_data': return <Calendar className="w-4 h-4" />;
      case 'historical': return <RotateCcw className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: EvidenceSource['type']) => {
    switch (type) {
      case 'academic': return 'bg-electric-blue/20 text-electric-blue border-electric-blue';
      case 'regulatory': return 'bg-signal-teal/20 text-signal-teal border-signal-teal';
      case 'market_data': return 'bg-alert-amber/20 text-alert-amber border-alert-amber';
      case 'historical': return 'bg-provenance-purple/20 text-provenance-purple border-provenance-purple';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  if (!context) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[600px] lg:w-[800px] bg-background border-l border-muted"
        data-testid="sheet-evidence-drawer"
      >
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <SheetTitle className="text-xl font-bold text-foreground">
                {context.title}
              </SheetTitle>
              <p className="text-muted-foreground text-sm">
                {context.description}
              </p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {context.scenario}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-xs font-mono cursor-pointer hover:bg-muted/50" 
                  onClick={handleCopySnapshot}
                >
                  {copiedSnapshotId ? "Copied!" : `#${context.snapshotId}`}
                </Badge>
              </div>
            </div>
            <SheetClose className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleCopySnapshot}
              variant="outline"
              className="flex-1 border-signal-teal text-signal-teal hover:bg-signal-teal/10"
              data-testid="button-copy-replay"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {copiedSnapshotId ? "Copied!" : "Copy Replay Link"}
            </Button>
            <Button
              onClick={handleCopySummary}
              variant="outline"
              className="flex-1 border-electric-blue text-electric-blue hover:bg-electric-blue/10"
              data-testid="button-copy-summary"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Summary
            </Button>
          </div>

          {/* Summary */}
          <Card className="bg-card border border-muted rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-signal-teal" />
              Analysis Summary
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {context.summary}
            </p>
          </Card>

          {/* Sources */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Shield className="w-4 h-4 mr-2 text-signal-teal" />
              Evidence Sources ({context.sources.length})
            </h3>
            
            <div className="space-y-4">
              {context.sources.map((source) => (
                <Card key={source.id} className="bg-card border border-muted rounded-lg p-4 hover:border-signal-teal/30 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{source.title}</h4>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span>{source.source}</span>
                          <span>•</span>
                          <span>{source.date}</span>
                          <span>•</span>
                          <span>Confidence: {Math.round(source.confidence * 100)}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getTypeColor(source.type)}`}
                        >
                          {getTypeIcon(source.type)}
                          <span className="ml-1 capitalize">{source.type.replace('_', ' ')}</span>
                        </Badge>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-muted rounded text-signal-teal hover:text-signal-teal/80 transition-colors"
                          data-testid={`link-source-${source.id}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    
                    <blockquote className="text-sm text-muted-foreground italic pl-4 border-l-2 border-muted">
                      "{source.excerpt}"
                    </blockquote>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-muted">
            <p className="text-xs text-muted-foreground text-center">
              All sources independently verified • Analysis reproducible via snapshot link
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}