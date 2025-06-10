import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
<<<<<<< HEAD
=======

>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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
<<<<<<< HEAD
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
=======
  describe('Rendering', () => {
    it('renders all tab triggers with correct counts', () => {
      render(<ProductTabs {...mockProps} />)

      expect(
        screen.getByRole('tab', { name: /description/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('tab', { name: /reviews.*2/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('tab', { name: /questions.*1/i })
      ).toBeInTheDocument()
    })

    it('renders description tab as active by default', () => {
      render(<ProductTabs {...mockProps} />)

      const descriptionTab = screen.getByRole('tab', { name: /description/i })
      expect(descriptionTab).toHaveAttribute('data-state', 'active')
    })

    it('renders description content by default', () => {
      render(<ProductTabs {...mockProps} />)

      expect(screen.getByText('Origins')).toBeInTheDocument()
      expect(screen.getByText('Test origins content')).toBeInTheDocument()
      expect(screen.getByText('How to cook')).toBeInTheDocument()
      expect(screen.getByText('Test cooking information')).toBeInTheDocument()
    })
  })

  describe('Description Tab', () => {
    it('renders vitamins table when vitamins are provided', () => {
      render(<ProductTabs {...mockProps} />)

      expect(screen.getByText('Full of Vitamins!')).toBeInTheDocument()
      expect(screen.getByText('Vitamin C')).toBeInTheDocument()
      expect(screen.getByText('89.2mg')).toBeInTheDocument()
      expect(screen.getByText('99%')).toBeInTheDocument()
    })

    it('does not render vitamins section when vitamins array is empty', () => {
      const propsWithoutVitamins = {
        ...mockProps,
        description: {
          ...mockProps.description,
          vitamins: [],
        },
      }

      render(<ProductTabs {...propsWithoutVitamins} />)

      expect(screen.queryByText('Full of Vitamins!')).not.toBeInTheDocument()
    })

    it('renders vitamins table headers correctly', () => {
      render(<ProductTabs {...mockProps} />)

      expect(screen.getByText('Vitamins')).toBeInTheDocument()
      expect(screen.getByText('Quantity')).toBeInTheDocument()
      expect(screen.getByText('% DV')).toBeInTheDocument()
    })
  })

  describe('Reviews Tab', () => {
    it('displays reviews when available', async () => {
      const user = userEvent.setup()
      render(<ProductTabs {...mockProps} />)

      const reviewsTab = screen.getByRole('tab', { name: /reviews/i })
      await user.click(reviewsTab)

      expect(screen.getByText('Customer Reviews')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Great product!')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('Good quality.')).toBeInTheDocument()
    })

    it('displays empty state when no reviews', async () => {
      const user = userEvent.setup()
      const propsWithoutReviews = {
        ...mockProps,
        reviews: { count: 0, items: [] },
      }

      render(<ProductTabs {...propsWithoutReviews} />)

      const reviewsTab = screen.getByRole('tab', { name: /reviews/i })
      await user.click(reviewsTab)

      expect(
        screen.getByText('No reviews yet. Be the first to review this product!')
      ).toBeInTheDocument()
    })

    it('renders star ratings for each review', async () => {
      const user = userEvent.setup()
      render(<ProductTabs {...mockProps} />)

      const reviewsTab = screen.getByRole('tab', { name: /reviews/i })
      await user.click(reviewsTab)

      expect(screen.getByTestId('stars-5')).toBeInTheDocument()
      expect(screen.getByTestId('stars-4')).toBeInTheDocument()
    })

    it('displays review dates correctly', async () => {
      const user = userEvent.setup()
      render(<ProductTabs {...mockProps} />)

      const reviewsTab = screen.getByRole('tab', { name: /reviews/i })
      await user.click(reviewsTab)

      expect(screen.getByText('2024-01-15')).toBeInTheDocument()
      expect(screen.getByText('2024-01-10')).toBeInTheDocument()
    })
  })

  describe('Questions Tab', () => {
    it('displays questions when available', async () => {
      const user = userEvent.setup()
      render(<ProductTabs {...mockProps} />)

      const questionsTab = screen.getByRole('tab', { name: /questions/i })
      await user.click(questionsTab)

      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
      expect(screen.getByText('Test question?')).toBeInTheDocument()
      expect(screen.getByText('Test answer.')).toBeInTheDocument()
      expect(
        screen.getByText('Asked by Test User • 2024-01-12')
      ).toBeInTheDocument()
    })

    it('displays empty state when no questions', async () => {
      const user = userEvent.setup()
      const propsWithoutQuestions = {
        ...mockProps,
        questions: { count: 0, items: [] },
      }

      render(<ProductTabs {...propsWithoutQuestions} />)

      const questionsTab = screen.getByRole('tab', { name: /questions/i })
      await user.click(questionsTab)

>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      expect(
        screen.getByText(
          'No questions yet. Ask the first question about this product!'
        )
      ).toBeInTheDocument()
    })
  })
<<<<<<< HEAD
=======

  describe('Tab Navigation', () => {
    it('switches between tabs correctly', async () => {
      const user = userEvent.setup()
      render(<ProductTabs {...mockProps} />)

      // Initially description should be active
      expect(screen.getByText('Origins')).toBeInTheDocument()

      // Switch to reviews
      const reviewsTab = screen.getByRole('tab', { name: /reviews/i })
      await user.click(reviewsTab)
      expect(screen.getByText('Customer Reviews')).toBeInTheDocument()
      expect(screen.queryByText('Origins')).not.toBeInTheDocument()

      // Switch to questions
      const questionsTab = screen.getByRole('tab', { name: /questions/i })
      await user.click(questionsTab)
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
      expect(screen.queryByText('Customer Reviews')).not.toBeInTheDocument()

      // Switch back to description
      const descriptionTab = screen.getByRole('tab', { name: /description/i })
      await user.click(descriptionTab)
      expect(screen.getByText('Origins')).toBeInTheDocument()
      expect(
        screen.queryByText('Frequently Asked Questions')
      ).not.toBeInTheDocument()
    })

    it('updates active tab state correctly', async () => {
      const user = userEvent.setup()
      render(<ProductTabs {...mockProps} />)

      const descriptionTab = screen.getByRole('tab', { name: /description/i })
      const reviewsTab = screen.getByRole('tab', { name: /reviews/i })

      // Initially description should be active
      expect(descriptionTab).toHaveAttribute('data-state', 'active')
      expect(reviewsTab).toHaveAttribute('data-state', 'inactive')

      // Click reviews tab
      await user.click(reviewsTab)
      expect(descriptionTab).toHaveAttribute('data-state', 'inactive')
      expect(reviewsTab).toHaveAttribute('data-state', 'active')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      const emptyProps = {
        description: {
          origins: '',
          cookingInfo: '',
          vitamins: [],
        },
        reviews: { count: 0, items: [] },
        questions: { count: 0, items: [] },
      }

      expect(() => render(<ProductTabs {...emptyProps} />)).not.toThrow()
    })

    it('renders large numbers in tab counts correctly', () => {
      const propsWithLargeCounts = {
        ...mockProps,
        reviews: { ...mockProps.reviews, count: 999 },
        questions: { ...mockProps.questions, count: 1000 },
      }

      render(<ProductTabs {...propsWithLargeCounts} />)

      expect(screen.getByText('999')).toBeInTheDocument()
      expect(screen.getByText('1000')).toBeInTheDocument()
    })
  })
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
})
