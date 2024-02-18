import { isApp } from "@/lib/services/apiMiddleware";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const app = await isApp(req);
  const tag = req.nextUrl.searchParams.get("tag");
  const path = req.nextUrl.searchParams.get("path");

  if (!app) NextResponse.json("Unauthorized", { status: 401 });

  if (tag != null) {
    revalidateTag(tag);
    return NextResponse.json({
      message: `revalidated tag: ${tag}`,
    });
  }

  if (path != null) {
    revalidatePath(path);
    return NextResponse.json({
      message: `revalidated path: ${path}`,
    });
  }

  return NextResponse.json({ message: "Coming in the future" });
}
