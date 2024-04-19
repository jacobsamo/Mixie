import { SearchCard } from "@/components/cards";
import db from "@/server/db/index";
import { recipes } from "@/server/db/schemas";
import { eq } from "drizzle-orm";

interface DraftsPageProps {
  params: {
    profile: string;
  };
}

export default async function DraftsPage({ params }: DraftsPageProps) {
  const gotRecipes = await db.select().from(recipes).where(eq(recipes.createdBy, params.profile)) 

  return (
    <div className="mt-4">
      <h1 className="mb-2 text-center text-step0">Draft Recipes</h1>
      <ul className="flex flex-row flex-wrap justify-center gap-4">
        {gotRecipes.map((recipe, index) => {
          return <SearchCard as="li" key={index} recipe={recipe} edit={true} />;
        })}
      </ul>
    </div>
  );
}
