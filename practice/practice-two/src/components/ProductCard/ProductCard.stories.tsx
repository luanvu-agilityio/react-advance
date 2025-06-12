import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard } from './ProductCard'
import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '@contexts/CartContext'
import { useState, type ComponentType } from 'react'
import { ToastProvider } from '@contexts/ToastContext'
// Sample products for display
const productBase = {
  id: 1,
  title: 'Green Apples',
  description: 'Fresh green apples from local farms',
  price: 3.99,
  rating: 4,
  imageUrl:
    'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372433/product_opkufp.png',
  category: 'Fruits & Vegetables',
  subcategory: 'Fruits',
  tags: ['organic', 'fresh'],
  originalPrice: 3.99,
  delivery: {
    time: 'N/A',
    location: 'N/A',
  },
  freshness: 'N/A',
  farm: 'N/A',
  stock: 'N/A',
  freeShipping: false,
  discountPercentage: 0,
  brand: 'Local Farms',
}

const productWithExtras = {
  ...productBase,
  originalPrice: 5.49,
  discountPercentage: 27,
  farm: 'Freshness Farm',
  freshness: 'New Harvest',
  delivery: {
    time: '2-3 days',
    location: 'United States',
  },
  stock: '10 kg',
  freeShipping: true,
}

// Set up action mocks

// Create a decorator to provide mocked contexts
const withProviders = (Story: ComponentType) => {
  return (
    <MemoryRouter>
      <ToastProvider>
        <CartProvider>
          <div style={{ maxWidth: '800px', padding: '20px' }}>
            <Story />
          </div>
        </CartProvider>
      </ToastProvider>
    </MemoryRouter>
  )
}

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Product card component with grid and list view modes.',
      },
    },
  },
  decorators: [withProviders],
  argTypes: {
    viewMode: {
      options: ['grid', 'list'],
      control: { type: 'radio' },
      description: 'Display mode for the product card',
    },
    onAddToWishlist: { action: 'addToWishlist' },
    onClick: { action: 'cardClicked' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProductCard>

// Basic product card in grid view
export const GridView: Story = {
  args: {
    product: productBase,
    viewMode: 'grid',
    onAddToWishlist: action('addToWishlist'),
    onClick: action('cardClicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Product card in grid view with basic information.',
      },
    },
  },
}

// Product card in list view
export const ListView: Story = {
  args: {
    product: productWithExtras,
    viewMode: 'list',
    onAddToWishlist: action('addToWishlist'),
    onClick: action('cardClicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Product card in list view with detailed information.',
      },
    },
  },
}

// Product with discount
export const WithDiscount: Story = {
  args: {
    product: {
      ...productBase,
      originalPrice: 5.49,
      discountPercentage: 27,
    },
    viewMode: 'grid',
    onClick: action('cardClicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Product card displaying discounted price.',
      },
    },
  },
}

// Product with free shipping
export const WithFreeShipping: Story = {
  args: {
    product: {
      ...productBase,
      freeShipping: true,
      delivery: { time: '1-2 days', location: 'United States' },
    },
    viewMode: 'list',
    onClick: action('cardClicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Product card with free shipping in list view.',
      },
    },
  },
}

// Product with high rating
export const FiveStarRating: Story = {
  args: {
    product: {
      ...productBase,
      rating: 5,
      title: '5-Star Premium Tomatoes',
    },
    viewMode: 'grid',
    onClick: action('cardClicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Product with 5-star rating.',
      },
    },
  },
}

// Interactive story - add to cart demonstration
export const InteractiveButtons: Story = {
  render: (args) => {
    // Create a component that handles its own state
    const InteractiveCard = () => {
      const [inWishlist, setInWishlist] = useState(false)
      const [inCart, setInCart] = useState(false)

      const handleAddToCart = () => {
        setInCart(!inCart)
        action('cartToggled')(inCart ? 'Removed from cart' : 'Added to cart')
      }

      const handleWishlist = () => {
        setInWishlist(!inWishlist)
        action('wishlistToggled')(
          inWishlist ? 'Removed from wishlist' : 'Added to wishlist'
        )
      }

      return (
        <div>
          <ProductCard
            {...args}
            product={productWithExtras}
            onAddToWishlist={handleWishlist}
            onClick={handleAddToCart}
          />
          <div style={{ marginTop: '20px' }}>
            <div>Status:</div>
            <div style={{ color: inCart ? 'green' : 'gray' }}>
              {inCart ? '✓ In Cart' : '○ Not in Cart'}
            </div>
            <div style={{ color: inWishlist ? 'red' : 'gray' }}>
              {inWishlist ? '❤️ In Wishlist' : '○ Not in Wishlist'}
            </div>
          </div>
        </div>
      )
    }

    return <InteractiveCard />
  },
  args: {
    viewMode: 'list',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of product card actions with state feedback.',
      },
    },
  },
}

// Responsive comparison
export const ResponsiveComparison: Story = {
  render: () => (
    <div>
      <h3>Grid View</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <ProductCard
          product={productBase}
          viewMode="grid"
          onClick={action('gridCardClicked')}
        />
        <ProductCard
          product={productWithExtras}
          viewMode="grid"
          onClick={action('gridCardClicked')}
        />
      </div>

      <h3>List View</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ProductCard
          product={productBase}
          viewMode="list"
          onClick={action('listCardClicked')}
          onAddToWishlist={action('addToWishlist')}
        />
        <ProductCard
          product={productWithExtras}
          viewMode="list"
          onClick={action('listCardClicked')}
          onAddToWishlist={action('addToWishlist')}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between grid and list view modes.',
      },
    },
  },
}
