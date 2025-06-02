import { productData } from '@data/product-data'
import type { Product } from 'types/Product'

export interface ProductTag {
  label: string
  type: 'category' | 'subcategory' | 'product'
  value: string
  productId?: number
  categoryPath?: string
}

/**
 * Extracts keywords from product titles by removing common words
 */
const extractKeywordsFromTitle = (title: string): string[] => {
  const commonWords = [
    'premium',
    'organic',
    'fresh',
    'natural',
    'artisan',
    'free-range',
    'wild',
    'caught',
    'grass-fed',
    'cold-pressed',
    'craft',
    'seasonal',
    'eco-friendly',
    'advanced',
    'jumbo',
    'baby',
    'antioxidant',
  ]

  return title
    .toLowerCase()
    .split(' ')
    .filter(
      (word) =>
        word.length > 3 &&
        !commonWords.includes(word) &&
        !word.includes('-') &&
        !/\d/.test(word)
    )
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
}

/**
 * Generates dynamic product tags from the product data
 */
export const generateProductTags = (count: number = 20): ProductTag[] => {
  const tags: ProductTag[] = []
  const usedTags = new Set<string>()

  // Get unique categories
  const categories = [...new Set(productData.map((p) => p.category))]
  categories.forEach((category) => {
    if (tags.length < count && !usedTags.has(category.toLowerCase())) {
      tags.push({
        label: category,
        type: 'category',
        value: category.toLowerCase().replace(/\s+/g, '-'),
      })
      usedTags.add(category.toLowerCase())
    }
  })

  // Get unique subcategories
  const subcategoryMap = new Map<string, string>()
  productData.forEach((product) => {
    const subcategory = product.subcategory
    const category = product.category
    if (!subcategoryMap.has(subcategory)) {
      subcategoryMap.set(subcategory, category)
    }
  })

  Array.from(subcategoryMap.entries()).forEach(([subcategory, category]) => {
    if (tags.length < count && !usedTags.has(subcategory.toLowerCase())) {
      tags.push({
        label: subcategory,
        type: 'subcategory',
        value: subcategory.toLowerCase().replace(/\s+/g, '-'),
        categoryPath: category.toLowerCase().replace(/\s+/g, '-'), // Store parent category
      })
      usedTags.add(subcategory.toLowerCase())
    }
  })

  // Get product title keywords
  const productKeywords: Array<{ keyword: string; product: Product }> = []
  productData.forEach((product) => {
    const keywords = extractKeywordsFromTitle(product.title)
    keywords.forEach((keyword) => {
      if (!usedTags.has(keyword.toLowerCase())) {
        productKeywords.push({ keyword, product })
        usedTags.add(keyword.toLowerCase())
      }
    })
  })

  // Add random product keywords
  const shuffledKeywords = productKeywords.sort(() => Math.random() - 0.5)
  shuffledKeywords
    .slice(0, count - tags.length)
    .forEach(({ keyword, product }) => {
      tags.push({
        label: keyword,
        type: 'product',
        value: keyword.toLowerCase(),
        productId: product.id,
      })
    })

  // Shuffle all tags for random display
  return tags.sort(() => Math.random() - 0.5).slice(0, count)
}

/**
 * Finds the most relevant product for a keyword
 */
export const findProductByKeyword = (keyword: string): Product | null => {
  const lowerKeyword = keyword.toLowerCase()

  // First try exact title match
  const exactMatch = productData.find((product) =>
    product.title.toLowerCase().includes(lowerKeyword)
  )

  if (exactMatch) return exactMatch

  // Then try description match
  const descriptionMatch = productData.find((product) =>
    product.description.toLowerCase().includes(lowerKeyword)
  )

  if (descriptionMatch) return descriptionMatch

  // Finally try tags match
  const tagMatch = productData.find((product) =>
    product.tags?.some((tag) => tag.toLowerCase().includes(lowerKeyword))
  )

  return tagMatch || null
}

/**
 * Generates navigation URL for a tag
 */
export const generateTagUrl = (tag: ProductTag): string => {
  switch (tag.type) {
    case 'category':
      return `/${tag.value}`

    case 'subcategory': {
      // Use the stored category path and add subcategory parameter
      if (tag.categoryPath) {
        return `/${tag.categoryPath}?subcategory=${tag.value}`
      }
      // Fallback: find the category for this subcategory
      const product = productData.find((p) => p.subcategory === tag.label)
      if (product) {
        const categoryPath = product.category.toLowerCase().replace(/\s+/g, '-')
        return `/${categoryPath}?subcategory=${tag.value}`
      }
      return `/${tag.value}`
    }

    case 'product':
      if (tag.productId) {
        return `/product/${tag.productId}`
      }
      // Fallback: search for the keyword
      return `/search-results?search=${encodeURIComponent(tag.label)}`

    default:
      return '/'
  }
}
