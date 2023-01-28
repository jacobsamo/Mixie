var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/modules/RecipeCard.tsx
import Image from "next/image";

// ../../node_modules/@heroicons/react/24/outline/esm/HeartIcon.js
import * as React from "react";
function HeartIcon(_a, svgRef) {
  var _b = _a, {
    title,
    titleId
  } = _b, props = __objRest(_b, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  }));
}
var ForwardRef = React.forwardRef(HeartIcon);
var HeartIcon_default = ForwardRef;

// ../../node_modules/@heroicons/react/24/outline/esm/PlusCircleIcon.js
import * as React2 from "react";
function PlusCircleIcon(_a, svgRef) {
  var _b = _a, {
    title,
    titleId
  } = _b, props = __objRest(_b, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ React2.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React2.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React2.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
  }));
}
var ForwardRef2 = React2.forwardRef(PlusCircleIcon);
var PlusCircleIcon_default = ForwardRef2;

// src/modules/RecipeCard.tsx
var RecipeCard = ({
  id,
  imageUrl,
  recipeName,
  recipeDescription
}) => {
  return <div
    key={id}
    className="relative w-46 h-58 dark:bg-grey bg-white rounded-xl cursor-pointer text-blue2"
  >
    <Image
      width={180}
      height={135}
      src={imageUrl}
      alt={recipeName}
      className="width-[180px] height-[135px] rounded-[12px 12px 0 0] absolute"
    />
    <h1 className="dark:text-white text-black text-sm font-Roboto font-bold absolute left-2 top-36">{recipeName}</h1>
    <h1 className="dark:text-white text-black absolute bottom-1 left-3">{id}</h1>
    <HeartIcon_default
      className="dark:text-white text-black cursor-pointer absolute bottom-1 right-1 w-6 h-6"
      onClick={() => console.log("heart icon clicked")}
    />
  </div>;
};

// src/modules/AdBanner.tsx
import { useEffect, useState } from "react";
import { GoogleAdsenseWidget } from "next-google-ads";
import Script from "next/script";
"use client";
function AdBanner() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (!loading) {
    return <div>
      <Script
        id="google-adsense"
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-1553721231977629"
        onLoad={() => {
          if (typeof window !== "undefined") {
            window.onload = () => {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            };
          }
        }}
      />
      <GoogleAdsenseWidget
        client="ca-pub-1553721231977629"
        slot="7630248475"
        responsive="true"
      />
    </div>;
  }
  return <h1>Loading..</h1>;
}

// src/modules/loader.tsx
var Loader = () => {
  return <div className="pinwheel">
    <div className="pinwheel__line" />
    <div className="pinwheel__line" />
    <div className="pinwheel__line" />
    <div className="pinwheel__line" />
    <div className="pinwheel__line" />
    <div className="pinwheel__line" />
  </div>;
};

// src/modules/InputFields.tsx
import { useState as useState2 } from "react";
function InputField(props) {
  const [value, setValue] = useState2("");
  function handleChange(event) {
    setValue(event.target.value);
    props.onChange ? props.onChange(event) : null;
  }
  return <label>
    {props.label}
    <input
      type={props.type || "text"}
      name={props.name}
      id={props.name || props.id}
      placeholder={props.placeholder}
      value={props.value}
      aria-required={props.required}
      onChange={handleChange}
      required={props.required}
      autoComplete={props.autoComplete}
      className={props.className}
      min={props.min}
      minLength={props.minLength}
      max={props.max}
      maxLength={props.maxLength}
    />
  </label>;
}

// src/modules/AddButton.tsx
var AddButton = (props) => {
  return <button type={props.type} onClick={props.onClick} className="flex flex-row w-40 h-9 rounded-lg border-2 border-solid border-black dark:border-white justify-center items-center gap-3">
    <PlusCircleIcon_default className="w-5 h-5" />
    {" Add "}
    {props.name}
  </button>;
};

// src/modules/Dialog.tsx
import { useCallback, useEffect as useEffect2, useState as useState3 } from "react";
function Dialog(props) {
  const [dialogOpen, setDialogOpen] = useState3(false);
  const handleKeyOpen = useCallback((event) => {
    if (event.key in props.keyOpen)
      setDialogOpen(true);
  }, []);
  const handleKeyClose = useCallback((event) => {
    if (event.key in props.keyClose)
      setDialogOpen(false);
  }, []);
  useEffect2(() => {
    if (props.keyOpen) {
      document.addEventListener("keyup", handleKeyOpen);
      return () => document.removeEventListener("keyup", handleKeyOpen);
    }
  }, [handleKeyOpen]);
  useEffect2(() => {
    if (props.keyClose) {
      document.addEventListener("keyup", handleKeyClose);
      return () => document.removeEventListener("keyup", handleKeyClose);
    }
  }, [handleKeyClose]);
  useEffect2(() => {
    if (props.open) {
      setDialogOpen(props.open);
    }
  }, [props.open]);
  const handleOpen = () => {
    setDialogOpen(true);
    props.setOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
    props.setOpen(false);
  };
  const handleToggle = () => {
    setDialogOpen(!dialogOpen);
    props.setOpen(!dialogOpen);
  };
  return <div
    style={{
      display: dialogOpen ? "block" : "none"
    }}
    className={`fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm w-full h-full ${props.className}`}
  ><section className={props.className}>{props.children}</section></div>;
}

// src/seo/PageSEO.tsx
import Head from "next/head";
function PageSeo({ title, url, imgUrl, description }) {
  return <Head>
    <title>{title}</title>
    <meta name="title" content={"Meally \u2014 Cook, Collaborate & Create"} />
    <meta
      name="description"
      content="Find recipes you love all free and open source, completely powered by the community "
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={"Meally \u2014 Find your next meal"} />
    <meta
      property="og:description"
      content="Find recipes you love all free and open source, completely powered by the community "
    />
    <meta property="og:image" content={imgUrl} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={"Meally \u2014 Find your next meal"} />
    <meta
      property="twitter:description"
      content="Find recipes you love all free and open source, completely powered by the community "
    />
    <meta property="twitter:image" content={imgUrl} />
    <link rel="manifest" href="manifest.json" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" href="favicon.png" />
  </Head>;
}

// src/seo/RecipeSEO.tsx
import Head2 from "next/head";
function RecipeSeo({
  recipeDescription,
  recipeName,
  imageUrl,
  info,
  recipeUrl,
  createdAt,
  keywords
}) {
  return <Head2>
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
    <meta property="fb:app_id" content="668390526646215" />
    {" "}
    <meta property="article:published_time" content={createdAt.toString()} />
    <meta name="keywords" content={keywords == null ? void 0 : keywords.toString()} />
    <meta name="twitter:site" content="@meallyAu" />
    {" "}
    <meta name="twitter:creator" content="@meallyAu" />
    {" "}
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
  </Head2>;
}
export {
  AdBanner,
  AddButton,
  Dialog,
  InputField,
  Loader,
  PageSeo,
  RecipeCard,
  RecipeSeo
};
