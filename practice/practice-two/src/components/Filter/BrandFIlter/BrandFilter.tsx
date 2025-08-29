'use client'

import { CheckIcon } from 'lucide-react'
import {
  SectionTitle,
  BrandSection,
  BrandItems,
  CheckboxContainer,
  CheckboxRoot,
  CheckboxIndicator,
  Label,
} from '../FilterStyles'
import type { BrandProps } from 'types/Filter'

interface BrandFilterProps {
  brands: BrandProps[]
  onBrandChange: (index: number) => void
}

export const BrandFilter = ({ brands, onBrandChange }: BrandFilterProps) => {
  if (brands.length === 0) return null

  return (
    <BrandSection>
      <SectionTitle>Brands</SectionTitle>
      <BrandItems>
        {brands.map((brand, index) => (
          <CheckboxContainer key={brand.name}>
            <CheckboxRoot
              checked={brand.selected}
              onCheckedChange={() => onBrandChange(index)}
              id={`brand-${index}`}
            >
              <CheckboxIndicator>
                <CheckIcon strokeWidth={2} style={{ paddingTop: '5px' }} />
              </CheckboxIndicator>
            </CheckboxRoot>
            <Label htmlFor={`brand-${index}`}>{brand.name}</Label>
          </CheckboxContainer>
        ))}
      </BrandItems>
    </BrandSection>
  )
}
