import styled from 'styled-components'

export const TagContainer = styled.div`
  // Hide on mobile
  display: none;

  // Show on tablet and larger screens
  @media (min-width: 768px) {
    display: block;
    padding: 0 45px;
    width: 1260px;
    margin: 0 auto;
  }
`

export const Title = styled.h1`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  color: var(--black-color-default);

  @media (min-width: 768px) {
    font-size: 18px;
  }
`

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: 768px) {
    gap: 0.75rem;
  }

  @media (min-width: 992px) {
    gap: 1rem;
  }
`

// export const SectionTitle = styled.h2`
//   font-size: 1.125rem;
//   font-weight: 600;
//   margin: 2rem 0 0.5rem 0;
// `

// export const CategoryLink = styled.div`
//   .fruit a {
//     background-color: var(--green-shade-3);
//     color: var(--green-shade-1);
//     &:hover {
//       background-color: var(--green-shade-2);
//     }
//   }

//   .vegetable a {
//     background-color: var(--coral-shade-3);
//     color: var(--coral-shade-1);
//     &:hover {
//       background-color: var(--coral-shade-2);
//     }
//   }

//   .protein a {
//     background-color: var(--brown-shade-3);
//     color: var(--brown-shade-1);
//     &:hover {
//       background-color: var(--brown-shade-2);
//     }
//   }
// `
