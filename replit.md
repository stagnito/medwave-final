# VinovaMedTech Coming Soon Website

## Overview

This is a modern, animated single-page "Coming Soon" website for VinovaMedTech's revolutionary sleep apnea therapy device. The application features a beautiful, scroll-based design with GSAP animations, typing effects, enhanced branding, and comprehensive information sections. Built as a full-stack web application with React frontend and Express backend.

## Recent Changes (July 13, 2025)

✓ Updated logo to use the correct VinovaMedTech branding with transparent PNG
✓ Enhanced hero section with "World's First Untethered Machine" prominence  
✓ Fixed typing animation for "Breathe Free. Sleep Better." headline with blinking cursor (now using CSS)
✓ Updated "Launching Soon" badge with orange color and larger size with blinking animation
✓ Reduced white space between Home-Product and About-Team sections (py-20 to py-12)
✓ Added 5 comprehensive product features on left side with ZZZ image on right
✓ Enhanced CTA buttons with hover zoom effects and better styling
✓ Added real team member details: Dr. T. Jayanthi and Mr. VinothKumar GK with descriptions
✓ Updated waitlist section with "Coming" text above emoji in green theme
✓ Enhanced footer with correct contact details: +91 9840490315, vinovamedtech@gmail.com
✓ Added complete address: C1-1102, The Belevedere Apartments, Nandhivaram Guduvanchery, Changalpattu dist-603202
✓ Improved animation timing (trigger at 85% instead of 75% scroll)
✓ Added Made in India branding with flag emoji throughout
✓ Enhanced team section with mission statement and company values

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design tokens matching the medical-tech branding
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: GSAP (GreenSock Animation Platform) with ScrollTrigger for scroll-based animations
- **State Management**: React Hook Form for form handling, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Development**: Hot reload with Vite integration for seamless development experience

### Data Storage
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions between frontend and backend
- **Migrations**: Drizzle-kit for database schema management

## Key Components

### Database Schema
- **Users Table**: Basic user authentication structure (id, username, password)
- **Waitlist Signups**: Email collection with timestamps for lead generation
- **Validation**: Zod schemas for runtime type checking and validation

### Frontend Components
- **Landing Page**: Single scroll-based page with multiple animated sections
- **Email Collection**: Waitlist signup form with validation and success feedback
- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Animation System**: GSAP-powered scroll triggers for section reveals

### Backend Endpoints
- **POST /api/waitlist**: Email signup with duplicate prevention
- **GET /api/waitlist**: Admin endpoint for retrieving all signups
- **Error Handling**: Comprehensive error responses with proper HTTP status codes

## Data Flow

1. **User Interaction**: Visitors scroll through the landing page experiencing animated content reveals
2. **Email Submission**: Users enter email addresses in the waitlist signup form
3. **Client Validation**: React Hook Form with Zod validation ensures data integrity
4. **Server Processing**: Express endpoint validates and stores email with duplicate checking
5. **Database Storage**: PostgreSQL stores waitlist signups with timestamps
6. **User Feedback**: Success/error messages displayed via toast notifications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL client for Neon database
- **@radix-ui/***: Headless UI components for accessibility
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database operations
- **gsap**: Animation library for scroll-based effects
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library

### Development Tools
- **Vite**: Build tool with hot reload and optimized production builds
- **TypeScript**: Static type checking across the entire application
- **ESLint/Prettier**: Code formatting and linting (implicit in setup)

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to static assets
2. **Backend Build**: esbuild bundles Express server for production
3. **Database Setup**: Drizzle migrations ensure schema consistency
4. **Asset Optimization**: Vite handles code splitting and optimization

### Environment Configuration
- **Database URL**: PostgreSQL connection string from environment variables
- **Production Mode**: NODE_ENV controls development vs production behavior
- **Static Assets**: Express serves built frontend assets in production

### Performance Optimizations
- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Asset Caching**: Proper cache headers for static resources
- **Database Indexing**: Unique constraints on email for efficient lookups
- **Animation Performance**: GSAP optimizations for smooth scrolling

### Security Considerations
- **Input Validation**: Server-side validation prevents malicious data
- **Session Security**: Secure session configuration with PostgreSQL storage
- **CORS Protection**: Proper cross-origin request handling
- **Environment Variables**: Sensitive data stored in environment configuration

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and optimized performance for the target use case of lead generation for a medical device product launch.