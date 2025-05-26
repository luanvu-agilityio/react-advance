import type { Meta, StoryObj } from '@storybook/react'
import Select from './Select'
import styled from 'styled-components'
import { useState } from 'react'

const SearchBarWrapper = styled.div`
  display: flex;
  width: 500px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background-color: var(--black-shade-5);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  height: 3.5rem;
`

const CategorySelectContainer = styled.div`
  min-width: 11rem;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 1px;
    background-color: #e5e7eb;
  }
`

const meta = {
  title: 'Components/Common/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    variant: {
      control: 'radio',
      options: ['default', 'search'],
    },

    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

const defaultOptions = [
  { value: 'all', label: 'All categories' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'fruit-and-veggie', label: 'Fruit and Vegetables' },
  { value: 'meat-and-fish', label: 'Meat and Fish' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'kitchen', label: 'Kitchen' },
]

// Default Select
export const Default: Story = {
  render: function DefaultSelect() {
    const [value, setValue] = useState('')

    return (
      <Select
        options={defaultOptions}
        value={value}
        onChange={setValue}
        placeholder="Select an option"
      />
    )
  },
}

// Search Bar Select
export const SearchBarSelect: Story = {
  render: function SearchbarSelect() {
    const [value, setValue] = useState('all')

    return (
      <SearchBarWrapper style={{ width: '200px' }}>
        <CategorySelectContainer>
          <Select
            options={defaultOptions}
            value={value}
            onChange={setValue}
            variant="search"
            placeholder="All categories"
          />
        </CategorySelectContainer>
      </SearchBarWrapper>
    )
  },
}

// Disabled Select
export const DisabledSelect: Story = {
  args: {
    options: defaultOptions,
    value: '',
    placeholder: 'Select disabled',
    disabled: true,
  },
}

// With Pre-selected Value
export const PreSelected: Story = {
  render: function PreSelected() {
    const [value, setValue] = useState('fruit-and-veggie')

    return (
      <Select
        options={defaultOptions}
        value={value}
        onChange={setValue}
        placeholder="Select category"
      />
    )
  },
}

// With Custom Styling
export const ManyOptions: Story = {
  render: function ManyOptionsSelect() {
    const [value, setValue] = useState('')

    const manyOptions = [
      ...defaultOptions,
      { value: 'dairy', label: 'Dairy Products' },
      { value: 'snacks', label: 'Snacks' },
      { value: 'frozen', label: 'Frozen Foods' },
      { value: 'canned', label: 'Canned Goods' },
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'condiments', label: 'Condiments' },
      { value: 'beverages', label: 'Beverages' },
      { value: 'pasta', label: 'Pasta & Rice' },
      { value: 'organic', label: 'Organic Foods' },
      { value: 'seasonal', label: 'Seasonal Items' },
    ]

    return (
      <div style={{ width: '300px' }}>
        <Select
          options={manyOptions}
          value={value}
          onChange={setValue}
          placeholder="Select from many options"
          style={{
            maxHeight: '300px',
            overflow: 'auto',
          }}
        />
      </div>
    )
  },
}
