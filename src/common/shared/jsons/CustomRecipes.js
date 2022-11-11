const recipes = [
  {
    id: 'testDoc',
    imageUrl:
      'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
    recipeName: 'Chocolate fudge Brownies',
    recipeDescription:
      'This is my own recipe that has been changed from another recipe to make it fuggy ',
    info: {
      total: '30min',
      prep: '10min',
      cook: '20min',
      serves: '6',
      rating: 4,
    },
    ingredients: ['flour', 'vinila essene', 'co co powder'],
    steps: [
      {
        number: 1,
        body: 'Preheat Oven to 180 degrees and grease a tray line with baking paper ',
      },
      {
        number: 2,
        body: 'Melt butter',
      },
    ],
    madeRecipe: 5,
    savedRecipe: 20,
    createdAt: Date.now().toString(),
    createdBy: 'Jacob Samorowski',
  },
];
