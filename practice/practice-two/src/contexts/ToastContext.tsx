import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import '@styles/toast.css'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const value = useMemo(() => ({ toasts, addToast, removeToast }), [toasts])

  return (
    <ToastContext.Provider value={value}>
      <RadixToast.Provider>
        {children}
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
        <RadixToast.Viewport className="toast-viewport" />
      </RadixToast.Provider>
    </ToastContext.Provider>
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

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return {
    toast: ({
      title,
      description,
      variant = 'info',
      duration = 3000,
    }: Omit<Toast, 'id'>) => {
      context.addToast({ title, description, variant, duration })
    },
  }
}
