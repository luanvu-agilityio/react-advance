import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './index'
<<<<<<< HEAD
import type { ReactNode } from 'react'
=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d

// Mock the Radix UI Spinner component
jest.mock('@radix-ui/themes', () => ({
  Spinner: ({ size }: { size: string }) => (
    <div data-testid="spinner" data-size={size}>
      Spinner
    </div>
  ),
<<<<<<< HEAD
  Theme: ({ children }: { children: ReactNode }) => (
=======
  Theme: ({ children }: { children: React.ReactNode }) => (
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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

<<<<<<< HEAD
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
=======
  it('wraps components in Theme provider', () => {
    render(<LoadingSpinner />)

    expect(screen.getByTestId('theme-wrapper')).toBeInTheDocument()
  })

  it('has proper container structure', () => {
    const { container } = render(<LoadingSpinner />)

    // Check if LoadingContainer is the root element
    const loadingContainer = container.firstChild
    expect(loadingContainer).toBeInTheDocument()

    // Check if SpinnerWrapper is inside LoadingContainer
    const spinnerWrapper = screen.getByTestId('theme-wrapper').parentElement
    expect(spinnerWrapper).toBeInTheDocument()
  })

  it('renders all required components', () => {
    render(<LoadingSpinner />)

    // Check all components are rendered
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByTestId('text-component')).toBeInTheDocument()
    expect(screen.getByTestId('theme-wrapper')).toBeInTheDocument()
    expect(screen.getByText('Loading product details...')).toBeInTheDocument()
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  })
})
