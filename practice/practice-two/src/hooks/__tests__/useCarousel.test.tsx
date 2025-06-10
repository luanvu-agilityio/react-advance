import { renderHook, act } from '@testing-library/react'
import { useCarousel } from '../useCarousel'
import type { MouseEvent } from 'react'

describe('useCarousel', () => {
  const mockProps = {
    itemsCount: 5,
    itemsPerSlide: 2,
    itemWidth: 200,
    gap: 20,
  }

  beforeEach(() => {
    // Mock the DOM element for slideRef
    Object.defineProperty(HTMLDivElement.prototype, 'style', {
      value: {
        transform: '',
      },
      writable: true,
    })
  })

  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useCarousel(mockProps))

    expect(result.current.currentIndex).toBe(0)
    expect(result.current.isDragging).toBe(false)
    expect(result.current.maxIndex).toBe(3) // itemsCount - itemsPerSlide
  })

  it('should navigate to next slide', () => {
    const { result } = renderHook(() => useCarousel(mockProps))

    act(() => {
      result.current.handleNext()
    })

    expect(result.current.currentIndex).toBe(1)
  })

  it('should navigate to previous slide', () => {
    const { result } = renderHook(() => useCarousel(mockProps))

    // First go to index 1
    act(() => {
      result.current.handleNext()
    })

    // Then go back to index 0
    act(() => {
      result.current.handlePrev()
    })

    expect(result.current.currentIndex).toBe(0)
  })

  it('should not navigate before first slide', () => {
    const { result } = renderHook(() => useCarousel(mockProps))

    act(() => {
      result.current.handlePrev()
    })

    expect(result.current.currentIndex).toBe(0)
  })

  it('should not navigate past last slide', () => {
    const { result } = renderHook(() => useCarousel(mockProps))

    // Navigate to the last slide
    act(() => {
      result.current.handleNext()
      result.current.handleNext()
      result.current.handleNext()
    })

    expect(result.current.currentIndex).toBe(3)

    // Try to go beyond the last slide
    act(() => {
      result.current.handleNext()
    })

    expect(result.current.currentIndex).toBe(3)
  })

  it('should handle drag interactions', () => {
    const { result } = renderHook(() => useCarousel(mockProps))

    // Start dragging
    act(() => {
      result.current.handleDragStart({
        clientX: 500,
      } as MouseEvent)
    })

    expect(result.current.isDragging).toBe(true)

    // End dragging
    act(() => {
      result.current.handleDragEnd()
    })

    expect(result.current.isDragging).toBe(false)
  })
})
