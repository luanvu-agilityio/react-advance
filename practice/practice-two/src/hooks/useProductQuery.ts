import { useQuery } from '@tanstack/react-query'
import productApi from '@services/product'

export const useProductDetails = (productId: string | undefined) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProductById(Number(productId) || 0),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProductTabData = (productId: number | undefined) => {
  return useQuery({
    queryKey: ['productTabs', productId],
    queryFn: () => productApi.getTabDataByProductId(productId || 0),
    enabled: productId !== undefined,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useRelatedProducts = (
  productId: number | undefined,
  subcategory: string | undefined
) => {
  return useQuery({
    queryKey: ['relatedProducts', subcategory, productId],
    queryFn: () =>
      productApi.getRelatedProducts(productId || 0, subcategory || ''),
    enabled: !!productId && !!subcategory,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
