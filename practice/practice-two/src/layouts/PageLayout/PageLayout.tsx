'use client'

import { type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import HeaderSection from '@layouts/Header/HeaderSection'
import { Navbar } from '@layouts/Navbar/Navbar'
import FooterLink from '@layouts/Footer/FooterLink/FooterLink'
import FooterTags from '@layouts/Footer/FooterTag/FooterTags'
import { Copyright, Footer, LayoutContainer, Main } from './PageLayout.styles'

interface PageLayoutProps {
  children: ReactNode
}

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
