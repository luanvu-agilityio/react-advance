import { useNavigate } from 'react-router-dom'
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
}
