import { Card } from "@/components/ui/card";
import { University } from "lucide-react";

export default function Solutions() {
  return (
    <div className="pt-16">
      {/* Solutions Header */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Skip the Research</h1>
            <p className="text-muted-foreground text-lg">We've already mapped the connections that matter to your industry. Just plug in your data and go.</p>
          </div>

          {/* Banks Sector */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-signal-teal/20 border border-signal-teal rounded-xl flex items-center justify-center">
                <University className="w-8 h-8 text-signal-teal" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">For Banks & Financial Services</h2>
                <p className="text-muted-foreground">Stop being surprised by market moves. See what hits your profits before it happens.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-background border border-muted rounded-lg p-6 hover:border-signal-teal/50 transition-all">
                <h3 className="font-semibold mb-2">Rate Hike Early Warning</h3>
                <p className="text-sm text-muted-foreground mb-4">Know which of your loans get squeezed first when the Fed moves rates</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs bg-signal-teal/10 px-2 py-1 rounded">Example: Variable rate commercial loans hit within 30 days</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-signal-teal font-medium">94% accurate historically</span>
                  <button 
                    className="text-signal-teal text-xs hover:underline"
                    data-testid="button-evidence-interest-rate"
                  >
                    See the data →
                  </button>
                </div>
              </Card>

              <Card className="bg-background border border-muted rounded-lg p-6 hover:border-electric-blue/50 transition-all">
                <h3 className="font-semibold mb-2">Default Domino Effect</h3>
                <p className="text-sm text-muted-foreground mb-4">See which of your other customers get hurt when a major client defaults</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs bg-electric-blue/10 px-2 py-1 rounded">Example: Suppliers and partners in the same region</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-electric-blue font-medium">89% accurate historically</span>
                  <button 
                    className="text-electric-blue text-xs hover:underline"
                    data-testid="button-evidence-credit-default"
                  >
                    See the data →
                  </button>
                </div>
              </Card>

              <Card className="bg-background border border-muted rounded-lg p-6 hover:border-provenance-purple/50 transition-all">
                <h3 className="font-semibold mb-2">Liquidity Stress Test</h3>
                <p className="text-sm text-muted-foreground mb-4">Know which funding sources disappear first when markets turn volatile</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs bg-provenance-purple/10 px-2 py-1 rounded">Example: Short-term wholesale funding vs. deposit base</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-provenance-purple font-medium">91% accurate historically</span>
                  <button 
                    className="text-provenance-purple text-xs hover:underline"
                    data-testid="button-evidence-liquidity"
                  >
                    See the data →
                  </button>
                </div>
              </Card>

              <Card className="bg-background border border-muted rounded-lg p-6 hover:border-alert-amber/50 transition-all">
                <h3 className="font-semibold mb-2">Regulatory Impact Calculator</h3>
                <p className="text-sm text-muted-foreground mb-4">See what new banking rules really mean for your capital and operations</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs bg-alert-amber/10 px-2 py-1 rounded">Example: Basel changes → Your tier 1 capital requirements</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-alert-amber font-medium">87% accurate historically</span>
                  <button 
                    className="text-alert-amber text-xs hover:underline"
                    data-testid="button-evidence-regulatory"
                  >
                    See the data →
                  </button>
                </div>
              </Card>

              <Card className="bg-background border border-muted rounded-lg p-6 hover:border-signal-teal/50 transition-all">
                <h3 className="font-semibold mb-2">Housing Market Alert</h3>
                <p className="text-sm text-muted-foreground mb-4">Get early warning when housing bubbles threaten your mortgage portfolio</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs bg-signal-teal/10 px-2 py-1 rounded">Example: Price-to-income ratios → Default rates by region</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-signal-teal font-medium">82% accurate historically</span>
                  <button 
                    className="text-signal-teal text-xs hover:underline"
                    data-testid="button-evidence-real-estate"
                  >
                    See the data →
                  </button>
                </div>
              </Card>

              <Card className="bg-background border border-muted rounded-lg p-6 hover:border-electric-blue/50 transition-all">
                <h3 className="font-semibold mb-2">Cyber Risk Cascade</h3>
                <p className="text-sm text-muted-foreground mb-4">Understand the full cost when cyber incidents hit your operations</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs bg-electric-blue/10 px-2 py-1 rounded">Example: Data breach → Customer trust → Deposit outflows</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-electric-blue font-medium">76% accurate historically</span>
                  <button 
                    className="text-electric-blue text-xs hover:underline"
                    data-testid="button-evidence-cyber"
                  >
                    See the data →
                  </button>
                </div>
              </Card>
            </div>
          </div>

          {/* Value Connection */}
          <div className="mt-16 pt-12 border-t border-muted">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">How This Changes Your Day</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-red-600 mb-1">The Old Way</div>
                    <div className="text-sm text-muted-foreground">"Fed just hiked rates... let me spend the morning figuring out what this means for our loan book"</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-red-600 mb-1">Research Mode</div>
                    <div className="text-sm text-muted-foreground">"Let me pull up the last three rate cycles and see what happened to similar portfolios..."</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-red-600 mb-1">Guesswork</div>
                    <div className="text-sm text-muted-foreground">"Based on my experience, I think our commercial real estate loans might see some pressure..."</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-green-600 mb-1">With DawsOS</div>
                    <div className="text-sm text-muted-foreground">"Alert: Fed rate hike → Variable rate commercial loans will see 15% higher defaults in 30-45 days"</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-green-600 mb-1">Instant Evidence</div>
                    <div className="text-sm text-muted-foreground">"Based on 1995, 2004, and 2015 cycles. Here are the Fed papers and your portfolio data that support this"</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-green-600 mb-1">Clear Action</div>
                    <div className="text-sm text-muted-foreground">"Recommend immediate review of $45M in variable rate real estate loans. Here's the list to start with."</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 p-6 bg-card rounded-xl">
              <p className="text-foreground font-medium mb-2">
                Stop researching the same patterns over and over.
              </p>
              <p className="text-muted-foreground text-sm">
                Your industry's cause-and-effect relationships are already mapped, tested, and ready to use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
