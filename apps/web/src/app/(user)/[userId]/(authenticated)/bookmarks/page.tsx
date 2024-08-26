import { CardRecipe, SearchCard } from "@/components/cards";
import { createClient } from "@mixie/supabase/server";

interface DraftsPageProps {
  params: {
    userId: string;
  };
}

export default async function DraftsPage({ params }: DraftsPageProps) {
  const supabase = createClient();
  const { data: recipes } = await supabase
    .from("bookmarks_with_recipes")
    .select()
    .eq("user_id", params.userId);

  return (
    <div className="mt-4">
      <h1 className="mb-2 text-center text-step0">Bookmarked Recipes</h1>
      <ul className="flex flex-row flex-wrap justify-center gap-4">
        {recipes &&
          recipes.map((recipe, index) => {
            return (
              <SearchCard
                as="li"
                key={index}
                recipe={recipe as CardRecipe}
                edit={true}
              />
            );
          })}
      </ul>
    </div>
  );
}
