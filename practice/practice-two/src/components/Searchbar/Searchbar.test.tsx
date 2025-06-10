import { TextEncoder } from 'util'
global.TextEncoder = TextEncoder
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchBar from './Searchbar'
import type { ReactElement } from 'react'

// Mock product data
jest.mock('@data/product-data', () => ({
  productData: [
    {
      id: '1',
      title: 'Apple',
      price: 1.99,
      imageUrl: '/apple.jpg',
      category: 'Fruits & Vegetables',
      subcategory: 'Fruits',
      description: 'Fresh red apple',
      tags: ['fruit', 'fresh'],
    },
    {
      id: '2',
      title: 'Banana',
      price: 0.99,
      imageUrl: '/banana.jpg',
      category: 'Fruits & Vegetables',
      subcategory: 'Fruits',
      description: 'Ripe yellow banana',
      tags: ['fruit', 'fresh'],
    },
    {
      id: '3',
      title: 'Sourdough Bread',
      price: 3.99,
      imageUrl: '/bread.jpg',
      category: 'Bakery',
      subcategory: 'Bread',
      description: 'Freshly baked sourdough bread',
      tags: ['bakery', 'bread'],
    },
  ],
}))

// Mock the navigation function
const mockNavigate = jest.fn()

// Mock the React Router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' }),
}))

const renderWithRouter = (ui: ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive behavior', () => {
    it('shows search results dropdown when typing matching query', () => {
      renderWithRouter(<SearchBar />)

      const input = screen.getByPlaceholderText(
        'Search Products, categories ...'
      )
      fireEvent.change(input, { target: { value: 'Apple' } })
      fireEvent.focus(input)

      // Check that results are displayed
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('$1.99')).toBeInTheDocument()
    })

    it('filters products by category when searching', () => {
      renderWithRouter(<SearchBar />)

      // First, select the 'Bakery' category
      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'bakery' } })

      // Then search for 'bread'
      const input = screen.getByPlaceholderText(
        'Search Products, categories ...'
      )
      fireEvent.change(input, { target: { value: 'bread' } })
      fireEvent.focus(input)

      // Should show the bakery item
      expect(screen.getByText('Sourdough Bread')).toBeInTheDocument()
      expect(screen.getByText('$3.99')).toBeInTheDocument()

      // Should not show fruits
      expect(screen.queryByText('Apple')).not.toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })

    it('navigates to product page when clicking on a search result', async () => {
      renderWithRouter(<SearchBar />)

      const input = screen.getByPlaceholderText(
        'Search Products, categories ...'
      )
      fireEvent.change(input, { target: { value: 'Apple' } })
      fireEvent.focus(input)

      const resultItem = screen.getByText('Apple')
      fireEvent.click(resultItem)

      // Wait for the navigation to happen (due to setTimeout in your component)
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          '/fruits-&-vegetables/fruits/1'
        )
      })
    })

    it('calls onSearch prop when performing search', () => {
      const onSearch = jest.fn()
      renderWithRouter(<SearchBar onSearch={onSearch} />)

      const input = screen.getByPlaceholderText(
        'Search Products, categories ...'
      )
      fireEvent.change(input, { target: { value: 'Apple' } })

      const searchButton = screen.getByRole('button', { name: /search/i })
      fireEvent.click(searchButton)

      expect(onSearch).toHaveBeenCalledWith('Apple')
    })

    it('does not show dropdown when query is empty', () => {
      renderWithRouter(<SearchBar />)

      const input = screen.getByPlaceholderText(
        'Search Products, categories ...'
      )
      fireEvent.change(input, { target: { value: '' } })
      fireEvent.focus(input)

      // Should not show any product items
      expect(screen.queryByText('Apple')).not.toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })

    it('closes mobile search mode when back button is clicked', () => {
      renderWithRouter(<SearchBar />)

      // First activate mobile search
      const input = screen.getByPlaceholderText(
        'Search Products, categories ...'
      )
      fireEvent.focus(input)

      // Find and click back button
      const backButton = screen
        .getAllByRole('button')
        .find((button) => button.innerHTML.includes('ChevronLeft'))

      if (backButton) {
        fireEvent.click(backButton)
      }

      // Check that mobile search header is no longer visible
      const mobileSearchHeaderAfterClose = screen
        .queryAllByRole('button')
        .find((button) => button.innerHTML.includes('ChevronLeft'))
      expect(mobileSearchHeaderAfterClose).toBeUndefined()
    })
  })
})
