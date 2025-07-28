import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInForm from '@/components/auth/SignInForm'

// Mock the auth context
const mockSignIn = jest.fn()
const mockSignInWithGoogle = jest.fn()
const mockRouter = { push: jest.fn() }

jest.mock('@/lib/auth', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signInWithGoogle: mockSignInWithGoogle,
    user: null,
    loading: false,
  }),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

describe('SignInForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders sign in form correctly', () => {
    render(<SignInForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    mockSignIn.mockResolvedValueOnce(undefined)
    
    render(<SignInForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123')
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('handles sign in error', async () => {
    const user = userEvent.setup()
    mockSignIn.mockRejectedValueOnce(new Error('Invalid credentials'))
    
    render(<SignInForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  it('handles Google sign in', async () => {
    const user = userEvent.setup()
    mockSignInWithGoogle.mockResolvedValueOnce(undefined)
    
    render(<SignInForm />)
    
    const googleButton = screen.getByRole('button', { name: /continue with google/i })
    await user.click(googleButton)
    
    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled()
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('prevents invalid form submission', async () => {
    const user = userEvent.setup()
    
    render(<SignInForm />)
    
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)
    
    // Form should not submit with empty fields
    expect(mockSignIn).not.toHaveBeenCalled()
  })
})
