const recipes = [
  {
    id: 'testDoc',
    imageUrl:
      'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
    recipeName: 'Chocolate fudge Brownies',
    recipeDescription:
      'This is my own recipe that has been changed from another recipe to make it fuggy ',
    keywords: ['chocolate', 'fudge', 'brownies'],
    ingredients: ['flour', 'vanilla essene', 'co co powder', 'butter', 'brown sugar', 'eggs',],
    dietary: ['vegetarian'],
    Allergens: ['gluten', 'dairy'],
    version: '1.0',
    createdBy: 'Jacob Samorowski',
    createdAt: Date.now().toString(),
    info: {
      total: '30min',
      prep: '10min',
      cook: '20min',
      serves: '6',
      rating: 4,
    },
    steps: [
      {
        number: 1,
        body: 'Preheat Oven to 180 degrees, grease a tray line with baking paper and melt butter ',
      },
      {
        number: 2,
        body: 'Put cocoa and brown sugar in a bowl combine all together, and add melted butter and Vanilla, stir well',
      },
      {
        number: 3,
        body: 'Add eggs and stir till the mixture is glossy'
      },
      {
        number: 4,
        body: 'Sift flour and mix'
      },
      {
        number: 5,
        body: 'Spread evenly on tray, bake for 20-25 minutes'
      },
      {
        number: 6,
        body: 'Once cool, Dust with icing sugar'
      },
      {
        number: 7,
        body: 'Cut to size'
      }
    ],
    madeRecipe: 5,
    savedRecipe: 20,
  },
];


module.exports = {recipes};