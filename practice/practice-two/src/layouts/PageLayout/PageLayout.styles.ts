import styled from 'styled-components'

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Main = styled.main`
  flex: 1 0 auto;
`

export const Footer = styled.footer`
  flex-shrink: 0;
`

export const Copyright = styled.div`
  padding: 0 45px;
  color: var(--black-color-default);
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  margin: 48px auto 0;
`
