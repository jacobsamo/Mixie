import { SearchCard } from "@/src/common/components/elements/Cards";
import { db } from "@db/index";
import { recipes } from "@db/schemas";
import { eq, or } from "drizzle-orm";

interface DraftsPageProps {
  params: {
    profile: string;
  };
}

export default async function DraftsPage({ params }: DraftsPageProps) {
  const gotRecipes = await db.query.info.findMany({
    where: or(
      eq(recipes.createdBy, params.profile),
      eq(recipes.lastUpdatedBy, params.profile)
    ),
  })

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
