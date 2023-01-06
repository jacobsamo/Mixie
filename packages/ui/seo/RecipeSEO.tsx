import { url } from "inspector";
import Head from "next/head";
import React from "react";
import type { Recipe } from "libs/types";
import type { Timestamp } from "firebase/firestore";

interface RecipeSEOProps {
  recipeDescription: string;
  recipeName: string;
  imageUrl: string;
  info: string;
  recipeUrl: string;
  createdAt: Timestamp | string;
  keywords: string;
}

export default function RecipeSeo({
  recipeDescription,
  recipeName,
  imageUrl,
  info,
  recipeUrl,
  createdAt,
  keywords,

}: RecipeSEOProps) {
  return (
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <title>{recipeName}</title>
      <meta name="description" content={recipeDescription} />
      <meta property="og:title" content={recipeName} />
      <meta property="og:site_name" content="" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={recipeUrl} />
      <meta property="og:description" content={recipeName} />
      <meta property="fb:app_id" content="668390526646215" />{" "}
      <meta property="article:published_time" content={createdAt.toString()} />
      <meta name="keywords" content={keywords?.toString()} />
      <meta name="twitter:site" content="@meallyAu" />{" "}
      <meta name="twitter:creator" content="@meallyAu" />{" "}
      <meta name="twitter:title" content={recipeName} />
      <meta name="twitter:description" content={recipeDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
  

      <link rel="manifest" href="manifest.json" />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="favicon.png" />
    </Head>
  );
}
