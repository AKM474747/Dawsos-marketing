import { useState } from "react";
import Hero from "@/components/hero";
import CausalPathDemo from "@/components/causal-path-demo";
import DemoModal from "@/components/demo-modal";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, TrendingUp, Globe, University, Coins, Search, ArrowRight } from "lucide-react";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isCausalPathOpen, setIsCausalPathOpen] = useState(false);

  const openSampleQuery = () => {
    setIsDemoModalOpen(true);
  };

  const openCausalPath = () => {
    setIsCausalPathOpen(true);
  };

  const openEvidence = () => {
    setIsCausalPathOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From any market event to clear action—with evidence you can defend
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-signal-teal/20 border border-signal-teal rounded-full flex items-center justify-center mx-auto">
                <span className="text-signal-teal text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold">Start with any signal</h3>
              <p className="text-muted-foreground">
                A rate hike, a zoning policy change, or a supply chain delay—start with anything that moves your world.
              </p>
              <button
                onClick={openSampleQuery}
                className="text-signal-teal hover:underline"
                data-testid="button-view-sample-query"
              >
                See sample query →
              </button>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-electric-blue/20 border border-electric-blue rounded-full flex items-center justify-center mx-auto">
                <span className="text-electric-blue text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold">Get the ripple map</h3>
              <p className="text-muted-foreground">
                See who's impacted next, with timing and confidence. Every step shows its probability and reasoning.
              </p>
              <button
                onClick={openCausalPath}
                className="text-electric-blue hover:underline"
                data-testid="button-open-causal-path"
              >
                See the path →
              </button>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-provenance-purple/20 border border-provenance-purple rounded-full flex items-center justify-center mx-auto">
                <span className="text-provenance-purple text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold">Act with evidence</h3>
              <p className="text-muted-foreground">
                Every forecast comes with its causal path and provenance. Replay any analysis anytime.
              </p>
              <button
                onClick={openEvidence}
                className="text-provenance-purple hover:underline"
                data-testid="button-view-evidence"
              >
                View evidence →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Tiles */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Business-Grade Decisions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every feature designed for compliance, auditability, and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-signal-teal transition-all text-center">
              <div className="w-12 h-12 bg-signal-teal/20 border border-signal-teal rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-signal-teal" />
              </div>
              <h3 className="font-semibold mb-2">Two clicks to evidence</h3>
              <p className="text-sm text-muted-foreground">
                Every claim is linked to its source. No black box predictions.
              </p>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-electric-blue transition-all text-center">
              <div className="w-12 h-12 bg-electric-blue/20 border border-electric-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Calibrated confidence</h3>
              <p className="text-sm text-muted-foreground">
                Probabilities meet strict error guarantees. No overconfident guessing.
              </p>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-provenance-purple transition-all text-center">
              <div className="w-12 h-12 bg-provenance-purple/20 border border-provenance-purple rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-provenance-purple" />
              </div>
              <h3 className="font-semibold mb-2">Replayable snapshots</h3>
              <p className="text-sm text-muted-foreground">
                Reproduce any analysis, anytime. Full audit trail included.
              </p>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-alert-amber transition-all text-center">
              <div className="w-12 h-12 bg-alert-amber/20 border border-alert-amber rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-alert-amber" />
              </div>
              <h3 className="font-semibold mb-2">Governed by design</h3>
              <p className="text-sm text-muted-foreground">
                Immutable rules enforce explainability and compliance by default.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sector-Specific Callouts */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Real Estate & Finance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly how market events cascade through your portfolios and properties
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-background border border-muted rounded-xl p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-risk-red/20 border border-risk-red rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-risk-red" />
                  </div>
                  <h3 className="text-xl font-semibold">Rate Hike Impact Chain</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-alert-amber rounded-full"></div>
                    <span className="text-muted-foreground">Fed raises rates 0.5%</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm pl-5">
                    <ArrowRight className="w-4 h-4 text-signal-teal" />
                    <span className="text-muted-foreground">Variable mortgage resets kick in</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm pl-5">
                    <ArrowRight className="w-4 h-4 text-signal-teal" />
                    <span className="text-muted-foreground">Payment stress leads to arrears</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm pl-5">
                    <ArrowRight className="w-4 h-4 text-signal-teal" />
                    <span className="text-muted-foreground">Legal exposure increases litigation risk</span>
                  </div>
                </div>

                <div className="bg-risk-red/10 border border-risk-red/30 rounded-lg p-4 mt-6">
                  <p className="text-sm text-foreground font-medium">
                    Understand how rate hikes flow into mortgage resets, arrears, and litigation.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    See timing, confidence scores, and affected property segments
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-background border border-muted rounded-xl p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-electric-blue/20 border border-electric-blue rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-electric-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Policy Impact Testing</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                    <span className="text-muted-foreground">Rent control policy proposed</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm pl-5">
                    <ArrowRight className="w-4 h-4 text-signal-teal" />
                    <span className="text-muted-foreground">New construction permits decline</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm pl-5">
                    <ArrowRight className="w-4 h-4 text-signal-teal" />
                    <span className="text-muted-foreground">Supply constraints tighten market</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm pl-5">
                    <ArrowRight className="w-4 h-4 text-signal-teal" />
                    <span className="text-muted-foreground">Property values shift by segment</span>
                  </div>
                </div>

                <div className="bg-electric-blue/10 border border-electric-blue/30 rounded-lg p-4 mt-6">
                  <p className="text-sm text-foreground font-medium">
                    Scenario Builder helps test rent control or zoning policy changes — instantly.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Run side-by-side comparisons with confidence intervals
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <button className="bg-signal-teal hover:bg-signal-teal/90 text-white px-8 py-3 rounded-lg font-semibold transition-all" data-testid="button-explore-scenarios">
              Explore Your Scenarios
            </button>
          </div>
        </div>
      </section>

      {/* For Your Role */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Works with Your Existing Tools</h2>
            <p className="text-muted-foreground">Keep Bloomberg, MSCI, and Aladdin. Add the missing "why-next" layer.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-signal-teal/50 transition-all cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-signal-teal/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-signal-teal" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Risk Manager</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    When a downgrade rumor hits Bloomberg, see the next-order impacts with timing and confidence. Hand the path to your committee.
                  </p>
                  <button
                    className="text-signal-teal text-sm font-medium group-hover:underline"
                    data-testid="button-role-risk-manager"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-electric-blue/50 transition-all cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-electric-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Portfolio Analyst</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    When a supplier outage crosses the tape, trace ripples through your names and MSCI factors. Document evidence, act in Aladdin.
                  </p>
                  <button
                    className="text-electric-blue text-sm font-medium group-hover:underline"
                    data-testid="button-role-portfolio-analyst"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-provenance-purple/50 transition-all cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-provenance-purple/20 rounded-lg flex items-center justify-center">
                  <University className="w-5 h-5 text-provenance-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Policy Analyst</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    When tariffs are proposed, run side-by-side scenarios to show who's hit next and when. Frame results in MSCI terms.
                  </p>
                  <button
                    className="text-provenance-purple text-sm font-medium group-hover:underline"
                    data-testid="button-role-policy-analyst"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-signal-teal/50 transition-all cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-signal-teal/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-signal-teal" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Economist/Strategist</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    When macro prints surprise, Bloomberg gives you speed; DawsOS shows how it spreads with calibrated odds.
                  </p>
                  <button
                    className="text-signal-teal text-sm font-medium group-hover:underline"
                    data-testid="button-role-economist"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-alert-amber/50 transition-all cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-alert-amber/20 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-alert-amber" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Credit Officer</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    When a counterparty weakens, get more than a score. Get the causal path with provenance for audit.
                  </p>
                  <button
                    className="text-alert-amber text-sm font-medium group-hover:underline"
                    data-testid="button-role-credit-officer"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Snapshot */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Performance Promises</h2>
            <p className="text-muted-foreground">Real-time system performance metrics</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-background border border-muted rounded-lg p-6 text-center">
              <div className="font-mono text-3xl font-bold text-signal-teal mb-2" data-testid="text-traversal-time">8.3s</div>
              <div className="text-sm text-muted-foreground mb-1">Shock Path Speed</div>
              <div className="text-xs text-green-400">✓ Under 10 seconds</div>
            </Card>

            <Card className="bg-background border border-muted rounded-lg p-6 text-center">
              <div className="font-mono text-3xl font-bold text-electric-blue mb-2" data-testid="text-alert-time">1.8m</div>
              <div className="text-sm text-muted-foreground mb-1">Alert Speed</div>
              <div className="text-xs text-green-400">✓ Under 2 minutes</div>
            </Card>

            <Card className="bg-background border border-muted rounded-lg p-6 text-center">
              <div className="font-mono text-3xl font-bold text-provenance-purple mb-2" data-testid="text-calibration-ece">0.03</div>
              <div className="text-sm text-muted-foreground mb-1">Confidence Accuracy</div>
              <div className="text-xs text-green-400">✓ Under 0.05 error</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Build like DawsOS - Retail Kit Section */}
      <section className="py-20 bg-gradient-to-r from-graphite to-slate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-signal-teal/10 border border-signal-teal/20 text-signal-teal px-4 py-2 rounded-full text-sm font-medium mb-8">
              Retail Kit
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Build like DawsOS
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              The method we used to scale from idea to an enterprise-grade OS—now a simple kit for founders, operators, and creators.
            </p>
            
            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card/10 backdrop-blur-sm border border-muted/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-signal-teal/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-signal-teal" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Two clicks to evidence</h3>
                <p className="text-gray-400 text-sm">
                  Every prediction returns a causal path, its provenance, and a calibrated probability—as a build rule.
                </p>
              </div>
              
              <div className="bg-card/10 backdrop-blur-sm border border-muted/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-electric-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Governed schemas & versioned events</h3>
                <p className="text-gray-400 text-sm">
                  Event taxonomy, canonical envelopes, and patterns that create virtual edges without altering facts.
                </p>
              </div>
              
              <div className="bg-card/10 backdrop-blur-sm border border-muted/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-provenance-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-provenance-purple" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Calibrated outputs and replayable snapshots</h3>
                <p className="text-gray-400 text-sm">
                  Probabilities that meet strict error targets, with snapshots that let you replay any decision state exactly.
                </p>
              </div>
            </div>
            
            {/* What's Different */}
            <div className="bg-card/5 backdrop-blur-sm border border-muted/10 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">Why it's different</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Most "prompt packs" sell tricks. This is a governed operating model that ships evidence, calibration, and replay into your product from day one. From blank page to architecture draft—this weekend.
              </p>
            </div>
            
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="/pricing" 
                className="bg-signal-teal hover:bg-signal-teal/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                data-testid="button-explore-method"
              >
                Explore the Method
                <ArrowRight className="w-5 h-5 inline-block ml-2" />
              </a>
              <a 
                href="/products" 
                className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                data-testid="button-see-whats-inside"
              >
                See what's inside
              </a>
            </div>
            
            {/* 72-hour guarantee */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                <strong className="text-signal-teal">72-hour guarantee:</strong> If you don't generate a complete draft in 72 hours, we'll refund you—no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals and Demos */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
      
      <Dialog open={isCausalPathOpen} onOpenChange={setIsCausalPathOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Causal Path Analysis</DialogTitle>
          </DialogHeader>
          <CausalPathDemo />
        </DialogContent>
      </Dialog>
    </div>
  );
}