import { startTransition, useCallback, type Dispatch } from 'react'

export const useResetFilters = (
  setSelectedBrands: Dispatch<React.SetStateAction<string[]>>,
  setSelectedRatings: Dispatch<React.SetStateAction<number[]>>,
  setPriceRange: Dispatch<React.SetStateAction<{ min: number; max: number }>>
) => {
  return useCallback(() => {
    startTransition(() => {
      setSelectedBrands([])
      setSelectedRatings([])
      setPriceRange({ min: 0, max: 1000 })
    })
  }, [setSelectedBrands, setSelectedRatings, setPriceRange])
}
