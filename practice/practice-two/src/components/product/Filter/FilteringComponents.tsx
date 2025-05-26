import { useEffect, useState, type ChangeEvent } from 'react'
import styled from 'styled-components'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Slider from '@radix-ui/react-slider'
import { CheckIcon, Filter, Star, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

interface CategoryProps {
  name: string
  count: number
  onClick: () => void
  isActive?: boolean
}

export interface BrandProps {
  name: string
  selected: boolean
}

export type StarRating = 1 | 2 | 3 | 4 | 5

interface RatingProps {
  rating: StarRating
  selected: boolean
}

interface PriceRangeProps {
  min: number
  max: number
}

const FilterContainer = styled.div`
  max-width: 268px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`
const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin: 0;
`

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CategoryItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const CategoryItem = styled.div<{ $isActive?: boolean }>`
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

const CategoryName = styled.span<{ $isActive?: boolean }>`
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

const CategoryCount = styled.span`
  font-family: var(--font-family-primary);
  background-color: var(--green-shade-4);
  color: var(--green-shade-1);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  padding: 0 8px;
  text-align: center;
`

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const BrandItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const CheckboxRoot = styled(Checkbox.Root)`
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

const CheckboxIndicator = styled(Checkbox.Indicator)`
  color: white;
`

const Label = styled.label`
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  color: var(--black-color-default);
  cursor: pointer;
`

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StarItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StarsWrapper = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`

const StarIcon = styled(Star)<{ $filled: boolean }>`
  width: 18px;
  height: 18px;
  color: ${(props) => (props.$filled ? '#FDBC15' : '#E0E0E0')};
  fill: ${(props) => (props.$filled ? '#FDBC15' : '#E0E0E0')};
`

const RatingLabel = styled.span`
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  color: var(--black-color-default);
  margin-left: 8px;
`

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SliderRoot = styled(Slider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 20px;
`

const SliderTrack = styled(Slider.Track)`
  background-color: #e0e0e0;
  position: relative;
  flex-grow: 1;
  height: 6px;
  border-radius: 3px;
`

const SliderRange = styled(Slider.Range)`
  position: absolute;
  background-color: var(--green-color-default);
  height: 100%;
  border-radius: 3px;
`

const SliderThumb = styled(Slider.Thumb)`
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

const PriceInputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PriceInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PriceInputLabel = styled.label`
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
`

const PriceInput = styled.input`
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

const Separator = styled.span`
  color: var(--black-shade-2);
  margin: 0 12px;
  align-self: flex-end;
  margin-bottom: 12px;
  font-size: 12px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 34px;
  margin-top: 16px;
`

const ApplyButton = styled.button`
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

const ResetButton = styled.button`
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

const MobileFilterButton = styled.button`
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

const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
`

const DialogContent = styled(Dialog.Content)`
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

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const DialogTitle = styled(Dialog.Title)`
  font-size: 18px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
`

const CloseButton = styled(Dialog.Close)`
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

const DesktopFilter = styled(FilterContainer)`
  @media (max-width: 767px) {
    display: none;
  }
`

const MobileFilter = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
  }
`

interface FilterComponentsProps {
  categories: CategoryProps[]
  brands: BrandProps[]
  ratings: RatingProps[]
  priceRange: PriceRangeProps
  onCategoryClick: (categoryName: string) => void
  onBrandSelect: (brandName: string, isSelected: boolean) => void
  onRatingSelect: (rating: number, isSelected: boolean) => void
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void
  activeCategory?: string
}

const FilterComponents = ({
  categories,
  brands: initialBrands,
  ratings: initialRatings,
  priceRange: initialPriceRange,
  onCategoryClick,
  onBrandSelect,
  onRatingSelect,
  onPriceRangeChange,
  activeCategory,
}: FilterComponentsProps) => {
  const [brands, setBrands] = useState<BrandProps[]>(initialBrands)
  const [ratings, setRatings] = useState<RatingProps[]>(initialRatings)
  const [priceRange, setPriceRange] =
    useState<PriceRangeProps>(initialPriceRange)
  const [sliderValues, setSliderValues] = useState([
    initialPriceRange.min,
    initialPriceRange.max,
  ])

  // Update local state when props change
  useEffect(() => {
    setBrands(initialBrands)
  }, [initialBrands])

  useEffect(() => {
    setRatings(initialRatings)
  }, [initialRatings])

  useEffect(() => {
    setPriceRange(initialPriceRange)
    setSliderValues([initialPriceRange.min, initialPriceRange.max])
  }, [initialPriceRange])

  // Event handlers
  const handleBrandChange = (index: number) => {
    const newBrands = [...brands]
    const isSelected = !newBrands[index].selected
    newBrands[index].selected = isSelected
    setBrands(newBrands)

    // Call the parent callback
    onBrandSelect(newBrands[index].name, isSelected)
  }

  const handleRatingChange = (index: number) => {
    const newRatings = [...ratings]
    const isSelected = !newRatings[index].selected
    newRatings[index].selected = isSelected
    setRatings(newRatings)

    // Call the parent callback
    onRatingSelect(newRatings[index].rating, isSelected)
  }

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values)
    setPriceRange({ min: values[0], max: values[1] })
  }

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value) && value >= 0) {
      const newMin = Math.min(value, sliderValues[1])
      setPriceRange({ ...priceRange, min: newMin })
      setSliderValues([newMin, sliderValues[1]])
    }
  }

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      const newMax = Math.max(value, sliderValues[0])
      setPriceRange({ ...priceRange, max: newMax })
      setSliderValues([sliderValues[0], newMax])
    }
  }

  const resetFilters = () => {
    // Reset local state
    setBrands(brands.map((brand) => ({ ...brand, selected: false })))
    setRatings(ratings.map((rating) => ({ ...rating, selected: false })))
    setPriceRange({ min: 0, max: 1000 })
    setSliderValues([0, 1000])

    // Notify parent component about resets
    brands.forEach((brand) => {
      if (brand.selected) {
        onBrandSelect(brand.name, false)
      }
    })

    ratings.forEach((rating) => {
      if (rating.selected) {
        onRatingSelect(rating.rating, false)
      }
    })

    onPriceRangeChange(0, 1000)
  }

  const applyFilters = () => {
    // Apply price range filter
    onPriceRangeChange(priceRange.min, priceRange.max)
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <MobileFilter>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <MobileFilterButton>
              <Filter size={16} />
              Filters
            </MobileFilterButton>
          </Dialog.Trigger>

          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
                <CloseButton>
                  <X size={20} />
                </CloseButton>
              </DialogHeader>

              {/* Mobile Filter Content */}
              <FilterContainer>
                <FilterContainer>
                  {/* Categories Section */}
                  {categories.length > 0 && (
                    <CategorySection>
                      <SectionTitle>Categories</SectionTitle>
                      <CategoryItems>
                        {categories.map((category, index) => (
                          <CategoryItem
                            key={index}
                            onClick={() => onCategoryClick(category.name)}
                            $isActive={category.name === activeCategory}
                          >
                            <CategoryName
                              $isActive={category.name === activeCategory}
                            >
                              {category.name}
                            </CategoryName>
                            <CategoryCount>{category.count}</CategoryCount>
                          </CategoryItem>
                        ))}
                      </CategoryItems>
                    </CategorySection>
                  )}

                  {/* Brands Section */}
                  {brands.length > 0 && (
                    <BrandSection>
                      <SectionTitle>Brands</SectionTitle>
                      <BrandItems>
                        {brands.map((brand, index) => (
                          <CheckboxContainer key={index}>
                            <CheckboxRoot
                              checked={brand.selected}
                              onCheckedChange={() => handleBrandChange(index)}
                              id={`brand-${index}`}
                            >
                              <CheckboxIndicator>
                                <CheckIcon
                                  strokeWidth={2}
                                  style={{ paddingTop: '5px' }}
                                />
                              </CheckboxIndicator>
                            </CheckboxRoot>
                            <Label htmlFor={`brand-${index}`}>
                              {brand.name}
                            </Label>
                          </CheckboxContainer>
                        ))}
                      </BrandItems>
                    </BrandSection>
                  )}

                  {/* Rating Section */}
                  <RatingSection>
                    <SectionTitle>Rating</SectionTitle>
                    <StarItems>
                      {ratings.map((rating, index) => (
                        <CheckboxContainer key={index}>
                          <CheckboxRoot
                            checked={rating.selected}
                            onCheckedChange={() => handleRatingChange(index)}
                            id={`rating-${index}`}
                          >
                            <CheckboxIndicator>
                              <CheckIcon
                                strokeWidth={2}
                                style={{ paddingTop: '5px' }}
                              />
                            </CheckboxIndicator>
                          </CheckboxRoot>
                          <StarsWrapper>
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} $filled={i < rating.rating} />
                            ))}
                            <RatingLabel>
                              {rating.rating} Star
                              {rating.rating !== 1 ? 's' : ''} & Up
                            </RatingLabel>
                          </StarsWrapper>
                        </CheckboxContainer>
                      ))}
                    </StarItems>
                  </RatingSection>

                  {/* Price Section */}
                  <PriceSection>
                    <SectionTitle>Price</SectionTitle>
                    <SliderRoot
                      value={sliderValues}
                      onValueChange={handleSliderChange}
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
                          onChange={handleMinInputChange}
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
                          onChange={handleMaxInputChange}
                          placeholder="1000"
                          min="0"
                        />
                      </PriceInputWrapper>
                    </PriceInputsContainer>

                    {/* Action Buttons */}
                    <ButtonsContainer>
                      <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
                      <ResetButton onClick={resetFilters}>Reset</ResetButton>
                    </ButtonsContainer>
                  </PriceSection>
                </FilterContainer>
              </FilterContainer>
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
      </MobileFilter>

      <DesktopFilter>
        <FilterContainer>
          {/* Categories Section */}
          {categories.length > 0 && (
            <CategorySection>
              <SectionTitle>Categories</SectionTitle>
              <CategoryItems>
                {categories.map((category, index) => (
                  <CategoryItem
                    key={index}
                    onClick={() => onCategoryClick(category.name)}
                    $isActive={category.name === activeCategory}
                  >
                    <CategoryName $isActive={category.name === activeCategory}>
                      {category.name}
                    </CategoryName>
                    <CategoryCount>{category.count}</CategoryCount>
                  </CategoryItem>
                ))}
              </CategoryItems>
            </CategorySection>
          )}

          {/* Brands Section */}
          {brands.length > 0 && (
            <BrandSection>
              <SectionTitle>Brands</SectionTitle>
              <BrandItems>
                {brands.map((brand, index) => (
                  <CheckboxContainer key={index}>
                    <CheckboxRoot
                      checked={brand.selected}
                      onCheckedChange={() => handleBrandChange(index)}
                      id={`brand-${index}`}
                    >
                      <CheckboxIndicator>
                        <CheckIcon
                          strokeWidth={2}
                          style={{ paddingTop: '5px' }}
                        />
                      </CheckboxIndicator>
                    </CheckboxRoot>
                    <Label htmlFor={`brand-${index}`}>{brand.name}</Label>
                  </CheckboxContainer>
                ))}
              </BrandItems>
            </BrandSection>
          )}

          {/* Rating Section */}
          <RatingSection>
            <SectionTitle>Rating</SectionTitle>
            <StarItems>
              {ratings.map((rating, index) => (
                <CheckboxContainer key={index}>
                  <CheckboxRoot
                    checked={rating.selected}
                    onCheckedChange={() => handleRatingChange(index)}
                    id={`rating-${index}`}
                  >
                    <CheckboxIndicator>
                      <CheckIcon
                        strokeWidth={2}
                        style={{ paddingTop: '5px' }}
                      />
                    </CheckboxIndicator>
                  </CheckboxRoot>
                  <StarsWrapper>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} $filled={i < rating.rating} />
                    ))}
                    <RatingLabel>
                      {rating.rating} Star{rating.rating !== 1 ? 's' : ''} & Up
                    </RatingLabel>
                  </StarsWrapper>
                </CheckboxContainer>
              ))}
            </StarItems>
          </RatingSection>

          {/* Price Section */}
          <PriceSection>
            <SectionTitle>Price</SectionTitle>
            <SliderRoot
              value={sliderValues}
              onValueChange={handleSliderChange}
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
                  onChange={handleMinInputChange}
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
                  onChange={handleMaxInputChange}
                  placeholder="1000"
                  min="0"
                />
              </PriceInputWrapper>
            </PriceInputsContainer>

            {/* Action Buttons */}
            <ButtonsContainer>
              <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
              <ResetButton onClick={resetFilters}>Reset</ResetButton>
            </ButtonsContainer>
          </PriceSection>
        </FilterContainer>
      </DesktopFilter>
    </>
  )
}

export default FilterComponents
