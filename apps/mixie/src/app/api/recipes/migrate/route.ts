import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // return NextResponse.json(
  //   {
  //     message:
  //       "Only used in development for migrating data to the latest versions",
  //   },
  //   { status: 404 }
  // );
  // try {
  //   const json = await req.json();
  //   console.log("Json: ", json);
  //   let newRecipes: Recipe[] = [];
  //   json.map(async (recipe: any) => {
  //     const newRecipe: Recipe = {
  //       uid: recipe.recipe_id,
  //       id: recipe.id,
  //       title: recipe.title,
  //       description: recipe.description,
  //       notes: recipe.notes,
  //       steps: recipe.steps,
  //       ingredients: recipe.ingredients,
  //       mealTime: recipe.mealTime,
  //       version: recipe.version,
  //       source: recipe.source,
  //       dietary: recipe.dietary,
  //       allergens: recipe.allergens,
  //       sweet_savoury: recipe.sweet_savoury.value ?? null,
  //       difficulty_level: recipe.difficulty_level,
  //       isPublic: recipe.isPublic,
  //       // transform info
  //       image_url: recipe.info.imgUrl,
  //       image_attributes: { alt: recipe.info.imgAlt },
  //       total: recipe.info.total,
  //       prep_time: recipe.info.prep_time,
  //       cook: recipe.info.cook,
  //       yield: recipe.info.yield,
  //       keywords: recipe.info.keywords,
  //       ingredientsList: recipe.info.ingredients,
  //       created_by: recipe.info.created_by,
  //       rating: recipe.info.rating,
  //     };
  //     newRecipes.push(newRecipe);
  //     console.log(newRecipe);
  //     await db.insert(recipes).values(newRecipe);
  //   });
  //   return NextResponse.json(newRecipes);
  // } catch (error) {
  //   console.error("Error on /recipes/create", error);
  //   if (error instanceof z.ZodError) {
  //     return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
  //   }
  //   return NextResponse.json(null, { status: 500 });
  // }
}
