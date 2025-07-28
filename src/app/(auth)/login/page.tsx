import SignInForm from '@/components/auth/SignInForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-description">
            Sign in to your account to continue
          </p>
        </div>
        
        <SignInForm />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
