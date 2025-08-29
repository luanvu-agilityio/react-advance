import { ChevronRight } from 'lucide-react'
import {
  Banner,
  BannerHeading,
  BannerSubtitle,
  ButtonContainer,
} from '../Homepage.styles'
import { Button } from '@radix-ui/themes'

interface BannerComponentProps {
  subtitle: string
  heading: string
}

const BannerComponent = ({ subtitle, heading }: BannerComponentProps) => (
  <Banner>
    <BannerSubtitle>{subtitle}</BannerSubtitle>
    <BannerHeading>{heading}</BannerHeading>
    <ButtonContainer>
      <Button variant="outline">
        Read recipes{' '}
        <ChevronRight
          size={16}
          strokeWidth={4}
          color="var(--green-color-default)"
          style={{ marginLeft: '2px' }}
        />
      </Button>
    </ButtonContainer>
  </Banner>
)

export default BannerComponent
