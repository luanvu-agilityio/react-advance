import { render, screen, fireEvent } from '@testing-library/react'
import { Sorting } from './Sorting'
import { useCategoryStore } from '@stores/categoryStore'

// Mock the Select component
jest.mock('@components/common/Select', () => {
  return {
    __esModule: true,
    default: jest.fn(({ onChange, value }) => (
      <div data-testid="select-mock">
        <select
          value={value}
          data-testid="mock-select-element"
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    )),
  }
})

// Mock the Zustand store
jest.mock('@stores/categoryStore', () => ({
  useCategoryStore: jest.fn(),
}))

describe('Sorting', () => {
  // Mock store functions
  const mockSetSortBy = jest.fn()
  const mockSetSortOrder = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementation
    ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
      sortBy: 'name',
      sortOrder: 'asc',
      setSortBy: mockSetSortBy,
      setSortOrder: mockSetSortOrder,
    })
  })

  // Snapshot tests
  describe('rendering', () => {
    test('renders correctly with default values', () => {
      const { asFragment } = render(<Sorting />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('renders correctly with price sorting', () => {
      ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
        sortBy: 'price',
        sortOrder: 'asc',
        setSortBy: mockSetSortBy,
        setSortOrder: mockSetSortOrder,
      })

      const { asFragment } = render(<Sorting />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('renders correctly with descending order', () => {
      ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
        sortBy: 'name',
        sortOrder: 'desc',
        setSortBy: mockSetSortBy,
        setSortOrder: mockSetSortOrder,
      })

      const { asFragment } = render(<Sorting />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  // Interaction tests
  describe('interactions', () => {
    test('calls setSortBy when dropdown value changes', () => {
      render(<Sorting />)

      // Find the select element in our mock
      const selectElement = screen.getByTestId('mock-select-element')

      // Trigger change event
      fireEvent.change(selectElement, { target: { value: 'price' } })

      expect(mockSetSortBy).toHaveBeenCalledWith('price')
    })

    test('calls setSortOrder with "desc" when descending option is clicked', () => {
      render(<Sorting />)
      const descRadio = screen.getByLabelText('Descending')

      fireEvent.click(descRadio)

      expect(mockSetSortOrder).toHaveBeenCalledWith('desc')
    })

    test('calls setSortOrder with "asc" when ascending option is clicked', () => {
      // Setup with desc initial value
      ;(useCategoryStore as unknown as jest.Mock).mockReturnValue({
        sortBy: 'name',
        sortOrder: 'desc',
        setSortBy: mockSetSortBy,
        setSortOrder: mockSetSortOrder,
      })

      render(<Sorting />)
      const ascRadio = screen.getByLabelText('Ascending')

      fireEvent.click(ascRadio)

      expect(mockSetSortOrder).toHaveBeenCalledWith('asc')
    })
  })
})
