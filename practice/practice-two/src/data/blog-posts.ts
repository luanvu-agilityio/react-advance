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
    imageUrl:
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1748375317/blog-dinner_knct7c.jpg',
  },
  {
    id: 2,
    title: "Which vegetable your family will love and want's eat each day",
    category: 'Vegetable',
    author: 'Author',
    date: '15. 6. 2020',
    imageUrl:
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1748375322/blog-veggie_phtrkg.jpg',
  },
  {
    id: 3,
    title: 'Salad is kinda good start to your morning routines',
    author: 'Author',
    date: '14.1.2020',
    imageUrl:
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1748375319/blog-salad_zldzdr.jpg',
  },
  {
    id: 4,
    title: 'Our chef tips for a great and healthy breakfast',
    author: 'Author',
    date: '14.1.2020',
    imageUrl:
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1748375314/blog-breakfast_tiked5.jpg',
  },
  {
    id: 5,
    title: 'Prepare a simple and delicious breads',
    author: 'Author',
    date: '14.1.2020',
    imageUrl:
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1748375308/blog-breads_sbr3ua.jpg',
  },
]
