import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './index'
import type { ReactNode } from 'react'

// Mock the Radix UI Spinner component
jest.mock('@radix-ui/themes', () => ({
  Spinner: ({ size }: { size: string }) => (
    <div data-testid="spinner" data-size={size}>
      Spinner
    </div>
  ),
  Theme: ({ children }: { children: ReactNode }) => (
    <div data-testid="theme-wrapper">{children}</div>
  ),
}))

// Mock the Text component
jest.mock('../Text/index', () => ({
  __esModule: true,
  default: ({ text, as }: { text: string; as: string }) => (
    <div data-testid="text-component" data-as={as}>
      {text}
    </div>
  ),
}))

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('displays the loading text', () => {
    render(<LoadingSpinner />)

    expect(screen.getByText('Loading product details...')).toBeInTheDocument()
  })

  it('renders the spinner with correct size', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('data-size', '3')
  })

  it('renders text as paragraph element', () => {
    render(<LoadingSpinner />)

    const textComponent = screen.getByTestId('text-component')
    expect(textComponent).toHaveAttribute('data-as', 'p')
  })

  it('matches snapshot', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with custom message', () => {
    const { container } = render(
      <LoadingSpinner message="Custom loading message" />
    )
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with different size', () => {
    const { container } = render(<LoadingSpinner size="2" />)
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with custom height', () => {
    const { container } = render(<LoadingSpinner minHeight="200px" />)
    expect(container).toMatchSnapshot()
  })
})
