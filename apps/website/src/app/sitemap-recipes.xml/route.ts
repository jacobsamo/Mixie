export const dynamic = "force-dynamic"; // defaults to force-static
import { createClient } from "@/server/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data: recipes } = await supabase
    .from("recipes")
    .select("id, created_at")
    .eq("public", true);

  // add headers for the return type
  // this is required for the sitemap to be generated
  return new Response(
    `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${
      recipes &&
      recipes
        .map((data) => {
          // turn date into the correct string for the sitemap
          const time = new Date(data.created_at);
          // const time = new Date();
          return `
        <url>
            <loc>${`https://www.mixiecooking.com/recipes/${data.id}`}</loc>
            <lastmod>${time.toISOString()}</lastmod>        
        </url>
        `;
        })
        .join("")
    }
    </urlset>
    `,
    {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
      status: 200,
    }
  );
}
