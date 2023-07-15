export const mockRecipe = {
  uid: 'test-user',
  id: 'chocolate-fudge-brownies',
  image: {
    imgUrl:
      'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
    imgAlt: 'Chocolate fudge brownies',
  },
  title: 'Chocolate fudge Brownies',
  description:
    'This is my own recipe that has been changed from another recipe to make it fuggy ',
  keywords: [{ value: 'chocolate' }, { value: 'fudge' }, { value: 'brownies' }],
  ingredients: [
    {
      title: 'Butter',
      quantity: 200,
      unit: 'grams',
    },
    {
      title: 'Cocoa Powder',
      amount: '1/2',
      unit: 'cup',
    },
    {
      title: 'Brown Sugar',
      quantity: 2,
      unit: 'cup',
    },
    {
      title: 'Vanilla Essence',
      quantity: 1,
      unit: 'tsp',
    },
    {
      title: 'Whisked Eggs',
      quantity: 2,
      unit: 'item',
    },
    {
      title: 'Plain Flour',
      quantity: 1,
      unit: 'cup',
    },
  ],
  dietary: [{ value: 'vegetarian', label: 'Vegetarian' }],
  allergens: [
    { value: 'gluten', label: 'Gluten' },
    { value: 'dairy', label: 'Dairy' },
  ],
  sweet_savoury: { label: 'Sweet', value: 'sweet' }, // sweet or savoury
  mealTime: [
    { value: 'morning_tea', label: 'morning_tea' },
    { value: 'afternoon_tea', label: 'afternoon_tea' },
    { value: 'snack', label: 'snack' },
  ], // breakfast, morning_tea, brunch, lunch, afternoon_tea, dinner, snack
  version: '1.0',
  createdBy: 'Jacob Samorowski',
  createdAt: new Date(),
  lastUpdatedBy: 'Jacob Samorowski',
  lastUpdated: new Date(),
  user: {
    accounts: [],
    id: 'test-user',
    recipes: [],
    sessions: [],
  },
  info: {
    total: '30 min',
    prep: '10 min',
    cook: '20 min',
    serves: 6,
    rating: 4,
  },
  steps: [
    {
      id: 1,
      step_body:
        'Preheat Oven to 180 degrees, grease a tray line with baking paper and melt butter ',
    },
    {
      id: 2,
      step_body:
        'Put cocoa and brown sugar in a bowl combine all together, and add melted butter and Vanilla, stir well',
    },
    { id: 3, step_body: 'Add eggs and stir till the mixture is glossy' },
    { id: 4, step_body: 'Sift flour and mix' },
    { id: 5, step_body: 'Spread evenly on tray, bake for 20-25 minutes' },
    { id: 6, step_body: 'Once cool, Dust with icing sugar' },
    { id: 7, step_body: 'Cut to size' },
  ],
  madeRecipe: 5,
  savedRecipe: 20,
};

export const recipes = [
  {
    uid: 'test-user',
    id: 'chocolate-fudge-brownies',
    image: {
      imgUrl:
        'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
      imgAlt: 'Chocolate fudge brownies',
    },
    title: 'Chocolate fudge Brownies',
    description:
      'This is my own recipe that has been changed from another recipe to make it fuggy ',
    keywords: [
      { value: 'chocolate' },
      { value: 'fudge' },
      { value: 'brownies' },
    ],
    ingredients: [
      {
        title: 'Butter',
        quantity: 200,
        unit: 'grams',
      },
      {
        title: 'Cocoa Powder',
        amount: '1/2',
        unit: 'cup',
      },
      {
        title: 'Brown Sugar',
        quantity: 2,
        unit: 'cup',
      },
      {
        title: 'Vanilla Essence',
        quantity: 1,
        unit: 'tsp',
      },
      {
        title: 'Whisked Eggs',
        quantity: 2,
        unit: 'item',
      },
      {
        title: 'Plain Flour',
        quantity: 1,
        unit: 'cup',
      },
    ],
    dietary: [{ value: 'vegetarian', label: 'Vegetarian' }],
    allergens: [
      { value: 'gluten', label: 'Gluten' },
      { value: 'dairy', label: 'Dairy' },
    ],
    sweet_savoury: { label: 'Sweet', value: 'sweet' }, // sweet or savoury
    mealTime: [
      { value: 'morning_tea', label: 'morning_tea' },
      { value: 'afternoon_tea', label: 'afternoon_tea' },
      { value: 'snack', label: 'snack' },
    ], // breakfast, morning_tea, brunch, lunch, afternoon_tea, dinner, snack
    version: '1.0',
    createdBy: 'Jacob Samorowski',
    createdAt: new Date(),
    lastUpdatedBy: 'Jacob Samorowski',
    lastUpdated: new Date(),
    user: {
      accounts: [],
      id: 'test-user',
      recipes: [],
      sessions: [],
    },
    info: {
      total: '30 min',
      prep: '10 min',
      cook: '20 min',
      serves: 6,
      rating: 4,
    },
    steps: [
      {
        id: 1,
        step_body:
          'Preheat Oven to 180 degrees, grease a tray line with baking paper and melt butter ',
      },
      {
        id: 2,
        step_body:
          'Put cocoa and brown sugar in a bowl combine all together, and add melted butter and Vanilla, stir well',
      },
      { id: 3, step_body: 'Add eggs and stir till the mixture is glossy' },
      { id: 4, step_body: 'Sift flour and mix' },
      { id: 5, step_body: 'Spread evenly on tray, bake for 20-25 minutes' },
      { id: 6, step_body: 'Once cool, Dust with icing sugar' },
      { id: 7, step_body: 'Cut to size' },
    ],
    madeRecipe: 5,
    savedRecipe: 20,
  },
];

export const dietaryRequirements = [
  { value: 'None', label: 'None' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Gluten Free', label: 'Gluten Free' },
  { value: 'Dairy Free', label: 'Dairy Free' },
  { value: 'Nut Free', label: 'Nut Free' },
];

export const units = [
  'grams',
  'kg',
  'cup',
  'ml',
  'litre',
  'tsp',
  'tbsp',
  'pinch',
  'item',
];

export const sweet_savoury = [
  { value: 'sweet', label: 'Sweet' },
  { value: 'savoury', label: 'Savoury' },
  { value: 'both', label: 'Sweet & Savoury' },
];

export const meal_times = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'snack', label: 'Snack' },
];
