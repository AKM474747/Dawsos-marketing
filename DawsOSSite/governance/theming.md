# Theming and Dark Mode

## Dark Mode Implementation

**Framework**: Tailwind CSS with class-based dark mode
**Configuration**: `darkMode: ["class"]` in `tailwind.config.ts`
**Provider**: Required ThemeProvider component for state management

## Theme Provider Implementation

**Required**: Implement centralized theme management:

```tsx
// client/src/components/theme-provider.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, fallback to system preference
    const saved = localStorage.getItem("dawsos-theme");
    if (saved === "light" || saved === "dark") return saved;
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("dawsos-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

## CSS Variable System

### Color Variable Definitions
Define all colors as CSS variables in `client/src/index.css`:

```css
:root {
  /* Base colors */
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(222.2, 84%, 4.9%);
  --card: hsl(0, 0%, 100%);
  --card-foreground: hsl(222.2, 84%, 4.9%);
  --muted: hsl(210, 40%, 96%);
  --muted-foreground: hsl(215.4, 16.3%, 46.9%);
  
  /* Brand colors */
  --graphite: hsl(220, 10%, 20%);
  --slate: hsl(220, 10%, 25%);
  --signal-teal: hsl(180, 100%, 35%);
  --electric-blue: hsl(210, 100%, 50%);
  --provenance-purple: hsl(270, 75%, 60%);
  --alert-amber: hsl(45, 100%, 50%);
  --risk-red: hsl(0, 75%, 55%);
}

.dark {
  /* Dark mode overrides */
  --background: hsl(222.2, 84%, 4.9%);
  --foreground: hsl(210, 40%, 98%);
  --card: hsl(222.2, 84%, 4.9%);
  --card-foreground: hsl(210, 40%, 98%);
  --muted: hsl(217.2, 32.6%, 17.5%);
  --muted-foreground: hsl(215, 20.2%, 65.1%);
  
  /* Brand colors may need dark variants */
  --signal-teal: hsl(180, 100%, 40%);
  --electric-blue: hsl(210, 100%, 60%);
}
```

## Required Class Patterns

### Explicit Light/Dark Variants
**Required**: All visual properties must have explicit light and dark variants:

```tsx
// ✅ Correct - Explicit variants
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
className="border-gray-200 dark:border-gray-700"
className="hover:bg-gray-100 dark:hover:bg-gray-800"

// ❌ Wrong - Missing dark mode
className="bg-white text-gray-900" // Will break in dark mode
className="text-black" // Hard-coded colors
```

### Brand Color Usage
Use CSS variables for consistent brand colors:

```tsx
// ✅ Correct - CSS variables
className="bg-signal-teal text-white"
className="border-electric-blue"
className="text-provenance-purple"

// ❌ Wrong - Hard-coded colors
className="bg-teal-500" // Use brand variables instead
```

## Component Integration

### Theme Toggle Button
Implement theme toggle in navigation:

```tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      className="text-foreground"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### App Integration
Wrap entire app with ThemeProvider:

```tsx
// client/src/App.tsx
import { ThemeProvider } from "@/components/theme-provider";

function App() {
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
```

## Accessibility Requirements

### System Preference Detection
Respect user's system preference:
```tsx
const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
```

### Smooth Transitions
Add transitions for theme changes:
```css
html {
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

### Focus Indicators
Ensure focus indicators work in both themes:
```tsx
className="focus:ring-2 focus:ring-signal-teal focus:ring-offset-2 focus:ring-offset-background"
```

## Testing Considerations

### Data Test IDs
Theme toggle must include test ID:
```tsx
<Button data-testid="button-theme-toggle">
```

### Local Storage Key
Use consistent localStorage key: `dawsos-theme`

### Theme Persistence
Theme choice must persist across page reloads and browser sessions.

## Performance Optimization

### CSS Custom Properties
Use CSS custom properties for dynamic theming without JavaScript:
```css
.component {
  color: var(--foreground);
  background-color: var(--background);
}
```

### Minimal JavaScript
Theme switching should be lightweight and not cause layout shifts.

## Common Patterns

### Card Components
```tsx
<Card className="bg-card dark:bg-card text-card-foreground border-border">
```

### Interactive Elements
```tsx
<button className="bg-primary hover:bg-primary/90 text-primary-foreground">
```

### Status Indicators
```tsx
<div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
```

## Migration Strategy

1. Implement ThemeProvider in App.tsx
2. Add theme toggle to navigation
3. Audit all components for missing dark mode classes
4. Test all interactive states in both themes
5. Validate accessibility in both modes