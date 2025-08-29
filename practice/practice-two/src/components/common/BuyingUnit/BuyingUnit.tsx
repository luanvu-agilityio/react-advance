'use client'

import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  BuyingUnitContainer,
  DropdownItem,
  DropdownList,
  QuantityInput,
  SelectButton,
  SelectContainer,
  Separator,
} from './BuyingUnit.styles'

interface BuyingUnitProps {
  quantity: number
  unit: string
  onQuantityChange: (value: number) => void
  onUnitChange: (value: string) => void
  size?: 'small' | 'medium' | 'large'
}

const units = ['pcs', 'kgs', 'box', 'pack']

const BuyingUnit = ({
  quantity,
  unit,
  onQuantityChange,
  onUnitChange,
  size = 'medium',
}: BuyingUnitProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(quantity.toString())
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(quantity.toString())
  }, [quantity])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      onQuantityChange(value)
    }
  }

  return (
    <BuyingUnitContainer size={size}>
      <QuantityInput
        type="number"
        min="1"
        value={inputValue}
        onChange={handleInputChange}
        aria-label="Quantity"
        size={size}
      />
      <Separator size={size} />
      <SelectContainer ref={dropdownRef}>
        <SelectButton
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          size={size}
        >
          {unit}
          <ChevronDown size={12} />
        </SelectButton>
        <DropdownList $isOpen={isOpen}>
          {units.map((option) => (
            <DropdownItem
              key={option}
              aria-selected={option === unit}
              onClick={() => {
                onUnitChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      </SelectContainer>
    </BuyingUnitContainer>
  )
}

export default BuyingUnit
