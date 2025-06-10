import { CheckIcon } from 'lucide-react'
import {
  SectionTitle,
  RatingSection,
  StarItems,
  CheckboxContainer,
  CheckboxRoot,
  CheckboxIndicator,
  StarsWrapper,
  StarIcon,
<<<<<<< HEAD
=======
  RatingLabel,
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
} from '../FilterStyles'
import type { RatingProps } from 'types/Filter'

interface RatingFilterProps {
  ratings: RatingProps[]
  onRatingChange: (index: number) => void
}

export const RatingFilter = ({
  ratings,
  onRatingChange,
}: RatingFilterProps) => {
  return (
    <RatingSection>
      <SectionTitle>Rating</SectionTitle>
      <StarItems>
        {ratings.map((rating, index) => (
          <CheckboxContainer key={index}>
            <CheckboxRoot
              checked={rating.selected}
              onCheckedChange={() => onRatingChange(index)}
              id={`rating-${index}`}
            >
              <CheckboxIndicator>
                <CheckIcon strokeWidth={2} style={{ paddingTop: '5px' }} />
              </CheckboxIndicator>
            </CheckboxRoot>
            <StarsWrapper>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} $filled={i < rating.rating} />
              ))}
            </StarsWrapper>
          </CheckboxContainer>
        ))}
      </StarItems>
    </RatingSection>
  )
}
