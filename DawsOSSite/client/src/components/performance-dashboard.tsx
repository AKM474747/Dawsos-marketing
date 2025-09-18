import { Card } from "@/components/ui/card";

export default function PerformanceDashboard() {
  return (
    <Card className="bg-background border border-muted rounded-xl p-8">
      <h3 className="text-xl font-semibold mb-6 text-center">Performance Promises</h3>
      <p className="text-muted-foreground text-center mb-8">These are our guarantees to you. If we don't meet them, something needs fixing.</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center space-y-3">
          <div className="font-mono text-2xl font-bold text-signal-teal mb-1" data-testid="text-uptime-percentage">99.97%</div>
          <div className="text-sm font-medium mb-1">System Available</div>
          <div className="text-xs text-muted-foreground mb-2">Promise: 99.9% uptime</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-signal-teal h-2 rounded-full" style={{ width: "99.97%" }}></div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="font-mono text-2xl font-bold text-electric-blue mb-1" data-testid="text-traversal-p95">8.3s</div>
          <div className="text-sm font-medium mb-1">Shock Path Speed</div>
          <div className="text-xs text-muted-foreground mb-2">Promise: Under 10s, 95% of time</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-electric-blue h-2 rounded-full" style={{ width: "83%" }}></div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="font-mono text-2xl font-bold text-provenance-purple mb-1" data-testid="text-alert-e2e">1.8m</div>
          <div className="text-sm font-medium mb-1">Alert Speed</div>
          <div className="text-xs text-muted-foreground mb-2">Promise: Notify you within 2 min</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-provenance-purple h-2 rounded-full" style={{ width: "90%" }}></div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="font-mono text-2xl font-bold text-green-400 mb-1" data-testid="text-ece-score">0.03</div>
          <div className="text-sm font-medium mb-1">Confidence Accuracy</div>
          <div className="text-xs text-muted-foreground mb-2">Promise: Stay below 0.05 error</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: "94%" }}></div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <span className="text-sm text-green-400 font-medium">✓ All promises kept</span>
        <p className="text-xs text-muted-foreground mt-2">Mission-critical performance you can count on</p>
      </div>

      {/* Detailed Explanations */}
      <div className="mt-8 grid md:grid-cols-2 gap-6 pt-8 border-t border-muted">
        <div>
          <h4 className="font-semibold mb-2 text-electric-blue">Shock Path Speed</h4>
          <p className="text-sm text-muted-foreground mb-2">
            When you ask "show me how this shock spreads," how long does it take to map the full path?
          </p>
          <p className="text-xs text-muted-foreground">
            You need answers fast when markets are moving. No one wants to wait 30 seconds to see if their portfolio is about to get hit.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2 text-provenance-purple">Alert Speed</h4>
          <p className="text-sm text-muted-foreground mb-2">
            From the moment a new shock happens until you get notified about potential impacts to your positions.
          </p>
          <p className="text-xs text-muted-foreground">
            In fast-moving markets, being 5 minutes late with a critical alert could cost millions. This guarantees you're always in the first wave.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-green-400">Confidence Accuracy</h4>
          <p className="text-sm text-muted-foreground mb-2">
            How honest the confidence scores are. If DawsOS says "90% confident," is it right 90% of the time?
          </p>
          <p className="text-xs text-muted-foreground">
            If the system says "85% chance this bank gets hit next," you need to trust that number for position sizing and risk decisions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-signal-teal">System Available</h4>
          <p className="text-sm text-muted-foreground mb-2">
            The percentage of time DawsOS is running and ready when you need it.
          </p>
          <p className="text-xs text-muted-foreground">
            When markets are in crisis, the platform needs to be there. This measures our reliability promise to you.
          </p>
        </div>
      </div>
    </Card>
  );
}
