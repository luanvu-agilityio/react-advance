import { render, screen, fireEvent } from '@testing-library/react'
import { CategoryFilter } from './CategoryFilter'
import type { CategoryProps } from 'types/Filter'

describe('CategoryFilter', () => {
  const mockCategories: CategoryProps[] = [
    { name: 'Bakery', count: 12 },
    { name: 'Fruits', count: 24 },
    { name: 'Vegetables', count: 32 },
  ]

  const mockOnCategoryClick = jest.fn()

  beforeEach(() => {
    mockOnCategoryClick.mockClear()
  })

  it('renders all category options correctly', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="Fruits"
        onCategoryClick={mockOnCategoryClick}
      />
    )

    // Check if title is rendered
    expect(screen.getByText('Categories')).toBeInTheDocument()

    // Check if all categories are rendered
    expect(screen.getByText('Bakery')).toBeInTheDocument()
    expect(screen.getByText('Fruits')).toBeInTheDocument()
    expect(screen.getByText('Vegetables')).toBeInTheDocument()

    // Check if counts are rendered
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText('32')).toBeInTheDocument()
  })

  it('calls onCategoryClick with correct category name when clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="Fruits"
        onCategoryClick={mockOnCategoryClick}
      />
    )

    // Click on the first category (Bakery)
    const bakeryCategory = screen.getByText('Bakery')
    fireEvent.click(bakeryCategory)

    // Check if onCategoryClick was called with the correct category name
    expect(mockOnCategoryClick).toHaveBeenCalledWith('Bakery')
  })

  it('renders nothing when categories array is empty', () => {
    const { container } = render(
      <CategoryFilter
        categories={[]}
        activeCategory=""
        onCategoryClick={mockOnCategoryClick}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('displays the correct count for each category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="Fruits"
        onCategoryClick={mockOnCategoryClick}
      />
    )

    // Check if each category has the correct count displayed
    const bakeryItem = screen.getByText('Bakery').closest('button')
    const fruitsItem = screen.getByText('Fruits').closest('button')
    const vegetablesItem = screen.getByText('Vegetables').closest('button')

    expect(bakeryItem).toHaveTextContent('12')
    expect(fruitsItem).toHaveTextContent('24')
    expect(vegetablesItem).toHaveTextContent('32')
  })

  it('handles no active category gracefully', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory=""
        onCategoryClick={mockOnCategoryClick}
      />
    )

    // No category should have the active class/styling
    const categoryItems = screen.getAllByRole('button')

    categoryItems.forEach((item) => {
      expect(item).not.toHaveAttribute('data-active', 'true')
    })
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="Fruits"
        onCategoryClick={mockOnCategoryClick}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
