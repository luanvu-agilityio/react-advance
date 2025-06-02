import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RatingFilter } from './RatingFilter'
import type { RatingProps } from 'types/Filter'

const meta: Meta<typeof RatingFilter> = {
  title: 'Components/Filter/RatingFilter',
  component: RatingFilter,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RatingFilter>

/**
 * Default RatingFilter with various rating options
 */
export const Default: Story = {
  args: {
    ratings: [
      { rating: 5, selected: false },
      { rating: 4, selected: true },
      { rating: 3, selected: false },
      { rating: 2, selected: false },
      { rating: 1, selected: false },
    ],
    onRatingChange: (index) => {
      console.log(`Rating at index ${index} clicked`)
    },
  },
}

/**
 * RatingFilter with no selected ratings
 */
export const NoSelectedRatings: Story = {
  args: {
    ratings: [
      { rating: 5, selected: false },
      { rating: 4, selected: false },
      { rating: 3, selected: false },
      { rating: 2, selected: false },
      { rating: 1, selected: false },
    ],
    onRatingChange: (index) => {
      console.log(`Rating at index ${index} clicked`)
    },
  },
}

/**
 * RatingFilter with multiple selected ratings
 */
export const MultipleSelectedRatings: Story = {
  args: {
    ratings: [
      { rating: 5, selected: true },
      { rating: 4, selected: true },
      { rating: 3, selected: false },
      { rating: 2, selected: true },
      { rating: 1, selected: false },
    ],
    onRatingChange: (index) => {
      console.log(`Rating at index ${index} clicked`)
    },
  },
}

/**
 * Interactive RatingFilter that demonstrates state changes
 */
export const Interactive: Story = {
  render: function InteractiveRatingFilter() {
    const [ratings, setRatings] = useState<RatingProps[]>([
      { rating: 5, selected: false },
      { rating: 4, selected: false },
      { rating: 3, selected: false },
      { rating: 2, selected: false },
      { rating: 1, selected: false },
    ])

    const handleRatingChange = (index: number) => {
      const newRatings = [...ratings]
      newRatings[index].selected = !newRatings[index].selected
      setRatings(newRatings)
    }

    return (
      <RatingFilter ratings={ratings} onRatingChange={handleRatingChange} />
    )
  },
}

/**
 * RatingFilter with a single rating option
 */
export const SingleRating: Story = {
  args: {
    ratings: [{ rating: 5, selected: true }],
    onRatingChange: () => {},
  },
}

/**
 * RatingFilter with empty ratings array (should not render stars)
 */
export const EmptyRatings: Story = {
  args: {
    ratings: [],
    onRatingChange: () => {},
  },
}
