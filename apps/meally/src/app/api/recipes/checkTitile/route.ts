import { recipeId } from "@/src/common/lib/utils";
import { db } from "@db/index";
import { info } from "@db/schemas";
import { NextResponse, type NextRequest } from "next/server";

export const revalidate = 3600;
export const fetchCache = "default-cache";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("title");

    if (query === null)
      NextResponse.json(
        { message: "No title provided in search params" },
        { status: 401 }
      );

    // check if the name exists or not
    const titles = await db
      .select({
        uid: info.recipeId,
        id: info.id,
        isPublic: info.isPublic,
      })
      .from(info);

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
