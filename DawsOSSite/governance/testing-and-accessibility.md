# Testing and Accessibility

## Data Test ID Standards

### Required Test IDs
**Mandatory**: Add `data-testid` to ALL interactive and meaningful elements

### Naming Conventions

#### Interactive Elements
Pattern: `{action}-{target}`
```tsx
// Buttons
<button data-testid="button-submit">Submit</button>
<button data-testid="button-cancel">Cancel</button>
<button data-testid="button-book-demo">Book Demo</button>
<button data-testid="button-open-causal-path">See Path</button>

// Form inputs
<input data-testid="input-email" />
<input data-testid="input-password" />
<select data-testid="select-role" />
<textarea data-testid="textarea-message" />

// Links
<Link data-testid="link-home">Home</Link>
<Link data-testid="link-pricing">Pricing</Link>
<a data-testid="link-external-docs">Documentation</a>
```

#### Display Elements
Pattern: `{type}-{content}`
```tsx
// Status and content
<div data-testid="text-username">{username}</div>
<div data-testid="status-loading">Loading...</div>
<div data-testid="error-validation">Invalid email</div>
<img data-testid="img-avatar" src={avatarUrl} />

// Performance metrics
<div data-testid="text-traversal-time">8.3s</div>
<div data-testid="text-alert-time">1.8m</div>
<div data-testid="text-calibration-ece">0.03</div>
```

#### Dynamic Elements
Pattern: `{type}-{description}-{id}`
```tsx
// Lists and repeated components
<Card data-testid={`card-product-${productId}`}>
<div data-testid={`row-user-${index}`}>
<button data-testid={`button-delete-${itemId}`}>
```

#### Navigation Elements
```tsx
// Main navigation
<Link data-testid="link-home" href="/">Home</Link>
<Link data-testid="link-product" href="/product">Product</Link>

// Footer navigation
<Link data-testid="footer-link-trust" href="/trust">Trust</Link>
<Link data-testid="footer-link-contact" href="/contact">Contact</Link>
```

## Accessibility Requirements

### Keyboard Navigation
**Required**: All interactive elements must be keyboard accessible

#### Focus Management
```tsx
// Proper focus indicators
className="focus:ring-2 focus:ring-signal-teal focus:ring-offset-2 focus:ring-offset-background"

// Skip links for main content
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50"
  data-testid="skip-to-content"
>
  Skip to main content
</a>
```

#### Tab Order
Ensure logical tab order through interactive elements:
1. Skip links
2. Main navigation
3. Page content (forms, buttons, links)
4. Footer navigation

### ARIA Labels and Roles

#### Navigation
```tsx
<nav aria-label="Main navigation" role="navigation">
  {/* Navigation items */}
</nav>

<nav aria-label="Footer navigation" role="contentinfo">
  {/* Footer items */}
</nav>
```

#### Interactive Elements
```tsx
// Buttons with descriptive labels
<button 
  aria-label="Toggle dark mode"
  data-testid="button-theme-toggle"
>
  <Moon className="h-5 w-5" />
</button>

// Form inputs with proper labels
<label htmlFor="email">Email Address</label>
<input 
  id="email"
  aria-describedby="email-error"
  data-testid="input-email"
/>
<div id="email-error" role="alert">
  {error && <span data-testid="error-email">{error}</span>}
</div>
```

#### Modal and Dialog Accessibility
```tsx
// Dialog with proper ARIA
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent aria-labelledby="dialog-title" aria-describedby="dialog-description">
    <DialogHeader>
      <DialogTitle id="dialog-title">Dialog Title</DialogTitle>
      <DialogDescription id="dialog-description">
        Dialog description for screen readers
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Color and Contrast

#### WCAG AA Compliance
- Text contrast ratio: minimum 4.5:1
- Large text contrast ratio: minimum 3:1
- Interactive element contrast: minimum 3:1

#### Color Independence
Don't rely solely on color to convey information:
```tsx
// ✅ Good: Color + icon + text
<div className="text-green-600 dark:text-green-400">
  <CheckIcon className="w-4 h-4 inline mr-1" />
  Success: Operation completed
</div>

// ❌ Bad: Color only
<div className="text-green-600">Operation completed</div>
```

### Screen Reader Support

#### Semantic HTML
Use proper HTML elements:
```tsx
// ✅ Good: Semantic elements
<main>
  <section>
    <h2>Section Title</h2>
    <article>Content</article>
  </section>
</main>

// ❌ Bad: Generic divs
<div>
  <div>Section Title</div>
  <div>Content</div>
</div>
```

#### Hidden Content for Screen Readers
```tsx
<span className="sr-only">
  Screen reader only content
</span>

<span aria-hidden="true">
  Content hidden from screen readers
</span>
```

## Testing Patterns

### E2E Testing Guidelines
Use Playwright for end-to-end testing with consistent patterns:

```typescript
// Navigation testing
await page.click('[data-testid="link-pricing"]');
await expect(page).toHaveURL('/pricing');

// Form interaction testing
await page.fill('[data-testid="input-email"]', 'test@example.com');
await page.selectOption('[data-testid="select-role"]', 'developer');
await page.click('[data-testid="button-submit"]');

// Modal testing
await page.click('[data-testid="button-book-demo"]');
await expect(page.locator('[data-testid="modal-demo"]')).toBeVisible();
```

### Accessibility Testing
Include a11y checks in test suite:

```typescript
// Keyboard navigation test
await page.keyboard.press('Tab');
await expect(page.locator('[data-testid="link-home"]')).toBeFocused();

// Screen reader content test
await expect(page.locator('.sr-only')).toContainText('Skip to main content');

// Color contrast validation
// Use automated tools like axe-playwright
```

### Loading State Testing
```typescript
// Loading indicators
await expect(page.locator('[data-testid="status-loading"]')).toBeVisible();
await expect(page.locator('[data-testid="status-loading"]')).toBeHidden();

// Button loading states
await page.click('[data-testid="button-submit"]');
await expect(page.locator('[data-testid="button-submit"]')).toContainText('Submitting...');
```

## Form Accessibility

### Label Association
```tsx
// Explicit labels
<label htmlFor="email-input">Email Address</label>
<input id="email-input" data-testid="input-email" />

// Or with implicit labels
<label>
  Email Address
  <input data-testid="input-email" />
</label>
```

### Error Handling
```tsx
<input 
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
  data-testid="input-email"
/>
{hasError && (
  <div id="email-error" role="alert" data-testid="error-email">
    Please enter a valid email address
  </div>
)}
```

### Required Fields
```tsx
<label htmlFor="email">
  Email Address <span aria-label="required">*</span>
</label>
<input 
  id="email"
  required
  aria-required="true"
  data-testid="input-email"
/>
```

## Performance Testing

### Core Web Vitals
Monitor and test for:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

### Loading Performance
```typescript
// Test performance metrics
const performanceMetrics = await page.evaluate(() => ({
  traversalTime: document.querySelector('[data-testid="text-traversal-time"]')?.textContent,
  alertTime: document.querySelector('[data-testid="text-alert-time"]')?.textContent,
  calibrationEce: document.querySelector('[data-testid="text-calibration-ece"]')?.textContent,
}));

expect(performanceMetrics.traversalTime).toBe('8.3s');
```

## Test Organization

### Test File Structure
```
tests/
├── e2e/
│   ├── navigation.spec.ts
│   ├── forms.spec.ts
│   ├── accessibility.spec.ts
│   └── performance.spec.ts
├── unit/
│   ├── components/
│   └── utils/
└── integration/
    ├── api/
    └── database/
```

### Test Naming
Use descriptive test names that include user actions:
```typescript
test('should open demo modal when clicking book demo button');
test('should navigate to pricing page when clicking pricing link');
test('should submit contact form with valid data');
test('should show validation error for invalid email format');
```