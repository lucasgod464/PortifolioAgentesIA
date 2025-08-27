# NexusAI - AI Agent Platform

## Overview

NexusAI is a modern AI agent platform that provides specialized virtual assistants for various business sectors. The platform features a user-friendly interface built with React and TypeScript, allowing users to interact with different AI agents through text and audio conversations. The system includes both a public-facing website with agent cards and an admin panel for managing agents and prompts. The platform integrates with external services via webhooks and supports real-time communication through WebSocket connections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application uses React with TypeScript and follows a component-based architecture. The UI is built using a combination of styled-components for custom styling and shadcn/ui components for consistent design elements. The application uses React Query (@tanstack/react-query) for server state management and includes a custom authentication system with protected routes. The frontend supports real-time chat functionality through WebSocket connections and audio recording capabilities for voice interactions.

### Backend Architecture
The server is built with Express.js and uses a modular architecture with separate modules for authentication, database operations, API routes, and WebSocket handling. The server implements session-based authentication using Passport.js with local strategy and bcrypt for password hashing. The system includes middleware for request logging and error handling, with support for both development and production environments.

### Database Architecture
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The schema includes three main tables: users (authentication), agents (AI assistant definitions), and agent_prompts (customizable prompts for each agent). The database configuration supports both local development and cloud deployments with connection pooling for optimal performance.

### Authentication System
Authentication is handled through Passport.js with local strategy, using scrypt for password hashing and express-session for session management. The system includes role-based access control with admin-only routes and middleware for protecting sensitive endpoints. User sessions are stored in PostgreSQL using connect-pg-simple.

### Real-time Communication
The platform implements WebSocket connections for real-time chat functionality, allowing users to interact with AI agents instantly. The WebSocket server handles message routing and supports different message types for various chat interactions.

### Build System
The application uses Vite for frontend bundling with TypeScript support and esbuild for server-side bundling. The build process creates optimized production bundles with separate configurations for client and server code. The system includes development tools like hot module replacement and runtime error overlays.

## External Dependencies

### Database Services
- **PostgreSQL**: Primary database for storing users, agents, and prompts
- **Drizzle ORM**: Type-safe database operations and migrations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Authentication & Security
- **Passport.js**: Authentication middleware with local strategy
- **crypto (scrypt)**: Password hashing using Node.js built-in crypto module
- **express-session**: Session management for user authentication

### UI Components & Styling
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **styled-components**: CSS-in-JS for custom component styling
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Pre-built accessible components built on Radix UI

### Real-time & Audio
- **WebSocket (ws)**: Real-time bidirectional communication for chat
- **lamejs**: MP3 encoding for audio message processing
- **Web Audio API**: Browser native audio recording capabilities

### External Integrations
- **Webhook endpoints**: Configurable webhook URLs for external service integration
- **WhatsApp integration**: Contact forwarding through WhatsApp links
- **Environment-based configuration**: Support for custom logos and webhook URLs through environment variables

### Development Tools
- **Vite**: Frontend build tool with hot module replacement
- **esbuild**: Fast JavaScript bundler for server-side code
- **TypeScript**: Type safety across the entire application
- **React Query**: Server state management and caching
- **uuid**: Session ID generation for user tracking