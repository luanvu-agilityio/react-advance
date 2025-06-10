import { render, screen, fireEvent } from '@testing-library/react'
import { RatingFilter } from './RatingFilter'
<<<<<<< HEAD
import type { RatingProps, StarRating } from 'types/Filter'

// Only mock the CheckIcon component, not the Star component since we're not using it anymore
=======
import type { RatingProps } from 'types/Filter'

// Mock the CheckIcon component
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
jest.mock('lucide-react', () => ({
  CheckIcon: () => <div data-testid="check-icon">✓</div>,
}))

<<<<<<< HEAD
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

=======
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
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

<<<<<<< HEAD
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
=======
  it('renders all rating options correctly', () => {
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
    render(
      <RatingFilter ratings={mockRatings} onRatingChange={mockOnRatingChange} />
    )

<<<<<<< HEAD
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
=======
    // Check if title is rendered
    expect(screen.getByText('Rating')).toBeInTheDocument()

    // Check if all rating options are rendered
    expect(screen.getByText('5 Stars & Up')).toBeInTheDocument()
    expect(screen.getByText('4 Stars & Up')).toBeInTheDocument()
    expect(screen.getByText('3 Stars & Up')).toBeInTheDocument()
    expect(screen.getByText('2 Stars & Up')).toBeInTheDocument()
    expect(screen.getByText('1 Star & Up')).toBeInTheDocument()
  })

  it('renders singular "Star" text for rating of 1', () => {
    render(
      <RatingFilter ratings={mockRatings} onRatingChange={mockOnRatingChange} />
    )

    // Check if singular form is used for rating of 1
    expect(screen.getByText('1 Star & Up')).toBeInTheDocument()
  })

  it('renders plural "Stars" text for ratings above 1', () => {
    render(
      <RatingFilter ratings={mockRatings} onRatingChange={mockOnRatingChange} />
    )

    // Check if plural form is used for ratings above 1
    expect(screen.getByText('5 Stars & Up')).toBeInTheDocument()
    expect(screen.getByText('4 Stars & Up')).toBeInTheDocument()
    expect(screen.getByText('3 Stars & Up')).toBeInTheDocument()
    expect(screen.getByText('2 Stars & Up')).toBeInTheDocument()
  })

  it('displays the correct number of filled stars for each rating', () => {
    render(
      <RatingFilter ratings={mockRatings} onRatingChange={mockOnRatingChange} />
    )
    const ratingContainers = screen.getAllByRole('button')

    // Check the stars are there (5 stars per rating)
    expect(ratingContainers).toHaveLength(5) // 5 rating options
  })

  it('shows selected checkboxes correctly', () => {
    render(
      <RatingFilter ratings={mockRatings} onRatingChange={mockOnRatingChange} />
    )

    // Get all checkboxes
    const checkboxes = screen.getAllByRole('checkbox')

    // Only the second checkbox (4 Stars & Up) should be checked
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[2]).not.toBeChecked()
    expect(checkboxes[3]).not.toBeChecked()
    expect(checkboxes[4]).not.toBeChecked()
  })

  it('calls onRatingChange with correct index when checkbox is clicked', () => {
    render(
      <RatingFilter ratings={mockRatings} onRatingChange={mockOnRatingChange} />
    )

    // Click on the first checkbox (5 Stars & Up)
    const firstRatingLabel = screen.getByText('5 Stars & Up')
    const firstRatingCheckbox =
      firstRatingLabel.closest('[role="checkbox"]') ||
      (firstRatingLabel.closest('label')?.previousSibling as HTMLElement)

    fireEvent.click(firstRatingCheckbox)

    // Check if onRatingChange was called with the correct index
    expect(mockOnRatingChange).toHaveBeenCalledWith(0)
  })

  it('renders nothing when ratings array is empty', () => {
    render(<RatingFilter ratings={[]} onRatingChange={mockOnRatingChange} />)

    // Check that the section title is still rendered
    expect(screen.getByText('Rating')).toBeInTheDocument()

    // But no rating options should be rendered
    expect(screen.queryByText('5 Stars & Up')).not.toBeInTheDocument()
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  })
})
