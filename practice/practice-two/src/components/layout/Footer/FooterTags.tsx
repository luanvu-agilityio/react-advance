import Tag from '@components/common/Tag'
import { useState } from 'react'
import styled from 'styled-components'

const TagContainer = styled.div`
  // Hide on mobile
  display: none;

  // Show on tablet and larger screens
  @media (min-width: 768px) {
    display: block;
    padding: 0 45px;
  }
`

const Title = styled.h1`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  color: var(--black-color-default);

  @media (min-width: 768px) {
    font-size: 18px;
  }
`

const TagsContainer = styled.div`
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

// const SectionTitle = styled.h2`
//   font-size: 1.125rem;
//   font-weight: 600;
//   margin: 2rem 0 0.5rem 0;
// `

// const CategoryLink = styled.div`
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

const FooterTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const productTags = [
    'Beans',
    'Carrots',
    'Apples',
    'Garlic',
    'Mushrooms',
    'Tomatoes',
    'Chilli peppers',
    'Broccoli',
    'Watermelons',
    'Oranges',
    'Bananas',
    'Grapes',
    'Cherries',
    'Meat',
    'Fish',
    'Fresh food',
    'Lemons',
  ]

  return (
    <TagContainer>
      <Title>Product tags</Title>

      <TagsContainer>
        {productTags.map((tag) => (
          <Tag
            key={tag}
            as="button"
            label={tag}
            variant={selectedTags.includes(tag) ? 'selected' : 'default'}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </TagsContainer>
    </TagContainer>
  )
}
export default FooterTags
