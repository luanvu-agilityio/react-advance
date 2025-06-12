import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: '20px 0' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Navbar>

// Default desktop view
export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
}

// Mobile view
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },

    backgrounds: { default: 'light' },
  },
  render: () => {
    setTimeout(() => {
      const menuButton = document.querySelector('button')
      if (menuButton) menuButton.click()
    }, 100)

    return <Navbar />
  },
}

// Hover state on desktop menu
export const DesktopWithHover: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  play: async ({ canvasElement }) => {
    // Simulate hover on first menu item
    const menuItem = canvasElement.querySelector('.trigger-button')
    if (menuItem) {
      const event = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
      })
      menuItem.dispatchEvent(event)
    }
  },
}
