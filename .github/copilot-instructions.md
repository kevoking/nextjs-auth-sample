# LaunchKit - AI Coding Instructions

## Project Overview
LaunchKit is a comprehensive SaaS starter kit built with Next.js 15, TypeScript, and modern tools. It provides authentication, dashboard, analytics, team management, and subscription features to help developers launch SaaS products faster.

**Brand Identity**: "Ship Faster, Build Better" - From idea to SaaS in minutes, not months.

## Architecture & Patterns

### Core Stack
- **Next.js 15** (App Router) - File-based routing with modern React features
- **TypeScript** - Strict typing throughout the application
- **Firebase** - Authentication and Firestore database
- **Tailwind CSS v4** - CSS-first styling approach
- **shadcn/ui** - Accessible component system
- **TanStack Table** - Advanced data table functionality
- **Recharts** - Data visualization and charts

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes (login, signup)
│   ├── (landing)/         # Landing page route group
│   ├── dashboard/         # Protected dashboard area
│   │   ├── analytics/     # SaaS metrics & charts
│   │   ├── subscriptions/ # Customer subscription management
│   │   ├── team/          # Team member management
│   │   ├── profile/       # User profile management
│   │   └── layout.tsx     # Protected dashboard layout
│   ├── globals.css        # Tailwind v4 global styles
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── auth/              # Authentication forms
│   ├── layout/            # Layout components (Navbar)
│   ├── app-sidebar.tsx    # Main dashboard sidebar
│   ├── nav-*.tsx          # Navigation components
│   └── ui/                # shadcn/ui components
└── lib/
    ├── auth.tsx           # Firebase auth context
    ├── firebase.ts        # Firebase configuration
    └── utils.ts           # Utility functions
```

## Coding Standards & Conventions

### TypeScript Guidelines
- **Strict Typing**: Always use proper TypeScript types
- **Interface Definitions**: Create interfaces for data structures
- **Type Safety**: Leverage TypeScript for runtime safety

```typescript
// Good: Proper typing
interface Subscription {
  id: string
  customerName: string
  status: 'active' | 'cancelled' | 'past_due' | 'trial'
  amount: number
}

// Good: Typed function parameters
const updateSubscription = (id: string, data: Partial<Subscription>) => {
  // Implementation
}
```

### React Component Patterns
- **'use client'** directive for client components
- **Default exports** for page components
- **Named exports** for reusable components
- **Proper hooks usage** (useState, useEffect, custom hooks)

```typescript
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardCardProps {
  title: string
  value: string
  change: number
}

export function DashboardCard({ title, value, change }: DashboardCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
```

### Styling Conventions
- **Tailwind CSS v4**: Use utility classes, no custom CSS when possible
- **shadcn/ui components**: Prefer these over custom components
- **Responsive design**: Mobile-first approach with `md:`, `lg:` prefixes
- **Dark theme**: Use semantic color tokens (`text-foreground`, `bg-background`)

```typescript
// Good: Tailwind utility classes
<div className="flex flex-1 flex-col gap-4 p-4">
  <Card>
    <CardContent className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Content */}
      </div>
    </CardContent>
  </Card>
</div>
```

### Data Management Patterns
- **TanStack Table**: Use for complex data tables with sorting/filtering
- **React Hook Form + Zod**: Form handling with validation
- **Firebase Context**: Centralized auth state management

```typescript
// Good: TanStack Table usage
const table = useReactTable({
  data: mockData,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

// Good: Form with validation
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { name: '', email: '' }
})
```

## File Organization Rules

### Page Components
- Place in appropriate app directory (`dashboard/`, `(auth)/`, etc.)
- Use `page.tsx` filename
- Include metadata export for SEO
- Follow layout hierarchy

```typescript
// app/dashboard/analytics/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics - LaunchKit',
  description: 'SaaS analytics and business metrics dashboard'
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Page content */}
    </div>
  )
}
```

### Component Organization
- **Reusable components**: `/components/ui/` (shadcn/ui)
- **Feature components**: `/components/[feature]/`
- **Layout components**: `/components/layout/`
- **One component per file** with descriptive names

### Data & Types
- **Mock data**: Include realistic sample data for development
- **Type definitions**: Co-locate with components or create shared types
- **API interfaces**: Define clear contracts for data structures

## Brand & Messaging Guidelines

### LaunchKit Brand Voice
- **Professional but approachable**
- **Developer-focused messaging**
- **Emphasis on speed and efficiency**
- **Value proposition**: "Ship Faster, Build Better"

### Terminology
- **"LaunchKit"** - Always use this as the product name
- **"SaaS starter kit"** - Primary category description
- **"Ship faster"** - Key value proposition
- **"Production-ready"** - Quality indicator

### UI Copy Patterns
```typescript
// Good: Consistent messaging
<h1>Analytics Dashboard</h1>
<p>Monitor your SaaS performance and key metrics</p>

// Good: Action-oriented CTAs
<Button>Launch Your SaaS</Button>
<Button>Get LaunchKit</Button>
```

## Common Implementation Patterns

### Dashboard Layout
All dashboard pages should follow this structure:
```typescript
export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Page Title</h1>
          <p className="text-muted-foreground">Page description</p>
        </div>
        <Button>Primary Action</Button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric cards */}
      </div>

      {/* Main content */}
      <Card>
        <CardHeader>
          <CardTitle>Section Title</CardTitle>
          <CardDescription>Section description</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content */}
        </CardContent>
      </Card>
    </div>
  )
}
```

### Authentication Patterns
- Use `useAuth` hook for auth state
- Protect routes with dashboard layout
- Handle loading states properly

```typescript
const { user, userProfile, loading, signOut } = useAuth()

if (loading) {
  return <LoadingSpinner />
}

if (!user) {
  // Handled by layout redirect
  return null
}
```

### Table Implementation
- Use TanStack Table for data tables
- Include search, sorting, and pagination
- Follow established column definitions

### Chart Implementation
- Use Recharts for data visualization
- Make charts responsive with ResponsiveContainer
- Include proper tooltips and legends

## Testing Guidelines
- **Jest + React Testing Library** for component tests
- **Mock Firebase** services in tests
- **Test user interactions** and auth flows
- **Maintain test coverage** for critical paths

## Performance Best Practices
- **Code splitting**: Leverage Next.js automatic splitting
- **Image optimization**: Use Next.js Image component
- **Bundle optimization**: Import only needed components
- **Loading states**: Provide feedback for async operations

## When Adding New Features

### 1. Plan the Structure
- Determine if it's a new page, component, or feature
- Follow existing patterns and conventions
- Consider mobile responsiveness

### 2. Implement with TypeScript
- Define proper interfaces and types
- Use existing patterns and components
- Follow the established file structure

### 3. Maintain Consistency
- Use shadcn/ui components when possible
- Follow the dashboard layout pattern
- Maintain brand voice and messaging

### 4. Consider Integration
- How does it fit with existing features?
- Does it need auth protection?
- Should it appear in navigation?

## Common Tasks & Examples

### Adding a New Dashboard Page
1. Create `app/dashboard/[name]/page.tsx`
2. Add to sidebar navigation in `app-sidebar.tsx`
3. Follow dashboard layout pattern
4. Include proper metadata

### Creating Data Tables
1. Define TypeScript interface for data
2. Create column definitions with TanStack Table
3. Implement search and filtering
4. Add pagination and sorting

### Building Charts
1. Prepare data in proper format for Recharts
2. Use ResponsiveContainer for responsive design
3. Configure tooltips and legends
4. Make interactive where appropriate

Remember: LaunchKit is about helping developers ship faster. Every component, page, and feature should reflect this core value proposition while maintaining high code quality and user experience standards.