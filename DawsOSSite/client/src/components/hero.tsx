import { useState } from "react";
import CausalPathDemo from "./causal-path-demo";
import DemoModal from "./demo-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Hero() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isCausalPathOpen, setIsCausalPathOpen] = useState(false);

  const openSamplePath = () => {
    setIsCausalPathOpen(true);
  };

  return (
    <>
      <section className="pt-24 pb-16 bg-gradient-to-br from-graphite to-slate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  From rate hikes to rent defaults — trace every <span className="text-signal-teal">causal link</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Who's next, how fast, how sure — always with evidence you can defend. Works alongside Bloomberg, MSCI, and Aladdin.
                </p>
              </div>

              {/* Proof Bar */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-signal-teal rounded-full slo-indicator"></div>
                  <span className="text-sm">Every answer shows its work</span>
                </div>
                <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-electric-blue rounded-full slo-indicator"></div>
                  <span className="text-sm">Calibrated confidence scores</span>
                </div>
                <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-provenance-purple rounded-full slo-indicator"></div>
                  <span className="text-sm">Replay any analysis</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-signal-teal hover:bg-signal-teal/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                  data-testid="button-book-demo-hero"
                >
                  Book a Demo
                </button>
                <button 
                  onClick={openSamplePath}
                  className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                  data-testid="button-open-sample-path"
                >
                  See How It Works
                </button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <CausalPathDemo />
            </div>
          </div>
        </div>
      </section>

      <DemoModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
      
      <Dialog open={isCausalPathOpen} onOpenChange={setIsCausalPathOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Interactive Causal Path Demo</DialogTitle>
          </DialogHeader>
          <CausalPathDemo />
        </DialogContent>
      </Dialog>
    </>
  );
}
