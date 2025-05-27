import styled from 'styled-components'
import { useCart } from '@contexts/CartContext'

const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  padding: 8px;
`

const CartBadge = styled.span`
  position: absolute;
  top: 20px;
  left: 0;
  background-color: var(--coral-color-default);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
`

const CartIcon = () => {
  const { openCart, totalItems } = useCart()

  return (
    <CartButton onClick={openCart}>
      <img
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372429/cart_ux4d8x.svg"
        alt="Shopping Cart"
      />
      {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
    </CartButton>
  )
}

export default CartIcon
