import { getUser } from "@/lib/utils/getUser";
import db from "@/server/db/index";
import { ratings } from "@/server/db/schemas";
import { createClient } from "@/server/supabase/server";
import { ratingsSchema } from "@/types/zodSchemas";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, params: { id: string }) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();

    const rating = ratingsSchema.parse(json);
    console.log(rating);
    const supabase = createClient();

    await supabase.from("ratings").insert(rating)

    return NextResponse.json({
      message: "Rating updated successfully",
    });
  } catch (error) {
    console.error("Error on /recipes/[id]/setRating", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
