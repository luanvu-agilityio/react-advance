import type { Meta, StoryObj } from '@storybook/react'
import { FormError } from './FormError'

const meta: Meta<typeof FormError> = {
  title: 'Components/Common/FormError',
  component: FormError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FormError>

/**
 * Default FormError with a string message
 */
export const DefaultError: Story = {
  args: {
    message: 'This field is required',
  },
}

/**
 * FormError with children content instead of message
 */
export const WithChildren: Story = {
  render: () => (
    <FormError>
      <span>
        Please enter a <strong>valid</strong> email address
      </span>
    </FormError>
  ),
}

/**
 * FormError with a long error message
 */
export const LongErrorMessage: Story = {
  args: {
    message:
      'This is a very long error message that might wrap to multiple lines in the UI. Please ensure your input meets all the validation requirements.',
  },
}

/**
 * FormError with no content (should not render)
 */
export const NoContent: Story = {
  args: {},
}
