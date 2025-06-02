import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import type { BreadcrumbItem } from '@hooks/useBreadcrumbs'
import Breadcrumbs from './Breadcrumb'
import type { ReactElement } from 'react'

// Mock the useBreadcrumbs hook
jest.mock('@hooks/useBreadcrumbs', () => ({
  useBreadcrumbs: jest.fn(),
}))

// Mock react-router-dom
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const renderWithRouter = (component: ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Breadcrumbs Component', () => {
  const { useBreadcrumbs: mockUseBreadcrumbs } = jest.requireMock(
    '@hooks/useBreadcrumbs'
  )

  beforeEach(() => {
    mockNavigate.mockClear()
    mockUseBreadcrumbs.mockClear()
  })

  const sampleItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Electronics', path: '/products/electronics' },
  ]

  it('renders breadcrumb items correctly', () => {
    mockUseBreadcrumbs.mockReturnValue(sampleItems)

    renderWithRouter(<Breadcrumbs items={sampleItems} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
  })

  it('renders separators between items', () => {
    mockUseBreadcrumbs.mockReturnValue(sampleItems)

    renderWithRouter(<Breadcrumbs items={sampleItems} />)

    const separators = document.querySelectorAll('svg')
    expect(separators).toHaveLength(2) // Two separators for three items
  })

  it('applies active class to the last item', () => {
    mockUseBreadcrumbs.mockReturnValue(sampleItems)

    renderWithRouter(<Breadcrumbs items={sampleItems} />)

    const lastItem = screen.getByText('Electronics')
    expect(lastItem).toHaveClass('active')
  })

  it('navigates when clicking on non-active breadcrumb', () => {
    mockUseBreadcrumbs.mockReturnValue(sampleItems)

    renderWithRouter(<Breadcrumbs items={sampleItems} />)

    const homeLink = screen.getByText('Home')
    fireEvent.click(homeLink)

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('does not navigate when clicking on active (last) breadcrumb', () => {
    mockUseBreadcrumbs.mockReturnValue(sampleItems)

    renderWithRouter(<Breadcrumbs items={sampleItems} />)

    const activeLink = screen.getByText('Electronics')
    fireEvent.click(activeLink)

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('handles single item breadcrumb', () => {
    const singleItem = [{ label: 'Home', path: '/' }]
    mockUseBreadcrumbs.mockReturnValue(singleItem)

    renderWithRouter(<Breadcrumbs items={singleItem} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Home')).toHaveClass('active')

    // No separators for single item
    const separators = document.querySelectorAll('svg')
    expect(separators).toHaveLength(0)
  })

  it('handles empty breadcrumb items', () => {
    mockUseBreadcrumbs.mockReturnValue([])

    renderWithRouter(<Breadcrumbs items={[]} />)

    const breadcrumbsList = screen.getByRole('list')
    expect(breadcrumbsList).toBeEmptyDOMElement()
  })

  it('handles long breadcrumb paths', () => {
    const longItems = [
      { label: 'Home', path: '/' },
      { label: 'Category 1', path: '/cat1' },
      { label: 'Category 2', path: '/cat1/cat2' },
      { label: 'Category 3', path: '/cat1/cat2/cat3' },
      { label: 'Category 4', path: '/cat1/cat2/cat3/cat4' },
      { label: 'Current Page', path: '/cat1/cat2/cat3/cat4/current' },
    ]
    mockUseBreadcrumbs.mockReturnValue(longItems)

    renderWithRouter(<Breadcrumbs items={longItems} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toHaveClass('active')
  })
})
