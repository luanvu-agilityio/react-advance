import { useCategoryStore } from '@stores/categoryStore'
import Select from '@components/common/Select'
import { SelectWrapper } from '@components/Searchbar/Searchbar.styles'
import {
  FilterControlContainer,
  FilterLabel,
  FilterRadio,
  FilterValue,
  RadioWrapper,
} from '@components/Pagination/PaginationStyles'

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
]

export const Sorting = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useCategoryStore()

  return (
    <FilterControlContainer>
      <FilterLabel>Sort By:</FilterLabel>
      <SelectWrapper
        style={{
          width: '100%',
          margin: '0',
          padding: 0,
          minWidth: '100px',
          maxWidth: '200px',
        }}
      >
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          variant="filter"
        />
      </SelectWrapper>
      <RadioWrapper>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <FilterRadio
            name="sortOrder"
            checked={sortOrder === 'asc'}
            onChange={() => setSortOrder('asc')}
          />
          <FilterValue $isActive={sortOrder === 'asc'}>
            <span>Ascending</span>
          </FilterValue>
        </label>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <FilterRadio
            name="sortOrder"
            checked={sortOrder === 'desc'}
            onChange={() => setSortOrder('desc')}
          />
          <FilterValue $isActive={sortOrder === 'desc'}>
            <span>Descending</span>
          </FilterValue>
        </label>
      </RadioWrapper>
    </FilterControlContainer>
  )
}
