import { recipeId } from "@/src/common/lib/utils";
import { db } from "@db/index";
import { recipes as recipesSchema } from "@db/schemas";
import { unstable_cache } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export const revalidate = 3600;

const getRecipes = unstable_cache(
  async () => {
    const recipes = await db
      .select({
        uid: recipesSchema.uid,
        id: recipesSchema.id,
        isPublic: recipesSchema.isPublic,
      })
      .from(recipesSchema);
    return recipes;
  },
  ["recipes"],
  {
    revalidate: 3600,
  }
);

export async function POST(req: NextRequest) {
  console.log("Title: ", req);

  try {
    const data = await req.json();
    const query = data.title;

    if (query === null)
      NextResponse.json(
        { message: "No title provided in search params" },
        { status: 401 }
      );

    // check if the name exists or not
    const titles = await getRecipes();

    const id = recipeId(query!);

    titles.forEach((title) => {
      if (title.isPublic && title.id == id) {
        return NextResponse.json(
          {
            message: `Recipe with same name already exists, ${title.uid}`,
          },
          {
            status: 400,
          }
        );
      }
    });

    return NextResponse.json(
      {
        message: `No recipes found with that name`,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error on /recipes/checkTitle", error);

    return NextResponse.json(error, { status: 500 });
  }
}
