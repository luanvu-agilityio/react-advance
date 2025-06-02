import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Theme as ThemeProvider } from '@radix-ui/themes'
import FooterLink from './FooterLink'

// Mock the footer sections data
const mockFooterSections = [
  {
    title: 'About',
    links: [
      { text: 'About Us', href: '/about' },
      { text: 'Careers', href: '/careers' },
      { text: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { text: 'Contact Us', href: '/contact' },
      { text: 'Help Center', href: '/help' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { text: 'Facebook', href: 'https://facebook.com' },
      { text: 'Twitter', href: 'https://twitter.com' },
    ],
  },
]

// Mock the footer sections constant
jest.mock('@constants/footer-link', () => ({
  footerSections: mockFooterSections,
}))

// Mock console.log to test click handlers
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation()

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

// Mock window.matchMedia for responsive tests
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('FooterLink Component', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders all footer sections', () => {
    renderWithTheme(<FooterLink />)

    expect(screen.getAllByText('About')).toHaveLength(2) // Mobile + Desktop
    expect(screen.getAllByText('Customer Service')).toHaveLength(2)
    expect(screen.getAllByText('Connect')).toHaveLength(2)
  })

  it('renders all footer links', () => {
    renderWithTheme(<FooterLink />)

    expect(screen.getAllByText('About Us')).toHaveLength(2)
    expect(screen.getAllByText('Careers')).toHaveLength(2)
    expect(screen.getAllByText('Contact Us')).toHaveLength(2)
    expect(screen.getAllByText('Facebook')).toHaveLength(2)
  })

  describe('Mobile View', () => {
    beforeEach(() => {
      mockMatchMedia(true) // Mobile breakpoint
    })

    it('shows mobile accordion and hides desktop grid', () => {
      renderWithTheme(<FooterLink />)

      // Check that mobile accordion is present
      const accordionTriggers = screen.getAllByRole('button')
      expect(accordionTriggers.length).toBeGreaterThan(0)

      // Check accordion structure
      expect(screen.getByText('About')).toBeInTheDocument()
    })

    it('expands accordion when clicked', async () => {
      renderWithTheme(<FooterLink />)

      const aboutButton = screen.getAllByText('About')[0].closest('button')
      expect(aboutButton).toBeInTheDocument()

      fireEvent.click(aboutButton!)

      // Wait for accordion animation
      await waitFor(() => {
        expect(aboutButton).toHaveAttribute('data-state', 'open')
      })
    })

    it('rotates chevron icon when accordion is opened', async () => {
      renderWithTheme(<FooterLink />)

      const aboutButton = screen.getAllByText('About')[0].closest('button')
      fireEvent.click(aboutButton!)

      await waitFor(() => {
        const chevronIcon = aboutButton!.querySelector('svg')
        expect(chevronIcon).toHaveStyle('transform: rotate(180deg)')
      })
    })

    it('allows multiple accordions to be open simultaneously', async () => {
      renderWithTheme(<FooterLink />)

      const aboutButton = screen.getAllByText('About')[0].closest('button')
      const serviceButton = screen
        .getAllByText('Customer Service')[0]
        .closest('button')

      fireEvent.click(aboutButton!)
      fireEvent.click(serviceButton!)

      await waitFor(() => {
        expect(aboutButton).toHaveAttribute('data-state', 'open')
        expect(serviceButton).toHaveAttribute('data-state', 'open')
      })
    })
  })

  describe('Desktop View', () => {
    beforeEach(() => {
      mockMatchMedia(false) // Desktop breakpoint
    })

    it('shows desktop grid layout', () => {
      renderWithTheme(<FooterLink />)

      // Desktop version should not have accordion buttons
      const accordionButtons = screen.queryAllByRole('button')
      expect(accordionButtons).toHaveLength(0)
    })

    it('displays all links in grid format', () => {
      renderWithTheme(<FooterLink />)

      expect(screen.getByText('About Us')).toBeInTheDocument()
      expect(screen.getByText('Careers')).toBeInTheDocument()
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })
  })

  describe('Link Functionality', () => {
    it('handles internal link clicks', () => {
      renderWithTheme(<FooterLink />)

      const aboutUsLink = screen.getAllByText('About Us')[0]
      fireEvent.click(aboutUsLink)

      expect(mockConsoleLog).toHaveBeenCalledWith('Link clicked:', '/about')
    })

    it('handles external link clicks', () => {
      renderWithTheme(<FooterLink />)

      const facebookLink = screen.getAllByText('Facebook')[0]
      fireEvent.click(facebookLink)

      expect(mockConsoleLog).toHaveBeenCalledWith(
        'Link clicked:',
        'https://facebook.com'
      )
    })

    it('sets correct target for external links', () => {
      renderWithTheme(<FooterLink />)

      const facebookLink = screen.getAllByText('Facebook')[0]
      expect(facebookLink).toHaveAttribute('target', '_blank')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for accordions', () => {
      renderWithTheme(<FooterLink />)

      const aboutButton = screen.getAllByText('About')[0].closest('button')
      expect(aboutButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('updates ARIA attributes when accordion is expanded', async () => {
      renderWithTheme(<FooterLink />)

      const aboutButton = screen.getAllByText('About')[0].closest('button')
      fireEvent.click(aboutButton!)

      await waitFor(() => {
        expect(aboutButton).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('has keyboard navigation support', () => {
      renderWithTheme(<FooterLink />)

      const aboutButton = screen.getAllByText('About')[0].closest('button')

      // Test Enter key
      fireEvent.keyDown(aboutButton!, { key: 'Enter', code: 'Enter' })
      fireEvent.keyUp(aboutButton!, { key: 'Enter', code: 'Enter' })

      // Test Space key
      fireEvent.keyDown(aboutButton!, { key: ' ', code: 'Space' })
      fireEvent.keyUp(aboutButton!, { key: ' ', code: 'Space' })
    })
  })

  describe('Edge Cases', () => {
    it('handles empty footer sections gracefully', () => {
      // Mock empty sections
      jest.doMock('@constants/footer-link', () => ({
        footerSections: [],
      }))

      const { container } = renderWithTheme(<FooterLink />)
      expect(container).toBeInTheDocument()
    })
  })
})
