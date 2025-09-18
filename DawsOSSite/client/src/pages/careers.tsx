
import { Card } from "@/components/ui/card";
import { Bot, Users, Shield, Code, Zap, ArrowRight } from "lucide-react";

export default function Careers() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Careers at <span className="text-signal-teal">DawsOS</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Building the future of work where AI agents and human experts collaborate seamlessly
            </p>
          </div>
        </div>
      </section>

      {/* Agent-First Architecture */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Agent-First Job Architecture</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              At DawsOS, we are building an agent-first job architecture: every project and workflow is powered by a mesh of specialized AI agents working side by side with human experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-background border border-muted rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-signal-teal/20 border border-signal-teal rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-signal-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Claude Code Agents</h3>
                  <p className="text-muted-foreground">
                    Handle implementation tasks — writing, testing, and refactoring code with precision and consistency.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-background border border-muted rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-electric-blue/20 border border-electric-blue rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Business Process Agents</h3>
                  <p className="text-muted-foreground">
                    Powered by n8n, these agents automate operations, customer onboarding, billing, and incident runbooks.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-background border border-muted rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-provenance-purple/20 border border-provenance-purple rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-provenance-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">GitHub Copilot Integration</h3>
                  <p className="text-muted-foreground">
                    Translates product and project plans into executable tasks, bridging strategy and implementation.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-background border border-muted rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-alert-amber/20 border border-alert-amber rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-alert-amber" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">ChatGPT Governance Agents</h3>
                  <p className="text-muted-foreground">
                    Provide oversight, policy guidance, and explainability for every change across the system.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Roles in an Agent-First World</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              In this model, "roles" are no longer only job titles — they're composable jobs where humans and agents share responsibilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="space-y-6">
              <Card className="bg-card border border-muted rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-signal-teal/20 border border-signal-teal rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-signal-teal" />
                  </div>
                  <h3 className="font-semibold text-lg">Engineering Agents</h3>
                </div>
                <p className="text-muted-foreground">
                  Handle pull requests, test scaffolding, migrations, and release rollouts with automated precision.
                </p>
              </Card>

              <Card className="bg-card border border-muted rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-electric-blue/20 border border-electric-blue rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-electric-blue" />
                  </div>
                  <h3 className="font-semibold text-lg">Operations Agents</h3>
                </div>
                <p className="text-muted-foreground">
                  Run financial reconciliations, manage feature flag rollouts, and execute incident workflows.
                </p>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-card border border-muted rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-alert-amber/20 border border-alert-amber rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-alert-amber" />
                  </div>
                  <h3 className="font-semibold text-lg">Governance Agents</h3>
                </div>
                <p className="text-muted-foreground">
                  Ensure security, compliance, and policy adherence before any change goes live.
                </p>
              </Card>

              <Card className="bg-card border border-muted rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-provenance-purple/20 border border-provenance-purple rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-provenance-purple" />
                  </div>
                  <h3 className="font-semibold text-lg">Human Specialists</h3>
                </div>
                <p className="text-muted-foreground">
                  Guide strategy, validate critical decisions, and design new workflows that agents execute.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Soon */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="bg-background border border-muted rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-signal-teal/20 border border-signal-teal rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="w-8 h-8 text-signal-teal" />
            </div>
            
            <h2 className="text-3xl font-bold mb-6">Join Us Soon</h2>
            
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <p className="text-muted-foreground leading-relaxed">
                We are ramping up the business and expanding our team. Career opportunities will soon be published here — spanning engineering, operations, product, governance, and agent-ops design.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Stay tuned: we'll be posting open roles and more detailed information about how you can help shape the future of agent-first operations at DawsOS.
              </p>
            </div>

            <div className="mt-8">
              <button 
                className="bg-signal-teal hover:bg-signal-teal/90 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                data-testid="button-notify-careers"
              >
                Get Notified About Opportunities
              </button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
