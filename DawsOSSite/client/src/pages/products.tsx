import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Video, Users, Zap, ArrowRight, Package } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  type: string;
  tier: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
};

export default function Products() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  useEffect(() => {
    document.title = "Build like DawsOS - Method Kits | DawsOS";
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-signal-teal border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Error Loading Products</h2>
          <p className="text-muted-foreground">Unable to load product information. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Sort products by price (starter -> pro -> bundle)
  const sortedProducts = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  const handlePurchase = (product: Product) => {
    // For now, just log - will implement checkout flow later
    console.log("Purchase:", product);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "starter": return <Package className="w-5 h-5" />;
      case "pro": return <Zap className="w-5 h-5" />;
      case "bundle": return <Users className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "starter": return "bg-signal-teal/10 text-signal-teal border-signal-teal/20";
      case "pro": return "bg-electric-blue/10 text-electric-blue border-electric-blue/20";
      case "bundle": return "bg-provenance-purple/10 text-provenance-purple border-provenance-purple/20";
      default: return "bg-signal-teal/10 text-signal-teal border-signal-teal/20";
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-graphite to-slate">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-signal-teal/10 border border-signal-teal/20 text-signal-teal px-4 py-2 rounded-full text-sm font-medium mb-8">
            Method Kits
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            From idea to software architecture—this weekend.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A ZIP with prompts, templates, governance checklists, agent workflows, and n8n automations. Built from the method behind DawsOS.
          </p>
          
          {/* Key differentiator */}
          <div className="bg-card/10 backdrop-blur-sm border border-muted/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-2">Why it's different</h3>
            <p className="text-gray-300">
              Most "prompt packs" sell tricks. This is a governed operating model that ships evidence, calibration, and replay into your product from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <Card 
                key={product.id} 
                className={`relative bg-background border-2 rounded-2xl p-8 transition-all hover:shadow-lg ${
                  product.tier === "pro" 
                    ? "border-electric-blue/50 scale-105" 
                    : "border-muted hover:border-muted/50"
                }`}
              >
                {product.tier === "pro" && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-electric-blue text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${getTierColor(product.tier)} mb-4`}>
                    {getTierIcon(product.tier)}
                    <span className="font-medium capitalize">{product.tier}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{product.name.replace("Build like DawsOS - ", "")}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${product.price}</span>
                    <span className="text-muted-foreground ml-1">
                      {product.tier === "bundle" ? "" : " one-time"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-signal-teal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handlePurchase(product)}
                  className={`w-full py-3 font-semibold transition-all ${
                    product.tier === "pro"
                      ? "bg-electric-blue hover:bg-electric-blue/90 text-white"
                      : product.tier === "bundle"
                      ? "bg-provenance-purple hover:bg-provenance-purple/90 text-white"
                      : "bg-signal-teal hover:bg-signal-teal/90 text-white"
                  }`}
                  data-testid={`button-purchase-${product.tier}`}
                >
                  Download Kit
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
          
          {/* 72-hour guarantee */}
          <div className="text-center mt-12">
            <div className="bg-signal-teal/5 border border-signal-teal/20 rounded-xl p-6 max-w-2xl mx-auto">
              <h4 className="font-semibold text-signal-teal mb-2">72-Hour Guarantee</h4>
              <p className="text-sm text-muted-foreground">
                If you don't generate a complete draft in 72 hours, we'll refund you—no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's Inside</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each kit contains everything you need to implement the DawsOS method in your own projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-signal-teal/20 border border-signal-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-signal-teal" />
              </div>
              <h3 className="font-semibold mb-2">Operating Constitution Templates</h3>
              <p className="text-sm text-muted-foreground">Product, governance, security, change control templates</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-electric-blue/20 border border-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-electric-blue" />
              </div>
              <h3 className="font-semibold mb-2">Event Taxonomy & Predicate Catalogs</h3>
              <p className="text-sm text-muted-foreground">Versioned topics, typed edges, lags, validity windows</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-provenance-purple/20 border border-provenance-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-provenance-purple" />
              </div>
              <h3 className="font-semibold mb-2">Agent Workflows (n8n)</h3>
              <p className="text-sm text-muted-foreground">Sale→fulfillment, KPI watchdog, content factory, affiliate engine</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-alert-amber/20 border border-alert-amber rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-alert-amber" />
              </div>
              <h3 className="font-semibold mb-2">72-Hour Quickstart</h3>
              <p className="text-sm text-muted-foreground">A checklist to ship a real draft by Monday</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}