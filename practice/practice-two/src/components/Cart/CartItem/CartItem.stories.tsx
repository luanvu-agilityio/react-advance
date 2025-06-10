import type { Meta, StoryObj } from '@storybook/react'
import type { CartItem as CartItemType } from 'types/cart-items'
import CartItem from './CartItem'

const meta: Meta<typeof CartItem> = {
  title: 'Components/Cart/CartItem',
  component: CartItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A cart item component that displays product information, actions, and quantity controls in the shopping cart.',
      },
    },
  },
  argTypes: {
    item: {
      description: 'Cart item data object',
      control: 'object',
    },
    onQuantityChange: {
      description: 'Callback function when quantity changes',
      action: 'quantity changed',
    },
    onUnitChange: {
      description: 'Callback function when unit changes',
      action: 'unit changed',
    },
    onRemove: {
      description: 'Callback function when item is removed',
      action: 'item removed',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '600px',
          padding: '16px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CartItem>

// Sample cart item data
const baseCartItem: CartItemType = {
  id: 1,
  title: 'Fresh Organic Tomatoes',
  description: 'Premium quality organic tomatoes',
  price: 4.99,
  originalPrice: 6.99,
  category: 'Vegetables',
  subcategory: 'Fresh Produce',
  rating: 4,
  imageUrl:
    'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372403/tomato_sample.jpg',
  discountPercentage: 29,
  farm: 'Green Valley Farm',
  freshness: 'New (1 day)',
  delivery: {
    time: '1-2 days',
    location: 'All Countries',
  },
  stock: '50',
  freeShipping: true,
  quantity: 2,
  buyUnit: 'kg',
}

export const Default: Story = {
  args: {
    item: baseCartItem,
    onQuantityChange: (id, quantity) =>
      console.log('Quantity changed:', id, quantity),
    onUnitChange: (id, unit) => console.log('Unit changed:', id, unit),
    onRemove: (id) => console.log('Remove item:', id),
  },
}

export const WithDiscount: Story = {
  args: {
    item: {
      ...baseCartItem,
      title: 'Premium Organic Apples',
      price: 3.99,
      originalPrice: 5.99,
      farm: 'Mountain View Orchard',
      freshness: 'Fresh (2 days)',
      rating: 5,
      discountPercentage: 33,
    },
    onQuantityChange: (id, quantity) =>
      console.log('Quantity changed:', id, quantity),
    onUnitChange: (id, unit) => console.log('Unit changed:', id, unit),
    onRemove: (id) => console.log('Remove item:', id),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Cart item with a discount showing both original and current price',
      },
    },
  },
}

export const NoDiscount: Story = {
  args: {
    item: {
      ...baseCartItem,
      title: 'Fresh Bananas',
      price: 2.49,
      originalPrice: undefined,
      farm: 'Tropical Farms',
      freshness: 'Fresh (1 day)',
      rating: 4,
      discountPercentage: 0,
    },
    onQuantityChange: (id, quantity) =>
      console.log('Quantity changed:', id, quantity),
    onUnitChange: (id, unit) => console.log('Unit changed:', id, unit),
    onRemove: (id) => console.log('Remove item:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Cart item without any discount or original price',
      },
    },
  },
}

export const HighQuantity: Story = {
  args: {
    item: {
      ...baseCartItem,
      title: 'Bulk Rice Package',
      quantity: 10,
      buyUnit: 'kg',
      price: 12.99,
      farm: 'Golden Grain Farm',
    },
    onQuantityChange: (id, quantity) =>
      console.log('Quantity changed:', id, quantity),
    onUnitChange: (id, unit) => console.log('Unit changed:', id, unit),
    onRemove: (id) => console.log('Remove item:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Cart item with high quantity',
      },
    },
  },
}

export const DifferentUnits: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CartItem
        item={{ ...baseCartItem, buyUnit: 'pcs', title: 'Individual Apples' }}
        onQuantityChange={(id, quantity) =>
          console.log('Quantity changed:', id, quantity)
        }
        onUnitChange={(id, unit) => console.log('Unit changed:', id, unit)}
        onRemove={(id) => console.log('Remove item:', id)}
      />
      <CartItem
        item={{ ...baseCartItem, id: 2, buyUnit: 'kg', title: 'Bulk Potatoes' }}
        onQuantityChange={(id, quantity) =>
          console.log('Quantity changed:', id, quantity)
        }
        onUnitChange={(id, unit) => console.log('Unit changed:', id, unit)}
        onRemove={(id) => console.log('Remove item:', id)}
      />
      <CartItem
        item={{ ...baseCartItem, id: 3, buyUnit: 'lb', title: 'Premium Beef' }}
        onQuantityChange={(id, quantity) =>
          console.log('Quantity changed:', id, quantity)
        }
        onUnitChange={(id, unit) => console.log('Unit changed:', id, unit)}
        onRemove={(id) => console.log('Remove item:', id)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple cart items with different buying units',
      },
    },
  },
}

export const HighRating: Story = {
  args: {
    item: {
      ...baseCartItem,
      title: 'Premium Organic Avocados',
      rating: 5,
      price: 8.99,
      farm: 'California Premium Farms',
      freshness: 'Perfect (today)',
    },
    onQuantityChange: (id, quantity) =>
      console.log('Quantity changed:', id, quantity),
    onUnitChange: (id, unit) => console.log('Unit changed:', id, unit),
    onRemove: (id) => console.log('Remove item:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Cart item with perfect 5-star rating',
      },
    },
  },
}

export const InteractiveDemo: Story = {
  args: {
    item: baseCartItem,
    onQuantityChange: (id, quantity) => {
      console.log('Quantity changed:', id, quantity)
      // In a real app, this would update the cart state
    },
    onUnitChange: (id, unit) => {
      console.log('Unit changed:', id, unit)
      // In a real app, this would update the cart state
    },
    onRemove: (id) => {
      console.log('Remove item:', id)
      alert('Item would be removed from cart')
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive cart item with working buttons (check console/alerts)',
      },
    },
  },
}
