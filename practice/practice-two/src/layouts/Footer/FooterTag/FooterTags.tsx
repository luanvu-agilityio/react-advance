import Tag from '@components/common/Tag/index'
<<<<<<< HEAD
import { useMemo } from 'react'
=======
import { useEffect, useMemo, useState } from 'react'
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
import { TagContainer, TagsContainer, Title } from './FooterTags.styles'
import { generateProductTags } from '@utils/tagUtils'
import type { ProductTag } from '@utils/tagUtils'
import { useTagNavigation } from '@hooks/useTagNavigation'
<<<<<<< HEAD
import { useProductTagStore } from '@stores/tagStore'

const FooterTags = () => {
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

=======

const FooterTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { navigateToTag } = useTagNavigation()

  // Generate dynamic tags on component mount
  const dynamicTags = useMemo(() => {
    return generateProductTags(17) // Generate 17 dynamic tags
  }, [])

  const toggleTag = (tag: ProductTag) => {
    const tagLabel = tag.label

    if (selectedTags.includes(tagLabel)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagLabel))
    } else {
      setSelectedTags([...selectedTags, tagLabel])

      // Navigate to the appropriate page when tag is selected
      setTimeout(() => {
        navigateToTag(tag)
      }, 150)
    }
  }

  useEffect(() => {
    const clearSelections = () => setSelectedTags([])

    // Clear selections after 2 seconds of selection
    if (selectedTags.length > 0) {
      const timer = setTimeout(clearSelections, 2000)
      return () => clearTimeout(timer)
    }
  }, [selectedTags])

>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
  return (
    <TagContainer>
      <Title>Product tags</Title>

      <TagsContainer>
        {dynamicTags.map((tag) => (
          <Tag
            key={`${tag.type}-${tag.label}`}
            as="button"
            label={tag.label}
<<<<<<< HEAD
            variant={isTagSelected(tag.label) ? 'selected' : 'default'}
            onClick={() => toggleTag(tag)}
            data-tag-type={tag.type}
            style={{
=======
            variant={selectedTags.includes(tag.label) ? 'selected' : 'default'}
            onClick={() => toggleTag(tag)}
            data-tag-type={tag.type}
            style={{
              // Add visual indicators for different tag types
>>>>>>> 7a35d9791a5da6fe80ff0a8541efaf78233de04d
              borderColor:
                tag.type === 'category'
                  ? 'var(--green-color-default)'
                  : tag.type === 'subcategory'
                    ? 'var(--blue-color-default)'
                    : 'var(--gray-300)',
              borderWidth: tag.type === 'product' ? '1px' : '2px',
            }}
          />
        ))}
      </TagsContainer>
    </TagContainer>
  )
}
export default FooterTags
