interface ProductTabData {
  description: {
    origins: string
    cookingInfo: string
    vitamins?: Array<{ name: string; quantity: string; dv: string }>
  }
  reviews: {
    count: number
    items: Array<{
      author: string
      rating: number
      date: string
      comment: string
    }>
  }
  questions: {
    count: number
    items: Array<{
      question: string
      answer: string
      author: string
      date: string
    }>
  }
}

const defaultTabData: ProductTabData = {
  description: {
    origins:
      "We work hard to ensure that our products are fresh and high in quality. If we don't produce them ourselves, we source them from carefully chosen suppliers, preferring to source locally whenever possible.",
    cookingInfo:
      'This product can be used in various recipes to enhance your meals.',
  },
  reviews: {
    count: 0,
    items: [],
  },
  questions: {
    count: 0,
    items: [],
  },
}

const productTabData: Record<number, ProductTabData> = {
  // Carrots (ID: 12)

  // Apple (ID: 1)
  1: {
    description: {
      origins:
        'Our apples come from carefully selected orchards that focus on sustainable farming practices. We choose varieties known for their crispness and sweet-tart balance.',
      cookingInfo:
        'Perfect for eating fresh, adding to salads, baking into pies, or making homemade applesauce. Apples pair wonderfully with cinnamon, caramel, and various cheeses.',
      vitamins: [
        { name: 'Vitamin C', quantity: '4.6 mg', dv: '6%' },
        { name: 'Fiber', quantity: '2.4 g', dv: '9%' },
        { name: 'Potassium', quantity: '107 mg', dv: '3%' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Jamie K.',
          rating: 5,
          date: 'May 5, 2025',
          comment:
            'These apples are perfectly crisp and have just the right balance of sweetness and tartness. My kids love them!',
        },
        {
          author: 'Robert M.',
          rating: 4,
          date: 'May 2, 2025',
          comment:
            'Great quality apples. Very fresh and tasty. Will order again.',
        },
        {
          author: 'Lisa T.',
          rating: 5,
          date: 'April 28, 2025',
          comment:
            'These are the best apples Ive had in a long time. Perfect snack size too!',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'Are these apples waxed?',
          answer:
            'No, we do not wax our apples. They are simply washed and packed fresh from the orchard.',
          author: 'Daniel P.',
          date: 'April 20, 2025',
        },
        {
          question:
            'How should I store these apples to keep them fresh longer?',
          answer:
            'For best results, store the apples in your refrigerators crisper drawer. They should stay fresh for 3-4 weeks.',
          author: 'Emma R.',
          date: 'April 15, 2025',
        },
      ],
    },
  },

  // Banana (ID: 2)
  2: {
    description: {
      origins:
        'Our organic bananas are sourced from sustainable farms that follow strict organic farming practices. We work with farmers who prioritize environmentally friendly cultivation methods.',
      cookingInfo:
        'Bananas are versatile fruits that can be enjoyed on their own, added to smoothies, baked into bread, or used as a natural sweetener in various recipes. They also make excellent toppings for cereals, pancakes, and desserts.',
      vitamins: [
        { name: 'Vitamin B6', quantity: '0.4 mg', dv: '31%' },
        { name: 'Vitamin C', quantity: '8.7 mg', dv: '10%' },
        { name: 'Potassium', quantity: '358 mg', dv: '8%' },
        { name: 'Magnesium', quantity: '27 mg', dv: '7%' },
        { name: 'Fiber', quantity: '2.6 g', dv: '10%' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Maria J.',
          rating: 5,
          date: 'May 12, 2025',
          comment:
            "These bananas are perfectly ripened when delivered. I love that they're organic and sustainably sourced.",
        },
        {
          author: 'Chris T.',
          rating: 4,
          date: 'May 4, 2025',
          comment:
            'Good quality bananas. They ripen nicely over a few days which is perfect for my family.',
        },
        {
          author: 'Samantha H.',
          rating: 5,
          date: 'April 29, 2025',
          comment:
            'These bananas are delicious! My kids eat them every day for snacks and breakfast.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'At what ripeness stage are the bananas delivered?',
          answer:
            'Our bananas are typically delivered with a slight green tint, allowing them to ripen perfectly within 2-3 days of delivery for optimal consumption.',
          author: 'David L.',
          date: 'April 22, 2025',
        },
        {
          question: 'Are these bananas Fair Trade certified?',
          answer:
            'Yes, all our organic bananas are Fair Trade certified, ensuring that farmers receive fair compensation for their produce.',
          author: 'Jessica M.',
          date: 'April 15, 2025',
        },
      ],
    },
  },

  // Oranges (ID: 3)
  3: {
    description: {
      origins:
        'Our fresh oranges are sourced from citrus groves known for their optimal growing conditions and sustainable farming practices. We select oranges at peak ripeness to ensure maximum flavor and nutritional value.',
      cookingInfo:
        'Oranges are perfect for fresh-squeezed juice, adding zest to recipes, or enjoying as a healthy snack. They can also be incorporated into salads, desserts, and marinades to add a bright citrus flavor.',
      vitamins: [
        { name: 'Vitamin C', quantity: '69.7 mg', dv: '93%' },
        { name: 'Thiamine (B1)', quantity: '0.114 mg', dv: '10%' },
        { name: 'Folate (B9)', quantity: '30 μg', dv: '8%' },
        { name: 'Potassium', quantity: '237 mg', dv: '5%' },
        { name: 'Fiber', quantity: '2.8 g', dv: '11%' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Angela R.',
          rating: 4,
          date: 'May 8, 2025',
          comment:
            'These oranges are juicy and flavorful. Perfect for my morning juice routine!',
        },
        {
          author: 'Michael S.',
          rating: 5,
          date: 'May 5, 2025',
          comment:
            'Incredibly sweet and juicy oranges. They arrived fresh and keep well in the refrigerator.',
        },
        {
          author: 'Patricia T.',
          rating: 4,
          date: 'April 30, 2025',
          comment:
            'Good quality citrus fruit. I use them both for eating fresh and for cooking.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'Are these oranges seedless?',
          answer:
            'Our oranges typically have very few seeds, though they are not completely seedless. They are selected for their excellent flavor and juice content.',
          author: 'Robert N.',
          date: 'April 28, 2025',
        },
        {
          question: 'How many oranges typically come in an order?',
          answer:
            'Each order contains approximately 8-10 medium-sized oranges, depending on the seasonal size variation.',
          author: 'Sophia K.',
          date: 'April 20, 2025',
        },
      ],
    },
  },

  // Strawberries (ID: 4)
  4: {
    description: {
      origins:
        'Our strawberries are grown on selected farms known for their commitment to quality and sustainable farming practices. During peak season, we source from local farms to ensure maximum freshness and flavor.',
      cookingInfo:
        'These sweet, juicy strawberries are perfect for eating fresh, adding to desserts, blending into smoothies, or making homemade jams and preserves. They pair beautifully with chocolate, cream, and other berries.',
      vitamins: [
        { name: 'Vitamin C', quantity: '58.8 mg', dv: '78%' },
        { name: 'Folate (B9)', quantity: '24 μg', dv: '6%' },
        { name: 'Manganese', quantity: '0.56 mg', dv: '24%' },
        { name: 'Fiber', quantity: '2 g', dv: '8%' },
        { name: 'Antioxidants', quantity: 'High', dv: 'N/A' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Rachel P.',
          rating: 5,
          date: 'May 11, 2025',
          comment:
            'These strawberries are incredible! So sweet and juicy. My whole family loves them.',
        },
        {
          author: 'Thomas G.',
          rating: 4,
          date: 'May 7, 2025',
          comment:
            'Very good quality berries. They arrived fresh and lasted several days in the refrigerator.',
        },
        {
          author: 'Emily S.',
          rating: 5,
          date: 'May 2, 2025',
          comment:
            'Perfect strawberries for my morning smoothies and desserts. Will definitely order again!',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'Are these strawberries organically grown?',
          answer:
            'While not all of our strawberries are certified organic, they are grown with minimal pesticide use and sustainable farming practices.',
          author: 'Jordan T.',
          date: 'April 25, 2025',
        },
        {
          question:
            'How should I store these strawberries to maximize freshness?',
          answer:
            'For best results, keep strawberries unwashed in the refrigerator until ready to use. Only wash them right before consuming. They typically stay fresh for 3-5 days when properly stored.',
          author: 'Melissa H.',
          date: 'April 20, 2025',
        },
      ],
    },
  },

  // Avocados (ID: 5)
  5: {
    description: {
      origins:
        'Our avocados are sourced from sustainable farms committed to environmentally responsible growing practices. We select premium avocados for their creamy texture and rich flavor.',
      cookingInfo:
        'Avocados are incredibly versatile in the kitchen. They can be mashed for guacamole, sliced for sandwiches and salads, or blended into smoothies and dressings. They also make a nutritious spread on toast or a creamy addition to tacos and burritos.',
      vitamins: [
        { name: 'Vitamin K', quantity: '21 μg', dv: '20%' },
        { name: 'Folate (B9)', quantity: '81 μg', dv: '20%' },
        { name: 'Vitamin C', quantity: '10 mg', dv: '13%' },
        { name: 'Potassium', quantity: '485 mg', dv: '10%' },
        { name: 'Vitamin B6', quantity: '0.26 mg', dv: '20%' },
        { name: 'Vitamin E', quantity: '2.07 mg', dv: '14%' },
        { name: 'Healthy Fats', quantity: '15 g', dv: 'N/A' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Nicole F.',
          rating: 4,
          date: 'May 9, 2025',
          comment:
            'These avocados are consistently good quality. They ripen perfectly on my counter in a few days.',
        },
        {
          author: 'Max P.',
          rating: 3,
          date: 'May 5, 2025',
          comment:
            'Good avocados but they were quite firm when delivered. Had to wait almost a week for them to ripen.',
        },
        {
          author: 'Laura M.',
          rating: 5,
          date: 'April 30, 2025',
          comment:
            'Perfect avocados! Creamy texture and excellent flavor. My guacamole was a hit at the party.',
        },
      ],
    },
    questions: {
      count: 3,
      items: [
        {
          question: 'How can I tell when these avocados are ripe?',
          answer:
            "A ripe avocado will yield slightly to gentle pressure but shouldn't feel mushy. The skin typically darkens as the avocado ripens.",
          author: 'Alex S.',
          date: 'April 28, 2025',
        },
        {
          question: "What's the best way to speed up ripening?",
          answer:
            'To speed up ripening, place avocados in a paper bag with a banana or apple. The ethylene gas produced will accelerate ripening.',
          author: 'Christina L.',
          date: 'April 22, 2025',
        },
        {
          question: 'Can I freeze these avocados?',
          answer:
            'Yes, you can freeze avocados. For best results, mash the flesh with a bit of lemon juice before freezing to prevent browning.',
          author: 'Mark J.',
          date: 'April 15, 2025',
        },
      ],
    },
  },

  // Tomatoes (ID: 6)
  6: {
    description: {
      origins:
        'Our tomatoes are sourced from local farms whenever possible and selected for their exceptional flavor and texture. We work with growers who emphasize sustainable farming methods and vine-ripening for maximum taste.',
      cookingInfo:
        'These versatile tomatoes are perfect for salads, sandwiches, sauces, and soups. Their balanced acidity and natural sweetness make them ideal for both raw and cooked applications. Try them sliced with a drizzle of olive oil and a sprinkle of sea salt for a simple yet delicious side dish.',
      vitamins: [
        { name: 'Vitamin C', quantity: '23 mg', dv: '31%' },
        { name: 'Vitamin K', quantity: '7.9 μg', dv: '8%' },
        { name: 'Potassium', quantity: '237 mg', dv: '5%' },
        { name: 'Folate (B9)', quantity: '15 μg', dv: '4%' },
        { name: 'Lycopene', quantity: '2.5 mg', dv: 'N/A' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Steven R.',
          rating: 5,
          date: 'May 10, 2025',
          comment:
            'These tomatoes taste like summer! So much better than the bland supermarket varieties. Great flavor and texture.',
        },
        {
          author: 'Karen M.',
          rating: 4,
          date: 'May 6, 2025',
          comment:
            'Very good quality tomatoes. They arrived fresh and perfectly ripe. Made delicious sauce with them.',
        },
        {
          author: 'Jennifer B.',
          rating: 5,
          date: 'May 1, 2025',
          comment:
            'Excellent flavor! These tomatoes actually taste like tomatoes should - sweet and tangy with great texture.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'What variety of tomatoes are these?',
          answer:
            'We offer vine-ripened beefsteak tomatoes known for their balanced flavor and meaty texture, perfect for both slicing and cooking.',
          author: 'Daniel T.',
          date: 'April 22, 2025',
        },
        {
          question: 'Should I refrigerate these tomatoes?',
          answer:
            'For best flavor, store tomatoes at room temperature out of direct sunlight. Refrigeration can diminish their flavor, though it can extend shelf life if needed.',
          author: 'Julia M.',
          date: 'April 18, 2025',
        },
      ],
    },
  },
  7: {
    description: {
      origins:
        'Our artisan sourdough is crafted with a natural levain (starter) that weve maintained for over 5 years. We use organic flour and traditional slow fermentation techniques that develop complex flavors and improve digestibility.',
      cookingInfo:
        'This sourdough is perfect for toast, sandwiches, or enjoying with soups and stews. For the best experience, warm in a 350°F oven for 5-10 minutes to refresh the crust. To extend freshness, store cut-side down on a cutting board or freeze sliced bread for convenient toasting.',
      vitamins: [
        { name: 'Protein', quantity: '4g', dv: '8%' },
        { name: 'Iron', quantity: '1.1 mg', dv: '6%' },
        { name: 'Folate (B9)', quantity: '28 μg', dv: '7%' },
        { name: 'Selenium', quantity: '9.6 μg', dv: '17%' },
        { name: 'Fiber', quantity: '1.9 g', dv: '7%' },
        { name: 'Manganese', quantity: '0.7 mg', dv: '30%' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Marcus L.',
          rating: 5,
          date: 'May 14, 2025',
          comment:
            'This sourdough is incredible! Perfect crust and wonderfully tangy flavor. It reminds me of the artisan bread I had in San Francisco.',
        },
        {
          author: 'Sarah K.',
          rating: 5,
          date: 'May 8, 2025',
          comment:
            'Excellent quality bread with great texture and flavor. I appreciate that its made with organic flour and traditional methods.',
        },
        {
          author: 'David R.',
          rating: 4,
          date: 'May 3, 2025',
          comment:
            'Very good sourdough with nice crust and tangy flavor. It keeps well for several days, unlike supermarket bread.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'Is this bread vegan?',
          answer:
            'Yes, our artisan sourdough bread is completely vegan, containing only organic flour, water, salt, and our natural sourdough starter.',
          author: 'Leah M.',
          date: 'April 28, 2025',
        },
        {
          question: 'What is the best way to store this bread?',
          answer:
            'For optimal freshness, store the bread cut-side down on a cutting board for up to 3 days. For longer storage, slice and freeze in a resealable bag for up to 3 months, toasting slices as needed.',
          author: 'Thomas G.',
          date: 'April 22, 2025',
        },
      ],
    },
  },

  // French Baguette (ID: 8)
  8: {
    description: {
      origins:
        'Our French baguettes are made using traditional techniques with just four simple ingredients: flour, water, salt, and yeast. We follow classic French methods including a slow fermentation process to develop authentic flavor and texture.',
      cookingInfo:
        'These baguettes are perfect for sandwiches, as an accompaniment to soups and salads, or simply enjoyed with butter or olive oil. To refresh the crust, sprinkle with water and heat in a 375°F oven for 5-7 minutes. Best enjoyed on the day of purchase, though can be frozen for up to one month.',
      vitamins: [
        { name: 'Protein', quantity: '5.4g', dv: '11%' },
        { name: 'Iron', quantity: '1.2 mg', dv: '7%' },
        { name: 'Thiamine (B1)', quantity: '0.24 mg', dv: '20%' },
        { name: 'Selenium', quantity: '10.2 μg', dv: '19%' },
        { name: 'Folate (B9)', quantity: '32 μg', dv: '8%' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Sophie L.',
          rating: 5,
          date: 'May 12, 2025',
          comment:
            'These baguettes remind me of Paris! Perfect crispy crust with a soft interior. I buy them every week for my family.',
        },
        {
          author: 'Michael B.',
          rating: 4,
          date: 'May 7, 2025',
          comment:
            'Very good authentic French baguettes. They have that perfect crust that crackles when you squeeze it.',
        },
        {
          author: 'Alexandra T.',
          rating: 4,
          date: 'May 2, 2025',
          comment:
            'Good quality baguettes that make excellent sandwiches. I just wish they stayed fresh a bit longer.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'Are these baguettes made fresh daily?',
          answer:
            'Yes, our baguettes are baked fresh every morning in small batches throughout the day to ensure maximum freshness at delivery.',
          author: 'Pierre D.',
          date: 'April 25, 2025',
        },
        {
          question: 'Do you offer whole wheat baguettes as well?',
          answer:
            'Currently, we offer the traditional white flour baguettes. We do have plans to introduce whole wheat and multi-grain options in the near future.',
          author: 'Nina S.',
          date: 'April 20, 2025',
        },
      ],
    },
  },

  // Butter Croissants 4-Pack (ID: 9)
  9: {
    description: {
      origins:
        'Our butter croissants are made using traditional French techniques with premium European-style butter. Each croissant is laminated by hand, with multiple folding and resting periods to create the signature flaky layers that define a quality croissant.',
      cookingInfo:
        'These croissants are perfect for breakfast or brunch, served either plain or with jam and butter. For the best experience, warm them in a 350°F oven for 3-5 minutes. They also make excellent sandwich bases when split horizontally. Store in an airtight container for up to 2 days, or freeze for longer storage.',
      vitamins: [
        { name: 'Protein', quantity: '4.6g', dv: '9%' },
        { name: 'Calcium', quantity: '24 mg', dv: '2%' },
        { name: 'Iron', quantity: '1.4 mg', dv: '8%' },
        { name: 'Vitamin A', quantity: '240 IU', dv: '5%' },
        { name: 'Vitamin B1', quantity: '0.25 mg', dv: '21%' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Claire P.',
          rating: 5,
          date: 'May 15, 2025',
          comment:
            'These croissants are absolutely heavenly! So buttery and flaky with perfect layers. Better than many Ive had in actual bakeries.',
        },
        {
          author: 'James W.',
          rating: 5,
          date: 'May 10, 2025',
          comment:
            'Exceptional quality croissants. The smell of them warming in the oven is irresistible, and they taste just as good as they smell.',
        },
        {
          author: 'Emma H.',
          rating: 4,
          date: 'May 5, 2025',
          comment:
            'Very good croissants with excellent buttery flavor. They arrive fresh and keep well for a couple of days.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'Do these croissants contain any preservatives?',
          answer:
            'No, our croissants are made with simple, traditional ingredients: flour, butter, sugar, salt, yeast, and milk. They contain no preservatives or artificial ingredients.',
          author: 'Olivia M.',
          date: 'April 27, 2025',
        },
        {
          question: 'Can these croissants be frozen?',
          answer:
            'Yes, they freeze very well. Place in a freezer bag and freeze for up to one month. To enjoy, thaw overnight in the refrigerator and reheat in a 350°F oven for 5 minutes.',
          author: 'Charles B.',
          date: 'April 22, 2025',
        },
      ],
    },
  },

  // Birthday Cake - Chocolate (ID: 10)
  10: {
    description: {
      origins:
        'Our chocolate birthday cakes are handcrafted by skilled pastry chefs using premium ingredients including Belgian chocolate, fresh eggs, and real vanilla. We use traditional baking methods and decorate each cake by hand to ensure a beautiful, celebration-worthy dessert.',
      cookingInfo:
        'This cake serves 8-10 people comfortably. For best flavor, remove from refrigeration 30-60 minutes before serving. Store any leftover cake in the refrigerator for up to 3 days. The cake pairs wonderfully with coffee, milk, or champagne for special celebrations.',
      vitamins: [
        { name: 'Protein', quantity: '4.2g', dv: '8%' },
        { name: 'Calcium', quantity: '87 mg', dv: '7%' },
        { name: 'Iron', quantity: '1.8 mg', dv: '10%' },
        { name: 'Vitamin A', quantity: '290 IU', dv: '6%' },
        { name: 'Vitamin B2', quantity: '0.17 mg', dv: '13%' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Rebecca D.',
          rating: 5,
          date: 'May 16, 2025',
          comment:
            'This cake was the highlight of my daughters birthday! Rich chocolate flavor without being too sweet, and the decoration was beautiful.',
        },
        {
          author: 'Jason K.',
          rating: 4,
          date: 'May 9, 2025',
          comment:
            'Very good cake that pleased everyone at our celebration. The frosting was particularly delicious and not too sweet.',
        },
        {
          author: 'Maria L.',
          rating: 5,
          date: 'May 3, 2025',
          comment:
            'Absolutely delicious chocolate cake! Moist, rich, and beautifully decorated. Will definitely order again for special occasions.',
        },
      ],
    },
    questions: {
      count: 3,
      items: [
        {
          question: 'Can this cake be customized with a message?',
          answer:
            'Yes, you can add a custom message at checkout. We can write up to 30 characters in our standard decorative script at no additional charge.',
          author: 'Taylor S.',
          date: 'April 28, 2025',
        },
        {
          question: 'Is this cake nut-free?',
          answer:
            'Our chocolate birthday cake recipe does not contain nuts, but it is prepared in a kitchen that processes various nuts. If you have severe allergies, please contact us directly before ordering.',
          author: 'Noah P.',
          date: 'April 23, 2025',
        },
        {
          question: 'How far in advance should I order this cake?',
          answer:
            'We recommend ordering at least 48 hours in advance to guarantee availability. For custom decorations or messages, 3-4 days notice is preferred.',
          author: 'Sophia R.',
          date: 'April 18, 2025',
        },
      ],
    },
  },
  // Spinach (ID: 11)
  11: {
    description: {
      origins:
        'Our organic baby spinach is grown on certified organic farms that prioritize soil health and sustainable growing practices. We harvest young, tender leaves for the best flavor and texture.',
      cookingInfo:
        'Baby spinach is extremely versatile in the kitchen. Enjoy it raw in salads, smoothies, and sandwiches, or cooked in omelets, pasta dishes, and stir-fries. It wilts quickly when cooked, making it an easy addition to many hot dishes.',
      vitamins: [
        { name: 'Vitamin K', quantity: '145 μg', dv: '121%' },
        { name: 'Vitamin A', quantity: '469 μg', dv: '52%' },
        { name: 'Folate (B9)', quantity: '58 μg', dv: '15%' },
        { name: 'Vitamin C', quantity: '8.4 mg', dv: '9%' },
        { name: 'Iron', quantity: '0.8 mg', dv: '4%' },
        { name: 'Magnesium', quantity: '24 mg', dv: '6%' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Diana L.',
          rating: 5,
          date: 'May 12, 2025',
          comment:
            'This spinach is incredibly fresh and tasty. I use it for everything from salads to smoothies.',
        },
        {
          author: 'Ryan H.',
          rating: 4,
          date: 'May 7, 2025',
          comment:
            'Good quality organic spinach. Lasts longer in the fridge than supermarket varieties.',
        },
        {
          author: 'Michelle P.',
          rating: 5,
          date: 'May 2, 2025',
          comment:
            "Very tender baby spinach with excellent flavor. I appreciate that it's organic and sustainably grown.",
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question:
            'How long does this spinach typically last in the refrigerator?',
          answer:
            'When properly stored in its original packaging or in a container lined with paper towels, our baby spinach typically stays fresh for 5-7 days in the refrigerator.',
          author: 'Andrew G.',
          date: 'April 25, 2025',
        },
        {
          question: 'Is this spinach pre-washed?',
          answer:
            'Yes, our baby spinach is triple-washed before packaging. However, we still recommend rinsing it before use as an extra precaution.',
          author: 'Sarah J.',
          date: 'April 20, 2025',
        },
      ],
    },
  },
  12: {
    description: {
      origins:
        "We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don't grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.",
      cookingInfo:
        'From roasts, salads and soups to casseroles and cakes, Carrots will lend sweetness, texture and colour to an enormous number of recipes.',
      vitamins: [
        { name: 'Vitamin A equiv.', quantity: '735 μg', dv: '104 %' },
        { name: 'Thiamine (B1)', quantity: '0.066 mg', dv: '6 %' },
        { name: 'Niacin (B3)', quantity: '0.983 mg', dv: '7 %' },
        { name: 'Folate (B9)', quantity: '19 μg', dv: '5 %' },
        { name: 'Vitamin C', quantity: '5.9 mg', dv: '7 %' },
        { name: 'Vitamin E', quantity: '0.66 mg', dv: '4 %' },
        { name: 'Vitamin K', quantity: '13.2', dv: '13 %' },
      ],
    },
    reviews: {
      count: 2,
      items: [
        {
          author: 'Ben Nguyen',
          rating: 5,
          date: 'May 10, 2025',
          comment:
            "These carrots are incredibly fresh and tasty. I love that they're from a local farm!",
        },
        {
          author: 'John Cena',
          rating: 4,
          date: 'May 8, 2025',
          comment:
            'Great quality produce, will buy again. Delivery was quick and efficient.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'Are these carrots organic?',
          answer:
            'Yes, all of our carrots are grown using organic farming methods without pesticides.',
          author: 'Mike L.',
          date: 'April 30, 2025',
        },
        {
          question: 'How long do these carrots stay fresh?',
          answer:
            'When stored properly in the refrigerator, our carrots typically stay fresh for up to 3 weeks.',
          author: 'Sarah K.',
          date: 'April 25, 2025',
        },
      ],
    },
  },
  // Seasonal Berry Mix (ID: 13)
  13: {
    description: {
      origins:
        'Our seasonal organic berry mix is sourced from certified organic farms that specialize in berry cultivation. We select the best varieties of blueberries, raspberries, and blackberries at their peak season for maximum flavor and nutritional value.',
      cookingInfo:
        'This berry mix is perfect for enjoying fresh as a snack, adding to breakfast cereals and yogurt, blending into smoothies, or incorporating into desserts. The berries also freeze well for longer storage and can be used in baking or as toppings when thawed.',
      vitamins: [
        { name: 'Vitamin C', quantity: '28.1 mg', dv: '31%' },
        { name: 'Vitamin K', quantity: '19.3 μg', dv: '16%' },
        { name: 'Manganese', quantity: '0.9 mg', dv: '39%' },
        { name: 'Fiber', quantity: '4 g', dv: '14%' },
        { name: 'Antioxidants', quantity: 'Very High', dv: 'N/A' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Sophia G.',
          rating: 5,
          date: 'May 11, 2025',
          comment:
            'These berries are absolutely amazing! So fresh and flavorful. Perfect for my morning smoothies.',
        },
        {
          author: 'James F.',
          rating: 5,
          date: 'May 8, 2025',
          comment:
            'Excellent quality organic berries. They arrive fresh and taste wonderful. Worth every penny!',
        },
        {
          author: 'Elizabeth C.',
          rating: 4,
          date: 'May 3, 2025',
          comment:
            'Very good mix of berries. I appreciate the organic certification and the variety in each pack.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'Which berries are included in the seasonal mix?',
          answer:
            'Our seasonal mix typically includes blueberries, raspberries, and blackberries. Depending on seasonal availability, we sometimes include strawberries or other seasonal berries as well.',
          author: 'Lauren T.',
          date: 'April 28, 2025',
        },
        {
          question: 'Can I freeze these berries?',
          answer:
            'Yes, these berries freeze very well. Simply rinse and dry them thoroughly, then spread them on a baking sheet to freeze individually before transferring to a freezer container or bag.',
          author: 'Michael R.',
          date: 'April 22, 2025',
        },
      ],
    },
  },

  // Dragon Fruit (ID: 14)
  14: {
    description: {
      origins:
        'Our dragon fruit is carefully sourced from sustainable farms specializing in exotic fruits. Selected for their vibrant color, sweet flavor, and nutritional benefits, these fruits are harvested at optimal ripeness.',
      cookingInfo:
        'Dragon fruit has a mildly sweet flavor similar to kiwi and pear. It can be enjoyed fresh by cutting it in half and scooping out the flesh, added to fruit salads, blended into smoothies, or used as a colorful garnish for desserts and breakfast bowls.',
      vitamins: [
        { name: 'Vitamin C', quantity: '9 mg', dv: '10%' },
        { name: 'Iron', quantity: '0.65 mg', dv: '8%' },
        { name: 'Magnesium', quantity: '40 mg', dv: '10%' },
        { name: 'Fiber', quantity: '3 g', dv: '11%' },
        { name: 'Antioxidants', quantity: 'High', dv: 'N/A' },
      ],
    },
    reviews: {
      count: 3,
      items: [
        {
          author: 'Nathan L.',
          rating: 4,
          date: 'May 9, 2025',
          comment:
            "My first time trying dragon fruit and I'm impressed! It's subtly sweet with a lovely texture.",
        },
        {
          author: 'Olivia S.',
          rating: 5,
          date: 'May 5, 2025',
          comment:
            'Beautiful fruit with excellent flavor. Makes amazing smoothie bowls and my Instagram photos look fantastic!',
        },
        {
          author: 'Carlos M.',
          rating: 4,
          date: 'April 30, 2025',
          comment:
            'Good quality dragon fruit. They arrived in perfect condition and ripened nicely on my counter.',
        },
      ],
    },
    questions: {
      count: 2,
      items: [
        {
          question: 'How can I tell when dragon fruit is ripe?',
          answer:
            'A ripe dragon fruit will have bright, even-colored skin and yield slightly to gentle pressure, similar to a ripe avocado. The "wings" or leafy spikes may appear slightly dried at the tips.',
          author: 'Hannah T.',
          date: 'April 25, 2025',
        },
        {
          question: 'Do you offer both white and red-fleshed varieties?',
          answer:
            'Currently, we primarily offer the white-fleshed variety with pink skin. The red-fleshed variety is sometimes available seasonally, and you can check product details during ordering.',
          author: 'Kevin F.',
          date: 'April 18, 2025',
        },
      ],
    },
  },
}

// Function to get tab data for a specific product
export const getTabDataByProductId = (productId: number): ProductTabData => {
  return productTabData[productId] ?? defaultTabData
}
