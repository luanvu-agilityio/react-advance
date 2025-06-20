import styled from 'styled-components'

export const Container = styled.div<{
  $maxWidth?: string
  $padding?: string
  $direction?: string
  $gap?: string
  $alignItems?: string
  $justifyContent?: string
}>`
  width: 100%;

  display: flex;
  flex-direction: ${(props) => props.$direction ?? 'row'};
  gap: ${(props) => props.$gap ?? '0'};
  align-items: ${(props) => props.$alignItems ?? 'stretch'};
  justify-content: ${(props) => props.$justifyContent ?? 'flex-start'};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${(props) => props.$padding ?? '0 '};
    gap: ${(props) => (props.$gap ? `calc(${props.$gap} * 0.75)` : '0')};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: ${(props) => props.$padding ?? '0 '};
  }

  @media (min-width: 1260px) {
    padding: 0;
  }

  @media (min-width: 1460px) {
    max-width: 1460px;
  }
`
