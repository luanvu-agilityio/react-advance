import styled from 'styled-components'
import Link from '@components/common/Link/index'

export const CarouselContainer = styled.div`
  position: relative;
  width: 100vw;
  max-width: 100%;
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
  width: 100%;
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

  @media (max-width: 767px) {
    display: none; /* Hide gradient overlays on mobile */
  }
`

export const FeedbackSlide = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  gap: 32px;
  transition: ${(props) =>
    props.$isDragging ? 'none' : 'transform 0.5s ease'};
  width: 100%;

  /* Always horizontal, but with different item sizing based on screen */
  @media (max-width: 767px) {
    gap: 16px; /* Smaller gap on mobile */
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

// Define a specific container for feedback items with responsive width
export const FeedbackItemWrapper = styled.div`
  /* On mobile: Full container width to show one at a time */
  flex: 0 0 100%;

  @media (min-width: 768px) {
    /* On desktop: Show multiple items */
    flex: 0 0 369px;
  }
`

export const MobileIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;

  @media (min-width: 768px) {
    display: none;
  }
`

export const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? 'var(--green-color-default)' : 'var(--black-shade-3)'};
  transition: background-color 0.3s;
  cursor: pointer;
`

export const MobileScrollHint = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  opacity: 0.7;
  animation: fadeOut 2s forwards 3s;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (min-width: 768px) {
    display: none;
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
`
