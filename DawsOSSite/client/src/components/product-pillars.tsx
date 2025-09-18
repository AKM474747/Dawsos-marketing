import { Card } from "@/components/ui/card";
import { Search, Gauge, FlaskConical, Settings, History } from "lucide-react";

export default function ProductPillars() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How Your Work Gets Better</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Stop guessing about market connections. Get clear answers with evidence your colleagues will trust.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Chain Inspector */}
          <Card className="bg-card border border-muted rounded-xl p-8 hover:border-signal-teal/30 transition-all">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-signal-teal/20 border border-signal-teal rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-signal-teal" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Never Miss What's Coming Next</h2>
                <p className="text-muted-foreground">Instead of reacting to surprises, see the chain of events before they hit your positions</p>
              </div>
            </div>

            {/* Value Demo */}
            <div className="bg-background border border-muted rounded-lg p-4 space-y-4">
              <div className="text-sm font-medium text-foreground">Before DawsOS:</div>
              <div className="pl-4 py-2 border-l-2 border-red-500/30 bg-red-500/5">
                <div className="text-sm text-muted-foreground">"Fed might hike rates... wonder what that means for our credit book?"</div>
                <div className="text-xs text-red-600 mt-1">→ Hours of research, unclear conclusions</div>
              </div>
              
              <div className="text-sm font-medium text-foreground">With DawsOS:</div>
              <div className="pl-4 py-2 border-l-2 border-signal-teal/30 bg-signal-teal/5">
                <div className="text-sm">Rate hike → Credit spreads widen → Your loan portfolios down 3.2% in 2 weeks</div>
                <div className="text-xs text-signal-teal mt-1">91% confidence with Fed studies as evidence</div>
              </div>

              <div className="text-center pt-2">
                <button 
                  className="bg-signal-teal/20 text-signal-teal px-4 py-2 rounded-lg text-sm font-medium hover:bg-signal-teal/30 transition-all evidence-glow"
                  data-testid="button-two-clicks-evidence"
                >
                  <Search className="w-4 h-4 inline mr-2" />
                  Show me the evidence →
                </button>
              </div>
            </div>
          </Card>

          {/* Risk Dashboard */}
          <Card className="bg-card border border-muted rounded-xl p-8 hover:border-electric-blue/30 transition-all">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-electric-blue/20 border border-electric-blue rounded-lg flex items-center justify-center">
                <Gauge className="w-6 h-6 text-electric-blue" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Trust Your Confidence Scores</h2>
                <p className="text-muted-foreground">Finally, predictions that mean what they say—so you can size positions with real confidence</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-foreground">Why This Matters for You:</div>
              
              <div className="flex items-start space-x-3 bg-background px-4 py-3 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium">Honest confidence scores</div>
                  <div className="text-xs text-muted-foreground">When we say 85%, it actually happens 85% of the time</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 bg-background px-4 py-3 rounded-lg">
                <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium">Better than guessing</div>
                  <div className="text-xs text-muted-foreground">12% improvement over "expert intuition" alone</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-background px-4 py-3 rounded-lg">
                <div className="w-2 h-2 bg-provenance-purple rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium">Stays accurate over time</div>
                  <div className="text-xs text-muted-foreground">Alerts you when market conditions change the patterns</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scenario Builder */}
          <Card className="bg-card border border-muted rounded-xl p-6 hover:border-provenance-purple/30 transition-all">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-provenance-purple/20 border border-provenance-purple rounded-lg flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-provenance-purple" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Test Your Decisions First</h3>
                <p className="text-sm text-muted-foreground">See how different moves play out before you commit capital</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">"What if we hedge now vs. wait 2 weeks?"</div>
              <div className="space-y-2">
                <div className="bg-background px-3 py-2 rounded text-xs">
                  <span className="text-green-400">Hedge now:</span> -2.1% portfolio impact
                </div>
                <div className="bg-background px-3 py-2 rounded text-xs">
                  <span className="text-red-400">Wait 2 weeks:</span> -8.7% if shock hits
                </div>
              </div>
              <button 
                className="w-full text-provenance-purple text-xs hover:underline mt-2"
                data-testid="button-view-replay-link"
              >
                Save this analysis →
              </button>
            </div>
          </Card>

          {/* Pattern Studio */}
          <Card className="bg-card border border-muted rounded-xl p-6 hover:border-alert-amber/30 transition-all">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-alert-amber/20 border border-alert-amber rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-alert-amber" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Add Your Own Patterns</h3>
                <p className="text-sm text-muted-foreground">Build company-specific insights that others can't see</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">Example: "When our biggest client cuts guidance..."</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-alert-amber rounded-full"></div>
                  <span className="text-xs">Draft pattern for testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                  <span className="text-xs">Team review & validation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Live in your workflows</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Provenance Popover */}
          <Card className="bg-card border border-muted rounded-xl p-6 hover:border-signal-teal/30 transition-all">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-signal-teal/20 border border-signal-teal rounded-lg flex items-center justify-center">
                <History className="w-5 h-5 text-signal-teal" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Defend Every Decision</h3>
                <p className="text-sm text-muted-foreground">Show your boss exactly where each number came from</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">"How did you know rates would impact us this way?"</div>
              <div className="space-y-2">
                <div className="snapshot-token px-3 py-2 rounded text-xs">
                  Fed research paper (2019)
                </div>
                <div className="snapshot-token px-3 py-2 rounded text-xs">
                  Historical rate data
                </div>
                <div className="snapshot-token px-3 py-2 rounded text-xs">
                  Your portfolio composition
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Overall Value Section */}
        <div className="mt-16 pt-12 border-t border-muted">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">The Bottom Line</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your work changes from reactive guesswork to proactive decision-making with evidence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-lg font-semibold">Without DawsOS</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-muted-foreground">"Something's happening in the market... let me dig around for a few hours"</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-muted-foreground">"I think this might affect us, but I'm not sure how much"</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-muted-foreground">"We made this decision 6 months ago... why did we do that again?"</div>
                </div>
              </div>
            </Card>

            <Card className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold">With DawsOS</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-muted-foreground">"Market shock detected → Here's the 3-step impact chain to your positions"</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-muted-foreground">"87% confidence this affects your tech names in 2 weeks"</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-muted-foreground">"Here's the analysis from 6 months ago, with all the evidence links"</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-foreground font-medium">
              Stop playing catch-up. Start seeing around corners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
