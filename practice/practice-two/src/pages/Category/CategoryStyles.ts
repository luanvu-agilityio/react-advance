// ============================================================================
// STYLED COMPONENTS

import styled from 'styled-components'

// ============================================================================
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
  }
`

export const FilterControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  margin-top: 16px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    padding: 0;
    gap: 16px;
  }
`

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-color-default);
  margin: 0;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`

export const ViewModeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: var(--font-weight-regular);

  @media (min-width: 768px) {
    gap: 24px;
  }
`

export const ProductCount = styled.span`
  color: var(--black-shade-2);
  font-size: 12px;
  font-weight: var(--font-weight-medium);
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 16px 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 32px;
    padding: 64px 0;
  }
`

export const CountBadge = styled.span`
  font-family: var(--font-family-primary);
  background-color: var(--green-shade-4);
  color: var(--green-shade-1);
  border-radius: 12px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  padding: 0 8px;
  text-align: center;
`

export const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 48px 32px;
  text-align: center;
  background-color: var(--black-shade-6);
  border-radius: 12px;
  margin-top: 24px;
`

export const NoResultsIcon = styled.div`
  margin-bottom: 16px;
  opacity: 0.5;

  img {
    width: 64px;
    height: 64px;
  }
`

export const NoResultsTitle = styled.h3`
  font-size: 20px;
  font-weight: var(--font-weight-semibold);
  color: var(--black-shade-1);
  margin-bottom: 8px;
`

export const NoResultsText = styled.p`
  font-size: 16px;
  color: var(--black-shade-2);
  margin-bottom: 16px;
`

export const ResetFiltersButton = styled.button`
  background-color: var(--green-color-default);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;

  &:hover {
    background-color: #5daf34;
  }
`
