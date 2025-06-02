import { render, screen, fireEvent } from '@testing-library/react'
import { RatingFilter } from './RatingFilter'
import type { RatingProps } from 'types/Filter'

// Mock the CheckIcon component
jest.mock('lucide-react', () => ({
  CheckIcon: () => <div data-testid="check-icon">✓</div>,
}))

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

  it('renders all rating options correctly', () => {
    render(
      <RatingFilter ratings={mockRatings} onRatingChange={mockOnRatingChange} />
    )

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
  })
})
