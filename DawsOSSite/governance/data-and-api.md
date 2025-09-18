# Data and API Patterns

## Schema Ownership

**Single Source of Truth**: All data schemas are defined in `shared/schema.ts`
**Framework**: Drizzle ORM with PostgreSQL
**Validation**: Zod schemas for runtime validation

## Schema Definition Pattern

```tsx
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Database table definition
export const contactMessages = pgTable("contact_messages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const selectContactMessageSchema = createSelectSchema(contactMessages);

// TypeScript types
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type SelectContactMessage = typeof contactMessages.$inferSelect;
```

## API Route Patterns

### Route Organization
All API routes defined in `server/routes.ts` with consistent patterns:

```tsx
import { Router } from "express";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: express.Application) {
  const router = Router();

  // POST endpoint with validation
  router.post("/contact-messages", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Use storage interface
      const result = await storage.createContactMessage(validatedData);
      
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.use("/api", router);
}
```

### Thin Routes Principle
Routes should be thin wrappers that:
1. Validate input with Zod schemas
2. Call storage interface methods
3. Handle errors consistently
4. Return standardized responses

### Storage Interface Pattern

All data operations go through storage interface in `server/storage.ts`:

```tsx
export interface IStorage {
  // Contact messages
  createContactMessage(data: InsertContactMessage): Promise<SelectContactMessage>;
  getContactMessages(): Promise<SelectContactMessage[]>;
  
  // Demo requests
  createDemoRequest(data: InsertDemoRequest): Promise<SelectDemoRequest>;
  getDemoRequests(): Promise<SelectDemoRequest[]>;
}

export class MemStorage implements IStorage {
  private contactMessages: SelectContactMessage[] = [];
  private nextContactId = 1;

  async createContactMessage(data: InsertContactMessage): Promise<SelectContactMessage> {
    const contactMessage: SelectContactMessage = {
      id: this.nextContactId++,
      ...data,
      createdAt: new Date(),
    };
    
    this.contactMessages.push(contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<SelectContactMessage[]> {
    return [...this.contactMessages];
  }
}
```

## Frontend API Integration

### Query Client Setup
Centralized API configuration in `client/src/lib/queryClient.ts`:

```tsx
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(queryKey[0] as string);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      },
    },
  },
});

export async function apiRequest<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
  return response.json();
}
```

### Query Patterns
Use consistent query patterns:

```tsx
// Queries (GET requests)
const { data, isLoading, error } = useQuery({
  queryKey: ["/api/contact-messages"],
  // queryFn provided by default queryClient setup
});

// Mutations (POST/PUT/DELETE requests)
const mutation = useMutation({
  mutationFn: async (data: InsertContactMessage) => {
    return await apiRequest("POST", "/api/contact-messages", data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
  },
});
```

### Cache Invalidation Strategy
Use hierarchical query keys for efficient cache invalidation:

```tsx
// ✅ Good: Hierarchical keys
queryKey: ["/api/contact-messages"]
queryKey: ["/api/contact-messages", id]

// ❌ Bad: Flat string keys
queryKey: [`/api/contact-messages/${id}`]
```

## Error Handling

### API Error Responses
Standardized error response format:

```tsx
// Validation errors
{
  error: "Validation failed",
  details: [
    { path: ["email"], message: "Invalid email format" }
  ]
}

// Server errors
{
  error: "Internal server error",
  message: "Description of what went wrong"
}
```

### Frontend Error Handling
```tsx
const mutation = useMutation({
  mutationFn: apiCall,
  onError: (error) => {
    toast({
      title: "Error",
      description: error.message || "Something went wrong",
      variant: "destructive",
    });
  },
});
```

## Naming Conventions

### API Endpoints
- RESTful patterns: `/api/contact-messages`, `/api/demo-requests`
- Plural nouns for collections
- Kebab-case for multi-word resources

### Schema Names
- Table names: `snake_case` (e.g., `contact_messages`)
- Schema names: `camelCase` with descriptive prefixes (e.g., `insertContactMessageSchema`)
- Type names: `PascalCase` (e.g., `InsertContactMessage`)

### Storage Methods
- CRUD operations: `create`, `get`, `update`, `delete`
- Descriptive names: `createContactMessage`, `getContactMessages`

## Semantic Alignment

Ensure semantic consistency between frontend and backend:

```tsx
// ✅ Correct alignment
// Demo booking form → /api/demo-requests → insertDemoRequestSchema
// Contact form → /api/contact-messages → insertContactMessageSchema

// ❌ Wrong alignment  
// Demo form posting to contact-messages endpoint
```

## Type Safety

### Shared Types
Import types from shared schema:
```tsx
import { type InsertContactMessage, type SelectContactMessage } from "@shared/schema";
```

### API Response Typing
Type API responses for better developer experience:
```tsx
const { data } = useQuery<SelectContactMessage[]>({
  queryKey: ["/api/contact-messages"],
});
```

## Performance Optimization

### Query Optimization
- Use React Query's built-in caching
- Implement optimistic updates for better UX
- Batch related queries when possible

### Data Fetching
- Fetch data close to where it's used
- Use loading states consistently
- Implement error boundaries for graceful degradation