import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within, userEvent, expect } from '@storybook/test'
import BuyingUnit from './BuyingUnit'

const meta: Meta<typeof BuyingUnit> = {
  title: 'Components/ProductDetails/BuyingUnit',
  component: BuyingUnit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component for selecting quantity and unit type for product purchases.',
      },
    },
  },
  argTypes: {
    quantity: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'The current quantity value',
    },
    unit: {
      control: { type: 'select' },
      options: ['pcs', 'kgs', 'box', 'pack'],
      description: 'The current unit type',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size variant of the component',
    },
    onQuantityChange: {
      action: 'quantity-changed',
      description: 'Callback when quantity value changes',
    },
    onUnitChange: {
      action: 'unit-changed',
      description: 'Callback when unit type changes',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BuyingUnit>

export const Default: Story = {
  args: {
    quantity: 1,
    unit: 'pcs',
    onQuantityChange: action('quantity-changed'),
    onUnitChange: action('unit-changed'),
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
}

export const WithKilogramsUnit: Story = {
  args: {
    ...Default.args,
    quantity: 2,
    unit: 'kgs',
  },
}

export const WithBoxUnit: Story = {
  args: {
    ...Default.args,
    quantity: 5,
    unit: 'box',
  },
}

export const HighQuantity: Story = {
  args: {
    ...Default.args,
    quantity: 25,
    unit: 'pack',
  },
}

// Interactive story with user events
export const InteractiveTest: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test quantity input change
    const quantityInput = canvas.getByLabelText('Quantity')
    await userEvent.clear(quantityInput)
    await userEvent.type(quantityInput, '5')

    // Test unit dropdown
    const unitButton = canvas.getByRole('button', { expanded: false })
    await userEvent.click(unitButton)

    // Wait for dropdown to open
    const dropdown = canvas.getByRole('listbox')
    expect(dropdown).toBeVisible()

    // Select different unit
    const kgsOption = canvas.getByText('kgs')
    await userEvent.click(kgsOption)

    // Verify dropdown closes
    expect(dropdown).not.toBeVisible()
  },
}

// Accessibility testing
export const AccessibilityTest: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test keyboard navigation
    const quantityInput = canvas.getByLabelText('Quantity')
    const unitButton = canvas.getByRole('button')

    // Check ARIA attributes
    expect(quantityInput).toHaveAttribute('aria-label', 'Quantity')
    expect(unitButton).toHaveAttribute('aria-haspopup', 'listbox')
    expect(unitButton).toHaveAttribute('aria-expanded', 'false')

    // Test keyboard navigation
    await userEvent.tab()
    expect(quantityInput).toHaveFocus()

    await userEvent.tab()
    expect(unitButton).toHaveFocus()

    // Test Enter key on dropdown
    await userEvent.keyboard('{Enter}')
    expect(unitButton).toHaveAttribute('aria-expanded', 'true')
  },
}
