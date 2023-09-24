import RecipeForm from "@/src/common/components/templates/RecipeForm/RecipeForm";
import { db } from "@/src/db";
import { authOptions } from "@/src/db/next-auth-adapter";
import { recipes } from "@/src/db/schemas";
import { Recipe } from "@/src/db/types";
import { eq, or } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EditPageProps {
  params: {
    id: string;
  };
  searchParams: {
    id: string;
  };
}

export default async function EditPage({
  params,
  searchParams,
}: EditPageProps) {
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

  return <div>Recipe not found</div>;
  // return <RecipeForm />
}
