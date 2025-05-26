import type { RefObject } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'
import type { OrderSummaryProps } from 'types/Order'
import { useOrderExport } from '@hooks/useOrderExport'

// Styled components using Radix UI
const StyledOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

const StyledContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  padding: 32px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 95%;
    padding: 24px 16px;
    max-height: 90vh;
    overflow-y: auto;
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const StyledTitle = styled(Dialog.Title)`
  font-size: 24px;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 16px;
  color: var(--text-color-heading);
  text-align: center;
`

const StyledDescription = styled(Dialog.Description)`
  font-size: 16px;
  color: var(--text-color-body);
  margin-bottom: 32px;
  text-align: center;
  line-height: 1.5;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 12px;

    button {
      width: 100%;
    }
  }
`

// Custom styled buttons
const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  height: 44px;
  transition: all 0.2s ease;
  white-space: nowrap;
  cursor: pointer;
  font-family: var(--font-family-primary);

  &:focus-visible {
    outline: 2px solid var(--green-color-default);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PrimaryButton = styled(ButtonBase)`
  background-color: var(--green-color-default);
  border: 1px solid var(--green-color-default);
  color: white;

  &:hover:not(:disabled) {
    background-color: var(--green-color-dark);
    border-color: var(--green-color-dark);
  }

  &:active:not(:disabled) {
    background-color: hsl(157, 65%, 28%);
    transform: translateY(1px);
  }
`

const SecondaryButton = styled(ButtonBase)`
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: var(--text-color-body);

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: #b0b5bd;
  }

  &:active:not(:disabled) {
    background-color: #e5e7eb;
    transform: translateY(1px);
  }
`

interface ThankYouModalProps {
  open: boolean
  onClose: () => void
  orderDetailsRef: RefObject<HTMLDivElement | null>
  customerData: OrderSummaryProps
}

const ThankYouModal = ({
  open,
  onClose,
  orderDetailsRef,
  customerData = {},
}: ThankYouModalProps) => {
  // Use custom hook for order exports
  const { handlePrint, handleDownloadExcel, handleDownloadText } =
    useOrderExport({
      orderDetailsRef,
      customerData,
    })

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledTitle>Thank you for your order!</StyledTitle>
          <StyledDescription>
            Our team is working on your order. You will receive a confirmation
            email soon with all the details.
          </StyledDescription>
          <ButtonsContainer>
            <PrimaryButton onClick={handlePrint}>
              Print Order Details
            </PrimaryButton>
            <SecondaryButton onClick={handleDownloadExcel}>
              Download as Excel
            </SecondaryButton>
            <SecondaryButton onClick={handleDownloadText}>
              Download as Text
            </SecondaryButton>
            <SecondaryButton onClick={onClose}>Close</SecondaryButton>
          </ButtonsContainer>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ThankYouModal
