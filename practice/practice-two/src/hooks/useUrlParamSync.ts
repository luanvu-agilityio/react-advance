import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCategoryStore } from '@stores/categoryStore'

/**
 * useUrlParamSync - A custom hook for bidirectional synchronization between URL parameters and  state
 *
 * This hook manages the synchronization between URL search parameters and the application's category store state.
 * It provides two-way data binding:
 * 1. When URL parameters change (e.g., through navigation or manual URL changes), it updates the category store
 * 2. When category store state changes, it updates the URL parameters to match
 *
 * @returns {Object} An object containing utility functions
 * @returns {Function} syncToUrl - Force synchronize current state to URL parameters
 *
 * @notes
 * - This hook depends on useCategoryStore which must expose getUrlParams, setFromUrl and related state
 * - The hook automatically monitors currentPage and limit for changes
 */

export const useUrlParamSync = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getUrlParams, setFromUrl, currentPage, limit } = useCategoryStore()
  const isInitialized = useRef(false)
  const lastSyncedParams = useRef<string>('')

  // Read from URL on mount and when URL changes manually
  useEffect(() => {
    const currentParamsString = searchParams.toString()

    // Only sync if params actually changed
    if (currentParamsString !== lastSyncedParams.current) {
      setFromUrl(searchParams)
      lastSyncedParams.current = currentParamsString
    }

    isInitialized.current = true
  }, [searchParams, setFromUrl])

  // Update URL when store changes (but not during initialization)
  useEffect(() => {
    if (!isInitialized.current) return

    const newParams = getUrlParams()
    const newParamsString = newParams.toString()

    // Only update URL if it's different from current
    if (newParamsString !== lastSyncedParams.current) {
      // Preserve other URL params that aren't managed by the store
      const currentParams = new URLSearchParams(searchParams)

      // Remove managed params
      currentParams.delete('page')
      currentParams.delete('limit')
      currentParams.delete('subcategory')
      currentParams.delete('search')
      currentParams.delete('sort')
      currentParams.delete('order')

      // Add new managed params
      newParams.forEach((value, key) => {
        currentParams.set(key, value)
      })

      setSearchParams(currentParams, { replace: true })
      lastSyncedParams.current = newParamsString
    }
  }, [currentPage, limit, getUrlParams, setSearchParams, searchParams])

  return {
    syncToUrl: () => {
      const newParams = getUrlParams()
      setSearchParams(newParams, { replace: true })
    },
  }
}
