import { Link } from "wouter";
import dawsOSLogo from "@assets/DawsOS Icon_1758107642436.png";

export default function Footer() {
  return (
    <footer className="py-12 bg-graphite border-t border-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8">
                <img src={dawsOSLogo} alt="DawsOS" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-xl font-semibold text-white">DawsOS</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Shows how shocks travel through markets—always with evidence you can share.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <Link 
                href="/product"
                className="block text-sm text-muted-foreground hover:text-white transition-colors"
                data-testid="footer-link-chain-inspector"
              >
                Chain Inspector
              </Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Risk Dashboard
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Scenario Builder
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Pattern Studio
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <div className="space-y-2">
              <Link 
                href="/solutions"
                className="block text-sm text-muted-foreground hover:text-white transition-colors"
                data-testid="footer-link-banks"
              >
                Banks
              </Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Energy
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Semiconductors
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Enterprise
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Careers
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Blog
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">
                Documentation
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2024 DawsOS. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
