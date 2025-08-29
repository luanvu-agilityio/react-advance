import { use } from 'react'
import { getProductCountBySubcategory } from '@services/product'

export function ProductCountSuspense({ subcategory }: { subcategory: string }) {
  const count = use(getProductCountBySubcategory(subcategory))
  return <>{count}</>
}
