import styled from 'styled-components'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCarousel } from '@hooks/useCarousel'
import { feedbacks } from '@dummy-data/feedbacks'
import { FeedbackItem } from './Feedback'
import Text from '@components/common/Text'
import type { MouseEvent } from 'react'
import Link from '@components/common/Link'

const CarouselContainer = styled.div`
  position: relative;
  width: 100vw;
`

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  color: var(--black-color-default);
  gap: 6px;
`

const NavButton = styled.button`
  display: none; /* Hide on mobile */
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 48px;
  border-radius: 8px;
  background: var(--black-color-default);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: white;
  box-shadow: 0px 1px 2px 0px #00000040;

  @media (min-width: 768px) {
    display: flex;
  }

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PrevButton = styled(NavButton)`
  left: 0;
  margin-left: -8px;
`

const NextButton = styled(NavButton)`
  right: 0;
  margin-right: -8px;
`

const FeedbacksContainer = styled.div`
  overflow: hidden;
  position: relative;
  padding: 8px 0 48px;

  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }
`

const GradientOverlay = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  ${(props) => (props.$position === 'left' ? 'left: 0;' : 'right: 0;')}
  width: 80px;
  height: 100%;
  pointer-events: none;
  z-index: 5;
  background: linear-gradient(
    to ${(props) => (props.$position === 'left' ? 'right' : 'left')},
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`

const FeedbackSlide = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  gap: 32px;
  transition: ${(props) =>
    props.$isDragging ? 'none' : 'transform 0.5s ease'};

  // Design width (1260px)
  @media (min-width: 1260px) {
    width: 1260px;
    margin: 0 auto;
  }

  // Large screens
  @media (min-width: 1460px) {
    width: 90%;
    max-width: 1460px;
    margin: 0 auto;
  }
`

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
            <FeedbackItem
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
