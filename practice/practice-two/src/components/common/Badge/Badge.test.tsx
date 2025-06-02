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
      <Badge>
        <strong>Bold</strong> Text
      </Badge>
    )

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
      <div>
        <Badge>Badge 1</Badge>
        <Badge>Badge 2</Badge>
        <Badge>Badge 3</Badge>
      </div>
    )

    expect(screen.getByText('Badge 1')).toBeInTheDocument()
    expect(screen.getByText('Badge 2')).toBeInTheDocument()
    expect(screen.getByText('Badge 3')).toBeInTheDocument()
  })

  it('handles zero as content', () => {
    render(<Badge>{0}</Badge>)

    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
