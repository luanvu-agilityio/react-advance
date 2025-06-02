import type { Meta, StoryObj } from '@storybook/react'
import Badge from './index'

const meta: Meta<typeof Badge> = {
  title: 'Components/Common/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile badge component for displaying status, labels, or categories with consistent styling.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Content to display inside the badge',
      control: 'text',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'New',
  },
}

export const WithText: Story = {
  args: {
    children: 'Featured',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge displaying simple text content',
      },
    },
  },
}

export const WithNumber: Story = {
  args: {
    children: '5',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge displaying numeric content like counts or quantities',
      },
    },
  },
}

export const WithPercentage: Story = {
  args: {
    children: '25% OFF',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge displaying discount or percentage information',
      },
    },
  },
}

export const WithEmoji: Story = {
  args: {
    children: '🔥 Hot',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with emoji and text content',
      },
    },
  },
}

export const LongText: Story = {
  args: {
    children: 'Limited Time Offer',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Badge with longer text content to test text wrapping and sizing',
      },
    },
  },
}

export const SingleCharacter: Story = {
  args: {
    children: 'A',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with single character content',
      },
    },
  },
}

export const WithSpecialCharacters: Story = {
  args: {
    children: '★★★★★',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge displaying special characters like stars or symbols',
      },
    },
  },
}

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge>New</Badge>
      <Badge>Sale</Badge>
      <Badge>Popular</Badge>
      <Badge>Limited</Badge>
      <Badge>Bestseller</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple badges showing different status indicators',
      },
    },
  },
}

export const CountBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span>Notifications</span>
      <Badge>3</Badge>
      <span>Cart</span>
      <Badge>12</Badge>
      <span>Messages</span>
      <Badge>99+</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges used as notification counters alongside labels',
      },
    },
  },
}

export const EmptyBadge: Story = {
  args: {
    children: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case: badge with empty content',
      },
    },
  },
}
