import styled from 'styled-components'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Slider from '@radix-ui/react-slider'
import * as Dialog from '@radix-ui/react-dialog'

export const FilterContainer = styled.div`
  max-width: 268px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin: 0;
`

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const CategoryItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const CategoryItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${(props) =>
    props.$isActive ? 'var(--green-shade-4)' : 'transparent'};

  &:hover {
    background-color: var(--green-shade-4);
  }
`

export const CategoryName = styled.span<{ $isActive?: boolean }>`
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: ${(props) =>
    props.$isActive
      ? 'var(--font-weight-semibold)'
      : 'var(--font-weight-regular)'};
  color: ${(props) =>
    props.$isActive
      ? 'var(--green-color-default)'
      : 'var(--black-color-default)'};
`

export const CategoryCount = styled.span`
  font-family: var(--font-family-primary);
  background-color: var(--green-shade-4);
  color: var(--green-shade-1);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  padding: 0 8px;
  text-align: center;
`

export const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const BrandItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const CheckboxRoot = styled(Checkbox.Root)`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 1.5px solid var(--black-shade-3);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: var(--green-color-default);
  }

  &[data-state='checked'] {
    background-color: var(--green-color-default);
    border-color: var(--green-color-default);
  }
`

export const CheckboxIndicator = styled(Checkbox.Indicator)`
  color: white;
`

export const Label = styled.label`
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  color: var(--black-color-default);
  cursor: pointer;
`

export const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const StarItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const StarsWrapper = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`

export const StarIcon = styled.div<{ $filled: boolean }>`
  width: 18px;
  height: 18px;
  background-image: url(${(props) =>
    props.$filled
      ? 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372435/yellow-star_jlayrb.svg'
      : 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372430/empty-star_psseed.svg'});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

export const RatingLabel = styled.span`
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  color: var(--black-color-default);
  margin-left: 8px;
`

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const SliderRoot = styled(Slider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 20px;
`

export const SliderTrack = styled(Slider.Track)`
  background-color: #e0e0e0;
  position: relative;
  flex-grow: 1;
  height: 6px;
  border-radius: 3px;
`

export const SliderRange = styled(Slider.Range)`
  position: absolute;
  background-color: var(--green-color-default);
  height: 100%;
  border-radius: 3px;
`

export const SliderThumb = styled(Slider.Thumb)`
  display: block;
  width: 20px;
  height: 20px;
  background-color: white;
  border: 1px solid var(--black-shade-3);
  border-radius: 50%;
  box-shadow: 0px 2px 4px 0px #00000026;

  &:hover {
    background-color: #f0f9eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(103, 194, 58, 0.3);
  }
`

export const PriceInputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PriceInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const PriceInputLabel = styled.label`
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
`

export const PriceInput = styled.input`
  width: 109px;
  height: 42px;
  padding: 11.5px 18.5px;
  border: 1px solid var(--black-shade-3);
  border-radius: 12px;
  font-size: 14px;
  background-color: var(--black-shade-6);
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
  color: var(--black-shade-2);

  &:focus {
    outline: none;
    border-color: #67c23a;
    box-shadow: 0 0 0 2px rgba(103, 194, 58, 0.1);
  }
`

export const Separator = styled.span`
  color: var(--black-shade-2);
  margin: 0 12px;
  align-self: flex-end;
  margin-bottom: 12px;
  font-size: 12px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 34px;
  margin-top: 16px;
`

export const ApplyButton = styled.button`
  background-color: var(--green-color-default);
  color: white;
  border: 2px solid var(--green-shade-1);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5daf34;
  }
`

export const ResetButton = styled.button`
  background-color: transparent;
  color: var(--black-shade-2);
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  font-weight: var(--font-weight-bold);
  cursor: pointer;

  &:hover {
    color: #606060;
  }
`

export const MobileFilterButton = styled.button`
  display: none;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid var(--black-shade-3);
  border-radius: 8px;
  color: var(--black-color-default);
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 767px) {
    display: flex;
  }
`

export const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
`

export const DialogContent = styled(Dialog.Content)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 320px;
  background: white;
  padding: 16px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;
  overflow-y: auto;

  @keyframes contentShow {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`

export const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

export const DialogTitle = styled(Dialog.Title)`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
`

export const CloseButton = styled(Dialog.Close)`
  border: none;
  background: transparent;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--black-shade-6);
  }
`

export const DesktopFilter = styled(FilterContainer)`
  @media (max-width: 767px) {
    display: none;
  }
`

export const MobileFilter = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
  }
`
