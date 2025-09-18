# Security and Logging

## Security Practices

### Input Validation

#### Double Validation Pattern
**Required**: Validate all inputs on both frontend and backend

```tsx
// Frontend validation (UX)
const formSchema = insertContactMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Backend validation (Security)
router.post("/contact-messages", async (req, res) => {
  try {
    const validatedData = insertContactMessageSchema.parse(req.body);
    // Process validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
    }
  }
});
```

#### SQL Injection Prevention
**Required**: Use Drizzle ORM parameterized queries only

```tsx
// ✅ Safe: Drizzle ORM with parameters
await db.select().from(users).where(eq(users.email, userEmail));

// ❌ Dangerous: Raw SQL with string concatenation
await db.execute(`SELECT * FROM users WHERE email = '${userEmail}'`);
```

### Authentication and Authorization

#### Session Management
```tsx
// server/index.ts
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";

const pgSession = ConnectPgSimple(session);

app.use(session({
  store: new pgSession({
    conString: process.env.DATABASE_URL,
  }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: "strict", // CSRF protection
  },
}));
```

#### Environment Variables
**Required**: Never expose sensitive data in frontend builds

```tsx
// ✅ Safe: Backend only
const apiKey = process.env.OPENAI_API_KEY;

// ❌ Dangerous: Available in frontend
const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Don't do this with secrets
```

### CORS Configuration

```tsx
// server/index.ts
import cors from "cors";

app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["https://yourdomain.com"] 
    : ["http://localhost:5000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

### Content Security Policy (CSP)

```tsx
import helmet from "helmet";

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Required for Tailwind
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));
```

## Logging Governance

### Production Logging Rules

#### Prohibited: PII Data Logging
**CRITICAL**: Never log personally identifiable information in production

```tsx
// ❌ FORBIDDEN: Logging PII data
console.log("User submitted:", req.body); // Contains email, names, etc.
logger.info("Contact form data:", formData); // Contains PII

// ✅ Safe: Log non-PII metadata only
console.log("Contact form submitted successfully");
logger.info("Form submission", { 
  endpoint: "/api/contact-messages",
  timestamp: Date.now(),
  success: true 
});
```

#### Current Security Issue
**IMMEDIATE FIX REQUIRED**: Remove response body logging for API endpoints

```tsx
// Current problematic code in server/index.ts
res.on("finish", () => {
  if (path.startsWith("/api")) {
    let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`; // ❌ LOGS PII
    }
    log(logLine);
  }
});

// ✅ Fix: Remove response body logging
res.on("finish", () => {
  if (path.startsWith("/api")) {
    log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
  }
});
```

### Safe Logging Patterns

#### Structured Logging
```tsx
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Production-safe logging
logger.info("API request", {
  method: req.method,
  path: req.path,
  statusCode: res.statusCode,
  duration: Date.now() - start,
  userAgent: req.get("User-Agent"),
  ip: req.ip,
  // Never include: req.body, res.body, cookies, headers with auth
});
```

#### Error Logging
```tsx
// Safe error logging
logger.error("Database error", {
  error: error.message,
  stack: error.stack,
  operation: "createContactMessage",
  timestamp: Date.now(),
  // Never include: user data, request bodies, auth tokens
});

// Redact sensitive information
const redactedBody = {
  ...req.body,
  email: req.body.email ? "[REDACTED]" : undefined,
  password: req.body.password ? "[REDACTED]" : undefined,
};
```

### Development vs Production

#### Development Logging
```tsx
if (process.env.NODE_ENV === "development") {
  logger.debug("Full request details", {
    method: req.method,
    path: req.path,
    body: req.body, // Only in development
    headers: req.headers, // Only in development
  });
}
```

#### Production Safeguards
```tsx
// Environment-based logging configuration
const logLevel = process.env.NODE_ENV === "production" ? "warn" : "debug";
const includeBody = process.env.NODE_ENV !== "production";

if (includeBody) {
  logger.debug("Request body", req.body);
} else {
  logger.info("Request processed", { method: req.method, path: req.path });
}
```

## Rate Limiting (Future)

### API Rate Limiting
```tsx
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

// Stricter limits for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per 15 minutes
  skipSuccessfulRequests: true,
});

app.use("/api/auth", authLimiter);
```

## Error Handling

### Error Response Format
```tsx
// Standardized error responses
interface ErrorResponse {
  error: string;
  message?: string;
  details?: any[];
  timestamp: string;
  requestId: string;
}

// Safe error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers["x-request-id"] || crypto.randomUUID();
  
  // Log error safely (no PII)
  logger.error("Request error", {
    requestId,
    error: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    statusCode: err.status || 500,
  });

  // Return safe error response
  const response: ErrorResponse = {
    error: err.status < 500 ? err.message : "Internal server error",
    timestamp: new Date().toISOString(),
    requestId,
  };

  res.status(err.status || 500).json(response);
});
```

### Security Headers

```tsx
app.use((req, res, next) => {
  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
  next();
});
```

## Monitoring and Alerting

### Health Checks
```tsx
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    // Never include: database connections, secrets, user data
  });
});
```

### Security Incident Response
1. Immediate containment of affected systems
2. Assessment of data exposure (check logs for PII leakage)
3. Notification procedures for data breaches
4. Post-incident security review and improvements