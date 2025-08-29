'use client'

import Tag from '@components/common/Tag/index'
import { memo, useMemo } from 'react'
import { TagContainer, TagsContainer, Title } from './FooterTags.styles'
import { generateProductTags } from '@utils/tagUtils'
import type { ProductTag } from '@utils/tagUtils'
import { useTagNavigation } from '@hooks/useTagNavigation'
import { useProductTagStore } from '@stores/tagStore'

const FooterTags = memo(() => {
  const { navigateToTag } = useTagNavigation()
  const { addTag, isTagSelected } = useProductTagStore()

  // Generate dynamic tags on component mount
  const dynamicTags = useMemo(() => {
    return generateProductTags(17)
  }, [])

  const toggleTag = (tag: ProductTag) => {
    addTag(tag)

    setTimeout(() => {
      navigateToTag(tag)
    }, 150)
  }

  return (
    <TagContainer>
      <Title>Product tags</Title>

      <TagsContainer>
        {dynamicTags.map((tag) => (
          <Tag
            key={`${tag.type}-${tag.label}`}
            as="button"
            label={tag.label}
            variant={isTagSelected(tag.label) ? 'selected' : 'default'}
            onClick={() => toggleTag(tag)}
            data-tag-type={tag.type}
            style={{
              borderColor: (() => {
                if (tag.type === 'category') return 'var(--green-color-default)'
                if (tag.type === 'subcategory')
                  return 'var(--coral-color-default)'
                return 'var(--gray-300)'
              })(),
              borderWidth: tag.type === 'product' ? '1px' : '2px',
            }}
          />
        ))}
      </TagsContainer>
    </TagContainer>
  )
})
export default FooterTags
