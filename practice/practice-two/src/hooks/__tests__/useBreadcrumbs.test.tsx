import { TextEncoder } from 'util'
global.TextEncoder = TextEncoder
import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useBreadcrumbs } from '../useBreadcrumbs'
import type { ReactNode } from 'react'

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useSearchParams: jest.fn(() => [new URLSearchParams(), jest.fn()]),
}))

describe('useBreadcrumbs', () => {
  const useLocation = jest.requireMock('react-router-dom').useLocation
  const useSearchParams = jest.requireMock('react-router-dom').useSearchParams

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Create a wrapper with Router context
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
  )

  it('returns home breadcrumb for root path', () => {
    // Mock the location to be root path
    useLocation.mockReturnValue({ pathname: '/' })

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper })

    expect(result.current).toEqual([{ label: 'Homepage', path: '/' }])
  })

  it('returns custom breadcrumbs when provided', () => {
    const customBreadcrumbs = [
      { label: 'Custom', path: '/custom' },
      { label: 'Path', path: '/custom/path' },
    ]

    const { result } = renderHook(() => useBreadcrumbs(customBreadcrumbs), {
      wrapper,
    })

    expect(result.current).toEqual(customBreadcrumbs)
  })

  it('builds correct breadcrumb chain for category page', () => {
    // Mock for category page
    useLocation.mockReturnValue({ pathname: '/fruits-vegetables' })

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper })

    expect(result.current).toEqual([
      { label: 'Homepage', path: '/' },
      { label: 'Fruits Vegetables', path: '/fruits-vegetables' },
    ])
  })

  it('includes search params in breadcrumb labels when needed', () => {
    // Mock location and search params for search results
    useLocation.mockReturnValue({ pathname: '/search-results' })
    useSearchParams.mockReturnValue([
      new URLSearchParams('search=apples&category=fruits-vegetables'),
      jest.fn(),
    ])

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper })

    expect(result.current).toEqual([
      { label: 'Homepage', path: '/' },
      {
        label: 'Search Results: "apples"',
        path: '/search-results',
      },
    ])
  })
})
