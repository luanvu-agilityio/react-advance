import { render, screen } from '@testing-library/react'
import { FormError } from './FormError'

describe('FormError', () => {
  it('renders message when provided', () => {
    render(<FormError message="Email is required" />)
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('renders children when provided', () => {
    render(
      <FormError>
        <span data-testid="child-content">Custom error content</span>
      </FormError>
    )
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Custom error content')).toBeInTheDocument()
  })

  it('renders message rather than children when both are provided', () => {
    render(
      <FormError message="This message should display">
        <span>This content should not display</span>
      </FormError>
    )
    expect(screen.getByText('This message should display')).toBeInTheDocument()
    expect(
      screen.queryByText('This content should not display')
    ).not.toBeInTheDocument()
  })

  it('returns null when neither message nor children are provided', () => {
    const { container } = render(<FormError />)
    expect(container.firstChild).toBeNull()
  })
})
