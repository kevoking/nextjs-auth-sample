// Types for jest-dom
import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveValue(value: string | number): R
      toBeVisible(): R
      toBeChecked(): R
      toHaveFocus(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
    }
  }
}
