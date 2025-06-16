import { type ChangeEvent } from 'react'
import {
  SectionTitle,
  PriceSection,
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
  PriceInputsContainer,
  PriceInputWrapper,
  PriceInputLabel,
  PriceInput,
  Separator,
  ButtonsContainer,
} from '../FilterStyles'
import type { PriceRangeProps } from 'types/Filter'
import { Button } from '@radix-ui/themes'

interface PriceFilterProps {
  priceRange: PriceRangeProps
  sliderValues: number[]
  onSliderChange: (values: number[]) => void
  onMinInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onMaxInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const PriceFilter = ({
  priceRange,
  sliderValues,
  onSliderChange,
  onMinInputChange,
  onMaxInputChange,
  onApplyFilters,
  onResetFilters,
}: PriceFilterProps) => {
  return (
    <PriceSection>
      <SectionTitle>Price</SectionTitle>
      <SliderRoot
        value={sliderValues}
        onValueChange={onSliderChange}
        min={0}
        max={1000}
        step={1}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderThumb />
      </SliderRoot>

      <PriceInputsContainer>
        <PriceInputWrapper>
          <PriceInputLabel>Min</PriceInputLabel>
          <PriceInput
            type="number"
            value={priceRange.min}
            onChange={onMinInputChange}
            placeholder="0"
            min="0"
          />
        </PriceInputWrapper>
        <Separator>-</Separator>
        <PriceInputWrapper>
          <PriceInputLabel>Max</PriceInputLabel>
          <PriceInput
            type="number"
            value={priceRange.max}
            onChange={onMaxInputChange}
            placeholder="1000"
            min="0"
          />
        </PriceInputWrapper>
      </PriceInputsContainer>

      <ButtonsContainer>
        <Button variant="solid" onClick={onApplyFilters} size={'2'}>
          Apply
        </Button>
        <Button
          variant="soft"
          onClick={onResetFilters}
          style={{ color: 'var(--black-shade-2' }}
        >
          Reset
        </Button>
      </ButtonsContainer>
    </PriceSection>
  )
}
