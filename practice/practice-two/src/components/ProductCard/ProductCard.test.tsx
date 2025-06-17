import { TextEncoder } from 'util'
global.TextEncoder = TextEncoder

import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import { useCartStore } from '@stores/cartStore'
import { useProductNavigation } from '@hooks/useProductNavigation'
import { MemoryRouter } from 'react-router-dom'

// Mock the hooks
jest.mock('@stores/cartStore')
jest.mock('@hooks/useProductNavigation')
jest.mock('@contexts/ToastContext', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

// Mock the star icon URLs
jest.mock('@components/ProductCard/ProductCard', () => {
  const actual = jest.requireActual(
    '../../../src/components/ProductCard/ProductCard'
  )
  return {
    ...actual,
    fullBlackStarIcon: 'test-full-star.svg',
    emptyStarIcon: 'test-empty-star.svg',
  }
})

const mockNavigateToProduct = jest.fn()
const mockAddItem = jest.fn()

// Sample product data
const sampleProduct = {
  id: 1,
  title: 'Fresh Apples',
  description: 'Delicious red apples',
  price: 3.99,
  originalPrice: 4.99,
  discountPercentage: 20,
  rating: 4,
  imageUrl: 'https://example.com/apple.jpg',
  category: 'Fruits & Vegetables',
  subcategory: 'Fruits',
  farm: 'Organic Farms',
  freshness: 'New Harvest',
  delivery: {
    time: '2-3 days',
    location: 'United States',
  },
  stock: '8 pcs',
  freeShipping: true,
  tags: ['organic', 'fresh'],
  brand: "Nature's Best",
  images: {
    main: 'https://example.com/apple.jpg',
    gallery: ['https://example.com/apple.jpg'],
  },
}

// Helper function to render the component with required providers
const renderProductCard = (props = {}) => {
  ;(useCartStore as unknown as jest.Mock).mockReturnValue({
    addItem: mockAddItem,
  })
  ;(useProductNavigation as jest.Mock).mockReturnValue({
    navigateToProduct: mockNavigateToProduct,
  })

  return render(
    <MemoryRouter>
      <ProductCard product={sampleProduct} viewMode="grid" {...props} />
    </MemoryRouter>
  )
}

describe('ProductCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering states', () => {
    // New test for star rendering
    it('renders the correct number of filled and empty stars based on rating', () => {
      // Render with a product that has a rating of 3 out of 5
      renderProductCard({
        product: { ...sampleProduct, rating: 3 },
      })

      // Get all star images
      const starImages = screen.getAllByAltText(/star/i)

      // Should have 5 stars total (for a 5-star rating system)
      expect(starImages).toHaveLength(5)

      // First 3 should be full stars
      expect(starImages[0]).toHaveAttribute('alt', 'Full star')
      expect(starImages[1]).toHaveAttribute('alt', 'Full star')
      expect(starImages[2]).toHaveAttribute('alt', 'Full star')

      // Last 2 should be empty stars
      expect(starImages[3]).toHaveAttribute('alt', 'Empty star')
      expect(starImages[4]).toHaveAttribute('alt', 'Empty star')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive behavior', () => {
    it('calls addItem when Buy now button is clicked', () => {
      renderProductCard({ viewMode: 'grid' })

      const buyButton = screen.getByText('Buy now')
      fireEvent.click(buyButton)

      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: 'Fresh Apples',
        }),
        1,
        'pcs'
      )
    })

    it('calls onAddToWishlist when Add to wish list button is clicked', () => {
      const mockWishlist = jest.fn()
      renderProductCard({ viewMode: 'list', onAddToWishlist: mockWishlist })

      const wishlistButton = screen.getByText('Add to wish list')
      fireEvent.click(wishlistButton)

      expect(mockWishlist).toHaveBeenCalled()
    })

    it('calls navigateToProduct when Product Detail button is clicked', () => {
      renderProductCard({ viewMode: 'list' })

      const detailButton = screen.getByText('Product Detail')
      fireEvent.click(detailButton)

      expect(mockNavigateToProduct).toHaveBeenCalledWith(sampleProduct)
    })

    it('calls onClick with product id when card is clicked', () => {
      const mockOnClick = jest.fn()
      renderProductCard({ onClick: mockOnClick })

      // Find the title element and then navigate to the card container
      const title = screen.getByText('Fresh Apples')
      const card = title.closest('[data-testid="product-card"]') || title
      fireEvent.click(card)

      expect(mockOnClick).toHaveBeenCalledWith(1)
    })

    it('calls navigateToProduct when card is clicked and no onClick prop is provided', () => {
      renderProductCard()

      // Find the card element and click it
      const title = screen.getByText('Fresh Apples')
      const card = title.closest('[data-testid="product-card"]') || title
      fireEvent.click(card)

      expect(mockNavigateToProduct).toHaveBeenCalledWith(sampleProduct)
    })

    it('prevents event propagation when action buttons are clicked', () => {
      const mockOnClick = jest.fn()
      renderProductCard({ onClick: mockOnClick, viewMode: 'grid' })

      // Click the Buy now button
      const buyButton = screen.getByText('Buy now')
      fireEvent.click(buyButton)

      // The onClick handler should not be called as the event should be stopped
      expect(mockOnClick).not.toHaveBeenCalled()
      // But the addItem function should be called
      expect(mockAddItem).toHaveBeenCalled()
    })
  })
})
