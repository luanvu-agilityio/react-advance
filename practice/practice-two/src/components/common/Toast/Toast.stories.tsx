import type { Meta, StoryObj } from '@storybook/react'
import { ToastContainer, type Toast } from './Toast'
import { useEffect, useState } from 'react'
import { Button } from '@radix-ui/themes'

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Toast',
  component: ToastContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToastContainer>

// Helper component to control toasts in Storybook
const ToastManager = ({
  initialToasts,
  showControls = false,
}: {
  initialToasts: Toast[]
  showControls?: boolean
}) => {
  const [toasts, setToasts] = useState<Toast[]>(initialToasts)

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const addToast = (variant: Toast['variant']) => {
    const id = `toast-${Date.now()}`
    const newToast: Toast = {
      id,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: `This is a ${variant} toast message`,
      variant,
    }
    setToasts((prev) => [...prev, newToast])
  }

  return (
    <div>
      {showControls && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <Button onClick={() => addToast('success')}>Add Success</Button>
          <Button onClick={() => addToast('error')}>Add Error</Button>
          <Button onClick={() => addToast('warning')}>Add Warning</Button>
          <Button onClick={() => addToast('info')}>Add Info</Button>
        </div>
      )}

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  )
}

// Single toast stories
export const SuccessToast: Story = {
  render: () => {
    const successToast: Toast[] = [
      {
        id: 'success-1',
        title: 'Success Toast',
        description: 'Your action was completed successfully!',
        variant: 'success',
      },
    ]
    return <ToastManager initialToasts={successToast} />
  },
}

export const ErrorToast: Story = {
  render: () => {
    const errorToast: Toast[] = [
      {
        id: 'error-1',
        title: 'Error Toast',
        description: 'Something went wrong!',
        variant: 'error',
      },
    ]
    return <ToastManager initialToasts={errorToast} />
  },
}

export const WarningToast: Story = {
  render: () => {
    const warningToast: Toast[] = [
      {
        id: 'warning-1',
        title: 'Warning Toast',
        description: 'Please review your information before proceeding.',
        variant: 'warning',
      },
    ]
    return <ToastManager initialToasts={warningToast} />
  },
}

export const InfoToast: Story = {
  render: () => {
    const infoToast: Toast[] = [
      {
        id: 'info-1',
        title: 'Info Toast',
        description: 'Just letting you know!',
        variant: 'info',
      },
    ]
    return <ToastManager initialToasts={infoToast} />
  },
}

// Toast without description
export const ToastWithoutDescription: Story = {
  render: () => {
    const toast: Toast[] = [
      {
        id: 'no-desc-1',
        title: 'Toast Without Description',
        variant: 'info',
      },
    ]
    return <ToastManager initialToasts={toast} />
  },
}

// Custom duration toast
export const CustomDurationToast: Story = {
  render: () => {
    const toast: Toast[] = [
      {
        id: 'long-duration-1',
        title: 'Long Duration Toast (10s)',
        description: 'This toast will stay for 10 seconds',
        variant: 'success',
        duration: 10000,
      },
    ]
    return <ToastManager initialToasts={toast} />
  },
}

// Multiple toasts
export const MultipleToasts: Story = {
  render: () => {
    const allVariantToasts: Toast[] = [
      {
        id: 'multi-success',
        title: 'Success Toast',
        description: 'Your action was completed successfully!',
        variant: 'success',
      },
      {
        id: 'multi-error',
        title: 'Error Toast',
        description: 'Something went wrong!',
        variant: 'error',
      },
      {
        id: 'multi-warning',
        title: 'Warning Toast',
        description: 'Please review your information before proceeding.',
        variant: 'warning',
      },
      {
        id: 'multi-info',
        title: 'Info Toast',
        description: 'Just letting you know!',
        variant: 'info',
      },
    ]
    return <ToastManager initialToasts={allVariantToasts} />
  },
}

// Interactive demo with controls
export const InteractiveDemo: Story = {
  render: () => {
    return <ToastManager initialToasts={[]} showControls={true} />
  },
}

// Auto-add toast when story loads
export const AutoShowToast: Story = {
  render: () => {
    // Create a component to handle the auto-showing toast
    const AutoShowToastComponent = () => {
      const [toasts, setToasts] = useState<Toast[]>([])

      useEffect(() => {
        // Add a toast when the component mounts
        const id = 'auto-toast'
        setToasts([
          {
            id,
            title: 'Auto-Shown Toast',
            description: 'This toast appears automatically',
            variant: 'success',
            duration: 5000,
          },
        ])
      }, [])

      const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }

      return <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    }

    return <AutoShowToastComponent />
  },
}
