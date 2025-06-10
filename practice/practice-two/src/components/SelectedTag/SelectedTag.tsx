import { X } from 'lucide-react'
import styled from 'styled-components'

import type { ProductTag } from '@utils/tagUtils'
import { useProductTagStore } from '@stores/tagStore'

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-bottom: 20px;
`

const TagsHeader = styled.div`
  font-size: 12px;
  color: var(--black-shade-2);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  margin-right: 8px;
`

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background-color: var(--green-shade-4);
  border-radius: 12px;
  font-size: 12px;
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-semibold);
  color: var(--green-shade-1);
  border: none;
`

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--green-shade-3);

  &:hover {
    color: var(--red-500);
  }
`

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

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
