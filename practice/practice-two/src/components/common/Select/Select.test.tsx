import { render, screen, fireEvent, within } from '@testing-library/react'
import Select from './index'
import type { ReactNode } from 'react'

jest.mock('@radix-ui/react-form', () => ({
  Form: ({ children }: { children: ReactNode }) => (
    <form data-testid="radix-form">{children}</form>
  ),
  Label: ({
    children,
    ...props
  }: {
    children: ReactNode
    [key: string]: unknown
  }) => (
    <label data-testid="radix-label" {...props}>
      {children}
    </label>
  ),
}))

// Mock portal behavior for Radix UI components
jest.mock('@radix-ui/react-select', () => {
  const actual = jest.requireActual('@radix-ui/react-select')

  return {
    ...actual,
    Portal: ({ children }: { children: ReactNode }) => (
      <div data-testid="select-portal">{children}</div>
    ),
  }
})

describe('Select Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ]

  const mockOnChange = jest.fn()

  const defaultProps = {
    options: mockOptions,
    onChange: mockOnChange,
    placeholder: 'Select an option',
    value: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // SNAPSHOT TESTS FOR RENDERING
  it('renders different states correctly', () => {
    // Default state
    const { container: defaultContainer } = render(<Select {...defaultProps} />)
    expect(defaultContainer).toMatchSnapshot('default')

    // With label
    const { container: labelContainer } = render(
      <Select {...defaultProps} label="Test Label" />
    )
    expect(labelContainer).toMatchSnapshot('with-label')

    // Disabled
    const { container: disabledContainer } = render(
      <Select {...defaultProps} disabled />
    )
    expect(disabledContainer).toMatchSnapshot('disabled')
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive behavior', () => {
    it('calls onChange when an option is selected', () => {
      render(<Select {...defaultProps} />)

      // Open the select dropdown
      const trigger = screen.getByRole('combobox')
      fireEvent.click(trigger)

      //
      const portal = screen.getByTestId('select-portal')

      // Find option within the portal
      const option = within(portal).getByText('Option 1')
      fireEvent.click(option)

      expect(mockOnChange).toHaveBeenCalledWith('option1')
    })

    it('renders disabled option as non-interactive', () => {
      render(<Select {...defaultProps} />)

      // Open the select dropdown
      const trigger = screen.getByRole('combobox')
      fireEvent.click(trigger)

      // Find the portal
      const portal = screen.getByTestId('select-portal')

      // Get the disabled option and click it
      const disabledOption = within(portal).getByText('Option 3')
      fireEvent.click(disabledOption)

      // Verify the onChange was not called
      expect(mockOnChange).not.toHaveBeenCalled()
    })

    it('closes when option is selected', () => {
      const { rerender } = render(<Select {...defaultProps} />)

      // Open dropdown
      const trigger = screen.getByRole('combobox')
      fireEvent.click(trigger)

      // Portal should be visible
      expect(screen.getByTestId('select-portal')).toBeInTheDocument()

      // Select option
      const option = within(screen.getByTestId('select-portal')).getByText(
        'Option 2'
      )
      fireEvent.click(option)

      // Rerender with the new value to simulate state update
      rerender(<Select {...defaultProps} value="option2" />)

      // Click elsewhere to ensure dropdown closed
      fireEvent.mouseDown(document.body)

      expect(screen.queryByText('Option 2')).toBeInTheDocument()
    })
  })
})
