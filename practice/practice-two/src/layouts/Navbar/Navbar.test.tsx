import { TextEncoder } from 'util'
global.TextEncoder = TextEncoder

import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

// SNAPSHOT TESTING
describe('Navbar - Rendering', () => {
  test('matches desktop snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('renders mobile menu button', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const mobileButton = container.querySelector('button')
    expect(mobileButton).toBeInTheDocument()
  })

  test('renders desktop menu with categories', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(getAllByText(/Bakery/i)[0]).toBeInTheDocument()

    expect(getAllByText(/Bakery/i).length).toBeGreaterThan(0)
  })
})

// INTERACTIVE BEHAVIOR TEST

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('Navbar - Interactive', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('navigates when category is clicked in desktop view', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    // Find the first category button in desktop menu
    const firstCategory = container.querySelector(
      '[data-testid="category-button"]'
    )

    if (firstCategory) {
      fireEvent.click(firstCategory)

      // Check that navigate was called with the correct path
      // The exact path depends on your navbarData
      expect(mockNavigate).toHaveBeenCalled()
      expect(mockNavigate.mock.calls[0][0]).toMatch(/^\//)
    } else {
      throw new Error('No category buttons found in desktop menu')
    }
  })

  test('opens and closes mobile menu', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    // Find mobile menu button
    const mobileMenuButton = container.querySelector('button')

    if (!mobileMenuButton) {
      throw new Error('Mobile menu button not found')
    }

    // Click to open mobile menu
    fireEvent.click(mobileMenuButton)

    // Check menu is open by looking for the title
    expect(screen.getByText('Menu')).toBeInTheDocument()

    // Find close button (using different methods to be more reliable)
    const closeButton =
      screen.getByRole('button', { name: /close/i }) ||
      screen
        .getAllByRole('button')
        .find(
          (btn) =>
            btn.getAttribute('aria-label') === 'Close menu' ||
            btn.textContent?.includes('Close')
        ) ||
      container.querySelector('[data-testid="close-button"]')

    if (!closeButton) {
      throw new Error('Close button not found in mobile menu')
    }

    // Click to close mobile menu
    fireEvent.click(closeButton)

    // Verify the menu is closed (the Menu title should no longer be visible)
    expect(screen.queryByText('Menu')?.closest('[data-state]')).toHaveAttribute(
      'data-state',
      'closed'
    )
  })
})
