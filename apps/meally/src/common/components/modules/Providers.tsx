"use client";
import { NextAuthProvider } from "@components/layouts/NextAuthProvider";

import React from "react";
import { ThemeProvider } from "@components/modules/theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem>
        <NextAuthProvider>{children}</NextAuthProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
