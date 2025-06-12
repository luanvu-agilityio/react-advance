import { create } from 'zustand'
import type { Toast, ToastVariant } from '@components/common/Toast/Toast'

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearAllToasts: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },

  clearAllToasts: () => {
    set({ toasts: [] })
  },
}))

export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast)

  return {
    toast: ({
      title,
      description,
      variant = 'info' as ToastVariant,
      duration = 2000,
    }: Omit<Toast, 'id'>) => {
      addToast({ title, description, variant, duration })
    },
  }
}
