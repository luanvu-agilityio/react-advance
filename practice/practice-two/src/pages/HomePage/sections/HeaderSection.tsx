import styled from 'styled-components'
import Link from '@components/common/Link'
import Searchbar from '@components/layout/Header/Searchbar'
import { useCallback, type MouseEvent } from 'react'
import ImageIcon from '@components/common/ImageIcon'
import CartIcon from '@components/Cart/CartIcon'
import { useNavigate } from 'react-router-dom'

const HeaderContainer = styled.header`
  width: 100%;
  background-color: white;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 45px;
  }
`

const TopBar = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #e5e7eb;
    font-size: 12px;
    font-weight: var(--font-weight-regular);
  }
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 33px;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 38px;
`

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;

  @media (min-width: 768px) {
    padding: 40px 0;
  }
`
const Logo = styled.img`
  height: 32px;

  @media (min-width: 768px) {
    height: auto;
  }
`

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (min-width: 768px) {
    gap: 40px;
  }
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`
interface HeaderSectionProps {
  onSearch?: (query: string) => void
}

const HeaderSection = ({ onSearch }: HeaderSectionProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
  }

  const navigate = useNavigate()

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        setTimeout(() => {
          navigate(`/search-results?search=${encodeURIComponent(query.trim())}`)
          if (onSearch) {
            onSearch(query.trim())
          }
        }, 0)
      }
    },
    [navigate, onSearch]
  )

  return (
    <HeaderContainer className = "section">
      <TopBar>
        <ContactInfo>
          <Link href="#" onClick={handleClick}>
            Chat with us
          </Link>
          <span>+420 336 775 664</span>
          <span>info@freshnesecom.com</span>
        </ContactInfo>
        <NavLinks>
          <Link href="/blog" onClick={handleClick}>
            Blog
          </Link>
          <Link href="/about-us" onClick={handleClick}>
            About Us
          </Link>
          <Link href="/careers" onClick={handleClick}>
            Careers
          </Link>
        </NavLinks>
      </TopBar>

      <MainHeader>
        <Logo
          src="https://res.cloudinary.com/ds82onf5q/image/upload/v1747388389/Brand_eequim.png"
          alt="App logo"
        />

        <Searchbar onSearch={handleSearch} />

        <IconGroup>
          <IconButton aria-label="Account">
            <ImageIcon
              src="https://res.cloudinary.com/ds82onf5q/image/upload/v1747388374/user_xzs5si.svg"
              alt="Account"
              size={24}
            />
          </IconButton>

          <CartIcon aria-label="Shopping Cart" />
        </IconGroup>
      </MainHeader>
    </HeaderContainer>
  )
}

export default HeaderSection
