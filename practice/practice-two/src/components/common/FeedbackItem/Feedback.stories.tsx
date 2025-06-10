import type { Meta, StoryObj } from '@storybook/react'
import { FeedbackItem } from './Feedback'

const meta: Meta<typeof FeedbackItem> = {
  title: 'Components/Feedback/FeedbackItem',
  component: FeedbackItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A feedback card component that displays customer testimonials with quotes and author information.',
      },
    },
  },
  argTypes: {
    quote: {
      description: 'The customer feedback quote',
      control: 'text',
    },
    name: {
      description: 'The name of the customer who gave the feedback',
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '24px',
          backgroundColor: '#f5f5f5',
          minHeight: '250px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FeedbackItem>

export const Default: Story = {
  args: {
    quote:
      'This is an amazing product! The quality exceeded my expectations and the delivery was super fast.',
    name: 'John Smith',
  },
}

export const ShortQuote: Story = {
  args: {
    quote: 'Great service!',
    name: 'Sarah Johnson',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Feedback item with a short quote to test minimal content layout',
      },
    },
  },
}

export const LongQuote: Story = {
  args: {
    quote:
      "I've been shopping here for years and the quality of products and customer service has always been exceptional. The team goes above and beyond to ensure customer satisfaction. I would definitely recommend this to anyone looking for reliable service and high-quality products. The entire experience from browsing to delivery has been seamless.",
    name: 'Michael Rodriguez',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Feedback item with a long quote to test content overflow and layout flexibility',
      },
    },
  },
}

export const SpecialCharacters: Story = {
  args: {
    quote:
      "Amazing product! 5 stars ⭐⭐⭐⭐⭐ - couldn't be happier with my purchase. The team really knows what they're doing!",
    name: 'André François-Martinez',
  },
  parameters: {
    docs: {
      description: {
        story: 'Feedback item with special characters and emojis',
      },
    },
  },
}

export const MultipleItems: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        padding: '20px 0',
      }}
    >
      <FeedbackItem
        quote="Outstanding service and quality products!"
        name="Emma Wilson"
      />
      <FeedbackItem
        quote="Fast delivery and excellent customer support. Highly recommended!"
        name="David Chen"
      />
      <FeedbackItem
        quote="Been a loyal customer for 3 years. Never disappointed!"
        name="Lisa Thompson"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple feedback items displayed together as they would appear in a carousel',
      },
    },
  },
}

export const EmptyContent: Story = {
  args: {
    quote: '',
    name: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case with empty content to test component resilience',
      },
    },
  },
}
