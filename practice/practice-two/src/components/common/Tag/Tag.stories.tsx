import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'
import Tag from './index'

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const CategoryContainer = styled.div`
  .fruit a {
    background-color: var(--green-shade-3);
    color: var(--green-shade-1);
    &:hover {
      background-color: var(--green-shade-2);
    }
  }

  .vegetable a {
    background-color: var(--coral-shade-3);
    color: var(--coral-shade-1);
    &:hover {
      background-color: var(--coral-shade-2);
    }
  }

  .protein a {
    background-color: var(--brown-shade-3);
    color: var(--brown-shade-1);
    &:hover {
      background-color: var(--brown-shade-2);
    }
  }
`

const meta = {
  title: 'Components/Common/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'radio',
      options: ['button', 'link'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'selected', 'disabled'],
    },
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    href: { control: 'text' },

    className: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof Tag>

// Basic Button Tag
export const ButtonTag: Story = {
  args: {
    as: 'button',
    label: 'Button Tag',
    onClick: () => console.log('Clicked'),
  },
}

// Selected Button Tag
export const SelectedButtonTag: Story = {
  args: {
    as: 'button',
    label: 'Selected Tag',
    variant: 'selected',
    onClick: () => console.log('Clicked'),
  },
}

// Disabled Button Tag
export const DisabledButtonTag: Story = {
  args: {
    as: 'button',
    label: 'Disabled Tag',
    variant: 'disabled',
    onClick: () => console.log('Clicked'),
  },
}

// Basic Link Tag
export const LinkTag: Story = {
  args: {
    as: 'link',
    label: 'Link Tag',
    href: '#',
    onClick: (e) => e.preventDefault(),
  },
}

// Multiple Tags Group
export const TagGroup: Story = {
  decorators: [
    () => (
      <TagsContainer>
        <Tag as="button" label="Beans" onClick={() => {}} />
        <Tag
          as="button"
          label="Carrots"
          variant="selected"
          onClick={() => {}}
        />
        <Tag as="button" label="Apples" onClick={() => {}} />
        <Tag
          as="button"
          label="Disabled"
          variant="disabled"
          onClick={() => {}}
        />
      </TagsContainer>
    ),
  ],
}

// Category Link Tags
export const CategoryLinkTags: Story = {
  decorators: [
    () => (
      <CategoryContainer>
        <TagsContainer>
          <div className="fruit">
            <Tag
              as="link"
              label="Fruits"
              href="#"
              onClick={(e) => e.preventDefault()}
            />
          </div>
          <div className="vegetable">
            <Tag
              as="link"
              label="Vegetables"
              href="#"
              onClick={(e) => e.preventDefault()}
            />
          </div>
          <div className="protein">
            <Tag
              as="link"
              label="Meat & Fish"
              href="#"
              onClick={(e) => e.preventDefault()}
            />
          </div>
        </TagsContainer>
      </CategoryContainer>
    ),
  ],
}

// Interactive Tag Group
export const InteractiveTagGroup: Story = {
  parameters: {
    docs: {
      story: { inline: true },
    },
  },
  render: function Render() {
    const productTags = [
      'Beans',
      'Carrots',
      'Apples',
      'Garlic',
      'Mushrooms',
      'Tomatoes',
    ]

    return (
      <TagsContainer>
        {productTags.map((tag) => (
          <Tag
            key={tag}
            as="button"
            label={tag}
            onClick={() => console.log(`Clicked ${tag}`)}
          />
        ))}
      </TagsContainer>
    )
  },
}
