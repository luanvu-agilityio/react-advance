import { useState, useEffect, useRef } from 'react'
import type { MouseEvent, RefObject, TouchEvent } from 'react'

/**
 * useCarousel - A custom hook for creating interactive, draggable carousel components
 *
 * This hook provides the core functionality for a carousel/slider UI component with:
 * - Button-based navigation (previous/next)
 * - Mouse and touch drag support with sliding
 * - Slide snapping after drag
 * - Configurable slide width and gap
 *
 * The hook handles all state management, drag interactions, and animation calculations
 * needed for a smooth carousel experience.
 *
 * @param {Object} options - Configuration options
 * @param {number} options.itemsCount - Total number of items in the carousel
 * @param {number} [options.itemsPerSlide=3] - Number of items visible per slide
 * @param {number} options.itemWidth - Width of each individual item in pixels
 * @param {number} [options.gap=20] - Gap between items in pixels
 *
 * @returns {Object} Carousel state and handlers
 * @returns {number} currentIndex - Current slide index (0-based)
 * @returns {RefObject<HTMLDivElement>} slideRef - Ref to attach to the sliding container
 * @returns {boolean} isDragging - Whether the carousel is currently being dragged
 * @returns {Function} handlePrev - Function to navigate to previous slide
 * @returns {Function} handleNext - Function to navigate to next slide
 * @returns {Function} handleDragStart - Event handler for drag/touch start
 * @returns {Function} handleDragMove - Event handler for drag/touch move
 * @returns {Function} handleDragEnd - Event handler for drag/touch end
 * @returns {number} maxIndex - Maximum possible slide index
 */

interface UseCarouselProps {
  itemsCount: number
  itemsPerSlide?: number
  itemWidth: number
  gap?: number
}

interface UseCarouselReturn {
  currentIndex: number
  slideRef: RefObject<HTMLDivElement | null>
  isDragging: boolean
  handlePrev: () => void
  handleNext: () => void
  handleDragStart: (e: MouseEvent | TouchEvent) => void
  handleDragMove: (e: MouseEvent | TouchEvent) => void
  handleDragEnd: () => void
  maxIndex: number
}

export const useCarousel = ({
  itemsCount,
  itemsPerSlide = 3,
  itemWidth,
  gap = 20,
}: UseCarouselProps): UseCarouselReturn => {
  // Refs
  const slideRef = useRef<HTMLDivElement>(null)

  // State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [prevTranslate, setPrevTranslate] = useState(0)

  // Derived values
  const cardWidth = itemWidth + gap
  const maxIndex = Math.max(0, itemsCount - itemsPerSlide)

  // Listen for dot navigation events
  useEffect(() => {
    const handleDotNavigation = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail && typeof customEvent.detail.index === 'number') {
        setCurrentIndex(customEvent.detail.index)
      }
    }

    document.addEventListener('dotnavigation', handleDotNavigation)
    return () =>
      document.removeEventListener('dotnavigation', handleDotNavigation)
  }, [])

  // Navigation functions
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }
  // Effect to update the translate when currentIndex changes or when itemWidth/gap changes
  useEffect(() => {
    const translate = currentIndex * -cardWidth
    setCurrentTranslate(translate)
    setPrevTranslate(translate)

    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(${translate}px)`
    }
  }, [currentIndex, cardWidth, itemWidth, gap])

  // Drag handlers
  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    setIsDragging(true)

    // Get the starting position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX

    setStartPos(clientX)
  }

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    // Get current position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX

    // Calculate how far we've moved
    const diff = clientX - startPos
    const translate = prevTranslate + diff

    // Update the transform
    setCurrentTranslate(translate)

    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(${translate}px)`
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)

    // Calculate which slide to snap to
    const movedBy = currentTranslate - prevTranslate

    // Threshold for changing slides (about 1/3 of card width)
    const threshold = cardWidth / 3

    // If moved enough to the right, go to previous slide
    if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
    // If moved enough to the left, go to next slide
    else if (movedBy < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    }
    // Otherwise, snap back to current slide
    else {
      const translate = currentIndex * -cardWidth
      if (slideRef.current) {
        slideRef.current.style.transform = `translateX(${translate}px)`
      }
    }

    setPrevTranslate(currentIndex * -cardWidth)
  }

  return {
    currentIndex,
    slideRef,
    isDragging,
    handlePrev,
    handleNext,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    maxIndex,
  }
}
