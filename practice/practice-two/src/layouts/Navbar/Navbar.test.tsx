import { TextEncoder } from 'util'
global.TextEncoder = TextEncoder
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

  test('opens and closes mobile menu', async () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    // Find mobile menu button
    const mobileMenuButton = container.querySelector(
      'button'
    ) as HTMLButtonElement
    expect(mobileMenuButton).not.toBeNull()

    // Click to open mobile menu
    fireEvent.click(mobileMenuButton)

    let closeButton: HTMLElement | null = null

    // WAIT for lazy-loaded component to appear

    await waitFor(() => {
      closeButton =
        screen.queryByRole('button', { name: /close/i }) ||
        screen.queryByTestId('close-button') ||
        container.querySelector('.close-button')

      expect(closeButton).not.toBeNull()
    })

    // Click to close mobile menu
    if (closeButton) {
      fireEvent.click(closeButton)
    }

    // Verify the menu is closed
    await waitFor(() => {
      const mobileMenu = screen.queryByText('Menu')
      expect(mobileMenu).not.toBeInTheDocument()
    })
  })
})
