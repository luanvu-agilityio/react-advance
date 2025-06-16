import styled from 'styled-components'
import * as Form from '@radix-ui/react-form'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Accordion from '@radix-ui/react-accordion'
import * as Dialog from '@radix-ui/react-dialog'
// --------------------------
// Layout Styled Components
// --------------------------
export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 16px;
  font-family: var(--font-family-primary);

  @media (max-width: 768px) {
    padding: 16px;
    margin: 0;
  }

  @media (min-width: 1024px) {
    padding: 0 32px;
  }
`

export const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 1024px) {
    grid-template-columns: 60% 40%;
  }
`

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
    padding: 0;
  }
`

// --------------------------
// Step Header Components
// --------------------------
export const StepHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;
`

export const StepTitle = styled.h2`
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
  margin: 0;
`

export const StepIndicator = styled.div`
  font-size: 12px;
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
  color: var(--black-shade-2);
`

export const StepDescription = styled.p`
  font-size: 12px;
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
  color: var(--black-shade-2);
  text-align: left;
`

// --------------------------
// Form Components
// --------------------------
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

export const FormField = styled(Form.Field)``

export const FormLabel = styled(Form.Label)`
  display: block;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
`

export const FormInput = styled(Form.Control)<{ $hasError?: boolean }>`
  width: 100%;
  padding: 11.5px 18.5px;
  border: 1px solid
    ${(props) =>
      props.$hasError ? 'var(--error-color, #e53935)' : 'var(--black-shade-3)'};
  border-radius: 12px;
  background-color: var(--black-shade-6);
  font-size: 14px;
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
  outline: none;
  height: 42px;

  &:focus {
    border-color: ${(props) =>
      props.$hasError
        ? 'var(--error-color, #e53935)'
        : 'var(--green-color-default)'};
  }

  &::placeholder {
    color: var(--black-shade-2);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 16px;
  }
`

export const FormSelect = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 11.5px 18.5px;
  border: 1px solid
    ${(props) => (props.$hasError ? 'var(--error-color, #e53935)' : '#dedee0')};
  border-radius: 12px;
  outline: none;
  appearance: none;
  background-color: var(--black-shade-6);
  font-size: 14px;
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
  background-image: url('/src/assets/images/icons/dropdown.svg');
  background-repeat: no-repeat;
  background-position: right 18.5px center;
  height: 42px;
  color: var(--black-shade-2);

  &:focus {
    border-color: ${(props) =>
      props.$hasError
        ? 'var(--error-color, #e53935)'
        : 'var(--green-color-default)'};
  }

  &::placeholder {
    color: var(--black-shade-2);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 16px;
  }
`

export const FormMessage = styled(Form.Message)`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`

export const FormTextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 11px 21px;
  border: 1px solid
    ${(props) =>
      props.$hasError ? 'var(--error-color, #e53935)' : 'var(--black-shade-3)'};
  border-radius: 12px;
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  outline: none;
  min-height: 120px;
  resize: vertical;
  font-family: var(--font-family-secondary);
  background-color: var(--black-shade-6);

  &:focus {
    border-color: ${(props) =>
      props.$hasError
        ? 'var(--error-color, #e53935)'
        : 'var(--green-color-default)'};
  }

  &::placeholder {
    color: #b9bac4;
  }
`

// --------------------------
// Checkbox Components
// --------------------------
export const CheckboxContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 9px 16px;
  height: 42px;
  background-color: var(--black-shade-6);
  border: 1px solid var(--black-shade-3);
  border-radius: 12px;
  width: 440px;
  &.same-as-billing {
    width: 250px;
  }

  &.marketing-consent {
    width: 530px;
  }

  &.term-consent {
    width: 440px;
  }
  @media (max-width: 768px) {
    padding: 8px 12px;
    height: auto;
    min-height: 42px;
  }
`

export const StyledCheckboxRoot = styled(Checkbox.Root)`
  width: 24px;
  height: 24px;
  border: 1.5px solid var(--black-shade-3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:focus {
    outline: none;
    border-color: var(--green-color-default);
  }

  &[data-state='checked'] {
    border-color: var(--green-color-default);
    background-color: var(--green-color-default);
  }
`

export const CheckboxLabel = styled.label`
  font-size: 14px;
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
  color: var(--black-color-default);
`

export const StyledCheckbox = styled(Checkbox.Root)`
  width: 24px;
  height: 24px;
  border: 1px solid #dedee0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--green-color-default);
  }

  &[data-state='checked'] {
    border-color: var(--green-color-default);
    background-color: var(--green-color-default);
  }
`

export const StyledCheckboxIndicator = styled(Checkbox.Indicator)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

// --------------------------
// Radio & Shipping Components
// --------------------------
export const RadioCircle = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid var(--black-shade-3);
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    display: none;
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--green-color-default);
  }

  [data-state='checked'] & {
    border-color: var(--green-color-default);

    &::after {
      display: block;
    }
  }
`

export const ShippingOption = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid var(--black-shade-3);
  background-color: var(--black-shade-6);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--green-color-default);
  }

  &[data-state='checked'] {
    border-color: var(--green-color-default);
  }
`

export const ShippingOptionDetails = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 75px;
`

export const ShippingLabel = styled.span`
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
`

export const ShippingInfo = styled.div`
  width: 93px;
  display: flex;
  justify-content: flex-end;
`

export const AdditionalPrice = styled.span`
  font-size: 12px;
  color: var(--green-color-default);
  font-weight: var(--font-weight-semibold);

  span {
    padding: 0 8px;
    color: var(--black-color-default);
  }
`

export const ShippingLogo = styled.img`
  height: 30px;
  width: auto;
`

// --------------------------
// Payment Method Components
// --------------------------
export const PaymentMethodOption = styled.label<{ 'data-state'?: string }>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 32px;
  padding: ${(props) =>
    props['data-state'] === 'checked' ? '16px' : '12px 16px'};
  border: 1px solid
    ${(props) =>
      props['data-state'] === 'checked'
        ? 'var(--green-color-default)'
        : 'var(--black-shade-3)'};
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: #fff;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--green-color-default);
  }

  &[data-state='checked'] {
    border-color: var(--green-color-default);
  }
  @media (max-width: 768px) {
    padding: ${(props) =>
      props['data-state'] === 'checked' ? '16px 12px' : '12px'};
  }
`

export const PaymentLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--black-color-default);
`

export const PaymentDetails = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const PaymentLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const PaymentLogo = styled.img`
  height: 28px;
  width: auto;
`

export const CardDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const CardDetailsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`

// --------------------------
// Order Summary Components
// --------------------------
export const OrderSummaryWrapper = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    position: sticky;
    top: 20px;
  }
`

export const OrderSummary = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 32px 16px;
  border: 1px solid var(--black-shade-3);
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%; // Takes full width on mobile
  position: sticky; // Make it sticky on desktop
  top: 20px; // Add some space from top
  height: fit-content;

  @media (max-width: 768px) {
    position: static; // Remove sticky positioning on mobile
    padding: 24px 16px;
    gap: 24px;
  }
`

export const OrderSummaryTitle = styled.h3`
  font-size: 22px;
  font-weight: var(--font-weight-semibold);
`

export const OrderSummarySubtitle = styled.p`
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  font-family: var(--font-family-secondary);
  color: var(--black-shade-2);
`

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const OrderSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
`

export const OrderSummaryTotal = styled(OrderSummaryRow)`
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  span {
    font-size: 12px;
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-regular);
    color: var(--green-color-default);
  }
`

export const PromoForm = styled.div`
  display: flex;
  border: 1px solid var(--black-shade-3);
  background-color: var(--black-shade-5);
  border-radius: 12px;
  height: 44px;
  padding: 0 21px;

  @media (max-width: 768px) {
    flex-direction: row;
    height: auto;
    gap: 12px;
    padding: 12px;
  }
`

export const PromoInput = styled.input`
  flex: 1;
  border: none;
  font-size: 14px;
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
  outline: none;
`

// --------------------------
// Misc Components
// --------------------------
export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: var(--green-color-default);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  width: 222px;
  height: 56px;
  transition:
    background-color 0.2s,
    opacity 0.2s;
  font-family: var(--font-family-primary);

  &:hover:not(:disabled) {
    background-color: var(--green-shade-1);
  }

  &:disabled {
    background-color: #cccccc;
    color: #888888;
    cursor: not-allowed;
    opacity: 0.7;
  }
`

export const SecurityNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 12px;
  width: 213px;
  height: 113px;
  margin-top: 32px;
`

export const SecurityIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SecurityText = styled.div`
  font-size: 14px;
  color: var(--black-color-default);
  margin-bottom: 2px;
  font-weight: var(--font-weight-semibold);

  span {
    display: block;
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-regular);
    color: var(--black-shade-2);
  }
`
export const StyledAccordion = styled(Accordion.Root)`
  width: 100%;
`

export const StyledItem = styled(Accordion.Item)`
  margin-bottom: 16px;
  border: 1px solid var(--black-shade-3);
  border-radius: 12px;
  background: white;

  &:focus-within {
    border-color: var(--green-color-default);
  }
`

export const StyledHeader = styled(Accordion.Header)`
  all: unset;
  width: 100%;
`

export const StyledTrigger = styled(Accordion.Trigger)`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &[data-state='open'] {
    border-bottom: 1px solid var(--black-shade-3);
  }
`

export const TriggerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const StyledContent = styled(Accordion.Content)`
  padding: 16px;

  &[data-state='open'] {
    animation: slideDown 300ms ease-out;
  }

  &[data-state='closed'] {
    animation: slideUp 300ms ease-out;
  }

  @keyframes slideDown {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
      opacity: 1;
    }
    to {
      height: 0;
      opacity: 0;
    }
  }
`

export const StepNumber = styled.span`
  font-size: 12px;
  color: var(--black-shade-2);
  margin-left: auto;
  margin-right: 16px;
`

export const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const StepInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const StepMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const ChevronIcon = styled.span`
  display: flex;
  align-items: center;
  transition: transform 300ms;

  [data-state='open'] & {
    transform: rotate(180deg);
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const BackButton = styled.button`
  padding: 12px 24px;
  background-color: transparent;
  color: var(--green-color-default);
  border: 1px solid var(--green-color-default);
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--green-shade-5);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--green-shade-4);
  }
`

export const NextButton = styled.button`
  padding: 12px 24px;
  background-color: var(--green-color-default);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--green-shade-2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--green-shade-4);
  }

  &:disabled {
    background-color: var(--gray-shade-3);
    cursor: not-allowed;
  }
`
// Error Summary section
export const ErrorSummaryContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  border: 1px solid var(--error-color, #e53935);
  border-radius: 8px;
  background-color: rgba(229, 57, 53, 0.05);
`

export const ErrorTitle = styled.h4`
  color: var(--error-color, #e53935);
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 14px;
`

export const ErrorList = styled.ul`
  margin: 0;
  padding-left: 20px;
`

export const ErrorItem = styled.li`
  color: var(--error-color, #e53935);
  margin-bottom: 5px;
  font-size: 12px;
`
// THANK YOU MODAL
export const StyledOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

export const StyledDialog = styled(Dialog.Content)`
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

export const StyledTitle = styled(Dialog.Title)`
  font-size: 24px;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 16px;
  color: var(--text-color-heading);
  text-align: center;
`

export const StyledDescription = styled(Dialog.Description)`
  font-size: 16px;
  color: var(--text-color-body);
  margin-bottom: 32px;
  text-align: center;
  line-height: 1.5;
`

export const ButtonsContainer = styled.div`
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

export const CloseButton = styled('button')`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: var(--black-shade-5);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--black-shade-1);
  transition: all 0.2s ease;

  &:hover {
    background: var(--black-shade-4);
    color: var(--black-color-default);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--green-color-default);
  }
`

// Custom styled buttons
export const ButtonBase = styled.button`
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

export const PrimaryButton = styled(ButtonBase)`
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

export const SecondaryButton = styled(ButtonBase)`
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
