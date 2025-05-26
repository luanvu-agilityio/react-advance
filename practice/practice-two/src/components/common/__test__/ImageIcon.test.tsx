import { render, screen, fireEvent } from '@testing-library/react'
import ImageIcon from '../ImageIcon'

describe('ImageIcon Component', () => {
  const defaultProps = {
    src: 'test-image.jpg',
    alt: 'Test Image',
  }

  test('renders with default props', () => {
    render(<ImageIcon {...defaultProps} />)
    const image = screen.getByRole('img', { name: 'Test Image' })

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'test-image.jpg')
    expect(image).toHaveAttribute('width', '16')
    expect(image).toHaveAttribute('height', '16')
  })

  test('applies custom size', () => {
    render(<ImageIcon {...defaultProps} size={32} />)
    const image = screen.getByRole('img', { name: 'Test Image' })

    expect(image).toHaveAttribute('width', '32')
    expect(image).toHaveAttribute('height', '32')
  })

  test('applies custom className', () => {
    render(<ImageIcon {...defaultProps} className="custom-class" />)
    const image = screen.getByRole('img', { name: 'Test Image' })

    expect(image).toHaveClass('image-icon', 'custom-class')
  })

  test('applies custom styles', () => {
    const customStyle = {
      backgroundColor: 'red',
      borderRadius: '50%',
    }

    render(<ImageIcon {...defaultProps} style={customStyle} />)
    const image = screen.getByRole('img', { name: 'Test Image' })

    expect(image).toHaveStyle({
      backgroundColor: 'red',
      borderRadius: '50%',
    })
  })

  test('calls custom onError handler when image fails to load', () => {
    const onError = jest.fn()
    render(<ImageIcon {...defaultProps} onError={onError} />)
    const image = screen.getByRole('img', { name: 'Test Image' })

    fireEvent.error(image)
    expect(onError).toHaveBeenCalled()
  })

  test('hides image when error occurs without custom error handler', () => {
    render(<ImageIcon {...defaultProps} />)
    const image = screen.getByRole('img', { name: 'Test Image' })

    fireEvent.error(image)
    expect(image).toHaveStyle({ display: 'none' })
  })
})
