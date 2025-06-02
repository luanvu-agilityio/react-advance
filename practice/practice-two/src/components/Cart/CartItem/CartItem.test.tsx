import { render, screen, fireEvent } from '@testing-library/react'

import type { CartItem as CartItemType } from '@contexts/CartContext'
import CartItem from './CartItem'

jest.mock('@helpers/renderStar', () => ({
  renderStars: jest.fn((rating: number) => (
    <div data-testid="star-rating" data-rating={rating}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? '★' : '☆'}</span>
      ))}
    </div>
  )),
}))

jest.mock('../../../pages/ProductDetails/components/BuyingUnit', () => {
  return function MockBuyingUnit({
    quantity,
    unit,
    onQuantityChange,
    onUnitChange,
    size,
  }: {
    quantity: number
    unit: string
    onQuantityChange: (quantity: number) => void
    onUnitChange: (unit: string) => void
    size?: 'small' | 'medium' | 'large'
  }) {
    return (
      <div data-testid="buying-unit" data-size={size}>
        <button
          data-testid="decrease-quantity"
          onClick={() => onQuantityChange(quantity - 1)}
        >
          -
        </button>
        <span data-testid="quantity-display">
          {quantity} {unit}
        </span>
        <button
          data-testid="increase-quantity"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </button>
        <select
          data-testid="unit-selector"
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
        >
          <option value="pcs">pcs</option>
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>
    )
  }
})

describe('CartItem Component', () => {
  const mockCartItem: CartItemType = {
    id: 1,
    title: 'Test Product',
    description: 'Test description',
    price: 9.99,
    originalPrice: 12.99,
    category: 'Test Category',
    subcategory: 'Test Subcategory',
    rating: 4,
    imageUrl: 'https://test-image.jpg',
    discountPercentage: 23,
    farm: 'Test Farm',
    freshness: 'Fresh (1 day)',
    delivery: {
      time: '1-2 days',
      location: 'All Countries',
    },
    stock: '50',
    freeShipping: true,
    quantity: 2,
    buyUnit: 'kg',
  }

  const mockProps = {
    item: mockCartItem,
    onQuantityChange: jest.fn(),
    onUnitChange: jest.fn(),
    onRemove: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders cart item with all basic information', () => {
    render(<CartItem {...mockProps} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Farm')).toBeInTheDocument()
    expect(screen.getByText('Fresh (1 day)')).toBeInTheDocument()
    expect(screen.getByText('9.99 USD')).toBeInTheDocument()
  })

  it('displays product image with correct src and alt', () => {
    render(<CartItem {...mockProps} />)

    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://test-image.jpg')
  })

  it('displays original price when available', () => {
    render(<CartItem {...mockProps} />)

    expect(screen.getByText('12.99 USD')).toBeInTheDocument()
    expect(screen.getByText('12.99 USD')).toHaveClass('original-price')
  })

  it('does not display original price when not available', () => {
    const itemWithoutOriginalPrice = {
      ...mockCartItem,
      originalPrice: undefined,
    }

    render(<CartItem {...mockProps} item={itemWithoutOriginalPrice} />)

    expect(screen.queryByText('12.99 USD')).not.toBeInTheDocument()
    expect(screen.getByText('9.99 USD')).toBeInTheDocument()
  })

  it('displays farm and freshness information', () => {
    render(<CartItem {...mockProps} />)

    expect(screen.getByText('Farm:')).toBeInTheDocument()
    expect(screen.getByText('Test Farm')).toBeInTheDocument()
    expect(screen.getByText('Freshness:')).toBeInTheDocument()
    expect(screen.getByText('Fresh (1 day)')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<CartItem {...mockProps} />)

    expect(screen.getByText('Wishlist')).toBeInTheDocument()
    expect(screen.getByText('Compare')).toBeInTheDocument()
    expect(screen.getByText('Remove')).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', () => {
    render(<CartItem {...mockProps} />)

    const removeButton = screen.getByText('Remove')
    fireEvent.click(removeButton)

    expect(mockProps.onRemove).toHaveBeenCalledWith(1)
  })

  it('renders BuyingUnit component with correct props', () => {
    render(<CartItem {...mockProps} />)

    const buyingUnit = screen.getByTestId('buying-unit')
    expect(buyingUnit).toBeInTheDocument()
    expect(buyingUnit).toHaveAttribute('data-size', 'small')
    expect(screen.getByTestId('quantity-display')).toHaveTextContent('2 kg')
  })

  it('calls onQuantityChange when quantity is modified', () => {
    render(<CartItem {...mockProps} />)

    const increaseButton = screen.getByTestId('increase-quantity')
    fireEvent.click(increaseButton)

    expect(mockProps.onQuantityChange).toHaveBeenCalledWith(1, 3)
  })

  it('calls onUnitChange when unit is modified', () => {
    render(<CartItem {...mockProps} />)

    const unitSelector = screen.getByTestId('unit-selector')
    fireEvent.change(unitSelector, { target: { value: 'pcs' } })

    expect(mockProps.onUnitChange).toHaveBeenCalledWith(1, 'pcs')
  })

  it('renders action button images with correct attributes', () => {
    render(<CartItem {...mockProps} />)

    const wishlistIcon = screen.getByAltText('Wishlist')
    const compareIcon = screen.getByAltText('Compare')
    const removeIcon = screen.getByAltText('Remove')

    expect(wishlistIcon).toHaveAttribute(
      'src',
      expect.stringContaining('wishlist')
    )
    expect(compareIcon).toHaveAttribute(
      'src',
      expect.stringContaining('compare')
    )
    expect(removeIcon).toHaveAttribute('src', expect.stringContaining('remove'))
  })

  it('handles high quantities', () => {
    const itemWithHighQuantity = {
      ...mockCartItem,
      quantity: 999,
    }

    render(<CartItem {...mockProps} item={itemWithHighQuantity} />)

    expect(screen.getByTestId('quantity-display')).toHaveTextContent('999 kg')
  })

  it('renders with different buying units', () => {
    const itemWithPcsUnit = {
      ...mockCartItem,
      buyUnit: 'pcs',
    }

    render(<CartItem {...mockProps} item={itemWithPcsUnit} />)

    expect(screen.getByTestId('quantity-display')).toHaveTextContent('2 pcs')
  })

  it('renders multiple cart items independently', () => {
    const secondItem = {
      ...mockCartItem,
      id: 2,
      title: 'Second Product',
    }

    const { rerender } = render(<CartItem {...mockProps} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()

    rerender(<CartItem {...mockProps} item={secondItem} />)
    expect(screen.getByText('Second Product')).toBeInTheDocument()
  })
})
