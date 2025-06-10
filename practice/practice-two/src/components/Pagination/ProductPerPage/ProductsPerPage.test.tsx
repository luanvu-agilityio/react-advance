import { fireEvent, render, screen } from '@testing-library/react'
import { ProductsPerPage } from './ProductsPerPage'
import { useCategoryStore } from '@stores/categoryStore'

// Mock the Zustand store
jest.mock('@stores/categoryStore', () => ({
  useCategoryStore: jest.fn(),
}))

// Mock the Select component
jest.mock('@components/common/Select', () => {
  return {
    __esModule: true,
    default: ({
      value,
      onChange,
      options,
    }: {
      value: string
      onChange: (value: string) => void
      options: Array<{ value: string; label: string; disabled?: boolean }>
    }) => (
      <div data-testid="mock-select">
        <span data-testid="current-value">{value}</span>
        {options.map((option) => (
          <button
            key={option.value}
            data-testid={`option-${option.value}`}
            onClick={() => onChange(option.value)}
            disabled={option.disabled}
          >
            {option.label}
          </button>
        ))}
      </div>
    ),
  }
})

describe('ProductsPerPage', () => {
  const mockSetDisplayLimit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Default mock implementation
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      displayLimit: 5,
      setDisplayLimit: mockSetDisplayLimit,
    })
  })

  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('renders different component states correctly', () => {
      // Default state (5 per page)
      const { container: defaultContainer } = render(<ProductsPerPage />)
      expect(defaultContainer).toMatchSnapshot('default-5-per-page')

      // With 10 per page selected
      ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
        displayLimit: 10,
        setDisplayLimit: mockSetDisplayLimit,
      })
      const { container: with10PerPage } = render(<ProductsPerPage />)
      expect(with10PerPage).toMatchSnapshot('with-10-per-page')

      // With 15 per page selected
      ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
        displayLimit: 15,
        setDisplayLimit: mockSetDisplayLimit,
      })
      const { container: with15PerPage } = render(<ProductsPerPage />)
      expect(with15PerPage).toMatchSnapshot('with-15-per-page')

      // With 20 per page selected
      ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
        displayLimit: 20,
        setDisplayLimit: mockSetDisplayLimit,
      })
      const { container: with20PerPage } = render(<ProductsPerPage />)
      expect(with20PerPage).toMatchSnapshot('with-20-per-page')

      // With invalid value
      ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
        displayLimit: NaN,
        setDisplayLimit: mockSetDisplayLimit,
      })
      const { container: withInvalidValue } = render(<ProductsPerPage />)
      expect(withInvalidValue).toMatchSnapshot('with-invalid-value')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive behavior', () => {
    it('calls setDisplayLimit with the correct numeric value when an option is selected', () => {
      render(<ProductsPerPage />)

      // Click option for 10 per page
      fireEvent.click(screen.getByTestId('option-10'))
      expect(mockSetDisplayLimit).toHaveBeenCalledWith(10)

      // Click option for 15 per page
      fireEvent.click(screen.getByTestId('option-15'))
      expect(mockSetDisplayLimit).toHaveBeenCalledWith(15)

      // Click option for 20 per page
      fireEvent.click(screen.getByTestId('option-20'))
      expect(mockSetDisplayLimit).toHaveBeenCalledWith(20)
    })

    it('displays the current displayLimit from the store', () => {
      // Set displayLimit to 15 in the store
      ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
        displayLimit: 15,
        setDisplayLimit: mockSetDisplayLimit,
      })

      render(<ProductsPerPage />)

      // Check that the current value is '15'
      expect(screen.getByTestId('current-value').textContent).toBe('15')
    })
  })
})
