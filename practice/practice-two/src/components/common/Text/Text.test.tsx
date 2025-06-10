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
})
