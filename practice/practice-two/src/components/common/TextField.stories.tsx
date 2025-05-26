import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'
import TextField from './TextField'
import { Search, Mail, Lock } from 'lucide-react'

const meta = {
  title: 'Components/Common/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'search'],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },

    variant: {
      control: 'radio',
      options: ['default', 'search'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

const SearchBarWrapper = styled.div`
  width: 500px;
  border-radius: 12px;
  background-color: var(--black-shade-5);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  height: 3.5rem;
`

const Container = styled.div`
  width: 300px;
  margin: 1rem;
`

// Basic TextField
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
}

// Search Variant (from Header.tsx)
export const SearchVariant: Story = {
  args: {
    type: 'text',
    placeholder: 'Search Products, categories ...',
    variant: 'search',

    icon: <Search size={20} />,
    iconPosition: 'right',
  },
  decorators: [
    (Story) => (
      <SearchBarWrapper>
        <Story />
      </SearchBarWrapper>
    ),
  ],
}

// With Left Icon
export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Enter your email',
    type: 'email',
    icon: <Mail size={20} />,
    iconPosition: 'left',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
}

// With Right Icon
export const WithRightIcon: Story = {
  args: {
    placeholder: 'Enter password',
    type: 'password',
    icon: <Lock size={20} />,
    iconPosition: 'right',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
}

// Disabled State
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
}
