import { render, screen } from '@testing-library/react'
import { Theme as ThemeProvider } from '@radix-ui/themes'
import type { ReactElement } from 'react'

// Mock the footer sections BEFORE importing the component
jest.mock('@constants/footer-link', () => ({
  footerSections: [
    {
      title: 'Get in touch',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Connections',
      links: [
        { text: 'Facebook', href: 'https://facebook.com' },
        { text: 'Twitter', href: 'https://twitter.com' },
      ],
    },
    {
      title: 'Earnings',
      links: [
        { text: 'Become an Affiliate', href: '/affiliate' },
        { text: 'Sell on Market', href: '/sell' },
      ],
    },
  ],
}))

import FooterLink from './FooterLink'

// Helper to render with ThemeProvider
const renderWithTheme = (component: ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('FooterLink Component', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  // SNAPSHOT TESTS
  describe('Snapshot Tests', () => {
    it('renders correctly', () => {
      const { container } = renderWithTheme(<FooterLink />)
      expect(container).toMatchSnapshot()
    })
  })

  // BASIC RENDERING TESTS
  describe('Basic Rendering', () => {
    it('renders all footer links', () => {
      renderWithTheme(<FooterLink />)
      expect(screen.getByText('About Us')).toBeInTheDocument()
      expect(screen.getByText('Facebook')).toBeInTheDocument()
      expect(screen.getByText('Become an Affiliate')).toBeInTheDocument()
    })

    it('applies correct attributes to external links', () => {
      renderWithTheme(<FooterLink />)
      const facebookLink = screen.getByText('Facebook').closest('a')
      expect(facebookLink).toHaveAttribute('target', '_blank')
      expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('applies correct attributes to internal links', () => {
      renderWithTheme(<FooterLink />)
      const aboutLink = screen.getByText('About Us').closest('a')
      expect(aboutLink).toHaveAttribute('target', '_self')
      expect(aboutLink).not.toHaveAttribute('rel')
    })
  })

  // CUSTOM SECTIONS TEST
  describe('Custom Sections', () => {
    it('renders custom sections when provided', () => {
      const customSections = [
        {
          title: 'Custom Section',
          links: [
            { text: 'Custom Link 1', href: '/custom1' },
            { text: 'Custom Link 2', href: '/custom2' },
          ],
        },
      ]

      renderWithTheme(<FooterLink sections={customSections} />)

      expect(screen.getByText('Custom Link 1')).toBeInTheDocument()
      expect(screen.getByText('Custom Link 2')).toBeInTheDocument()
      expect(screen.queryByText('Get in touch')).not.toBeInTheDocument()
    })

    it('handles empty sections gracefully', () => {
      const { container } = renderWithTheme(<FooterLink sections={[]} />)
      expect(container).toBeInTheDocument()
      expect(screen.queryByText('Get in touch')).not.toBeInTheDocument()
    })
  })
})
