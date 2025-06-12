import { useState, useEffect } from 'react'

/**
 * Custom hook for responsive design using media queries
 *
 * @param query Media query string (e.g. '(max-width: 1023px)')
 * @returns Boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    // Check on initial render
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia(query)
    const updateMatch = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Set initial value
    setMatches(mediaQuery.matches)

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatch)
    }
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMatch)
      }
    }
  }, [query])

  return matches
}
