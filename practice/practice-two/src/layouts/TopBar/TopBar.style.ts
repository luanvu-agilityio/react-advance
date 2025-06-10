import styled from 'styled-components'

export const TopBarContainer = styled.div`
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

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 33px;
`

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 38px;
`
export const ContactLink = styled.a`
  color: var(--black-color-default);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--green-color-default);
    text-decoration: underline;
  }
`
