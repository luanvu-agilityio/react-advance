<<<<<<< HEAD
import { render } from '@testing-library/react'
import Text from './index'

describe('Text Component', () => {
  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('renders basic text variants correctly', () => {
      // Default paragraph rendering
      const { container: defaultParagraph } = render(
        <Text text="Default paragraph" />
      )
      expect(defaultParagraph).toMatchSnapshot('default-paragraph')

      // Rendering with children instead of text prop
      const { container: withChildren } = render(
        <Text text="">Child content</Text>
      )
      expect(withChildren).toMatchSnapshot('with-children')

      // Custom class name
      const { container: withClass } = render(
        <Text text="With class" className="custom-class" />
      )
      expect(withClass).toMatchSnapshot('with-class')
    })

    it('renders with different HTML elements', () => {
      // Different element types
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
        const { container } = render(
          <Text text={`${element} text`} as={element} />
        )
        expect(container).toMatchSnapshot(`as-${element}`)
      })
    })

    it('renders with custom styles and attributes', () => {
      // With custom styles
      const customStyle = { color: 'red', fontSize: '16px' }
      const { container: styledContainer } = render(
        <Text text="Styled text" style={customStyle} />
      )
      expect(styledContainer).toMatchSnapshot('with-custom-style')

      // With additional attributes
      const { container: withAttributes } = render(
        <Text
          text="With attributes"
          data-testid="custom-text"
          aria-label="text label"
        />
      )
      expect(withAttributes).toMatchSnapshot('with-attributes')

      // Long text content
      const longText =
        'This is a very long text that should test how the component handles wrapping and display of lengthy content when it potentially spans multiple lines.'
      const { container: longTextContainer } = render(<Text text={longText} />)
      expect(longTextContainer).toMatchSnapshot('with-long-text')
    })
  })
=======
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
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
})
