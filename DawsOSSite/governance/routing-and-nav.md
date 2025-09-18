# Routing and Navigation

## Routing Framework

**Framework**: Wouter (lightweight React router)
**Pattern**: File-based routing with centralized registration

## Route Registration

All routes must be registered in `client/src/App.tsx`:

```tsx
import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import Product from "@/pages/product";
// ... other imports

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/careers" component={Careers} />
      <Route path="/trust" component={Trust} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

## Page Component Structure

### File Organization
- All page components in `client/src/pages/`
- One component per file
- Default export with descriptive name

```tsx
// client/src/pages/pricing.tsx
export default function Pricing() {
  return (
    <div className="pt-16">
      {/* Page content */}
    </div>
  );
}
```

### Page Wrapper Pattern
All pages should include top padding for fixed navigation:
```tsx
<div className="pt-16"> {/* Accounts for fixed navigation */}
  {/* Page content */}
</div>
```

## Navigation Component

### Navigation Structure
- Fixed navigation at top of all pages
- Consistent hover states and active indicators
- Mobile-responsive design

### Required Test IDs
All navigation links must include data-testid:
```tsx
<Link href="/" data-testid="link-home">Home</Link>
<Link href="/product" data-testid="link-product">Product</Link>
<Link href="/solutions" data-testid="link-solutions">Solutions</Link>
<Link href="/pricing" data-testid="link-pricing">Pricing</Link>
<Link href="/about" data-testid="link-about">About</Link>
<Link href="/careers" data-testid="link-careers">Careers</Link>
<Link href="/trust" data-testid="link-trust">Trust</Link>
<Link href="/contact" data-testid="link-contact">Contact</Link>
```

### Active State Handling
Use wouter's `useLocation` hook for active states:
```tsx
import { useLocation } from "wouter";

function Navigation() {
  const [location] = useLocation();
  
  return (
    <Link 
      href="/pricing"
      className={`${location === "/pricing" ? "text-signal-teal" : "text-foreground"} hover:text-signal-teal`}
      data-testid="link-pricing"
    >
      Pricing
    </Link>
  );
}
```

## SEO Requirements

### Page Titles
Each page must have a unique, descriptive title:
```tsx
// In page component or layout
<title>Pricing - DawsOS | Causal Analysis Platform</title>
```

### Meta Descriptions
All pages must include meta descriptions:
```tsx
<meta 
  name="description" 
  content="Transparent pricing for DawsOS causal analysis platform. From rate hikes to rent defaults, trace every causal link with confidence." 
/>
```

### Open Graph Tags
Include Open Graph meta tags for social sharing:
```tsx
<meta property="og:title" content="Pricing - DawsOS" />
<meta property="og:description" content="Transparent pricing for DawsOS causal analysis platform." />
<meta property="og:type" content="website" />
```

## Layout Structure

### Global Layout
Consistent layout wrapper for all pages:
```tsx
function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          {/* Routes */}
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
```

### Section Structure
Consistent section patterns:
```tsx
<section className="py-16 bg-background">
  <div className="max-w-7xl mx-auto px-6">
    {/* Section content */}
  </div>
</section>
```

## Navigation Patterns

### Link Usage
- Use wouter's `Link` component for internal navigation
- Use regular `<a>` tags for external links
- Never use `window.location` or manual navigation

```tsx
// ✅ Correct
import { Link } from "wouter";
<Link href="/pricing">Pricing</Link>

// ✅ External links
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>

// ❌ Wrong
<a href="/pricing">Pricing</a> // Use Link instead
window.location.href = "/pricing"; // Never use this
```

## Footer Component

### Required Test IDs
All footer links must include data-testid:
```tsx
<Link href="/trust" data-testid="footer-link-trust">Trust</Link>
<Link href="/contact" data-testid="footer-link-contact">Contact</Link>
```

### Footer Structure
Consistent footer across all pages with:
- Company information
- Navigation links
- Social links (if applicable)
- Copyright information

## Accessibility Requirements

### Keyboard Navigation
- All navigation elements must be keyboard accessible
- Proper tab order throughout navigation
- Focus indicators on all interactive elements

### ARIA Labels
```tsx
<nav aria-label="Main navigation">
  {/* Navigation links */}
</nav>

<nav aria-label="Footer navigation">
  {/* Footer links */}
</nav>
```

### Skip Links
Include skip navigation for accessibility:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```