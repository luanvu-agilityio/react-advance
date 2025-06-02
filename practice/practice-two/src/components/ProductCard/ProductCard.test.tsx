import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import { useCart } from '@contexts/CartContext'
import { useProductNavigation } from '@hooks/useProductNavigation'
import { MemoryRouter } from 'react-router-dom'

// Mock the hooks
jest.mock('@contexts/CartContext')
jest.mock('@hooks/useProductNavigation')

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
}

// Helper function to render the component with required providers
const renderProductCard = (props = {}) => {
  ;(useCart as jest.Mock).mockReturnValue({
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

  it('renders product information correctly in grid view', () => {
    renderProductCard({ viewMode: 'grid' })

    expect(screen.getByText('Fresh Apples')).toBeInTheDocument()
    expect(screen.getByText('$3.99')).toBeInTheDocument()
    expect(screen.getByText('$4.99')).toBeInTheDocument()
    expect(screen.getByText('- 20 %')).toBeInTheDocument()
    expect(screen.getByAltText('Fresh Apples')).toHaveAttribute(
      'src',
      'https://example.com/apple.jpg'
    )
  })

  it('renders product information correctly in list view', () => {
    renderProductCard({ viewMode: 'list' })

    expect(screen.getByText('Fresh Apples')).toBeInTheDocument()
    expect(screen.getByText('Delicious red apples')).toBeInTheDocument()
    expect(screen.getByText('$3.99')).toBeInTheDocument()
    expect(screen.getByText('Free Shipping')).toBeInTheDocument()
    expect(screen.getByText('Delivery in 2-3 days')).toBeInTheDocument()
  })

  it('shows product details in list view', () => {
    renderProductCard({ viewMode: 'list' })

    expect(screen.getByText('Farm')).toBeInTheDocument()
    expect(screen.getByText('Organic Farms')).toBeInTheDocument()
    expect(screen.getByText('Freshness')).toBeInTheDocument()
    expect(screen.getByText('New Harvest')).toBeInTheDocument()
    expect(screen.getByText('Stock')).toBeInTheDocument()
    expect(screen.getByText('8 pcs')).toBeInTheDocument()
  })

  it('displays correct buttons in grid view', () => {
    renderProductCard({ viewMode: 'grid' })

    expect(screen.getByText('Buy now')).toBeInTheDocument()
    expect(screen.queryByText('Product Detail')).not.toBeInTheDocument()
  })

  it('displays correct buttons in list view', () => {
    renderProductCard({ viewMode: 'list' })

    expect(screen.getByText('Product Detail')).toBeInTheDocument()
    expect(screen.queryByText('Buy now')).not.toBeInTheDocument()
  })

  it('shows wishlist button when onAddToWishlist is provided in list view', () => {
    const mockWishlist = jest.fn()
    renderProductCard({ viewMode: 'list', onAddToWishlist: mockWishlist })

    expect(screen.getByText('Add to wish list')).toBeInTheDocument()
  })

  it('renders correct number of stars based on rating', () => {
    renderProductCard()

    // Check that we have 5 stars in total
    const stars = screen.getAllByTestId(/star-icon/)
    expect(stars.length).toBe(5)
  })

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

  it('clicking Product Detail button navigates to product page', () => {
    renderProductCard({ viewMode: 'list' })

    const detailButton = screen.getByText('Product Detail')
    fireEvent.click(detailButton)

    expect(mockNavigateToProduct).toHaveBeenCalledWith(sampleProduct)
  })
})
