import RecipeService from '@lib/services/RecipeService';

export default async function RecipePage() {
  // const data = await RecipeService.getRecipes();
  return (
    <>
      <h1>Recipes</h1>
      {/* <ul>
        {data.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul> */}
    </>
  );
}
