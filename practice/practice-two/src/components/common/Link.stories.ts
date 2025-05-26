import type { Meta, StoryObj } from '@storybook/react'
import Link from './Link'

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
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
    },
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
    onClick: (e) => e.preventDefault(),
  },
}

export const ExternalLink: Story = {
  args: {
    href: 'https://google.com.vn',
    children: 'Google VN',
    target: '_blank',
    onClick: (e) => e.preventDefault(),
  },
}

export const DisabledLink: Story = {
  args: {
    href: 'https://google.com.vn',
    children: 'Google VN',
    disabled: true,
    onClick: (e) => e.preventDefault(),
  },
}

export const CustomStyledLink: Story = {
  args: {
    href: 'https://google.com.vn',
    children: 'Google VN',
    onClick: (e) => e.preventDefault(),
    style: {
      color: 'var(--green-color-default)',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
}
