import React from 'react'
import { render, screen } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/lib/auth'

// Simple test component that uses useAuth
const TestComponent = () => {
  const { user, loading } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'loading' : 'not loading'}</div>
      <div data-testid="user">{user ? `User: ${user.email}` : 'No user'}</div>
    </div>
  )
}

describe('AuthProvider', () => {
  it('provides authentication context', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Initially shows loading state
    expect(screen.getByTestId('loading')).toHaveTextContent('loading')
  })

  it('throws error when useAuth is used outside AuthProvider', () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within an AuthProvider')

    consoleSpy.mockRestore()
  })
})
