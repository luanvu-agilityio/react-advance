import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: white;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 45px;
  }
`

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;

  @media (min-width: 768px) {
    padding: 40px 0;
  }
`
export const Logo = styled.img`
  height: 32px;
  cursor: pointer;

  @media (min-width: 768px) {
    height: auto;
  }
`

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (min-width: 768px) {
    gap: 40px;
  }
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const LogoLink = styled(RouterLink)`
  display: inline-block;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
`

export const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  padding: 8px;
`

export const CartBadge = styled.span`
  position: absolute;
  top: 20px;
  left: 0;
  background-color: var(--coral-color-default);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
`
