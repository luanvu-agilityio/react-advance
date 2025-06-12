import styled from 'styled-components'
import Link from '@components/common/Link/index'

export const CarouselContainer = styled.div`
  position: relative;
  width: 100vw;
`

export const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
`

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  color: var(--black-color-default);
  gap: 6px;
`

export const NavButton = styled.button`
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

export const PrevButton = styled(NavButton)`
  left: 0;
  margin-left: -8px;
`

export const NextButton = styled(NavButton)`
  right: 0;
  margin-right: -8px;
`

export const FeedbacksContainer = styled.div`
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

export const GradientOverlay = styled.div<{ $position: 'left' | 'right' }>`
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

export const FeedbackSlide = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  gap: 32px;
  transition: ${(props) =>
    props.$isDragging ? 'none' : 'transform 0.5s ease'};

  @media (max-width: 768px) {
    flex-direction: column;
  }

  // Design width (1260px)
  @media (min-width: 1260px) {
    width: 1260px;
    margin: 0 auto;
  }

  // Large screens
  @media (min-width: 1460px) {
    max-width: 1460px;
    margin: 0 auto;
  }
`
