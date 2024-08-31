import { CardRecipe, CardRectangleSmall, SearchCard } from "@/components/cards";
import { createClient } from "@mixie/supabase/server";
import Link from "next/link";

interface DraftsPageProps {
  params: {
    userId: string;
  };
  searchParams?: { [key: string]: string | undefined };
}

export default async function DraftsPage({
  params,
  searchParams,
}: DraftsPageProps) {
  const supabase = createClient();
  const { data: recipes } = await supabase
    .from("bookmarks_with_recipes")
    .select()
    .eq("user_id", params.userId);
  const { data: collections } = await supabase
    .from("collections")
    .select()
    .eq("user_id", params.userId);

  return (
    <div className="mt-4">
      <h1 className="mb-2 text-center text-step0">Bookmarked Recipes</h1>
      {/* {searchParams?.collection && recipes && recipes.filter(recipe => recipe.)} */}
      <div className="flex flex-wrap justify-center gap-4">
        {recipes &&
          recipes.map((recipe, index) => {
            return (
              <CardRectangleSmall key={index} recipe={recipe as CardRecipe} />
            );
          })}
      </div>

      <h2 className="mb-2 text-center text-step0">Collections - Coming soon</h2>
    </div>
  );
}
