import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'
import SearchBar from './Searchbar'

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'SearchBar component with category filtering and search results dropdown.',
      },
    },
    // Add story parameters to mock router
    reactRouter: {
      routePath: '/',
      navigate: action('navigate'),
      location: { pathname: '/' },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '800px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    onSearch: { action: 'searched' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  args: {
    onSearch: action('search'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default SearchBar with empty input.',
      },
    },
  },
}

export const WithQuery: Story = {
  args: {
    onSearch: action('search'),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement
    const searchInput = canvas.querySelector('input') as HTMLInputElement

    await step('Enter search query', async () => {
      searchInput.value = 'apple'
      searchInput.dispatchEvent(new Event('change', { bubbles: true }))
      searchInput.dispatchEvent(new Event('focus', { bubbles: true }))
    })
  },
  parameters: {
    docs: {
      description: {
        story: 'SearchBar with a query and dropdown results.',
      },
    },
  },
}

export const CategoryFiltered: Story = {
  args: {
    onSearch: action('search'),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement
    const searchInput = canvas.querySelector('input') as HTMLInputElement
    const selectElement = canvas.querySelector('select') as HTMLSelectElement

    await step('Select category and enter search query', async () => {
      selectElement.value = 'bakery'
      selectElement.dispatchEvent(new Event('change', { bubbles: true }))

      searchInput.value = 'bread'
      searchInput.dispatchEvent(new Event('change', { bubbles: true }))
      searchInput.dispatchEvent(new Event('focus', { bubbles: true }))
    })
  },
  parameters: {
    docs: {
      description: {
        story: 'SearchBar with category filtering applied.',
      },
    },
  },
}

export const MobileLayout: Story = {
  args: {
    onSearch: action('search'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'SearchBar in mobile view.',
      },
    },
  },
}

export const MobileSearchActive: Story = {
  args: {
    onSearch: action('search'),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement
    const searchIcon = canvas.querySelector(
      '[aria-label="Search"]'
    ) as HTMLButtonElement

    await step('Activate mobile search', async () => {
      searchIcon.click()
    })
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile SearchBar with active search mode.',
      },
    },
  },
}
