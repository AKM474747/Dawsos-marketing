# UI Patterns and Design System

## Design System Foundation

### Core Libraries
- **shadcn/ui**: Primary component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

### Color System
Custom brand colors defined in `client/src/index.css`:
- `--graphite`: Primary dark background
- `--slate`: Secondary dark background  
- `--signal-teal`: Primary brand color
- `--electric-blue`: Secondary accent
- `--provenance-purple`: Tertiary accent
- `--alert-amber`: Warning/attention color
- `--risk-red`: Error/danger color

## Component Usage Standards

### Modal and Dialog Patterns
**Required**: Use shadcn/ui `Dialog` component for all modal interactions
**Forbidden**: `window.alert()`, `window.confirm()`, or custom modal implementations

```tsx
// ✅ Correct
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>

// ❌ Wrong
alert("Message"); // Never use browser alerts
```

### Button Patterns
Use shadcn/ui `Button` component with consistent variants:
- Primary actions: `bg-signal-teal hover:bg-signal-teal/90`
- Secondary actions: `border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white`
- Text buttons: `text-{color} hover:underline`

### Card Patterns
Use shadcn/ui `Card` component for content grouping:
```tsx
<Card className="bg-card border border-muted rounded-xl p-6">
  {/* Content */}
</Card>
```

## Data Test IDs

**Required**: Add `data-testid` to ALL interactive and meaningful elements

### Naming Convention
- Interactive elements: `{action}-{target}` (e.g., `button-submit`, `input-email`)
- Display elements: `{type}-{content}` (e.g., `text-username`, `status-payment`)
- Dynamic elements: `{type}-{description}-{id}` (e.g., `card-product-${productId}`)

### Examples
```tsx
// Buttons
<button data-testid="button-book-demo">Book Demo</button>
<button data-testid="button-open-causal-path">See Path</button>

// Inputs
<input data-testid="input-email" />
<select data-testid="select-role" />

// Navigation
<Link data-testid="link-home">Home</Link>
<Link data-testid="link-pricing">Pricing</Link>

// Content
<div data-testid="text-username">{username}</div>
<div data-testid="status-loading">Loading...</div>
```

## Component File Organization

### Minimize Files
Collapse similar components into single files when possible:
```tsx
// ✅ Good: Multiple related components in one file
export function PricingCard() { /* */ }
export function PricingTier() { /* */ }
export function PricingFeature() { /* */ }

// ❌ Avoid: Separate files for tightly coupled components
```

### Import Patterns
Use consistent import patterns:
```tsx
// shadcn/ui components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icons
import { ArrowRight, Shield } from "lucide-react";

// Assets (when needed)
import logoPath from "@assets/logo.png";
```

## Unused Component Cleanup

Regularly audit and remove unused shadcn/ui components to reduce bundle size and cognitive load:

1. Review `package.json` for unused @radix-ui packages
2. Check `components/ui/` folder for unused components
3. Remove imports and files that aren't referenced
4. Update this document when removing/adding components

## Dark Mode Implementation

**Required**: Use explicit light/dark variants for ALL visual properties:
```tsx
// ✅ Correct
className="bg-white dark:bg-black text-black dark:text-white"

// ❌ Wrong
className="bg-white text-black" // Missing dark mode variants
```

## Accessibility Requirements

- All interactive elements must be keyboard accessible
- Proper ARIA labels for complex components
- Color contrast ratios must meet WCAG AA standards
- Focus indicators must be visible and consistent