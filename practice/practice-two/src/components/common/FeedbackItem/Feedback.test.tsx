import { render, screen } from '@testing-library/react'
import { FeedbackItem } from './Feedback'

describe('FeedbackItem Component', () => {
  const defaultProps = {
    quote: 'This is a test quote',
    name: 'Test User',
  }

  it('renders the feedback quote correctly', () => {
    render(<FeedbackItem {...defaultProps} />)

    expect(screen.getByText('"This is a test quote"')).toBeInTheDocument()
  })

  it('renders the author name correctly', () => {
    render(<FeedbackItem {...defaultProps} />)

    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('renders the customer avatar image', () => {
    render(<FeedbackItem {...defaultProps} />)

    const avatar = screen.getByAltText('Customer Avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372403/avatar-1_l6rb1m.svg'
    )
  })

  it('wraps quote with quotation marks', () => {
    const customQuote = 'Amazing service'
    render(<FeedbackItem quote={customQuote} name="John Doe" />)

    expect(screen.getByText('"Amazing service"')).toBeInTheDocument()
  })

  it('handles empty quote', () => {
    render(<FeedbackItem quote="" name="John Doe" />)

    expect(screen.getByText('""')).toBeInTheDocument()
  })

  it('handles long quotes', () => {
    const longQuote =
      'This is a very long quote that should test how the component handles extended content and whether it maintains proper layout and styling with lengthy testimonials'
    render(<FeedbackItem quote={longQuote} name="John Doe" />)

    expect(screen.getByText(`"${longQuote}"`)).toBeInTheDocument()
  })

  it('handles long names', () => {
    const longName = 'Dr. Elizabeth Katherine Pemberton-Williams III'
    render(<FeedbackItem quote="Test quote" name={longName} />)

    expect(screen.getByText(longName)).toBeInTheDocument()
  })

  it('handles special characters in quote', () => {
    const specialQuote = 'Great! 5 stars ⭐⭐⭐⭐⭐'
    render(<FeedbackItem quote={specialQuote} name="User" />)

    expect(screen.getByText(`"${specialQuote}"`)).toBeInTheDocument()
  })
})
