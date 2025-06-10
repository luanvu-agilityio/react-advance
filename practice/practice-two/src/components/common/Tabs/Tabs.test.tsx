import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductTabs from './Tabs'

// Mock the renderStars helper
jest.mock('@helpers/renderStar', () => ({
  renderStars: jest.fn((rating: number) => (
    <div data-testid={`stars-${rating}`}>{'★'.repeat(rating)}</div>
  )),
}))

const mockProps = {
  description: {
    origins: 'Test origins content',
    cookingInfo: 'Test cooking information',
    vitamins: [
      { name: 'Vitamin C', quantity: '89.2mg', dv: '99%' },
      { name: 'Vitamin K', quantity: '102μg', dv: '85%' },
    ],
  },
  reviews: {
    count: 2,
    items: [
      {
        author: 'John Doe',
        date: '2024-01-15',
        rating: 5,
        comment: 'Great product!',
      },
      {
        author: 'Jane Smith',
        date: '2024-01-10',
        rating: 4,
        comment: 'Good quality.',
      },
    ],
  },
  questions: {
    count: 1,
    items: [
      {
        question: 'Test question?',
        answer: 'Test answer.',
        author: 'Test User',
        date: '2024-01-12',
      },
    ],
  },
}

describe('ProductTabs Component', () => {
  // SNAPSHOT TESTS FOR RENDERING STATES
  describe('Snapshots', () => {
    it('renders default state correctly', () => {
      const { container } = render(<ProductTabs {...mockProps} />)
      expect(container).toMatchSnapshot('default-state')
    })

    it('renders different content states correctly', () => {
      // Without vitamins
      const { container: withoutVitamins } = render(
        <ProductTabs
          {...mockProps}
          description={{ ...mockProps.description, vitamins: [] }}
        />
      )
      expect(withoutVitamins).toMatchSnapshot('without-vitamins')

      // Without reviews
      const { container: withoutReviews } = render(
        <ProductTabs {...mockProps} reviews={{ count: 0, items: [] }} />
      )
      expect(withoutReviews).toMatchSnapshot('without-reviews')

      // Without questions
      const { container: withoutQuestions } = render(
        <ProductTabs {...mockProps} questions={{ count: 0, items: [] }} />
      )
      expect(withoutQuestions).toMatchSnapshot('without-questions')

      // With empty content
      const { container: emptyContent } = render(
        <ProductTabs
          description={{ origins: '', cookingInfo: '', vitamins: [] }}
          reviews={{ count: 0, items: [] }}
          questions={{ count: 0, items: [] }}
        />
      )
      expect(emptyContent).toMatchSnapshot('empty-content')
    })
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Tab Navigation', () => {
    it('switches between tabs and displays correct content', async () => {
      const user = userEvent.setup()
      render(<ProductTabs {...mockProps} />)

      // Initially description tab should be active
      const descriptionTab = screen.getByRole('tab', { name: /description/i })
      const reviewsTab = screen.getByRole('tab', { name: /reviews/i })
      const questionsTab = screen.getByRole('tab', { name: /questions/i })

      expect(descriptionTab).toHaveAttribute('data-state', 'active')
      expect(reviewsTab).toHaveAttribute('data-state', 'inactive')
      expect(questionsTab).toHaveAttribute('data-state', 'inactive')
      expect(screen.getByText('Origins')).toBeInTheDocument()

      // Switch to reviews tab
      await user.click(reviewsTab)
      expect(descriptionTab).toHaveAttribute('data-state', 'inactive')
      expect(reviewsTab).toHaveAttribute('data-state', 'active')
      expect(questionsTab).toHaveAttribute('data-state', 'inactive')
      expect(screen.getByText('Customer Reviews')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.queryByText('Origins')).not.toBeInTheDocument()

      // Switch to questions tab
      await user.click(questionsTab)
      expect(descriptionTab).toHaveAttribute('data-state', 'inactive')
      expect(reviewsTab).toHaveAttribute('data-state', 'inactive')
      expect(questionsTab).toHaveAttribute('data-state', 'active')
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
      expect(screen.getByText('Test question?')).toBeInTheDocument()
      expect(screen.queryByText('Customer Reviews')).not.toBeInTheDocument()

      // Switch back to description tab
      await user.click(descriptionTab)
      expect(descriptionTab).toHaveAttribute('data-state', 'active')
      expect(reviewsTab).toHaveAttribute('data-state', 'inactive')
      expect(questionsTab).toHaveAttribute('data-state', 'inactive')
      expect(screen.getByText('Origins')).toBeInTheDocument()
      expect(
        screen.queryByText('Frequently Asked Questions')
      ).not.toBeInTheDocument()
    })

    it('displays correct empty states when switching to empty content tabs', async () => {
      const user = userEvent.setup()
      const emptyProps = {
        description: { origins: '', cookingInfo: '', vitamins: [] },
        reviews: { count: 0, items: [] },
        questions: { count: 0, items: [] },
      }

      render(<ProductTabs {...emptyProps} />)

      // Switch to reviews tab
      const reviewsTab = screen.getByRole('tab', { name: /reviews/i })
      await user.click(reviewsTab)
      expect(
        screen.getByText('No reviews yet. Be the first to review this product!')
      ).toBeInTheDocument()

      // Switch to questions tab
      const questionsTab = screen.getByRole('tab', { name: /questions/i })
      await user.click(questionsTab)
      expect(
        screen.getByText(
          'No questions yet. Ask the first question about this product!'
        )
      ).toBeInTheDocument()
    })
  })
})
