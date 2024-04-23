import { SearchCard } from "@/components/cards";
import { createClient } from "@/server/supabase/server";

interface DraftsPageProps {
  params: {
    profile: string;
  };
}

export default async function DraftsPage({ params }: DraftsPageProps) {
  const supabase = createClient();
  const {data: recipes} = await supabase.from("recipes").select().eq("create_by", params.profile);

  return (
    <div className="mt-4">
      <h1 className="mb-2 text-center text-step0">Draft Recipes</h1>
      <ul className="flex flex-row flex-wrap justify-center gap-4">
        {recipes && recipes.map((recipe, index) => {
          return <SearchCard as="li" key={index} recipe={recipe} edit={true} />;
        })}
      </ul>
    </div>
  );
}
