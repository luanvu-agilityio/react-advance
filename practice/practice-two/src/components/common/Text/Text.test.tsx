import { render, screen } from '@testing-library/react'
import Text from './index'

describe('Text Component', () => {
  test('renders text content correctly', () => {
    render(<Text text="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  test('renders as paragraph element by default', () => {
    render(<Text text="Default paragraph" />)
    const element = screen.getByText('Default paragraph')
    expect(element.tagName.toLowerCase()).toBe('p')
  })

  test('renders with different HTML elements when "as" prop is specified', () => {
    const elements = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'span',
      'div',
    ] as const

    elements.forEach((element) => {
      render(<Text text={`${element} text`} as={element} />)
      const renderedElement = screen.getByText(`${element} text`)
      expect(renderedElement.tagName.toLowerCase()).toBe(element)
    })
  })

  test('applies custom styles correctly', () => {
    const customStyle = { color: 'red', fontSize: '16px' }
    render(<Text text="Styled text" style={customStyle} />)
    const element = screen.getByText('Styled text')
    expect(element).toHaveStyle(customStyle)
  })

  test('passes through additional HTML attributes', () => {
    render(
      <Text
        text="Test text"
        data-testid="custom-text"
        aria-label="text label"
      />
    )
    const element = screen.getByText('Test text')
    expect(element).toHaveAttribute('data-testid', 'custom-text')
    expect(element).toHaveAttribute('aria-label', 'text label')
  })
})
