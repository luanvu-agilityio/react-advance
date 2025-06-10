import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCartStore } from '@stores/cartStore'

import type { Product } from 'types/Product'
import { useToast } from '@contexts/ToastContext'

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  const { addItem } = useCartStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({
      product,
      quantity,
      unit,
    }: {
      product: Product
      quantity: number
      unit: string
    }) => {
      // Call your Zustand store action
      addItem(product, quantity, unit)

      // Return the cart item for the optimistic update
      return { product, quantity, unit }
    },
    onSuccess: () => {
      // Show success toast with Radix UI
      toast({
        title: 'Added to cart',
        description: 'Your item has been added to your cart',
        variant: 'success',
      })

      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      // Show error toast with Radix UI
      toast({
        title: 'Error adding to cart',
        description: error.message,
        variant: 'error',
      })
    },
  })
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()
  const { removeItem } = useCartStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (item: { id: number; title: string }) => {
      // Call Zustand store action
      removeItem(item.id)
      return item
    },
    onSuccess: (item) => {
      // Show success toast
      toast({
        title: 'Item removed',
        description: `${item.title} has been removed from your cart`,
        variant: 'info',
        duration: 3000,
      })

      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      toast({
        title: 'Error removing item',
        description: error.message,
        variant: 'error',
      })
    },
  })
}
