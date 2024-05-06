import { getRecipes } from "@/lib/services/data_fetching";
import { recipe_id } from "@/lib/utils";
import { NextResponse, type NextRequest } from "next/server";

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

    const id = recipe_id(query!);

    titles.forEach((title) => {
      if (title.public && title.id == id) {
        return NextResponse.json(
          {
            message: `Recipe with same name already exists, ${title.recipe_id}`,
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
