import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test'
import ProductTabs from './Tabs'

const meta: Meta<typeof ProductTabs> = {
  title: 'Components/ProductDetails/ProductTabs',
  component: ProductTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A tabbed interface for displaying product information including description, reviews, and questions.',
      },
    },
  },
  argTypes: {
    description: {
      description:
        'Product description with origins, cooking info, and vitamins',
    },
    reviews: {
      description: 'Customer reviews with count and items',
    },
    questions: {
      description: 'FAQ section with count and items',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProductTabs>

// Mock data
const mockDescription = {
  origins:
    'Fresh vegetables sourced from local organic farms in California. Grown using sustainable farming practices without harmful pesticides.',
  cookingInfo:
    'Can be eaten raw in salads or cooked by steaming for 3-5 minutes. Roasting at 400°F for 15-20 minutes brings out natural sweetness.',
  vitamins: [
    { name: 'Vitamin C', quantity: '89.2mg', dv: '99%' },
    { name: 'Vitamin K', quantity: '102μg', dv: '85%' },
    { name: 'Folate', quantity: '57μg', dv: '14%' },
    { name: 'Vitamin A', quantity: '623IU', dv: '12%' },
  ],
}

const mockReviews = {
  count: 3,
  items: [
    {
      author: 'Sarah Johnson',
      date: '2024-01-15',
      rating: 5,
      comment:
        'Excellent quality! Very fresh and crisp. Perfect for my salads.',
    },
    {
      author: 'Mike Chen',
      date: '2024-01-10',
      rating: 4,
      comment:
        'Good product, delivered quickly. Slightly expensive but worth it.',
    },
    {
      author: 'Emma Wilson',
      date: '2024-01-05',
      rating: 5,
      comment: 'Amazing taste and quality. Will definitely order again!',
    },
  ],
}

const mockQuestions = {
  count: 2,
  items: [
    {
      question: 'How long do these vegetables stay fresh?',
      answer:
        'When stored properly in the refrigerator, they stay fresh for 5-7 days.',
      author: 'Jennifer',
      date: '2024-01-12',
    },
    {
      question: 'Are these vegetables organic?',
      answer:
        'Yes, all our vegetables are certified organic and grown without pesticides.',
      author: 'David',
      date: '2024-01-08',
    },
  ],
}

export const Default: Story = {
  args: {
    description: mockDescription,
    reviews: mockReviews,
    questions: mockQuestions,
  },
}

export const WithoutVitamins: Story = {
  args: {
    description: {
      origins: mockDescription.origins,
      cookingInfo: mockDescription.cookingInfo,
      vitamins: [],
    },
    reviews: mockReviews,
    questions: mockQuestions,
  },
}

export const EmptyReviews: Story = {
  args: {
    description: mockDescription,
    reviews: {
      count: 0,
      items: [],
    },
    questions: mockQuestions,
  },
}

export const EmptyQuestions: Story = {
  args: {
    description: mockDescription,
    reviews: mockReviews,
    questions: {
      count: 0,
      items: [],
    },
  },
}

export const LongContent: Story = {
  args: {
    description: {
      origins:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      cookingInfo:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      vitamins: mockDescription.vitamins,
    },
    reviews: {
      count: 5,
      items: [
        ...mockReviews.items,
        {
          author: 'Alex Rodriguez',
          date: '2024-01-20',
          rating: 3,
          comment:
            'Average quality. Expected better based on the price point. The vegetables were okay but not exceptional.',
        },
        {
          author: 'Lisa Thompson',
          date: '2024-01-18',
          rating: 5,
          comment:
            'Outstanding! These are the best vegetables I have purchased online. Fresh, crisp, and delivered perfectly.',
        },
      ],
    },
    questions: mockQuestions,
  },
}

export const MobileView: Story = {
  args: {
    description: mockDescription,
    reviews: mockReviews,
    questions: mockQuestions,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

// Interactive story
export const TabInteraction: Story = {
  args: {
    description: mockDescription,
    reviews: mockReviews,
    questions: mockQuestions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test initial state - description tab should be active
    const descriptionTab = canvas.getByRole('tab', { name: /description/i })
    expect(descriptionTab).toHaveAttribute('data-state', 'active')

    // Test reviews tab
    const reviewsTab = canvas.getByRole('tab', { name: /reviews 3/i })
    await userEvent.click(reviewsTab)

    // Check if reviews content is visible
    expect(canvas.getByText('Customer Reviews')).toBeVisible()
    expect(canvas.getByText('Sarah Johnson')).toBeVisible()

    // Test questions tab
    const questionsTab = canvas.getByRole('tab', { name: /questions 2/i })
    await userEvent.click(questionsTab)

    // Check if questions content is visible
    expect(canvas.getByText('Frequently Asked Questions')).toBeVisible()
    expect(
      canvas.getByText('How long do these vegetables stay fresh?')
    ).toBeVisible()

    // Go back to description tab
    await userEvent.click(descriptionTab)
    expect(canvas.getByText('Origins')).toBeVisible()
  },
}

// Accessibility story
export const AccessibilityTest: Story = {
  args: {
    description: mockDescription,
    reviews: mockReviews,
    questions: mockQuestions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test keyboard navigation
    const firstTab = canvas.getByRole('tab', { name: /description/i })
    firstTab.focus()

    // Test tab navigation with keyboard
    await userEvent.keyboard('{ArrowRight}')
    const reviewsTab = canvas.getByRole('tab', { name: /reviews/i })
    expect(reviewsTab).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}')
    const questionsTab = canvas.getByRole('tab', { name: /questions/i })
    expect(questionsTab).toHaveFocus()

    // Test Enter key activation
    await userEvent.keyboard('{Enter}')
    expect(questionsTab).toHaveAttribute('data-state', 'active')
  },
}
