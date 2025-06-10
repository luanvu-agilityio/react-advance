import { render } from '@testing-library/react'
import { ProductCount } from './ProductCount'

describe('ProductCount', () => {
  // SNAPSHOT TESTS FOR RENDERING
  describe('Rendering', () => {
    it('renders correctly for different product counts', () => {
      // Standard product count
      const { container: standardCount } = render(
        <ProductCount totalProducts={42} />
      )
      expect(standardCount).toMatchSnapshot('standard-count')

      // Zero products
      const { container: zeroCount } = render(
        <ProductCount totalProducts={0} />
      )
      expect(zeroCount).toMatchSnapshot('zero-count')

      // Single product (singular case)
      const { container: singleCount } = render(
        <ProductCount totalProducts={1} />
      )
      expect(singleCount).toMatchSnapshot('single-count')

      // Large number of products
      const { container: largeCount } = render(
        <ProductCount totalProducts={1000} />
      )
      expect(largeCount).toMatchSnapshot('large-count')
    })
  })
})
