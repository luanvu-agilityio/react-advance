import { type ReactNode } from 'react'
import styled from 'styled-components'
import { Navbar } from '@components/layout/Header/Navbar'
import FooterLink from '@components/layout/Footer/FooterLink'
import FooterTags from '@components/layout/Footer/FooterTags'
import { useLocation } from 'react-router-dom'
import HeaderSection from '@pages/HomePage/sections/HeaderSection'

interface PageLayoutProps {
  children: ReactNode
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1 0 auto;
`

const Footer = styled.footer`
  flex-shrink: 0;
`

const Copyright = styled.div`
  padding: 0 45px;
  color: var(--black-color-default);
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  margin-top: 48px;
`

const PageLayout = ({ children }: PageLayoutProps) => {
  const location = useLocation()
  const currentYear = new Date().getFullYear()
  const isCheckoutPage = location.pathname === '/checkout'

  return (
    <>
      <HeaderSection />
      <Navbar />
      <LayoutContainer>
        <Main>{children}</Main>
        <Footer>
          {/* Hide FooterLink and FooterTags on checkout page */}
          {!isCheckoutPage && (
            <>
              <FooterLink />
              <FooterTags />
            </>
          )}
          <Copyright>
            &#169; {currentYear} Your Company. All rights reserved.
          </Copyright>
        </Footer>
      </LayoutContainer>
    </>
  )
}

export default PageLayout
