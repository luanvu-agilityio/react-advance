import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCarousel } from '@hooks/useCarousel'
import { feedbacks } from '@constants/feedbacks'
import Text from '@components/common/Text/index'
import { memo, type MouseEvent } from 'react'
import { FeedbackItem } from '@components/common/FeedbackItem/Feedback'
import {
  CarouselContainer,
  CarouselHeader,
  FeedbacksContainer,
  FeedbackSlide,
  GradientOverlay,
  NextButton,
  PrevButton,
  StyledLink,
} from './Carousel.styles'

const MemoizedFeedbackItem = memo(FeedbackItem)
MemoizedFeedbackItem.displayName = 'MemoizedFeedbackItem'

const CustomerFeedbackCarousel = () => {
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
    itemsPerSlide: 3,
    itemWidth: 369,
    gap: 20,
  })

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
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

      <FeedbacksContainer>
        {/* Gradient overlay on the left */}
        <GradientOverlay $position="left" />

        {/* Gradient overlay on the right */}
        <GradientOverlay $position="right" />

        <FeedbackSlide
          ref={slideRef}
          data-testid="feedback-slide"
          $isDragging={isDragging}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {feedbacks.map((feedback) => (
            <MemoizedFeedbackItem
              key={feedback.id}
              quote={feedback.quote}
              name={feedback.name}
            />
          ))}
        </FeedbackSlide>
      </FeedbacksContainer>

      {/* Navigation buttons  */}
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
