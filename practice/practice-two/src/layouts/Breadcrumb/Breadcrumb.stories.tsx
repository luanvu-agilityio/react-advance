import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Breadcrumbs } from './Breadcrumb'
import type { BreadcrumbItem } from '@hooks/useBreadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Layout/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Navigation breadcrumb component that shows the current page hierarchy.',
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of breadcrumb items',
      control: 'object',
    },
    className: {
      description: 'Additional CSS class name',
      control: 'text',
    },
    style: {
      description: 'Inline styles',
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

// Sample breadcrumb items for stories
const sampleItems: BreadcrumbItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Electronics', path: '/products/electronics' },
  { label: 'Smartphones', path: '/products/electronics/smartphones' },
]

const shortItems: BreadcrumbItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
]

const singleItem: BreadcrumbItem[] = [{ label: 'Home', path: '/' }]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const ShortBreadcrumb: Story = {
  args: {
    items: shortItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with only two items',
      },
    },
  },
}

export const SingleItem: Story = {
  args: {
    items: singleItem,
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with only one item (typically the home page)',
      },
    },
  },
}

export const LongBreadcrumb: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Categories', path: '/categories' },
      { label: 'Electronics', path: '/categories/electronics' },
      { label: 'Computers', path: '/categories/electronics/computers' },
      { label: 'Laptops', path: '/categories/electronics/computers/laptops' },
      {
        label: 'Gaming Laptops',
        path: '/categories/electronics/computers/laptops/gaming',
      },
      {
        label: 'ASUS ROG Strix',
        path: '/categories/electronics/computers/laptops/gaming/asus-rog-strix',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with many items to test wrapping behavior',
      },
    },
  },
}

export const WithCustomStyle: Story = {
  args: {
    items: sampleItems,
    style: {
      backgroundColor: '#f5f5f5',
      padding: '16px',
      borderRadius: '8px',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with custom inline styles',
      },
    },
  },
}

export const WithCustomClass: Story = {
  args: {
    items: sampleItems,
    className: 'custom-breadcrumb',
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with custom CSS class',
      },
    },
  },
}

export const EmptyBreadcrumb: Story = {
  args: {
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with no items (edge case)',
      },
    },
  },
}
