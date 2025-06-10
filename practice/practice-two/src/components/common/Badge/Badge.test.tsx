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
      <Badge>
        <strong>Bold</strong> Text
      </Badge>
    )
    expect(htmlBadge).toMatchSnapshot('html-content')
  })

  // Edge cases snapshot
  it('handles long text correctly', () => {
    const longText =
      'This is a very long badge text that should still render properly'
    const { container: longTextBadge } = render(<Badge>{longText}</Badge>)
    expect(longTextBadge).toMatchSnapshot('long-text')

    const { container: multipleBadges } = render(
      <div>
        <Badge>Badge 1</Badge>
        <Badge>Badge 2</Badge>
        <Badge>Badge 3</Badge>
      </div>
    )
    expect(multipleBadges).toMatchSnapshot('multiple-badges')
  })
})
