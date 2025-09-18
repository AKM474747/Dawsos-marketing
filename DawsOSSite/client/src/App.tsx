import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Product from "@/pages/product";
import Products from "@/pages/products";
import Solutions from "@/pages/solutions";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Careers from "@/pages/careers";
import Trust from "@/pages/trust";
import Contact from "@/pages/contact";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product" component={Product} />
          <Route path="/products" component={Products} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
          <Route path="/careers" component={Careers} />
          <Route path="/trust" component={Trust} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Default title - individual pages can override
    document.title = "DawsOS - Decision Analytics & Warning System";
    
    // Default meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Advanced decision analytics and early warning system for financial risk management, policy analysis, and strategic planning.';
      document.head.appendChild(meta);
    }
    
    // Open Graph tags
    const addOpenGraphTag = (property: string, content: string) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (!existing) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };
    
    addOpenGraphTag('og:title', 'DawsOS - Decision Analytics & Warning System');
    addOpenGraphTag('og:description', 'Advanced decision analytics and early warning system for financial risk management, policy analysis, and strategic planning.');
    addOpenGraphTag('og:type', 'website');
    addOpenGraphTag('og:site_name', 'DawsOS');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
