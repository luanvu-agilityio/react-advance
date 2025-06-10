import { useQuery } from '@tanstack/react-query'
import { useCategoryStore } from '@stores/categoryStore'
import productApi, { type PaginatedResponse } from '@services/product'
import type { Product } from 'types/Product'

export const useProductFetch = (enabled: boolean = true) => {
  const { getApiParams } = useCategoryStore()

  const apiParams = getApiParams()

  return useQuery({
    queryKey: ['products', apiParams],
    queryFn: () => productApi.getProducts(apiParams),
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    select: (data: PaginatedResponse<Product>) => {
      return data
    },
  })
}
