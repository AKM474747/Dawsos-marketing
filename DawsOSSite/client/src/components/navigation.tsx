import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import DemoModal from "./demo-modal";
import { ThemeToggle } from "./theme-toggle";
import dawsOSLogo from "@assets/DawsOS Icon_1758107642436.png";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Product" },
    { href: "/solutions", label: "Solutions" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/trust", label: "Security" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    return location === href || (href === "/" && location === "/");
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-graphite/95 backdrop-blur-sm border-b border-muted z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
              <div className="w-8 h-8">
                <img src={dawsOSLogo} alt="DawsOS" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-xl font-semibold text-white">DawsOS</span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-signal-teal hover:bg-signal-teal/90 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
                data-testid="button-book-demo-nav"
              >
                Book a Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-muted">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-white bg-muted"
                        : "text-muted-foreground hover:text-white hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <DemoModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}
