import { useEffect, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@stores/cartStore'
import {
  ButtonsContainer,
  CartFooter,
  CartItemList,
  CloseButton,
  EmptyCartMessage,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  PrimaryButton,
  SecondaryButton,
  Subtotal,
} from './CartModal.styles'
import CartItem from '../CartItem/CartItem'
import { useRemoveFromCart } from '@hooks/useCartMutation'

const CartModal = () => {
  const { items, updateItem, isOpen, closeCart, getSubtotal } = useCartStore()
  const navigate = useNavigate()

  const { mutate: removeCartItem } = useRemoveFromCart()

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [closeCart])

  // Prevent scrolling of body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  // Handle quantity change for specific item
  const handleQuantityChange = (id: number, quantity: number) => {
    updateItem(id, { quantity })
  }

  // Handle buy unit change for specific item
  const handleUnitChange = (id: number, buyUnit: string) => {
    updateItem(id, { buyUnit })
  }

  const handleCheckout = () => {
    closeCart() // Close the cart modal first
    navigate('/checkout') // Navigate to checkout page
  }

  const handleRemoveItem = (id: number) => {
    const itemToRemove = items.find((item) => item.id === id)
    if (itemToRemove) {
      removeCartItem({
        id,
        title: itemToRemove.title,
      })
    }
  }
  return (
    <ModalOverlay data-testid="modal-overlay" onClick={closeCart}>
      <ModalContent onClick={(e: MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Shopping cart</ModalTitle>
          <CloseButton onClick={closeCart}>
            <span>Close</span>×
          </CloseButton>
        </ModalHeader>

        <CartItemList>
          {items.length === 0 ? (
            <EmptyCartMessage>
              <p>Your cart is empty</p>
              <SecondaryButton onClick={closeCart}>
                Continue shopping
              </SecondaryButton>
            </EmptyCartMessage>
          ) : (
            items.map((item) => (
              <CartItem
                key={`${item.id}-${item.buyUnit}`}
                item={item}
                onQuantityChange={handleQuantityChange}
                onUnitChange={handleUnitChange}
                onRemove={handleRemoveItem}
              />
            ))
          )}
        </CartItemList>

        {items.length > 0 && (
          <CartFooter>
            <Subtotal>
              <span style={{ fontSize: '12px' }}>Subtotal</span>
              <span>{getSubtotal().toFixed(2)} USD</span>
            </Subtotal>
            <ButtonsContainer>
              <SecondaryButton onClick={closeCart}>
                Continue shopping
              </SecondaryButton>
              <PrimaryButton onClick={handleCheckout}>
                Go to Checkout
              </PrimaryButton>
            </ButtonsContainer>
          </CartFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  )
}

export default CartModal
