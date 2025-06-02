import appleImage from '@assets/images/products/apple.jpg'
import bananaImage from '@assets/images/products/banana.jpg'
import orangeImage from '@assets/images/products/orange.jpg'
import strawberryImage from '@assets/images/products/strawberry.jpg'
import avocadoImage from '@assets/images/products/avocado.jpg'
import tomatoImage from '@assets/images/products/tomato.jpg'
import spinachImage from '@assets/images/products/spinach.jpg'
import carrotImage from '@assets/images/products/carrot.jpg'
import berryImage from '@assets/images/products/berry.jpg'
import dragonFruitImage from '@assets/images/products/dragon-fruit.jpg'
import sourdoughImage from '@assets/images/products/sourdough.jpg'
import baguetteImage from '@assets/images/products/baguette.jpg'
import croissantImage from '@assets/images/products/croissant.jpg'
import chocCakeImage from '@assets/images/products/chocolate-cake.jpg'
import steakImage from '@assets/images/products/steak.jpg'
import groundBeefImage from '@assets/images/products/ground-beef.jpg'
import chickenBreastImage from '@assets/images/products/chicken-breast.jpg'
import salmonImage from '@assets/images/products/salmon.jpg'
import shrimpImage from '@assets/images/products/shrimp.jpg'
import ojImage from '@assets/images/products/orange-juice.jpg'
import greenTeaImage from '@assets/images/products/green-tea.jpg'
import ipaBeerImage from '@assets/images/products/ipa-beer.jpg'
import redWineImage from '@assets/images/products/red-wine.jpg'
import berrySmoothieImage from '@assets/images/products/berry-smoothie.jpg'
import fryingPanImage from '@assets/images/products/frying-pan.jpg'
import standMixerImage from '@assets/images/products/stand-mixer.jpg'
import knifeImage from '@assets/images/products/knife-set.jpg'
import proteinPowderImage from '@assets/images/products/protein-powder.jpg'
import ketoShakeImage from '@assets/images/products/keto-shake.jpg'
import chiaImage from '@assets/images/products/chia-seeds.jpg'
import babyFormulaImage from '@assets/images/products/baby-formula.jpg'
import diaperImage from '@assets/images/products/diapers.jpg'
import feedingSetImage from '@assets/images/products/feeding-set.jpg'
import coldFluMedImage from '@assets/images/products/cold-flu-med.jpg'
import skincareImage from '@assets/images/products/skincare.jpg'
import firstAidImage from '@assets/images/products/first-aid.jpg'

interface ProductImage {
  main: string
  gallery: string[]
}

interface Product {
  id: number
  title: string
  description: string
  price: number
  originalPrice: number
  discountPercentage?: number
  rating: number
  delivery: {
    time: string
    location: string
  }
  freshness: string
  farm: string
  stock: string
  freeShipping: boolean
  imageUrl: string
  brand: string
  category: string
  subcategory: string
  tags: string[]
  variant?: string
  images: ProductImage
  section?: string[]
}

export const productData: Product[] = [
  // FRUIT AND VEGETABLES CATEGORY
  {
    id: 1,
    title: 'Premium Organic Apples',
    description: 'Sweet and juicy fresh apples from local farms',
    price: 36.99,
    originalPrice: 48.56,
    discountPercentage: 36,
    rating: 4,
    delivery: {
      time: '1 day',
      location: 'Europe',
    },
    freshness: 'New (Extra fresh)',
    farm: 'Grocery Tarm Fields',
    stock: '320 pcs',
    freeShipping: true,
    imageUrl: appleImage,
    brand: "Nature's Best",
    category: 'Fruit and vegetables',
    subcategory: 'Fresh Fruits',
    tags: ['organic', 'fruit', 'popular'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372662/apple-1_kismkx.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372662/apple-1_kismkx.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372665/apple-2_vgndkj.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372668/apple-3_z3hqfg.jpg',
      ],
    },
    section: ['best-selling', 'featured'],
  },
  {
    id: 2,
    title: 'Organic Bananas',
    description: 'Fresh and organic bananas with high potassium content',
    price: 12.99,
    originalPrice: 17.56,
    discountPercentage: 36,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Europe',
    },
    freshness: 'New (Extra fresh)',
    farm: 'Tropical Farms',
    stock: '450 pcs',
    freeShipping: true,
    imageUrl: bananaImage,
    brand: 'Tropical Harvest',
    category: 'Fruit and vegetables',
    subcategory: 'Fresh Fruits',
    tags: ['organic', 'fruit', 'popular'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372670/banana-1_ffomgj.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372670/banana-1_ffomgj.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372671/banana-2_bezcwm.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372672/banana-3_ponvv8.jpg',
      ],
    },
  },
  {
    id: 3,
    title: 'Fresh Oranges',
    description: 'Juicy oranges rich in vitamin C for immune support',
    price: 24.99,
    originalPrice: 32.56,
    discountPercentage: 36,
    rating: 4,
    delivery: {
      time: '2 days',
      location: 'Local',
    },
    freshness: 'New (Fresh)',
    farm: 'Citrus Gardens',
    stock: '280 pcs',
    freeShipping: true,
    imageUrl: orangeImage,
    brand: 'Citrus Delights',
    category: 'Fruit and vegetables',
    subcategory: 'Fresh Fruits',
    tags: ['fruit', 'vitamin-rich'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372682/orange-1_kpr5vv.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372682/orange-1_kpr5vv.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372683/orange-2_kdpt8r.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372684/orange-3_by2ekb.jpg',
      ],
    },
  },
  {
    id: 4,
    title: 'Strawberries',
    description: 'Sweet and juicy strawberries freshly picked',
    price: 36.99,
    originalPrice: 48.56,
    discountPercentage: 36,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Europe',
    },
    freshness: 'New (Extra fresh)',
    farm: 'Berry Fields',
    stock: '180 pcs',
    freeShipping: true,
    imageUrl: strawberryImage,
    brand: 'Berry Farms',
    category: 'Fruit and vegetables',
    subcategory: 'Fresh Fruits',
    tags: ['berries', 'fruit', 'seasonal'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372688/strawberry-1_ojmsh1.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372688/strawberry-1_ojmsh1.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372690/strawberry-2_k7kapa.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372691/strawberry-3_gi2rnk.jpg',
      ],
    },
    section: ['best-selling', 'featured'],
  },
  {
    id: 5,
    title: 'Organic Avocados',
    description: 'Creamy and nutritious avocados for healthy meals',
    price: 28.99,
    originalPrice: 36.56,
    discountPercentage: 36,
    rating: 3,
    delivery: {
      time: '3 days',
      location: 'International',
    },
    freshness: 'Fresh',
    farm: 'Green Farms',
    stock: '150 pcs',
    freeShipping: false,
    imageUrl: avocadoImage,
    brand: 'Eco Harvest',
    category: 'Fruit and vegetables',
    subcategory: 'Organic',
    tags: ['organic', 'fruit', 'healthy'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372701/avocado-1_mehgru.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372701/avocado-1_mehgru.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372704/avocado-2_memtzq.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372708/avocado-3_bnkrtm.jpg',
      ],
    },
  },
  {
    id: 6,
    title: 'Fresh Tomatoes',
    description: 'Vine-ripened tomatoes perfect for salads and cooking',
    price: 18.99,
    originalPrice: 24.56,
    discountPercentage: 36,
    rating: 4,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'New (Fresh)',
    farm: 'Red Valley Farms',
    stock: '230 pcs',
    freeShipping: true,
    imageUrl: tomatoImage,
    brand: 'Farm Fresh',
    category: 'Fruit and vegetables',
    subcategory: 'Vegetables',
    tags: ['fresh', 'vegetable', 'local'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372733/tomato-1_ro8cij.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372733/tomato-1_ro8cij.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372734/tomato-2_s7rqov.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372735/tomato-3_ldnyei.jpg',
      ],
    },
    section: ['featured'],
  },
  {
    id: 11,
    title: 'Organic Baby Spinach',
    description:
      'Fresh organic baby spinach leaves perfect for salads and cooking',
    price: 4.99,
    originalPrice: 6.99,
    discountPercentage: 29,
    rating: 4,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'New (Extra fresh)',
    farm: 'Green Valley Organics',
    stock: '100 packs',
    freeShipping: false,
    imageUrl: spinachImage,
    brand: 'Pure Greens',
    category: 'Fruit and vegetables',
    subcategory: 'Vegetables',
    tags: ['organic', 'leafy-green', 'salad'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372726/spinach-1_tzoi3a.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372726/spinach-1_tzoi3a.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372729/spinach-2_z1e0i9.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372730/spinach-3_ip5vzv.jpg',
      ],
    },
  },
  {
    id: 12,
    title: 'Organic Carrots Bundle',
    description:
      'Sweet and crunchy organic carrots, perfect for snacking and cooking',
    price: 3.99,
    originalPrice: 4.99,
    discountPercentage: 20,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh',
    farm: 'Root Farm Organics',
    stock: '150 bundles',
    freeShipping: false,
    imageUrl: carrotImage,
    brand: 'Earth Harvest',
    category: 'Fruit and vegetables',
    subcategory: 'Vegetables',
    tags: ['organic', 'root-vegetable'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372722/carrot-1_t1dvwf.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372722/carrot-1_t1dvwf.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372723/carrot-2_vvslxc.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372724/carrot-3_etwy3v.jpg',
      ],
    },
  },
  {
    id: 13,
    title: 'Seasonal Organic Berry Mix',
    description:
      'Mix of seasonal organic berries including blueberries, raspberries, and blackberries',
    price: 8.99,
    originalPrice: 12.99,
    discountPercentage: 31,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'New (Extra fresh)',
    farm: 'Berry Farm Collective',
    stock: '60 packs',
    freeShipping: true,
    imageUrl: berryImage,
    brand: 'Berry Harvest',
    category: 'Fruit and vegetables',
    subcategory: 'Organic',
    tags: ['organic', 'berries', 'seasonal', 'superfoods'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372716/berry-mix-1_zdrppi.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372716/berry-mix-1_zdrppi.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372717/berry-mix-2_mxwwc3.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372719/berry-mix-3_xko6rr.jpg',
      ],
    },
    section: ['best-selling'],
  },
  {
    id: 14,
    title: 'Dragon Fruit',
    description: 'Exotic dragon fruit with vibrant color and sweet taste',
    price: 6.99,
    originalPrice: 8.99,
    discountPercentage: 22,
    rating: 4,
    delivery: {
      time: '2 days',
      location: 'International',
    },
    freshness: 'Fresh',
    farm: 'Exotic Fruit Farms',
    stock: '40 pcs',
    freeShipping: false,
    imageUrl: dragonFruitImage,
    brand: 'Tropical Exotics',
    category: 'Fruit and vegetables',
    subcategory: 'Fresh Fruits',
    tags: ['exotic', 'tropical', 'fruit'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372678/dragon-fruit-1_u1h1rj.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372678/dragon-fruit-1_u1h1rj.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372677/dragon-fruit-2_kethak.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372677/dragon-fruit-3_ukwsfk.webp',
      ],
    },
  },

  // BAKERY CATEGORY
  {
    id: 7,
    title: 'Artisan Sourdough Bread',
    description:
      'Traditional sourdough bread made with organic flour and slow fermentation',
    price: 8.99,
    originalPrice: 10.99,
    discountPercentage: 18,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh (Daily baked)',
    farm: 'Artisan Bakery',
    stock: '45 pcs',
    freeShipping: true,
    imageUrl: sourdoughImage,
    brand: 'Artisan Baker',
    category: 'Bakery',
    subcategory: 'Bread',
    tags: ['artisan', 'bread', 'daily-baked'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372579/sourdough-1_iawlwg.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372579/sourdough-1_iawlwg.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372581/sourdough-2_smtzp3.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372581/sourdough-3_ppuvtd.jpg',
      ],
    },
    section: ['featured'],
  },
  {
    id: 8,
    title: 'French Baguette',
    description:
      'Authentic French-style baguette with crispy crust and soft interior',
    price: 4.99,
    originalPrice: 5.99,
    discountPercentage: 17,
    rating: 4,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh (Daily baked)',
    farm: 'French Corner Bakery',
    stock: '80 pcs',
    freeShipping: false,
    imageUrl: baguetteImage,
    brand: 'Le Boulanger',
    category: 'Bakery',
    subcategory: 'Bread',
    tags: ['bread', 'french', 'daily-baked'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372572/baguette-1_hnb8nt.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372572/baguette-1_hnb8nt.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372573/baguette-2_d6uyzc.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372573/baguette-2_d6uyzc.jpg',
      ],
    },
  },
  {
    id: 9,
    title: 'Butter Croissants 4-Pack',
    description: 'Flaky, buttery croissants made with French butter',
    price: 12.99,
    originalPrice: 16.99,
    discountPercentage: 24,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh (Daily baked)',
    farm: 'Parisian Bakery',
    stock: '35 packs',
    freeShipping: true,
    imageUrl: croissantImage,
    brand: 'Delice Patisserie',
    category: 'Bakery',
    subcategory: 'Pastries',
    tags: ['pastry', 'french', 'breakfast'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372597/croissant-1_gm2jqi.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372597/croissant-1_gm2jqi.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372599/croissant-2_fxywga.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372601/croissant-3_v6dvag.jpg',
      ],
    },
    section: ['featured'],
  },
  {
    id: 10,
    title: 'Birthday Cake - Chocolate',
    description:
      'Delicious chocolate cake with buttercream frosting, perfect for celebrations',
    price: 32.99,
    originalPrice: 39.99,
    discountPercentage: 18,
    rating: 4,
    delivery: {
      time: '2 days',
      location: 'Local',
    },
    freshness: 'Fresh (Made to order)',
    farm: 'Sweet Treat Bakery',
    stock: '20 pcs',
    freeShipping: true,
    imageUrl: chocCakeImage,
    brand: 'Celebration Cakes',
    category: 'Bakery',
    subcategory: 'Cakes',
    tags: ['cake', 'celebration', 'chocolate'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372589/chocolate-cake-3_ng4ubf.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372589/chocolate-cake-3_ng4ubf.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372588/chocolate-cake-1_ohone5.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372590/chocolate-cake-2_cafeh5.jpg',
      ],
    },
  },

  // MEAT AND FISH CATEGORY
  {
    id: 15,
    title: 'Grass-Fed Ribeye Steak',
    description: 'Premium grass-fed ribeye steak, perfect for grilling',
    price: 24.99,
    originalPrice: 29.99,
    discountPercentage: 17,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh',
    farm: 'Green Pasture Farms',
    stock: '30 pcs',
    freeShipping: true,
    imageUrl: steakImage,
    brand: 'Premium Meats',
    category: 'Meat and fish',
    subcategory: 'Beef',
    tags: ['grass-fed', 'steak', 'premium'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372781/steak-2_d6j6yx.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372781/steak-2_d6j6yx.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372782/steak-3_ouedl1.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372779/steak-1_jxjjrn.jpg',
      ],
    },
    section: ['best-selling'],
  },
  {
    id: 16,
    title: 'Organic Ground Beef',
    description: 'Lean organic ground beef from pasture-raised cattle',
    price: 9.99,
    originalPrice: 12.99,
    discountPercentage: 23,
    rating: 4,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh',
    farm: 'Green Pasture Farms',
    stock: '45 packs',
    freeShipping: false,
    imageUrl: groundBeefImage,
    brand: 'Premium Meats',
    category: 'Meat and fish',
    subcategory: 'Beef',
    tags: ['organic', 'ground-beef', 'lean'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372773/ground-beef-1_oiwv4i.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372773/ground-beef-1_oiwv4i.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372774/ground-beef-2_rjhaur.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372776/ground-beef-3_eufsww.jpg',
      ],
    },
  },
  {
    id: 17,
    title: 'Free-Range Chicken Breasts',
    description: 'Boneless, skinless chicken breasts from free-range chickens',
    price: 12.99,
    originalPrice: 15.99,
    discountPercentage: 19,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh',
    farm: 'Freedom Farms',
    stock: '60 packs',
    freeShipping: true,
    imageUrl: chickenBreastImage,
    brand: 'Freedom Poultry',
    category: 'Meat and fish',
    subcategory: 'Poultry',
    tags: ['free-range', 'chicken', 'lean'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372811/chicken-breast-1_wmli6y.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372811/chicken-breast-1_wmli6y.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372815/chicken-breast-3_nzbqcv.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372814/chicken-breast-2_wcrhud.jpg',
      ],
    },
    section: ['featured'],
  },
  {
    id: 18,
    title: 'Wild Caught Salmon Fillets',
    description:
      'Premium wild-caught salmon fillets rich in omega-3 fatty acids',
    price: 18.99,
    originalPrice: 24.99,
    discountPercentage: 24,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh',
    farm: 'Ocean Harvest',
    stock: '25 packs',
    freeShipping: true,
    imageUrl: salmonImage,
    brand: 'Wild Waters',
    category: 'Meat and fish',
    subcategory: 'Fish',
    tags: ['wild-caught', 'salmon', 'omega-3'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372787/salmon-1_fe98id.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372787/salmon-1_fe98id.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372789/salmon-2_zrq4ib.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372790/salmon-3_xkgq7z.jpg',
      ],
    },
  },
  {
    id: 19,
    title: 'Fresh Jumbo Shrimp',
    description: 'Jumbo shrimp, peeled and deveined, ready for cooking',
    price: 22.99,
    originalPrice: 27.99,
    discountPercentage: 18,
    rating: 4,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh',
    farm: 'Coastal Seafood',
    stock: '20 packs',
    freeShipping: true,
    imageUrl: shrimpImage,
    brand: 'Ocean Fresh',
    category: 'Meat and fish',
    subcategory: 'Fish',
    tags: ['shellfish', 'shrimp', 'seafood'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372798/shrimp-1_j4evms.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372798/shrimp-1_j4evms.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372799/shrimp-2_nvrhhn.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372801/shrimp-3_i3hdou.jpg',
      ],
    },
    section: ['best-selling', 'featured'],
  },

  // DRINKS CATEGORY
  {
    id: 20,
    title: 'Cold-Pressed Orange Juice',
    description: 'Fresh cold-pressed orange juice with no added sugars',
    price: 6.99,
    originalPrice: 8.99,
    discountPercentage: 22,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh',
    farm: 'Sunshine Orchards',
    stock: '40 bottles',
    freeShipping: false,
    imageUrl: ojImage,
    brand: 'Pure Press',
    category: 'Drinks',
    subcategory: 'Non-Alcoholic',
    tags: ['juice', 'cold-pressed', 'natural'],
    images: {
      main: '/src/assets/images/products/drinks/non-alcoholic/orange-juice/orange-juice-1.jpg',
      gallery: [
        '/src/assets/images/products/drinks/non-alcoholic/orange-juice/orange-juice-1.jpg',
        '/src/assets/images/products/drinks/non-alcoholic/orange-juice/orange-juice-2.jpg',
        '/src/assets/images/products/drinks/non-alcoholic/orange-juice/orange-juice-3.jpg',
      ],
    },
    section: ['best-selling', 'featured'],
  },
  {
    id: 21,
    title: 'Organic Green Tea',
    description: 'Premium organic green tea from sustainable farms',
    price: 12.99,
    originalPrice: 15.99,
    discountPercentage: 19,
    rating: 4,
    delivery: {
      time: '2 days',
      location: 'International',
    },
    freshness: 'New',
    farm: 'Tea Gardens',
    stock: '50 boxes',
    freeShipping: true,
    imageUrl: greenTeaImage,
    brand: 'Tea Traditions',
    category: 'Drinks',
    subcategory: 'Non-Alcoholic',
    tags: ['tea', 'organic', 'caffeinated'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372630/orange-juice-1_qqftp9.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372630/orange-juice-1_qqftp9.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372631/orange-juice-2_tfa8rw.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372632/orange-juice-3_oqobyt.jpg',
      ],
    },
    section: ['featured'],
  },
  {
    id: 22,
    title: 'Craft IPA 6-Pack',
    description: 'Hoppy craft IPA beer with citrus notes',
    price: 14.99,
    originalPrice: 17.99,
    discountPercentage: 17,
    rating: 5,
    delivery: {
      time: '2 days',
      location: 'Local',
    },
    freshness: 'New',
    farm: 'Hoppy Brewery',
    stock: '30 packs',
    freeShipping: true,
    imageUrl: ipaBeerImage,
    brand: 'Craft Brews',
    category: 'Drinks',
    subcategory: 'Alcoholic',
    tags: ['beer', 'craft', 'IPA'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372606/ipa-1_dyueat.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372606/ipa-1_dyueat.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372607/ipa-2_xwplxg.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372608/ipa-3_saevby.jpg',
      ],
    },
    section: ['best-selling'],
  },
  {
    id: 23,
    title: 'Organic Red Wine',
    description: 'Premium organic red wine from sustainable vineyards',
    price: 24.99,
    originalPrice: 29.99,
    discountPercentage: 17,
    rating: 4,
    delivery: {
      time: '2 days',
      location: 'Local',
    },
    freshness: 'Aged 3 years',
    farm: 'Vineyard Estates',
    stock: '25 bottles',
    freeShipping: true,
    imageUrl: redWineImage,
    brand: 'Organic Vines',
    category: 'Drinks',
    subcategory: 'Alcoholic',
    tags: ['wine', 'organic', 'red'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372613/red-wine-1_cht37k.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372613/red-wine-1_cht37k.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372614/red-wine-2_mlkg7g.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372614/red-wine-3_pgmx08.jpg',
      ],
    },
  },
  {
    id: 24,
    title: 'Antioxidant Berry Smoothie',
    description: 'Ready-to-drink berry smoothie packed with antioxidants',
    price: 5.99,
    originalPrice: 7.99,
    discountPercentage: 25,
    rating: 5,
    delivery: {
      time: '1 day',
      location: 'Local',
    },
    freshness: 'Fresh',
    farm: 'Smoothie Factory',
    stock: '45 bottles',
    freeShipping: false,
    imageUrl: berrySmoothieImage,
    brand: 'Smoothie Life',
    category: 'Drinks',
    subcategory: 'Special Drinks',
    tags: ['smoothie', 'healthy', 'berry'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372642/berry-smoothie-1_rg46gd.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372642/berry-smoothie-1_rg46gd.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372643/berry-smoothie-2_nvkqla.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372644/berry-smoothie-3_qw26jg.jpg',
      ],
    },
    section: ['featured'],
  },

  // KITCHEN CATEGORY
  {
    id: 25,
    title: 'Non-Stick Frying Pan Set',
    description: 'Set of 3 non-stick frying pans in different sizes',
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 29,
    rating: 4,
    delivery: {
      time: '3 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Kitchen Essentials',
    stock: '15 sets',
    freeShipping: true,
    imageUrl: fryingPanImage,
    brand: 'Chefs Choice',
    category: 'Kitchen',
    subcategory: 'Cookware',
    tags: ['cookware', 'non-stick', 'pans'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372764/frying-pan-1_wngalx.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372764/frying-pan-1_wngalx.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372765/frying-pan-2_p2pz1i.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372767/frying-pan-3_gxwjec.jpg',
      ],
    },
  },
  {
    id: 26,
    title: 'Stand Mixer - Professional',
    description: 'Professional stand mixer with multiple attachments',
    price: 249.99,
    originalPrice: 299.99,
    discountPercentage: 17,
    rating: 5,
    delivery: {
      time: '5 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Kitchen Pro',
    stock: '10 units',
    freeShipping: true,
    imageUrl: standMixerImage,
    brand: 'KitchenElite',
    category: 'Kitchen',
    subcategory: 'Appliances',
    tags: ['appliance', 'mixer', 'professional'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372756/mixer-1_iaohds.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372756/mixer-1_iaohds.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372757/mixer-2_ebmtsg.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372759/mixer-3_hxrk8n.jpg',
      ],
    },
    section: ['featured'],
  },
  {
    id: 27,
    title: 'Premium Chef Knife Set',
    description:
      'Set of 6 high-carbon stainless steel kitchen knives with block',
    price: 99.99,
    originalPrice: 129.99,
    discountPercentage: 23,
    rating: 5,
    delivery: {
      time: '3 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Cutlery Masters',
    stock: '20 sets',
    freeShipping: true,
    imageUrl: knifeImage,
    brand: 'Sharp Edge',
    category: 'Kitchen',
    subcategory: 'Accessories',
    tags: ['knives', 'kitchen', 'premium'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372749/knife-set-1_fyc2ol.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372749/knife-set-1_fyc2ol.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372751/knife-set-2_o490x0.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372753/knife-set-3_p1q9dr.jpg',
      ],
    },
  },

  // SPECIAL NUTRITION CATEGORY
  {
    id: 28,
    title: 'Plant-Based Protein Powder',
    description:
      'Organic plant-based protein powder with 25g protein per serving',
    price: 39.99,
    originalPrice: 49.99,
    discountPercentage: 20,
    rating: 5,
    delivery: {
      time: '2 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Nutrition Labs',
    stock: '30 containers',
    freeShipping: true,
    imageUrl: proteinPowderImage,
    brand: 'PlantPower',
    category: 'Special nutrition',
    subcategory: 'Supplements',
    tags: ['protein', 'vegan', 'supplement'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372875/protein-powder-1_ymkclt.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372875/protein-powder-1_ymkclt.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372877/protein-powder-2_kztuhm.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372879/protein-powder-3_wigbri.jpg',
      ],
    },
    section: ['featured'],
  },
  {
    id: 29,
    title: 'Keto Meal Replacement Shakes',
    description: 'Low-carb, high-fat meal replacement shakes for keto diet',
    price: 34.99,
    originalPrice: 42.99,
    discountPercentage: 19,
    rating: 4,
    delivery: {
      time: '2 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Keto Nutrition',
    stock: '25 boxes',
    freeShipping: true,
    imageUrl: ketoShakeImage,
    brand: 'KetoLife',
    category: 'Special nutrition',
    subcategory: 'Diets',
    tags: ['keto', 'meal-replacement', 'low-carb'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372855/keto-shake-1_t5iy58.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372855/keto-shake-1_t5iy58.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372857/keto-shake-2_gwf3xs.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372860/keto-shake-3_xnqtit.jpg',
      ],
    },
    section: ['best-selling'],
  },
  {
    id: 30,
    title: 'Organic Chia Seeds',
    description: 'Organic chia seeds rich in omega-3 fatty acids and fiber',
    price: 8.99,
    originalPrice: 11.99,
    discountPercentage: 25,
    rating: 5,
    delivery: {
      time: '2 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Super Seeds Co.',
    stock: '40 bags',
    freeShipping: false,
    imageUrl: chiaImage,
    brand: 'SuperSeeds',
    category: 'Special nutrition',
    subcategory: 'Superfoods',
    tags: ['superfood', 'seeds', 'omega-3'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372865/chia-seeds-1_fcojtz.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372865/chia-seeds-1_fcojtz.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372867/chia-seeds-2_nk39ze.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372870/chia-seeds-3_srr6ts.jpg',
      ],
    },
    section: ['best-selling'],
  },

  // BABY CATEGORY
  {
    id: 31,
    title: 'Organic Baby Formula',
    description: 'Premium organic baby formula with essential nutrients',
    price: 26.99,
    originalPrice: 32.99,
    discountPercentage: 18,
    rating: 5,
    delivery: {
      time: '2 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Baby Nutrition Co.',
    stock: '20 containers',
    freeShipping: true,
    imageUrl: babyFormulaImage,
    brand: 'BabyPure',
    category: 'Baby',
    subcategory: 'Food',
    tags: ['formula', 'organic', 'baby'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372558/baby-formula-1_na3nc6.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372558/baby-formula-1_na3nc6.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372559/baby-formula-2_frxtfh.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372559/baby-formula-3_xdggur.jpg',
      ],
    },
    section: ['best-selling'],
  },
  {
    id: 32,
    title: 'Eco-Friendly Diapers',
    description: 'Biodegradable and eco-friendly diapers for sensitive skin',
    price: 18.99,
    originalPrice: 24.99,
    discountPercentage: 24,
    rating: 4,
    delivery: {
      time: '2 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Eco Baby Products',
    stock: '30 packs',
    freeShipping: true,
    imageUrl: diaperImage,
    brand: 'EcoBaby',
    category: 'Baby',
    subcategory: 'Care',
    tags: ['diapers', 'eco-friendly', 'baby'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372530/diaper-1_b2cxmm.webp',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372530/diaper-1_b2cxmm.webp',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372540/diaper-2_i2ombc.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372544/diaper-3_q3x4za.jpg',
      ],
    },
  },
  {
    id: 33,
    title: 'Natural Baby Feeding Set',
    description: 'Set of natural bamboo baby feeding bottles and accessories',
    price: 29.99,
    originalPrice: 39.99,
    discountPercentage: 25,
    rating: 5,
    delivery: {
      time: '3 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Natural Baby Co.',
    stock: '15 sets',
    freeShipping: true,
    imageUrl: feedingSetImage,
    brand: 'NatureBaby',
    category: 'Baby',
    subcategory: 'Accessories',
    tags: ['bottles', 'natural', 'feeding'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372501/feeding-set-1_iw6lzg.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372501/feeding-set-1_iw6lzg.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372501/feeding-set-2_culi12.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372502/feeding-set-3_s7w0ts.jpg',
      ],
    },
  },

  // PHARMACY CATEGORY
  {
    id: 34,
    title: 'Natural Cold & Flu Relief',
    description: 'Natural herbal remedy for cold and flu symptoms',
    price: 14.99,
    originalPrice: 19.99,
    discountPercentage: 25,
    rating: 4,
    delivery: {
      time: '2 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Herbal Remedies',
    stock: '35 bottles',
    freeShipping: true,
    imageUrl: coldFluMedImage,
    brand: 'NatureMed',
    category: 'Pharmacy',
    subcategory: 'Medications',
    tags: ['cold', 'flu', 'natural'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372834/cold-flu-2_e8t1b5.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372834/cold-flu-2_e8t1b5.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372835/cold-flu-3_ndam35.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372831/cold-flu-1_bf5ctk.jpg',
      ],
    },
    section: ['best-selling'],
  },
  {
    id: 35,
    title: 'Advanced Skincare Set',
    description: 'Complete skincare set with cleanser, toner, and moisturizer',
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 29,
    rating: 5,
    delivery: {
      time: '2 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Skin Science Labs',
    stock: '20 sets',
    freeShipping: true,
    imageUrl: skincareImage,
    brand: 'DermaPure',
    category: 'Pharmacy',
    subcategory: 'Personal Care',
    tags: ['skincare', 'beauty', 'set'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372841/skincare-1_h3ijcf.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372841/skincare-1_h3ijcf.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372842/skincare-2_edcekj.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372844/skincare-3_n6yjki.jpg',
      ],
    },
  },
  {
    id: 36,
    title: 'Premium First Aid Kit',
    description: 'Comprehensive first aid kit for home and travel',
    price: 32.99,
    originalPrice: 39.99,
    discountPercentage: 18,
    rating: 5,
    delivery: {
      time: '2 days',
      location: 'National',
    },
    freshness: 'New',
    farm: 'Medical Supplies Inc.',
    stock: '25 kits',
    freeShipping: true,
    imageUrl: firstAidImage,
    brand: 'SafetyFirst',
    category: 'Pharmacy',
    subcategory: 'Medical Supplies',
    tags: ['first-aid', 'safety', 'medical'],
    images: {
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372820/first-aid-1_ksxmij.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372820/first-aid-1_ksxmij.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372822/first-aid-2_moj9iz.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372824/first-aid-3_zoezkw.jpg',
      ],
    },
    section: ['best-selling', 'featured'],
  },
]
