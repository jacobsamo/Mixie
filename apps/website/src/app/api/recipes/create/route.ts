import { isApp } from "@/lib/services/apiMiddleware";
import { getUser } from "@/lib/utils/getUser";
import { requestSchema } from "@/lib/utils/recipe-imports";
import { createRecipeFromImage } from "@/lib/utils/recipe-imports/image";
import { createRecipeFromLink } from "@/lib/utils/recipe-imports/link";
import { createRecipeFromText } from "@/lib/utils/recipe-imports/text";
import { createRecipeFromTitle } from "@/lib/utils/recipe-imports/title";
import { createClient } from "@/server/supabase/server";
import { NewRecipe } from "@/types";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// Max duration in seconds
export const maxDuration = 60;

export async function POST(req: NextRequest, params: { id: string }) {
  try {
    const app = await isApp(req);
    const user = await getUser();

    if (!user || !app) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const request = requestSchema.parse(json);
    const supabase = createClient();

    let newRecipe: NewRecipe;

    switch (request.creation_type) {
      case "title":
        if (!request.title) throw Error("Title is required");
        newRecipe = await createRecipeFromTitle({
          title: request.title,
          user_id: user.id,
        });
        break;
      case "image":
        if (!request.image) throw Error("Image is required", { cause: 400 });
        newRecipe = await createRecipeFromImage({
          image: request.image,
          user_id: user.id,
        });
        break;
      case "link":
        if (!request.link) throw Error("Link is required", { cause: 400 });
        newRecipe = await createRecipeFromLink({
          link: request.link,
          user_id: user.id,
        });
        break;
      case "upload":
        if (!request.content)
          throw Error("Content is required", { cause: 400 });
        newRecipe = await createRecipeFromText({
          text: request.content,
          user_id: user.id,
        });
        break;
    }

    const { data: createRecipe, error } = await supabase
      .from("recipes")
      .insert({
        ...newRecipe,
        created_by: user.id,
        public: false,
        version: "1.0",
      })
      .select()
      .single();

    if (error) {
      console.error("Error on /recipes/[id]/create", error);
      return NextResponse.json(null, { status: 500 });
    }

    return NextResponse.json({
      message: "Rating updated successfully",
      recipe_id: createRecipe.recipe_id,
    });
  } catch (error) {
    console.error("Error on /recipes/[id]/setRating", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: error.cause as number,
      });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
