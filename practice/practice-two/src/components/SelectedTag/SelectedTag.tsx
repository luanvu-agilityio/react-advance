import { X } from 'lucide-react'

import type { ProductTag } from '@utils/tagUtils'
import { useProductTagStore } from '@stores/tagStore'
import {
  RemoveButton,
  Tag,
  TagsContainer,
  TagsHeader,
  TagsList,
} from './SelectedTag.styles'

const SelectedTags = () => {
  const { selectedTags, removeTag } = useProductTagStore()

  if (selectedTags.length === 0) return null

  return (
    <TagsContainer>
      <TagsHeader>Applied filters:</TagsHeader>
      <TagsList>
        {selectedTags.map((tag: ProductTag) => (
          <Tag key={`${tag.type}-${tag.label}`}>
            {tag.label}
            <RemoveButton onClick={() => removeTag(tag)}>
              <X size={16} />
            </RemoveButton>
          </Tag>
        ))}
      </TagsList>
    </TagsContainer>
  )
}

export default SelectedTags
