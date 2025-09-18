import { Card } from "@/components/ui/card";
import DemoModal from "@/components/demo-modal";
import { useState } from "react";

export default function Pricing() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="pt-16">
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Clear Pricing</h1>
            <p className="text-muted-foreground text-lg">Pay for what you use. No surprises. Enterprise-grade performance.</p>
          </div>

          <Card className="bg-card border border-muted rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">What You Pay For</h2>
            
            <div className="space-y-6">
              {/* Base Tenant */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h3 className="font-semibold">Platform Access</h3>
                  <p className="text-sm text-muted-foreground">Your secure workspace with all the tools and governance controls</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg font-bold" data-testid="text-base-tenant-price">$25,000</div>
                  <div className="text-sm text-muted-foreground">/month</div>
                </div>
              </div>

              {/* Seats */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h3 className="font-semibold">User Seats</h3>
                  <p className="text-sm text-muted-foreground">Each person who uses the platform (analysts, risk managers, economists)</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg font-bold" data-testid="text-user-seat-price">$500</div>
                  <div className="text-sm text-muted-foreground">/user/month</div>
                </div>
              </div>

              {/* Usage Meters */}
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-3">Pay as You Go</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Map a shock path</span>
                    <span className="font-mono text-sm" data-testid="text-traversal-price">$0.10 each</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Get predictions</span>
                    <span className="font-mono text-sm" data-testid="text-prediction-price">$0.50 each</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Save a replay</span>
                    <span className="font-mono text-sm" data-testid="text-snapshot-price">$2.00 each</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Check evidence</span>
                    <span className="font-mono text-sm" data-testid="text-evidence-price">$0.05 each</span>
                  </div>
                </div>
              </div>

              {/* Pattern Packs */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h3 className="font-semibold">Pattern Packs</h3>
                  <p className="text-sm text-muted-foreground">Banking, Energy, Semiconductors</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg font-bold" data-testid="text-pattern-pack-price">$5,000</div>
                  <div className="text-sm text-muted-foreground">/pack/month</div>
                </div>
              </div>

              {/* SLA Tiers */}
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-3">SLA Tiers</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Standard (95% under 10s)</span>
                    <span className="text-signal-teal text-sm">Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Premium (95% under 5s)</span>
                    <span className="font-mono text-sm" data-testid="text-premium-sla-price">+$10,000/month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mission Critical (95% under 2s)</span>
                    <span className="font-mono text-sm" data-testid="text-mission-critical-sla-price">+$25,000/month</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-signal-teal hover:bg-signal-teal/90 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all"
                data-testid="button-get-custom-quote"
              >
                Get Custom Quote
              </button>
            </div>
          </Card>
        </div>
      </section>

      <DemoModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
