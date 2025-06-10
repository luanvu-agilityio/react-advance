<<<<<<< HEAD
import { render } from '@testing-library/react'
import Badge from './index'

describe('Badge', () => {
  // Basic rendering snapshot
  it('renders basic content correctly', () => {
    const { container: stringBadge } = render(<Badge>Test Badge</Badge>)
    expect(stringBadge).toMatchSnapshot('string-content')

    const { container: numericBadge } = render(<Badge>42</Badge>)
    expect(numericBadge).toMatchSnapshot('numeric-content')

    const { container: zeroBadge } = render(<Badge>{0}</Badge>)
    expect(zeroBadge).toMatchSnapshot('zero-content')
  })

  // Different content types snapshot
  it('renders different content types correctly', () => {
    const { container: specialCharBadge } = render(<Badge>★★★★★</Badge>)
    expect(specialCharBadge).toMatchSnapshot('special-characters')

    const { container: htmlBadge } = render(
=======
import { render, screen } from '@testing-library/react'
import Badge from './index'

describe('Badge', () => {
  it('renders children content correctly', () => {
    render(<Badge>Test Badge</Badge>)

    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('renders with string content', () => {
    render(<Badge>New</Badge>)

    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders with numeric content', () => {
    render(<Badge>42</Badge>)

    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders with special characters', () => {
    const specialText = '★★★★★'
    render(<Badge>{specialText}</Badge>)

    expect(screen.getByText(specialText)).toBeInTheDocument()
  })

  it('renders HTML content as children', () => {
    render(
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      <Badge>
        <strong>Bold</strong> Text
      </Badge>
    )
<<<<<<< HEAD
    expect(htmlBadge).toMatchSnapshot('html-content')
  })

  // Edge cases snapshot
  it('handles long text correctly', () => {
    const longText =
      'This is a very long badge text that should still render properly'
    const { container: longTextBadge } = render(<Badge>{longText}</Badge>)
    expect(longTextBadge).toMatchSnapshot('long-text')

    const { container: multipleBadges } = render(
=======

    expect(screen.getByText('Bold')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()

    const strongElement = screen.getByText('Bold')
    expect(strongElement.tagName).toBe('STRONG')
  })

  it('has correct semantic structure', () => {
    render(<Badge>Test Badge</Badge>)

    const badge = screen.getByText('Test Badge')
    expect(badge.tagName).toBe('SPAN')
  })

  it('handles long text content', () => {
    const longText =
      'This is a very long badge text that should still render properly'
    render(<Badge>{longText}</Badge>)

    expect(screen.getByText(longText)).toBeInTheDocument()
  })

  it('renders multiple badges independently', () => {
    render(
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
      <div>
        <Badge>Badge 1</Badge>
        <Badge>Badge 2</Badge>
        <Badge>Badge 3</Badge>
      </div>
    )
<<<<<<< HEAD
    expect(multipleBadges).toMatchSnapshot('multiple-badges')
=======

    expect(screen.getByText('Badge 1')).toBeInTheDocument()
    expect(screen.getByText('Badge 2')).toBeInTheDocument()
    expect(screen.getByText('Badge 3')).toBeInTheDocument()
  })

  it('handles zero as content', () => {
    render(<Badge>{0}</Badge>)

    expect(screen.getByText('0')).toBeInTheDocument()
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  })
})
