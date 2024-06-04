import { createClient } from "@/server/supabase/server";
import { Recipe } from "@/types";
import { ImageResponse } from "next/og";
// import * as NextImage from "next/image";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  // Font
  const interSemiBold = fetch(
    new URL("./Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const supabase = createClient();
  const { data: recipe } = await supabase
    .from("recipes")
    .select("title, total_time, image_url, image_attributes")
    .eq("recipe_id", params.id)
    .single();

  if (!recipe) return null;

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      className="relative flex h-full w-full flex-col items-center justify-between p-2 text-white"
    >
      <h1 className="textOnBackground max-w-full text-balance text-center text-step--2">
        {recipe.title}
      </h1>
      <h3 className="textOnBackground w-fit whitespace-nowrap">
        {recipe.total_time}M
      </h3>
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={(recipe.image_attributes as Recipe["image_attributes"])?.alt}
          className="-z-20 h-full w-full rounded-xl object-cover object-center"
        />
      )}
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
