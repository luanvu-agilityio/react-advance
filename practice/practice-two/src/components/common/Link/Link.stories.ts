import type { Meta, StoryObj } from '@storybook/react'
import Link from './index'

const meta = {
  title: 'Components/Common/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    className: { control: 'text' },

    disabled: { control: 'boolean' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    href: 'https://google.com.vn',
    children: 'Google VN',
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
  },
}

export const ExternalLink: Story = {
  args: {
    href: 'https://google.com.vn',
    children: 'Google VN',

    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
  },
}

export const DisabledLink: Story = {
  args: {
    href: 'https://google.com.vn',
    children: 'Google VN',
    disabled: true,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
  },
}

export const CustomStyledLink: Story = {
  args: {
    href: 'https://google.com.vn',
    children: 'Google VN',
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
    style: {
      color: 'var(--green-color-default)',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
}
