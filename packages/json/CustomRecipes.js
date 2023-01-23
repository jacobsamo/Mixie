const units = ["g", "kg", "cup", "ml", "l", "teaspoon", "table spoon"];
const recipes = [
  {
    id: 'chocolate-fudge-brownies',
    imageUrl:
      'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
    recipeName: 'Chocolate fudge Brownies',
    recipeDescription:
      'This is my own recipe that has been changed from another recipe to make it fuggy ',
    keywords: ['chocolate', 'fudge', 'brownies'],
    ingredients: [
      '200g butter',
      '1/2 cup cocoa powder',
      '2 cups brown sugar',
      '1 teaspoon vanilla essence',
      '2 whisked eggs',
      '1 cup plain flour',
    ],
    dietary: ['vegetarian'],
    Allergens: ['gluten', 'dairy'],
    sweet_savoury: 'sweet', // sweet or savoury
    meallyTime: ['morning_tea', 'afternoon_tea', 'snack'], // breakfast, morning_tea, brunch, lunch, afternoon_tea, dinner, snack
    version: '1.0',
    createdBy: 'Jacob Samorowski',
    createdAt: Date.now().toString(),
    info: {
      total: '30 min',
      prep: '10 min',
      cook: '20 min',
      serves: 6,
      rating: 4,
    },
    steps: [
      'Preheat Oven to 180 degrees, grease a tray line with baking paper and melt butter ',
      'Put cocoa and brown sugar in a bowl combine all together, and add melted butter and Vanilla, stir well',
      'Add eggs and stir till the mixture is glossy',
      'Sift flour and mix',
      'Spread evenly on tray, bake for 20-25 minutes',
      'Once cool, Dust with icing sugar',
      'Cut to size',
    ],
    madeRecipe: 5,
    savedRecipe: 20,
  },
];

module.exports = { recipes };
