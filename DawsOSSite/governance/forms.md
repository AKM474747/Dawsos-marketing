# Forms and Data Handling

## Form Implementation Standard

**Required**: All forms MUST use the following pattern:
1. shadcn/ui `Form` component (wraps react-hook-form)
2. `react-hook-form` for form state management
3. `zodResolver` for validation with shared schemas
4. TanStack React Query mutations for submission

## Standard Form Pattern

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";

export function ContactForm() {
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      email: "",
      message: "",
      role: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact-messages", data);
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
      form.reset();
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="email"
                  data-testid="input-email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={mutation.isPending}
          data-testid="button-submit"
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
```

## Schema Extension for Validation

Use `.extend()` to add frontend-specific validation rules:

```tsx
const formSchema = insertContactMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
```

## Form State Management

### Default Values
Always provide default values to prevent uncontrolled component warnings:
```tsx
const form = useForm({
  defaultValues: {
    email: "",
    role: "",
    message: "",
  },
});
```

### Loading States
Show loading states during form submission:
```tsx
<Button 
  type="submit" 
  disabled={mutation.isPending}
  data-testid="button-submit"
>
  {mutation.isPending ? "Submitting..." : "Submit"}
</Button>
```

### Error Handling
Display form errors using `FormMessage` component:
```tsx
<FormMessage /> // Shows field-specific errors
```

For global form errors:
```tsx
{mutation.error && (
  <div className="text-destructive text-sm">
    Failed to submit form. Please try again.
  </div>
)}
```

## Cache Invalidation

Always invalidate relevant queries after successful mutations:
```tsx
onSuccess: () => {
  // Invalidate specific query
  queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
  
  // Or invalidate multiple related queries
  queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
  queryClient.invalidateQueries({ queryKey: ["/api/demo-requests"] });
},
```

## Form Validation Patterns

### Client-Side Validation
Use Zod schemas for immediate feedback:
```tsx
email: z.string().email("Please enter a valid email address")
password: z.string().min(8, "Password must be at least 8 characters")
```

### Server-Side Validation
Backend must validate using the same Zod schemas:
```tsx
// In API routes
const validatedData = insertContactMessageSchema.parse(req.body);
```

## Forbidden Patterns

❌ **Manual form state with useState**
```tsx
// Don't do this
const [email, setEmail] = useState("");
const [errors, setErrors] = useState({});
```

❌ **Direct form submission without react-hook-form**
```tsx
// Don't do this
const handleSubmit = (e) => {
  e.preventDefault();
  // Manual form handling
};
```

❌ **Missing validation or default values**
```tsx
// Don't do this
const form = useForm(); // Missing resolver and defaultValues
```

## Data Test IDs for Forms

Required test IDs for all form elements:
- Inputs: `input-{fieldname}` (e.g., `input-email`, `input-password`)
- Selects: `select-{fieldname}` (e.g., `select-role`, `select-country`)
- Buttons: `button-{action}` (e.g., `button-submit`, `button-cancel`)
- Error messages: `error-{fieldname}` (when custom error display)

## Semantic API Alignment

Ensure form purpose matches API endpoint:
- Demo requests → `/api/demo-requests` with `insertDemoRequestSchema`
- Contact messages → `/api/contact-messages` with `insertContactMessageSchema`
- Never mix semantics (demo form posting to contact endpoint)