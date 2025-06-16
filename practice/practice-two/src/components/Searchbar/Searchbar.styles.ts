import styled from 'styled-components'

export const SearchBarContainer = styled.div`
  position: relative;
  max-width: 100%;
  width: 500px;
  height: 42px;

  @media (max-width: 767px) {
    position: static;
    width: 100%;
  }
`

export const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background-color: var(--black-shade-5);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  @media (max-width: 767px) {
    border-radius: 8px;
    background-color: var(--black-shade-6);
    border: none;
  }
`
export const CategorySelectContainer = styled.div`
  min-width: 11rem;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    display: none; // Hide category selector on mobile
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 25%;
    height: 60%;
    width: 1px;
    background-color: #e5e7eb;
  }
`

export const SelectWrapper = styled.div`
  width: 100%;
  padding: 10px 16px;
`

export const SearchContainer = styled.div`
  flex-grow: 1;
  position: relative;
  height: 42px;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    height: 40px;

    input {
      background: transparent;
      font-size: 16px; /* Better for mobile readability */
      padding-left: 12px;
    }
  }
`

export const SearchButton = styled.button`
  position: absolute;
  right: 0.75rem;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  background-color: transparent;
  border: none;
  border-radius: 50%;

  @media (max-width: 767px) {
    height: 2rem;
    width: 2rem;
    right: 0.5rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export const SearchForm = styled.form`
  width: 100%;
  display: flex;
`

export const SearchResultsDropdown = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 767px) {
    position: fixed;
    top: 57px; /* Adjusted to match header height */
    left: 0;
    right: 0;
    max-height: calc(100vh - 57px);
    border-radius: 0;
    border: none;
    border-top: 1px solid #e5e7eb;
  }
`

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--black-shade-5);
  }
`

export const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
`

export const ProductInfo = styled.div`
  flex: 1;
`

export const ProductTitle = styled.div`
  font-size: 14px;
  color: var(--text-color-heading);
  margin-bottom: 4px;
`

export const ProductPrice = styled.div`
  font-size: 12px;
  color: var(--text-color-body);
  font-weight: var(--font-weight-medium);
`

export const MobileSearchHeader = styled.div`
  display: none;

  @media (max-width: 767px) {
    padding: 8px 16px;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    button {
      padding: 8px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      &:hover {
        background: var(--black-shade-6);
      }
    }
  }
`
