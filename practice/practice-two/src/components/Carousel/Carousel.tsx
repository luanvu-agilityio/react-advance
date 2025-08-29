'use client'

import { ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCarousel } from '@hooks/useCarousel'
import { feedbacks } from '@constants/feedbacks'
import Text from '@components/common/Text/index'
import { memo, useEffect, useState, type MouseEvent, useRef } from 'react'
import { FeedbackItem } from '@components/common/FeedbackItem/Feedback'
import {
  CarouselContainer,
  CarouselHeader,
  Dot,
  FeedbacksContainer,
  FeedbackSlide,
  FeedbackItemWrapper,
  GradientOverlay,
  MobileIndicator,
  MobileScrollHint,
  NextButton,
  PrevButton,
  StyledLink,
} from './Carousel.styles'

const MemoizedFeedbackItem = memo(FeedbackItem)
MemoizedFeedbackItem.displayName = 'MemoizedFeedbackItem'

const CustomerFeedbackCarousel = () => {
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Set up resize listener
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate item width based on container and screen size
  const [itemWidth, setItemWidth] = useState(369) // Default desktop width

  useEffect(() => {
    const updateItemWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth

        // On mobile: one item fills the container width
        if (isMobile) {
          setItemWidth(containerWidth)
        } else {
          // Default desktop width
          setItemWidth(369)
        }
      }
    }
    // Initial calculation
    updateItemWidth()

    // Update on resize
    window.addEventListener('resize', updateItemWidth)
    return () => window.removeEventListener('resize', updateItemWidth)
  }, [isMobile])

  // Hide scroll hint after user interaction
  const hideScrollHint = () => {
    setShowScrollHint(false)
  }

  // Hide scroll hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const {
    currentIndex,
    slideRef,
    isDragging,
    handlePrev,
    handleNext,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    maxIndex,
  } = useCarousel({
    itemsCount: feedbacks.length,
    // Show 1 on mobile, 3 on desktop
    itemsPerSlide: isMobile ? 1 : 3,
    itemWidth: itemWidth,
    gap: isMobile ? 16 : 32, // Smaller gap on mobile
  })

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
  }

  // Jump to a specific dot index
  const handleDotClick = (index: number) => {
    if (index >= 0 && index <= maxIndex) {
      // Update the currentIndex in the hook's state
      slideRef.current?.style.setProperty('transition', 'transform 0.5s ease')
      const translate = index * -(itemWidth + (isMobile ? 16 : 32))
      slideRef.current?.style.setProperty(
        'transform',
        `translateX(${translate}px)`
      )

      // The hook will update internally on the next render
      setTimeout(() => {
        const event = new CustomEvent('dotnavigation', { detail: { index } })
        document.dispatchEvent(event)
      }, 10)
    }
  }

  return (
    <CarouselContainer className="section">
      <CarouselHeader>
        <Text className="section-title" as="p" text="Our customers says" />
        <StyledLink href="javascript:void(0)" onClick={handleClick}>
          See more{' '}
          <ChevronRight
            size={14}
            color="var(--green-color-default"
            strokeWidth={4}
          />
        </StyledLink>
      </CarouselHeader>

      <FeedbacksContainer ref={containerRef}>
        {/* Gradients - only shown on desktop */}
        <GradientOverlay $position="left" />
        <GradientOverlay $position="right" />

        <FeedbackSlide
          ref={slideRef}
          data-testid="feedback-slide"
          $isDragging={isDragging}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => {
            hideScrollHint()
            handleDragStart(e)
          }}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {feedbacks.map((feedback) => (
            <FeedbackItemWrapper key={feedback.id}>
              <MemoizedFeedbackItem
                quote={feedback.quote}
                name={feedback.name}
              />
            </FeedbackItemWrapper>
          ))}
        </FeedbackSlide>

        {/* Mobile scroll indicator */}
        {isMobile && showScrollHint && (
          <MobileScrollHint>
            <ArrowLeftRight size={14} />
            Swipe to see more
          </MobileScrollHint>
        )}

        {/* Mobile pagination dots */}
        <MobileIndicator>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Dot
              key={index}
              $active={index === currentIndex}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </MobileIndicator>
      </FeedbacksContainer>

      {/* Navigation buttons - only shown on desktop */}
      <PrevButton onClick={handlePrev} disabled={currentIndex === 0}>
        <ChevronLeft size={20} />
      </PrevButton>
      <NextButton onClick={handleNext} disabled={currentIndex >= maxIndex}>
        <ChevronRight size={20} />
      </NextButton>
    </CarouselContainer>
  )
}

export default CustomerFeedbackCarousel
