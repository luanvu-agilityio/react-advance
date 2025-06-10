import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import type { ProductTag } from '@utils/tagUtils'
import { useCategoryStore } from '@stores/categoryStore'

export const useTagNavigation = () => {
  const navigate = useNavigate()
  const { setCategory, setSubcategory, setBrands, setSearchQuery } =
    useCategoryStore()

  const navigateToTag = (tag: ProductTag) => {
    switch (tag.type) {
      case 'category':
        navigate(`/${tag.value}`)
        setCategory(tag.value)
        break
      case 'subcategory':
        if (tag.categoryPath) {
          navigate(`/${tag.categoryPath}`)
          setCategory(tag.categoryPath)
          setSubcategory(tag.value)
        }
        break
      case 'brand':
        navigate('/all-products')
        setBrands([tag.value])
        break
      case 'product':
        navigate('/search-results')
        setSearchQuery(tag.label)
        break
      default:
        navigate('/all-products')
    }
  }

  return { navigateToTag }
=======
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
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
}
