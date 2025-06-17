import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button Snapshot Tests', () => {
  // Mock onClick handler for all snapshot tests
  const noop = () => {}

  test('renders all button variants and sizes correctly', () => {
    // Use React Testing Library for snapshots

    // Variants
    const { container: solidContainer } = render(
      <Button variant="solid" onClick={noop}>
        Solid Button
      </Button>
    )
    const { container: softContainer } = render(
      <Button variant="soft" onClick={noop}>
        Soft Button
      </Button>
    )
    const { container: outlineContainer } = render(
      <Button variant="outline" onClick={noop}>
        Outline Button
      </Button>
    )
    const { container: ghostContainer } = render(
      <Button variant="ghost" onClick={noop}>
        Ghost Button
      </Button>
    )

    // Sizes
    const { container: smallContainer } = render(
      <Button size="1" onClick={noop}>
        Small Button
      </Button>
    )
    const { container: mediumContainer } = render(
      <Button size="2" onClick={noop}>
        Medium Button
      </Button>
    )
    const { container: largeContainer } = render(
      <Button size="3" onClick={noop}>
        Large Button
      </Button>
    )

    // States
    const { container: disabledContainer } = render(
      <Button disabled onClick={noop}>
        Disabled Button
      </Button>
    )

    // With icon
    const { container: iconContainer } = render(
      <Button onClick={noop}>
        <span>🔍</span> Search
      </Button>
    )

    // Take snapshots
    expect(solidContainer.firstChild).toMatchSnapshot('solid-button')
    expect(softContainer.firstChild).toMatchSnapshot('soft-button')
    expect(outlineContainer.firstChild).toMatchSnapshot('outline-button')
    expect(ghostContainer.firstChild).toMatchSnapshot('ghost-button')
    expect(smallContainer.firstChild).toMatchSnapshot('small-button')
    expect(mediumContainer.firstChild).toMatchSnapshot('medium-button')
    expect(largeContainer.firstChild).toMatchSnapshot('large-button')
    expect(disabledContainer.firstChild).toMatchSnapshot('disabled-button')
    expect(iconContainer.firstChild).toMatchSnapshot('icon-button')
  })
})

describe('Button Interactive Tests', () => {
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders with different variants correctly', () => {
    const noop = jest.fn()

    // Test each variant in separate renders
    const { getByText: getSolidText } = render(
      <Button variant="solid" onClick={noop}>
        Solid
      </Button>
    )
    expect(getSolidText('Solid')).toBeInTheDocument()

    const { getByText: getSoftText } = render(
      <Button variant="soft" onClick={noop}>
        Soft
      </Button>
    )
    expect(getSoftText('Soft')).toBeInTheDocument()

    const { getByText: getOutlineText } = render(
      <Button variant="outline" onClick={noop}>
        Outline
      </Button>
    )
    expect(getOutlineText('Outline')).toBeInTheDocument()

    const { getByText: getGhostText } = render(
      <Button variant="ghost" onClick={noop}>
        Ghost
      </Button>
    )
    expect(getGhostText('Ghost')).toBeInTheDocument()
  })

  test('renders with different sizes correctly', () => {
    const noop = jest.fn()

    const { getByText: getSmallText } = render(
      <Button size="1" onClick={noop}>
        Small
      </Button>
    )
    expect(getSmallText('Small')).toBeInTheDocument()

    const { getByText: getMediumText } = render(
      <Button size="2" onClick={noop}>
        Medium
      </Button>
    )
    expect(getMediumText('Medium')).toBeInTheDocument()

    const { getByText: getLargeText } = render(
      <Button size="3" onClick={noop}>
        Large
      </Button>
    )
    expect(getLargeText('Large')).toBeInTheDocument()
  })
})
