import { render, screen, fireEvent } from '@testing-library/react'
import TextField from '../TextField'
import { Search } from 'lucide-react'

describe('TextField Component', () => {
  const defaultProps = {
    placeholder: 'Enter text...',
    onChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly with default props', () => {
    render(<TextField {...defaultProps} />)
    const input = screen.getByPlaceholderText('Enter text...')

    expect(input).toBeInTheDocument()
    expect(input).not.toHaveAttribute('fullWidth')
    expect(input.parentElement).toHaveStyle({
      backgroundColor: 'var(--black-shade-4)',
    })
  })

  test('handles user input correctly', () => {
    render(<TextField {...defaultProps} />)
    const input = screen.getByPlaceholderText('Enter text...')

    fireEvent.change(input, { target: { value: 'test input' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(input).toHaveValue('test input')
  })

  test('renders with left icon correctly', () => {
    render(
      <TextField
        {...defaultProps}
        icon={<Search data-testid="search-icon" />}
        iconPosition="left"
      />
    )

    const icon = screen.getByTestId('search-icon')
    const input = screen.getByPlaceholderText('Enter text...')

    expect(icon).toBeInTheDocument()
    expect(icon.parentElement).toHaveStyle({ left: '0.75rem' })
    expect(input).toHaveStyle({ paddingLeft: '3.5rem' })
  })

  test('renders with right icon correctly', () => {
    render(
      <TextField
        {...defaultProps}
        icon={<Search data-testid="search-icon" />}
        iconPosition="right"
      />
    )

    const icon = screen.getByTestId('search-icon')
    const input = screen.getByPlaceholderText('Enter text...')

    expect(icon).toBeInTheDocument()
    expect(icon.parentElement).toHaveStyle({ right: '0' })
    expect(input).toHaveStyle({ paddingRight: '2.5rem' })
  })

  test('applies search variant styles correctly', () => {
    render(<TextField {...defaultProps} variant="search" />)
    const container = screen.getByPlaceholderText('Enter text...').parentElement

    expect(container).toHaveStyle({ backgroundColor: 'transparent' })
  })

  test('handles disabled state correctly', () => {
    render(<TextField {...defaultProps} disabled />)
    const input = screen.getByPlaceholderText('Enter text...')

    expect(input).toBeDisabled()
  })

  test('handles focus and blur events', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()

    render(<TextField {...defaultProps} onFocus={onFocus} onBlur={onBlur} />)
    const input = screen.getByPlaceholderText('Enter text...')

    fireEvent.focus(input)
    expect(onFocus).toHaveBeenCalled()

    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalled()
  })
})
