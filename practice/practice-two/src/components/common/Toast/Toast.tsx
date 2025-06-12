import * as RadixToast from '@radix-ui/react-toast'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
  duration?: number
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemoveToast: (id: string) => void
}

export const ToastContainer = ({
  toasts,
  onRemoveToast,
}: ToastContainerProps) => {
  return (
    <RadixToast.Provider>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
      <RadixToast.Viewport className="toast-viewport" />
    </RadixToast.Provider>
  )
}

interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const getColor = () => {
    switch (toast.variant) {
      case 'success':
        return '#2B9348'
      case 'error':
        return '#D00000'
      case 'warning':
        return '#E85D04'
      case 'info':
        return '#1E88E5'
      default:
        return '#1E88E5'
    }
  }

  return (
    <RadixToast.Root
      className={`toast-root toast-${toast.variant}`}
      duration={toast.duration ?? 3000}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <div>
        <RadixToast.Title className="toast-title" style={{ color: getColor() }}>
          {toast.title}
        </RadixToast.Title>
        {toast.description && (
          <RadixToast.Description className="toast-description">
            {toast.description}
          </RadixToast.Description>
        )}
      </div>
      <RadixToast.Close className="toast-close">×</RadixToast.Close>
    </RadixToast.Root>
  )
}
