# AI Portfolio Application

## Overview

This is a full-stack TypeScript web application built with React frontend and Express backend. It's designed as a personal portfolio showcasing AI and data annotation expertise, featuring modern UI components and a clean architecture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with tsx

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with users table
- **Migrations**: Managed through `drizzle-kit` with migrations in `./migrations`
- **Connection**: Neon Database serverless connection via `@neondatabase/serverless`

### Storage Interface
- **Abstraction**: IStorage interface for CRUD operations
- **Implementation**: MemStorage class for in-memory storage (development)
- **Methods**: User management (getUser, getUserByUsername, createUser)

### UI Components
- **Component Library**: Comprehensive set of 40+ UI components based on Radix UI
- **Styling**: Consistent design system with dark theme support
- **Forms**: React Hook Form integration with Zod validation
- **Animations**: Tailwind CSS animations and transitions

### Portfolio Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Interactive Elements**: Typing animation, smooth scrolling, dynamic content
- **Contact Forms**: Integrated contact functionality with toast notifications
- **Professional Sections**: About, experience, projects, skills, and contact sections

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle requests and interact with storage
3. **Database Operations**: Drizzle ORM manages database interactions
4. **Response Handling**: Structured JSON responses with error handling
5. **State Management**: TanStack Query caches and synchronizes client state

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database
- **Connection**: Via DATABASE_URL environment variable
- **Sessions**: PostgreSQL-backed session storage

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide Icons**: Modern icon library
- **Fonts**: Google Fonts (Sora, JetBrains Mono)

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety and development experience
- **ESLint/Prettier**: Code quality and formatting
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Assets**: Static files served from build directory

### Production Configuration
- **Environment**: NODE_ENV=production
- **Database**: Neon Database with connection pooling
- **Sessions**: PostgreSQL session store for persistence
- **Static Files**: Express serves built frontend assets

### Development Workflow
- **Hot Reload**: Vite development server with HMR
- **Database Migrations**: `drizzle-kit push` for schema changes
- **Type Checking**: TypeScript compilation without emission
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)

### Security Considerations
- **Environment Variables**: Secure database connection strings
- **CORS**: Configured for development and production
- **Session Security**: Secure session configuration
- **Input Validation**: Zod schemas for data validation

The application follows modern web development practices with a focus on type safety, performance, and maintainability. The modular architecture allows for easy extension and modification of features.