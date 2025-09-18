# Application Architecture

## Overview

DawsOS is a full-stack JavaScript application built with modern web technologies, following an agent-first architecture where AI agents and human experts collaborate seamlessly.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Storage Interface**: In-memory storage (MemStorage) for development
- **Session Management**: Express sessions with PostgreSQL store

### Development
- **Package Manager**: npm
- **Type Safety**: TypeScript across frontend and backend
- **Validation**: Zod schemas shared between frontend and backend
- **Development Server**: Vite dev server with Express API

## Application Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components for routing
│   │   ├── lib/           # Utilities and configurations
│   │   └── index.css      # Global styles and Tailwind
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Storage interface and implementations
│   └── vite.ts           # Vite integration for development
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle schemas and Zod validations
└── governance/           # Architecture and pattern documentation
```

## Data Flow

### Frontend → Backend
1. User interactions trigger React components
2. Forms use react-hook-form with Zod validation
3. TanStack React Query handles API calls
4. API requests go to Express routes at `/api/*`

### Backend Processing
1. Express routes receive requests
2. Zod schemas validate request bodies
3. Storage interface handles data persistence
4. Responses return with consistent error handling

### Frontend Updates
1. React Query caches and manages server state
2. Mutations trigger cache invalidation
3. UI updates reactively based on state changes

## Security Architecture

- Input validation at both frontend (UX) and backend (security)
- Type-safe APIs with shared Zod schemas
- Session-based authentication (when implemented)
- No sensitive data in frontend builds
- Secure headers and CORS configuration

## Deployment Architecture

- Single port (5000) serves both frontend and API
- Vite handles frontend bundling and development server
- Express serves static files in production
- Environment variables for configuration
- Automatic HTTPS and health checks via Replit deployment

## Performance Considerations

- Code splitting with React lazy loading
- Optimistic updates with React Query
- Efficient re-renders with proper React patterns
- Tailwind CSS purging for minimal bundle size
- Image optimization and lazy loading