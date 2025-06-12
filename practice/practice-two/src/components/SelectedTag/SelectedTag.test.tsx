import { render, fireEvent, screen } from '@testing-library/react'
import SelectedTags from './SelectedTag'
import { useProductTagStore } from '@stores/tagStore'

// Mock the tag store hook
jest.mock('@stores/tagStore', () => ({
  useProductTagStore: jest.fn(),
}))

// SNAPSHOT TESTING
describe('SelectedTags - Rendering', () => {
  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks()
  })

  test('renders nothing when no tags are selected', () => {
    // Setup the mock to return empty tags
    ;(useProductTagStore as unknown as jest.Mock).mockReturnValue({
      selectedTags: [],
      removeTag: jest.fn(),
    })

    const { container } = render(<SelectedTags />)
    expect(container.firstChild).toBeNull()
  })

  test('renders tags correctly when tags are present', () => {
    // Setup mock with some example tags
    const mockTags = [
      { type: 'brand', label: 'Apple' },
      { type: 'price', label: '$100-$200' },
    ]
    ;(useProductTagStore as unknown as jest.Mock).mockReturnValue({
      selectedTags: mockTags,
      removeTag: jest.fn(),
    })

    const { container } = render(<SelectedTags />)
    expect(container).toMatchSnapshot()
  })

  const mockTags = [
    { type: 'brand', label: 'Apple' },
    { type: 'price', label: '$100-$200' },
    { type: 'category', label: 'Electronics' },
  ]
  ;(useProductTagStore as unknown as jest.Mock).mockReturnValue({
    selectedTags: mockTags,
    removeTag: jest.fn(),
  })

  render(<SelectedTags />)

  // Check header is present
  expect(screen.getByText('Applied filters:')).toBeInTheDocument()

  // Check all tags are rendered
  expect(screen.getByText('Apple')).toBeInTheDocument()
  expect(screen.getByText('$100-$200')).toBeInTheDocument()
  expect(screen.getByText('Electronics')).toBeInTheDocument()
})

// INTERACTIVE BEHAVIOR TESTING
describe('SelectedTags - Interactive', () => {
  test('calls removeTag when remove button is clicked', () => {
    const mockRemoveTag = jest.fn()
    const mockTags = [
      { type: 'brand', label: 'Apple' },
      { type: 'price', label: '$100-$200' },
    ]
    ;(useProductTagStore as unknown as jest.Mock).mockReturnValue({
      selectedTags: mockTags,
      removeTag: mockRemoveTag,
    })

    render(<SelectedTags />)

    // Click the remove button of the first tag
    const removeButtons = screen.getAllByRole('button')
    fireEvent.click(removeButtons[0])

    // Check that removeTag was called with the correct tag
    expect(mockRemoveTag).toHaveBeenCalledWith(mockTags[0])
  })

  test('calls removeTag with correct tag when multiple tags exist', () => {
    const mockRemoveTag = jest.fn()
    const mockTags = [
      { type: 'brand', label: 'Apple' },
      { type: 'price', label: '$100-$200' },
      { type: 'category', label: 'Electronics' },
    ]
    ;(useProductTagStore as unknown as jest.Mock).mockReturnValue({
      selectedTags: mockTags,
      removeTag: mockRemoveTag,
    })

    render(<SelectedTags />)

    // Find all remove buttons
    const removeButtons = screen.getAllByRole('button')

    // Click the second tag's remove button
    fireEvent.click(removeButtons[1])

    // Check that removeTag was called with the second tag
    expect(mockRemoveTag).toHaveBeenCalledWith(mockTags[1])

    expect(mockRemoveTag).not.toHaveBeenCalledWith(mockTags[0])
    expect(mockRemoveTag).not.toHaveBeenCalledWith(mockTags[2])
  })
})
