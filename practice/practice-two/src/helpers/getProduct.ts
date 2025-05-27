import { productData } from 'data/product-data'
import type { Product } from 'types/Product'

export const getProductsBySection = (
  section: string,
  limit: number = 4
): Product[] => {
  return productData
    .filter((product) => product.section?.includes(section))
    .slice(0, limit)
}
