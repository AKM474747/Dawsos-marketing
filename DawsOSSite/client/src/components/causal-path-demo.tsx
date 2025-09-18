import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import EvidenceDrawer, { type EvidenceContext } from "./evidence-drawer";

export default function CausalPathDemo() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);

  // Sample evidence context for the demo
  const evidenceContext: EvidenceContext = {
    title: "Rate Hike Impact Analysis",
    description: "Fed rate increase flowing through commercial real estate markets",
    scenario: "Rate Hike +0.5%",
    snapshotId: "4f8a2b39",
    summary: "When the Federal Reserve raises rates by 0.5%, this creates a cascading effect through commercial real estate markets. Variable-rate mortgages immediately reset to higher payments, creating payment stress for borrowers. This leads to increased arrears within 45 days, followed by legal action and foreclosure proceedings. The analysis shows 87% confidence in this chain based on 2008 and 2015 rate cycle patterns.",
    sources: [
      {
        id: "fed-2024-01",
        title: "Federal Open Market Committee Statement",
        source: "Federal Reserve",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20240115a.htm",
        excerpt: "The Committee decided to raise the target range for the federal funds rate to 5.25 to 5.50 percent to ensure that inflation returns sustainably to 2 percent over time.",
        date: "2024-01-15",
        confidence: 0.95,
        type: "regulatory"
      },
      {
        id: "bis-2023-study",
        title: "Commercial Real Estate Risk in a Rising Rate Environment",
        source: "Bank for International Settlements",
        url: "https://www.bis.org/publ/qtrpdf/r_qt2309_research.pdf",
        excerpt: "Variable-rate commercial mortgages show significant stress indicators when rates rise by 50 basis points or more, with payment delinquencies increasing by an average of 23% within 60 days.",
        date: "2023-09-15",
        confidence: 0.89,
        type: "academic"
      },
      {
        id: "cre-data-2015",
        title: "Historical Analysis: 2015-2016 Rate Tightening Cycle",
        source: "Commercial Mortgage Alert",
        url: "https://www.cmalert.com/historical/2015-rate-cycle-analysis",
        excerpt: "During the 2015 rate increases, commercial mortgage delinquency rates rose from 1.8% to 3.4% over six months, with legal actions following an average of 73 days after initial payment stress.",
        date: "2015-12-18",
        confidence: 0.83,
        type: "historical"
      }
    ]
  };

  const handleViewEvidence = () => {
    setIsEvidenceOpen(true);
  };

  return (
    <div className="causal-path-demo p-8 rounded-2xl border border-muted bg-card/50 hover:bg-card/80 transition-all cursor-pointer">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Interactive Causal Path</h3>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-1 bg-signal-teal rounded-full"></div>
              Fact-based link
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-1 border border-electric-blue border-dashed rounded-full"></div>
              Pattern-derived
            </span>
          </div>
        </div>
        
        {/* Causal Chain Visualization */}
        <div className="space-y-4">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onHoverStart={() => setHoveredStep(1)}
            onHoverEnd={() => setHoveredStep(null)}
            onClick={() => setSelectedStep(selectedStep === 1 ? null : 1)}
          >
            <div className={`bg-alert-amber/20 border rounded-lg p-3 flex-1 transition-all cursor-pointer ${
              hoveredStep === 1 ? 'border-alert-amber bg-alert-amber/30 shadow-lg scale-102' : 'border-alert-amber'
            } ${selectedStep === 1 ? 'ring-2 ring-alert-amber/50' : ''}`}>
              <div className="font-mono text-sm text-alert-amber">Event: Fed Rate Hike +0.5%</div>
              <div className="text-xs text-muted-foreground mt-1">2024-01-15 14:30 UTC</div>
              {selectedStep === 1 && (
                <motion.div 
                  className="mt-2 p-2 bg-alert-amber/10 rounded text-xs"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  Source: Federal Reserve Press Release
                </motion.div>
              )}
            </div>
            <motion.div 
              className={`mx-4 transition-colors ${hoveredStep === 1 ? 'text-alert-amber' : 'text-signal-teal'}`}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" style={{
                strokeDasharray: '5,3',
                stroke: hoveredStep === 1 ? 'var(--alert-amber)' : 'var(--signal-teal)'
              }} />
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onHoverStart={() => setHoveredStep(2)}
            onHoverEnd={() => setHoveredStep(null)}
            onClick={() => setSelectedStep(selectedStep === 2 ? null : 2)}
          >
            <div className={`bg-electric-blue/20 border rounded-lg p-3 flex-1 transition-all cursor-pointer ${
              hoveredStep === 2 ? 'border-electric-blue bg-electric-blue/30 shadow-lg scale-102' : 'border-electric-blue'
            } ${selectedStep === 2 ? 'ring-2 ring-electric-blue/50' : ''}`}>
              <div className="font-mono text-sm text-electric-blue">Chain: Credit Tightening</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <span>Confidence: 0.87 ± 0.03</span>
                <div className="h-1 bg-electric-blue/30 rounded-full flex-1 overflow-hidden">
                  <div className="h-full bg-electric-blue w-[87%] rounded-full"></div>
                </div>
              </div>
              {selectedStep === 2 && (
                <motion.div 
                  className="mt-2 p-2 bg-electric-blue/10 rounded text-xs"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  Pattern: 2008, 2015 rate cycles + econometric model
                </motion.div>
              )}
            </div>
            <motion.div 
              className={`mx-4 transition-colors ${hoveredStep === 2 ? 'text-electric-blue' : 'text-signal-teal'}`}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onHoverStart={() => setHoveredStep(3)}
            onHoverEnd={() => setHoveredStep(null)}
            onClick={() => setSelectedStep(selectedStep === 3 ? null : 3)}
          >
            <div className={`bg-risk-red/20 border rounded-lg p-3 flex-1 transition-all cursor-pointer ${
              hoveredStep === 3 ? 'border-risk-red bg-risk-red/30 shadow-lg scale-102' : 'border-risk-red'
            } ${selectedStep === 3 ? 'ring-2 ring-risk-red/50' : ''}`}>
              <div className="font-mono text-sm text-risk-red">Impact: Commercial Portfolio Risk</div>
              <div className="text-xs text-muted-foreground mt-1">Expected: $2.3M increase in defaults (-4.2%)</div>
              {selectedStep === 3 && (
                <motion.div 
                  className="mt-2 p-2 bg-risk-red/10 rounded text-xs"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  Risk Model: Variable-rate exposure stress test
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Evidence Button & Microcopy */}
        <motion.div 
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button 
            onClick={handleViewEvidence}
            className="bg-signal-teal/20 hover:bg-signal-teal/30 border border-signal-teal text-signal-teal px-6 py-3 rounded-lg font-medium transition-all evidence-glow hover:scale-105"
            data-testid="button-view-evidence"
          >
            <Search className="w-4 h-4 inline mr-2" />
            View Evidence (2 clicks)
          </button>
          
          {/* Microcopy Tags */}
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-signal-teal rounded-full opacity-75"></div>
              Calibration: within Service Level Objectives
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-electric-blue rounded-full opacity-75"></div>
              Replay with snapshot ID: #4f8a2b
            </span>
          </div>
        </motion.div>
      </div>
      
      <EvidenceDrawer 
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        context={evidenceContext}
      />
    </div>
  );
}
