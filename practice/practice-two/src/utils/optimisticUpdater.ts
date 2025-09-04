import type { OptimisticAction } from 'types/optimistic-action'
import type { Product } from 'types/Product'

/**
 * Optimistic updater function for product filtering
 * This function defines HOW to update the product list based on different filter actions
 */
export const optimisticProductUpdater = (
  currentProducts: Product[],
  action: OptimisticAction,
  baseProducts?: Product[]
): Product[] => {
  const productsToFilter = baseProducts ?? currentProducts

  switch (action.type) {
    case 'FILTER_SUBCATEGORY':
      return action.subcategory
        ? productsToFilter.filter(
            (product) => product.subcategory === action.subcategory
          )
        : productsToFilter

    case 'FILTER_BRANDS':
      return action.brands.length === 0
        ? productsToFilter
        : productsToFilter.filter((product) =>
            action.brands.includes(product.brand)
          )

    case 'FILTER_RATINGS':
      return action.ratings.length === 0
        ? productsToFilter
        : productsToFilter.filter((product) =>
            action.ratings.includes(Math.floor(product.rating))
          )

    case 'FILTER_PRICE':
      return productsToFilter.filter(
        (product) => product.price >= action.min && product.price <= action.max
      )

    case 'RESET_FILTERS':
      return productsToFilter

    default:
      console.warn('Unknown optimistic action type:', action)
      return currentProducts
  }
}
