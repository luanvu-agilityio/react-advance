import { render, screen, fireEvent } from '@testing-library/react'
import { RatingFilter } from './RatingFilter'
import type { RatingProps, StarRating } from 'types/Filter'

// Only mock the CheckIcon component, not the Star component since we're not using it anymore
jest.mock('lucide-react', () => ({
  CheckIcon: () => <div data-testid="check-icon">✓</div>,
}))

// Mock the styled-components to control their rendering in tests
jest.mock('../FilterStyles', () => {
  const actual = jest.requireActual('../FilterStyles')
  return {
    ...actual,
    // Mock the StarIcon component to return a testable element
    StarIcon: ({ $filled }: { $filled: boolean }) => (
      <div data-testid="star-icon" data-filled={$filled ? 'true' : 'false'}>
        {$filled ? '★' : '☆'}
      </div>
    ),
  }
})

describe('RatingFilter', () => {
  const mockRatings: RatingProps[] = [
    { rating: 5, selected: false },
    { rating: 4, selected: true },
    { rating: 3, selected: false },
    { rating: 2, selected: false },
    { rating: 1, selected: false },
  ]

  const mockOnRatingChange = jest.fn()

  beforeEach(() => {
    mockOnRatingChange.mockClear()
  })

  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('renders different component states correctly', () => {
      // Default state with mixed selections
      const { container: defaultContainer } = render(
        <RatingFilter
          ratings={mockRatings}
          onRatingChange={mockOnRatingChange}
        />
      )
      expect(defaultContainer).toMatchSnapshot('default-state')

      // All ratings selected
      const allSelected = mockRatings.map((rating) => ({
        ...rating,
        selected: true,
      }))
      const { container: allSelectedContainer } = render(
        <RatingFilter
          ratings={allSelected}
          onRatingChange={mockOnRatingChange}
        />
      )
      expect(allSelectedContainer).toMatchSnapshot('all-selected')

      // No ratings selected
      const noneSelected = mockRatings.map((rating) => ({
        ...rating,
        selected: false,
      }))
      const { container: noneSelectedContainer } = render(
        <RatingFilter
          ratings={noneSelected}
          onRatingChange={mockOnRatingChange}
        />
      )
      expect(noneSelectedContainer).toMatchSnapshot('none-selected')

      // Empty ratings array
      const { container: emptyContainer } = render(
        <RatingFilter ratings={[]} onRatingChange={mockOnRatingChange} />
      )
      expect(emptyContainer).toMatchSnapshot('empty-ratings')

      // Only one rating option
      const singleRating = [{ rating: 3 as StarRating, selected: true }]
      const { container: singleRatingContainer } = render(
        <RatingFilter
          ratings={singleRating}
          onRatingChange={mockOnRatingChange}
        />
      )
      expect(singleRatingContainer).toMatchSnapshot('single-rating')
    })
  })

  // Add a new test for the stars rendering
  it('renders the correct number of filled and empty stars', () => {
    render(
      <RatingFilter ratings={mockRatings} onRatingChange={mockOnRatingChange} />
    )

    // Get all star icons
    const starIcons = screen.getAllByTestId('star-icon')

    // For the 5-star rating (first rating in our mock)
    // All 5 stars should be filled
    expect(starIcons[0]).toHaveAttribute('data-filled', 'true')
    expect(starIcons[1]).toHaveAttribute('data-filled', 'true')
    expect(starIcons[2]).toHaveAttribute('data-filled', 'true')
    expect(starIcons[3]).toHaveAttribute('data-filled', 'true')
    expect(starIcons[4]).toHaveAttribute('data-filled', 'true')

    // For the 4-star rating (second rating in our mock)
    // First 4 stars should be filled, 5th star empty
    expect(starIcons[5]).toHaveAttribute('data-filled', 'true')
    expect(starIcons[6]).toHaveAttribute('data-filled', 'true')
    expect(starIcons[7]).toHaveAttribute('data-filled', 'true')
    expect(starIcons[8]).toHaveAttribute('data-filled', 'true')
    expect(starIcons[9]).toHaveAttribute('data-filled', 'false')
  })

  // INTERACTIVE BEHAVIOR TESTS
  describe('Interactive behavior', () => {
    it('calls onRatingChange when clicking on a checkbox', () => {
      render(
        <RatingFilter
          ratings={mockRatings}
          onRatingChange={mockOnRatingChange}
        />
      )

      // Find the checkbox elements
      const checkboxes = screen.getAllByRole('checkbox')

      // Click on the first checkbox (5 Stars & Up)
      fireEvent.click(checkboxes[0])
      expect(mockOnRatingChange).toHaveBeenCalledWith(0)

      mockOnRatingChange.mockClear()

      // Click on the last checkbox (1 Star & Up)
      fireEvent.click(checkboxes[4])
      expect(mockOnRatingChange).toHaveBeenCalledWith(4)
    })

    it('allows toggling an already selected rating', () => {
      render(
        <RatingFilter
          ratings={mockRatings}
          onRatingChange={mockOnRatingChange}
        />
      )

      // 4 Stars & Up is already selected in our mock data (index 1)
      const selectedRatingCheckbox = screen.getAllByRole('checkbox')[1]

      // Verify it's initially checked before clicking
      expect(selectedRatingCheckbox).toBeChecked()

      // Click to toggle it off
      fireEvent.click(selectedRatingCheckbox)
      expect(mockOnRatingChange).toHaveBeenCalledWith(1)
    })
  })
})
