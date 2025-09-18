import PerformanceDashboard from "@/components/performance-dashboard";
import { Card } from "@/components/ui/card";
import { Lock, Scale, History, CheckCircle } from "lucide-react";

export default function Trust() {
  return (
    <div className="pt-16">
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Security & Performance</h1>
            <p className="text-muted-foreground text-lg">Bank-grade security with guaranteed performance you can count on</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Security */}
            <Card className="bg-background border border-muted rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-signal-teal/20 border border-signal-teal rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-signal-teal" />
                </div>
                <h2 className="text-xl font-semibold">Your Data is Safe</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Bank-grade encryption everywhere</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Control who sees what, when</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Track every action for compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Only approved connections allowed</span>
                </div>
              </div>
            </Card>

            {/* Governance */}
            <Card className="bg-background border border-muted rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-electric-blue/20 border border-electric-blue rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-electric-blue" />
                </div>
                <h2 className="text-xl font-semibold">Built-in Controls</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Schema versioning controls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">No prediction without explanation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Pattern lifecycle management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Virtual edges only guardrails</span>
                </div>
              </div>
            </Card>

            {/* Reproducibility */}
            <Card className="bg-background border border-muted rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-provenance-purple/20 border border-provenance-purple rounded-lg flex items-center justify-center">
                  <History className="w-6 h-6 text-provenance-purple" />
                </div>
                <h2 className="text-xl font-semibold">Replay Anything</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Snapshot-exact replay</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Immutable audit trails</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Full provenance tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Deterministic replays</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Performance Dashboard */}
          <div className="mt-12">
            <PerformanceDashboard />
          </div>
        </div>
      </section>
    </div>
  );
}
