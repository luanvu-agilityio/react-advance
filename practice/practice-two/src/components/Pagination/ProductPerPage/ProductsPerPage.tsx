'use client'

import { useCategoryStore } from '@stores/categoryStore'
import { SelectWrapper } from '@components/Searchbar/Searchbar.styles'
import Select from '@components/common/Select'
import { FilterControlContainer, FilterLabel } from '../PaginationStyles'

const productsPerPageOptions = [
  { value: '5', label: '5 per page' },
  { value: '10', label: '10 per page' },
  { value: '15', label: '15 per page' },
  { value: '20', label: '20 per page' },
]

export const ProductsPerPage = () => {
  const { displayLimit, setDisplayLimit } = useCategoryStore()

  const handleChange = (value: string) => {
    const newLimit = parseInt(value, 10)
    setDisplayLimit(newLimit)
  }

  return (
    <FilterControlContainer>
      <FilterLabel>Product per page</FilterLabel>
      <SelectWrapper
        style={{
          width: '100%',
          margin: '0',
          padding: 0,
          minWidth: '120px',
          maxWidth: '200px',
        }}
      >
        <Select
          options={productsPerPageOptions}
          value={displayLimit.toString()}
          onChange={handleChange}
          variant="filter"
        />
      </SelectWrapper>
    </FilterControlContainer>
  )
}
