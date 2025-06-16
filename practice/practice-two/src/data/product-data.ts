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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097635/apple-1_mipvcy.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097635/apple-1_mipvcy.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097642/apple-3_d2ha2o.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097636/apple-2_m6bkus.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097648/banana-1_bqekxr.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097648/banana-1_bqekxr.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097649/banana-2_hevsis.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097650/banana-3_l8jcpb.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097668/orange-1_t7ekup.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097668/orange-1_t7ekup.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097669/orange-2_iweff5.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097670/orange-3_aj3num.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097675/strawberry-1_ot1srw.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097675/strawberry-1_ot1srw.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097676/strawberry-2_yepj5h.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097680/strawberry-3_drpiug.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097697/avocado-1_snwee7.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097697/avocado-1_snwee7.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097698/avocado-2_scmrij.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097701/avocado-3_f4uewl.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097734/tomato-1_hbg3st.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097734/tomato-1_hbg3st.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097735/tomato-2_r3yrnx.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097738/tomato-3_nfpgxw.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097725/spinach-1_bepenm.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097725/spinach-1_bepenm.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097728/spinach-3_acd25q.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097729/spinach-2_bp9qpo.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097716/carrot-1_cer1aa.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097716/carrot-1_cer1aa.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097717/carrot-2_flphyv.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097720/carrot-3_cultnl.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097706/berry-mix-1_sibfdk.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097706/berry-mix-1_sibfdk.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097707/berry-mix-2_gd1iqg.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097710/berry-mix-3_w2zaxp.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097658/dragon-fruit-1_yetrrc.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097658/dragon-fruit-1_yetrrc.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097659/dragon-fruit-2_zrnivm.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097660/dragon-fruit-3_ugie2x.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750099041/sourdough-1_xrxdgp.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750099041/sourdough-1_xrxdgp.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750099042/sourdough-2_ep7ynu.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750099046/sourdough-3_xz6bot.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097512/baguette-1_asxn4a.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097512/baguette-1_asxn4a.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097512/baguette-2_oswrt3.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097512/baguette-3_axxpw5.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097530/croissant-1_eesxyv.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097530/croissant-1_eesxyv.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097530/croissant-2_wlg0tw.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097531/croissant-3_lvw9l1.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097521/chocolate-cake-1_evekpe.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097521/chocolate-cake-1_evekpe.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097521/chocolate-cake-3_adfvy1.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097521/chocolate-cake-2_jgtldq.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097811/steak-2_vplixi.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097811/steak-2_vplixi.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097809/steak-1_qycrcm.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097812/steak-3_ptmin8.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097801/ground-beef-1_faimub.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097801/ground-beef-1_faimub.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097803/ground-beef-2_yp7xt7.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097805/ground-beef-3_hpkk41.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097837/chicken-breast-1_bb6uzk.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097837/chicken-breast-1_bb6uzk.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097842/chicken-breast-3_gceot7.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097838/chicken-breast-2_s8uh85.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097818/salmon-1_ecksii.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097818/salmon-1_ecksii.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097819/salmon-2_cnmsof.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097822/salmon-3_pn7lij.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097827/shrimp-1_nhnpra.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097827/shrimp-1_nhnpra.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097828/shrimp-2_xcqmu1.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097832/shrimp-3_mnyfxt.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097593/orange-juice-1_f0cue2.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097593/orange-juice-1_f0cue2.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097594/orange-juice-2_v18ngg.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097595/orange-juice-3_ng8acz.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097584/green-tea-1_a8usbv.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097584/green-tea-1_a8usbv.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097585/green-tea-2_fyxghr.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097586/green-tea-3_bggfj8.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097564/ipa-1_otlh2s.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097564/ipa-1_otlh2s.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097565/ipa-3_jac8bo.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097564/ipa-2_s7awwg.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097572/red-wine-1_t8fepq.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097572/red-wine-1_t8fepq.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097575/red-wine-3_uihdye.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097573/red-wine-2_aa8iop.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097605/berry-smoothie-1_udlpcc.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097605/berry-smoothie-1_udlpcc.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097606/berry-smoothie-2_ed2beh.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097608/berry-smoothie-3_pityq4.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750098052/frying-pan-1_tg9ybw.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750098052/frying-pan-1_tg9ybw.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750098568/frying-pan-2_z81vbi.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750098577/frying-pan-3_vvo2pw.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097761/mixer-1_va3z33.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097761/mixer-1_va3z33.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097762/mixer-2_awp64h.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097765/mixer-3_sx0pws.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097750/knife-set-1_ujqhg7.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097750/knife-set-1_ujqhg7.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097752/knife-set-2_s7npca.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097755/knife-set-3_d6hkif.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097916/protein-powder-1_wkfvbu.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097916/protein-powder-1_wkfvbu.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097918/protein-powder-2_urqlqb.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097921/protein-powder-3_mue4wh.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097899/keto-shake-3_pnqjwl.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097899/keto-shake-3_pnqjwl.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097896/keto-shake-2_pezvri.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097893/keto-shake-1_tuxfmm.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097904/chia-seeds-1_eelivy.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097904/chia-seeds-1_eelivy.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097907/chia-seeds-2_gessts.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097910/chia-seeds-3_xgayuk.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097500/baby-formula-1_n3qj7p.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097500/baby-formula-1_n3qj7p.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097500/baby-formula-2_pn99rx.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097500/baby-formula-3_ku8sth.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097489/diaper-1_vf60a3.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097489/diaper-1_vf60a3.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097491/diaper-3_mbyqjk.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097493/diaper-2_r0sno0.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097477/feeding-set-2_utljmn.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097477/feeding-set-2_utljmn.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097477/feeding-set-1_d9o2l3.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1750097478/feeding-set-3_jrmj9g.jpg',
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
      main: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372835/cold-flu-3_ndam35.jpg',
      gallery: [
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372835/cold-flu-3_ndam35.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372831/cold-flu-1_bf5ctk.jpg',
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1748372834/cold-flu-2_e8t1b5.jpg',
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
