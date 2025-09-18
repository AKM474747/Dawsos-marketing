# DawsOS Corporate Website

## Overview

DawsOS is an enterprise risk management platform that serves as a "Propagation OS" - a system for analyzing causal shock chains in risk scenarios. The platform provides transparent, calibrated, and replayable risk analysis with full explainability, targeting risk managers, portfolio analysts, economists, and policy analysts. The application features real-time SLO monitoring, interactive causal path exploration, and sector-specific risk pattern libraries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Built with React 18 using TypeScript for type safety
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **UI Framework**: Radix UI primitives with shadcn/ui components for consistent design system
- **Styling**: Tailwind CSS with custom CSS variables for brand colors (signal-teal, electric-blue, provenance-purple, alert-amber)
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build System**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API server
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful endpoints for demo requests and contact messages
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Hot module replacement and automatic restarts using tsx

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle ORM with type-safe schema definitions and migrations
- **Connection**: Uses @neondatabase/serverless for database connectivity
- **Schema**: Separate schema file in shared directory for type consistency between client and server
- **Validation**: Zod schemas for runtime validation matching database schema
- **Fallback Storage**: In-memory storage implementation for development/testing

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Data Access**: Public API endpoints for demo requests and contact forms
- **Session Management**: Express session infrastructure prepared but not actively used

### Component Architecture
- **Design System**: Comprehensive UI component library based on Radix UI primitives
- **Responsive Design**: Mobile-first approach with responsive navigation and layouts
- **Interactive Components**: Custom components for causal path demos, SLO dashboards, and risk visualizations
- **Modular Structure**: Reusable components organized in ui/ directory with specific business components in components/

### Development Workflow
- **Type Safety**: Shared TypeScript types between client and server
- **Path Aliases**: Configured path mapping for clean imports (@/, @shared/, @assets/)
- **Development Tools**: Runtime error overlay and development banners for Replit environment
- **Build Process**: Separate client and server build processes with optimized bundling

## External Dependencies

### Database and ORM
- **Drizzle Kit**: Database schema management and migrations
- **Drizzle ORM**: Type-safe database queries and schema definitions
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **connect-pg-simple**: PostgreSQL session store (prepared for future use)

### UI and Styling
- **Radix UI**: Complete primitive component library for accessible UI components
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Framer Motion**: Animation library for interactive components
- **Lucide React**: Icon library for consistent iconography

### Development and Build Tools
- **Vite**: Build tool and development server with HMR
- **TypeScript**: Type system for both client and server code
- **ESBuild**: Fast JavaScript bundler for server-side code
- **PostCSS**: CSS processing with Tailwind and autoprefixer

### Form Handling and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema parsing
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### State Management and API
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight client-side routing
- **Date-fns**: Date manipulation utilities

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicators