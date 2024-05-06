import { getUser } from "@/lib/utils/getUser";
import { resend, sendEmail } from "@/server/send";
import { createClient } from "@/server/supabase/server";
import { feedbackSchema } from "@/types/zodSchemas";
import { TablesInsert } from "database.types";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";
import NewFeedback from "transactional/emails/feedback";

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

    const { data: sentFeedback } = await supabase
      .from("feedback")
      .insert(newFeedback)
      .select()
      .single();

    await sendEmail({
      subject: "New feedback",
      email: "feedback@mixiecooking.com",
      react: NewFeedback({
        feedback: {
          description: sentFeedback?.description ?? newFeedback.description,
          title: sentFeedback?.title ?? newFeedback.title,
          user_email: sentFeedback?.user_email ?? newFeedback.user_email,
          created_at: sentFeedback?.created_at ?? Date.now().toString(),
          page: sentFeedback?.page ?? "",
          feedback_id: sentFeedback?.feedback_id ?? "",
          user_id: sentFeedback?.user_id ?? "",
          type: sentFeedback?.type ?? "other",
        },
      }),
    });

    return NextResponse.json(
      { message: `Feedback successfully created` },
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
