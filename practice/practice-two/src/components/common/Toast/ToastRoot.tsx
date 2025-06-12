import { useToastStore } from '@stores/toastStore'
import { ToastContainer } from './Toast'

export const ToastRoot = () => {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  return <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
}
