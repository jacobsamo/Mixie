import { db } from "@/server/db/index";
import { ratings } from "@/server/db/schemas";
import { ratingsSchema } from "@/server/db/zodSchemas";
import { getServerAuthSession } from "@/server/auth";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, params: { id: string }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();

    const rating = ratingsSchema.parse(json);
    console.log(rating);

    db.insert(ratings).values(rating);

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
