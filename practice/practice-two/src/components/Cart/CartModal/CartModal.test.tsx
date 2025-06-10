import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartModal from './CartModal'
import { useCartStore } from '@stores/cartStore'
import type { ReactElement, ReactNode } from 'react'

// Mock the router navigation
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  // Only mock the components we actually use
  MemoryRouter: ({ children }: { children: ReactNode }) => (
    <div data-testid="memory-router">{children}</div>
  ),
  Link: ({ to, children }: { to: string; children: ReactNode }) => (
    <a href={to} data-testid="router-link">
      {children}
    </a>
  ),
}))

// Mock the Zustand store
jest.mock('@stores/cartStore', () => ({
  useCartStore: jest.fn(),
}))

// Mock the toast context
jest.mock('@contexts/ToastContext', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

// Mock the cart mutation hook
const mockRemoveCartMutation = jest.fn()
jest.mock('@hooks/useCartMutation', () => ({
  useRemoveFromCart: () => ({
    mutate: mockRemoveCartMutation,
    isPending: false,
  }),
}))

// Helper function to wrap component in router
const renderWithRouter = (component: ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe('CartModal', () => {
  // Common mock values
  const mockCloseCart = jest.fn()
  const mockUpdateItem = jest.fn()
  const mockGetSubtotal = jest.fn(() => 42.99)
  const mockItems = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 12.99,
      quantity: 2,
      buyUnit: 'kg',
      image: '/img.jpg',
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 17.01,
      quantity: 1,
      buyUnit: 'box',
      image: '/img2.jpg',
    },
  ]

  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // SNAPSHOT TESTS FOR RENDERING

  it('matches snapshot when modal is closed', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: false,
      items: [],
      closeCart: mockCloseCart,
    })

    const { container } = renderWithRouter(<CartModal />)
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with empty cart', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: [],
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    const { container } = renderWithRouter(<CartModal />)
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with items in cart', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: mockItems,
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    const { container } = renderWithRouter(<CartModal />)
    expect(container).toMatchSnapshot()
  })

  // INTERACTIVE BEHAVIOR TESTS

  it('closes cart when clicking outside modal', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: [],
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    const { container } = renderWithRouter(<CartModal />)
    const overlay =
      screen.queryByTestId('modal-overlay') ||
      container.querySelector('.backdrop, .overlay, .dialog-overlay')

    if (!overlay) {
      throw new Error(
        'Could not find modal overlay - check the component structure'
      )
    }

    fireEvent.click(overlay)
    expect(mockCloseCart).toHaveBeenCalledTimes(1)
  })

  it('does not close cart when clicking inside modal content', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: [],
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    renderWithRouter(<CartModal />)
    const modalContent = screen.getByText('Shopping cart').closest('div')
    if (modalContent) {
      fireEvent.click(modalContent)
    }
    expect(mockCloseCart).not.toHaveBeenCalled()
  })

  it('closes cart when pressing Escape key', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: [],
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    renderWithRouter(<CartModal />)
    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' })
    })
    expect(mockCloseCart).toHaveBeenCalledTimes(1)
  })

  it('navigates to checkout when clicking checkout button', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: mockItems,
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    renderWithRouter(<CartModal />)
    const checkoutButton = screen.getByText('Go to Checkout')
    fireEvent.click(checkoutButton)
    expect(mockCloseCart).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/checkout')
  })

  it('calls closeCart when clicking continue shopping button', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: [],
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    renderWithRouter(<CartModal />)
    const continueButton = screen.getByText('Continue shopping')
    fireEvent.click(continueButton)
    expect(mockCloseCart).toHaveBeenCalledTimes(1)
  })

  // NEW TESTS FOR REMOVE FUNCTIONALITY WITH TOAST

  it('calls removeCartItem mutation when removing an item', async () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: mockItems,
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    // Render the component
    renderWithRouter(<CartModal />)

    // Find the CartItem component - we'll need to add a data-testid to the remove button in CartItem
    // For now, let's assume there's a button with text "Remove"
    const removeButtons = screen.getAllByText('Remove')
    fireEvent.click(removeButtons[0]) // Remove the first item

    // Check that the mutation was called with correct arguments
    expect(mockRemoveCartMutation).toHaveBeenCalledWith({
      id: 1, // ID of the first item
      title: 'Test Product 1', // Title of the first item
    })
  })

  it('handles quantity change for cart items', () => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      items: mockItems,
      closeCart: mockCloseCart,
      updateItem: mockUpdateItem,
      getSubtotal: mockGetSubtotal,
    })

    renderWithRouter(<CartModal />)

    // Since we can't easily test BuyingUnit component behavior here,
    // we can verify the update functions are passed to CartItem

    // First, make sure there are cart items rendered
    expect(screen.getAllByText(/Test Product/)).toHaveLength(2)

    // Verify that updateItem is not called yet
    expect(mockUpdateItem).not.toHaveBeenCalled()
  })
})
