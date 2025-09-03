import { render, screen, fireEvent } from '@testing-library/react'

import type { CartItem as CartItemType } from 'types/cart-items'
import CartItem from './CartItem'

jest.mock('@helpers/renderStar', () => ({
  renderStars: (rating: number) => (
    <div data-testid="star-rating">{rating} stars</div>
  ),
}))

jest.mock('@components/common/BuyingUnit/BuyingUnit', () => {
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
    images: { main: 'test-image.jpg', gallery: ['test-image.jpg'] }, // Add a mock image object
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

  it('matches the snapshot for basic rendering', () => {
    const { container } = render(<CartItem {...mockProps} />)
    expect(container).toMatchSnapshot()
  })

  // Add snapshots for different states
  it('matches snapshot without original price', () => {
    const itemWithoutOriginalPrice = {
      ...mockCartItem,
      originalPrice: undefined,
    }
    const { container } = render(
      <CartItem {...mockProps} item={itemWithoutOriginalPrice} />
    )
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with different unit', () => {
    const itemWithPcsUnit = {
      ...mockCartItem,
      buyUnit: 'pcs',
    }
    const { container } = render(
      <CartItem {...mockProps} item={itemWithPcsUnit} />
    )
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with high quantity', () => {
    const itemWithHighQuantity = {
      ...mockCartItem,
      quantity: 999,
    }
    const { container } = render(
      <CartItem {...mockProps} item={itemWithHighQuantity} />
    )
    expect(container).toMatchSnapshot()
  })

  it('calls onRemove when remove button is clicked', () => {
    render(<CartItem {...mockProps} />)
    const removeButton = screen.getByText('Remove')
    fireEvent.click(removeButton)
    expect(mockProps.onRemove).toHaveBeenCalledWith(1)
  })

  it('calls onQuantityChange when quantity is modified', () => {
    render(<CartItem {...mockProps} />)
    const increaseButton = screen.getByTestId('increase-quantity')
    fireEvent.click(increaseButton)
    expect(mockProps.onQuantityChange).toHaveBeenCalledWith(1, 3)

    const decreaseButton = screen.getByTestId('decrease-quantity')
    fireEvent.click(decreaseButton)
    expect(mockProps.onQuantityChange).toHaveBeenCalledWith(1, 1)
  })

  it('calls onUnitChange when unit is modified', () => {
    render(<CartItem {...mockProps} />)
    const unitSelector = screen.getByTestId('unit-selector')
    fireEvent.change(unitSelector, { target: { value: 'pcs' } })
    expect(mockProps.onUnitChange).toHaveBeenCalledWith(1, 'pcs')
  })
})
