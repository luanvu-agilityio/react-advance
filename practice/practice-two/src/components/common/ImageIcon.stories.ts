import type { Meta, StoryObj } from '@storybook/react'
import ImageIcon from './ImageIcon'

const meta = {
  title: 'Components/Common/ImageIcon',
  component: ImageIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'number' },
    className: { control: 'text' },
    onError: { action: 'onError' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof ImageIcon>

export default meta
type Story = StoryObj<typeof ImageIcon>

// Default story
export const Default: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1746692204/search_zyzkuj.svg',
    alt: 'Example Icon',
    size: 16,
  },
}

// Large size story
export const LargeIcon: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1746692204/search_zyzkuj.svg',
    alt: 'Large Icon',
    size: 32,
  },
}

// Custom styled story
export const CustomStyled: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1746692204/search_zyzkuj.svg',
    alt: 'Styled Icon',
    size: 24,
    style: {
      backgroundColor: '#f0f0f0',
      padding: '8px',
      borderRadius: '4px',
    },
  },
}

// Error handling story
export const WithErrorHandler: Story = {
  args: {
    src: 'https://example.com/invalid-image-url.png',
    alt: 'Invalid Image',
    size: 24,
    onError: (img) => {
      // Replace the img src with a Lucide React icon
      const fallbackIcon = document.createElement('div')
      fallbackIcon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'
      img.parentNode?.replaceChild(fallbackIcon.firstChild!, img)
    },
  },
}
