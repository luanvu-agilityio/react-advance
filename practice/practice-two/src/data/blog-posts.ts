export interface BlogPostType {
  id: number
  title: string
  category?: string
  author: string
  date: string
  imageUrl?: string
}

export const blogPosts: BlogPostType[] = [
  {
    id: 1,
    title: 'Our chef tips for a great and tasty dinner ready in 20 minutes',
    category: 'Dinner tips',
    author: 'Author',
    date: '17. 6. 2020',
    imageUrl: './src/assets/images/products/blog-dinner.jpg',
  },
  {
    id: 2,
    title: "Which vegetable your family will love and want's eat each day",
    category: 'Vegetable',
    author: 'Author',
    date: '15. 6. 2020',
    imageUrl: './src/assets/images/products/blog-veggie.jpg',
  },
  {
    id: 3,
    title: 'Salad is kinda good start to your morning routines',
    author: 'Author',
    date: '14.1.2020',
    imageUrl: './src/assets/images/products/blog-salad.jpeg',
  },
  {
    id: 4,
    title: 'Our chef tips for a great and healthy breakfast',
    author: 'Author',
    date: '14.1.2020',
    imageUrl: './src/assets/images/products/blog-breakfast.jpeg',
  },
  {
    id: 5,
    title: 'Prepare a simple and delicious breads',
    author: 'Author',
    date: '14.1.2020',
    imageUrl: './src/assets/images/products/blog-breads.jpg',
  },
]
