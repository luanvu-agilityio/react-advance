import { TextEncoder } from 'util'
global.TextEncoder = TextEncoder
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'
import CustomerFeedbackCarousel from './Carousel'
import { useCarousel } from '@hooks/useCarousel'
import { feedbacks } from '@constants/feedbacks'

// Mock the useCarousel hook
jest.mock('@hooks/useCarousel', () => ({
  useCarousel: jest.fn(),
}))

describe('CustomerFeedbackCarousel - Rendering', () => {
  // Set up the mock implementation before each test
  beforeEach(() => {
    ;(useCarousel as jest.Mock).mockReturnValue({
      currentIndex: 0,
      slideRef: { current: null },
      isDragging: false,
      handlePrev: jest.fn(),
      handleNext: jest.fn(),
      handleDragStart: jest.fn(),
      handleDragMove: jest.fn(),
      handleDragEnd: jest.fn(),
      maxIndex: feedbacks.length - 3,
    })
  })

  // Clean up mocks after each test
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders carousel with correct title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomerFeedbackCarousel />
      </BrowserRouter>
    )
    expect(getByText('Our customers says')).toBeInTheDocument()
  })

  test('renders previous and next navigation buttons', () => {
    const { container } = render(
      <BrowserRouter>
        <CustomerFeedbackCarousel />
      </BrowserRouter>
    )

    // Find prev button - using the styling and structure
    const prevButton = container.querySelector('button:first-of-type')
    expect(prevButton).toBeInTheDocument()

    // Find next button - using the styling and structure
    const nextButton = container.querySelector('button:last-of-type')
    expect(nextButton).toBeInTheDocument()
  })

  test('renders disabled prev button when at first slide', () => {
    ;(useCarousel as jest.Mock).mockReturnValue({
      currentIndex: 0,
      slideRef: { current: null },
      isDragging: false,
      handlePrev: jest.fn(),
      handleNext: jest.fn(),
      handleDragStart: jest.fn(),
      handleDragMove: jest.fn(),
      handleDragEnd: jest.fn(),
      maxIndex: feedbacks.length - 3,
    })

    const { container } = render(
      <BrowserRouter>
        <CustomerFeedbackCarousel />
      </BrowserRouter>
    )
    const prevButton = container.querySelector('button:first-of-type')
    expect(prevButton).toHaveAttribute('disabled')
  })

  test('renders disabled next button when at last slide', () => {
    const feedbackMaxIndex = feedbacks.length - 3

    ;(useCarousel as jest.Mock).mockReturnValue({
      currentIndex: feedbackMaxIndex,
      slideRef: { current: null },
      isDragging: false,
      handlePrev: jest.fn(),
      handleNext: jest.fn(),
      handleDragStart: jest.fn(),
      handleDragMove: jest.fn(),
      handleDragEnd: jest.fn(),
      maxIndex: feedbackMaxIndex,
    })

    const { container } = render(
      <BrowserRouter>
        <CustomerFeedbackCarousel />
      </BrowserRouter>
    )
    const nextButton = container.querySelector('button:last-of-type')
    expect(nextButton).toHaveAttribute('disabled')
  })
})

describe('CustomerFeedbackCarousel - Interactive', () => {
  // Variables to hold mock functions
  const mockHandlePrev = jest.fn()
  const mockHandleNext = jest.fn()
  const mockHandleDragStart = jest.fn()
  const mockHandleDragMove = jest.fn()
  const mockHandleDragEnd = jest.fn()

  // Set up the mock implementation before each test
  beforeEach(() => {
    jest.clearAllMocks()

    const mockRefElement = document.createElement('div')

    const mockRef = {
      current: mockRefElement,
    }

    // Properly setup your mock to return handlers that can be called
    ;(useCarousel as jest.Mock).mockReturnValue({
      currentIndex: 1,
      slideRef: mockRef,
      isDragging: false,
      handlePrev: mockHandlePrev,
      handleNext: mockHandleNext,
      handleDragStart: mockHandleDragStart,
      handleDragMove: mockHandleDragMove,
      handleDragEnd: mockHandleDragEnd,
      maxIndex: 3,
    })
  })
  test('calls handlePrev when previous button is clicked', () => {
    const { container } = render(
      <BrowserRouter>
        <CustomerFeedbackCarousel />
      </BrowserRouter>
    )
    const prevButton = container.querySelector('button:first-of-type')
    if (prevButton) {
      fireEvent.click(prevButton)
      expect(mockHandlePrev).toHaveBeenCalledTimes(1)
    } else {
      throw new Error('Could not find the prev button')
    }
  })

  test('calls handleNext when next button is clicked', () => {
    const { container } = render(
      <BrowserRouter>
        <CustomerFeedbackCarousel />
      </BrowserRouter>
    )
    const nextButton = container.querySelector('button:last-of-type')

    if (nextButton) {
      fireEvent.click(nextButton)
      expect(mockHandleNext).toHaveBeenCalledTimes(1)
    } else {
      throw new Error('Could not find the next button')
    }
  })
})
