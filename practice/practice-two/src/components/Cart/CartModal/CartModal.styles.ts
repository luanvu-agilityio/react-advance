import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  backdrop-filter: blur(5px);
`

export const ModalContent = styled.div`
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

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

export const ModalTitle = styled.h2`
  font-size: 26px;
  font-weight: var(--font-weight-semibold);
  margin: 0;
`

export const CloseButton = styled.button`
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

export const CartItemList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const CartFooter = styled.div`
  margin-top: auto;
`

export const Subtotal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  font-size: 26px;
  font-weight: var(--font-weight-semibold);
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--black-shade-4);
`

export const Button = styled.button`
  border-radius: 12px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  text-align: center;
`

export const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 48px 0;
  color: var(--black-shade-2);
`
