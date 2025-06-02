import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { generateTagUrl, findProductByKeyword } from '@utils/tagUtils'
import type { ProductTag } from '@utils/tagUtils'

export const useTagNavigation = () => {
  const navigate = useNavigate()

  const navigateToTag = useCallback(
    (tag: ProductTag) => {
      const url = generateTagUrl(tag)
      navigate(url)
    },
    [navigate]
  )

  const searchByKeyword = useCallback(
    (keyword: string) => {
      const product = findProductByKeyword(keyword)

      if (product) {
        navigate(`/product/${product.id}`)
      } else {
        navigate(`/search-results?search=${encodeURIComponent(keyword)}`)
      }
    },
    [navigate]
  )

  return {
    navigateToTag,
    searchByKeyword,
  }
}
