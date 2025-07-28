import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Secure Authentication
            <span className="text-primary"> Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A modern authentication system built with Next.js, Firebase, and shadcn/ui. 
            Clean, secure, and ready for production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Auth System?
            </h2>
            <p className="text-xl text-muted-foreground">
              Built with modern best practices and security in mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🔒 Secure by Default
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Firebase Authentication provides enterprise-grade security with built-in 
                  protection against common vulnerabilities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  ⚡ Lightning Fast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built with Next.js 14 and optimized for performance. Fast loading times 
                  and smooth user experience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🎨 Beautiful UI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Modern, accessible components built with shadcn/ui and Tailwind CSS. 
                  Responsive and customizable.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Built with Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">Next.js 14</h3>
              <p className="text-sm text-muted-foreground">React framework with App Router</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">Firebase</h3>
              <p className="text-sm text-muted-foreground">Authentication & Database</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">shadcn/ui</h3>
              <p className="text-sm text-muted-foreground">Beautiful components</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">TypeScript</h3>
              <p className="text-sm text-muted-foreground">Type-safe development</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
