import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ErrorBoundary from './ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error for ErrorBoundary')
  }
  return <div>This component works fine!</div>
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/Common/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'ErrorBoundary catches JavaScript errors anywhere in the child component tree and displays a fallback UI instead of crashing the entire application.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Child components to wrap with error boundary',
    },
    fallback: {
      description: 'Custom fallback UI to display when an error occurs',
    },
    onError: {
      description: 'Callback function called when an error is caught',
      action: 'onError',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ErrorBoundary>

export const Default: Story = {
  render: () => (
    <ErrorBoundary onError={action('error-caught')}>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default error boundary showing the built-in error UI when a child component throws an error.',
      },
    },
  },
}

export const WorkingComponent: Story = {
  render: () => (
    <ErrorBoundary onError={action('error-caught')}>
      <ThrowError shouldThrow={false} />
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Error boundary with a working child component - no error UI is shown.',
      },
    },
  },
}

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary
      fallback={
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
          }}
        >
          <h3>Custom Error Message</h3>
          <p>This is a custom fallback UI</p>
        </div>
      }
      onError={action('error-caught')}
    >
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Error boundary with a custom fallback UI instead of the default error display.',
      },
    },
  },
}

export const NestedComponents: Story = {
  render: () => (
    <ErrorBoundary onError={action('error-caught')}>
      <div style={{ padding: '20px' }}>
        <h2>Parent Component</h2>
        <div style={{ margin: '20px 0' }}>
          <h3>Child Component</h3>
          <ThrowError shouldThrow={true} />
        </div>
      </div>
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Error boundary wrapping nested components where a deeply nested component throws an error.',
      },
    },
  },
}
