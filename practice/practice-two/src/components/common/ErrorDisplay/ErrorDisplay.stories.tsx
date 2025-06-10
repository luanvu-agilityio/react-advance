import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ErrorDisplay from './index'

const meta: Meta<typeof ErrorDisplay> = {
  title: 'Components/Common/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An error display component that shows error messages with an optional retry button. Used to handle error states across the application.',
      },
    },
  },
  argTypes: {
    error: {
      description: 'Error message to display',
      control: 'text',
    },
    onRetry: {
      description:
        'Optional retry function called when the retry button is clicked',
      action: 'onRetry',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ErrorDisplay>

export const Default: Story = {
  args: {
    error: 'Something went wrong while loading the data.',
    onRetry: action('retry-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default error display with an error message and retry button.',
      },
    },
  },
}

export const WithoutRetryButton: Story = {
  args: {
    error: 'This error cannot be retried. Please contact support.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error display without a retry button when onRetry is not provided.',
      },
    },
  },
}

export const NetworkError: Story = {
  args: {
    error:
      'Network connection failed. Please check your internet connection and try again.',
    onRetry: action('network-retry'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error display for network-related errors.',
      },
    },
  },
}

export const ServerError: Story = {
  args: {
    error:
      'Internal server error (500). Our team has been notified and is working on a fix.',
    onRetry: action('server-retry'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error display for server errors.',
      },
    },
  },
}

export const ValidationError: Story = {
  args: {
    error:
      'The data you submitted is invalid. Please check your input and try again.',
    onRetry: action('validation-retry'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error display for validation errors.',
      },
    },
  },
}

export const LongErrorMessage: Story = {
  args: {
    error:
      'This is a very long error message that demonstrates how the component handles extended text. It should wrap properly and maintain good readability even with multiple lines of error details. The component should handle this gracefully without breaking the layout.',
    onRetry: action('long-error-retry'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error display with a long error message to test text wrapping.',
      },
    },
  },
}

export const InContainer: Story = {
  render: (args) => (
    <div
      style={{
        width: '600px',
        height: '400px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
      }}
    >
      <ErrorDisplay {...args} />
    </div>
  ),
  args: {
    error: 'Failed to load user data from the server.',
    onRetry: action('container-retry'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error display within a container to show how it fits in different layouts.',
      },
    },
  },
}

export const MultipleErrors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '800px',
      }}
    >
      <ErrorDisplay
        error="Failed to load user profile."
        onRetry={action('profile-retry')}
      />
      <ErrorDisplay
        error="Unable to fetch notifications."
        onRetry={action('notifications-retry')}
      />
      <ErrorDisplay error="Payment processing is currently unavailable." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple error displays to show consistent styling.',
      },
    },
  },
}
