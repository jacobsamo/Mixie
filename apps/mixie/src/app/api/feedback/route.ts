import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { feedbackSchema } from "@/types/zodSchemas";
import { TablesInsert } from "database.types";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    const supabase = createClient();

    const data = await req.json();
    const feedback = feedbackSchema.parse(data);

    const newFeedback: TablesInsert<"feedback"> = {
      ...feedback,
      user_email: user?.email ?? feedback.user_email,
      user_id: user?.id ?? null,
    };

    const {} = await supabase.from("feedback").insert(newFeedback);

    return NextResponse.json(
      { message: `Feedback successfully created`},
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error on /feedback", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
