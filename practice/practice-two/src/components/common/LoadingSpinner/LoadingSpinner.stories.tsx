import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner } from './index'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/Common/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading spinner component that displays a spinner with optional loading text. Used to indicate loading states across the application.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default loading spinner with product loading text.',
      },
    },
  },
}

export const InContainer: Story = {
  render: () => (
    <div
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
      <LoadingSpinner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Loading spinner displayed within a container to show how it centers itself.',
      },
    },
  },
}

export const FullScreen: Story = {
  render: () => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <LoadingSpinner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full screen loading spinner overlay example.',
      },
    },
  },
}

export const LoadingStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        width: '800px',
      }}
    >
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          minHeight: '200px',
        }}
      >
        <LoadingSpinner />
      </div>
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          minHeight: '200px',
        }}
      >
        <LoadingSpinner />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple loading spinners to demonstrate consistent behavior.',
      },
    },
  },
}

export const WithCustomBackground: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        height: '300px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <LoadingSpinner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner on a custom background color.',
      },
    },
  },
}
