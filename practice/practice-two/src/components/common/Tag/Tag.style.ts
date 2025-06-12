import styled from 'styled-components'

export const StyledButtonTag = styled.button<{
  $variant?: 'default' | 'selected' | 'disabled'
}>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  transition: all 0.2s ease;
  border: none;
  cursor: ${({ $variant }) =>
    $variant === 'disabled' ? 'not-allowed' : 'pointer'};

  /* Variant styles */
  ${({ $variant }) => {
    switch ($variant) {
      case 'selected':
        return `
            background-color:var(--cyan-shade-4);
            color: var(--cyan-shade-1);
            box-shadow: 0 0 0 2px #a8c7fa;
            &:hover {
              background-color:var(--cyan-shade-3);
              text-decoration: none;
          }
        `
      case 'disabled':
        return `
          background-color: var(--black-shade-6);
          color:var(--black-shade-3);
          opacity: 0.7;
        `
      default:
        return `
          background-color: var(--black-shade-5);
          color: var(--black-color-default);
          &:hover {
            background-color: var(--black-shade-5);
          }
        `
    }
  }}

  &[data-tag-type="category"] {
    border-color: var(--green-color-default);
    border-width: 2px;

    &:hover {
      background-color: var(--green-50);
      border-color: var(--green-color-dark);
    }
  }

  &[data-tag-type='subcategory'] {
    border-color: var(--blue-color-default);
    border-width: 2px;

    &:hover {
      background-color: var(--blue-50);
      border-color: var(--blue-color-dark);
    }
  }

  &[data-tag-type='product'] {
    border-color: var(--gray-300);
    border-width: 1px;

    &:hover {
      background-color: var(--gray-50);
      border-color: var(--gray-400);
    }
  }
`

export const StyledLinkWrapper = styled.span<{
  $variant?: 'default' | 'selected' | 'disabled'
}>`
  display: inline-block;

  /* Reset Link styles when used in a tag */
  a {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.2s ease;
    text-decoration: none;

    /* Variant styles */
    ${({ $variant }) => {
      switch ($variant) {
        case 'selected':
          return `
            background-color: var(--green-shade-3);
            color:var(--green-shade-1);
            box-shadow: 0 0 0 2px #a8c7fa;
            &:hover {
              background-color:var(--green-shade-2);
              text-decoration: none;
            }
          `
        case 'disabled':
          return `
         background-color: var(--black-shade-6);
          color:var(--black-shade-3);
          opacity: 0.7;
          `
        default:
          return `
            background-color: var(--black-shade-5);
            &:hover {
              background-color: var(--black-shade-6);
              text-decoration: none;
            }
          `
      }
    }}
  }
`
