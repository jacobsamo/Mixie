import RecipeForm from "@/src/common/components/templates/RecipeForm/RecipeForm";
import { mockRecipe } from "@/src/common/lib/services/data";
import { db } from "@db/index";
import { authOptions } from "@server/auth";
import { recipes } from "@db/schemas";
import { Recipe } from "@db/types";
import { eq, or } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: EditPageProps) {
  const user = await getServerSession(authOptions);

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center ">
        Not logged in
        <Link
          href={"/api/auth/signin"}
          className="rounded-md bg-yellow p-1 px-2 font-semibold text-black"
        >
          Login
        </Link>
      </div>
    );

  const recipe = (await db.query.recipes.findFirst({
    where: or(eq(recipes.id, params.id), eq(recipes.uid, params.id)),
    with: {
      info: true,
    },
  })) as Recipe;

  // console.log(recipe);
  if (recipe) return <RecipeForm recipe={recipe} />;

  return notFound();
  // return <RecipeForm recipe={mockRecipe} />;
}
