'use client'

import type { NoResultsSectionProps } from 'types/Category'

import {
  NoResultsContainer,
  NoResultsIcon,
  NoResultsTitle,
  NoResultsText,
  ResetFiltersButton,
} from './CategoryStyles'

export const NoResultsSection = ({
  searchQuery,
  onResetFilters,
}: NoResultsSectionProps) => (
  <NoResultsContainer>
    <NoResultsIcon>
      <img
        src={
          'https://res.cloudinary.com/ds82onf5q/image/upload/v1748588602/no-result_m94uij.png'
        }
        alt="No results"
        onError={(e) => {
          e.currentTarget.src =
            'https://res.cloudinary.com/ds82onf5q/image/upload/v1748588745/not-found_rvijxv.png'
        }}
      />
    </NoResultsIcon>
    <NoResultsTitle>No products found</NoResultsTitle>
    <NoResultsText>
      {searchQuery
        ? 'No products match your search query and applied filters.'
        : 'No products match your selected filters.'}
    </NoResultsText>
    <ResetFiltersButton onClick={onResetFilters}>
      Reset Filters
    </ResetFiltersButton>
  </NoResultsContainer>
)
