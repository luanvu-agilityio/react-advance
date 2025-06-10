import { useState, useEffect, useRef } from 'react'
import type { MouseEvent, RefObject, TouchEvent } from 'react'

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

  // Navigation functions
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  // Effect to update the translate when currentIndex changes
  useEffect(() => {
    const translate = currentIndex * -cardWidth
    setCurrentTranslate(translate)
    setPrevTranslate(translate)

    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(${translate}px)`
    }
  }, [currentIndex, cardWidth])

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
