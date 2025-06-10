import { render, screen, fireEvent } from '@testing-library/react'
import TextField from './index'
import { Search } from 'lucide-react'

describe('TextField Component', () => {
  const defaultProps = {
    placeholder: 'Enter text...',
    onChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('renders all variants correctly', () => {
      // Default rendering
      const { container: defaultContainer } = render(
        <TextField {...defaultProps} />
      )
      expect(defaultContainer).toMatchSnapshot('default')

      // With left icon
      const { container: leftIconContainer } = render(
        <TextField
          {...defaultProps}
          icon={<Search data-testid="search-icon" />}
          iconPosition="left"
        />
      )
      expect(leftIconContainer).toMatchSnapshot('left-icon')

      // With right icon
      const { container: rightIconContainer } = render(
        <TextField
          {...defaultProps}
          icon={<Search data-testid="search-icon" />}
          iconPosition="right"
        />
      )
      expect(rightIconContainer).toMatchSnapshot('right-icon')

      // Search variant
      const { container: searchContainer } = render(
        <TextField {...defaultProps} variant="search" />
      )
      expect(searchContainer).toMatchSnapshot('search-variant')

      // Disabled state
      const { container: disabledContainer } = render(
        <TextField {...defaultProps} disabled />
      )
      expect(disabledContainer).toMatchSnapshot('disabled')

      // With value
      const { container: withValueContainer } = render(
        <TextField {...defaultProps} value="Prefilled value" />
      )
      expect(withValueContainer).toMatchSnapshot('with-value')

      // Required field
      const { container: requiredContainer } = render(
        <TextField {...defaultProps} required />
      )
      expect(requiredContainer).toMatchSnapshot('required')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive behavior', () => {
    it('handles user input correctly', () => {
      render(<TextField {...defaultProps} />)
      const input = screen.getByPlaceholderText('Enter text...')

      fireEvent.change(input, { target: { value: 'test input' } })

      expect(defaultProps.onChange).toHaveBeenCalledTimes(1)
      expect(input).toHaveValue('test input')
    })

    it('handles focus and blur events', () => {
      const onFocus = jest.fn()
      const onBlur = jest.fn()

      render(<TextField {...defaultProps} onFocus={onFocus} onBlur={onBlur} />)
      const input = screen.getByPlaceholderText('Enter text...')

      fireEvent.focus(input)
      expect(onFocus).toHaveBeenCalledTimes(1)

      fireEvent.blur(input)
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
  })
})
