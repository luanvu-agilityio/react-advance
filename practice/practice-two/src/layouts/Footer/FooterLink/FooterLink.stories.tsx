import type { Meta, StoryObj } from '@storybook/react'
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
      { text: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { text: 'Contact Us', href: '/contact' },
      { text: 'Help Center', href: '/help' },
      { text: 'Shipping Info', href: '/shipping' },
      { text: 'Returns', href: '/returns' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms of Service', href: '/terms' },
      { text: 'Cookie Policy', href: '/cookies' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { text: 'Facebook', href: 'https://facebook.com' },
      { text: 'Twitter', href: 'https://twitter.com' },
      { text: 'Instagram', href: 'https://instagram.com' },
      { text: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
]

const meta: Meta<typeof FooterLink> = {
  title: 'Layout/Footer/FooterLink',
  component: FooterLink,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive footer component that displays as an accordion on mobile and grid layout on desktop.',
      },
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
            padding: '20px 0',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FooterLink>

export const Desktop: Story = {
  args: {
    sections: mockFooterSections,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Desktop view showing the footer links in a grid layout',
      },
    },
  },
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet view showing the footer links in a grid layout',
      },
    },
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view showing the footer links as collapsible accordions',
      },
    },
  },
}

export const ExternalLinks: Story = {
  decorators: [
    () => {
      return (
        <ThemeProvider>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              minHeight: '100vh',
              padding: '20px 0',
            }}
          >
            <FooterLink
              sections={[
                {
                  title: 'External Partners',
                  links: [
                    { text: 'Google', href: 'https://google.com' },
                    { text: 'Facebook', href: 'https://facebook.com' },
                    { text: 'Amazon', href: 'https://amazon.com' },
                    { text: 'Microsoft', href: 'https://microsoft.com' },
                  ],
                },
              ]}
            />
          </div>
        </ThemeProvider>
      )
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Footer component with external links that open in new tabs',
      },
    },
  },
}
