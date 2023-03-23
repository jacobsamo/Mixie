"use client";

import { useEffect, useState } from "react";
import { GoogleAdsenseWidget } from "next-google-ads";
import Script from "next/script";
import React from "react";

function AdBanner() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (!loading) {
    return (
      <div>
        <Script
          id="google-adsense"
          src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client="ca-pub-1553721231977629"
          onLoad={() => {
            if (typeof window !== "undefined") {
              window.onload = () => {
                ((window as any).adsbygoogle =
                  (window as any).adsbygoogle || []).push({});
              };
            }
          }}
        />
        <GoogleAdsenseWidget
          client="ca-pub-1553721231977629"
          slot="7630248475"
          responsive="true"
        />
      </div>
    );
  }

  return <h1>Loading...</h1>;
}

export { AdBanner };
