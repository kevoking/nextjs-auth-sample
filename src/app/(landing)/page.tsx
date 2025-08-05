import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LaunchKit - Ship Faster, Build Better | SaaS Starter Kit",
  description: "From idea to SaaS in minutes, not months. Complete starter kit with authentication, dashboard, analytics, team management, and subscriptions. Built with Next.js 15, TypeScript, and modern tools.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">LaunchKit</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Ship Faster,
            <span className="text-primary"> Build Better</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From idea to SaaS in minutes, not months. Complete starter kit with authentication, 
            dashboard, analytics, team management, and subscriptions. Built with Next.js 15, 
            TypeScript, and modern tools - focus on your business logic, not boilerplate.
          </p>
          <div className="mb-6">
            <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10">
              🤖 Includes AI coding instructions for seamless development
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Launch Your SaaS
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="https://github.com/kevoking/launchkit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            ⚡ Production-ready • 🛡️ Secure by design • 📱 Mobile responsive • 🤖 AI-optimized
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Launch Fast
            </h2>
            <p className="text-xl text-muted-foreground">
              Stop building the same features over and over. Start with a solid foundation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  � Complete Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Firebase Auth with email/password and Google OAuth. Protected routes, 
                  user profiles, and secure session management out of the box.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  📊 Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Beautiful charts and metrics with Recharts. Track MRR, churn rates, 
                  conversion funnels, and user analytics. Perfect for SaaS businesses.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  👥 Team Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced team features with role-based permissions, member invitations, 
                  and user management. Built with TanStack Table for powerful data handling.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  💳 Subscription System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Customer subscription management with sortable tables, billing tracking, 
                  and payment status monitoring. Ready for Stripe integration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🎨 Professional UI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Modern sidebar navigation, responsive design, and dark theme support. 
                  Built with shadcn/ui components and Tailwind CSS v4.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  ⚡ Developer Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  TypeScript throughout, comprehensive test suite with Jest, 
                  production-ready configuration, and AI coding instructions for blissful 
                  AI-assisted development. Deploy with confidence.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built with the Best Tools
            </h2>
            <p className="text-xl text-muted-foreground">
              Modern, battle-tested technologies that scale with your business
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Next.js 15</h3>
              <p className="text-sm text-muted-foreground">Latest React framework with App Router</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-foreground mb-2">TypeScript</h3>
              <p className="text-sm text-muted-foreground">Type-safe development</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Firebase</h3>
              <p className="text-sm text-muted-foreground">Auth, Firestore & hosting</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Tailwind v4</h3>
              <p className="text-sm text-muted-foreground">CSS-first styling</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-foreground mb-2">shadcn/ui</h3>
              <p className="text-sm text-muted-foreground">Accessible components</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-foreground mb-2">TanStack Table</h3>
              <p className="text-sm text-muted-foreground">Advanced data tables</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Recharts</h3>
              <p className="text-sm text-muted-foreground">Beautiful data visualization</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Jest + RTL</h3>
              <p className="text-sm text-muted-foreground">Comprehensive testing</p>
            </div>
          </div>

          {/* What's Included */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">🚀 What's Included</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Complete authentication system with Firebase
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Protected dashboard with sidebar navigation
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Analytics dashboard with interactive charts
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Team management with roles & permissions
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Subscription management system
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  User profile management
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Dark theme and responsive design
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Comprehensive test suite (15 tests)
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  AI coding instructions for enhanced development
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">⏱️ Time Saved</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Authentication Setup</span>
                      <Badge variant="secondary">2-3 weeks</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Dashboard & Navigation</span>
                      <Badge variant="secondary">1-2 weeks</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Data Tables & Charts</span>
                      <Badge variant="secondary">1-2 weeks</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Team Management</span>
                      <Badge variant="secondary">1 week</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-primary">Total Development Time</span>
                      <Badge className="bg-primary">5-8 weeks</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Launch Your SaaS?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Clone LaunchKit and have a production-ready SaaS foundation in minutes, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get LaunchKit
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="https://github.com/kevoking/launchkit" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>🆓 Free & Open Source</span>
            <span>📚 Comprehensive Documentation</span>
            <span>🤖 AI-Assisted Development</span>
            <span>🛠️ Production Ready</span>
            <span>⚡ Setup in 5 minutes</span>
          </div>
        </div>
      </section>
    </div>
  );
}
