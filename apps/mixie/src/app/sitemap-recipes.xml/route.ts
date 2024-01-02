export const dynamic = "force-dynamic"; // defaults to force-static
import { db } from "@/src/server/db";
import { recipes as recipesSchema } from "@/src/server/db/schemas";
import { eq } from "drizzle-orm";

export async function GET() {
  const recipes = await db
    .select({
      id: recipesSchema.id,
      createdAt: recipesSchema.createdAt,
    })
    .from(recipesSchema)
    .where(eq(recipesSchema.isPublic, true));

  // add headers for the return type
  // this is required for the sitemap to be generated
  return new Response(
    `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${recipes
      .map((data) => {
        // turn date into the correct string for the sitemap
        const time = new Date(data.createdAt);
        // const time = new Date();
        return `
        <url>
            <loc>${`https://www.mixiecooking.com/recipes/${data.id}`}</loc>
            <lastmod>${time.toISOString()}</lastmod>        
        </url>
        `;
      })
      .join("")}
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
