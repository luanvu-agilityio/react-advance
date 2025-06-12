import type { Meta, StoryObj } from '@storybook/react'
import type { ProductTag } from '@utils/tagUtils'
import { X } from 'lucide-react'
import {
  RemoveButton,
  Tag,
  TagsContainer,
  TagsHeader,
  TagsList,
} from './SelectedTag.styles'

const SelectedTagsForStory = ({
  tags = [],
  onRemove = (tag: ProductTag) => console.log('Removing tag:', tag),
}: {
  tags: ProductTag[]
  onRemove?: (tag: ProductTag) => void
}) => {
  if (tags.length === 0) return null

  return (
    <TagsContainer>
      <TagsHeader>Applied filters:</TagsHeader>
      <TagsList>
        {tags.map((tag: ProductTag) => (
          <Tag key={`${tag.type}-${tag.label}`}>
            {tag.label}
            <RemoveButton onClick={() => onRemove(tag)}>
              <X size={16} />
            </RemoveButton>
          </Tag>
        ))}
      </TagsList>
    </TagsContainer>
  )
}

const meta: Meta<typeof SelectedTagsForStory> = {
  title: 'Components/SelectedTags',
  component: SelectedTagsForStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <Story />
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof SelectedTagsForStory>

export const NoTags: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When no tags are selected, nothing is rendered.',
      },
    },
  },
  args: {
    tags: [],
  },
}

export const WithTags: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Display a list of selected tags with the ability to remove them.',
      },
    },
  },
  args: {
    tags: [
      { type: 'brand', label: 'Apple', value: 'apple' },
      { type: 'brand', label: 'Samsung', value: 'samsung' },
      { type: 'category', label: 'Phones', value: 'phones' },
    ],
  },
}

export const ManyTags: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles many tags.',
      },
    },
  },
  args: {
    tags: [
      { type: 'brand', label: 'Apple', value: 'apple' },
      { type: 'brand', label: 'Samsung', value: 'samsung' },
      { type: 'brand', label: 'Google', value: 'google' },
      { type: 'brand', label: 'Sony', value: 'sony' },
      { type: 'category', label: 'Electronics', value: 'electronics' },
      { type: 'category', label: 'Phones', value: 'phones' },
      { type: 'category', label: 'Tablets', value: 'tablets' },
    ],
  },
}
