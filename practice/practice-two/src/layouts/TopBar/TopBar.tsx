import { type MouseEvent } from 'react'
import Link from '@components/common/Link/index'
import {
  TopBarContainer,
  ContactInfo,
  NavLinks,
  ContactLink,
} from './TopBar.style'

interface TopBarProps {
  handleClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const TopBar = ({ handleClick }: TopBarProps) => {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    handleClick?.(event)
  }

  return (
    <TopBarContainer>
      <ContactInfo>
        <Link href="#" onClick={onClick}>
          Chat with us
        </Link>
        <ContactLink
          href="tel:+420336775664"
          aria-label="Call our customer service at +420 336 775 664"
        >
          +420 336 775 664
        </ContactLink>

        <ContactLink
          href="mailto:info@freshnesecom.com"
          aria-label="Send email to info@freshnesecom.com"
        >
          info@freshnesecom.com
        </ContactLink>
      </ContactInfo>
      <NavLinks>
        <Link href="/blog" onClick={onClick}>
          Blog
        </Link>
        <Link href="/about-us" onClick={onClick}>
          About Us
        </Link>
        <Link href="/careers" onClick={onClick}>
          Careers
        </Link>
      </NavLinks>
    </TopBarContainer>
  )
}

export default TopBar
