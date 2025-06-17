import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `

## CSS Variables Used

The button uses these variables from theme.css:

| Variable | Description |
|----------|-------------|
| \`--green-color-default\` | Primary green color for solid buttons |
| \`--green-shade-1\` | Darker green for hover states |
| \`--green-shade-2\` | Used for outlines and focus states |
| \`--black-color-default\` | Default text color |
| \`--black-shade-3\` | Medium gray color |
| \`--black-shade-5\` | Light gray background |
| \`--white-color\` | White text color |
| \`--font-family-primary\` | Main font family |
| \`--font-weight-bold\` | Font weight for button text |
`,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual style variant of the button',
      control: {
        type: 'select',
        options: ['solid', 'soft', 'outline', 'ghost'],
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      description: 'Size of the button',
      control: {
        type: 'select',
        options: ['1', '2', '3'],
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '2' },
      },
    },

    onClick: { action: 'clicked' },
    children: {
      description: 'The content of the button',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Default button with standard settings
 */
export const Default: Story = {
  args: {
    children: 'Default Button',
    onClick: action('button clicked'),
  },
}

/**
 * Solid variant has a filled background with white text.
 *
 * CSS from theme.css:
 * ```css
 * .rt-variant-solid {
 *   background-color: var(--green-color-default);
 *   border: 2px solid var(--black-shade-1);
 *   color: var(--white-color);
 *   padding: 6px 12px;
 *   min-height: 36px;
 * }
 * ```
 */
export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'Solid Button',
    onClick: action('solid button clicked'),
  },
}

/**
 * Soft variant has no background or border, only text styling.
 *
 * CSS from theme.css:
 * ```css
 * .rt-variant-soft {
 *   color: var(--black-color-default);
 *   border: none;
 * }
 * ```
 */
export const Soft: Story = {
  args: {
    variant: 'soft',
    children: 'Soft Button',
    onClick: action('soft button clicked'),
  },
}

/**
 * Outline variant has a transparent background with a border.
 *
 * CSS from theme.css:
 * ```css
 * .rt-variant-outline {
 *   background-color: transparent;
 *   color: var(--black-color-default);
 *   border: 2px solid var(--green-shade-2);
 *   padding: 12px 16px;
 * }
 * ```
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
    onClick: action('outline button clicked'),
  },
}

/**
 * Ghost variant has a light background that gets darker on hover.
 *
 * CSS from theme.css:
 * ```css
 * .rt-variant-ghost {
 *   background-color: var(--black-shade-5);
 *   color: var(--black-color-default);
 *   border: none;
 *   padding: 12px 16px;
 * }
 * ```
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
    onClick: action('ghost button clicked'),
  },
}

/**
 * Small buttons use size "1" with minimal padding.
 *
 * CSS from theme.css:
 * ```css
 * .rt-r-size-1 {
 *   padding: 6px 12px;
 * }
 * ```
 */
export const Small: Story = {
  args: {
    size: '1',
    children: 'Small Button',
    onClick: action('small button clicked'),
  },
}

/**
 * Medium buttons use size "2" with standard padding.
 *
 * CSS from theme.css:
 * ```css
 * .rt-r-size-2 {
 *   padding: 12px 16px;
 * }
 * ```
 */
export const Medium: Story = {
  args: {
    size: '2',
    children: 'Medium Button',
    onClick: action('medium button clicked'),
  },
}

/**
 * Large buttons use size "3" with extra padding.
 *
 * CSS from theme.css:
 * ```css
 * .rt-r-size-3 {
 *   padding: 12px 24px;
 * }
 * ```
 */
export const Large: Story = {
  args: {
    size: '3',
    children: 'Large Button',
    onClick: action('large button clicked'),
  },
}

/**
 * Disabled buttons have reduced opacity and cannot be clicked.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
    onClick: action('this should not be called'),
  },
}

/**
 * Buttons can contain icons alongside text.
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span style={{ marginRight: '8px' }}>🔍</span>
        Search
      </>
    ),
    onClick: action('icon button clicked'),
  },
}

/**
 * A group showing all button variants for comparison.
 */
export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="solid" onClick={() => console.log('Button clicked')}>
        Solid
      </Button>
      <Button variant="soft" onClick={() => console.log('Button clicked')}>
        Soft
      </Button>
      <Button variant="outline" onClick={() => console.log('Button clicked')}>
        Outline
      </Button>
      <Button variant="ghost" onClick={() => console.log('Button clicked')}>
        Ghost
      </Button>
    </div>
  ),
}

/**
 * A group showing all button sizes for comparison.
 */
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="1" onClick={() => console.log('Button clicked')}>
        Small
      </Button>
      <Button size="2" onClick={() => console.log('Button clicked')}>
        Medium
      </Button>
      <Button size="3" onClick={() => console.log('Button clicked')}>
        Large
      </Button>
    </div>
  ),
}
