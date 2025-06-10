import type { Meta, StoryObj } from '@storybook/react'
import Text from './index'

const meta = {
  title: 'Components/Common/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    as: {
      control: 'select',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
    },
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof Text>

// Basic paragraph
export const Paragraph: Story = {
  args: {
    text: 'This is a paragraph text',
    as: 'p',
  },
}

// Heading 1
export const Heading1: Story = {
  args: {
    text: 'This is a Heading 1',
    as: 'h1',
    style: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
  },
}

// Heading 2
export const Heading2: Story = {
  args: {
    text: 'This is a Heading 2',
    as: 'h2',
    style: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  },
}

// Span text
export const SpanText: Story = {
  args: {
    text: 'This is an inline span text',
    as: 'span',
  },
}

// Styled text
export const StyledText: Story = {
  args: {
    text: 'This is a styled text',
    as: 'p',
    style: {
      color: '#2563eb',
      fontSize: '1.25rem',
      fontWeight: '600',
      textDecoration: 'underline',
    },
  },
}

// Multiple text variants
export const TextVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text
        as="h1"
        text="Heading 1"
        style={{ fontSize: '2rem', fontWeight: 'bold' }}
      />
      <Text
        as="h2"
        text="Heading 2"
        style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
      />
      <Text
        as="h3"
        text="Heading 3"
        style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
      />
      <Text as="p" text="Regular paragraph text" />
      <Text as="span" text="Inline span text" />
      <Text
        as="div"
        text="Custom styled div"
        style={{
          backgroundColor: 'var(--coral-shade-3)',
          padding: '0.5rem',
          borderRadius: '0.25rem',
        }}
      />
    </div>
  ),
}
