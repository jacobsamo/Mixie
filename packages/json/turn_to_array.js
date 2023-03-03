const { recipes } = require('./recipes.json');
const fs = require('fs');

const content = JSON.parse(recipes);
console.log(content)

fs.writeFile('./recipes.js', content, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Successfully wrote ${content} to ./recipes.js`);
});
