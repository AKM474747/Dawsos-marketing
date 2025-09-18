import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertDemoRequestSchema, type InsertDemoRequest } from "@shared/schema";
import { z } from "zod";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<InsertDemoRequest>>({
    name: "",
    email: "",
    company: "",
    role: "",
    sector: "",
    urgency: "",
    sloRequirements: "",
    useCase: "",
    newsletter: false,
  });

  const createDemoRequest = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      return await apiRequest("POST", "/api/demo-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted",
        description: "Our team will contact you within 24 hours.",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        sector: "",
        urgency: "",
        sloRequirements: "",
        useCase: "",
        newsletter: false,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertDemoRequestSchema.parse(formData);
      await createDemoRequest.mutateAsync(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: "Please check all required fields.",
          variant: "destructive",
        });
      }
    }
  };

  const updateField = (field: keyof InsertDemoRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-16">
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Ready to See DawsOS in Action?</h1>
            <p className="text-muted-foreground text-lg">Book a personalized demo tailored to your role and sector</p>
          </div>

          <Card className="bg-card border border-muted rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name || ""}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="bg-background border-muted text-foreground placeholder-muted-foreground focus:border-signal-teal"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email || ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="bg-background border-muted text-foreground placeholder-muted-foreground focus:border-signal-teal"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company || ""}
                    onChange={(e) => updateField("company", e.target.value)}
                    className="bg-background border-muted text-foreground placeholder-muted-foreground focus:border-signal-teal"
                    required
                    data-testid="input-company"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={formData.role || ""} onValueChange={(value) => updateField("role", value)} required>
                    <SelectTrigger className="bg-background border-muted text-foreground focus:border-signal-teal" data-testid="select-role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="risk-manager">Risk Manager</SelectItem>
                      <SelectItem value="portfolio-analyst">Portfolio Analyst</SelectItem>
                      <SelectItem value="policy-analyst">Policy Analyst</SelectItem>
                      <SelectItem value="economist">Economist/Strategist</SelectItem>
                      <SelectItem value="credit-officer">Credit Officer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select value={formData.sector || ""} onValueChange={(value) => updateField("sector", value)}>
                    <SelectTrigger className="bg-background border-muted text-foreground focus:border-signal-teal" data-testid="select-sector">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="semiconductors">Semiconductors</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="government">Government/Policy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select value={formData.urgency || ""} onValueChange={(value) => updateField("urgency", value)}>
                    <SelectTrigger className="bg-background border-muted text-foreground focus:border-signal-teal" data-testid="select-urgency">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (within 1 week)</SelectItem>
                      <SelectItem value="soon">Soon (within 1 month)</SelectItem>
                      <SelectItem value="exploring">Exploring (3+ months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sloRequirements">SLO Requirements</Label>
                <Textarea
                  id="sloRequirements"
                  placeholder="Describe your performance, calibration, or explainability requirements..."
                  value={formData.sloRequirements || ""}
                  onChange={(e) => updateField("sloRequirements", e.target.value)}
                  className="bg-background border-muted text-foreground placeholder-muted-foreground focus:border-signal-teal"
                  rows={3}
                  data-testid="textarea-slo-requirements"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Use Case</Label>
                <Textarea
                  id="useCase"
                  placeholder="Describe the risk scenarios you'd like to explore..."
                  value={formData.useCase || ""}
                  onChange={(e) => updateField("useCase", e.target.value)}
                  className="bg-background border-muted text-foreground placeholder-muted-foreground focus:border-signal-teal"
                  rows={4}
                  data-testid="textarea-use-case"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => updateField("newsletter", !!checked)}
                  className="border-muted data-[state=checked]:bg-signal-teal data-[state=checked]:border-signal-teal"
                  data-testid="checkbox-newsletter"
                />
                <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
                  Subscribe to product updates and risk analysis insights
                </Label>
              </div>

              <div className="text-center">
                <Button 
                  type="submit"
                  disabled={createDemoRequest.isPending}
                  className="bg-signal-teal hover:bg-signal-teal/90 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                  data-testid="button-book-demo"
                >
                  {createDemoRequest.isPending ? "Submitting..." : "Book Demo"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
