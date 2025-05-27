import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from 'types/Product'

export const useProductNavigation = () => {
  const navigate = useNavigate()

  const navigateToProduct = useCallback(
    (product: Product) => {
      if (!product.category || !product.subcategory) {
        console.warn('Product missing category or subcategory:', product)
        return
      }

      const categoryPath = product.category.toLowerCase().replace(/ /g, '-')
      const subcategoryPath = product.subcategory
        .toLowerCase()
        .replace(/ /g, '-')

      navigate(`/${categoryPath}/${subcategoryPath}/${product.id}`)
      window.scrollTo(0, 0)
    },
    [navigate]
  )

  const createProductClickHandler = useCallback(
    (products: Product[]) => {
      return (id: number) => {
        const product = products.find((p) => p.id === id)
        if (product) {
          navigateToProduct(product)
        } else {
          console.warn('Product not found with id:', id)
        }
      }
    },
    [navigateToProduct]
  )

  return {
    navigateToProduct,
    createProductClickHandler,
  }
}
