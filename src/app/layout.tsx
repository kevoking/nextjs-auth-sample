import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LaunchKit - Ship Faster, Build Better",
  description: "From idea to SaaS in minutes, not months. Complete starter kit with authentication, dashboard, analytics, team management, and subscriptions. Built with Next.js 15, TypeScript, and modern tools.",
  keywords: ["SaaS starter kit", "Next.js", "TypeScript", "Firebase", "authentication", "dashboard", "analytics", "team management", "subscriptions"],
  authors: [{ name: "LaunchKit Team" }],
  creator: "LaunchKit",
  openGraph: {
    title: "LaunchKit - Ship Faster, Build Better",
    description: "From idea to SaaS in minutes, not months. Complete starter kit with authentication, dashboard, analytics, team management, and subscriptions.",
    url: "https://launchkit.dev",
    siteName: "LaunchKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchKit - Ship Faster, Build Better",
    description: "From idea to SaaS in minutes, not months. Complete starter kit with authentication, dashboard, analytics, team management, and subscriptions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <AuthProvider>
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
