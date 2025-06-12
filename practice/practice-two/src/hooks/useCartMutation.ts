import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCartStore } from '@stores/cartStore'

import type { Product } from 'types/Product'
import { useToast } from '@stores/toastStore'

/**
 * Cart Mutation Hooks
 *
 * This module provides React Query mutation hooks for cart operations with integrated
 * toast notifications. These hooks handle the data mutations,
 * and user feedback for cart-related actions.
 */

/**
 * useAddToCart - Hook for adding products to the shopping cart
 *
 * This hook provides a mutation function that adds products to the cart and
 * displays appropriate success/error notifications using toast messages.
 * It also invalidates relevant queries to ensure data consistency.
 *
 * @returns {UseMutationResult} A React Query mutation result object containing:
 *   - mutate: Function to call when adding an item to cart
 *   - isPending: Boolean indicating if the operation is in progress
 *   - isError: Boolean indicating if the operation failed
 *   - error: Error information if the operation failed
 */

/**
 * Cart Mutation Hooks
 *
 * This module provides React Query mutation hooks for cart operations with integrated
 * toast notifications. These hooks handle the data mutations,
 * and user feedback for cart-related actions.
 */

/**
 * useAddToCart - Hook for adding products to the shopping cart
 *
 * This hook provides a mutation function that adds products to the cart and
 * displays appropriate success/error notifications using toast messages.
 * It also invalidates relevant queries to ensure data consistency.
 *
 * @returns {UseMutationResult} A React Query mutation result object containing:
 *   - mutate: Function to call when adding an item to cart
 *   - isPending: Boolean indicating if the operation is in progress
 *   - isError: Boolean indicating if the operation failed
 *   - error: Error information if the operation failed
 */

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

/**
 * useRemoveFromCart - Hook for removing items from the shopping cart
 *
 * This hook provides a mutation function that removes products from the cart and
 * displays appropriate success/error notifications using toast messages.
 *
 * @returns {UseMutationResult} A React Query mutation result object containing:
 *   - mutate: Function to call when removing an item from cart
 *   - isPending: Boolean indicating if the operation is in progress
 *   - isError: Boolean indicating if the operation failed
 *   - error: Error information if the operation failed
 */
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
