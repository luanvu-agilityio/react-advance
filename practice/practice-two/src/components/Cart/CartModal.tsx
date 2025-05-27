import { useEffect } from 'react'
import styled from 'styled-components'
import { useCart } from '@contexts/CartContext'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
`

const ModalContent = styled.div`
  width: 400px;
  max-height: 912px;
  background-color: white;
  height: 100%;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 0px 2px 32px 0px #00000026;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const ModalTitle = styled.h2`
  font-size: 26px;
  font-weight: var(--font-weight-semibold);
  margin: 0;
`

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;

  span {
    font-family: var(--font-family-secondary);
    font-size: 12px;
    font-weight: var(--font-weight-regular);
    color: var(--black-shade-3);
  }
`

const CartItemList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const CartFooter = styled.div`
  margin-top: auto;
`

const Subtotal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  font-size: 26px;
  font-weight: var(--font-weight-semibold);
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--black-shade-4);
`

const Button = styled.button`
  border-radius: 12px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  text-align: center;
`

const PrimaryButton = styled(Button)`
  background-color: var(--green-color-default);
  color: white;
  border: none;
  padding: 12px 16px;
  font-size: 15px;
  height: 48px;
  font-weight: var(--font-weight-bold);
`

const SecondaryButton = styled(Button)`
  background-color: white;
  color: var(--black-color-default);
  border: none;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
`

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 48px 0;
  color: var(--black-shade-2);
`

const CartModal = () => {
  const { items, removeItem, updateItem, isOpen, closeCart, subtotal } =
    useCart()
  const navigate = useNavigate()
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
  return (
    <ModalOverlay onClick={closeCart}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
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
                onRemove={removeItem}
              />
            ))
          )}
        </CartItemList>

        {items.length > 0 && (
          <CartFooter>
            <Subtotal>
              <span style={{ fontSize: '12px' }}>Subtotal</span>
              <span>{subtotal.toFixed(2)} USD</span>
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
