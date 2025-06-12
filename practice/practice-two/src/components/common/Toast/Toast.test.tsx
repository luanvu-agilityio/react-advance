import { act, fireEvent, render, screen } from '@testing-library/react'
import { ToastContainer } from './Toast'
import type { Toast } from './Toast'

// SNAPSHOT TESTS FOR RENDERING

describe('Toast Component - Rendering', () => {
  // Sample toast data for testing
  const successToast: Toast = {
    id: 'test-id-1',
    title: 'Success Toast',
    description: 'This is a success message',
    variant: 'success',
  }

  const errorToast: Toast = {
    id: 'test-id-2',
    title: 'Error Toast',
    description: 'This is an error message',
    variant: 'error',
  }

  const warningToast: Toast = {
    id: 'test-id-3',
    title: 'Warning Toast',
    variant: 'warning',
  }

  const infoToast: Toast = {
    id: 'test-id-4',
    title: 'Info Toast',
    variant: 'info',
  }

  test('matches snapshot for success toast', () => {
    const { container } = render(
      <ToastContainer toasts={[successToast]} onRemoveToast={jest.fn()} />
    )
    expect(container).toMatchSnapshot()
  })

  test('matches snapshot for error toast', () => {
    const { container } = render(
      <ToastContainer toasts={[errorToast]} onRemoveToast={jest.fn()} />
    )
    expect(container).toMatchSnapshot()
  })

  test('matches snapshot for warning toast', () => {
    const { container } = render(
      <ToastContainer toasts={[warningToast]} onRemoveToast={jest.fn()} />
    )
    expect(container).toMatchSnapshot()
  })

  test('matches snapshot for info toast', () => {
    const { container } = render(
      <ToastContainer toasts={[infoToast]} onRemoveToast={jest.fn()} />
    )
    expect(container).toMatchSnapshot()
  })

  test('renders toast with correct title', () => {
    render(<ToastContainer toasts={[successToast]} onRemoveToast={jest.fn()} />)
    expect(screen.getByText('Success Toast')).toBeInTheDocument()
  })

  test('renders toast with description when provided', () => {
    render(<ToastContainer toasts={[successToast]} onRemoveToast={jest.fn()} />)
    expect(screen.getByText('This is a success message')).toBeInTheDocument()
  })

  test('renders toast without description', () => {
    render(<ToastContainer toasts={[warningToast]} onRemoveToast={jest.fn()} />)
    expect(screen.getByText('Warning Toast')).toBeInTheDocument()
    expect(screen.queryByText(/this is a/i)).not.toBeInTheDocument()
  })

  test('renders multiple toasts when provided', () => {
    render(
      <ToastContainer
        toasts={[successToast, errorToast, warningToast]}
        onRemoveToast={jest.fn()}
      />
    )
    expect(screen.getByText('Success Toast')).toBeInTheDocument()
    expect(screen.getByText('Error Toast')).toBeInTheDocument()
    expect(screen.getByText('Warning Toast')).toBeInTheDocument()
  })

  test('applies correct color to toast title based on variant', () => {
    const { rerender } = render(
      <ToastContainer toasts={[successToast]} onRemoveToast={jest.fn()} />
    )

    // Check success color
    const successTitle = screen.getByText('Success Toast')
    expect(successTitle).toHaveStyle({ color: '#2B9348' })

    // Check error color
    rerender(<ToastContainer toasts={[errorToast]} onRemoveToast={jest.fn()} />)
    const errorTitle = screen.getByText('Error Toast')
    expect(errorTitle).toHaveStyle({ color: '#D00000' })

    // Check warning color
    rerender(
      <ToastContainer toasts={[warningToast]} onRemoveToast={jest.fn()} />
    )
    const warningTitle = screen.getByText('Warning Toast')
    expect(warningTitle).toHaveStyle({ color: '#E85D04' })

    // Check info color
    rerender(<ToastContainer toasts={[infoToast]} onRemoveToast={jest.fn()} />)
    const infoTitle = screen.getByText('Info Toast')
    expect(infoTitle).toHaveStyle({ color: '#1E88E5' })
  })
})

jest.useFakeTimers()

// INTERACTIVE BEHAVIOR TESTS
describe('Toast Component - Interactive', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  test('calls onRemoveToast when close button is clicked', async () => {
    const mockOnRemoveToast = jest.fn()
    const mockToast: Toast = {
      id: 'test-id-1',
      title: 'Test Toast',
      variant: 'success',
    }

    render(
      <ToastContainer toasts={[mockToast]} onRemoveToast={mockOnRemoveToast} />
    )

    // Use fireEvent instead of userEvent for simpler synchronous behavior
    const closeButton = screen.getByText('×')
    fireEvent.click(closeButton)

    // Assert immediately after click without waiting
    expect(mockOnRemoveToast).toHaveBeenCalledWith('test-id-1')
  })

  test('automatically removes toast after custom duration', () => {
    const mockOnRemoveToast = jest.fn()
    const mockToast: Toast = {
      id: 'test-id-1',
      title: 'Test Toast',
      variant: 'success',
      duration: 1000, // 1 second
    }

    render(
      <ToastContainer toasts={[mockToast]} onRemoveToast={mockOnRemoveToast} />
    )

    // Fast-forward past the toast duration
    act(() => {
      jest.advanceTimersByTime(1100) // Just over 1 second
    })

    // The onOpenChange callback should be triggered, calling onClose
    expect(mockOnRemoveToast).toHaveBeenCalledWith('test-id-1')
  })

  test('uses default duration when not specified', () => {
    const mockOnRemoveToast = jest.fn()
    const mockToast: Toast = {
      id: 'test-id-1',
      title: 'Test Toast',
      variant: 'success',
      // No duration specified, should use default 3000ms
    }

    render(
      <ToastContainer toasts={[mockToast]} onRemoveToast={mockOnRemoveToast} />
    )

    // Fast-forward but not enough (shouldn't close)
    act(() => {
      jest.advanceTimersByTime(2000) // 2 seconds
    })
    expect(mockOnRemoveToast).not.toHaveBeenCalled()

    // Fast-forward past the default duration
    act(() => {
      jest.advanceTimersByTime(1500) // 3.5 seconds total
    })

    // Should be called now
    expect(mockOnRemoveToast).toHaveBeenCalledWith('test-id-1')
  })
})
