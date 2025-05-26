import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Select from '../Select'

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
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders select component with placeholder', () => {
    render(<Select {...defaultProps} />)
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  test('renders with label when provided', () => {
    render(<Select {...defaultProps} label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  test('displays helper text when provided', () => {
    render(<Select {...defaultProps} helperText="Helper text" />)
    expect(screen.getByText('Helper text')).toBeInTheDocument()
  })

  test('displays error text when error is true', () => {
    render(<Select {...defaultProps} error errorText="Error message" />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  test('should be disabled when disabled prop is true', () => {
    render(<Select {...defaultProps} disabled />)
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()
  })

  test('calls onChange when an option is selected', async () => {
    render(<Select {...defaultProps} />)

    // Open the select dropdown
    const trigger = screen.getByRole('combobox')
    await userEvent.click(trigger)

    // Select an option
    const option = screen.getByText('Option 1')
    await userEvent.click(option)

    expect(mockOnChange).toHaveBeenCalledWith('option1')
  })

  test('renders disabled option as non-interactive', async () => {
    render(<Select {...defaultProps} />)

    // Open the select dropdown
    const trigger = screen.getByRole('combobox')
    await userEvent.click(trigger)

    // Find the disabled option
    const disabledOption = screen.getByText('Option 3')
    expect(disabledOption.parentElement).toHaveAttribute('data-disabled')
  })
})
