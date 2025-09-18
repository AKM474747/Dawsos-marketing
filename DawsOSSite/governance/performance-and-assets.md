# Performance and Assets

## Performance Standards

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds  
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Contentful Paint (FCP)**: < 1.8 seconds

### Bundle Size Management

#### Code Splitting Thresholds
- Individual component chunks: < 50KB gzipped
- Route-based chunks: < 200KB gzipped
- Vendor chunks: < 500KB gzipped
- Total initial bundle: < 250KB gzipped

#### Lazy Loading Implementation
```tsx
// Route-based code splitting
import { lazy, Suspense } from "react";

const Pricing = lazy(() => import("@/pages/pricing"));
const About = lazy(() => import("@/pages/about"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/pricing" component={Pricing} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  );
}
```

#### Component Lazy Loading
```tsx
// Heavy component lazy loading
const CausalPathDemo = lazy(() => import("@/components/causal-path-demo"));

function HomePage() {
  return (
    <div>
      {showDemo && (
        <Suspense fallback={<div>Loading demo...</div>}>
          <CausalPathDemo />
        </Suspense>
      )}
    </div>
  );
}
```

## Asset Management

### Image Optimization

#### Image Guidelines
- **Format**: WebP with JPEG fallback
- **Compression**: 80-85% quality for photos, lossless for graphics
- **Responsive**: Multiple sizes using srcset
- **Lazy Loading**: Below-the-fold images only

#### Implementation Pattern
```tsx
// Responsive image with lazy loading
<img
  src={imagePath}
  srcSet={`
    ${imagePathSmall} 480w,
    ${imagePathMedium} 768w,
    ${imagePathLarge} 1200w
  `}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Descriptive alt text"
  loading="lazy"
  data-testid="img-hero-illustration"
/>
```

#### Asset Import Pattern
```tsx
// Static asset imports with Vite
import heroImage from "@assets/hero-illustration.webp";
import heroImageFallback from "@assets/hero-illustration.jpg";

// Dynamic asset loading
const loadImage = async (imageName: string) => {
  const module = await import(`@assets/${imageName}.webp`);
  return module.default;
};
```

### Font Optimization

#### Font Loading Strategy
```css
/* client/src/index.css */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Ensure text remains visible during font load */
  src: url('@assets/fonts/inter-regular.woff2') format('woff2');
}

/* Preload critical fonts */
<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
```

#### Variable Font Usage
```css
/* Use variable fonts for better performance */
:root {
  --font-sans: 'Inter Variable', ui-sans-serif, system-ui;
  --font-mono: 'JetBrains Mono Variable', ui-monospace;
}
```

## React Performance

### Component Optimization

#### Memoization Patterns
```tsx
import { memo, useMemo, useCallback } from "react";

// Memoize expensive components
const ExpensiveComponent = memo(function ExpensiveComponent({ data, onUpdate }) {
  const processedData = useMemo(() => {
    return heavyComputation(data);
  }, [data]);

  const handleClick = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);

  return <div>{/* Component content */}</div>;
});

// Memoize context values
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  
  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme(t => t === "light" ? "dark" : "light")
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

#### Virtual Scrolling for Large Lists
```tsx
// For lists with > 100 items
import { FixedSizeList as List } from "react-window";

function LargeList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style} data-testid={`list-item-${index}`}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

### State Management Performance

#### React Query Optimization
```tsx
// Optimized query configuration
const { data, isLoading } = useQuery({
  queryKey: ["/api/contact-messages"],
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
  retry: (failureCount, error) => {
    if (error.status === 404) return false;
    return failureCount < 3;
  },
});

// Optimistic updates for better UX
const mutation = useMutation({
  mutationFn: updateContactMessage,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ["/api/contact-messages"] });
    
    // Snapshot previous value
    const previousData = queryClient.getQueryData(["/api/contact-messages"]);
    
    // Optimistically update
    queryClient.setQueryData(["/api/contact-messages"], old => 
      old ? [...old, { ...newData, id: "temp-id" }] : [newData]
    );
    
    return { previousData };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(["/api/contact-messages"], context.previousData);
  },
  onSettled: () => {
    // Refetch after mutation
    queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
  },
});
```

## CSS Performance

### Tailwind Optimization

#### Purge Configuration
```typescript
// tailwind.config.ts
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,jsx,ts,tsx}",
    // Only include files that actually use Tailwind
  ],
  // Remove unused utilities
  safelist: [
    // Only safelist actually dynamic classes
    "text-signal-teal",
    "text-electric-blue",
    "text-provenance-purple",
  ],
} satisfies Config;
```

#### CSS Bundle Analysis
```bash
# Analyze CSS bundle size
npx tailwindcss -i ./src/index.css -o ./dist/output.css --minify
ls -la ./dist/output.css

# Expected target: < 50KB minified
```

### Critical CSS

#### Above-the-fold Optimization
```css
/* Inline critical CSS for above-the-fold content */
.hero-section {
  /* Critical styles only */
  display: flex;
  min-height: 100vh;
}

/* Non-critical CSS loaded asynchronously */
```

## Monitoring and Measurement

### Performance Metrics Collection
```tsx
// client/src/lib/performance.ts
export function measureWebVitals() {
  if (typeof window !== "undefined") {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
}

// In main.tsx
measureWebVitals();
```

### Bundle Analysis
```bash
# Analyze bundle composition
npm run build
npx vite-bundle-analyzer dist

# Expected thresholds:
# - React + ReactDOM: ~45KB gzipped
# - TanStack Query: ~15KB gzipped
# - Tailwind CSS: ~50KB gzipped
# - Application code: ~100KB gzipped
```

## Component Library Cleanup

### shadcn/ui Audit Process

#### Monthly Cleanup Checklist
1. **Identify unused components**:
   ```bash
   # Search for component imports
   grep -r "from \"@/components/ui/" client/src/
   
   # Compare with installed components
   ls client/src/components/ui/
   ```

2. **Remove unused dependencies**:
   ```bash
   # Remove unused Radix packages
   npm uninstall @radix-ui/react-unused-component
   
   # Remove unused component files
   rm client/src/components/ui/unused-component.tsx
   ```

3. **Update documentation**:
   - Remove from ui-patterns.md
   - Update import examples
   - Revise component guidelines

#### Current Cleanup Candidates
Based on codebase analysis, consider removing:
- Unused carousel components
- Redundant date picker variants
- Excessive chart components (if not used)
- Duplicate dialog/modal components

### Tree Shaking Validation
```typescript
// Ensure proper tree shaking
import { Button } from "@/components/ui/button"; // ✅ Specific import
import { Dialog, DialogContent } from "@/components/ui/dialog"; // ✅ Named imports

// Avoid barrel imports for large libraries
import * as LucideIcons from "lucide-react"; // ❌ Imports entire library
import { ArrowRight, Shield } from "lucide-react"; // ✅ Tree-shakeable
```

## Caching Strategy

### Static Asset Caching
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Cache busting for assets
        assetFileNames: "assets/[name].[hash][extname]",
        chunkFileNames: "chunks/[name].[hash].js",
        entryFileNames: "entries/[name].[hash].js",
      },
    },
  },
});
```

### Service Worker (Future)
```typescript
// Future: Implement service worker for caching
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

## Performance Testing

### Automated Performance Tests
```typescript
// tests/performance.spec.ts
import { test, expect } from "@playwright/test";

test("should meet Core Web Vitals thresholds", async ({ page }) => {
  await page.goto("/");
  
  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        resolve(entries[entries.length - 1].startTime);
      }).observe({ entryTypes: ["largest-contentful-paint"] });
    });
  });
  
  expect(lcp).toBeLessThan(2500); // 2.5 seconds
});
```