import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUpForm from '@/components/auth/SignUpForm'

// Mock the auth context
const mockSignUp = jest.fn()
const mockSignInWithGoogle = jest.fn()
const mockRouter = { push: jest.fn() }

jest.mock('@/lib/auth', () => ({
  useAuth: () => ({
    signUp: mockSignUp,
    signInWithGoogle: mockSignInWithGoogle,
    user: null,
    loading: false,
  }),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders sign up form correctly', () => {
    render(<SignUpForm />)
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument()
  })

  it('validates name field', async () => {
    const user = userEvent.setup()
    render(<SignUpForm />)
    
    const nameInput = screen.getByLabelText(/full name/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(nameInput, 'A') // Less than 2 characters
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('validates email field', async () => {
    const user = userEvent.setup()
    render(<SignUpForm />)
    
    const emailInput = screen.getByLabelText(/^email$/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)
    
    // Form should not submit with invalid email
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('validates password confirmation', async () => {
    const user = userEvent.setup()
    render(<SignUpForm />)
    
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'differentpassword')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    mockSignUp.mockResolvedValueOnce(undefined)
    
    render(<SignUpForm />)
    
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe')
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('handles sign up error', async () => {
    const user = userEvent.setup()
    mockSignUp.mockRejectedValueOnce(new Error('Email already in use'))
    
    render(<SignUpForm />)
    
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'existing@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument()
    })
  })

  it('handles Google sign up', async () => {
    const user = userEvent.setup()
    mockSignInWithGoogle.mockResolvedValueOnce(undefined)
    
    render(<SignUpForm />)
    
    const googleButton = screen.getByRole('button', { name: /continue with google/i })
    await user.click(googleButton)
    
    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled()
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('disables form during submission', async () => {
    const user = userEvent.setup()
    mockSignUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<SignUpForm />)
    
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)
    
    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/creating account/i)).toBeInTheDocument()
  })
})
