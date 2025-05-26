import { productData } from '@dummy-data/product-data'

export interface RouteConfig {
  path: string
  label: string
  breadcrumbVisible?: boolean
  parent?: string
  getLabel?: (params: Record<string, string>) => string
  getBreadcrumbUrl?: (
    params: Record<string, string>,
    query?: Record<string, string>
  ) => string
}

export const routeConfig: Record<string, RouteConfig> = {
  home: {
    path: '/',
    label: 'Homepage',
    breadcrumbVisible: true,
  },
  allProducts: {
    path: '/all-products',
    label: 'All Products',
    breadcrumbVisible: true,
    parent: 'home',
  },
  searchResults: {
    path: '/search-results',
    label: 'Search Results',
    breadcrumbVisible: true,
    parent: 'home',
    getLabel: (params) => {
      return (
        'Search Results' + (params.search ? ': "' + params.search + '"' : '')
      )
    },
  },
  category: {
    path: '/:categoryPath',
    label: 'Category',
    breadcrumbVisible: true,
    parent: 'home',
    getLabel: (params) => {
      // Transform kebab-case to Title Case
      return params.categoryPath
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    getBreadcrumbUrl: (params) => `/${params.categoryPath}`,
  },
  subcategory: {
    path: '/:categoryPath/:subcategoryPath',
    label: 'Subcategory',
    breadcrumbVisible: true,
    parent: 'category',
    getLabel: (params) => {
      return params.subcategoryPath
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    getBreadcrumbUrl: (params) =>
      `/${params.categoryPath}?subcategory=${params.subcategoryPath}`,
  },
  product: {
    path: '/:categoryPath/:subcategoryPath/:productId',
    label: 'Product',
    breadcrumbVisible: true,
    parent: 'subcategory',
    getLabel: (params) => {
      // Find the product by ID in your product data
      const product = productData.find((p) => p.id === Number(params.productId))

      // If found, return the product title, otherwise return a default label
      return product ? product.title : `Product ${params.productId}`
    },
    getBreadcrumbUrl: (params) =>
      `/${params.categoryPath}/${params.subcategoryPath}/${params.productId}`,
  },
  checkout: {
    path: '/checkout',
    label: 'Checkout',
    breadcrumbVisible: true,
    parent: 'home',
  },
  cart: {
    path: '/cart',
    label: 'Shopping Cart',
    breadcrumbVisible: true,
    parent: 'home',
  },
}
