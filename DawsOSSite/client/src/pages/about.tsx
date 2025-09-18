import { Card } from "@/components/ui/card";
import { Users, Target, Shield, Zap, Globe, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About DawsOS</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              DawsOS is a modern operating layer for organizations—connecting data, decisions, and day-to-day execution so teams can move faster with confidence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground mb-6">
              We blend institutional-grade financial discipline with practical, on-the-ground operations to turn strategy into repeatable results.
            </p>
            <p className="text-muted-foreground">
              From the first workflow to your thousandth user, DawsOS gives you a single place to orchestrate processes, measure impact, and continuously improve—without adding complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          </div>

          <Card className="bg-card border border-muted rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-foreground leading-relaxed">
              We believe every organization deserves an "OS" that makes excellence the default: decisions grounded in data, governance built-in, and workflows that are simple for people to follow. DawsOS exists to bring the best of enterprise-level rigor to growing teams, so they can scale responsibly, serve their communities, and stay resilient through change. We're building tools that are transparent, interoperable, and human-centered—because great systems should feel effortless.
            </p>
          </Card>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Founders</h2>
            <p className="text-muted-foreground text-lg">
              Led by experienced finance and operations executives
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Michael Dawson */}
            <Card className="bg-background border border-muted rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-signal-teal/20 border border-signal-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-signal-teal" />
                </div>
                <h3 className="text-xl font-bold mb-2">Michael Dawson</h3>
                <p className="text-muted-foreground font-medium">Co-founder</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Michael is Chief Financial Officer at a growth-oriented pension fund where he led the organization through rapid scaling from 80 to 600 people, overseeing Finance, Strategy Execution, Technology, Risk and Audit functions. A technologist and philosopher at heart, he helped lead the development of in-house systems using the latest AI techniques—bringing two decades of experience where technology, risk and finance are in his core DNA.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Previously, he held senior roles at the world's largest asset manager and a leading professional services firm, and served as Treasurer and Director for the Adoption Council of Ontario. He is a CPA, CA and a CFA charterholder.
                </p>
              </div>
            </Card>

            {/* Andrew Murphy */}
            <Card className="bg-background border border-muted rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-electric-blue/20 border border-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-electric-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Andrew Murphy</h3>
                <p className="text-muted-foreground font-medium">Co-founder</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Andrew is an operator and finance leader focused on building durable, people-first organizations. He currently serves as Chief Operating Officer at WeatherLok Metal Roofing System.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Previously, he spent eight years at BMO in Corporate Finance, Senior/Upper Mid-Market analysis, and Business Banking. Andrew holds an MBA from Smith School of Business at Queen's University and is active in community initiatives and volunteer work.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground text-lg">
              Our core principles guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-signal-teal/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-signal-teal/20 border border-signal-teal rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-signal-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Rigor by default</h3>
                  <p className="text-sm text-muted-foreground">Financial discipline and clear governance, built into the product experience.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-electric-blue/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-electric-blue/20 border border-electric-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Practical first</h3>
                  <p className="text-sm text-muted-foreground">Tools should reduce steps, not add them.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-provenance-purple/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-provenance-purple/20 border border-provenance-purple rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-provenance-purple" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Human-centered</h3>
                  <p className="text-sm text-muted-foreground">Designed for real teams, not just PowerPoints.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-alert-amber/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-alert-amber/20 border border-alert-amber rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-alert-amber" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Open & interoperable</h3>
                  <p className="text-sm text-muted-foreground">Connect your data, don't silo it.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-muted rounded-xl p-6 hover:border-signal-teal/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-signal-teal/20 border border-signal-teal rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-signal-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Security from day one</h3>
                  <p className="text-sm text-muted-foreground">Trust is a feature, not an afterthought.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}