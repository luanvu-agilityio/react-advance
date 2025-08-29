'use client'

import { memo, useCallback, type MouseEvent } from 'react'
import ImageIcon from '@components/common/ImageIcon'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@components/Searchbar/Searchbar'
import { useCartStore } from '@stores/cartStore'
import TopBar from '../TopBar/TopBar'
import {
  CartBadge,
  CartButton,
  HeaderContainer,
  IconButton,
  IconGroup,
  Logo,
  LogoLink,
  MainHeader,
} from './HeaderSection.styles'

interface HeaderSectionProps {
  onSearch?: (query: string) => void
}

const HeaderSection = memo(({ onSearch }: HeaderSectionProps) => {
  const { openCart, items } = useCartStore()
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
  }

  const navigate = useNavigate()

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        navigate(`/search-results?search=${encodeURIComponent(query.trim())}`)

        if (onSearch) {
          onSearch(query.trim())
        }
      }
    },
    [navigate, onSearch]
  )
  return (
    <HeaderContainer className="section">
      <TopBar handleClick={handleClick} />

      <MainHeader>
        <LogoLink to="/">
          <Logo
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1747388389/Brand_eequim.png"
            alt="App logo"
          />
        </LogoLink>

        <SearchBar onSearch={handleSearch} />

        <IconGroup>
          <IconButton aria-label="Account">
            <ImageIcon
              src="https://res.cloudinary.com/ds82onf5q/image/upload/v1747388374/user_xzs5si.svg"
              alt="Account"
              size={24}
            />
          </IconButton>

          <CartButton onClick={openCart} aria-label="Shopping Cart">
            <img
              src="https://res.cloudinary.com/ds82onf5q/image/upload/v1748372429/cart_ux4d8x.svg"
              alt="Shopping Cart"
            />
            {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
          </CartButton>
        </IconGroup>
      </MainHeader>
    </HeaderContainer>
  )
})

export default HeaderSection
