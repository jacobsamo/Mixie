import { url } from "inspector";
import Head from "next/head";
import React from "react";
import type { Recipe } from "libs/types";
import type { Timestamp } from "firebase/firestore";

interface recipeSEOProps {
  recipeDescription: string;
  recipeName: string;
  imageUrl: string;
  info: string;
  recipeUrl: string;
  createdAt: Timestamp | string;
  keywords: string;
}

/**
 * A page SEO component
 * @param {string} recipeDescription - The description of the recipe
 * @param {string} recipeName - The name of the recipe
 * @param {string} imageUrl - The image url of the recipe
 * @param {string} info - The info of the recipe
 * @param {string} recipeUrl - The url of the recipe
 * @param {string} createdAt - The date the recipe was created
 * @param {string} keywords - The keywords of the recipe
 * @returns jsx
 * @example
 * <RecipeSeo
 *   recipeDescription="This is a description"
 *   recipeName="This is a name"
 *   imageUrl="https://meally.com.au/og-image.png"
 *   info="This is info"
 *   recipeUrl="https://meally.com.au/"
 *   createdAt="2021-08-01T00:00:00.000Z"
 *   keywords="This is a keyword"
 * />
 */

function RecipeSeo({
  recipeDescription,
  recipeName,
  imageUrl,
  info,
  recipeUrl,
  createdAt,
  keywords,
}: recipeSEOProps) {
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

export { RecipeSeo };
